"use client";

import { EditableField, EditableListField } from "@/components/shared/editable-field";
import { Label } from "@/components/shared/field-label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { bi } from "@/lib/i18n/bi";
import { STR } from "@/lib/i18n/strings";
import type { FitAnalysis, StrongMatchPoint, WeakerMatchPoint } from "@/lib/types";
import { Info } from "lucide-react";

function StrongMatchCard({
  item,
  index,
  onChange,
  onRemove,
}: {
  item: StrongMatchPoint;
  index: number;
  onChange: (item: StrongMatchPoint) => void;
  onRemove: () => void;
}) {
  return (
    <Card className="shadow-none border-dashed bg-emerald-500/5">
      <CardHeader className="py-3 px-4 flex flex-row justify-between items-center">
        <CardTitle className="text-sm">{bi(`Strong match ${index + 1}`, `强匹配 ${index + 1}`)}</CardTitle>
        <button type="button" onClick={onRemove} className="text-xs text-muted-foreground hover:text-foreground">
          Remove
        </button>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4 pt-0">
        <EditableField label={STR.fitFields.point} value={item.point} onChange={(point) => onChange({ ...item, point })} rows={2} />
        <EditableField label={STR.fitFields.evidenceYou} value={item.evidence_from_user} onChange={(evidence_from_user) => onChange({ ...item, evidence_from_user })} rows={2} />
        <EditableField label={STR.fitFields.evidenceMap} value={item.evidence_from_research_map} onChange={(evidence_from_research_map) => onChange({ ...item, evidence_from_research_map })} rows={2} />
        <EditableField label={STR.fitFields.howInEmail} value={item.how_to_use_in_email} onChange={(how_to_use_in_email) => onChange({ ...item, how_to_use_in_email })} rows={2} />
      </CardContent>
    </Card>
  );
}

function WeakerMatchCard({
  item,
  index,
  onChange,
  onRemove,
}: {
  item: WeakerMatchPoint;
  index: number;
  onChange: (item: WeakerMatchPoint) => void;
  onRemove: () => void;
}) {
  return (
    <Card className="shadow-none border-dashed bg-amber-500/5">
      <CardHeader className="py-3 px-4 flex flex-row justify-between items-center">
        <CardTitle className="text-sm">{bi(`Weaker match ${index + 1}`, `弱匹配 ${index + 1}`)}</CardTitle>
        <button type="button" onClick={onRemove} className="text-xs text-muted-foreground hover:text-foreground">
          Remove
        </button>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4 pt-0">
        <EditableField label={STR.fitFields.point} value={item.point} onChange={(point) => onChange({ ...item, point })} rows={2} />
        <EditableField label={STR.fitFields.whyWeak} value={item.why_weak} onChange={(why_weak) => onChange({ ...item, why_weak })} rows={2} />
        <EditableField label={STR.fitFields.frameCarefully} value={item.how_to_frame_carefully} onChange={(how_to_frame_carefully) => onChange({ ...item, how_to_frame_carefully })} rows={2} />
      </CardContent>
    </Card>
  );
}

export function FitAnalysisView({
  analysis,
  onChange,
  qualityWarnings,
}: {
  analysis: FitAnalysis;
  onChange: (analysis: FitAnalysis) => void;
  qualityWarnings?: string[];
}) {
  const patch = (partial: Partial<FitAnalysis>) => onChange({ ...analysis, ...partial });

  return (
    <div className="space-y-4">
      {qualityWarnings?.map((w) => (
        <Alert key={w} className="border-amber-500/30 bg-amber-500/5 py-2">
          <Info className="size-4 text-amber-600" />
          <AlertDescription className="text-xs">{w}</AlertDescription>
        </Alert>
      ))}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{STR.tabs.fitAnalysis}</CardTitle>
          <p className="text-xs text-muted-foreground">
            Position yourself before drafting the email — human-in-the-loop review
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <EditableField
            label={STR.fitFields.suggestedPositioning}
            value={analysis.suggested_positioning}
            onChange={(suggested_positioning) => patch({ suggested_positioning })}
            rows={4}
          />
          <EditableField
            label={STR.fitFields.recommendedAngle}
            value={analysis.recommended_outreach_angle}
            onChange={(recommended_outreach_angle) => patch({ recommended_outreach_angle })}
            rows={3}
          />

          <Separator />

          <section className="space-y-3">
            <Label>Strongest match points</Label>
            {analysis.strongest_match_points.map((item, i) => (
              <StrongMatchCard
                key={`strong-${i}`}
                item={item}
                index={i}
                onChange={(updated) => {
                  const next = [...analysis.strongest_match_points];
                  next[i] = updated;
                  patch({ strongest_match_points: next });
                }}
                onRemove={() =>
                  patch({
                    strongest_match_points: analysis.strongest_match_points.filter(
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
                  strongest_match_points: [
                    ...analysis.strongest_match_points,
                    {
                      point: "",
                      evidence_from_user: "",
                      evidence_from_research_map: "",
                      how_to_use_in_email: "",
                    },
                  ],
                })
              }
            >
              + Add strong match
            </button>
          </section>

          <section className="space-y-3">
            <Label>Weaker match points</Label>
            {analysis.weaker_match_points.map((item, i) => (
              <WeakerMatchCard
                key={`weak-${i}`}
                item={item}
                index={i}
                onChange={(updated) => {
                  const next = [...analysis.weaker_match_points];
                  next[i] = updated;
                  patch({ weaker_match_points: next });
                }}
                onRemove={() =>
                  patch({
                    weaker_match_points: analysis.weaker_match_points.filter(
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
                  weaker_match_points: [
                    ...analysis.weaker_match_points,
                    { point: "", why_weak: "", how_to_frame_carefully: "" },
                  ],
                })
              }
            >
              + Add weaker match
            </button>
          </section>

          <EditableListField
            label={STR.fitFields.risksGaps}
            items={analysis.risks_or_gaps}
            onChange={(risks_or_gaps) => patch({ risks_or_gaps })}
          />
          <EditableListField
            label={STR.fitFields.questionsProfessor}
            items={analysis.questions_to_ask_professor}
            onChange={(questions_to_ask_professor) => patch({ questions_to_ask_professor })}
          />
        </CardContent>
      </Card>
    </div>
  );
}
