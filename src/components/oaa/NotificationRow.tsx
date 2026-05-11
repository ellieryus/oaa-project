import Link from "next/link";
import { Send, Clock, AlertCircle, Calendar, User } from "lucide-react";

import { cn } from "@/lib/utils";
import type { MockNotification, NotificationType } from "@/lib/mock-notifications";

function NotifIcon({ type }: { type: NotificationType }) {
  const iconClass = "h-4 w-4";
  const map: Record<NotificationType, React.ReactNode> = {
    request_accepted: <Send className={iconClass} strokeWidth={1.5} />,
    reminder: <Clock className={iconClass} strokeWidth={1.5} />,
    decline: <AlertCircle className={iconClass} strokeWidth={1.5} />,
    call_tomorrow: <Calendar className={iconClass} strokeWidth={1.5} />,
    system: <User className={iconClass} strokeWidth={1.5} />,
  };
  return <>{map[type]}</>;
}

type Props = {
  notification: MockNotification;
};

export function NotificationRow({ notification }: Props) {
  const { type, heading, subtext, timeAgo, unread, href } = notification;

  const content = (
    <div className="flex items-start gap-4 px-6 py-4">
      {/* Icon circle */}
      <div
        className={cn(
          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          unread
            ? "bg-brand-500 text-white"
            : "bg-neutral-200 text-muted-foreground",
        )}
      >
        <NotifIcon type={type} />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p
            className={cn(
              "text-[14px] leading-[1.4]",
              unread ? "font-medium text-foreground" : "text-foreground",
            )}
          >
            {heading}
          </p>
          <span className="shrink-0 text-[11px] text-muted-foreground">
            {timeAgo}
          </span>
        </div>
        {subtext && (
          <p className="mt-0.5 text-[13px] text-muted-foreground">{subtext}</p>
        )}
      </div>

      {/* Unread dot */}
      {unread && (
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
      )}
    </div>
  );

  if (href) {
    return (
      <div className="border-b border-border last:border-b-0">
        <Link href={href} className="block transition-colors hover:bg-background">
          {content}
        </Link>
      </div>
    );
  }

  return (
    <div className="border-b border-border last:border-b-0">{content}</div>
  );
}
