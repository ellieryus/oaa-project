"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Avatar } from "@/components/shared/Avatar";
import { STUDENT } from "@/server/modules/students/student.mock";

export function ReportSentPage() {
  return (
    <div className="min-h-screen bg-oaa-bg">
      <Header
        rightContent={
          <Avatar variant="student" name={STUDENT.name} size="sm" />
        }
      />

      <main className="mx-auto flex max-w-[1200px] flex-col items-center px-8 py-32 text-center">
        {/* Circle icon */}
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--oaa-clay-tint-bg)]">
          <Check
            className="h-7 w-7 text-oaa-clay"
            strokeWidth={2}
            aria-hidden
          />
        </div>

        <h1 className="mb-3 font-sans text-[32px] font-semibold leading-[1.1] tracking-[-0.01em] text-oaa-ink">
          Thanks — we got it.
        </h1>
        <p className="mb-10 max-w-[420px] text-[15px] leading-[1.6] text-oaa-muted">
          We review all reports carefully. If we find a violation, we will take
          action within 2 business days.
        </p>

        <Link
          href="/matches"
          className="rounded-sm bg-oaa-ink px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-oaa-ink/90"
        >
          Back to matches
        </Link>
      </main>
    </div>
  );
}

export default ReportSentPage;
