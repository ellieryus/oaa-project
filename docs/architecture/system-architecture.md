# System Architecture

Last updated: 2026-09-24

**Primary readers:** Backend, Frontend, PM  
**Priority:** Highest  
**Read this when:** You need the target production system design and component boundaries.

## Purpose

This document defines the target production architecture for One Ask Away MVP 1.

## Architecture Summary

The target application is a Next.js web app with:

- route-based UI
- server actions for write entry points
- service and repository backend layers
- Prisma-backed PostgreSQL persistence
- external integrations for email and Calendly
- background jobs for deadlines, retries, and lifecycle completion

## Primary Components

### Web application

- renders public and authenticated flows
- displays status, deadlines, and next actions
- launches request, scheduling, and post-call flows

### Auth and eligibility service

- verifies email ownership
- maintains role-independent user identity with multiple verified email addresses and non-exclusive program memberships
- records alumni self-service access requests and consent
- validates a program-supplied cohort-code picklist and requires manual review against the minimum name-and-cohort program roster before alumni email verification
- supports backend-tooling review by the backend developer for beta and MVP 1; a role-based review UI is post-beta scope
- assigns role and cohort
- preserves student history when a former student later gains verified alumni membership; an active role context is a future session/UI concern, not a destructive account conversion
- establishes authenticated sessions

### Onboarding service

- stores role-specific profile drafts
- enforces required fields
- records profile confirmation
- marks users eligible for later lifecycle stages

### Matching service

- generates three active matches
- applies exclusions
- manages slot replacement and weekly renewal rules

### Request service

- creates asks
- tracks 48-hour response windows
- applies accept, decline, and expiry transitions

### Coordination and conversation-follow-up service

- snapshots one alumnus-selected Calendly or LinkedIn coordination route when an acceptance is finalized
- renders Calendly embed links without OAuth, API tokens, webhooks, or provider-event tracking
- records limited CTA telemetry and private self-reported conversation status
- schedules private follow-up prompts from a reported expected conversation date

### Notification service

- creates inbox items
- sends transactional emails
- tracks delivery state
- applies request-reminder and non-urgent re-engagement suppression rules

### Post-call service

- creates pulse prompts from student-reported status or expected dates
- stores reflections and private notes
- stores student appreciation actions and derives alumni impact signals

### Recognition service (Post-MVP)

- is deferred until provider-verified completion evidence is available
- will evaluate verified completed-conversation milestones idempotently
- will issue and verify community credentials and provide public credential records

### Background jobs

- request expiry
- self-reported scheduling follow-up and pulse invitation jobs
- notification retry
- match replacement processing

## Layering

- `src/app`: routes and handlers only
- `src/features`: UI and presentation logic
- `src/server/actions`: validated command entry points
- `src/server/modules/*/service.ts`: lifecycle orchestration
- `src/server/modules/*/repository.ts`: database access
- `src/server/db/prisma.ts`: ORM client

## Key Boundaries

- production UI paths must not import mock data directly
- repository layer must own persistence
- service layer must own lifecycle transitions and permissions
- jobs must re-check current state before applying changes

## Cross-Cutting Requirements

- server-enforced authorization
- idempotent webhook and job handling
- audit history for status changes
- structured logs and error reporting
- privacy separation for role-private content

## Current Gap

The repo currently has the right rough structure, but production persistence, auth, integrations, and job handling are not yet implemented.
