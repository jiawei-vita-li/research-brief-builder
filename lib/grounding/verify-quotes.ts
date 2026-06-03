export type GroundingMatchType = "exact" | "normalized" | "not_found";

export interface GroundingResult {
  quote: string;
  isGrounded: boolean;
  matchType: GroundingMatchType;
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function matchQuote(
  paperText: string,
  quote: string
): Pick<GroundingResult, "isGrounded" | "matchType"> {
  if (paperText.includes(quote)) {
    return { isGrounded: true, matchType: "exact" };
  }

  const normalizedPaper = normalizeText(paperText);
  const normalizedQuote = normalizeText(quote);

  if (normalizedQuote.length > 0 && normalizedPaper.includes(normalizedQuote)) {
    return { isGrounded: true, matchType: "normalized" };
  }

  return { isGrounded: false, matchType: "not_found" };
}

/**
 * Verify each evidence quote against the source paper text.
 * Empty quotes are included with matchType "not_found" and isGrounded false.
 */
export function verifyEvidenceQuotes(
  paperText: string,
  quotes: string[]
): GroundingResult[] {
  return quotes.map((quote) => {
    const trimmed = quote.trim();
    if (!trimmed) {
      return {
        quote,
        isGrounded: false,
        matchType: "not_found",
      };
    }

    const { isGrounded, matchType } = matchQuote(paperText, trimmed);
    return {
      quote,
      isGrounded,
      matchType,
    };
  });
}

/** Count non-empty quotes that are grounded in source. */
export function groundingSummaryStats(results: GroundingResult[]): {
  verified: number;
  total: number;
  hasUnverified: boolean;
} {
  const checked = results.filter((r) => r.quote.trim().length > 0);
  const verified = checked.filter((r) => r.isGrounded).length;
  return {
    verified,
    total: checked.length,
    hasUnverified: checked.some((r) => !r.isGrounded),
  };
}
