"use client";

import { PdfUploadBox } from "@/components/layout/pdf-upload-box";
import { Label } from "@/components/shared/field-label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GeneratePaperCardButton } from "@/components/workflow/generate-paper-card-button";
import type { PdfExtractResult } from "@/lib/pdf/extract-pdf-text";
import { STR } from "@/lib/i18n/strings";
import { BACKGROUND_SHORT_UI_HINT } from "@/lib/llm/fit-email-prompt";
import { MIN_USER_BACKGROUND_LENGTH } from "@/lib/constants";

export function InputPanel({
  paperText,
  userBackground,
  onPaperTextChange,
  onUserBackgroundChange,
  onPdfExtracted,
  onGeneratePaperCard,
  canGeneratePaperCard,
  isGeneratingPaperCard,
  disabled,
}: {
  paperText: string;
  userBackground: string;
  onPaperTextChange: (v: string) => void;
  onUserBackgroundChange: (v: string) => void;
  onPdfExtracted?: (result: PdfExtractResult, file: File) => void;
  onGeneratePaperCard: () => void;
  canGeneratePaperCard: boolean;
  isGeneratingPaperCard?: boolean;
  disabled?: boolean;
}) {
  return (
    <aside className="flex h-full flex-col border-r bg-muted/20">
      <div className="border-b px-4 py-3">
        <h2 className="text-sm font-semibold">{STR.inputs.heading}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{STR.inputs.subheading}</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          <PdfUploadBox
            onExtractedText={onPaperTextChange}
            onExtractionComplete={onPdfExtracted}
            disabled={disabled || isGeneratingPaperCard}
          />

          <div className="space-y-2">
            <Label>{STR.inputs.pastePaper}</Label>
            <p className="text-[11px] text-muted-foreground">{STR.inputs.pasteHint}</p>
            <Textarea
              placeholder={STR.inputs.pastePlaceholder}
              value={paperText}
              onChange={(e) => onPaperTextChange(e.target.value)}
              rows={8}
              disabled={disabled || isGeneratingPaperCard}
              className="text-sm resize-y min-h-[120px]"
            />
            <GeneratePaperCardButton
              onClick={onGeneratePaperCard}
              disabled={!canGeneratePaperCard || disabled}
              isLoading={isGeneratingPaperCard}
            />
            <p className="text-[11px] text-muted-foreground">{STR.inputs.groundingHint}</p>
          </div>

          <div className="space-y-2">
            <Label>{STR.inputs.yourBackground}</Label>
            <Textarea
              value={userBackground}
              onChange={(e) => onUserBackgroundChange(e.target.value)}
              rows={10}
              disabled={disabled}
              className="text-sm resize-y"
            />
            {userBackground.trim().length > 0 &&
            userBackground.trim().length < MIN_USER_BACKGROUND_LENGTH ? (
              <p className="text-[11px] text-amber-700 dark:text-amber-400">
                {BACKGROUND_SHORT_UI_HINT}
              </p>
            ) : null}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
