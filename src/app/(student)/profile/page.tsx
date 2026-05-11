import Link from "next/link";
import { ExternalLink, Pencil } from "lucide-react";

import { Avatar } from "@/components/oaa/Avatar";

import { DisplayHeading } from "@/components/oaa/DisplayHeading";
import { Header } from "@/components/oaa/Header";
import { GhostButton, PrimaryLink } from "@/components/oaa/buttons";
import { Switch } from "@/components/ui/switch";
import { STUDENT } from "@/lib/mock-student";

const ASPIRATIONS = [
  { rank: 1, label: "Data Analyst", primary: true },
  { rank: 2, label: "Product Analyst / Tech PM", primary: false },
  { rank: 3, label: "Data Scientist", primary: false },
];

const HELP_NEEDS = [
  { rank: 1, label: "Portfolio review", primary: true },
  { rank: 2, label: "Resume review", primary: false },
  { rank: 3, label: "Behavioral interview", primary: false },
];

const INDUSTRIES = ["Tech", "Finance"];
const SKILLS = ["SQL", "Python", "Tableau", "Excel"];

export default function ProfilePage() {
  return (
    <>
      <Header rightContent={<ProfileNav />} />

      <main className="mx-auto max-w-[1200px] px-8 pb-32">
        {/* Hero */}
        <section className="flex flex-col gap-8 pt-16 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-6">
            <Avatar variant="student" name="Maya Chen" className="h-20 w-20 shrink-0 text-2xl" />
            <div className="flex flex-col gap-3 pt-1">
              <span className="text-xs text-muted-foreground">
                Student · MMA &rsquo;26
              </span>
              <DisplayHeading variant="m" as="h1">
                Maya Chen
              </DisplayHeading>
              <p className="text-sm leading-normal text-muted-foreground">
                Aiming for Toronto · Some experience · Updated Apr 24
              </p>
            </div>
          </div>
          <div className="md:pt-2">
            <NeutralStatusPill dot="var(--oaa-status-accepted-dot)">
              Live in matching
            </NeutralStatusPill>
          </div>
        </section>

        {/* Cards */}
        <div className="mt-12 flex flex-col gap-6">
          <ProfileCard
            heading="What I’m aiming for"
            updated="Last updated Apr 24"
          >
            <RankedList items={ASPIRATIONS} />
            <Divider />
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.map((i) => (
                <NeutralChip key={i}>{i}</NeutralChip>
              ))}
            </div>
          </ProfileCard>

          <ProfileCard
            heading="Where I’ve been"
            updated="Last updated Apr 12"
          >
            <ProfileEntry
              left="McGill University"
              middle="Master of Management in Analytics"
              right="2025-2026"
            />
            <ProfileEntry
              left="Lululemon"
              middle="Marketing analyst intern"
              right="2024-2025"
            />
            {STUDENT.portfolioUrl && (
              <a
                href={STUDENT.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                Portfolio
              </a>
            )}
            <Divider />
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <NeutralChip key={s}>{s}</NeutralChip>
              ))}
            </div>
          </ProfileCard>

          <ProfileCard
            heading="What I’m asking for"
            updated="Last updated Apr 24"
          >
            <RankedList items={HELP_NEEDS} />
            <Divider />
            <blockquote className="text-sm leading-normal italic text-foreground">
              &ldquo;I&rsquo;m pivoting from marketing to data science and want
              feedback on my SQL portfolio.&rdquo;
            </blockquote>
          </ProfileCard>
        </div>

        {/* Matches CTA */}
        <section className="mt-6 rounded-md border border-border bg-card px-8 py-6">
          <h2 className="mb-1 text-xl font-semibold text-foreground">
            Three alumni match your goals this week.
          </h2>
          <p className="mb-5 text-sm text-muted-foreground">
            We picked them based on your top aspiration and what you need help with.
          </p>
          <PrimaryLink href="/matches/loading" trailingArrow>
            Find my alumni matches
          </PrimaryLink>
        </section>

        {/* Pause toggle */}
        <section className="mt-6 flex items-start justify-between gap-6 rounded-md border border-border bg-card p-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm leading-normal font-semibold text-foreground">
              Pause my profile from matching
            </h3>
            <p className="text-sm leading-normal text-muted-foreground">
              Existing requests stay active. We just stop suggesting you new
              matches.
            </p>
          </div>
          <Switch />
        </section>
      </main>
    </>
  );
}

function ProfileNav() {
  return (
    <nav className="flex items-center gap-2">
      <Link
        href="/inbox"
        className="px-4 py-2 text-sm text-foreground hover:bg-foreground/5 rounded-md"
      >
        Inbox
      </Link>
      <Link
        href="/profile"
        className="px-4 py-2 text-sm text-foreground underline underline-offset-2 rounded-md"
      >
        Profile
      </Link>
    </nav>
  );
}

function ProfileCard({
  heading,
  updated,
  children,
}: {
  heading: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-md border border-border bg-card p-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl leading-[1.2] font-semibold text-foreground">
            {heading}
          </h2>
        </div>
        <GhostButton type="button" className="px-3 py-2 text-sm">
          <Pencil className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          Edit
        </GhostButton>
      </header>
      <div className="mt-6 flex flex-col gap-4">{children}</div>
      <p className="mt-6 text-sm leading-normal text-muted-foreground">
        {updated}
      </p>
    </article>
  );
}

function RankedList({
  items,
}: {
  items: { rank: number; label: string; primary: boolean }[];
}) {
  return (
    <ol className="flex flex-col gap-2">
      {items.map((it) => (
        <li key={it.rank} className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white text-xs tracking-[0.04em]">
              {it.rank}
            </span>
            <span className="text-sm leading-normal text-foreground">
              {it.label}
            </span>
          </span>
          {it.primary && (
            <span className="rounded-full border border-brand-500 bg-card px-2 py-0.5 text-xs text-brand-500">
              Primary
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function ProfileEntry({
  left,
  middle,
  right,
}: {
  left: string;
  middle: string;
  right: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[1fr_2fr_auto] sm:items-baseline sm:gap-6">
      <span className="text-sm leading-normal font-medium text-foreground">
        {left}
      </span>
      <span className="text-sm leading-normal text-foreground">{middle}</span>
      <span className="text-sm leading-normal text-muted-foreground sm:text-right">
        {right}
      </span>
    </div>
  );
}

function Divider() {
  return <hr className="border-t border-border" />;
}

function NeutralChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-card px-3 py-1.5 text-sm leading-normal text-foreground">
      {children}
    </span>
  );
}

function NeutralStatusPill({
  dot,
  children,
}: {
  dot: string;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs leading-none font-medium text-foreground">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: dot }}
        aria-hidden
      />
      {children}
    </span>
  );
}
