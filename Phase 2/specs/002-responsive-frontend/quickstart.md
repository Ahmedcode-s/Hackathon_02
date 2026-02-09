# Quickstart Guide: Responsive Next.js Frontend for Todo App

## Overview
This guide provides essential information to quickly understand and run the responsive Next.js frontend for the Todo application, including setup, authentication integration, and API connectivity.

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Access to the backend API server (FastAPI + SQLModel)
- Better Auth configured on the backend
- Understanding of JWT-based authentication flow

## Environment Setup

### Frontend Environment Variables
Create a `.env.local` file in the frontend root directory:

```bash
# Better Auth Configuration
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000  # Your frontend URL
NEXT_PUBLIC_BETTER_AUTH_COOKIE_DOMAIN=localhost   # Domain for auth cookies

# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000   # Your backend API URL
NEXT_PUBLIC_API_VERSION=v1                       # API version to use

# Application Configuration
NEXT_PUBLIC_APP_NAME="Todo App"
NEXT_PUBLIC_SENTRY_DSN=""                        # Optional: Sentry for error tracking
```

## Key Components

### Authentication Provider
Located in `frontend/src/components/auth/AuthProvider.tsx`, provides:
- Global authentication state management
- Context for auth status across the app
- Protected route handling
- Token refresh and session management

### API Client Service
Located in `frontend/src/services/api-client.ts`, handles:
- JWT token attachment to requests
- Request/response interceptors
- Error handling and retry logic
- Base URL configuration

### Task Management Components
Located in `frontend/src/components/tasks/`, includes:
- TaskList: Displays user's tasks with filtering
- TaskCard: Individual task display and interaction
- TaskForm: Creation and editing of tasks
- TaskFilter: Filtering and sorting controls

## Running the Application

### Installation
```bash
cd frontend
npm install
# or
yarn install
```

### Development Server
```bash
npm run dev
# or
yarn dev
```

Application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## API Integration

### Task API Endpoints
- `GET /api/v1/tasks` - Get all user tasks
- `POST /api/v1/tasks` - Create a new task
- `GET /api/v1/tasks/{task_id}` - Get specific task
- `PUT /api/v1/tasks/{task_id}` - Update a task
- `DELETE /api/v1/tasks/{task_id}` - Delete a task

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/logout` - User logout

## Testing the Frontend

### Unit Tests
```bash
npm test
# or
yarn test
```

### Component Tests
```bash
# Using React Testing Library
npm run test:components
# or
yarn test:components
```

### End-to-End Tests
```bash
# Using Playwright or Cypress
npm run test:e2e
# or
yarn test:e2e
```

## Common Operations

### Register a New User
1. Navigate to `/signup` page
2. Fill in registration form
3. Submit and verify account

### Login to the Application
1. Navigate to `/login` page
2. Enter credentials
3. JWT token will be stored securely
4. Redirected to dashboard

### Create a Task
1. Navigate to dashboard or task creation page
2. Fill in task details
3. Submit form
4. Task appears in the task list

### Update a Task
1. Click on a task to edit
2. Modify task properties
3. Save changes
4. UI updates to reflect changes

### Delete a Task
1. Select task to delete
2. Click delete button
3. Confirm deletion
4. Task is removed from UI and backend

## Responsive Design

### Breakpoints
- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`

### Responsive Features
- Collapsible navigation on mobile
- Grid/list view toggle for tasks
- Touch-friendly controls
- Adaptive form layouts

## Security Considerations
- JWT tokens stored in httpOnly cookies where possible
- Proper CORS configuration for API communication
- Input sanitization and validation
- Protection against CSRF attacks
- Secure authentication state management