"use client";

import { cn } from "@/lib/utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export type WeekDay = (typeof DAYS)[number];

const HOURS = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
] as const;
export type Hour = (typeof HOURS)[number];

export type WeekSlotKey = `${WeekDay}-${Hour}`;

type Props = {
  selected: Set<WeekSlotKey>;
  onToggle: (key: WeekSlotKey) => void;
  className?: string;
};

export function AvailabilityWeekGrid({
  selected,
  onToggle,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-md border border-border bg-card",
        className,
      )}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 border-b border-border bg-card px-3 py-3 text-left text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
              &nbsp;
            </th>
            {DAYS.map((d) => (
              <th
                key={d}
                className="border-b border-l border-border px-3 py-3 text-center text-[11px] tracking-[0.08em] uppercase text-muted-foreground"
              >
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HOURS.map((h) => (
            <tr key={h}>
              <th
                scope="row"
                className="sticky left-0 z-10 border-b border-border bg-card px-3 py-2 text-left text-[11px] tracking-[0.04em] text-muted-foreground"
              >
                {h}
              </th>
              {DAYS.map((d) => {
                const key: WeekSlotKey = `${d}-${h}`;
                const isSelected = selected.has(key);
                return (
                  <td
                    key={key}
                    className="h-9 border-b border-l border-border p-0"
                  >
                    <button
                      type="button"
                      onClick={() => onToggle(key)}
                      aria-pressed={isSelected}
                      aria-label={`${d} ${h}`}
                      className={cn(
                        "h-full w-full transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500/40",
                        isSelected
                          ? "bg-brand-50 hover:bg-brand-50/80 hover:border-brand-300"
                          : "bg-card hover:bg-brand-50/40 hover:border-brand-300",
                      )}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { DAYS as WEEK_DAYS, HOURS as WEEK_HOURS };
