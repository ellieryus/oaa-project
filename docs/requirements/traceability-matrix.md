# Traceability Matrix

Last updated: 2026-07-27

**Primary readers:** PM, Backend, Frontend, QA  
**Priority:** Medium  
**Read this when:** You need to trace business rules to feature and architecture docs.

## Purpose

This matrix maps approved MVP 1 business-rule areas to repo-local feature and architecture documents.

## Matrix

| Rule IDs | Topic | Feature spec | Architecture reference | Notes |
| --- | --- | --- | --- | --- |
| PRO-01 to PRO-06 | profile completion and eligibility | `features/matching.md` | `architecture/state-machines.md` | Includes profile confirmation and alumni availability gate. |
| MAT-01 to MAT-09 | match generation, exclusions, renewal, replacement | `features/matching.md` | `architecture/system-architecture.md` | Three-match lifecycle with slot replacement. |
| REQ-01 to REQ-07 | request lifecycle | `features/request-lifecycle.md` | `architecture/state-machines.md` | Includes deadlines, decline finality, and request history rules. |
| CAL-01 to CAL-06 | scheduling and meetings | `features/calendly.md` | `architecture/state-machines.md` | Uses 24-hour scheduling decision override. |
| MET-01 to MET-02 | meeting completion | `features/calendly.md` | `architecture/state-machines.md` | Meeting completion depends on verified scheduled meetings. |
| PUL-01 to PUL-04 | pulse survey | `features/pulse-survey.md` | `architecture/system-architecture.md` | Optional and private per participant. |
| NOT-01 to NOT-12 | notifications | `features/request-lifecycle.md`, `features/calendly.md`, `features/matching.md` | `architecture/system-architecture.md` | Notification behavior is split by lifecycle area. |
| EV-01 to EV-10 | email verification and eligibility | `features/email-verification.md` | `architecture/state-machines.md` | Includes role assignment and account-state rules. |
| NFR-01 to NFR-08 | security, authorization, idempotency, auditability | all feature docs | `architecture/system-architecture.md` | Cross-cutting platform requirements. |
| NFR-NOT-01 to NFR-NOT-04 | notification reliability, privacy, auditability | `features/request-lifecycle.md`, `features/calendly.md`, `features/matching.md` | `architecture/system-architecture.md` | Retry-safe and deadline-clear notifications. |
| NFR-EV-01 to NFR-EV-04 | verification security, rate limiting, privacy, audit | `features/email-verification.md` | `architecture/system-architecture.md` | Must be implemented before private beta. |
| CV prefill rules | profile prefill and imported draft behavior | `features/linkedin-prefill.md` | `architecture/system-architecture.md` | Covers editable draft import and no invented data. |

## Current Overrides

- Accepted-request scheduling is 24 elapsed hours.
- Repo-local Markdown docs supersede the external PDF when conflicts remain unresolved in the external copy.
