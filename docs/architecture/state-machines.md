# State Machines

Last updated: 2026-09-22

**Primary readers:** Backend, Frontend  
**Priority:** Highest  
**Read this when:** You are implementing or validating lifecycle transitions and terminal states.

## Purpose

This document defines the target lifecycle states and allowed transitions for MVP 1.

## Account State Machine

```text
PENDING_ELIGIBILITY_REVIEW (alumni only)
  -> PENDING_VERIFICATION (manual approval)
  -> BLOCKED_ELIGIBILITY (manual rejection)

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

- students enter `PENDING_VERIFICATION` after eligible sign-up; alumni enter `PENDING_ELIGIBILITY_REVIEW` until an authorized reviewer confirms roster eligibility
- verification success moves the account to `ONBOARDING`
- only completed and confirmed onboarding moves the account to `ACTIVE`
- users not in `ACTIVE` cannot match, request, or schedule

## Request State Machine

```text
PENDING_ALUMNI_RESPONSE
  -> ACCEPTED
  -> DECLINED
  -> EXPIRED(NO_ALUMNI_RESPONSE)

ACCEPTED
  -> SCHEDULED
  -> EXPIRED(ACCEPTED_NOT_SCHEDULED)

SCHEDULED
  -> COMPLETED
  -> CANCELED or RESCHEDULED only from verified OAA-linked provider updates
```

Rules:

- decline is final
- no-response expiry is terminal for student action
- accepted requests open a 24-hour scheduling window
- only verified bookings move requests to `SCHEDULED`

## Match Slot State Model

```text
ACTIVE
  -> CONTACTED
  -> INACTIVE_REPLACED
  -> DECLINED
  -> EXPIRED_NO_RESPONSE
  -> EXPIRED_NOT_SCHEDULED
  -> SCHEDULED
  -> COMPLETED
```

Rules:

- matching batch starts with up to three qualified active slots; the system must not fill a missing slot with a weak or out-of-scope candidate
- only the affected slot is replaced on decline or qualifying expiry
- declined or expired student-alumnus pairs are excluded from future automated matching according to policy

## Meeting State Machine

```text
SCHEDULED
  -> RESCHEDULED
  -> CANCELED
  -> COMPLETED

RESCHEDULED
  -> CANCELED
  -> COMPLETED
```

Rules:

- only verified OAA-linked Calendly bookings create official meetings
- `CANCELED` and `RESCHEDULED` are passive record updates, not OAA participant workflows
- completed means the scheduled end time has passed
- canceled or superseded meetings do not auto-complete

## Notification Read Model

```text
UNREAD
  -> READ
```

Rules:

- inbox read state is separate from request viewed state
- request viewed state is separate from request response state
