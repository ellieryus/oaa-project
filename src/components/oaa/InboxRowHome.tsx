import Link from "next/link";

import { Avatar } from "@/components/oaa/Avatar";
import type { InboxRequest } from "@/lib/mock-inbox";

type Props = {
  request: InboxRequest;
};

export function InboxRowHome({ request }: Props) {
  const { id, student, topic, dueInHours } = request;

  return (
    <Link
      href={`/inbox/${id}`}
      className="flex items-center gap-4 rounded-md border border-border bg-card px-4 py-3.5 transition-colors hover:border-brand-500"
    >
      <Avatar variant="student" name={student.name} size="sm" className="shrink-0" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold text-foreground">{student.name}</p>
        <p className="text-[12px] text-muted-foreground">{student.cohort}</p>
      </div>

      <span className="hidden shrink-0 text-[13px] text-muted-foreground sm:block">{topic}</span>

      {dueInHours > 0 && (
        <span className="shrink-0 rounded-full bg-oaa-status-pending-bg px-2.5 py-1 text-[10px] tracking-[0.04em] text-oaa-status-pending-dot">
          Due in {dueInHours}h
        </span>
      )}

      <span className="shrink-0 rounded-md border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-foreground">
        Open
      </span>
    </Link>
  );
}
