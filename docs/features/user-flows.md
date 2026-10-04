# Community-Enabled User Flows

Last updated: 2026-10-04

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
- optional PDF prefill is shown as a pending branch only; manual completion remains the required fallback until backend, privacy, and agreement terms are approved

## Mentee Access And Ask Flow

```mermaid
flowchart TD
    A{Membership path} -->|Existing verified account| B[Community Admin adds Mentee membership<br/>by exact known email]
    A -->|New account| C[Community Admin sends unique,<br/>email-bound Mentee invitation]
    C --> D[Invitee opens link and creates/signs in]
    D --> E[Invitation proves ownership of invited email;<br/>no second OTP]
    B --> F[ACTIVE Mentee membership;<br/>profile incomplete]
    E --> F

    F --> G{Start profile}
    G -->|Upload a PDF| H[Upload self-provided PDF]
    H --> I[System prepares profile draft]
    I --> J[Review draft fields;<br/>edit each field with pencil icon]
    G -->|Fill manually| J
    J --> K[Complete required direction/background fields<br/>and manually select 1-3 ranked priorities]
    K --> L{Confirm profile}
    L -->|Missing required field| J
    L -->|Confirmed| M[Persist confirmed fields;<br/>delete raw PDF]
    M --> N[Home: Your profile is ready.<br/>Start finding Mentors when you are ready.]

    N --> O[Home dashboard:<br/>To Be Completed and To Do]
    O -->|View matches task| P[Choose an active community icon<br/>such as MMA or DGWA]
    P --> Q[Show only that community's<br/>up to 3 qualified Mentor cards]
    Q --> R[View Mentor card:<br/>Why OAA suggested this, offerings,<br/>non-offerings, and profile context]
    R --> S[Select matching offering and write<br/>required scoped opening Ask]
    S --> T[Submit Ask]
    T --> U[Ask history: Sent;<br/>do not show Mentor viewed status]

    U --> V{Mentor outcome}
    V -->|Accept| W[Home task and Ask page show exactly one<br/>snapshotted Calendly or LinkedIn route]
    W --> X[Coordinate outside OAA]
    X --> Y[Post-acceptance timing and feedback flow]
    V -->|Decline| Z[Home and Ask history show reason,<br/>optional message, and: Don't worry,<br/>we'll help you find another Mentor.]
    Z --> ZA{Select Find another Mentor?}
    ZA -->|Yes| ZB[Generate one qualified replacement<br/>for this declined slot only]
    ZB --> Q
    ZA -->|No| ZC[Keep declined Ask in combined history]
    V -->|No response by 48h| ZD[Release slot, generate replacement,<br/>and keep Ask in history as expired]
    ZD --> ZE{Mentor responds late?}
    ZE -->|Late accept| W
    ZE -->|Late decline| ZF[Show late decline in Ask history;<br/>replacement already exists]

    O -->|Update priorities| ZG[Edit one to three ranked priorities<br/>with pencil icons]
    ZG --> ZH[Select Update matches]
    ZH --> ZI{Confirm replacement of all<br/>uncontacted cards in active community?}
    ZI -->|Confirm| Q
    ZI -->|Cancel| O
```

**Mentee visibility boundary:** the community icon rail is not a member directory. A Mentee can access only their own Home, Profile, Ask history, and eligible Mentor cards; they cannot see, search, browse, or open another Mentee's profile.

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
