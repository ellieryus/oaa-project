// ============================================================
// MOCK DATA — VIDEO DEMO
// Single source of truth for the 9 screens used in the 2-min
// video. Edit values here, every screen updates.
// ============================================================

// --- People ---

export const MAYA_VIDEO = {
  id: "maya-chen",
  name: "Maya Chen",
  initials: "MC",
  cohort: "MMA '26",
  email: "maya.chen@mail.mcgill.ca",
  targetRole: "Data Scientist",
  targetCity: "Toronto",
  background: "Marketing analyst, Lululemon (2024–2025)",
  capstoneTopic: "Customer churn prediction",
  projectUrl: "maya-chen.dev/churn-capstone",
  projectTitle: "Churn prediction model with deployment write-up",
} as const;

export const ADAM_VIDEO = {
  id: "adam-farouk",
  name: "Adam Farouk",
  initials: "AF",
  cohort: "MMA '19",
  role: "Director of Data",
  company: "Shopify",
  city: "Toronto",
  offerings: ["Career pivot", "Portfolio review", "Data case", "Behavioral interview"],
  nonOfferings: ["Technical interview", "Job referral", "Salary negotiation"],
} as const;

export const SARAH_VIDEO = {
  id: "sarah-tremblay",
  name: "Sarah Tremblay",
  initials: "ST",
  role: "MMA Program Director",
  cohortLabel: "MMA '26",
  cohortSize: 68,
} as const;

// --- Other students on Adam's watching list (decoration) ---

export const WATCHING_OTHERS = [
  {
    id: "jordan-liu",
    name: "Jordan Liu",
    initials: "JL",
    cohort: "MMA '26",
    lastTalked: "Oct 28, 2026",
    callsCount: 1,
    rating: "refer-after-gap" as const,
    tags: ["Curious", "Self-directed"],
    note: "Portfolio review. Strong on SQL, needs case interview reps.",
  },
  {
    id: "priya-iyer",
    name: "Priya Iyer",
    initials: "PI",
    cohort: "MMA '26",
    lastTalked: "Oct 5, 2026",
    callsCount: 1,
    rating: "cant-say" as const,
    tags: [] as string[],
    note: "Data case session. Too early to call.",
  },
];

// --- Timeline ---

export const TIMELINE_VIDEO = {
  firstCall: { date: "Oct 12, 2026", week: 1 },
  mayaBuildsPeriod: { start: "Oct 13, 2026", end: "Nov 16, 2026" },
  mayaSendsUpdate: { date: "Nov 18, 2026", week: 6 },
  secondCall: { date: "Nov 25, 2026", week: 7 },
  roleOpens: { date: "Dec 16, 2026", week: 9 },
  interview: { date: "Dec 23, 2026", week: 10 },
  offer: { date: "Jan 6, 2027", week: 12 },
} as const;

// --- First call: AI rubric extraction (what Adam sees Oct 12) ---

export const FIRST_CALL_RUBRIC = {
  strengths: [
    {
      tag: "Analytical structure",
      evidence: "you praised her structured pitch of marketing → data motivation",
      confirmed: true,
    },
    {
      tag: "Learning velocity",
      evidence: "she taught herself SQL during the capstone",
      confirmed: true,
    },
  ],
  gaps: [
    {
      tag: "Project depth",
      evidence: "end-to-end project (mentioned twice)",
      confirmed: true,
    },
    {
      tag: "Technical depth",
      evidence: "production ML experience",
      confirmed: false,
    },
  ],
  rating: "refer-after-gap" as const,
};

// --- Maya's reflection after first call (Oct 12) ---

export const MAYA_FIRST_REFLECTION = {
  learnings: [
    "An end-to-end ML project would be the strongest differentiator (Adam mentioned twice)",
    "Reframe analytical experience on CV with analytical lens",
    "Shopify analytics team uses BigQuery + dbt + Looker",
  ],
  priorities: [
    "Ship one end-to-end project",
    "Re-frame analytical experience on CV",
  ],
  trajectory: "First call complete. Patterns will emerge after 2+ calls.",
  followUpSuggestion: "In 6–8 weeks, share the project link with Adam.",
};

// --- Maya's dashboard priorities (post-reflection state) ---

export const MAYA_DASHBOARD = {
  priorities: [
    {
      id: "p1",
      label: "Ship one end-to-end project",
      mentionedBy: ["adam-farouk"],
      status: "open" as const,
    },
    {
      id: "p2",
      label: "Re-frame analytical experience on CV",
      mentionedBy: ["adam-farouk"],
      status: "open" as const,
    },
  ],
  trajectory: "First call complete. Patterns will emerge after 2+ calls.",
};

