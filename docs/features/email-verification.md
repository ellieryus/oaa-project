# Email Verification And Community Access

Last updated: 2026-10-14

**Primary readers:** Backend, Frontend, Community Admin
**Priority:** Highest
**Read this when:** You are implementing signup, email ownership verification, organization selection, invitations, join requests, or community access.

## Purpose

This feature separates three concepts that must not be conflated:

1. **Email ownership verification** — proves control of an email address.
2. **Organization selection** — scopes normal community discovery.
3. **Community membership approval** — grants access to a specific community and role.

Selecting an organization does not itself prove institutional affiliation and does not grant community access.

## Email Ownership Verification

- any user may create an OAA account with a supported email address
- MMA affiliation and a McGill domain are not platform-wide requirements
- verification uses a six-digit numeric code sent to the entered email address
- code expiry is 10 minutes
- codes are single-use
- resending invalidates a prior active code
- one verification record permits up to five failed attempts
- one email may request up to three codes in a rolling 15-minute window
- verified email ownership moves the user into product onboarding, not into a community
- personal email must not become participant-facing profile data

## Organization Selection

After email verification, a free-entry user selects a university or organization from a searchable canonical list.

- the selected organization scopes `Discover Communities`
- selection does not create an `ACTIVE` membership
- selection must not be labeled `verified` or `confirmed` unless a real verification mechanism has run
- a user may enter a missing organization name for later handling without implying verification
- normal discovery shows only discoverable communities attached to the selected organization

Example:

```text
Verify email
-> choose McGill University
-> browse discoverable McGill communities
-> request MMA
-> MMA Admin approves or declines
```

There is no separate organization-level approval step required before normal discovery.

## Community Access Paths

### 1. Free-entry join request

Both Mentors and Mentees may request membership in a discoverable community.

```text
verified user
-> organization selected
-> role/profile context completed enough for review
-> open community preview
-> optional join note
-> request community access + intended role
-> Pending
-> Community Admin review
-> ACTIVE or DECLINED
```

A pending request grants no community access.

### 2. Existing-account add

A Community Admin may add a known existing verified account by exact email.

- this is not a browseable global directory
- lookup returns only minimum identity needed to confirm the intended account
- unrelated memberships and private data must not be revealed
- Admin selects the community role or roles
- membership becomes `ACTIVE`
- required role-profile completion/review may still block matching eligibility
- explicit Admin add may cross the user's selected organization boundary

### 3. Email-bound invitation

A Community Admin may invite a known Mentor or Mentee through a unique email-bound invitation.

- invitation binds normalized email, community, role, expiry, and revocation state
- invitee creates/signs in if needed
- accepting the bound link proves ownership of the invited address; do not send a second OTP for that same address
- invitee completes/reviews required role profile
- membership becomes `ACTIVE`
- forwarded invitation cannot activate a different email address
- Admin may revoke an unaccepted invitation
- explicit Admin invitation may cross organization boundaries
- one invitation grants only the named community and granted role(s)

## Community Discovery

After account setup, global Home may show:

- `Your Communities`
- `Pending Requests`
- `Discover Communities`

Discovery is organization-scoped.

Community preview may show:

- name
- organization
- description
- eligibility / who it is for
- organizer

Preview must not expose Mentor identities, member counts, internal activity, or Mentor inventory.

## Frontend Requirements

- provide a role-neutral account and email-verification flow
- after verification, distinguish `organization selected` from `community approved`
- do not label a self-selected affiliation as institutionally verified
- support free-entry Mentor and Mentee join requests
- show pending membership requests on Home
- show active communities separately from discoverable communities
- show invited community context clearly when a user enters through an invite
- block community Matches, Asks, Mentor inbox, and Admin operations until the relevant membership/role is active
- do not expose unrelated communities after cross-organization invite/add; normal discovery remains tied to selected organization

## Backend Requirements

- normalize email before lookup, rate limiting, and invitation matching
- store verified email identities separately from `User`
- model organization/discovery context separately from community membership
- support explicit membership source such as `JOIN_REQUEST`, `ADMIN_ADD`, or `DIRECT_INVITE`
- support pending join-request state separately from active membership, either as a dedicated entity or equivalent state model
- enforce unique email-bound invite acceptance
- authorize all community operations by `communityId`, active membership, and role
- exact-email Admin lookup must not become cross-community browse/search
- generate verification codes securely and store only hashes
- audit verification, join-request, invitation, member-add, approval/decline, removal, and role-change events

## Privacy And Trust

- email ownership is not equivalent to organization verification
- organization selection is not equivalent to community approval
- Community Admin may inspect documented applicant profile context for join review but not private mentoring behavior
- stored personal email must not be exposed to other participants
- after an invite is sent, Admin UI should show invitation status rather than repeatedly displaying the stored email
- no institutional verification claim may be shown unless OAA actually performs that verification

## Admin Creator Verification

A user-facing Community Admin/community-creation path is an intended product direction.

The exact identity/affiliation verification mechanism for a community creator is not defined here. Questions about organizational email, affiliation, authority, and duplicate/official community handling remain open with Backend/Product.

## Open Decisions

- final privacy notice and retention/deletion periods
- invitation expiry and reissue policy
- Community Admin removal/appeal/ownership-transfer policy
- Admin creator identity/affiliation/authority verification mechanism
- join-request decline reason visibility
