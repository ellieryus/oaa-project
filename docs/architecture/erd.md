# ERD Notes

Last updated: 2026-10-03

**Primary readers:** Backend
**Priority:** High
**Read this when:** You are modeling entities, relationships, Prisma changes, or authorization queries.

## Core Entities

- `User`
- `UserEmail`
- `Session`
- `Community`
- `CommunityMembership`
- `CommunityMembershipRole`
- `Invitation`
- `CoreProfile`
- `MentorProfile`
- `MenteeProfile`
- `CurrentPriority`
- `MenteeBackground`
- `MenteeSkill`
- `MentorBackground`
- `MentorIndustry`
- `OfferingItem`
- `Match`
- `Ask`
- `ConversationFollowUp`
- `Notification`
- `PulseSurveyInvitation`
- `PulseSurveyResponse`
- `MenteeAppreciation`
- `MentorImpactStats`
- `MentorReengagementEvent`
- `MenteeReflection`
- `MentorNote`
- `ParticipantReport`
- `AuditEvent`

## Relationship Summary

- one `User` owns one shared `CoreProfile`, many verified `UserEmail` records, and many community memberships
- one `Community` has many memberships and one or more Community Admin memberships; MVP backend provisioning creates the community and assigns its first Community Admin from an OAA-approved instruction
- one `CommunityMembership` has a community-scoped status, source, actor/audit metadata, and one or more membership roles
- one `Invitation` is unique, email-bound, community-bound, Mentor or Mentee scoped in MVP, and has expiry/revocation/acceptance state
- one user may own zero or one `MentorProfile` and zero or one `MenteeProfile`; these capabilities are not mutually exclusive
- Mentor offerings and non-offerings belong to `MentorProfile`; current priorities belong to `MenteeProfile`
- one `Match` links a Mentee membership and Mentor membership in one community and stores ranking, reason, slot, and impression metadata
- one `Ask` links a Mentee membership and Mentor membership in one community and stores an immutable Mentee-context snapshot
- one accepted Ask snapshots exactly one coordination route and URL
- one Ask may have one `ConversationFollowUp`, pulse response per participant, one Mentee appreciation action, one Mentee reflection, and one Mentor note
- one `ParticipantReport` is submitted by a Mentor or Mentee about the counterpart or an Ask/profile, and is accessible only to backend/OAA operations personnel in MVP
- notifications and audit events are first-class, role-scoped records

## Modeling Rules

- never use one exclusive `User.role` field for authorization
- authorization checks require `communityId`, an active membership, and the relevant membership role
- Community Admin exact-email lookup and directory queries must project only documented minimum identity and member-directory fields
- do not store community member personal email in Community Admin-readable tables or API responses
- all `Match` and `Ask` records require `communityId`; cross-community matching is post-MVP
- current MVP matching remains Mentee-to-Mentor. Do not generalize to Mentor-to-Mentor or Mentee-to-Mentee until product rules exist
- institutional verification, roster records, and community-specific evidence are optional integrations, not required core entities for the community-enabled MVP
- a server-verified `Meeting` and `CommunityCredential` are post-MVP and require verified-completion evidence
