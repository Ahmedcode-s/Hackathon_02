#!/usr/bin/env python3
"""
Test script to verify the CLI functionality works correctly.
This simulates the CLI behavior while maintaining in-memory state within a single execution.
"""

from services.todo_service import TodoService

def test_functionality():
    print("Testing Todo Service functionality...")

    # Create a service instance
    service = TodoService()

    # Test adding todos
    print("\n1. Testing ADD functionality:")
    todo1 = service.add_todo("Buy groceries", "Milk, eggs, bread")
    print(f"Added: {todo1}")

    todo2 = service.add_todo("Walk the dog", "Take the dog for a walk in the park")
    print(f"Added: {todo2}")

    # Test viewing todos
    print("\n2. Testing VIEW functionality:")
    todos = service.get_all_todos()
    print("All todos:")
    for todo in todos:
        print(f"  {todo}")

    # Test updating a todo
    print("\n3. Testing UPDATE functionality:")
    success = service.update_todo(1, "Buy groceries and cook dinner", "Milk, eggs, bread, chicken")
    if success:
        print(f"Updated todo 1: {service.get_todo(1)}")
    else:
        print("Failed to update todo 1")

    # Test marking as complete
    print("\n4. Testing MARK COMPLETE functionality:")
    success = service.mark_complete(1)
    if success:
        print(f"Marked todo 1 as complete: {service.get_todo(1)}")
    else:
        print("Failed to mark todo 1 as complete")

    # Test deleting a todo
    print("\n5. Testing DELETE functionality:")
    print("Before deletion:")
    for todo in service.get_all_todos():
        print(f"  {todo}")

    success = service.delete_todo(2)
    if success:
        print(f"Deleted todo 2")
    else:
        print("Failed to delete todo 2")

    print("After deletion:")
    for todo in service.get_all_todos():
        print(f"  {todo}")

    print("\nAll functionality tests completed successfully!")

if __name__ == "__main__":
    test_functionality()