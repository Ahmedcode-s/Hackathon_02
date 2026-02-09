# Data Model: Frontend State and UI Components for Todo App

## User Session Entity

**Description**: Represents the authenticated state of a user with their session data

**Fields**:
- `user_id` (string/number): Unique identifier for the authenticated user
- `email` (string): User's email address
- `access_token` (string): JWT access token for API authentication
- `refresh_token` (string): JWT refresh token (if applicable)
- `is_authenticated` (boolean): Authentication status
- `expires_at` (Date): Token expiration timestamp
- `roles` (array): User roles/permissions (if applicable)

**Validation Rules**:
- `access_token` must be present when authenticated
- `expires_at` must be in the future for valid tokens
- `user_id` and `email` must match token claims

**State Transitions**:
- `unauthenticated` → `authenticating`: User initiates login process
- `authenticating` → `authenticated`: Successful authentication
- `authenticated` → `expired`: Token expiration
- `authenticated` → `unauthenticated`: User logout

## Task Entity (Frontend Representation)

**Description**: Represents a single todo item as managed in the frontend state

**Fields**:
- `id` (number/string): Unique identifier for the task
- `title` (string): Task title or subject
- `description` (string): Detailed description of the task
- `is_completed` (boolean): Completion status
- `priority` (number): Priority level (1-5)
- `due_date` (Date/string): Deadline for the task
- `created_at` (Date/string): Creation timestamp
- `updated_at` (Date/string): Last update timestamp
- `user_id` (number/string): Owner of the task

**Validation Rules**:
- `title` must not be empty
- `priority` must be between 1 and 5
- `due_date` should be a valid date if provided
- `user_id` must match the authenticated user

**State Transitions**:
- `pending` → `in_progress`: When user starts working on task
- `in_progress` → `completed`: When user marks task as complete
- `completed` → `pending`: When user unmarks completion
- `any_state` → `deleted`: When user deletes the task

## Task List Entity

**Description**: Collection of tasks belonging to an authenticated user

**Fields**:
- `tasks` (array[Task]): Array of task objects
- `filtered_tasks` (array[Task]): Subset based on filters applied
- `total_count` (number): Total number of tasks
- `completed_count` (number): Number of completed tasks
- `filter_options` (object): Current filtering/sorting options

**Validation Rules**:
- All tasks must belong to the authenticated user
- Filter options must be valid values
- Tasks array should not contain duplicates

## Authentication State Entity

**Description**: Container for user authentication status, token management, and session persistence

**Fields**:
- `isLoading` (boolean): Whether authentication status is being determined
- `user` (UserSession): Current user session data
- `error` (string/object): Any authentication errors
- `isLoggedIn` (boolean): Shorthand for authentication status
- `tokenRefreshNeeded` (boolean): Whether token refresh is required

**Validation Rules**:
- If `isLoading` is true, other states might be temporarily inconsistent
- If `error` exists, `isLoggedIn` should be false
- `user` object should be present when `isLoggedIn` is true

## UI Component State Entities

### Task Form State
**Fields**:
- `formData` (object): Current form field values
- `errors` (object): Validation errors for each field
- `isSubmitting` (boolean): Whether form is being submitted
- `successMessage` (string): Success message after submission

### Filter State
**Fields**:
- `statusFilter` (string): Filter by completion status (all, completed, pending)
- `priorityFilter` (number): Filter by priority level
- `searchQuery` (string): Search term for filtering
- `sortBy` (string): Sorting option (date, priority, title)

### Loading State
**Fields**:
- `tasksLoading` (boolean): Whether tasks are being fetched
- `taskUpdating` (number[]): IDs of tasks currently being updated
- `taskDeleting` (number[]): IDs of tasks currently being deleted
- `globalLoading` (boolean): Whether a global loading state should be shown

## Page State Entities

### Dashboard Page State
**Fields**:
- `activeTab` (string): Currently selected dashboard tab
- `showCreateModal` (boolean): Whether task creation modal is open
- `selectedTaskId` (number): ID of currently selected task
- `stats` (object): Various task statistics and counts

### Authentication Page State
**Fields**:
- `currentView` (string): Login or signup view
- `rememberMe` (boolean): Whether to persist session across browser sessions
- `forgotPasswordMode` (boolean): Whether password reset form is shown
- `redirectUrl` (string): URL to redirect after authentication

## Navigation State Entity

**Description**: Tracks current location and navigation state

**Fields**:
- `currentPath` (string): Current URL path
- `navigationHistory` (array): Previous navigation paths
- `mobileMenuOpen` (boolean): Whether mobile navigation menu is open
- `breadcrumb` (array): Navigation breadcrumbs for current page