import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = {
  rightContent?: React.ReactNode;
  className?: string;
};

export function Header({ rightContent, className }: Props) {
  return (
    <header
      className={cn(
        "bg-oaa-bg",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-5">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mark.svg"
            alt="One Ask Away"
            className="h-7 w-auto"
          />
          <span className="font-sans text-[16px] font-semibold leading-none text-oaa-ink">
            One Ask Away
          </span>
        </Link>
        {rightContent}
      </div>
    </header>
  );
}
