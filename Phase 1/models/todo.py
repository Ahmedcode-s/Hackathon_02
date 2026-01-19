"""
Todo Model
==========

This module defines the Todo class which represents a single todo item.
"""


class Todo:
    """
    Represents a single todo item with id, title, description, and completion status.
    """
    def __init__(self, id: int, title: str, description: str = "", completed: bool = False):
        self.id = id
        self.title = title
        self.description = description
        self.completed = completed

    def __str__(self):
        """
        Returns a string representation of the todo item.
        Shows completion status with a checkbox symbol.
        """
        status = "[x]" if self.completed else "[ ]"
        return f"{status} [{self.id}] {self.title}"

    def __repr__(self):
        """
        Returns a detailed string representation of the todo item.
        """
        return f"Todo(id={self.id}, title='{self.title}', completed={self.completed})"


if __name__ == "__main__":
    # Example usage
    todo = Todo(1, "Sample task", "This is a sample todo item", False)
    print(todo)