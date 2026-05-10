"use server";

import { z } from "zod";
import type { ActionResult } from "@/types/global";
import {
  aspirationsSchema,
  backgroundSchema,
  helpNeedsSchema,
} from "@/features/onboarding/schemas/student-onboarding.schema";
import {
  alumnusBackgroundSchema,
  offeringsSchema,
  nonOfferingsSchema,
  availabilitySchema,
} from "@/features/onboarding/schemas/alumni-onboarding.schema";

// ─── Student ─────────────────────────────────────────────────────────────────

export async function saveStudentAspirations(
  formData: z.infer<typeof aspirationsSchema>,
): Promise<ActionResult> {
  const parsed = aspirationsSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form." };
  }
  // TODO: StudentRepository.upsertAspirations(session.userId, parsed.data)
  console.info("[onboarding] student aspirations saved");
  return { ok: true, data: undefined };
}

export async function saveStudentBackground(
  formData: z.infer<typeof backgroundSchema>,
): Promise<ActionResult> {
  const parsed = backgroundSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form." };
  }
  // TODO: StudentRepository.upsertBackground(session.userId, parsed.data)
  console.info("[onboarding] student background saved");
  return { ok: true, data: undefined };
}

export async function saveStudentHelpNeeds(
  formData: z.infer<typeof helpNeedsSchema>,
): Promise<ActionResult> {
  const parsed = helpNeedsSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form." };
  }
  // TODO: StudentRepository.upsertHelpNeeds(session.userId, parsed.data)
  console.info("[onboarding] student help needs saved");
  return { ok: true, data: undefined };
}

// ─── Alumnus ─────────────────────────────────────────────────────────────────

export async function saveAlumnusBackground(
  formData: z.infer<typeof alumnusBackgroundSchema>,
): Promise<ActionResult> {
  const parsed = alumnusBackgroundSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form." };
  }
  // TODO: AlumnusRepository.upsertBackground(session.userId, parsed.data)
  console.info("[onboarding] alumnus background saved");
  return { ok: true, data: undefined };
}

export async function saveAlumnusOfferings(
  formData: z.infer<typeof offeringsSchema>,
): Promise<ActionResult> {
  const parsed = offeringsSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form." };
  }
  // TODO: AlumnusRepository.upsertOfferings(session.userId, parsed.data)
  console.info("[onboarding] alumnus offerings saved");
  return { ok: true, data: undefined };
}

export async function saveAlumnusNonOfferings(
  formData: z.infer<typeof nonOfferingsSchema>,
): Promise<ActionResult> {
  const parsed = nonOfferingsSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form." };
  }
  // TODO: AlumnusRepository.upsertNonOfferings(session.userId, parsed.data)
  console.info("[onboarding] alumnus non-offerings saved");
  return { ok: true, data: undefined };
}

export async function saveAlumnusAvailability(
  formData: z.infer<typeof availabilitySchema>,
): Promise<ActionResult> {
  const parsed = availabilitySchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form." };
  }
  // TODO: AlumnusRepository.upsertAvailability(session.userId, parsed.data)
  console.info("[onboarding] alumnus availability saved");
  return { ok: true, data: undefined };
}
