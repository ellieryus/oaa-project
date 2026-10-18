# Project Context

Last updated: 2026-10-14

**Primary readers:** PM, Product Owner, Backend, Frontend  
**Priority:** High

## Purpose

Living context for One Ask Away: current product direction, major open questions, and implementation focus.

## Current Product Direction

One Ask Away is a community-enabled platform for short, scoped Mentor/Mentee career conversations.

MMA is the first pilot community. Working rollout assumptions are approximately 50–60 alumni and approximately 90 students/Mentees; these figures are not product thresholds.

The current product model is:

1. verify email ownership
2. select Organization for normal Discovery
3. discover/request or be invited/added to a Community
4. Community Admin approves access
5. complete/review role profile
6. enter Community `Matches` / `Asks`
7. receive up to three qualified same-community Mentor recommendations
8. send scoped Ask
9. Mentor accepts/declines within 48 hours
10. accepted Ask hands off through one Calendly or LinkedIn route

## Major Decisions Since Early October

- free entry applies to both Mentors and Mentees
- normal Discovery is Organization-scoped
- cross-program access is allowed subject to Admin approval
- explicit Admin invite/add may cross Organization boundaries
- cross-community matching is not allowed
- Home is the membership/discovery hub
- Community workspace owns Matches and Asks
- matching returns up to three, not a guaranteed three
- relevance precedes quantity/diversification
- no free-form regenerate
- no hard-coded minimum Mentor-pool threshold
- user-facing Admin/community creation is intended

## Open Product/Backend Decisions

- global vs community-specific Mentee priorities
- global vs community-specific Mentor offerings
- community creator identity/affiliation/authority verification
- hard vs soft domain classification and exact recommendation stack
- future Mentor-pool readiness threshold after research/simulation
- whether low-supply UX should show aggregate offering availability

## Delivery Note

This documentation reconciliation updates product intent. It does not by itself claim that the current application code, Prisma schema, or deployed routes already implement these behaviors.

A separate implementation audit is required before treating the product requirements as delivered.
