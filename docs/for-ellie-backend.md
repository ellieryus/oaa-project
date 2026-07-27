# For Ellie: Backend

Last updated: 2026-07-27

**Primary readers:** Backend  
**Priority:** Highest  
**Read this when:** You are implementing backend behavior, persistence, auth, or integrations.

## Purpose

This guide tells the backend lead exactly what to read first, what to own, and what to confirm before implementing.

## Read First

1. `docs/product/product-brief.md`
2. `docs/architecture/system-architecture.md`
3. `docs/architecture/state-machines.md`
4. `docs/architecture/erd.md`
5. `docs/features/email-verification.md`
6. `docs/features/request-lifecycle.md`
7. `docs/features/calendly.md`
8. `docs/features/pulse-survey.md`
9. `docs/project-context.md`

## Primary Ownership

- auth and eligibility
- sessions and authorization
- Prisma-backed persistence
- request lifecycle state transitions
- scheduling and meeting lifecycle
- email and Calendly integrations
- background jobs
- auditability and idempotency

## Highest-Priority Decisions To Respect

- accepted requests use a **24-hour elapsed scheduling window**
- matching begins only when the student explicitly selects Start finding alumni
- each student batch has exactly 3 active matches
- declined requests are final
- repo-local Markdown feature specs are the working source of truth

## Main Docs To Pay Attention To

### Critical

- `docs/features/email-verification.md`
- `docs/features/request-lifecycle.md`
- `docs/features/calendly.md`
- `docs/architecture/state-machines.md`
- `docs/architecture/erd.md`

### Important

- `docs/features/matching.md`
- `docs/features/pulse-survey.md`
- `docs/requirements/traceability-matrix.md`
- `docs/project-context.md`

### Reference

- `docs/product/roadmap.md`
- `docs/delivery/ways-of-working.md`

## Current Implementation Gaps To Focus On

- no real verification and session implementation
- Prisma client is still not live
- repositories still rely on mock data
- request lifecycle is only partially stubbed
- meeting, notification, audit, verification, and session records need explicit persistence
- background jobs for deadlines and retries do not exist yet

## What To Ignore On First Pass

- fine-grained frontend copy choices
- pixel-level UI conventions
- low-priority documentation-process details

Focus first on lifecycle correctness, persistence, and authorization.

## Backend Working Questions

- what is the final roster source and sync strategy
- what entities need to be added to Prisma before implementation starts
- what state transitions must be transactional
- which jobs must exist before private beta
- what audit history is mandatory for support and debugging
