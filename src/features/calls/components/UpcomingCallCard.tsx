import { Avatar } from "@/components/shared/Avatar";
import { ClayHighlightCard } from "@/components/shared/ClayHighlightCard";
import type { InboxRequest } from "@/features/requests/types";

type Props = {
  request: InboxRequest;
  isImminent?: boolean;
};

const INNER = "px-4 py-4";

export function UpcomingCallCard({ request, isImminent }: Props) {
  const { student, topic, scheduledTime } = request;

  // scheduledTime format: "FRI MAY 1 · 5:00 PM EDT"
  const parts = (scheduledTime ?? "").split(" · ");
  const datePart = parts[0] ?? "";
  const timePart = parts[1] ?? "";

  const inner = (
    <>
      <p
        className={`font-mono text-[10px] tracking-[0.08em] uppercase ${
          isImminent ? "text-[color:var(--oaa-clay)]" : "text-oaa-muted"
        }`}
      >
        {datePart}
      </p>
      <p className="mt-1 text-[15px] font-semibold text-oaa-ink">{timePart}</p>

      <div className="mt-3 flex items-center gap-2">
        <Avatar variant="student" name={student.name} size="sm" />
        <div>
          <p className="text-[13px] font-medium text-oaa-ink">{student.name}</p>
          <p className="text-[12px] text-oaa-muted">{topic}</p>
        </div>
      </div>
    </>
  );

  if (isImminent) {
    return <ClayHighlightCard className={INNER}>{inner}</ClayHighlightCard>;
  }

  return (
    <div className={`rounded-md border border-oaa-hairline bg-white ${INNER}`}>{inner}</div>
  );
}
