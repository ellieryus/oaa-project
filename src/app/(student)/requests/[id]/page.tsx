import Link from "next/link";
import { Clock, Copy, CalendarPlus } from "lucide-react";
import { notFound } from "next/navigation";

import { MOCK_REQUESTS, STUDENT } from "@/lib/mock-student";
import { getAlumnus } from "@/lib/mock-alumni";
import { BackHeader } from "@/components/oaa/BackHeader";
import { StatusPill } from "@/components/oaa/StatusPill";
import { Avatar } from "@/components/oaa/Avatar";
import { PrimaryLink } from "@/components/oaa/buttons";
import { MarkCompleteSection } from "@/components/oaa/MarkCompleteSection";

type Props = { params: Promise<{ id: string }> };

export default async function RequestDetailPage({ params }: Props) {
  const { id } = await params;
  const req = MOCK_REQUESTS.find((r) => r.id === id);
  if (!req) notFound();

  const alumnus = getAlumnus(req.alumniId);
  const firstName = req.alumniName.split(" ")[0];
  const status = req.status;

  const worthConsidering = req.worthConsideringId
    ? getAlumnus(req.worthConsideringId)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <BackHeader
        backHref="/requests"
        backLabel="Back to my requests"
        rightContent={<Avatar variant="student" name={STUDENT.name} size="sm" />}
      />

      <main className="mx-auto max-w-[1200px] px-8 py-8">
        {/* Status bar */}
        <div className="mb-6 flex items-center gap-4 border-b border-border pb-6">
          <StatusPill variant={status === "completed" ? "completed" : status as "pending" | "accepted" | "declined"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </StatusPill>
          <span className="text-sm text-muted-foreground">{req.statusMeta}</span>
        </div>

        {/* Two-column layout */}
        <div className="mb-6 grid grid-cols-[1fr_360px] gap-8">
          {/* Left — What you sent */}
          <div>
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              What you sent
            </p>

            {/* Opener quote */}
            <div className="mb-4 border-l-2 border-border bg-card px-5 py-4">
              <p className="text-sm leading-relaxed text-foreground italic">
                "{req.opener.length > 120
                  ? req.opener.slice(0, 120) + "..."
                  : req.opener}"
              </p>
            </div>

            {/* Tags */}
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-xs border border-border bg-card px-3 py-1 text-sm text-foreground">
                {req.topic}
              </span>
              <span className="rounded-xs border border-border bg-card px-3 py-1 text-sm text-foreground">
                15 min · virtual
              </span>
            </div>

            {/* Question */}
            <div className="mb-5">
              <p className="mb-1 text-xs font-medium text-muted-foreground">
                Your question
              </p>
              <p className="text-sm text-foreground">{req.question}</p>
            </div>

            {/* Times proposed */}
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">
                Times you proposed
              </p>
              <p className="text-sm text-muted-foreground">
                {req.proposedTimes.join(" · ")}
              </p>
            </div>
          </div>

          {/* Right — Who you asked */}
          <div>
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              Who you asked
            </p>
            <div className="rounded-md border border-border bg-card p-5">
              {/* Alumni identity */}
              <div className="mb-4 flex items-center gap-3">
                <Avatar variant="alumnus" name={req.alumniName} />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {req.alumniName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {req.alumniRole} · {req.alumniCompany}
                  </p>
                </div>
              </div>

              {/* Helps with */}
              {alumnus && (
                <>
                  <p className="mb-2 text-xs text-muted-foreground">Helps with</p>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {alumnus.offerings.map((o) => (
                      <span
                        key={o.id}
                        className="rounded-xs border border-border bg-card px-2 py-0.5 text-xs text-foreground"
                      >
                        {o.title}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <Link
                href={`/alumni/${req.alumniId}`}
                className="flex items-center gap-1 text-sm text-brand-500 hover:underline"
              >
                See full profile →
              </Link>
            </div>
          </div>
        </div>

        {/* ── PENDING state: What's next card ── */}
        {status === "pending" && (
          <div className="rounded-md border border-border bg-card px-8 py-6">
            <h2 className="mb-1 text-xl font-semibold text-foreground">
              {firstName} usually responds within 48 hours.
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              We'll email you when they do.
            </p>

            {/* Status chip */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-oaa-status-pending-dot" strokeWidth={1.5} aria-hidden />
              <span>Awaiting response · 22h remaining</span>
            </div>

            <div className="border-t border-border pt-4">
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Withdraw request
              </button>
            </div>
          </div>
        )}

        {/* ── ACCEPTED state: Confirmed call card + meeting details ── */}
        {status === "accepted" && req.confirmedTime && (
          <div className="space-y-4">
            {/* Dark confirmed card */}
            <div className="rounded-md bg-foreground px-8 py-10 text-center">
              <p className="mb-3 text-xs text-white/50">
                Confirmed for
              </p>
              <p className="text-4xl font-semibold leading-[1.05] text-white">
                {req.confirmedTime}
              </p>
              <p className="mt-2 text-sm text-white/60">{req.confirmedMeta}</p>
            </div>

            {/* Meeting link + reminders */}
            <div className="rounded-md border border-border bg-card px-6 py-5">
              <div className="grid grid-cols-2 gap-8">
                {/* Meeting link */}
                <div>
                  <p className="mb-3 text-xs font-medium text-muted-foreground">
                    Meeting link
                  </p>
                  <div className="mb-3 flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
                    <span className="flex-1 truncate text-sm text-muted-foreground">
                      {req.meetingLink}
                    </span>
                    <button
                      type="button"
                      className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
                      Copy
                    </button>
                  </div>
                  <button
                    type="button"
                    className="w-full rounded-md border border-border bg-background py-2.5 text-sm text-muted-foreground hover:border-brand-500 hover:text-foreground transition-colors"
                  >
                    Join now · active 1h before
                  </button>
                </div>

                {/* Reminders */}
                <div>
                  <p className="mb-3 text-xs font-medium text-muted-foreground">
                    Reminders
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: "Email me 24h before", on: true },
                      { label: "Email me 1h before", on: false },
                    ].map(({ label, on }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{label}</span>
                        <div
                          className={`relative h-5 w-9 rounded-full transition-colors ${
                            on ? "bg-brand-500" : "bg-neutral-200"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 h-4 w-4 rounded-full bg-card shadow-sm transition-transform ${
                              on ? "translate-x-4" : "translate-x-0.5"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <CalendarPlus className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                    Add to calendar
                  </button>
                </div>
              </div>
            </div>

            {/* Mark complete */}
            <MarkCompleteSection
              requestId={id}
              alumniName={req.alumniName}
            />
          </div>
        )}

        {/* ── DECLINED state: reason + note + worth considering ── */}
        {status === "declined" && (
          <div className="space-y-4">
            {/* Reason chip + decline note */}
            <div className="rounded-md border border-border bg-card px-6 py-5">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Reason:</span>
                {req.declineReason && (
                  <span className="rounded-xs border border-brand-200 bg-brand-50 px-2.5 py-0.5 text-xs text-brand-500 font-medium">
                    {req.declineReason}
                  </span>
                )}
              </div>

              {req.declineNote && (
                <div className="border-l-2 border-brand-200 bg-background px-5 py-4">
                  <p className="text-sm leading-relaxed text-foreground italic">
                    "{req.declineNote}"
                  </p>
                </div>
              )}

              <Link
                href="/matches"
                className="mt-4 flex items-center gap-1 text-sm text-brand-500 hover:underline"
              >
                See alumni who match what you're looking for →
              </Link>
            </div>

            {/* Worth considering */}
            {worthConsidering && (
              <div className="rounded-md border border-brand-200 bg-brand-50 px-6 py-5">
                <p className="mb-4 text-xs font-medium text-brand-500">
                  Worth considering
                </p>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Avatar variant="alumnus" name={worthConsidering.name} />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          {worthConsidering.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {worthConsidering.cohort}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {worthConsidering.role} · {worthConsidering.company}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {worthConsidering.shortBio}
                      </p>
                    </div>
                  </div>
                  <PrimaryLink
                    href={`/alumni/${worthConsidering.id}`}
                    className="shrink-0 whitespace-nowrap"
                    trailingArrow
                  >
                    View profile
                  </PrimaryLink>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
