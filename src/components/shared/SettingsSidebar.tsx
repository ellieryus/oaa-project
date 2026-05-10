"use client";

import { cn } from "@/lib/utils";

type SidebarItem = {
  id: string;
  label: string;
};

const ITEMS: SidebarItem[] = [
  { id: "account", label: "Account" },
  { id: "notifications", label: "Notifications" },
  { id: "availability", label: "Availability" },
  { id: "privacy", label: "Privacy" },
  { id: "danger", label: "Danger zone" },
];

type Props = {
  activeId?: string;
};

export function SettingsSidebar({ activeId }: Props) {
  return (
    <nav className="sticky top-6 flex flex-col gap-0.5">
      {ITEMS.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "block py-2 pl-3 text-[14px] transition-colors",
            activeId === item.id
              ? "border-l-2 border-oaa-clay font-medium text-oaa-ink"
              : "border-l-2 border-transparent text-oaa-muted hover:text-oaa-ink",
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
