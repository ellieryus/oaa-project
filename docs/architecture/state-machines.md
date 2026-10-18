# State Machines

Last updated: 2026-10-14

**Primary readers:** Backend, Frontend
**Priority:** Highest

## Account State

```text
PENDING_VERIFICATION
  -> ONBOARDING
  -> ACTIVE
  -> PAUSED
  -> BANNED
```

Account activity does not grant community access.

## Organization Selection State

Organization selection is discovery context, not membership.

```text
UNSELECTED
  -> SELECTED
```

A future verification state may be added for Admin creator verification, but ordinary community discovery does not require organization-level approval.

## Community Join Request

```text
REQUESTED
  -> APPROVED
  -> DECLINED
  -> WITHDRAWN (optional implementation)
```

- `REQUESTED` grants no community access
- approval creates/activates the requested community role membership
- decline behavior/copy may be refined without changing membership semantics

## Invitation State

```text
INVITED
  -> ACCEPTED
  -> EXPIRED
  -> REVOKED
```

Accepted invitation creates/activates the granted community role membership after required profile review.

## Community Membership State

```text
ACTIVE
  -> PAUSED
  -> REMOVED
```

Membership source may be:

- join request approval
- direct invitation
- exact-email Admin add

Only `ACTIVE` membership permits community mentoring actions for the granted role.

## Ask State

```text
PENDING_MENTOR_RESPONSE
  -> ACCEPTED
  -> DECLINED
  -> EXPIRED_AWAITING_LATE_RESPONSE

EXPIRED_AWAITING_LATE_RESPONSE
  -> LATE_ACCEPTED
  -> LATE_DECLINED
```

Accepted Ask coordination state is tracked separately.

## Mentee Recommendation State

A candidate may move through product states such as:

```text
UNSEEN
  -> VISIBLE
  -> CONTACTED
  -> NOT_FIT
  -> REPLACEMENT_READY
  -> HISTORICAL
```

The exact persistence schema may differ.

Rules:

- no more than three `VISIBLE` uncontacted recommendations per community
- `CONTACTED` moves the Mentor into Asks and does not trigger top-up
- `NOT_FIT` removes the Mentor without immediate top-up
- when no current `VISIBLE` recommendation remains and unseen qualified supply exists, next-set CTA may appear
- decline/expiry may produce exactly one `REPLACEMENT_READY` candidate if visible supply is below three
- revealing the replacement returns it to `VISIBLE` with a New state

## Coordination State

LinkedIn example:

```text
NEEDS_OUTREACH
  -> LINKEDIN_OPENED
  -> CONNECTED_WAITING_TO_COORDINATE
```

Calendly example:

```text
NEEDS_SCHEDULING
  -> SCHEDULED_UI_STATE
```

`SCHEDULED_UI_STATE` is not provider-verified booking evidence.

## Self-Reported Conversation Follow-Up

Existing private follow-up states remain separate from Ask and coordination state.

## Community Creation

User-facing Admin/community creation is intended, but the creator verification/authority mechanism remains open.

Do not invent a Mentor-count activation state. No numeric community-readiness gate is currently approved.
