import type { AvailabilityLevel, DayOfWeek } from "@/lib/constants";

export type Offering = {
  id: string;
  title: string;
  description: string;
  highValue?: boolean;
};

export type NonOffering = {
  id: string;
  title: string;
  reason?: string;
};

export type BackgroundEntry = {
  company: string;
  role: string;
  location?: string;
  start: string;
  end: string | "Present";
};

export type AvailabilitySlot = {
  dayLabel: string;   // e.g. "TUE APR 28"
  timeRange: string;  // e.g. "5:00 — 5:15 PM EDT"
  altTz?: string;     // e.g. "(2:00 PM PDT)"
};

export type AlumnusProfile = {
  id: string;
  name: string;
  initials: string;
  role: string;
  company: string;
  city: string;
  cohort: string;
  linkedinUrl: string;
  score: number;
  shortBio: string;
  customMessage?: string;
  background: BackgroundEntry[];
  industries: string[];
  offerings: Offering[];
  nonOfferings: NonOffering[];
  nonOfferingsQuote: string;
  availabilityDays: DayOfWeek[];
  availabilitySlots: AvailabilitySlot[];
  availabilityTimezone: string;
  availabilityLevel: AvailabilityLevel;
  responseTimeHours: number;
};

/** Lightweight card representation used on match/home screens */
export type AlumnusCard = Pick<
  AlumnusProfile,
  | "id"
  | "name"
  | "role"
  | "company"
  | "city"
  | "cohort"
  | "score"
  | "shortBio"
  | "offerings"
  | "nonOfferings"
  | "availabilityLevel"
>;
