import Link from "next/link";

import { Avatar } from "@/components/oaa/Avatar";
import { Header } from "@/components/oaa/Header";
import { cn } from "@/lib/utils";

type ActivePage = "inbox" | "past-students" | "profile";

type Props = {
  active?: ActivePage;
  unreadCount?: number;
};

const LINKS: { href: string; label: string; key: ActivePage }[] = [
  { href: "/inbox", label: "Inbox", key: "inbox" },
  { href: "/past-students", label: "Past students", key: "past-students" },
  { href: "/profile/alumnus", label: "Profile", key: "profile" },
];

export function AlumnusNav({ active, unreadCount = 0 }: Props) {
  return (
    <Header
      rightContent={
        <nav className="flex items-center gap-1">
          {LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-4 py-2 text-sm transition-colors",
                active === link.key
                  ? "bg-foreground/5 font-medium text-foreground"
                  : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
              )}
            >
              <span>{link.label}</span>
              {link.key === "inbox" && unreadCount > 0 && (
                <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-500 px-1.5 text-[10px] leading-none text-white">
                  {unreadCount}
                </span>
              )}
            </Link>
          ))}
          <div className="ml-2">
            <Avatar variant="alumnus-self" name="Adam Farouk" size="sm" />
          </div>
        </nav>
      }
    />
  );
}
