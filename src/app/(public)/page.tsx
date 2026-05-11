import Link from "next/link";

import {
  PrimaryLink,
  SecondaryButton,
  SecondaryLink,
} from "@/components/oaa/buttons";
import { SectionHeading } from "@/components/oaa/SectionHeading";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-8">
        <Hero />
        <div className="border-t border-border" />
        <Steps />
        <div className="border-t border-border" />
        <Testimonials />
        <div className="border-t border-border" />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-4">
        <Link href="/" className="text-sm font-semibold text-foreground">
          One Ask Away
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="#about"
            className="rounded-md px-4 py-2 text-sm text-foreground transition-colors hover:bg-foreground/5"
          >
            About
          </Link>
          <Link
            href="#faq"
            className="rounded-md px-4 py-2 text-sm text-foreground transition-colors hover:bg-foreground/5"
          >
            FAQ
          </Link>
          <div className="ml-2 flex items-center gap-2">
            <SecondaryLink href="/signin">Log in</SecondaryLink>
            <PrimaryLink href="/role-select" trailingArrow>
              Get started
            </PrimaryLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="grid grid-cols-1 gap-16 py-24 lg:grid-cols-[1fr_480px] lg:items-center lg:gap-20 lg:py-28">
      {/* Left column — constrained so heading doesn't sprawl full width */}
      <div className="flex max-w-[560px] flex-col gap-7">
        {/* Stat callout pill */}
        <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm">
          <span className="font-medium text-foreground">
            Median ask response time on OAA:
          </span>
          <span className="text-muted-foreground">14h 32m</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl font-semibold tracking-tight leading-[1.08] text-foreground">
          One ask becomes{" "}
          <span className="text-brand-600">one referral.</span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-[480px] text-lg leading-relaxed text-muted-foreground">
          The private talent pipeline for McGill MMA students and alumni. Scope
          what you&apos;ll help with. Meet the right students.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <PrimaryLink href="/role-select" trailingArrow>
            Get started
          </PrimaryLink>
          <SecondaryButton type="button">
            Watch the 90-second tour
          </SecondaryButton>
        </div>
      </div>

      {/* Right column — gradient mesh behind card */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-16 h-80 w-80 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at 60% 30%, var(--brand-100) 0%, var(--brand-200) 45%, transparent 75%)",
            opacity: 0.7,
          }}
        />
        <AskCard />
      </div>
    </section>
  );
}

function AskCard() {
  return (
    <div className="relative rounded-xl border border-border bg-card p-6 shadow-sm">
      {/* Student info + scope badge */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600">
            MC
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">
              Maya Chen · MMA &apos;26
            </p>
            <p className="text-sm text-muted-foreground">
              Aiming for Data Analyst, Toronto
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
          Within scope
        </span>
      </div>

      <div className="mt-5 border-t border-border pt-5">
        <p className="mb-2 text-xs text-muted-foreground">Asking</p>
        <p className="text-sm font-medium leading-relaxed text-foreground">
          How did you frame your pivot from a marketing background when applying
          to data roles — and what would you do differently now?
        </p>
      </div>

      {/* Pills */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-md border border-border px-3 py-1 text-sm text-muted-foreground">
          Career pivot
        </span>
        <span className="rounded-md border border-border px-3 py-1 text-sm text-muted-foreground">
          15 min · virtual
        </span>
      </div>
    </div>
  );
}

function Steps() {
  const steps = [
    {
      num: "01",
      title: "Declare your scope.",
      body: "Alumni set exactly what they'll help with — and what they won't. No ambiguity before the first message.",
    },
    {
      num: "02",
      title: "Send one scoped ask.",
      body: "Top 3 alumni matched to your aspirations. AI drafts the opening. 15 minutes. Real answers.",
    },
    {
      num: "03",
      title: "The pipeline compounds.",
      body: "After the call, alumni log structured notes. When a role opens, they find you again.",
    },
  ];

  return (
    <section className="py-24" id="about">
      <SectionHeading
        title="Three steps. One conversation."
        subtitle="Designed so the first ask is the easiest one you'll ever send."
        className="mb-12"
      />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
        {steps.map((s) => (
          <div key={s.num} className="flex flex-col">
            <span className="text-sm font-medium text-brand-500">{s.num}</span>
            <div className="mt-2 mb-4 h-px w-7 bg-brand-500" />
            <p className="text-lg font-semibold text-foreground">{s.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const avatars: { initials: string; cls: string }[] = [
    { initials: "MC", cls: "bg-brand-50 text-brand-600" },
    { initials: "JR", cls: "bg-neutral-200 text-neutral-500" },
    { initials: "SK", cls: "bg-brand-100 text-brand-700" },
    { initials: "AT", cls: "bg-neutral-100 text-neutral-400" },
    { initials: "DP", cls: "bg-brand-200 text-brand-800" },
    { initials: "LH", cls: "bg-brand-50 text-brand-600" },
    { initials: "KO", cls: "bg-neutral-200 text-neutral-500" },
    { initials: "RV", cls: "bg-brand-100 text-brand-700" },
    { initials: "NM", cls: "bg-neutral-100 text-neutral-400" },
    { initials: "AB", cls: "bg-brand-200 text-brand-800" },
    { initials: "JC", cls: "bg-brand-50 text-brand-600" },
    { initials: "TF", cls: "bg-neutral-200 text-neutral-500" },
    { initials: "EW", cls: "bg-brand-100 text-brand-700" },
    { initials: "HM", cls: "bg-neutral-100 text-neutral-400" },
    { initials: "LP", cls: "bg-brand-200 text-brand-800" },
    { initials: "SR", cls: "bg-brand-50 text-brand-600" },
  ];

  return (
    <section className="py-24">
      <SectionHeading
        title="From students and alumni."
        subtitle="The MMA network, scoped and on the record."
      />

      {/* Avatar strip */}
      <div className="mx-auto mt-16 flex max-w-[700px] flex-wrap justify-center gap-4">
        {avatars.map((a) => (
          <div
            key={a.initials}
            className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-medium ${a.cls}`}
          >
            {a.initials}
          </div>
        ))}
      </div>

      {/* Single centered quote */}
      <figure className="mx-auto mt-16 max-w-[600px] text-center">
        <figcaption className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Kaylie Tran · MMA &apos;26
        </figcaption>
        <blockquote className="mt-3 text-xl italic leading-relaxed text-foreground">
          &ldquo;I had three calls in two weeks. Every single one led somewhere
          — a referral, a portfolio note, an introduction I&apos;d never have
          made on my own.&rdquo;
        </blockquote>
      </figure>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="flex flex-col gap-8 py-24 md:flex-row md:items-center md:justify-between md:gap-16">
      <SectionHeading
        title="Your first ask is the hardest."
        ctaText="Start here."
        subtitle="Sign up with your McGill email. Thirty seconds to set up, no passwords."
        className="max-w-[560px]"
      />

      <div className="flex shrink-0 flex-wrap items-center gap-3">
        <SecondaryLink href="#faq">Browse the FAQ</SecondaryLink>
        <PrimaryLink href="/role-select" trailingArrow>
          Get started
        </PrimaryLink>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-8 text-sm text-muted-foreground">
        <p>© 2026 One Ask Away · McGill MMA</p>
        <nav className="flex items-center gap-6">
          {["About", "Privacy", "Report", "FAQ"].map((label) => (
            <Link
              key={label}
              href={`#${label.toLowerCase()}`}
              className="transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
