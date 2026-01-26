---
name: backend-skill
description: Generate backend routes, handle requests and responses, and connect application logic to the database.
---

# Backend Skill

## Instructions

1. **Route Design**
   - Define clear RESTful endpoints
   - Use consistent URL and naming conventions
   - Separate public and protected routes

2. **Request Handling**
   - Parse and validate incoming requests
   - Handle query params, path params, and bodies
   - Return meaningful HTTP status codes

3. **Response Handling**
   - Use consistent response formats
   - Handle errors gracefully
   - Avoid leaking internal details

4. **Database Integration**
   - Connect routes to database operations
   - Use repository or service layers
   - Manage connections efficiently

5. **Application Structure**
   - Separate routing, business logic, and data access
   - Keep handlers small and focused
   - Support scalability and maintainability

## Best Practices
- Keep routes thin, logic thick
- Use async I/O where applicable
- Centralize error handling
- Log important request lifecycle events
- Write testable, modular handlers

## Example Flow
```text
HTTP Request → Route Handler → Service Logic → Database
Database Result → Response Formatter → HTTP Response
