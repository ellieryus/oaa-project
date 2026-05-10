"use client";

import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { InboxRequest } from "@/features/requests/types";

type Props = {
  request: InboxRequest;
  trigger: React.ReactElement;
  defaultTimeId?: string;
  onSubmit?: (timeId: string, meetingLink: string, note: string) => void;
};

export function AcceptModal({ request, trigger, defaultTimeId, onSubmit }: Props) {
  const firstTimeId = request.proposedTimes[0]?.id ?? "";
  const [selectedTime, setSelectedTime] = useState(defaultTimeId ?? firstTimeId);
  const [meetingLink, setMeetingLink] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit() {
    onSubmit?.(selectedTime, meetingLink, note);
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
          <h2 className="text-[18px] font-semibold text-oaa-ink">Accept this request</h2>
          <p className="mt-1 text-[13px] text-oaa-muted">
            Pick one of {request.student.firstName}&apos;s proposed times.
          </p>
        </div>

        <hr className="border-oaa-hairline" />

        {/* Body */}
        <div className="flex flex-col gap-5 px-6 py-5">
          {/* Time slots */}
          <div>
            <p className="mb-2 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
              Select a time
            </p>
            <RadioGroup
              value={selectedTime}
              onValueChange={setSelectedTime}
              className="gap-2"
            >
              {request.proposedTimes.map((t) => (
                <label
                  key={t.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition-colors ${
                    selectedTime === t.id
                      ? "border-oaa-clay-tint-border bg-oaa-clay-tint-bg"
                      : "border-oaa-hairline bg-white"
                  }`}
                >
                  <RadioGroupItem value={t.id} />
                  <div>
                    <p className="text-[13px] font-medium text-oaa-ink">{t.date}</p>
                    <p className="text-[12px] text-oaa-muted">
                      {t.time}
                      {t.altTz ? ` ${t.altTz}` : ""}
                    </p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Meeting link */}
          <div>
            <label className="mb-1.5 block font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
              Meeting link
            </label>
            <input
              type="url"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="https://zoom.us/j/..."
              className="w-full rounded-sm border border-oaa-hairline bg-white px-3 py-2.5 text-[14px] text-oaa-ink placeholder:text-oaa-muted/40 focus:border-oaa-ink/40 focus:outline-none"
            />
          </div>

          {/* Note */}
          <div>
            <label className="mb-1.5 block font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
              Note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Looking forward to it — feel free to share what you'd like to focus on beforehand."
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
            onClick={handleSubmit}
            className="rounded-sm bg-oaa-ink px-5 py-2.5 text-[14px] font-medium leading-none text-white transition-colors hover:bg-oaa-ink/90"
          >
            Send acceptance
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
