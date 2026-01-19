"""
Todo Service
============

This module provides the business logic for managing todo items.
All operations are performed in-memory as per the requirements.
"""


from typing import List, Optional
from models.todo import Todo


class TodoService:
    """
    Service class that manages all todo operations in-memory.
    Handles adding, deleting, updating, viewing, and marking todos as complete.
    """

    def __init__(self):
        """Initialize the service with an empty list of todos and ID counter."""
        self.todos: List[Todo] = []
        self.next_id = 1

    def add_todo(self, title: str, description: str = "") -> Todo:
        """
        Add a new todo item to the list.

        Args:
            title: The title of the todo item
            description: Optional description of the todo item

        Returns:
            The newly created Todo object
        """
        todo = Todo(self.next_id, title, description)
        self.todos.append(todo)
        self.next_id += 1
        return todo

    def delete_todo(self, todo_id: int) -> bool:
        """
        Delete a todo item by its ID.

        Args:
            todo_id: The ID of the todo to delete

        Returns:
            True if the todo was found and deleted, False otherwise
        """
        initial_count = len(self.todos)
        self.todos = [todo for todo in self.todos if todo.id != todo_id]
        return len(self.todos) < initial_count

    def update_todo(self, todo_id: int, title: Optional[str] = None,
                   description: Optional[str] = None) -> bool:
        """
        Update a todo item's title or description.

        Args:
            todo_id: The ID of the todo to update
            title: New title (optional)
            description: New description (optional)

        Returns:
            True if the todo was found and updated, False otherwise
        """
        for todo in self.todos:
            if todo.id == todo_id:
                if title is not None:
                    todo.title = title
                if description is not None:
                    todo.description = description
                return True
        return False

    def get_todo(self, todo_id: int) -> Optional[Todo]:
        """
        Retrieve a specific todo by its ID.

        Args:
            todo_id: The ID of the todo to retrieve

        Returns:
            The Todo object if found, None otherwise
        """
        for todo in self.todos:
            if todo.id == todo_id:
                return todo
        return None

    def get_all_todos(self) -> List[Todo]:
        """
        Retrieve all todo items.

        Returns:
            A list of all Todo objects
        """
        return self.todos

    def mark_complete(self, todo_id: int, completed: bool = True) -> bool:
        """
        Mark a todo item as complete or incomplete.

        Args:
            todo_id: The ID of the todo to update
            completed: Whether the todo should be marked as completed (default True)

        Returns:
            True if the todo was found and updated, False otherwise
        """
        for todo in self.todos:
            if todo.id == todo_id:
                todo.completed = completed
                return True
        return False


if __name__ == "__main__":
    # Example usage
    service = TodoService()

    # Add a few todos
    todo1 = service.add_todo("Complete project", "Finish the todo app project")
    todo2 = service.add_todo("Review code", "Review all code for quality")

    # View all todos
    print("All todos:")
    for todo in service.get_all_todos():
        print(todo)

    # Mark one as complete
    service.mark_complete(todo1.id)
    print("\nAfter marking first todo as complete:")
    for todo in service.get_all_todos():
        print(todo)