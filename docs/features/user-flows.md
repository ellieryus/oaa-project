# Community-Enabled User Flows

Last updated: 2026-10-14

**Primary readers:** PM, Product Designer, Frontend, Backend
**Priority:** Highest
**Read this when:** You are designing entry, discovery, membership review, Mentor/Mentee matching, or Admin flows.

## Shared Entry Rules

- both Mentors and Mentees may use open signup
- every user verifies email ownership before product access
- free-entry users select an organization to scope normal community discovery
- organization selection does not itself verify affiliation or grant membership
- a user may hold Mentor, Mentee, or both capabilities over time
- all mentoring activity is scoped to an active community
- normal discovery is organization-scoped
- explicit Admin invite/add may cross organization boundaries
- cross-program membership is allowed subject to Community Admin approval
- cross-community matching is not allowed

## Free-Entry User Flow

```mermaid
flowchart TD
    A[Create OAA account] --> B[Verify email ownership]
    B --> C[Choose university / organization]
    C --> D[Complete enough role/profile context for review]
    D --> E[Global Home]

    E --> F[Your Communities]
    E --> G[Pending Requests]
    E --> H[Discover Communities]

    H --> I[Open community preview]
    I --> J[Name + organization + description + eligibility + organizer]
    J --> K[Optional join note]
    K --> L[Request access as Mentor and/or Mentee]
    L --> M[Pending Community Admin review]

    M -->|Approved| N[ACTIVE membership]
    M -->|Declined| O[Declined request state]
    N --> P[Community workspace]
```

## Invited User Flow

```mermaid
flowchart TD
    A[Open email-bound invitation] --> B[Create account / sign in]
    B --> C[Invitation proves ownership of invited email]
    C --> D[Review/complete required role profile]
    D --> E[ACTIVE membership in invited community]
    E --> F[Global Home]
    F --> G[Open invited community]
```

An invitation grants only the named community/role. The user may still use normal organization-scoped discovery for other communities.

## Existing-Account Admin Add

```mermaid
flowchart TD
    A[Community Admin enters exact known email] --> B[Minimum identity confirmation]
    B --> C[Select Mentor and/or Mentee role]
    C --> D[Create ACTIVE membership]
    D --> E[User completes/reviews required role profile]
    E --> F[Community access]
```

The lookup is exact-email only and must not expose a global people directory.

## Global Home

The global Home is the membership/discovery hub.

It contains:

- `Your Communities`
- `Pending Requests`
- `Discover Communities`

Global navigation contains:

- Home
- Notifications
- Profile
- active-community shortcuts

There is no separate canonical global Match list or global Ask history.

## Mentee Community Flow

```mermaid
flowchart TD
    A[Open ACTIVE community] --> B{Profile/matching inputs ready?}
    B -->|No| C[Complete/review Mentee profile]
    C --> D[Community Matches]
    B -->|Yes| D

    D --> E[Show up to 3 qualified uncontacted Mentors]
    E --> F[View Mentor details]
    F --> G{Mentee action}

    G -->|Send Ask| H[Compose structured Ask]
    H --> I[Submit Ask]
    I --> J[Mentor leaves Matches]
    J --> K[Ask appears in community Asks]

    G -->|Not a fit| L[Optional reason]
    L --> M[Remove from current visible set]

    J --> N{Any current visible recommendations left?}
    M --> N
    N -->|Yes| D
    N -->|No, unseen qualified supply exists| O[See next recommendations]
    N -->|No unseen qualified supply| P[Low-supply state]
```

Low-supply state:

- no relevant recommendations available right now
- more Mentors may be added later
- optional `Review priorities`
- no forced priority change
- no cross-community fallback

## Mentor Outcome And Replacement Flow

```mermaid
flowchart TD
    A[Pending Ask] --> B{Mentor outcome}
    B -->|Accept| C[Choose/confirm one coordination route]
    C --> D[Accepted Ask in community Asks]
    B -->|Decline| E[Declined Ask]
    B -->|No response at 48h| F[Expired Ask]

    E --> G{Visible uncontacted < 3 and unseen qualified exists?}
    F --> G
    G -->|Yes| H[Prepare exactly one qualified replacement]
    H --> I[Notify: replacement is ready]
    I --> J[See your replacement]
    J --> K[Replacement joins Matches with New state]
    G -->|No| L[No replacement]

    F --> M[Expired Ask remains available for late response]
    M -->|Late accept| C
    M -->|Late decline| E
```

A late response does not remove a replacement already prepared/revealed.

## Accepted LinkedIn Flow

```mermaid
flowchart TD
    A[Accepted Ask · LinkedIn] --> B[Needs Attention]
    B --> C[Connect on LinkedIn]
    C --> D[Open LinkedIn in new tab]
    D --> E[Return to OAA]
    E --> F{Did you reach out?}
    F -->|Yes| G[Active · connected / waiting to coordinate]
    F -->|Not yet| B
```

## Accepted Calendly Flow

```mermaid
flowchart TD
    A[Accepted Ask · Calendly] --> B[Needs Attention]
    B --> C[Open inline Calendly]
    C --> D[Schedule externally in embedded provider]
    D --> E[Go back to Ask]
    E --> F[Scheduled UX state]
```

Calendly client scheduled events may also update the UX state. This is not server-verified booking infrastructure.

## Community Admin Membership Flow

```mermaid
flowchart TD
    A[Open Community Admin workspace] --> B{Admin task}

    B -->|Join Requests| C[Review applicant profile + optional note]
    C -->|Approve| D[Create ACTIVE membership + granted role]
    C -->|Decline| E[Declined request]

    B -->|Invite| F[Enter known email + role]
    F --> G[Send unique email-bound invite]

    B -->|Add Existing User| H[Exact-email lookup]
    H --> I[Confirm minimum identity + role]
    I --> D

    B -->|Members| J[Manage status / role]
    J --> K[Pause or remove]

    B -->|Mentor Pool| L[Review operational Mentor supply]

    B -->|Settings| M[Edit description / visibility]
```

Admin may review saved applicant context needed for admission but not private mentoring behavior.

## Community Creation Direction

The intended direction is user-facing Community Admin/community creation rather than permanent backend-only provisioning.

Conceptually:

```mermaid
flowchart TD
    A[User wants to create/manage a community] --> B[Provide organizational identity / email signal]
    B --> C[Backend-defined verification]
    C --> D[Create/administer community]
```

The exact verification and authority mechanism remains open. Do not invent a minimum Mentor-count gate.

## Prohibited Paths

- no silent cross-community Mentor recommendations
- no public auto-join community mode
- no participant-facing Mentee directory
- no global browseable people directory
- no institutional verification claim from self-selected affiliation alone
- no forced priority change to compensate for low supply
