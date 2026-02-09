# Data Model: Authentication and JWT Security

## User Entity

**Description**: Represents a registered user in the system

**Fields**:
- `id` (Integer/UUID): Unique identifier for the user
- `email` (String): User's email address (unique, validated)
- `password_hash` (String): Hashed password using secure algorithm (bcrypt)
- `created_at` (DateTime): Timestamp of account creation
- `updated_at` (DateTime): Timestamp of last account update
- `is_active` (Boolean): Account status (active/inactive)

**Validation Rules**:
- Email must be unique and follow standard email format
- Password must meet minimum strength requirements
- Email cannot be empty
- User ID is immutable after creation

**Relationships**:
- One-to-many relationship with user-specific data (todo items, etc.)

## JWT Token Structure

**Description**: JSON Web Token containing user authentication information

**Payload Fields**:
- `sub` (Subject): User ID as the token subject
- `exp` (Expiration): Unix timestamp of token expiration
- `iat` (Issued At): Unix timestamp of token creation
- `jti` (JWT ID): Unique identifier for the token (optional, for revocation)
- `email` (Email): User's email for verification (optional)

**Validation Rules**:
- Token must not be expired at the time of verification
- Signature must match the shared secret
- Subject (user ID) must correspond to an active user

## Authentication Request Models

### Signup Request
**Fields**:
- `email` (String): User's email address
- `password` (String): User's password (minimum length requirement)

### Signin Request
**Fields**:
- `email` (String): User's email address
- `password` (String): User's password

### Signin Response
**Fields**:
- `access_token` (String): JWT access token
- `token_type` (String): Token type (usually "bearer")
- `expires_in` (Integer): Seconds until token expiration
- `user_id` (Integer/UUID): The authenticated user's ID
- `email` (String): User's email

## User Session Context

**Description**: Runtime context containing authenticated user information

**Fields**:
- `user_id` (Integer/UUID): Current user's unique identifier
- `email` (String): Current user's email
- `is_authenticated` (Boolean): Whether user is currently authenticated
- `permissions` (List): List of user permissions (basic for this implementation)

## State Transitions

### User Account States
- `pending`: Account created but not yet activated (if activation required)
- `active`: Account is active and user can authenticate
- `inactive`: Account is deactivated (temporarily)
- `suspended`: Account suspended (administratively)

### Authentication States
- `unauthenticated`: User not logged in
- `authenticating`: User credentials being verified
- `authenticated`: User successfully authenticated
- `expired`: User's session/token has expired
- `unauthorized`: User attempted access without proper credentials