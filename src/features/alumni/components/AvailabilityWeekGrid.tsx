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
        "overflow-x-auto rounded-md border border-oaa-hairline bg-white",
        className,
      )}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 border-b border-oaa-hairline bg-white px-3 py-3 text-left font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
              &nbsp;
            </th>
            {DAYS.map((d) => (
              <th
                key={d}
                className="border-b border-l border-oaa-hairline px-3 py-3 text-center font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted"
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
                className="sticky left-0 z-10 border-b border-oaa-hairline bg-white px-3 py-2 text-left font-mono text-[11px] tracking-[0.04em] text-oaa-muted"
              >
                {h}
              </th>
              {DAYS.map((d) => {
                const key: WeekSlotKey = `${d}-${h}`;
                const isSelected = selected.has(key);
                return (
                  <td
                    key={key}
                    className="h-9 border-b border-l border-oaa-hairline p-0"
                  >
                    <button
                      type="button"
                      onClick={() => onToggle(key)}
                      aria-pressed={isSelected}
                      aria-label={`${d} ${h}`}
                      className={cn(
                        "h-full w-full transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-oaa-clay/40",
                        isSelected
                          ? "bg-oaa-clay-tint-bg hover:bg-oaa-clay-tint-bg/80"
                          : "bg-white hover:bg-oaa-clay-tint-bg/40",
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
