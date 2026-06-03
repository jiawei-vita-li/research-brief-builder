"use client";

import { ErrorBanner } from "@/components/shared/error-banner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ViewStatus, WorkflowStepId } from "@/lib/types";
import { STR } from "@/lib/i18n/strings";
import { WORKFLOW_STEPS } from "@/lib/types";
import { Copy, Download, RotateCcw } from "lucide-react";

export function StatusPanel({
  currentStep,
  viewStatus,
  progressPercent,
  statusMessage,
  onExportClick,
  onCopyMarkdown,
  canExportMarkdown,
  exportDisabledReason,
  onResetEmpty,
  onDemoError,
  onClearError,
  simulateDisabled,
}: {
  currentStep: WorkflowStepId;
  viewStatus: ViewStatus;
  progressPercent: number;
  statusMessage: string;
  onExportClick: () => void;
  onCopyMarkdown?: () => void;
  canExportMarkdown?: boolean;
  exportDisabledReason?: string;
  onResetEmpty: () => void;
  onDemoError: () => void;
  onClearError: () => void;
  simulateDisabled?: boolean;
}) {
  const stepMeta = WORKFLOW_STEPS.find((s) => s.id === currentStep)!;

  const statusBadge =
    viewStatus === "loading"
      ? STR.status.loading
      : viewStatus === "error"
        ? STR.status.error
        : viewStatus === "ready"
          ? STR.status.ready
          : STR.status.empty;

  return (
    <aside className="flex h-full flex-col border-l bg-muted/20">
      <div className="border-b px-4 py-3">
        <h2 className="text-sm font-semibold">{STR.status.heading}</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{statusBadge}</Badge>
            <Badge variant="outline">{stepMeta.label}</Badge>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">{STR.status.workflowProgress}</p>
            <Progress value={progressPercent} className="h-2" />
            <p className="text-xs text-muted-foreground">{Math.round(progressPercent)}%</p>
          </div>

          <div className="rounded-md border bg-card p-3 text-sm">
            <p className="font-medium text-xs uppercase tracking-wide text-muted-foreground mb-1">
              {STR.status.currentStep}
            </p>
            <p className="font-medium">{stepMeta.label}</p>
            <p className="text-muted-foreground text-xs mt-2">{stepMeta.description}</p>
            {statusMessage ? (
              <p className="mt-3 text-xs border-t pt-2 text-muted-foreground">{statusMessage}</p>
            ) : null}
          </div>

          {viewStatus === "error" ? (
            <ErrorBanner message={STR.status.mockPipelineError} />
          ) : null}

          <Separator />

          <div className="flex flex-col gap-2">
            <Button
              className="w-full gap-2"
              variant="secondary"
              onClick={onExportClick}
              disabled={!canExportMarkdown || simulateDisabled}
              title={exportDisabledReason}
              type="button"
            >
              <Download className="size-4" />
              {STR.buttons.exportMarkdown}
            </Button>
            {onCopyMarkdown ? (
              <Button
                className="w-full gap-2"
                variant="outline"
                onClick={onCopyMarkdown}
                disabled={!canExportMarkdown || simulateDisabled}
                title={exportDisabledReason}
                type="button"
              >
                <Copy className="size-4" />
                {STR.buttons.copyClipboard}
              </Button>
            ) : null}
          </div>
          <p className="text-[11px] text-muted-foreground text-center">
            {canExportMarkdown
              ? STR.status.exportHint
              : exportDisabledReason ?? STR.status.exportNeedArtifact}
          </p>

          <Separator />

          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {STR.status.demoControls}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onResetEmpty}
            disabled={simulateDisabled}
            type="button"
          >
            <RotateCcw className="size-3.5 mr-2" />
            {STR.buttons.resetEmpty}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onDemoError}
            disabled={simulateDisabled || viewStatus === "loading"}
            type="button"
          >
            {STR.buttons.previewError}
          </Button>
          {viewStatus === "error" ? (
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={onClearError}
              type="button"
            >
              {STR.buttons.clearError}
            </Button>
          ) : null}
        </div>
      </ScrollArea>
    </aside>
  );
}
