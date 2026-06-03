"use client";

import { cn } from "@/lib/utils";
import type { WorkflowStepId } from "@/lib/types";
import { WORKFLOW_STEPS } from "@/lib/types";
import { stepIndex } from "@/lib/workflow-utils";
import { Check } from "lucide-react";

export function WorkflowStepper({
  currentStep,
  completedThrough,
  onStepClick,
  disabled,
}: {
  currentStep: WorkflowStepId;
  completedThrough: number;
  onStepClick: (id: WorkflowStepId) => void;
  disabled?: boolean;
}) {
  const currentIdx = stepIndex(currentStep);

  return (
    <nav
      aria-label="Workflow steps"
      className="flex flex-wrap items-center gap-1 border-b bg-card/30 px-4 py-3 lg:px-6"
    >
      {WORKFLOW_STEPS.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isDone = idx < completedThrough || (idx < currentIdx && !disabled);

        return (
          <div key={step.id} className="flex items-center">
            <button
              type="button"
              disabled={disabled}
              onClick={() => onStepClick(step.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                "hover:bg-muted disabled:opacity-50 disabled:pointer-events-none",
                isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
                !isActive && isDone && "text-foreground",
                !isActive && !isDone && "text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full border text-[10px]",
                  isActive && "border-primary-foreground/40 bg-primary-foreground/10",
                  isDone && !isActive && "bg-muted border-transparent",
                  !isDone && !isActive && "border-muted-foreground/30"
                )}
              >
                {isDone && !isActive ? (
                  <Check className="size-3" />
                ) : (
                  idx + 1
                )}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </button>
            {idx < WORKFLOW_STEPS.length - 1 ? (
              <span className="mx-1 text-muted-foreground/40 hidden md:inline">→</span>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
