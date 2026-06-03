"use client";

import { EvidenceQuotesGrounding } from "@/components/artifacts/evidence-quotes-grounding";
import { EditableField, EditableListField } from "@/components/shared/editable-field";
import { MetadataValue } from "@/components/shared/unknown-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { GroundingResult } from "@/lib/grounding/verify-quotes";
import { STR } from "@/lib/i18n/strings";
import type { PaperCard } from "@/lib/types";

export function PaperCardView({
  card,
  index,
  onChange,
  groundingResults,
  onEvidenceQuotesChange,
}: {
  card: PaperCard;
  index: number;
  onChange: (card: PaperCard) => void;
  groundingResults?: GroundingResult[];
  /** When set, evidence quotes use source grounding UI and re-verification. */
  onEvidenceQuotesChange?: (quotes: string[]) => void;
}) {
  const patch = (partial: Partial<PaperCard>) => onChange({ ...card, ...partial });

  const showGrounding =
    groundingResults !== undefined && onEvidenceQuotesChange !== undefined;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{STR.paperCard.paperN(index + 1)}</Badge>
          {showGrounding ? (
            <Badge variant="outline" className="font-normal text-xs">
              {STR.grounding.sourceGrounding}
            </Badge>
          ) : null}
        </div>
        <EditableField
          label={STR.paperCard.title}
          value={card.title}
          onChange={(title) => patch({ title })}
          rows={2}
        />
        <CardDescription className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
          <span>
            {STR.paperCard.authors}: <MetadataValue value={card.authors} />
          </span>
          <span>
            {STR.paperCard.year}: <MetadataValue value={card.year} />
          </span>
          <span>
            {STR.paperCard.venue}: <MetadataValue value={card.venue} />
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <EditableField label={STR.paperCard.problem} value={card.problem} onChange={(problem) => patch({ problem })} />
        <EditableField label={STR.paperCard.motivation} value={card.motivation} onChange={(motivation) => patch({ motivation })} />
        <EditableField label={STR.paperCard.method} value={card.method} onChange={(method) => patch({ method })} />
        <EditableField label={STR.paperCard.pipeline} value={card.pipeline} onChange={(pipeline) => patch({ pipeline })} rows={2} />
        <EditableListField
          label={STR.paperCard.keyContributions}
          items={card.key_contributions}
          onChange={(key_contributions) => patch({ key_contributions })}
        />
        <EditableField label={STR.paperCard.limitations} value={card.limitations} onChange={(limitations) => patch({ limitations })} rows={2} />
        <EditableField
          label={STR.paperCard.usefulForResearch}
          value={card.useful_for_my_research}
          onChange={(useful_for_my_research) => patch({ useful_for_my_research })}
          rows={3}
        />
        <Separator />
        {showGrounding ? (
          <EvidenceQuotesGrounding
            items={card.evidence_quotes}
            groundingResults={groundingResults}
            onChange={onEvidenceQuotesChange}
          />
        ) : (
          <EditableListField
            label={STR.paperCard.evidenceQuotes}
            items={card.evidence_quotes}
            onChange={(evidence_quotes) => patch({ evidence_quotes })}
            rows={3}
          />
        )}
        <div className="grid gap-3 sm:grid-cols-3">
          <EditableField label={STR.paperCard.authorsEdit} value={card.authors} onChange={(authors) => patch({ authors })} rows={1} />
          <EditableField label={STR.paperCard.yearEdit} value={card.year} onChange={(year) => patch({ year })} rows={1} />
          <EditableField label={STR.paperCard.venueEdit} value={card.venue} onChange={(venue) => patch({ venue })} rows={1} />
        </div>
      </CardContent>
    </Card>
  );
}

export function PaperCardsPanel({
  cards,
  onChangeCard,
  groundingByCardId,
  sourcePaperText,
  onEvidenceQuotesChange,
}: {
  cards: PaperCard[];
  onChangeCard: (id: string, card: PaperCard) => void;
  groundingByCardId?: Record<string, GroundingResult[]>;
  sourcePaperText?: string;
  onEvidenceQuotesChange?: (id: string, quotes: string[]) => void;
}) {
  return (
    <div className="space-y-6">
      {cards.map((card, i) => {
        const grounding = groundingByCardId?.[card.id];
        const hasGrounding =
          grounding !== undefined &&
          sourcePaperText !== undefined &&
          onEvidenceQuotesChange !== undefined;

        return (
          <PaperCardView
            key={card.id}
            card={card}
            index={i}
            onChange={(updated) => onChangeCard(card.id, updated)}
            groundingResults={hasGrounding ? grounding : undefined}
            onEvidenceQuotesChange={
              hasGrounding
                ? (quotes) => onEvidenceQuotesChange(card.id, quotes)
                : undefined
            }
          />
        );
      })}
    </div>
  );
}
