"use client";

import { use } from "react";
import Link from "next/link";

import { BackHeader } from "@/components/layout/BackHeader";
import { Avatar } from "@/components/shared/Avatar";
import { PrimaryLink } from "@/components/shared/buttons";
import { alumnusNotesStore } from "@/features/alumni/services/alumnus-notes.store";

type Props = { params: Promise<{ studentId: string }> };

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function PastStudentDetailPage({ params }: Props) {
  const { studentId } = use(params);
  const entry = alumnusNotesStore.getAll().find((e) => e.studentId === studentId);

  if (!entry) return null;

  return (
    <div className="min-h-screen bg-oaa-bg">
      <BackHeader
        backHref="/past-students"
        backLabel="Back to past students"
        rightContent={<Avatar variant="alumnus-self" name="Adam Farouk" size="sm" />}
      />

      <main className="mx-auto max-w-[720px] px-8 pt-10 pb-16">
        {/* Page header */}
        <div className="mb-8">
          <p className="mb-2 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
            Past student
          </p>
          <h1 className="text-[40px] font-semibold leading-[1.15] tracking-[-0.01em] text-oaa-ink">
            {entry.studentName}
          </h1>
          <p className="mt-2 text-[14px] text-oaa-muted">
            {entry.studentProgram} · {entry.studentCohort} · {formatDate(entry.savedAt)}
          </p>
        </div>

        {/* Context strip */}
        <div className="mb-6 rounded-md border border-oaa-hairline bg-white p-5">
          <div className="flex items-center gap-3">
            <span className="rounded-xs border border-oaa-hairline bg-white px-2 py-0.5 text-[12px] text-oaa-ink">
              {entry.topic}
            </span>
            {entry.reflectionStatus === "unreflected" && (
              <span className="rounded-xs bg-oaa-clay-tint-bg px-2 py-0.5 font-mono text-[10px] tracking-[0.06em] uppercase text-oaa-clay">
                Needs reflection
              </span>
            )}
          </div>
        </div>

        {/* Note cards */}
        <div className="flex flex-col gap-4">
          {/* What stood out */}
          <div className="rounded-md border border-oaa-hairline bg-white p-6">
            <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
              What stood out
            </p>
            <p className="text-[15px] leading-[1.6] text-oaa-ink">
              {entry.standout || "—"}
            </p>
          </div>

          {/* Hiring signal */}
          <div className="rounded-md border border-oaa-hairline bg-white p-6">
            <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
              Hiring signal
            </p>
            <p className="text-[15px] font-semibold text-oaa-ink">
              {entry.hiringSignal || "—"}
            </p>
          </div>

          {/* Private notes */}
          <div className="rounded-md border border-oaa-hairline bg-white p-6">
            <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
              Private notes
            </p>
            <p className="text-[15px] leading-[1.6] italic text-oaa-ink">
              {entry.privateNotes || "—"}
            </p>
          </div>
        </div>

        {/* Unreflected CTA */}
        {entry.reflectionStatus === "unreflected" && (
          <div className="mt-6 rounded-md border border-oaa-clay-tint-border bg-oaa-clay-tint-bg p-5">
            <p className="mb-3 text-[14px] text-oaa-ink">
              You haven&rsquo;t added notes for this student yet.
            </p>
            <PrimaryLink href={`/post-call-notes/${entry.studentId}`}>
              Add notes →
            </PrimaryLink>
          </div>
        )}
      </main>
    </div>
  );
}

export default PastStudentDetailPage;
