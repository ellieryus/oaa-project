# Community-Scoped Matching

Last updated: 2026-10-14

**Primary readers:** Frontend, Backend, Data, Product
**Priority:** Highest
**Read this when:** You are implementing Mentee priorities, Mentor eligibility, recommendation generation, `Not a fit`, replacements, next sets, or low-supply states.

## Purpose

This feature governs Mentee-to-Mentor recommendations inside one active community.

The product goal is not to guarantee three names. It is to show the best qualified Mentors currently available inside a trusted community, without weakening relevance or silently borrowing supply from another community.

## Matching Boundary

- both participants require an eligible `ACTIVE` membership in the same selected community
- membership in another community never grants matching access
- a Mentor active in multiple communities may be eligible separately in each one, but their membership in Community A does not make them visible in Community B
- a user who wants access to another community's Mentor pool must first become an approved member of that community
- cross-program access is allowed through community membership; cross-community matching is not

Example:

```text
MMR student
-> requests MMA
-> MMA Admin approves
-> MMA membership ACTIVE
-> MMA -> Matches may contain eligible MMA Mentors only
```

## Eligibility

A Mentee becomes match-eligible only after:

- verified email ownership
- required Mentee profile confirmation
- `ACTIVE` Mentee membership in the selected community
- any applicable matching pause is off

A Mentor becomes match-eligible only after:

- verified email ownership
- required Mentor profile confirmation
- `ACTIVE` Mentor membership in the selected community
- `acceptingRequests = true`

Calendly or LinkedIn setup is not a matching filter.

## Current Priorities

- structured current priorities remain the primary Mentee need signal for MVP matching
- a Mentee selects and ranks one to three priorities from the canonical topic taxonomy
- current priorities describe the help needed now; they are not a second permanent profile
- priorities remain user-editable
- optional bio, hobbies, or personal context are not core matching signals

### Open architecture decision

Whether current priorities are one global set or may be overridden per community is not yet decided.

The same open question applies to Mentor offerings/non-offerings.

Do not infer community-specific overrides from the community model, and do not treat the current standalone prototype's global priorities as a final architecture decision.

## Canonical Topic Taxonomy

Mentees may select only these standard topics:

- Career direction
- Company insights
- Networking
- Job search strategy
- Interview preparation, including consulting and data cases
- CV / resume review
- Career pivot guidance
- Course & program experiences
- Referrals and referral advice
- Portfolio review

Mentees do not have `Open to All` or `Other` priority options in MVP 1.

Mentors select one to five standard offering topics, or `Open to All`, and may select zero to three standard non-offering topics. `Open to All` is an offering-scope setting, not a matchable topic. A Mentor may add an `Other` free-text label for display context only; it cannot create a structured match or validate a structured Ask topic.

## Recommendation Quality Principle

Product requirements are ordered as:

```text
1. community eligibility
2. relevance / quality
3. return up to 3 qualified recommendations
4. diversification among sufficiently relevant alternatives
```

Relevance comes first.

The system must not:

- weaken relevance just to display three cards
- promote a materially weaker Mentor solely for diversity
- cross community boundaries to fill supply
- expose a fake match percentage or imply precision the model cannot support

If multiple similarly relevant Mentors exist, diversification may help avoid a needlessly repetitive set.

Exact implementation choices such as domain classification, STS retrieval, Cross-Encoder ranking, MMR, thresholds, or equivalent models belong to Backend/Data. Whether classification is a hard filter or a soft ranking signal is also a Backend/Data decision, subject to the product rules above.

## Visible Recommendation Window

- each community shows at most three uncontacted qualified Mentor recommendations at one time
- three is a cap, not a guaranteed minimum
- if only two qualified Mentors exist, show two
- if only one exists, show one
- if none exist, show the exhausted/low-supply state
- the same Mentor cannot appear twice in the same visible set
- raw ranking scores are internal and never shown

Every recommendation shows:

- Mentor identity and relevant profile context
- one human-readable `Why OAA suggested this` reason
- declared offerings
- declared non-offerings

## Current Set And Next Recommendations

The current set is intentionally bounded.

A visible recommendation is considered handled for the current set when the Mentee:

- sends an Ask, or
- selects `Not a fit`

Sending an Ask:

