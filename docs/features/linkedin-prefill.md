# LinkedIn Prefill

Last updated: 2026-07-27

**Primary readers:** Frontend, Backend  
**Priority:** Medium  
**Read this when:** You are implementing imported profile draft behavior or optional CV parsing.

## Purpose

This feature governs imported profile draft data during onboarding.

For MVP 1, this includes LinkedIn-assisted profile fields already referenced in the product and optional CV PDF-assisted parsing behavior described in the legacy rules source.

## Business Intent

Imported data should reduce typing effort, but it must remain editable draft information until the user reviews and confirms it.

## Core Rules

- imported or parsed profile information is draft data only
- user review and explicit confirmation are required before profile completion
- manual entry must always remain available
- parsing or import failure must not block onboarding
- missing information must not be invented
- user edits always take precedence over imported values
- re-uploading or reprocessing must not overwrite user-edited values without confirmation
- imported content must not determine eligibility, role, or cohort

## Frontend Requirements

- show imported values clearly as editable draft content
- let users review imported and manually entered values together before final confirmation
- provide manual entry fallback when import or parsing fails
- show confirmation prompts before replacing user-edited data with new import results
- make it clear which fields came from import and which were edited manually

## Backend Requirements

- store imported draft data separately enough to preserve source and user edits
- support optional CV PDF parsing for company, title, employment dates, location, education, and skills where available
- never auto-confirm imported fields
- preserve user-edited values as higher priority than imported values
- record import source, import time, parse status, and overwrite-confirmation events
- ensure imported data cannot change role, cohort, or account eligibility state

## Data Requirements

- student import targets may include experience and skills
- alumni import targets may include past and current industries and roles
- optional portfolio or LinkedIn URLs may be stored separately from imported structured fields

## Error Handling

- import failure returns a non-blocking message and the user remains able to continue manually
- invalid or unreadable files must not corrupt existing draft profile data
