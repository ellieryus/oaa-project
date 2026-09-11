# Alumni Retention, Re-engagement, And Recognition

Last updated: 2026-09-11

**Primary readers:** PM, Backend, Frontend
**Priority:** High
**Read this when:** You are implementing alumni notifications, appreciation, impact summaries, or community-recognition credentials.

## Purpose

This feature defines a low-frequency alumni-retention model. OAA should retain alumni through truthful student interest, appreciation, demonstrated impact, and earned recognition rather than repeated request reminders.

## Product Intent

The retention model distinguishes:

1. request reminders for an active Coffee Run request
2. re-engagement signals that give an inactive alumnus a truthful reason to return
3. impact recognition based on stored OAA activity
4. community recognition through one earned digital credential in MVP 1

OAA must not repeatedly message an alumnus simply because they did not respond to a request.

## Request Reminder Policy

- a Coffee Run request creates an immediate email and in-app inbox item for the alumnus
- each pending request may send at most one reminder at 24 elapsed hours after submission
- if the request is no longer pending, any unsent reminder must be suppressed
- after this reminder, OAA sends no further request-specific reminder emails; normal 48-hour expiry remains unchanged
- the reminder copy depends on `first_viewed_at`:
  - when null: `You have an unopened Coffee Run` with CTA `View Coffee Run`
  - when present: `Your Coffee Run is waiting for a response` with CTA `Respond`
- OAA must not call a request unopened after its full request has been viewed
- OAA must not frame an expired request as pending in a later engagement message

## Re-engagement

Re-engagement is distinct from request reminders and must be caused by a genuine current event.

- an alumnus becomes eligible for non-urgent re-engagement after seven days without activity
- a re-engagement message must not fabricate student interest, impact, or recognition
- the implementation must apply low-frequency suppression so an alumnus does not receive multiple non-urgent engagement emails in a short period
- a re-engagement message does not change the status of any request

### Student Interest

When a genuinely relevant student interest or matching event exists, OAA may send an inactive alumnus:

> Someone wants to learn from your experience
>
> A student is interested in your experience in {{relevant_area}}.

The CTA is `See who's interested`. This message may be sent only when the underlying eligible student or matching event exists.

## Student Appreciation

After a completed meeting, a student may send exactly one appreciation action to the participating alumnus:

- `THANK_YOU`
- `COFFEE_BAG`, a more prominent virtual big thank you

The action may include an optional thank-you note of up to 280 characters. It is a social acknowledgement, separate from the student's private pulse feedback and reflection.

- `Coffee Bag` has no monetary value and does not transfer a coffee, gift card, donation, or other benefit
- the associated alumnus is the only participant who can view the action and optional note
- appreciation does not open a messaging thread or create a follow-up obligation
- when appreciation is sent, create one alumni notification; email delivery is allowed only when alumni email notifications are enabled

Suggested notification:

> {{student_first_name}} sent you a big thank-you

> View message

## Alumni Impact Summary

OAA may show an alumnus an impact summary in their profile or impact area and may send one optional monthly digest when meaningful data exists.

Valid metrics include only values derived from stored OAA events:

- verified OAA conversations completed
- distinct students met
- thank-you or Coffee Bag actions received
- positive post-meeting feedback, where collected
- ask topics supported
- response reliability

OAA must not claim an alumnus helped a student reach a goal unless OAA has collected evidence for that outcome.

Preferred wording:

> This month, you completed 3 career conversations.

> 3 students spoke with you through OAA this month.

An impact digest is limited to one per applicable monthly period and must be suppressed or simplified when no meaningful impact data exists.

## Community Recognition Credential

MVP 1 launches one badge only:

### OAA Community Contributor

Eligibility:

- at least three verified OAA conversations completed
- alumnus is in good platform standing
- meetings originate from verified OAA scheduling records

Credential fields:

- credential name: `MMA Community Contributor`
- issuing organization: `Master of Management Analytics (MMA)`
- unique credential ID
- earner name
- issue date
- badge type
- public verification URL
- credential status: `ACTIVE` or `REVOKED`

The team must obtain program authorization before externally issuing a credential in the name of Master of Management Analytics (MMA) or using its brand assets. Until that authorization exists, the feature must not imply an official McGill credential.

An earned credential must provide a public verification page such as:

```text
oneaskaway.ca/credentials/{credential_id}
```

The MVP LinkedIn flow is lightweight: downloadable badge artwork, credential URL, credential ID, and instructions or a direct Add to Profile flow where technically supported. A LinkedIn profile API integration is not required.

Badge processing must be idempotent. Reprocessing the same completion milestone must not issue duplicate credentials.

## Student-Facing Impact Signals

OAA may later show simple, non-competitive signals on alumni profiles:

- completed OAA conversations
- thank-you count
- OAA Community Contributor badge

MVP must not create a public leaderboard or rank alumni by contribution volume.

## Data And Technical Review

The technical lead may consolidate these into existing notification and event tables where appropriate:

- derived alumni impact statistics
- student appreciation action, with a unique `(meeting_id, student_user_id, alumnus_user_id)` constraint
- community credential, with a unique `(user_id, credential_type)` constraint for non-repeatable badges
- re-engagement event and notification-suppression metadata

Technical review must propose:

1. the idempotent job for the 24-hour pending-request reminder and state-based copy
2. the simplest low-frequency suppression mechanism for non-urgent engagement notifications
3. whether impact metrics are derived dynamically or stored as aggregates
4. the idempotent badge-eligibility job at the third verified completed meeting
5. the simplest public credential page and LinkedIn-sharing implementation

