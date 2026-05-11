export type NotificationType =
  | "request_accepted"
  | "reminder"
  | "decline"
  | "call_tomorrow"
  | "system";

export type MockNotification = {
  id: string;
  type: NotificationType;
  heading: string;
  subtext?: string;
  timeAgo: string;
  unread: boolean;
  href?: string;
};

export const MOCK_NOTIFICATIONS: MockNotification[] = [
  {
    id: "notif-1",
    type: "request_accepted",
    heading: "Adam Farouk accepted your ask",
    subtext: "Career pivot · 15 min · Friday at 1pm",
    timeAgo: "2h ago",
    unread: true,
    href: "/requests/req-adam",
  },
  {
    id: "notif-2",
    type: "reminder",
    heading: "Call with Adam Farouk in 1 hour",
    subtext: "Career pivot · today at 1pm",
    timeAgo: "Today",
    unread: true,
    href: "/requests/req-adam",
  },
  {
    id: "notif-3",
    type: "decline",
    heading: "Lena Park sent a decline note",
    subtext: "Resume review · explained why and suggested an alternative",
    timeAgo: "Yesterday",
    unread: true,
    href: "/requests/req-lena",
  },
  {
    id: "notif-4",
    type: "call_tomorrow",
    heading: "Call with Adam Farouk tomorrow",
    subtext: "Reminder for Friday at 1pm EDT",
    timeAgo: "Yesterday",
    unread: false,
    href: "/requests/req-adam",
  },
  {
    id: "notif-5",
    type: "request_accepted",
    heading: "Sarah Reyes accepted your ask",
    subtext: "Behavioral interview · 15 min · Fri May 1 at 11am",
    timeAgo: "3 days ago",
    unread: false,
    href: "/requests/req-sarah",
  },
  {
    id: "notif-6",
    type: "system",
    heading: "Profile complete",
    subtext: "Your profile is live and you'll start getting matches",
    timeAgo: "April 12",
    unread: false,
    href: "/profile",
  },
];

export const UNREAD_COUNT = MOCK_NOTIFICATIONS.filter((n) => n.unread).length;
