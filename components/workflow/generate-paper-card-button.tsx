"use client";

import { Button } from "@/components/ui/button";
import { STR } from "@/lib/i18n/strings";
import { Sparkles } from "lucide-react";

export function GeneratePaperCardButton({
  onClick,
  disabled,
  isLoading,
}: {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full gap-2"
      type="button"
    >
      <Sparkles className="size-4" />
      {isLoading ? STR.buttons.generating : STR.buttons.generatePaperCard}
    </Button>
  );
}
