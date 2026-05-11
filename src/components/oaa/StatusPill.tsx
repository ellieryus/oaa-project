import { cn } from "@/lib/utils";

type Variant = "pending" | "accepted" | "declined" | "completed" | "live";

type Props = {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
};

const DOT: Record<Variant, string> = {
  pending:   "bg-neutral-400",
  accepted:  "bg-oaa-status-accepted-dot",
  declined:  "bg-oaa-status-declined-dot",
  completed: "bg-oaa-status-completed-dot",
  live:      "bg-oaa-status-live-dot",
};

export function StatusPill({ variant, children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[12px] leading-none font-medium text-foreground",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", DOT[variant])} aria-hidden />
      {children}
    </span>
  );
}
