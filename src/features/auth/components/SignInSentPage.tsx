"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Check } from "lucide-react";

import { DisplayHeading } from "@/components/shared/DisplayHeading";
import { Header } from "@/components/layout/Header";
import { GhostLink, SecondaryButton, SecondaryLink } from "@/components/shared/buttons";

const RESEND_SECONDS = 30;

function SentInner() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = window.setTimeout(
      () => setSecondsLeft((s) => s - 1),
      1000,
    );
    return () => window.clearTimeout(id);
  }, [secondsLeft]);

  const canResend = secondsLeft <= 0;

  function handleResend() {
    setSecondsLeft(RESEND_SECONDS);
  }

  return (
    <div className="mx-auto mt-16 flex max-w-[560px] flex-col items-center text-center">
      <span
        aria-hidden
        className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-oaa-clay-tint-bg"
      >
        <Check className="h-7 w-7 text-oaa-clay" strokeWidth={1.5} />
      </span>

      <div className="mt-8 flex flex-col gap-6">
        <DisplayHeading variant="l">Check your inbox.</DisplayHeading>
        <p className="text-[18px] leading-[1.5] text-oaa-muted">
          We sent a link to{" "}
          <span className="font-medium text-oaa-ink">{email || "your inbox"}</span>
          . It expires in 15 minutes.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        <SecondaryLink href="/signin">Wrong email? Try again</SecondaryLink>
        <SecondaryButton
          type="button"
          disabled={!canResend}
          onClick={canResend ? handleResend : undefined}
        >
          {canResend ? "Resend" : `Resend in ${secondsLeft}s`}
        </SecondaryButton>
      </div>
    </div>
  );
}

function SentFallback() {
  return (
    <div className="mx-auto mt-16 flex max-w-[560px] flex-col items-center text-center">
      <span
        aria-hidden
        className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-oaa-clay-tint-bg"
      >
        <Check className="h-7 w-7 text-oaa-clay" strokeWidth={1.5} />
      </span>
      <div className="mt-8 flex flex-col gap-6">
        <DisplayHeading variant="l">Check your inbox.</DisplayHeading>
        <p className="text-[18px] leading-[1.5] text-oaa-muted">
          Loading link details.
        </p>
      </div>
    </div>
  );
}

export function SentPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-8 pb-32">
        <div className="pt-8">
          <GhostLink href="/signin" className="px-3 py-2 text-[14px]">
            ← Back
          </GhostLink>
        </div>
        <Suspense fallback={<SentFallback />}>
          <SentInner />
        </Suspense>
      </main>
    </>
  );
}

export default SentPage;
