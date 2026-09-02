# System Architecture

Last updated: 2026-07-27

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
- validates roster eligibility
- assigns role and cohort
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

### Scheduling and meeting service

- opens scheduling for accepted requests only
- enforces the 24-hour scheduling window
- validates Calendly booking events
- creates and updates meeting records

### Notification service

- creates inbox items
- sends transactional emails
- tracks delivery state

### Post-call service

- marks meetings completed
- creates pulse prompts
- stores reflections and private notes

### Background jobs

- request expiry
- scheduling expiry
- meeting completion sweep
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
