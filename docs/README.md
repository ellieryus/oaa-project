# Documentation Map

Last updated: 2026-07-27

**Primary readers:** All  
**Priority:** High  
**Read this when:** You need the documentation map and source-of-truth rules.

## Purpose

This folder is the working source of truth for product, requirements, architecture, and delivery.

The technical team should review and update the Markdown files in this repo rather than rely on external PDFs.

Start with `docs/START-HERE.md`.

## Source Of Truth Rules

Use this order when documents overlap:

1. Approved decisions in `product/decision-log.md`
2. Feature requirements in `features/*.md`
3. Product scope in `product/product-brief.md`
4. System design in `architecture/*.md`
5. Project status in `project-context.md`
6. Legacy or external reference material

## External Source Imported Into Repo

The MVP 1 business rules previously lived in an external PDF.

That material is now normalized into:

- `features/email-verification.md`
- `features/linkedin-prefill.md`
- `features/matching.md`
- `features/request-lifecycle.md`
- `features/calendly.md`
- `features/pulse-survey.md`

The repo-local Markdown files should now be treated as the maintained working version.

## Folder Structure

- `project-context.md`: current-state snapshot, weekly progress, key risks
- `START-HERE.md`: first-stop guide for anyone cloning the repo docs
- `for-ellie-backend.md`: backend reading path and focus guide
- `for-trang-frontend.md`: frontend reading path and focus guide
- `product/`: business scope, roadmap, and product decisions
- `requirements/`: PRD and traceability
- `features/`: feature-by-feature functional requirements with frontend and backend expectations
- `architecture/`: system design, ERD notes, lifecycle state machines
- `delivery/`: team operating model and documentation cadence
  - includes frontend-specific implementation guidance for UX and UI interpretation

## Review Expectations

- `project-context.md` is updated weekly during active development.
- `product/decision-log.md` is updated whenever a scope or rules decision changes.
- `features/*.md` are updated whenever business behavior changes.
- `architecture/*.md` are updated whenever the technical design changes.
