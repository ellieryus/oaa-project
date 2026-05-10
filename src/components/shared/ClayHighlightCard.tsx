import { cn } from "@/lib/utils";

// ClayHighlightCard — surface primitive for highlighted / imminent / active-accent cards.
//
// Use when: a standalone card needs to signal urgency or accent status with a full clay border.
// Do NOT use for:
//   - Selection-within-group (radio rows, selectable cards) — those use peach-tint fill (clay-tint-bg + clay-tint-border)
//   - Primary CTAs — those use filled ink bg
//
// Caller controls all padding and internal layout via className.

type Tag = "div" | "section" | "article";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
};

export function ClayHighlightCard({ children, className, as: Tag = "div" }: Props) {
  return (
    <Tag
      className={cn(
        "rounded-md border border-[color:var(--oaa-clay)] bg-white",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
