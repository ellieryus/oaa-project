"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { AlumnusOnboardingHeader } from "@/components/layout/AlumnusOnboardingHeader";
import { DisplayHeading } from "@/components/shared/DisplayHeading";
import { OfferingCard } from "@/features/alumni/components/OfferingCard";
import { ProgressStepper } from "@/components/shared/ProgressStepper";
import { GhostLink, PrimaryLink } from "@/components/shared/buttons";

const STEPS = [
  { num: "01", label: "Background", href: "/onboarding/alumnus/background" },
  { num: "02", label: "Offerings", href: "/onboarding/alumnus/offerings" },
  { num: "03", label: "Non-offerings", href: "/onboarding/alumnus/non-offerings" },
  { num: "04", label: "Availability", href: "/onboarding/alumnus/availability" },
];

type Offering = {
  id: string;
  title: string;
  description: string;
  highValue?: boolean;
};

const OFFERINGS: Offering[] = [
  {
    id: "career-pivot",
    title: "Career pivot",
    description:
      "Talk through changing tracks based on your own experience",
  },
  {
    id: "navigate-city",
    title: "Navigate city",
    description: "Real talk about working/living in your current city",
  },
  {
    id: "behavioral-interview",
    title: "Behavioral interview",
    description: "Mock or feedback on behavioral storytelling",
  },
  {
    id: "technical-interview",
    title: "Technical interview",
    description: "Mock or prep for technical rounds in your domain",
  },
  {
    id: "consulting-case",
    title: "Consulting case",
    description: "Mock or prep for consulting case rounds",
  },
  {
    id: "data-case",
    title: "Data case",
    description: "Mock or prep for analytics/data case rounds",
  },
  {
    id: "resume-review",
    title: "Resume review",
    description: "Read and give targeted feedback",
  },
  {
    id: "portfolio-review",
    title: "Portfolio review",
    description: "Walk through their portfolio with critique",
  },
  {
    id: "job-referral",
    title: "Job referral",
    description: "Refer them at your current company if they're a fit",
    highValue: true,
  },
];

const AI_SUGGESTIONS = [
  { id: "data-case", label: "Data case" },
  { id: "job-referral", label: "Job referral" },
  { id: "technical-interview", label: "Technical interview" },
];

const MAX_SELECTIONS = 4;

export function AlumnusOfferingsPage() {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["career-pivot", "portfolio-review"]),
  );

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        return next;
      }
      if (next.size >= MAX_SELECTIONS) return prev;
      next.add(id);
      return next;
    });
  }

  function addFromSuggestion(id: string) {
    setSelected((prev) => {
      if (prev.has(id) || prev.size >= MAX_SELECTIONS) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  return (
    <>
      <AlumnusOnboardingHeader />
      <ProgressStepper steps={STEPS} activeIndex={1} />

      <main className="mx-auto max-w-[1200px] px-8 pb-32">
        <header className="flex flex-col gap-3 pt-16">
          <DisplayHeading variant="m" as="h1">
            What will you help with?
          </DisplayHeading>
          <p className="max-w-[720px] text-[15px] leading-[1.5] text-oaa-muted">
            Pick up to {MAX_SELECTIONS}. Honesty here is what makes One Ask
            Away work — students will only see asks that match what you offer.
          </p>
          <p className="font-mono text-[11px] leading-[1.4] tracking-[0.08em] uppercase text-oaa-muted">
            {selected.size} of {MAX_SELECTIONS} selected.
          </p>
        </header>

        <section className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {OFFERINGS.map((o) => {
            const isSelected = selected.has(o.id);
            const limitReached = !isSelected && selected.size >= MAX_SELECTIONS;
            return (
              <OfferingCard
                key={o.id}
                title={o.title}
                description={o.description}
                selected={isSelected}
                disabled={limitReached}
                disabledMessage={o.description}
                highValue={o.highValue}
                onClick={() => toggle(o.id)}
              />
            );
          })}
        </section>

        {/* AI suggestion row */}
        <section
          className="mt-8 rounded-md border border-dashed border-oaa-hairline bg-white p-5"
          aria-label="AI suggestions"
        >
          <span className="font-mono text-[11px] leading-[1.4] tracking-[0.08em] uppercase text-oaa-muted">
            AI suggestion · alumni in your role often offer
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {AI_SUGGESTIONS.map((s) => {
              const already = selected.has(s.id);
              const limitReached = !already && selected.size >= MAX_SELECTIONS;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => addFromSuggestion(s.id)}
                  disabled={already || limitReached}
                  className={
                    "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[13px] leading-[1.45] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oaa-clay/40 " +
                    (already
                      ? "border-oaa-clay-tint-border bg-oaa-clay-tint-bg text-oaa-clay cursor-not-allowed"
                      : limitReached
                        ? "border-oaa-hairline bg-white text-oaa-muted cursor-not-allowed opacity-60"
                        : "border-oaa-hairline bg-white text-oaa-ink hover:border-oaa-ink/30")
                  }
                >
                  <Plus className="h-3 w-3" strokeWidth={2} aria-hidden />
                  {s.label}
                </button>
              );
            })}
          </div>
        </section>

        <footer className="mt-20 flex items-center justify-between border-t border-oaa-hairline pt-8">
          <GhostLink
            href="/onboarding/alumnus/background"
            className="px-3 py-2 text-[14px]"
          >
            ← Back
          </GhostLink>
          <PrimaryLink
            href="/onboarding/alumnus/non-offerings"
            trailingArrow
          >
            Continue
          </PrimaryLink>
        </footer>
      </main>
    </>
  );
}

export default AlumnusOfferingsPage;
