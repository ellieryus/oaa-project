# For Trang: Frontend

Last updated: 2026-10-03

**Primary readers:** Frontend, UX
**Priority:** Highest

## Read First

1. `docs/product/product-brief.md`
2. `docs/features/multi_community_mvp_requirements.md`
3. `docs/features/email-verification.md`
4. `docs/features/matching.md`
5. `docs/features/request-lifecycle.md`
6. `docs/features/calendly.md`

## Core UX Rules

- use `Mentor` and `Mentee`; describe a short career conversation, not a promised long-term mentorship relationship
- always make the current community visible in authenticated community flows
- users see a community only after Community Admin add or valid invitation acceptance; do not render community discovery for non-members
- invite acceptance must clearly show the invited community and granted role without exposing the invited email to the Community Admin
- Community Admin needs exact-email member add plus a simple directory; it sees only minimum lookup identity plus name, role, status, offerings, and non-offerings
- Community Admin never sees stored member personal email, private feedback, notes, schedule status, or coordination route. After entering an invitee email, UI shows only invitation status
- Mentee match cards show one clear reason, Mentor offerings/non-offerings, and exactly three qualified results when available
- Mentor acceptance must end with one Calendly or LinkedIn route. Do not show both routes to the Mentee or a booking deadline after acceptance

## Do Not Build In MVP

- Community Admin metrics/dashboard
- cross-community mentor discovery/scouting
- native chat, rescheduling, or calendar sync
- surfaces that imply global directory access or institutional verification
