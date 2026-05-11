"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { AlumnusNav } from "@/components/oaa/AlumnusNav";
import { Avatar } from "@/components/oaa/Avatar";
import { LiveCallBanner } from "@/components/oaa/LiveCallBanner";
import { InboxRowHome } from "@/components/oaa/InboxRowHome";
import { InboxDigestCard } from "@/components/oaa/InboxDigestCard";
import { UpcomingCallCard } from "@/components/oaa/UpcomingCallCard";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { PENDING_REQUESTS, UPCOMING_CALLS, INBOX_REQUESTS } from "@/lib/mock-inbox";
import { alumnusNotesStore } from "@/lib/alumnus-notes-store";
import { isDismissed, dismiss } from "@/lib/modal-dismissed";

// For demo: show the live banner for Anik's call (12 min away)
const IMMINENT_CALL = UPCOMING_CALLS.find((r) => r.id === "inbox-anik");

export default function AlumnusInboxHome() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [unreflectedReq, setUnreflectedReq] = useState<typeof INBOX_REQUESTS[number] | null>(null);

  useEffect(() => {
    const unreflected = INBOX_REQUESTS.find(
      (r) =>
        r.status === "accepted" &&
        !alumnusNotesStore.getAll().some((e) => e.studentId === r.id),
    );
    if (!unreflected) return;
    const key = `reflect-alumnus-${unreflected.id}`;
    if (isDismissed(key)) return;
    setUnreflectedReq(unreflected);
    const timer = setTimeout(() => setShowModal(true), 500);
    return () => clearTimeout(timer);
  }, []);

  function handleDismiss() {
    if (unreflectedReq) dismiss(`reflect-alumnus-${unreflectedReq.id}`);
    setShowModal(false);
  }

  return (
    <>
      <AlumnusNav active="inbox" unreadCount={PENDING_REQUESTS.length} />

      {/* Reflection nudge modal */}
      {unreflectedReq && (
        <Dialog open={showModal} onOpenChange={(open) => { if (!open) handleDismiss(); }}>
          <DialogContent
            showCloseButton={false}
            className="max-w-[440px] gap-0 overflow-hidden rounded-lg p-0"
          >
            {/* Header */}
            <div className="px-6 pb-4 pt-6">
              <h2 className="text-lg font-semibold text-foreground">
                How did your call with {unreflectedReq.student.firstName} go?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                A quick note closes the loop.
              </p>
            </div>

            <hr className="border-border" />

            {/* Body — context card */}
            <div className="px-6 py-5">
              <div className="flex items-center gap-3 rounded-md border border-border bg-card p-4">
                <Avatar variant="student" name={unreflectedReq.student.name} size="sm" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{unreflectedReq.student.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {unreflectedReq.student.program} · {unreflectedReq.student.cohort}
                  </p>
                </div>
                <span className="ml-auto shrink-0 rounded-xs border border-border bg-card px-2 py-0.5 text-xs text-muted-foreground">
                  {unreflectedReq.topic}
                </span>
              </div>
            </div>

            <hr className="border-border" />

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4">
              <button
                type="button"
                onClick={handleDismiss}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Do this later
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  router.push(`/post-call-notes/${unreflectedReq.id}`);
                }}
                className="rounded-md bg-brand-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-600"
              >
                Reflect now →
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <main className="mx-auto max-w-[1200px] px-8 pb-32 pt-12">
        {/* Greeting */}
        <h1 className="mb-8 text-4xl font-semibold leading-[1.05] text-foreground">
          Hi Adam.
        </h1>

        {/* Live call banner */}
        {IMMINENT_CALL && (
          <div className="mb-8">
            <LiveCallBanner
              minutesUntil={12}
              studentName={IMMINENT_CALL.student.name}
              topic={IMMINENT_CALL.topic}
            />
          </div>
        )}

        {/* Pending inbox */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-foreground">Inbox</h2>
              {PENDING_REQUESTS.length > 0 && (
                <span className="rounded-full bg-brand-500 px-2.5 py-0.5 text-xs leading-none text-white">
                  {PENDING_REQUESTS.length} pending
                </span>
              )}
            </div>
            <Link
              href="/inbox/all"
              className="text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
            >
              View all →
            </Link>
          </div>

          {PENDING_REQUESTS.length > 0 ? (
            <div className="flex flex-col gap-2">
              {PENDING_REQUESTS.map((req) => (
                <InboxRowHome key={req.id} request={req} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No pending requests.</p>
          )}
        </section>

        {/* Updates from past students */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Updates from past students
          </h2>
          <InboxDigestCard />
        </section>

        {/* Upcoming calls */}
        {UPCOMING_CALLS.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-semibold text-foreground">Upcoming calls</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {UPCOMING_CALLS.map((req) => (
                <UpcomingCallCard
                  key={req.id}
                  request={req}
                  isImminent={req.id === IMMINENT_CALL?.id}
                />
              ))}
            </div>
          </section>
        )}

        {/* Past students shortcut */}
        <div className="mt-12 rounded-md border border-border bg-card px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">Past students</p>
            <p className="text-sm text-muted-foreground">
              Your post-call notes and reflections.
            </p>
          </div>
          <Link
            href="/past-students"
            className="shrink-0 text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
          >
            View all →
          </Link>
        </div>

        {/* Low-availability nudge */}
        <div className="mt-4 rounded-md border border-border bg-card px-5 py-4">
          <p className="text-sm text-muted-foreground">
            You have{" "}
            <span className="font-medium text-foreground">6 slots open</span> this
            week.{" "}
            <Link
              href="/profile/alumnus"
              className="text-brand-500 underline underline-offset-2 transition-colors hover:text-brand-500/80"
            >
              Update availability
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
