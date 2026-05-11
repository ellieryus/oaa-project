"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
  defaultOpenId?: string;
};

export function FaqAccordion({ items, defaultOpenId }: Props) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="rounded-md border border-border bg-card">
      {items.map((item, i) => {
        const isOpen = openId === item.id;
        const isLast = i === items.length - 1;

        return (
          <div
            key={item.id}
            className={cn(!isLast && "border-b border-border")}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-[15px] font-medium text-foreground">
                {item.question}
              </span>
              <ChevronRight
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150",
                  isOpen && "rotate-90",
                )}
                strokeWidth={1.5}
                aria-hidden
              />
            </button>

            {isOpen && (
              <div className="px-6 pb-5">
                <p className="text-[14px] leading-[1.6] text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
