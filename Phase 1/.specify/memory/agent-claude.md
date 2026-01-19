# AI-Native Todo System Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-01-16

## Active Technologies

- Python 3.13+
- UV package manager
- Standard library (no external dependencies for Phase I)
- pytest for testing

## Project Structure

```text
.
├── models/
│   └── todo.py          # Todo data model
├── services/
│   └── todo_service.py  # Business logic and in-memory operations
├── cli/
│   └── main.py          # Command-line interface
├── specs/
│   └── 001-todo-app/    # Feature specifications
│       ├── spec.md
│       ├── plan.md
│       ├── research.md
│       ├── data-model.md
│       ├── quickstart.md
│       └── contracts/
├── pyproject.toml       # UV project configuration
├── README.md
└── history/
    └── prompts/         # Prompt history records
```

## Commands

- `uv run cli/main.py <command>` - Execute the CLI application
- `uv sync` - Install project dependencies
- `uv run` - Run the project in development mode

## Code Style

- Use Python 3.13+ type hints for all public functions
- Follow PEP 8 style guidelines
- Use clear, descriptive variable and function names
- Separate concerns with clear module boundaries (models, services, cli)
- Write docstrings for all classes and functions
- Handle errors gracefully with informative messages

## Recent Changes

- Phase I: In-Memory Console App - Basic CLI todo application with Add, Delete, Update, View, and Mark Complete functionality

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->