# One Ask Away - Community-Enabled MVP Requirements

Last updated: 2026-10-14

**Primary readers:** PM, Backend, Frontend, Product Designer  
**Priority:** Highest  
**Read this when:** You are implementing community discovery, access, invitations, join requests, Admin review, role-aware profiles, or community-scoped matching.

## Purpose

One Ask Away is a community-enabled platform for short, scoped career conversations. MMA is the first launch community, not a platform-wide identity requirement. The MVP must support additional approved communities without rebuilding the account, membership, role, or matching model.

This document is binding for the community model.

For the first MMA pilot, the working rollout assumption is approximately 50–60 participating alumni and approximately 90 students/Mentees. These are planning assumptions only. They must not be hard-coded into product logic, community creation, or matching thresholds.

Users may hold different roles over time. A current student may later participate as a Mentor after graduation, and one user may hold Mentor, Mentee, or both capabilities where permitted.

Cross-community matching is not part of the MVP. Access to another community's Mentor pool must happen through membership in that community.

## Core Product Model

- one person has one `User` account and one or more verified email identities
- a user can belong to multiple communities over time
- access, roles, and matching eligibility are determined by `CommunityMembership`, not by a global exclusive user role
- a membership may grant `MENTOR`, `MENTEE`, `COMMUNITY_ADMIN`, or an allowed combination of roles
- Mentor and Mentee are product roles; the product facilitates scoped career conversations and does not promise a long-term mentorship relationship
- Mentor and Mentee are not mutually exclusive roles and must not be modeled as a destructive role switch
- a user may join as a Mentee today and later gain Mentor access in the same or another community
- participant discovery is directional in MVP: a Mentee may discover eligible Mentors inside an active community, but Mentees cannot browse, search, or view other Mentees
- community membership is the access boundary for mentoring activity
- organization affiliation is primarily a discovery context; it does not by itself grant community membership

## Organization Affiliation And Discovery

### Free-entry affiliation selection

Both Mentors and Mentees may enter OAA through open signup.

After account verification, a free-entry user selects their university or organization affiliation from a searchable canonical list. If the organization is not available, the product may capture a user-provided organization name for later handling.

Selecting an organization:

- scopes the communities shown in `Discover Communities`
- does not automatically grant access to any community
- does not by itself constitute institutional verification
- must not be labeled as `verified` or `confirmed` unless a real verification process has occurred

For example:

```text
User creates account
-> verifies email ownership
-> selects McGill University as affiliation
-> sees eligible discoverable McGill communities
-> requests access to a specific community
-> Community Admin approves or declines that community request
```

There is no separate organization-level approval required before a user can browse discoverable communities in the selected organization.

### Cross-program access

Program membership is not a hard matching or access filter.

A user from one program may request access to another community under the same organization. For example, an MMR student may request to join the MMA community. The MMA Community Admin decides whether that applicant should be admitted.

```text
Cross-program access is allowed.
Cross-community matching is not.
```

### Cross-organization access by explicit Admin action

Normal community discovery remains organization-scoped.

However, an explicit Community Admin invitation or existing-account add may grant membership across organization boundaries. This applies to both Mentors and Mentees.

For example:

- an MMA Admin may invite a Mentor whose current employer is Deloitte
- an MMA Admin may invite a Mentee whose selected affiliation is Concordia
- once accepted/added, that user becomes a member of MMA and may participate according to the granted role

An explicit Admin invitation or add is an intentional membership decision. It does not make unrelated communities discoverable to that user.

## Global And Community Information Architecture

After account setup, the global Home acts as the membership and discovery hub.

### Global Home

Home contains:

- `Your Communities`
- `Pending Requests`
- `Discover Communities`

Global navigation contains:

- `Home`
- `Notifications`
- `Profile`
- shortcuts to active communities

Mentoring activity must not be duplicated into a second global matching or Ask history surface.

### Community workspace

Opening an active community creates an explicit community context.

For MVP, the Mentee community workspace contains:

```text
[Community]
  -> Matches
  -> Asks
```

`Matches` contains uncontacted Mentor recommendations for that community.

