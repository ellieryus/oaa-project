"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

import { BackHeader } from "@/components/oaa/BackHeader";
import { Avatar } from "@/components/oaa/Avatar";
import { PrimaryButton } from "@/components/oaa/buttons";
import { MAYA_FIRST_REFLECTION, ADAM_VIDEO } from "@/lib/mock-video";

type Props = { params: Promise<{ requestId: string }> };

export default function ReflectPage({ params }: Props) {
  // Params consumed but unused — video demo renders the same layout for any requestId
  use(params);

  const router = useRouter();

  function handleSave() {
    router.push("/past-contacts");
  }

  return (
    <div className="min-h-screen bg-background">
      <BackHeader
        backHref="/calls"
        backLabel="Back to calls"
        rightContent={<Avatar variant="student" name="Maya Chen" size="sm" />}
      />

      <main className="mx-auto max-w-[720px] px-8 pt-10 pb-32">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold leading-[1.15] text-foreground">
            After your call with {ADAM_VIDEO.name.split(" ")[0]}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <Avatar variant="alumnus" name={ADAM_VIDEO.name} size="md" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{ADAM_VIDEO.name}</span>
              {" · "}
              {ADAM_VIDEO.role}, {ADAM_VIDEO.company}
              {" · "}
              Oct 12, 2026
            </p>
          </div>
        </div>

        {/* Section 1 — What you learned */}
        <section className="mb-12">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            What you learned
          </h2>
          <p className="mt-1 text-xs text-muted-foreground/70">
            AI-structured from your notes
          </p>
          <ul className="mt-4 space-y-3">
            {MAYA_FIRST_REFLECTION.learnings.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-md border border-border bg-card px-4 py-3"
              >
                <span className="mt-0.5 shrink-0 text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 2 — Your next priorities */}
        <section className="mb-12">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Your next priorities
          </h2>
          <p className="mt-1 text-xs text-muted-foreground/70">
            AI suggested · Edit on dashboard
          </p>
          <ul className="mt-4 space-y-3">
            {MAYA_FIRST_REFLECTION.priorities.map((item, i) => (
              <li
                key={i}
                className="rounded-md border border-brand-500 bg-transparent px-4 py-3"
              >
                <p className="text-sm font-medium text-foreground">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3 — Trajectory */}
        <section className="mb-12">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Trajectory
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {MAYA_FIRST_REFLECTION.trajectory}
          </p>
        </section>

        {/* Section 4 — Suggested follow-up */}
        <section>
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Suggested follow-up
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground">
            {MAYA_FIRST_REFLECTION.followUpSuggestion}
          </p>
        </section>
      </main>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-border bg-card px-8 py-4">
        <div className="mx-auto flex max-w-[720px] items-center justify-end">
          <PrimaryButton type="button" onClick={handleSave}>
            Save reflection
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
