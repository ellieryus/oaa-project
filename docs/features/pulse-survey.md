# Pulse Survey

Last updated: 2026-09-24

**Primary readers:** Frontend, Backend  
**Priority:** Medium  
**Read this when:** You are implementing self-reported conversation prompts, reflections, or private notes.

## Purpose

This feature governs self-reported conversation prompts, optional pulse surveys, student reflection, and alumnus private notes.

## Business Intent

After a self-reported or future verified conversation, One Ask Away should capture lightweight feedback and preserve role-private post-meeting information without blocking continued product use.

## Core Rules

- in MVP 1, pulse invitations are created from a student-reported completed conversation or one day after a student-reported expected meeting date; they are not triggered by Calendly provider events
- one optional pulse-survey invitation is created for each participant for the same conversation follow-up
- pulse survey is non-blocking
- pulse survey contains no more than three scored or multiple-choice questions per respondent
- student and alumnus survey responses remain private from each other
- non-response does not affect access, matching eligibility, or meeting history
- student reflection and alumnus private notes are stored separately
- alumnus private notes are never student-visible
- the student pulse survey asks: `Was this conversation helpful?` and `Did it match what you expected?`
- the alumnus pulse survey asks: `Was the request clear and within your scope?` and `Would you accept a similar request again?`
- a student may send one appreciation action after self-reporting that the conversation happened: `Thank You` or `Coffee Bag`, with an optional note of up to 280 characters
- `Coffee Bag` is a virtual, non-monetary big thank you; it does not transfer money, gift cards, donations, or other value
- appreciation is separate from pulse feedback and does not expose the student's private reflection or survey response

## Frontend Requirements

- show a non-blocking prompt after the self-reported conversation timing rule is met
- allow submit or dismiss behavior
- do not block platform use if the prompt is ignored
- keep student reflection UI separate from alumnus private-notes UI
- ensure students cannot access alumnus private notes and alumni cannot access student private reflection content
- after the student submits, dismisses, or skips their private feedback, offer a one-time appreciation choice: `Thank You` or `Coffee Bag`, with an optional short note
- clearly explain that both appreciation actions are visible to the alumnus and that `Coffee Bag` is a virtual big thank you
- show a sent appreciation in the alumnus's post-call or past-student view without exposing private feedback

## Backend Requirements

- create exactly one pulse-survey invitation per participant per eligible conversation follow-up
- store one response per participant per eligible conversation follow-up
- keep response ownership and visibility strictly role-scoped
- persist student reflection separately from alumnus notes
- store at most one appreciation action per student per self-reported conversation, including its type, optional note, and sent timestamp
- allow only the student who participated in the accepted request to create the appreciation action after reporting the conversation happened
- preserve self-reported scheduling/conversation status, expected date where supplied, and response timestamps

## Privacy Requirements

- survey responses must remain private from the other participant
- student reflections must not leak into alumnus-facing surfaces
- alumnus private notes must not leak into student-facing surfaces or notifications
- student appreciation is visible only to the participating alumnus and must not include private survey or reflection data

## Appreciation Actions

`Thank You` is a lightweight acknowledgement. `Coffee Bag` is a more prominent virtual acknowledgement for an especially valuable conversation. Both actions may include an optional note of up to 280 characters; neither has monetary value in MVP 1.

The student chooses one action after self-reporting that the conversation happened. The action is immutable after sending and does not open a messaging thread or create a follow-up obligation for either participant.
