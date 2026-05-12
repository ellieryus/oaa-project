"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Mic, Video, MonitorUp, PhoneOff, Check, Circle } from "lucide-react";

import { MAYA_IN_CALL } from "@/lib/mock-video";

type Props = { params: Promise<{ requestId: string }> };

export default function InCallPage({ params }: Props) {
  // Params consumed but unused — single-purpose video demo screen
  use(params);

  const router = useRouter();
  const data = MAYA_IN_CALL;

  function handleLeave() {
    router.push(`/reflect/${data.requestId}`);
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top bar — topic + timer */}
      <div className="flex items-center justify-between border-b border-border px-8 py-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            In call
          </p>
          <p className="mt-0.5 text-sm font-medium text-foreground">
            {data.topic} · {data.duration}
          </p>
        </div>
        <div className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-sm text-foreground">
          {data.timer}
        </div>
      </div>

      {/* Main area — video tiles + AI notes sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video tiles */}
        <div className="flex flex-1 items-center justify-center gap-6 px-8 py-8">
          {/* Other (Adam) */}
          <ParticipantTile
            initials={data.participants.other.initials}
            name={data.participants.other.name}
            subtitle={data.participants.other.role}
            isSelf={false}
          />
          {/* Self (Maya) */}
          <ParticipantTile
            initials={data.participants.self.initials}
            name={`${data.participants.self.name} (you)`}
            subtitle=""
            isSelf={true}
          />
        </div>

        {/* AI notes sidebar */}
        <aside className="w-[340px] shrink-0 overflow-y-auto border-l border-border bg-card px-6 py-6">
          {/* Header with pulse */}
          <div className="mb-6 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            <p className="text-xs font-medium uppercase tracking-wider text-foreground">
              AI taking notes
            </p>
          </div>

          {/* Topics covered */}
          <section className="mb-8">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Topics covered
            </h3>
            <ul className="space-y-2.5">
              {data.aiNotes.topicsCovered.map((t) => (
                <li key={t.label} className="flex items-start gap-2.5">
                  {t.status === "done" ? (
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-500"
                      strokeWidth={2}
                      aria-hidden
                    />
                  ) : (
                    <Circle
                      className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  )}
                  <span
                    className={`text-sm leading-relaxed ${
                      t.status === "done"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {t.label}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Strengths emerging */}
          <section className="mb-8">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Strengths emerging
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.aiNotes.strengthsEmerging.map((s) => (
                <span
                  key={s}
                  className="rounded-xs border border-border bg-card px-2 py-0.5 text-xs text-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Gaps mentioned */}
          <section>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Gaps mentioned
            </h3>
            <ul className="space-y-2">
              {data.aiNotes.gapsMentioned.map((g) => (
                <li
                  key={g}
                  className="rounded-md border border-brand-500 bg-transparent px-3 py-2 text-sm text-foreground"
                >
                  {g}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      {/* Bottom control bar */}
      <div className="flex items-center justify-center gap-3 border-t border-border bg-card px-8 py-4">
        <ControlButton icon={<Mic className="h-5 w-5" strokeWidth={1.75} />} label="Mute" />
        <ControlButton icon={<Video className="h-5 w-5" strokeWidth={1.75} />} label="Camera" />
        <ControlButton icon={<MonitorUp className="h-5 w-5" strokeWidth={1.75} />} label="Share screen" />
        <button
          type="button"
          onClick={handleLeave}
          aria-label="Leave call"
          className="ml-2 flex h-12 items-center gap-2 rounded-full bg-red-500 px-5 text-sm font-medium text-white transition-colors hover:bg-red-600"
        >
          <PhoneOff className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          Leave
        </button>
      </div>
    </div>
  );
}

function ParticipantTile({
  initials,
  name,
  subtitle,
  isSelf,
}: {
  initials: string;
  name: string;
  subtitle: string;
  isSelf: boolean;
}) {
  return (
    <div className="relative flex aspect-[4/3] w-full max-w-[400px] flex-col items-center justify-center rounded-lg bg-foreground/5">
      <span className="text-6xl font-medium text-muted-foreground tracking-[0.04em]">
        {initials}
      </span>
      <div className="absolute bottom-3 left-3 rounded-md bg-foreground/70 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
        {name}
        {subtitle && !isSelf && (
          <span className="ml-1.5 opacity-70">· {subtitle}</span>
        )}
      </div>
    </div>
  );
}

function ControlButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10"
    >
      {icon}
    </button>
  );
}