`Asks` contains Mentors the Mentee has already contacted in that community, including Pending, Accepted, Scheduled/Active, Declined, Expired, and completed/past states as defined by the Ask lifecycle.

A user may belong to multiple communities, but each community retains its own matching and Ask context.

## Community Visibility And Preview

MVP supports two community visibility modes:

### `DISCOVERABLE_APPROVAL_REQUIRED`

- appears in `Discover Communities` to users whose selected organization matches the community organization
- viewing the community does not grant access
- the user must request membership
- a Community Admin approves or declines the request before membership becomes active

### `INVITE_ONLY`

- does not appear in normal community discovery
- access requires an explicit Community Admin invitation or existing-account add

MVP does not include a `PUBLIC_OPEN` or auto-join community mode.

### Pre-join community preview

A non-member may see only the minimum information needed to understand whether the community is relevant:

- community name
- organization
- short description
- eligibility / who the community is for
- organizer

The preview must not expose:

- Mentor names or profiles
- Mentor count or member count
- internal offerings distribution
- member directory
- internal activity
- Asks or matching activity

## Community Admin

A Community Admin is scoped to a specific community. The same user may administer more than one community if separately authorized.

Community Admin can:

- review Mentor and Mentee join requests for their community
- approve or decline a join request
- add a known existing account by exact-email lookup
- create a direct email-bound invitation for a known Mentor or Mentee
- grant the appropriate community role or roles
- view the operational member directory for their community
- view the Mentor pool for operational supply management
- pause or remove a membership
- edit allowed community settings, including description and visibility
- manage pending invitations
- maintain an appropriate Mentor pool for the intended community

Community Admin cannot:

- see member authentication records or email-verification records
- browse a global user directory
- see private pulse answers, reflections, Mentor notes, scheduling status, coordination URLs, or direct-message content
- edit a participant's priorities, offerings, non-offerings, Ask content, decision, or coordination preference
- see another community's private membership or mentoring activity

### Join-request review context

When reviewing a request, Community Admin may use the applicant's saved profile context relevant to membership review, such as:

- name
- education / program
- work history
- bio or background
- skills
- current direction
- current priorities or Mentor scope, where available
- optional join-request note

Admin must not see private mentoring activity, including:

- current or historical Matches
- Ask history
- Mentor acceptance/decline behavior
- scheduling details
- private pulse or reflection content
- private Mentor notes

Decline is supported. A decline reason may be captured, but the exact reason requirement and whether it is applicant-visible are not MVP-critical and remain a UX/product detail.

### Participant visibility boundary

- there is no participant-facing Mentee directory or people search in MVP
- a Mentee sees only their own profile, community-scoped Matches, and their own community-scoped Asks
- a Mentor sees Mentee information only where required to review or handle that Mentee's specific Ask
- the Community Admin directory is an operational membership tool, not a participant discovery experience

## Community Creation And Admin Access

OAA should support users applying to become a Community Admin and creating a community from within the product.

The intended direction is Slack-like: community creation should not require the creator to be a platform operator, but the creator must pass an organization/identity verification mechanism determined with Backend.

Working direction:

```text
User signs up
-> provides organizational affiliation / organizational email
-> backend verifies the required identity or affiliation signal
-> user may create or administer a community
```

The exact verification mechanism is not defined in this document.

Open implementation questions include:

- what an organizational email proves
- how OAA distinguishes affiliation from authority to represent an official organization
- how duplicate or misleading "official" communities are handled
- whether additional review is required for specific organization types
- the final Admin creation and ownership-transfer state machine

There is no hard-coded minimum Mentor count or community-size gate in the current MVP requirements.

Very small-community readiness is not an implementation target for the first pilot. The minimum viable Mentor pool remains a research and experimentation question and must not be invented as a numeric requirement.

## Membership And Access

### Membership and request states

At minimum, the community model must support:

```text
REQUESTED
  -> ACTIVE
  -> DECLINED

INVITED
  -> ACTIVE
  -> EXPIRED
  -> REVOKED

ACTIVE
  -> PAUSED
  -> REMOVED
```

The exact persistence model may separate `JoinRequest` from `CommunityMembership`; the product behavior above is the binding requirement.

