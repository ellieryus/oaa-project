# Mentee Page Specification

Last updated: 2026-10-04

**Status:** Draft for PM review. Do not rebuild the standalone Mentee HTML wireframe until the open decisions below are resolved.

## Purpose

Define the Mentee information architecture and interaction states after community access. This specification covers profile completion from a self-provided PDF, Home, sidebar navigation, current-priority updates, matching entry points, Ask history, and post-acceptance tasks.

## Confirmed Rules

- a Mentee sees a community only after a Community Admin adds their existing account or they accept a valid invitation
- an `ACTIVE` membership without a confirmed Mentee profile may enter the community but cannot generate matches or send an Ask
- profile prefill accepts a generic self-provided PDF only; there is no LinkedIn URL import or scraping workflow
- parsed fields are drafts only. No parsed value is used for matching or shown to another participant until the Mentee confirms it
- every editable field uses a pencil icon beside that field; do not use a generic `Edit profile` button
- after confirmation, redirect the Mentee to Home
- sidebar options for the Mentee are `Home`, `Ask history`, `Profile`, and community icons/switcher
- `View matches` is a Home task/deep link, not an additional sidebar item
- current priorities and target direction are shared across all active community memberships; they are not duplicated per group
- Ask history is one combined timeline, with a community badge and filter on each Ask
- Mentees in the same community cannot see, search, browse, or open one another's profiles

## Mentee Access And Profile Flow

### 1. Community entry

**System state:** `ACTIVE` Mentee membership, profile incomplete.

There is no community-entry message or separate community landing page. An active community appears as an icon in the persistent sidebar rail. Clicking that icon opens matches for that community directly.

**Eligibility behavior:** when the Mentee profile required for that community is incomplete, the matches surface cannot generate cards or allow an Ask. It shows the existing profile-completion task/CTA without introducing a separate `You are in [Community]` message.

### 2. Choose profile start method

| Option | Behavior |
| --- | --- |
| `Upload a PDF` | Upload a self-provided PDF for draft extraction. This remains subject to agreement, privacy, and backend implementation approval. |
| `Fill manually` | Go directly to the same field-review screen with empty fields. |

**Upload agreement:** required copy and checkbox are still to be decided. It must state purpose limitation, user review, raw-file retention/deletion, and no training/matching inference from the raw file.

### 3. PDF processing

**Processing state:** `Reading your PDF and preparing a profile draft.`

**Failure state (proposed):** `We could not read this PDF. You can try another PDF or complete your profile manually.`

**No assumption:** do not promise that every PDF can be parsed or that every field will be extracted.

### 4. Review profile draft

Show each field as a visible value with a pencil icon. Clicking the pencil edits only that field inline or in a focused field editor; there is no page-level edit mode.

**Draft field groups to review:**

| Group | Draft fields | Status |
| --- | --- | --- |
| Identity | name, optional preferred name | required; confirm source and whether identity fields are editable |
| Direction | primary aspiration, target role, target industry | required |
| Background | education/program, prior experience, relevant background | required |
| Skills | aspiring skills / current skills | optional |
| Context | short bio, hobbies | optional; not a core matching signal |
| Current priorities | one to three ranked taxonomy topics | manual structured selection; do not infer from PDF |

**Validation behavior:**

- a missing required field shows an inline state: `Add this before you can confirm your profile.`
- optional blank fields do not block confirmation
- `Confirm profile` stays disabled until all required fields and one to three current priorities are complete
- user can replace the uploaded PDF or discard the draft before confirmation

### 5. Confirm and return Home

**Confirmation modal (proposed):**

> Your profile is ready. You can now start finding Mentors.

**Primary CTA:** `Go to Home`

**System behavior:** persist only confirmed fields, delete the raw PDF after confirmation (or after 24 hours if onboarding is abandoned), generate matching batches for every active community using shared confirmed priorities, and redirect to user-level Home.

## Home Page Specification

### Header

- greeting and Home context only; do not put an active-community switcher in the Home header
- show community identity as a compact badge on community-scoped tasks, for example `MMA` or `DGWA`

