import type { RequestStatus } from "@/types/global";
import type { Student } from "@/features/student/types";

export type ProposedTime = {
  id: string;
  date: string;    // "TUE APR 28"
  time: string;    // "5:00 — 5:15 PM EDT"
  altTz?: string;  // "(2:00 PM PDT)"
};

export type InboxRequest = {
  id: string;
  student: Student;
  topic: string;
  format: "15 min · virtual" | "20 min · virtual" | "30 min · virtual";
  askMessage: string;
  question: string;
  proposedTimes: ProposedTime[];
  status: RequestStatus;
  scopeStatus: "within-scope" | "scope-check";
  receivedAt: string;
  dueInHours: number;
  scheduledTime?: string;
  scheduledStudent?: string;
  acceptedNote?: string;
  declinedReason?: string;
  declinedNote?: string;
};
