/**
 * ModalDismissedStore — client-side session memory for dismissed modal states.
 * Prevents nudge modals from re-appearing after the user dismisses them.
 *
 * In production: persist to localStorage or a user-preference API.
 */

const _dismissed = new Set<string>();

export const isDismissed = (key: string): boolean => _dismissed.has(key);
export const dismiss = (key: string): void => {
  _dismissed.add(key);
};
