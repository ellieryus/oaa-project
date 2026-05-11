"use client";

import { use } from "react";
import Link from "next/link";

import { BackHeader } from "@/components/oaa/BackHeader";
import { Avatar } from "@/components/oaa/Avatar";
import { PrimaryLink } from "@/components/oaa/buttons";
import { alumnusNotesStore } from "@/lib/alumnus-notes-store";

type Props = { params: Promise<{ studentId: string }> };

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function PastStudentDetailPage({ params }: Props) {
  const { studentId } = use(params);
  const entry = alumnusNotesStore.getAll().find((e) => e.studentId === studentId);

  if (!entry) return null;

  return (
    <div className="min-h-screen bg-background">
      <BackHeader
        backHref="/past-students"
        backLabel="Back to past students"
        rightContent={<Avatar variant="alumnus-self" name="Adam Farouk" size="sm" />}
      />

      <main className="mx-auto max-w-[720px] px-8 pt-10 pb-16">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold leading-[1.15] text-foreground">
            {entry.studentName}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {entry.studentProgram} · {entry.studentCohort} · {formatDate(entry.savedAt)}
          </p>
        </div>

        {/* Context strip */}
        <div className="mb-6 rounded-md border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <span className="rounded-xs border border-border bg-card px-2 py-0.5 text-xs text-foreground">
              {entry.topic}
            </span>
            {entry.reflectionStatus === "unreflected" && (
              <span className="rounded-xs bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-500">
                Needs reflection
              </span>
            )}
          </div>
        </div>

        {/* Note cards */}
        <div className="flex flex-col gap-4">
          {/* What stood out */}
          <div className="rounded-md border border-border bg-card p-6">
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              What stood out
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              {entry.standout || "—"}
            </p>
          </div>

          {/* Hiring signal */}
          <div className="rounded-md border border-border bg-card p-6">
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              Hiring signal
            </p>
            <p className="text-sm font-semibold text-foreground">
              {entry.hiringSignal || "—"}
            </p>
          </div>

          {/* Private notes */}
          <div className="rounded-md border border-border bg-card p-6">
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              Private notes
            </p>
            <p className="text-sm leading-relaxed italic text-foreground">
              {entry.privateNotes || "—"}
            </p>
          </div>
        </div>

        {/* Unreflected CTA */}
        {entry.reflectionStatus === "unreflected" && (
          <div className="mt-6 rounded-md border border-brand-200 bg-brand-50 p-5">
            <p className="mb-3 text-sm text-foreground">
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
