import Link from "next/link";
import { Video } from "lucide-react";

import { ClayHighlightCard } from "@/components/oaa/ClayHighlightCard";
import { Avatar } from "@/components/oaa/Avatar";
import type { MockRequest } from "@/lib/mock-student";

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
              <p className="text-[15px] font-semibold text-foreground">{alumniName}</p>
              <span className="rounded-xs border border-[color:var(--brand-500)] px-2 py-0.5 text-[10px] tracking-[0.06em] uppercase text-brand-500">
                {callStatusLabel ?? "Live now"}
              </span>
            </div>
            <p className="text-[13px] text-muted-foreground">
              {alumniRole} · {alumniCompany}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {datePart}{timePart ? ` · ${timePart}` : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[13px] text-muted-foreground">{topic}</span>
          <a
            href="#"
            className="flex items-center gap-1.5 rounded-md bg-brand-500 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-brand-600"
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
      <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-card px-6 py-5">
        <div className="flex items-center gap-4">
          <Avatar variant="alumnus" name={alumniName} />
          <div>
            <p className="text-[15px] font-semibold text-foreground">{alumniName}</p>
            <p className="text-[13px] text-muted-foreground">
              {alumniRole} · {alumniCompany}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {datePart}{timePart ? ` · ${timePart}` : ""}
              {platform ? ` · ${platform}` : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[13px] text-muted-foreground">{topic}</span>
          <Link
            href={`/requests/${id}`}
            className="rounded-md border border-border bg-card px-4 py-2 text-[13px] text-foreground transition-colors hover:border-brand-500"
          >
            View
          </Link>
        </div>
      </div>
    );
  }

  // "soon" state — show .ics download button
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-card px-6 py-5">
      <div className="flex items-center gap-4">
        <Avatar variant="alumnus" name={alumniName} />
        <div>
          <p className="text-[15px] font-semibold text-foreground">{alumniName}</p>
          <p className="text-[13px] text-muted-foreground">
            {alumniRole} · {alumniCompany}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {datePart}{timePart ? ` · ${timePart}` : ""}
            {platform ? ` · ${platform}` : ""}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[13px] text-muted-foreground">{topic}</span>
        <button
          type="button"
          className="rounded-md border border-border bg-card px-4 py-2 text-[13px] text-muted-foreground transition-colors hover:border-brand-500 hover:text-foreground"
        >
          Add to calendar
        </button>
      </div>
    </div>
  );
}
