"use server";

import { z } from "zod";
import type { ActionResult } from "@/types/global";
import { signInSchema } from "@/features/auth/schemas/auth.schema";

/**
 * Sends a magic-link sign-in email to the given McGill address.
 * In production: integrate Resend + a token store.
 */
export async function sendSignInLink(
  formData: z.infer<typeof signInSchema>,
): Promise<ActionResult<{ email: string }>> {
  const parsed = signInSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { email } = parsed.data;

  // TODO: generate token, store it, send via Resend
  // await resend.emails.send({ to: email, subject: "Your OAA sign-in link", ... });

  console.info("[auth] sign-in link requested for", email);
  return { ok: true, data: { email } };
}
