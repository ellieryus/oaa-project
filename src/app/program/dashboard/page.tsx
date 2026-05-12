import Link from "next/link";

import { Avatar } from "@/components/oaa/Avatar";
import { SARAH_DASHBOARD } from "@/lib/mock-video";

const SARAH = {
  name: "Sarah Chen",
  role: "Program Director · MMA",
};

export default function ProgramDashboardPage() {
  const d = SARAH_DASHBOARD;
  const { funnel, topGapsNamedByAlumni, alumniResponseRate } = d;

  const responsePct = Math.round(alumniResponseRate * 100);
  const maxGapCount = Math.max(...topGapsNamedByAlumni.map((g) => g.flaggedIn));

  return (
    <>
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-5">
          <Link
            href="/"
            className="text-lg font-semibold text-foreground hover:text-foreground/70"
          >
            One Ask Away
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{SARAH.name}</p>
              <p className="text-xs text-muted-foreground">{SARAH.role}</p>
            </div>
            <Avatar variant="alumnus-self" name={SARAH.name} size="md" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-8 pb-32 pt-12">
        {/* Hero */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Cohort dashboard
          </p>
          <h1 className="mt-2 text-5xl font-semibold leading-[1.05] text-foreground">
            {d.cohort}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Term 1, week 12 · {funnel.studentsTotal} students enrolled
          </p>
        </div>

        {/* Funnel section */}
        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Referral funnel
            </h2>
            <p className="text-sm text-muted-foreground">
              From 1 ask to 1 offer.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <FunnelCard
              value={funnel.studentsTotal}
              label="Students"
              sublabel="Enrolled"
            />
            <FunnelCard
              value={funnel.studentsWithCalls}
              label="With calls"
              sublabel={`${Math.round(
                (funnel.studentsWithCalls / funnel.studentsTotal) * 100,
              )}% engaged`}
            />
            <FunnelCard
              value={funnel.referralsPlaced}
              label="Referrals"
              sublabel="Placed by alumni"
            />
            <FunnelCard
              value={funnel.offersInHand}
              label="Offer"
              sublabel="In hand"
              highlight
            />
          </div>
        </section>

        {/* Top gaps */}
        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              What alumni keep flagging
            </h2>
            <p className="text-sm text-muted-foreground">
              Skill gaps named in post-call notes
            </p>
          </div>

          <div className="overflow-hidden rounded-md border border-border bg-card">
            {topGapsNamedByAlumni.map((g, i) => {
              const pct = (g.flaggedIn / maxGapCount) * 100;
              return (
                <div
                  key={g.gap}
                  className={`px-6 py-5 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-6">
                    <p className="text-sm font-medium text-foreground">
                      {g.gap}
                    </p>
                    <p className="shrink-0 text-xs text-muted-foreground">
                      Flagged in {g.flaggedIn} calls
                    </p>
                  </div>
                  {/* Bar */}
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-foreground/5">
                    <div
                      className="h-full rounded-full bg-brand-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer stat */}
        <section>
          <div className="rounded-md border border-border bg-card px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Alumni response rate
                </p>
                <p className="mt-1 text-3xl font-semibold text-foreground">
                  {responsePct}%
                </p>
              </div>
              <p className="max-w-[280px] text-right text-sm text-muted-foreground">
                Of asks sent this term, {responsePct}% got a response within 48 hours.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function FunnelCard({
  value,
  label,
  sublabel,
  highlight = false,
}: {
  value: number;
  label: string;
  sublabel: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-md border bg-card p-5 ${
        highlight ? "border-brand-500" : "border-border"
      }`}
    >
      <p
        className={`text-4xl font-semibold leading-none ${
          highlight ? "text-brand-500" : "text-foreground"
        }`}
      >
        {value}
      </p>
      <p className="mt-3 text-sm font-medium text-foreground">{label}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{sublabel}</p>
    </div>
  );
}
