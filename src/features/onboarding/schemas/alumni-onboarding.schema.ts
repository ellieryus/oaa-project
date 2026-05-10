import { z } from "zod";

// ─── Step 1: Background ──────────────────────────────────────────────────────

export const INDUSTRIES = [
  "Tech",
  "Finance",
  "Healthcare",
  "Retail",
  "CPG",
  "Media",
  "Public sector",
  "Energy",
  "Consulting",
  "Banking",
  "Aviation",
  "Telecom",
  "HR Tech",
] as const;

export const backgroundEntrySchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company is required."),
  role: z.string().min(1, "Role is required."),
  location: z.string().optional(),
  startYear: z.string().min(4, "Enter a valid year."),
  endYear: z.string().min(4, 'Enter a valid year, or "Present".'),
});

export const alumnusBackgroundSchema = z.object({
  background: z
    .array(backgroundEntrySchema)
    .min(1, "Add at least one role."),
  industries: z
    .array(z.enum(INDUSTRIES))
    .min(1, "Select at least one industry."),
  skills: z.array(z.string().min(1)).max(8, "Add up to 8 skills."),
  cohort: z.string().min(1, "Enter your MMA cohort year."),
  linkedinUrl: z.string().url("Enter a valid LinkedIn URL."),
});

export type AlumnusBackgroundFormValues = z.infer<typeof alumnusBackgroundSchema>;

// ─── Step 2: Offerings ───────────────────────────────────────────────────────

export const OFFERING_TEMPLATES = [
  { id: "career-pivot",          title: "Career pivot",          description: "Talk through changing tracks based on your experience." },
  { id: "portfolio-review",      title: "Portfolio review",      description: "Walk through a student's portfolio with feedback." },
  { id: "data-case",             title: "Data case",             description: "Mock or prep for analytics/data case rounds." },
  { id: "behavioral-interview",  title: "Behavioral interview",  description: "Run through STAR-format interview questions." },
  { id: "resume-review",         title: "Resume review",         description: "Line-by-line feedback on resume and positioning." },
  { id: "technical-interview",   title: "Technical interview",   description: "SQL, Python, stats — full mock technical loop." },
] as const;

export const offeringSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required.").max(200, "Keep it under 200 characters."),
});

export const offeringsSchema = z.object({
  offerings: z
    .array(offeringSchema)
    .min(1, "Add at least one offering.")
    .max(6, "Add up to 6 offerings."),
});

export type OfferingsFormValues = z.infer<typeof offeringsSchema>;

// ─── Step 3: Non-offerings ───────────────────────────────────────────────────

export const nonOfferingSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required."),
  reason: z.string().max(200, "Keep the reason under 200 characters.").optional(),
});

export const nonOfferingsSchema = z.object({
  nonOfferings: z
    .array(nonOfferingSchema)
    .max(6, "Add up to 6 non-offerings."),
  nonOfferingsQuote: z
    .string()
    .max(400, "Keep the quote under 400 characters.")
    .optional(),
});

export type NonOfferingsFormValues = z.infer<typeof nonOfferingsSchema>;

// ─── Step 4: Availability ────────────────────────────────────────────────────

export const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const TIMEZONES = ["America/Toronto", "America/New_York", "America/Vancouver", "America/Chicago", "America/Los_Angeles"] as const;

export const availabilitySchema = z.object({
  availabilityDays: z
    .array(z.enum(DAYS_OF_WEEK))
    .min(1, "Select at least one availability day."),
  timezone: z.enum(TIMEZONES, {
    error: "Select a timezone.",
  }),
  responseTimeHours: z.number().int().min(1).max(168),
  acceptingRequests: z.boolean(),
});

export type AvailabilityFormValues = z.infer<typeof availabilitySchema>;