### Dashboard: To Be Completed

Show this section only when one or more active community memberships have incomplete required setup. Each card carries its community badge.

| Condition | Card message | CTA |
| --- | --- | --- |
| Mentee profile incomplete | `Complete your profile to start finding Mentors.` | `Complete profile` |
| Current priorities missing | `Choose 1–3 current priorities.` | `Set priorities` |

### Dashboard: To Do

Show only actionable items, ordered by time sensitivity.

| Condition | Card message (proposed) | CTA |
| --- | --- | --- |
| Mentor accepted Ask | `[Mentor] accepted your Ask. Choose a time or connect now.` | `Connect` |
| Mentee has reported scheduled expected date and pulse is due | `How did your conversation with [Mentor] go?` | `Share feedback` |
| Conversation happened, reflection not completed | `Add a reflection while the conversation is fresh.` | `Reflect` |
| New or active match batch exists | `You have [N] Mentor matches to explore in [Community].` | `View matches` |
| Priorities changed but matches not refreshed | `Your priorities changed. Update uncontacted matches when you are ready.` | `Update matches` |
| Mentor late-accepted an expired Ask | `[Mentor] responded to your earlier Ask in [Community].` | `Connect` |
| Mentor declined an Ask | `[Mentor] declined your Ask: [reason]. Don't worry, we'll help you find another Mentor.` | `Find another Mentor` |
| No actionable items | `You are all caught up.` | no CTA |

### Success message after profile confirmation

Show once at the top of Home:

> Your profile is ready. Start finding Mentors when you are ready.

**CTA:** `View matches`

## Matches And Mentor Cards

### Required card content

Every Mentor card must show before the Mentee can write an Ask:

- Mentor name, role, organization, and profile context
- `Why OAA suggested this` with a compact matching-algorithm icon, for example `⌘`
- one human-readable structured reason, for example: `Offers CV / resume review and works in finance.`
- declared offerings
- declared non-offerings

**Algorithm explanation behavior:** the icon labels the explanation as system-generated and should have accessible text such as `Why OAA suggested this`. Expanded helper copy:

> Based on your current priorities, this Mentor's declared offerings, and active membership in [Community].

Do not call this explanation `AI` unless the released matching implementation actually uses an AI model for this purpose. `OAA matching algorithm` is accurate for structured ranking.

## Accepted Ask: Calendly And LinkedIn

### Calendly route

When a Mentor accepted with a public Calendly event URL, the accepted Ask page renders the **actual inline Calendly widget** inside the page. It must not render OAA-created time slots, an `Open scheduling preview` control, or a self-report prompt next to the booking UI.

Implementation uses the snapshotted public event URL and Calendly's embed script:

```html
<div id="calendly-embed" style="min-width: 320px; height: 750px"></div>
<script src="https://assets.calendly.com/assets/external/widget.js"></script>
<script>
  Calendly.initInlineWidget({
    url: acceptedAsk.snapshottedCalendlyUrl,
    parentElement: document.getElementById("calendly-embed"),
  });
</script>
```

- show a `Open Calendly in a new tab` fallback using the same snapshotted URL
- no Calendly OAuth, API, webhook, provider event tracking, or OAA-created availability data is needed for this embed-only MVP
- do not self-report the selected date from a Calendly click. The post-acceptance timing flow remains a separate system prompt one day after acceptance

