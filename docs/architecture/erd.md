# ERD Notes

Last updated: 2026-07-27

**Primary readers:** Backend  
**Priority:** High  
**Read this when:** You are modeling entities, relationships, or Prisma changes.

## Purpose

This document summarizes the target MVP 1 domain model that should be represented in Prisma and the database.

## Core Entities

- `User`
- `Verification`
- `Session`
- `StudentProfile`
- `AlumnusProfile`
- `StudentAspiration`
- `StudentHelpNeed`
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
- `StudentReflection`
- `AlumnusNote`
- `AuditEvent`

## Relationship Summary

- one `User` may own one student profile or one alumnus profile
- one student profile has many aspirations, help-need entries, background entries, and requests
- one alumnus profile has many offerings, non-offerings, background entries, industry entries, and inbox requests
- one `Match` links one student profile to one alumnus profile for a specific active or historical slot
- one `Request` links one student, one alumnus, and one offering topic
- one accepted and verified request may create one active `Meeting`
- one completed meeting may create one student pulse response and one alumnus pulse response
- one request may also own one student reflection and one alumnus note
- one request or meeting may have many notifications and audit events

## Modeling Notes

- `Request` status should use enums rather than freeform strings
- request expiration reason should be explicit
- `Meeting` should be a first-class entity rather than only fields on `Request`
- notification and audit records should be explicit first-class tables
- verification and session data should not be folded into `User`

## Current Gap

The existing Prisma schema is a strong base, but MVP 1 still needs explicit support for verification, sessions, meetings, notifications, and audit records.
