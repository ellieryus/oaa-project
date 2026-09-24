# Roadmap

Last updated: 2026-09-24

**Primary readers:** PM, Product Owner, Backend, Frontend  
**Priority:** Medium  
**Read this when:** You need milestone sequencing and immediate priorities.

## Roadmap Intent

This roadmap focuses on the work needed to move from demo MVP to production-ready MVP 1.

## Milestones

### M0. Documentation alignment

Status: In progress 

- business brief created
- current-state context created
- system architecture created
- external business rules imported into repo-local feature docs
- team review and QA : in progress 

### M1. Auth and eligibility

Status: Next

- eligible email verification
- roster-based role assignment
- pending, onboarding, and active account states
- secure session handling
- route and action authorization

### M2. Persistent onboarding

Status: Planned

- student onboarding persistence
- alumni onboarding persistence
- final profile confirmation
- optional alumni coordination-preference setup, without blocking matching
- imported draft-data review behavior

### M3. Matching and request lifecycle

Status: Planned

- generate three persisted matches
- enforce non-offering hard exclusions
- create and expire requests
- accept and decline flow
- match replacement rules

### M4. Coordination handoff and conversation follow-up

Status: Planned

- accepted-request Calendly or LinkedIn coordination route
- inline Calendly embed and external LinkedIn handoff
- self-reported scheduling status and conversation follow-up jobs
- no provider booking, cancellation, or reschedule tracking in MVP 1

### M5. Notifications and post-call flows

Status: Planned

- verification emails
- request and deadline notifications
- pulse survey prompts
- student reflection persistence
- alumnus private notes persistence
- one pending-request reminder, re-engagement, and impact summaries

### M6. Hardening and beta readiness

Status: Planned

- integration tests
- audit and lifecycle history
- retry-safe jobs
- monitoring and operational runbook
- staging validation
