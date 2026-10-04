# System Architecture

Last updated: 2026-10-03

**Primary readers:** Backend, Frontend, PM
**Priority:** Highest

## Target Architecture

One Ask Away is a Next.js web app with route UI, server actions, service/repository layers, Prisma-backed PostgreSQL, transactional email, URL-only Calendly embed, and background jobs for expiry, reminders, and follow-up prompts.

## Service Boundaries

### Identity, Community, And Authorization

- verifies email ownership and manages multiple `UserEmail` identities
- backend provisioning creates the MMA community and assigns Community Admins from OAA-approved instructions
- enforces Community Admin community scope; a platform-admin workflow is post-MVP
- manages `CommunityMembership`, roles, exact-email existing-account add, and unique email-bound member invitations
- exposes only approved exact-lookup and directory fields to Community Admins
- never authorizes based solely on frontend role selection; every action checks `communityId`, membership status, and role

### Onboarding And Profile

- stores core, Mentor, and Mentee profile drafts
- records profile confirmation, offerings/non-offerings, current priorities, and request-acceptance status
- keeps user-owned profile editing separate from Community Admin permissions

### Matching And Ask

- generates up to three active community-scoped Mentee-to-Mentor matches
- applies membership, role, topic, scope, pair-exclusion, and quality rules before ranking
- creates Asks, snapshots Mentee context, enforces 48-hour Mentor response windows, and triggers slot replacement

### Coordination And Conversation Follow-Up

- snapshots one Mentor-selected Calendly or LinkedIn route at acceptance
- renders Calendly embeds without OAuth, API tokens, webhooks, or provider-event tracking
- records CTA telemetry and private Mentee-reported timing
- schedules private pulse prompts from reported expected date

### Notifications And Post-Conversation

- sends verification, invitation, membership, Ask, reminder, and status notifications
- applies low-frequency Mentor re-engagement suppression
- stores private pulse, Mentee reflection, Mentor notes, and appreciation actions
- routes private participant reports to backend/OAA operations handling; Community Admins cannot access report content by default

## Background Jobs

- invitation expiry
- Ask expiry and one pending-Ask reminder
- self-reported scheduling follow-up and pulse invitation jobs
- notification retry
- match replacement

## Cross-Cutting Requirements

- community-scoped server authorization
- idempotent invitation, membership, Ask, notification, and job processing
- auditable lifecycle transitions
- privacy-limited data projections for Community Admin
- production paths must not import mock data directly

## Post-MVP Boundaries

- cross-community Mentor discovery and scouting
- Community Admin metrics and analytics
- Calendly OAuth/API/webhooks and verified booking/completion
