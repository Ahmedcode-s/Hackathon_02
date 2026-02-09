from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class TaskBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=1000)
    is_completed: bool = Field(default=False)
    priority: int = Field(default=3, ge=1, le=5)  # Priority level 1-5
    due_date: Optional[datetime] = Field(default=None)


class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: int = Field(index=True)  # Foreign key reference to user (from auth feature)
    is_deleted: bool = Field(default=False)  # For soft deletes


class TaskRead(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime
    user_id: int
    is_deleted: bool


class TaskCreate(TaskBase):
    pass  # Inherits all fields from TaskBase


class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_completed: Optional[bool] = None
    priority: Optional[int] = None
    due_date: Optional[datetime] = None


class TaskListResponse(BaseModel):
    tasks: list[TaskRead]
    total_count: int
    completed_count: int