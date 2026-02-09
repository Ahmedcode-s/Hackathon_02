from sqlmodel import create_engine
from typing import Generator
from dotenv import load_dotenv
import os
from sqlmodel import Session

load_dotenv()

# Get database URL from environment, with a default for development
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todos.db")

# Create the database engine
engine = create_engine(DATABASE_URL, echo=True)


def get_session() -> Generator[Session, None, None]:
    """Get a database session"""
    with Session(engine) as session:
        yield session