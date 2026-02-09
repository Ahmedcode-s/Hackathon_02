from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from ..models.auth import SignupRequest, SigninRequest, AuthResponse
from ..services.auth import AuthService
from ..config.database import get_session
from datetime import datetime


router = APIRouter(prefix="", tags=["Authentication"])


@router.post("/auth/signup", response_model=AuthResponse)
def signup(signup_request: SignupRequest, session: Session = Depends(get_session)):
    """
    Register a new user
    """
    auth_service = AuthService(session)

    try:
        # Create user
        user_create = signup_request
        user = auth_service.register_user(user_create)

        # Create access token
        access_token = auth_service.create_access_token_for_user(user)

        # Calculate expiration time (in seconds)
        expires_in = 15 * 60  # 15 minutes in seconds

        return AuthResponse(
            access_token=access_token,
            token_type="bearer",
            expires_in=expires_in,
            user_id=user.id,
            email=user.email
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during registration"
        )


@router.post("/auth/signin", response_model=AuthResponse)
def signin(signin_request: SigninRequest, session: Session = Depends(get_session)):
    """
    Authenticate an existing user
    """
    auth_service = AuthService(session)

    user = auth_service.authenticate_user(signin_request.email, signin_request.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    # Create access token
    access_token = auth_service.create_access_token_for_user(user)

    # Calculate expiration time (in seconds)
    expires_in = 15 * 60  # 15 minutes in seconds

    return AuthResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=expires_in,
        user_id=user.id,
        email=user.email
    )


@router.post("/auth/logout")
def logout():
    """
    Logout user (client-side token invalidation)
    """
    # In a stateless JWT system, logout is typically handled on the client side
    # by removing the token from storage. We can add server-side token blacklisting
    # later if needed, but for now, we'll just return a success message.
    return {"message": "Successfully logged out"}