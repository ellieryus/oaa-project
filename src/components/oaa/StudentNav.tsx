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
  const navLink = (href: string, label: string, key: NavItem) => (
    <Link
      href={href}
      className={cn(
        "text-sm leading-none transition-colors",
        active === key
          ? "font-semibold text-foreground underline underline-offset-4"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className={cn("bg-background", className)}>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-4">
        <Link href="/home" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.svg" alt="One Ask Away" className="h-7 w-auto" />
          <span className="text-base font-semibold leading-none text-foreground">
            One Ask Away
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {navLink("/matches", "Matches", "matches")}
          {navLink("/requests", "Requests", "requests")}
          {navLink("/calls", "Calls", "calls")}
          {navLink("/profile", "Profile", "profile")}

          {/* Notifications as text with clay dot indicator */}
          <div className="relative">
            <Link
              href="/notifications"
              className={cn(
                "text-sm leading-none transition-colors",
                active === "notifications"
                  ? "font-semibold text-foreground underline underline-offset-4"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Notifications
            </Link>
            {notificationCount > 0 && (
              <span
                className="absolute -top-1 -right-1.5 h-1.5 w-1.5 rounded-full bg-brand-500"
                aria-label={`${notificationCount} notification`}
              />
            )}
          </div>

          <Avatar variant="student" name={STUDENT.name} size="sm" />
        </nav>
      </div>
    </header>
  );
}
