<!--
Sync Impact Report
Version change: 1.0.0 -> 1.1.0
Modified principles:
- I. MVP First, Then Harden (unchanged)
- II. Predictable Layering and Separation (unchanged)
- III. Schema-First Contracts with Zod (unchanged)
- IV. Consistency and AI-Agent Readability (unchanged)
- V. Safe Errors, Focused Tests, and Measured Performance (unchanged)
- Added VI. Lean MVP Planning and Documentation
Added sections:
- None (principle added under Core Principles)
Removed sections:
- None
Templates requiring updates:
- ✅ updated: .specify/templates/plan-template.md (align with lean MVP doc guidance)
- ✅ updated: .specify/templates/spec-template.md (align with lean MVP doc guidance)
- ✅ updated: .specify/templates/tasks-template.md (align with lean MVP doc guidance)
- ✅ updated: README.md (confirm constitution reference update)
Follow-up TODOs:
- None
-->

# BridgeSkill Constitution

## Core Principles

### I. MVP First, Then Harden

- Every feature MUST ship as a working end-to-end slice before optimization,
  broad abstraction, or polish.
- Pull requests MUST prefer the smallest change that proves user value in a
  demo.
- New abstraction layers MUST be introduced only after at least two concrete
  reuse cases or measured maintenance pain.

Rationale: Short cycles maximize hackathon delivery speed and prevent dead-end
architecture work.

### II. Predictable Layering and Separation

- Application flow MUST follow UI -> Actions -> Services (optional) -> Data/Auth.
- UI code in app and components MUST NOT contain business rules, direct database
  access, or direct auth provider calls.
- Server actions in lib/actions are the default business entry point.
- Services in lib/services MAY be added only for logic reused across two or more
  actions.

Rationale: Stable boundaries keep code readable, scalable, and safe for rapid
parallel work.

### III. Schema-First Contracts with Zod

- All inbound data at form, route, and action boundaries MUST be validated with
  Zod schemas in lib/schemas.
- Validation logic MUST NOT be duplicated in components or ad hoc utility files.
- Parsed schema output MUST be the only data shape passed into business logic.

Rationale: A single contract source reduces bugs and makes behavior predictable
for humans and AI agents.

### IV. Consistency and AI-Agent Readability

- Naming, folder layout, and data flow conventions MUST stay uniform across the
  codebase.
- Comments MUST be one-line intent comments that explain why; obvious
  what-comments and long prose comments are prohibited.
- Hidden side effects and magic behavior are prohibited; flows MUST be explicit.

Rationale: Consistency lowers onboarding cost, speeds debugging, and makes
automated assistance reliable.

### V. Safe Errors, Focused Tests, and Measured Performance

- Request handling MUST follow validate -> try -> catch -> normalize -> respond.
- User responses MUST contain safe, user-friendly error messages and MUST NOT
  expose internals.
- Internal error details MUST be logged through shared logging utilities.
- Tests MUST target critical paths only: auth flow, schema validation, and core
  business logic including failure cases.
- Performance work MUST be driven by observed bottlenecks, not speculation.

Rationale: Reliability and speed come from disciplined essentials, not blanket
complexity.

### VI. Lean MVP Planning and Documentation

- Project documentation, specifications, and planning artifacts MUST be lean,
  immediately actionable, and directly tied to current MVP feature slices.
- Avoid corporate boilerplate, exhaustive test case matrices, and deep priority
  tracking; scope reporting to what is needed for execution and demo readiness.
- Include only core assumptions, minimal acceptance criteria, and clear next
  development steps.

Rationale: In rapid prototyping and hackathon contexts, documentation is an
execution tool, not an administrative burden.

## Technical Constraints & Project Structure

- Required stack:
  - Next.js App Router for application routing and rendering.
  - Better Auth with Mongo adapter for authentication.
  - MongoDB as primary data store.
  - Zod for schema validation contracts.
  - Tailwind CSS for a single design system.
- Directory ownership (single source of truth):
  - App routes & pages: `app/`
  - Reusable UI components: `ui/components/`
  - Global styles: `ui/styles/`
  - Server actions / business entry points: `lib/actions/`
  - Validation schemas (single source of truth): `lib/schemas/`
  - Authentication & session logic\*\*: `lib/auth/`
  - Error handling & logging: `lib/errors.ts`, `lib/logger.ts`
  - Type definitions: `lib/types.ts`
  - Domain models and repositories: `lib/models/`, `lib/repositories/`
  - Shared utilities / services (only when actually reused 2+ times): `lib/utils/` and `lib/services/`
  - Tests (critical paths only): `tests/`
- Structural rules:
  - Business logic MUST NOT live in UI components.
  - Validation MUST NOT exist outside Zod schemas.
  - UI MUST NOT call database or auth providers directly.
  - Shared logic reused two or more times MUST be extracted to lib.
- UI rules:
  - Reuse components from `ui/components/` instead of duplicating markup.
  - Use consistent spacing, colors, typography, and interaction patterns.
  - Inline styles are prohibited unless no Tailwind equivalent exists and the
    exception is documented in the pull request.
- Non-goals:
  - Over-engineered architectures.
  - Premature microservices.
  - Complex state management unless required by a demonstrated feature need.
  - Heavy test suites not tied to critical paths.
  - Perfect code before working code.

## Delivery Workflow & Definition of Done

- Hackathon workflow:
  1.  Build a working end-to-end feature slice.
  2.  Validate core functionality and failure handling.
  3.  Refactor only when reuse or maintenance pressure is proven.
  4.  Add polish last.
- Documentation and planning MUST follow Lean MVP rules: concise goals,
  implementation-focused steps, no corporate boilerplate, no exhaustive test
  scenario catalogs, no complex priority scorecards.
- Pull request expectations:
  - Include a short note confirming layer compliance, schema coverage, and
    error-handling path.
  - Keep changes scoped to one feature slice when possible.
  - Include or update critical-path tests when auth, validation, or core logic
    changes.
- Feature Definition of Done:
  - Works end-to-end in the target user flow.
  - Follows structure and layering rules.
  - Uses Zod schema validation at all relevant boundaries.
  - Handles errors with normalized safe responses.
  - Matches established UI consistency patterns.
  - Can be understood by a new contributor in under two minutes.

## Governance

- This constitution overrides ad hoc project habits and informal preferences.
- Amendments:
  - Must be submitted as a pull request that includes rationale, impact, and any
    required template updates.
  - Must update related templates in .specify/templates within the same change
    when governance affects planning or execution.
  - Must include a semantic version bump justified by change scope.
- Versioning policy:
  - MAJOR for backward-incompatible governance changes or principle removals or
    redefinitions.
  - MINOR for new principles, new mandatory sections, or materially expanded
    guidance.
  - PATCH for wording clarifications, typo fixes, and non-semantic refinements.
- Compliance review:
  - Every plan, spec, tasks file, and pull request MUST include an explicit
    constitution compliance check.
  - Violations MUST be documented with justification in the relevant plan
    complexity tracking section before implementation.
  - Periodic review cadence is at least once per hackathon milestone or monthly,
    whichever comes first.

**Version**: 1.1.0 | **Ratified**: 2026-03-18 | **Last Amended**: 2026-03-21
