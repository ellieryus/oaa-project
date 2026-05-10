"use client";

import Link from "next/link";
import { RotateCw, Check, Pencil } from "lucide-react";
import { use, useState } from "react";

import { getAlumnus } from "@/server/modules/alumni/alumni.mock";
import { STUDENT } from "@/server/modules/students/student.mock";
import { Avatar } from "@/components/shared/Avatar";
import { BackHeader } from "@/components/layout/BackHeader";
import { PrimaryButton } from "@/components/shared/buttons";

const SAMPLE_OPENER =
  "Hi Adam — I'm a current MMA student aiming for product analytics roles. I noticed you pivoted from consulting into Shopify's analytics team — that path is exactly what I'm trying to navigate. Could we spend 15 minutes on how you positioned yourself for that switch?";

const SAMPLE_QUESTION =
  "How did you decide which roles to apply to during your transition?";

type Props = { params: Promise<{ alumniId: string }> };

export function AskComposerPage({ params }: Props) {
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
      <div className="flex min-h-screen items-center justify-center bg-oaa-bg">
        <p className="text-oaa-muted">Alumnus not found.</p>
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
    <div className="min-h-screen bg-oaa-bg">
      <BackHeader
        backHref={`/alumni/${alumniId}`}
        backLabel={`Back to ${firstName}'s profile`}
        rightContent={<Avatar variant="student" name={STUDENT.name} size="sm" />}
      />

      <main className="mx-auto max-w-[720px] px-8 py-12">
        {/* Page heading */}
        <div className="mb-8">
          <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
            13 · Compose
          </p>
          <h1 className="font-sans text-[40px] font-semibold leading-[1.05] tracking-[-0.01em] text-oaa-ink">
            Ask {firstName} →
          </h1>
          <p className="mt-2 text-[15px] text-oaa-muted">
            One scoped ask. 15 minutes. Real answers.
          </p>
          {alumnus.customMessage && (
            <div className="mt-4 border-l-2 border-oaa-clay-tint-border bg-oaa-bg px-5 py-4">
              <p className="mb-2 font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-clay">
                From {firstName}
              </p>
              <p className="text-[14px] leading-[1.6] text-oaa-ink italic">
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
                <label className="text-[13px] font-semibold text-oaa-ink">
                  Your opening ask
                </label>
                <div className="flex items-center gap-3">
                  <span className="rounded-xs bg-oaa-clay-tint-bg px-2 py-0.5 font-mono text-[10px] tracking-[0.06em] uppercase text-oaa-clay">
                    % AI drafted
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-[12px] text-oaa-muted hover:text-oaa-ink"
                  >
                    <RotateCw className="h-3 w-3" strokeWidth={1.5} aria-hidden />
                    Regenerate · 2 of 2 left
                  </button>
                </div>
              </div>
              <p className="mb-2 text-[12px] text-oaa-muted">
                This opens your message. Edit anything that doesn't sound like you.
              </p>
              <textarea
                value={opener}
                onChange={(e) => setOpener(e.target.value)}
                rows={6}
                maxLength={600}
                className="w-full rounded-sm border border-oaa-clay-tint-border bg-white px-4 py-3 text-[14px] leading-[1.55] text-oaa-ink placeholder:text-oaa-muted focus:outline-none focus:ring-2 focus:ring-oaa-clay/40 resize-none"
              />
              <p className="mt-1 text-right font-mono text-[11px] text-oaa-muted">
                {opener.length} / 600
              </p>
            </div>

            {/* Topic */}
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-oaa-ink">
                What's this about?
              </label>
              <p className="mb-2 text-[12px] text-oaa-muted">
                Pick from {firstName}'s declared offerings. Other topics aren't selectable.
              </p>
              <div className="relative">
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full appearance-none rounded-sm border border-oaa-hairline bg-white px-4 py-3 text-[14px] text-oaa-ink focus:outline-none focus:ring-2 focus:ring-oaa-clay/40"
                >
                  {alumnus.offerings.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.title}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-oaa-muted">
                  ▾
                </span>
              </div>
            </div>

            {/* Question */}
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-oaa-ink">
                Your question
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                maxLength={280}
                className="w-full rounded-sm border border-oaa-hairline bg-white px-4 py-3 text-[14px] leading-[1.55] text-oaa-ink placeholder:text-oaa-muted focus:outline-none focus:ring-2 focus:ring-oaa-clay/40 resize-none"
                placeholder="What's the one thing you'd most want to ask?"
              />
              <div className="mt-1 flex items-center justify-between">
                <span />
                <p className="text-right font-mono text-[11px] text-oaa-muted">
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
                    className={`flex items-center justify-center gap-2 rounded-sm border py-4 text-[14px] font-medium transition-colors ${
                      format === f
                        ? "border-oaa-clay-tint-border bg-oaa-clay-tint-bg text-oaa-clay"
                        : "border-oaa-hairline bg-white text-oaa-muted hover:border-oaa-ink/30 hover:text-oaa-ink"
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
                  <h3 className="text-[15px] font-semibold text-oaa-ink">
                    Pick up to 3 times
                  </h3>
                  <p className="text-[12px] text-oaa-muted">
                    Times shown in your timezone. {firstName}'s zone in parens.
                  </p>
                </div>
                <span className="font-mono text-[13px] text-oaa-muted">
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
                      className={`flex flex-col items-start rounded-sm border p-4 text-left transition-colors disabled:opacity-40 ${
                        isSelected
                          ? "border-oaa-clay-tint-border bg-oaa-clay-tint-bg"
                          : "border-oaa-hairline bg-white hover:border-oaa-ink/30"
                      }`}
                    >
                      <div className="mb-1 flex w-full items-start justify-between">
                        <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-oaa-clay">
                          {slot.dayLabel}
                        </span>
                        {isSelected && (
                          <Check
                            className="h-3.5 w-3.5 text-oaa-clay"
                            strokeWidth={2}
                            aria-hidden
                          />
                        )}
                      </div>
                      <p className="text-[14px] font-semibold text-oaa-ink">
                        {slot.timeRange}
                      </p>
                      {slot.altTz && (
                        <p className="text-[12px] text-oaa-muted">{slot.altTz}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between border-t border-oaa-hairline pt-5">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[14px] text-oaa-muted underline hover:text-oaa-ink"
              >
                Cancel
              </button>
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-oaa-muted">Ready to send.</span>
                <Link
                  href={`/ask/${alumniId}/sent`}
                  className="inline-flex items-center gap-2 rounded-sm bg-oaa-ink px-5 py-3 text-[15px] font-medium leading-none text-white transition-colors hover:bg-oaa-ink/90"
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

export default AskComposerPage;
