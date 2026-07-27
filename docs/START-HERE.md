# Start Here

Last updated: 2026-07-27

**Primary readers:** All  
**Priority:** Highest  
**Read this when:** You just cloned the repo or need the fastest reading path.

## Purpose

This is the fastest entry point into the One Ask Away documentation set.

Read this first after cloning the repo.

## If You Only Read Three Things First

1. `docs/product/product-brief.md`
2. `docs/project-context.md`
3. the role-specific guide for your workstream

## Role-Based Reading Paths

### Ellie: Backend Lead

Read in this order:

1. `docs/for-ellie-backend.md`
2. `docs/product/product-brief.md`
3. `docs/architecture/system-architecture.md`
4. `docs/architecture/state-machines.md`
5. `docs/architecture/erd.md`
6. `docs/features/email-verification.md`
7. `docs/features/request-lifecycle.md`
8. `docs/features/calendly.md`
9. `docs/project-context.md`

### Trang: UX Engineer and Frontend Lead

Read in this order:

1. `docs/for-trang-frontend.md`
2. `docs/product/product-brief.md`
3. `docs/delivery/frontend-adjustments.md`
4. `docs/features/matching.md`
5. `docs/features/request-lifecycle.md`
6. `docs/features/calendly.md`
7. `CLAUDE.md`
8. `docs/project-context.md`

### PM or Product Owner

Read in this order:

1. `docs/product/product-brief.md`
2. `docs/product/roadmap.md`
3. `docs/product/decision-log.md`
4. `docs/project-context.md`
5. `docs/requirements/traceability-matrix.md`

## Document Map

- `docs/project-context.md`: weekly status and current gaps
- `docs/product/`: business scope, roadmap, decisions
- `docs/requirements/`: PRD and traceability
- `docs/features/`: feature requirements with frontend and backend expectations
- `docs/architecture/`: system design, ERD notes, lifecycle states
- `docs/delivery/`: ways of working and frontend-specific interpretation

## Source Of Truth

When documents overlap, use this order:

1. `docs/product/decision-log.md`
2. `docs/features/*.md`
3. `docs/product/product-brief.md`
4. `docs/architecture/*.md`
5. `docs/project-context.md`

## Current High-Priority Context

- accepted-request scheduling uses a **24-hour elapsed** window
- repo-local Markdown docs supersede the older external business-rules PDF
- the app is still in mock-data mode for many core flows
- auth, persistence, notifications, and scheduling lifecycle still need production wiring
