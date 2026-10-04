# One Ask Away - Community-Enabled MVP Requirements

Last updated: 2026-10-03

**Primary readers:** PM, Backend, Frontend, Product Designer
**Priority:** Highest
**Read this when:** You are implementing community access, invitations, membership review, role-aware profiles, or community-scoped matching.

## Purpose

One Ask Away is a community-enabled platform for short, scoped career conversations. MMA is the first launch community, not a platform-wide identity requirement. The MVP must support additional approved communities without rebuilding the account, membership, or matching model.

This document is binding for the community model. Cross-community mentor discovery and community analytics remain explicit post-MVP decisions.

## Core Product Model

- one person has one `User` account and one or more verified email identities
- a user can belong to multiple communities over time
- access, roles, and matching eligibility are determined by `CommunityMembership`, not by a global exclusive user role
- a membership may grant `MENTOR`, `MENTEE`, or both roles where a community permits it
- Mentor and Mentee are product roles; the product facilitates scoped career conversations and does not promise a long-term mentorship relationship
- each community owns its membership policy; during MVP, the backend team provisions communities and assigns Community Admins from an OAA-approved instruction

## Community Admin

A Community Admin is scoped to one approved community. A Program Director may hold this role for MMA.

Community Admin can:

- add a known existing Mentee or Mentor account to their community
- create a direct email-bound invitation for a known Mentee or Mentor who does not yet have an OAA account
- view the community member directory: name, role, membership status, offerings, and non-offerings
- pause or remove a membership, with an auditable reason

Community Admin cannot:

- see member personal email addresses, email-verification records, or authentication data. The sole exception is entering an invitee email to create a direct member invitation; after submission, the system must not reveal the stored email and should show only invite status
- see private pulse answers, reflections, Mentor notes, scheduling status, coordination URLs, or direct-message content
- edit a member's offerings, non-offerings, priorities, request content, decision, or coordination preference
- create a new community or grant themselves broader platform access

Community metrics, individual activity analytics, cross-community scouting, discoverable-mentor search, and self-service membership applications are post-MVP.

## MVP Community Provisioning

- MVP does not include an `OAA Admin` product role, platform-administration route, or self-service community creation flow
- the backend team creates the MMA community and manually assigns or removes its `COMMUNITY_ADMIN` membership role after an OAA-approved instruction
- this manual provisioning is an operational bootstrap, not a permission granted through frontend route selection
- record `assignedBy`, `assignedAt`, `communityId`, and a reason/reference in an audit event
- a platform-admin role, UI, community creation, and assignment workflow are post-MVP decisions; do not design product screens for them now

## Membership And Access

### Membership states

```text
ACTIVE
  -> PAUSED
  -> REMOVED

INVITED
  -> ACTIVE (invite accepted by the invited email owner)
  -> EXPIRED
  -> REVOKED
```

- a membership becomes `ACTIVE` when a Community Admin adds an existing verified account, or when the owner of an invited email accepts its invitation
- an `ACTIVE` membership makes its community visible, but matching and Ask eligibility also require the relevant confirmed profile; Mentor eligibility additionally requires `acceptingRequests = true`
- membership history is retained for audit; removing a membership does not delete historical requests
- an active membership in Community A does not grant access to Community B

### Existing-account add

A Community Admin adds a known existing account through an exact-email member lookup. It must not be a browseable cross-community people directory.

```text
Community Admin enters known email
-> system finds an existing verified OAA account without revealing other-community membership
-> Community Admin selects Mentor and/or Mentee membership role
-> create ACTIVE CommunityMembership
-> show `Complete your profile to get started`
```

- the lookup requires an exact known email; it must not expose a global user-search result list
- it may return only the minimum identity needed to avoid adding the wrong person, and must not disclose another community, membership, or private profile data
- the Community Admin explicitly selects the role to grant and the membership is immediately active
- if the user already has the relevant Mentor or Mentee profile, prefill it and require review and confirmation for the new community before matching or Ask eligibility

### Direct member invitation

