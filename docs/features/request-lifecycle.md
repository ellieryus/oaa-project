# Request Lifecycle

Last updated: 2026-07-27

**Primary readers:** Backend, Frontend  
**Priority:** Highest  
**Read this when:** You are implementing ask submission, inbox behavior, accept or decline, or request expiry.

## Purpose

This feature governs ask submission, alumni response, request deadlines, request history, and request-related notifications.

## Business Intent

Students should be able to send scoped asks tied to an alumnus offering, and alumni should have a clear limited response window with simple lifecycle outcomes.

## Core Rules

- student submits a scoped request tied to an alumnus offering
- alumnus receives an in-app inbox item and email notification
- alumnus has 48 elapsed hours to accept or decline
- viewing a notification or opening the inbox does not count as a response
- opening the full request records first-viewed time but does not change request response status
- decline is final and cannot be reactivated
- no alumni response by deadline expires the request
- expired requests may remain in alumnus history
- the student cannot reactivate an expired request or resend to the same alumnus if policy excludes the pair
- request read state, viewed state, response state, and lifecycle state remain separate

## Frontend Requirements

- allow student request creation only from a valid alumni offering
- show submitted request status clearly in student and alumnus views
- show exact 48-hour response deadline in request-related UI and notifications
- prevent student actions on declined or expired requests beyond history viewing
- record and display full-request view separately from notification read state
- standardize decline messaging and avoid implying that expiry equals rejection

## Backend Requirements

- create request with `PENDING_ALUMNI_RESPONSE`
- set response deadline to submitted time plus 48 elapsed hours
- store request status, status timestamps, expiration reason, first-viewed timestamp, and related match slot
- enforce valid transitions only
- mark no-response expiry with `NO_ALUMNI_RESPONSE`
- remove expired or declined requests from active action sets while preserving history
- prevent invalid reopen or resend transitions where policy forbids them
- trigger slot replacement rules when decline or qualifying expiry occurs

## Notification Requirements

- on request submission, create one inbox item and send one email to the alumnus
- after 24 hours of unopened full request, send one pending-request reminder if still active
- on accept, notify the student and show scheduling CTA and deadline
- on decline, notify the student with standardized wording and no private internal text
- on no-response expiry, notify the student without framing it as an explicit rejection

## Audit Requirements

- store created-at, viewed-at, accepted-at, declined-at, expired-at, expiration reason, and notification events
- support later explanation of the full request path from submission to terminal state
