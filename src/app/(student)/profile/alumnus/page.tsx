import { Check, Pencil, X } from "lucide-react";

import { AlumnusNav } from "@/components/oaa/AlumnusNav";
import { Avatar } from "@/components/oaa/Avatar";
import { CompactWeekGrid } from "@/components/oaa/CompactWeekGrid";
import { DisplayHeading } from "@/components/oaa/DisplayHeading";
import { GhostButton } from "@/components/oaa/buttons";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const BACKGROUND = [
  {
    company: "Shopify",
    role: "Director of Data",
    location: "Toronto",
    years: "2022 — Present",
  },
  {
    company: "RBC",
    role: "Senior Data Analyst",
    location: "",
    years: "2019 — 2022",
  },
];

const INDUSTRIES = ["Tech", "Finance"];

const OFFERINGS = [
  "Career pivot",
  "Portfolio review",
  "Data case",
  "Behavioral interview",
];

const NON_OFFERINGS = ["Job referral", "Salary negotiation"];

const WEEK_ENTRIES = [
  { day: "Mon" as const, label: null },
  { day: "Tue" as const, label: "5–6pm" },
  { day: "Wed" as const, label: null },
  { day: "Thu" as const, label: null },
  { day: "Fri" as const, label: "1–2pm" },
  { day: "Sat" as const, label: null },
  { day: "Sun" as const, label: null },
];

export default function AlumnusProfilePage() {
  return (
    <>
      <AlumnusNav active="profile" />

      <main className="mx-auto max-w-[1200px] px-8 pb-32">
        {/* Hero */}
        <section className="flex flex-col gap-8 pt-16 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-6">
            <Avatar variant="alumnus-self" name="Adam Farouk" className="h-20 w-20 shrink-0 text-2xl" />
            <div className="flex flex-col gap-3 pt-1">
              <span className="text-xs text-muted-foreground">
                Alumnus · MMA &rsquo;19
              </span>
              <DisplayHeading variant="m" as="h1">
                Adam Farouk
              </DisplayHeading>
              <p className="text-sm leading-normal text-muted-foreground">
                Director of Data · Shopify · Toronto · Updated Apr 18
              </p>
            </div>
          </div>
          <div className="md:pt-2">
            <NeutralStatusPill dot="var(--oaa-status-accepted-dot)">
              Active · 6 slots/week
            </NeutralStatusPill>
          </div>
        </section>

        {/* Cards */}
        <div className="mt-12 flex flex-col gap-6">
          {/* Background */}
          <ProfileCard heading="Where I’ve been" updated="Last updated Mar 2">
            <ol className="flex flex-col gap-3">
              {BACKGROUND.map((entry) => (
                <li
                  key={`${entry.company}-${entry.years}`}
                  className="grid grid-cols-1 gap-1 sm:grid-cols-[1fr_2fr_auto] sm:items-baseline sm:gap-6"
                >
                  <span className="text-sm leading-normal font-medium text-foreground">
                    {entry.company}
                  </span>
                  <span className="text-sm leading-normal text-foreground">
                    {entry.role}
                    {entry.location ? ` · ${entry.location}` : ""}
                  </span>
                  <span className="text-sm leading-normal text-muted-foreground sm:text-right">
                    {entry.years}
                  </span>
                </li>
              ))}
            </ol>
            <Divider />
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.map((i) => (
                <NeutralChip key={i}>{i}</NeutralChip>
              ))}
            </div>
          </ProfileCard>

          {/* Offerings */}
          <ProfileCard
            heading="What I’ll help with"
            updated="Last updated Apr 18"
          >
            <div className="flex flex-wrap gap-2">
              {OFFERINGS.map((o) => (
                <ClayTintChip key={o} icon="check">
                  {o}
                </ClayTintChip>
              ))}
            </div>
          </ProfileCard>

          {/* Non-offerings */}
          <ProfileCard
            heading="What’s off the table"
            updated="Last updated Apr 18"
          >
            <div className="flex flex-wrap gap-2">
              {NON_OFFERINGS.map((o) => (
                <NeutralChip key={o} icon="x" muted>
                  {o}
                </NeutralChip>
              ))}
            </div>
            <blockquote className="border-l-2 border-brand-200 pl-4 text-sm leading-normal italic text-foreground">
              &ldquo;I can&rsquo;t refer anyone outside my immediate team. Happy
              to talk pivot stories instead.&rdquo;
            </blockquote>
          </ProfileCard>

          {/* Availability */}
          <ProfileCard
            heading="When I’m around"
            updated="Last updated Apr 18"
            editLabel="Edit availability"
          >
            <CompactWeekGrid entries={WEEK_ENTRIES} />
            <p className="text-sm leading-normal text-muted-foreground">
              Next 2 weeks · 6 slots open · America/Toronto
            </p>
          </ProfileCard>
        </div>

        {/* Pause toggle card */}
        <section className="mt-12 flex items-start justify-between gap-6 rounded-md border border-border bg-card p-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm leading-normal font-semibold text-foreground">
              Pause recommendations
            </h3>
            <p className="text-sm leading-normal text-muted-foreground">
              You&rsquo;ll be hidden from new matches. Existing requests stay
              active.
            </p>
          </div>
          <Switch />
        </section>

        {/* Delete account */}
        <div className="mt-8 text-center">
          <button
            type="button"
            className="text-sm text-brand-500 hover:underline underline-offset-2"
          >
            Delete account
          </button>
        </div>
      </main>
    </>
  );
}


function ProfileCard({
  heading,
  updated,
  editLabel = "Edit",
  children,
}: {
  heading: string;
  updated: string;
  editLabel?: string;
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
          {editLabel}
        </GhostButton>
      </header>
      <div className="mt-6 flex flex-col gap-4">{children}</div>
      <p className="mt-6 text-sm leading-normal text-muted-foreground">
        {updated}
      </p>
    </article>
  );
}

function Divider() {
  return <hr className="border-t border-border" />;
}

function NeutralChip({
  children,
  icon,
  muted = false,
}: {
  children: React.ReactNode;
  icon?: "x";
  muted?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm leading-normal",
        muted ? "text-muted-foreground" : "text-foreground",
      )}
    >
      {icon === "x" && (
        <X className="h-3 w-3" strokeWidth={1.5} aria-hidden />
      )}
      {children}
    </span>
  );
}

function ClayTintChip({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: "check";
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm leading-normal text-brand-500">
      {icon === "check" && (
        <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
      )}
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
