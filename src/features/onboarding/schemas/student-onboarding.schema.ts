import { z } from "zod";

// ─── Step 1: Aspirations ────────────────────────────────────────────────────

export const ASPIRATION_ROLES = [
  "Data Analyst",
  "Data Scientist",
  "Data Engineer",
  "AI/ML Engineer",
  "AI Agent Engineer",
  "Product Analyst / Tech PM",
  "People/HR Analytics",
  "Analytics Consulting",
  "Still exploring",
] as const;

export const ASPIRATION_INDUSTRIES = [
  "Open to any industry",
  "Tech",
  "Finance",
  "Healthcare",
  "Retail",
  "CPG",
  "Media",
  "Public sector",
  "Energy",
] as const;

export const EXPERIENCE_LEVELS = [
  { id: "none", label: "No experience yet" },
  { id: "some", label: "Some experience" },
  { id: "several", label: "Several years" },
] as const;

export const aspirationsSchema = z.object({
  roles: z
    .array(z.enum(ASPIRATION_ROLES))
    .min(3, "Select at least 3 role aspirations.")
    .max(5, "Select up to 5 role aspirations."),
  industries: z
    .array(z.enum(ASPIRATION_INDUSTRIES))
    .min(1, "Select at least one industry."),
  targetCity: z.string().min(1, "Enter a target city."),
  experienceLevel: z.enum(["none", "some", "several"], {
    error: "Select your experience level.",
  }),
});

export type AspirationsFormValues = z.infer<typeof aspirationsSchema>;

// ─── Step 2: Background ─────────────────────────────────────────────────────

export const educationEntrySchema = z.object({
  id: z.string(),
  school: z.string().min(1, "School name is required."),
  program: z.string().min(1, "Program is required."),
  year: z.string().min(4, "Enter a valid year."),
});

export const backgroundSchema = z.object({
  education: z
    .array(educationEntrySchema)
    .min(1, "Add at least one education entry."),
  skills: z
    .array(z.string().min(1))
    .max(8, "Add up to 8 skills."),
  portfolioUrl: z.string().url("Enter a valid URL.").optional().or(z.literal("")),
});

export type BackgroundFormValues = z.infer<typeof backgroundSchema>;

// ─── Step 3: Help needs ──────────────────────────────────────────────────────

export const HELP_AREAS = [
  "Career pivot",
  "Navigate city",
  "Behavioral interview",
  "Technical interview",
  "Consulting case",
  "Data case",
  "Resume review",
  "Portfolio review",
] as const;

export const helpNeedsSchema = z.object({
  areas: z
    .array(z.enum(HELP_AREAS))
    .min(3, "Select at least 3 help areas.")
    .max(5, "Select up to 5 help areas."),
  note: z
    .string()
    .max(280, "Note must be 280 characters or fewer.")
    .optional(),
});

export type HelpNeedsFormValues = z.infer<typeof helpNeedsSchema>;
