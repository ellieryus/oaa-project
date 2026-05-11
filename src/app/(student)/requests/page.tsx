"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

import { StudentNav } from "@/components/oaa/StudentNav";
import { Avatar } from "@/components/oaa/Avatar";
import { MOCK_REQUESTS } from "@/lib/mock-student";

type Filter = "all" | "pending" | "accepted" | "declined" | "completed";

const STATUS_DOT: Record<string, string> = {
  accepted: "bg-oaa-status-accepted-dot",
  pending:  "bg-neutral-400",
  declined: "bg-oaa-status-declined-dot",
  completed:"bg-oaa-status-completed-dot",
};

const STATUS_LABEL: Record<string, string> = {
  accepted: "Accepted",
  pending:  "Pending",
  declined: "Declined",
  completed:"Completed",
};


function statusMeta(req: typeof MOCK_REQUESTS[0]): string {
  switch (req.status) {
    case "accepted": return "Accepted yesterday · Add to calendar";
    case "pending":  return "Sent 2h ago · Awaiting response · 22h left";
    case "declined": return "Declined 2 days ago · Read note";
    case "completed":return "Completed 3 days ago";
    default: return "";
  }
}

export default function RequestsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = {
    all:       MOCK_REQUESTS.length,
    pending:   MOCK_REQUESTS.filter(r => r.status === "pending").length,
    accepted:  MOCK_REQUESTS.filter(r => r.status === "accepted").length,
    declined:  MOCK_REQUESTS.filter(r => r.status === "declined").length,
    completed: MOCK_REQUESTS.filter(r => r.status === "completed").length,
  };

  const visible = filter === "all"
    ? MOCK_REQUESTS
    : MOCK_REQUESTS.filter(r => r.status === filter);

  const filters: { key: Filter; label: string }[] = [
    { key: "all",       label: "All" },
    { key: "pending",   label: "Pending" },
    { key: "accepted",  label: "Accepted" },
    { key: "declined",  label: "Declined" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <StudentNav active="requests" />

      <main className="mx-auto max-w-[1200px] px-8 py-12">
        {/* Header */}
        <div className="mb-6 flex items-baseline gap-4">
          <h1 className="text-4xl font-semibold leading-[1.05] text-foreground">
            My requests
          </h1>
          <span className="text-lg text-muted-foreground">
            {counts.all} total
          </span>
        </div>

        {/* Filter tabs */}
        <div className="mb-6 flex gap-2">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors ${
                filter === key
                  ? "border-brand-500 bg-brand-50 text-brand-500 font-medium"
                  : "border-border bg-card text-muted-foreground hover:border-brand-500 hover:text-foreground"
              }`}
            >
              {label}
              <span className="text-xs">{counts[key]}</span>
            </button>
          ))}
        </div>

        {/* Request rows */}
        <div className="overflow-hidden rounded-md border border-border bg-card">
          {visible.map((req, i) => (
            <Link
              key={req.id}
              href={`/requests/${req.id}`}
              className={`flex items-center justify-between px-6 py-5 transition-colors hover:bg-background ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              {/* Left: avatar + name + meta */}
              <div className="flex items-center gap-4">
                <Avatar variant="alumnus" name={req.alumniName} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      {req.alumniName}
                    </p>
                    <span className="text-sm text-muted-foreground">
                      · {req.alumniRole}, {req.alumniCompany}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                    <span className="rounded-xs border border-border bg-card px-2 py-0.5 text-xs text-muted-foreground">
                      {req.topic}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {statusMeta(req)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: status pill + chevron */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[req.status]}`} />
                  <span className="text-xs text-foreground">
                    {STATUS_LABEL[req.status]}
                  </span>
                </span>
                <ChevronRight
                  className="h-4 w-4 text-muted-foreground"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
