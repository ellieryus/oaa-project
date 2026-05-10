import type { InboxRequest } from "@/features/requests/types";
import { STUDENTS } from "@/server/modules/students/student.mock";

const [MAYA, JORDAN, PRIYA_NAIR, SAM, ANIK, LILY] = STUDENTS;

export const INBOX_REQUESTS: InboxRequest[] = [
  {
    id: "inbox-maya",
    student: MAYA,
    topic: "Career pivot",
    format: "15 min · virtual",
    askMessage:
      "Hi Adam — I'm a current MMA student aiming for product analytics roles. I noticed you pivoted from consulting into Shopify's analytics team — that path is exactly what I'm trying to navigate. Could we spend 15 minutes on how you positioned yourself for that switch?",
    question: "How did you decide which roles to apply to during your transition?",
    proposedTimes: [
      { id: "t1", date: "TUE APR 28", time: "5:00 — 5:15 PM EDT", altTz: "(2:00 PM PDT)" },
      { id: "t2", date: "FRI MAY 8",  time: "5:00 — 5:15 PM EDT", altTz: "(2:00 PM PDT)" },
    ],
    status: "accepted",
    scopeStatus: "within-scope",
    receivedAt: "3 days ago",
    dueInHours: 0,
    scheduledTime: "FRI MAY 2 · 5:00 PM EDT",
  },
  {
    id: "inbox-jordan",
    student: JORDAN,
    topic: "Portfolio review",
    format: "20 min · virtual",
    askMessage:
      "Hi Adam — I'm a current MMA student aiming for product analytics roles. I've been building a SQL portfolio and would love an expert eye on the gaps before I start applying. Your background bridging consulting and data at Shopify is exactly the perspective I need.",
    question: "Could you walk through my SQL portfolio and tell me where the gaps are?",
    proposedTimes: [
      { id: "t1", date: "TUE MAY 5", time: "5:30 — 5:50 PM EDT", altTz: "(2:30 PM PDT)"  },
      { id: "t2", date: "FRI MAY 8", time: "1:00 — 1:20 PM EDT", altTz: "(10:00 AM PDT)" },
    ],
    status: "pending",
    scopeStatus: "within-scope",
    receivedAt: "1 day ago",
    dueInHours: 28,
  },
  {
    id: "inbox-priya",
    student: PRIYA_NAIR,
    topic: "Data case",
    format: "20 min · virtual",
    askMessage:
      "Hi Adam — I'm a current MMA student targeting data science roles. I know case interviews aren't your primary focus, but your analytics experience at Shopify seems directly relevant. Would you mind running me through a sample case from your interview prep?",
    question: "Would you mind running me through a sample case from your interview prep?",
    proposedTimes: [
      { id: "t1", date: "FRI MAY 8",  time: "5:00 — 5:20 PM EDT", altTz: "(2:00 PM PDT)" },
      { id: "t2", date: "TUE MAY 12", time: "5:00 — 5:20 PM EDT", altTz: "(2:00 PM PDT)" },
    ],
    status: "pending",
    scopeStatus: "scope-check",
    receivedAt: "6h ago",
    dueInHours: 41,
  },
  {
    id: "inbox-sam",
    student: SAM,
    topic: "Behavioral interview",
    format: "15 min · virtual",
    askMessage:
      "Hi Adam — I'm finishing my MMA and targeting financial analyst roles at banks. I'd love 15 minutes to run through the behavioral interview with someone who's been on the other side of the table.",
    question: "What behavioral questions come up most in analytics interviews at large banks?",
    proposedTimes: [
      { id: "t1", date: "FRI MAY 1", time: "5:00 — 5:15 PM EDT", altTz: "(2:00 PM PDT)" },
    ],
    status: "accepted",
    scopeStatus: "within-scope",
    receivedAt: "3 days ago",
    dueInHours: 0,
    scheduledTime: "FRI MAY 1 · 5:00 PM EDT",
  },
  {
    id: "inbox-anik",
    student: ANIK,
    topic: "Career pivot",
    format: "15 min · virtual",
    askMessage:
      "Hi Adam — I'm an MMA student considering a pivot from consulting into analytics. Your BCG-to-Shopify story is exactly the move I'm trying to understand. Could we spend 15 minutes on how you framed your experience for that transition?",
    question: "How did you position your consulting background when applying to analytics roles?",
    proposedTimes: [
      { id: "t1", date: "TUE MAY 5", time: "12:30 — 12:45 PM EDT", altTz: "(9:30 AM PDT)" },
    ],
    status: "accepted",
    scopeStatus: "within-scope",
    receivedAt: "4 days ago",
    dueInHours: 0,
    scheduledTime: "TUE MAY 5 · 12:30 PM EDT",
  },
  {
    id: "inbox-lily",
    student: LILY,
    topic: "Career pivot",
    format: "15 min · virtual",
    askMessage:
      "Hi Adam — I'm finishing up my MMA and pivoting from CPG marketing into data analytics. Your story is very similar to what I'm aiming for. Could we spend 15 minutes on how you made that narrative shift?",
    question: "How did you frame your marketing background when applying to data roles?",
    proposedTimes: [
      { id: "t1", date: "FRI MAY 8", time: "1:00 — 1:15 PM EDT", altTz: "(10:00 AM PDT)" },
    ],
    status: "completed",
    scopeStatus: "within-scope",
    receivedAt: "2 weeks ago",
    dueInHours: 0,
    scheduledTime: "FRI APR 18 · 1:00 PM EDT",
  },
];

export function getInboxRequest(id: string): InboxRequest | undefined {
  return INBOX_REQUESTS.find((r) => r.id === id);
}

export const PENDING_REQUESTS = INBOX_REQUESTS.filter((r) => r.status === "pending");
export const UPCOMING_CALLS = INBOX_REQUESTS.filter(
  (r) => r.status === "accepted" && r.scheduledTime,
).sort((a, b) => (a.scheduledTime ?? "").localeCompare(b.scheduledTime ?? ""));
