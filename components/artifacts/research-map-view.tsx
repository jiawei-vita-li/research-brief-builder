"use client";

import { EditableField, EditableListField } from "@/components/shared/editable-field";
import { Label } from "@/components/shared/field-label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type {
  RecurringMethod,
  ResearchMap,
  ResearchTheme,
  RepresentativePaper,
  SuggestedReading,
  ThemeConfidence,
} from "@/lib/types";
import { STR } from "@/lib/i18n/strings";
import { AlertTriangle } from "lucide-react";

function ConfidenceBadge({ confidence }: { confidence: ThemeConfidence }) {
  const styles: Record<ThemeConfidence, string> = {
    high: "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
    medium: "border-sky-500/40 bg-sky-500/10 text-sky-900 dark:text-sky-200",
    low: "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200",
  };
  return (
    <Badge variant="outline" className={`font-normal ${styles[confidence]}`}>
      {confidence === "high"
        ? STR.researchMap.highConfidence
        : confidence === "medium"
          ? STR.researchMap.mediumConfidence
          : STR.researchMap.lowConfidence}
    </Badge>
  );
}

function SupportingPaperBadges({ papers }: { papers: string[] }) {
  if (papers.length === 0) {
    return <span className="text-xs text-muted-foreground">{STR.researchMap.noSupporting}</span>;
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {papers.map((title) => (
        <Badge key={title} variant="secondary" className="font-normal text-xs max-w-full">
          <span className="truncate">{title}</span>
        </Badge>
      ))}
    </div>
  );
}

function ThemeEditor({
  theme,
  index,
  onChange,
  onRemove,
}: {
  theme: ResearchTheme;
  index: number;
  onChange: (theme: ResearchTheme) => void;
  onRemove: () => void;
}) {
  return (
    <Card className="shadow-none border-dashed">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-sm">{STR.researchMap.themeN(index + 1)}</CardTitle>
        <div className="flex items-center gap-2">
          <select
            value={theme.confidence}
            onChange={(e) =>
              onChange({
                ...theme,
                confidence: e.target.value as ThemeConfidence,
              })
            }
            className="text-xs border rounded-md px-2 py-1 bg-background"
            aria-label="Theme confidence"
          >
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            {STR.researchMap.remove}
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4 pt-0">
        <EditableField
          label={STR.researchMap.theme}
          value={theme.theme}
          onChange={(v) => onChange({ ...theme, theme: v })}
          rows={1}
        />
        <EditableField
          label={STR.researchMap.description}
          value={theme.description}
          onChange={(v) => onChange({ ...theme, description: v })}
          rows={3}
        />
        <div className="space-y-1.5">
          <Label>{STR.researchMap.supportingPapers}</Label>
          <SupportingPaperBadges papers={theme.supporting_papers} />
        </div>
        <EditableListField
          label={STR.researchMap.editSupporting}
          items={theme.supporting_papers}
          onChange={(supporting_papers) => onChange({ ...theme, supporting_papers })}
          rows={2}
        />
        <ConfidenceBadge confidence={theme.confidence} />
      </CardContent>
    </Card>
  );
}

function MethodEditor({
  method,
  index,
  onChange,
  onRemove,
}: {
  method: RecurringMethod;
  index: number;
  onChange: (method: RecurringMethod) => void;
  onRemove: () => void;
}) {
  return (
    <Card className="shadow-none border-dashed">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
        <CardTitle className="text-sm">{STR.researchMap.methodN(index + 1)}</CardTitle>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          {STR.researchMap.remove}
        </button>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4 pt-0">
        <EditableField
          label={STR.researchMap.method}
          value={method.method}
          onChange={(v) => onChange({ ...method, method: v })}
          rows={1}
        />
        <EditableField
          label={STR.researchMap.description}
          value={method.description}
          onChange={(v) => onChange({ ...method, description: v })}
          rows={2}
        />
        <div className="space-y-1.5">
          <Label>{STR.researchMap.supportingPapers}</Label>
          <SupportingPaperBadges papers={method.supporting_papers} />
        </div>
        <EditableListField
          label={STR.researchMap.editSupporting}
          items={method.supporting_papers}
          onChange={(supporting_papers) => onChange({ ...method, supporting_papers })}
          rows={2}
        />
      </CardContent>
    </Card>
  );
}

function RepresentativeEditor({
  paper,
  index,
  onChange,
}: {
  paper: RepresentativePaper;
  index: number;
  onChange: (paper: RepresentativePaper) => void;
}) {
  return (
    <div className="space-y-2 rounded-md border p-3">
      <p className="text-xs font-medium text-muted-foreground">{STR.researchMap.paperN(index + 1)}</p>
      <EditableField
        label={STR.researchMap.title}
        value={paper.title}
        onChange={(title) => onChange({ ...paper, title })}
        rows={1}
      />
      <EditableField
        label={STR.researchMap.whyRepresentative}
        value={paper.why_representative}
        onChange={(why_representative) => onChange({ ...paper, why_representative })}
        rows={2}
      />
    </div>
  );
}

