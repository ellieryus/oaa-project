"use client";

import { cn } from "@/lib/utils";

type Props = {
  selected?: boolean;
  rank?: number;
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  as?: "button" | "div";
};

export function SelectableCard({
  selected = false,
  rank,
  title,
  description,
  onClick,
  className,
  children,
  as = "button",
}: Props) {
  const cls = cn(
    "group relative w-full text-left rounded-md border p-6 transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
    selected
      ? "bg-brand-50 border-brand-200"
      : "bg-card border-border hover:border-brand-500",
    className,
  );

  const inner = (
    <>
      {typeof rank === "number" && (
        <span className="absolute top-4 right-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white text-[11px] tracking-[0.04em]">
          {rank}
        </span>
      )}
      <div className="text-[15px] leading-[1.5] font-medium text-foreground">
        {title}
      </div>
      {description && (
        <div className="mt-1 text-[13px] leading-[1.45] text-muted-foreground">
          {description}
        </div>
      )}
      {children}
    </>
  );

  if (as === "div") {
    return <div className={cls}>{inner}</div>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cls}
    >
      {inner}
    </button>
  );
}
