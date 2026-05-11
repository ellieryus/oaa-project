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
      <h1 className="mb-4 text-3xl font-semibold leading-[1.1] text-foreground">
        An unexpected error occurred.
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        The team has been notified. Try reloading — it usually fixes it.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-brand-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
      >
        Try again
      </button>
    </div>
  );
}
