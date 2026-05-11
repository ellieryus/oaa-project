"use client";

import { ChevronDown, Upload, X } from "lucide-react";
import { useState } from "react";

import { AlumnusOnboardingHeader } from "@/components/oaa/AlumnusOnboardingHeader";
import { Chip } from "@/components/oaa/Chip";
import { DisplayHeading } from "@/components/oaa/DisplayHeading";
import { ProgressStepper } from "@/components/oaa/ProgressStepper";
import {
  GhostButton,
  GhostLink,
  PrimaryLink,
  SecondaryButton,
} from "@/components/oaa/buttons";
import { Input } from "@/components/ui/input";

const STEPS = [
  { num: "01", label: "Background", href: "/onboarding/alumnus/background" },
  { num: "02", label: "Offerings", href: "/onboarding/alumnus/offerings" },
  { num: "03", label: "Non-offerings", href: "/onboarding/alumnus/non-offerings" },
  { num: "04", label: "Availability", href: "/onboarding/alumnus/availability" },
];

const INDUSTRIES = [
  "Tech",
  "Finance",
  "Healthcare",
  "Retail",
  "CPG",
  "Media",
  "Public sector",
  "Energy",
];

const COHORT_YEARS = [
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
];

type Experience = {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
};

let nextId = 0;
const newId = () => `e${++nextId}`;

