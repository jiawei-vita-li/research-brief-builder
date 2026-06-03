import { bi } from "@/lib/i18n/bi";
import type { WorkflowStepId } from "@/lib/types";

export const STR = {
  app: {
    title: "Research Brief Builder",
    tagline: bi(
      "From papers to professor brief to RA outreach draft",
      "从论文到导师研究图谱，再到 RA 外联邮件草稿"
    ),
    subtitle: bi(
      "AI-native workflow · structured artifacts · human-in-the-loop review",
      "AI 原生工作流 · 结构化产物 · 人在回路审阅"
    ),
  },
  toolbar: {
    phase6Title: "Phase 6",
    phase6Desc: bi(
      "Export Markdown when ready — portable handoff for Obsidian, GitHub, or email prep. Not auto-sent.",
      "就绪后导出 Markdown — 可导入 Obsidian / GitHub 或邮件润色。不会自动发送。"
    ),
  },
  inputs: {
    heading: bi("Inputs", "输入"),
    subheading: bi(
      "Upload PDF or paste text · then generate manually",
      "上传 PDF 或粘贴文本 · 再手动生成"
    ),
    uploadPdf: bi("Upload PDF", "上传 PDF"),
    pastePaper: bi("Paste paper text", "粘贴论文文本"),
    pasteHint: bi(
      "Review or clean the extracted text before generating a Paper Card.",
      "生成论文卡片前请审阅或清理提取的文本。"
    ),
    pastePlaceholder: bi(
      "Paste abstract, intro, full text, or upload a PDF above…",
      "粘贴摘要、引言、全文，或在上方上传 PDF…"
    ),
    groundingHint: bi(
      "Uses pasted/extracted text + your background · source grounding on quotes",
      "使用粘贴/提取文本与你的背景 · 对引用做来源核对"
    ),
    yourBackground: bi("Your background", "你的背景"),
  },
  pdf: {
    chooseFile: bi("Choose PDF file", "选择 PDF 文件"),
    extracting: bi("Extracting text…", "正在提取文本…"),
    disclaimer: bi(
      "PDF extraction quality may vary. Review or clean the extracted text before generating a Paper Card. Upload does not call the LLM.",
      "PDF 提取质量因文件而异。生成卡片前请审阅文本。上传不会调用 LLM。"
    ),
    pages: bi("Pages", "页数"),
    chars: bi("Chars", "字符"),
    words: bi("Words", "词数"),
    statusIdle: bi("Idle", "空闲"),
    statusExtracting: bi("Extracting", "提取中"),
    statusExtracted: bi("Extracted", "已提取"),
    statusFailed: bi("Failed", "失败"),
    extractionFailedTitle: bi("PDF extraction failed", "PDF 提取失败"),
    truncated: (max: string) =>
      bi(
        `Text was truncated to ${max} characters for API limits.`,
        `文本已截断至 ${max} 字符以满足 API 限制。`
      ),
    extractFailed: bi("PDF extraction failed.", "PDF 提取失败。"),
  },
  buttons: {
    simulate: bi("Simulate workflow", "模拟工作流"),
    simulateRunning: bi("Running workflow…", "工作流运行中…"),
    generatePaperCard: bi("Generate Paper Card", "生成论文卡片"),
    generating: bi("Generating…", "生成中…"),
    synthesizeMap: bi("Synthesize Research Map", "合成研究图谱"),
    synthesizingMap: bi("Synthesizing…", "合成中…"),
    generateFitEmail: bi("Generate Fit & Email", "生成匹配分析与邮件"),
    generatingFitEmail: bi("Generating…", "生成中…"),
    exportMarkdown: bi("Export Markdown", "导出 Markdown"),
    copyClipboard: bi("Copy to clipboard", "复制到剪贴板"),
    resetEmpty: bi("Reset to empty", "重置为空"),
    previewError: bi("Preview error state", "预览错误状态"),
    clearError: bi("Clear error", "清除错误"),
  },
  tabs: {
    paperCards: bi("Paper Cards", "论文卡片"),
    researchMap: bi("Research Map", "研究图谱"),
    fitAnalysis: bi("Fit Analysis", "匹配分析"),
    outreachEmail: bi("Outreach Email", "外联邮件"),
  },
  status: {
    heading: bi("Status", "状态"),
    loading: bi("Loading", "加载中"),
    error: bi("Error", "错误"),
    ready: bi("Ready", "就绪"),
    empty: bi("Empty", "空"),
    workflowProgress: bi("Workflow progress", "工作流进度"),
    currentStep: bi("Current step", "当前步骤"),
    mockPipelineError: bi(
      "Mock pipeline failed at the current step. Retry simulation or reset to empty.",
      "模拟流水线在当前步骤失败。请重试模拟或重置为空。"
    ),
    exportHint: bi(
      "Download .md or copy for Obsidian / Notion / email prep.",
      "下载 .md 或复制到 Obsidian / Notion / 邮件准备。"
    ),
    exportNeedArtifact: bi(
      "Add at least one artifact to export.",
      "至少生成一项产物后再导出。"
    ),
    demoControls: bi("Demo controls", "演示控制"),
  },
  empty: {
    noPaperCards: bi("No paper cards yet", "尚无论文卡片"),
    noPaperCardsDesc: bi(
      "Paste paper text and click Generate Paper Card, or run Simulate workflow.",
      "粘贴论文文本并点击生成论文卡片，或运行模拟工作流。"
    ),
    noResearchMap: bi("No research map yet", "尚无研究图谱"),
    noResearchMapDesc: bi(
      "Add paper cards, then click Synthesize Research Map. Simulate workflow loads a mock map.",
      "先添加论文卡片，再点击合成研究图谱。模拟工作流会加载示例图谱。"
    ),
    noFit: bi("No fit analysis yet", "尚无匹配分析"),
    noFitDesc: bi(
      "Synthesize a research map, add background, then click Generate Fit & Email.",
      "先合成研究图谱并填写背景，再点击生成匹配分析与邮件。"
    ),
    noEmail: bi("No outreach draft yet", "尚无外联草稿"),
    noEmailDesc: bi(
      "Generate Fit & Email from the Fit Analysis tab after reviewing positioning.",
      "在匹配分析页审阅定位后，点击生成匹配分析与邮件。"
    ),
  },
  workspace: {
    mapHint: bi(
      "Synthesizes professor-level themes from paper cards — review and edit before outreach.",
      "从论文卡片合成导师级主题 — 外联前请审阅并编辑。"
    ),
    fitHint: bi(
      "Paper cards + research map + background → fit analysis → email draft.",
      "论文卡片 + 研究图谱 + 背景 → 匹配分析 → 邮件草稿。"
    ),
    tabLoading: bi("Loading…", "加载中…"),
    tabErrorGeneric: bi(
      "Something went wrong. Check the left panel or Status, then retry.",
      "出现问题。请查看左侧输入或状态面板后重试。"
    ),
    draftBadge: bi("Draft — not sent", "草稿 — 未发送"),
  },
  grounding: {
    sourceGrounding: bi("Source grounding", "来源核对"),
    evidenceLabel: bi("Evidence quotes · source grounding", "证据引用 · 来源核对"),
    verifiedCount: (v: number, t: number) =>
      bi(
        `${v} / ${t} evidence quotes verified in source`,
        `来源文本中已核对 ${v} / ${t} 条证据引用`
      ),
    noQuotes: bi("No evidence quotes yet", "尚无证据引用"),
    unverifiedAlert: bi(
      "Some evidence quotes were not found in the pasted text. Please review before using this brief — human-in-the-loop check recommended.",
      "部分引用未在粘贴文本中找到。使用前请人工审阅。"
    ),
    editQuotes: bi("Edit evidence quotes", "编辑证据引用"),
    editHint: bi(
      "Quotes are re-checked against pasted paper text when you edit. Verified = exact or normalized match in source.",
      "编辑后会重新对照粘贴文本核对。已核对 = 原文精确或规范化匹配。"
    ),
    emptyQuote: bi("Empty", "空"),
    verifiedQuote: bi("Verified quote", "已核对引用"),
    needsReview: bi("Needs review", "待审阅"),
    normalized: bi("normalized", "规范化匹配"),
    emptyLine: bi("(empty line)", "（空行）"),
  },
  paperCard: {
    paperN: (n: number) => bi(`Paper ${n}`, `论文 ${n}`),
    authors: bi("Authors", "作者"),
    year: bi("Year", "年份"),
    venue: bi("Venue", "发表 venue"),
    title: bi("Title", "标题"),
    problem: bi("Problem", "问题"),
    motivation: bi("Motivation", "动机"),
    method: bi("Method", "方法"),
    pipeline: bi("Pipeline", "流程"),
    keyContributions: bi("Key contributions", "主要贡献"),
    limitations: bi("Limitations", "局限"),
    usefulForResearch: bi("Useful for my research", "对我研究的价值"),
    evidenceQuotes: bi("Evidence quotes", "证据引用"),
  },
  fitEmail: {
    backgroundShort: bi(
      "Add more background to generate a more specific fit analysis and outreach email.",
      "补充更多背景以生成更具体的匹配分析与外联邮件。"
    ),
    backgroundTooShort: bi(
      "Add more background (at least 80 characters) to generate fit analysis and outreach email.",
      "背景至少 80 字才能生成匹配分析与外联邮件。"
    ),
    singleCardWarning: bi(
      "Email specificity may improve with more PaperCards.",
      "增加更多论文卡片可提升邮件针对性。"
    ),
    needPaperCard: bi("Add at least one paper card first.", "请先添加至少一张论文卡片。"),
    needMap: bi("Synthesize a research map first.", "请先合成研究图谱。"),
    needBackground: bi("Add your background in the left panel.", "请在左侧面板填写背景。"),
    cannotGenerate: bi("Cannot generate.", "无法生成。"),
    missingResponse: bi(
      "Response missing fit analysis or email draft.",
      "响应缺少匹配分析或邮件草稿。"
    ),
    requestFailed: (status: number) =>
      bi(`Request failed (${status}).`, `请求失败（${status}）。`),
  },
  researchMap: {
    singleCardQuality: bi(
      "Research maps are stronger with 2–5 paper cards.",
      "建议 2–5 张论文卡片，研究图谱更完整。"
    ),
    apiFewCards: bi(
      "Only one paper card was provided. Themes may be narrow; add more cards for a stronger map.",
      "仅提供一张论文卡片，主题可能较窄；增加卡片可得到更完整的图谱。"
    ),
    singleCardHint: bi(
      "Synthesis works best with 2+ paper cards; single-card map may be shallow.",
      "建议 2 张以上论文卡片；仅一张时图谱可能较浅。"
    ),
    highConfidence: bi("high confidence", "高置信度"),
    mediumConfidence: bi("medium confidence", "中置信度"),
    lowConfidence: bi("low confidence", "低置信度"),
    noSupporting: bi("No supporting papers", "无支撑论文"),
  },
  outreach: {
    cardTitle: bi("RA outreach email draft", "RA 外联邮件草稿"),
    reviewHint: bi(
      "Review and edit before sending. Human-in-the-loop required.",
      "发送前请审阅并编辑。需要人在回路确认。"
    ),
    subject: bi("Subject", "主题"),
    greeting: bi("Greeting", "称呼"),
    opening: bi("Opening", "开场"),
    paperParagraph: bi("Paper-specific paragraph", "论文相关段落"),
    selfPositioning: bi("Self positioning", "自我定位"),
    proposedContribution: bi("Proposed RA contribution", "拟议 RA 贡献"),
    availability: bi("Availability / next step", "可联系时间 / 下一步"),
    closing: bi("Closing", "结尾"),
    fullEmail: bi("Full email (final draft)", "完整邮件（终稿）"),
  },
  fitFields: {
    point: bi("Point", "要点"),
    evidenceYou: bi("Evidence from you", "你的证据"),
    evidenceMap: bi("Evidence from research map", "来自研究图谱的证据"),
    howInEmail: bi("How to use in email", "在邮件中的用法"),
    whyWeak: bi("Why weak", "为何较弱"),
    frameCarefully: bi("How to frame carefully", "如何谨慎表述"),
    suggestedPositioning: bi("Suggested positioning", "建议定位"),
    recommendedAngle: bi("Recommended outreach angle", "建议外联角度"),
    strongestMatches: bi("Strongest match points", "最强匹配点"),
    weakerMatches: bi("Weaker match points", "较弱匹配点"),
    risksGaps: bi("Risks or gaps", "风险或缺口"),
    questionsProfessor: bi("Questions to ask professor", "可向导师提问"),
  },
  unknown: {
    value: bi("unknown", "未知"),
  },
  export: {
    needArtifact: bi(
      "Add a paper card, research map, fit analysis, or email draft to export.",
      "添加论文卡片、研究图谱、匹配分析或邮件草稿后再导出。"
    ),
    exported: (filename: string) =>
      bi(
        `Markdown exported (${filename}). Review before sending any email.`,
        `已导出 Markdown（${filename}）。发送任何邮件前请人工审阅。`
      ),
    copied: bi(
      "Markdown copied to clipboard. Review before sending any email.",
      "Markdown 已复制到剪贴板。发送任何邮件前请人工审阅。"
    ),
    copyFailed: bi(
      "Could not copy to clipboard. Try Export Markdown or allow clipboard access.",
      "无法复制到剪贴板。请尝试导出 Markdown 或允许剪贴板权限。"
    ),
  },
  messages: {
    workflowComplete: bi(
      "Workflow complete — all artifacts are editable. Export or copy when ready.",
      "工作流完成 — 所有产物可编辑。就绪后可导出或复制。"
    ),
    callingLlm: bi(
      "Calling LLM — personalized card + source grounding check…",
      "调用 LLM — 个性化卡片 + 来源核对…"
    ),
    paperCardReady: bi(
      "Paper card ready — edit fields or run Simulate workflow for full mock.",
      "论文卡片已就绪 — 可编辑字段或运行模拟工作流查看完整示例。"
    ),
    demoError: bi(
      "Demo error state — for UI review only.",
      "演示错误状态 — 仅用于 UI 审阅。"
    ),
    synthesizingMap: bi(
      "Synthesizing professor-level research map from paper cards…",
      "正在从论文卡片合成导师级研究图谱…"
    ),
    mapReady: bi(
      "Research map synthesized — review themes, confidence, and supporting papers before outreach.",
      "研究图谱已合成 — 外联前请审阅主题、置信度与支撑论文。"
    ),
    generatingFit: bi(
      "Generating fit analysis and RA outreach email draft…",
      "正在生成匹配分析与 RA 外联邮件草稿…"
    ),
    fitReady: bi(
      "Fit analysis and email draft ready — review positioning before sending any email.",
      "匹配分析与邮件草稿已就绪 — 发送前请审阅定位。"
    ),
    pdfExtracted: (pages: number, name: string, chars: string) =>
      bi(
        `Extracted ${pages} pages from "${name}" (${chars} chars). Review text, then click Generate Paper Card.`,
        `已从「${name}」提取 ${pages} 页（${chars} 字符）。请审阅文本后点击生成论文卡片。`
      ),
    paperCardGenerated: (groundingNote: string) =>
      bi(
        `Paper card generated — human-in-the-loop review recommended.${groundingNote}`,
        `论文卡片已生成 — 建议人工审阅。${groundingNote}`
      ),
    groundingVerified: (v: number, t: number, hasUnverified: boolean) => {
      const en = ` Source grounding: ${v}/${t} verified quotes${hasUnverified ? " — some need review" : ""}.`;
      const zh = ` 来源核对：${v}/${t} 条引用已核对${hasUnverified ? " — 部分待审阅" : ""}。`;
      return bi(en.trim(), zh.trim());
    },
    noQuotesReturned: bi(
      " No evidence quotes returned — add quotes manually if needed.",
      " 未返回证据引用 — 可按需手动添加。"
    ),
  },
} as const;

