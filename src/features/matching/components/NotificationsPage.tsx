"use client";

import { useState } from "react";

import { StudentNav } from "@/components/layout/StudentNav";
import { NotificationRow } from "@/features/matching/components/NotificationRow";
import { EmptyState } from "@/components/feedback/EmptyState";
import { MOCK_NOTIFICATIONS, UNREAD_COUNT } from "@/server/modules/matching/matching.mock";
import { cn } from "@/lib/utils";

type FilterKey = "all" | "unread";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
];

export function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const notifications =
    activeFilter === "unread"
      ? MOCK_NOTIFICATIONS.filter((n) => n.unread)
      : MOCK_NOTIFICATIONS;

  return (
    <>
      <StudentNav active="notifications" notificationCount={UNREAD_COUNT} />

      <main className="mx-auto max-w-[1200px] px-8 pb-32 pt-12">
        <div className="mb-8 flex items-center gap-4">
          <h1 className="font-sans text-[40px] font-semibold leading-[1.05] tracking-[-0.01em] text-oaa-ink">
            Notifications
          </h1>
          {UNREAD_COUNT > 0 && (
            <span className="rounded-full bg-oaa-clay px-2.5 py-0.5 font-mono text-[11px] leading-none text-white">
              {UNREAD_COUNT} unread
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

        {/* Notification list */}
        {notifications.length > 0 ? (
          <div className="rounded-md border border-oaa-hairline bg-white">
            {notifications.map((notif) => (
              <NotificationRow key={notif.id} notification={notif} />
            ))}
          </div>
        ) : (
          <EmptyState
            heading="You're all caught up."
            subtitle="New notifications will appear here."
          />
        )}
      </main>
    </>
  );
}

export default NotificationsPage;
