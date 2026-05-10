/**
 * Application configuration.
 * All environment-driven settings live here so call-sites never touch process.env directly.
 */

export const appConfig = {
  name: "One Ask Away",
  description: "Scoped career conversations between McGill MMA students and alumni.",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",

  /** Anthropic API — only used server-side */
  anthropicApiKey: process.env.ANTHROPIC_API_KEY ?? "",

  /** Database */
  databaseUrl: process.env.DATABASE_URL ?? "",

  /** Resend (email) */
  resendApiKey: process.env.RESEND_API_KEY ?? "",

  /** Auth */
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret-change-in-prod",
  sessionCookieName: "oaa_session",
} as const;
