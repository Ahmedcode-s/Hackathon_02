# Data Model: Todo App

## Entities

### Todo
Represents a single todo item with the following attributes:

- **id** (int): Unique sequential identifier for the todo item
- **title** (str): The main text/title of the todo item
- **description** (str): Optional detailed description of the todo item
- **completed** (bool): Boolean indicating whether the todo is completed

#### Validation Rules
- `id` must be a positive integer
- `title` must not be empty
- `completed` must be a boolean value

#### State Transitions
- `incomplete` → `completed`: When user marks todo as complete
- `completed` → `incomplete`: When user marks todo as incomplete

### TodoList
Collection of Todo objects managed by the application:

- **todos** (List[Todo]): List of all todo items in the system
- **next_id** (int): Counter for assigning unique IDs to new todos

## Relationships
- TodoList contains multiple Todo items
- Each Todo belongs to exactly one TodoList (in memory)

## Constraints
- Each Todo must have a unique `id` within the TodoList
- IDs are assigned sequentially starting from 1
- Deleted Todo items are permanently removed from the list