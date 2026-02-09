from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from typing import List
from ..models.task import Task, TaskCreate, TaskUpdate, TaskRead, TaskListResponse
from ..services.task_service import TaskService
from ..config.database import get_session
from ..api.dependencies import get_current_user_id


router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.post("/", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(
    task_create: TaskCreate,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """
    Create a new task for the authenticated user
    """
    task_service = TaskService(session)

    # Create the task associated with the current user
    task = task_service.create_task(task_create, current_user_id)

    return task


@router.get("/", response_model=TaskListResponse)
def read_tasks(
    skip: int = 0,
    limit: int = 100,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """
    Get all tasks for the authenticated user
    """
    task_service = TaskService(session)

    # Get tasks for the current user
    tasks = task_service.get_tasks_by_user(current_user_id, skip=skip, limit=limit)
    stats = task_service.get_task_stats(current_user_id)

    return TaskListResponse(
        tasks=tasks,
        total_count=stats["total_count"],
        completed_count=stats["completed_count"]
    )


@router.get("/{task_id}", response_model=TaskRead)
def read_task(
    task_id: int,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """
    Get a specific task by ID for the authenticated user
    """
    task_service = TaskService(session)

    task = task_service.get_task_by_id(task_id, current_user_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task


@router.put("/{task_id}", response_model=TaskRead)
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """
    Update a specific task for the authenticated user
    """
    task_service = TaskService(session)

    task = task_service.update_task(task_id, task_update, current_user_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or not authorized"
        )

    return task


@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """
    Delete a specific task for the authenticated user (soft delete)
    """
    task_service = TaskService(session)

    success = task_service.delete_task(task_id, current_user_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or not authorized"
        )

    return {"message": "Task deleted successfully", "task_id": task_id}