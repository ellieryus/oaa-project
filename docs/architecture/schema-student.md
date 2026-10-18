# Mentee Schema Proposal

Last updated: 2026-10-14

**Primary readers:** Product Owner, Backend, Frontend
**Priority:** High

## Purpose

Define the minimum Mentee persistence shape while preserving community-scoped authorization and the open decision around global vs community-specific matching preferences.

## Minimum Domain Shape

```text
User
  -> UserEmail[]
  -> CoreProfile
  -> MenteeProfile?
  -> MentorProfile?
  -> CommunityMembership[]
```

Organization/discovery context and community join requests are modeled outside `MenteeProfile`.

## MenteeProfile

Required/core fields may include:

- `id`
- `userId`
- `profileConfirmedAt`
- `pausedMatching`
- `createdAt`
- `updatedAt`

Optional profile fields may include target role/industry, experience, portfolio, program/cohort, bio, or other approved context.

None creates community access by itself.

## CurrentPriority

Current MVP requires one to three ranked active priorities.

Baseline shape:

- `id`
- `menteeProfileId`
- `topicId`
- `rank`
- `createdAt`
- `retiredAt`

`topicId` is shared with Mentor offerings/non-offerings.

## Open Preference Scope Decision

Do not treat global priority ownership as permanently locked.

Two valid architecture directions remain:

### Global

```text
MenteeProfile -> CurrentPriority[]
```

### Community override

```text
MenteeProfile
CommunityMembership -> CommunityMenteePreference -> PriorityOverride[]
```

User research and Backend complexity should determine the final MVP choice.

The product requirement is that matching in each community uses the intended current Mentee needs without creating contradictory hidden behavior.

## Eligibility

A Mentee may match in a selected community only when:

1. email ownership is verified;
2. required Mentee profile is confirmed;
3. `CommunityMembership` is `ACTIVE` with `MENTEE`;
4. matching is not paused;
5. current matching inputs required by the final preference-scope design exist.

## Migration Rules

- replace legacy `StudentProfile` references with `MenteeProfile`
- do not authorize from email domain or selected Organization alone
- use `CommunityMembership` + role for community access
- every Match and Ask references `communityId`, Mentee membership, and Mentor membership
- preserve non-exclusive Mentor/Mentee capabilities
- do not implement cross-community matching

## Acceptance Criteria

- free-entry Mentee can create account, select Organization, request Community access, become approved, and retain state after refresh
- invited/add-by-email Mentee paths also work
- one to three priorities can be stored under the final chosen preference scope
- selected community never returns a Mentor outside that community
