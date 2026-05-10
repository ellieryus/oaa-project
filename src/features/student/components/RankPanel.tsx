import { GripVertical } from "lucide-react";

import { cn } from "@/lib/utils";

export type RankPanelItem = {
  id: string;
  label: string;
};

type Props = {
  title?: string;
  items: RankPanelItem[];
  emptyMessage?: string;
  className?: string;
};

export function RankPanel({
  title = "Your ranking",
  items,
  emptyMessage = "Your ranked list will appear here as you select.",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-md border border-oaa-hairline bg-white",
        className,
      )}
    >
      <div className="px-5 py-4 font-mono text-[11px] leading-[1.4] tracking-[0.08em] uppercase text-oaa-muted">
        {title}
      </div>
      {items.length === 0 ? (
        <div className="border-t border-oaa-hairline px-5 py-6 text-[13px] leading-[1.45] text-oaa-muted">
          {emptyMessage}
        </div>
      ) : (
        <ul className="flex flex-col">
          {items.map((it, i) => (
            <li
              key={it.id}
              className="flex items-center gap-3 border-t border-oaa-hairline px-5 py-3"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-oaa-clay text-white font-mono text-[11px] tracking-[0.04em]">
                {i + 1}
              </span>
              <span className="flex-1 text-[15px] leading-[1.5] text-oaa-ink">
                {it.label}
              </span>
              <GripVertical
                className="h-4 w-4 text-oaa-muted"
                strokeWidth={1.5}
                aria-hidden
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
