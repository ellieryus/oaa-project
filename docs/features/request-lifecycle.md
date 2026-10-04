# Ask Lifecycle

Last updated: 2026-10-03

**Primary readers:** Backend, Frontend
**Priority:** Highest
**Read this when:** You are implementing Ask submission, Mentor inbox behavior, accept/decline, expiry, or immutable context snapshots.

## Purpose

This feature governs scoped Asks from a Mentee to a Mentor within the same active community.

## Core Rules

- a Mentee submits an Ask to a Mentor only when both have `ACTIVE` membership in the same community
- the selected Ask topic must be both an active Mentee priority and a declared Mentor offering
- the Mentee submits one required opening Ask that provides context and asks one specific question; it must be 80 to 320 characters and editable even when AI drafted
- the Mentor receives an in-app inbox item and email notification
- the Mentor has 48 elapsed hours to accept or decline
- acceptance is committed and shown to the Mentee only after the Mentor selects or confirms exactly one valid coordination route: public Calendly event URL or LinkedIn profile URL
- viewing notification or opening inbox does not count as a response; read, viewed, response, and lifecycle state remain separate
- decline is final and records one Mentee-visible reason: `TIMING_UNAVAILABLE`, `OUTSIDE_EXPERTISE`, `NOT_AN_OFFERING`, `AT_CAPACITY`, or `OTHER`
- the Mentor may add one optional Mentee-visible follow-up message
- no response by deadline moves the Ask to `EXPIRED_AWAITING_LATE_RESPONSE`, releases its active match slot, and creates an eligible replacement for the Mentee
- an expired Ask remains visible in the Mentor's `Expired Asks` list. The Mentor may later accept or decline it in-app; no further reminder is sent
- a late acceptance follows the normal coordination-route requirement and is visible in the Mentee's Ask history; a late decline shows the usual reason and optional message there
- accepted Asks do not expire because coordination is incomplete; conversation follow-up is stored separately from Ask response state

## Frontend Requirements

- permit Ask creation only from a valid Mentor offering in the current community
- keep selected offering and any relevant Mentor non-offering visible throughout composition and review
- show the exact 48-hour response deadline in Ask UI and notifications
- during acceptance, require the Mentor to use one coordination route; never show personal email or both routes to the Mentee
- show the selected decline reason and optional follow-up message; do not expose private internal notes
- show supportive system copy after a decline: `Don't worry, we'll help you find another Mentor.` Then show `Find another Mentor`; it generates only the affected replacement slot in that community
- prevent the Mentee from acting on declined or expired Asks beyond history viewing
- provide the Mentor an `Expired Asks` history list where they can late accept or decline; label the response as late and never remove the replacement match slot
- show Mentees only Ask status and deadline, never whether or when a Mentor viewed the Ask
- provide a private `Report` action from a Mentor profile and Ask history/detail; submit it to the backend/OAA operations queue, not to the Community Admin by default

## Backend Requirements

- create an Ask as `PENDING_MENTOR_RESPONSE` with `communityId`
- validate matching community, active memberships, selected offering, and active Mentee priority at submission time
- snapshot at submission: community, selected offering, all current priorities and ranks, primary aspiration, target role/industry, relevant skills/background, optional bio, constrained AI-generated profile summary, and final opening Ask
- never mutate a snapshot after profile or priority edits
- set response deadline to submitted time plus 48 elapsed hours
- snapshot accepted coordination route, validated URL, and selection time; do not replace it if the Mentor later changes their saved preference
- store status, timestamps, expiry reason, first-viewed time, and related match slot
- schedule the sole pending-Ask reminder from `firstViewedAt + 24 hours`; cancel it after a response or expiry
- at no-response expiry, move the Ask to `EXPIRED_AWAITING_LATE_RESPONSE`, release only its active slot, and retain the Ask for late Mentor response
- trigger automatic matching slot replacement only for qualifying no-response expiry; a decline replacement is generated when the Mentee selects `Find another Mentor`
- treat `NOT_AN_OFFERING` as a taxonomy and matching-quality signal
- persist report actor, reported participant, community, Ask/profile reference, category, optional detail, timestamp, and operations status; authorize it only to backend/OAA operations personnel in MVP

## Notifications

- on Ask submission, create one Mentor inbox item and send one email
- 24 elapsed hours after the Mentor first opens the Ask, send at most one pending-Ask reminder if the Ask remains pending
- do not send an Ask-specific reminder if the Mentor never opens the Ask; it still expires at the normal 48-hour response deadline
- on accept, notify the Mentee with `Here's how to connect with [Mentor]` and render only the snapshotted route
- on decline, notify the Mentee with the structured reason and optional message
- on no-response expiry, notify the Mentee without framing it as an explicit rejection, show the replacement, and explain the Mentor may still review and respond through OAA later
- on late accept or decline, update the Mentee's Ask history with the Mentor name and outcome; notify the Mentee on late accept because a coordination route is available

## Mentor Review Context

Collapsed inbox view shows a one-sentence AI-generated Mentee profile summary and selected Ask topic. Expanded view shows all priority tags with the selected topic highlighted, plus aspiration, target role/industry, skills, background, optional bio, and final opening Ask. The generated summary must use only persisted Mentee data and must not invent claims.
