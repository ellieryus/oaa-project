import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DisplayHeading } from "@/components/oaa/DisplayHeading";
import { Header } from "@/components/oaa/Header";
import { SelectableCard } from "@/components/oaa/SelectableCard";
import { GhostLink } from "@/components/oaa/buttons";

const tracks = [
  {
    key: "student",
    title: "I’m a student.",
    description:
      "Find alumni who’ve made the move you’re trying to make. Send scoped asks. Stop drafting messages you never send.",
    bullets: [
      "Curated matches over endless search",
      "AI-drafted asks scoped to alumni offerings",
      "Reflection that builds on each call",
    ],
    cta: "Continue as student",
  },
  {
    key: "alumnus",
    title: "I’m an alumnus.",
    description:
      "Set what you help with and when you’re available. Receive asks that are already on-topic. Decline as redirect, not rejection.",
    bullets: [
      "Declare offerings and non-offerings up front",
      "Inbox of scoped, on-topic requests only",
      "Recontact with students worth keeping in touch",
    ],
    cta: "Continue as alumnus",
  },
] as const;

export default function RoleSelectPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-8 pb-32">
        <div className="pt-8">
        <GhostLink href="/" className="px-3 py-2 text-sm">
          ← Back to landing
        </GhostLink>
      </div>

      <header className="mt-16 flex flex-col gap-6">
        <DisplayHeading variant="l">What brings you here?</DisplayHeading>
        <p className="max-w-[720px] text-lg leading-normal text-muted-foreground">
          Pick one to set up your space. We’ll use this to tailor everything
          that comes next.
        </p>
      </header>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {tracks.map((t) => (
          <Link
            key={t.key}
            href={
              t.key === "alumnus" ? "/onboarding/alumnus/background" : "/signin"
            }
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 rounded-md"
          >
            <SelectableCard
              as="div"
              title={t.title}
              className="h-full p-8 hover:border-brand-500"
            >
              <p className="mt-3 text-sm leading-normal text-muted-foreground">
                {t.description}
              </p>
              <ul className="mt-6 flex flex-col gap-2">
                {t.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-sm leading-normal text-foreground"
                  >
                    <span aria-hidden className="text-muted-foreground">
                      —
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-foreground">
                {t.cta}
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
              </div>
            </SelectableCard>
          </Link>
        ))}
      </div>

      <p className="mt-12 text-sm leading-normal text-muted-foreground">
        Both? Pick the one you’ll use first,{" "}
        <Link href="/signin" className="underline underline-offset-2 text-foreground">
          you can add the other later
        </Link>
        .
      </p>
    </main>
    </>
  );
}
