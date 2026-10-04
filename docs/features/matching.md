# Community-Scoped Matching

Last updated: 2026-10-03

**Primary readers:** Frontend, Backend
**Priority:** High
**Read this when:** You are implementing Mentee priorities, Mentor eligibility, match generation, slot replacement, or regeneration.

## Purpose

This feature governs matching inside one active community. A Mentee receives a small, relevant, diversified set of Mentors who have an active membership in that same community.

## Current Priorities

- current priorities are the matching source of truth; the MVP does not retain a separate long-term help-needs list
- a Mentee selects and ranks one to three current priorities from the canonical topic taxonomy
- initial priorities are collected during Mentee onboarding and remain active until changed
- Mentees can update priorities from Profile or Matches without repeating onboarding
- saving a priority update does not change active matches automatically; the Mentee must explicitly select `Update matches`
- before `Update matches` runs, warn that every uncontacted card will be replaced and require confirmation; contacted, pending, accepted, and historical cards remain unchanged
- optional bio, hobbies, or personal context are not core matching signals

### Canonical Topic Taxonomy

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

Mentees do not have `Open to All` or `Other` priority options in MVP 1. Mentors select one to five standard offering topics, or `Open to All`, and may select zero to three standard non-offering topics. `Open to All` is an offering-scope setting, not a matchable topic. A Mentor may add an `Other` free-text label for display-only context; it cannot create a match or validate an Ask topic.

## Core Rules

- both participants require `ACTIVE` membership in the same community; membership in another community never grants matching access
- a Mentee becomes eligible only after verified email, confirmed Mentee profile, and active Mentee membership
- a Mentor becomes eligible only after verified email, confirmed Mentor profile, active Mentor membership, and `acceptingRequests = true`
- Calendly or LinkedIn setup is not a matching filter
- matching begins only when the Mentee selects `Start finding mentors` in a community
- each active batch contains exactly three qualified Mentors when three exist; it may contain fewer only when the qualified pool is smaller than three
- the same Mentor cannot appear twice in the same active batch
- a strong match offers at least one Priority 1 or Priority 2 topic and has no non-offering conflict with the Mentee's active priorities
- a partial-scope match is used only when fewer than three strong matches exist. It must offer at least one Priority 1 or Priority 2 topic and clearly disclose offered scope and relevant non-offering
- previously declined or expired Mentee-Mentor pairs are excluded from future automated matching in that community
- qualifying expiry replaces only the affected uncontacted slot automatically
- a decline exposes `Find another Mentor` to the Mentee; selecting it generates one replacement for only the affected declined slot
- Mentees may regenerate uncontacted matches repeatedly. Prefer unseen eligible Mentors; once exhausted, label a repeat `Previously shown`
- regeneration must not replace contacted, pending, accepted, or historical active slots
- a Mentor scope or membership change applies to future matching only. Existing match cards preserve their historical reason and scope context

## Ranking And Match Reasons

- hard filters run before ranking: same active community, active Mentee/Mentor memberships, `acceptingRequests = true`, pair exclusions, offering compatibility, and quality threshold
- rank by priority rank first, then relevant industry, function, or career trajectory; raw scores are internal and never shown
- every match card shows one human-readable reason grounded in structured data, for example: `Offers CV review and works in finance.`
- show Mentor offerings and non-offerings before a Mentee sends an Ask
- skills, certifications, projects, and seniority are reserved for future `Surprise Me` discovery, not standard MVP reasons

## Frontend Requirements

- block matching until the current community membership and required Mentee profile are active
- show exactly three qualified Mentor cards when available and fewer only when the qualified pool is smaller
- allow priority edits from Profile and Matches, followed by explicit `Update matches` confirmation
- make the replacement scope explicit in the confirmation: all uncontacted cards are replaced; contacted and historical cards are preserved
- show decline reason and optional message in Ask history, with `Find another Mentor` to generate only the declined Ask's replacement slot
- show one reason, offerings, non-offerings, partial-scope warnings, and low-supply states in plain language
- never expose another community's members, profile data, or match cards
- do not implement a Mentee directory, Mentee search, or Mentee-to-Mentee profile visibility within the same community

## Backend Requirements

- persist one to three ordered current priorities per Mentee and their update history
- include `communityId` in every match and validate both memberships at generation and request creation time
- enforce directional visibility: Mentees can query only their own data and eligible Mentor cards; Mentee data is returned to a Mentor only in the context of that Mentor's specific Ask
- enforce canonical topic IDs across Mentee priorities, Mentor offerings, and Mentor non-offerings
- persist active match slots, impression history, match tier, reason metadata, and replacements per community
- return fewer than three results rather than weakening scope constraints
- preserve historical match context after a Mentor updates scope or leaves a community

## Future: Surprise Me And Cross-Community Discovery

`Surprise Me` and cross-community Mentor discovery are post-MVP. Neither may bypass same-community membership, explicit Mentor opt-in, non-offering exclusions, or explainable matching safeguards.

## Open Team Decision

- Keep unseen-first regeneration and the `Previously shown` repeat label for now. The final low-supply copy and regenerate placement need UX/backend team review before implementation.
