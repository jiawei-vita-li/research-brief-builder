import type { PaperCard, ResearchMap } from "@/lib/types";

export type SynthesizeResearchMapResult =
  | {
      ok: true;
      researchMap: ResearchMap;
      qualityWarning?: string;
    }
  | { ok: false; error: string; code?: string };

export async function synthesizeResearchMap(
  paperCards: PaperCard[],
  userBackground?: string
): Promise<SynthesizeResearchMapResult> {
  if (paperCards.length < 1) {
    return {
      ok: false,
      error: "Add at least one paper card before synthesizing a research map.",
      code: "NO_PAPER_CARDS",
    };
  }

  const body: { paperCards: PaperCard[]; userBackground?: string } = {
    paperCards,
  };
  const bg = userBackground?.trim();
  if (bg) body.userBackground = bg;

  const res = await fetch("/api/research-map", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as {
    researchMap?: ResearchMap;
    qualityWarning?: string;
    error?: string;
    code?: string;
  };

  if (!res.ok) {
    return {
      ok: false,
      error: data.error ?? `Request failed (${res.status}).`,
      code: data.code,
    };
  }

  if (!data.researchMap) {
    return {
      ok: false,
      error: "Response did not include a research map.",
      code: "INVALID_RESPONSE",
    };
  }

  return {
    ok: true,
    researchMap: data.researchMap,
    qualityWarning: data.qualityWarning,
  };
}