- `REQUESTED` does not grant community access
- `ACTIVE` grants community access for the approved role or roles
- matching and Ask eligibility also require the relevant role profile and other eligibility rules
- Mentor matching eligibility additionally requires the Mentor to be accepting requests
- membership history is retained for audit
- removing or pausing membership does not delete historical Asks
- active membership in Community A does not grant access to Community B

### Free-entry join request

Both Mentor and Mentee users may request access to a discoverable community from inside OAA.

```text
User signs up
-> verifies email
-> selects organization
-> completes enough role/profile context for review
-> opens a discoverable community preview
-> optionally adds a join note
-> requests membership and intended role
-> request appears as Pending
-> Community Admin reviews applicant context
-> Admin approves or declines
-> approved membership becomes ACTIVE
```

The role-specific onboarding documents define the required profile fields. The community requirement is that Admin has enough saved applicant context to make the membership decision; this document does not invent additional profile fields.

### Existing-account add

A Community Admin may add a known existing account through an exact-email member lookup. It must not become a browseable cross-community people directory.

```text
Community Admin enters known email
-> system finds an existing verified OAA account without revealing unrelated memberships
-> Community Admin selects Mentor and/or Mentee role
-> create ACTIVE CommunityMembership
-> user completes/reviews any required role profile before matching eligibility
```

- exact lookup must not expose a global result list
- return only the minimum identity needed to avoid adding the wrong person
- do not disclose unrelated community memberships or private profile data
- an explicit Admin add may cross the user's selected organization boundary

### Direct member invitation

A Community Admin may invite a Mentor or Mentee through a unique, email-bound invitation.

```text
Community Admin enters invitee email and role
-> OAA sends unique invitation bound to email, community, and role
-> invitee opens the link and creates/signs in if needed
-> link acceptance proves ownership of the invited email
-> user completes/reviews the required role profile
-> membership becomes ACTIVE
```

- a forwarded invitation cannot activate a different email address
- Community Admin may revoke an unaccepted invitation
- expired or revoked invitations cannot be used
- after invitation submission, the Admin UI should expose invitation status rather than the stored personal email
- an explicit Admin invitation may cross organization boundaries
- accepting one invitation grants only the named community and role; it does not grant access to unrelated communities

## Profiles And Roles

- a user has one account and may maintain shared identity/background information
- Mentor and Mentee capabilities are non-exclusive
- a user's roles may evolve over time without destructive conversion
- a `MentorProfile` contains the Mentor information needed for matching and Ask review
- a `MenteeProfile` contains the Mentee information needed for matching and Ask creation
- profile data belongs to the user and remains user-editable
- current MVP matching remains Mentee-to-Mentor

### Open decision: global vs community-specific matching preferences

The following question is intentionally unresolved:

Should Mentee priorities and Mentor offerings be global across all communities, or may the user configure different mentoring intent per community?

Examples:

- a Mentee may want intensive consulting recruiting help in a Consulting community but only exploratory career guidance in a Data community
- a Mentor may want to offer interview preparation in MMA but networking support in another community

Possible implementation directions include:

1. one global profile and one global set of matching preferences;
2. one shared core profile with community-specific matching preferences or overrides.

This decision affects the ERD, onboarding/edit flows, matching queries, and Ask validation. It must be resolved with Backend and user research.

Until resolved, the current standalone prototype's global priorities must not be treated as a binding architecture decision.

## Community-Scoped Matching

### Hard community boundary

A Mentee receives recommendations only from Mentors with an eligible `ACTIVE` membership in the currently selected community.

The candidate pool must not silently expand to another community when supply is low.

If a user wants access to another community's Mentor pool, they must first become an approved member of that community.

Example:

```text
MMR Mentee requests MMA
-> MMA Admin approves
-> Mentee enters MMA
-> MMA -> Matches contains eligible MMA Mentors only
```

A Mentor may belong to multiple communities, but eligibility in Community A does not make that Mentor visible inside Community B.

### Recommendation quality principle

The product requirement is:

```text
community eligibility
-> relevance / quality first
-> return up to 3 qualified recommendations
-> diversify only among sufficiently relevant alternatives
```

The system must not:

