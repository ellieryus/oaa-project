"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    // TODO: log to error tracking (Sentry, etc.)
    console.error("[error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8 text-center">
      <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
        Something went wrong
      </p>
      <h1 className="mb-4 font-sans text-[32px] font-semibold leading-[1.1] text-oaa-ink">
        An unexpected error occurred.
      </h1>
      <p className="mb-8 text-[15px] text-oaa-muted">
        The team has been notified. Try reloading — it usually fixes it.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-sm bg-oaa-ink px-5 py-3 text-[14px] font-medium text-white transition-colors hover:bg-oaa-ink/90"
      >
        Try again
      </button>
    </div>
  );
}
