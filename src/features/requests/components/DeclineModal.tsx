"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const REASONS = [
  {
    id: "scope",
    label: "Outside my scope",
    draft:
      "Appreciate you reaching out. This topic isn't something I cover well — I'd point you toward an alumnus who specializes there. Happy to help with career pivots or analytics storytelling instead.",
  },
  {
    id: "timing",
    label: "Timing doesn't work",
    draft:
      "Appreciate you reaching out. The proposed times don't fit my schedule right now. If you can suggest a couple of alternatives, I'd be glad to revisit.",
  },
  {
    id: "capacity",
    label: "At capacity right now",
    draft:
      "Appreciate you reaching out. I'm at capacity this week and can't take on new calls. Check back in a couple of weeks — I'd love to help when things open up.",
  },
  {
    id: "other",
    label: "Other",
    draft: "",
  },
] as const;

type ReasonId = (typeof REASONS)[number]["id"];

type Props = {
  studentFirstName: string;
  trigger: React.ReactElement;
  onSubmit?: (reason: ReasonId, note: string) => void;
};

export function DeclineModal({ studentFirstName, trigger, onSubmit }: Props) {
  const [reason, setReason] = useState<ReasonId>("scope");
  const [note, setNote] = useState<string>(REASONS[0].draft);

  function handleReasonChange(id: string) {
    const matched = REASONS.find((r) => r.id === id);
    if (!matched) return;
    setReason(matched.id);
    setNote(matched.draft);
  }

  function handleRegenerate() {
    const matched = REASONS.find((r) => r.id === reason);
    if (matched && matched.draft) {
      // Mock regeneration: trim trailing period, append a small variation
      setNote(matched.draft.replace(/\.$/, "") + " — just let me know how else I can help.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent
        showCloseButton={false}
        className="max-w-[480px] gap-0 overflow-hidden rounded-lg p-0"
      >
        {/* Header */}
        <div className="px-6 pb-4 pt-6">
          <h2 className="text-[18px] font-semibold text-oaa-ink">Decline this request</h2>
          <p className="mt-1 text-[13px] text-oaa-muted">
            {studentFirstName} will see your reason. Keep it brief and kind.
          </p>
        </div>

        <hr className="border-oaa-hairline" />

        {/* Body */}
        <div className="flex flex-col gap-5 px-6 py-5">
          {/* Reason radios */}
          <div>
            <p className="mb-2 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
              Reason
            </p>
            <RadioGroup value={reason} onValueChange={handleReasonChange} className="gap-2">
              {REASONS.map((r) => (
                <label
                  key={r.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition-colors ${
                    reason === r.id
                      ? "border-oaa-clay-tint-border bg-oaa-clay-tint-bg"
                      : "border-oaa-hairline bg-white"
                  }`}
                >
                  <RadioGroupItem value={r.id} />
                  <span className="text-[14px] text-oaa-ink">{r.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* AI-drafted note */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
                Note to {studentFirstName}
              </label>
              <button
                type="button"
                onClick={handleRegenerate}
                className="flex items-center gap-1 text-[11px] text-oaa-muted transition-colors hover:text-oaa-ink"
              >
                <RotateCw className="h-3 w-3" strokeWidth={1.5} aria-hidden />
                Regenerate
              </button>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-sm border border-oaa-hairline bg-white px-3 py-2.5 text-[14px] text-oaa-ink placeholder:text-oaa-muted/40 focus:border-oaa-ink/40 focus:outline-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 pb-6">
          <DialogClose className="text-[13px] text-oaa-muted transition-colors hover:text-oaa-ink">
            Cancel
          </DialogClose>
          <button
            type="button"
            onClick={() => onSubmit?.(reason, note)}
            className="rounded-sm bg-oaa-ink px-5 py-2.5 text-[14px] font-medium leading-none text-white transition-colors hover:bg-oaa-ink/90"
          >
            Send decline
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
