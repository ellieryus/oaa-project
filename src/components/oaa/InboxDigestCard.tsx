import { Avatar } from "@/components/oaa/Avatar";
import { ADAM_DIGEST_MAYA } from "@/lib/mock-video";

export function InboxDigestCard() {
  const d = ADAM_DIGEST_MAYA;

  return (
    <article className="rounded-md border border-border bg-card p-5">
      {/* Top row: avatar + student meta + type badge */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar variant="student" name={d.studentName} size="md" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              {d.studentName}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Last talked: {d.pastNoteSummary}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-xs border border-border bg-card px-2 py-0.5 text-xs text-muted-foreground">
          Update
        </span>
      </div>

      {/* Message body */}
      <p className="mt-5 text-sm leading-relaxed text-foreground">
        {d.message}
      </p>

      {/* Evidence link */}
      <div className="mt-4 rounded-md border border-border bg-background px-4 py-3">
        <p className="text-xs text-muted-foreground">Evidence</p>
        <p className="mt-1 text-sm font-medium text-foreground">
          {d.evidence.label}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {d.evidence.url}
        </p>
      </div>

      {/* Previous strengths chips */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">
          You noted:
        </span>
        {d.previousStrengths.map((s) => (
          <span
            key={s}
            className="rounded-xs border border-border bg-card px-2 py-0.5 text-xs text-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Proposed duration footer */}
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <p className="text-xs text-muted-foreground">
          Proposed: {d.proposedDuration}
        </p>

        <a
          href={`https://${d.evidence.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-foreground hover:text-brand-500 hover:underline"
        >
          View project →
        </a>
      </div>
    </article>
  );
}
