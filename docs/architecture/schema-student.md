# Mentee Schema Proposal

Last updated: 2026-10-03

**Primary readers:** Product Owner, Backend, Frontend
**Priority:** High

## Purpose

This proposal defines the minimum Mentee persistence model for community-scoped matching. The legacy filename remains temporarily for repository continuity; `MenteeProfile` is the documented target entity.

## Minimum Domain Shape

```text
User
  -> UserEmail[]
  -> CoreProfile
  -> MenteeProfile?
  -> MentorProfile?
  -> CommunityMembership[]
```

### MenteeProfile

Required fields:

- `id`
- `userId`
- `profileConfirmedAt`
- `pausedMatching`
- `createdAt`
- `updatedAt`

Optional profile fields may include target city, experience level, portfolio URL, program, or cohort. None creates community access by itself.

### MenteeAspiration

- `id`
- `menteeProfileId`
- `role`
- `rank`

### CurrentPriority

- `id`
- `menteeProfileId`
- `topicId`
- `rank`
- `createdAt`
- `retiredAt`

One to three priorities may be active at once. `topicId` is shared with Mentor offerings and non-offerings.

### MenteeBackground And MenteeSkill

Persist relevant background and skills as child records. They support ranking but do not replace structured current priorities.

## Eligibility Rule

A Mentee can start matching only when:

1. their account email is verified;
2. `MenteeProfile.profileConfirmedAt` exists;
3. their `CommunityMembership` is `ACTIVE` with role `MENTEE` for the selected community; and
4. they are not paused from matching.

## Migration Rules

- replace legacy `StudentProfile` references with `MenteeProfile`
- replace `ProgramMembership` as authorization source with `CommunityMembership` and `CommunityMembershipRole`
- preserve a user-owned MentorProfile and MenteeProfile as non-exclusive capabilities
- every Match and Ask must reference `communityId`, Mentee membership, and Mentor membership
- do not infer role or community authorization from a single email domain

## Acceptance Criteria

- a Mentee can complete onboarding, be approved into a community, and refresh without data loss
- a Mentee can maintain one to three ranked current priorities
- matching never returns a Mentor outside the selected active community
- Prisma queries can evaluate eligibility without mock-only fields
