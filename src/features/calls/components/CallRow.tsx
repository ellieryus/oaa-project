import Link from "next/link";
import { Video } from "lucide-react";

import { ClayHighlightCard } from "@/components/shared/ClayHighlightCard";
import { Avatar } from "@/components/shared/Avatar";
import type { MockRequest } from "@/features/student/types";

type Props = {
  request: MockRequest;
};

export function CallRow({ request }: Props) {
  const {
    id,
    alumniName,
    alumniRole,
    alumniCompany,
    topic,
    callState,
    callTimeDisplay,
    callStatusLabel,
    platform,
  } = request;

  const timeParts = (callTimeDisplay ?? "").split(" · ");
  const datePart = timeParts[0] ?? "";
  const timePart = timeParts[1] ?? "";

  if (callState === "live") {
    return (
      <ClayHighlightCard className="flex items-center justify-between gap-4 px-6 py-5">
        <div className="flex items-center gap-4">
          <Avatar variant="alumnus" name={alumniName} />
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[15px] font-semibold text-oaa-ink">{alumniName}</p>
              <span className="rounded-xs border border-[color:var(--oaa-clay)] px-2 py-0.5 font-mono text-[10px] tracking-[0.06em] uppercase text-oaa-clay">
                {callStatusLabel ?? "Live now"}
              </span>
            </div>
            <p className="text-[13px] text-oaa-muted">
              {alumniRole} · {alumniCompany}
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-oaa-muted">
              {datePart}{timePart ? ` · ${timePart}` : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[13px] text-oaa-muted">{topic}</span>
          <a
            href="#"
            className="flex items-center gap-1.5 rounded-sm bg-oaa-clay px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-oaa-clay/90"
          >
            <Video className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
            Join call
          </a>
        </div>
      </ClayHighlightCard>
    );
  }

  if (callState === "tomorrow") {
    return (
      <div className="flex items-center justify-between gap-4 rounded-md border border-oaa-hairline bg-white px-6 py-5">
        <div className="flex items-center gap-4">
          <Avatar variant="alumnus" name={alumniName} />
          <div>
            <p className="text-[15px] font-semibold text-oaa-ink">{alumniName}</p>
            <p className="text-[13px] text-oaa-muted">
              {alumniRole} · {alumniCompany}
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-oaa-muted">
              {datePart}{timePart ? ` · ${timePart}` : ""}
              {platform ? ` · ${platform}` : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[13px] text-oaa-muted">{topic}</span>
          <Link
            href={`/requests/${id}`}
            className="rounded-sm border border-oaa-hairline bg-white px-4 py-2 text-[13px] text-oaa-ink transition-colors hover:border-oaa-ink/30"
          >
            View
          </Link>
        </div>
      </div>
    );
  }

  // "soon" state — show .ics download button
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-oaa-hairline bg-white px-6 py-5">
      <div className="flex items-center gap-4">
        <Avatar variant="alumnus" name={alumniName} />
        <div>
          <p className="text-[15px] font-semibold text-oaa-ink">{alumniName}</p>
          <p className="text-[13px] text-oaa-muted">
            {alumniRole} · {alumniCompany}
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-oaa-muted">
            {datePart}{timePart ? ` · ${timePart}` : ""}
            {platform ? ` · ${platform}` : ""}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[13px] text-oaa-muted">{topic}</span>
        <button
          type="button"
          className="rounded-sm border border-oaa-hairline bg-white px-4 py-2 text-[13px] text-oaa-muted transition-colors hover:border-oaa-ink/30 hover:text-oaa-ink"
        >
          Add to calendar
        </button>
      </div>
    </div>
  );
}
