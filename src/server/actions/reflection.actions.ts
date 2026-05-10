"use server";

import { z } from "zod";
import type { ActionResult } from "@/types/global";
import {
  studentReflectionSchema,
  alumnusPostCallSchema,
} from "@/features/student/schemas/reflection.schema";

/**
 * Save a student's post-call reflection.
 * In production: persist via Prisma, invalidate cache.
 */
export async function saveStudentReflection(
  formData: z.infer<typeof studentReflectionSchema>,
): Promise<ActionResult<{ savedAt: string }>> {
  const parsed = studentReflectionSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid reflection." };
  }

  // TODO: ReflectionRepository.create(parsed.data)
  const savedAt = new Date().toISOString();
  console.info("[reflect] student reflection saved", parsed.data.requestId);

  return { ok: true, data: { savedAt } };
}

/**
 * Save an alumnus's post-call notes.
 * In production: persist via Prisma.
 */
export async function saveAlumnusPostCallNotes(
  formData: z.infer<typeof alumnusPostCallSchema>,
): Promise<ActionResult<{ savedAt: string }>> {
  const parsed = alumnusPostCallSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid notes." };
  }

  // TODO: AlumnusNotesRepository.create(parsed.data)
  const savedAt = new Date().toISOString();
  console.info("[post-call] alumnus notes saved", parsed.data.requestId);

  return { ok: true, data: { savedAt } };
}
