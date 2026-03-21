---
description: 'Task list template for feature implementation'
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Include focused tests for critical paths that change (auth flow, schema
validation, core business logic failure cases). Avoid broad UI snapshot-heavy suites.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.
Each story MUST include constitution compliance tasks for layering, schema boundaries,
and normalized error handling.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Use **[Story]** only for user-story implementation and test tasks (Phases 3+)
- Include exact file paths in descriptions

## Path Conventions

- **App routes & pages**: `app/`
- **Reusable UI components**: `ui/components/`
- **Global styles**: `ui/styles/`
- **Server actions / business entry points**: `lib/actions/`
- **Validation schemas (single source of truth)**: `lib/schemas/`
- **Authentication & session logic**: `lib/auth/`
- **Error handling & logging**: `lib/errors.ts`, `lib/logger.ts`
- **Type definitions**: `lib/types.ts`
- **Domain models and repositories**: `lib/models/`, `lib/repositories/`
- **Shared utilities / services** (only when actually reused 2+ times): `lib/utils/` and `lib/services/`
- **Tests** (critical paths only): `tests/`
<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Ensure plan/spec/tasks docs comply with Lean MVP documentation rules
- [ ] T002 Initialize [language] project with [framework] dependencies
- [ ] T003 [P] Configure linting and formatting tools

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T004 Define or update shared Zod schemas in lib/schemas/
- [ ] T005 [P] Implement or extend Better Auth and session wiring in auth/\*
- [ ] T006 [P] Create or update server action entry points in lib/actions/
- [ ] T007 Add centralized error normalization and logger usage
- [ ] T008 Enforce layer boundaries (no direct DB/auth in UI)
- [ ] T009 Setup environment configuration for MongoDB/Auth runtime values

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (critical-path focused)

- [ ] T010 [P] [US1] Integration test for the primary user journey in tests/integration/
- [ ] T011 [P] [US1] Failure-path test for validation or auth behavior in tests/unit/

### Implementation for User Story 1

- [ ] T012 [P] [US1] Add or update schema files in lib/schemas/
- [ ] T013 [US1] Implement action flow in lib/actions/ using schema-validated input
- [ ] T014 [US1] Add optional lib/services/ logic only if reused 2+ times
- [ ] T015 [US1] Wire UI in app/ or ui/components/ with no embedded business logic
- [ ] T016 [US1] Implement normalize-and-respond error handling path
- [ ] T017 [US1] Ensure new TS/JS files start with required flow comment

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (critical-path focused)

- [ ] T018 [P] [US2] Integration test for the user journey in tests/integration/
- [ ] T019 [P] [US2] Failure-path test for validation, auth, or core logic in tests/unit/

### Implementation for User Story 2

- [ ] T020 [P] [US2] Add or update schema files in lib/schemas/
- [ ] T021 [US2] Implement action flow in lib/actions/
- [ ] T022 [US2] Wire route or UI behavior in app/ and ui/components/
- [ ] T023 [US2] Integrate with User Story 1 code paths without violating layer rules

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (critical-path focused)

- [ ] T024 [P] [US3] Integration test for the user journey in tests/integration/
- [ ] T025 [P] [US3] Failure-path test for validation, auth, or core logic in tests/unit/

### Implementation for User Story 3

- [ ] T026 [P] [US3] Add or update schema files in lib/schemas/
- [ ] T027 [US3] Implement action flow in lib/actions/
- [ ] T028 [US3] Wire route or UI behavior in app/ and ui/components/

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T029 [P] Documentation updates in docs/
- [ ] T030 Code cleanup and refactoring
- [ ] T031 Performance optimization across all stories
- [ ] T032 [P] Additional unit tests (if requested) in tests/unit/
- [ ] T033 Security hardening
- [ ] T034 Run quickstart.md validation

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

- Critical-path tests MUST be written for changed auth, validation, and core logic paths
- Schemas before actions
- Actions before UI wiring
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
# Launch User Story 1 tests in parallel:
Task: "Integration test for primary user journey in tests/integration/"
Task: "Failure-path test in tests/unit/"

# Launch User Story 1 build tasks in parallel:
Task: "Add schema updates in lib/schemas/"
Task: "Wire UI changes in app/ and ui/components/"
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
