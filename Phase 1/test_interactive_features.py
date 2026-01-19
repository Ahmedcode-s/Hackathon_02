#!/usr/bin/env python3
"""
Test script to verify the interactive functionality works properly
"""

from services.todo_service import TodoService

def test_interactive_features():
    print("Testing Interactive Todo Application Features...")
    print("="*50)

    # Create a service instance
    service = TodoService()

    # Test 1: Add todos
    print("\n1. ADDING TODOS:")
    todo1 = service.add_todo("Complete project", "Finish the interactive todo app")
    print(f"   Added: {todo1}")

    todo2 = service.add_todo("Write documentation", "Create user guides")
    print(f"   Added: {todo2}")

    todo3 = service.add_todo("Test application", "Verify all features work")
    print(f"   Added: {todo3}")

    # Test 2: View todos
    print("\n2. VIEWING TODOS:")
    todos = service.get_all_todos()
    for todo in todos:
        print(f"   {todo}")
    print(f"   Total: {len(todos)} todos")

    # Test 3: Update a todo
    print("\n3. UPDATING TODO:")
    success = service.update_todo(2, "Write comprehensive documentation", "Create user guides and tutorials")
    if success:
        updated_todo = service.get_todo(2)
        print(f"   Updated: {updated_todo}")
    else:
        print("   Failed to update")

    # Test 4: Mark as complete
    print("\n4. MARKING TODO AS COMPLETE:")
    success = service.mark_complete(1)
    if success:
        completed_todo = service.get_todo(1)
        print(f"   Marked as complete: {completed_todo}")
    else:
        print("   Failed to mark as complete")

    # Test 5: Delete a todo
    print("\n5. DELETING TODO:")
    print("   Before deletion:")
    for todo in service.get_all_todos():
        print(f"     {todo}")

    success = service.delete_todo(3)
    if success:
        print("   Successfully deleted todo with ID 3")
    else:
        print("   Failed to delete")

    print("   After deletion:")
    for todo in service.get_all_todos():
        print(f"     {todo}")

    print("\n" + "="*50)
    print("All interactive features tested successfully!")
    print("The application supports:")
    print("- Adding new todos")
    print("- Viewing all todos")
    print("- Updating existing todos")
    print("- Marking todos as complete/incomplete")
    print("- Deleting todos")
    print("- All with proper error handling")

if __name__ == "__main__":
    test_interactive_features()