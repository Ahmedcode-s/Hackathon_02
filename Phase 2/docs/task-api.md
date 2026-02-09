# Todo Task API Documentation

## Overview
This document describes the Todo Task API, which provides REST endpoints for managing todo tasks with user isolation. The API is built with FastAPI and uses SQLModel for database operations with Neon PostgreSQL.

## Architecture
The API follows a service-oriented architecture with clear separation of concerns:
- **API Layer**: FastAPI endpoints in `backend/src/api/tasks.py`
- **Service Layer**: Business logic in `backend/src/services/task_service.py`
- **Model Layer**: Data models in `backend/src/models/task.py`
- **Database Layer**: Neon PostgreSQL with SQLModel ORM

## Authentication
All endpoints require authentication via JWT tokens. The API expects a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## API Endpoints

### Create Task
- **Endpoint**: `POST /tasks`
- **Description**: Creates a new task for the authenticated user
- **Request Body**:
  - `title` (string, required): Task title
  - `description` (string, optional): Task description
  - `priority` (integer, optional): Priority level 1-5 (default: 3)
  - `due_date` (string, optional): Due date in ISO format
- **Response**: Task object with 201 status code
- **Authentication**: Required

### Get All Tasks
- **Endpoint**: `GET /tasks`
- **Description**: Retrieves all tasks for the authenticated user
- **Query Parameters**:
  - `skip` (integer, optional): Number of tasks to skip (default: 0)
  - `limit` (integer, optional): Maximum number of tasks to return (default: 100)
- **Response**: TaskListResponse object with 200 status code
- **Authentication**: Required

### Get Specific Task
- **Endpoint**: `GET /tasks/{task_id}`
- **Description**: Retrieves a specific task by ID
- **Path Parameter**: `task_id` (integer): Task identifier
- **Response**: Task object with 200 status code
- **Authentication**: Required

### Update Task
- **Endpoint**: `PUT /tasks/{task_id}`
- **Description**: Updates a specific task
- **Path Parameter**: `task_id` (integer): Task identifier
- **Request Body** (partial updates):
  - `title` (string, optional): New task title
  - `description` (string, optional): New task description
  - `is_completed` (boolean, optional): Completion status
  - `priority` (integer, optional): New priority level
  - `due_date` (string, optional): New due date
- **Response**: Updated Task object with 200 status code
- **Authentication**: Required

### Delete Task
- **Endpoint**: `DELETE /tasks/{task_id}`
- **Description**: Soft deletes a specific task
- **Path Parameter**: `task_id` (integer): Task identifier
- **Response**: Success message with 200 status code
- **Authentication**: Required

## Data Models

### Task
- `id` (integer): Unique identifier
- `title` (string): Task title (required, 1-255 chars)
- `description` (string): Task description (optional, max 1000 chars)
- `is_completed` (boolean): Completion status (default: false)
- `priority` (integer): Priority level (1-5, default: 3)
- `due_date` (datetime): Due date (optional)
- `created_at` (datetime): Creation timestamp
- `updated_at` (datetime): Last update timestamp
- `user_id` (integer): Associated user identifier
- `is_deleted` (boolean): Soft delete flag (default: false)

### TaskListResponse
- `tasks` (array[Task]): List of tasks
- `total_count` (integer): Total number of tasks
- `completed_count` (integer): Number of completed tasks

## Security Features
- User isolation: Users can only access their own tasks
- JWT-based authentication for all endpoints
- Input validation for all request parameters
- Soft delete to prevent accidental data loss
- Proper error handling with appropriate HTTP status codes

## Database Schema
The API uses a single `tasks` table with the following columns:
- `id`: Primary key (auto-incrementing integer)
- `title`: Task title (varchar, 255 char limit)
- `description`: Task description (text field)
- `is_completed`: Boolean flag for completion status
- `priority`: Integer (1-5 scale)
- `due_date`: Nullable datetime field
- `created_at`: Timestamp (auto-populated)
- `updated_at`: Timestamp (auto-updated)
- `user_id`: Foreign key reference to user
- `is_deleted`: Boolean flag for soft deletion

## Error Handling
The API returns appropriate HTTP status codes:
- 200: Successful GET, PUT, DELETE operations
- 201: Successful POST operation
- 400: Bad request (validation error)
- 401: Unauthorized (invalid/missing token)
- 403: Forbidden (user not authorized for resource)
- 404: Not found (resource doesn't exist)
- 500: Internal server error