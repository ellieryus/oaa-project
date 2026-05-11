import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Avatar } from "@/components/oaa/Avatar";
import { cn } from "@/lib/utils";
import type { InboxRequest } from "@/lib/mock-inbox";

type Props = {
  request: InboxRequest;
};

export function InboxRowFull({ request }: Props) {
  const { id, student, topic, format, scopeStatus, askMessage, dueInHours } = request;
  const isScopeCheck = scopeStatus === "scope-check";

  return (
    <Link
      href={`/inbox/${id}`}
      className="flex items-stretch overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-brand-500"
    >
      {/* Clay accent bar */}
      <div className="w-[3px] shrink-0 bg-brand-500" />

      <div className="flex flex-1 items-start justify-between gap-4 px-4 py-4">
        <div className="flex min-w-0 items-start gap-3">
          <Avatar variant="student" name={student.name} size="sm" className="mt-0.5 shrink-0" />

          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-foreground">
              {student.name}
              <span className="ml-2 font-normal text-muted-foreground">{student.cohort}</span>
            </p>
            <p className="text-[12px] text-muted-foreground">{student.primaryAspiration}</p>
            <p className="mt-1.5 line-clamp-1 text-[13px] text-muted-foreground">{askMessage}</p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              <RowChip>{topic}</RowChip>
              <RowChip>{format}</RowChip>
              {isScopeCheck && <RowChip variant="warning">Scope check</RowChip>}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          {dueInHours > 0 && (
            <span className="rounded-full bg-oaa-status-pending-bg px-2.5 py-1 text-[10px] tracking-[0.04em] text-oaa-status-pending-dot">
              Due in {dueInHours}h
            </span>
          )}
          <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />
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
          ? "border-brand-200 bg-brand-50 text-brand-500"
          : "border-border bg-card text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}
