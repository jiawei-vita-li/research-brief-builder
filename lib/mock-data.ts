import type {
  FitAnalysis,
  OutreachEmailDraft,
  PaperCard,
  ResearchMap,
  WorkflowArtifacts,
} from "./types";

export const DEFAULT_USER_BACKGROUND = `Graduate student (EE + OMSCS) with hands-on experience in LLM agent architecture (Perception / Planner / Executor / Evaluator / Reflection), MCP-style tool schemas, replayable trajectory logging, and LLM-as-Judge evaluation pipelines.

Background also includes multimodal foundation-model adaptation and structured human-AI collaboration workflows. Seeking AI product / developer-tool internships (e.g., agent workflow, coding tools) while keeping a credible RA / PhD outreach path.`;

export const MOCK_PAPER_CARDS: PaperCard[] = [
  {
    id: "paper-1",
    title:
      "TrajBench: Trajectory-Level Evaluation for LLM Agents with Tool Use",
    authors: "Chen et al.",
    year: "2025",
    venue: "unknown",
    problem:
      "Step-level agent benchmarks miss compounding errors across multi-hop tool calls.",
    motivation:
      "Hiring and research teams need auditable, trajectory-native metrics—not single-turn accuracy.",
    method:
      "Defines atomic rubrics (tool correctness, grounding, efficiency) scored over full trajectories with replay logs.",
    pipeline:
      "Task suite → agent run → trajectory capture → rubric judges → error taxonomy → aggregate report",
    key_contributions: [
      "Trajectory-level rubric design aligned with SWE-bench-style verification",
      "Replayable logs for debugging tool-selection vs. grounding failures",
      "Benchmark suite spanning retrieval, code, and structured API tools",
    ],
    limitations:
      "Simulator tasks may not reflect proprietary enterprise tool schemas.",
    useful_for_my_research:
      "Directly informs my Quant Trading Agent evaluation framework and AgentTrace design.",
    evidence_quotes: [
      '"Grounding pass rate improved from 0% to 75% when switching to trajectory judges."',
      '"Tool selection remained 100% correct across pilot tasks."',
    ],
  },
  {
    id: "paper-2",
    title:
      "BriefFlow: Structured Human–AI Workflows for Research Reading and Outreach",
    authors: "Park & Okonkwo",
    year: "2024",
    venue: "CHI Workshop on Human-AI Collaboration",
    problem:
      "Students treat paper reading as chat summarization, losing verifiable intermediate artifacts.",
    motivation:
      "RA outreach needs staged outputs (cards → map → fit → email), not one-shot prose.",
    method:
      "Workflow UI with schema-locked stages, editable artifacts, and explicit human review gates.",
    pipeline:
      "Ingest → parse → card generation → synthesis → fit + draft → export",
    key_contributions: [
      "Schema-first artifacts instead of free-form chat",
      "Edit-in-place review with provenance tags ([paper] / [inference] / [unknown])",
      "Markdown export oriented toward professor-specific outreach",
    ],
    limitations: "Study focused on CS graduate students; limited multilingual evaluation.",
    useful_for_my_research:
      "Validates the product thesis for Research Brief Builder as portfolio + outreach tooling.",
    evidence_quotes: [
      '"Participants completed outreach drafts 2.1× faster with staged artifacts vs. chat-only baselines."',
    ],
  },
];

const TRAJBENCH =
  "TrajBench: Trajectory-Level Evaluation for LLM Agents with Tool Use";
const BRIEFFLOW =
  "BriefFlow: Structured Human–AI Workflows for Research Reading and Outreach";

