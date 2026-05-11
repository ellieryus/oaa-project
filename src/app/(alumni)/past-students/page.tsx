"use client";

import { AlumnusNav } from "@/components/oaa/AlumnusNav";
import { Avatar } from "@/components/oaa/Avatar";
import { GhostLink } from "@/components/oaa/buttons";
import { AILink } from "@/components/oaa/AIButton";
import { ADAM_WATCHING, type ReferralRating } from "@/lib/mock-video";

const RATING_LABEL: Record<ReferralRating, string> = {
  "refer-now": "Refer now",
  "refer-after-gap": "Refer after gap",
  "not-foreseeable": "Not foreseeable",
  "cant-say": "Can't say",
};

const RATING_SORT_ORDER: Record<ReferralRating, number> = {
  "refer-now": 0,
  "refer-after-gap": 1,
  "not-foreseeable": 2,
  "cant-say": 3,
};

export default function PastStudentsPage() {
  const watching = [...ADAM_WATCHING].sort(
    (a, b) => RATING_SORT_ORDER[a.rating] - RATING_SORT_ORDER[b.rating],
  );

  return (
    <>
      <AlumnusNav active="past-students" />

      <main className="mx-auto max-w-[1080px] px-8 pb-32 pt-12">
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Your watching list
        </div>
        <h1 className="text-3xl font-semibold leading-tight text-foreground">
          Watching · {watching.length} students
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sorted by your referability rating.
        </p>

        <div className="mt-10 space-y-3">
          {watching.map((s) => (
            <div
              key={s.id}
              className="rounded-md border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-6">
                {/* Left: avatar + info */}
                <div className="flex flex-1 items-start gap-4">
                  <Avatar variant="student" name={s.name} size="md" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-semibold text-foreground">
                        {s.name}
                      </p>
                      <span className="text-sm text-muted-foreground">
                        · {s.cohort}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Last talked {s.lastTalked} · {s.callsCount}{" "}
                      {s.callsCount === 1 ? "call" : "calls"}
                    </p>

                    {s.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {s.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {s.note && (
                      <p className="mt-3 text-sm italic text-muted-foreground">
                        &ldquo;{s.note}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: badge + buttons */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span className="inline-flex items-center rounded-full bg-foreground/5 px-3 py-1 text-xs text-muted-foreground">
                    {RATING_LABEL[s.rating]}
                  </span>

                  <div className="flex items-center gap-2">
                    <GhostLink href={`/past-students/${s.id}`}>
                      View details
                    </GhostLink>

                    {s.rating === "refer-now" && (
                      <AILink href={`/dm/${s.id}`}>Refer now</AILink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
