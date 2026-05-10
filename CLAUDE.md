# One Ask Away (OAA)

## Product
Two-sided platform connecting McGill MMA students with alumni for scoped, short career conversations. Students get past cold-outreach paralysis with AI-drafted, scope-aware asks. Alumni stay in control by declaring offerings and non-offerings before requests land in their inbox.

Core differentiator: niche-program-specific, conversion-oriented, built around alumni pain points around cold asks.

## Personas
**Student side**
- Maya (22-24, MMA student): shy, gets ghosted on LinkedIn, freezes at opening message
- Kaylie (25-27, MMA student): new to Canada, pivoting marketing -> data science, wants alumni with similar pivot stories

**Alumni side**
- Adam (30-32, Director of Data, Alumni Ambassador): drowning in generic LinkedIn asks, struggles to signal scope
- Annie (27-29, Marketing Data Scientist): too busy to give back, gets annoyed by out-of-scope asks

## Tech stack
- Next.js 16 App Router + TypeScript + Tailwind CSS
- shadcn/ui for base components
- Prisma + Postgres (Supabase) for data layer
- Anthropic API for AI features
- Resend for email
- ics package for calendar invites

## Design system

### Colors (mostly mono, one warm accent)
--bg-canvas: #FAFAF7
--bg-surface: #FFFFFF
--bg-inverse: #0E0E0C
--border-hairline: #ECECE8
--text-primary: #0E0E0C
--text-secondary: #6E6E6E
--text-tertiary: #A8A6A0
--accent-primary: #D17455
--accent-on-dark: #E89876
--status-success: #4F6B4A
--status-warning: #C68A2E
--status-danger: #A14A35

### Typography
Single condensed sans-serif (Switzer or General Sans from Fontshare). Weight + scale do all the work.

Scale:
- display-xl: 96px / 600 / -2% (landing hero only)
- display-l: 64px / 600 / -1.5% (section openers)
- display-m: 44px / 600 / -1% (page titles)
- heading-l: 28px / 600 / -0.5%
- heading-m: 20px / 600 / 0
- heading-s: 16px / 600 / 0
- body-l: 18px / 400 / 0
- body-m: 15px / 400 / 0
- body-s: 13px / 400 / +1%
- eyebrow: 12px / 500 / +8% / UPPERCASE

Line height: 1.05 display, 1.2 headings, 1.55 body.

### Spacing (8pt grid)
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 160
Section vertical rhythm: 96-128px between blocks. Card padding 24-32. Hero padding 128-160 vertical.

### Radius (sharp)
--radius-xs: 2px (chips/tags)
--radius-s: 4px (inputs/buttons)
--radius-m: 6px (cards)
--radius-l: 12px (modals)
--radius-pill: 999px (status chips only)

### Elevation
Almost none. Borders + bg contrast carry the weight. Shadows are warm-tinted, used sparingly on modals only.

### Iconography
Lucide icons, default (not rounded). 1.5px stroke, 20-24px.

### Motion
--ease-default: cubic-bezier(0.2, 0.8, 0.2, 1)
--ease-emphasis: cubic-bezier(0.16, 1, 0.3, 1)
--duration-quick: 150ms
--duration-base: 240ms
--duration-emphatic: 480ms

## Conventions (must follow on every component)
- Chips: neutral white container + hairline border. Color only in 6px dot for status, or icon for offerings. Never tinted fill.
- Cards: white bg + hairline border, never tinted fills.
- Green is signal, never fill.
- No exclamation marks in copy, ever.
- Sentence case everywhere except eyebrow labels (UPPERCASE).
- Decline framing as redirect, never rejection.
- All buttons sharp (4px radius), no rounded corners.
- All shadows warm-tinted, not pure black rgba.

