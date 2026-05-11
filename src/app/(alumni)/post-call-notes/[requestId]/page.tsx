"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

import { BackHeader } from "@/components/oaa/BackHeader";
import { PrimaryButton } from "@/components/oaa/buttons";
import { cn } from "@/lib/utils";
import {
  FIRST_CALL_RUBRIC,
  SECOND_CALL_RUBRIC,
  MAYA_VIDEO,
  TIMELINE_VIDEO,
  type ReferralRating,
} from "@/lib/mock-video";

type Props = { params: Promise<{ requestId: string }> };

const RATING_OPTIONS: { value: ReferralRating; label: string; sublabel?: string }[] = [
  { value: "refer-now", label: "Refer now" },
  { value: "refer-after-gap", label: "Refer after closing a gap" },
  { value: "not-foreseeable", label: "Not foreseeable in next 12 months" },
  { value: "cant-say", label: "Can't say" },
];

export default function PostCallNotesPage({ params }: Props) {
  const { requestId } = use(params);
  const router = useRouter();

  // Video-demo special case: Maya's second call. Show delta view.
  const isMayaSecondCall = requestId === "inbox-maya";

  const studentName = isMayaSecondCall ? MAYA_VIDEO.name : "Student";
  const studentCohort = isMayaSecondCall ? MAYA_VIDEO.cohort : "";
  const callDate = isMayaSecondCall
    ? TIMELINE_VIDEO.secondCall.date
    : TIMELINE_VIDEO.firstCall.date;
  const firstCallDate = TIMELINE_VIDEO.firstCall.date;

  // Pick data shape: delta (2nd call) vs initial (1st call)
  const previouslyTaggedStrengths = isMayaSecondCall
    ? SECOND_CALL_RUBRIC.previouslyTaggedStrengths
    : [];
  const newStrengths = isMayaSecondCall
    ? SECOND_CALL_RUBRIC.newStrengths
    : FIRST_CALL_RUBRIC.strengths;
  const closedGaps = isMayaSecondCall ? SECOND_CALL_RUBRIC.closedGaps : [];
  const openGaps = isMayaSecondCall ? [] : FIRST_CALL_RUBRIC.gaps;
  const suggestedRating: ReferralRating = isMayaSecondCall
    ? SECOND_CALL_RUBRIC.suggestedRating
    : "refer-after-gap";

  const [rating, setRating] = useState<ReferralRating>(suggestedRating);

  function handleSave() {
    // Video demo: save = go to Watching page where Maya now sits at top
    router.push("/past-students");
  }

  return (
    <>
      <BackHeader backHref="/inbox" backLabel="Back to inbox" />
      <main className="mx-auto max-w-[920px] px-8 pb-32 pt-12">
        {/* Header */}
        <div className="mb-2 text-sm text-muted-foreground">
          Post-call rubric · {callDate}
        </div>
        <h1 className="text-3xl font-semibold text-foreground">
          Rubric — call with {studentName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {studentCohort}
        </p>

        {/* Delta banner — only for 2nd+ calls */}
        {isMayaSecondCall && (
          <div className="mt-8 rounded-md border border-border bg-card px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Updates since your {firstCallDate} rubric
            </p>
            <p className="mt-2 text-sm text-foreground">
              {newStrengths.length} new strength · {closedGaps.length} gap closed
            </p>
          </div>
        )}

        {/* Two-column strengths / gaps */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Strengths */}
          <section>
            <h2 className="mb-4 text-sm font-medium text-foreground">
              Strengths
            </h2>

            {previouslyTaggedStrengths.length > 0 && (
              <div className="mb-4">
                <p className="mb-2 text-xs text-muted-foreground">
                  Previously tagged
                </p>
                <div className="flex flex-wrap gap-2">
                  {previouslyTaggedStrengths.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground"
                    >
                      <Check className="h-3 w-3 text-foreground/50" strokeWidth={2} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="mb-2 text-xs text-muted-foreground">
              {isMayaSecondCall ? "AI noticed in this call" : "AI extracted from this call"}
            </p>
            <div className="space-y-2">
              {newStrengths.map((s) => (
                <div
                  key={s.tag}
                  className="flex w-full items-start gap-3 rounded-md border border-border bg-card px-4 py-3 text-left"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" strokeWidth={2.5} aria-hidden />
                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      {s.tag}
                    </span>
                    <span className="mt-0.5 block text-xs italic text-muted-foreground">
                      &ldquo;{s.evidence}&rdquo;
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Gaps */}
          <section>
            <h2 className="mb-4 text-sm font-medium text-foreground">
              Gaps
            </h2>

            {isMayaSecondCall && closedGaps.length > 0 && (
              <>
                <p className="mb-2 text-xs text-muted-foreground">
                  Previous gap · status update
                </p>
                <div className="mb-4 space-y-2">
                  {closedGaps.map((g) => (
                    <div
                      key={g.tag}
                      className="flex w-full items-start gap-3 rounded-md border border-border bg-card px-4 py-3 text-left"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" strokeWidth={2.5} aria-hidden />
                      <span>
                        <span className="block text-sm font-medium text-foreground">
                          Mark {g.tag} closed
                        </span>
                        <span className="mt-0.5 block text-xs italic text-muted-foreground">
                          &ldquo;{g.evidence}&rdquo;
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {openGaps.length > 0 && (
              <>
                <p className="mb-2 text-xs text-muted-foreground">
                  AI extracted from this call
                </p>
                <div className="space-y-2">
                  {openGaps.map((g) => (
                    <div
                      key={g.tag}
                      className="flex w-full items-start gap-3 rounded-md border border-border bg-card px-4 py-3 text-left"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" strokeWidth={2.5} aria-hidden />
                      <span>
                        <span className="block text-sm font-medium text-foreground">
                          {g.tag}
                        </span>
                        <span className="mt-0.5 block text-xs italic text-muted-foreground">
                          &ldquo;{g.evidence}&rdquo;
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>

        {/* Referability question */}
        <section className="mt-12">
          <h2 className="text-base font-semibold text-foreground">
            Knowing {studentName} now, where is she on referability?
          </h2>
          <div className="mt-4 space-y-2">
            {RATING_OPTIONS.map((opt) => {
              const isSelected = rating === opt.value;
              const isSuggested = opt.value === suggestedRating;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setRating(opt.value)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left transition-colors",
                    isSelected
                      ? "border-brand-500 bg-card"
                      : "border-border bg-card hover:border-foreground/20",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                      isSelected ? "border-brand-500" : "border-border",
                    )}
                  >
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-brand-500" />
                    )}
                  </span>
                  <span className="flex-1 text-sm font-medium text-foreground">
                    {opt.label}
                  </span>
                  {isSuggested && (
                    <span className="text-xs italic text-muted-foreground">
                      suggested
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Footer CTA */}
        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            Total time on this rubric: about 40 seconds.
          </p>
          <PrimaryButton tone="clay" onClick={handleSave}>
            Ready to refer
          </PrimaryButton>
        </div>
      </main>
    </>
  );
}
