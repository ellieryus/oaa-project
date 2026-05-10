/** Maximum number of AI regenerations per ask-composer session */
export const MAX_AI_REGENERATIONS = 3;

/** Maximum number of offerings an alumnus can declare */
export const MAX_OFFERINGS = 6;

/** Maximum number of non-offerings an alumnus can declare */
export const MAX_NON_OFFERINGS = 6;

/** Maximum skills a student can add during onboarding */
export const MAX_STUDENT_SKILLS = 8;

/** Days of the week label array used for availability grids */
export const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];

/** Availability level options */
export const AVAILABILITY_LEVELS = [
  "Available this week",
  "Available next week",
  "Limited availability",
] as const;
export type AvailabilityLevel = (typeof AVAILABILITY_LEVELS)[number];

/** Call format options */
export const CALL_FORMATS = ["15min", "20min"] as const;
export type CallFormat = (typeof CALL_FORMATS)[number];

/** Navigation items for the student nav */
export const STUDENT_NAV_ITEMS = [
  { href: "/home", label: "Home", key: "home" },
  { href: "/matches", label: "Matches", key: "matches" },
  { href: "/requests", label: "Requests", key: "requests" },
  { href: "/calls", label: "Calls", key: "calls" },
  { href: "/profile", label: "Profile", key: "profile" },
  { href: "/notifications", label: "Notifications", key: "notifications" },
] as const;

/** Navigation items for the alumnus nav */
export const ALUMNUS_NAV_ITEMS = [
  { href: "/inbox", label: "Inbox", key: "inbox" },
  { href: "/past-students", label: "Past Students", key: "past-students" },
  { href: "/profile/alumnus", label: "Profile", key: "profile" },
] as const;

/** Request status display config */
export const REQUEST_STATUS_CONFIG: Record<
  string,
  { dot: string; label: string }
> = {
  accepted:  { dot: "bg-oaa-status-accepted-dot",  label: "Accepted"  },
  pending:   { dot: "bg-oaa-muted",                label: "Pending"   },
  declined:  { dot: "bg-oaa-status-declined-dot",  label: "Declined"  },
  completed: { dot: "bg-oaa-status-completed-dot", label: "Completed" },
};
