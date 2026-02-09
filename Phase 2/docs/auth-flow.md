# Authentication Flow Documentation

## Overview
This document describes the authentication flow implemented in the Todo App, which uses JWT-based authentication with Better Auth principles.

## Architecture
The authentication system follows a stateless JWT approach with the following components:

### Backend Components
- **Models**: User, AuthRequest, AuthResponse models
- **Services**: AuthService for user registration/authentication, UserService for user data operations
- **API Routes**: `/auth/signup`, `/auth/signin`, `/auth/logout`, `/users/me`
- **Middleware**: JWT verification middleware for protected routes
- **Utilities**: JWT utilities for token creation/verification, password hashing

### Frontend Components
- **Auth Forms**: SignupForm and LoginForm components
- **Auth Service**: Centralized authService for API calls
- **Context Provider**: AuthProvider for global authentication state
- **Protected Routes**: ProtectedRoute component for route guarding
- **Hooks**: useAuth hook for accessing auth context

## Authentication Flow

### User Registration
1. User fills in email and password in SignupForm
2. Frontend sends request to `/auth/signup` endpoint
3. Backend validates input and checks for existing user
4. If valid, creates new user with hashed password
5. Generates JWT access token
6. Returns AuthResponse with token and user info
7. Frontend stores token in localStorage

### User Login
1. User fills in email and password in LoginForm
2. Frontend sends request to `/auth/signin` endpoint
3. Backend validates credentials against stored hash
4. If valid, generates JWT access token
5. Returns AuthResponse with token and user info
6. Frontend stores token in localStorage

### Protected Route Access
1. User navigates to protected route
2. ProtectedRoute checks for valid token
3. If token exists and is valid, renders child components
4. If token missing/invalid/expired, redirects to login

### API Call with Authentication
1. Frontend includes Authorization header: `Bearer {token}`
2. Backend middleware verifies JWT
3. If valid, extracts user information from token
4. Proceeds with request processing
5. If invalid, returns 401 Unauthorized

## Security Features
- Passwords are hashed using bcrypt
- JWT tokens are signed with HS256 algorithm
- Tokens expire after 15 minutes (configurable)
- Users can only access their own data
- All sensitive operations are protected by authentication

## Configuration
Environment variables required:
- `JWT_SECRET_KEY`: Secret key for signing JWT tokens
- `JWT_ALGORITHM`: Algorithm for JWT signing (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time (default: 15 minutes)
- `DATABASE_URL`: Database connection string