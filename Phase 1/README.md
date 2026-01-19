# AI-Native Todo System - Phase I: In-Memory Console App

This is the first phase of the AI-Native Todo System project. It implements a clean, in-memory Python CLI Todo application following the structured approach: Spec → Plan → Tasks → Implementation.

## Features

- **Add**: Add new todo items with title and optional description
- **Delete**: Remove todo items by ID
- **Update**: Modify existing todo items
- **View**: Display all todo items with completion status
- **Mark Complete**: Mark todo items as completed/incomplete

## Architecture

The application follows a clean, modular structure:

- `models/` - Contains data models (Todo class)
- `services/` - Contains business logic (TodoService)
- `cli/` - Contains command-line interface code

## Requirements

- Python 3.13+
- UV package manager

## Installation

1. Install UV package manager: `pip install uv`
2. Install dependencies: `uv sync`
3. Run the application: `uv run cli/main.py`

## Usage

The application now features an interactive menu-based interface:

```bash
python cli/main.py
```

The interactive menu provides these options:
1. Add a new todo
2. View all todos
3. Update a todo
4. Mark a todo as complete/incomplete
5. Delete a todo
6. Exit

Alternatively, you can still use the command-line interface (though it's designed for single executions):
```bash
# Add a new todo
python cli/main.py add "Buy groceries" "Milk, eggs, bread"

# View all todos
python cli/main.py view

# Update a todo (ID 1)
python cli/main.py update 1 "Updated title" "Updated description"

# Mark a todo as complete (ID 1)
python cli/main.py complete 1

# Delete a todo (ID 1)
python cli/main.py delete 1

# Show help
python cli/main.py help
```

## Design Principles

- In-memory only (no files, no database) - data resets between executions
- Command-line interface only
- Clean, modular structure
- Readable, well-named functions and variables
- Error-free operation in fresh environments
- All operations work correctly within the same execution context