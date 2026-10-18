# Mentee Page Specification

Last updated: 2026-10-14

**Status:** Product requirements draft aligned to the latest community-flow decisions.

## Purpose

Define the Mentee information architecture and interaction states for free entry, community discovery, profile setup, Community Matches, Community Asks, replacements, and accepted coordination.

## Global Navigation

Global navigation contains:

- `Home`
- `Notifications`
- `Profile`
- active-community shortcuts

Home is the membership/discovery hub, not a global mentoring feed.

## Home

Home contains:

### Your Communities

- active Community memberships
- CTA: `Open`
- invited membership may show `Joined via invitation`

### Pending Requests

- Community join requests under Admin review
- CTA may show the submitted request context
- pending does not grant Community access

### Discover Communities

- limited to discoverable Communities in the user's selected Organization
- excludes active/pending Communities
- no Mentor names/counts or internal activity

## Community Preview

Pre-join preview may show:

- Community name
- Organization
- description
- eligibility / who it is for
- organizer
- optional `Why would you like to join?` note

Request requires enough saved role/profile context for Admin review.

## Getting Started

The checklist may adapt to entry path.

Free entry:

- Create account
- Complete profile
- Join first Community
- Explore Mentor matches
- Send first Ask

Invited:

- Create account
- Join invited Community
- Complete profile
- Explore Mentor matches
- Send first Ask

The checklist is temporary setup guidance and disappears after completion.

## Profile

Profile may be completed manually or via a self-provided PDF draft.

### PDF rules

- self-provided PDF only
- no LinkedIn URL scraping
- extracted values are drafts
- user reviews/edits before use
- current priorities are never inferred from the PDF
- raw-file retention/deletion follows the separate PDF decision; current PM direction remains temporary processing only

### Profile content

May include:

- name
- target role/industry
- aspiration / career direction
- education
- work history
- skills
- short bio/context
- one to three structured current priorities

## Open Decision: Preference Scope

Whether priorities are global or community-specific is not yet locked.

Do not treat the current prototype's single global `profile.priorities` array as a binding architecture decision.

The same question exists for Mentor offerings.

## Community Workspace

Opening an active Community produces:

```text
[Community]
  Matches
  Asks
```

There is no canonical global Ask-history surface.

## Matches

Matches contains uncontacted Mentor recommendations for the active Community only.

Requirements:

- max three visible recommendations
- fewer is valid
- each card shows Community context, Mentor identity, role/company, relevance reason, offerings, non-offerings
- Mentor detail may show background, work history, expertise, industries, bio
- primary action: `Send an Ask`
- secondary action: `Not a fit for me`

### Send Ask

After send:

- Mentor leaves Matches
- Ask appears in Community Asks
- visible Matches are not immediately topped up
- user may continue exploring remaining cards

### Not a Fit

- optional reason
- card leaves current set
- no immediate top-up while other cards remain
- after all current cards are handled, the system may offer next recommendations

### Next Set

When current visible cards are fully handled:

- if qualified unseen Mentors remain, show `See next recommendations`
- next set contains up to three
- no Regenerate/Refresh/Show all

### Replacement Reveal

After decline/expiry, if one qualified replacement is available:

- show `A new Mentor recommendation is ready`
- explain that OAA found one qualified replacement rather than weak filler
- CTA: `View Mentor Profile` / `See your replacement`
- when revealed/back to Matches, replacement joins visible set with `New`

### Exhausted

When no qualified unseen Mentor exists:

- `No relevant recommendations are available right now`
- `More Mentors may be added later`
- optional `Review priorities`
- no forced priority change
- no cross-community fallback

Whether to show aggregate Community offering supply is a research question.

## Asks

Asks is scoped to the active Community.

Suggested sections:

- `Needs attention`
- `Active`
- `Past`

Possible states include:

- Pending
- Accepted
- Scheduled
- Connected / waiting to coordinate
- Declined
- Expired
- Late accepted / late declined
- Completed

## Accepted LinkedIn

Initial state:

- `Accepted`
- `Needs attention`
- CTA: `Connect on LinkedIn`

After opening LinkedIn:

`Did you reach out to [Mentor]?`

- Yes → Active / connected / waiting to coordinate
- Not yet → remain Needs Attention

OAA does not infer that a message was sent from opening LinkedIn.

## Accepted Calendly

- render inline Calendly using the snapshotted event URL
- new-tab fallback allowed
- no OAuth/webhook requirement
- `Go back to Ask` may mark the Ask Scheduled for MVP
- Calendly client scheduled event may also update Scheduled UX state
- do not claim provider-verified booking

## Notifications

Notifications are global but deep-link to the canonical Community action.

Examples:

- join request approved
- Ask accepted
- replacement ready

Notifications must not become a second Match/Ask data model.

## Visibility Boundary

Mentee cannot:

- browse other Mentees
- see another Community's Mentor cards from the current Community
- access pending Community internal content

## Explicitly Unresolved

- global vs community-specific priorities
- whether exhausted state should expose aggregate Mentor offerings