function ReadingOrderEditor({
  item,
  index,
  onChange,
}: {
  item: SuggestedReading;
  index: number;
  onChange: (item: SuggestedReading) => void;
}) {
  return (
    <div className="space-y-2 rounded-md border p-3">
      <p className="text-xs font-medium text-muted-foreground">#{index + 1}</p>
      <EditableField
        label={STR.researchMap.title}
        value={item.title}
        onChange={(title) => onChange({ ...item, title })}
        rows={1}
      />
      <EditableField
        label={STR.researchMap.reason}
        value={item.reason}
        onChange={(reason) => onChange({ ...item, reason })}
        rows={2}
      />
    </div>
  );
}

export function ResearchMapView({
  map,
  onChange,
  qualityWarning,
}: {
  map: ResearchMap;
  onChange: (map: ResearchMap) => void;
  qualityWarning?: string;
}) {
  const patch = (partial: Partial<ResearchMap>) => onChange({ ...map, ...partial });

  return (
    <div className="space-y-4">
      {qualityWarning ? (
        <Alert className="border-amber-500/30 bg-amber-500/5 py-2">
          <AlertTriangle className="size-4 text-amber-600" />
          <AlertDescription className="text-xs">{qualityWarning}</AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{STR.researchMap.cardTitle}</CardTitle>
          <p className="text-xs text-muted-foreground">{STR.researchMap.cardSubtitle}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-3">
            <Label>{STR.researchMap.mainThemes}</Label>
            {map.main_research_themes.map((theme, i) => (
              <ThemeEditor
                key={`theme-${i}`}
                theme={theme}
                index={i}
                onChange={(t) => {
                  const next = [...map.main_research_themes];
                  next[i] = t;
                  patch({ main_research_themes: next });
                }}
                onRemove={() =>
                  patch({
                    main_research_themes: map.main_research_themes.filter(
                      (_, j) => j !== i
                    ),
                  })
                }
              />
            ))}
            <button
              type="button"
              className="text-xs text-primary hover:underline"
              onClick={() =>
                patch({
                  main_research_themes: [
                    ...map.main_research_themes,
                    {
                      theme: "",
                      description: "",
                      supporting_papers: [],
                      confidence: "medium",
                    },
                  ],
                })
              }
            >
              + {STR.researchMap.addTheme}
            </button>
          </section>

          <Separator />

          <section className="space-y-3">
            <Label>{STR.researchMap.recurringMethods}</Label>
            {map.recurring_methods.map((method, i) => (
              <MethodEditor
                key={`method-${i}`}
                method={method}
                index={i}
                onChange={(m) => {
                  const next = [...map.recurring_methods];
                  next[i] = m;
                  patch({ recurring_methods: next });
                }}
                onRemove={() =>
                  patch({
                    recurring_methods: map.recurring_methods.filter(
                      (_, j) => j !== i
                    ),
                  })
                }
              />
            ))}
            <button
              type="button"
              className="text-xs text-primary hover:underline"
              onClick={() =>
                patch({
                  recurring_methods: [
                    ...map.recurring_methods,
                    { method: "", description: "", supporting_papers: [] },
                  ],
                })
              }
            >
              + {STR.researchMap.addMethod}
            </button>
          </section>

          <Separator />

          <section className="space-y-3">
            <Label>{STR.researchMap.representativePapers}</Label>
            {map.representative_papers.map((paper, i) => (
              <RepresentativeEditor
                key={`rep-${i}`}
                paper={paper}
                index={i}
                onChange={(p) => {
                  const next = [...map.representative_papers];
                  next[i] = p;
                  patch({ representative_papers: next });
                }}
              />
            ))}
          </section>

          <EditableListField
            label={STR.researchMap.evolution}
            items={map.evolution_over_time}
            onChange={(evolution_over_time) => patch({ evolution_over_time })}
            rows={4}
          />
          <EditableListField
            label={STR.researchMap.openQuestions}
            items={map.open_questions}
            onChange={(open_questions) => patch({ open_questions })}
          />
          <EditableListField
            label={STR.researchMap.raEntry}
            items={map.possible_RA_entry_points}
            onChange={(possible_RA_entry_points) =>
              patch({ possible_RA_entry_points })
            }
          />
          <EditableListField
            label={STR.researchMap.risksGaps}
            items={map.risks_or_gaps}
            onChange={(risks_or_gaps) => patch({ risks_or_gaps })}
          />

          <section className="space-y-3">
            <Label>{STR.researchMap.readingOrder}</Label>
            {map.suggested_reading_order.map((item, i) => (
              <ReadingOrderEditor
                key={`read-${i}`}
                item={item}
                index={i}
                onChange={(r) => {
                  const next = [...map.suggested_reading_order];
                  next[i] = r;
                  patch({ suggested_reading_order: next });
                }}
              />
            ))}
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
