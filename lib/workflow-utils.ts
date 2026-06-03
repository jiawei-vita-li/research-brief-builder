import type { WorkflowStepId } from "./types";
import { WORKFLOW_STEPS } from "./types";

export function stepIndex(id: WorkflowStepId): number {
  return WORKFLOW_STEPS.findIndex((s) => s.id === id);
}

export function randomDelayMs(min = 500, max = 800): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function workflowProgressPercent(
  currentStep: WorkflowStepId,
  isLoading: boolean
): number {
  const idx = stepIndex(currentStep);
  const base = ((idx + 1) / WORKFLOW_STEPS.length) * 100;
  return isLoading ? Math.max(base - 8, 8) : base;
}
