"use client";

import { EmptyState } from "@/components/shared/empty-state";
import { ErrorBanner } from "@/components/shared/error-banner";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import { PaperCardsPanel } from "@/components/artifacts/paper-card-view";
import { ResearchMapView } from "@/components/artifacts/research-map-view";
import { FitAnalysisView } from "@/components/artifacts/fit-analysis-view";
import { OutreachEmailView } from "@/components/artifacts/outreach-email-view";
import { GenerateFitEmailButton } from "@/components/workflow/generate-fit-email-button";
import { SynthesizeResearchMapButton } from "@/components/workflow/synthesize-research-map-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { STR } from "@/lib/i18n/strings";
import { SINGLE_CARD_QUALITY_WARNING } from "@/lib/llm/research-map-prompt";
import type { GroundingResult } from "@/lib/grounding/verify-quotes";
import type {
  FitAnalysis,
  OutreachEmailDraft,
  PaperCard,
  ResearchMap,
  ViewStatus,
  WorkspaceTabId,
} from "@/lib/types";

export function WorkspaceTabs({
  activeTab,
  onTabChange,
  viewStatus,
  paperCards,
  researchMap,
  fitAnalysis,
  outreachEmail,
  onChangeCard,
  groundingByCardId,
  sourcePaperText,
  onEvidenceQuotesChange,
  onChangeMap,
  onChangeFit,
  onChangeEmail,
  errorMessage,
  researchMapError,
  researchMapQualityWarning,
  isGeneratingPaperCard,
  isSimulating,
  isSynthesizingMap,
  isGeneratingFitEmail,
  onSynthesizeResearchMap,
  onGenerateFitEmail,
  canGenerateFitEmail,
  fitEmailDisabledReason,
  fitEmailWarnings,
  fitEmailError,
}: {
  activeTab: WorkspaceTabId;
  onTabChange: (tab: WorkspaceTabId) => void;
  viewStatus: ViewStatus;
  errorMessage?: string;
  researchMapError?: string;
  researchMapQualityWarning?: string;
  isGeneratingPaperCard?: boolean;
  isSimulating?: boolean;
  isSynthesizingMap?: boolean;
  isGeneratingFitEmail?: boolean;
  onSynthesizeResearchMap?: () => void;
  onGenerateFitEmail?: () => void;
  canGenerateFitEmail?: boolean;
  fitEmailDisabledReason?: string;
  fitEmailWarnings?: string[];
  fitEmailError?: string;
  paperCards: PaperCard[];
  researchMap: ResearchMap | null;
  fitAnalysis: FitAnalysis | null;
  outreachEmail: OutreachEmailDraft | null;
  onChangeCard: (id: string, card: PaperCard) => void;
  groundingByCardId?: Record<string, GroundingResult[]>;
  sourcePaperText?: string;
  onEvidenceQuotesChange?: (id: string, quotes: string[]) => void;
  onChangeMap: (map: ResearchMap) => void;
  onChangeFit: (fit: FitAnalysis) => void;
  onChangeEmail: (email: OutreachEmailDraft) => void;
}) {
  const isTabLoading = (tab: WorkspaceTabId) => {
    if (viewStatus === "loading" && isSimulating) return true;
    if (isGeneratingPaperCard && tab === "paper-cards") return true;
    if (isSynthesizingMap && tab === "research-map") return true;
    if (
      isGeneratingFitEmail &&
      (tab === "fit-analysis" || tab === "outreach-email")
    ) {
      return true;
    }
    return false;
  };

  const isFitEmailTab = (tab: WorkspaceTabId) =>
    tab === "fit-analysis" || tab === "outreach-email";

  const renderBody = (
    tab: WorkspaceTabId,
    emptyTitle: string,
    emptyDesc: string,
    ready: React.ReactNode,
    hasArtifact: boolean,
    tabError?: string
  ) => {
    if (isTabLoading(tab)) {
      return <LoadingSkeleton lines={tab === "paper-cards" ? 8 : 6} />;
    }
    if (tabError) {
      return <ErrorBanner message={tabError} />;
    }
    if (viewStatus === "error" && tab !== "research-map" && !isFitEmailTab(tab)) {
      return (
        <ErrorBanner
          message={
            errorMessage ?? STR.workspace.tabErrorGeneric
          }
        />
      );
    }
    if (viewStatus === "empty" || (viewStatus === "ready" && !hasArtifact)) {
      return <EmptyState title={emptyTitle} description={emptyDesc} />;
    }
    return ready;
  };

  const singleCardHint =
    paperCards.length === 1 ? SINGLE_CARD_QUALITY_WARNING : undefined;

  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => onTabChange(v as WorkspaceTabId)}
      className="flex flex-1 flex-col min-h-0"
    >
      <TabsList className="mx-4 mt-4 w-auto justify-start lg:mx-6">
        <TabsTrigger value="paper-cards">{STR.tabs.paperCards}</TabsTrigger>
        <TabsTrigger value="research-map">{STR.tabs.researchMap}</TabsTrigger>
        <TabsTrigger value="fit-analysis">{STR.tabs.fitAnalysis}</TabsTrigger>
        <TabsTrigger value="outreach-email">{STR.tabs.outreachEmail}</TabsTrigger>
      </TabsList>

      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <TabsContent value="paper-cards" className="mt-0">
          {renderBody(
            "paper-cards",
            STR.empty.noPaperCards,
            STR.empty.noPaperCardsDesc,
            <PaperCardsPanel
              cards={paperCards}
              onChangeCard={onChangeCard}
              groundingByCardId={groundingByCardId}
              sourcePaperText={sourcePaperText}
              onEvidenceQuotesChange={onEvidenceQuotesChange}
            />,
            paperCards.length > 0
          )}
        </TabsContent>

        <TabsContent value="research-map" className="mt-0 space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              {onSynthesizeResearchMap ? (
                <SynthesizeResearchMapButton
                  onClick={onSynthesizeResearchMap}
                  disabled={isSimulating || isGeneratingPaperCard}
                  isLoading={isSynthesizingMap}
                  paperCardCount={paperCards.length}
                />
              ) : null}
              {singleCardHint ? (
                <p className="text-[11px] text-amber-700 dark:text-amber-400">
                  {singleCardHint}
                </p>
              ) : null}
            </div>
            <p className="text-[11px] text-muted-foreground max-w-md">
              {STR.workspace.mapHint}
            </p>
          </div>

          {renderBody(
            "research-map",
            STR.empty.noResearchMap,
            STR.empty.noResearchMapDesc,
            researchMap ? (
              <ResearchMapView
                map={researchMap}
                onChange={onChangeMap}
                qualityWarning={researchMapQualityWarning}
              />
            ) : null,
            researchMap !== null,
            researchMapError
          )}
        </TabsContent>

        <TabsContent value="fit-analysis" className="mt-0 space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              {onGenerateFitEmail ? (
                <GenerateFitEmailButton
                  onClick={onGenerateFitEmail}
                  disabled={
                    isSimulating ||
                    isGeneratingPaperCard ||
                    isSynthesizingMap ||
                    !canGenerateFitEmail
                  }
                  isLoading={isGeneratingFitEmail}
                  title={fitEmailDisabledReason}
                />
              ) : null}
              {fitEmailDisabledReason && !canGenerateFitEmail ? (
                <p className="text-[11px] text-muted-foreground max-w-xs">
                  {fitEmailDisabledReason}
                </p>
              ) : null}
              {fitEmailWarnings?.map((w) => (
                <p key={w} className="text-[11px] text-amber-700 dark:text-amber-400">
                  {w}
                </p>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground max-w-md">
              {STR.workspace.fitHint}
            </p>
          </div>

          {renderBody(
            "fit-analysis",
            STR.empty.noFit,
            STR.empty.noFitDesc,
            fitAnalysis ? (
              <FitAnalysisView analysis={fitAnalysis} onChange={onChangeFit} />
            ) : null,
            fitAnalysis !== null,
            fitEmailError
          )}
        </TabsContent>

        <TabsContent value="outreach-email" className="mt-0">
          {renderBody(
            "outreach-email",
            STR.empty.noEmail,
            STR.empty.noEmailDesc,
            outreachEmail ? (
              <OutreachEmailView email={outreachEmail} onChange={onChangeEmail} />
            ) : null,
            outreachEmail !== null,
            fitEmailError
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
}
