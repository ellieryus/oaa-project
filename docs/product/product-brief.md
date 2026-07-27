# Product Brief

Last updated: 2026-07-27

**Primary readers:** PM, Product Owner, Backend, Frontend  
**Priority:** Highest  
**Read this when:** You need MVP scope, success criteria, acceptance criteria, or policy context.

## Purpose

This document defines the business and release brief for One Ask Away MVP 1.

It is intended to answer:

- what we are shipping first
- what we are explicitly not shipping
- what outcomes define a successful release
- what each core journey must do to be considered acceptable
- what privacy and data-handling rules apply at MVP

## Product Summary

One Ask Away helps McGill MMA students connect with alumni for short, scoped career conversations.

The product solves three recurring problems:

- students freeze on cold outreach
- alumni receive vague, low-signal asks
- there is no structured workflow for a useful short career conversation

The core product promise is:

1. match students with relevant alumni
2. help students send a focused ask tied to an alumnus offering
3. capture value after the conversation

## Release Goal

### Primary release goal

Launch a production-ready private beta that proves students can move from verified account to completed alumni conversation inside a structured workflow.

### Release type

Private beta

### Target users

- current McGill MMA students
- selected McGill MMA alumni

### Release objective

Validate that a scoped, structured request flow performs better than generic outreach for both student activation and alumni willingness to engage.

## MVP Scope

### In scope

- email verification and eligibility
- student onboarding
- alumni onboarding
- alumni availability connection
- three-match generation
- alumni detail view
- ask composition and submission
- alumni inbox and accept or decline flow
- scheduling handoff and meeting tracking
- pulse survey
- student reflection
- alumnus private post-call notes

### Out of scope

- LinkedIn messaging integration
- Google or Outlook calendar sync
- mobile app
- admin analytics dashboard
- donations or fundraising
- multi-school expansion
- automated ranking explainability beyond simple match reasons
- open-ended messaging threads
- full notification center beyond essential transactional messaging

## Release Success Metrics

These are proposed MVP metrics and should be ratified before launch.

### Business outcome

- a meaningful share of active students complete at least one alumni conversation
- completed scoped conversations per active student cohort is the preferred north-star metric

### Adoption and activation

- at least 70% of invited students complete onboarding
- at least 60% of invited alumni complete onboarding
- at least 60% of onboarded students view at least one alumni match

### Request conversion

- at least 35% of onboarded students submit at least one ask
- at least 50% of submitted asks receive an alumni response within 48 elapsed hours
- at least 25% of submitted asks lead to an accepted conversation

### Conversation quality

- at least 70% of student reflections mark the conversation as helpful
- at least 60% of alumni participants remain open to future requests after first use

### Product reliability

- fewer than 5% of core journey attempts end in a blocking product error
- no loss of submitted onboarding, request, or reflection data in production
- no duplicate meeting, notification, or slot-replacement records caused by retries or provider events

## Core Journeys

### Journey 1: Student onboarding

Goal:
Student defines aspirations, background, and help needs well enough to receive relevant matches.

Acceptance criteria:

- student can sign in with an approved McGill address
- student can complete all onboarding steps without data loss
- required fields are validated with clear inline feedback
- on completion, onboarding data is persisted and available after refresh
- student lands in the authenticated product flow after completion

### Journey 2: Alumni onboarding

Goal:
Alumnus defines background, offerings, non-offerings, and availability clearly enough to receive scoped asks.

Acceptance criteria:

- alumnus can sign in with an approved identity flow
- alumnus can complete all onboarding steps without data loss
- offerings and non-offerings are clearly separated in stored data
- availability is persisted and displayed consistently after refresh
- alumnus can update onboarding data later without corrupting prior data

### Journey 3: Match discovery

Goal:
Student sees a small, relevant set of alumni matches aligned to stated goals.

Acceptance criteria:

- student can access a matches view after onboarding and receives three matches
- each match shows enough context to decide whether to reach out
- student can open a full alumni detail view from matches
- match list loads from production data, not mock imports
- empty and low-match states are handled gracefully

### Journey 4: Ask composition and submission

Goal:
Student can send a focused request tied to an alumnus offering.

Acceptance criteria:

- student can choose a valid help topic from the alumnus's offerings
- student can review or generate a scoped ask draft
- student can submit the request successfully once validation passes
- submitted request persists and is visible in student and alumni views
- duplicate accidental submissions are prevented or safely handled

