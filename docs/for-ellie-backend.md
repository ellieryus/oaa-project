# For Ellie: Backend

Last updated: 2026-10-14

**Primary readers:** Backend
**Priority:** Highest

## Read First

1. `docs/product/decision-log.md`
2. `docs/features/multi_community_mvp_requirements.md`
3. `docs/features/email-verification.md`
4. `docs/features/matching.md`
5. `docs/features/request-lifecycle.md`
6. `docs/features/calendly.md`
7. `docs/architecture/state-machines.md`
8. `docs/architecture/erd.md`
9. `docs/architecture/system-architecture.md`

## Highest-Priority Product Invariants

- Organization selection scopes normal Discovery but does not authorize community access
- free-entry Mentors and Mentees can request a discoverable Community
- Admin approve/decline controls activation
- exact-email Admin add and email-bound invite remain valid parallel paths
- explicit Admin invite/add may cross Organization boundaries
- roles are community-scoped and non-exclusive
- matching candidate pool is the selected active Community only
- no silent cross-community fallback
- recommendation window is up to three, never padded with weak candidates
- relevance precedes quantity/diversification
- Send Ask does not top up Matches
- Not a Fit does not top up while current cards remain
- current-set completion may unlock next recommendations
- decline/expiry may prepare exactly one replacement when conditions are met
- no hard-coded minimum Mentor-pool threshold

## Backend-Owned Matching Decisions

Product does **not** lock the following implementation stack:

- domain Classification
- STS retrieval
- Cross-Encoder ranking
- MMR diversification

Backend/Data should choose the architecture and thresholds while preserving the product invariants.

One specific question to resolve:

- should domain classification be a hard candidate filter or a soft ranking signal, especially when community pools are smaller?

## Data / Simulation Question

Run controlled evaluation across candidate-pool sizes such as:

- 5
- 10
- 15
- 20

Also vary thematic concentration, for example Consulting, Finance, or Data communities.

Goal: estimate when ranking remains meaningfully relevant, not to establish a hard threshold in advance.

MMA planning context is materially larger (working assumption: ~50–60 alumni plus ~90 students), but this must not be hard-coded.

## ERD Questions To Resolve

- exact `Organization` / user-affiliation representation
- `CommunityJoinRequest` vs membership status representation
- source-of-membership audit
- Admin/community creator verification model
- global vs community-specific Mentee priorities
- global vs community-specific Mentor offerings
- recommendation-set/replacement persistence

## Admin Creator Verification

Product direction is user-facing community creation using organizational identity/email signals.

Backend/Product still need to define:

- how identity/affiliation is verified
- whether an organizational email proves affiliation only or also authority
- duplicate/misleading official-community handling
- ownership transfer

Do not invent a Mentor-count creation/activation gate.

## Privacy Tests

Prove that:

- pending applicant data is visible only to the reviewing Community Admin within allowed fields
- Admin cannot see private mentoring activity
- exact-email lookup does not reveal global memberships
- explicit cross-Organization invite/add does not make unrelated communities discoverable
- one community can never query another community's Match supply
