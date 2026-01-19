---
description: "Task list for todo app implementation"
---

# Tasks: todo-app

**Input**: Design documents from `/specs/001-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `models/`, `services/`, `cli/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure per implementation plan
- [X] T002 Initialize Python project with UV dependencies in pyproject.toml
- [X] T003 [P] Create directory structure (models/, services/, cli/)

---
## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Create Todo model in models/todo.py with id, title, description, completed fields
- [X] T005 Create TodoService class in services/todo_service.py with in-memory storage
- [X] T006 Create CLI entry point in cli/main.py
- [X] T007 Set up proper module imports and package structure

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---
## Phase 3: User Story 1 - Add and View Todos (Priority: P1) 🎯 MVP

**Goal**: Enable users to add new todo items to their list and view all existing todos to keep track of tasks they need to complete.

**Independent Test**: Can be fully tested by adding multiple todos and viewing them to confirm they are stored and displayed properly in the in-memory system.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T008 [P] [US1] Create test for add todo functionality in tests/test_add_todo.py (SKIPPED - not requested)
- [X] T009 [P] [US1] Create test for view todos functionality in tests/test_view_todos.py (SKIPPED - not requested)

### Implementation for User Story 1

- [X] T010 [P] [US1] Implement add_todo method in services/todo_service.py
- [X] T011 [P] [US1] Implement get_all_todos method in services/todo_service.py
- [X] T012 [US1] Implement add command handler in cli/main.py
- [X] T013 [US1] Implement view command handler in cli/main.py
- [X] T014 [US1] Add proper string representation for Todo in models/todo.py
- [X] T015 [US1] Test adding and viewing todos functionality

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---
## Phase 4: User Story 2 - Update and Mark Complete Todos (Priority: P2)

**Goal**: Allow users to update existing todo items when requirements change and mark completed tasks as finished to keep their list organized and accurate.

**Independent Test**: Can be tested by adding a todo, updating its details, and marking it as complete to verify the status changes are reflected.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [X] T016 [P] [US2] Create test for update todo functionality in tests/test_update_todo.py (SKIPPED - not requested)
- [X] T017 [P] [US2] Create test for mark complete functionality in tests/test_mark_complete.py (SKIPPED - not requested)

### Implementation for User Story 2

- [X] T018 [P] [US2] Implement update_todo method in services/todo_service.py
- [X] T019 [P] [US2] Implement mark_complete method in services/todo_service.py
- [X] T020 [US2] Implement update command handler in cli/main.py
- [X] T021 [US2] Implement complete command handler in cli/main.py
- [X] T022 [US2] Test updating and marking complete functionality

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---
## Phase 5: User Story 3 - Delete Completed Todos (Priority: P3)

**Goal**: Allow users to remove completed or obsolete todo items from their list to maintain a clean and focused view of remaining tasks.

**Independent Test**: Can be tested by adding todos, deleting them, and verifying they no longer appear in the view command output.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [X] T023 [P] [US3] Create test for delete todo functionality in tests/test_delete_todo.py (SKIPPED - not requested)

### Implementation for User Story 3

- [X] T024 [P] [US3] Implement delete_todo method in services/todo_service.py
- [X] T025 [US3] Implement delete command handler in cli/main.py
- [X] T026 [US3] Test deleting todos functionality

**Checkpoint**: All user stories should now be independently functional

---
## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T027 [P] Add proper error handling for invalid IDs and commands in cli/main.py
- [X] T028 [P] Add help command and usage information in cli/main.py
- [X] T029 [P] Improve error messages for invalid operations in services/todo_service.py
- [X] T030 [P] Add input validation in cli/main.py
- [X] T031 [P] Documentation updates in README.md
- [X] T032 Run quickstart validation to ensure all features work
- [X] T033 [P] Implement interactive menu interface in cli/main.py

---
## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---
## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Create test for add todo functionality in tests/test_add_todo.py"
Task: "Create test for view todos functionality in tests/test_view_todos.py"

# Launch all implementation for User Story 1 together:
Task: "Implement add_todo method in services/todo_service.py"
Task: "Implement get_all_todos method in services/todo_service.py"
Task: "Implement add command handler in cli/main.py"
Task: "Implement view command handler in cli/main.py"
```

---
## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---
## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence