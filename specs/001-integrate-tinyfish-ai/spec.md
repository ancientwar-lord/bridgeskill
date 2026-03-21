# Feature Specification: Integrate TinyFish AI (Lean MVP)

**Feature Branch**: `001-integrate-tinyfish-ai`  
**Status**: Draft  
**Input**: TinyFish AI provider integration for agent workflow

## Core Goal

Enable TinyFish as a selectable AI provider in the agent orchestrator with a minimal config path and safe fallback behavior.

## MVP Scope

- TinyFish provider registration (endpoint, API key, model, timeout) in orchestrator config.
- Route agent workloads to TinyFish when selected, then normalize responses into existing agent output schema.
- Validate config + request payload via Zod before runtime; fail fast with user-friendly messages.

## Data/Layer Flow

Agent request input -> action layer selects provider → TinyFish adapter service calls provider API → response normalized -> output format.
Zod schemas cover TinyFish config + request payload + normalized response. Auth data (API key) is loaded from environment config.

## Clarifications

- Q: Should TinyFish integration follow strict MVP fallback behavior? → A: B (controlled error path, no automatic fallback in MVP).

## Next Actionable Steps

1. Add `lib/schemas/tinyfish-schema.ts` with TinyFish config/request/response schemas.
2. Implement `lib/services/tinyfish-service.ts` for call/timeout/error-handling/metrics.
3. Add `lib/actions/tinyfish-action.ts` to choose provider, validate, call service, and normalize errors.
4. Add minimal end-to-end test path in `tests/integration/tinyfish.spec.ts` for success + fallback error.
