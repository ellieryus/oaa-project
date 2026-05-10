/**
 * Prisma client singleton.
 *
 * Prevents multiple PrismaClient instances in Next.js dev (hot-reload safe).
 * In production install: `npm install prisma @prisma/client` then run `npx prisma generate`.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForPrisma = global as typeof globalThis & { prisma?: any };

// TODO: uncomment when Prisma is installed
// import { PrismaClient } from "@prisma/client";
// export const db: PrismaClient =
//   globalForPrisma.prisma ?? new PrismaClient({ log: ["error"] });
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

/** Placeholder until Prisma is wired. */
export const db = null;
