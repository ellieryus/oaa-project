# Request Lifecycle

Last updated: 2026-09-11

**Primary readers:** Backend, Frontend  
**Priority:** Highest  
**Read this when:** You are implementing ask submission, inbox behavior, accept or decline, or request expiry.

## Purpose

This feature governs ask submission, alumni response, request deadlines, request history, and request-related notifications.

## Business Intent

Students should be able to send scoped asks tied to an alumnus offering, and alumni should have a clear limited response window with simple lifecycle outcomes.

## Core Rules

- student submits a scoped request tied to an alumnus offering
- the selected request topic must be both a current student priority and a declared alumnus offering
- the student submits one required opening ask that provides context and asks one specific question
- the opening ask must be editable by the student, including when initially AI drafted
- alumnus receives an in-app inbox item and email notification
- alumnus has 48 elapsed hours to accept or decline
- viewing a notification or opening the inbox does not count as a response
- opening the full request records first-viewed time but does not change request response status
- decline is final and cannot be reactivated
- every decline records one student-visible reason: `TIMING_UNAVAILABLE`, `OUTSIDE_EXPERTISE`, `NOT_AN_OFFERING`, `AT_CAPACITY`, or `OTHER`
- an alumnus may add one optional follow-up message that is explicitly visible to the student
- no alumni response by deadline expires the request
- expired requests may remain in alumnus history
- the student cannot reactivate an expired request or resend to the same alumnus if policy excludes the pair
- request read state, viewed state, response state, and lifecycle state remain separate

## Frontend Requirements

- allow student request creation only from a valid alumni offering
- require one scoped opening ask of 80 to 320 characters; prompt: `Briefly explain your context and ask one specific question.`
- keep the selected offering visible throughout composition and review
- show the student any relevant alumnus non-offering before submission
- show submitted request status clearly in student and alumnus views
- show exact 48-hour response deadline in request-related UI and notifications
- prevent student actions on declined or expired requests beyond history viewing
- record and display full-request view separately from notification read state
- show the selected decline reason and any optional student-visible follow-up message; do not expose internal notes
- avoid implying that expiry equals an explicit rejection

## Backend Requirements

- create request with `PENDING_ALUMNI_RESPONSE`
- validate that the selected offering is a declared alumnus offering and an active student priority at submission time
- snapshot request context at submission: selected offering; all current priorities and ranks; primary aspiration; target role, industry, and relevant skills; background; optional bio; one AI-generated profile summary constrained to those fields; and the final opening ask
- never mutate a request snapshot after the student updates profile fields, bio, or current priorities
- set response deadline to submitted time plus 48 elapsed hours
- store request status, status timestamps, expiration reason, first-viewed timestamp, and related match slot
- enforce valid transitions only
- mark no-response expiry with `NO_ALUMNI_RESPONSE`
- remove expired or declined requests from active action sets while preserving history
- prevent invalid reopen or resend transitions where policy forbids them
- trigger slot replacement rules when decline or qualifying expiry occurs
- store the structured decline reason separately from the optional student-visible follow-up message
- treat `NOT_AN_OFFERING` as a matching and taxonomy-quality signal for reporting and future tuning

## Notification Requirements

- on request submission, create one inbox item and send one email to the alumnus
- 24 elapsed hours after submission, send one pending-request reminder if the request is still pending; choose reminder copy from `first_viewed_at` and never send another request-specific reminder
- on accept, notify the student and show scheduling CTA and deadline
- on decline, notify the student with the selected decline reason and any optional student-visible follow-up message; never expose private internal text
- on no-response expiry, notify the student without framing it as an explicit rejection

## Audit Requirements

- store created-at, viewed-at, accepted-at, declined-at, expired-at, expiration reason, and notification events
- support later explanation of the full request path from submission to terminal state
- record the match reason and match tier used when the request was created

## Alumni Request Context

The collapsed alumni inbox view must show a one-sentence AI-generated student profile summary and the selected request topic. The expanded request view must show all priority tags, with the selected topic highlighted, plus the student's aspiration, target role or industry, skills, background, optional bio, and final opening ask.

The generated summary must use only persisted student data, must not invent claims or personality traits, and is a snapshot rather than a live profile read.
