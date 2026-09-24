# For Ellie: Backend

Last updated: 2026-09-24

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
9. `docs/features/alumni-retention.md`
10. `docs/project-context.md`

## Primary Ownership

- auth and eligibility
- sessions and authorization
- Prisma-backed persistence
- request lifecycle state transitions
- accepted-request coordination handoff and self-reported conversation follow-up
- email and Calendly integrations
- background jobs
- auditability and idempotency

## Highest-Priority Decisions To Respect

- Calendly or LinkedIn is selected when finalizing acceptance, not a matching gate; accepted requests do not expire for incomplete logistics
- MVP does not use Calendly OAuth, APIs, webhooks, calendar sync, or verified booking/completion
- matching begins only when the student explicitly selects Start finding alumni
- each student batch has exactly 3 active qualified matches when available; otherwise it may show fewer
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
- `docs/features/alumni-retention.md`
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
- conversation follow-up, notification, audit, verification, and session records need explicit persistence
- background jobs for deadlines and retries do not exist yet

## What To Ignore On First Pass

- fine-grained frontend copy choices
- pixel-level UI conventions
- low-priority documentation-process details

Focus first on lifecycle correctness, persistence, and authorization.

## Future-Ready Identity Constraints

Keep these constraints in the MVP persistence and authorization design. They support future student-to-alumni conversion without expanding current MVP matching scope.

- one person maps to one `User`, which may own both a `StudentProfile` and an `AlumnusProfile`; do not use a single exclusive `User.role`
- model verified email identities separately from role. A user may retain a McGill student email and later verify a personal email without losing the original identity or creating a second user account
- model program eligibility as non-exclusive membership history, for example `STUDENT` and later `ALUMNUS`, with cohort code, status, verification source, and timestamps
- do not make route selection or frontend role selection the authorization source of truth. Server actions must authorize the profile and verified membership relevant to the action; a future active profile context belongs in the session layer
- keep MVP `Match` and `Request` explicitly student-to-alumnus. Do not generalize them for alumni-to-alumni discovery until that product flow has its own eligibility, ranking, and scope rules
- never auto-roll a student into alumni status based on elapsed time. A future `Move to alumni` action creates a manual alumni access request, verifies a personal email, then requires alumni-specific onboarding
- preserve student profiles and historical requests, reflections, and conversation follow-up records when a user later gains alumni membership

## Backend Working Questions

- what is the final roster source and sync strategy
- what entities need to be added to Prisma before implementation starts
- what state transitions must be transactional
- which jobs must exist before private beta
- what audit history is mandatory for support and debugging
- what migration path replaces a single `User.email` with verified email identities and adds non-exclusive program memberships
