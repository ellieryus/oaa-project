import { Search } from "lucide-react";

import { Header } from "@/components/oaa/Header";
import { Avatar } from "@/components/oaa/Avatar";
import { FaqAccordion } from "@/components/oaa/FaqAccordion";
import type { FaqItem } from "@/components/oaa/FaqAccordion";
import { STUDENT } from "@/lib/mock-student";

const GETTING_STARTED: FaqItem[] = [
  {
    id: "gs-1",
    question: "Why do I need to enter a primary aspiration first?",
    answer:
      "Because alumni's offerings are organized around career outcomes, and your primary aspiration is the strongest signal of which outcomes you care about. You can update it any time from your profile.",
  },
  {
    id: "gs-2",
    question: "How are my matches chosen?",
    answer:
      "Matches are scored based on your aspirations, help needs, and background against each alumnus's offerings and experience. The score updates when you update your profile.",
  },
  {
    id: "gs-3",
    question: "Can I reach out to any alumni, or only my matches?",
    answer:
      "You can browse all alumni, but only matched alumni are recommended for asks. Sending requests outside your match list is less likely to get a response.",
  },
];

const REQUESTS: FaqItem[] = [
  {
    id: "req-1",
    question: "What happens after I send a request?",
    answer:
      "The alumnus receives a notification and has 48 hours to accept or decline. You will be emailed when they respond.",
  },
  {
    id: "req-2",
    question: "Can I edit my request after sending?",
    answer:
      "Requests cannot be edited after sending, but you can withdraw a pending request from the request detail page and send a new one.",
  },
  {
    id: "req-3",
    question: "What does 'scope check' mean?",
    answer:
      "A scope check means your request touches an area the alumnus has flagged as outside their comfort zone. They may still accept, but they will see the flag.",
  },
];

const CALLS: FaqItem[] = [
  {
    id: "call-1",
    question: "How do I join my call?",
    answer:
      "The meeting link is shown on your request detail page once the call is confirmed. It becomes active 1 hour before the call starts.",
  },
  {
    id: "call-2",
    question: "What if an alumnus does not show up?",
    answer:
      "If a confirmed call does not happen, contact us via this help page and we will follow up with the alumnus on your behalf.",
  },
];

const ACCOUNT: FaqItem[] = [
  {
    id: "acc-1",
    question: "How do I update my profile?",
    answer:
      "Visit your profile page from the navigation. You can update your aspirations, help needs, and availability at any time.",
  },
  {
    id: "acc-2",
    question: "How do I delete my account?",
    answer:
      "Go to Settings and scroll to the Danger zone section. Account deletion is permanent and cannot be undone.",
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header
        rightContent={
          <Avatar variant="student" name={STUDENT.name} size="sm" />
        }
      />

      <main className="mx-auto max-w-[720px] px-8 pb-32 pt-16">
        <h1 className="mb-2 text-5xl font-semibold leading-[1.05] text-foreground">
          Help.
        </h1>
        <p className="mb-10 text-base text-muted-foreground">
          Answers to common questions about One Ask Away.
        </p>

        {/* Search */}
        <div className="mb-12 flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden />
          <input
            type="search"
            placeholder="Search help articles..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
          />
        </div>

        {/* FAQ sections */}
        <div className="flex flex-col gap-10">
          <section>
            <p className="mb-4 text-xs font-medium text-muted-foreground">
              Getting started
            </p>
            <FaqAccordion items={GETTING_STARTED} defaultOpenId="gs-1" />
          </section>

          <section>
            <p className="mb-4 text-xs font-medium text-muted-foreground">
              Requests
            </p>
            <FaqAccordion items={REQUESTS} />
          </section>

          <section>
            <p className="mb-4 text-xs font-medium text-muted-foreground">
              Calls
            </p>
            <FaqAccordion items={CALLS} />
          </section>

          <section>
            <p className="mb-4 text-xs font-medium text-muted-foreground">
              Account
            </p>
            <FaqAccordion items={ACCOUNT} />
          </section>
        </div>
      </main>
    </div>
  );
}
