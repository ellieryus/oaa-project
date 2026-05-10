"use server";

import { z } from "zod";
import type { ActionResult } from "@/types/global";
import {
  askComposerSchema,
  acceptSchema,
  declineSchema,
} from "@/features/requests/schemas/request.schema";
import { RequestService } from "@/server/modules/requests/request.service";

/**
 * Submit a new ask from a student to an alumnus.
 * In production: creates a Request record via Prisma.
 */
export async function submitAsk(
  formData: z.infer<typeof askComposerSchema>,
): Promise<ActionResult<{ requestId: string }>> {
  const parsed = askComposerSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form." };
  }

  // TODO: persist via RequestRepository.create(parsed.data)
  console.info("[requests] ask submitted", parsed.data);

  return { ok: true, data: { requestId: `req-${Date.now()}` } };
}

/**
 * Accept an incoming request (alumnus action).
 */
export async function acceptRequest(
  requestId: string,
  formData: z.infer<typeof acceptSchema>,
): Promise<ActionResult> {
  const parsed = acceptSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const request = await RequestService.getRequestById(requestId);
  if (!request) {
    return { ok: false, error: "Request not found." };
  }

  // TODO: RequestRepository.updateStatus(requestId, "accepted", parsed.data)
  console.info("[requests] request accepted", requestId, parsed.data);

  return { ok: true, data: undefined };
}

/**
 * Decline an incoming request (alumnus action).
 */
export async function declineRequest(
  requestId: string,
  formData: z.infer<typeof declineSchema>,
): Promise<ActionResult> {
  const parsed = declineSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const request = await RequestService.getRequestById(requestId);
  if (!request) {
    return { ok: false, error: "Request not found." };
  }

  // TODO: RequestRepository.updateStatus(requestId, "declined", parsed.data)
  console.info("[requests] request declined", requestId, parsed.data);

  return { ok: true, data: undefined };
}
