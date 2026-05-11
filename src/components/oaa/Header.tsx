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
        "sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="text-sm font-semibold text-foreground"
        >
          One Ask Away
        </Link>
        {rightContent}
      </div>
    </header>
  );
}
