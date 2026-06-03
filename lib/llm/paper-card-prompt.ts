export const PAPER_CARD_SYSTEM_PROMPT = `You extract structured paper cards from pasted academic text for graduate RA outreach workflows.

Rules:
- Use ONLY information supported by the pasted text. Do not invent experiments, numbers, or citations.
- For title, authors, year, and venue: if not clearly stated in the text, set the value to exactly "unknown". Never fabricate metadata.
- evidence_quotes must be short verbatim excerpts copied from the pasted paper text (one sentence or phrase each).
  - If a direct quote is available in the text, include it.
  - If no direct quote is available, return an empty array [].
  - Never fabricate or paraphrase quotes into evidence_quotes.
- key_contributions: bullet-style strings, only claims supported by the text.
- useful_for_my_research:
  - When the user provides a background profile, tailor this field to their stated skills, goals, and research interests while staying grounded in the paper content.
  - When no background is provided, write a concise general note on why the paper matters for graduate research (no invented personal details).
- Write in clear professional English.`;

export function buildPaperCardUserMessage(
  paperText: string,
  userBackground?: string
): string {
  const backgroundBlock = userBackground?.trim()
    ? `\n\nUser background (use only to tailor useful_for_my_research; do not invent facts about the user beyond what is stated):\n---\n${userBackground.trim()}\n---`
    : "\n\nNo user background provided — write a general useful_for_my_research.";

  return `Extract a paper card from the following pasted paper text:${backgroundBlock}\n\nPasted paper text:\n---\n${paperText}\n---`;
}
