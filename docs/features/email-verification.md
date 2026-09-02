# Email Verification

Last updated: 2026-07-27

**Primary readers:** Backend, Frontend  
**Priority:** High  
**Read this when:** You are implementing signup, verification, eligibility, or account activation.

## Purpose

This feature governs eligible-account creation, email ownership verification, and role assignment before onboarding begins.

## Business Intent

Only eligible McGill users should be able to access One Ask Away. Email ownership and program eligibility are separate checks and both must pass.

## Core Rules

- students and alumni must use eligible `@mail.mcgill.ca` addresses
- authorized program staff may use eligible `@mcgill.ca` addresses
- role and cohort are assigned from roster data, not from user self-selection alone
- accounts progress from `PENDING_VERIFICATION` to `ONBOARDING` to `ACTIVE`
- users cannot match, request, or schedule until the account is `ACTIVE`
- verification uses a six-digit numeric code
- code expiry is 10 minutes
- codes are single-use
- resending invalidates prior active codes
- one verification record allows up to five failed attempts
- one email may request up to three verification emails in a rolling 15-minute window

## Frontend Requirements

- provide a single email-entry flow with neutral eligibility messaging
- do not reveal whether a user is on the roster when eligibility fails
- provide a code-entry screen with resend behavior and clear countdown messaging
- show clear account-state progress: verification, onboarding, active
- block access to onboarding completion, matching, requests, and scheduling until verification succeeds
- if a verified account already exists, redirect the user to sign-in rather than new signup

## Backend Requirements

- normalize email before any lookup or rate limiting
- verify supported domain and roster membership separately
- create or retrieve a pending account before sending code
- generate verification codes securely and store only code hashes
- store purpose, send time, expiry, invalidation, attempt count, and usage timestamps
- apply resend and attempt limits by normalized email, account, and IP context
- assign role and cohort from roster at verification success
- transition account to `ONBOARDING` atomically with verification success
- reject expired, locked, or superseded codes

## Notifications

- send verification email with user name, six-digit code, expiry notice, and security disclaimer
- do not include passwords or sensitive profile data

## Data And Audit Requirements

- audit code generation, resend, invalidation, attempt increments, success, and failure
- retain enough history to explain why a user could or could not verify

## Open Technical Questions

- where roster data is sourced from
- whether staff and alumni verification share one service or distinct policy layers
