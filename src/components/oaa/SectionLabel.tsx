import { cn } from "@/lib/utils";

type Props = {
  number?: string;
  label: string;
  className?: string;
};

export function SectionLabel({ number, label, className }: Props) {
  return (
    <div
      className={cn(
        "text-[11px] leading-[1.4] tracking-[0.08em] uppercase text-muted-foreground",
        className,
      )}
    >
      {number ? `${number} · ${label}` : label}
    </div>
  );
}
