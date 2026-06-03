"use client";

import { Button } from "@/components/ui/button";
import { STR } from "@/lib/i18n/strings";
import { Mail } from "lucide-react";

export function GenerateFitEmailButton({
  onClick,
  disabled,
  isLoading,
  title,
}: {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  title?: string;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      variant="secondary"
      className="gap-2"
      type="button"
      title={title}
    >
      <Mail className="size-4" />
      {isLoading ? STR.buttons.generatingFitEmail : STR.buttons.generateFitEmail}
    </Button>
  );
}
