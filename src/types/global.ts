/**
 * Global type utilities used across the entire app.
 * Domain-specific types belong in their respective feature or server/modules folder.
 */

/** Make selected keys of T required */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Strip null/undefined from all values */
export type NonNullableFields<T> = { [K in keyof T]: NonNullable<T[K]> };

/** Generic async server-action result */
export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string };

/** Role union used everywhere */
export type UserRole = "student" | "alumnus";

/** Status values for a Request entity */
export type RequestStatus = "pending" | "accepted" | "declined" | "completed";
