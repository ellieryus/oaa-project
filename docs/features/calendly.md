# Calendly

Last updated: 2026-07-27

**Primary readers:** Backend, Frontend  
**Priority:** Highest  
**Read this when:** You are implementing availability, scheduling, booking validation, or meeting lifecycle behavior.

## Purpose

This feature governs alumni availability connection, accepted-request scheduling access, verified booking, meeting updates, and meeting completion.

## Business Intent

Scheduling should happen only after a valid request is accepted, and the meeting record should be driven by verified OAA-linked Calendly events.

## Core Rules

- alumni complete availability after basic profile confirmation
- alumni without completed availability are excluded from the active matching pool
- only an accepted request may open the scheduling flow
- the student has 24 elapsed hours from acceptance to create a valid booking
- opening Calendly does not count as scheduling
- verified booking must map to the same student, alumnus, and accepted request
- no valid booking by deadline expires the request with `ACCEPTED_NOT_SCHEDULED`
- scheduling access is removed after expiry
- only OAA-linked Calendly bookings are treated as official meetings
- cancellation and rescheduling updates must preserve history and avoid duplicates
- an eligible non-canceled meeting becomes completed when its scheduled end time passes

## Frontend Requirements

- show availability connection step only after alumnus basic profile review
- block students from scheduling unless the request is accepted
- show the exact 24-hour scheduling deadline and disappearance warning
- reject late scheduling attempts and show current request status
- show confirmed meeting time only after verified booking
- show updated meeting state after cancellation or rescheduling

## Backend Requirements

- persist alumnus availability-connection state
- create a scheduling session only for accepted requests
- enforce a 24-hour scheduling deadline from acceptance
- validate incoming booking events against user, request, and alumnus identity
- create `Meeting` records only from verified OAA-linked bookings
- expire unscheduled accepted requests at deadline with correct expiration reason
- update meeting history on cancellation and rescheduling
- mark eligible meetings completed when scheduled end time passes
- prevent duplicate meetings or duplicate booking updates from repeated provider events

## Notification Requirements

- on accept, notify the student with scheduling CTA and exact 24-hour deadline
- on confirmed booking, notify both participants of meeting time
- on accepted-request expiry due to no booking, notify the student and remove scheduling CTA
- on cancellation or rescheduling, notify both participants and link to the active meeting
- if Calendly connection becomes invalid, notify the alumnus and suppress broken scheduling flow for students

## Security And Reliability Requirements

- verify webhook authenticity
- keep provider credentials and tokens out of frontend and logs
- make booking confirmation, expiry jobs, and notification retries idempotent
