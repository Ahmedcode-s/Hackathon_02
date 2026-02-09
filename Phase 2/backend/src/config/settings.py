from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str = "postgresql://username:password@localhost/dbname"

    # JWT settings
    JWT_SECRET_KEY: str = "your-super-secret-jwt-key-here"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15

    # Application settings
    APP_NAME: str = "Todo App API"
    API_V1_STR: str = "/api/v1"

    class Config:
        env_file = ".env"


settings = Settings()