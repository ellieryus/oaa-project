# Calendly, LinkedIn, And Coordination

Last updated: 2026-10-14

**Primary readers:** Backend, Frontend, Product Designer
**Priority:** Highest

## Purpose

This feature gives a Mentee one clear Mentor-selected route after an Ask is accepted.

OAA does not become a native chat, calendar, or rescheduling product.

## Mentor Coordination Preference

- coordination setup is optional before a Mentor receives Asks
- coordination setup never affects matching eligibility
- a Mentor may save a default Calendly URL or LinkedIn profile URL
- when accepting an Ask, a saved default may be prefilled
- the Mentor can edit or switch the method before committing acceptance
- a newly entered/edited method may optionally be saved as the future default
- acceptance snapshots the exact method and URL for that Ask
- future default changes never mutate an already accepted Ask

If no valid route is available, the Mentor must choose one before acceptance is committed.

## Calendly Route

Mentor:

- provides a public event-type booking URL
- OAA validates URL format, not actual open times
- saved Calendly may be prefilled at acceptance
- product may remind the Mentor to keep availability current

Mentee:

- sees an inline Calendly embed when the accepted Ask uses Calendly
- has a new-tab fallback using the same snapshotted URL
- may have name/account email prefilled where supported

MVP scheduling state:

- if the embedded Calendly client emits a successful scheduled event, OAA may mark the Ask `Scheduled`
- for MVP, returning through the explicit `Go back to Ask` action after the user finishes scheduling may also mark the Ask `Scheduled`
- this is an intentional lightweight UX convention, not provider-verified booking infrastructure
- OAA must not claim server-verified booking based solely on this state

## LinkedIn Route

- Mentor supplies or confirms a valid LinkedIn profile URL
- Mentee CTA: `Connect with [Mentor] on LinkedIn`
- open LinkedIn in a new tab
- opening LinkedIn does not prove outreach happened

When the Mentee returns, OAA asks:

`Did you reach out to [Mentor]?`

- `Yes, I sent a message` → clear the immediate action and mark coordination as connected/waiting to coordinate
- `Not yet` → keep the Ask in Needs Attention

OAA does not create or inspect LinkedIn messages.

## Community-Scoped Placement

Accepted Ask actions live inside the relevant community's `Asks` surface.

Global Notifications may deep-link to the relevant community Ask but must not create a second canonical Ask history.

## Self-Reported Conversation Follow-Up

Existing private conversation follow-up remains separate from Ask acceptance/coordination state.

Where implemented:

- Mentee may report whether the conversation happened, is scheduled, or is not scheduled
- private pulse/reflection data remains participant-private
- an accepted Ask does not expire merely because follow-up is incomplete

This document does not require the current community-flow prototype to include the full pulse/reflection journey.

## MVP Boundary

- no Calendly OAuth
- no server-to-server Calendly API dependency
- no webhook requirement
- no native calendar sync
- no native rescheduling/cancellation product
- no in-platform messaging
- no personal-email sharing
- no provider-verified completion claim

A browser-level Calendly scheduled event or `Go back to Ask` confirmation may update UX state, but must not be represented as verified booking infrastructure.
