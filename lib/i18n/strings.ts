import { bi } from "@/lib/i18n/bi";
import type { WorkflowStepId } from "@/lib/types";

export const STR = {
  app: {
    title: "Research Brief Builder",
    tagline: bi(
      "From papers to professor brief to RA outreach draft",
      "读完论文，理清导师方向，再写套磁草稿"
    ),
    subtitle: bi(
      "AI-native workflow · structured artifacts · human-in-the-loop review",
      "分步产出、对照原文核对，每一步都要你点头"
    ),
  },
  toolbar: {
    phase6Title: "Phase 6",
    phase6Desc: bi(
      "Export Markdown when ready — portable handoff for Obsidian, GitHub, or email prep. Not auto-sent.",
      "写好就导出Markdown，拷到Obsidian或邮件里改；不会替你发信"
    ),
  },
  inputs: {
    heading: bi("Inputs", "输入"),
    subheading: bi(
      "Upload PDF or paste text · then generate manually",
      "上传PDF或粘贴正文，准备好了再点生成"
    ),
    uploadPdf: bi("Upload PDF", "上传PDF"),
    pastePaper: bi("Paste paper text", "粘贴论文正文"),
    pasteHint: bi(
      "Review or clean the extracted text before generating a Paper Card.",
      "生成卡片前先通读提取结果，不对的地方自己改"
    ),
    pastePlaceholder: bi(
      "Paste abstract, intro, full text, or upload a PDF above…",
      "粘贴摘要、引言或全文，或在上方上传PDF…"
    ),
    groundingHint: bi(
      "Uses pasted/extracted text + your background · source grounding on quotes",
      "按粘贴正文和你的背景生成；引用会回原段落核对"
    ),
    yourBackground: bi("Your background", "你的背景"),
  },
  pdf: {
    chooseFile: bi("Choose PDF file", "选择PDF"),
    extracting: bi("Extracting text…", "正在提取…"),
    disclaimer: bi(
      "PDF extraction quality may vary. Review or clean the extracted text before generating a Paper Card. Upload does not call the LLM.",
      "扫描版PDF容易抽乱，抽完务必自己校对。上传不会自动调模型"
    ),
    pages: bi("Pages", "页"),
    chars: bi("Chars", "字符"),
    words: bi("Words", "词"),
    statusIdle: bi("Idle", "待选"),
    statusExtracting: bi("Extracting", "提取中"),
    statusExtracted: bi("Extracted", "已提取"),
    statusFailed: bi("Failed", "失败"),
    extractionFailedTitle: bi("PDF extraction failed", "PDF提取失败"),
    truncated: (max: string) =>
      bi(
        `Text was truncated to ${max} characters for API limits.`,
        `正文超过上限，已截断到${max}字符`
      ),
    extractFailed: bi("PDF extraction failed.", "PDF提取失败"),
  },
  buttons: {
    simulate: bi("Simulate workflow", "模拟全流程"),
    simulateRunning: bi("Running workflow…", "演示运行中…"),
    generatePaperCard: bi("Generate Paper Card", "生成论文卡片"),
    generating: bi("Generating…", "生成中…"),
    synthesizeMap: bi("Synthesize Research Map", "合成研究地图"),
    synthesizingMap: bi("Synthesizing…", "合成中…"),
    generateFitEmail: bi("Generate Fit & Email", "生成契合度与邮件"),
    generatingFitEmail: bi("Generating…", "生成中…"),
    exportMarkdown: bi("Export Markdown", "导出Markdown"),
    copyClipboard: bi("Copy to clipboard", "复制到剪贴板"),
    resetEmpty: bi("Reset to empty", "清空重来"),
    previewError: bi("Preview error state", "预览报错态"),
    clearError: bi("Clear error", "清除报错"),
  },
  tabs: {
    paperCards: bi("Paper Cards", "论文卡片"),
    researchMap: bi("Research Map", "研究地图"),
    fitAnalysis: bi("Fit Analysis", "契合度"),
    outreachEmail: bi("Outreach Email", "套磁邮件"),
  },
  status: {
    heading: bi("Status", "状态"),
    loading: bi("Loading", "加载中"),
    error: bi("Error", "出错"),
    ready: bi("Ready", "就绪"),
    empty: bi("Empty", "空"),
    workflowProgress: bi("Workflow progress", "流程进度"),
    currentStep: bi("Current step", "当前步骤"),
    mockPipelineError: bi(
      "Mock pipeline failed at the current step. Retry simulation or reset to empty.",
      "演示在这一步失败了，重新模拟或清空重来"
    ),
    exportHint: bi(
      "Download .md or copy for Obsidian / Notion / email prep.",
      "可下载.md，也可复制到Obsidian、Notion里继续改"
    ),
    exportNeedArtifact: bi(
      "Add at least one artifact to export.",
      "至少生成一项内容后再导出"
    ),
    demoControls: bi("Demo controls", "演示控件"),
  },
  empty: {
    noPaperCards: bi("No paper cards yet", "还没有论文卡片"),
    noPaperCardsDesc: bi(
      "Paste paper text and click Generate Paper Card, or run Simulate workflow.",
      "左边贴上论文正文，点「生成论文卡片」；想快速看全流程就点「模拟全流程」"
    ),
    noResearchMap: bi("No research map yet", "还没有研究地图"),
    noResearchMapDesc: bi(
      "Add paper cards, then click Synthesize Research Map. Simulate workflow loads a mock map.",
      "先有论文卡片，再点「合成研究地图」；模拟全流程会载入示例地图"
    ),
    noFit: bi("No fit analysis yet", "还没有契合度分析"),
    noFitDesc: bi(
      "Synthesize a research map, add background, then click Generate Fit & Email.",
      "合成研究地图、写好个人背景后，再点「生成契合度与邮件」"
    ),
    noEmail: bi("No outreach draft yet", "还没有邮件草稿"),
    noEmailDesc: bi(
      "Generate Fit & Email from the Fit Analysis tab after reviewing positioning.",
      "在「契合度」页把定位想清楚，再点「生成契合度与邮件」"
    ),
  },
  workspace: {
    mapHint: bi(
      "Synthesizes professor-level themes from paper cards — review and edit before outreach.",
      "从卡片归纳教授的研究主线，发信前自己改一遍"
    ),
    fitHint: bi(
      "Paper cards + research map + background → fit analysis → email draft.",
      "论文卡片→研究地图→背景→契合度→邮件草稿"
    ),
    tabLoading: bi("Loading…", "加载中…"),
    tabErrorGeneric: bi(
      "Something went wrong. Check the left panel or Status, then retry.",
      "出了点问题，看左侧输入或右侧状态，再试一次"
    ),
    draftBadge: bi("Draft — not sent", "草稿，不会发出"),
  },
  grounding: {
    sourceGrounding: bi("Source grounding", "对照原文"),
    evidenceLabel: bi("Evidence quotes · source grounding", "引用摘录·对照原文"),
    verifiedCount: (v: number, t: number) =>
      bi(
        `${v} / ${t} evidence quotes verified in source`,
        `对照正文：${v}/${t}条引用能对上`
      ),
    noQuotes: bi("No evidence quotes yet", "还没有引用"),
    unverifiedAlert: bi(
      "Some evidence quotes were not found in the pasted text. Please review before using this brief — human-in-the-loop check recommended.",
      "有几条引用在粘贴正文里找不到，用这份简报发信前务必自己核对"
    ),
    editQuotes: bi("Edit evidence quotes", "改引用"),
    editHint: bi(
      "Quotes are re-checked against pasted paper text when you edit. Verified = exact or normalized match in source.",
      "你一改就会重新对照正文；「已核对」表示原文里能搜到（含略去标点的匹配）"
    ),
    emptyQuote: bi("Empty", "空"),
    verifiedQuote: bi("Verified quote", "已对上"),
    needsReview: bi("Needs review", "待你核对"),
    normalized: bi("normalized", "模糊匹配"),
    emptyLine: bi("(empty line)", "（空行）"),
  },
  paperCard: {
    paperN: (n: number) => bi(`Paper ${n}`, `论文${n}`),
    authors: bi("Authors", "作者"),
    year: bi("Year", "年份"),
    venue: bi("Venue", "发表信息"),
    title: bi("Title", "标题"),
    problem: bi("Problem", "问题"),
    motivation: bi("Motivation", "动机"),
    method: bi("Method", "方法"),
    pipeline: bi("Pipeline", "流程"),
    keyContributions: bi("Key contributions", "主要贡献"),
    limitations: bi("Limitations", "局限"),
    usefulForResearch: bi("Useful for my research", "对我有什么用"),
    evidenceQuotes: bi("Evidence quotes", "引用摘录"),
    authorsEdit: bi("Authors (edit)", "作者（可改）"),
    yearEdit: bi("Year (edit)", "年份（可改）"),
    venueEdit: bi("Venue (edit)", "发表信息（可改）"),
  },
  fitEmail: {
    backgroundShort: bi(
      "Add more background to generate a more specific fit analysis and outreach email.",
      "背景写详细些，契合度和邮件才会更贴你"
    ),
    backgroundTooShort: bi(
      "Add more background (at least 80 characters) to generate fit analysis and outreach email.",
      "个人背景至少80字，才能生成契合度分析和套磁草稿"
    ),
    singleCardWarning: bi(
      "Email specificity may improve with more PaperCards.",
      "多几张论文卡片，邮件会写得更具体"
    ),
    needPaperCard: bi("Add at least one paper card first.", "请先有一张论文卡片"),
    needMap: bi("Synthesize a research map first.", "请先合成研究地图"),
    needBackground: bi("Add your background in the left panel.", "请在左侧写好个人背景"),
    cannotGenerate: bi("Cannot generate.", "暂时生成不了"),
    missingResponse: bi(
      "Response missing fit analysis or email draft.",
      "返回里缺契合度或邮件草稿"
    ),
    requestFailed: (status: number) =>
      bi(`Request failed (${status}).`, `请求失败（${status}）`),
  },
  researchMap: {
    singleCardQuality: bi(
      "Research maps are stronger with 2–5 paper cards.",
      "研究地图最好有2–5张论文卡片撑着"
    ),
    apiFewCards: bi(
      "Only one paper card was provided. Themes may be narrow; add more cards for a stronger map.",
      "目前只有一张卡片，主题可能偏窄；多加几篇会更稳"
    ),
    singleCardHint: bi(
      "Synthesis works best with 2+ paper cards; single-card map may be shallow.",
      "建议至少2张卡片；只有一张时地图可能偏浅"
    ),
    highConfidence: bi("high confidence", "把握大"),
    mediumConfidence: bi("medium confidence", "中等"),
    lowConfidence: bi("low confidence", "较虚"),
    noSupporting: bi("No supporting papers", "暂无对应论文"),
    cardTitle: bi("Professor research map", "教授研究地图"),
    cardSubtitle: bi(
      "Synthesized from paper cards · human-in-the-loop review",
      "由论文卡片归纳·发信前自己改"
    ),
    mainThemes: bi("Main research themes", "研究主线"),
    recurringMethods: bi("Recurring methods", "常用方法"),
    representativePapers: bi("Representative papers", "代表论文"),
    themeN: (n: number) => bi(`Theme ${n}`, `主题${n}`),
    methodN: (n: number) => bi(`Method ${n}`, `方法${n}`),
    paperN: (n: number) => bi(`Paper ${n}`, `论文${n}`),
    theme: bi("Theme", "主题"),
    description: bi("Description", "说明"),
    supportingPapers: bi("Supporting papers (source)", "对应论文"),
    editSupporting: bi("Edit supporting paper titles", "改对应论文标题"),
    method: bi("Method", "方法"),
    whyRepresentative: bi("Why representative", "为何有代表性"),
    title: bi("Title", "标题"),
    reason: bi("Reason", "理由"),
    remove: bi("Remove", "删除"),
    addTheme: bi("Add theme", "加一条主题"),
    addMethod: bi("Add method", "加一条方法"),
    addRepresentative: bi("Add representative paper", "加一篇代表论文"),
    addReading: bi("Add reading item", "加一条阅读顺序"),
    evolution: bi("Evolution over time", "方向演变"),
    openQuestions: bi("Open questions", "开放问题"),
    raEntry: bi("Possible RA entry points", "可能的RA切入点"),
    risksGaps: bi("Risks or gaps", "风险与空白"),
    readingOrder: bi("Suggested reading order", "建议阅读顺序"),
    confidenceAria: bi("Theme confidence", "主题把握程度"),
  },
  outreach: {
    cardTitle: bi("RA outreach email draft", "套磁邮件草稿"),
    reviewHint: bi(
      "Review and edit before sending. Human-in-the-loop required.",
      "发之前自己改一遍，系统不会替你点发送"
    ),
    subject: bi("Subject", "主题"),
    greeting: bi("Greeting", "称呼"),
    opening: bi("Opening", "开场"),
    paperParagraph: bi("Paper-specific paragraph", "结合论文的一段"),
    selfPositioning: bi("Self positioning", "怎么介绍自己"),
    proposedContribution: bi("Proposed RA contribution", "能做什么"),
    availability: bi("Availability / next step", "时间/下一步"),
    closing: bi("Closing", "收尾"),
    fullEmail: bi("Full email (final draft)", "整封邮件（终稿）"),
  },
  fitFields: {
    point: bi("Point", "要点"),
    evidenceYou: bi("Evidence from you", "你这边的依据"),
    evidenceMap: bi("Evidence from research map", "地图里的依据"),
    howInEmail: bi("How to use in email", "写进邮件怎么用"),
    whyWeak: bi("Why weak", "弱在哪"),
    frameCarefully: bi("How to frame carefully", "怎么写才不冒进"),
    suggestedPositioning: bi("Suggested positioning", "建议怎么定位"),
    recommendedAngle: bi("Recommended outreach angle", "建议切入角度"),
    strongestMatches: bi("Strongest match points", "最贴的几条"),
    weakerMatches: bi("Weaker match points", "偏弱的几条"),
    risksGaps: bi("Risks or gaps", "风险与缺口"),
    questionsProfessor: bi("Questions to ask professor", "可以问教授的问题"),
    strongMatchN: (n: number) => bi(`Strong match ${n}`, `强匹配${n}`),
    weakMatchN: (n: number) => bi(`Weaker match ${n}`, `弱匹配${n}`),
  },
  unknown: {
    value: bi("unknown", "未知"),
  },
  export: {
    needArtifact: bi(
      "Add a paper card, research map, fit analysis, or email draft to export.",
      "有论文卡片、研究地图、契合度或邮件草稿后再导出"
    ),
    exported: (filename: string) =>
      bi(
        `Markdown exported (${filename}). Review before sending any email.`,
        `已导出Markdown（${filename}），发信前再自己看一遍`
      ),
    copied: bi(
      "Markdown copied to clipboard. Review before sending any email.",
      "Markdown已复制到剪贴板，发信前再自己看一遍"
    ),
    copyFailed: bi(
      "Could not copy to clipboard. Try Export Markdown or allow clipboard access.",
      "复制失败，试试导出Markdown，或允许浏览器访问剪贴板"
    ),
  },
  messages: {
    workflowComplete: bi(
      "Workflow complete — all artifacts are editable. Export or copy when ready.",
      "流程跑完了，中间结果都能改；满意再导出或复制"
    ),
    callingLlm: bi(
      "Calling LLM — personalized card + source grounding check…",
      "正在调模型生成卡片，并核对引用是否出自粘贴正文…"
    ),
    paperCardReady: bi(
      "Paper card ready — edit fields or run Simulate workflow for full mock.",
      "卡片好了，字段都能改；要看完整示例就点「模拟全流程」"
    ),
    demoError: bi(
      "Demo error state — for UI review only.",
      "演示用的报错界面，不是真故障"
    ),
    synthesizingMap: bi(
      "Synthesizing professor-level research map from paper cards…",
      "正在从论文卡片归纳教授的研究地图…"
    ),
    mapReady: bi(
      "Research map synthesized — review themes, confidence, and supporting papers before outreach.",
      "研究地图好了，发信前把主题、把握程度和对应论文过一遍"
    ),
    generatingFit: bi(
      "Generating fit analysis and RA outreach email draft…",
      "正在写契合度分析和套磁邮件草稿…"
    ),
    fitReady: bi(
      "Fit analysis and email draft ready — review positioning before sending any email.",
      "契合度和邮件草稿好了，发信前把定位再捋一遍"
    ),
    pdfExtracted: (pages: number, name: string, chars: string) =>
      bi(
        `Extracted ${pages} pages from "${name}" (${chars} chars). Review text, then click Generate Paper Card.`,
        `从「${name}」抽出${pages}页、${chars}字符；先审正文，再点「生成论文卡片」`
      ),
    paperCardGenerated: (groundingNote: string) =>
      bi(
        `Paper card generated — human-in-the-loop review recommended.${groundingNote}`,
        `卡片已生成，建议自己过一遍。${groundingNote}`
      ),
    groundingVerified: (v: number, t: number, hasUnverified: boolean) => {
      const en = `Source grounding: ${v}/${t} verified quotes${hasUnverified ? " — some need review" : ""}.`;
      const zh = `引用核对：${v}/${t}条能对上${hasUnverified ? "，还有几条要你亲自看" : ""}`;
      return bi(en, zh);
    },
    noQuotesReturned: bi(
      "No evidence quotes returned — add quotes manually if needed.",
      "模型没给引用，需要的话自己补几条"
    ),
  },
} as const;

