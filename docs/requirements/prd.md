# PRD

Last updated: 2026-07-27

**Primary readers:** PM, Product Owner, Backend, Frontend  
**Priority:** High  
**Read this when:** You need the full MVP requirement inventory and release gate summary.

## Objective

Deliver a production-ready MVP 1 for One Ask Away that supports verified users, structured alumni matching, scoped asks, booking handoff, and post-meeting capture.

## Users

### Student

Needs:

- trusted and relevant alumni matches
- help writing an ask
- a clear next step after the meeting

### Alumnus

Needs:

- clearly scoped asks
- control over what help is offered
- low-friction scheduling and follow-up

## Functional Scope

- email verification and roster eligibility
- student and alumni onboarding
- profile confirmation and alumni availability eligibility
- three-match generation with exclusions and replacements
- request submission and response lifecycle
- scheduling via Calendly after acceptance
- meeting completion and optional pulse survey
- student reflection and alumnus private notes
- transactional notifications

## Non-Functional Scope

- secure verification and authorization
- idempotent event processing
- auditable lifecycle history
- retry-safe notification and integration handling
- clear deadline and action messaging
- privacy boundaries between students and alumni

## Feature Inventory

| Feature | Primary document |
| --- | --- |
| Email verification and eligibility | `features/email-verification.md` |
| LinkedIn and CV profile prefill | `features/linkedin-prefill.md` |
| Matching lifecycle | `features/matching.md` |
| Request lifecycle | `features/request-lifecycle.md` |
| Calendly and meeting lifecycle | `features/calendly.md` |
| Pulse survey and post-call capture | `features/pulse-survey.md` |

## Release Gate Summary

The MVP is not ready until:

- users can become active only through eligible verification and completed onboarding
- no live journey depends on mock data
- lifecycle transitions are persisted and auditable
- deadlines are enforced correctly
- private responses and notes are role-protected
