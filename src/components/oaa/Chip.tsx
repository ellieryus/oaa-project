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
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
        "disabled:opacity-50 disabled:pointer-events-none",
        selected
          ? "bg-brand-50 border-brand-200 text-foreground"
          : "bg-card border-border text-foreground hover:border-brand-500",
        className,
      )}
    >
      <span className="flex items-center gap-2">
        {mode === "rank" && selected && typeof rank === "number" && (
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white text-[11px] tracking-[0.04em]">
            {rank}
          </span>
        )}
        {mode === "select" && selected && (
          <Check
            className="h-4 w-4 text-brand-500"
            strokeWidth={2}
            aria-hidden
          />
        )}
        <span>{label}</span>
      </span>
      {primaryBadge && selected && (
        <span className="rounded-full border border-brand-500 bg-card px-2 py-0.5 text-[10px] tracking-[0.06em] uppercase text-brand-500">
          Primary
        </span>
      )}
    </button>
  );
}
