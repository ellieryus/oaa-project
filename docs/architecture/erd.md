# ERD Notes

Last updated: 2026-09-24

**Primary readers:** Backend  
**Priority:** High  
**Read this when:** You are modeling entities, relationships, or Prisma changes.

## Purpose

This document summarizes the target MVP 1 domain model that should be represented in Prisma and the database.

## Core Entities

- `User`
- `UserEmail`
- `ProgramMembership`
- `Verification`
- `AlumniAccessRequest`
- `AlumniRosterEntry`
- `Session`
- `StudentProfile`
- `AlumnusProfile`
- `StudentAspiration`
- `CurrentPriority`
- `StudentBackground`
- `StudentSkill`
- `AlumnusBackground`
- `AlumnusIndustry`
- `OfferingItem`
- `Match`
- `Request`
- `ConversationFollowUp`
- `Notification`
- `PulseSurveyInvitation`
- `PulseSurveyResponse`
- `StudentAppreciation`
- `AlumniImpactStats`
- `AlumniReengagementEvent`
- `StudentReflection`
- `AlumnusNote`
- `AuditEvent`

## Relationship Summary

- one `User` may own zero or one `StudentProfile` and zero or one `AlumnusProfile` at the same time; roles are non-exclusive
- one `User` may own multiple verified `UserEmail` records, such as a current McGill student email and a later personal email; a role must not be inferred from a single email address
- one `User` may own multiple `ProgramMembership` records, such as `STUDENT` and later `ALUMNUS`, with cohort code, verification status, source, and timestamps
- one `AlumniAccessRequest` stores an alumnus-supplied legal first name, McGill preferred first name, last name, cohort code, personal email, consent acknowledgement, review decision, reviewer, and optional link to the minimum `AlumniRosterEntry` used for manual eligibility review
- one approved `AlumniAccessRequest` creates or links one alumni `User`; a roster entry never stores or supplies the alumnus's personal email to OAA
- one student profile has many aspirations, current-priority entries, background entries, and requests
- one alumnus profile has many offerings, non-offerings, background entries, industry entries, and inbox requests
- one `CurrentPriority` records a ranked, dynamic student matching priority and its update history
- one `Match` links one student profile to one alumnus profile for a specific active or historical slot and stores internal ranking metadata, match tier, reason metadata, and impression history
- one `Request` links one student, one alumnus, and one offering topic and stores an immutable student-context snapshot used for alumnus review
- one accepted request snapshots exactly one coordination route and URL
- one request may have one `ConversationFollowUp` that stores private self-reported schedule status, expected date, outcome, and limited unscheduled reason
- one eligible conversation follow-up may create one student pulse response and one alumnus pulse response
- one student-reported conversation may have one student appreciation action, chosen by the participating student
- one alumnus may have derived impact statistics and many re-engagement events
- one request may also own one student reflection and one alumnus note
- one request or conversation follow-up may have many notifications and audit events

## Modeling Notes

- `Request` status should use enums rather than freeform strings
- request expiration reason should be explicit
- `ConversationFollowUp` should be separate from `Request` so self-reported outcome, expected date, and private participant responses do not overwrite request lifecycle state
- notification and audit records should be explicit first-class tables
- verification and session data should not be folded into `User`
- do not introduce a single exclusive `User.role` field; derive capabilities from profiles and verified program memberships
- `UserEmail` must support a verified primary contact email without deleting an earlier verified email when a student becomes an alumnus
- `ProgramMembership` preserves student and alumni eligibility history. Student-to-alumni conversion adds an alumni membership after manual review rather than rewriting the student membership
- `AlumniRosterEntry` stores only minimum program-supplied eligibility fields, such as name and cohort code; it is not an invitation or contact-email table
- cohort codes must come from a canonical program-supplied picklist, with no free-text or `Other` cohort value
- `AlumniAccessRequest` review status should use enums such as `PENDING_REVIEW`, `APPROVED`, and `REJECTED`, with reviewer and decision timestamps; corrected resubmissions must retain prior review history
- canonical topic IDs must be shared by `CurrentPriority`, standard alumni offerings, and alumni non-offerings; profile display labels may be separate from canonical IDs
- `Open to All` should be an alumnus setting rather than an offering-topic record
- MVP `Match` and `Request` remain explicitly student-to-alumnus. A future alumni-to-alumni discovery model must be designed separately rather than weakening current scoped-request constraints prematurely
- a server-verified `Meeting` entity is post-MVP scope and requires Calendly OAuth/webhook evidence
- `CommunityCredential` is post-MVP scope and requires verified-completion evidence

## Current Gap

The existing Prisma schema is a strong base, but MVP 1 still needs explicit support for verification, sessions, coordination preferences, conversation follow-ups, notifications, and audit records.
