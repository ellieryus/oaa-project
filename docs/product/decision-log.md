# Decision Log

Last updated: 2026-07-27

**Primary readers:** PM, Product Owner, Backend, Frontend  
**Priority:** High  
**Read this when:** You need to resolve conflicts or confirm the latest approved decisions.

## Purpose

This file records product and architecture decisions that should override older assumptions or conflicting references.

## Decisions

| Date | ID | Decision | Reason | Impact |
| --- | --- | --- | --- | --- |
| 2026-07-27 | DEC-001 | Repo-local Markdown docs supersede the external MVP 1 business-rules PDF as the working source of truth. | The technical team needs reviewable, editable documentation in Git. | Feature behavior should now be updated in `features/*.md` and related docs. |
| 2026-07-27 | DEC-002 | Accepted requests use a 24-hour elapsed scheduling window. | The external source had a 12-hour vs 24-hour conflict and the team chose 24 hours. | Update request, scheduling, notification, and state-machine logic accordingly. |
| 2026-07-27 | DEC-003 | Matching begins only when the student explicitly selects Start finding alumni. | This preserves deliberate matching activation and aligns with approved MVP behavior. | No automatic matching on profile completion. |
| 2026-07-27 | DEC-004 | MVP 1 uses exactly three active alumni matches per student batch. | This keeps the experience focused and aligns with approved matching rules. | Matching and replacement logic must preserve slot-based behavior. |
| 2026-07-27 | DEC-005 | Declined requests are final and cannot be reactivated. | This protects alumnus intent and simplifies lifecycle behavior. | Students cannot resend or reopen declined requests. |

## Open Decisions

- final roster source and sync process
- final session implementation
- exact shape of the production meeting entity
- whether expired-request reactivation remains in MVP 1 or is deferred
