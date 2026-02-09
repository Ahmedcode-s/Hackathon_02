from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from ..config.database import get_session
from ..services.user_service import UserService
from ..api.middleware import verify_jwt_token
from ..models.user import UserRead


router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserRead)
def get_current_user(
    payload: dict = Depends(verify_jwt_token),
    session: Session = Depends(get_session)
):
    """
    Get current user information
    """
    user_id = int(payload.get("sub"))

    user_service = UserService(session)
    user_info = user_service.get_current_user_info(user_id)

    if not user_info:
        raise HTTPException(status_code=404, detail="User not found")

    return user_info


@router.get("/{user_id}", response_model=UserRead)
def get_user(
    user_id: int,
    payload: dict = Depends(verify_jwt_token),
    session: Session = Depends(get_session)
):
    """
    Get user information by ID
    NOTE: This implementation ensures users can only access their own data
    """
    requesting_user_id = int(payload.get("sub"))

    # Security check: users can only access their own information
    if requesting_user_id != user_id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to access this user's information"
        )

    user_service = UserService(session)
    user_info = user_service.get_current_user_info(user_id)

    if not user_info:
        raise HTTPException(status_code=404, detail="User not found")

    return user_info


@router.put("/{user_id}")
def update_user(
    user_id: int,
    email: str = None,
    is_active: bool = None,
    payload: dict = Depends(verify_jwt_token),
    session: Session = Depends(get_session)
):
    """
    Update user information
    NOTE: This implementation ensures users can only update their own data
    """
    requesting_user_id = int(payload.get("sub"))

    # Security check: users can only update their own information
    if requesting_user_id != user_id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to update this user's information"
        )

    user_service = UserService(session)
    updated_user = user_service.update_user(user_id, email=email, is_active=is_active)

    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User updated successfully", "user_id": updated_user.id}