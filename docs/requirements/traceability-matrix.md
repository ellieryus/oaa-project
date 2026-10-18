# Traceability Matrix

Last updated: 2026-10-14

| Rule area | Feature source | Architecture source | MVP requirement |
| --- | --- | --- | --- |
| Email ownership | `features/email-verification.md` | `architecture/state-machines.md`, `architecture/system-architecture.md` | Verify email ownership separately from Organization selection and Community membership. |
| Organization discovery | `features/multi_community_mvp_requirements.md`, `features/email-verification.md` | `architecture/erd.md`, `architecture/system-architecture.md` | Selected Organization scopes normal Discovery but does not itself grant or verify Community access. |
| Community discovery | `features/multi_community_mvp_requirements.md`, `features/user-flows.md` | `architecture/system-architecture.md` | Home shows Your Communities, Pending Requests, Discover Communities; discoverable communities require Admin approval. |
| Join requests | `features/multi_community_mvp_requirements.md`, `features/user-flows.md` | `architecture/state-machines.md`, `architecture/erd.md` | Mentor and Mentee users may request access; pending grants no access; Admin approves/declines. |
| Invitations/add | `features/multi_community_mvp_requirements.md`, `features/email-verification.md` | `architecture/erd.md` | Direct invite and exact-email add remain supported and may explicitly cross Organization boundaries. |
| Roles | `features/multi_community_mvp_requirements.md` | `architecture/erd.md` | Mentor/Mentee are non-exclusive capabilities; no destructive global role switch. |
| Community matching boundary | `features/matching.md` | `architecture/erd.md`, `architecture/system-architecture.md` | Candidate pool is the selected active Community only; no cross-community fallback. |
| Recommendation window | `features/matching.md` | `architecture/state-machines.md` | At most three visible uncontacted qualified Mentors; fewer are valid; no weak filler. |
| Current-set progression | `features/matching.md` | `architecture/state-machines.md` | Send Ask or Not a Fit handles a current card; next set appears only when current visible set is fully handled. |
| Replacement | `features/matching.md`, `features/request-lifecycle.md` | `architecture/state-machines.md` | Decline/expiry may prepare exactly one qualified replacement when visible supply <3 and unseen qualified supply exists. |
| Ask lifecycle | `features/request-lifecycle.md` | `architecture/state-machines.md`, `architecture/erd.md` | 48-hour Mentor response, immutable snapshot, late response after expiry, community-scoped Asks. |
| Coordination | `features/calendly.md` | `architecture/system-architecture.md` | One snapshotted Calendly/LinkedIn route; lightweight UX state only; no provider-verification claim. |
| Community creation | `features/multi_community_mvp_requirements.md` | `architecture/erd.md`, `architecture/system-architecture.md` | User-facing creation/Admin direction is intended; creator verification mechanism remains open. |
| Minimum Mentor pool | `features/matching.md`, `features/multi_community_mvp_requirements.md` | `architecture/erd.md` | No numeric threshold or activation gate in MVP; research/simulation only. |
| Privacy | all feature docs | `architecture/system-architecture.md` | Admin sees only permitted community operational/review data; private mentoring data remains protected. |
