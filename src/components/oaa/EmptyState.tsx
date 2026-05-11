import Link from "next/link";

type Props = {
  eyebrow?: string;
  heading: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
};

export function EmptyState({
  eyebrow,
  heading,
  subtitle,
  ctaLabel,
  ctaHref,
  onCtaClick,
}: Props) {
  return (
    <div className="rounded-md border border-border bg-card px-8 py-10 text-center">
      {eyebrow && (
        <p className="mb-3 text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <p className="mb-2 text-[16px] font-semibold text-foreground">{heading}</p>
      {subtitle && (
        <p className="mb-6 text-[14px] text-muted-foreground">{subtitle}</p>
      )}
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="inline-flex items-center rounded-md bg-brand-500 px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-brand-600"
        >
          {ctaLabel}
        </Link>
      )}
      {ctaLabel && onCtaClick && !ctaHref && (
        <button
          type="button"
          onClick={onCtaClick}
          className="inline-flex items-center rounded-md bg-brand-500 px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-brand-600"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
