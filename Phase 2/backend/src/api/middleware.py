from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional
from ..utils.jwt_utils import verify_token
from ..config.settings import settings


security = HTTPBearer()


def verify_jwt_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Optional[dict]:
    """
    Verify JWT token from the Authorization header
    """
    token = credentials.credentials

    payload = verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return payload