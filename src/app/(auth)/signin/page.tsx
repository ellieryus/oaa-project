"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { DisplayHeading } from "@/components/oaa/DisplayHeading";
import { Header } from "@/components/oaa/Header";
import { GhostLink, PrimaryButton } from "@/components/oaa/buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ALLOWED_DOMAINS = ["mail.mcgill.ca", "mcgill.ca"];

function isValidMcGillEmail(value: string): boolean {
  const trimmed = value.trim().toLowerCase();
  const match = trimmed.match(/^[^\s@]+@([^\s@]+)$/);
  if (!match) return false;
  return ALLOWED_DOMAINS.includes(match[1]);
}

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const valid = isValidMcGillEmail(email);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valid) return;
    router.push(`/signin/sent?email=${encodeURIComponent(email.trim())}`);
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-8 pb-32">
        <div className="pt-8">
        <GhostLink href="/role-select" className="px-3 py-2 text-sm">
          ← Back
        </GhostLink>
      </div>

      <div className="mx-auto mt-16 max-w-[560px]">
        <header className="flex flex-col gap-6">
          <DisplayHeading variant="l">Enter your McGill email.</DisplayHeading>
          <p className="text-lg leading-normal text-muted-foreground">
            We’ll send you a link. No passwords.
          </p>
        </header>

        <form className="mt-12 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <Label htmlFor="email" className="sr-only">
            McGill email
          </Label>
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@mail.mcgill.ca"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 rounded-md border-border px-4 text-base"
          />

          <div className="flex flex-wrap items-center gap-2">
            <DomainChip>@mail.mcgill.ca</DomainChip>
            <DomainChip>@mcgill.ca</DomainChip>
            <span className="text-sm leading-normal text-muted-foreground">only</span>
          </div>

          <PrimaryButton
            type="submit"
            disabled={!valid}
            className="mt-4 h-14 px-6 text-sm"
          >
            Send me a link
          </PrimaryButton>
        </form>

        <hr className="mt-16 border-t border-border" />
        <p className="mt-6 text-center text-sm leading-normal text-muted-foreground">
          Trouble with your email?{" "}
          <a
            href="mailto:hello@oaa.example"
            className="underline underline-offset-2 text-foreground"
          >
            Contact us
          </a>
          .
        </p>
      </div>
    </main>
    </>
  );
}

function DomainChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-xs border border-border bg-card px-2 py-1 text-xs tracking-[0.04em] text-foreground">
      {children}
    </span>
  );
}
