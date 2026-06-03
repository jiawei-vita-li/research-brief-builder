"use client";

import { Button } from "@/components/ui/button";
import { STR } from "@/lib/i18n/strings";
import { Play } from "lucide-react";

export function SimulateWorkflowButton({
  onClick,
  disabled,
  isRunning,
}: {
  onClick: () => void;
  disabled?: boolean;
  isRunning?: boolean;
}) {
  return (
    <Button onClick={onClick} disabled={disabled || isRunning} className="gap-2">
      <Play className="size-4" />
      {isRunning ? STR.buttons.simulateRunning : STR.buttons.simulate}
    </Button>
  );
}
