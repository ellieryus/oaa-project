# Ways Of Working

Last updated: 2026-07-27

**Primary readers:** PM, Product Owner, Backend, Frontend  
**Priority:** Medium  
**Read this when:** You need ownership, support model, review flow, or documentation cadence.

## Purpose

This document defines how the team should maintain the BMAD documentation set and keep implementation aligned with approved behavior.

## Working Rules

- update docs in the repo, not only in external files
- treat `product/decision-log.md` as the override for conflicts
- keep business behavior in `features/*.md`
- keep technical design in `architecture/*.md`
- keep delivery status in `project-context.md`

## Ownership Model

This section defines functional ownership for MVP 1.

| Function | Primary responsibility | Owner |
| --- | --- | --- |
| Product owner | Scope decisions, acceptance criteria, release sign-off | Rachelle |
| PM | Planning, sequencing, milestone tracking, risk tracking, stakeholder updates | Rachelle |
| Design | UX quality, design-system adherence, journey usability, content clarity | Trang |
| Frontend engineering | UI implementation, client state, accessibility, route behavior | Trang |
| Backend engineering | Auth, persistence, APIs, data integrity, integrations | Ellie |
| QA | Test planning, regression coverage, release validation | Rachelle |
| Operations and support | Release-day monitoring, issue triage, response coordination | Chloe |

### Decision rights

- product owner approves scope, acceptance criteria, and release readiness from a product standpoint
- engineering approves technical readiness and production safety
- design approves UX and content quality for released journeys
- QA approves test completion against release criteria

## First-Release Support Model

This is the proposed support model for the private beta.

### Triage model

- PM or product owner receives incoming issues
- issues are tagged as bugs or issues, then assigned a severity level
- bugs include net new requirement gaps, product bugs, and data issues
- issues include test-script problems, training gaps, or navigation confusion discovered during beta

### Response priorities

- P0: access issues where a user cannot sign in, submit, respond, or save required data
- P1: data issues, wrong data shown, missing permissions, or broken core state transitions
- P2: UI issues, non-blocking defects, copy defects, and edge-case usability issues

### Manual operations allowed in beta

- curating invited users
- manually assisting failed onboarding cases
- manually confirming or resending invitations if automation is not yet stable

Manual operations are acceptable only if they do not hide systemic product failure.

## Documentation Cadence

### Weekly

- update `project-context.md`
- review open risks and current milestone
- note any newly resolved or newly discovered blockers

### On scope or behavior change

- update the relevant feature spec
- add a decision-log entry
- update PRD or roadmap if scope changed

### On technical design change

- update system architecture, ERD notes, and state-machine notes as needed

## Review Flow

1. product or architecture change is proposed
2. relevant Markdown docs are updated in the same working branch
3. reviewers check behavior and lifecycle consistency first
4. implementation begins only after the docs reflect the intended behavior

## Implementation Expectations

- every core lifecycle feature should have frontend requirements and backend requirements captured in its feature doc
- production routes should not bypass service and repository boundaries
- the team should resolve documentation conflicts before coding around them

## Definition Of Healthy Documentation

The documentation set is healthy when:

- a new engineer can understand product scope, lifecycle behavior, and architecture without opening external files
- every core feature has a current Markdown spec
- project context is no more than one week stale during active development
- conflicting rules are resolved in the decision log
