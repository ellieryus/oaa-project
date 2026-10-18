# PRD

Last updated: 2026-10-14

**Primary readers:** PM, Backend, Frontend
**Priority:** High

## Objective

Deliver a production-ready community-enabled MVP for One Ask Away where users can enter freely, select an organization, discover/request relevant communities, and participate only after Community Admin approval or explicit Admin invitation/add.

Mentoring remains community-scoped from recommendation through Ask and coordination.

## Functional Scope

### Identity And Discovery

- email ownership verification
- organization selection for normal discovery
- searchable canonical organization picker with fallback capture for missing organizations
- global Home with `Your Communities`, `Pending Requests`, `Discover Communities`
- `DISCOVERABLE_APPROVAL_REQUIRED` and `INVITE_ONLY` visibility modes
- community preview: name, organization, description, eligibility, organizer

### Membership

- free-entry join requests for Mentor and Mentee roles
- Admin approve/decline
- exact-email existing-account add
- email-bound invitations
- explicit cross-organization Admin invite/add
- non-exclusive Mentor/Mentee roles
- community-scoped Admin permissions
- intended self-service Community Admin/community creation path; creator verification mechanism remains open

### Profiles

- shared user-owned profile context
- Mentor profile and Mentee profile capabilities
- one to three structured Mentee priorities
- Mentor offerings/non-offerings
- profile confirmation before matching eligibility
- global-vs-community-specific matching preferences remain an open architecture decision

### Matching

- hard same-community candidate boundary
- relevance-first ranking
- up to three visible uncontacted qualified Mentor recommendations
- no cross-community fallback
- no weak filler
- Send Ask moves Mentor to Asks without top-up
- `Not a fit` removes current card without immediate top-up
- `See next recommendations` after current visible set is handled
- one qualified decline/expiry replacement when conditions are met
- honest low-supply state with optional priority review

### Ask And Coordination

- structured Ask submission
- 48-hour Mentor response lifecycle
- structured decline reasons
- late response after expiry
- community-scoped Asks
- one accepted coordination route: Calendly or LinkedIn
- LinkedIn outreach confirmation
- inline Calendly handoff with lightweight scheduled UX state
- existing private post-conversation capture

## Non-Functional Scope

- server-enforced `communityId` authorization
- organization discovery context separated from membership authorization
- invitation email binding
- auditable join-request, membership, invitation, Ask, and status transitions
- field-limited Community Admin projections
- immutable Ask context snapshots
- explainable match reasons without participant-facing raw scores
- no numeric community/Mentor-pool threshold hard-coded without later approved decision

## Feature Inventory

| Feature | Primary document |
| --- | --- |
| Community model, discovery, roles, access | `features/multi_community_mvp_requirements.md` |
| Email verification and entry paths | `features/email-verification.md` |
| User journeys | `features/user-flows.md` |
| Mentee IA | `features/mentee-page-spec.md` |
| Matching | `features/matching.md` |
| Ask lifecycle | `features/request-lifecycle.md` |
| Coordination | `features/calendly.md` |
| Pulse/post-conversation capture | `features/pulse-survey.md` |
| Mentor retention | `features/alumni-retention.md` |

## Release Gates

- no mentoring action occurs without the required active community membership/role
- normal discovery is organization-scoped
- explicit Admin invite/add may cross organization boundaries
- join requests remain non-active until Admin approval
- community Matches never contain another community's Mentor supply
- recommendation count never exceeds three visible uncontacted Mentors
- system may return fewer than three rather than weakening relevance
- no live path relies on mock-only persistence
- private feedback, notes, emails, and coordination data remain role-protected
