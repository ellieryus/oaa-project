# For Trang: Frontend

Last updated: 2026-10-14

**Primary readers:** Frontend, UX
**Priority:** Highest

## Read First

1. `docs/product/decision-log.md`
2. `docs/features/multi_community_mvp_requirements.md`
3. `docs/features/user-flows.md`
4. `docs/features/mentee-page-spec.md`
5. `docs/features/matching.md`
6. `docs/features/request-lifecycle.md`
7. `docs/features/calendly.md`

## Global IA

Home:

- Your Communities
- Pending Requests
- Discover Communities

Global:

- Home
- Notifications
- Profile
- active-community shortcuts

Inside Mentee Community:

- Matches
- Asks

Do not create a duplicate global Ask-history experience.

## Entry And Discovery

- free entry is supported for Mentor and Mentee
- after email verification, user selects Organization
- do not label Organization as verified unless a real verification step occurred
- normal Discovery is Organization-scoped
- pre-join preview: name, organization, description, eligibility, organizer
- do not expose Mentor/member counts, names, or activity pre-join
- discoverable communities require join request + Admin approval
- invite-only communities do not appear in Discovery

## Matching UX

- current Community must be obvious
- show no more than three uncontacted recommendations
- fewer than three is valid
- relevance copy should be human-readable
- show offerings/non-offerings
- Send Ask removes Mentor from Matches; no top-up
- Not a Fit removes the card; no immediate top-up while other current recommendations remain
- after all current cards are handled, show `See next recommendations` when supply exists
- decline/expiry replacement uses explicit `See your replacement` or equivalent reveal UX
- low-supply state says more Mentors may be added and makes priority review optional

## Coordination

LinkedIn:

- open in new tab
- on return ask `Did you reach out?`
- Yes clears immediate action; Not yet preserves it

Calendly:

- inline embed + new-tab fallback
- `Go back to Ask` may mark lightweight Scheduled UX state
- do not present this as server-verified booking

## Admin UX

Admin needs:

- Join Requests
- Members
- Mentor Pool
- Invites
- Settings

Admin never sees private mentoring activity.

## Do Not Build

- public auto-join
- cross-community Mentor cards inside a Community
- global people directory
- Mentee directory
- free-form Regenerate/Refresh
- guaranteed 3-result copy
- hard-coded small-community readiness warning/threshold
