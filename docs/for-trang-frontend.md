# For Trang: Frontend

Last updated: 2026-07-27

**Primary readers:** Frontend, UX  
**Priority:** Highest  
**Read this when:** You are implementing UI flows, hierarchy, copy, or interaction behavior.

## Purpose

This guide tells the frontend and UX lead exactly what to read first, what to own, and what to confirm before implementing.

## Read First

1. `docs/product/product-brief.md`
2. `docs/delivery/frontend-adjustments.md`
3. `docs/features/matching.md`
4. `docs/features/request-lifecycle.md`
5. `docs/features/calendly.md`
6. `docs/features/pulse-survey.md`
7. `CLAUDE.md`
8. `docs/project-context.md`

## Primary Ownership

- screen behavior and information hierarchy
- request-composer structure and validation UX
- alumni profile scanability
- inbox and urgency presentation
- lifecycle-state clarity in the UI
- accessibility and route-level user experience

## Highest-Priority Decisions To Respect

- student must understand what the alumnus helps with immediately
- profiles should be scannable in a few seconds
- requests must force objective and topic specificity
- avoid mentorship framing; use conversation and request framing
- accepted requests use a **24-hour elapsed scheduling window**
- the fastest flow is review request, accept or decline, then book

## Main Docs To Pay Attention To

### Critical

- `docs/delivery/frontend-adjustments.md`
- `docs/features/matching.md`
- `docs/features/request-lifecycle.md`
- `docs/features/calendly.md`
- `CLAUDE.md`

### Important

- `docs/features/pulse-survey.md`
- `docs/product/product-brief.md`
- `docs/project-context.md`

### Reference

- `docs/architecture/state-machines.md`
- `docs/product/decision-log.md`

## Current Frontend Gaps To Focus On

- many routes still read mock data directly
- information hierarchy still needs to reflect alumni-feedback priorities consistently
- request specificity needs stronger UI enforcement
- deadlines and urgency messaging need to be explicit everywhere
- scheduling handoff should stay lightweight and not feel like a native calendar product

## What To Ignore On First Pass

- detailed backend persistence mechanics
- job orchestration details
- lower-priority policy and operational notes

Focus first on scanability, specificity, low-friction flows, and deadline clarity.

## Frontend Working Questions

- does each alumni-facing surface show role, company, offerings, ask, and matching reason immediately
- does the request composer prevent vague asks
- does the inbox support fast accept or decline decisions
- does scheduling feel like a quick handoff rather than a heavy new workflow
- does the UI ever imply long-term mentorship or excessive commitment
