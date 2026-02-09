# Quickstart Guide: Todo REST API and Database Layer

## Overview
This guide provides essential information to quickly understand and implement the Todo API with FastAPI, SQLModel, and Neon PostgreSQL.

## Prerequisites
- Python 3.11+ installed
- Neon Serverless PostgreSQL database provisioned
- Completed authentication feature (001-auth-jwt-security)

## Environment Setup

### Backend Environment Variables
```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname

# JWT Configuration (from auth feature)
JWT_SECRET_KEY=your-super-secret-jwt-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
```

## Key Components

### Backend Task Service
Located in `backend/src/services/task_service.py`, handles:
- Task creation, retrieval, updating, and deletion
- User-based task filtering for data isolation
- Input validation and error handling
- Database transaction management

### Task Models
Located in `backend/src/models/task.py`, defines:
- Task entity with all required fields
- Validation rules and constraints
- Relationship with User entity

### FastAPI Task Endpoints
Located in `backend/src/api/tasks.py`, implements:
- REST endpoints for task operations
- Authentication dependency injection
- Request/response validation

## API Endpoints

### Task Endpoints
- `GET /tasks` - Get all tasks for authenticated user
- `GET /tasks/{task_id}` - Get specific task by ID
- `POST /tasks` - Create a new task
- `PUT /tasks/{task_id}` - Update an existing task
- `DELETE /tasks/{task_id}` - Delete a task (soft delete)

## Testing the Task API

### Unit Tests
```bash
# Backend tests
cd backend
pytest tests/unit/test_task_service.py

# Integration tests
pytest tests/integration/test_task_api.py
```

### API Testing
```bash
# Create a new task (requires valid JWT token)
curl -X POST http://localhost:8000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{"title": "Complete project", "description": "Finish the todo app", "priority": 2}'

# Get all tasks for user
curl -X GET http://localhost:8000/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"

# Update a task
curl -X PUT http://localhost:8000/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{"title": "Updated task", "is_completed": true}'

# Delete a task
curl -X DELETE http://localhost:8000/tasks/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    priority INTEGER DEFAULT 3,
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id INTEGER NOT NULL REFERENCES users(id),
    is_deleted BOOLEAN DEFAULT FALSE
);
```

## Migration Commands

### Running Migrations
```bash
# Generate migration after model changes
alembic revision --autogenerate -m "Add task model"

# Apply pending migrations
alembic upgrade head

# Check current migration status
alembic current
```

## Security Considerations
- All endpoints require authentication
- Tasks are filtered by user_id to ensure data isolation
- Input validation prevents injection attacks
- Soft-delete prevents accidental data loss
- Proper error handling avoids exposing internal details