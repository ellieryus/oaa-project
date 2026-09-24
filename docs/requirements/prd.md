# PRD

Last updated: 2026-09-24

**Primary readers:** PM, Product Owner, Backend, Frontend  
**Priority:** High  
**Read this when:** You need the full MVP requirement inventory and release gate summary.

## Objective

Deliver a production-ready MVP 1 for One Ask Away that supports verified users, structured alumni matching, scoped asks, coordination handoff, and self-reported post-conversation capture.

## Users

### Student

Needs:

- trusted and relevant alumni matches
- help writing an ask
- a clear next step after an accepted request

### Alumnus

Needs:

- clearly scoped asks
- control over what help is offered
- low-friction scheduling and follow-up

## Functional Scope

- email verification, manual alumni roster eligibility review, and personal-email ownership verification
- student and alumni onboarding
- profile confirmation and alumni request-acceptance eligibility
- dynamic current priorities, three-match generation with structured exclusions, partial-scope fallback, and replacements
- request submission and response lifecycle
- Calendly or LinkedIn coordination handoff after acceptance
- self-reported conversation follow-up and optional pulse survey
- student reflection and alumnus private notes
- one student appreciation action after a self-reported conversation
- alumni retention and impact summaries
- transactional notifications

## Non-Functional Scope

- secure verification and authorization
- idempotent event processing
- auditable lifecycle history
- retry-safe notification and integration handling
- clear deadline and action messaging
- privacy boundaries between students and alumni
- explainable matching without exposing raw relevance scores
- immutable request-context snapshots for alumni review

## Feature Inventory

| Feature | Primary document |
| --- | --- |
| Email verification and eligibility | `features/email-verification.md` |
| LinkedIn and CV profile prefill | `features/linkedin-prefill.md` |
| Matching lifecycle | `features/matching.md` |
| Request lifecycle | `features/request-lifecycle.md` |
| Calendly and coordination lifecycle | `features/calendly.md` |
| Pulse survey and post-call capture | `features/pulse-survey.md` |
| Alumni retention, re-engagement, and recognition | `features/alumni-retention.md` |

## Release Gate Summary

The MVP is not ready until:

- users can become active only through eligible verification and completed onboarding
- no live journey depends on mock data
- lifecycle transitions are persisted and auditable
- deadlines are enforced correctly
- private responses and notes are role-protected
