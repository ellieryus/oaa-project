"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";

import { Avatar } from "@/components/shared/Avatar";
import { BackHeader } from "@/components/layout/BackHeader";
import { AcceptModal } from "@/features/requests/components/AcceptModal";
import { DeclineModal } from "@/features/requests/components/DeclineModal";
import { getInboxRequest } from "@/server/modules/requests/request.mock";

type Props = { params: Promise<{ requestId: string }> };

export function InboxRequestDetailPage({ params }: Props) {
  const { requestId } = use(params);
  const req = getInboxRequest(requestId);
  if (!req) notFound();

  const [acceptDefaultTimeId, setAcceptDefaultTimeId] = useState<string | undefined>();

  const router = useRouter();
  const isPending = req.status === "pending";
  const student = req.student;
  const firstName = student.firstName;

  return (
    <div className="min-h-screen bg-oaa-bg">
      <BackHeader
        backHref="/inbox"
        backLabel="Back to inbox"
        rightContent={
          <Avatar variant="alumnus-self" name="Adam Farouk" size="sm" />
        }
      />

      <main className="mx-auto max-w-[1200px] px-8 pb-36 pt-10">
        {/* Hero row */}
        <div className="mb-8 flex items-start gap-5">
          <Avatar variant="student" name={student.name} size="lg" className="shrink-0" />
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-xs border border-oaa-hairline bg-white px-2.5 py-1 text-[12px] text-oaa-muted">
                {req.topic}
              </span>
              <span className="rounded-xs border border-oaa-hairline bg-white px-2.5 py-1 text-[12px] text-oaa-muted">
                {req.format}
              </span>
              {req.scopeStatus === "scope-check" && (
                <span className="rounded-xs border border-oaa-clay-tint-border bg-oaa-clay-tint-bg px-2.5 py-1 text-[12px] text-oaa-clay">
                  Scope check
                </span>
              )}
            </div>
            <h1 className="font-sans text-[32px] font-semibold leading-[1.1] tracking-[-0.01em] text-oaa-ink">
              {student.name}
            </h1>
            <p className="mt-1 text-[14px] text-oaa-muted">
              {student.cohort} · Received {req.receivedAt}
              {req.dueInHours > 0 && (
                <span className="ml-2 rounded-full bg-oaa-status-pending-bg px-2.5 py-0.5 font-mono text-[10px] tracking-[0.04em] text-oaa-status-pending-dot">
                  Due in {req.dueInHours}h
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-8">
          {/* Left: the ask */}
          <div className="min-w-0 flex-1">
            {/* The ask */}
            <section className="mb-8 rounded-md border border-oaa-hairline bg-white p-6">
              <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
                The ask
              </p>
              <p className="text-[15px] leading-[1.6] text-oaa-ink">{req.askMessage}</p>
            </section>

            {/* Their question */}
            <section className="mb-8 rounded-md border border-oaa-hairline bg-white p-6">
              <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
                Their question
              </p>
              <p className="text-[16px] font-medium leading-[1.5] text-oaa-ink">
                &ldquo;{req.question}&rdquo;
              </p>
            </section>

            {/* They're available */}
            <section className="rounded-md border border-oaa-hairline bg-white p-6">
              <p className="mb-4 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
                They&rsquo;re available
              </p>
              <div className="flex flex-col gap-3">
                {req.proposedTimes.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between gap-4 rounded-md border border-oaa-hairline bg-oaa-bg px-4 py-3"
                  >
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.06em] uppercase text-oaa-muted">
                        {t.date}
                      </p>
                      <p className="text-[14px] font-medium text-oaa-ink">
                        {t.time}
                        {t.altTz && (
                          <span className="ml-2 font-normal text-oaa-muted">{t.altTz}</span>
                        )}
                      </p>
                    </div>
                    {isPending && (
                      <AcceptModal
                        request={req}
                        defaultTimeId={t.id}
                        trigger={
                          <button
                            type="button"
                            onClick={() => setAcceptDefaultTimeId(t.id)}
                            className="shrink-0 text-[13px] font-medium text-oaa-clay transition-colors hover:text-oaa-clay/80"
                          >
                            Accept this time →
                          </button>
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: the student */}
          <aside className="w-[280px] shrink-0">
            <div className="sticky top-8 rounded-md border border-oaa-hairline bg-white p-5">
              <p className="mb-4 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
                The student
              </p>

              {/* Aspiration */}
              <div className="mb-4">
                <p className="mb-1 text-[11px] uppercase tracking-[0.06em] text-oaa-muted">
                  Aiming for
                </p>
                <p className="text-[14px] font-medium text-oaa-ink">
                  {student.primaryAspiration}
                </p>
                {student.aspirations.slice(1).length > 0 && (
                  <p className="mt-0.5 text-[12px] text-oaa-muted">
                    also {student.aspirations.slice(1).join(", ")}
                  </p>
                )}
              </div>

              <hr className="my-4 border-oaa-hairline" />

              {/* Help needs */}
              <div className="mb-4">
                <p className="mb-2 text-[11px] uppercase tracking-[0.06em] text-oaa-muted">
                  Needs help with
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {student.helpNeeds.map((need) => (
                    <span
                      key={need}
                      className="rounded-xs border border-oaa-hairline bg-white px-2 py-1 text-[12px] text-oaa-ink"
                    >
                      {need}
                    </span>
                  ))}
                </div>
              </div>

              <hr className="my-4 border-oaa-hairline" />

              {/* Background */}
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.06em] text-oaa-muted">
                  Background
                </p>
                <div className="flex flex-col gap-2">
                  {student.background.map((b, i) => (
                    <div key={i}>
                      <p className="text-[13px] font-medium text-oaa-ink">{b.institution}</p>
                      <p className="text-[12px] text-oaa-muted">{b.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {student.portfolioUrl && (
                <>
                  <hr className="my-4 border-oaa-hairline" />
                  <div>
                    <p className="mb-2 text-[11px] uppercase tracking-[0.06em] text-oaa-muted">
                      Portfolio
                    </p>
                    <a
                      href={student.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[13px] text-oaa-muted transition-colors hover:text-oaa-ink"
                    >
                      <ExternalLink className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                      Portfolio
                    </a>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* Sticky footer actions */}
      {isPending && (
        <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-oaa-hairline bg-white px-8 py-4">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
            <p className="text-[13px] text-oaa-muted">
              Respond to {firstName} · {req.format}
            </p>
            <div className="flex items-center gap-3">
              <DeclineModal
                studentFirstName={firstName}
                trigger={
                  <button
                    type="button"
                    className="rounded-sm border border-oaa-hairline bg-white px-5 py-2.5 text-[14px] font-medium text-oaa-ink transition-colors hover:border-oaa-ink/30"
                  >
                    Decline
                  </button>
                }
              />
              <AcceptModal
                request={req}
                defaultTimeId={acceptDefaultTimeId}
                trigger={
                  <button
                    type="button"
                    className="rounded-sm bg-oaa-ink px-5 py-2.5 text-[14px] font-medium leading-none text-white transition-colors hover:bg-oaa-ink/90"
                  >
                    Accept
                  </button>
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Accepted state */}
      {req.status === "accepted" && req.scheduledTime && (
        <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-oaa-hairline bg-white px-8 py-4">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
            <p className="text-[14px] text-oaa-ink">
              <span className="font-medium">Accepted</span> ·{" "}
              <span className="text-oaa-muted">{req.scheduledTime}</span>
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/inbox"
                className="text-[13px] text-oaa-muted underline underline-offset-2 transition-colors hover:text-oaa-ink"
              >
                Back to inbox
              </Link>
              <button
                type="button"
                onClick={() => router.push(`/post-call-notes/${requestId}`)}
                className="rounded-sm bg-oaa-ink px-5 py-2.5 text-[14px] font-medium leading-none text-white transition-colors hover:bg-oaa-ink/90"
              >
                Mark call as complete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completed state */}
      {req.status === "completed" && (
        <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-oaa-hairline bg-white px-8 py-4">
          <div className="mx-auto flex max-w-[1200px] items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-oaa-status-completed-dot" />
            <p className="text-[14px] text-oaa-muted">
              Completed · {req.scheduledTime}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default InboxRequestDetailPage;
