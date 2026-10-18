# Decision Log

Last updated: 2026-10-14

**Primary readers:** PM, Product Owner, Backend, Frontend  
**Priority:** High  
**Read this when:** You need to resolve conflicts or confirm the latest approved decisions.

## Purpose

This file records product and architecture decisions that should override older assumptions or conflicting references.

## Decisions

| Date | ID | Decision | Reason | Impact |
| --- | --- | --- | --- | --- |
| 2026-07-27 | DEC-001 | Repo-local Markdown docs supersede the external MVP 1 business-rules PDF as the working source of truth. | The technical team needs reviewable, editable documentation in Git. | Feature behavior should now be updated in `features/*.md` and related docs. |
| 2026-07-27 | DEC-002 | Accepted requests use a 24-hour elapsed scheduling window. | Historical decision. | Superseded by DEC-021. |
| 2026-07-27 | DEC-003 | Matching begins only when the Mentee explicitly starts finding Mentors in an active community. | This preserves deliberate matching activation. | No automatic cross-community matching on profile completion. |
| 2026-07-27 | DEC-004 | MVP 1 uses exactly three active Mentor matches per Mentee batch. | Historical decision. | Superseded by DEC-011 and further clarified by DEC-032. |
| 2026-07-27 | DEC-005 | Declined Asks are final and cannot be reactivated. | This protects Mentor intent and simplifies lifecycle behavior. | Mentees cannot resend or reopen declined Asks. |
| 2026-09-11 | DEC-006 | Structured, ranked current priorities are the source of truth for MVP matching. General natural-language Mentor search is deferred. | Structured priorities give Mentees guidance and Mentors reliable Ask context. | Mentees select and rank 1–3 current priorities. |
| 2026-09-11 | DEC-007 | Current priorities are dynamic matching state, not a second long-term help-needs list. | Immediate career needs can change. | Priority-edit behavior remains product-controlled; community-specific overrides are now an open decision under DEC-035. |
| 2026-09-11 | DEC-008 | Match relevance is explained with human-readable reasons, not raw scores. | Raw scores imply false precision. | Mentee cards show explainable reasons; internal scores remain internal. |
| 2026-09-11 | DEC-009 | Asks snapshot Mentee context at submission. | Mentors must review the intent that existed when the Ask was sent. | Ask context remains immutable after submission. |
| 2026-09-11 | DEC-010 | Surprise Me is deferred until the structured-matching MVP has outcome data. | The beta should first validate clear Asks and expectation alignment. | Free-form discovery is not part of MVP. |
| 2026-09-11 | DEC-011 | A recommendation set shows three qualified Mentors when three exist, otherwise fewer rather than weak or out-of-scope results. | The product must not pad supply with weak matches. | Further clarified by DEC-032: three is a maximum visible window, not a guaranteed count. |
| 2026-09-11 | DEC-012 | Roster-approved alumni may verify an invited personal email; a McGill student email is not required for alumni. | Historical decision. | Superseded by DEC-022 and DEC-029. |
| 2026-09-11 | DEC-013 | Mentor scope changes apply to future matching only. | Existing Asks must retain historical context. | Existing Match and Ask records preserve their snapshot context. |
| 2026-09-11 | DEC-014 | Decline reasons are structured Mentee-visible feedback. | Mentees need a clear outcome and OAA needs scope-quality signal. | Decline is final; optional follow-up copy remains allowed. |
| 2026-09-11 | DEC-015 | OAA does not manage rescheduling or time coordination after the initial handoff. | Participants can coordinate in the external tool they already use. | No native reschedule/cancel workflow. |
| 2026-09-11 | DEC-016 | Self-reported conversations may collect private feedback and one Mentee appreciation action. | OAA needs quality signals while recognizing Mentor time. | Feedback remains private. |
| 2026-09-11 | DEC-017 | Mentor retention relies on one Ask reminder, truthful re-engagement, and impact recognition. | Avoid repeated pressure. | Ask-specific reminders remain low frequency. |
| 2026-09-22 | DEC-018 | Alumni eligibility requires roster review before verification. | Historical decision. | Superseded by DEC-022 and DEC-029. |
| 2026-09-22 | DEC-019 | Backend manually reviews every alumni access request. | Historical decision. | Superseded by Community Admin-governed membership. |
| 2026-09-22 | DEC-020 | Student-to-alumni conversion is additive, not destructive. | A person can hold multiple capabilities over time. | Reinforced by DEC-034. |
| 2026-09-24 | DEC-021 | MVP coordination uses one Mentor-selected Calendly or LinkedIn route at acceptance, not calendar availability gating or verified scheduling. | Avoid paid integration complexity and forced Calendly setup. | Acceptance snapshots one valid route. |
| 2026-10-03 | DEC-022 | MVP is community-enabled: `CommunityMembership` is the authorization boundary and Mentor/Mentee are product roles. | OAA must support multiple communities without tying identity to MMA or McGill. | Same-community authorization remains foundational. |
| 2026-10-04 | DEC-023 | Backend manually provisions MMA and Community Admins; self-service community creation is post-MVP. | Historical beta-bootstrap decision. | Superseded in direction by DEC-033; exact Admin creator verification remains open. |
| 2026-10-04 | DEC-024 | MVP uses Admin add/invite only, with no public join applications or discovery. | Historical decision. | Superseded by DEC-029. |
| 2026-10-04 | DEC-025 | An active membership does not bypass required role-profile confirmation. | Matching quality requires reviewed profile inputs. | Still valid. |
| 2026-10-04 | DEC-026 | A 48-hour no-response releases the Mentee opportunity while preserving late Mentor response. | A late willing Mentor should still be able to respond. | Still valid; replacement behavior is clarified by DEC-032. |
| 2026-10-04 | DEC-027 | Decline does not silently replace a card; Mentee selects `Find another Mentor`. | Historical UX choice. | Superseded by DEC-032: the system may prepare one qualified replacement and the Mentee explicitly reveals it. |
| 2026-10-04 | DEC-028 | Participant discovery is directional: Mentees discover Mentors, not other Mentees. | A community is an access/matching boundary, not a social directory. | Still valid. |
| 2026-10-14 | DEC-029 | Both Mentors and Mentees may enter through open signup, select an organization, discover eligible communities, and request membership. | Users should be free to choose and progress inside OAA while Community Admin remains the access gatekeeper. | `DISCOVERABLE_APPROVAL_REQUIRED` communities support join requests; invite and exact-email add remain valid parallel paths. |
| 2026-10-14 | DEC-030 | Organization selection scopes normal community discovery but does not itself verify institutional affiliation or grant community access. | Discovery context and membership authorization are separate concepts. | Same-organization cross-program requests are allowed. Explicit Admin invite/add may cross organization boundaries. |
| 2026-10-14 | DEC-031 | Community membership is a hard matching boundary in MVP. | A Mentee inside `MMA → Matches` should understand that recommendations are MMA supply, not an OAA-wide mixed pool. Admins may also expect their Mentor pool to remain community-specific. | No silent cross-community fallback. To access another community's Mentor pool, the user must first become a member of that community. |
| 2026-10-14 | DEC-032 | Matching uses a maximum visible window of three uncontacted qualified Mentors, with bounded next-set and replacement behavior. | OAA should preserve curation without swipe-through behavior or weak filler. | Send Ask moves Mentor to Asks without top-up. `Not a fit` does not immediately top up. When current visible recommendations are fully handled, `See next recommendations` may reveal a new set. Decline/expiry may prepare exactly one qualified replacement when visible supply is below three. |
| 2026-10-14 | DEC-033 | User-facing Community Admin/community creation is an intended product direction rather than a permanent backend-only provisioning model. | The desired model is closer to Slack-style community creation while preserving trust. | Organizational identity/affiliation verification and authority/duplicate-community controls remain open Backend/Product design questions. |
| 2026-10-14 | DEC-034 | Mentor and Mentee are non-exclusive capabilities that may change over time. | A student may later mentor after graduation; users may participate differently across communities. | Do not model destructive Student→Alumni conversion or one global exclusive role. |
| 2026-10-14 | DEC-035 | Whether Mentee priorities and Mentor offerings are global or community-specific remains intentionally unresolved. | A user may want different mentoring intent in different communities, but community-specific overrides add ERD and UX complexity. | Do not silently hard-code community-specific overrides or treat the current global prototype as a final architecture decision. |
| 2026-10-14 | DEC-036 | Relevance is the first ranking requirement; quantity is bounded at up to three; diversification is subordinate to relevance. | Similar highly relevant Mentors are better than a diverse but materially weaker recommendation. | Exact Classification/STS/Cross-Encoder/MMR implementation belongs to Backend/Data. |
| 2026-10-14 | DEC-037 | MVP has no numeric minimum Mentor-pool or community-activation threshold. | The first pilot targets a materially larger MMA network; tiny-community viability should be learned rather than guessed. | Do not hard-code 10/15/20 or any other threshold. Use research and simulation before introducing a future readiness gate. |
| 2026-10-14 | DEC-038 | Global Home is the membership/discovery hub; mentoring activity is community-scoped. | Avoid duplicate global and community mentoring surfaces. | Home contains `Your Communities`, `Pending Requests`, `Discover Communities`; inside a community, Mentee tabs are `Matches` and `Asks`. |

## Open Decisions

- final session implementation
- invitation expiry duration and reissue policy
- Community Admin removal, appeal, and ownership-transfer policy
- Admin creator identity/affiliation/authority verification mechanism
- global vs community-specific Mentee priorities and Mentor offerings
- exact matching implementation details, including hard-vs-soft classification
- future minimum viable Mentor-pool/readiness threshold after research and simulation
- whether exhausted-state UX should show aggregate Mentor-offering availability
- join-request decline-reason visibility and requirement
