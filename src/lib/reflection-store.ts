export type ReflectionEntry = {
  alumniId: string;
  alumniName: string;
  alumniRole: string;
  alumniCompany: string;
  topic: string;
  standout: string;
  helpful: string;
  note: string;
  aiNextStep: string;
  savedAt: Date;
};

let _entries: ReflectionEntry[] = [];
const _listeners = new Set<() => void>();

export const reflectionStore = {
  getAll: () => _entries,
  add: (entry: ReflectionEntry) => {
    _entries = [..._entries, entry];
    _listeners.forEach((fn) => fn());
  },
  subscribe: (fn: () => void): (() => void) => {
    _listeners.add(fn);
    return () => { _listeners.delete(fn); };
  },
};
