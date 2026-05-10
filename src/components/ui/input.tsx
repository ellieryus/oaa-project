import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, type, ...props }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "h-11 w-full rounded-sm border border-oaa-hairline bg-white px-3 text-[14px] leading-[1.5] text-oaa-ink",
          "placeholder:text-oaa-muted",
          "transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oaa-clay/40 focus-visible:border-oaa-clay/60",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-[#A14A35] aria-invalid:ring-2 aria-invalid:ring-[#A14A35]/20",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