export const MOCK_RESEARCH_MAP: ResearchMap = {
  main_research_themes: [
    {
      theme: "LLM agent evaluation & tool-use reliability",
      description:
        "Cross-paper focus on measuring multi-step agent behavior with auditable trajectories rather than single-turn scores.",
      supporting_papers: [TRAJBENCH],
      confidence: "high",
    },
    {
      theme: "AI-native research workflows",
      description:
        "Structured, human-in-the-loop pipelines for knowledge work instead of chat-only summarization.",
      supporting_papers: [BRIEFFLOW],
      confidence: "high",
    },
    {
      theme: "Trajectory logging & error taxonomy",
      description:
        "Replayable logs and rubric-based diagnosis of tool vs. grounding failures.",
      supporting_papers: [TRAJBENCH, BRIEFFLOW],
      confidence: "medium",
    },
  ],
  recurring_methods: [
    {
      method: "Rubric-based LLM-as-Judge",
      description: "Atomic metrics aggregated over full trajectories.",
      supporting_papers: [TRAJBENCH],
    },
    {
      method: "Schema-locked multi-stage pipelines",
      description: "Editable artifacts with explicit review gates between stages.",
      supporting_papers: [BRIEFFLOW],
    },
    {
      method: "Replayable trajectory stores",
      description: "Action, tool call, and observation logs for debugging.",
      supporting_papers: [TRAJBENCH],
    },
  ],
  representative_papers: [
    {
      title: TRAJBENCH,
      why_representative:
        "Defines trajectory-level evaluation primitives used across the agent reliability thread.",
    },
    {
      title: BRIEFFLOW,
      why_representative:
        "Anchors the human-AI collaboration and workflow-UI direction for outreach tooling.",
    },
  ],
  evolution_over_time: [
    "Early emphasis on single-turn tool accuracy in agent benchmarks.",
    "Shift toward full-trajectory auditability and replay for debugging.",
    "Recent work productizes staged artifacts for research reading and outreach.",
  ],
  open_questions: [
    "How to evaluate agents on private / enterprise tools without leaking data?",
    "Best UX patterns for provenance without overwhelming students?",
    "When should synthesis happen automatically vs. on explicit user trigger?",
  ],
  possible_RA_entry_points: [
    "Build trajectory benchmarks for domain-specific agent stacks (devtools, research assistants)",
    "Design evaluation dashboards for agent regressions across tool schema versions",
    "Study edit-time vs. generate-time human review for outreach quality",
  ],
  risks_or_gaps: [
    "Mock map — regenerate with Synthesize for your real paper set.",
    "Simulator-heavy benchmarks may not transfer to proprietary tool schemas.",
  ],
  suggested_reading_order: [
    {
      title: TRAJBENCH,
      reason: "Start with evaluation primitives and trajectory rubrics.",
    },
    {
      title: BRIEFFLOW,
      reason: "Then review workflow UX patterns for human-in-the-loop outreach.",
    },
  ],
};

function cloneResearchMap(map: ResearchMap): ResearchMap {
  return {
    main_research_themes: map.main_research_themes.map((t) => ({
      ...t,
      supporting_papers: [...t.supporting_papers],
    })),
    recurring_methods: map.recurring_methods.map((m) => ({
      ...m,
      supporting_papers: [...m.supporting_papers],
    })),
    representative_papers: map.representative_papers.map((p) => ({ ...p })),
    evolution_over_time: [...map.evolution_over_time],
    open_questions: [...map.open_questions],
    possible_RA_entry_points: [...map.possible_RA_entry_points],
    risks_or_gaps: [...map.risks_or_gaps],
    suggested_reading_order: map.suggested_reading_order.map((r) => ({ ...r })),
  };
}

export const MOCK_FIT_ANALYSIS: FitAnalysis = {
  strongest_match_points: [
    {
      point: "Trajectory-level agent evaluation with replayable logs",
      evidence_from_user:
        "Quant Trading Agent with AgentTrace, MCP-style tool schemas, and LLM-as-Judge rubrics.",
      evidence_from_research_map:
        "TrajBench theme and recurring_methods include trajectory rubrics and replay stores.",
      how_to_use_in_email:
        "Lead with evaluation-first engineering and cite TrajBench when discussing fit.",
    },
    {
      point: "AI-native workflow UX for human-in-the-loop research",
      evidence_from_user:
        "Building Research Brief Builder as a staged-artifact portfolio project.",
      evidence_from_research_map:
        "BriefFlow theme on schema-locked pipelines and edit gates.",
      how_to_use_in_email:
        "Connect portfolio work to the lab's workflow / HCI direction without over-claiming publication record.",
    },
  ],
  weaker_match_points: [
    {
      point: "Limited first-author systems publications in agent evaluation",
      why_weak: "Portfolio-heavy narrative vs. long publication track record.",
      how_to_frame_carefully:
        "Emphasize reproducible demos, evaluation tooling, and willingness to ship benchmarks.",
    },
  ],
  risks_or_gaps: [
    "Do not over-claim trading PnL when pitching research-oriented RA roles.",
    "Avoid identifying details for manuscripts under double-blind review.",
  ],
  suggested_positioning:
    "Position as an engineering-minded researcher who builds auditable agent workflows: evaluation-first, schema-driven tools, and human-in-the-loop artifacts.",
  questions_to_ask_professor: [
    "Do you prefer trajectory-level benchmarks or environment-specific simulators for new students?",
    "Are there open-source agent stacks in the lab I could extend with evaluation tooling?",
  ],
  recommended_outreach_angle:
    "Offer to extend trajectory benchmarks or workflow-UI prototypes aligned with the lab's agent reliability thread—ask for a short exploratory meeting, not a PhD commitment.",
};

