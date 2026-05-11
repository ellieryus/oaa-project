"use client";

import { Upload, X } from "lucide-react";
import { useState } from "react";

import { DisplayHeading } from "@/components/oaa/DisplayHeading";
import { OnboardingHeader } from "@/components/oaa/OnboardingHeader";
import { ProgressStepper } from "@/components/oaa/ProgressStepper";
import {
  GhostButton,
  GhostLink,
  PrimaryLink,
  SecondaryButton,
} from "@/components/oaa/buttons";
import { Input } from "@/components/ui/input";

const STEPS = [
  { num: "01", label: "Aspirations", href: "/onboarding/student/aspirations" },
  { num: "02", label: "Background", href: "/onboarding/student/background" },
  { num: "03", label: "Help needs", href: "/onboarding/student/help-needs" },
];

const MAX_SKILLS = 8;

type Education = {
  id: string;
  school: string;
  program: string;
  year: string;
};

type Experience = {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
};

let nextId = 0;
const newId = () => `e${++nextId}`;

export default function BackgroundPage() {
  const [linkedin, setLinkedin] = useState("");
  const [educations, setEducations] = useState<Education[]>([
    {
      id: newId(),
      school: "McGill University",
      program: "Master of Management in Analytics",
      year: "2026",
    },
  ]);
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: newId(),
      company: "Lululemon",
      role: "Marketing analyst intern",
      start: "2024",
      end: "2025",
    },
  ]);
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [skills, setSkills] = useState<string[]>([
    "SQL",
    "Python",
    "Tableau",
    "Excel",
  ]);
  const [skillDraft, setSkillDraft] = useState("");

  function addSkillFromDraft() {
    const trimmed = skillDraft.trim();
    if (!trimmed) return;
    if (skills.includes(trimmed)) {
      setSkillDraft("");
      return;
    }
    if (skills.length >= MAX_SKILLS) return;
    setSkills((s) => [...s, trimmed]);
    setSkillDraft("");
  }

  return (
    <>
      <OnboardingHeader email="maya.chen@mail.mcgill.ca" />
      <ProgressStepper steps={STEPS} activeIndex={1} />

      <main className="mx-auto max-w-[1200px] px-8 pb-32">
        <header className="flex flex-col gap-3 pt-16">
          <DisplayHeading variant="m" as="h1">
            Tell us a bit about your background.
          </DisplayHeading>
          <p className="max-w-[720px] text-sm leading-normal text-muted-foreground">
            None of this is required. Fill what feels useful.
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
                Import your education and experience from LinkedIn or a CV.
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
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="linkedin.com/in/yourhandle"
              className="h-12 rounded-md border-border px-4 text-sm"
            />
            <SecondaryButton type="button" disabled={linkedin.trim() === ""}>
              Parse profile
            </SecondaryButton>
          </div>
        </section>

        {/* Education */}
        <section className="mt-16 flex flex-col gap-4">
          <span className="text-xs font-medium text-muted-foreground">
            Education
          </span>
          <div className="flex flex-col gap-3">
            {educations.map((ed) => (
              <div
                key={ed.id}
                className="flex flex-col gap-3 rounded-md border border-border bg-card p-5 sm:grid sm:grid-cols-[2fr_2fr_1fr_auto] sm:items-center"
              >
                <Input
                  value={ed.school}
                  onChange={(e) =>
                    setEducations((all) =>
                      all.map((x) =>
                        x.id === ed.id ? { ...x, school: e.target.value } : x,
                      ),
                    )
                  }
                  placeholder="School"
                  className="h-11 rounded-md border-border px-3 text-sm"
                />
                <Input
                  value={ed.program}
                  onChange={(e) =>
                    setEducations((all) =>
                      all.map((x) =>
                        x.id === ed.id
                          ? { ...x, program: e.target.value }
                          : x,
                      ),
                    )
                  }
                  placeholder="Program"
                  className="h-11 rounded-md border-border px-3 text-sm"
                />
                <Input
                  value={ed.year}
                  onChange={(e) =>
                    setEducations((all) =>
                      all.map((x) =>
                        x.id === ed.id ? { ...x, year: e.target.value } : x,
                      ),
                    )
                  }
                  placeholder="Year"
                  className="h-11 rounded-md border-border px-3 text-sm"
                />
                <button
                  type="button"
                  onClick={() =>
                    setEducations((all) =>
                      all.length > 1 ? all.filter((x) => x.id !== ed.id) : all,
                    )
                  }
                  className="self-start rounded-md p-2 text-muted-foreground hover:text-foreground disabled:opacity-30"
                  disabled={educations.length <= 1}
                  aria-label="Remove education"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              setEducations((all) => [
                ...all,
                { id: newId(), school: "", program: "", year: "" },
              ])
            }
            className="self-start text-sm text-brand-500 underline underline-offset-2 hover:no-underline"
          >
            + Add another
          </button>
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

        {/* Portfolio or GitHub */}
        <section className="mt-16 flex flex-col gap-4">
          <span className="text-xs font-medium text-muted-foreground">
            Portfolio or GitHub · optional
          </span>
          <Input
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            placeholder="github.com/yourhandle or portfolio.yourname.com"
            className="h-12 rounded-md border-border px-4 text-sm"
          />
        </section>

        {/* Skills */}
        <section className="mt-16 flex flex-col gap-4">
          <span className="text-xs font-medium text-muted-foreground">
            Skills · up to {MAX_SKILLS}
          </span>
          <div className="flex flex-col gap-3">
            <input
              value={skillDraft}
              onChange={(e) => setSkillDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkillFromDraft();
                }
              }}
              onBlur={addSkillFromDraft}
              placeholder="Type to add — e.g. dbt, Snowflake"
              disabled={skills.length >= MAX_SKILLS}
              className="w-full rounded-md border border-border bg-card px-3 py-1.5 text-sm leading-normal text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 disabled:opacity-50"
            />
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 rounded-md border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm leading-normal text-foreground"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() =>
                        setSkills((arr) => arr.filter((x) => x !== s))
                      }
                      aria-label={`Remove ${s}`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" strokeWidth={1.5} aria-hidden />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        <footer className="mt-20 flex items-center justify-between border-t border-border pt-8">
          <GhostLink
            href="/onboarding/student/aspirations"
            className="px-3 py-2 text-sm"
          >
            ← Back
          </GhostLink>
          <PrimaryLink
            href="/onboarding/student/help-needs"
            trailingArrow
          >
            Continue
          </PrimaryLink>
        </footer>
      </main>
    </>
  );
}
