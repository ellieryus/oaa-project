"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Avatar } from "@/components/oaa/Avatar";
import { reflectionStore } from "@/lib/reflection-store";
import type { ReflectionEntry } from "@/lib/reflection-store";

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
      <div className="mt-4 rounded-md border border-dashed border-border bg-card px-6 py-5">
        <p className="mb-1 text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
          Coming soon
        </p>
        <h3 className="text-[20px] font-semibold text-foreground">
          Contact again
        </h3>
        <p className="mt-1 text-[14px] text-muted-foreground">
          After your first call, alumni you've talked to will live here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-sans text-[20px] font-semibold leading-[1.2] text-foreground">
          Contact again
        </h2>
        <Link
          href="/past-contacts"
          className="flex items-center gap-1 text-[13px] text-brand-500 hover:underline"
        >
          See all past contacts
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        </Link>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-card">
        {entries.map((entry, i) => (
          <div
            key={`${entry.alumniId}-${entry.savedAt.getTime()}`}
            className={`flex items-center justify-between px-5 py-4 transition-colors hover:bg-background ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <Avatar variant="alumnus" name={entry.alumniName} size="sm" />
              <div>
                <p className="text-[14px] font-semibold text-foreground">
                  {entry.alumniName}
                  <span className="ml-1.5 font-normal text-muted-foreground">
                    · {entry.alumniRole}, {entry.alumniCompany}
                  </span>
                </p>
                <span className="mt-1 inline-block rounded-xs border border-border bg-card px-1.5 py-0.5 text-[11px] text-muted-foreground">
                  {entry.topic}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[12px] text-muted-foreground">
                {formatDate(entry.savedAt)}
              </span>
              <Link
                href={`/alumni/${entry.alumniId}`}
                className="text-[13px] text-brand-500 hover:underline"
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
