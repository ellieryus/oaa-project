/**
 * Server-side validators shared across multiple modules.
 * These run inside Server Actions and Route Handlers.
 */

const MCGILL_DOMAINS = ["mail.mcgill.ca", "mcgill.ca"] as const;

/**
 * Validates that an email belongs to a McGill domain.
 */
export function isMcGillEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1];
  return MCGILL_DOMAINS.includes(domain as (typeof MCGILL_DOMAINS)[number]);
}

/**
 * Checks whether a request topic is within the alumnus's declared offerings.
 * Returns true if the offeringId is in the alumnus's offering list.
 *
 * In production: query via OfferingItemRepository.
 */
export function isWithinScope(
  offeringId: string,
  alumnusOfferingIds: string[],
): boolean {
  return alumnusOfferingIds.includes(offeringId);
}

/**
 * Checks whether a proposed time slot exists in the alumnus's availability.
 *
 * In production: query via AvailabilitySlotRepository.
 */
export function isAvailableSlot(
  slotLabel: string,
  availableSlotLabels: string[],
): boolean {
  return availableSlotLabels.includes(slotLabel);
}
