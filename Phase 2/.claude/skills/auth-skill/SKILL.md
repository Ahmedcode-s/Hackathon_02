---
name: auth-skill
description: Implement secure user authentication flows including signup, signin, password hashing, JWT tokens, and Better Auth integration.
---

# Authentication Skill

## Instructions

1. **User Signup**
   - Collect user credentials securely
   - Hash passwords before storage
   - Prevent duplicate accounts

2. **User Signin**
   - Verify credentials against stored hashes
   - Handle invalid login attempts safely
   - Issue authentication tokens on success

3. **Password Security**
   - Use strong hashing algorithms (bcrypt / argon2)
   - Never store plain-text passwords
   - Support password updates securely

4. **JWT Authentication**
   - Generate access tokens after signin
   - Include user identity and expiry claims
   - Validate tokens on protected routes

5. **Better Auth Integration**
   - Use Better Auth for standardized auth flows
   - Leverage built-in token handling and security defaults
   - Keep auth logic centralized and reusable

## Best Practices
- Enforce strong password rules
- Use short-lived JWTs with refresh strategy
- Store secrets securely (env variables)
- Fail securely with minimal error leakage
- Follow least-privilege access principles

## Example Flow
```text
User Signup → Password Hash → Store User
User Signin → Verify Hash → Issue JWT
Authenticated Request → Validate JWT → Allow Access
