# Documentation Map

Last updated: 2026-10-14

**Primary readers:** All  
**Priority:** High

## Purpose

This folder is the working source of truth for product, requirements, architecture, and delivery.

Start with `docs/START-HERE.md`.

## Source Of Truth Rules

Use this order when documents overlap:

1. `product/decision-log.md`
2. `features/*.md`
3. `product/product-brief.md`
4. `requirements/prd.md`
5. `architecture/*.md`
6. `project-context.md`
7. legacy/reference artifacts

## High-Priority Community Documents

- `features/multi_community_mvp_requirements.md` — binding Community/discovery/access rules
- `features/user-flows.md` — entry, membership, matching, Admin flows
- `features/email-verification.md` — email ownership vs Organization vs membership
- `features/matching.md` — same-community recommendation rules
- `features/mentee-page-spec.md` — Mentee IA
- `features/request-lifecycle.md` — Ask outcomes and replacement handoff
- `features/calendly.md` — accepted-Ask coordination

## Architecture

- `architecture/erd.md`
- `architecture/state-machines.md`
- `architecture/system-architecture.md`
- `architecture/schema-student.md`

## Review Expectations

- update Decision Log whenever a product rule changes
- update Feature docs whenever user behavior changes
- update Architecture docs whenever persistence/authorization design changes
- preserve unresolved questions as explicit Open Decisions rather than inferring behavior

## Prototype Note

Standalone or repo wireframes are review artifacts. A prototype does not override the Markdown source of truth unless its behavior is explicitly approved and reconciled into these docs.
