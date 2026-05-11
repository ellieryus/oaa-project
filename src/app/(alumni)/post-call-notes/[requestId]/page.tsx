"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

import { BackHeader } from "@/components/oaa/BackHeader";
import { Avatar } from "@/components/oaa/Avatar";
import { PrimaryButton } from "@/components/oaa/buttons";
import { getInboxRequest } from "@/lib/mock-inbox";
import { alumnusNotesStore } from "@/lib/alumnus-notes-store";

type Props = { params: Promise<{ requestId: string }> };

const HIRING_SIGNAL_OPTIONS = [
  "I'd refer this person",
  "Strong candidate — keep an eye on",
  "Promising — needs more experience",
  "Not a fit for my network",
  "Too early to tell",
];

export default function PostCallNotesPage({ params }: Props) {
  const { requestId } = use(params);

  // Primary lookup: inbox request (e.g. inbox-maya)
  const inboxReq = getInboxRequest(requestId);
  // Fallback: alumnus notes store entry by studentId (e.g. aisha-patel)
  const allNotes = alumnusNotesStore.getAll();
  const storeEntry = !inboxReq
    ? allNotes.find((e) => e.studentId === requestId)
    : undefined;

  // Derive display fields from whichever source resolved
  const studentName = inboxReq?.student.name ?? storeEntry?.studentName ?? "";
  const studentProgram = inboxReq?.student.program ?? storeEntry?.studentProgram ?? "";
  const studentCohort = inboxReq?.student.cohort ?? storeEntry?.studentCohort ?? "";
  const topic = inboxReq?.topic ?? storeEntry?.topic ?? "";
  const scheduledTime = inboxReq?.scheduledTime;

  const router = useRouter();
  const [standout, setStandout] = useState(storeEntry?.standout ?? "");
  const [hiringSignal, setHiringSignal] = useState<string | null>(storeEntry?.hiringSignal || null);
  const [privateNotes, setPrivateNotes] = useState(storeEntry?.privateNotes ?? "");

  // Guard: if neither source found, render nothing
  if (!inboxReq && !storeEntry) return null;

  function handleSave() {
    alumnusNotesStore.add({
      studentId: requestId,
      studentName,
      studentProgram,
      studentCohort,
      topic,
      standout,
      hiringSignal: hiringSignal ?? "",
      privateNotes,
      savedAt: new Date(),
    });
    router.push("/past-students");
  }

  return (
    <div className="min-h-screen bg-background">
      <BackHeader
        backHref={inboxReq ? `/inbox/${requestId}` : "/past-students"}
        backLabel={inboxReq ? "Back to request" : "Back to past students"}
        rightContent={
          <Avatar variant="alumnus-self" name="Adam Farouk" size="sm" />
        }
      />

      <main className="mx-auto max-w-[720px] px-8 pt-10 pb-24">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold leading-[1.15] text-foreground">
            How did the call go?
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            These notes are private to you.
          </p>
        </div>

        {/* Context strip */}
        <div className="mb-10 rounded-md border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar variant="student" name={studentName} size="md" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {studentName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {studentProgram} · {studentCohort}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-xs border border-border bg-card px-2 py-0.5 text-xs text-foreground">
                {topic}
              </span>
              {scheduledTime && (
                <span className="text-xs text-muted-foreground">
                  {scheduledTime}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Section 1 — What stood out */}
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            What stood out?
          </p>
          <textarea
            className="mt-3 w-full resize-none rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:border-brand-500 focus:outline-none"
            rows={4}
            placeholder="Strong communicator. Clear on goals. Would refer once she has more projects under her belt."
            value={standout}
            onChange={(e) => setStandout(e.target.value)}
          />
        </div>

        {/* Section 2 — Hiring signal */}
        <div className="mt-10">
          <p className="text-xs font-medium text-muted-foreground">
            Hiring signal?
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {HIRING_SIGNAL_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setHiringSignal(opt)}
                className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left text-sm leading-normal transition-colors ${
                  hiringSignal === opt
                    ? "border-brand-200 bg-brand-50 text-foreground"
                    : "border-border bg-card text-foreground hover:border-brand-500"
                }`}
              >
                <span>{opt}</span>
                {hiringSignal === opt && (
                  <Check
                    className="ml-3 h-4 w-4 shrink-0 text-brand-500"
                    strokeWidth={2}
                    aria-hidden
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Section 3 — Private notes */}
        <div className="mt-10">
          <p className="text-xs font-medium text-muted-foreground">
            Private notes
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Only you see this.</p>
          <textarea
            className="mt-3 w-full resize-none rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:border-brand-500 focus:outline-none"
            rows={4}
            placeholder="Add a private note&hellip;"
            value={privateNotes}
            onChange={(e) => setPrivateNotes(e.target.value)}
          />
        </div>
      </main>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-border bg-card px-8 py-4">
        <div className="mx-auto flex max-w-[720px] items-center justify-end">
          <PrimaryButton
            type="button"
            onClick={handleSave}
            disabled={!hiringSignal}
          >
            Save to past students
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
