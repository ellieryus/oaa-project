"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

import { Header } from "@/components/oaa/Header";
import { Avatar } from "@/components/oaa/Avatar";
import { STUDENT } from "@/lib/mock-student";

export default function MatchesLoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push("/matches"), 2500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        rightContent={
          <Avatar variant="student" name={STUDENT.name} size="sm" />
        }
      />

      <main className="mx-auto flex max-w-[560px] flex-col items-center px-8 py-32 text-center">
        <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
          <Sparkles
            className="h-7 w-7 text-brand-500"
            strokeWidth={1.5}
            aria-hidden
          />
        </div>

        <h1 className="mb-3 text-3xl font-semibold leading-[1.1] text-foreground">
          Finding your alumni matches&#x2026;
        </h1>
        <p className="text-base text-muted-foreground">
          This usually takes a few seconds.
        </p>
      </main>
    </div>
  );
}
