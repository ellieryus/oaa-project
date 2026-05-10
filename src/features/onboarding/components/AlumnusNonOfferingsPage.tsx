"use client";

import Link from "next/link";
import { useState } from "react";

import { AlumnusOnboardingHeader } from "@/components/layout/AlumnusOnboardingHeader";
import { DisplayHeading } from "@/components/shared/DisplayHeading";
import { OfferingCard } from "@/features/alumni/components/OfferingCard";
import { ProgressStepper } from "@/components/shared/ProgressStepper";
import { GhostLink, PrimaryLink } from "@/components/shared/buttons";
import { Textarea } from "@/components/ui/textarea";

const STEPS = [
  { num: "01", label: "Background", href: "/onboarding/alumnus/background" },
  { num: "02", label: "Offerings", href: "/onboarding/alumnus/offerings" },
  { num: "03", label: "Non-offerings", href: "/onboarding/alumnus/non-offerings" },
  { num: "04", label: "Availability", href: "/onboarding/alumnus/availability" },
];

const ITEMS = [
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
  },
];

// Demo state: alumnus already offers these on Screen 24, so they're locked here.
const ALREADY_OFFERED = new Set(["career-pivot", "portfolio-review"]);

const MAX_SELECTIONS = 3;
const NOTE_LIMIT = 280;

export function AlumnusNonOfferingsPage() {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["job-referral"]),
  );
  const [note, setNote] = useState("");

  function toggle(id: string) {
    if (ALREADY_OFFERED.has(id)) return;
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

  const noteOver = note.length > NOTE_LIMIT;

  return (
    <>
      <AlumnusOnboardingHeader />
      <ProgressStepper steps={STEPS} activeIndex={2} />

      <main className="mx-auto max-w-[1200px] px-8 pb-32">
        <header className="flex flex-col gap-3 pt-16">
          <DisplayHeading variant="m" as="h1">
            What&rsquo;s off the table?
          </DisplayHeading>
          <p className="max-w-[720px] text-[15px] leading-[1.5] text-oaa-muted">
            Telling students up-front saves both of you time. Pick up to{" "}
            {MAX_SELECTIONS}.
          </p>
          <p className="font-mono text-[11px] leading-[1.4] tracking-[0.08em] uppercase text-oaa-muted">
            {selected.size} of {MAX_SELECTIONS} selected.
          </p>
        </header>

        <section className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {ITEMS.map((o) => {
            const alreadyOffered = ALREADY_OFFERED.has(o.id);
            const isSelected = selected.has(o.id);
            const limitReached =
              !alreadyOffered && !isSelected && selected.size >= MAX_SELECTIONS;
            return (
              <OfferingCard
                key={o.id}
                title={o.title}
                description={o.description}
                selected={isSelected}
                disabled={alreadyOffered || limitReached}
                disabledMessage={
                  alreadyOffered ? "You already offer this." : o.description
                }
                onClick={() => toggle(o.id)}
              />
            );
          })}
        </section>

        <section className="mt-16 flex flex-col gap-3 max-w-[820px]">
          <h2 className="text-[20px] leading-[1.2] font-semibold text-oaa-ink">
            Anything else students should know?
          </h2>
          <p className="text-[13px] leading-[1.45] text-oaa-muted">
            Optional. {NOTE_LIMIT} character limit.
          </p>
          <div className="relative">
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={`e.g., 'I can't refer anyone outside my immediate team' or 'I prefer not to do salary negotiation advice.'`}
              rows={4}
              className="resize-none rounded-sm border-oaa-hairline bg-white p-4 text-[15px] leading-[1.5]"
            />
            <span
              className={
                "absolute bottom-3 right-4 font-mono text-[11px] tracking-[0.04em] " +
                (noteOver ? "text-oaa-clay" : "text-oaa-muted")
              }
            >
              {note.length} / {NOTE_LIMIT}
            </span>
          </div>
        </section>

        <footer className="mt-20 flex flex-col gap-4 border-t border-oaa-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <GhostLink
            href="/onboarding/alumnus/offerings"
            className="px-3 py-2 text-[14px]"
          >
            ← Back
          </GhostLink>
          <p className="text-[13px] leading-[1.45] text-oaa-muted">
            Most alumni declare at least one. It protects your time.{" "}
            <Link
              href="/onboarding/alumnus/availability"
              className="text-oaa-clay underline underline-offset-2 hover:no-underline"
            >
              Skip for now
            </Link>
          </p>
          <PrimaryLink
            href="/onboarding/alumnus/availability"
            trailingArrow
          >
            Continue
          </PrimaryLink>
        </footer>
      </main>
    </>
  );
}

export default AlumnusNonOfferingsPage;
