"use client";

import { useState } from "react";

import { AlumnusNav } from "@/components/oaa/AlumnusNav";
import { InboxRowFull } from "@/components/oaa/InboxRowFull";
import { EmptyState } from "@/components/oaa/EmptyState";
import { INBOX_REQUESTS, PENDING_REQUESTS } from "@/lib/mock-inbox";
import { cn } from "@/lib/utils";
import type { InboxRequest } from "@/lib/mock-inbox";

type FilterKey = "all" | "pending" | "within-scope" | "scope-check";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "within-scope", label: "Within scope" },
  { key: "scope-check", label: "Scope check" },
];

function applyFilter(requests: InboxRequest[], filter: FilterKey): InboxRequest[] {
  if (filter === "all") return requests;
  if (filter === "pending") return requests.filter((r) => r.status === "pending");
  if (filter === "within-scope") return requests.filter((r) => r.scopeStatus === "within-scope");
  if (filter === "scope-check") return requests.filter((r) => r.scopeStatus === "scope-check");
  return requests;
}

export default function InboxAllPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const filtered = applyFilter(INBOX_REQUESTS, activeFilter);

  return (
    <>
      <AlumnusNav active="inbox" unreadCount={PENDING_REQUESTS.length} />

      <main className="mx-auto max-w-[1200px] px-8 pb-32 pt-12">
        {/* Page heading */}
        <div className="mb-8 flex items-center gap-4">
          <h1 className="text-4xl font-semibold leading-[1.05] text-foreground">
            Inbox
          </h1>
          {PENDING_REQUESTS.length > 0 && (
            <span className="rounded-full bg-brand-500 px-2.5 py-0.5 text-xs leading-none text-white">
              {PENDING_REQUESTS.length} pending
            </span>
          )}
        </div>

        {/* Filter tabs */}
        <div className="mb-6 flex items-center gap-1 border-b border-border">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={cn(
                "px-4 py-2.5 text-sm transition-colors",
                activeFilter === f.key
                  ? "border-b-2 border-foreground font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Request list */}
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-2">
            {filtered.map((req) => (
              <InboxRowFull key={req.id} request={req} />
            ))}
          </div>
        ) : (
          <EmptyState
            heading="No requests match this filter."
            subtitle="Try a different filter to see more requests."
          />
        )}
      </main>
    </>
  );
}
