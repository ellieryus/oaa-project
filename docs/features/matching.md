# Matching

Last updated: 2026-07-27

**Primary readers:** Frontend, Backend  
**Priority:** High  
**Read this when:** You are implementing eligibility, match generation, slot replacement, or renewal rules.

## Purpose

This feature governs profile eligibility, active matching eligibility, initial match generation, slot replacement, and weekly renewal behavior.

## Business Intent

The student should receive a small, relevant, diversified set of alumni matches only after the student is fully eligible and explicitly asks to begin matching.

## Core Rules

- a user is not match-eligible until required fields are complete and the profile is explicitly confirmed
- a student becomes eligible to start matching only after verification and profile confirmation
- an alumnus becomes eligible for the active matching pool only after availability is completed
- matching starts only when the student selects Start finding alumni
- each active batch contains exactly three alumni
- the same alumnus cannot appear twice in the same active batch
- students may send requests to one, two, or all three matches
- no pass, skip, or not interested action exists in MVP 1
- matching must diversify across industry fit, role fit, offering fit, and background similarity
- a student help need that conflicts with an alumnus non-offering is a hard exclusion
- previously declined or expired student-alumnus pairs are excluded from future automated matching
- declined or qualifying expired slots are replaced individually, not as full-batch refreshes
- unused recommendations are not regenerated immediately due to student inactivity

## Frontend Requirements

- block Start finding alumni until student verification and profile confirmation are complete
- show exactly three active matches per batch
- display enough alumni context to support request decisions
- do not expose pass or skip controls
- preserve active slots that are still valid while replacing only the invalid slot
- explain inactive, expired, or unavailable states in plain language
- show alumni who confirmed profile but have not completed availability as unavailable to students

## Backend Requirements

- persist student profile confirmation state
- persist alumnus profile confirmation and availability-complete state
- generate three active matches on explicit student action only
- apply hard non-offering exclusions before ranking
- persist active match slot history and replacement history
- exclude declined and expired pairs from future automated matching
- replace only the affected slot when decline or qualifying expiry occurs
- preserve valid active requests or scheduled meetings during renewal
- support weekly renewal only under approved conditions

## Notifications

- send a non-blocking reminder to alumni who confirmed profile but have incomplete availability
- notification CTA must return directly to the availability step

## Dependencies

- active student account
- verified and active alumnus accounts
- confirmed student and alumnus profiles
- alumnus availability connection
