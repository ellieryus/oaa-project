import Link from "next/link";

import { Avatar } from "@/components/shared/Avatar";
import type { InboxRequest } from "@/features/requests/types";

type Props = {
  request: InboxRequest;
};

export function InboxRowHome({ request }: Props) {
  const { id, student, topic, dueInHours } = request;

  return (
    <Link
      href={`/inbox/${id}`}
      className="flex items-center gap-4 rounded-md border border-oaa-hairline bg-white px-4 py-3.5 transition-colors hover:border-oaa-ink/20"
    >
      <Avatar variant="student" name={student.name} size="sm" className="shrink-0" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold text-oaa-ink">{student.name}</p>
        <p className="text-[12px] text-oaa-muted">{student.cohort}</p>
      </div>

      <span className="hidden shrink-0 text-[13px] text-oaa-muted sm:block">{topic}</span>

      {dueInHours > 0 && (
        <span className="shrink-0 rounded-full bg-oaa-status-pending-bg px-2.5 py-1 font-mono text-[10px] tracking-[0.04em] text-oaa-status-pending-dot">
          Due in {dueInHours}h
        </span>
      )}

      <span className="shrink-0 rounded-sm border border-oaa-hairline bg-white px-3 py-1.5 text-[12px] font-medium text-oaa-ink">
        Open
      </span>
    </Link>
  );
}
