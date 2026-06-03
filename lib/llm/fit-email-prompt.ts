import { STR } from "@/lib/i18n/strings";
import type { PaperCard, ResearchMap } from "@/lib/types";

export const FIT_EMAIL_SYSTEM_PROMPT = `You help a graduate student prepare RA / research collaboration outreach.

You will produce TWO separate artifacts in one response:
1) fitAnalysis — strategic positioning BEFORE writing the email
2) outreachEmailDraft — a concise professional email draft for human review (NOT to be sent automatically)

Rules for fitAnalysis:
- Use ONLY the provided paper cards, research map, and user background.
- Do NOT invent user experiences, publications, or skills not stated in user background.
- Do NOT overstate fit; separate strong matches from weaker or risky matches.
- strongest_match_points: each entry needs point, evidence_from_user, evidence_from_research_map, how_to_use_in_email.
- weaker_match_points: honest gaps with how_to_frame_carefully.
- suggested_positioning and recommended_outreach_angle must be specific and actionable for RA exploration.
- Be honest about risks_or_gaps.

Rules for outreachEmailDraft:
- Keep the email concise and professional (roughly 200–350 words in full_email).
- Mention at least one specific paper title OR named research theme from the inputs.
- Use user background only as provided — no fabricated credentials or dates.
- Avoid generic praise ("deeply impressed", "excellent research", "world-class").
- Do not claim the student read every paper unless the input supports it.
- Do not ask directly for a PhD admission unless user background explicitly seeks PhD.
- Frame as exploring RA / research collaboration opportunities.
- Include a clear next step (e.g., short meeting) in availability_or_next_step — do NOT fabricate specific calendar dates.
- greeting: e.g. "Dear Professor [Name],"
- full_email: complete draft combining all sections with proper paragraph breaks.
- This is a draft for human-in-the-loop review, not an auto-sent message.

Write in clear professional English.`;

export function buildFitEmailUserMessage(
  paperCards: PaperCard[],
  researchMap: ResearchMap,
  userBackground: string
): string {
  return `Generate fitAnalysis and outreachEmailDraft from the following inputs.

User background:
---
${userBackground.trim()}
---

Paper cards (JSON):
${JSON.stringify(
  paperCards.map((c) => ({
    title: c.title,
    problem: c.problem,
    method: c.method,
    key_contributions: c.key_contributions,
    useful_for_my_research: c.useful_for_my_research,
  })),
  null,
  2
)}

Research map (JSON):
${JSON.stringify(researchMap, null, 2)}`;
}

export const BACKGROUND_TOO_SHORT_MESSAGE = STR.fitEmail.backgroundTooShort;
export const SINGLE_CARD_EMAIL_WARNING = STR.fitEmail.singleCardWarning;
export const BACKGROUND_SHORT_UI_HINT = STR.fitEmail.backgroundShort;
