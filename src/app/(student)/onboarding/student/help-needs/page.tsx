"use client";

import { useState } from "react";

import { Chip } from "@/components/oaa/Chip";
import { DisplayHeading } from "@/components/oaa/DisplayHeading";
import { OnboardingHeader } from "@/components/oaa/OnboardingHeader";
import { ProgressStepper } from "@/components/oaa/ProgressStepper";
import { RankPanel } from "@/components/oaa/RankPanel";
import { GhostLink, PrimaryLink } from "@/components/oaa/buttons";
import { Textarea } from "@/components/ui/textarea";

const STEPS = [
  { num: "01", label: "Aspirations", href: "/onboarding/student/aspirations" },
  { num: "02", label: "Background", href: "/onboarding/student/background" },
  { num: "03", label: "Help needs", href: "/onboarding/student/help-needs" },
];

const HELP_AREAS = [
  "Career pivot",
  "Navigate city",
  "Behavioral interview",
  "Technical interview",
  "Consulting case",
  "Data case",
  "Resume review",
  "Portfolio review",
];

const MAX_HELP = 5;
const MIN_HELP = 3;
const NOTE_LIMIT = 280;

export default function HelpNeedsPage() {
  const [areas, setAreas] = useState<string[]>([]);
  const [note, setNote] = useState("");

  function toggleArea(a: string) {
    setAreas((prev) => {
      if (prev.includes(a)) return prev.filter((x) => x !== a);
      if (prev.length >= MAX_HELP) return prev;
      return [...prev, a];
    });
  }

  const canFinish = areas.length >= MIN_HELP;
  const noteLen = note.length;
  const noteOver = noteLen > NOTE_LIMIT;

  return (
    <>
      <OnboardingHeader email="maya.chen@mail.mcgill.ca" />
      <ProgressStepper steps={STEPS} activeIndex={2} />

      <main className="mx-auto max-w-[1200px] px-8 pb-32">
        <header className="flex flex-col gap-3 pt-16">
          <DisplayHeading variant="m" as="h1">
            What do you need help with?
          </DisplayHeading>
          <p className="max-w-[720px] text-sm leading-normal text-muted-foreground">
            These map directly to what alumni offer. Pick 3-5 and rank by
            priority.
          </p>
        </header>

        <section className="mt-12 flex flex-col gap-6">
          <div className="flex items-end justify-between">
            <h2 className="text-xl leading-[1.2] font-semibold text-foreground">
              Help areas
            </h2>
            <span className="text-xs text-muted-foreground">
              {areas.length} / {MAX_HELP} selected
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {HELP_AREAS.map((a) => {
              const idx = areas.indexOf(a);
              const selected = idx >= 0;
              return (
                <Chip
                  key={a}
                  label={a}
                  mode="rank"
                  selected={selected}
                  rank={selected ? idx + 1 : undefined}
                  primaryBadge={idx === 0}
                  onClick={() => toggleArea(a)}
                  disabled={!selected && areas.length >= MAX_HELP}
                />
              );
            })}
          </div>

          <RankPanel
            title="Your ranking · drag to reorder"
            items={areas.map((a) => ({ id: a, label: a }))}
          />
        </section>

        <section className="mt-16 flex flex-col gap-3 max-w-[720px]">
          <h2 className="text-xl leading-[1.2] font-semibold text-foreground">
            Anything specific you want to add?
          </h2>
          <p className="text-sm leading-normal text-muted-foreground">
            Optional. {NOTE_LIMIT} character limit.
          </p>
          <div className="relative">
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="I'm pivoting from marketing to data science and want feedback on my SQL portfolio."
              rows={5}
              className="resize-none rounded-md border-border bg-card p-4 text-sm leading-normal"
            />
            <span
              className={
                "absolute bottom-3 right-4 text-xs " +
                (noteOver ? "text-brand-500" : "text-muted-foreground")
              }
            >
              {noteLen} / {NOTE_LIMIT}
            </span>
          </div>
        </section>

        <footer className="mt-20 flex items-center justify-between border-t border-border pt-8">
          <GhostLink
            href="/onboarding/student/background"
            className="px-3 py-2 text-sm"
          >
            ← Back
          </GhostLink>
          <PrimaryLink
            href="/profile"
            trailingArrow
            className={
              canFinish && !noteOver ? "" : "pointer-events-none opacity-50"
            }
            aria-disabled={!canFinish || noteOver}
          >
            Finish setup
          </PrimaryLink>
        </footer>
      </main>
    </>
  );
}
