---
name: database-skill
description: Design database schemas, create tables, and manage migrations reliably.
---

# Database Skill

## Instructions

1. **Schema Design**
   - Identify core entities and relationships
   - Normalize data appropriately
   - Define primary and foreign keys

2. **Table Creation**
   - Create tables with clear naming conventions
   - Use appropriate data types
   - Add indexes for frequently queried fields

3. **Migrations**
   - Version schema changes incrementally
   - Support upgrades and rollbacks
   - Keep migrations idempotent

4. **Data Integrity**
   - Enforce constraints (NOT NULL, UNIQUE)
   - Use foreign key constraints where applicable
   - Prevent inconsistent or orphaned data

5. **Environment Awareness**
   - Separate dev, staging, and production schemas
   - Avoid destructive changes in production
   - Seed data only when appropriate

## Best Practices
- Keep schemas simple and explicit
- Prefer additive migrations over destructive ones
- Review schema changes before applying
- Document schema decisions
- Test migrations on a clean database

## Example Flow
```text
Design Schema → Create Tables → Run Migration
Update Schema → New Migration → Apply Safely
