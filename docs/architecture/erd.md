# ERD Notes

Last updated: 2026-10-14

**Primary readers:** Backend
**Priority:** High
**Read this when:** You are modeling entities, relationships, Prisma changes, or authorization queries.

## Core Entities

### Identity And Organization

- `User`
- `UserEmail`
- `Session`
- `Organization`
- `UserOrganizationAffiliation` or equivalent discovery-context record
- `CoreProfile`

### Community

- `Community`
- `CommunityMembership`
- `CommunityMembershipRole`
- `CommunityJoinRequest`
- `Invitation`
- `CommunityAdminApplication` / `CommunityCreationRequest` **proposed; final creator-verification model open**

### Profiles And Matching

- `MentorProfile`
- `MenteeProfile`
- `CurrentPriority`
- `MenteeBackground`
- `MenteeSkill`
- `MentorBackground`
- `MentorIndustry`
- `OfferingItem`
- `Match` / recommendation-state records

### Ask And Follow-Up

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
- one user may have one selected/discovery affiliation and may later support richer affiliation history if needed
- selecting an Organization does not itself create community authorization
- one `Organization` has many communities
- one `Community` belongs to an Organization for normal discovery
- one `Community` has visibility such as `DISCOVERABLE_APPROVAL_REQUIRED` or `INVITE_ONLY`
- one `CommunityJoinRequest` links an applicant, community, requested role(s), optional note, and review outcome
- one `CommunityMembership` has community-scoped status, source, actor/audit metadata, and one or more roles
- membership source may include `JOIN_REQUEST`, `DIRECT_INVITE`, `ADMIN_ADD`
- explicit Admin invite/add may create membership even when the user's selected Organization differs from the Community's Organization
- one `Invitation` is unique, email-bound, community-bound, role-scoped, and expiry/revocation-aware
- a user may own `MentorProfile`, `MenteeProfile`, or both
- one `Match` links one eligible Mentee membership and one eligible Mentor membership inside exactly one community
- one `Ask` links one Mentee membership and one Mentor membership inside exactly one community
- accepted Ask snapshots exactly one coordination route
- notifications/audit events remain first-class

## Authorization Rules

- never use one exclusive `User.role`
- every community action checks `communityId`, membership status, and community role
- selected organization is not an authorization source for mentoring actions
- normal Discovery may filter by `Community.organizationId == selectedOrganizationId`
- explicit Admin invite/add is a deliberate exception to normal discovery and may cross organizations
- exact-email Admin lookup must not become global browse/search
- all Match and Ask records require one `communityId`
- cross-community Match/Ask records are invalid for MVP

## Recommendation Modeling

Backend needs enough state to distinguish:

- visible uncontacted recommendations
- unseen qualified candidates
- contacted Mentors
- `Not a fit`
- unavailable/declined/expired pair exclusions
- replacement-ready candidate
- historical impressions

Implementation may use Match rows, recommendation-set rows, event history, or an equivalent normalized design.

The model must enforce a maximum of three visible uncontacted recommendations per Mentee per community.

## Open ERD Decision: Global vs Community-Specific Preferences

Current priorities and Mentor offerings may remain global or gain community-specific overrides.

Possible extension:

```text
CommunityMenteePreference
  -> communityMembershipId
  -> priority / intent overrides

CommunityMentorScope
  -> communityMembershipId
  -> offering / non-offering overrides
```

Do not add these entities as a binding requirement until Backend/Product/user research resolves the decision.

## Community Creator Model

User-facing community creation is intended, but the verification/authority workflow is unresolved.

Backend may need a request/application entity to represent:

- applicant user
- organization
- proposed community
- organizational email/identity evidence
- review/verification status
- created community/admin membership

Exact fields and reviewer authority are TBD.

## No Mentor-Pool Threshold

Do not add a hard-coded `minimumMentorCount` or activation constraint as an approved business rule.

Pool readiness remains a research/simulation question.
