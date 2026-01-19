#!/usr/bin/env python3
"""
Demo script showing the usage of the CLI app
"""

import subprocess
import sys

def run_command(cmd):
    """Run a command and return the output"""
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    print(f"$ {' '.join(cmd) if isinstance(cmd, list) else cmd}")
    print(result.stdout.strip())
    if result.stderr:
        print("STDERR:", result.stderr.strip())
    print()

def demo():
    print("TODO CLI APPLICATION DEMO")
    print("=" * 40)
    print()

    print("1. Show help information:")
    run_command(["python", "cli/main.py", "help"])

    print("2. Add a new todo:")
    run_command(["python", "cli/main.py", "add", "Learn Python", "Complete the Python tutorial"])

    print("3. Add another todo:")
    run_command(["python", "cli/main.py", "add", "Buy groceries"])

    print("4. View all todos:")
    run_command(["python", "cli/main.py", "view"])

    print("5. Mark a todo as complete:")
    run_command(["python", "cli/main.py", "complete", "1"])

    print("6. Update a todo:")
    run_command(["python", "cli/main.py", "update", "2", "Buy groceries for dinner", "Milk, eggs, vegetables, fruits"])

    print("7. View all todos again:")
    run_command(["python", "cli/main.py", "view"])

    print("8. Delete a todo:")
    run_command(["python", "cli/main.py", "delete", "1"])

    print("9. View all todos after deletion:")
    run_command(["python", "cli/main.py", "view"])

if __name__ == "__main__":
    demo()