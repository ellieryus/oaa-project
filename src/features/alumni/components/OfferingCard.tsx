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
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oaa-clay/40",
        disabled
          ? "bg-oaa-bg/60 border-oaa-hairline cursor-not-allowed opacity-70"
          : selected
            ? "bg-oaa-clay-tint-bg border-oaa-clay-tint-border"
            : "bg-white border-oaa-hairline hover:border-oaa-ink/30",
        className,
      )}
    >
      {selected && !disabled && (
        <span
          aria-hidden
          className="absolute right-3 top-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-oaa-clay text-white"
        >
          <Check className="h-3 w-3" strokeWidth={2.5} />
        </span>
      )}
      <span className="pr-7 text-[15px] leading-[1.4] font-semibold text-oaa-ink">
        {title}
      </span>
      <span
        className={cn(
          "text-[13px] leading-[1.45]",
          disabled ? "text-oaa-clay" : "text-oaa-muted",
        )}
      >
        {disabled && disabledMessage ? disabledMessage : description}
      </span>
      {highValue && !disabled && (
        <span className="mt-1 inline-flex items-center rounded-full border border-oaa-hairline bg-white px-2 py-0.5 text-[11px] leading-none font-medium text-oaa-ink">
          High-value
        </span>
      )}
    </button>
  );
}
