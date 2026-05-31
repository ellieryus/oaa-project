# One Ask Away (OAA)

Status: App runs on mock data across all routes; server logic is implemented. The data model is defined in prisma/schema.prisma (relationships being reviewed) — DB migration is the next phase. Frontend UI is mid-redesign (current screens show the flow, not the final visual).


> Scoped career conversations between McGill MMA students and alumni.

One Ask Away is a two-sided platform that connects McGill MMA students with alumni for short, intentional career conversations. Students get AI-drafted, scope-aware asks. Alumni define exactly what they will and won't help with — so every request that lands in their inbox is already on-topic.

---

## The Problem

- Students freeze writing cold outreach and get ghosted on LinkedIn
- Alumni receive vague, out-of-scope asks and stop responding
- There's no structured way to have a 15-minute career conversation that's useful for both sides

## The Solution

1. **Match** — Surface a small set of alumni whose career paths align with a student's goals
2. **Ask** — Generate a scoped, AI-drafted ask targeted at something the alumnus already said they help with
3. **Reflect** — Capture insights after the call and suggest a meaningful next step

---

## Tech Stack

| Layer             | Technology                             |
| ----------------- | -------------------------------------- |
| Framework         | Next.js 16 App Router + TypeScript     |
| Styling           | Tailwind CSS v4 + custom design tokens |
| UI Components     | shadcn/ui                              |
| Forms             | React Hook Form + Zod                  |
| Icons             | Lucide React                           |
| Data (MVP)        | In-memory mock data                    |
| Data (Production) | Prisma + PostgreSQL (Supabase)         |

---

## Getting Started

### Prerequisites

- Node.js v20+ recommended (v18.17 minimum)
- npm v9+

Check your versions:

```bash
node --version
npm --version
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ellieryus/oaa-project.git
cd oaa-project

# 2. Install dependencies
npm install

# 3. Create environment file
echo "NEXT_PUBLIC_BASE_URL=http://localhost:3000" > .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start dev server with hot reload |
| `npm run build` | Create a production build        |
| `npm run start` | Serve the production build       |
| `npm run lint`  | Run ESLint                       |

---

## Project Structure

```
src/
├── app/                  # Routing only — thin page.tsx shims
│   ├── (public)/         # Landing page
│   ├── (auth)/           # Sign-in, role selection
│   ├── (student)/        # Student-side routes
│   ├── (alumni)/         # Alumni-side routes
│   ├── (misc)/           # Settings, help, styleguide
│   └── api/              # Route handlers
│
├── components/
│   ├── ui/               # shadcn base components
│   ├── shared/           # Cross-domain primitives (Avatar, buttons, StatusPill...)
│   ├── layout/           # Navigation bars, headers
│   └── feedback/         # Empty states, loading skeletons
│
├── features/             # Domain-specific frontend modules
│   ├── auth/             # Landing, sign-in, role-select, settings
│   ├── student/          # Student home, profile, reflections
│   ├── alumni/           # Alumnus inbox, past students, post-call notes
│   ├── matching/         # Match cards, alumni detail, notifications
│   ├── requests/         # Ask composer, request detail, inbox rows
│   ├── calls/            # Calls page, call row, live banner
│   └── onboarding/       # Multi-step onboarding for both roles
│
├── server/
│   ├── actions/          # Server Actions (auth, requests, onboarding, reflection)
│   ├── modules/          # Domain modules: mock → repository → service
│   ├── validators/       # Shared backend validation logic
│   └── db/               # Prisma client singleton
│
├── lib/
│   ├── utils/            # cn(), isDismissed()
│   ├── constants/        # App-wide constants and config maps
│   └── config/           # Environment variable access
│
├── styles/
│   └── globals.css       # Tailwind v4 + OAA design tokens
│
└── types/
    └── global.ts         # Shared TypeScript types
```

---

## Design System

The OAA design system is intentionally minimal — mostly monochrome with one warm accent color.

| Token            | Value                         |
| ---------------- | ----------------------------- |
| `--oaa-clay`     | `#D17455` — primary accent    |
| `--oaa-bg`       | `#F8F7F2` — canvas background |
| `--oaa-ink`      | `#0E0E0E` — primary text      |
| `--oaa-muted`    | `#6B6B66` — secondary text    |
| `--oaa-hairline` | `#E8E6DF` — borders           |

Typography: **Switzer** (display + body) + **IBM Plex Mono** (labels, eyebrows)

---

## User Personas

**Students**

- Maya (MMA '26) — shy, gets ghosted on LinkedIn, freezes writing opening messages
- Kaylie (MMA '26) — new to Canada, pivoting marketing → data, wants alumni with similar stories

**Alumni**

- Adam (Director of Data, MMA '19) — drowning in generic LinkedIn asks, wants to signal scope clearly
- Annie (Marketing Data Scientist, MMA '21) — too busy to give back when asks are irrelevant

---

## Roadmap

- [x] Student onboarding (aspirations, background, help needs)
- [x] Alumni onboarding (background, offerings, non-offerings, availability)
- [x] Match surfacing and alumni profile view
- [x] Ask composer with AI draft support (UI complete)
- [x] Request management (accept, decline, complete)
- [x] Post-call reflections for both sides
- [ ] Real authentication (McGill email magic link)
- [ ] Prisma + Supabase database integration
- [ ] Live AI ask generation (Anthropic API)
- [ ] Email notifications (Resend)
- [ ] Calendar invite on acceptance (ics)

---

## Adding the Database

When ready to move beyond mock data:

```bash
npm install prisma @prisma/client
npx prisma generate
npx prisma migrate dev
```

The data model is defined in prisma/schema.prisma (relationships currently being reviewed.

---

## Environment Variables

| Variable               | Required   | Description                  |
| ---------------------- | ---------- | ---------------------------- |
| `NEXT_PUBLIC_BASE_URL` | Yes        | Base URL of the app          |
| `DATABASE_URL`         | Production | PostgreSQL connection string |
| `ANTHROPIC_API_KEY`    | Production | For AI ask generation        |
| `RESEND_API_KEY`       | Production | For email notifications      |
| `JWT_SECRET`           | Production | For session signing          |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'add: your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

Built for McGill MMA · 2026
