"use client";

import { EditableListField } from "@/components/shared/editable-field";
import { Label } from "@/components/shared/field-label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  groundingSummaryStats,
  type GroundingResult,
} from "@/lib/grounding/verify-quotes";
import { STR } from "@/lib/i18n/strings";
import { AlertTriangle, CheckCircle2, HelpCircle } from "lucide-react";

function QuoteBadge({ result }: { result: GroundingResult }) {
  if (!result.quote.trim()) {
    return (
      <Badge variant="outline" className="font-normal text-muted-foreground">
        {STR.grounding.emptyQuote}
      </Badge>
    );
  }

  if (result.isGrounded) {
    return (
      <Badge
        variant="outline"
        className="font-normal border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
      >
        <CheckCircle2 className="size-3 mr-1" />
        {STR.grounding.verifiedQuote}
        {result.matchType === "normalized" ? ` · ${STR.grounding.normalized}` : ""}
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="font-normal border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200"
    >
      <HelpCircle className="size-3 mr-1" />
      {STR.grounding.needsReview}
    </Badge>
  );
}

export function EvidenceQuotesGrounding({
  items,
  groundingResults,
  onChange,
}: {
  items: string[];
  groundingResults: GroundingResult[];
  onChange: (items: string[]) => void;
}) {
  const stats = groundingSummaryStats(groundingResults);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label>{STR.grounding.evidenceLabel}</Label>
        {stats.total > 0 ? (
          <p className="text-xs text-muted-foreground">
            {STR.grounding.verifiedCount(stats.verified, stats.total)}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">{STR.grounding.noQuotes}</p>
        )}
      </div>

      {stats.hasUnverified && stats.total > 0 ? (
        <Alert variant="default" className="border-amber-500/30 bg-amber-500/5 py-2">
          <AlertTriangle className="size-4 text-amber-600" />
          <AlertDescription className="text-xs text-muted-foreground">
            {STR.grounding.unverifiedAlert}
          </AlertDescription>
        </Alert>
      ) : null}

      {groundingResults.length > 0 ? (
        <ul className="space-y-2 rounded-md border bg-muted/20 p-3">
          {groundingResults.map((result, i) => (
            <li key={`${i}-${result.quote.slice(0, 24)}`} className="space-y-1">
              <div className="flex flex-wrap items-start gap-2 justify-between">
                <p className="text-xs font-mono text-foreground/90 flex-1 min-w-0 break-words">
                  {result.quote.trim() || STR.grounding.emptyLine}
                </p>
                <QuoteBadge result={result} />
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      <EditableListField
        label={STR.grounding.editQuotes}
        items={items}
        onChange={onChange}
        rows={4}
      />
      <p className="text-[11px] text-muted-foreground">
        {STR.grounding.editHint}
      </p>
    </div>
  );
}
