import { z } from "zod";

export const CALL_FORMATS = ["15min", "20min"] as const;

export const askComposerSchema = z.object({
  alumniId: z.string().min(1),
  topicId: z.string().min(1, "Select a topic from the alumni's offerings."),
  opener: z
    .string()
    .min(50, "Your opener should be at least 50 characters.")
    .max(800, "Keep the opener under 800 characters."),
  question: z
    .string()
    .min(20, "Your question should be at least 20 characters.")
    .max(400, "Keep the question under 400 characters."),
  format: z.enum(CALL_FORMATS),
  proposedSlots: z
    .array(z.string())
    .min(1, "Select at least one time slot.")
    .max(3, "Select up to 3 time slots."),
});

export type AskComposerFormValues = z.infer<typeof askComposerSchema>;

// ─── Decline form (alumni side) ──────────────────────────────────────────────

export const DECLINE_REASONS = [
  "Outside my scope",
  "Fully booked",
  "Not the right fit",
  "Prefer async",
] as const;

export const declineSchema = z.object({
  reason: z.enum(DECLINE_REASONS, { error: "Select a decline reason." }),
  note: z
    .string()
    .max(400, "Note must be 400 characters or fewer.")
    .optional(),
});

export type DeclineFormValues = z.infer<typeof declineSchema>;

// ─── Accept form (alumni side) ───────────────────────────────────────────────

export const acceptSchema = z.object({
  chosenSlot: z.string().min(1, "Select a time slot."),
  note: z
    .string()
    .max(400, "Note must be 400 characters or fewer.")
    .optional(),
});

export type AcceptFormValues = z.infer<typeof acceptSchema>;
