"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type Mode = "rank" | "select";

type Props = {
  label: string;
  mode?: Mode;
  selected?: boolean;
  rank?: number;
  primaryBadge?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export function Chip({
  label,
  mode = "select",
  selected = false,
  rank,
  primaryBadge = false,
  onClick,
  disabled = false,
  className,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "group inline-flex w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left text-[14px] leading-[1.45] transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oaa-clay/40",
        "disabled:opacity-50 disabled:pointer-events-none",
        selected
          ? "bg-oaa-clay-tint-bg border-oaa-clay-tint-border text-oaa-ink"
          : "bg-white border-oaa-hairline text-oaa-ink hover:border-oaa-ink/30",
        className,
      )}
    >
      <span className="flex items-center gap-2">
        {mode === "rank" && selected && typeof rank === "number" && (
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-oaa-clay text-white font-mono text-[11px] tracking-[0.04em]">
            {rank}
          </span>
        )}
        {mode === "select" && selected && (
          <Check
            className="h-4 w-4 text-oaa-clay"
            strokeWidth={2}
            aria-hidden
          />
        )}
        <span>{label}</span>
      </span>
      {primaryBadge && selected && (
        <span className="rounded-full border border-oaa-clay bg-white px-2 py-0.5 font-mono text-[10px] tracking-[0.06em] uppercase text-oaa-clay">
          Primary
        </span>
      )}
    </button>
  );
}