- removes that Mentor from `Matches`
- moves the relationship into the community's `Asks` surface
- does not immediately top up the visible recommendation set

`Not a fit`:

- removes that Mentor from the current visible set
- does not immediately top up while other visible recommendations remain
- may collect an optional reason
- must not create swipe-through behavior

When no uncontacted recommendation remains in the current set:

- if unseen qualified Mentors exist, show `See next recommendations`
- the next set contains up to three qualified unseen Mentors
- there is no free-form `Regenerate`, `Refresh`, or `Show all`

Previously handled Mentors must not be silently recycled into the same active recommendation cycle.

The longer-term exclusion policy for `Not a fit` remains a Backend/Product persistence detail, but the Mentor must not immediately reappear in the same cycle.

## Decline And Expiry Replacement

A decline or no-response expiry is an involuntary loss and follows a different rule from `Not a fit`.

When an Ask is declined or expires:

```text
if visible uncontacted recommendations < 3
and an unseen qualified Mentor exists
-> prepare exactly 1 qualified replacement
```

Requirements:

- never exceed three visible uncontacted recommendations
- never weaken relevance to create a replacement
- do not change unaffected visible cards
- surface that a replacement is ready
- give the Mentee an explicit action such as `See your replacement`
- when revealed, add that Mentor to Matches with a `New` state
- if no unseen qualified Mentor exists, do not manufacture a replacement
- a late Mentor response does not retract a replacement already made available

## Exhausted / Low-Supply State

When no qualified unseen Mentor is available:

- show an honest message that no relevant recommendations are available right now
- explain that more Mentors may be added later
- offer `Review priorities` as an optional action
- do not tell the Mentee they must change genuine priorities
- do not broaden to another community
- do not lower relevance solely to fill cards

Whether the product should show aggregate information such as common Mentor offerings in the community is a user-research question, not an MVP requirement.

## Ask Compatibility

Existing structured Ask rules remain in force unless separately changed in the Ask lifecycle specification:

- Ask creation begins from a currently eligible Mentor
- the selected structured Ask topic must satisfy the Mentee-priority and Mentor-offering rules
- Mentor non-offerings must remain visible before submission

## Frontend Requirements

- keep the active community explicit on Matches
- never show another community's Mentor cards in the current community
- show no more than three uncontacted recommendations at once
- show fewer than three without apologetic filler when qualified supply is smaller
- show one human-readable reason plus offerings/non-offerings
- `Send Ask` removes the Mentor from Matches and sends the user to/links into Asks without topping up
- `Not a fit` removes the recommendation without immediate top-up
- after current-set resolution, show `See next recommendations` only when qualified unseen supply exists
- for decline/expiry, show a replacement-ready state and explicit reveal action when a replacement exists
- low-supply copy must not pressure the user to change priorities
- do not implement a Mentee directory or Mentee-to-Mentee browsing

## Backend Requirements

- include `communityId` in every Match and validate community eligibility at generation and Ask creation
- enforce server-side same-community eligibility; never rely on the frontend community tab alone
- persist recommendation-set or equivalent state sufficient to distinguish visible, unseen, contacted, `Not a fit`, unavailable, replacement-ready, and historical candidates
- persist match reason metadata and impression history
- return fewer than three rather than weakening quality constraints
- support exactly one decline/expiry replacement event when the replacement conditions are met
- do not top up merely because an Ask was sent
- preserve historical Match/Ask context after profile, offering, or membership changes
- expose raw ranking scores only to internal/backend evaluation surfaces, not participants

## Mentor-Pool Research

There is no hard-coded minimum Mentor count in MVP.

Backend/Data and Product may simulate different candidate-pool sizes and thematic concentrations to learn when ranking remains useful. Example experimental sizes may include 5, 10, 15, and 20, but none is a product threshold.

The future readiness question is about both pool size and relevant coverage.

## Explicitly Out Of Scope For MVP

- silent cross-community fallback
- OAA-wide Mentor search
- free-form regenerate / infinite swipe
- guaranteed three recommendations
- hard-coded minimum Mentor-pool activation threshold

## Open Decisions

- global vs community-specific Mentee priorities and Mentor offerings
- hard vs soft domain classification and exact retrieval/ranking implementation
- longer-term exclusion semantics after `Not a fit`
- whether aggregate offering availability improves exhausted-state UX