export const MOCK_OUTREACH_EMAIL: OutreachEmailDraft = {
  subject:
    "RA / research collaboration inquiry — agent evaluation & workflows",
  greeting: "Dear Professor [Name],",
  opening:
    "I am a graduate student at Tsinghua (EE) and Georgia Tech OMSCS. I am writing to explore whether you might have RA or research collaboration opportunities aligned with agent evaluation and human-in-the-loop workflows.",
  paper_specific_paragraph:
    "I read your group's work on trajectory-level agent evaluation (TrajBench) and structured research workflows (BriefFlow). The emphasis on auditable trajectories and staged artifacts matches how I build agent demos with replayable logs and explicit review gates.",
  self_positioning_paragraph:
    "My background includes a five-layer agent architecture, MCP-style tool schemas, LLM-as-Judge evaluation pipelines, and FastAPI tool APIs. I am currently prototyping AI-native workflow UIs for research reading and outreach as a portfolio project.",
  proposed_RA_contribution:
    "I could help extend trajectory benchmarks, build evaluation dashboards for tool-schema regressions, or prototype workflow UIs with provenance—depending on what the lab needs this semester.",
  availability_or_next_step:
    "If you are open to it, I would appreciate the chance to meet briefly to see whether there is a fit. I can share a short portfolio walkthrough and writing samples.",
  closing: "Thank you for your time.\n\nBest regards,\nJiawei Li",
  full_email: `Dear Professor [Name],

I am a graduate student at Tsinghua (EE) and Georgia Tech OMSCS. I am writing to explore whether you might have RA or research collaboration opportunities aligned with agent evaluation and human-in-the-loop workflows.

I read your group's work on trajectory-level agent evaluation (TrajBench) and structured research workflows (BriefFlow). The emphasis on auditable trajectories and staged artifacts matches how I build agent demos with replayable logs and explicit review gates.

My background includes a five-layer agent architecture, MCP-style tool schemas, LLM-as-Judge evaluation pipelines, and FastAPI tool APIs. I am currently prototyping AI-native workflow UIs for research reading and outreach as a portfolio project.

I could help extend trajectory benchmarks, build evaluation dashboards for tool-schema regressions, or prototype workflow UIs with provenance—depending on what the lab needs this semester.

If you are open to it, I would appreciate the chance to meet briefly to see whether there is a fit. I can share a short portfolio walkthrough and writing samples.

Thank you for your time.

Best regards,
Jiawei Li`,
};

function cloneFitAnalysis(fit: FitAnalysis): FitAnalysis {
  return {
    strongest_match_points: fit.strongest_match_points.map((p) => ({ ...p })),
    weaker_match_points: fit.weaker_match_points.map((p) => ({ ...p })),
    risks_or_gaps: [...fit.risks_or_gaps],
    suggested_positioning: fit.suggested_positioning,
    questions_to_ask_professor: [...fit.questions_to_ask_professor],
    recommended_outreach_angle: fit.recommended_outreach_angle,
  };
}

export function getMockArtifacts(): WorkflowArtifacts {
  return {
    paperCards: MOCK_PAPER_CARDS.map((c) => ({ ...c, key_contributions: [...c.key_contributions], evidence_quotes: [...c.evidence_quotes] })),
    researchMap: cloneResearchMap(MOCK_RESEARCH_MAP),
    fitAnalysis: cloneFitAnalysis(MOCK_FIT_ANALYSIS),
    outreachEmail: { ...MOCK_OUTREACH_EMAIL },
  };
}
