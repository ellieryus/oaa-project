"use client";

import { Switch } from "@/components/ui/switch";

type Props = {
  label: string;
  description?: string;
  defaultChecked?: boolean;
  id: string;
};

export function ToggleRow({ label, description, defaultChecked = false, id }: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-[14px] font-medium text-foreground">{label}</p>
        {description && (
          <p className="mt-0.5 text-[13px] text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch id={id} defaultChecked={defaultChecked} />
    </div>
  );
}
