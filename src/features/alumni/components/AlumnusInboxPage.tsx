"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { AlumnusNav } from "@/components/layout/AlumnusNav";
import { Avatar } from "@/components/shared/Avatar";
import { LiveCallBanner } from "@/features/calls/components/LiveCallBanner";
import { InboxRowHome } from "@/features/requests/components/InboxRowHome";
import { UpcomingCallCard } from "@/features/calls/components/UpcomingCallCard";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { PENDING_REQUESTS, UPCOMING_CALLS, INBOX_REQUESTS } from "@/server/modules/requests/request.mock";
import { alumnusNotesStore } from "@/features/alumni/services/alumnus-notes.store";
import { isDismissed, dismiss } from "@/lib/utils/modal-dismissed";

// For demo: show the live banner for Anik's call (12 min away)
const IMMINENT_CALL = UPCOMING_CALLS.find((r) => r.id === "inbox-anik");

export function AlumnusInboxHome() {
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
              <p className="mb-2 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-clay">
                After your call
              </p>
              <h2 className="text-[18px] font-semibold text-oaa-ink">
                How did your call with {unreflectedReq.student.firstName} go?
              </h2>
              <p className="mt-1 text-[13px] text-oaa-muted">
                A quick note closes the loop.
              </p>
            </div>

            <hr className="border-oaa-hairline" />

            {/* Body — context card */}
            <div className="px-6 py-5">
              <div className="flex items-center gap-3 rounded-md border border-oaa-hairline bg-white p-4">
                <Avatar variant="student" name={unreflectedReq.student.name} size="sm" />
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-oaa-ink">{unreflectedReq.student.name}</p>
                  <p className="text-[12px] text-oaa-muted">
                    {unreflectedReq.student.program} · {unreflectedReq.student.cohort}
                  </p>
                </div>
                <span className="ml-auto shrink-0 rounded-xs border border-oaa-hairline bg-white px-2 py-0.5 text-[11px] text-oaa-muted">
                  {unreflectedReq.topic}
                </span>
              </div>
            </div>

            <hr className="border-oaa-hairline" />

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4">
              <button
                type="button"
                onClick={handleDismiss}
                className="text-[13px] text-oaa-muted transition-colors hover:text-oaa-ink"
              >
                Do this later
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  router.push(`/post-call-notes/${unreflectedReq.id}`);
                }}
                className="rounded-sm bg-oaa-ink px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-oaa-ink/90"
              >
                Reflect now →
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <main className="mx-auto max-w-[1200px] px-8 pb-32 pt-12">
        {/* Greeting */}
        <h1 className="mb-8 font-sans text-[40px] font-semibold leading-[1.05] tracking-[-0.01em] text-oaa-ink">
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
              <h2 className="text-[20px] font-semibold text-oaa-ink">Inbox</h2>
              {PENDING_REQUESTS.length > 0 && (
                <span className="rounded-full bg-oaa-clay px-2.5 py-0.5 font-mono text-[11px] leading-none text-white">
                  {PENDING_REQUESTS.length} pending
                </span>
              )}
            </div>
            <Link
              href="/inbox/all"
              className="text-[14px] font-medium text-oaa-ink transition-colors hover:text-oaa-ink/70"
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
            <p className="text-[14px] text-oaa-muted">No pending requests.</p>
          )}
        </section>

        {/* Upcoming calls */}
        {UPCOMING_CALLS.length > 0 && (
          <section>
            <h2 className="mb-4 text-[20px] font-semibold text-oaa-ink">Upcoming calls</h2>
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
        <div className="mt-12 rounded-md border border-oaa-hairline bg-white px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[14px] font-medium text-oaa-ink">Past students</p>
            <p className="text-[13px] text-oaa-muted">
              Your post-call notes and reflections.
            </p>
          </div>
          <Link
            href="/past-students"
            className="shrink-0 text-[14px] font-medium text-oaa-ink transition-colors hover:text-oaa-ink/70"
          >
            View all →
          </Link>
        </div>

        {/* Low-availability nudge */}
        <div className="mt-4 rounded-md border border-oaa-hairline bg-white px-5 py-4">
          <p className="text-[14px] text-oaa-muted">
            You have{" "}
            <span className="font-medium text-oaa-ink">6 slots open</span> this
            week.{" "}
            <Link
              href="/profile/alumnus"
              className="text-oaa-clay underline underline-offset-2 transition-colors hover:text-oaa-clay/80"
            >
              Update availability
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default AlumnusInboxHome;
