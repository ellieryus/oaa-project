import { cn } from "@/lib/utils";

// Avatar variant rule (role-based, not perspective-based):
//
// "student"      — every student avatar, everywhere in the app.
//                  Peach: clay-tint bg + clay text.
//                  Maya in student nav, any student card shown to an alumnus (Section 05+).
//
// "alumnus"      — every alumnus avatar in cards, rows, listings, hero sections.
//                  Warm light grey bg (--oaa-avatar-alumnus-bg) + ink dark text.
//                  Adam/Lena/Kwame in /home cards, /matches, /alumni/[id] hero, etc.
//
// "alumnus-self" — sole exception. Only the alumnus's own avatar in their top-right nav
//                  and their own profile body. Pitch black bg (--oaa-ink) + white text.
//                  Currently: /profile/alumnus. Future Section 05 alumnus screens.
//
// No default variant — every call site must specify explicitly.
type Variant = "student" | "alumnus" | "alumnus-self";
type Size = "sm" | "md" | "lg";

type Props = {
  variant: Variant;
  name: string;
  size?: Size;
  className?: string;
};

const sizes: Record<Size, string> = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-10 w-10 text-[12px]",
  lg: "h-14 w-14 text-[14px]",
};

const variantStyles: Record<Variant, string> = {
  student:        "bg-brand-50 text-brand-500",
  alumnus:        "bg-neutral-100 text-foreground",
  "alumnus-self": "bg-foreground text-white",
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function Avatar({ variant, name, size = "md", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full tracking-[0.04em]",
        variantStyles[variant],
        sizes[size],
        className,
      )}
      aria-label={name}
      title={name}
    >
      {initials(name)}
    </span>
  );
}