- weaken relevance solely to fill three cards
- promote a materially weaker Mentor solely for diversity
- cross community boundaries to fill supply
- imply that three recommendations are guaranteed

The exact matching implementation, including classification, STS retrieval, Cross-Encoder ranking, MMR, thresholds, or equivalent techniques, belongs to Backend/Data design and is not locked by this product requirement.

Classification being a hard filter versus a soft ranking signal remains a Backend/Data decision. Whatever implementation is chosen must preserve the product rule that relevance comes before quantity and diversification.

### Visible recommendation window

- a Mentee sees no more than three uncontacted recommendations at one time in one community
- three is a maximum visible window, not a guaranteed supply level
- if only two qualified Mentors exist, show two
- if only one exists, show one
- if none exist, show the low-supply/exhausted state
- a contacted Mentor leaves `Matches` and moves into `Asks`
- sending an Ask does not immediately top up the visible recommendation window

### Current-set resolution and next recommendations

The current recommendation set remains intentionally bounded.

A recommendation is considered handled for the current set when the Mentee either:

- sends an Ask, or
- marks the recommendation `Not a fit`

When no uncontacted recommendation remains in the current set:

- if unseen qualified Mentors remain, show `See next recommendations`
- the next set may contain up to three qualified Mentors
- there is no free-form `Regenerate`, `Refresh`, or `Show all` action

### `Not a fit`

- `Not a fit` removes that Mentor from the current visible set
- it does not immediately top up the grid while other current recommendations remain unresolved
- optional feedback may be collected to improve future recommendations
- once the current set has been fully handled, the normal next-set rule applies
- the exact long-term exclusion period for a `Not a fit` pair should be persisted consistently with the final matching design; do not silently recycle the Mentor into the same active recommendation cycle

### Decline / expiry replacement

Decline and no-response expiry are involuntary losses and use a different replacement rule from `Not a fit`.

When a previously contacted Mentor declines or expires:

```text
if visible uncontacted recommendations < 3
and an unseen qualified Mentor exists
-> select exactly 1 qualified replacement
```

- never exceed three visible uncontacted recommendations
- do not weaken relevance to create a replacement
- the product surfaces that a replacement is ready
- the Mentee has an explicit action such as `See your replacement`
- revealing the replacement adds it to the community's Matches surface with a `New` state
- if no unseen qualified Mentor exists, do not manufacture a replacement

### Qualified-pool exhausted state

When no qualified unseen recommendation is currently available:

- clearly state that no relevant recommendations are available right now
- explain that more Mentors may be added later
- offer `Review priorities` as an optional action
- do not imply that the Mentee must change genuine priorities to make the product work
- do not cross community boundaries or weaken relevance to fill the screen

Whether OAA should show aggregate information such as the most common Mentor offerings in that community is a user-research question, not an MVP requirement.

## Mentor Supply And Community Readiness

The MVP does not define a hard minimum Mentor pool.

Do not hard-code values such as 10, 15, or 20 Mentors into creation, activation, or matching rules.

Backend/Data and Product may run simulations or experiments across different pool sizes and thematic concentrations to learn when recommendations remain meaningfully relevant.

Useful test conditions may include different candidate-pool sizes and focused communities such as Consulting, Finance, or Data communities, where thematic concentration may allow a smaller pool to remain relevant.

The future question is not only:

> How many Mentors are in the pool?

It is also:

> Does the pool provide enough relevant coverage for the needs of this community?

Any future minimum viable Mentor-pool threshold or community-readiness gate requires user research and experimentation before becoming a requirement.

## Structured Ask And Coordination

- a Mentee sends a scoped Ask to a Mentor in the same active community
- the selected topic must satisfy the current structured Ask rules defined in the Ask/matching specifications
- Mentors retain the existing 48-hour accept/decline window and structured decline behavior
- on acceptance, the Mentor provides or uses one snapshotted Calendly or LinkedIn coordination route
- OAA does not provide in-platform messaging, calendar synchronization, or provider-verified booking in MVP

## Verification And Trust Labels

