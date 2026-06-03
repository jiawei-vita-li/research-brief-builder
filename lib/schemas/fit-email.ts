import { z } from "zod";
import type { FitAnalysis, OutreachEmailDraft } from "@/lib/types";

export const strongMatchPointSchema = z.object({
  point: z.string(),
  evidence_from_user: z.string(),
  evidence_from_research_map: z.string(),
  how_to_use_in_email: z.string(),
});

export const weakerMatchPointSchema = z.object({
  point: z.string(),
  why_weak: z.string(),
  how_to_frame_carefully: z.string(),
});

export const fitAnalysisSchema = z.object({
  strongest_match_points: z.array(strongMatchPointSchema),
  weaker_match_points: z.array(weakerMatchPointSchema),
  risks_or_gaps: z.array(z.string()),
  suggested_positioning: z.string(),
  questions_to_ask_professor: z.array(z.string()),
  recommended_outreach_angle: z.string(),
});

export const outreachEmailDraftSchema = z.object({
  subject: z.string(),
  greeting: z.string(),
  opening: z.string(),
  paper_specific_paragraph: z.string(),
  self_positioning_paragraph: z.string(),
  proposed_RA_contribution: z.string(),
  availability_or_next_step: z.string(),
  closing: z.string(),
  full_email: z.string(),
});

export const fitEmailResponseSchema = z.object({
  fitAnalysis: fitAnalysisSchema,
  outreachEmailDraft: outreachEmailDraftSchema,
});

export type FitEmailLlmOutput = z.infer<typeof fitEmailResponseSchema>;

function trimList(items: string[]): string[] {
  return items.map((s) => s.trim()).filter(Boolean);
}

function trimStrong(points: FitAnalysis["strongest_match_points"]) {
  return points.map((p) => ({
    point: p.point.trim(),
    evidence_from_user: p.evidence_from_user.trim(),
    evidence_from_research_map: p.evidence_from_research_map.trim(),
    how_to_use_in_email: p.how_to_use_in_email.trim(),
  }));
}

function trimWeak(points: FitAnalysis["weaker_match_points"]) {
  return points.map((p) => ({
    point: p.point.trim(),
    why_weak: p.why_weak.trim(),
    how_to_frame_carefully: p.how_to_frame_carefully.trim(),
  }));
}

export function normalizeFitEmailOutput(raw: FitEmailLlmOutput): {
  fitAnalysis: FitAnalysis;
  outreachEmailDraft: OutreachEmailDraft;
} {
  return {
    fitAnalysis: {
      strongest_match_points: trimStrong(raw.fitAnalysis.strongest_match_points),
      weaker_match_points: trimWeak(raw.fitAnalysis.weaker_match_points),
      risks_or_gaps: trimList(raw.fitAnalysis.risks_or_gaps),
      suggested_positioning: raw.fitAnalysis.suggested_positioning.trim(),
      questions_to_ask_professor: trimList(
        raw.fitAnalysis.questions_to_ask_professor
      ),
      recommended_outreach_angle:
        raw.fitAnalysis.recommended_outreach_angle.trim(),
    },
    outreachEmailDraft: {
      subject: raw.outreachEmailDraft.subject.trim(),
      greeting: raw.outreachEmailDraft.greeting.trim(),
      opening: raw.outreachEmailDraft.opening.trim(),
      paper_specific_paragraph:
        raw.outreachEmailDraft.paper_specific_paragraph.trim(),
      self_positioning_paragraph:
        raw.outreachEmailDraft.self_positioning_paragraph.trim(),
      proposed_RA_contribution:
        raw.outreachEmailDraft.proposed_RA_contribution.trim(),
      availability_or_next_step:
        raw.outreachEmailDraft.availability_or_next_step.trim(),
      closing: raw.outreachEmailDraft.closing.trim(),
      full_email: raw.outreachEmailDraft.full_email.trim(),
    },
  };
}
