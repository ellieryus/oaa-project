# Product Brief

Last updated: 2026-10-14

**Primary readers:** PM, Backend, Frontend, Product Designer
**Priority:** Highest
**Read this when:** You need the approved MVP scope, role boundaries, success criteria, or release acceptance criteria.

## Product Summary

One Ask Away helps members of trusted career communities find a relevant Mentor and send a clear, scoped Ask for a short career conversation.

MMA is the first pilot community. The platform model is generic and must not hard-code MMA, McGill, or a specific cohort.

The product promise is:

1. Users can choose and request the communities relevant to them.
2. Community Admins remain the access gatekeepers and maintain community quality/supply.
3. Mentees receive a small curated set of relevant Mentors from the community they are currently using.
4. Mentors receive scoped Asks from communities they intentionally support.
5. Accepted Asks move to one clear external coordination route.

## Pilot Context

Working MMA rollout assumption:

- approximately 50–60 participating alumni
- approximately 90 students/Mentees

These are planning assumptions, not product thresholds or hard-coded limits.

A current student may later participate as a Mentor. Mentor and Mentee are non-exclusive capabilities, not permanent identities.

## Roles

- `Community Admin`: reviews access, invites/adds members, manages membership and Mentor supply, and controls allowed community settings.
- `Mentor`: declares scope, receives Asks, and accepts/declines.
- `Mentee`: maintains current needs, receives curated community-scoped recommendations, and sends scoped Asks.

One user may hold multiple roles across time and communities.

## Core Information Architecture

Global Home:

- `Your Communities`
- `Pending Requests`
- `Discover Communities`

Community workspace for Mentees:

- `Matches`
- `Asks`

Global Notifications deep-link into the canonical community context.

## MVP Scope

### In scope

- generic Organization + Community + membership + role model
- open signup for Mentor and Mentee users
- organization selection for normal discovery
- discoverable communities requiring Admin approval
- invite-only communities
- community preview with name, organization, description, eligibility, and organizer
- join requests with optional note
- Community Admin join-request review
- exact-email existing-account add
- unique email-bound Mentor/Mentee invitations
- cross-program access subject to Admin approval
- explicit Admin invite/add across organization boundaries
- non-exclusive Mentor/Mentee roles
- community-scoped Mentee-to-Mentor matching
- maximum three visible qualified uncontacted recommendations
- bounded `Not a fit`, next-set, decline/expiry replacement behavior
- structured Ask lifecycle with 48-hour Mentor response window
- late Mentor response after expiry
- one accepted coordination route: Calendly or LinkedIn
- community-scoped Asks
- transactional notifications and existing private post-conversation capture
- user-facing Community Admin/community creation as intended direction, with creator-verification mechanism still open

### Explicitly not in MVP

- silent cross-community matching
- OAA-wide Mentor pool fallback
- public open/auto-join communities
- participant-facing Mentee directory
- free-form regenerate / infinite swipe
- guaranteed three Mentor recommendations
- hard-coded minimum Mentor-pool activation threshold
- native messaging
- native calendar sync/rescheduling
- Calendly OAuth/webhook dependency
- verified booking/completion claims
- Mentor-to-Mentor or Mentee-to-Mentee matching

## Community Access Principle

Normal discovery is organization-scoped.

Program mismatch is not a hard block. A user may request another community in the same organization and the Community Admin decides.

Explicit Admin invitation/add may cross organization boundaries for both Mentors and Mentees.

Community membership, not organization selection, determines mentoring access.

## Matching Principle

```text
same-community eligibility
-> relevance first
-> up to 3 qualified recommendations
-> diversification only among sufficiently relevant options
```

Three is a maximum visible window, not a guaranteed count.

Send Ask moves the Mentor from Matches to Asks without immediate top-up.

`Not a fit` does not immediately top up while other current recommendations remain.

When the current visible set is fully handled, the Mentee may request the next curated set if qualified unseen supply exists.

Decline/expiry may prepare exactly one qualified replacement when visible supply is below three.

## Success Metrics

- high-quality accepted-Ask rate
- Mentee Ask submission rate
- Mentor response rate within 48 elapsed hours
- Mentor acceptance rate
- `NOT_AN_OFFERING` decline rate
- recommendation coverage: % of eligible Mentees receiving 3 / 2 / 1 / 0 qualified recommendations
- `Not a fit` rate
- replacement availability after involuntary loss
- self-reported conversation occurrence as a secondary effectiveness signal

Mentor-pool minimum/readiness is a research question, not a release gate.

## Release Acceptance

### Community access

- free-entry user can verify email, select organization, discover eligible communities, and submit a join request
- pending request grants no community access
- Admin can approve/decline
- invited/add-by-email paths still work
- explicit cross-organization Admin invite/add is supported
- normal discovery remains organization-scoped

### Matching

- current community is always explicit
- no Mentor from another community appears in the selected community's Matches
- up to three qualified recommendations are shown
- weak filler is never used to reach three
- Send Ask does not auto-top-up
- current-set resolution controls next-set access
- decline/expiry replacement creates at most one qualified replacement

### Privacy

- Admin sees only membership-review/operational data allowed for that community
- private mentoring activity remains protected
- self-selected organization is never presented as verified affiliation
