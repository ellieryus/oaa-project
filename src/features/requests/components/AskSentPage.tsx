import Link from "next/link";
import { SendHorizonal, Clock } from "lucide-react";
import { notFound } from "next/navigation";

import { getAlumnus } from "@/server/modules/alumni/alumni.mock";
import { STUDENT } from "@/server/modules/students/student.mock";
import { Avatar } from "@/components/shared/Avatar";
import { PrimaryLink, SecondaryLink } from "@/components/shared/buttons";

type Props = { params: Promise<{ alumniId: string }> };

export async function SentConfirmationPage({ params }: Props) {
  const { alumniId } = await params;
  const alumnus = getAlumnus(alumniId);
  if (!alumnus) notFound();

  const firstName = alumnus.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-oaa-bg">
      {/* Minimal header — logo only */}
      <header className="border-b border-oaa-hairline bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-4">
          <Link href="/home" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.svg" alt="One Ask Away" className="h-7 w-auto" />
            <span className="font-sans text-[16px] font-semibold leading-none text-oaa-ink">
              One Ask Away
            </span>
          </Link>
          <Avatar variant="student" name={STUDENT.name} size="sm" />
        </div>
      </header>

      {/* Centered content */}
      <main className="mx-auto flex max-w-[560px] flex-col items-center px-8 py-16 text-center">
        {/* Icon */}
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-oaa-clay-tint-bg">
          <SendHorizonal
            className="h-6 w-6 text-oaa-clay"
            strokeWidth={1.5}
            aria-hidden
          />
        </div>

        {/* Heading */}
        <h1 className="mb-3 font-sans text-[44px] font-semibold leading-[1.05] tracking-[-0.01em] text-oaa-ink">
          Sent.
        </h1>
        <p className="mb-10 text-[16px] text-oaa-muted">
          Your ask is on its way to {firstName}.
        </p>

        {/* Preview card — what alumni will see */}
        <div className="mb-6 w-full rounded-md border border-oaa-hairline bg-white p-6 text-left">
          <p className="mb-4 font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-muted">
            What {firstName} will see
          </p>

          {/* Student identity row */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar variant="student" name={STUDENT.name} size="sm" />
              <div>
                <p className="text-[14px] font-semibold text-oaa-ink">{STUDENT.name}</p>
                <p className="text-[12px] text-oaa-muted">
                  {STUDENT.cohort} · Aiming for {STUDENT.primaryAspiration}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="rounded-xs border border-oaa-hairline bg-white px-2 py-0.5 text-[12px] text-oaa-muted">
                Career pivot
              </span>
              <span className="rounded-xs border border-oaa-hairline bg-white px-2 py-0.5 text-[12px] text-oaa-muted">
                15 min
              </span>
            </div>
          </div>

          {/* Opener excerpt */}
          <p className="mb-4 text-[14px] leading-[1.55] text-oaa-ink italic border-l-2 border-oaa-hairline pl-3">
            "Hi {firstName} — I'm a current MMA student aiming for product analytics roles..."
          </p>

          {/* Question + times */}
          <div className="space-y-1 text-[14px]">
            <p className="text-oaa-ink">
              <span className="font-semibold">Question:</span>{" "}
              How did you decide which roles to apply to during your transition?
            </p>
            <p className="text-oaa-ink">
              <span className="font-semibold">Times:</span>{" "}
              Tue Apr 28 5pm · Fri May 1 1pm
            </p>
          </div>
        </div>

        {/* Info banner */}
        <div className="mb-8 flex w-full items-start gap-3 rounded-sm border border-oaa-clay-tint-border bg-oaa-clay-tint-bg px-4 py-3 text-left">
          <Clock
            className="mt-0.5 h-4 w-4 shrink-0 text-oaa-clay"
            strokeWidth={1.5}
            aria-hidden
          />
          <p className="text-[13px] text-oaa-ink">
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


export default SentConfirmationPage;
