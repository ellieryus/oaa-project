# For Rachelle And Backend

Last updated: 2026-10-04

**Purpose:** Decisions requiring PM and backend alignment before implementation.

## LinkedIn PDF / Resume Profile Prefill

### Proposed User Flow

1. A Mentor or Mentee may optionally upload their self-exported LinkedIn profile PDF or a resume PDF during profile creation.
2. OAA extracts a draft of permitted profile fields.
3. The user reviews, edits, and confirms the draft before any field is used in their profile or matching.
4. Mentor offerings, non-offerings, current Mentee priorities, and `acceptingRequests` remain explicit user choices; they are not inferred from the PDF.

OAA must not scrape a LinkedIn URL. The user uploads a file they choose to provide.

### Decision Needed: Retain Or Delete The Raw PDF?

**Option A: Retain raw PDF**

- Pros: re-parse later, debug extraction failures, and support future schema fields without asking the user to upload again.
- Cons: stores more sensitive personal data, increases access-control/security burden, and requires stronger deletion/retention handling.

**Option B: Auto-delete raw PDF after extraction or confirmation**

- Pros: OAA retains only user-confirmed fields, lowers sensitive-data exposure, and is simpler for MVP privacy operations.
- Cons: user must upload again to re-parse; backend has less source material for debugging or later extraction improvements.

**Current PM recommendation:** keep the file only for temporary processing; auto-delete it when the user confirms their profile, or at most 24 hours after upload if onboarding is abandoned. Persist only confirmed profile fields.

### Backend Questions

1. Can the upload pipeline extract text from normal LinkedIn/resume PDFs reliably enough without retaining the original file?
2. What storage, encryption, file-size/type limit, malware scanning, and deletion job are required for temporary uploads?
3. Does the extraction provider retain prompts/files or use them for model training? Can we disable this contractually and technically?
4. Which fields can be extracted deterministically, and which require AI extraction plus user confirmation?
5. How should failed parsing be handled: retry, show partial draft, or fall back to manual entry?
6. What audit metadata is necessary without retaining the raw file: upload time, delete time, parser version, extraction success/failure?

### Product And Privacy Items To Discuss

- final agreement/notice copy before upload: purpose is profile prefill only; user must review before publish; raw-file deletion timing; no training or matching inference from raw PDF
- whether a user can re-upload later to overwrite a draft or confirmed profile
- approved retention period for incomplete onboarding uploads
- whether PDF upload ships in MVP or as a beta follow-up after the basic manual flow works
