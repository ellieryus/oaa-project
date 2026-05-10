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
        "border-b border-oaa-hairline bg-oaa-bg",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center gap-10 px-8 py-4 font-mono text-[11px] leading-[1.4] tracking-[0.08em] uppercase">
        {steps.map((s, i) => {
          const active = i === activeIndex;
          const cls = cn(
            active
              ? "text-oaa-clay underline underline-offset-4 decoration-oaa-clay"
              : "text-oaa-muted",
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
