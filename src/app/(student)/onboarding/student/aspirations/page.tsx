"use client";

import { useState } from "react";

import { Chip } from "@/components/oaa/Chip";
import { DisplayHeading } from "@/components/oaa/DisplayHeading";
import { OnboardingHeader } from "@/components/oaa/OnboardingHeader";
import { ProgressStepper } from "@/components/oaa/ProgressStepper";
import { RankPanel } from "@/components/oaa/RankPanel";
import { GhostLink, PrimaryLink } from "@/components/oaa/buttons";
import { Input } from "@/components/ui/input";

const STEPS = [
  { num: "01", label: "Aspirations", href: "/onboarding/student/aspirations" },
  { num: "02", label: "Background", href: "/onboarding/student/background" },
  { num: "03", label: "Help needs", href: "/onboarding/student/help-needs" },
];

const ROLES = [
  "Data Analyst",
  "Data Scientist",
  "Data Engineer",
  "AI/ML Engineer",
  "AI Agent Engineer",
  "Product Analyst / Tech PM",
  "People/HR Analytics",
  "Analytics Consulting",
  "Still exploring",
];

const INDUSTRIES = [
  "Open to any industry",
  "Tech",
  "Finance",
  "Healthcare",
  "Retail",
  "CPG",
  "Media",
  "Public sector",
  "Energy",
];

const EXPERIENCE_LEVELS = [
  { id: "none", label: "No experience yet" },
  { id: "some", label: "Some experience" },
  { id: "several", label: "Several years" },
];

const MAX_ROLES = 5;
const MIN_ROLES = 3;

export default function AspirationsPage() {
  const [roles, setRoles] = useState<string[]>([]);
  const [industries, setIndustries] = useState<Set<string>>(new Set());
  const [targetCity, setTargetCity] = useState("Toronto");
  const [experience, setExperience] = useState<string | null>("some");

  function toggleRole(r: string) {
    setRoles((prev) => {
      if (prev.includes(r)) return prev.filter((x) => x !== r);
      if (prev.length >= MAX_ROLES) return prev;
      return [...prev, r];
    });
  }

  function toggleIndustry(i: string) {
    setIndustries((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  const canContinue =
    roles.length >= MIN_ROLES && industries.size >= 1 && experience !== null;

  return (
    <>
      <OnboardingHeader email="maya.chen@mail.mcgill.ca" />
      <ProgressStepper steps={STEPS} activeIndex={0} />

      <main className="mx-auto max-w-[1200px] px-8 pb-32">
        <header className="flex flex-col gap-3 pt-16">
          <DisplayHeading variant="m" as="h1">
            What are you aiming for?
          </DisplayHeading>
          <p className="max-w-[720px] text-sm leading-normal text-muted-foreground">
            This is what we&rsquo;ll match you against. You can change it
            anytime.
          </p>
        </header>

        <section className="mt-12 flex flex-col gap-6">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl leading-[1.2] font-semibold text-foreground">
                Pick 3-5 roles. Order matters.
              </h2>
              <p className="text-sm leading-normal text-muted-foreground">
                Your top choice weighs heaviest in your matches.
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              {roles.length} / {MAX_ROLES} selected
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {ROLES.map((r) => {
              const idx = roles.indexOf(r);
              const selected = idx >= 0;
              return (
                <Chip
                  key={r}
                  label={r}
                  mode="rank"
                  selected={selected}
                  rank={selected ? idx + 1 : undefined}
                  primaryBadge={idx === 0}
                  onClick={() => toggleRole(r)}
                  disabled={!selected && roles.length >= MAX_ROLES}
                />
              );
            })}
          </div>

          <RankPanel
            title="Your ranking"
            items={roles.map((r) => ({ id: r, label: r }))}
          />
        </section>

        <section className="mt-16 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl leading-[1.2] font-semibold text-foreground">
              Industries that interest you.
            </h2>
            <p className="text-sm leading-normal text-muted-foreground">
              Pick at least one.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {INDUSTRIES.map((i) => (
              <Chip
                key={i}
                label={i}
                mode="select"
                selected={industries.has(i)}
                onClick={() => toggleIndustry(i)}
              />
            ))}
          </div>
        </section>

        <section className="mt-16 flex flex-col gap-4 max-w-[480px]">
          <h2 className="text-xl leading-[1.2] font-semibold text-foreground">
            Where do you want to land?
          </h2>
          <Input
            value={targetCity}
            onChange={(e) => setTargetCity(e.target.value)}
            placeholder="Toronto"
            className="h-12 rounded-md border-border px-4 text-sm"
          />
        </section>

        <section className="mt-16 flex flex-col gap-4">
          <h2 className="text-xl leading-[1.2] font-semibold text-foreground">
            Your experience level.
          </h2>
          <div className="inline-flex flex-wrap gap-3">
            {EXPERIENCE_LEVELS.map((opt) => {
              const active = experience === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setExperience(opt.id)}
                  aria-pressed={active}
                  className={
                    "rounded-md border px-4 py-3 text-sm leading-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 " +
                    (active
                      ? "bg-brand-50 border-brand-200 text-foreground"
                      : "bg-card border-border text-foreground hover:border-brand-500")
                  }
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </section>

        <footer className="mt-20 flex items-center justify-between border-t border-border pt-8">
          <GhostLink href="/role-select" className="px-3 py-2 text-sm">
            ← Back
          </GhostLink>
          <PrimaryLink
            href="/onboarding/student/background"
            trailingArrow
            className={canContinue ? "" : "pointer-events-none opacity-50"}
            aria-disabled={!canContinue}
          >
            Continue
          </PrimaryLink>
        </footer>
      </main>
    </>
  );
}
