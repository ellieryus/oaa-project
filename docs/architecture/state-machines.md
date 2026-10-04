# State Machines

Last updated: 2026-10-03

**Primary readers:** Backend, Frontend
**Priority:** Highest
**Read this when:** You are implementing or validating account, invitation, membership, Ask, or conversation-follow-up transitions.

## Account State Machine

```text
PENDING_VERIFICATION
  -> ONBOARDING

ONBOARDING
  -> ACTIVE
  -> PAUSED
  -> BANNED
```

- email verification moves an account to `ONBOARDING`
- `ACTIVE` at account level does not grant access to a community; authorization also requires the appropriate active membership

## Community Membership State Machine

```text
ACTIVE
  -> PAUSED
  -> REMOVED

INVITED
  -> ACTIVE
  -> EXPIRED
  -> REVOKED
```

- `ACTIVE` is created by a Community Admin adding an existing verified account or an invitee accepting a valid email-bound invitation after required onboarding
- there is no public join application or Community Admin review queue in MVP
- `INVITED` is created by a unique email-bound Mentor or Mentee invitation and becomes active only after that email owner accepts and completes the required role onboarding
- only an `ACTIVE` membership permits matching, Ask actions, or Community Admin actions in that community
- removal or pause blocks future actions but preserves historical Asks and audit history

## Ask State Machine

```text
PENDING_MENTOR_RESPONSE
  -> ACCEPTED
  -> DECLINED
  -> EXPIRED_AWAITING_LATE_RESPONSE

EXPIRED_AWAITING_LATE_RESPONSE
  -> LATE_ACCEPTED
  -> LATE_DECLINED

ACCEPTED
  -> remains accepted while coordination and conversation occur off-platform
```

- decline is final
- no-response expiry releases the Mentee's match slot but preserves the Ask in the Mentor's `Expired Asks` list for late accept or decline
- a late accept requires the same coordination-route snapshot as an on-time accept; the replacement match remains intact
- acceptance requires one snapshotted coordination route before it is shown to the Mentee
- accepted Asks do not expire because scheduling is incomplete
- scheduling and conversation signals are stored separately from Ask response state

## Match Slot State Model

```text
ACTIVE
  -> CONTACTED
  -> INACTIVE_REPLACED
  -> DECLINED
  -> EXPIRED_NO_RESPONSE
  -> ACCEPTED
```

- each community batch starts with up to three qualified active Mentor slots
- only the affected slot is replaced on decline or qualifying expiry
- declined or expired Mentee-Mentor pairs are excluded from future automated matching in the same community

## Self-Reported Conversation Follow-Up State

```text
UNKNOWN
  -> SCHEDULED_SELF_REPORTED
  -> NOT_SCHEDULED
  -> HAPPENED_SELF_REPORTED

NOT_SCHEDULED
  -> SCHEDULED_SELF_REPORTED
  -> HAPPENED_SELF_REPORTED
  -> DID_NOT_HAPPEN
```

- this is private participant reporting, not a verified meeting record
- one day after a Mentee-reported expected date, invite both participants to complete their private pulse
- provider-verified meeting states require post-MVP OAuth and signed Calendly webhooks

## Notification Read Model

```text
UNREAD
  -> READ
```

Inbox read state, Ask view state, response state, and lifecycle state remain separate.
