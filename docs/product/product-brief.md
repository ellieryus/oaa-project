# Product Brief

Last updated: 2026-10-03

**Primary readers:** PM, Backend, Frontend, Product Designer
**Priority:** Highest
**Read this when:** You need the approved MVP scope, role boundaries, success criteria, or release acceptance criteria.

## Product Summary

One Ask Away helps members of approved career communities find a relevant Mentor and send a clear, scoped Ask for a short career conversation. MMA is the first launch community; the platform is not restricted to MMA identity or McGill email addresses.

The product promise is:

1. Community Admins build a safe, relevant community member pool.
2. Mentees receive a small, curated set of relevant Mentors from their own community.
3. Mentors receive clear asks within their declared scope.
4. Both participants receive one clear off-platform coordination path after acceptance.

## Release Goal

Launch a community-enabled private beta that proves a Mentee can move from verified email and active community membership to a high-quality accepted Ask. Self-reported conversation occurrence is a secondary outcome.

MMA is the first community. The data model must support future approved communities without rebuilding accounts, memberships, profiles, matching, or authorization.

## Roles

- `Community Admin`: adds known members or sends email-bound invitations, and sees only allowed lookup/directory fields for their community.
- `Mentor`: declares offerings/non-offerings, receives and accepts/declines scoped Asks.
- `Mentee`: maintains current priorities, receives curated matches, and sends scoped Asks.

One user may hold Mentor and Mentee capabilities. Roles are community-scoped and non-exclusive.

## MVP Scope

### In scope

- generic `Community`, membership, role, and invitation model; MMA configured as the first community
- backend provisioning of the MMA community and Community Admin assignment from OAA-approved instructions
- exact-email add for known existing Mentor and Mentee accounts
- Community Admin privacy-limited member lookup and directory views
- unique email-bound Mentor and Mentee invitations
- email ownership verification and role-specific onboarding
- community-scoped Mentor/Mentee matching with exactly three qualified matches when available
- structured Ask lifecycle, 48-hour Mentor response window, and scope-aware decline reasons
- late Mentor response from `Expired Asks`, while preserving the Mentee's replacement match slot
- one Mentors-selected Calendly or LinkedIn coordination route at acceptance
- self-reported conversation follow-up, private pulse, Mentee reflection, Mentor notes, and Mentee appreciation
- essential transactional notifications and low-frequency Mentor retention notifications
- private participant report to backend/OAA operations queue

### Explicitly post-MVP

- community metrics, dashboards, supply/demand analytics, and individual activity analytics for Community Admins
- a platform-admin role, UI, self-service community creation, and Community Admin assignment workflow
- self-service membership applications and public community discovery
- cross-community Mentor discovery, scouting, and opt-in discoverability
- automatic membership in another community
- Mentor-to-Mentor or Mentee-to-Mentee matching
- bulk invitations, roster/CRM integrations, institutional SSO, and profile synchronization
- native messaging, rescheduling, calendar sync, Calendly OAuth/API/webhooks, booking verification, and verified completion
- public leaderboard, credential, or badge issuance

## Success Metrics

- high-quality accepted-Ask rate is the north-star metric
- Mentee Ask submission rate
- Mentor response rate within 48 elapsed hours
- Mentor acceptance rate and `NOT_AN_OFFERING` decline rate
- self-reported conversation occurrence is a secondary effectiveness metric
- active Mentor supply is an operational beta signal, not a Community Admin dashboard requirement

## Core Journey Acceptance Criteria

### Community access

- an existing verified account sees a community only after a Community Admin adds it
- a new user sees a community only after accepting its email-bound invitation and completing required profile fields
- an email-bound invite cannot activate a different email address and does not require a second OTP
- Community Admin sees only allowed exact-lookup and directory fields for their own community

### Mentee matching and Ask

- a Mentee with active membership and confirmed profile receives up to three qualified Mentors from the same community
- matches show one human-readable reason, offerings, and non-offerings
- Ask topic is an active Mentee priority and a Mentor offering
- Mentor can inspect immutable Mentee context before deciding

### Mentor decision and handoff

- Mentor accept/decline is persisted and auditable within 48 hours
- acceptance is exposed only after one Calendly or LinkedIn route is snapshotted
- accepted Asks do not expire because coordination is incomplete

### Privacy boundaries

- Community Admin never sees stored member personal email, private feedback, reflection, note, scheduling answer, or coordination URL. A direct member invitation form may accept an invitee email, but post-submit UI exposes only invitation status
- participants never see the other participant's private pulse answers
- no surface claims institutional verification unless an approved institutional verification flow exists
