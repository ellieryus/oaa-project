import Link from "next/link";

import { cn } from "@/lib/utils";

export type Step = {
  num: string;
  label: string;
  href?: string;
};

type Props = {
  steps: Step[];
  activeIndex: number;
  className?: string;
};

export function ProgressStepper({ steps, activeIndex, className }: Props) {
  return (
    <div
      className={cn(
        "border-b border-border bg-background",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center gap-10 px-8 py-4">
        {steps.map((s, i) => {
          const active = i === activeIndex;
          const cls = cn(
            "text-sm",
            active
              ? "font-semibold text-foreground"
              : "font-medium text-muted-foreground",
          );
          const content = (
            <>
              <span className="mr-2">{s.num}</span>
              <span>{s.label}</span>
            </>
          );
          return s.href && !active ? (
            <Link key={s.num} href={s.href} className={cls}>
              {content}
            </Link>
          ) : (
            <span key={s.num} className={cls}>
              {content}
            </span>
          );
        })}
      </div>
    </div>
  );
}
