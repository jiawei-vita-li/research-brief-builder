import { z } from "zod";
import type { PaperCard } from "@/lib/types";

const UNKNOWN = "unknown";

/** Normalize metadata fields: empty or missing → "unknown". */
export function normalizeMetadataField(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || trimmed.toLowerCase() === UNKNOWN) {
    return UNKNOWN;
  }
  return trimmed;
}

/** LLM output shape (no id). */
export const paperCardLlmSchema = z.object({
  title: z.string(),
  authors: z.string(),
  year: z.string(),
  venue: z.string(),
  problem: z.string(),
  motivation: z.string(),
  method: z.string(),
  pipeline: z.string(),
  key_contributions: z.array(z.string()),
  limitations: z.string(),
  useful_for_my_research: z.string(),
  evidence_quotes: z.array(z.string()),
});

export type PaperCardLlmOutput = z.infer<typeof paperCardLlmSchema>;

function normalizeStringList(items: string[]): string[] {
  return items.map((s) => s.trim()).filter(Boolean);
}

function normalizeEvidenceQuotes(quotes: string[]): string[] {
  return quotes.map((q) => q.trim()).filter(Boolean);
}

/** Apply metadata and list normalization after Zod parse. */
export function normalizePaperCardLlmOutput(
  raw: PaperCardLlmOutput
): PaperCardLlmOutput {
  return {
    title: normalizeMetadataField(raw.title),
    authors: normalizeMetadataField(raw.authors),
    year: normalizeMetadataField(raw.year),
    venue: normalizeMetadataField(raw.venue),
    problem: raw.problem.trim(),
    motivation: raw.motivation.trim(),
    method: raw.method.trim(),
    pipeline: raw.pipeline.trim(),
    key_contributions: normalizeStringList(raw.key_contributions),
    limitations: raw.limitations.trim(),
    useful_for_my_research: raw.useful_for_my_research.trim(),
    evidence_quotes: normalizeEvidenceQuotes(raw.evidence_quotes),
  };
}

export function toPaperCard(id: string, data: PaperCardLlmOutput): PaperCard {
  const normalized = normalizePaperCardLlmOutput(data);
  return { id, ...normalized };
}
