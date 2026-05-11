"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { AlumnusNav } from "@/components/oaa/AlumnusNav";
import { Avatar } from "@/components/oaa/Avatar";
import { EmptyState } from "@/components/oaa/EmptyState";
import { alumnusNotesStore } from "@/lib/alumnus-notes-store";
import type { AlumnusNoteEntry } from "@/lib/alumnus-notes-store";

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function PastStudentsPage() {
  const [entries, setEntries] = useState<AlumnusNoteEntry[]>(() =>
    alumnusNotesStore.getAll(),
  );

  useEffect(() => {
    return alumnusNotesStore.subscribe(() =>
      setEntries([...alumnusNotesStore.getAll()]),
    );
  }, []);

  return (
    <>
      <AlumnusNav active="past-students" />

      <main className="mx-auto max-w-[1200px] px-8 pb-32 pt-12">
        <h1 className="mb-8 text-4xl font-semibold leading-[1.05] text-foreground">
          Past students
        </h1>

        {entries.length > 0 ? (
          <div className="overflow-hidden rounded-md border border-border bg-card">
            {entries.map((entry, i) => (
              <div
                key={`${entry.studentName}-${entry.savedAt.getTime()}`}
                className={`flex items-center justify-between px-5 py-4 transition-colors hover:bg-background ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar variant="student" name={entry.studentName} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {entry.studentName}
                      <span className="ml-1.5 font-normal text-muted-foreground">
                        · {entry.studentProgram}, {entry.studentCohort}
                      </span>
                    </p>
                    <span className="mt-1 inline-block rounded-xs border border-border bg-card px-1.5 py-0.5 text-xs text-muted-foreground">
                      {entry.topic}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {entry.reflectionStatus === "unreflected" && (
                    <span className="rounded-xs bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-500">
                      Needs reflection
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {formatDate(entry.savedAt)}
                  </span>
                  {entry.reflectionStatus === "reflected" ? (
                    <Link
                      href={`/past-students/${entry.studentId}`}
                      className="text-sm text-foreground hover:underline"
                    >
                      View notes →
                    </Link>
                  ) : (
                    <Link
                      href={`/post-call-notes/${entry.studentId}`}
                      className="text-sm text-brand-500 hover:underline"
                    >
                      Reflect now →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            heading="No past students yet."
            subtitle="After a call, your notes will appear here."
          />
        )}
      </main>
    </>
  );
}
