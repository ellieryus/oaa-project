"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { Avatar } from "@/components/oaa/Avatar";
import { PrimaryButton, GhostButton } from "@/components/oaa/buttons";
import { MAYA_GAP_CLOSURE, ADAM_VIDEO } from "@/lib/mock-video";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  priorityLabel: string;
};

export function GapClosureModal({ open, onClose, onConfirm, priorityLabel }: Props) {
  const [projectUrl, setProjectUrl] = useState(MAYA_GAP_CLOSURE.projectUrl);
  const [writeup, setWriteup] = useState(MAYA_GAP_CLOSURE.writeup);
  const [shareWithAdam, setShareWithAdam] = useState(true);
  const [message, setMessage] = useState(MAYA_GAP_CLOSURE.messageToAlumnus);

  if (!open) return null;

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
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Mark gap as closed
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {priorityLabel}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6">
          {/* Project link */}
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Project link
            </label>
            <input
              type="text"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-card px-4 py-2.5 text-sm text-foreground focus-visible:border-brand-500 focus:outline-none"
            />
          </div>

          {/* Write-up */}
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Write-up
            </label>
            <textarea
              rows={4}
              value={writeup}
              onChange={(e) => setWriteup(e.target.value)}
              className="mt-2 w-full resize-none rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:border-brand-500 focus:outline-none"
            />
          </div>

          {/* Share toggle */}
          <div className="rounded-md border border-border bg-card p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={shareWithAdam}
                onChange={(e) => setShareWithAdam(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-brand-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Avatar variant="alumnus" name={ADAM_VIDEO.name} size="sm" />
                  <span className="text-sm font-medium text-foreground">
                    Share with {ADAM_VIDEO.name}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {ADAM_VIDEO.role} · {ADAM_VIDEO.company} · {ADAM_VIDEO.cohort}
                </p>
              </div>
            </label>
          </div>

          {/* Message to alumnus */}
          {shareWithAdam && (
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Message to {ADAM_VIDEO.name.split(" ")[0]}
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 w-full resize-none rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:border-brand-500 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
          <GhostButton type="button" onClick={onClose}>
            Cancel
          </GhostButton>
          <PrimaryButton
            type="button"
            tone="clay"
            onClick={onConfirm}
            disabled={!projectUrl.trim() || !writeup.trim()}
          >
            Mark closed and send →
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