### Journey 5: Alumni inbox and request decision

Goal:
Alumnus can review incoming asks and make a clear accept or decline decision.

Acceptance criteria:

- alumnus can view pending and historical requests
- alumnus can inspect the student context and request context before deciding
- accept and decline actions persist correctly
- student sees the resulting status change
- optional follow-up messaging on accept or decline is stored and shown correctly

### Journey 6: Conversation handoff

Goal:
Accepted requests turn into a clearly scheduled conversation with minimal friction.

Acceptance criteria:

- scheduling access is available only from an accepted request
- the student has 24 elapsed hours from acceptance to create a valid booking
- an accepted request records a chosen time and conversation state
- if no valid booking is created within the 24-hour window, the request expires and scheduling access is removed
- the participant receives the essential confirmation details
- if invite sending is in MVP, the invite is generated and delivered successfully
- if invite sending is not ready, the release must explicitly downgrade this to a manual workflow

### Journey 7: Student reflection

Goal:
Student captures what they learned and a meaningful next step after the conversation.

Acceptance criteria:

- student can complete a reflection after an accepted or completed conversation
- reflection data persists after refresh and is tied to the correct request
- reflection can safely tolerate a page reload or resume
- any AI-drafted next step is editable before save

### Journey 8: Alumni post-call notes

Goal:
Alumnus captures private notes about the student and the conversation.

Acceptance criteria:

- alumnus can save private post-call notes tied to the correct request
- notes persist after refresh
- notes are visible only to the alumnus who created them
- notes do not leak into student-visible UI or notifications

## Core Principles

- quality of asks matters more than volume
- exact lifecycle rules matter more than broad feature breadth
- reliable persistence matters more than demo completeness
- users must always understand deadlines and next actions

## Scope Guardrails

The first release should optimize for:

- clarity of request quality over volume of networking activity
- small, relevant match sets over broad discovery
- reliable core workflow over ambitious integrations
- durable data and permissions over cosmetic completeness

The first release should not expand scope to include:

- new user segments outside the McGill MMA network
- complex marketplace mechanics
- social features
- advanced analytics or admin tooling unless needed to operate the beta

## Privacy, Data Retention, and Acceptable Use

These are proposed MVP rules and should be confirmed with the team's legal and privacy posture before public expansion.

### Privacy principles

- collect only the data required to enable matching, requests, scheduling, and post-call reflection
- keep alumnus private notes private to the alumnus
- do not expose student reflections or private notes outside the intended role
- avoid storing more sensitive personal data than needed for the MVP

### Minimum data categories

- identity and account data
- student profile and aspirations
- alumni profile, offerings, and availability
- request and scheduling metadata
- reflection and post-call notes
- essential operational logs

### Proposed retention defaults

- sign-in or magic-link tokens: short-lived only
- operational logs: 30 to 90 days unless a stricter policy is chosen
- inactive account data: retained until a defined deletion or archive policy is approved
- reflection and post-call data: retained for product use unless user deletion rights require removal

### Acceptable-use baseline

- the product is for career guidance and professional networking within the intended program context
- harassment, discriminatory conduct, spam, and off-platform abuse are not permitted
- student and alumni data may not be exported or reused outside the service purpose without approval
- AI-generated copy must be reviewable by the user before it is sent

### Required policy follow-ups

- define account deletion workflow
- define data export and access request workflow
- define incident response for privacy or account misuse
- define whether reflection data is part of the official user record for deletion purposes

## Business Risks

### Product risks

- students may not convert from match view to submitted ask
- alumni may ignore or decline too many asks if request quality is weak
- limited initial alumni supply may make matching feel sparse

### Operational risks

- manual support load may be too high during the beta
- missing observability may slow incident resolution
- incomplete auth and permission boundaries may create trust issues

### Scope risks

- adding integrations too early may delay production readiness
- UI polish work may consume time needed for persistence, auth, and QA

## Launch Gating Questions

The team should answer yes to all of these before the first beta launch:

- is MVP scope locked for release one
- are non-MVP items explicitly deferred
- are success metrics approved
- are journey acceptance criteria approved
- are ownership and incident handling clear
- are privacy and acceptable-use rules approved at least for beta
- can the team support invited users during the first release window
