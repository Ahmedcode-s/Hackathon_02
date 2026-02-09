# Research: Authentication and JWT Security Implementation

## Decision 1: JWT vs Session Authentication

### Decision:
Use JWT (JSON Web Tokens) for stateless authentication

### Rationale:
- Aligns with the constraint of "stateless authentication only"
- Enables horizontal scaling without shared session storage
- Better for microservices architecture
- Reduces server memory usage compared to server-side sessions
- Matches the requirement to use Better Auth JWT plugin

### Alternatives considered:
- Server-side sessions: Requires shared session storage, doesn't meet "stateless" requirement
- OAuth tokens: More complex, not needed for basic authentication
- Cookie-based sessions: Still requires server-side state management

## Decision 2: Middleware vs Dependency-Based Auth Enforcement

### Decision:
Use FastAPI dependency injection with JWT verification for auth enforcement

### Rationale:
- Leverages FastAPI's built-in dependency injection system
- Allows for flexible authentication requirements per endpoint
- Maintains clean separation of concerns
- Enables easy testing and mocking of authentication
- Follows FastAPI best practices

### Alternatives considered:
- Global middleware: Less flexible, harder to selectively apply
- Decorator pattern: More complex to implement and maintain
- Manual verification in each endpoint: Repetitive and error-prone

## Decision 3: Token Expiry Duration

### Decision:
Set JWT token expiry to 15 minutes for access tokens with refresh token mechanism (24 hours)

### Rationale:
- Short access token lifetime reduces security risk if compromised
- Refresh tokens allow seamless user experience
- Balances security (short-lived tokens) with usability (refresh mechanism)
- Industry standard practice for web applications

### Alternatives considered:
- Longer tokens (hours/days): More convenient but higher security risk
- Session-length tokens: Difficult to define appropriate session length
- No expiry: Significant security vulnerability

## Decision 4: Shared Secret Management

### Decision:
Store JWT secret in environment variables with fallback to .env file

### Rationale:
- Aligns with the constraint "shared secret via environment variable"
- Environment variables are standard for configuration in production
- Keeps secrets out of source code
- Easy to rotate secrets without code changes
- Compatible with containerized deployments

### Alternatives considered:
- Hardcoded in source: Major security vulnerability
- Secret manager: Overkill for this project scope, adds complexity
- Encrypted files: Adds complexity without significant benefit

## Decision 5: Client Token Storage Method

### Decision:
Use httpOnly cookies for JWT storage with SameSite protection

### Rationale:
- httpOnly cookies prevent XSS attacks from accessing tokens
- Automatic inclusion in requests simplifies client code
- SameSite attribute prevents CSRF attacks
- Better security than localStorage/sessionStorage
- Aligns with Better Auth's recommended practices

### Alternatives considered:
- localStorage: Vulnerable to XSS attacks
- sessionStorage: Similar XSS vulnerability, poor UX for tabs/windows
- Memory storage: Lost on page refresh, requires re-authentication

## Architectural Flow

### Next.js → Better Auth → JWT → FastAPI Flow:
1. User interacts with Next.js frontend for signup/signin
2. Next.js communicates with Better Auth for credential validation
3. Better Auth issues JWT upon successful authentication
4. JWT is stored securely in httpOnly cookie
5. Frontend includes JWT in requests to FastAPI backend
6. FastAPI middleware/dependency verifies JWT and extracts user identity
7. Backend processes request with user context and ensures data isolation