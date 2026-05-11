import Link from "next/link";
import { SendHorizonal, Clock } from "lucide-react";
import { notFound } from "next/navigation";

import { getAlumnus } from "@/lib/mock-alumni";
import { STUDENT } from "@/lib/mock-student";
import { Avatar } from "@/components/oaa/Avatar";
import { PrimaryLink, SecondaryLink } from "@/components/oaa/buttons";

type Props = { params: Promise<{ alumniId: string }> };

export default async function SentConfirmationPage({ params }: Props) {
  const { alumniId } = await params;
  const alumnus = getAlumnus(alumniId);
  if (!alumnus) notFound();

  const firstName = alumnus.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal header — logo only */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-4">
          <Link href="/home" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.svg" alt="One Ask Away" className="h-7 w-auto" />
            <span className="text-base font-semibold leading-none text-foreground">
              One Ask Away
            </span>
          </Link>
          <Avatar variant="student" name={STUDENT.name} size="sm" />
        </div>
      </header>

      {/* Centered content */}
      <main className="mx-auto flex max-w-[560px] flex-col items-center px-8 py-16 text-center">
        {/* Icon */}
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50">
          <SendHorizonal
            className="h-6 w-6 text-brand-500"
            strokeWidth={1.5}
            aria-hidden
          />
        </div>

        {/* Heading */}
        <h1 className="mb-3 text-4xl font-semibold leading-[1.05] text-foreground">
          Sent.
        </h1>
        <p className="mb-10 text-base text-muted-foreground">
          Your ask is on its way to {firstName}.
        </p>

        {/* Preview card — what alumni will see */}
        <div className="mb-6 w-full rounded-md border border-border bg-card p-6 text-left">
          {/* Student identity row */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar variant="student" name={STUDENT.name} size="sm" />
              <div>
                <p className="text-sm font-semibold text-foreground">{STUDENT.name}</p>
                <p className="text-xs text-muted-foreground">
                  {STUDENT.cohort} · Aiming for {STUDENT.primaryAspiration}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="rounded-xs border border-border bg-card px-2 py-0.5 text-xs text-muted-foreground">
                Career pivot
              </span>
              <span className="rounded-xs border border-border bg-card px-2 py-0.5 text-xs text-muted-foreground">
                15 min
              </span>
            </div>
          </div>

          {/* Opener excerpt */}
          <p className="mb-4 text-sm leading-relaxed text-foreground italic border-l-2 border-border pl-3">
            "Hi {firstName} — I'm a current MMA student aiming for product analytics roles..."
          </p>

          {/* Question + times */}
          <div className="space-y-1 text-sm">
            <p className="text-foreground">
              <span className="font-semibold">Question:</span>{" "}
              How did you decide which roles to apply to during your transition?
            </p>
            <p className="text-foreground">
              <span className="font-semibold">Times:</span>{" "}
              Tue Apr 28 5pm · Fri May 1 1pm
            </p>
          </div>
        </div>

        {/* Info banner */}
        <div className="mb-8 flex w-full items-start gap-3 rounded-md border border-brand-200 bg-brand-50 px-4 py-3 text-left">
          <Clock
            className="mt-0.5 h-4 w-4 shrink-0 text-brand-500"
            strokeWidth={1.5}
            aria-hidden
          />
          <p className="text-sm text-foreground">
            Most alumni respond within 48 hours. You'll get an email when they do.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <PrimaryLink href="/requests" trailingArrow>
            See my requests
          </PrimaryLink>
          <SecondaryLink href="/home">
            Back to home
          </SecondaryLink>
        </div>
      </main>
    </div>
  );
}
