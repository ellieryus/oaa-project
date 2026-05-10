"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { forwardRef } from "react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-[15px] leading-none font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oaa-clay/40 disabled:opacity-50 disabled:pointer-events-none";

const primary = "bg-oaa-ink text-white hover:bg-oaa-ink/90";
const secondary =
  "bg-white border border-oaa-hairline text-oaa-ink hover:border-oaa-ink/30";
const ghost = "bg-transparent text-oaa-ink hover:bg-oaa-ink/5";

export const buttonStyles = { base, primary, secondary, ghost };

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  trailingArrow?: boolean;
};

export const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function PrimaryButton({ className, children, trailingArrow, ...props }, ref) {
    return (
      <button ref={ref} className={cn(base, primary, className)} {...props}>
        {children}
        {trailingArrow && (
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        )}
      </button>
    );
  },
);

export const SecondaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function SecondaryButton({ className, children, trailingArrow, ...props }, ref) {
    return (
      <button ref={ref} className={cn(base, secondary, className)} {...props}>
        {children}
        {trailingArrow && (
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        )}
      </button>
    );
  },
);

export const GhostButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function GhostButton({ className, children, trailingArrow, ...props }, ref) {
    return (
      <button ref={ref} className={cn(base, ghost, className)} {...props}>
        {children}
        {trailingArrow && (
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        )}
      </button>
    );
  },
);

type LinkButtonProps = ComponentProps<typeof Link> & {
  trailingArrow?: boolean;
};

export function PrimaryLink({
  className,
  children,
  trailingArrow,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={cn(base, primary, className)} {...props}>
      {children}
      {trailingArrow && (
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
      )}
    </Link>
  );
}

export function SecondaryLink({
  className,
  children,
  trailingArrow,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={cn(base, secondary, className)} {...props}>
      {children}
      {trailingArrow && (
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
      )}
    </Link>
  );
}

export function GhostLink({
  className,
  children,
  trailingArrow,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={cn(base, ghost, className)} {...props}>
      {children}
      {trailingArrow && (
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
      )}
    </Link>
  );
}