export default function AlumnusBackgroundPage() {
  const [linkedinHandle, setLinkedinHandle] = useState("");
  const [city, setCity] = useState("Toronto");
  const [role, setRole] = useState("Director of Data");
  const [company, setCompany] = useState("Shopify");
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: newId(),
      company: "RBC",
      role: "Senior Data Analyst",
      start: "2019",
      end: "2022",
    },
  ]);
  const [industries, setIndustries] = useState<Set<string>>(
    new Set(["Tech", "Finance"]),
  );
  const [cohort, setCohort] = useState("2019");
  const [linkedinUrl, setLinkedinUrl] = useState(
    "linkedin.com/in/adam-farouk",
  );

  function toggleIndustry(i: string) {
    setIndustries((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <>
      <AlumnusOnboardingHeader />
      <ProgressStepper steps={STEPS} activeIndex={0} />

      <main className="mx-auto max-w-[1200px] px-8 pb-32">
        <header className="flex flex-col gap-3 pt-16">
          <DisplayHeading variant="m" as="h1">
            Tell us where you&rsquo;ve been.
          </DisplayHeading>
          <p className="max-w-[720px] text-sm leading-normal text-muted-foreground">
            Students will see this when they&rsquo;re deciding whether to ask.
            The more concrete, the better the match.
          </p>
        </header>

        {/* LinkedIn import card */}
        <section className="mt-12 rounded-md border border-border bg-card p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-brand-500">
                Optional · Save 5 minutes
              </span>
              <h2 className="text-xl leading-[1.2] font-semibold text-foreground">
                Import your role and experience from LinkedIn or a CV.
              </h2>
              <p className="text-sm leading-normal text-muted-foreground">
                We&rsquo;ll pre-fill the fields below. You can edit anything
                before saving.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-wrap items-start gap-2">
              <GhostButton type="button">LinkedIn</GhostButton>
              <GhostButton type="button">
                <Upload className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                Upload CV
              </GhostButton>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              value={linkedinHandle}
              onChange={(e) => setLinkedinHandle(e.target.value)}
              placeholder="linkedin.com/in/yourhandle"
              className="h-12 rounded-md border-border px-4 text-sm"
            />
            <SecondaryButton
              type="button"
              disabled={linkedinHandle.trim() === ""}
            >
              Parse profile
            </SecondaryButton>
          </div>
        </section>

        {/* Current role */}
        <section className="mt-16 flex flex-col gap-4">
          <span className="text-xs font-medium text-muted-foreground">
            Current role
          </span>
          <div className="flex flex-col gap-3 rounded-md border border-border bg-card p-5 sm:grid sm:grid-cols-3 sm:items-center sm:gap-3">
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              aria-label="City"
              className="h-11 rounded-md border-border px-3 text-sm"
            />
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role"
              aria-label="Role"
              className="h-11 rounded-md border-border px-3 text-sm"
            />
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              aria-label="Company"
              className="h-11 rounded-md border-border px-3 text-sm"
            />
          </div>
        </section>

        {/* Past experience */}
        <section className="mt-16 flex flex-col gap-4">
          <span className="text-xs font-medium text-muted-foreground">
            Past experience · optional
          </span>
          <div className="flex flex-col gap-3">
            {experiences.map((ex) => (
              <div
                key={ex.id}
                className="flex flex-col gap-3 rounded-md border border-border bg-card p-5 sm:grid sm:grid-cols-[2fr_2fr_1fr_1fr_auto] sm:items-center"
              >
                <Input
                  value={ex.company}
                  onChange={(e) =>
                    setExperiences((all) =>
                      all.map((x) =>
                        x.id === ex.id
                          ? { ...x, company: e.target.value }
                          : x,
                      ),
                    )
                  }
                  placeholder="Company"
                  aria-label="Company"
                  className="h-11 rounded-md border-border px-3 text-sm"
                />
                <Input
                  value={ex.role}
                  onChange={(e) =>
                    setExperiences((all) =>
                      all.map((x) =>
                        x.id === ex.id ? { ...x, role: e.target.value } : x,
                      ),
                    )
                  }
                  placeholder="Role"
                  aria-label="Role"
                  className="h-11 rounded-md border-border px-3 text-sm"
                />
                <Input
                  value={ex.start}
                  onChange={(e) =>
                    setExperiences((all) =>
                      all.map((x) =>
                        x.id === ex.id
                          ? { ...x, start: e.target.value }
                          : x,
                      ),
                    )
                  }
                  placeholder="Start"
                  aria-label="Start"
                  className="h-11 rounded-md border-border px-3 text-sm"
                />
                <Input
                  value={ex.end}
                  onChange={(e) =>
                    setExperiences((all) =>
                      all.map((x) =>
                        x.id === ex.id ? { ...x, end: e.target.value } : x,
                      ),
                    )
                  }
                  placeholder="End"
                  aria-label="End"
                  className="h-11 rounded-md border-border px-3 text-sm"
                />
                <button
                  type="button"
                  onClick={() =>
                    setExperiences((all) =>
                      all.filter((x) => x.id !== ex.id),
                    )
                  }
                  className="self-start rounded-md p-2 text-muted-foreground hover:text-foreground"
                  aria-label="Remove experience"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              setExperiences((all) => [
                ...all,
                {
                  id: newId(),
                  company: "",
                  role: "",
                  start: "",
                  end: "",
                },
              ])
            }
            className="self-start text-sm text-brand-500 underline underline-offset-2 hover:no-underline"
          >
            + Add another experience
          </button>
        </section>

        {/* Industries + Cohort */}
        <section className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium text-muted-foreground">
              Industries
            </span>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium text-muted-foreground">
              Cohort
            </span>
            <div className="relative">
              <select
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
                className="h-12 w-full appearance-none rounded-md border border-border bg-card px-4 pr-10 text-sm leading-normal text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
                aria-label="Cohort year"
              >
                {COHORT_YEARS.map((y) => (
                  <option key={y} value={y}>
                    MMA &rsquo;{y.slice(2)} ({y})
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
        </section>

        {/* LinkedIn URL */}
        <section className="mt-16 flex flex-col gap-3 max-w-[820px]">
          <span className="text-xs font-medium text-muted-foreground">
            LinkedIn · optional
          </span>
          <Input
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="linkedin.com/in/yourhandle"
            aria-label="LinkedIn URL"
            className="h-12 rounded-md border-border px-4 text-sm"
          />
          <p className="text-sm leading-normal text-muted-foreground">
            Optional. We won&rsquo;t import anything — students can click
            through if you share it.
          </p>
        </section>

        <footer className="mt-20 flex items-center justify-between border-t border-border pt-8">
          <GhostLink href="/role-select" className="px-3 py-2 text-sm">
            ← Back
          </GhostLink>
          <PrimaryLink
            href="/onboarding/alumnus/offerings"
            trailingArrow
          >
            Continue
          </PrimaryLink>
        </footer>
      </main>
    </>
  );
}
