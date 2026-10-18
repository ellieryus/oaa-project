# Ask Lifecycle

Last updated: 2026-10-14

**Primary readers:** Backend, Frontend
**Priority:** Highest
**Read this when:** You are implementing Ask submission, Mentor inbox behavior, accept/decline, expiry, late response, or replacement handoff.

## Purpose

This feature governs scoped Asks from a Mentee to a Mentor inside the same active community.

An Ask is community-scoped. Once sent, that Mentor leaves the Mentee's `Matches` surface and the relationship is represented in that community's `Asks` surface.

## Core Rules

- a Mentee submits an Ask only when both participants have eligible `ACTIVE` membership in the same community
- the selected Ask topic must be both an active Mentee priority and a declared Mentor offering unless this rule is explicitly changed in a later decision
- the Mentee submits one required focused opening Ask
- the Mentor receives an in-app item and email notification
- the Mentor has 48 elapsed hours to accept or decline
- opening/viewing does not count as response
- acceptance is committed only after exactly one valid coordination route is selected or confirmed: Calendly or LinkedIn
- decline is final
- no response by deadline moves the Ask to `EXPIRED_AWAITING_LATE_RESPONSE`
- an expired Ask remains available to the Mentor for late accept/decline
- accepted Asks do not expire merely because coordination is incomplete

## Matches → Asks Transition

On Ask submission:

- remove that Mentor from uncontacted `Matches`
- create the community-scoped Ask
- do not top up Matches merely because an Ask was sent
- preserve remaining visible recommendations
- if the current visible recommendation set has now been fully handled, the matching feature may offer `See next recommendations`

Pending Asks do not block the next recommendation set because the Mentor has already moved out of Matches.

## Decline

A decline:

- is final
- records one structured reason
- may include one optional Mentee-visible follow-up message
- remains visible in the community's Asks history
- does not reset or regenerate the rest of the visible recommendation set

If the matching replacement conditions are met, the system may prepare exactly one qualified replacement:

```text
visible uncontacted recommendations < 3
and unseen qualified candidate exists
-> prepare one replacement
```

The Mentee receives a clear replacement-ready action such as `See your replacement`.

The replacement should be selected before reveal; the CTA reveals/adds it to Matches rather than starting an unbounded search.

## No-Response Expiry

At 48 elapsed hours without a Mentor response:

- move Ask to `EXPIRED_AWAITING_LATE_RESPONSE`
- release the original opportunity from the active Mentee flow
- preserve the Ask for late Mentor action
- if replacement conditions are met, prepare exactly one qualified replacement
- notify the Mentee without framing expiry as an explicit rejection

The late Mentor response must not remove a replacement already prepared or revealed.

## Late Response

An expired Ask may become:

- `LATE_ACCEPTED`
- `LATE_DECLINED`

Late acceptance:

- requires the same one-route coordination snapshot as normal acceptance
- appears in the Mentee's community-scoped Asks
- may create a new action such as Schedule or Connect
- does not retract any replacement recommendation

Late decline:

- records the usual structured reason/message
- remains historical
- does not affect an already-prepared replacement

## Frontend Requirements

- Ask creation begins from an eligible Mentor in the current community
- show the selected offering and relevant non-offerings during composition
- show the 48-hour response deadline
- after send, Mentor disappears from Matches and Ask appears in the same community's Asks
- do not auto-top-up Matches on send
- show decline reason and optional message in Asks
- when a qualified replacement exists, show explicit replacement-ready UX
- do not expose whether or when the Mentor viewed the Ask
- keep late outcomes clearly labeled
- private Report remains routed to OAA/backend operations, not Community Admin by default

## Backend Requirements

- create Ask with `communityId`
- validate same-community active memberships and Ask-topic compatibility at submission
- snapshot Mentee context at submission
- never mutate the Ask snapshot after profile/priority edits
- set response deadline to submission + 48 elapsed hours
- snapshot accepted coordination route and URL
- store response/expiry timestamps and relation to the original recommendation
- schedule at most one pending-Ask reminder according to the existing reminder policy
- on decline or expiry, call matching replacement logic only if the replacement conditions are satisfied
- replacement logic must create at most one qualified replacement event
- do not top up because Ask submission alone reduced visible Matches
- preserve late-response capability after expiry
- treat `NOT_AN_OFFERING` as a matching/taxonomy quality signal

## Notifications

- submission: notify Mentor
- pending reminder: follow existing one-reminder policy
- accept: notify Mentee and deep-link to community Asks
- decline: notify Mentee with outcome; if replacement exists, surface that a replacement is ready
- expiry: notify Mentee without explicit rejection framing; if replacement exists, surface it
- late accept: notify Mentee because new coordination action exists
- late decline: update community Asks; notification may remain low-priority

## Mentor Review Context

Collapsed review should prioritize:

1. selected Ask topic
2. short Mentee profile summary
3. current priorities / relevant scope
4. final opening Ask
5. supporting Mentee context

The summary must use persisted Mentee data and must not invent claims.