## Data model (11 entities)
1. User: id, email, password_hash, school, status, roles[]
2. StudentProfile: bio, program, year, target_city, experience_level
3. AlumnusProfile: bio, current_city/role/company, ex_companies[], industries[], cohort, linkedin_url
4. Aspiration / HelpArea / Industry: ranked join tables off StudentProfile
5. OfferingItem: alumnus_id, type enum, kind flag (offer | non_offer)
6. AvailabilitySlot: alumnus_id, day_of_week, start, end, timezone, recurrence
7. Match: student_id, alumnus_id, score, reasons[], generated_at, viewed_at, expired_at (persisted, not live)
8. Request: student_id, alumnus_id, opening_message, topic_id (FK to OfferingItem, must be kind=offer), question, format, proposed_times[], chosen_time, status, decline_reason, decline_note, scope_match_score, ai_regenerations_used
9. Call: request_id (1:1), confirmed_time, meeting_link, ics_sent_at, status
10. StudentReflection: call_id, helpful_rating, insights, ai_next_step, edited_next_step, recontact_window
11. AlumnusNote: call_id, private_notes, strength_tags[], future_role_tags[]

Plus FollowUpRequest (chains Request -> Request), Notification, Report.

## Build order (vertical slices)
1. Foundation: design tokens, component library (Button, Chip, Card, Input)
2. Auth + student onboarding
3. Matching + ask flow (the heart of the product)
4. Alumnus track (offerings/non-offerings, inbox)
5. Call + reflection + Contact Again

## Out of scope for MVP
- LinkedIn integration
- Calendar sync (Google/Outlook) - we send .ics only
- Mobile app
- Aggregate program admin dashboard
- Donation features

## When in doubt
- Match the design reference, don't redesign
- Sentence case copy, no exclamation marks
- Neutral containers, color in dots/icons only
- Build the simplest working version first, AI features last

## OAA Design System

This is the canonical spec for tokens, typography, components, and motion. Every screen build references this section and the design PDF. Where this section conflicts with the older "Design system" section above, this section wins.

### Brand tokens
Defined as CSS variables in `app/globals.css`:

