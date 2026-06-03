"use client";

import { Button } from "@/components/ui/button";
import { STR } from "@/lib/i18n/strings";
import { Map } from "lucide-react";

export function SynthesizeResearchMapButton({
  onClick,
  disabled,
  isLoading,
  paperCardCount,
}: {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  paperCardCount: number;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading || paperCardCount < 1}
      variant="secondary"
      className="gap-2"
      type="button"
    >
      <Map className="size-4" />
      {isLoading ? STR.buttons.synthesizingMap : STR.buttons.synthesizeMap}
    </Button>
  );
}
