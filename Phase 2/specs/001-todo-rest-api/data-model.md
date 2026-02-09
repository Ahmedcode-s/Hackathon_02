# Data Model: Todo REST API and Database Layer

## Task Entity

**Description**: Represents a single todo task in the system

**Fields**:
- `id` (Integer): Unique identifier for the task (primary key, auto-incremented)
- `title` (String): Task title or description (required, max 255 chars)
- `description` (String): Detailed description of the task (optional, text field)
- `is_completed` (Boolean): Task completion status (default: false)
- `priority` (Integer): Task priority level (1-5, default: 3)
- `due_date` (DateTime): Optional deadline for the task (nullable)
- `created_at` (DateTime): Timestamp of task creation (auto-set)
- `updated_at` (DateTime): Timestamp of last update (auto-updated)
- `user_id` (Integer): Foreign key reference to the user who owns the task
- `is_deleted` (Boolean): Soft delete flag (default: false)

**Validation Rules**:
- Title must not be empty (length > 0)
- Priority must be between 1 and 5
- Due date cannot be in the past (if validation is required)
- User ID must reference an existing user
- Task must belong to the authenticated user for access

**Relationships**:
- Many-to-one relationship with User entity (many tasks per user)
- User can have many tasks
- Tasks are filtered by user_id for data isolation

## User Entity Reference

**Description**: User entity referenced from the authentication feature (001-auth-jwt-security)

**Relevant Fields**:
- `id` (Integer): Unique user identifier (primary key)
- `email` (String): User's email address (unique)
- `created_at` (DateTime): Account creation timestamp

**Relationships**:
- One-to-many relationship with Task entity (one user to many tasks)

## Task Request Models

### CreateTask Request
**Fields**:
- `title` (String): Task title (required)
- `description` (String): Task description (optional)
- `priority` (Integer): Task priority level (optional, default: 3)
- `due_date` (String): Task deadline in ISO format (optional)

### UpdateTask Request
**Fields**:
- `title` (String): Task title (optional)
- `description` (String): Task description (optional)
- `is_completed` (Boolean): Task completion status (optional)
- `priority` (Integer): Task priority level (optional)
- `due_date` (String): Task deadline in ISO format (optional)

## Task Response Models

### Task Response
**Fields**:
- `id` (Integer): Task identifier
- `title` (String): Task title
- `description` (String): Task description
- `is_completed` (Boolean): Completion status
- `priority` (Integer): Priority level
- `due_date` (String): Deadline in ISO format (nullable)
- `created_at` (String): Creation timestamp in ISO format
- `updated_at` (String): Last update timestamp in ISO format
- `user_id` (Integer): Owner's user ID (included for reference but filtered by auth)

### TaskList Response
**Fields**:
- `tasks` (Array[TaskResponse]): List of tasks for the authenticated user
- `total_count` (Integer): Total number of tasks for the user
- `completed_count` (Integer): Number of completed tasks

## State Transitions

### Task States
- `pending`: Task created but not yet started
- `in_progress`: Task is being worked on (if applicable)
- `completed`: Task marked as complete (is_completed = true)
- `deleted`: Task soft-deleted (is_deleted = true, hidden from normal queries)

### Task State Transitions
- `pending` → `in_progress`: When user starts working on task
- `in_progress` → `completed`: When user marks task as complete
- `completed` → `pending`: When user unmarks completion
- Any state → `deleted`: When user deletes the task (soft delete)