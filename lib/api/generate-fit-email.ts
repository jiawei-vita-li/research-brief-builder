import {
  BACKGROUND_TOO_SHORT_MESSAGE,
  BACKGROUND_SHORT_UI_HINT,
} from "@/lib/llm/fit-email-prompt";
import { STR } from "@/lib/i18n/strings";
import { MIN_USER_BACKGROUND_LENGTH } from "@/lib/constants";
import type { FitAnalysis, OutreachEmailDraft, PaperCard, ResearchMap } from "@/lib/types";

export type GenerateFitEmailResult =
  | { ok: true; fitAnalysis: FitAnalysis; outreachEmailDraft: OutreachEmailDraft }
  | { ok: false; error: string; code?: string };

export function canGenerateFitEmail(
  paperCards: PaperCard[],
  researchMap: ResearchMap | null,
  userBackground: string
): { allowed: boolean; reason?: string } {
  if (paperCards.length < 1) {
    return { allowed: false, reason: STR.fitEmail.needPaperCard };
  }
  if (!researchMap) {
    return { allowed: false, reason: STR.fitEmail.needMap };
  }
  const bg = userBackground.trim();
  if (!bg) {
    return { allowed: false, reason: STR.fitEmail.needBackground };
  }
  if (bg.length < MIN_USER_BACKGROUND_LENGTH) {
    return { allowed: false, reason: BACKGROUND_TOO_SHORT_MESSAGE };
  }
  return { allowed: true };
}

export function fitEmailUiWarnings(
  paperCardCount: number,
  userBackground: string
): string[] {
  const warnings: string[] = [];
  const bgLen = userBackground.trim().length;
  if (bgLen > 0 && bgLen < MIN_USER_BACKGROUND_LENGTH) {
    warnings.push(BACKGROUND_SHORT_UI_HINT);
  }
  if (paperCardCount === 1) {
    warnings.push(STR.fitEmail.singleCardWarning);
  }
  return warnings;
}

export async function generateFitEmail(
  paperCards: PaperCard[],
  researchMap: ResearchMap,
  userBackground: string
): Promise<GenerateFitEmailResult> {
  const check = canGenerateFitEmail(paperCards, researchMap, userBackground);
  if (!check.allowed) {
    return {
      ok: false,
      error: check.reason ?? STR.fitEmail.cannotGenerate,
      code: "PRECONDITION",
    };
  }

  const res = await fetch("/api/fit-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      paperCards,
      researchMap,
      userBackground: userBackground.trim(),
    }),
  });

  const data = (await res.json()) as {
    fitAnalysis?: FitAnalysis;
    outreachEmailDraft?: OutreachEmailDraft;
    error?: string;
    code?: string;
  };

  if (!res.ok) {
    return {
      ok: false,
      error: data.error ?? STR.fitEmail.requestFailed(res.status),
      code: data.code,
    };
  }

  if (!data.fitAnalysis || !data.outreachEmailDraft) {
    return {
      ok: false,
      error: STR.fitEmail.missingResponse,
      code: "INVALID_RESPONSE",
    };
  }

  return {
    ok: true,
    fitAnalysis: data.fitAnalysis,
    outreachEmailDraft: data.outreachEmailDraft,
  };
}