- all users verify ownership of their email address through the standard verification flow
- email ownership verification, organization selection, and community membership approval are separate concepts
- selecting an organization must not be represented as institutional verification
- community membership approval is granted by the relevant Community Admin or by explicit Admin invitation/add
- no label may claim McGill, alumni, program, employer, or institutional verification unless OAA actually performs an approved verification process for that claim
- permitted membership labels may include `Community-approved member` and `Invited by [Community]`

Admin-creator verification is a separate technical/product design question from ordinary member approval.

## Explicitly Post-MVP

- cross-community Mentor discovery or silent cross-community matching
- OAA-wide Mentor scout search
- automatic enrollment in additional communities
- community analytics and supply/demand dashboards
- Mentor-to-Mentor or Mentee-to-Mentee matching
- bulk invitation uploads and CSV-based outreach
- institutional roster integrations and SSO
- verified cross-institution identity infrastructure
- provider-verified booking/completion unless separately approved

## Open Decisions And Research Questions

These items are intentionally unresolved and must not be inferred by implementation:

1. **Global vs community-specific mentoring preferences**  
   Whether Mentee priorities and Mentor offerings remain global or support community-specific overrides.

2. **Admin creator verification**  
   How Backend verifies organizational identity/affiliation for a user creating or administering a community, and how misleading or duplicate official communities are prevented.

3. **Minimum viable Mentor pool**  
   No hard minimum exists now. Determine later through user research, pilot evidence, and matching simulations.

4. **Matching implementation details**  
   Classification hard vs soft, STS/retrieval behavior, Cross-Encoder thresholds, MMR implementation, and equivalent technical choices belong to Backend/Data as long as product quality rules are preserved.

5. **Exhausted-state supply visibility**  
   Whether showing aggregate Mentor-offering availability would help Mentees understand the community without pressuring them to change genuine priorities.

6. **Join-request decline reason UX**  
   Decline is supported, but whether a reason is mandatory, internal-only, or applicant-visible is not MVP-critical.

## MVP Decisions Recorded

| Decision | Outcome |
| --- | --- |
| First pilot community | MMA launches first; platform model remains generic. |
| Pilot planning assumption | Approximately 50–60 alumni and approximately 90 students/Mentees; planning context only, never hard-coded. |
| Role model | Mentor and Mentee are non-exclusive, community-scoped capabilities that may change over time. |
| Free entry | Both Mentors and Mentees may sign up, select an organization, discover eligible communities, and request membership. |
| Organization selection | Scopes discovery; does not itself verify affiliation or grant membership. |
| Cross-program access | Allowed subject to Community Admin approval. |
| Cross-organization access | Allowed through explicit Community Admin invitation or existing-account add. |
| Community visibility | `DISCOVERABLE_APPROVAL_REQUIRED` or `INVITE_ONLY`; no public auto-join mode. |
| Community discovery | Global Home shows `Your Communities`, `Pending Requests`, and `Discover Communities`. |
| Community workspace | Each active community has `Matches` and `Asks`; mentoring activity stays community-scoped. |
| Existing member add | Community Admin may add a known verified account using exact-email lookup. |
| New member acquisition | Both self-service join requests and direct email-bound invitations are supported. |
| Community Admin | Reviews requests, manages membership/invites/Mentor supply, and edits allowed community settings. |
| Community creation | User-facing Admin/community creation is intended; backend identity/affiliation verification mechanism remains open. |
| Matching boundary | Hard same-community boundary in MVP; no silent cross-community fallback. |
| Recommendation count | Up to three qualified uncontacted recommendations; never weaken relevance to fill three. |
| Ranking principle | Relevance first, quantity second, diversification only among sufficiently relevant options. |
| Send Ask | Mentor moves from Matches to Asks; no immediate top-up. |
| Not a fit | Removes the Mentor without immediate top-up while other current recommendations remain. |
| Next set | Offered only after the current visible set has been handled and qualified unseen supply remains. |
| Decline / expiry | May create exactly one qualified replacement when visible supply is below three and unseen qualified supply exists. |
| Exhausted pool | Show honest low-supply state; more Mentors may be added; priority review is optional. |
| Minimum Mentor pool | No numeric MVP minimum or activation gate; research/simulation pending. |
| Cross-community discovery | Not part of MVP. |
