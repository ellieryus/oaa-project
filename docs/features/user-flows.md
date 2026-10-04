# Community-Enabled User Flows

Last updated: 2026-10-03

**Primary readers:** PM, Product Designer, Frontend, Backend
**Priority:** Highest
**Read this when:** You are designing routes, onboarding, membership review, Mentor/Mentee matching, or admin authorization.

## Current Flow Review

The documented email-verification flow reflects the Community model. The current application UI does not yet:

- routes and components still use exclusive Student/Alumnus terminology
- route groups do not carry a community context
- role selection treats Student and Alumnus as mutually exclusive
- there is no Community Admin member-add flow, email-bound invitation flow, or Community Admin flow
- current availability-slot and native call screens conflict with the accepted-Ask coordination boundary

The flows below are the target MVP behavior. They supersede old UI flow assumptions, not existing production code.

## Shared Entry Rules

- every user verifies ownership of their email before community access
- community access is granted only through a Community Admin adding an existing verified account or sending a unique email-bound invitation
- an email-bound invitation is unique and bound to one normalized email; accepting it proves ownership of that email and does not require a second OTP
- a user may hold Mentor and Mentee roles; do not force one exclusive role selection at account level
- current community is explicit in every authenticated community flow
- optional LinkedIn/resume PDF prefill is shown as a pending branch only; manual completion remains the required fallback until backend, privacy, and agreement terms are approved

## Mentee Access And Ask Flow

```mermaid
flowchart TD
    A{Membership path} -->|Existing account| B[Community Admin finds account by exact known email]
    B --> C[Community Admin grants Mentee role]
    C --> D[ACTIVE Mentee membership;<br/>profile incomplete]
    D --> DP{Use optional PDF prefill?<br/>Pending backend/privacy decision}
    H --> DP
    DP -->|LinkedIn PDF or resume PDF| DU[Upload self-provided PDF]
    DU --> DE[Extract profile draft]
    DE --> DI[Prefill existing profile or complete it]
    DP -->|Manual| DI
    DI --> DJ[Review and confirm Mentee profile]
    A -->|New account| E[Community Admin sends email-bound Mentee invitation]
    E --> F[Invitee opens link and creates/signs in]
    F --> G[Link proves invited-email ownership;<br/>no second OTP]
    G --> H[Begin Mentee profile:<br/>aspiration, background, 1-3 current priorities]

    DJ --> K[Select current community and<br/>start finding Mentors]
    K --> M[See up to 3 qualified Mentor matches]
    M --> N[Open Mentor profile:<br/>reason, offerings, non-offerings]
    N --> O[Compose scoped Ask]
    O --> P[Submit Ask]
    P --> Q[Show Sent and 48-hour deadline;<br/>never show view status]
    Q --> R{Mentor response within 48 hours}
    R -->|Accept| S[Show one snapshotted<br/>Calendly or LinkedIn route]
    R -->|Decline| T[Show decline reason and optional message]
    R -->|No response| U[Release slot and show replacement;<br/>Ask stays in history]
    U --> V[Late Mentor accept/decline appears in Ask history]
    V -->|Late accept| S
    V -->|Late decline| T
    S --> W[Private self-reported conversation follow-up]

    M --> UP[Edit current priorities]
    UP --> UC[Update matches warning:<br/>replace all uncontacted cards?]
    UC -->|Confirm| M
    UC -->|Cancel| M
```

## Mentor Join And Accept Flow

