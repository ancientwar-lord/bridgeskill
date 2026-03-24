# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x + Node.js LTS (feature exceptions must be justified)  
**Primary Dependencies**: Next.js App Router, React, Better Auth, MongoDB, Zod, Tailwind CSS  
**Storage**: MongoDB  
**Testing**: Minimal critical-path tests (auth, validation, core business logic + failure cases)  
**Target Platform**: Web app (modern browsers) + server runtime in Next.js
**Project Type**: Next.js web application  
**Performance Goals**: Demo-ready responsiveness; optimize bottlenecks only after measurement  
**Constraints**: MVP-first scope, strict layer boundaries, schema-first validation  
**Scale/Scope**: Hackathon delivery with clear path to extension

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [ ] MVP slice is defined as one end-to-end user-visible flow.
- [ ] Documentation and planning are lean, MVP-focused, and avoid corporate boilerplate.
- [ ] Architecture follows UI -> Actions -> Services (optional) -> Data/Auth.
- [ ] UI has no direct database or auth provider calls.
- [ ] All external and action inputs map to Zod schemas in lib/schemas.
- [ ] Error flow is defined as validate -> try -> catch -> normalize -> respond.
- [ ] Critical-path tests are scoped to auth, validation, and core business logic.
- [ ] Changed TS/JS files will include the required flow comment on the first
      non-empty line.
- [ ] Any optimization work is tied to an observed bottleneck, not speculation.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
app/
├── api/
├── dashboard/
├── login/
├── layout.tsx
└── page.tsx

components/
└── ...

lib/
├── actions/
├── schemas/
├── auth.ts
├── auth-client.ts
├── auth-utils.ts
├── errors.ts
├── logger.ts
└── types.ts

public/

tests/
├── integration/
└── unit/
```

**Structure Decision**: Keep feature changes inside the existing Next.js layout.
Only add lib/services when logic is reused across multiple actions.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
