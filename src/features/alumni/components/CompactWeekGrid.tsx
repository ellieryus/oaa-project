import { cn } from "@/lib/utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export type CompactWeekDay = (typeof DAYS)[number];

export type CompactWeekEntry = {
  day: CompactWeekDay;
  label: string | null;
};

type Props = {
  entries: CompactWeekEntry[];
  className?: string;
};

export function CompactWeekGrid({ entries, className }: Props) {
  const map = new Map(entries.map((e) => [e.day, e.label] as const));
  return (
    <div
      className={cn(
        "grid grid-cols-7 overflow-hidden rounded-md border border-oaa-hairline",
        className,
      )}
    >
      {DAYS.map((d, i) => {
        const label = map.get(d) ?? null;
        const filled = label !== null;
        return (
          <div
            key={d}
            className={cn(
              "flex flex-col items-center gap-1 px-2 py-3",
              i > 0 && "border-l border-oaa-hairline",
              filled ? "bg-oaa-clay-tint-bg" : "bg-white",
            )}
          >
            <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-muted">
              {d}
            </span>
            <span
              className={cn(
                "text-[13px] leading-[1.45] font-medium",
                filled ? "text-oaa-clay" : "text-oaa-muted",
              )}
            >
              {label ?? "—"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
