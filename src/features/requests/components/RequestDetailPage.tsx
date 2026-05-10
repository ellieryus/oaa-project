import Link from "next/link";
import { Clock, Copy, CalendarPlus } from "lucide-react";
import { notFound } from "next/navigation";

import { MOCK_REQUESTS, STUDENT } from "@/server/modules/students/student.mock";
import { getAlumnus } from "@/server/modules/alumni/alumni.mock";
import { BackHeader } from "@/components/layout/BackHeader";
import { StatusPill } from "@/components/shared/StatusPill";
import { Avatar } from "@/components/shared/Avatar";
import { PrimaryLink } from "@/components/shared/buttons";
import { MarkCompleteSection } from "@/features/calls/components/MarkCompleteSection";

type Props = { params: Promise<{ id: string }> };

export async function RequestDetailPage({ params }: Props) {
  const { id } = await params;
  const req = MOCK_REQUESTS.find((r) => r.id === id);
  if (!req) notFound();

  const alumnus = getAlumnus(req.alumniId);
  const firstName = req.alumniName.split(" ")[0];
  const status = req.status;

  // Screen number label per status
  const screenLabel =
    status === "pending"
      ? "16 · Request · Pending"
      : status === "accepted"
      ? "17 · Request · Accepted"
      : status === "declined"
      ? "18 · Request · Declined"
      : "Request";

  const worthConsidering = req.worthConsideringId
    ? getAlumnus(req.worthConsideringId)
    : null;

  return (
    <div className="min-h-screen bg-oaa-bg">
      <BackHeader
        backHref="/requests"
        backLabel="Back to my requests"
        rightContent={<Avatar variant="student" name={STUDENT.name} size="sm" />}
      />

      <main className="mx-auto max-w-[1200px] px-8 py-8">
        {/* Status bar */}
        <div className="mb-6 flex items-center gap-4 border-b border-oaa-hairline pb-6">
          <StatusPill variant={status === "completed" ? "completed" : status as "pending" | "accepted" | "declined"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </StatusPill>
          <span className="text-[13px] text-oaa-muted">{req.statusMeta}</span>
        </div>

        {/* Two-column layout */}
        <div className="mb-6 grid grid-cols-[1fr_360px] gap-8">
          {/* Left — What you sent */}
          <div>
            <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
              What you sent
            </p>

            {/* Opener quote */}
            <div className="mb-4 rounded-sm border-l-2 border-oaa-hairline bg-white px-5 py-4">
              <p className="text-[14px] leading-[1.6] text-oaa-ink italic">
                "{req.opener.length > 120
                  ? req.opener.slice(0, 120) + "..."
                  : req.opener}"
              </p>
            </div>

            {/* Tags */}
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-xs border border-oaa-hairline bg-white px-3 py-1 text-[13px] text-oaa-ink">
                {req.topic}
              </span>
              <span className="rounded-xs border border-oaa-hairline bg-white px-3 py-1 text-[13px] text-oaa-ink">
                15 min · virtual
              </span>
            </div>

            {/* Question */}
            <div className="mb-5">
              <p className="mb-1 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
                Your question
              </p>
              <p className="text-[15px] text-oaa-ink">{req.question}</p>
            </div>

            {/* Times proposed */}
            <div>
              <p className="mb-1 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
                Times you proposed
              </p>
              <p className="text-[14px] text-oaa-muted">
                {req.proposedTimes.join(" · ")}
              </p>
            </div>
          </div>

          {/* Right — Who you asked */}
          <div>
            <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
              Who you asked
            </p>
            <div className="rounded-md border border-oaa-hairline bg-white p-5">
              {/* Alumni identity */}
              <div className="mb-4 flex items-center gap-3">
                <Avatar variant="alumnus" name={req.alumniName} />
                <div>
                  <p className="text-[15px] font-semibold text-oaa-ink">
                    {req.alumniName}
                  </p>
                  <p className="text-[13px] text-oaa-muted">
                    {req.alumniRole} · {req.alumniCompany}
                  </p>
                </div>
              </div>

              {/* Helps with */}
              {alumnus && (
                <>
                  <p className="mb-2 text-[12px] text-oaa-muted">Helps with</p>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {alumnus.offerings.map((o) => (
                      <span
                        key={o.id}
                        className="rounded-xs border border-oaa-hairline bg-white px-2 py-0.5 text-[12px] text-oaa-ink"
                      >
                        {o.title}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <Link
                href={`/alumni/${req.alumniId}`}
                className="flex items-center gap-1 text-[13px] text-oaa-clay hover:underline"
              >
                See full profile →
              </Link>
            </div>
          </div>
        </div>

        {/* ── PENDING state: What's next card ── */}
        {status === "pending" && (
          <div className="rounded-md border border-oaa-hairline bg-white px-8 py-6">
            <p className="mb-2 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-clay">
              What's next
            </p>
            <h2 className="mb-1 text-[20px] font-semibold text-oaa-ink">
              {firstName} usually responds within {req.alumniId === "adam-farouk" ? "48" : "48"} hours.
            </h2>
            <p className="mb-5 text-[14px] text-oaa-muted">
              We'll email you when they do.
            </p>

            {/* Status chip */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-oaa-hairline bg-oaa-bg px-3 py-2 font-mono text-[12px] text-oaa-muted">
              <Clock className="h-3.5 w-3.5 text-oaa-status-pending-dot" strokeWidth={1.5} aria-hidden />
              <span>Awaiting response · 22h remaining</span>
            </div>

            <div className="border-t border-oaa-hairline pt-4">
              <button
                type="button"
                className="text-[13px] text-oaa-muted hover:text-oaa-ink underline"
              >
                Withdraw request
              </button>
            </div>
          </div>
        )}

        {/* ── ACCEPTED state: Confirmed call card + meeting details ── */}
        {status === "accepted" && req.confirmedTime && (
          <div className="space-y-4">
            {/* Black confirmed card */}
            <div className="rounded-md bg-oaa-ink px-8 py-10 text-center">
              <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-clay">
                Confirmed for
              </p>
              <p className="font-sans text-[40px] font-semibold leading-[1.05] tracking-[-0.01em] text-white">
                {req.confirmedTime}
              </p>
              <p className="mt-2 text-[14px] text-white/60">{req.confirmedMeta}</p>
            </div>

            {/* Meeting link + reminders */}
            <div className="rounded-md border border-oaa-hairline bg-white px-6 py-5">
              <div className="grid grid-cols-2 gap-8">
                {/* Meeting link */}
                <div>
                  <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
                    Meeting link
                  </p>
                  <div className="mb-3 flex items-center gap-2 rounded-sm border border-oaa-hairline bg-oaa-bg px-3 py-2">
                    <span className="flex-1 truncate font-mono text-[13px] text-oaa-muted">
                      {req.meetingLink}
                    </span>
                    <button
                      type="button"
                      className="flex shrink-0 items-center gap-1 text-[12px] text-oaa-muted hover:text-oaa-ink"
                    >
                      <Copy className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
                      Copy
                    </button>
                  </div>
                  <button
                    type="button"
                    className="w-full rounded-sm border border-oaa-hairline bg-oaa-bg py-2.5 text-[13px] text-oaa-muted hover:border-oaa-ink/30 hover:text-oaa-ink transition-colors"
                  >
                    Join now · active 1h before
                  </button>
                </div>

                {/* Reminders */}
                <div>
                  <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
                    Reminders
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: "Email me 24h before", on: true },
                      { label: "Email me 1h before", on: false },
                    ].map(({ label, on }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-[13px] text-oaa-ink">{label}</span>
                        <div
                          className={`relative h-5 w-9 rounded-full transition-colors ${
                            on ? "bg-oaa-clay" : "bg-oaa-hairline"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                              on ? "translate-x-4" : "translate-x-0.5"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="mt-4 flex items-center gap-1.5 text-[13px] text-oaa-muted hover:text-oaa-ink"
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
            <div className="rounded-md border border-oaa-hairline bg-white px-6 py-5">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-[13px] text-oaa-muted">Reason:</span>
                {req.declineReason && (
                  <span className="rounded-xs border border-oaa-clay-tint-border bg-oaa-clay-tint-bg px-2.5 py-0.5 text-[12px] text-oaa-clay font-medium">
                    {req.declineReason}
                  </span>
                )}
              </div>

              {req.declineNote && (
                <div className="rounded-sm border-l-2 border-oaa-clay-tint-border bg-oaa-bg px-5 py-4">
                  <p className="mb-2 font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-clay">
                    From {firstName}
                  </p>
                  <p className="text-[14px] leading-[1.6] text-oaa-ink italic">
                    "{req.declineNote}"
                  </p>
                </div>
              )}

              <Link
                href="/matches"
                className="mt-4 flex items-center gap-1 text-[13px] text-oaa-clay hover:underline"
              >
                See alumni who match what you're looking for →
              </Link>
            </div>

            {/* Worth considering */}
            {worthConsidering && (
              <div className="rounded-md border border-[color:var(--oaa-clay-tint-border)] bg-[color:var(--oaa-clay-tint-bg)] px-6 py-5">
                <p className="mb-4 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-clay">
                  Worth considering
                </p>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Avatar variant="alumnus" name={worthConsidering.name} />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-semibold text-oaa-ink">
                          {worthConsidering.name}
                        </p>
                        <span className="font-mono text-[11px] text-oaa-muted">
                          {worthConsidering.cohort}
                        </span>
                      </div>
                      <p className="text-[13px] text-oaa-muted">
                        {worthConsidering.role} · {worthConsidering.company}
                      </p>
                      <p className="mt-1 text-[13px] text-oaa-muted">
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


export default RequestDetailPage;
