"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const REASONS = [
  { id: "spam", label: "Spam or fake profile" },
  { id: "inappropriate", label: "Inappropriate content" },
  { id: "harassment", label: "Harassment or misconduct" },
  { id: "misleading", label: "Misleading information" },
  { id: "other", label: "Other" },
];

type Props = {
  alumniName: string;
  trigger: React.ReactElement;
};

export function ReportModal({ alumniName, trigger }: Props) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleSubmit() {
    if (!selectedId) return;
    router.push("/report/sent");
  }

  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent
        showCloseButton={false}
        className="max-w-[480px] gap-0 overflow-hidden rounded-md p-0"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pb-4 pt-6">
          <div>
            <h2 className="text-[18px] font-semibold text-foreground">
              Report this profile
            </h2>
            <p className="mt-1 text-[13px] text-muted-foreground">{alumniName}</p>
          </div>
          <DialogClose className="rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground">
            <X className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          </DialogClose>
        </div>

        <hr className="border-border" />

        {/* Body */}
        <div className="px-6 py-5">
          <p className="mb-3 text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
            Reason
          </p>
          <div className="space-y-2">
            {REASONS.map((reason) => {
              const isSelected = selectedId === reason.id;
              return (
                <button
                  key={reason.id}
                  type="button"
                  onClick={() => setSelectedId(reason.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left text-[14px] text-foreground transition-colors",
                    isSelected
                      ? "border-2 border-foreground"
                      : "border border-border hover:border-brand-500",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                      isSelected ? "border-2 border-foreground" : "border border-border",
                    )}
                  >
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-brand-500" />
                    )}
                  </span>
                  {reason.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 pb-6">
          <DialogClose className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">
            Cancel
          </DialogClose>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedId}
            className="rounded-md bg-brand-500 px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-brand-600 disabled:opacity-40"
          >
            Submit report
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
