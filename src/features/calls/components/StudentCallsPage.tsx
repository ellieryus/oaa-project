"use client";

import { useState } from "react";

import { StudentNav } from "@/components/layout/StudentNav";
import { CallRow } from "@/features/calls/components/CallRow";
import { EmptyState } from "@/components/feedback/EmptyState";
import { MOCK_REQUESTS } from "@/server/modules/students/student.mock";
import { UNREAD_COUNT } from "@/server/modules/matching/matching.mock";
import { cn } from "@/lib/utils";

type TabKey = "upcoming" | "past";

const TABS: { key: TabKey; label: string }[] = [
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
];

const upcomingCalls = MOCK_REQUESTS.filter((r) => r.callState !== undefined);
const pastCalls = MOCK_REQUESTS.filter(
  (r) => r.status === "completed" && r.callState === undefined,
);

export function CallsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");

  const calls = activeTab === "upcoming" ? upcomingCalls : pastCalls;

  return (
    <>
      <StudentNav active="calls" notificationCount={UNREAD_COUNT} />

      <main className="mx-auto max-w-[1200px] px-8 pb-32 pt-12">
        <h1 className="mb-8 font-sans text-[40px] font-semibold leading-[1.05] tracking-[-0.01em] text-oaa-ink">
          Calls
        </h1>

        {/* Tabs */}
        <div className="mb-6 flex items-center gap-1 border-b border-oaa-hairline">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-4 py-2.5 text-[14px] transition-colors",
                activeTab === tab.key
                  ? "border-b-2 border-oaa-ink font-medium text-oaa-ink"
                  : "text-oaa-muted hover:text-oaa-ink",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Call list */}
        {calls.length > 0 ? (
          <div className="flex flex-col gap-2">
            {calls.map((call) => (
              <CallRow key={call.id} request={call} />
            ))}
          </div>
        ) : (
          <EmptyState
            heading="No calls yet."
            subtitle="Once an alumni accepts your request, your call will appear here."
            ctaLabel="Browse matches"
            ctaHref="/matches"
          />
        )}
      </main>
    </>
  );
}

export default CallsPage;
