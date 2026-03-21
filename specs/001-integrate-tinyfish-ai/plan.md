# Implementation Plan: Integrate TinyFish AI

**Branch**: `001-integrate-tinyfish-ai` | **Date**: 2026-03-21 | **Spec**: ./spec.md
**Input**: Feature specification from `/specs/001-integrate-tinyfish-ai/spec.md`

## Summary

Enable TinyFish as a selectable AI provider in orchestrator with minimal MVP scope. Focus on config, provider selection, Zod validation, error normalization, and a single end-to-end integration test path.

## Technical Context

**Language/Version**: TypeScript 5.x + Node.js LTS
**Primary Dependencies**: Next.js App Router, TinyFish client, Zod, Better Auth, MongoDB
**Storage**: MongoDB for user/session state; provider config in env + dotenv
**Testing**: Minimal critical-path tests (provider selection, TinyFish response mapping, timeout/failure path)
**Target Platform**: Next.js server API + dashboard UI
**Project Type**: Web app (Next.js)
**Performance Goals**: Demo-ready <2s median latency for normal TinyFish calls
**Constraints**: MVP-first, strict layers, schema-first
**Scale/Scope**: Hackathon rapid integration

## Constitution Check

- [x] MVP slice defined as a single request through TinyFish path
- [x] Architecture follows UI -> Actions -> Services -> Data/Auth
- [x] UI has no direct DB/auth provider calls
- [x] All inputs map to Zod schemas in lib/schemas
- [x] Error flow is validate -> try -> catch -> normalize -> respond
- [x] Critical tests scoped to auth/query/validation/failure
- [x] Changed TS/JS files include flow comment on first non-empty line
- [x] Optimization tied to observed bottleneck

## Project Structure

### Documentation (this feature)

```text
specs/001-integrate-tinyfish-ai/
├── spec.md
├── plan.md
└── tasks.md
```

### Source Tree Impact

- `lib/schemas/tinyfish-schema.ts`
- `lib/services/tinyfish-service.ts`
- `lib/actions/tinyfish-action.ts`
- `app/api/ai-provider/route.ts` (provider flag path)
- `tests/integration/tinyfish.spec.ts`

## Complexity Tracking

No gate violations, lean MVP and direct cloud behavior.

## Phase 0: Outline & Research

- Confirm TinyFish API contract and existing orchestrator provider interface
- Decide MVP failure behavior: controlled error no auto-fallback

## Phase 1: Design & Contracts

- Define Zod schema for config/request/response
- Design `TinyFishService` interface methods: `sendRequest`, `normalizeResponse`
- Define action flow in `tinyfish-action.ts`
- Write a mini quickstart in markdown (if required)

## Phase 2: Implementation (Tasks)

• have tasks file built by speckit.tasks

## Agent update

Run `.specify/scripts/bash/update-agent-context.sh copilot` after design outputs
