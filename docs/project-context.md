# Project Context

Last updated: 2026-07-27

**Primary readers:** PM, Product Owner, Backend, Frontend  
**Priority:** High  
**Read this when:** You need the current status, blockers, and next milestone.

## Purpose

This is the living status document for One Ask Away.

It is intended to help a new team member, consultant, or reviewer answer:

- what the product is
- what the team is building now
- what is real vs mocked
- what the main blockers are
- what the next milestone is

## Weekly Update

- Week ending: 2026-07-27
- Biggest progress this week: BMAD documentation was moved into repo-local Markdown structure and MVP 1 business rules were normalized into feature specs.
- Biggest blocker this week: the app is still in mock-data mode for core journeys and the production lifecycle is not yet wired.
- Biggest decision this week: accepted-request scheduling uses a 24-hour elapsed window.
- Next week's focus: auth and eligibility design, Prisma persistence plan, and lifecycle state implementation.

## Product Summary

One Ask Away is a two-sided platform for McGill MMA students and alumni to have short, scoped career conversations.

The core workflow is:

1. verify eligibility
2. complete and confirm role-specific onboarding
3. generate three alumni matches
4. submit and respond to scoped asks
5. book a meeting
6. capture value after the meeting

## Delivery Snapshot

### What is strong

- product scope is now documented in repo-local Markdown
- design conventions are detailed
- route structure and major screens exist
- validation layer exists
- Prisma schema exists as a strong starting point

### What is incomplete

- no production auth yet
- no live Prisma persistence yet
- no real email or Calendly integration yet
- most core lifecycle state changes are still mocked or stubbed
- no automated test or release gate yet

## Current State By Layer

| Layer | Status | Notes |
| --- | --- | --- |
| Product definition | Good | Business brief, feature specs, roadmap, and decision log now exist in repo. |
| UX and design system | Strong for MVP | Visual and interaction rules are well defined. |
| Frontend journeys | Partial | Most screens exist, but many still read mock data directly. |
| Backend architecture shape | Partial | Actions, services, and repositories exist but are not fully production-backed. |
| Database model | Good on paper | Prisma schema is defined, but lifecycle entities still need hardening. |
| Auth and eligibility | Stubbed | No real verification, roster, or session implementation yet. |
| Scheduling and notifications | Stubbed | No live Calendly or email implementation yet. |
| Reliability and operations | Minimal | No full test, monitoring, or deployment process yet. |

## Real Vs Mock

### Real enough to build on

- route structure
- component library and design system
- form schemas
- server action and repository structure
- draft Prisma schema

### Mocked or stubbed

- student identity and auth
- alumni data and student request data
- match generation
- inbox and notification contents
- request persistence
- reflection and post-call persistence
- email delivery
- Calendly lifecycle

## Highest-Risk Gaps

1. core lifecycle persistence is not real yet
2. auth and role-based authorization are not implemented
3. several production routes still import mock data directly
4. scheduling, notifications, and background jobs do not exist in production form
5. no test or operational gate protects release quality

## Recommended Current Milestone

Convert the demo MVP into a persistent MVP.

This milestone should include:

1. verification and session architecture
2. Prisma-backed repositories
3. request and scheduling state machine implementation
4. Calendly and notification integration plan
5. integration tests for core journeys

## Maintenance Cadence

- Update this document weekly during active build.
- Update it immediately after any major milestone, slip, or scope change.
- Keep the weekly update section short and current.