export const STEP_MESSAGES: Record<WorkflowStepId, string> = {
  upload: bi(
    "Upload PDF or paste text — review before generating.",
    "上传PDF或粘贴正文，生成前先审一遍"
  ),
  parse: bi(
    "Parsing document structure — missing fields stay as unknown.",
    "解析文档结构，缺的元数据标成unknown"
  ),
  analyze: bi(
    "Generating structured paper cards with evidence quotes.",
    "生成带引用摘录的结构化论文卡片"
  ),
  synthesize: bi(
    "Synthesizing professor-level research map from cards.",
    "从卡片归纳教授的研究地图"
  ),
  draft: bi(
    "Drafting fit analysis and RA outreach email.",
    "写契合度分析和套磁邮件草稿"
  ),
  export: bi(
    "Export Markdown brief for final human review.",
    "导出Markdown简报，发信前最后一遍自己看"
  ),
};

export const WORKFLOW_STEPS: {
  id: WorkflowStepId;
  label: string;
  description: string;
}[] = [
  {
    id: "upload",
    label: bi("Upload / Paste", "上传/粘贴"),
    description: bi(
      "Add paper PDF or pasted text plus your background.",
      "放上PDF或粘贴正文，并写好你的背景"
    ),
  },
  {
    id: "parse",
    label: bi("Parse", "解析"),
    description: bi(
      "Extract structure without inventing missing metadata.",
      "只提取结构，缺的字段不瞎编"
    ),
  },
  {
    id: "analyze",
    label: bi("Analyze", "分析"),
    description: bi(
      "Build structured paper cards with evidence quotes.",
      "做成带引用摘录的论文卡片"
    ),
  },
  {
    id: "synthesize",
    label: bi("Synthesize", "合成"),
    description: bi(
      "Aggregate cards into a professor-level research map.",
      "把多张卡片合成教授的研究地图"
    ),
  },
  {
    id: "draft",
    label: bi("Draft", "草稿"),
    description: bi(
      "Generate fit analysis and RA outreach email draft.",
      "写契合度分析和套磁邮件草稿"
    ),
  },
  {
    id: "export",
    label: bi("Export", "导出"),
    description: bi(
      "Export a Markdown brief for human review.",
      "导出Markdown，发信前自己定稿"
    ),
  },
];
