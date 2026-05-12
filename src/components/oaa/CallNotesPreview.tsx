import Link from "next/link";
import { FileText } from "lucide-react";

import { Avatar } from "@/components/oaa/Avatar";
import { MAYA_IN_CALL } from "@/lib/mock-video";

type Variant = "student" | "alumnus";

type Props = {
  variant: Variant;
};

export function CallNotesPreview({ variant }: Props) {
  const data = MAYA_IN_CALL;

  // Frame the card differently per role
  const otherParty =
    variant === "student" ? data.participants.other : data.participants.self;
  const otherPartyName = otherParty.name;
  const otherPartyVariant = variant === "student" ? "alumnus" : "student";

  // Top 2 topics covered (most recent)
  const previewTopics = data.aiNotes.topicsCovered.slice(0, 3);

  return (
    <Link
      href={`/call/${data.requestId}`}
      className="block rounded-md border border-border bg-card p-5 transition-colors hover:border-foreground/30"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar variant={otherPartyVariant} name={otherPartyName} size="md" />
          <div>
            <div className="flex items-center gap-2">
              <FileText
                className="h-3.5 w-3.5 text-muted-foreground"
                strokeWidth={1.75}
                aria-hidden
              />
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Notes from your call
              </p>
            </div>
            <p className="mt-1 text-sm font-semibold text-foreground">
              {otherPartyName} · Oct 12, 2026
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-xs border border-border bg-card px-2 py-0.5 text-xs text-muted-foreground">
          {data.topic}
        </span>
      </div>

      {/* Preview body — topics covered (one-line each) */}
      <ul className="mt-4 space-y-1.5">
        {previewTopics.map((t) => (
          <li
            key={t.label}
            className="flex items-center gap-2 text-sm text-foreground"
          >
            <span
              className={`inline-block h-1 w-1 rounded-full ${
                t.status === "done"
                  ? "bg-foreground/60"
                  : "bg-muted-foreground/40"
              }`}
              aria-hidden
            />
            <span
              className={
                t.status === "done" ? "text-foreground" : "text-muted-foreground"
              }
            >
              {t.label}
            </span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <p className="text-xs text-muted-foreground">
          AI-generated · {data.aiNotes.topicsCovered.length} topics, {data.aiNotes.strengthsEmerging.length} strengths
        </p>
        <span className="text-sm text-foreground">View full notes →</span>
      </div>
    </Link>
  );
}
