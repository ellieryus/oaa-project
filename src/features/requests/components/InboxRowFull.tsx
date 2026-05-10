import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Avatar } from "@/components/shared/Avatar";
import { cn } from "@/lib/utils";
import type { InboxRequest } from "@/features/requests/types";

type Props = {
  request: InboxRequest;
};

export function InboxRowFull({ request }: Props) {
  const { id, student, topic, format, scopeStatus, askMessage, dueInHours } = request;
  const isScopeCheck = scopeStatus === "scope-check";

  return (
    <Link
      href={`/inbox/${id}`}
      className="flex items-stretch overflow-hidden rounded-md border border-oaa-hairline bg-white transition-colors hover:border-oaa-ink/20"
    >
      {/* Clay accent bar */}
      <div className="w-[3px] shrink-0 bg-oaa-clay" />

      <div className="flex flex-1 items-start justify-between gap-4 px-4 py-4">
        <div className="flex min-w-0 items-start gap-3">
          <Avatar variant="student" name={student.name} size="sm" className="mt-0.5 shrink-0" />

          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-oaa-ink">
              {student.name}
              <span className="ml-2 font-normal text-oaa-muted">{student.cohort}</span>
            </p>
            <p className="text-[12px] text-oaa-muted">{student.primaryAspiration}</p>
            <p className="mt-1.5 line-clamp-1 text-[13px] text-oaa-muted">{askMessage}</p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              <RowChip>{topic}</RowChip>
              <RowChip>{format}</RowChip>
              {isScopeCheck && <RowChip variant="warning">Scope check</RowChip>}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          {dueInHours > 0 && (
            <span className="rounded-full bg-oaa-status-pending-bg px-2.5 py-1 font-mono text-[10px] tracking-[0.04em] text-oaa-status-pending-dot">
              Due in {dueInHours}h
            </span>
          )}
          <ChevronRight className="h-4 w-4 text-oaa-muted" strokeWidth={1.5} aria-hidden />
        </div>
      </div>
    </Link>
  );
}

function RowChip({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "warning";
}) {
  return (
    <span
      className={cn(
        "rounded-xs border px-2 py-0.5 text-[11px]",
        variant === "warning"
          ? "border-oaa-clay-tint-border bg-oaa-clay-tint-bg text-oaa-clay"
          : "border-oaa-hairline bg-white text-oaa-muted",
      )}
    >
      {children}
    </span>
  );
}
