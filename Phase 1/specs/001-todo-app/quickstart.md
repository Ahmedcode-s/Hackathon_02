# Quickstart Guide: Todo App

## Prerequisites
- Python 3.13+
- UV package manager

## Setup
1. Clone the repository
2. Install dependencies: `uv sync`
3. Activate the virtual environment: `uv venv` (optional)

## Usage

### Add a new todo
```bash
uv run cli/main.py add "Buy groceries" "Milk, eggs, bread"
```

### View all todos
```bash
uv run cli/main.py view
```

### Update an existing todo
```bash
uv run cli/main.py update 1 "Updated title" "Updated description"
```

### Mark a todo as complete
```bash
uv run cli/main.py complete 1
```

### Delete a todo
```bash
uv run cli/main.py delete 1
```

### Show help
```bash
uv run cli/main.py help
```

## Development
- Models: Located in `models/` directory
- Services: Located in `services/` directory
- CLI: Located in `cli/` directory
- Tests: Located in `tests/` directory (coming in future iteration)

## Troubleshooting
- If you get "command not found" errors, ensure you're running from the project root
- If the app crashes, check that all required arguments are provided
- For malformed input, the app will display helpful error messages