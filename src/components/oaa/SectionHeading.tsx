interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, ctaText, className }: SectionHeadingProps) {
  return (
    <h2 className={`text-3xl tracking-tight leading-[1.2] max-w-[720px] ${className ?? ""}`}>
      <span className="font-semibold text-foreground">{title}</span>
      {ctaText && <>{" "}<span className="font-semibold text-brand-500">{ctaText}</span></>}
      {subtitle && <>{" "}<span className="font-normal text-muted-foreground">{subtitle}</span></>}
    </h2>
  );
}
