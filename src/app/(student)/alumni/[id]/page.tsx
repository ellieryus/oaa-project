import Link from "next/link";

import { StudentNav } from "@/components/oaa/StudentNav";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <StudentNav />
      <main className="mx-auto max-w-[1200px] px-8 py-24">
        <h1 className="text-2xl font-semibold text-foreground">
          Alumnus profile
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Profile page for <code className="rounded bg-foreground/5 px-1.5 py-0.5">{id}</code> is coming soon.
        </p>
        <Link
          href={`/ask/${id}`}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-600"
        >
          Continue to ask composer →
        </Link>
        <Link
          href="/matches"
          className="mt-6 ml-3 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-foreground/70 transition-colors hover:bg-foreground/5"
        >
          ← Back to matches
        </Link>
      </main>
    </>
  );
}
