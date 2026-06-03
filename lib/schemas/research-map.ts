import { z } from "zod";
import type { ResearchMap } from "@/lib/types";

const confidenceSchema = z.enum(["high", "medium", "low"]);

export const researchThemeSchema = z.object({
  theme: z.string(),
  description: z.string(),
  supporting_papers: z.array(z.string()),
  confidence: confidenceSchema,
});

export const recurringMethodSchema = z.object({
  method: z.string(),
  description: z.string(),
  supporting_papers: z.array(z.string()),
});

export const representativePaperSchema = z.object({
  title: z.string(),
  why_representative: z.string(),
});

export const suggestedReadingSchema = z.object({
  title: z.string(),
  reason: z.string(),
});

export const researchMapLlmSchema = z.object({
  main_research_themes: z.array(researchThemeSchema),
  recurring_methods: z.array(recurringMethodSchema),
  representative_papers: z.array(representativePaperSchema),
  evolution_over_time: z.array(z.string()),
  open_questions: z.array(z.string()),
  possible_RA_entry_points: z.array(z.string()),
  risks_or_gaps: z.array(z.string()),
  suggested_reading_order: z.array(suggestedReadingSchema),
});

export type ResearchMapLlmOutput = z.infer<typeof researchMapLlmSchema>;

function trimStrings(items: string[]): string[] {
  return items.map((s) => s.trim()).filter(Boolean);
}

function normalizeThemes(
  themes: ResearchMapLlmOutput["main_research_themes"]
): ResearchMapLlmOutput["main_research_themes"] {
  return themes.map((t) => ({
    theme: t.theme.trim(),
    description: t.description.trim(),
    supporting_papers: trimStrings(t.supporting_papers),
    confidence: t.confidence,
  }));
}

function normalizeMethods(
  methods: ResearchMapLlmOutput["recurring_methods"]
): ResearchMapLlmOutput["recurring_methods"] {
  return methods.map((m) => ({
    method: m.method.trim(),
    description: m.description.trim(),
    supporting_papers: trimStrings(m.supporting_papers),
  }));
}

export function normalizeResearchMapLlmOutput(
  raw: ResearchMapLlmOutput
): ResearchMap {
  return {
    main_research_themes: normalizeThemes(raw.main_research_themes),
    recurring_methods: normalizeMethods(raw.recurring_methods),
    representative_papers: raw.representative_papers.map((p) => ({
      title: p.title.trim(),
      why_representative: p.why_representative.trim(),
    })),
    evolution_over_time: trimStrings(raw.evolution_over_time),
    open_questions: trimStrings(raw.open_questions),
    possible_RA_entry_points: trimStrings(raw.possible_RA_entry_points),
    risks_or_gaps: trimStrings(raw.risks_or_gaps),
    suggested_reading_order: raw.suggested_reading_order.map((r) => ({
      title: r.title.trim(),
      reason: r.reason.trim(),
    })),
  };
}
