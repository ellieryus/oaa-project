import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  backHref: string;
  backLabel: string;
  rightContent?: React.ReactNode;
};

export function BackHeader({ backHref, backLabel, rightContent }: Props) {
  return (
    <header className="bg-oaa-bg">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-5">
        <Link
          href={backHref}
          className="flex items-center gap-1.5 text-[13px] text-oaa-muted transition-colors hover:text-oaa-ink"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          {backLabel}
        </Link>
        {rightContent}
      </div>
    </header>
  );
}
