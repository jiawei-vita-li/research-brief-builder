import { MIN_PAPER_TEXT_LENGTH } from "@/lib/constants";
import type { GroundingResult } from "@/lib/grounding/verify-quotes";
import type { PaperCard } from "@/lib/types";

export type GeneratePaperCardResult =
  | { ok: true; paperCard: PaperCard; groundingResults: GroundingResult[] }
  | { ok: false; error: string; code?: string };

export async function generatePaperCard(
  paperText: string,
  userBackground?: string
): Promise<GeneratePaperCardResult> {
  const trimmed = paperText.trim();
  if (trimmed.length < MIN_PAPER_TEXT_LENGTH) {
    return {
      ok: false,
      error: `Paste at least ${MIN_PAPER_TEXT_LENGTH} characters of paper text.`,
      code: "TEXT_TOO_SHORT",
    };
  }

  const body: { paperText: string; userBackground?: string } = {
    paperText: trimmed,
  };
  const bg = userBackground?.trim();
  if (bg) {
    body.userBackground = bg;
  }

  const res = await fetch("/api/paper-card", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as {
    paperCard?: PaperCard;
    groundingResults?: GroundingResult[];
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

  if (!data.paperCard) {
    return {
      ok: false,
      error: "Response did not include a paper card.",
      code: "INVALID_RESPONSE",
    };
  }

  return {
    ok: true,
    paperCard: data.paperCard,
    groundingResults: data.groundingResults ?? [],
  };
}
