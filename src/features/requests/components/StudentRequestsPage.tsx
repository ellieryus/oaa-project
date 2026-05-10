"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

import { StudentNav } from "@/components/layout/StudentNav";
import { Avatar } from "@/components/shared/Avatar";
import { MOCK_REQUESTS } from "@/server/modules/students/student.mock";

type Filter = "all" | "pending" | "accepted" | "declined" | "completed";

const STATUS_DOT: Record<string, string> = {
  accepted: "bg-oaa-status-accepted-dot",
  pending:  "bg-oaa-muted",
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

export function RequestsPage() {
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
    <div className="min-h-screen bg-oaa-bg">
      <StudentNav active="requests" />

      <main className="mx-auto max-w-[1200px] px-8 py-12">
        {/* Header */}
        <p className="mb-4 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
          15 · Requests
        </p>
        <div className="mb-6 flex items-baseline gap-4">
          <h1 className="font-sans text-[40px] font-semibold leading-[1.05] tracking-[-0.01em] text-oaa-ink">
            My requests
          </h1>
          <span className="font-mono text-[18px] text-oaa-muted">
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
              className={`inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-[13px] transition-colors ${
                filter === key
                  ? "border-oaa-clay bg-oaa-clay-tint-bg text-oaa-clay font-medium"
                  : "border-oaa-hairline bg-white text-oaa-muted hover:border-oaa-ink/30 hover:text-oaa-ink"
              }`}
            >
              {label}
              <span className="font-mono text-[11px]">{counts[key]}</span>
            </button>
          ))}
        </div>

        {/* Request rows */}
        <div className="overflow-hidden rounded-md border border-oaa-hairline bg-white">
          {visible.map((req, i) => (
            <Link
              key={req.id}
              href={`/requests/${req.id}`}
              className={`flex items-center justify-between px-6 py-5 transition-colors hover:bg-oaa-bg ${
                i > 0 ? "border-t border-oaa-hairline" : ""
              }`}
            >
              {/* Left: avatar + name + meta */}
              <div className="flex items-center gap-4">
                <Avatar variant="alumnus" name={req.alumniName} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-semibold text-oaa-ink">
                      {req.alumniName}
                    </p>
                    <span className="text-[13px] text-oaa-muted">
                      · {req.alumniRole}, {req.alumniCompany}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                    <span className="rounded-xs border border-oaa-hairline bg-white px-2 py-0.5 text-[11px] text-oaa-muted">
                      {req.topic}
                    </span>
                    <span className="text-[12px] text-oaa-muted">
                      {statusMeta(req)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: status pill + chevron */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-oaa-hairline bg-white px-2.5 py-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[req.status]}`} />
                  <span className="text-[12px] text-oaa-ink">
                    {STATUS_LABEL[req.status]}
                  </span>
                </span>
                <ChevronRight
                  className="h-4 w-4 text-oaa-muted"
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

export default RequestsPage;
