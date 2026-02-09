from pydantic import BaseModel
from typing import Optional


class SignupRequest(BaseModel):
    email: str
    password: str


class SigninRequest(BaseModel):
    email: str
    password: str


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user_id: int
    email: str


class UserResponse(BaseModel):
    id: int
    email: str
    created_at: str


class UserSession(BaseModel):
    user_id: int
    email: str
    is_authenticated: bool = True
    permissions: list = []