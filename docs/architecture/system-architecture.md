# System Architecture

Last updated: 2026-10-14

**Primary readers:** Backend, Frontend, PM
**Priority:** Highest

## Target Architecture

One Ask Away is a Next.js web app with route UI, server actions, service/repository layers, Prisma-backed PostgreSQL, transactional email, URL-based Calendly/LinkedIn coordination, and background jobs for expiry/reminders/follow-up.

## Service Boundaries

### Identity And Email Verification

- verifies email ownership
- manages multiple `UserEmail` identities
- rate-limits verification
- does not infer community access from email domain

### Organization And Community Discovery

- stores/selects Organization discovery context
- lists discoverable communities in the selected Organization
- exposes only allowed pre-join preview fields
- does not treat Organization selection as institutional verification

### Membership And Community Admin

- creates/reviews join requests
- manages `CommunityMembership` and roles
- supports exact-email Admin add
- supports email-bound invitations
- permits explicit cross-organization Admin invite/add
- enforces Admin scope to the current community
- exposes privacy-limited applicant/member projections

### Community Creation

- supports the intended user-facing Admin/community creation direction
- creator identity/affiliation/authority verification mechanism is open
- must not hard-code a Mentor-count activation gate

### Onboarding And Profile

- stores shared core profile
- stores Mentor and Mentee role profiles
- records profile confirmation
- supports structured priorities and Mentor scope
- leaves global-vs-community-specific preference ownership open until resolved

### Matching

- candidate generation begins from eligible Mentors in the selected active community only
- returns up to three qualified uncontacted recommendations
- relevance is prioritized over quantity and diversification
- no cross-community fallback
- persists visible/unseen/contacted/not-fit/replacement state or equivalent
- supports next-set behavior only after current visible set is handled
- supports one qualified decline/expiry replacement

### Ask

- creates community-scoped Asks
- snapshots Mentee context
- enforces 48-hour Mentor response window
- supports decline/expiry/late response
- does not top up Matches merely because an Ask was sent

### Coordination

- snapshots one Calendly or LinkedIn route at acceptance
- renders Calendly embed
- supports lightweight `Scheduled` UX state without claiming provider verification
- supports LinkedIn opened → explicit Mentee outreach confirmation
- no OAuth/webhook dependency required

### Notifications And Post-Conversation

- global Notifications deep-link to canonical community action
- stores existing private pulse/reflection/notes/appreciation
- Community Admin cannot access private participant feedback by default

## Background Jobs

- invitation expiry
- Ask expiry
- one pending-Ask reminder
- notification retry
- post-conversation follow-up
- replacement preparation where required

Join-request approval is an explicit Admin action, not a background automatic enrollment.

## Cross-Cutting Requirements

- community-scoped server authorization
- Organization selection separated from membership authorization
- auditable join-request, invitation, membership, Ask, and role transitions
- idempotent mutation/job processing
- field-limited Community Admin data projections
- production paths must not import mock data directly
- no numeric Mentor-pool threshold without a later approved product decision

## Technical Decisions Owned By Backend/Data

Backend/Data owns the implementation choice for:

- domain classification
- STS or other retrieval
- Cross-Encoder or other reranking
- MMR or other diversification
- quality thresholds

These choices must preserve the product invariants: same-community eligibility, relevance first, maximum three visible results, and no weak filler.