export const STEP_MESSAGES: Record<WorkflowStepId, string> = {
  upload: bi(
    "Upload PDF or paste text — review before generating.",
    "上传 PDF 或粘贴文本 — 生成前请审阅。"
  ),
  parse: bi(
    "Parsing document structure — missing fields stay as unknown.",
    "解析文档结构 — 缺失字段保持为 unknown。"
  ),
  analyze: bi(
    "Generating structured paper cards with evidence quotes.",
    "生成带证据引用的结构化论文卡片。"
  ),
  synthesize: bi(
    "Synthesizing professor-level research map from cards.",
    "从卡片合成导师级研究图谱。"
  ),
  draft: bi(
    "Drafting fit analysis and RA outreach email.",
    "撰写匹配分析与 RA 外联邮件。"
  ),
  export: bi(
    "Export Markdown brief for final human review.",
    "导出 Markdown 简报供最终人工审阅。"
  ),
};

export const WORKFLOW_STEPS: {
  id: WorkflowStepId;
  label: string;
  description: string;
}[] = [
  {
    id: "upload",
    label: bi("Upload / Paste", "上传 / 粘贴"),
    description: bi(
      "Add paper PDF or pasted text plus your background.",
      "添加 PDF 或粘贴文本，并填写你的背景。"
    ),
  },
  {
    id: "parse",
    label: bi("Parse", "解析"),
    description: bi(
      "Extract structure without inventing missing metadata.",
      "提取结构，不编造缺失元数据。"
    ),
  },
  {
    id: "analyze",
    label: bi("Analyze", "分析"),
    description: bi(
      "Build structured paper cards with evidence quotes.",
      "构建带证据引用的结构化论文卡片。"
    ),
  },
  {
    id: "synthesize",
    label: bi("Synthesize", "合成"),
    description: bi(
      "Aggregate cards into a professor-level research map.",
      "将卡片聚合为导师级研究图谱。"
    ),
  },
  {
    id: "draft",
    label: bi("Draft", "草稿"),
    description: bi(
      "Generate fit analysis and RA outreach email draft.",
      "生成匹配分析与 RA 外联邮件草稿。"
    ),
  },
  {
    id: "export",
    label: bi("Export", "导出"),
    description: bi(
      "Export a Markdown brief for human review.",
      "导出 Markdown 简报供人工审阅。"
    ),
  },
];
