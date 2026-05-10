import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8 text-center">
      <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
        404
      </p>
      <h1 className="mb-4 font-sans text-[40px] font-semibold leading-[1.05] tracking-[-0.01em] text-oaa-ink">
        Page not found.
      </h1>
      <p className="mb-8 text-[15px] text-oaa-muted">
        The link may have moved or expired.
      </p>
      <Link
        href="/"
        className="rounded-sm bg-oaa-ink px-5 py-3 text-[14px] font-medium text-white transition-colors hover:bg-oaa-ink/90"
      >
        Go home
      </Link>
    </div>
  );
}
