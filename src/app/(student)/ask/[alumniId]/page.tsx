"use client";

import Link from "next/link";
import { RotateCw, Check, Pencil } from "lucide-react";
import { use, useState } from "react";

import { getAlumnus } from "@/lib/mock-alumni";
import { STUDENT } from "@/lib/mock-student";
import { Avatar } from "@/components/oaa/Avatar";
import { BackHeader } from "@/components/oaa/BackHeader";
import { PrimaryButton } from "@/components/oaa/buttons";

const SAMPLE_OPENER =
  "Hi Adam — I'm a current MMA student aiming for product analytics roles. I noticed you pivoted from consulting into Shopify's analytics team — that path is exactly what I'm trying to navigate. Could we spend 15 minutes on how you positioned yourself for that switch?";

const SAMPLE_QUESTION =
  "How did you decide which roles to apply to during your transition?";

type Props = { params: Promise<{ alumniId: string }> };

export default function AskComposerPage({ params }: Props) {
  const { alumniId } = use(params);
  const alumnus = getAlumnus(alumniId);

  const [step, setStep] = useState<1 | 2>(1);
  const [opener, setOpener] = useState(SAMPLE_OPENER);
  const [topic, setTopic] = useState(alumnus?.offerings[0]?.id ?? "");
  const [question, setQuestion] = useState(SAMPLE_QUESTION);
  const [format, setFormat] = useState<"15min" | "20min">("15min");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([
    alumnus?.availabilitySlots[0]?.timeRange ?? "",
    alumnus?.availabilitySlots[2]?.timeRange ?? "",
  ]);

  if (!alumnus) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Alumnus not found.</p>
      </div>
    );
  }

  const firstName = alumnus.name.split(" ")[0];
  const maxSlots = 3;

  function toggleSlot(timeRange: string) {
    setSelectedSlots((prev) =>
      prev.includes(timeRange)
        ? prev.filter((s) => s !== timeRange)
        : prev.length < maxSlots
        ? [...prev, timeRange]
        : prev,
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BackHeader
        backHref={`/alumni/${alumniId}`}
        backLabel={`Back to ${firstName}'s profile`}
        rightContent={<Avatar variant="student" name={STUDENT.name} size="sm" />}
      />

      <main className="mx-auto max-w-[720px] px-8 py-12">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold leading-[1.05] text-foreground">
            Ask {firstName} →
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            One scoped ask. 15 minutes. Real answers.
          </p>
          {alumnus.customMessage && (
            <div className="mt-4 border-l-2 border-brand-200 bg-background px-5 py-4">
              <p className="text-sm leading-relaxed text-foreground italic">
                &ldquo;{alumnus.customMessage}&rdquo;
              </p>
            </div>
          )}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            {/* Opener */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">
                  Your opening ask
                </label>
                <div className="flex items-center gap-3">
                  <span className="rounded-xs bg-brand-50 px-2 py-0.5 text-xs text-brand-500">
                    % AI drafted
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <RotateCw className="h-3 w-3" strokeWidth={1.5} aria-hidden />
                    Regenerate · 2 of 2 left
                  </button>
                </div>
              </div>
              <p className="mb-2 text-xs text-muted-foreground">
                This opens your message. Edit anything that doesn't sound like you.
              </p>
              <textarea
                value={opener}
                onChange={(e) => setOpener(e.target.value)}
                rows={6}
                maxLength={600}
                className="w-full rounded-md border border-brand-200 bg-card px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/40 resize-none"
              />
              <p className="mt-1 text-right text-xs text-muted-foreground">
                {opener.length} / 600
              </p>
            </div>

            {/* Topic */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-foreground">
                What's this about?
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                Pick from {firstName}'s declared offerings. Other topics aren't selectable.
              </p>
              <div className="relative">
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full appearance-none rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                >
                  {alumnus.offerings.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.title}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ▾
                </span>
              </div>
            </div>

            {/* Question */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-foreground">
                Your question
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                maxLength={280}
                className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/40 resize-none"
                placeholder="What's the one thing you'd most want to ask?"
              />
              <div className="mt-1 flex items-center justify-between">
                <span />
                <p className="text-right text-xs text-muted-foreground">
                  {question.length} / 280
                </p>
              </div>
            </div>

            <div className="pt-2">
              <PrimaryButton
                onClick={() => setStep(2)}
                disabled={!question.trim() || !topic}
                trailingArrow
                className="w-full justify-center"
              >
                Continue
              </PrimaryButton>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Format */}
            <div>
              <div className="grid grid-cols-2 gap-3">
                {(["15min", "20min"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFormat(f)}
                    className={`flex items-center justify-center gap-2 rounded-md border py-4 text-sm font-medium transition-colors ${
                      format === f
                        ? "border-brand-200 bg-brand-50 text-brand-500"
                        : "border-border bg-card text-muted-foreground hover:border-brand-500 hover:text-foreground"
                    }`}
                  >
                    {format === f && (
                      <Check className="h-4 w-4" strokeWidth={2} aria-hidden />
                    )}
                    {f === "15min" ? "15 min · virtual" : "20 min · virtual"}
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Pick up to 3 times
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Times shown in your timezone. {firstName}'s zone in parens.
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {selectedSlots.length} / {maxSlots}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {alumnus.availabilitySlots.map((slot) => {
                  const isSelected = selectedSlots.includes(slot.timeRange);
                  const isDisabled =
                    !isSelected && selectedSlots.length >= maxSlots;
                  return (
                    <button
                      key={slot.timeRange}
                      type="button"
                      onClick={() => toggleSlot(slot.timeRange)}
                      disabled={isDisabled}
                      className={`flex flex-col items-start rounded-md border p-4 text-left transition-colors disabled:opacity-40 ${
                        isSelected
                          ? "border-brand-200 bg-brand-50"
                          : "border-border bg-card hover:border-brand-500"
                      }`}
                    >
                      <div className="mb-1 flex w-full items-start justify-between">
                        <span className="text-xs font-medium text-brand-500">
                          {slot.dayLabel}
                        </span>
                        {isSelected && (
                          <Check
                            className="h-3.5 w-3.5 text-brand-500"
                            strokeWidth={2}
                            aria-hidden
                          />
                        )}
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {slot.timeRange}
                      </p>
                      {slot.altTz && (
                        <p className="text-xs text-muted-foreground">{slot.altTz}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between border-t border-border pt-5">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-muted-foreground underline hover:text-foreground"
              >
                Cancel
              </button>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Ready to send.</span>
                <Link
                  href={`/ask/${alumniId}/sent`}
                  className="inline-flex items-center gap-2 rounded-md bg-brand-500 px-5 py-3 text-sm font-medium leading-none text-white transition-colors hover:bg-brand-600"
                >
                  Send ask
                  <span aria-hidden>↗</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
