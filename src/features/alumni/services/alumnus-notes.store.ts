/**
 * AlumnusNotesStore — client-side in-memory store for alumnus post-call notes.
 *
 * In production: replace with a Server Action that persists to Prisma.
 */

export type AlumnusNoteEntry = {
  studentId: string;
  studentName: string;
  studentProgram: string;
  studentCohort: string;
  topic: string;
  standout: string;
  hiringSignal: string;
  privateNotes: string;
  savedAt: Date;
  reflectionStatus: "reflected" | "unreflected";
};

let _entries: AlumnusNoteEntry[] = [];
const _listeners = new Set<() => void>();

function seedMockEntries(): void {
  if (_entries.length > 0) return;
  _entries = [
    {
      studentId: "maya-chen",
      studentName: "Maya Chen",
      studentProgram: "MMA",
      studentCohort: "'26",
      topic: "Career pivot",
      standout:
        "Sharp on the pivot story — knows exactly which roles she's targeting and why. Communicates clearly and takes feedback well.",
      hiringSignal: "Strong candidate — keep an eye on",
      privateNotes: "Would refer once she has 1-2 more analytics projects in her portfolio.",
      savedAt: new Date("2026-05-01T17:30:00"),
      reflectionStatus: "reflected",
    },
    {
      studentId: "sofia-reyes",
      studentName: "Sofia Reyes",
      studentProgram: "MMA",
      studentCohort: "'26",
      topic: "Portfolio review",
      standout:
        "Solid technical foundation, especially on SQL and dbt work. Self-aware about gaps and follows through on suggestions from previous calls.",
      hiringSignal: "I'd refer this person",
      privateNotes: "Recommended she add a marketing-mix model project to round out the storytelling side.",
      savedAt: new Date("2026-04-23T14:00:00"),
      reflectionStatus: "reflected",
    },
    {
      studentId: "liam-obrien",
      studentName: "Liam O'Brien",
      studentProgram: "MMA",
      studentCohort: "'25",
      topic: "Behavioral interview",
      standout:
        "Came well-prepared with structured questions. Has clear goals about which industries he's targeting.",
      hiringSignal: "Promising — needs more experience",
      privateNotes:
        "Stories were structured but a bit rehearsed — encouraged him to leave room for natural follow-ups.",
      savedAt: new Date("2026-04-14T11:00:00"),
      reflectionStatus: "reflected",
    },
    {
      studentId: "aisha-patel",
      studentName: "Aisha Patel",
      studentProgram: "MMA",
      studentCohort: "'26",
      topic: "Data case",
      standout: "",
      hiringSignal: "",
      privateNotes: "",
      savedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      reflectionStatus: "unreflected",
    },
  ];
}

seedMockEntries();

export const alumnusNotesStore = {
  getAll: (): AlumnusNoteEntry[] => _entries,

  add: (
    entry: Omit<AlumnusNoteEntry, "reflectionStatus"> & {
      reflectionStatus?: "reflected" | "unreflected";
    },
  ): void => {
    const withStatus: AlumnusNoteEntry = { reflectionStatus: "reflected", ...entry };
    const idx = _entries.findIndex(
      (e) => e.studentName === entry.studentName && e.topic === entry.topic,
    );
    if (idx !== -1) {
      _entries = _entries.map((e, i) => (i === idx ? withStatus : e));
    } else {
      _entries = [..._entries, withStatus];
    }
    _listeners.forEach((fn) => fn());
  },

  subscribe: (fn: () => void): (() => void) => {
    _listeners.add(fn);
    return () => {
      _listeners.delete(fn);
    };
  },
};
