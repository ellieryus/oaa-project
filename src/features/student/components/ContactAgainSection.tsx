"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Avatar } from "@/components/shared/Avatar";
import { reflectionStore } from "@/features/student/services/reflection.store";
import type { ReflectionEntry } from "@/features/student/services/reflection.store";

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ContactAgainSection() {
  const [entries, setEntries] = useState<ReflectionEntry[]>(() =>
    reflectionStore.getAll(),
  );

  useEffect(() => {
    return reflectionStore.subscribe(() =>
      setEntries([...reflectionStore.getAll()]),
    );
  }, []);

  if (entries.length === 0) {
    return (
      <div className="mt-4 rounded-md border border-dashed border-oaa-hairline bg-white px-6 py-5">
        <p className="mb-1 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
          Coming soon
        </p>
        <h3 className="text-[20px] font-semibold text-oaa-ink">
          Contact again
        </h3>
        <p className="mt-1 text-[14px] text-oaa-muted">
          After your first call, alumni you've talked to will live here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-sans text-[20px] font-semibold leading-[1.2] text-oaa-ink">
          Contact again
        </h2>
        <Link
          href="/past-contacts"
          className="flex items-center gap-1 text-[13px] text-oaa-clay hover:underline"
        >
          See all past contacts
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        </Link>
      </div>

      <div className="overflow-hidden rounded-md border border-oaa-hairline bg-white">
        {entries.map((entry, i) => (
          <div
            key={`${entry.alumniId}-${entry.savedAt.getTime()}`}
            className={`flex items-center justify-between px-5 py-4 transition-colors hover:bg-oaa-bg ${
              i > 0 ? "border-t border-oaa-hairline" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <Avatar variant="alumnus" name={entry.alumniName} size="sm" />
              <div>
                <p className="text-[14px] font-semibold text-oaa-ink">
                  {entry.alumniName}
                  <span className="ml-1.5 font-normal text-oaa-muted">
                    · {entry.alumniRole}, {entry.alumniCompany}
                  </span>
                </p>
                <span className="mt-1 inline-block rounded-xs border border-oaa-hairline bg-white px-1.5 py-0.5 text-[11px] text-oaa-muted">
                  {entry.topic}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[12px] text-oaa-muted">
                {formatDate(entry.savedAt)}
              </span>
              <Link
                href={`/alumni/${entry.alumniId}`}
                className="text-[13px] text-oaa-clay hover:underline"
              >
                Contact again →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
