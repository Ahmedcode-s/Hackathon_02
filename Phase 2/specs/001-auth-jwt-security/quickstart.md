# Quickstart Guide: Authentication and JWT Security

## Overview
This guide provides essential information to quickly understand and implement the authentication system for the multi-user Todo application.

## Prerequisites
- Python 3.11+ installed
- Node.js 18+ installed
- Next.js 16+ configured
- Neon Serverless PostgreSQL database provisioned
- Better Auth configured in the Next.js frontend

## Environment Setup

### Backend Environment Variables
```bash
# JWT Configuration
JWT_SECRET_KEY=your-super-secret-jwt-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_HOURS=24

# Database Configuration
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname
```

### Frontend Environment Variables
```bash
# Better Auth Configuration
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_SECRET=your-better-auth-secret
```

## Key Components

### Backend Authentication Service
Located in `backend/src/services/auth.py`, handles:
- User registration and credential validation
- JWT token generation and verification
- User session management
- Password hashing and verification

### Frontend Authentication Provider
Located in `frontend/src/components/auth/AuthProvider.tsx`, provides:
- Context for authentication state
- Login/logout functionality
- Token management and storage
- Protected route handling

### FastAPI Middleware
Located in `backend/src/api/middleware.py`, implements:
- JWT token verification on protected endpoints
- User identity extraction from tokens
- Request authentication enforcement

## API Endpoints

### Authentication Endpoints
- `POST /auth/signup` - Register a new user
- `POST /auth/signin` - Authenticate existing user
- `POST /auth/refresh` - Refresh expired access token
- `POST /auth/logout` - Invalidate current session

### Protected Endpoints
All user-specific endpoints require authentication:
- `GET /users/me` - Get current user info
- `GET /todos` - Get current user's todos
- `POST /todos` - Create new todo for current user
- `PUT /todos/{id}` - Update current user's todo
- `DELETE /todos/{id}` - Delete current user's todo

## Testing the Authentication Flow

### Unit Tests
```bash
# Backend tests
cd backend
pytest tests/unit/test_auth.py

# Frontend tests
cd frontend
npm test
```

### Integration Tests
```bash
# Test complete auth flow
cd backend
pytest tests/integration/test_auth_endpoints.py
```

## Common Operations

### Register a New User
```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securePassword123"}'
```

### Authenticate a User
```bash
curl -X POST http://localhost:8000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securePassword123"}'
```

### Access Protected Resource
```bash
curl -X GET http://localhost:8000/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Security Considerations
- Never expose JWT secrets in client-side code
- Use https in production to prevent token interception
- Implement proper rate limiting on auth endpoints
- Sanitize and validate all user inputs
- Regularly rotate JWT secrets in production