- `--oaa-clay: #D17455` — primary action, ranking badges, active states, links
- `--oaa-bg: #F8F7F2` — page background, off-white
- `--oaa-ink: #0E0E0E` — primary text, primary buttons
- `--oaa-muted: #6B6B66` — secondary text, metadata
- `--oaa-hairline: #E8E6DF` — dividers, card borders
- `--oaa-clay-tint-bg: color-mix(in srgb, #D17455 12%, transparent)`
- `--oaa-clay-tint-border: color-mix(in srgb, #D17455 40%, transparent)`
- `--oaa-avatar-alumnus-bg: #ECEAE2` — soft warm grey for alumnus avatars in cards/rows/hero; sits between page bg (#F8F7F2) and hairline (#E8E6DF)

### Typography
- Sans: Switzer (loaded via Fontshare CDN `<link>` in `app/layout.tsx`)
- Mono: IBM Plex Mono (loaded via `next/font/google`)

Scale (size / line-height / tracking):
- Display XL: 72 / 1.05 / -0.02em — landing hero
- Display L: 56 / 1.1 / -0.02em — page headings
- Display M: 40 / 1.15 / -0.01em — section titles
- Body L: 18 / 1.5 — hero subtitles, intro
- Body M: 15 / 1.5 — default body
- Body S: 13 / 1.45 — metadata, helper
- Mono caps: 11 / 1.4 / 0.08em uppercase — section labels

### Spacing + layout
- Page max-width: 1200px
- Form max-width: 720px
- Vertical rhythm: 96px between major sections, 32px between subsections, 16px within
- Generous editorial whitespace, hairline dividers, no shadows

### Component patterns
- Section labels: mono caps, muted ink, format `01 · ASPIRATIONS`
- Page header pattern: section label → display heading → body L description, 24px gaps between
- Selectable cards: white bg default; clay-tint bg + clay-tint border when selected; optional numbered clay badge for ranked
- Status pills: small rounded, light bg, colored dot prefix
- **Surface treatments — three distinct tiers:**
  - `ClayHighlightCard` (`components/oaa/ClayHighlightCard.tsx`): white bg + 1px full clay border (`--oaa-clay`). Signals "highlighted / imminent / active-accent" for standalone card containers. Current usages: `LiveCallBanner`, `UpcomingCallCard` isImminent branch. Rule: use this when a whole card needs to stand out as urgent or time-sensitive. NOT for selection-within-group (that's peach-tint). NOT for primary CTAs (that's filled ink).
  - Peach-tint surface (`bg-oaa-clay-tint-bg border-oaa-clay-tint-border`): selection state inside a group (radio rows, selectable onboarding cards, offering cards), or a soft callout/info block (alumni note, "Worth considering"). Never for standalone alert cards.
  - Regular card (`bg-white border-oaa-hairline`): default neutral surface for all non-highlighted cards.
- Avatars: circle, mono initials; 3 variants, role-based:
  - `variant="student"` — every student avatar everywhere. Peach: `--oaa-clay-tint-bg` + clay text.
  - `variant="alumnus"` — every alumnus avatar in cards, rows, listings, hero. Warm grey: `--oaa-avatar-alumnus-bg` + ink text.
  - `variant="alumnus-self"` — ONLY the alumnus's own avatar in their top-right nav and profile body. Pitch black: `--oaa-ink` + white.
  - No default — every call site must specify the variant explicitly.
  - Mental model: students always warm/peach. Alumni always muted/grey. Pitch black is the single signal an alumnus uses to recognize "this is me."
- Primary CTA: ink bg, white text, optional arrow suffix
- Secondary CTA: white bg, hairline border, ink text
- Empty states: sentence-cased, end in period, no exclamations

### Copy rules — heading punctuation (4-state rule)
1. **Period (.)** — declarative display headings that read as a complete statement: "Sent.", "Hi Maya.", "Help.", "Thanks — we got it.", "Three alumni match your goals this week."
2. **Ellipsis (U+2026, single character `…`, NOT three dots)** — loading/progress headings only: "Finding your alumni matches…"
3. **No punctuation** — page-title nav labels and section headings that read as labels: "Inbox", "Calls", "Settings", "Past contacts", "Notifications"
4. **Question mark (?)** — valid when the section heading is a genuine question to the user: "How likely are you to reach back out to Adam?", "Hiring signal?" Used in onboarding, reflection, and intake contexts. Never in page titles or nav labels.

### Radio selection patterns — two distinct semantics
- **Preferred-choice-within-equals** (AcceptModal time slots, DeclineModal reason, /reflect follow-up intent, /post-call-notes hiring signal): selected = `border-oaa-clay-tint-border bg-oaa-clay-tint-bg`. Signals "you are choosing your preference within a set of valid options."
- **Form-input category** (ReportModal reason): selected = `border-2 border-oaa-ink`, no bg fill. Signals "you are classifying/reporting, not expressing preference."

### Reflection page pattern (`/reflect/[requestId]`)
Client page (`"use client"`) replacing the former `ReflectionModal`. Architecture:
- Chrome: thin screen status strip above `BackHeader` → `max-w-[720px]` main → `pb-24` for sticky bar clearance
- Screen status strip: `border-b border-oaa-hairline bg-white` full-width bar with mono-caps screen number left + breadcrumb path right
- Three sections separated by `mt-10` (no `<hr>` dividers): (1) free-text textarea "What stood out" (hairline border = user-authored), (2) full-width clay-tint radio buttons, (3) optional private notes textarea
- AI next step: peach-tint card with editable textarea (`border-oaa-clay-tint-border` = AI content signal) + "AI drafted" badge + RotateCw "Regenerate · N of 2 left" button. 3 hardcoded variants cycle on click.
- Sticky save bar: `fixed bottom-0 left-0 right-0 z-10 border-t border-oaa-hairline bg-white px-8 py-4`, save button disabled until radio section has a selection
- On save: writes to store → `router.push('/home')` (student) or `router.push('/past-students')` (alumnus)

`ReflectionModal` and `ChipPicker` have been permanently deleted. Do not re-create them.

### Forced reflection modal pattern
Mount-triggered `Dialog` (no `DialogTrigger`) on `/home` (student) and `/inbox` (alumnus). Detection: first request where `status === "accepted"` and no matching store entry exists. Delay: 500ms `setTimeout` in `useEffect` to avoid jarring pop-on-mount. Dismissal: module-level `Set<string>` in `lib/modal-dismissed.ts`, keyed `reflect-student-{id}` or `reflect-alumnus-{id}`, resets on page reload (intentional for demo).

If multiple unreflected calls exist, they are surfaced sequentially across reloads. Acceptable for demo; v1.1 should consider a queue or "next call" indicator.

Controlled dialog pattern (no `DialogTrigger`):
```tsx
<Dialog open={showModal} onOpenChange={(open) => { if (!open) handleDismiss(); }}>
  <DialogContent ...>...</DialogContent>
</Dialog>
```

### Design intent — context-based link emphasis
`/home` match preview cards use `text-oaa-clay` on "View profile" links (high-density preview context — clay aids scanability across 3 side-by-side cards). `/matches` MatchCard uses `text-oaa-ink` with muted ArrowRight (full-discovery weight — ink signals authority for the primary page where matching happens). This is intentional, not drift.

### Motion
- Default: 150ms ease-out
- Modals: fade + 8px translate-up, 200ms
- Selection: instant, no transition
- Drag-to-reorder: dnd-kit defaults

### Shadcn usage policy
Use shadcn ONLY for these primitives (logic-heavy, accessibility-critical):
Dialog, Sheet, Popover, RadioGroup, Checkbox, Switch, Input, Textarea, Label, Form, Toast (sonner), Command.

When installing shadcn components, immediately restyle them to OAA tokens in `globals.css` by mapping shadcn's CSS variables to OAA tokens (background → `--oaa-bg`, foreground → `--oaa-ink`, primary → `--oaa-ink`, accent → `--oaa-clay`, border → `--oaa-hairline`). Remove default shadows; use border-hairline.

DO NOT use shadcn for: Card, Button, Badge, Avatar, Separator. These have custom OAA patterns built in `components/oaa/` instead.

### Rules for every screen build (after this session)
1. Re-read `AGENTS.md` and `CLAUDE.md` before starting.
2. Reference the specific PDF page for the screen being built.
3. Reuse atoms from `components/oaa/`, never inline a pattern that exists.
4. Match PDF spacing exactly, don't approximate.
5. Use Tailwind theme tokens via `@theme`, never arbitrary color values.
6. Never use em dashes in copy or comments.

## Branding Rules

The product name shown to users is always the full phrase **"One Ask Away"**. The shorthand "OAA" is internal-only.

1. **User-facing UI copy uses "One Ask Away" (full name), never "OAA"**. This applies to all rendered text users can see: nav wordmarks, headlines, body copy, button labels, empty states, error messages, email templates, page titles, meta descriptions, and any other copy on screen.
2. **"OAA" is allowed only in technical/internal contexts**: file names (`components/oaa/`), folder names, code identifiers and comments, CSS variable prefixes (`--oaa-clay`, `--oaa-bg`, etc.), Tailwind utility names (`text-oaa-clay`, `bg-oaa-bg`, etc.), and references inside this `CLAUDE.md`. The `/styleguide` route is also internal/dev-facing and may use "OAA" freely as a token catalog label.
3. **Future screens must follow this**. If a design reference in `oaa-screens.pdf` shows "OAA" inside user-visible copy, replace it with "One Ask Away" when implementing. The PDF naming itself is internal and unaffected.

## Brand Assets

**Primary logo (in-app):**
- `/public/logo.svg` — wide frameless 3-circle mark. Use at ≥80px (landing hero, footer, marketing).
- `/public/logo-mark.svg` — framed 3-circle mark matching favicon. Use at 24-40px (in-app nav headers).
- `/public/logo.png` — raster fallback. Use only in email templates.

**Favicon set (browser/device):**
- `/app/icon.svg` — modern browsers, auto-injected by Next.js. Rounded-square frame containing the 3-circle mark, off-white fill, clay accent.
- `/app/apple-icon.png` — iOS home screen, auto-injected by Next.js (180×180)
- `/app/favicon.ico` — legacy browser fallback, auto-detected by Next.js (16×16 + 32×32)

The favicon is intentionally framed (unlike the in-app logo) — the rounded-square container prevents iOS/Android adaptive-icon cropping and gives the mark proper visual containment at small sizes where the 3 circles alone would read as noise. Frame style: `--bg-canvas` (#FAFAF7) fill + `--border-hairline` (#ECECE8) 1px stroke + ~20% corner radius. The in-app logo at `/public/logo.svg` stays frameless because the in-app header already provides its own background.

**Header pattern app-wide:**
Render `/public/logo-mark.svg` at 28px height + 8px gap + wordmark "One Ask Away" in Switzer 600 at heading-s size (16px / 600 / 0).

**Color rule:**
Logo only ever rendered in `--accent-primary` (#D17455) on light backgrounds, `--accent-on-dark` (#E89876) on inverse backgrounds. Never recolor outside these two values.
