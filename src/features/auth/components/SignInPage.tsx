"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { DisplayHeading } from "@/components/shared/DisplayHeading";
import { Header } from "@/components/layout/Header";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GhostLink, PrimaryButton } from "@/components/shared/buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ALLOWED_DOMAINS = ["mail.mcgill.ca", "mcgill.ca"];

function isValidMcGillEmail(value: string): boolean {
  const trimmed = value.trim().toLowerCase();
  const match = trimmed.match(/^[^\s@]+@([^\s@]+)$/);
  if (!match) return false;
  return ALLOWED_DOMAINS.includes(match[1]);
}

export function SignInPage() {
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
        <GhostLink href="/role-select" className="px-3 py-2 text-[14px]">
          ← Back
        </GhostLink>
      </div>

      <div className="mx-auto mt-16 max-w-[560px]">
        <header className="flex flex-col gap-6">
          <SectionLabel number="02" label="Sign in" />
          <DisplayHeading variant="l">Enter your McGill email.</DisplayHeading>
          <p className="text-[18px] leading-[1.5] text-oaa-muted">
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
            className="h-14 rounded-sm border-oaa-hairline px-4 text-[16px]"
          />

          <div className="flex flex-wrap items-center gap-2">
            <DomainChip>@mail.mcgill.ca</DomainChip>
            <DomainChip>@mcgill.ca</DomainChip>
            <span className="text-[13px] leading-[1.45] text-oaa-muted">only</span>
          </div>

          <PrimaryButton
            type="submit"
            disabled={!valid}
            className="mt-4 h-14 px-6 text-[15px]"
          >
            Send me a link
          </PrimaryButton>
        </form>

        <hr className="mt-16 border-t border-oaa-hairline" />
        <p className="mt-6 text-center text-[13px] leading-[1.45] text-oaa-muted">
          Trouble with your email?{" "}
          <a
            href="mailto:hello@oaa.example"
            className="underline underline-offset-2 text-oaa-ink"
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
    <span className="inline-flex items-center rounded-xs border border-oaa-hairline bg-white px-2 py-1 font-mono text-[11px] tracking-[0.04em] text-oaa-ink">
      {children}
    </span>
  );
}

export default SignInPage;
