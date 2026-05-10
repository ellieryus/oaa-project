import { Clock } from "lucide-react";

import { ClayHighlightCard } from "@/components/shared/ClayHighlightCard";

type Props = {
  minutesUntil: number;
  studentName: string;
  topic: string;
  joinLink?: string;
};

export function LiveCallBanner({ minutesUntil, studentName, topic, joinLink }: Props) {
  return (
    <ClayHighlightCard className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="flex items-center gap-3">
        <Clock className="h-4 w-4 shrink-0 text-oaa-clay" strokeWidth={1.5} aria-hidden />
        <div>
          <p className="mb-0.5 font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-clay">
            Starting in {minutesUntil} minutes
          </p>
          <p className="text-[14px] font-semibold text-oaa-ink">
            {studentName} · {topic}
          </p>
        </div>
      </div>
      <a
        href={joinLink ?? "#"}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-oaa-ink px-4 py-2 text-[13px] font-medium leading-none text-white transition-colors hover:bg-oaa-ink/90"
      >
        Join now ↗
      </a>
    </ClayHighlightCard>
  );
}