```mermaid
flowchart TD
    A{Membership path} -->|Existing account| B[Community Admin finds account by exact known email]
    B --> C[Community Admin grants Mentor role]
    C --> H[ACTIVE Mentor membership;<br/>profile incomplete]
    H --> HP{Use optional PDF prefill?<br/>Pending backend/privacy decision}
    G --> HP
    HP -->|LinkedIn PDF or resume PDF| HU[Upload self-provided PDF]
    HU --> HE[Extract profile draft]
    HE --> HI[Prefill existing profile or complete it]
    HP -->|Manual| HI
    HI --> HJ[Review and confirm Mentor profile]
    A -->|New account| D[Community Admin sends unique email-bound Mentor invite]
    D --> E[Create/sign in with invited email]
    E --> F[Email-bound link proves ownership;<br/>no second OTP]
    F --> G[Begin Mentor profile:<br/>background, offerings, non-offerings]

    HJ --> O[Set accepting requests on or off]
    O --> P[Receive scoped Ask in Mentor inbox]
    P --> Q[Review Mentee summary, priorities,<br/>topic, and opening Ask]
    Q -->|Still pending after 24h| QR[Send one reminder email]
    QR --> Q
    Q -->|No response by 48h| QE[Move Ask to Expired Asks;<br/>release Mentee match slot]
    QE --> QL{Review expired Ask later?}
    QL -->|Late accept| T
    QL -->|Late decline| S
    QL -->|No| QX[Keep in Expired Asks history]
    Q --> R{Accept or decline?}
    R -->|Decline| S[Choose structured reason;<br/>optional Mentee-visible message]
    R -->|Accept| T{Saved default route?}
    T -->|LinkedIn| U[Snapshot LinkedIn route]
    T -->|Calendly| V[Review Calendly availability;<br/>confirm it is current]
    V --> W[Snapshot Calendly route]
    T -->|No default| X[Choose and validate Calendly or LinkedIn]
    X --> Y[Optionally save as future default]
    Y --> Z[Snapshot selected route]
    U --> AA[Commit acceptance and notify Mentee]
    W --> AA
    Z --> AA
```

## After Acceptance And Conversation Flow

```mermaid
flowchart TD
    A[Accepted Ask] --> B[Show Mentee exactly one snapshotted route]
    B -->|Calendly| C[Open embedded booking page<br/>with new-tab fallback]
    B -->|LinkedIn| D[Open Mentor LinkedIn profile in new tab]
    C --> E[Both coordinate outside OAA]
    D --> E

    A --> F[One day after acceptance:<br/>private Mentee timing prompt]
    F --> G{When did or will it happen?}
    G -->|It already happened| H[Send optional private pulse to both]
    G -->|It is scheduled| I[Collect expected date only]
    I --> J[One day after expected date:<br/>send optional private pulse to both]
    G -->|Not scheduled yet| K[Optional reason:<br/>no response, conflict, no longer meeting,<br/>Other, or prefer not to say]
    K --> L[One private Mentee follow-up after 3 days]
    L --> M{Updated status?}
    M -->|Happened| H
    M -->|Scheduled| I
    M -->|Still not scheduled / no response| N[No further scheduling reminders]

    H --> O[Mentee may submit reflection]
    J --> O
    O --> P[Mentor may add private note]
    O --> Q[Mentee may send one Thank You<br/>or Coffee Bag]
    Q --> R[Only the participating Mentor sees appreciation]
```

`Accepted` never expires because a booking signal is absent. OAA does not track Calendly booking, cancellation, rescheduling, call attendance, or no-shows in MVP; all timing and pulse signals above are private self-report.

## Community Admin Flow

```mermaid
flowchart TD
    A[Community Admin signs in] --> B[Select assigned Community]
    B --> C{Admin task}

    C -->|Add existing member| D[Enter exact known email]
    D --> E[Confirm minimum identity;<br/>never show other-community data]
    E --> F[Grant Mentor and/or Mentee role]
    F --> G[Create ACTIVE membership and audit]

    C -->|Invite new member| H[Enter invitee email and granted role]
    H --> I[Create unique email-bound invitation]
    I --> J[Show invitation status only after submit]

    C -->|Manage member directory| K[View name, role, status,<br/>offerings, non-offerings]
    K --> L{Pause or remove membership?}
    L -->|Yes| M[Choose reason and confirm]
    M --> N[Apply change and audit it]
    L -->|No| B
```

## Prohibited Admin Paths

Community Admin must never have a route or API response that reveals:

- stored personal email or email-verification data
- private Mentee/Mentor pulse answers, reflection, Mentor notes, or appreciation notes
- self-reported scheduling status, expected date, or coordination route
- members or private data from another community
- Community metrics in MVP

## Deferred Flow

Cross-community Mentor discovery is deliberately not shown here. It needs a separate product decision on opt-in, scouting-card fields, invitation semantics, and privacy before becoming a user flow.

Platform-admin UI, self-service community creation, and Community Admin assignment are also post-MVP. For the beta, the backend team performs those bootstrap actions from an OAA-approved instruction and records an audit event.
