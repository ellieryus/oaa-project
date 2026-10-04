# PRD

Last updated: 2026-10-03

**Primary readers:** PM, Backend, Frontend
**Priority:** High

## Objective

Deliver a production-ready community-enabled MVP for One Ask Away: verified email ownership, Community Admin-governed membership, structured Mentee-to-Mentor matching, scoped Asks, external coordination handoff, and self-reported post-conversation capture.

## Functional Scope

- backend provisioning of the MMA community and Community Admin assignment from OAA-approved instructions
- Community Admin exact-email add and unique email-bound Mentor/Mentee invitation flows
- email verification, invite acceptance, and role-specific onboarding; active membership alone does not make an incomplete profile match-eligible
- Mentor and Mentee profiles; non-exclusive roles and multiple memberships
- one to three Mentee current priorities, Mentor offerings/non-offerings, and three-match generation within one community
- Ask submission, 48-hour Mentor response lifecycle, structured decline reasons, late response from `Expired Asks`, and match-slot replacement
- Calendly or LinkedIn coordination handoff after acceptance
- self-reported conversation follow-up, private pulse, Mentee reflection, Mentor notes, and appreciation
- transactional notifications, audit history, and privacy-limited Community Admin authorization

## Non-Functional Scope

- server-enforced community-scoped authorization
- invitation email binding and membership state integrity
- auditable member-add, invite, Ask, and status transitions
- privacy separation between Community Admin, Mentor, and Mentee roles
- immutable Ask context snapshots and explainable match reasons without raw relevance scores

## Feature Inventory

| Feature | Primary document |
| --- | --- |
| Community model, roles, invitations, and access | `features/multi_community_mvp_requirements.md` |
| Email verification and membership review | `features/email-verification.md` |
| Matching lifecycle | `features/matching.md` |
| Ask lifecycle | `features/request-lifecycle.md` |
| Coordination lifecycle | `features/calendly.md` |
| Pulse and post-conversation capture | `features/pulse-survey.md` |
| Mentor retention and recognition | `features/alumni-retention.md` |

## Release Gates

- no user enters a community feature without the required active membership and role
- direct invitations are unique, email-bound, expiry-safe, and auditable
- Community Admin data views are field-limited and community-scoped
- no live journey depends on mock data
- Ask and membership lifecycle transitions are persisted and auditable
- private feedback, notes, emails, and coordination routes remain role-protected
