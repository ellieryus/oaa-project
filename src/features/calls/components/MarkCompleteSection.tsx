"use client";

import { useRouter } from "next/navigation";

import { PrimaryButton } from "@/components/shared/buttons";

type Props = {
  requestId: string;
  alumniName: string;
};

export function MarkCompleteSection({ requestId, alumniName }: Props) {
  const router = useRouter();
  const firstName = alumniName.split(" ")[0];

  return (
    <div className="rounded-md border border-oaa-hairline bg-white px-8 py-6">
      <p className="mb-2 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-clay">
        After your call
      </p>
      <h2 className="mb-1 text-[20px] font-semibold text-oaa-ink">
        How did it go with {firstName}?
      </h2>
      <p className="mb-5 text-[14px] text-oaa-muted">
        Mark this call as complete to save a reflection and close the loop.
      </p>
      <PrimaryButton
        type="button"
        onClick={() => router.push(`/reflect/${requestId}`)}
      >
        Mark call as complete
      </PrimaryButton>
    </div>
  );
}
