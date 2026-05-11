import { cn } from "@/lib/utils";

type Variant = "xl" | "l" | "m";

type Props = {
  variant: Variant;
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
};

const sizes: Record<Variant, string> = {
  xl: "text-5xl",
  l:  "text-4xl",
  m:  "text-2xl",
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
        "font-semibold tracking-tight text-foreground",
        sizes[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
