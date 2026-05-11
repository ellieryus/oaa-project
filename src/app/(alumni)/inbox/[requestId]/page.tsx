"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";

import { Avatar } from "@/components/oaa/Avatar";
import { BackHeader } from "@/components/oaa/BackHeader";
import { AcceptModal } from "@/components/oaa/AcceptModal";
import { DeclineModal } from "@/components/oaa/DeclineModal";
import { getInboxRequest } from "@/lib/mock-inbox";

type Props = { params: Promise<{ requestId: string }> };

export default function InboxRequestDetailPage({ params }: Props) {
  const { requestId } = use(params);
  const req = getInboxRequest(requestId);
  if (!req) notFound();

  const [acceptDefaultTimeId, setAcceptDefaultTimeId] = useState<string | undefined>();

  const router = useRouter();
  const isPending = req.status === "pending";
  const student = req.student;
  const firstName = student.firstName;

  return (
    <div className="min-h-screen bg-background">
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
              <span className="rounded-xs border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">
                {req.topic}
              </span>
              <span className="rounded-xs border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">
                {req.format}
              </span>
              {req.scopeStatus === "scope-check" && (
                <span className="rounded-xs border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs text-brand-500">
                  Scope check
                </span>
              )}
            </div>
            <h1 className="text-3xl font-semibold leading-[1.1] text-foreground">
              {student.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {student.cohort} · Received {req.receivedAt}
              {req.dueInHours > 0 && (
                <span className="ml-2 rounded-full bg-oaa-status-pending-bg px-2.5 py-0.5 text-xs text-oaa-status-pending-dot">
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
            <section className="mb-8 rounded-md border border-border bg-card p-6">
              <p className="mb-3 text-xs font-medium text-muted-foreground">
                The ask
              </p>
              <p className="text-sm leading-relaxed text-foreground">{req.askMessage}</p>
            </section>

            {/* Their question */}
            <section className="mb-8 rounded-md border border-border bg-card p-6">
              <p className="mb-3 text-xs font-medium text-muted-foreground">
                Their question
              </p>
              <p className="text-base font-mediumleading-normal text-foreground">
                &ldquo;{req.question}&rdquo;
              </p>
            </section>

            {/* They're available */}
            <section className="rounded-md border border-border bg-card p-6">
              <p className="mb-4 text-xs font-medium text-muted-foreground">
                They&rsquo;re available
              </p>
              <div className="flex flex-col gap-3">
                {req.proposedTimes.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between gap-4 rounded-md border border-border bg-background px-4 py-3"
                  >
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        {t.date}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {t.time}
                        {t.altTz && (
                          <span className="ml-2 font-normal text-muted-foreground">{t.altTz}</span>
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
                            className="shrink-0 text-sm font-medium text-brand-500 transition-colors hover:text-brand-500/80"
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
            <div className="sticky top-8 rounded-md border border-border bg-card p-5">
              <p className="mb-4 text-xs font-medium text-muted-foreground">
                The student
              </p>

              {/* Aspiration */}
              <div className="mb-4">
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Aiming for
                </p>
                <p className="text-sm font-medium text-foreground">
                  {student.primaryAspiration}
                </p>
                {student.aspirations.slice(1).length > 0 && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    also {student.aspirations.slice(1).join(", ")}
                  </p>
                )}
              </div>

              <hr className="my-4 border-border" />

              {/* Help needs */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Needs help with
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {student.helpNeeds.map((need) => (
                    <span
                      key={need}
                      className="rounded-xs border border-border bg-card px-2 py-1 text-xs text-foreground"
                    >
                      {need}
                    </span>
                  ))}
                </div>
              </div>

              <hr className="my-4 border-border" />

              {/* Background */}
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Background
                </p>
                <div className="flex flex-col gap-2">
                  {student.background.map((b, i) => (
                    <div key={i}>
                      <p className="text-sm font-medium text-foreground">{b.institution}</p>
                      <p className="text-xs text-muted-foreground">{b.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {student.portfolioUrl && (
                <>
                  <hr className="my-4 border-border" />
                  <div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                      Portfolio
                    </p>
                    <a
                      href={student.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
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
        <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-border bg-card px-8 py-4">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Respond to {firstName} · {req.format}
            </p>
            <div className="flex items-center gap-3">
              <DeclineModal
                studentFirstName={firstName}
                trigger={
                  <button
                    type="button"
                    className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand-500"
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
                    className="rounded-md bg-brand-500 px-5 py-2.5 text-sm font-medium leading-none text-white transition-colors hover:bg-brand-600"
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
        <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-border bg-card px-8 py-4">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
            <p className="text-sm text-foreground">
              <span className="font-medium">Accepted</span> ·{" "}
              <span className="text-muted-foreground">{req.scheduledTime}</span>
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/inbox"
                className="text-sm text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
              >
                Back to inbox
              </Link>
              <button
                type="button"
                onClick={() => router.push(`/post-call-notes/${requestId}`)}
                className="rounded-md bg-brand-500 px-5 py-2.5 text-sm font-medium leading-none text-white transition-colors hover:bg-brand-600"
              >
                Mark call as complete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completed state */}
      {req.status === "completed" && (
        <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-border bg-card px-8 py-4">
          <div className="mx-auto flex max-w-[1200px] items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-oaa-status-completed-dot" />
            <p className="text-sm text-muted-foreground">
              Completed · {req.scheduledTime}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
