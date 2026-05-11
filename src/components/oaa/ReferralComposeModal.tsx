"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { Avatar } from "@/components/oaa/Avatar";
import { GhostButton } from "@/components/oaa/buttons";
import { AIButton } from "@/components/oaa/AIButton";
import { ADAM_DM_TO_MAYA } from "@/lib/mock-video";

type Student = {
  id: string;
  name: string;
  program: string;
  cohort: string;
};

type Props = {
  open: boolean;
  student: Student | null;
  onClose: () => void;
  onConfirm: () => void;
};

export function ReferralComposeModal({ open, student, onClose, onConfirm }: Props) {
  const [body, setBody] = useState(ADAM_DM_TO_MAYA.body);

  if (!open || !student) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-md border border-border bg-card shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <h2 className="text-xl font-semibold text-foreground">
            Reach out to {student.name.split(" ")[0]}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Context strip */}
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <Avatar variant="student" name={student.name} size="md" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                {student.name}
                <span className="ml-1.5 font-normal text-muted-foreground">
                  · {student.cohort}
                </span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Last talked {ADAM_DM_TO_MAYA.context.lastTalked} · marked refer now
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <label className="text-xs font-medium text-muted-foreground">
            Message
          </label>
          <textarea
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-2 w-full resize-none rounded-md border border-border bg-card px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus-visible:border-brand-500 focus:outline-none"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            This will be sent as a direct message via OAA.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
          <GhostButton type="button" onClick={onClose}>
            Cancel
          </GhostButton>
          <AIButton type="button" onClick={onConfirm} disabled={!body.trim()}>
            Send referral →
          </AIButton>
        </div>
      </div>
    </div>
  );
}
