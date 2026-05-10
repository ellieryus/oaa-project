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
    <div className="rounded-md border border-oaa-hairline bg-white px-8 py-10 text-center">
      {eyebrow && (
        <p className="mb-3 font-mono text-[11px] tracking-[0.08em] uppercase text-oaa-muted">
          {eyebrow}
        </p>
      )}
      <p className="mb-2 text-[16px] font-semibold text-oaa-ink">{heading}</p>
      {subtitle && (
        <p className="mb-6 text-[14px] text-oaa-muted">{subtitle}</p>
      )}
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="inline-flex items-center rounded-sm bg-oaa-ink px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-oaa-ink/90"
        >
          {ctaLabel}
        </Link>
      )}
      {ctaLabel && onCtaClick && !ctaHref && (
        <button
          type="button"
          onClick={onCtaClick}
          className="inline-flex items-center rounded-sm bg-oaa-ink px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-oaa-ink/90"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
