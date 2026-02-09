from datetime import timedelta
from typing import Optional
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-default-secret-key-change-in-production")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "15"))


def get_token_expiry_delta() -> timedelta:
    """Get the timedelta for token expiry"""
    return timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)