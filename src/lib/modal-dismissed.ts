const _dismissed = new Set<string>();
export const isDismissed = (key: string) => _dismissed.has(key);
export const dismiss = (key: string) => _dismissed.add(key);
