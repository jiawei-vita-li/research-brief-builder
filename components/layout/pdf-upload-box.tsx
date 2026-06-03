"use client";

import { useRef, useState } from "react";
import { Label } from "@/components/shared/field-label";
import { ErrorBanner } from "@/components/shared/error-banner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MAX_PAPER_TEXT_LENGTH } from "@/lib/constants";
import { STR } from "@/lib/i18n/strings";
import {
  extractPdfTextFromFile,
  formatFileSize,
  PdfExtractError,
  type PdfExtractResult,
} from "@/lib/pdf/extract-pdf-text";
import { FileText, Loader2, Upload } from "lucide-react";

export type PdfExtractionStatus = "idle" | "extracting" | "extracted" | "failed";

export interface PdfUploadState {
  status: PdfExtractionStatus;
  fileName?: string;
  fileSizeBytes?: number;
  pageCount?: number;
  charCount?: number;
  wordCount?: number;
  error?: string;
}

function statusLabel(status: PdfExtractionStatus): string {
  switch (status) {
    case "idle":
      return STR.pdf.statusIdle;
    case "extracting":
      return STR.pdf.statusExtracting;
    case "extracted":
      return STR.pdf.statusExtracted;
    case "failed":
      return STR.pdf.statusFailed;
  }
}

export function PdfUploadBox({
  onExtractedText,
  onExtractionComplete,
  disabled,
}: {
  onExtractedText: (text: string) => void;
  onExtractionComplete?: (result: PdfExtractResult, file: File) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<PdfUploadState>({ status: "idle" });

  const handleFile = async (file: File | null) => {
    if (!file || disabled) return;

    setState({
      status: "extracting",
      fileName: file.name,
      fileSizeBytes: file.size,
      error: undefined,
    });

    try {
      const result = await extractPdfTextFromFile(file);
      const truncated = result.text.length > MAX_PAPER_TEXT_LENGTH;
      const text = truncated
        ? result.text.slice(0, MAX_PAPER_TEXT_LENGTH)
        : result.text;

      onExtractedText(text);
      onExtractionComplete?.(
        {
          ...result,
          text,
          charCount: text.length,
          wordCount: countWords(text),
        },
        file
      );

      setState({
        status: "extracted",
        fileName: file.name,
        fileSizeBytes: file.size,
        pageCount: result.pageCount,
        charCount: text.length,
        wordCount: countWords(text),
        error: truncated
          ? STR.pdf.truncated(MAX_PAPER_TEXT_LENGTH.toLocaleString())
          : undefined,
      });
    } catch (err) {
      const message =
        err instanceof PdfExtractError
          ? err.message
          : err instanceof Error
            ? err.message
            : STR.pdf.extractFailed;

      setState({
        status: "failed",
        fileName: file.name,
        fileSizeBytes: file.size,
        error: message,
      });
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    void handleFile(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      <Label>{STR.inputs.uploadPdf}</Label>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        disabled={disabled || state.status === "extracting"}
        onChange={onInputChange}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full justify-start gap-2"
        disabled={disabled || state.status === "extracting"}
        onClick={() => inputRef.current?.click()}
      >
        {state.status === "extracting" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Upload className="size-4" />
        )}
        {state.status === "extracting" ? STR.pdf.extracting : STR.pdf.chooseFile}
      </Button>

      <p className="text-[11px] text-muted-foreground leading-relaxed">
        {STR.pdf.disclaimer}
      </p>

      {state.fileName ? (
        <div className="rounded-md border bg-card p-2.5 text-xs space-y-1.5">
          <div className="flex items-start gap-2">
            <FileText className="size-3.5 mt-0.5 text-muted-foreground shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium truncate">{state.fileName}</p>
              {state.fileSizeBytes !== undefined ? (
                <p className="text-muted-foreground">
                  {formatFileSize(state.fileSizeBytes)}
                </p>
              ) : null}
            </div>
            <Badge variant="secondary" className="font-normal shrink-0">
              {statusLabel(state.status)}
            </Badge>
          </div>

          {state.status === "extracted" &&
          state.pageCount !== undefined &&
          state.charCount !== undefined &&
          state.wordCount !== undefined ? (
            <dl className="grid grid-cols-3 gap-2 pt-1 border-t text-muted-foreground">
              <div>
                <dt className="text-[10px] uppercase tracking-wide">{STR.pdf.pages}</dt>
                <dd className="font-medium text-foreground">{state.pageCount}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wide">{STR.pdf.chars}</dt>
                <dd className="font-medium text-foreground">{state.charCount}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wide">{STR.pdf.words}</dt>
                <dd className="font-medium text-foreground">{state.wordCount}</dd>
              </div>
            </dl>
          ) : null}
        </div>
      ) : null}

      {state.status === "extracted" && state.error ? (
        <p className="text-[11px] text-amber-700 dark:text-amber-400">{state.error}</p>
      ) : null}

      {state.status === "failed" && state.error ? (
        <ErrorBanner title={STR.pdf.extractionFailedTitle} message={state.error} />
      ) : null}
    </div>
  );
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}
