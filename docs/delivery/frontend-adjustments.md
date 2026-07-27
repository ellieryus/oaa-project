# Frontend Adjustments

Last updated: 2026-07-27

**Primary readers:** Frontend, UX  
**Priority:** High  
**Read this when:** You need the frontend-specific interpretation of product and alumni feedback.

## Purpose

This document is a frontend-focused interpretation of alumni and product feedback for MVP 1.

It is intended for Trang as UX Engineer and Frontend Lead, and should be used alongside:

- `docs/product/product-brief.md`
- `docs/features/*.md`
- `docs/architecture/state-machines.md`
- `CLAUDE.md`

## Core UX Directives

### 1. Student must understand immediately what the alumnus helps with

- do not make the user read a long profile before understanding relevance
- highlight `current role`, `company`, `offerings`, and `matching reason` first
- keep supporting biography and background secondary

### 2. Profiles must be scannable in a few seconds

Every alumni-facing surface should make it possible to see immediately:

- current role
- company
- offerings
- scoped ask
- matching reason

The profile should feel fast to scan, not heavy to study.

### 3. Requests must be specific, not generic

- generic requests will be ignored by alumni
- UI should force the student to define a clear `objective` and `topic`
- the request composer should guide toward scoped asks, not open-ended networking language

### 4. Do not create a long-term commitment feeling

- avoid language that sounds like mentorship
- prefer `conversation`, `request`, and `call`
- avoid `mentor`, `mentorship`, or any framing that implies an ongoing obligation

### 5. The flow should use as few clicks as possible

The preferred mental model is:

1. review request
2. accept or decline
3. book

Avoid adding extra confirmation layers or unnecessary steps in the core path.

### 6. Calendly remains the right scheduling direction

- alumni already maintain their own calendars elsewhere
- OAA should not create a second availability-management system
- frontend should treat scheduling as a handoff to Calendly, not a native calendar product

## Frontend Implications By Surface

### Match cards

- surface offerings before biography
- show why this alumnus matches the student
- keep the card compact and decision-oriented
- the student should know quickly whether this person is relevant enough to request

### Alumni profile

- move expertise and offerings above long narrative content
- keep long-form profile content secondary
- show non-offerings clearly so students do not send mis-scoped asks
- make the top of the page decision-ready within one screen

### Ask composer

- require a clear topic
- require a clear objective
- discourage generic text through UI structure, examples, and validation
- reinforce that this is a single scoped request, not an open-ended relationship

### Alumni inbox

- support very fast decision-making
- make accept and decline the primary actions
- show urgency clearly
- show what the student needs before secondary context

### Scheduling handoff

- keep the transition from accepted request to booking lightweight
- explain the deadline clearly
- avoid introducing extra steps before Calendly

## Copy Rules

Use:

- conversation
- request
- 30-minute call
- help with
- offering

Avoid:

- mentor
- mentorship
- long-term guidance
- ambiguous networking language
- vague asks like "would love to connect"

## Information Hierarchy

For any student-facing alumni surface, default order should be:

1. current role
2. company
3. offerings
4. matching reason
5. call to action
6. longer profile details

For any alumnus-facing request surface, default order should be:

1. what the student needs
2. request topic
3. objective of the call
4. urgency and deadline
5. supporting student context

## Derived Product Decisions

These feedback points have already shaped current product decisions.

| Alumni feedback | Current product direction |
| --- | --- |
| "I only want to know what this person needs." | Scoped Ask |
| "Do not make me mentor." | One-time request lifecycle |
| "Do not build calendar." | Calendly integration |
| "Do not spam me." | Pair exclusion + 3 recommendations |
| "Let me decline quickly." | Accept / Decline only |
| "I want to know what is urgent." | Combined inbox + countdown |
| "I only want to help in my expertise." | Offerings and Non-offerings |

## Implementation Checklist

- alumni value proposition is visible before long profile content
- request composer forces topic and objective
- core request copy avoids mentorship framing
- inbox screens optimize for fast accept or decline
- deadlines are visible and understandable
- Calendly handoff stays lightweight
- profiles and cards are scannable within a few seconds
