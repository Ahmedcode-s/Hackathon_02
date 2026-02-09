from sqlmodel import Session, select
from typing import Optional, List
from ..models.task import Task, TaskCreate, TaskUpdate
from datetime import datetime


class TaskService:
    def __init__(self, session: Session):
        self.session = session

    def create_task(self, task_create: TaskCreate, user_id: int) -> Task:
        """
        Create a new task for a specific user
        """
        # Create task data with user_id included
        task_data = task_create.model_dump()
        task_data['user_id'] = user_id

        db_task = Task(**task_data)

        self.session.add(db_task)
        self.session.commit()
        self.session.refresh(db_task)

        return db_task

    def get_task_by_id(self, task_id: int, user_id: int) -> Optional[Task]:
        """
        Get a specific task by ID for a specific user
        """
        statement = select(Task).where(Task.id == task_id, Task.user_id == user_id, Task.is_deleted == False)
        return self.session.exec(statement).first()

    def get_tasks_by_user(self, user_id: int, skip: int = 0, limit: int = 100) -> List[Task]:
        """
        Get all tasks for a specific user
        """
        statement = select(Task).where(Task.user_id == user_id, Task.is_deleted == False).offset(skip).limit(limit)
        return self.session.exec(statement).all()

    def update_task(self, task_id: int, task_update: TaskUpdate, user_id: int) -> Optional[Task]:
        """
        Update a specific task for a specific user
        """
        db_task = self.get_task_by_id(task_id, user_id)
        if db_task:
            update_data = task_update.model_dump(exclude_unset=True)
            for field, value in update_data.items():
                setattr(db_task, field, value)

            db_task.updated_at = datetime.utcnow()

            self.session.add(db_task)
            self.session.commit()
            self.session.refresh(db_task)

        return db_task

    def delete_task(self, task_id: int, user_id: int) -> bool:
        """
        Soft delete a specific task for a specific user
        """
        db_task = self.get_task_by_id(task_id, user_id)
        if db_task:
            db_task.is_deleted = True
            db_task.updated_at = datetime.utcnow()

            self.session.add(db_task)
            self.session.commit()
            return True

        return False

    def get_task_stats(self, user_id: int) -> dict:
        """
        Get statistics about tasks for a specific user
        """
        all_tasks = self.get_tasks_by_user(user_id)
        total_count = len(all_tasks)
        completed_count = len([task for task in all_tasks if task.is_completed])

        return {
            "total_count": total_count,
            "completed_count": completed_count
        }