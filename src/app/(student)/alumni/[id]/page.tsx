import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Check, X } from "lucide-react";

import { StudentNav } from "@/components/oaa/StudentNav";
import { Avatar } from "@/components/oaa/Avatar";
import { CompactWeekGrid, type CompactWeekDay } from "@/components/oaa/CompactWeekGrid";
import { PrimaryLink } from "@/components/oaa/buttons";
import { getAlumnus } from "@/lib/mock-alumni";

type Props = { params: Promise<{ id: string }> };

const ALL_DAYS: CompactWeekDay[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default async function AlumnusProfilePage({ params }: Props) {
  const { id } = await params;
  const alumnus = getAlumnus(id);
  if (!alumnus) notFound();

  // Build week grid entries: only days in availabilityDays are filled
  const weekEntries = ALL_DAYS.map((d) => ({
    day: d,
    label: alumnus.availabilityDays.includes(d) ? "·" : null,
  }));

  const firstName = alumnus.name.split(" ")[0];

  return (
    <>
      <StudentNav active="none" />

      <main className="mx-auto max-w-[1200px] px-8 pb-32 pt-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          {/* LEFT COLUMN */}
          <div>
            {/* Header */}
            <div className="mb-10 flex items-start gap-4">
              <Avatar variant="alumnus" name={alumnus.name} size="lg" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Alumnus · {alumnus.cohort}
                </p>
                <h1 className="mt-2 text-5xl font-semibold leading-[1.05] text-foreground">
                  {alumnus.name}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                  <span>{alumnus.role}</span>
                  <span>·</span>
                  <span>{alumnus.company}</span>
                  <span>·</span>
                  <span>{alumnus.city}</span>
                  <span>·</span>
                  <a
                    href={alumnus.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-foreground hover:text-brand-500"
                  >
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Background */}
            <section className="mb-12">
              <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Background
              </h2>
              <ul className="space-y-0">
                {alumnus.background.map((b, i) => (
                  <li
                    key={`${b.company}-${i}`}
                    className={`flex items-start justify-between gap-6 py-4 ${
                      i > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {b.company}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {b.role}
                        {b.location && <span> · {b.location}</span>}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm text-muted-foreground">
                      {b.start} — {b.end}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Industries */}
            <section className="mb-12">
              <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Industries
              </h2>
              <div className="flex flex-wrap gap-2">
                {alumnus.industries.map((ind) => (
                  <span
                    key={ind}
                    className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </section>

            {/* What helps with */}
            <section className="mb-12">
              <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                What {firstName} helps with
              </h2>
              <ul className="space-y-3">
                {alumnus.offerings.map((o) => (
                  <li
                    key={o.id}
                    className="flex gap-3 rounded-md border border-border bg-card px-5 py-4"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-foreground"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {o.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {o.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* What doesn't offer */}
            {alumnus.nonOfferings.length > 0 && (
              <section className="mb-12">
                <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  What {firstName} doesn&rsquo;t offer
                </h2>
                <ul className="space-y-3">
                  {alumnus.nonOfferings.map((n) => (
                    <li
                      key={n.id}
                      className="flex gap-3 rounded-md border border-border bg-card px-5 py-4"
                    >
                      <X
                        className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">
                          {n.title}
                        </p>
                        {n.reason && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {n.reason}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {alumnus.nonOfferingsQuote && (
                  <blockquote className="mt-6 border-l-2 border-border bg-background px-5 py-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      In their words
                    </p>
                    <p className="mt-2 text-sm italic leading-relaxed text-foreground">
                      &ldquo;{alumnus.nonOfferingsQuote}&rdquo;
                    </p>
                  </blockquote>
                )}
              </section>
            )}
          </div>

          {/* RIGHT COLUMN — sticky availability + CTA */}
          <aside className="lg:sticky lg:top-12 lg:self-start">
            <div className="rounded-md border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Availability · next 2 weeks
              </p>
              <div className="mt-3">
                <CompactWeekGrid entries={weekEntries} />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {alumnus.availabilitySlots.length} slots · {alumnus.availabilityTimezone}
              </p>
            </div>

            <div className="mt-4">
              <PrimaryLink href={`/ask/${alumnus.id}`} tone="clay" className="w-full">
                Ask {firstName} a question →
              </PrimaryLink>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Most asks resolve within {alumnus.responseTimeHours} hours.
            </p>

            <hr className="my-6 border-border" />

            <Link
              href="#"
              className="block text-center text-xs text-muted-foreground hover:text-foreground"
            >
              Report this profile
            </Link>
          </aside>
        </div>
      </main>
    </>
  );
}
