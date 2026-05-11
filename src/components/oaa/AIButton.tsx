"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { forwardRef } from "react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] leading-none font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 disabled:opacity-50 disabled:pointer-events-none bg-brand-500 text-white hover:bg-brand-600";

type AIButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AIButton = forwardRef<HTMLButtonElement, AIButtonProps>(
  function AIButton({ className, children, ...props }, ref) {
    return (
      <button ref={ref} className={cn(base, className)} {...props}>
        <Sparkles className="h-4 w-4" strokeWidth={2} aria-hidden />
        {children}
      </button>
    );
  },
);

type AILinkProps = ComponentProps<typeof Link>;

export function AILink({ className, children, ...props }: AILinkProps) {
  return (
    <Link className={cn(base, className)} {...props}>
      <Sparkles className="h-4 w-4" strokeWidth={2} aria-hidden />
      {children}
    </Link>
  );
}
