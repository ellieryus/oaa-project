import Link from "next/link";

import { Avatar } from "@/components/shared/Avatar";
import { DisplayHeading } from "@/components/shared/DisplayHeading";
import { Header } from "@/components/layout/Header";
import {
  PrimaryLink,
  SecondaryButton,
  SecondaryLink,
} from "@/components/shared/buttons";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header rightContent={<LandingNav />} />
      <main className="mx-auto max-w-[1200px] px-8">
        <Hero />
        <Explainer />
        <Testimonials />
        <div className="h-32" />
      </main>
    </div>
  );
}

function LandingNav() {
  return (
    <nav className="flex items-center gap-2">
      <Link
        href="#about"
        className="px-4 py-2 text-[14px] text-oaa-ink hover:bg-oaa-ink/5 rounded-sm"
      >
        About
      </Link>
      <Link
        href="#faq"
        className="px-4 py-2 text-[14px] text-oaa-ink hover:bg-oaa-ink/5 rounded-sm"
      >
        FAQ
      </Link>
      <SecondaryLink href="/signin">Log in</SecondaryLink>
    </nav>
  );
}

function Hero() {
  return (
    <section className="grid grid-cols-1 gap-16 pt-24 pb-32 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center lg:gap-24">
      <div className="flex flex-col gap-8">
        <div className="font-mono text-[11px] leading-[1.4] tracking-[0.08em] uppercase text-oaa-muted">
          <span className="text-oaa-clay">2026</span>
          <span> · FOR MCGILL MMA · STUDENTS &amp; ALUMNI</span>
        </div>

        <DisplayHeading variant="xl">
          One ask away from the conversation that{" "}
          <span className="text-oaa-clay">changes everything.</span>
        </DisplayHeading>

        <p className="max-w-[560px] text-[18px] leading-[1.5] text-oaa-muted">
          Connect with MMA alumni who&apos;ve walked your path. Scoped,
          intentional, no awkward openers.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <PrimaryLink href="/role-select" trailingArrow>
            Get started
          </PrimaryLink>
          <SecondaryButton type="button">
            Watch the 90-second tour
          </SecondaryButton>
        </div>
      </div>

      <ScopedCard />
    </section>
  );
}

function ScopedCard() {
  return (
    <div className="rounded-md border border-oaa-hairline bg-white p-8">
      <div className="text-center font-mono text-[11px] leading-[1.4] tracking-[0.08em] uppercase text-oaa-muted">
        Scoped · 20 min · One ask
      </div>
      <div className="relative mt-10 flex items-center justify-between">
        <Avatar variant="student" name="Maya Chen" size="lg" />
        <svg
          aria-hidden
          viewBox="0 0 200 60"
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 h-16 w-full -translate-y-1/2 px-16"
          preserveAspectRatio="none"
        >
          <path
            d="M 4 50 Q 100 -10 196 50"
            stroke="var(--oaa-clay)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <Avatar variant="alumnus" name="Adam Foster" size="lg" />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 text-center font-mono text-[11px] tracking-[0.06em] uppercase text-oaa-muted">
        <div>
          <div className="text-oaa-clay">Student</div>
          <div className="mt-1 text-oaa-ink normal-case font-sans text-[13px] tracking-normal">
            MMA ’26
          </div>
        </div>
        <div>
          <div className="text-oaa-ink">Alumnus</div>
          <div className="mt-1 text-oaa-ink normal-case font-sans text-[13px] tracking-normal">
            Director, Data
          </div>
        </div>
      </div>
    </div>
  );
}

function Explainer() {
  const steps = [
    {
      label: "01",
      title: "Match",
      body:
        "We surface a small set of alumni whose paths line up with your aspirations. No infinite scroll, no guessing.",
    },
    {
      label: "02",
      title: "Ask",
      body:
        "Send a scoped, AI-drafted ask aimed at a topic the alumnus has already said they will help with.",
    },
    {
      label: "03",
      title: "Reflect",
      body:
        "After the call, capture insights and a next step. Recontact later when the moment is right.",
    },
  ];
  return (
    <section className="border-t border-oaa-hairline pt-24" id="about">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
        {steps.map((s) => (
          <div key={s.label} className="flex flex-col gap-4">
            <div className="font-mono text-[11px] leading-[1.4] tracking-[0.08em] uppercase text-oaa-muted">
              {s.label} · {s.title.toUpperCase()}
            </div>
            <DisplayHeading variant="m" as="h2">
              {s.title}.
            </DisplayHeading>
            <p className="text-[15px] leading-[1.5] text-oaa-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      body:
        "I was three weeks deep in cold DMs with nothing back. One scoped ask through One Ask Away and I had a 25-minute call that reshaped my whole search.",
      who: "Kaylie, MMA ’26",
    },
    {
      body:
        "Most asks I get are vague. The ones from One Ask Away show up with a topic I already said I help with, and it makes saying yes easy.",
      who: "Adam, Director of Data, MMA ’18",
    },
  ];
  return (
    <section className="mt-24 border-t border-oaa-hairline pt-24">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {quotes.map((q) => (
          <figure key={q.who} className="flex flex-col gap-6">
            <blockquote className="text-[18px] leading-[1.5] italic text-oaa-ink">
              &ldquo;{q.body}&rdquo;
            </blockquote>
            <figcaption className="text-[13px] leading-[1.45] text-oaa-muted">
              {q.who}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}


export default LandingPage;
