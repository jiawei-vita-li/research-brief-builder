"use client";

import { Label } from "@/components/shared/field-label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function EditableField({
  label,
  value,
  onChange,
  rows = 3,
  mono = false,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label>{label}</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={cn(
          "resize-y min-h-[2.5rem] text-sm",
          mono && "font-mono text-xs"
        )}
      />
    </div>
  );
}

export function EditableListField({
  label,
  items,
  onChange,
  rows = 4,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  rows?: number;
}) {
  const text = items.join("\n");

  return (
    <EditableField
      label={`${label} (one item per line)`}
      value={text}
      onChange={(v) =>
        onChange(
          v
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
        )
      }
      rows={rows}
    />
  );
}
