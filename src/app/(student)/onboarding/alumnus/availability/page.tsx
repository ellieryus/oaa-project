"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { AlumnusOnboardingHeader } from "@/components/oaa/AlumnusOnboardingHeader";
import { AvailabilityWeekGrid } from "@/components/oaa/AvailabilityWeekGrid";
import type { WeekSlotKey } from "@/components/oaa/AvailabilityWeekGrid";
import { DisplayHeading } from "@/components/oaa/DisplayHeading";
import { ProgressStepper } from "@/components/oaa/ProgressStepper";
import { GhostLink, PrimaryLink } from "@/components/oaa/buttons";
import { Switch } from "@/components/ui/switch";

const STEPS = [
  { num: "01", label: "Background", href: "/onboarding/alumnus/background" },
  { num: "02", label: "Offerings", href: "/onboarding/alumnus/offerings" },
  { num: "03", label: "Non-offerings", href: "/onboarding/alumnus/non-offerings" },
  { num: "04", label: "Availability", href: "/onboarding/alumnus/availability" },
];

const TIME_ZONES = [
  "America/Toronto · EDT (UTC-4)",
  "America/Vancouver · PDT (UTC-7)",
  "America/Montreal · EDT (UTC-4)",
  "America/New_York · EDT (UTC-4)",
];

const SLOT_MINUTES = 30;

const DEFAULT_SLOTS: WeekSlotKey[] = [
  "Tue-17:00",
  "Tue-18:00",
  "Wed-12:00",
  "Wed-13:00",
  "Fri-13:00",
  "Fri-14:00",
];

export default function AlumnusAvailabilityPage() {
  const [selected, setSelected] = useState<Set<WeekSlotKey>>(
    new Set(DEFAULT_SLOTS),
  );
  const [tz, setTz] = useState(TIME_ZONES[0]);
  const [recurringOn, setRecurringOn] = useState(true);

  function toggle(key: WeekSlotKey) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const slotCount = selected.size;
  const totalHours = (slotCount * SLOT_MINUTES) / 60;
  const totalHoursLabel =
    totalHours % 1 === 0 ? `${totalHours}` : totalHours.toFixed(1);

  return (
    <>
      <AlumnusOnboardingHeader />
      <ProgressStepper steps={STEPS} activeIndex={3} />

      <main className="mx-auto max-w-[1200px] px-8 pb-32">
        <header className="flex flex-col gap-3 pt-16">
          <DisplayHeading variant="m" as="h1">
            When are you available for short calls?
          </DisplayHeading>
          <p className="max-w-[820px] text-sm leading-normal text-muted-foreground">
            15 or 20 minutes is enough. Pick a few recurring windows —
            students will book inside them.
          </p>
          <p className="text-sm leading-normal italic text-muted-foreground">
            Many alumni set Friday afternoons as their &lsquo;OAA hours.&rsquo;
          </p>
        </header>

        {/* Top control row */}
        <section className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Time zone
            </span>
            <div className="relative">
              <select
                value={tz}
                onChange={(e) => setTz(e.target.value)}
                className="h-12 min-w-[280px] appearance-none rounded-md border border-border bg-card px-4 pr-10 text-sm leading-normal text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
                aria-label="Time zone"
              >
                {TIME_ZONES.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                strokeWidth={1.5}
                aria-hidden
              />
            </div>
          </div>
          <label className="flex items-center gap-3 text-sm text-foreground">
            <Switch
              checked={recurringOn}
              onCheckedChange={(c: boolean) => setRecurringOn(c)}
            />
            Apply this pattern weekly
          </label>
        </section>

        <section className="mt-8">
          <AvailabilityWeekGrid selected={selected} onToggle={toggle} />
        </section>

        <section className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-normal text-foreground">
            You&rsquo;re available for{" "}
            <span className="font-semibold">{slotCount} slots</span> per week.
          </p>
          <p className="text-sm leading-normal text-muted-foreground">
            {totalHoursLabel} hours total
          </p>
        </section>

        <footer className="mt-20 flex items-center justify-between border-t border-border pt-8">
          <GhostLink
            href="/onboarding/alumnus/non-offerings"
            className="px-3 py-2 text-sm"
          >
            ← Back
          </GhostLink>
          <PrimaryLink
            href="/profile/alumnus"
            trailingArrow
            className={
              slotCount === 0 ? "pointer-events-none opacity-50" : ""
            }
            aria-disabled={slotCount === 0}
          >
            Finish setup
          </PrimaryLink>
        </footer>
      </main>
    </>
  );
}
