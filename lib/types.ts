export type WorkflowStepId =
  | "upload"
  | "parse"
  | "analyze"
  | "synthesize"
  | "draft"
  | "export";

export type WorkspaceTabId =
  | "paper-cards"
  | "research-map"
  | "fit-analysis"
  | "outreach-email";

export type ViewStatus = "empty" | "loading" | "error" | "ready";

export type ThemeConfidence = "high" | "medium" | "low";

export interface PaperCard {
  id: string;
  title: string;
  authors: string;
  year: string;
  venue: string;
  problem: string;
  motivation: string;
  method: string;
  pipeline: string;
  key_contributions: string[];
  limitations: string;
  useful_for_my_research: string;
  evidence_quotes: string[];
}

export interface ResearchTheme {
  theme: string;
  description: string;
  supporting_papers: string[];
  confidence: ThemeConfidence;
}

export interface RecurringMethod {
  method: string;
  description: string;
  supporting_papers: string[];
}

export interface RepresentativePaper {
  title: string;
  why_representative: string;
}

export interface SuggestedReading {
  title: string;
  reason: string;
}

export interface ResearchMap {
  main_research_themes: ResearchTheme[];
  recurring_methods: RecurringMethod[];
  representative_papers: RepresentativePaper[];
  evolution_over_time: string[];
  open_questions: string[];
  possible_RA_entry_points: string[];
  risks_or_gaps: string[];
  suggested_reading_order: SuggestedReading[];
}

export interface StrongMatchPoint {
  point: string;
  evidence_from_user: string;
  evidence_from_research_map: string;
  how_to_use_in_email: string;
}

export interface WeakerMatchPoint {
  point: string;
  why_weak: string;
  how_to_frame_carefully: string;
}

export interface FitAnalysis {
  strongest_match_points: StrongMatchPoint[];
  weaker_match_points: WeakerMatchPoint[];
  risks_or_gaps: string[];
  suggested_positioning: string;
  questions_to_ask_professor: string[];
  recommended_outreach_angle: string;
}

export interface OutreachEmailDraft {
  subject: string;
  greeting: string;
  opening: string;
  paper_specific_paragraph: string;
  self_positioning_paragraph: string;
  proposed_RA_contribution: string;
  availability_or_next_step: string;
  closing: string;
  full_email: string;
}

export interface WorkflowArtifacts {
  paperCards: PaperCard[];
  researchMap: ResearchMap | null;
  fitAnalysis: FitAnalysis | null;
  outreachEmail: OutreachEmailDraft | null;
}

export { WORKFLOW_STEPS } from "@/lib/i18n/strings";

export const STEP_TAB_MAP: Partial<Record<WorkflowStepId, WorkspaceTabId>> = {
  analyze: "paper-cards",
  synthesize: "research-map",
  draft: "fit-analysis",
};
