# Matching

Last updated: 2026-09-11

**Primary readers:** Frontend, Backend  
**Priority:** High  
**Read this when:** You are implementing eligibility, match generation, slot replacement, or renewal rules.

## Purpose

This feature governs profile eligibility, active matching eligibility, initial match generation, slot replacement, and weekly renewal behavior.

## Business Intent

The student should receive a small, relevant, diversified set of alumni matches based on their current career priorities, only after the student is fully eligible and explicitly asks to begin matching.

## Current Priorities

- current priorities are the source of truth for matching; the MVP does not retain a separate long-term help-needs list
- a student selects and ranks one to three current priorities from the canonical topic taxonomy
- initial priorities are collected during onboarding and remain active until the student changes them
- students can update priorities from Profile or Matches without repeating onboarding
- saving a priority update does not change active matches automatically; the student must explicitly select `Update matches`
- profile bio, including optional hobbies or personal context, is not a core matching signal

### Canonical Topic Taxonomy

Students may select only from these standard topics:

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

Students do not have `Open to All` or `Other` priority options in MVP 1. Current priorities must remain specific, structured, and visible to alumni so alumni can quickly understand the student’s intended scope before accepting a request. This also preserves reliable matching against alumni offerings and non-offerings.

Alumni select one to five standard offering topics, or `Open to All`. `Open to All` is an offering-scope setting that represents all standard topics, subject to declared non-offerings, rather than a matchable topic itself. Alumni may select zero to three standard non-offering topics; `None` means no standard non-offering is stored. Alumni may add an `Other` free-text label to an offering or non-offering, with required supporting text, for student-visible profile context. `Other` is not a primary matching or hard-filter signal and cannot be selected as a request topic.

## Core Rules

- a user is not match-eligible until required fields are complete and the profile is explicitly confirmed
- a student becomes eligible to start matching only after verification and profile confirmation
- an alumnus becomes eligible for the active matching pool only after availability is completed
- matching starts only when the student selects Start finding alumni
- each active batch contains exactly three qualified alumni when three qualified candidates exist; it may contain fewer only when the qualified pool is smaller than three
- the same alumnus cannot appear twice in the same active batch
- students may send requests to one, two, or all three matches
- matching must diversify across structured priority fit, industry/function or career trajectory, and offering fit
- a strong match offers at least one Priority 1 or Priority 2 topic and has no non-offering conflict with the student's active priorities
- a partial-scope match is used only when fewer than three strong matches exist; it must offer at least one Priority 1 or Priority 2 topic, and the UI must clearly state the offered scope and any relevant non-offering
- a non-offering removes that topic from an alumnus's available scope; a partial-scope match must never be presented as able to help with that non-offered topic
- previously declined or expired student-alumnus pairs are excluded from future automated matching
- declined or qualifying expired slots are replaced individually, not as full-batch refreshes
- students can regenerate uncontacted matches repeatedly; the system must prefer unseen eligible alumni and transparently label repeated candidates as `Previously shown` once the unseen pool is exhausted
- regeneration must not replace contacted, pending, accepted, scheduled, or completed matches
- fewer than three qualified matches is valid; the product must not fill a slot with a weak or out-of-scope candidate
- when an alumnus changes offerings, non-offerings, or availability, the change applies to future matching only
- an existing match card retains its historical match reason and matched-scope context; if that scope is no longer current, the card must disclose that the alumnus updated their scope
- a new request from an existing match must always validate against the alumnus's current offerings; if no current offering overlaps the student's current priorities, the uncontacted slot becomes eligible for replacement

## Ranking And Match Reasons

- hard filters run before ranking: active/eligible account, completed availability, pair exclusions, offering compatibility, and quality threshold
- ranking uses priority rank first, then relevant industry/function or career trajectory (to be decided by back-end); availability is operational context, not a match reason
- backend ranking scores are internal and must not be displayed as raw numbers or percentages to students or alumni
- every student-facing match card shows one personalised, human-readable reason grounded in structured data, for example: `Offers CV review and works in finance.`
- alumni detail pages show the same match reason plus clear offerings and non-offerings
- skill, certification, project, and seniority signals are reserved for future Surprise Me discovery, not standard MVP match reasons

## Future: Surprise Me Discovery (Post-MVP)

`Surprise Me` is a future discovery experience, not a replacement for structured current priorities or the scoped request flow.

- it must remain out of MVP 1 until beta data shows that structured matches produce clear asks, high alumni confidence, and relevant conversations
- it may recommend a small curated set of alumni using student development goals, relevant skills, industry or career trajectory, certifications, projects, and alumni seniority or years after MMA
- hobbies and optional bio context may be used only as a secondary tie-breaker; they are never required profile fields or core matching signals
- every recommendation must retain a human-readable explanation and show current offerings and non-offerings before a student can send a request
- it must respect the same eligibility, availability, pair-exclusion, and non-offering safeguards as structured matching
- the future team must decide the trigger, recommendation count, regeneration frequency, whether it occupies an active structured-match slot, and success thresholds before implementation

## Frontend Requirements

- block Start finding alumni until student verification and profile confirmation are complete
- show exactly three active qualified matches per batch when available, and fewer only when the qualified pool is smaller than three
- display enough alumni context to support request decisions
- allow students to edit and save their current priorities from Profile and Matches
- after a priority update, show an explicit `Update matches` confirmation before replacing uncontacted match slots
- allow match regeneration without implying that every refresh contains unseen or better candidates
- label a repeated candidate as `Previously shown`
- show a clear partial-scope warning when a candidate is filling a missing strong-match slot, for example: `Can help with Career pivot guidance. They don't offer CV/resume review.`
- show one personalised match reason, offerings, and non-offerings; do not show raw relevance scores
- preserve historical match context when an alumnus later updates scope, while clearly displaying the current scope before the student can send a new request
- preserve active slots that are still valid while replacing only the invalid slot
- explain inactive, expired, unavailable, and fewer-than-three-match states in plain language
- when fewer than three qualified matches exist, show available qualified matches and direct the student to update current priorities
- show alumni who confirmed profile but have not completed availability as unavailable to students

## Backend Requirements

- persist student profile confirmation state
- persist alumnus profile confirmation and availability-complete state
- persist one to three ordered current priorities per student and their update history
- generate three active matches on explicit student action only
- apply hard filters before ranking and enforce the strong-match and partial-scope rules
- define and maintain the canonical topic taxonomy, including canonical IDs shared by student priorities, alumni offerings, and alumni non-offerings
- represent `Open to All` as an alumnus setting, not as a topic ID
- enforce a maximum of three standard non-offerings; treat `None` as an empty selection rather than a stored topic
- store `Other` labels and supporting text as display-only scope context; do not use them to create matches or validate request topics
- retain raw ranking scores internally and return structured, explainable match-reason metadata for the UI
- persist active match slot history and replacement history
- persist match impressions so regeneration can prefer unseen candidates and identify repeat recommendations
- exclude declined and expired pairs from future automated matching
- replace only the affected slot when decline or qualifying expiry occurs
- on a student-confirmed priority update or regeneration, replace only eligible uncontacted slots and preserve valid active requests or scheduled meetings
- preserve historical matched-scope metadata for active and historical match cards after an alumnus scope update
- preserve valid active requests or scheduled meetings during renewal
- return fewer than three matches when the qualified pool is smaller than three

## Notifications

- send a non-blocking reminder to alumni who confirmed profile but have incomplete availability
- notification CTA must return directly to the availability step

## Dependencies

- active student account
- verified and active alumnus accounts
- confirmed student and alumnus profiles
- alumnus availability connection
