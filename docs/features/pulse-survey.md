# Pulse Survey

Last updated: 2026-07-27

**Primary readers:** Frontend, Backend  
**Priority:** Medium  
**Read this when:** You are implementing meeting completion prompts, reflections, or private notes.

## Purpose

This feature governs meeting completion prompts, optional pulse surveys, student reflection, and alumnus private notes.

## Business Intent

After a completed meeting, One Ask Away should capture lightweight feedback and preserve role-private post-meeting information without blocking continued product use.

## Core Rules

- a verified non-canceled meeting becomes completed when its stored end time passes
- one optional pulse-survey invitation is created for each participant
- pulse survey is non-blocking
- pulse survey contains no more than three scored or multiple-choice questions per respondent
- student and alumnus survey responses remain private from each other
- non-response does not affect access, matching eligibility, or meeting history
- student reflection and alumnus private notes are stored separately
- alumnus private notes are never student-visible

## Frontend Requirements

- show a non-blocking prompt after meeting completion
- allow submit or dismiss behavior
- do not block platform use if the prompt is ignored
- keep student reflection UI separate from alumnus private-notes UI
- ensure students cannot access alumnus private notes and alumni cannot access student private reflection content

## Backend Requirements

- create exactly one pulse-survey invitation per participant per completed meeting
- store one response per participant per meeting
- keep response ownership and visibility strictly role-scoped
- persist student reflection separately from alumnus notes
- preserve meeting-completion audit trail and response timestamps

## Privacy Requirements

- survey responses must remain private from the other participant
- student reflections must not leak into alumnus-facing surfaces
- alumnus private notes must not leak into student-facing surfaces or notifications
