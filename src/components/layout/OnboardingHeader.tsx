import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = {
  email: string;
  eyebrow?: string;
  exitHref?: string;
  className?: string;
};

export function OnboardingHeader({
  email,
  eyebrow = "Student onboarding",
  exitHref = "/",
  className,
}: Props) {
  return (
    <header
      className={cn(
        "border-b border-border bg-background",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mark.svg"
            alt="One Ask Away"
            className="h-7 w-auto"
          />
          <span className="ml-2 text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
            {eyebrow}
          </span>
        </div>
        <div className="flex items-center gap-6 text-[13px] leading-[1.45]">
          <span className="text-muted-foreground">{email}</span>
          <Link
            href={exitHref}
            className="text-foreground underline underline-offset-2 hover:no-underline"
          >
            Save &amp; exit
          </Link>
        </div>
      </div>
    </header>
  );
}
