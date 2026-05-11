"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  selected?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  highValue?: boolean;
  onClick?: () => void;
  className?: string;
};

export function OfferingCard({
  title,
  description,
  selected = false,
  disabled = false,
  disabledMessage,
  highValue = false,
  onClick,
  className,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "group relative flex h-full w-full flex-col items-start gap-2 rounded-md border p-4 text-left transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
        disabled
          ? "bg-background/60 border-border cursor-not-allowed opacity-70"
          : selected
            ? "bg-brand-50 border-brand-200"
            : "bg-card border-border hover:border-brand-500",
        className,
      )}
    >
      {selected && !disabled && (
        <span
          aria-hidden
          className="absolute right-3 top-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white"
        >
          <Check className="h-3 w-3" strokeWidth={2.5} />
        </span>
      )}
      <span className="pr-7 text-[15px] leading-[1.4] font-semibold text-foreground">
        {title}
      </span>
      <span
        className={cn(
          "text-[13px] leading-[1.45]",
          disabled ? "text-brand-500" : "text-muted-foreground",
        )}
      >
        {disabled && disabledMessage ? disabledMessage : description}
      </span>
      {highValue && !disabled && (
        <span className="mt-1 inline-flex items-center rounded-full border border-border bg-card px-2 py-0.5 text-[11px] leading-none font-medium text-foreground">
          High-value
        </span>
      )}
    </button>
  );
}