// --- Maya's gap closure submission (Nov 18) ---

export const MAYA_GAP_CLOSURE = {
  gapClosedLabel: "Ship one end-to-end project",
  projectUrl: "maya-chen.dev/churn-capstone",
  writeup:
    "Built a customer churn classifier on Telco data — trained in scikit-learn, " +
    "deployed via FastAPI on Render. Write-up walks through feature engineering " +
    "and how I'd extend it for production.",
  shareWithAlumnusId: "adam-farouk",
  messageToAlumnus:
    "Quick update from our October chat. You mentioned an end-to-end project would help me. " +
    "I built one for my capstone — link below. Would love 15 minutes for your feedback on how " +
    "to frame it on my CV.",
};

// --- Adam's inbox: weekly digest card for Maya's update ---

export const ADAM_DIGEST_MAYA = {
  type: "update" as const,
  studentId: "maya-chen",
  studentName: "Maya Chen",
  pastNoteSummary: "refer after end-to-end project",
  previousStrengths: ["Analytical structure", "Learning velocity"],
  evidence: {
    url: "maya-chen.dev/churn-capstone",
    label: "Churn prediction model with deployment write-up",
  },
  message:
    "Quick update from our October chat. You mentioned an end-to-end project would help me. " +
    "I built one for my capstone — link below. Would love 15 minutes for your feedback on how " +
    "to frame it on my CV.",
  proposedDuration: "15 min",
};

// --- Second call: AI rubric extraction (what Adam sees Nov 25) ---
// This is the DELTA view — shows what's changed since first call.

export const SECOND_CALL_RUBRIC = {
  previouslyTaggedStrengths: ["Analytical structure", "Learning velocity"],
  newStrengths: [
    {
      tag: "Communication clarity",
      evidence: "sharper framing of analytical work",
      confirmed: true,
    },
  ],
  closedGaps: [
    {
      tag: "Project depth",
      evidence: "shipped capstone, walked you through deployment",
      confirmed: true,
    },
  ],
  rating: "refer-now" as const,
  suggestedRating: "refer-now" as const,
};

// --- Adam's watching list (post second-rubric state) ---

export const ADAM_WATCHING = [
  {
    id: "maya-chen",
    name: "Maya Chen",
    initials: "MC",
    cohort: "MMA '26",
    lastTalked: "Nov 25, 2026",
    callsCount: 2,
    rating: "refer-now" as const,
    tags: ["Analytical structure", "Learning velocity", "Communication clarity"],
    note: "Marketing → data pivot. Shipped capstone with deployment.",
  },
  ...WATCHING_OTHERS,
];

// --- Adam → Maya DM (Dec 16, when role opens) ---

export const ADAM_DM_TO_MAYA = {
  to: "maya-chen",
  context: {
    lastTalked: "Nov 25, 2026",
    rating: "refer-now" as const,
  },
  body:
    "Maya — we just posted a junior data scientist role on my growth team. " +
    "Saw it and thought of you given the project you shipped. Interested?",
  sentAt: "Dec 16, 2026",
};

// --- Sarah's admin dashboard (cohort term-end) ---

export const SARAH_DASHBOARD = {
  cohort: "MMA '26",
  funnel: {
    studentsTotal: 68,
    studentsWithCalls: 41,
    referralsPlaced: 4,
    offersInHand: 1,
  },
  topGapsNamedByAlumni: [
    { gap: "SQL fluency", flaggedIn: 14 },
    { gap: "Data visualization depth", flaggedIn: 11 },
    { gap: "Deep learning project experience", flaggedIn: 9 },
  ],
  alumniResponseRate: 0.78,
};

// --- Maya × Adam in-call screen ---

export const MAYA_IN_CALL = {
  requestId: "req-adam",
  topic: "Career pivot",
  duration: "15 min scheduled",
  timer: "12:34",
  participants: {
    self: { name: "Maya Chen", initials: "MC" },
    other: {
      name: "Adam Farouk",
      initials: "AF",
      role: "Director of Data, Shopify",
    },
  },
  aiNotes: {
    topicsCovered: [
      { label: "Career pivot framing", status: "done" as const },
      { label: "Adam's transition from consulting", status: "done" as const },
      { label: "Portfolio recommendations", status: "in-progress" as const },
    ],
    strengthsEmerging: ["Analytical structure", "Learning velocity"],
    gapsMentioned: ["End-to-end project (mentioned 2x)"],
  },
};

// --- Type helpers ---

export type ReferralRating =
  | "refer-now"
  | "refer-after-gap"
  | "not-foreseeable"
  | "cant-say";
