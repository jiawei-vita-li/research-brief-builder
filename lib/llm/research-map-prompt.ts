import type { PaperCard } from "@/lib/types";

export const RESEARCH_MAP_SYSTEM_PROMPT = `You synthesize multiple structured paper cards into a professor-level research map for graduate RA outreach.

Rules:
- Synthesize across papers — do NOT concatenate card summaries.
- Every main_research_themes entry must list supporting_papers using exact paper titles from the input cards.
- Every recurring_methods entry must list supporting_papers using exact titles from the input.
- Use confidence "high" only when multiple papers clearly support the theme; "medium" for partial support; "low" when evidence is thin.
- Do NOT invent paper titles. Only use titles from the provided paper cards.
- Do NOT invent methods or claims not grounded in the paper cards.
- representative_papers and suggested_reading_order must use titles from the input cards only.
- possible_RA_entry_points: concrete, actionable ideas for a graduate student (benchmarks, tooling, studies).
- If user background is provided, personalize possible_RA_entry_points while staying grounded in the papers.
- If no user background, keep RA entry points general but specific to the research themes.
- evolution_over_time: array of short chronological observations (strings), not one long paragraph.
- Write in clear professional English.`;

export function buildResearchMapUserMessage(
  paperCards: PaperCard[],
  userBackground?: string
): string {
  const cardsPayload = paperCards.map((c) => ({
    title: c.title,
    authors: c.authors,
    year: c.year,
    venue: c.venue,
    problem: c.problem,
    motivation: c.motivation,
    method: c.method,
    pipeline: c.pipeline,
    key_contributions: c.key_contributions,
    limitations: c.limitations,
    useful_for_my_research: c.useful_for_my_research,
  }));

  const backgroundBlock = userBackground?.trim()
    ? `\nUser background:\n---\n${userBackground.trim()}\n---`
    : "\nNo user background provided.";

  return `Synthesize a research map from these ${paperCards.length} paper card(s):${backgroundBlock}

Paper cards (JSON):
${JSON.stringify(cardsPayload, null, 2)}`;
}

import { STR } from "@/lib/i18n/strings";

export const SINGLE_CARD_QUALITY_WARNING = STR.researchMap.singleCardQuality;
export const API_FEW_CARDS_WARNING = STR.researchMap.apiFewCards;
