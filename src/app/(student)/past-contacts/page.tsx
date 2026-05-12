"use client";

import { useState } from "react";

import { StudentNav } from "@/components/oaa/StudentNav";
import { Avatar } from "@/components/oaa/Avatar";
import { GapClosureModal } from "@/components/oaa/GapClosureModal";
import { CallNotesPreview } from "@/components/oaa/CallNotesPreview";
import { MAYA_DASHBOARD, ADAM_VIDEO } from "@/lib/mock-video";

type Priority = (typeof MAYA_DASHBOARD.priorities)[number];

export default function PastContactsPage() {
  const [priorities, setPriorities] = useState<Priority[]>(MAYA_DASHBOARD.priorities);
  const [activePriorityId, setActivePriorityId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const activePriority = priorities.find((p) => p.id === activePriorityId) ?? null;

  function handleConfirm() {
    if (!activePriority) return;
    setPriorities((prev) => prev.filter((p) => p.id !== activePriority.id));
    setActivePriorityId(null);
    setToast(`Gap closed and message sent to ${ADAM_VIDEO.name.split(" ")[0]}.`);
    setTimeout(() => setToast(null), 3500);
  }

  return (
    <>
      <StudentNav active="home" />

      <main className="mx-auto max-w-[1200px] px-8 pb-32 pt-12">
        {/* Greeting */}
        <h1 className="mb-8 text-4xl font-semibold leading-[1.05] text-foreground">
          Hi Maya.
        </h1>

        {/* Call notes recap */}
        <div className="mb-12">
          <CallNotesPreview variant="student" />
        </div>

        {/* Priorities */}
        <section className="mb-16">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Your next {priorities.length} {priorities.length === 1 ? "priority" : "priorities"}
          </h2>

          {priorities.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {priorities.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col justify-between rounded-md border border-border bg-card p-5"
                >
                  <p className="text-base font-medium text-foreground">
                    {p.label}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      From {ADAM_VIDEO.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActivePriorityId(p.id)}
                      className="text-sm text-foreground hover:text-brand-500 hover:underline"
                    >
                      Mark as closed →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              All current priorities closed. Patterns will emerge after your next call.
            </p>
          )}
        </section>

        {/* Trajectory */}
        <section className="mb-16">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Trajectory
          </h2>
          <p className="text-sm text-muted-foreground">
            {MAYA_DASHBOARD.trajectory}
          </p>
        </section>

        {/* Past calls */}
        <section>
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Past calls
          </h2>
          <div className="overflow-hidden rounded-md border border-border bg-card">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <Avatar variant="alumnus" name={ADAM_VIDEO.name} />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {ADAM_VIDEO.name}
                    <span className="ml-1.5 font-normal text-muted-foreground">
                      · {ADAM_VIDEO.role}, {ADAM_VIDEO.company}
                    </span>
                  </p>
                  <span className="mt-1 inline-block rounded-xs border border-border bg-card px-1.5 py-0.5 text-xs text-muted-foreground">
                    Career pivot
                  </span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Oct 12</span>
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      <GapClosureModal
        open={activePriority !== null}
        onClose={() => setActivePriorityId(null)}
        onConfirm={handleConfirm}
        priorityLabel={activePriority?.label ?? ""}
      />

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-md border border-border bg-card px-5 py-3 text-sm text-foreground shadow-md"
        >
          {toast}
        </div>
      )}
    </>
  );
}
