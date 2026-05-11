export type Student = {
  name: string;
  firstName: string;
  avatarInitials: string;
  cohort: string;
  program: string;
  primaryAspiration: string;
  aspirations: string[];
  helpNeeds: string[];
  background: { institution: string; role: string }[];
  portfolioUrl?: string;
};

export type MockRequest = {
  id: string;
  alumniId: string;
  alumniName: string;
  alumniRole: string;
  alumniCompany: string;
  alumniInitials: string;
  topic: string;
  status: "pending" | "accepted" | "declined" | "completed";
  statusMeta: string;
  opener: string;
  question: string;
  proposedTimes: string[];
  sentAgo: string;
  declineReason?: string;
  declineNote?: string;
  confirmedTime?: string;
  confirmedMeta?: string;
  meetingLink?: string;
  alumniNote?: string;
  worthConsideringId?: string;
  platform?: string;
  callState?: "live" | "tomorrow" | "soon";
  callTimeDisplay?: string;
  callStatusLabel?: string;
};

// Maya Chen — the logged-in student for Section 04 flows
export const STUDENT: Student = {
  name: "Maya Chen",
  firstName: "Maya",
  avatarInitials: "MC",
  cohort: "MMA '26",
  program: "MMA",
  primaryAspiration: "Data Analyst",
  aspirations: ["Data Analyst", "Product Analyst", "Marketing Data Scientist"],
  helpNeeds: ["Portfolio review", "Resume review", "Behavioral interview"],
  background: [
    { institution: "McGill", role: "Master of Mgmt in Analytics" },
    { institution: "Lululemon", role: "Marketing analyst intern" },
  ],
  portfolioUrl: "https://github.com/mayachen-mma",
};

const JORDAN_LIU: Student = {
  name: "Jordan Liu",
  firstName: "Jordan",
  avatarInitials: "JL",
  cohort: "MMA '26",
  program: "MMA",
  primaryAspiration: "Product Analyst",
  aspirations: ["Product Analyst", "Growth Analyst", "Data Analyst"],
  helpNeeds: ["Portfolio review", "Resume review", "Case interview"],
  background: [
    { institution: "McGill", role: "Master of Mgmt in Analytics" },
    { institution: "Deloitte", role: "Business analyst intern" },
  ],
};

const PRIYA_NAIR: Student = {
  name: "Priya Nair",
  firstName: "Priya",
  avatarInitials: "PN",
  cohort: "MMA '26",
  program: "MMA",
  primaryAspiration: "Data Scientist",
  aspirations: ["Data Scientist", "ML Engineer", "Product Analyst"],
  helpNeeds: ["Data case interview", "Technical interview", "Resume review"],
  background: [
    { institution: "McGill", role: "Master of Mgmt in Analytics" },
    { institution: "TD Bank", role: "Data science co-op" },
  ],
};

const SAM_PATEL: Student = {
  name: "Sam Patel",
  firstName: "Sam",
  avatarInitials: "SP",
  cohort: "MMA '26",
  program: "MMA",
  primaryAspiration: "Financial Analyst",
  aspirations: ["Financial Analyst", "Data Analyst", "Strategy Analyst"],
  helpNeeds: ["Behavioral interview", "Resume review", "Industry insights"],
  background: [
    { institution: "McGill", role: "Master of Mgmt in Analytics" },
    { institution: "KPMG", role: "Advisory intern" },
  ],
};

const ANIK_BHATT: Student = {
  name: "Anik Bhatt",
  firstName: "Anik",
  avatarInitials: "AB",
  cohort: "MMA '26",
  program: "MMA",
  primaryAspiration: "Strategy Consultant",
  aspirations: ["Strategy Consultant", "Product Manager", "Data Analyst"],
  helpNeeds: ["Career pivot advice", "Case interview", "Networking tips"],
  background: [
    { institution: "McGill", role: "Master of Mgmt in Analytics" },
    { institution: "BCG", role: "Research associate intern" },
  ],
};

const LILY_OSEI: Student = {
  name: "Lily Osei",
  firstName: "Lily",
  avatarInitials: "LO",
  cohort: "MMA '25",
  program: "MMA",
  primaryAspiration: "Marketing Analyst",
  aspirations: ["Marketing Analyst", "Brand Strategist", "Data Analyst"],
  helpNeeds: ["Career pivot advice", "Portfolio review", "Resume review"],
  background: [
    { institution: "McGill", role: "Master of Mgmt in Analytics" },
    { institution: "L'Oreal", role: "Marketing data intern" },
  ],
};

export const STUDENTS: Student[] = [
  STUDENT,
  JORDAN_LIU,
  PRIYA_NAIR,
  SAM_PATEL,
  ANIK_BHATT,
  LILY_OSEI,
];

