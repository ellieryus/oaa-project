"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Avatar } from "@/components/shared/Avatar";
import { STUDENT } from "@/server/modules/students/student.mock";

export function MatchesLoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push("/matches"), 2500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-screen bg-oaa-bg">
      <Header
        rightContent={
          <Avatar variant="student" name={STUDENT.name} size="sm" />
        }
      />

      <main className="mx-auto flex max-w-[560px] flex-col items-center px-8 py-32 text-center">
        <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-oaa-clay-tint-bg">
          <Sparkles
            className="h-7 w-7 text-oaa-clay"
            strokeWidth={1.5}
            aria-hidden
          />
        </div>

        <h1 className="mb-3 font-sans text-[32px] font-semibold leading-[1.1] tracking-[-0.01em] text-oaa-ink">
          Finding your alumni matches&#x2026;
        </h1>
        <p className="text-[16px] text-oaa-muted">
          This usually takes a few seconds.
        </p>
      </main>
    </div>
  );
}

export default MatchesLoadingPage;
