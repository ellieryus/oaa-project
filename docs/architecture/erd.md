# ERD Notes

Last updated: 2026-09-22

**Primary readers:** Backend  
**Priority:** High  
**Read this when:** You are modeling entities, relationships, or Prisma changes.

## Purpose

This document summarizes the target MVP 1 domain model that should be represented in Prisma and the database.

## Core Entities

- `User`
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
- `AvailabilityConnection`
- `AvailabilitySlot`
- `Match`
- `Request`
- `Meeting`
- `Notification`
- `PulseSurveyInvitation`
- `PulseSurveyResponse`
- `StudentAppreciation`
- `AlumniImpactStats`
- `CommunityCredential`
- `AlumniReengagementEvent`
- `StudentReflection`
- `AlumnusNote`
- `AuditEvent`

## Relationship Summary

- one `User` may own one student profile or one alumnus profile
- one `AlumniAccessRequest` stores an alumnus-supplied legal first name, McGill preferred first name, last name, cohort code, personal email, consent acknowledgement, review decision, reviewer, and optional link to the minimum `AlumniRosterEntry` used for manual eligibility review
- one approved `AlumniAccessRequest` creates or links one alumni `User`; a roster entry never stores or supplies the alumnus's personal email to OAA
- one student profile has many aspirations, current-priority entries, background entries, and requests
- one alumnus profile has many offerings, non-offerings, background entries, industry entries, and inbox requests
- one `CurrentPriority` records a ranked, dynamic student matching priority and its update history
- one `Match` links one student profile to one alumnus profile for a specific active or historical slot and stores internal ranking metadata, match tier, reason metadata, and impression history
- one `Request` links one student, one alumnus, and one offering topic and stores an immutable student-context snapshot used for alumnus review
- one accepted and verified request may create one active `Meeting`
- one completed meeting may create one student pulse response and one alumnus pulse response
- one completed meeting may have one student appreciation action, chosen by the participating student
- one alumnus may have derived impact statistics, many re-engagement events, and one active credential per credential type
- one request may also own one student reflection and one alumnus note
- one request or meeting may have many notifications and audit events

## Modeling Notes

- `Request` status should use enums rather than freeform strings
- request expiration reason should be explicit
- `Meeting` should be a first-class entity rather than only fields on `Request`
- notification and audit records should be explicit first-class tables
- verification and session data should not be folded into `User`
- `AlumniRosterEntry` stores only minimum program-supplied eligibility fields, such as name and cohort code; it is not an invitation or contact-email table
- cohort codes must come from a canonical program-supplied picklist, with no free-text or `Other` cohort value
- `AlumniAccessRequest` review status should use enums such as `PENDING_REVIEW`, `APPROVED`, and `REJECTED`, with reviewer and decision timestamps; corrected resubmissions must retain prior review history
- canonical topic IDs must be shared by `CurrentPriority`, standard alumni offerings, and alumni non-offerings; profile display labels may be separate from canonical IDs
- `Open to All` should be an alumnus setting rather than an offering-topic record

## Current Gap

The existing Prisma schema is a strong base, but MVP 1 still needs explicit support for verification, sessions, meetings, notifications, and audit records.
