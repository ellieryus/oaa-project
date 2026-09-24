# State Machines

Last updated: 2026-09-24

**Primary readers:** Backend, Frontend  
**Priority:** Highest  
**Read this when:** You are implementing or validating lifecycle transitions and terminal states.

## Purpose

This document defines the target lifecycle states and allowed transitions for MVP 1.

## Account State Machine

```text
PENDING_VERIFICATION
  -> ONBOARDING
  -> BLOCKED_ELIGIBILITY (optional support state)

ONBOARDING
  -> ACTIVE

ACTIVE
  -> PAUSED
  -> BANNED
```

Rules:

- students enter `PENDING_VERIFICATION` after eligible sign-up; approved alumni enter `PENDING_VERIFICATION` after their personal-email ownership check begins
- verification success moves the account to `ONBOARDING`
- only completed and confirmed onboarding moves the account to `ACTIVE`
- users not in `ACTIVE` cannot match, send requests, or access accepted-request coordination

## Alumni Access Request State Machine

```text
PENDING_REVIEW
  -> APPROVED (manual roster review)
  -> REJECTED (manual roster review)

APPROVED
  -> PENDING_VERIFICATION (create alumni account and send code)

REJECTED
  -> PENDING_REVIEW (corrected alumni resubmission creates a new review attempt)
```

Rules:

- every alumni access request is manually reviewed by the backend developer through backend/database tooling in beta and MVP 1
- only `APPROVED` requests may create a pending alumni account and send a verification code
- rejection must not disclose roster-match details; a corrected submission retains the earlier request and begins a new review attempt

## Request State Machine

```text
PENDING_ALUMNI_RESPONSE
  -> ACCEPTED
  -> DECLINED
  -> EXPIRED(NO_ALUMNI_RESPONSE)

ACCEPTED
  -> remains accepted while coordination and conversation occur off-platform
```

Rules:

- decline is final
- no-response expiry is terminal for student action
- acceptance requires one snapshotted coordination route before it is exposed to the student
- accepted requests do not expire because scheduling is incomplete
- scheduling and completion signals are stored separately from request response state

## Match Slot State Model

```text
ACTIVE
  -> CONTACTED
  -> INACTIVE_REPLACED
  -> DECLINED
  -> EXPIRED_NO_RESPONSE
  -> ACCEPTED
```

Rules:

- matching batch starts with up to three qualified active slots; the system must not fill a missing slot with a weak or out-of-scope candidate
- only the affected slot is replaced on decline or qualifying expiry
- declined or expired student-alumnus pairs are excluded from future automated matching according to policy

## Self-Reported Conversation Follow-Up State

```text
UNKNOWN
  -> SCHEDULED_SELF_REPORTED (expected date supplied)
  -> NOT_SCHEDULED
  -> HAPPENED_SELF_REPORTED

NOT_SCHEDULED
  -> SCHEDULED_SELF_REPORTED
  -> HAPPENED_SELF_REPORTED
  -> DID_NOT_HAPPEN
```

Rules:

- this is private participant reporting, not a verified booking or meeting record
- one day after a student-reported expected date, invite both participants to complete their private pulse
- post-MVP provider-verified meeting states require OAuth and signed Calendly webhooks

## Notification Read Model

```text
UNREAD
  -> READ
```

Rules:

- inbox read state is separate from request viewed state
- request viewed state is separate from request response state