A Community Admin may invite a known Mentor or Mentee who is not yet registered through a unique, email-bound invitation.

```text
Community Admin enters invitee email
-> OAA sends unique invitation bound to normalized email, community, and role
-> invitee opens the email-bound link, creating/signing in to an account if needed
-> link acceptance proves ownership of the invited email; do not require a second OTP
-> invitee completes the profile required for the granted role
-> membership becomes ACTIVE
```

- invitations are the only new-account entry path to a community in MVP; there is no public, reusable community join link or general signup-to-community flow
- a forwarded invitation cannot activate a different email address
- Community Admin can revoke an unaccepted invitation; expired or revoked invitations cannot be used
- invitation acceptance does not expose the invitee's email to the Community Admin
- an invited user sees only the community named in their invitation; a user without active membership sees no community discovery or unrelated community list

## Profiles And Roles

- a user has a shared core profile, such as name and LinkedIn URL
- a `MentorProfile` stores offerings, non-offerings, career background, request-acceptance status, and optional coordination preference
- a `MenteeProfile` stores aspirations, background, and one to three ranked current priorities
- profile data belongs to the user and remains editable by the user
- a user may have both profile types; the system must not model `MENTOR` and `MENTEE` as mutually exclusive global roles
- when a user gains an existing role in another community, prefill their existing role profile and require editable review/confirmation before eligibility in that community
- the current MVP needs Mentor-to-Mentee matching only; Mentee-to-Mentor, Mentor-to-Mentor, and cross-community matching are deferred

## Community-Scoped Matching

- a Mentee receives recommendations only from Mentors with an `ACTIVE` membership in the same community
- matching begins only when the Mentee explicitly starts matching in an active community
- each batch contains exactly three qualified Mentors when available, otherwise fewer
- current priorities, Mentor offerings, Mentor non-offerings, active status, pair exclusions, and quality threshold remain required matching controls
- a Mentor can be active in multiple communities, but their membership in one community must not grant visibility to Mentees in another community
- repeated regeneration prefers unseen qualified Mentors and labels a returned Mentor as `Previously shown` once the unseen pool is exhausted

## Structured Ask And Coordination

- a Mentee sends a scoped Ask to a Mentor in the same active community
- the selected topic must be both a Mentee current priority and a Mentor offering
- Mentors retain the existing 48-hour accept/decline window and structured decline reasons
- on acceptance, the Mentor provides or uses one snapshotted Calendly or LinkedIn coordination route
- OAA does not provide in-platform messaging, calendar synchronization, or verified booking in MVP

## Verification And Trust Labels

- all users verify ownership of their email address with the standard verification flow
- community membership approval is separate from email ownership verification
- no MVP label may claim McGill, alumni, program, or institutional verification unless OAA has an approved institutional process for that specific community
- permitted labels include `Community-approved member` and `Invited by [Community]`
- a community may later define optional evidence requirements, but evidence collection, visibility, retention, and deletion must be documented before it is enabled

## Explicitly Post-MVP

- cross-community Mentor discovery, scout search, and opt-in discoverability
- community analytics and supply/demand dashboards
- automatic enrollment in additional communities
- Mentee-to-Mentor and Mentor-to-Mentor matching
- bulk invitation uploads and CSV-based outreach
- institutional roster integrations, SSO, and profile synchronization
- cross-institution identity verification

## MVP Decisions Recorded

| Decision | Outcome |
| --- | --- |
| First community | MMA launches first; model remains generic. |
| Community creation | Backend manually provisions the MMA community and Community Admins from OAA-approved instructions. Platform-admin workflow is post-MVP. |
| Program Director | May be a Community Admin for MMA. |
| Existing member add | Community Admin adds a known existing verified account using exact-email lookup. |
| New member acquisition | Email-bound Mentor or Mentee invitation; invitee accepts with no second OTP. |
| Community Admin directory view | Name, role, status, offerings, non-offerings only. |
| Community Admin private-data access | Not allowed. |
| Metrics | Deferred post-MVP. |
| Cross-community discovery | Separate post-MVP requirement and team debate. |
