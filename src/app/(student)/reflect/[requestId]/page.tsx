"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { Check, RotateCw } from "lucide-react";

import { BackHeader } from "@/components/oaa/BackHeader";
import { Avatar } from "@/components/oaa/Avatar";
import { PrimaryButton } from "@/components/oaa/buttons";
import { MOCK_REQUESTS, STUDENT } from "@/lib/mock-student";
import { reflectionStore } from "@/lib/reflection-store";

type Props = { params: Promise<{ requestId: string }> };

const FOLLOW_UP_OPTIONS = [
  "Definitely — I have a clear next ask",
  "Maybe — if something specific comes up",
  "Not yet — I need to do the work first",
  "No — we covered what I needed",
  "Not sure yet",
];

const AI_NEXT_STEP_VARIANTS = (firstName: string, company: string) => [
  `Follow up with ${firstName} in 4 weeks with a portfolio update.`,
  `Send ${firstName} a link to your strongest project once it's published. Mention this conversation.`,
  `Research ${company}'s current analytics team structure before reaching back out.`,
];

export default function ReflectPage({ params }: Props) {
  const { requestId } = use(params);
  const found = MOCK_REQUESTS.find((r) => r.id === requestId);
  if (!found) notFound();
  const req = found;

  const router = useRouter();
  const [standout, setStandout] = useState("");
  const [followUpIntent, setFollowUpIntent] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const firstName = req.alumniName.split(" ")[0];
  const variants = AI_NEXT_STEP_VARIANTS(firstName, req.alumniCompany);
  const [variantIndex, setVariantIndex] = useState(0);
  const [regenCount, setRegenCount] = useState(2);
  const [aiNextStep, setAiNextStep] = useState(variants[0]);

  function handleRegenerate() {
    if (regenCount <= 0) return;
    const nextIndex = (variantIndex + 1) % variants.length;
    setVariantIndex(nextIndex);
    setAiNextStep(variants[nextIndex]);
    setRegenCount((n) => n - 1);
  }

  function handleSave() {
    reflectionStore.add({
      alumniId: req.alumniId,
      alumniName: req.alumniName,
      alumniRole: req.alumniRole,
      alumniCompany: req.alumniCompany,
      topic: req.topic,
      standout,
      helpful: followUpIntent ?? "",
      note,
      aiNextStep,
      savedAt: new Date(),
    });
    router.push("/home");
  }

  return (
    <div className="min-h-screen bg-background">
      <BackHeader
        backHref={`/requests/${requestId}`}
        backLabel="Back to request"
        rightContent={<Avatar variant="student" name={STUDENT.name} size="sm" />}
      />

      <main className="mx-auto max-w-[720px] px-8 pt-10 pb-24">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold leading-[1.15] text-foreground">
            How did it go?
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your reflection stays in your space.
          </p>
        </div>

        {/* Context strip */}
        <div className="mb-10 rounded-md border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar variant="alumnus" name={req.alumniName} size="md" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {req.alumniName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {req.alumniRole} · {req.alumniCompany}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-xs border border-border bg-card px-2 py-0.5 text-xs text-foreground">
                {req.topic}
              </span>
              <span className="text-xs text-muted-foreground">Today</span>
            </div>
          </div>
        </div>

        {/* Section 1 — What stood out */}
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            What stood out
          </p>
          <textarea
            className="mt-3 w-full resize-none rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:border-brand-500 focus:outline-none"
            rows={4}
            placeholder="Something clicked. Or something surprised you. Or you have more questions now than before."
            value={standout}
            onChange={(e) => setStandout(e.target.value)}
          />
        </div>

        {/* Section 2 — Follow-up intent */}
        <div className="mt-10">
          <p className="text-xs font-medium text-muted-foreground">
            Follow-up
          </p>
          <p className="mt-2 text-xl font-semibold leading-[1.2] text-foreground">
            How likely are you to reach back out to {firstName}?
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {FOLLOW_UP_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setFollowUpIntent(opt)}
                className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left text-sm leading-normal transition-colors ${
                  followUpIntent === opt
                    ? "border-brand-200 bg-brand-50 text-foreground"
                    : "border-border bg-card text-foreground hover:border-brand-500"
                }`}
              >
                <span>{opt}</span>
                {followUpIntent === opt && (
                  <Check
                    className="ml-3 h-4 w-4 shrink-0 text-brand-500"
                    strokeWidth={2}
                    aria-hidden
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Section 3 — Optional notes */}
        <div className="mt-10">
          <p className="text-xs font-medium text-muted-foreground">
            Anything else?
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Only you see this.</p>
          <textarea
            className="mt-3 w-full resize-none rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:border-brand-500 focus:outline-none"
            rows={4}
            placeholder="Add a private note&hellip;"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* AI next step — editable with regenerate */}
        <div className="mt-10">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium text-brand-500">
                Suggested next step
              </p>
              <span className="rounded-xs border border-brand-200 bg-card px-1.5 py-0.5 text-xs text-brand-500">
                AI drafted
              </span>
            </div>
            <button
              type="button"
              onClick={handleRegenerate}
              disabled={regenCount <= 0}
              className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
            >
              <RotateCw className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
              Regenerate · {regenCount} of 2 left
            </button>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            Edit anything that doesn&rsquo;t feel right.
          </p>
          <textarea
            className="w-full resize-none rounded-md border border-brand-200 bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:border-brand-500 focus:outline-none"
            rows={3}
            value={aiNextStep}
            onChange={(e) => setAiNextStep(e.target.value)}
          />
        </div>
      </main>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-border bg-card px-8 py-4">
        <div className="mx-auto flex max-w-[720px] items-center justify-end">
          <PrimaryButton
            type="button"
            onClick={handleSave}
            disabled={!followUpIntent}
          >
            Save reflection
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
