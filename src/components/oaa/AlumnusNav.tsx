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
  { href: "/past-students", label: "Past Students", key: "past-students" },
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
              className="flex items-center gap-2 rounded-sm px-4 py-2 text-[14px] text-foreground transition-colors hover:bg-foreground/5"
            >
              <span
                className={
                  active === link.key ? "underline decoration-2 underline-offset-4" : undefined
                }
              >
                {link.label}
              </span>
              {link.key === "inbox" && unreadCount > 0 && (
                <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-500 px-1.5 text-[10px] leading-none text-white no-underline">
                  {unreadCount}
                </span>
              )}
            </Link>
          ))}
          <Avatar
            variant="alumnus-self"
            name="Adam Farouk"
            size="sm"
            className="ml-2"
          />
        </nav>
      }
    />
  );
}
