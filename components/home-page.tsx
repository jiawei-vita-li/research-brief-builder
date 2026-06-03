"use client";

import { useCallback, useMemo, useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { InputPanel } from "@/components/layout/input-panel";
import { StatusPanel } from "@/components/layout/status-panel";
import { SimulateWorkflowButton } from "@/components/workflow/simulate-workflow-button";
import { WorkflowStepper } from "@/components/workflow/workflow-stepper";
import { WorkspaceTabs } from "@/components/workflow/workspace-tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generatePaperCard } from "@/lib/api/generate-paper-card";
import {
  canGenerateFitEmail,
  fitEmailUiWarnings,
  generateFitEmail,
} from "@/lib/api/generate-fit-email";
import { synthesizeResearchMap } from "@/lib/api/synthesize-research-map";
import { SINGLE_CARD_QUALITY_WARNING } from "@/lib/llm/research-map-prompt";
import { MIN_PAPER_TEXT_LENGTH } from "@/lib/constants";
import {
  groundingSummaryStats,
  verifyEvidenceQuotes,
  type GroundingResult,
} from "@/lib/grounding/verify-quotes";
import { DEFAULT_USER_BACKGROUND, getMockArtifacts } from "@/lib/mock-data";
import type {
  PaperCard,
  ViewStatus,
  WorkflowArtifacts,
  WorkflowStepId,
  WorkspaceTabId,
} from "@/lib/types";
import { STEP_MESSAGES, STR } from "@/lib/i18n/strings";
import { STEP_TAB_MAP, WORKFLOW_STEPS } from "@/lib/types";
import { delay, randomDelayMs, stepIndex, workflowProgressPercent } from "@/lib/workflow-utils";
import { Info } from "lucide-react";
import type { PdfExtractResult } from "@/lib/pdf/extract-pdf-text";
import { hasExportableArtifacts } from "@/lib/export/has-artifacts";
import {
  downloadMarkdown,
  getResearchBriefFilename,
} from "@/lib/export/download-markdown";
import { copyMarkdownToClipboard } from "@/lib/export/copy-markdown";
import { buildResearchBriefMarkdown } from "@/lib/export/markdown";

const EMPTY_ARTIFACTS: WorkflowArtifacts = {
  paperCards: [],
  researchMap: null,
  fitAnalysis: null,
  outreachEmail: null,
};

export function HomePage() {
  const [paperText, setPaperText] = useState("");
  const [userBackground, setUserBackground] = useState(DEFAULT_USER_BACKGROUND);
  const [currentStep, setCurrentStep] = useState<WorkflowStepId>("upload");
  const [activeTab, setActiveTab] = useState<WorkspaceTabId>("paper-cards");
  const [viewStatus, setViewStatus] = useState<ViewStatus>("empty");
  const [artifacts, setArtifacts] = useState<WorkflowArtifacts>(EMPTY_ARTIFACTS);
  const [completedThrough, setCompletedThrough] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [isSynthesizingMap, setIsSynthesizingMap] = useState(false);
  const [isGeneratingFitEmail, setIsGeneratingFitEmail] = useState(false);
  const [fitEmailError, setFitEmailError] = useState<string | undefined>();
  const [statusMessage, setStatusMessage] = useState("");
  const [forcedError, setForcedError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | undefined>();
  const [researchMapError, setResearchMapError] = useState<string | undefined>();
  const [researchMapQualityWarning, setResearchMapQualityWarning] = useState<
    string | undefined
  >();
  const [groundingByCardId, setGroundingByCardId] = useState<
    Record<string, GroundingResult[]>
  >({});

  const canGeneratePaperCard = useMemo(
    () => paperText.trim().length >= MIN_PAPER_TEXT_LENGTH,
    [paperText]
  );

  const fitEmailCheck = useMemo(
    () =>
      canGenerateFitEmail(
        artifacts.paperCards,
        artifacts.researchMap,
        userBackground
      ),
    [artifacts.paperCards, artifacts.researchMap, userBackground]
  );

  const fitEmailWarnings = useMemo(() => {
    const warnings = fitEmailUiWarnings(
      artifacts.paperCards.length,
      userBackground
    );
    if (researchMapQualityWarning) {
      warnings.push(researchMapQualityWarning);
    }
    return [...new Set(warnings)];
  }, [
    artifacts.paperCards.length,
    userBackground,
    researchMapQualityWarning,
  ]);

  const effectiveStatus: ViewStatus = forcedError
    ? "error"
    : isSimulating || isGeneratingCard
      ? "loading"
      : viewStatus;

  const progressPercent = workflowProgressPercent(
    currentStep,
    effectiveStatus === "loading"
  );

  const resetEmpty = useCallback(() => {
    setArtifacts(EMPTY_ARTIFACTS);
    setViewStatus("empty");
    setCurrentStep("upload");
    setActiveTab("paper-cards");
    setCompletedThrough(0);
    setStatusMessage("");
    setForcedError(false);
    setApiErrorMessage(undefined);
    setGroundingByCardId({});
    setResearchMapError(undefined);
    setResearchMapQualityWarning(undefined);
    setIsSimulating(false);
    setIsGeneratingCard(false);
    setFitEmailError(undefined);
    setIsSynthesizingMap(false);
    setIsGeneratingFitEmail(false);
  }, []);

  const handleStepClick = (id: WorkflowStepId) => {
    if (isSimulating || isGeneratingCard || isSynthesizingMap || isGeneratingFitEmail)
      return;
    setCurrentStep(id);
    setStatusMessage(STEP_MESSAGES[id]);
    const tab = STEP_TAB_MAP[id];
    if (tab) setActiveTab(tab);
  };

  const simulateWorkflow = async () => {
    setIsSimulating(true);
    setForcedError(false);
    setApiErrorMessage(undefined);
    setViewStatus("loading");
    setArtifacts(EMPTY_ARTIFACTS);
    setGroundingByCardId({});
    setResearchMapError(undefined);
    setResearchMapQualityWarning(undefined);
    setCompletedThrough(0);

    for (let i = 0; i < WORKFLOW_STEPS.length; i++) {
      const step = WORKFLOW_STEPS[i].id;
      setCurrentStep(step);
      setStatusMessage(STEP_MESSAGES[step]);
      const tab = STEP_TAB_MAP[step];
      if (tab) setActiveTab(tab);
      await delay(randomDelayMs(500, 800));
      setCompletedThrough(i + 1);
    }

    const mock = getMockArtifacts();
    setArtifacts(mock);
    setViewStatus("ready");
    setStatusMessage(STR.messages.workflowComplete);
    setActiveTab("paper-cards");
    setIsSimulating(false);
  };

  const handleGeneratePaperCard = async () => {
    setForcedError(false);
    setApiErrorMessage(undefined);
    setIsGeneratingCard(true);
    setCurrentStep("analyze");
    setActiveTab("paper-cards");
    setStatusMessage(STR.messages.callingLlm);
    setCompletedThrough(Math.max(completedThrough, stepIndex("analyze") + 1));

    const result = await generatePaperCard(
      paperText,
      userBackground.trim() || undefined
    );

    setIsGeneratingCard(false);

    if (!result.ok) {
      setViewStatus("error");
      setApiErrorMessage(result.error);
      setStatusMessage(result.error);
      return;
    }

    const { verified, total, hasUnverified } = groundingSummaryStats(
      result.groundingResults
    );
    const groundingNote =
      total > 0
        ? STR.messages.groundingVerified(verified, total, hasUnverified)
        : STR.messages.noQuotesReturned;

    setArtifacts((prev) => ({
      ...prev,
      paperCards: [result.paperCard, ...prev.paperCards.slice(1)],
    }));
    setGroundingByCardId((prev) => ({
      ...prev,
      [result.paperCard.id]: result.groundingResults,
    }));
    setViewStatus("ready");
    setStatusMessage(STR.messages.paperCardGenerated(groundingNote));
  };

  const handleChangeCard = (id: string, card: PaperCard) => {
    setArtifacts((prev) => ({
      ...prev,
      paperCards: prev.paperCards.map((c) => (c.id === id ? card : c)),
    }));
  };

  const handleEvidenceQuotesChange = (id: string, quotes: string[]) => {
    setArtifacts((prev) => ({
      ...prev,
      paperCards: prev.paperCards.map((c) =>
        c.id === id ? { ...c, evidence_quotes: quotes } : c
      ),
    }));

    setGroundingByCardId((prev) => {
      if (prev[id] === undefined) return prev;
      return {
        ...prev,
        [id]: verifyEvidenceQuotes(paperText.trim(), quotes),
      };
    });
  };

  const handleSynthesizeResearchMap = async () => {
    if (artifacts.paperCards.length < 1) return;

    setResearchMapError(undefined);
    setForcedError(false);
    setIsSynthesizingMap(true);
    setCurrentStep("synthesize");
    setActiveTab("research-map");
    setStatusMessage(STR.messages.synthesizingMap);
    setCompletedThrough(Math.max(completedThrough, stepIndex("synthesize") + 1));

    const result = await synthesizeResearchMap(
      artifacts.paperCards,
      userBackground.trim() || undefined
    );

    setIsSynthesizingMap(false);

    if (!result.ok) {
      setResearchMapError(result.error);
      setStatusMessage(result.error);
      return;
    }

    const warning =
      result.qualityWarning ??
      (artifacts.paperCards.length === 1 ? SINGLE_CARD_QUALITY_WARNING : undefined);

    setArtifacts((prev) => ({ ...prev, researchMap: result.researchMap }));
    setResearchMapQualityWarning(warning);
    setViewStatus("ready");
    setStatusMessage(STR.messages.mapReady);
  };

  const handleGenerateFitEmail = async () => {
    if (!artifacts.researchMap || !fitEmailCheck.allowed) return;

    setFitEmailError(undefined);
    setForcedError(false);
    setIsGeneratingFitEmail(true);
    setCurrentStep("draft");
    setActiveTab("fit-analysis");
    setStatusMessage(STR.messages.generatingFit);
    setCompletedThrough(Math.max(completedThrough, stepIndex("draft") + 1));

    const result = await generateFitEmail(
      artifacts.paperCards,
      artifacts.researchMap,
      userBackground
    );

    setIsGeneratingFitEmail(false);

    if (!result.ok) {
      setFitEmailError(result.error);
      setStatusMessage(result.error);
      return;
    }

    setArtifacts((prev) => ({
      ...prev,
      fitAnalysis: result.fitAnalysis,
      outreachEmail: result.outreachEmailDraft,
    }));
    setViewStatus("ready");
    setStatusMessage(STR.messages.fitReady);
  };

  const handlePdfExtracted = (result: PdfExtractResult, file: File) => {
    setCurrentStep("upload");
    setForcedError(false);
    setApiErrorMessage(undefined);
    setStatusMessage(
      STR.messages.pdfExtracted(
        result.pageCount,
        file.name,
        result.charCount.toLocaleString()
      )
    );
  };

  const canExportMarkdown = useMemo(
    () => hasExportableArtifacts(artifacts),
    [artifacts]
  );

  const exportDisabledReason = canExportMarkdown
    ? undefined
    : STR.export.needArtifact;

  const buildExportMarkdownContent = useCallback(() => {
    return buildResearchBriefMarkdown({
      paperCards: artifacts.paperCards,
      groundingResults: groundingByCardId,
      researchMap: artifacts.researchMap,
      fitAnalysis: artifacts.fitAnalysis,
      outreachEmailDraft: artifacts.outreachEmail,
      userBackground: userBackground.trim() || undefined,
      generatedAt: new Date(),
    });
  }, [artifacts, groundingByCardId, userBackground]);

  const handleExportClick = () => {
    if (!canExportMarkdown) return;

    const markdown = buildExportMarkdownContent();
    const filename = getResearchBriefFilename();
    downloadMarkdown(filename, markdown);

    setCurrentStep("export");
    setStatusMessage(STR.export.exported(filename));
  };

  const handleCopyMarkdown = async () => {
    if (!canExportMarkdown) return;

    try {
      await copyMarkdownToClipboard(buildExportMarkdownContent());
      setCurrentStep("export");
      setStatusMessage(STR.export.copied);
    } catch {
      setStatusMessage(STR.export.copyFailed);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-wrap items-center justify-between gap-4 border-b px-4 py-3 lg:px-6 bg-muted/10">
        <SimulateWorkflowButton
          onClick={simulateWorkflow}
          disabled={
            forcedError ||
            isGeneratingCard ||
            isSynthesizingMap ||
            isGeneratingFitEmail
          }
          isRunning={isSimulating}
        />
        <Alert className="py-2 flex-1 min-w-[240px] max-w-2xl hidden md:flex border-dashed">
          <Info className="size-4" />
          <AlertTitle className="text-xs font-medium">{STR.toolbar.phase6Title}</AlertTitle>
          <AlertDescription className="text-xs">{STR.toolbar.phase6Desc}</AlertDescription>
        </Alert>
      </div>

      <WorkflowStepper
        currentStep={currentStep}
        completedThrough={completedThrough}
        onStepClick={handleStepClick}
        disabled={
          isSimulating ||
          isGeneratingCard ||
          isSynthesizingMap ||
          isGeneratingFitEmail
        }
      />

      <div className="grid min-h-0 flex-1 lg:grid-cols-[280px_1fr_260px]">
        <InputPanel
          paperText={paperText}
          userBackground={userBackground}
          onPaperTextChange={setPaperText}
          onUserBackgroundChange={setUserBackground}
          onPdfExtracted={handlePdfExtracted}
          onGeneratePaperCard={handleGeneratePaperCard}
          canGeneratePaperCard={canGeneratePaperCard}
          isGeneratingPaperCard={isGeneratingCard}
          disabled={isSimulating}
        />

        <main className="flex min-h-0 flex-col min-w-0 bg-background">
          <WorkspaceTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            viewStatus={effectiveStatus}
            isGeneratingPaperCard={isGeneratingCard}
            isSynthesizingMap={isSynthesizingMap}
            isGeneratingFitEmail={isGeneratingFitEmail}
            isSimulating={isSimulating}
            errorMessage={apiErrorMessage}
            researchMapError={researchMapError}
            researchMapQualityWarning={researchMapQualityWarning}
            fitEmailError={fitEmailError}
            fitEmailWarnings={fitEmailWarnings}
            canGenerateFitEmail={fitEmailCheck.allowed}
            fitEmailDisabledReason={fitEmailCheck.reason}
            onSynthesizeResearchMap={handleSynthesizeResearchMap}
            onGenerateFitEmail={handleGenerateFitEmail}
            paperCards={artifacts.paperCards}
            researchMap={artifacts.researchMap}
            fitAnalysis={artifacts.fitAnalysis}
            outreachEmail={artifacts.outreachEmail}
            onChangeCard={handleChangeCard}
            groundingByCardId={groundingByCardId}
            sourcePaperText={paperText.trim()}
            onEvidenceQuotesChange={handleEvidenceQuotesChange}
            onChangeMap={(researchMap) => setArtifacts((p) => ({ ...p, researchMap }))}
            onChangeFit={(fitAnalysis) => setArtifacts((p) => ({ ...p, fitAnalysis }))}
            onChangeEmail={(outreachEmail) => setArtifacts((p) => ({ ...p, outreachEmail }))}
          />
        </main>

        <StatusPanel
          currentStep={currentStep}
          viewStatus={effectiveStatus}
          progressPercent={progressPercent}
          statusMessage={statusMessage}
          onExportClick={handleExportClick}
          onCopyMarkdown={handleCopyMarkdown}
          canExportMarkdown={canExportMarkdown}
          exportDisabledReason={exportDisabledReason}
          onResetEmpty={resetEmpty}
          onDemoError={() => {
            setForcedError(true);
            setApiErrorMessage(STR.messages.demoError);
            setStatusMessage(STR.messages.demoError);
          }}
          onClearError={() => {
            setForcedError(false);
            setApiErrorMessage(undefined);
            setViewStatus(
              artifacts.paperCards.length > 0 ||
                artifacts.researchMap ||
                artifacts.fitAnalysis ||
                artifacts.outreachEmail
                ? "ready"
                : "empty"
            );
            setStatusMessage(
              artifacts.paperCards.length > 0
                ? STR.messages.paperCardReady
                : ""
            );
          }}
          simulateDisabled={
            isSimulating ||
            isGeneratingCard ||
            isSynthesizingMap ||
            isGeneratingFitEmail
          }
        />
      </div>
    </div>
  );
}
