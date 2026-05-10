import Link from "next/link";
import { Check, X, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import { getAlumnus } from "@/server/modules/alumni/alumni.mock";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Avatar } from "@/components/shared/Avatar";
import { BackHeader } from "@/components/layout/BackHeader";
import { ReportModal } from "@/features/alumni/components/ReportModal";
import { STUDENT } from "@/server/modules/students/student.mock";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

type Props = { params: Promise<{ id: string }> };

export async function AlumnusDetailPage({ params }: Props) {
  const { id } = await params;
  const alumnus = getAlumnus(id);
  if (!alumnus) notFound();

  return (
    <div className="min-h-screen bg-oaa-bg">
      <BackHeader
        backHref="/matches"
        backLabel="Back to matches"
        rightContent={
          <div className="flex items-center gap-4">
            <Link href="/student-inbox" className="text-[14px] text-oaa-muted hover:text-oaa-ink">
              Inbox
            </Link>
            <Avatar variant="student" name={STUDENT.name} size="sm" />
          </div>
        }
      />

      <main className="mx-auto max-w-[1200px] px-8 py-10">
        <div className="flex gap-10">
          {/* Left column */}
          <div className="min-w-0 flex-1">
            {/* Profile header */}
            <div className="mb-8 flex items-start gap-6">
              <Avatar variant="alumnus" name={alumnus.name} size="lg" className="h-[72px] w-[72px] text-[18px]" />
              <div>
                <SectionLabel label={`Alumnus · ${alumnus.cohort}`} className="mb-2" />
                <h1 className="font-sans text-[40px] font-semibold leading-[1.05] tracking-[-0.01em] text-oaa-ink">
                  {alumnus.name}
                </h1>
                <div className="mt-2 flex items-center gap-2 text-[15px] text-oaa-muted">
                  <span>{alumnus.role}</span>
                  <span className="text-oaa-hairline">·</span>
                  <span>{alumnus.company}</span>
                  <span className="text-oaa-hairline">·</span>
                  <span>{alumnus.city}</span>
                  <a
                    href={alumnus.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 flex items-center gap-1 text-oaa-muted hover:text-oaa-ink transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                    <span className="text-[13px]">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Background */}
            <section className="mb-8">
              <p className="mb-4 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
                Background
              </p>
              <div className="space-y-5">
                {alumnus.background.map((entry, i) => (
                  <div key={i} className="flex items-start justify-between">
                    <div>
                      <p className="text-[15px] font-semibold text-oaa-ink">{entry.company}</p>
                      <p className="text-[13px] text-oaa-muted">
                        {entry.role}
                        {entry.location ? ` · ${entry.location}` : ""}
                      </p>
                    </div>
                    <span className="shrink-0 text-[13px] text-oaa-muted">
                      {entry.start === entry.end
                        ? entry.start
                        : `${entry.start} — ${entry.end}`}
                    </span>
                  </div>
                ))}
              </div>

              {/* Industry chips */}
              <div className="mt-5 flex flex-wrap gap-2">
                {alumnus.industries.map((ind) => (
                  <span
                    key={ind}
                    className="rounded-xs border border-oaa-hairline bg-white px-3 py-1 text-[13px] text-oaa-ink"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </section>

            {/* What they help with */}
            <section className="mb-8">
              <p className="mb-4 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
                What {alumnus.name.split(" ")[0]} helps with
              </p>
              <div className="space-y-3">
                {alumnus.offerings.map((offering) => (
                  <div
                    key={offering.id}
                    className="flex items-start gap-3 rounded-md border border-oaa-hairline bg-white p-4"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-oaa-muted"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <div>
                      <p className="text-[14px] font-semibold text-oaa-ink">{offering.title}</p>
                      <p className="mt-0.5 text-[13px] text-oaa-muted">{offering.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* What they don't offer */}
            <section className="mb-8">
              <p className="mb-4 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
                What {alumnus.name.split(" ")[0]} doesn't offer
              </p>
              <div className="space-y-3">
                {alumnus.nonOfferings.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 rounded-md border border-dashed border-oaa-hairline bg-white p-4"
                  >
                    <X
                      className="mt-0.5 h-4 w-4 shrink-0 text-oaa-muted"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <div>
                      <p className="text-[14px] font-semibold text-oaa-muted">{item.title}</p>
                      {item.reason && (
                        <p className="mt-0.5 text-[13px] text-oaa-muted">{item.reason}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* In their words */}
              <div className="mt-4 rounded-md border border-oaa-hairline bg-oaa-bg p-4">
                <p className="mb-2 font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-muted">
                  In their words:
                </p>
                <p className="text-[14px] leading-[1.55] text-oaa-ink italic">
                  "{alumnus.nonOfferingsQuote}"
                </p>
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="w-[300px] shrink-0">
            <div className="sticky top-8">
              {/* Availability grid card */}
              <div className="mb-3 rounded-md border border-oaa-hairline bg-white p-5">
                <p className="mb-4 font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-muted">
                  Availability · Next 2 weeks
                </p>

                {/* Day label row */}
                <div className="mb-1 grid grid-cols-7 gap-1">
                  {DAYS.map((day) => (
                    <div key={day} className="flex items-center justify-center">
                      <span className="text-[10px] text-oaa-muted">{day}</span>
                    </div>
                  ))}
                </div>

                {/* Week 1 cells */}
                <div className="mb-1 grid grid-cols-7 gap-1">
                  {DAYS.map((day) => {
                    const active = alumnus.availabilityDays.includes(day);
                    return (
                      <div
                        key={`w1-${day}`}
                        className={`flex aspect-square items-center justify-center rounded-xs ${
                          active
                            ? "border border-oaa-clay-tint-border bg-oaa-clay-tint-bg"
                            : "bg-muted"
                        }`}
                      >
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-oaa-clay" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Week 2 cells */}
                <div className="grid grid-cols-7 gap-1">
                  {DAYS.map((day) => {
                    const active = alumnus.availabilityDays.includes(day);
                    return (
                      <div
                        key={`w2-${day}`}
                        className={`flex aspect-square items-center justify-center rounded-xs ${
                          active
                            ? "border border-oaa-clay-tint-border bg-oaa-clay-tint-bg"
                            : "bg-muted"
                        }`}
                      >
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-oaa-clay" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <p className="mt-3 text-[12px] text-oaa-muted">
                  {alumnus.availabilitySlots.length} slots · {alumnus.availabilityTimezone}
                </p>
              </div>

              {/* CTA button */}
              <Link
                href={`/ask/${alumnus.id}`}
                className="mb-2 flex w-full items-center justify-center rounded-sm bg-oaa-ink px-5 py-4 text-[15px] font-medium leading-none tracking-[0.04em] text-white transition-colors hover:bg-oaa-ink/90"
              >
                Ask {alumnus.name.split(" ")[0]} a question →
              </Link>
              <p className="mb-5 text-center text-[12px] text-oaa-muted">
                Most asks resolve within {alumnus.responseTimeHours} hours.
              </p>

              <div className="text-center">
                <ReportModal
                  alumniName={alumnus.name}
                  trigger={
                    <button
                      type="button"
                      className="text-[12px] text-oaa-muted underline hover:text-oaa-ink"
                    >
                      Report this profile
                    </button>
                  }
                />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}


export default AlumnusDetailPage;
