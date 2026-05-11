"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { Header } from "@/components/oaa/Header";
import { Avatar } from "@/components/oaa/Avatar";
import { STUDENT } from "@/lib/mock-student";

export default function ReportSentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header
        rightContent={
          <Avatar variant="student" name={STUDENT.name} size="sm" />
        }
      />

      <main className="mx-auto flex max-w-[1200px] flex-col items-center px-8 py-32 text-center">
        {/* Circle icon */}
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
          <Check
            className="h-7 w-7 text-brand-500"
            strokeWidth={2}
            aria-hidden
          />
        </div>

        <h1 className="mb-3 text-3xl font-semibold leading-[1.1] text-foreground">
          Thanks — we got it.
        </h1>
        <p className="mb-10 max-w-[420px] text-sm leading-relaxed text-muted-foreground">
          We review all reports carefully. If we find a violation, we will take
          action within 2 business days.
        </p>

        <Link
          href="/matches"
          className="rounded-md bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
        >
          Back to matches
        </Link>
      </main>
    </div>
  );
}
