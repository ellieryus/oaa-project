import { cn } from "@/lib/utils";

type Variant = "xl" | "l" | "m";

type Props = {
  variant: Variant;
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
};

const sizes: Record<Variant, string> = {
  xl: "text-[72px] leading-[1.05] tracking-[-0.02em]",
  l: "text-[56px] leading-[1.1] tracking-[-0.02em]",
  m: "text-[40px] leading-[1.15] tracking-[-0.01em]",
};

export function DisplayHeading({
  variant,
  as,
  children,
  className,
}: Props) {
  const Tag = as ?? (variant === "xl" ? "h1" : variant === "l" ? "h2" : "h3");
  return (
    <Tag
      className={cn(
        "font-sans font-medium text-oaa-ink",
        sizes[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
