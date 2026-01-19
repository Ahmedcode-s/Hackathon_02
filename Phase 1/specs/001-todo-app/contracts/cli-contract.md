# CLI Contract: Todo App

## Command Structure
The application accepts commands in the format: `python cli/main.py <command> [arguments]`

## Available Commands

### ADD Command
**Syntax**: `add <title> [description]`
**Description**: Creates a new todo item with the specified title and optional description
**Arguments**:
- `title` (required): The title of the new todo item
- `description` (optional): Additional details about the todo item
**Returns**: Confirmation message with the new todo's ID and details
**Errors**: Invalid arguments, missing title

### DELETE Command
**Syntax**: `delete <id>`
**Description**: Removes the todo item with the specified ID
**Arguments**:
- `id` (required): The numeric ID of the todo item to delete
**Returns**: Success confirmation or error message if ID not found
**Errors**: Invalid ID format, non-existent ID

### UPDATE Command
**Syntax**: `update <id> <title> [description]`
**Description**: Updates the title and/or description of an existing todo item
**Arguments**:
- `id` (required): The numeric ID of the todo item to update
- `title` (required): The new title for the todo item
- `description` (optional): The new description for the todo item
**Returns**: Success confirmation or error message if ID not found
**Errors**: Invalid ID format, non-existent ID, missing title

### VIEW Command
**Syntax**: `view`
**Description**: Displays all existing todo items with their completion status
**Arguments**: None
**Returns**: List of all todos with their IDs, titles, and completion status
**Errors**: None (displays message if no todos exist)

### COMPLETE Command
**Syntax**: `complete <id>`
**Description**: Marks the specified todo item as complete
**Arguments**:
- `id` (required): The numeric ID of the todo item to mark complete
**Returns**: Success confirmation or error message if ID not found
**Errors**: Invalid ID format, non-existent ID

### HELP Command
**Syntax**: `help`
**Description**: Displays usage information for all commands
**Arguments**: None
**Returns**: Help text with command usage information
**Errors**: None

## Data Format
- Todo IDs are sequential positive integers
- Completion status is indicated by ✓ (complete) or ○ (incomplete)
- All text fields support UTF-8 characters

## Error Handling
- Invalid commands return a helpful error message and usage information
- Non-existent IDs return a specific error message
- Missing required arguments return a usage reminder