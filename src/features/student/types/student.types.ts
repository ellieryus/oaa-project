import type { RequestStatus } from "@/types/global";

export type Student = {
  name: string;
  firstName: string;
  avatarInitials: string;
  cohort: string;
  program: string;
  primaryAspiration: string;
  aspirations: string[];
  helpNeeds: string[];
  background: { institution: string; role: string }[];
  portfolioUrl?: string;
};

export type MockRequest = {
  id: string;
  alumniId: string;
  alumniName: string;
  alumniRole: string;
  alumniCompany: string;
  alumniInitials: string;
  topic: string;
  status: RequestStatus;
  statusMeta: string;
  opener: string;
  question: string;
  proposedTimes: string[];
  sentAgo: string;
  declineReason?: string;
  declineNote?: string;
  confirmedTime?: string;
  confirmedMeta?: string;
  meetingLink?: string;
  alumniNote?: string;
  worthConsideringId?: string;
  platform?: string;
  callState?: "live" | "tomorrow" | "soon";
  callTimeDisplay?: string;
  callStatusLabel?: string;
};
