import { z } from "zod";

// ─── Student reflection (after their call) ───────────────────────────────────

export const FOLLOW_UP_OPTIONS = [
  "Definitely — I have a clear next ask",
  "Maybe — if something specific comes up",
  "Not yet — I need to do the work first",
  "No — we covered what I needed",
  "Not sure yet",
] as const;

export const studentReflectionSchema = z.object({
  requestId: z.string().min(1),
  standout: z
    .string()
    .min(1, "Share at least one takeaway.")
    .max(600, "Keep takeaways under 600 characters."),
  followUpIntent: z.enum(FOLLOW_UP_OPTIONS, {
    error: "Select a follow-up intent.",
  }),
  note: z
    .string()
    .max(1000, "Notes must be under 1,000 characters.")
    .optional(),
});

export type StudentReflectionFormValues = z.infer<typeof studentReflectionSchema>;

// ─── Alumnus post-call notes ─────────────────────────────────────────────────

export const HIRING_SIGNAL_OPTIONS = [
  "Strong candidate — keep an eye on",
  "I'd refer this person",
  "Promising — needs more experience",
  "Not sure yet",
  "Not a fit",
] as const;

export const alumnusPostCallSchema = z.object({
  requestId: z.string().min(1),
  standout: z
    .string()
    .max(600, "Keep this under 600 characters.")
    .optional(),
  hiringSignal: z.enum(HIRING_SIGNAL_OPTIONS).optional(),
  privateNotes: z
    .string()
    .max(1000, "Notes must be under 1,000 characters.")
    .optional(),
});

export type AlumnusPostCallFormValues = z.infer<typeof alumnusPostCallSchema>;
