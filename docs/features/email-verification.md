# Email Verification

Last updated: 2026-09-22

**Primary readers:** Backend, Frontend  
**Priority:** High  
**Read this when:** You are implementing signup, verification, eligibility, or account activation.

## Purpose

This feature governs eligible-account creation, email ownership verification, and role assignment before onboarding begins.

## Business Intent

Only eligible McGill community members should be able to access One Ask Away. Email ownership and program eligibility are separate checks and both must pass.

## Core Rules

- students must use eligible `@mail.mcgill.ca` addresses
- an alumnus supplies their own personal email address, full name, and MMA cohort or graduation year through the alumni access-request flow
- every alumni access request requires manual eligibility review against the program-provided name-and-cohort roster; no alumni request is approved automatically
- the program roster must contain only the minimum eligibility data needed for review, such as full name and cohort or graduation year; OAA must not request, import, or use alumni personal email addresses from the program roster
- after manual approval, the alumnus verifies ownership of the personal email they supplied; email verification does not by itself prove alumni eligibility
- authorized program staff may use eligible `@mcgill.ca` addresses
- role is assigned only after manual alumni eligibility approval; cohort is confirmed by the reviewer from the roster, not from self-selection alone
- student accounts progress from `PENDING_VERIFICATION` to `ONBOARDING` to `ACTIVE`; alumni accounts progress from `PENDING_ELIGIBILITY_REVIEW` to `PENDING_VERIFICATION` to `ONBOARDING` to `ACTIVE`
- users cannot match, request, or schedule until the account is `ACTIVE`
- verification uses a six-digit numeric code
- code expiry is 10 minutes
- codes are single-use
- resending invalidates prior active codes
- one verification record allows up to five failed attempts
- one email may request up to three verification emails in a rolling 15-minute window

## Frontend Requirements

- provide role-appropriate email-entry flows with neutral eligibility messaging
- for alumni, collect full name, MMA cohort or graduation year, personal email, and explicit consent for OAA to use that email for account verification and selected operational notifications
- show a pending-review state after alumni submission; do not reveal whether a name appears on the roster when a request is rejected or cannot be matched
- provide a code-entry screen with resend behavior and clear countdown messaging
- show clear account-state progress: verification, onboarding, active
- block access to onboarding completion, matching, requests, and scheduling until verification succeeds
- if a verified account already exists, redirect the user to sign-in rather than new signup

## Backend Requirements

- normalize email before any lookup or rate limiting
- verify the student domain requirement and roster membership separately
- create an `AlumniAccessRequest` for each alumni submission and require an authorized reviewer to approve or reject it against the name-and-cohort roster
- never automatically approve an alumnus from a name, cohort, email, or LinkedIn match
- do not send an alumni verification code or activate an alumni account until manual eligibility approval succeeds
- create or retrieve a pending alumni account only after approval; bind it to the personal email supplied in the approved request
- generate verification codes securely and store only code hashes
- store purpose, send time, expiry, invalidation, attempt count, and usage timestamps
- apply resend and attempt limits by normalized email, account, and IP context
- assign the `ALUMNI` role from the approved access request and reviewer-confirmed roster record at verification success
- transition account to `ONBOARDING` atomically with verification success
- reject expired, locked, or superseded codes

## Notifications

- send verification email with user name, six-digit code, expiry notice, and security disclaimer
- do not include passwords or sensitive profile data

## Data And Audit Requirements

- audit code generation, resend, invalidation, attempt increments, success, and failure
- audit alumni access-request submission, consent capture, reviewer identity, approval or rejection, roster-match reference, and any subsequent email change
- retain only the minimum roster-match data necessary for eligibility audit and support; do not store program-supplied personal email addresses
- retain enough history to explain why a user could or could not verify

## Open Technical Questions

- which authorized team members may approve or reject alumni access requests
- retention period for rejected access requests and manual-review evidence
