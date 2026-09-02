# Roadmap

Last updated: 2026-07-27

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
- alumni availability eligibility gate
- imported draft-data review behavior

### M3. Matching and request lifecycle

Status: Planned

- generate three persisted matches
- enforce non-offering hard exclusions
- create and expire requests
- accept and decline flow
- match replacement rules

### M4. Scheduling and meeting lifecycle

Status: Planned

- accepted-request scheduling access
- 24-hour booking window
- verified Calendly booking handling
- meeting history and completion jobs
- cancellation and reschedule handling

### M5. Notifications and post-call flows

Status: Planned

- verification emails
- request and deadline notifications
- pulse survey prompts
- student reflection persistence
- alumnus private notes persistence

### M6. Hardening and beta readiness

Status: Planned

- integration tests
- audit and lifecycle history
- retry-safe jobs
- monitoring and operational runbook
- staging validation