export const MOCK_REQUESTS: MockRequest[] = [
  {
    id: "req-adam",
    alumniId: "adam-farouk",
    alumniName: "Adam Farouk",
    alumniRole: "Director of Data",
    alumniCompany: "Shopify",
    alumniInitials: "AF",
    topic: "Career pivot",
    status: "accepted",
    statusMeta: "Sent 2 days ago · Accepted yesterday at 4pm",
    opener:
      "Hi Adam — I'm a current MMA student aiming for product analytics roles. I noticed you pivoted from consulting into Shopify's analytics team — that path is exactly what I'm trying to navigate. Could we spend 15 minutes on how you positioned yourself for that switch?",
    question: "How did you decide which roles to apply to during your transition?",
    proposedTimes: ["Tue Apr 28 · 1pm", "Fri May 1 · 1pm"],
    sentAgo: "Accepted yesterday",
    confirmedTime: "Friday May 1 · 1:00 PM EDT",
    confirmedMeta: "15 min · virtual call with Adam",
    meetingLink: "shopify.zoom.us/j/87234...",
    alumniNote: "Looking forward — feel free to share what you'd like to focus on beforehand.",
    platform: "Zoom",
    callState: "live",
    callTimeDisplay: "TODAY · 1:00 PM EDT (10:00 AM PDT)",
    callStatusLabel: "Live now",
  },
  {
    id: "req-lena-call",
    alumniId: "lena-park",
    alumniName: "Lena Park",
    alumniRole: "Senior PM",
    alumniCompany: "Wealthsimple",
    alumniInitials: "LP",
    topic: "Resume review",
    status: "accepted",
    statusMeta: "Accepted yesterday",
    opener:
      "Hi Lena — I'm a current MMA student pivoting toward product analytics. Could we spend 15 minutes going through my resume?",
    question: "What makes a strong resume for a PM analytics role at a fintech company?",
    proposedTimes: ["Sat May 2 · 3pm", "Sun May 3 · 11am"],
    sentAgo: "Accepted yesterday",
    confirmedTime: "Saturday May 2 · 3:00 PM EDT",
    confirmedMeta: "15 min · virtual call with Lena",
    meetingLink: "meet.google.com/abc-defg-hij",
    platform: "Google Meet",
    callState: "tomorrow",
    callTimeDisplay: "SAT MAY 2 · 3:00 PM EDT",
    callStatusLabel: "Tomorrow",
  },
  {
    id: "req-sarah-upcoming",
    alumniId: "sarah-reyes",
    alumniName: "Sarah Reyes",
    alumniRole: "Sr Analyst",
    alumniCompany: "RBC",
    alumniInitials: "SR",
    topic: "Behavioral interview",
    status: "accepted",
    statusMeta: "Accepted 2 days ago",
    opener:
      "Hi Sarah — I'd love another session to go deeper on behavioral interview prep before my RBC interview.",
    question: "What behavioral questions come up most in RBC analyst interviews?",
    proposedTimes: ["Mon May 4 · 2pm", "Tue May 5 · 4pm"],
    sentAgo: "Accepted 2 days ago",
    confirmedTime: "Monday May 4 · 2:00 PM EDT",
    confirmedMeta: "15 min · virtual call with Sarah",
    meetingLink: "teams.microsoft.com/l/meetup/...",
    platform: "Teams",
    callState: "soon",
    callTimeDisplay: "MON MAY 4 · 2:00 PM EDT",
    callStatusLabel: "In 3 days",
  },
  {
    id: "req-lena",
    alumniId: "lena-park",
    alumniName: "Lena Park",
    alumniRole: "Senior PM",
    alumniCompany: "Wealthsimple",
    alumniInitials: "LP",
    topic: "Resume review",
    status: "pending",
    statusMeta: "Sent 2 days ago · Awaiting response",
    opener:
      "Hi Lena — I'm a current MMA student pivoting toward product analytics. I've heard Wealthsimple hires a lot from MMA and your path from McKinsey to PM is exactly what I'm aiming for. Could we spend 15 minutes going through my resume and how I'm positioning my story?",
    question: "What makes a strong resume for a PM analytics role at a fintech company?",
    proposedTimes: ["Tue Apr 28 · 5pm", "Fri May 1 · 1pm"],
    sentAgo: "Sent 2h ago",
  },
  {
    id: "req-kwame",
    alumniId: "kwame-boateng",
    alumniName: "Kwame Boateng",
    alumniRole: "Staff DS",
    alumniCompany: "Spotify",
    alumniInitials: "KB",
    topic: "Technical interview",
    status: "declined",
    statusMeta: "Sent 3 days ago · Declined yesterday",
    opener:
      "Hi Kwame — I'm a current MMA student targeting data science roles. I saw you lead the recommendation analytics team at Spotify — I'm applying to similar roles and would love 15 minutes to run through a technical mock with someone who's been in those interviews.",
    question: "What does a strong technical loop look like for a DS role at Spotify?",
    proposedTimes: ["Tue Apr 28 · 1pm", "Fri May 1 · 1pm"],
    sentAgo: "Declined 2 days ago",
    declineReason: "Outside scope",
    declineNote:
      "Hi Maya — appreciate you reaching out. Resume reviews aren't something I do well — I lean toward portfolio walkthroughs and technical interview prep. If either of those would help, happy to chat then.",
    worthConsideringId: "lena-park",
  },
  {
    id: "req-sarah",
    alumniId: "sarah-reyes",
    alumniName: "Sarah Reyes",
    alumniRole: "Sr Analyst",
    alumniCompany: "RBC",
    alumniInitials: "SR",
    topic: "Behavioral interview",
    status: "completed",
    statusMeta: "Completed 3 days ago",
    opener:
      "Hi Sarah — I'm a current MMA student hoping to land an analyst role in finance. Your six years at RBC and MMA background make you exactly who I'd want to practice with. Could we do a quick mock behavioral interview?",
    question: "What behavioral questions come up most in RBC analyst interviews?",
    proposedTimes: ["Mon Apr 27 · 2pm", "Wed Apr 29 · 11am"],
    sentAgo: "Completed 3 days ago",
  },
];
