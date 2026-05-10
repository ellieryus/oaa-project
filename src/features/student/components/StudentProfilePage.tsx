import Link from "next/link";
import { ExternalLink, Pencil } from "lucide-react";

import { Avatar } from "@/components/shared/Avatar";

import { DisplayHeading } from "@/components/shared/DisplayHeading";
import { Header } from "@/components/layout/Header";
import { GhostButton, PrimaryLink } from "@/components/shared/buttons";
import { Switch } from "@/components/ui/switch";
import { STUDENT } from "@/server/modules/students/student.mock";

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

export function ProfilePage() {
  return (
    <>
      <Header rightContent={<ProfileNav />} />

      <main className="mx-auto max-w-[1200px] px-8 pb-32">
        {/* Hero */}
        <section className="flex flex-col gap-8 pt-16 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-6">
            <Avatar variant="student" name="Maya Chen" className="h-20 w-20 shrink-0 text-[22px]" />
            <div className="flex flex-col gap-3 pt-1">
              <span className="font-mono text-[11px] leading-[1.4] tracking-[0.08em] uppercase text-oaa-muted">
                Student · MMA &rsquo;26
              </span>
              <DisplayHeading variant="m" as="h1">
                Maya Chen
              </DisplayHeading>
              <p className="text-[15px] leading-[1.5] text-oaa-muted">
                Aiming for Toronto · Some experience · Updated Apr 24
              </p>
            </div>
          </div>
          <div className="md:pt-2">
            <NeutralStatusPill dot="#4F6B4A">
              Live in matching
            </NeutralStatusPill>
          </div>
        </section>

        {/* Cards */}
        <div className="mt-12 flex flex-col gap-6">
          <ProfileCard
            number="01"
            eyebrow="Aspirations"
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
            number="02"
            eyebrow="Background"
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
                className="flex items-center gap-1.5 text-[13px] text-oaa-muted transition-colors hover:text-oaa-ink"
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
            number="03"
            eyebrow="Help needs"
            heading="What I’m asking for"
            updated="Last updated Apr 24"
          >
            <RankedList items={HELP_NEEDS} />
            <Divider />
            <blockquote className="text-[15px] leading-[1.5] italic text-oaa-ink">
              &ldquo;I&rsquo;m pivoting from marketing to data science and want
              feedback on my SQL portfolio.&rdquo;
            </blockquote>
          </ProfileCard>
        </div>

        {/* Matches CTA */}
        <section className="mt-6 rounded-md border border-oaa-hairline bg-white px-8 py-6">
          <p className="mb-2 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-clay">
            Your matches are ready
          </p>
          <h2 className="mb-1 text-[20px] font-semibold text-oaa-ink">
            Three alumni match your goals this week.
          </h2>
          <p className="mb-5 text-[14px] text-oaa-muted">
            We picked them based on your top aspiration and what you need help with.
          </p>
          <PrimaryLink href="/matches/loading" trailingArrow>
            Find my alumni matches
          </PrimaryLink>
        </section>

        {/* Pause toggle */}
        <section className="mt-6 flex items-start justify-between gap-6 rounded-md border border-oaa-hairline bg-white p-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-[15px] leading-[1.5] font-semibold text-oaa-ink">
              Pause my profile from matching
            </h3>
            <p className="text-[13px] leading-[1.45] text-oaa-muted">
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
        className="px-4 py-2 text-[14px] text-oaa-ink hover:bg-oaa-ink/5 rounded-sm"
      >
        Inbox
      </Link>
      <Link
        href="/profile"
        className="px-4 py-2 text-[14px] text-oaa-ink underline underline-offset-2 rounded-sm"
      >
        Profile
      </Link>
    </nav>
  );
}

function ProfileCard({
  number,
  eyebrow,
  heading,
  updated,
  children,
}: {
  number: string;
  eyebrow: string;
  heading: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-md border border-oaa-hairline bg-white p-8">
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[11px] leading-[1.4] tracking-[0.08em] uppercase text-oaa-muted">
            {number} / {eyebrow}
          </span>
          <h2 className="text-[28px] leading-[1.2] font-semibold tracking-[-0.005em] text-oaa-ink">
            {heading}
          </h2>
        </div>
        <GhostButton type="button" className="px-3 py-2 text-[13px]">
          <Pencil className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          Edit
        </GhostButton>
      </header>
      <div className="mt-6 flex flex-col gap-4">{children}</div>
      <p className="mt-6 text-[13px] leading-[1.45] text-oaa-muted">
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
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-oaa-clay text-white font-mono text-[11px] tracking-[0.04em]">
              {it.rank}
            </span>
            <span className="text-[15px] leading-[1.5] text-oaa-ink">
              {it.label}
            </span>
          </span>
          {it.primary && (
            <span className="rounded-full border border-oaa-clay bg-white px-2 py-0.5 font-mono text-[10px] tracking-[0.06em] uppercase text-oaa-clay">
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
      <span className="text-[15px] leading-[1.5] font-medium text-oaa-ink">
        {left}
      </span>
      <span className="text-[15px] leading-[1.5] text-oaa-ink">{middle}</span>
      <span className="text-[13px] leading-[1.45] text-oaa-muted sm:text-right">
        {right}
      </span>
    </div>
  );
}

function Divider() {
  return <hr className="border-t border-oaa-hairline" />;
}

function NeutralChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-oaa-hairline bg-white px-3 py-1.5 text-[13px] leading-[1.45] text-oaa-ink">
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
    <span className="inline-flex items-center gap-2 rounded-full border border-oaa-hairline bg-white px-3 py-1.5 text-[12px] leading-none font-medium text-oaa-ink">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: dot }}
        aria-hidden
      />
      {children}
    </span>
  );
}

export default ProfilePage;
