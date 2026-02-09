from sqlmodel import Session, select
from typing import Optional
from ..models.user import User, UserCreate
from ..utils.password_utils import get_password_hash, verify_password
from ..utils.jwt_utils import create_access_token
from datetime import timedelta
from datetime import datetime


class AuthService:
    def __init__(self, session: Session):
        self.session = session

    def register_user(self, user_create: UserCreate) -> User:
        """
        Register a new user
        """
        # Check if user already exists
        existing_user = self.session.exec(
            select(User).where(User.email == user_create.email)
        ).first()

        if existing_user:
            raise ValueError("User with this email already exists")

        # Create new user
        password_hash = get_password_hash(user_create.password)
        db_user = User(
            email=user_create.email,
            password_hash=password_hash,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

        self.session.add(db_user)
        self.session.commit()
        self.session.refresh(db_user)

        return db_user

    def authenticate_user(self, email: str, password: str) -> Optional[User]:
        """
        Authenticate a user with email and password
        """
        user = self.session.exec(
            select(User).where(User.email == email)
        ).first()

        if not user or not verify_password(password, user.password_hash):
            return None

        return user

    def create_access_token_for_user(self, user: User) -> str:
        """
        Create an access token for the authenticated user
        """
        data = {
            "sub": str(user.id),
            "email": user.email
        }
        return create_access_token(data=data)

    def get_user_by_email(self, email: str) -> Optional[User]:
        """
        Retrieve a user by email
        """
        return self.session.exec(select(User).where(User.email == email)).first()

    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """
        Retrieve a user by ID
        """
        return self.session.exec(select(User).where(User.id == user_id)).first()