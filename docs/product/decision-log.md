# Decision Log

Last updated: 2026-09-22

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
| 2026-09-11 | DEC-006 | Structured, ranked current priorities are the source of truth for MVP matching. General natural-language alumni search is deferred. | Structured priorities give students guidance and give alumni reliable, scannable request context. | Students select and rank 1-3 current priorities; any future free-text intent must map to editable structured tags and cannot replace this source of truth without evidence. |
| 2026-09-11 | DEC-007 | Current priorities are dynamic matching state, not long-term student profile help needs. | A student's immediate career needs can change and two parallel priority lists would be confusing. | Initial priorities are seeded from onboarding; students can update them from Profile or Matches, then explicitly confirm whether to update their uncontacted matches. |
| 2026-09-11 | DEC-008 | Match relevance is explained with human-readable reasons, not a raw score. | Raw scores imply false precision and do not help users understand scope. | The backend retains internal ranking scores; student-facing cards show one personalised reason and alumnus-facing requests show scoped request context. |
| 2026-09-11 | DEC-009 | Requests snapshot student context at submission. | Alumni must review the intent that existed when the student sent the ask, even if the student later edits their profile or priorities. | A request stores its selected offering, priority snapshot, profile summary, relevant student context, and scoped ask. |
| 2026-09-11 | DEC-010 | Surprise Me is deferred until the structured-matching MVP has outcome data. | The beta should first validate clear asks, alumni confidence, and expectation alignment. | Skills, trajectory, certifications, projects, and seniority may be used in future discovery ranking; hobbies remain optional and are not a core matching signal. |
| 2026-09-11 | DEC-011 | This amends DEC-004: a batch contains exactly three active matches when three qualified candidates exist; otherwise it shows fewer rather than weak or out-of-scope results. | A small beta pool must not be padded with weak or out-of-scope candidates. | The UI explains the smaller set and directs the student to update current priorities. |
| 2026-09-11 | DEC-012 | Roster-approved alumni may verify an invited personal email; a McGill student email is not required for alumni. | Alumni may no longer retain access to McGill email after graduation. | Eligibility remains roster-based; student and alumni verification policies are role-specific. |
| 2026-09-11 | DEC-013 | Alumni scope changes apply to future matching only. | Alumni must retain control of their current availability and scope without rewriting a request already under review. | Existing match and request records retain their historical matching context; new requests must validate against the alumnus's current offerings. |
| 2026-09-11 | DEC-014 | Decline reasons are student-visible, structured feedback. | Students need a clear outcome and OAA needs signal on scope and matching quality. | A final decline records one reason and may include an optional student-visible follow-up message; private internal notes are never exposed. |
| 2026-09-11 | DEC-015 | OAA does not manage rescheduling or time coordination after an initial booking. | Scheduling changes are better handled directly by the participants in the tools they already use. | Participants coordinate through personal Calendly, LinkedIn, or email; OAA provides no reschedule/cancel UI, workflow, or support. |
| 2026-09-11 | DEC-016 | Each completed conversation offers private feedback for both participants and one student appreciation action. | OAA needs match-quality signals while giving students a lightweight way to acknowledge alumni time. | Feedback remains private; students may send one non-monetary `Thank You` or `Coffee Bag` appreciation per completed meeting. |
| 2026-09-11 | DEC-017 | Alumni retention relies on one request reminder, truthful re-engagement, impact recognition, and one earned community credential. | Alumni should feel recognized rather than repeatedly pressured to respond. | Request reminders stop after 24 hours; re-engagement requires a genuine event; `OAA Community Contributor` is issued by Master of Management Analytics (MMA) only with program authorization. |
| 2026-09-22 | DEC-018 | Alumni eligibility requires manual review of every self-service request against a minimum name-and-cohort-code program roster before personal-email verification. | Personal email ownership does not prove alumni status, and OAA should not obtain alumni personal emails from the program roster. | Alumni self-submit required name fields, a cohort code, personal email, and consent; the backend developer approves eligibility before a code is sent in beta and MVP 1. |
| 2026-09-22 | DEC-019 | For beta and MVP 1, the backend developer manually reviews every alumni access request through backend/database tooling; a dedicated admin-review UI is deferred. | The beta volume does not justify a new admin surface, but review decisions must remain auditable. | The form uses required name fields, a program-supplied cohort-code picklist with no `Other`, and a resubmission path. OAA Admin and Program Director role permissions will be decided post-beta. |

## Open Decisions

- final roster source, permitted fields, and secure transfer process
- final session implementation
- exact shape of the production meeting entity
- whether expired-request reactivation remains in MVP 1 or is deferred