Calendly documents inline embeds through `Calendly.initInlineWidget`, using a public scheduling URL and a parent element. [Calendly embed documentation](https://developer.calendly.com/api-docs/overview/embedding/getting-started)

### LinkedIn route

When the accepted route is LinkedIn, render only `Connect with [Mentor] on LinkedIn` using the snapshotted URL in a new tab. Do not render Calendly UI or scheduling prompts.

## Timing, Pulse, Reflection, And Coffee Bag

This is not a sidebar destination and must not appear inside the Calendly embed. It is one Ask-scoped `Conversation check-in` panel, opened from either the relevant Home task or that Ask's entry in the combined Ask history.

### Wireframe placement

The standalone Mentee wireframe must show this as a dedicated screen or modal immediately after the accepted-Ask coordination screen:

1. **Timing check-in:** sent one day after acceptance. Ask `When did or will your conversation with [Mentor] happen?` with `It already happened`, `It is scheduled`, and `Not scheduled yet`.
2. **If scheduled:** collect an expected date only. One day after that date, open the pulse/reflection panel from a Home task.
3. **If not scheduled:** optionally collect `Mentor has not responded`, `Scheduling conflict`, `We are no longer meeting`, `Other`, or `Prefer not to say`. Send one follow-up after three days; do not send more scheduling reminders.
4. **Pulse and reflection:** when the Mentee reports the conversation happened, or when the expected-date pulse is due, open the same Ask-scoped panel. It must identify the Mentor and carry the Ask's community badge.

### Mentee pulse and reflection panel

**Header:** `How did your conversation with [Mentor] go?`

| Section | Prompt | Input | Visibility |
| --- | --- | --- | --- |
| Match quality | `Was this conversation helpful?` | required simple response | private to OAA operations/product measurement |
| Expectation fit | `Did it match what you expected?` | required simple response | private to OAA operations/product measurement |
| Reflection | `What will you take away or do next?` | optional short free text | private to the Mentee |
| Appreciation | `Send a Coffee Bag to [Mentor]` | optional one-time action | visible only to the participating Mentor |

- on submit, mark the relevant pulse/reflection task complete and return the Mentee to Home or the originating Ask history entry
- do not expose either participant's pulse answers or reflection to the other participant, Community Admin, or other Mentees
- the Mentee may skip the optional reflection and Coffee Bag, but not the required pulse answers once they choose to submit the check-in
- this is self-reported product feedback. It does not verify a Calendly booking, meeting attendance, cancellation, or no-show

## Sidebar And Community Switcher

| Sidebar item | Scope | Behavior |
| --- | --- | --- |
| `Home` | user-level | shows the user dashboard; community-scoped tasks carry a group badge |
| `Ask history` | user-level | one combined timeline of all communities; each entry shows its community badge and supports filtering |
| `Profile` | mixed | shows shared profile fields plus community-specific profile setup where applicable |
| Community icon rail | active memberships only | Discord-style persistent icons for MMA, DGWA, or another active community; no discovery/browse list. Clicking an icon opens only that community's available Mentor matches, never a Mentee list. |

## Current Priorities And Match Update

1. Mentee changes one to three ranked current priorities through pencil icons next to priority fields.
2. Save does not change current cards automatically.
3. Mentee selects `Update matches` from Home or Matches.
4. Confirmation message:

> Updating your priorities will replace all Mentor cards you have not contacted. Sent, accepted, and historical Asks will not change.

5. `Update matches` replaces only uncontacted cards in the active community. Regeneration remains unseen-first; repeats are labelled `Previously shown` only when unseen eligible Mentors are exhausted.

## Declined Ask And One-Slot Replacement

- Ask history and Home show `Declined` with the Mentor's structured decline reason and optional Mentee-visible message
- show supportive system copy below the outcome: `Don't worry, we'll help you find another Mentor.`
- the decline state includes `Find another Mentor`
- selecting it generates one replacement only for the declined Ask's affected slot in that Ask's community; it does not regenerate the entire batch or replace other cards
- if no qualified replacement exists, replace the CTA with the approved low-supply state instead of weakening matching rules

## Ask History

- include sent, accepted, declined, `EXPIRED_AWAITING_LATE_RESPONSE`, late accepted, and late declined Asks
- never expose Mentor viewed/read status to the Mentee
- when a Mentor late responds, surface the Mentor name and outcome in Ask history; a late acceptance includes the normal coordination route
- include a private `Report` action; it routes to backend/OAA operations, not Community Admin

## Open Decisions Required Before HTML Rebuild

1. Confirm preferred specific decline copy and low-supply copy.
2. Final agreement checkbox copy and parsing provider.
