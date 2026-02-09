from sqlmodel import Session, select
from typing import Optional
from datetime import datetime
from ..models.user import User, UserRead


class UserService:
    def __init__(self, session: Session):
        self.session = session

    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """
        Retrieve a user by ID
        """
        statement = select(User).where(User.id == user_id)
        return self.session.exec(statement).first()

    def get_user_by_email(self, email: str) -> Optional[User]:
        """
        Retrieve a user by email
        """
        statement = select(User).where(User.email == email)
        return self.session.exec(statement).first()

    def get_current_user_info(self, user_id: int) -> Optional[UserRead]:
        """
        Get current user information
        """
        user = self.get_user_by_id(user_id)
        if user:
            return UserRead(
                id=user.id,
                email=user.email,
                created_at=user.created_at,
                is_active=user.is_active
            )
        return None

    def update_user(self, user_id: int, email: Optional[str] = None, is_active: Optional[bool] = None) -> Optional[User]:
        """
        Update user information
        """
        user = self.get_user_by_id(user_id)
        if not user:
            return None

        if email is not None:
            user.email = email
        if is_active is not None:
            user.is_active = is_active

        user.updated_at = datetime.utcnow()

        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)

        return user

    def deactivate_user(self, user_id: int) -> bool:
        """
        Deactivate a user account
        """
        user = self.get_user_by_id(user_id)
        if not user:
            return False

        user.is_active = False
        user.updated_at = datetime.utcnow()
        self.session.add(user)
        self.session.commit()

        return True

    def can_access_resource(self, requesting_user_id: int, resource_owner_id: int) -> bool:
        """
        Check if a user can access a resource owned by another user
        For this implementation, users can only access their own resources
        """
        return requesting_user_id == resource_owner_id

    def validate_user_data_access(self, requesting_user_id: int, target_user_id: int) -> bool:
        """
        Validate that a user can access another user's data
        This is a security check to prevent unauthorized data access
        """
        return requesting_user_id == target_user_id