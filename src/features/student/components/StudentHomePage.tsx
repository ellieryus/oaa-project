"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { StudentNav } from "@/components/layout/StudentNav";
import { Avatar } from "@/components/shared/Avatar";
import { ContactAgainSection } from "@/features/student/components/ContactAgainSection";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { STUDENT, MOCK_REQUESTS } from "@/server/modules/students/student.mock";
import { TOP_3 } from "@/server/modules/alumni/alumni.mock";
import { reflectionStore } from "@/features/student/services/reflection.store";
import { isDismissed, dismiss } from "@/lib/utils/modal-dismissed";

// Bug 6/7/8 — pill with hairline border, colored dot, black text, no trailing chevron
const STATUS_DOT: Record<string, string> = {
  accepted:  "bg-oaa-status-accepted-dot",
  pending:   "bg-oaa-muted",
  declined:  "bg-oaa-status-declined-dot",
  completed: "bg-oaa-status-completed-dot",
};

const STATUS_META: Record<string, string> = {
  accepted:  "Accepted · Fri 5pm",
  pending:   "Pending · 22h",
  declined:  "Declined · 2d ago",
  completed: "Completed",
};

function RequestStatusPill({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-oaa-hairline bg-white px-2.5 py-1">
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status] ?? "bg-oaa-muted"}`} />
      <span className="text-[12px] text-oaa-ink">
        {STATUS_META[status] ?? status}
      </span>
    </span>
  );
}

export function StudentHomePage() {
  const activeRequests = MOCK_REQUESTS.filter((r) => r.status !== "completed");
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [unreflectedReq, setUnreflectedReq] = useState<typeof MOCK_REQUESTS[number] | null>(null);

  useEffect(() => {
    const unreflected = MOCK_REQUESTS.find(
      (r) =>
        r.status === "accepted" &&
        !reflectionStore.getAll().some((e) => e.alumniId === r.alumniId),
    );
    if (!unreflected) return;
    if (isDismissed(`reflect-student-${unreflected.id}`)) return;
    setUnreflectedReq(unreflected);
    const timer = setTimeout(() => setShowModal(true), 500);
    return () => clearTimeout(timer);
  }, []);

  function handleDismiss() {
    if (unreflectedReq) dismiss(`reflect-student-${unreflectedReq.id}`);
    setShowModal(false);
  }

  return (
    <div className="min-h-screen bg-oaa-bg">
      <StudentNav active="none" />

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
                How did your call with {unreflectedReq.alumniName.split(" ")[0]} go?
              </h2>
              <p className="mt-1 text-[13px] text-oaa-muted">
                Two minutes now saves the insight before it fades.
              </p>
            </div>

            <hr className="border-oaa-hairline" />

            {/* Body — context card */}
            <div className="px-6 py-5">
              <div className="flex items-center gap-3 rounded-md border border-oaa-hairline bg-white p-4">
                <Avatar variant="alumnus" name={unreflectedReq.alumniName} size="sm" />
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-oaa-ink">{unreflectedReq.alumniName}</p>
                  <p className="text-[12px] text-oaa-muted">
                    {unreflectedReq.alumniRole} · {unreflectedReq.alumniCompany}
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
                  router.push(`/reflect/${unreflectedReq.id}`);
                }}
                className="rounded-sm bg-oaa-ink px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-oaa-ink/90"
              >
                Reflect now →
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <main className="mx-auto max-w-[1200px] px-8 py-12">
        {/* Greeting */}
        <div className="mb-10">
          <h1 className="font-sans text-[56px] font-semibold leading-[1.1] tracking-[-0.02em] text-oaa-ink">
            Hi {STUDENT.firstName}.
          </h1>
          <p className="mt-2 text-[15px] text-oaa-muted">
            Adam accepted your ask. Confirmed for Friday.
          </p>
        </div>

        {/* This week's matches */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            {/* Bug 3 — no dot, "NEW" clay, rest muted mono uppercase */}
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase">
              <span className="text-oaa-clay">New</span>{" "}
              <span className="text-oaa-muted">this week's matches</span>
            </span>
            {/* Bug 5 — ArrowRight not ChevronRight */}
            <Link
              href="/matches"
              className="flex items-center gap-1 text-[13px] text-oaa-clay hover:underline"
            >
              See all matches
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
            </Link>
          </div>

          <h2 className="mb-5 font-sans text-[20px] font-semibold leading-[1.2] text-oaa-ink">
            Three alumni who match your goals
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {TOP_3.map((alumnus) => (
              <div
                key={alumnus.id}
                className="flex flex-col rounded-md border border-oaa-hairline bg-white p-5"
              >
                <div className="mb-4 flex items-start gap-3">
                  <Avatar variant="alumnus" name={alumnus.name} size="sm" />
                  <div>
                    <p className="text-[14px] font-semibold leading-tight text-oaa-ink">
                      {alumnus.name}
                    </p>
                    <p className="text-[12px] text-oaa-muted">
                      {alumnus.role} · {alumnus.company}
                    </p>
                  </div>
                </div>

                {/* Bug 4 — first 2 offerings only on home preview */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {alumnus.offerings.slice(0, 2).map((o) => (
                    <span
                      key={o.id}
                      className="rounded-xs border border-oaa-hairline bg-white px-2 py-0.5 text-[12px] text-oaa-ink"
                    >
                      {o.title}
                    </span>
                  ))}
                </div>

                {/* Bug 5 — ArrowRight */}
                <Link
                  href={`/alumni/${alumnus.id}`}
                  className="mt-auto flex items-center gap-1 text-[13px] text-oaa-clay hover:underline"
                >
                  View profile
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Active requests */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-sans text-[20px] font-semibold leading-[1.2] text-oaa-ink">
              Active requests
            </h2>
            {/* Bug 5 — ArrowRight */}
            <Link
              href="/requests"
              className="flex items-center gap-1 text-[13px] text-oaa-clay hover:underline"
            >
              All requests
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
            </Link>
          </div>

          <div className="overflow-hidden rounded-md border border-oaa-hairline bg-white">
            {activeRequests.map((req, i) => (
              <Link
                key={req.id}
                href={`/requests/${req.id}`}
                className={`flex items-center justify-between px-5 py-4 transition-colors hover:bg-oaa-bg ${
                  i > 0 ? "border-t border-oaa-hairline" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar variant="alumnus" name={req.alumniName} size="sm" />
                  <div>
                    <p className="text-[14px] font-semibold text-oaa-ink">
                      {req.alumniName}
                      <span className="ml-1.5 font-normal text-oaa-muted">
                        · {req.alumniRole}, {req.alumniCompany}
                      </span>
                    </p>
                    <span className="mt-1 inline-block rounded-xs border border-oaa-hairline bg-white px-1.5 py-0.5 text-[11px] text-oaa-muted">
                      {req.topic}
                    </span>
                  </div>
                </div>

                {/* Bug 6/7/8 — pill outline, colored dot, black text, NO chevron */}
                <RequestStatusPill status={req.status} />
              </Link>
            ))}
          </div>

          <ContactAgainSection />
        </section>
      </main>
    </div>
  );
}

export default StudentHomePage;
