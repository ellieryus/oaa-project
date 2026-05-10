"use client";

import { useState } from "react";

import { AlumnusNav } from "@/components/layout/AlumnusNav";
import { InboxRowFull } from "@/features/requests/components/InboxRowFull";
import { EmptyState } from "@/components/feedback/EmptyState";
import { INBOX_REQUESTS, PENDING_REQUESTS } from "@/server/modules/requests/request.mock";
import { cn } from "@/lib/utils";
import type { InboxRequest } from "@/features/requests/types";

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

export function InboxAllPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const filtered = applyFilter(INBOX_REQUESTS, activeFilter);

  return (
    <>
      <AlumnusNav active="inbox" unreadCount={PENDING_REQUESTS.length} />

      <main className="mx-auto max-w-[1200px] px-8 pb-32 pt-12">
        {/* Page heading */}
        <div className="mb-8 flex items-center gap-4">
          <h1 className="font-sans text-[40px] font-semibold leading-[1.05] tracking-[-0.01em] text-oaa-ink">
            Inbox
          </h1>
          {PENDING_REQUESTS.length > 0 && (
            <span className="rounded-full bg-oaa-clay px-2.5 py-0.5 font-mono text-[11px] leading-none text-white">
              {PENDING_REQUESTS.length} pending
            </span>
          )}
        </div>

        {/* Filter tabs */}
        <div className="mb-6 flex items-center gap-1 border-b border-oaa-hairline">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={cn(
                "px-4 py-2.5 text-[14px] transition-colors",
                activeFilter === f.key
                  ? "border-b-2 border-oaa-ink font-medium text-oaa-ink"
                  : "text-oaa-muted hover:text-oaa-ink",
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

export default InboxAllPage;
