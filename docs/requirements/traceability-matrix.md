# Traceability Matrix

Last updated: 2026-10-03

| Rule area | Feature source | Architecture source | MVP requirement |
| --- | --- | --- | --- |
| Community access and roles | `features/multi_community_mvp_requirements.md`, `features/email-verification.md` | `architecture/state-machines.md`, `architecture/erd.md` | Backend provisions MMA and assigns Community Admins from OAA-approved instructions; Community Admin adds known accounts only in assigned community. |
| Invitations | `features/multi_community_mvp_requirements.md`, `features/email-verification.md` | `architecture/state-machines.md`, `architecture/system-architecture.md` | Mentor and Mentee invites are unique and email-bound; acceptance proves email ownership without a second OTP. |
| Community-scoped matching | `features/matching.md` | `architecture/erd.md`, `architecture/system-architecture.md` | Active Mentee and Mentor memberships in the same community, three qualified matches when available. |
| Ask lifecycle | `features/request-lifecycle.md` | `architecture/state-machines.md`, `architecture/erd.md` | 48-hour Mentor response window; immutable Mentee snapshot; structured decline; expired Ask may receive a late Mentor response without withdrawing replacement slot. |
| Coordination | `features/calendly.md` | `architecture/state-machines.md`, `architecture/erd.md` | One snapshotted Calendly or LinkedIn route; no scheduling expiry or provider tracking. |
| Conversation capture | `features/pulse-survey.md`, `features/calendly.md` | `architecture/system-architecture.md` | Private self-reported signals and feedback; no verified completion claim. |
| Privacy and authorization | all feature docs | `architecture/system-architecture.md` | Community Admin cannot access email, private feedback, notes, timing, or coordination routes. |
