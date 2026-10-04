# For Ellie: Backend

Last updated: 2026-10-03

**Primary readers:** Backend
**Priority:** Highest

## Read First

1. `docs/product/product-brief.md`
2. `docs/features/multi_community_mvp_requirements.md`
3. `docs/features/email-verification.md`
4. `docs/features/matching.md`
5. `docs/features/request-lifecycle.md`
6. `docs/features/calendly.md`
7. `docs/architecture/state-machines.md`
8. `docs/architecture/erd.md`
9. `docs/architecture/system-architecture.md`

## Highest-Priority Rules

- all authorization is community-scoped: require `communityId`, active membership, and relevant membership role
- backend manually provisions MMA and assigns Community Admins from OAA-approved instructions; do not build a platform-admin UI in MVP
- Community Admin adds known existing verified accounts through exact-email lookup and receives only field-limited lookup/directory projections
- email-bound invitations can grant either role; accepting the invite proves email ownership and does not require a second OTP
- a user may have Mentor and Mentee capabilities; never use a single exclusive `User.role`
- matching remains Mentee-to-Mentor within one active community, with exactly three qualified results when available
- Ask acceptance requires one snapshotted Calendly or LinkedIn route; no OAuth, webhooks, booking verification, or logistics expiry
- cross-community discovery and Community Admin metrics are post-MVP

## Primary Backend Work

- Prisma model and migration plan for Community, CommunityMembership, CommunityMembershipRole, Invitation, CoreProfile, MentorProfile, MenteeProfile, Match, Ask, and ParticipantReport
- server-enforced Community Admin authorization plus auditable backend provisioning
- invitation, member add, email verification, match, Ask, notification, and audit state transitions
- data projection tests proving Community Admin cannot browse global users or access other-community membership, private feedback, notes, timing, or coordination data
- background jobs for invitation/Ask expiry, reminders, match replacement, and follow-up prompts

## Do Not Build In MVP

- cross-community mentor scout search
- community metrics/dashboard
- institutional roster/SSO integration
- Mentor-to-Mentor matching
- Calendly OAuth/API/webhook integration
