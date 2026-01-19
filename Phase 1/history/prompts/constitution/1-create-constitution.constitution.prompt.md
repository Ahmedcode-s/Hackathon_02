---
id: 1
title: Create Constitution
stage: constitution
date: 2026-01-16
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: user
command: "/sp.constitution"
labels: ["constitution", "setup", "governance"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - ".specify/memory/constitution.md"
tests:
 -
---

## Prompt

```
/sp.constitution

Project: AI-Native Todo System (From Console to Cloud)

Core principles:
- Incremental evolution from simple to complex systems
- Working software over documentation (but with clear specs)
- Engineering-first approach with real implementations
- Reproducibility across local, containerized, and cloud environments
- Maintainability and modular architecture
- Compatibility with AI agents and MCP tooling

Key standards:
- Every phase must be independently runnable
- Clear separation between frontend, backend, and AI layer
- Code should follow best practices of each stack
- Infrastructure must be version-controlled as code
- Components should be replaceable without breaking the system

Technology standards per phase:
Phase I – In-Memory Console App:
- Python-based CLI application
- No database (pure in-memory state)
- Modular structure (services + models + commands)
- Well-structured command interface
- Testable functions

Phase II – Full-Stack Web Application:
- Frontend: Next.js (App Router preferred)
- Backend: FastAPI + SQLModel
- Database: Neon (PostgreSQL)
- RESTful API design
- Clear DTOs and schema separation
- Server-client contract must be explicit

Phase III – AI-Powered Todo Chatbot:
- Integration with OpenAI ChatKit
- Use of Agents SDK where applicable
- MCP tools for task manipulation
- AI should be able to:
  - Create todos
  - Edit todos
  - Delete todos
  - List todos
  - Summarize todos
  - Set priorities and deadlines

Phase IV – Local Kubernetes Deployment:
- Dockerized frontend and backend
- Minikube-based local cluster
- Helm charts for deployment
- kubectl-ai and kagent compatibility
- Services should communicate via internal networking

Phase V – Advanced Cloud Deployment:
- DigitalOcean DOKS (managed Kubernetes)
- Event-driven architecture with Kafka
- Dapr for service-to-service communication
- Scalable microservices design

Constraints:
- Code must be production-like, not demo-only
- Each phase must build on the previous one
- No hardcoded secrets in code
- Configuration via environment variables
- Clear README per phase

Success criteria:
- Phase I runs as a clean Python CLI app
- Phase II supports full CRUD via UI and API
- Phase III allows AI to control the todo system reliably
- Phase IV runs fully in local Kubernetes
- Phase V supports scalable cloud deployment with messaging
```

## Response snapshot

Created the project constitution for the AI-Native Todo System with comprehensive principles and technology standards for all five phases of development.

## Outcome

- ✅ Impact: Created initial project constitution with all required principles and technology standards
- 🧪 Tests: N/A
- 📁 Files: Updated .specify/memory/constitution.md with complete constitution
- 🔁 Next prompts: Proceed with project implementation following the established constitution
- 🧠 Reflection: Constitution provides clear governance structure and development guidelines for the multi-phase project

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin Phase I implementation following the constitution