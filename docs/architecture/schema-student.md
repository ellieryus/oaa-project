# Student Schema Proposal

Last updated: 2026-09-22

**Primary readers:** Product Owner, Backend, Frontend  
**Priority:** High  
**Read this when:** You are defining the minimum student data model for profile persistence and matching.

## Purpose

This document proposes the minimum `Student` data model needed to support:

- student onboarding persistence
- profile confirmation
- matching eligibility
- first-pass matching inputs

It is intentionally narrower than the full future production schema.

## Source Of Truth

This proposal is derived from:

- `docs/product/product-brief.md`
- `docs/features/matching.md`
- `docs/architecture/state-machines.md`
- `docs/architecture/erd.md`

If this file conflicts with those docs, the higher-priority source-of-truth rules in `docs/README.md` apply.

## Business Rules This Schema Must Support

The student schema must make these product rules enforceable:

1. The student cannot start matching until the account is `ACTIVE`.
2. The student cannot start matching until required profile fields are complete and the profile is explicitly confirmed.
3. Matching must be based on student aspirations, ranked current priorities, and relevant background signals.
4. Profile data must persist across refresh and later edits.
5. The system must be able to compute whether the student is currently eligible for matching without using mock-only fields.

## Minimum Student Domain Shape

The minimum persisted student model should answer:

- who is this student
- what cohort and program are they in
- what roles are they targeting
- what one to three current kinds of help they are looking for
- what background and skills are relevant for matching
- have they completed and confirmed their profile
- are they paused from matching

## Proposed Data Model

### User

The student depends on a parent `User` record.

Required parent fields:

- `id`
- verified email identity
- `accountStatus`
- `createdAt`
- `updatedAt`

`accountStatus` should support:

- `PENDING_VERIFICATION`
- `ONBOARDING`
- `ACTIVE`
- `PAUSED`
- `BANNED`
- `BLOCKED_ELIGIBILITY`

Student and alumnus capabilities must not be represented by a single exclusive user role. One person may retain both profiles and verified program memberships as they progress from student to alumnus. See `docs/architecture/erd.md` for `UserEmail` and `ProgramMembership` requirements.

`status @default("active")` in the current Prisma schema is not compatible with the documented lifecycle.

### StudentProfile

Required persisted fields:

- `id`
- `userId`
- `cohort`
- `program`
- `targetCity`
- `experienceLevel`
- `portfolioUrl`
- `profileConfirmedAt`
- `pausedMatching`
- `createdAt`
- `updatedAt`

Notes:

- `profileConfirmedAt` is preferable to a bare boolean because it records the business event.
- `pausedMatching` should remain persisted because it affects eligibility.
- `targetCity` can remain nullable if product wants to tolerate partial progress before confirmation.

### StudentAspiration

Required persisted fields:

- `id`
- `studentProfileId`
- `role`
- `rank`

Notes:

- `rank` is required because product says the top aspiration weighs heaviest in matching.

### CurrentPriority

Required persisted fields:

- `id`
- `studentProfileId`
- `topicId`
- `rank`
- `createdAt`
- `retiredAt`

Notes:

- `topicId` must be a canonical topic ID shared with standard alumni offerings and non-offerings.
- only one to three entries may be active for a student at once; prior entries remain available for history and audit after retirement.

### StudentBackground

Required persisted fields:

- `id`
- `studentProfileId`
- `institution`
- `role`

Optional future additions:

- `location`
- `startYear`
- `endYear`

For profile + matching v1, the current minimal shape is acceptable if the team does not yet need time-bound ranking logic.

### StudentSkill

Required persisted fields:

- `id`
- `studentProfileId`
- `skill`
- `rank`

Skills are useful as secondary matching signals, but should not block profile confirmation in v1 unless product explicitly wants that.

## Persisted Vs Derived Vs UI-Only

### Persisted

These should live in the database:

- `cohort`
- `program`
- `targetCity`
- `experienceLevel`
- `portfolioUrl`
- `profileConfirmedAt`
- `pausedMatching`
- `aspirations`
- `currentPriorities`
- `background`
- `skills`

### Derived

These should be computed, not stored as source-of-truth fields:

- `matchingEligible`
- `onboardingComplete`
- `profileCompletionPercent`
- `topAspiration`

Example:

`matchingEligible` should be computed from:

- `User.accountStatus === ACTIVE`
- required student profile fields present
- `profileConfirmedAt != null`
- `pausedMatching === false`

### UI-Only

These should stay out of the persistence schema:

- progress step labels
- formatted city strings for display
- ranking helper copy like "Your top choice weighs heaviest"
- any display-only summary text

## Recommended Prisma Direction

This is a proposal snippet, not a drop-in migration.

```prisma
enum AccountStatus {
  PENDING_VERIFICATION
  ONBOARDING
  ACTIVE
  PAUSED
  BANNED
  BLOCKED_ELIGIBILITY
}

model User {
  id            String        @id @default(cuid())
  accountStatus AccountStatus @default(PENDING_VERIFICATION)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  emailAddresses UserEmail[]
  memberships    ProgramMembership[]
  studentProfile StudentProfile?
  alumnusProfile AlumnusProfile?
}

model StudentProfile {
  id                 String              @id @default(cuid())
  userId             String              @unique
  user               User                @relation(fields: [userId], references: [id])
  cohort             String
  program            String              @default("MMA")
  targetCity         String?
  experienceLevel    String?
  portfolioUrl       String?
  profileConfirmedAt DateTime?
  pausedMatching     Boolean             @default(false)
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @updatedAt

  aspirations        StudentAspiration[]
  currentPriorities  CurrentPriority[]
  background         StudentBackground[]
  skills             StudentSkill[]
  requests           Request[]
  reflections        Reflection[]
}
```

## Keep / Change / Drop From Current Prisma

### Keep

- `StudentProfile.userId`
- `StudentProfile.cohort`
- `StudentProfile.program`
- `StudentProfile.targetCity`
- `StudentProfile.experienceLevel`
- `StudentProfile.portfolioUrl`
- `StudentProfile.pausedMatching`
- `StudentAspiration.role`
- `StudentAspiration.rank`
- `CurrentPriority.topicId`
- `CurrentPriority.rank`
- `StudentBackground.institution`
- `StudentBackground.role`
- `StudentSkill.skill`
- `StudentSkill.rank`

### Change

- `User.status` -> replace with lifecycle-compatible `accountStatus`
- a single `User.email` and exclusive `User.role` -> replace with verified email identities and non-exclusive program memberships before student-to-alumni conversion is implemented
- `StudentProfile.onboardingDone` -> replace with derived completion logic plus `profileConfirmedAt`

### Drop From Source Of Truth

- any future UI convenience field that can be derived from the persisted records

## Success Criteria

This proposal is successful when:

1. a student can complete onboarding and refresh without data loss
2. the backend can compute `matchingEligible` from persisted data only
3. matching no longer depends on student mock-only fields
4. the schema supports later matching logic without requiring a student-model rewrite

## Immediate Next Step

After review, the next implementation step should be:

1. update `prisma/schema.prisma` for `User` and `StudentProfile`
2. keep the current student child tables with minimal changes
3. update `student.mock.ts` so it behaves like seed fixture data rather than schema source-of-truth
