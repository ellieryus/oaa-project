import Link from "next/link";
import { RotateCw, ArrowRight } from "lucide-react";

import { StudentNav } from "@/components/layout/StudentNav";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Avatar } from "@/components/shared/Avatar";
import { TOP_3 } from "@/server/modules/alumni/alumni.mock";

export function MatchesPage() {
  return (
    <div className="min-h-screen bg-oaa-bg">
      <StudentNav active="matches" />

      <main className="mx-auto max-w-[1200px] px-8 py-12">
        {/* Header */}
        <div className="mb-2">
          <SectionLabel number="11" label="Week 17 matches" />
        </div>

        <div className="mb-3 flex items-start justify-between">
          <h1 className="font-sans text-[44px] font-semibold leading-[1.1] tracking-[-0.01em] text-oaa-ink max-w-[620px]">
            Three alumni who match your goals.
          </h1>
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted whitespace-nowrap mt-2">
            2 of 3 viewed
          </span>
        </div>

        <p className="mb-10 text-[15px] leading-[1.5] text-oaa-muted max-w-[480px]">
          We picked these based on your top aspiration and what you're looking for help with. Read their scope before you ask.
        </p>

        {/* Match cards */}
        <div className="mb-10 grid grid-cols-3 gap-5">
          {TOP_3.map((alumnus) => (
            <div
              key={alumnus.id}
              className="flex flex-col rounded-md border border-oaa-hairline bg-white p-6"
            >
              {/* Avatar + name + score */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Avatar variant="alumnus" name={alumnus.name} />
                  <div>
                    <p className="text-[14px] font-semibold leading-tight text-oaa-ink">
                      {alumnus.name}
                    </p>
                    <p className="text-[12px] text-oaa-muted">
                      {alumnus.cohort}
                    </p>
                    <p className="text-[12px] text-oaa-muted">
                      {alumnus.role} · {alumnus.company}
                    </p>
                    <p className="text-[12px] text-oaa-muted">{alumnus.city}</p>
                  </div>
                </div>
                {(() => {
                  const r = 12;
                  const c = 2 * Math.PI * r;
                  const filled = (alumnus.score / 100) * c;
                  const gap = c - filled;
                  return (
                    <svg width="28" height="28" viewBox="0 0 28 28" className="shrink-0" aria-hidden>
                      <circle
                        cx="14" cy="14" r={r}
                        fill="none"
                        stroke="var(--oaa-hairline)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="14" cy="14" r={r}
                        fill="none"
                        stroke="var(--oaa-clay)"
                        strokeWidth="2"
                        strokeDasharray={`${filled} ${gap}`}
                        strokeLinecap="round"
                        transform="rotate(-90 14 14)"
                      />
                      <text
                        x="14" y="14"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="var(--oaa-clay)"
                        fontSize="11"
                        fontWeight="500"
                      >
                        {alumnus.score}
                      </text>
                    </svg>
                  );
                })()}
              </div>

              {/* Short bio quote */}
              <p className="mb-5 text-[13px] leading-[1.5] text-oaa-ink border-l-2 border-oaa-hairline pl-3">
                &#x201C;{alumnus.shortBio}&#x201D;
              </p>

              {/* Helps with */}
              <div className="mb-3">
                <p className="mb-1.5 font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-muted">
                  Helps with
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {alumnus.offerings.map((o) => (
                    <span
                      key={o.id}
                      className="rounded-xs border border-oaa-hairline bg-white px-2 py-0.5 text-[12px] text-oaa-ink"
                    >
                      {o.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Doesn't offer */}
              {alumnus.nonOfferings.length > 0 && (
                <div className="mb-5">
                  <p className="mb-1.5 font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-muted">
                    Doesn't offer
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {alumnus.nonOfferings.map((n) => (
                      <span
                        key={n.id}
                        className="rounded-xs border border-oaa-hairline bg-white px-2 py-0.5 text-[12px] text-oaa-muted"
                      >
                        {n.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-oaa-hairline">
                <span className="flex items-center gap-1.5 text-[12px] text-oaa-muted">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      alumnus.availabilityLevel === "Available this week"
                        ? "bg-oaa-status-accepted-dot"
                        : alumnus.availabilityLevel === "Available next week"
                        ? "bg-oaa-status-completed-dot"
                        : "bg-oaa-clay"
                    }`}
                  />
                  {alumnus.availabilityLevel}
                </span>
                <Link
                  href={`/alumni/${alumnus.id}`}
                  className="flex items-center gap-1 text-[13px] font-medium text-oaa-ink hover:text-oaa-ink/80"
                >
                  View profile
                  <ArrowRight className="h-3.5 w-3.5 text-oaa-muted" strokeWidth={1.5} aria-hidden />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-oaa-hairline pt-5">
          <p className="text-[13px] text-oaa-muted">
            Open or send to all 3 to unlock new matches.
          </p>
          <button
            type="button"
            className="flex items-center gap-1.5 text-[13px] text-oaa-clay hover:underline"
          >
            <RotateCw className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
            Regenerate matches
          </button>
        </div>
      </main>
    </div>
  );
}

export default MatchesPage;
