import Link from "next/link";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/oaa/Avatar";
import { STUDENT } from "@/lib/mock-student";

type NavItem = "matches" | "requests" | "calls" | "profile" | "notifications" | "none";

type Props = {
  active?: NavItem;
  notificationCount?: number;
  className?: string;
};

export function StudentNav({ active, notificationCount = 1, className }: Props) {
  const navLinkClass = (key: NavItem) =>
    cn(
      "rounded-md px-4 py-2 text-sm transition-colors",
      active === key
        ? "bg-foreground/5 font-medium text-foreground"
        : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-4">
        <Link href="/home" className="text-sm font-semibold text-foreground">
          One Ask Away
        </Link>

        <nav className="flex items-center gap-1">
          <Link href="/matches" className={navLinkClass("matches")}>
            Matches
          </Link>
          <Link href="/requests" className={navLinkClass("requests")}>
            Requests
          </Link>
          <Link href="/calls" className={navLinkClass("calls")}>
            Calls
          </Link>
          <Link href="/profile" className={navLinkClass("profile")}>
            Profile
          </Link>

          <div className="relative">
            <Link href="/notifications" className={navLinkClass("notifications")}>
              Notifications
            </Link>
            {notificationCount > 0 && (
              <span
                className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-500"
                aria-label={`${notificationCount} notification`}
              />
            )}
          </div>

          <div className="ml-2">
            <Avatar variant="student" name={STUDENT.name} size="sm" />
          </div>
        </nav>
      </div>
    </header>
  );
}
