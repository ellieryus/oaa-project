import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8 text-center">
      <h1 className="mb-4 text-4xl font-semibold leading-[1.05] text-foreground">
        Page not found.
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        The link may have moved or expired.
      </p>
      <Link
        href="/"
        className="rounded-md bg-brand-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
      >
        Go home
      </Link>
    </div>
  );
}
