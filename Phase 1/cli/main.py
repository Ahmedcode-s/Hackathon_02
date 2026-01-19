"""
Interactive Todo Application
===========================

This module provides an interactive menu-based interface for the todo application.
Users can select options from a menu to perform todo operations.
"""


import sys
import os
# Add the parent directory to the path so we can import from services and models
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.todo_service import TodoService


def main():
    """
    Main entry point for the interactive application.
    Provides a menu-based interface for todo operations.
    """
    service = TodoService()

    while True:
        print("\n" + "="*50)
        print("           INTERACTIVE TODO APPLICATION")
        print("="*50)
        print("1. Add a new todo")
        print("2. View all todos")
        print("3. Update a todo")
        print("4. Mark a todo as complete/incomplete")
        print("5. Delete a todo")
        print("6. Exit")
        print("-"*50)

        try:
            choice = input("Select an option (1-6): ").strip()

            if choice == "1":
                add_todo_interactive(service)
            elif choice == "2":
                view_todos_interactive(service)
            elif choice == "3":
                update_todo_interactive(service)
            elif choice == "4":
                mark_complete_interactive(service)
            elif choice == "5":
                delete_todo_interactive(service)
            elif choice == "6":
                print("\nThank you for using the Todo Application!")
                break
            else:
                print("\n[INVALID] Invalid option. Please select a number between 1-6.")

        except KeyboardInterrupt:
            print("\n\n[GOODBYE] Goodbye!")
            break
        except Exception as e:
            print(f"\n[ERROR] An error occurred: {e}")


def add_todo_interactive(service):
    """Interactive function to add a new todo."""
    print("\n[ADD] ADD A NEW TODO")
    print("-" * 20)

    title = input("Enter todo title: ").strip()
    if not title:
        print("[ERROR] Title cannot be empty!")
        return

    description = input("Enter description (optional, press Enter to skip): ").strip()

    todo = service.add_todo(title, description)
    print(f"[SUCCESS] Added: {todo}")


def view_todos_interactive(service):
    """Interactive function to view all todos."""
    print("\n[VIEW] ALL TODOS")
    print("-" * 20)

    todos = service.get_all_todos()
    if not todos:
        print("No todos found.")
    else:
        for todo in todos:
            print(f"  {todo}")
        print(f"\nTotal: {len(todos)} todo(s)")


def update_todo_interactive(service):
    """Interactive function to update a todo."""
    print("\n[EDIT] UPDATE A TODO")
    print("-" * 20)

    todos = service.get_all_todos()
    if not todos:
        print("No todos available to update.")
        return

    print("Current todos:")
    for todo in todos:
        print(f"  {todo}")

    try:
        todo_id = int(input("\nEnter the ID of the todo to update: "))
        todo = service.get_todo(todo_id)
        if not todo:
            print(f"[ERROR] No todo found with ID {todo_id}")
            return

        print(f"Current: {todo}")
        new_title = input(f"Enter new title (current: '{todo.title}', press Enter to keep current): ").strip()
        new_description = input(f"Enter new description (current: '{todo.description}', press Enter to keep current): ").strip()

        # Use current values if user pressed Enter
        update_title = new_title if new_title else None
        update_description = new_description if new_description else None

        success = service.update_todo(todo_id, update_title, update_description)
        if success:
            updated_todo = service.get_todo(todo_id)
            print(f"[SUCCESS] Updated: {updated_todo}")
        else:
            print(f"[ERROR] Failed to update todo with ID {todo_id}")

    except ValueError:
        print("[ERROR] Invalid ID. Please enter a number.")


def mark_complete_interactive(service):
    """Interactive function to mark a todo as complete/incomplete."""
    print("\n[MARK] MARK TODO AS COMPLETE/INCOMPLETE")
    print("-" * 40)

    todos = service.get_all_todos()
    if not todos:
        print("No todos available.")
        return

    print("Current todos:")
    for todo in todos:
        print(f"  {todo}")

    try:
        todo_id = int(input("\nEnter the ID of the todo to mark: "))
        todo = service.get_todo(todo_id)
        if not todo:
            print(f"[ERROR] No todo found with ID {todo_id}")
            return

        current_status = "completed" if todo.completed else "incomplete"
        new_status = "incomplete" if todo.completed else "completed"

        confirm = input(f"Mark todo {todo_id} as {new_status}? (y/n): ").lower().strip()
        if confirm in ['y', 'yes']:
            success = service.mark_complete(todo_id, not todo.completed)
            if success:
                updated_todo = service.get_todo(todo_id)
                print(f"[SUCCESS] Todo {todo_id} marked as {new_status}: {updated_todo}")
            else:
                print(f"[ERROR] Failed to update todo with ID {todo_id}")
        else:
            print("[CANCELLED] Operation cancelled.")

    except ValueError:
        print("[ERROR] Invalid ID. Please enter a number.")


def delete_todo_interactive(service):
    """Interactive function to delete a todo."""
    print("\n[DELETE] DELETE A TODO")
    print("-" * 20)

    todos = service.get_all_todos()
    if not todos:
        print("No todos available to delete.")
        return

    print("Current todos:")
    for todo in todos:
        print(f"  {todo}")

    try:
        todo_id = int(input("\nEnter the ID of the todo to delete: "))

        # Confirm deletion
        todo = service.get_todo(todo_id)
        if not todo:
            print(f"[ERROR] No todo found with ID {todo_id}")
            return

        confirm = input(f"Are you sure you want to delete todo '{todo.title}'? (y/n): ").lower().strip()
        if confirm in ['y', 'yes']:
            success = service.delete_todo(todo_id)
            if success:
                print(f"[SUCCESS] Todo {todo_id} deleted successfully.")
            else:
                print(f"[ERROR] Failed to delete todo with ID {todo_id}")
        else:
            print("[CANCELLED] Deletion cancelled.")

    except ValueError:
        print("[ERROR] Invalid ID. Please enter a number.")


if __name__ == "__main__":
    main()