import { MIN_PAPER_TEXT_LENGTH } from "@/lib/constants";

/** Client-side PDF extraction only — import from browser components. */
export const MAX_PDF_FILE_BYTES = 15 * 1024 * 1024;

export type PdfExtractErrorCode =
  | "NOT_PDF"
  | "TOO_LARGE"
  | "TOO_LITTLE_TEXT"
  | "PASSWORD_PROTECTED"
  | "WORKER_SETUP"
  | "EXTRACTION_FAILED";

export class PdfExtractError extends Error {
  readonly code: PdfExtractErrorCode;

  constructor(message: string, code: PdfExtractErrorCode) {
    super(message);
    this.name = "PdfExtractError";
    this.code = code;
  }
}

export interface PdfExtractResult {
  text: string;
  pageCount: number;
  charCount: number;
  wordCount: number;
}

let workerConfigured = false;

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function isPdfFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return file.type === "application/pdf" || name.endsWith(".pdf");
}

export function validatePdfFile(file: File): void {
  if (!isPdfFile(file)) {
    throw new PdfExtractError(
      "Only PDF files are supported. Please select a .pdf file.",
      "NOT_PDF"
    );
  }
  if (file.size > MAX_PDF_FILE_BYTES) {
    throw new PdfExtractError(
      `File is too large. Maximum size is ${Math.round(MAX_PDF_FILE_BYTES / (1024 * 1024))}MB.`,
      "TOO_LARGE"
    );
  }
  if (file.size === 0) {
    throw new PdfExtractError("The selected file is empty.", "EXTRACTION_FAILED");
  }
}

async function configurePdfWorker(pdfjs: typeof import("pdfjs-dist")): Promise<void> {
  if (workerConfigured) return;
  if (typeof window === "undefined") {
    throw new PdfExtractError(
      "PDF extraction is only available in the browser.",
      "WORKER_SETUP"
    );
  }

  const version = pdfjs.version ?? "4.10.38";
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
  workerConfigured = true;
}

function mapPdfJsError(err: unknown): PdfExtractError {
  const message = err instanceof Error ? err.message : String(err);
  const lower = message.toLowerCase();

  if (
    lower.includes("password") ||
    lower.includes("encrypted") ||
    lower.includes("need password")
  ) {
    return new PdfExtractError(
      "This PDF appears encrypted or password-protected. Paste text manually instead.",
      "PASSWORD_PROTECTED"
    );
  }

  if (lower.includes("worker") || lower.includes("globalworkeroptions")) {
    return new PdfExtractError(
      "PDF.js worker failed to load. Check your network or try again.",
      "WORKER_SETUP"
    );
  }

  return new PdfExtractError(
    message || "Could not extract text from this PDF.",
    "EXTRACTION_FAILED"
  );
}

/**
 * Read a PDF from an ArrayBuffer and return page-separated plain text.
 */
export async function extractPdfTextFromArrayBuffer(
  arrayBuffer: ArrayBuffer
): Promise<PdfExtractResult> {
  try {
    const pdfjs = await import("pdfjs-dist");
    await configurePdfWorker(pdfjs);

    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    const pageTexts: string[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const lines = content.items
        .map((item) => ("str" in item && typeof item.str === "string" ? item.str : ""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      pageTexts.push(`--- Page ${pageNum} ---\n${lines}`);
    }

    const text = pageTexts.join("\n\n").trim();
    const charCount = text.length;
    const wordCount = countWords(text);

    if (charCount < MIN_PAPER_TEXT_LENGTH) {
      throw new PdfExtractError(
        `Extracted text is too short (${charCount} characters). The PDF may be scanned images, encrypted, or unreadable. Paste text manually or try another file.`,
        "TOO_LITTLE_TEXT"
      );
    }

    return {
      text,
      pageCount: pdf.numPages,
      charCount,
      wordCount,
    };
  } catch (err) {
    if (err instanceof PdfExtractError) throw err;
    throw mapPdfJsError(err);
  }
}

export async function extractPdfTextFromFile(file: File): Promise<PdfExtractResult> {
  validatePdfFile(file);
  const arrayBuffer = await file.arrayBuffer();
  return extractPdfTextFromArrayBuffer(arrayBuffer);
}
