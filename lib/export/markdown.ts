import { bi, mdH2, mdH3 } from "@/lib/i18n/bi";
import type { GroundingResult } from "@/lib/grounding/verify-quotes";
import type {
  FitAnalysis,
  OutreachEmailDraft,
  PaperCard,
  ResearchMap,
} from "@/lib/types";

export interface ResearchBriefMarkdownInput {
  paperCards: PaperCard[];
  groundingResults?: Record<string, GroundingResult[]>;
  researchMap?: ResearchMap | null;
  fitAnalysis?: FitAnalysis | null;
  outreachEmailDraft?: OutreachEmailDraft | null;
  userBackground?: string;
  generatedAt?: Date;
}

function escapeInline(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\r\n/g, "\n")
    .replace(/\n/g, "  \n");
}

function displayValue(value: string): string {
  const t = value.trim();
  return t || "unknown";
}

function formatGeneratedAt(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d} ${h}:${min}`;
}

function quoteVerificationLabel(
  result: GroundingResult | undefined,
  quote: string
): string {
  if (!quote.trim()) return bi("Not checked", "未核对");
  if (!result) return bi("Not checked", "未核对");
  return result.isGrounded ? bi("Verified", "已对上") : bi("Needs review", "待核对");
}

function blockquoteLines(text: string): string {
  const lines = text.split("\n");
  return lines.map((line) => `> ${line}`).join("\n");
}

function bulletList(items: string[]): string {
  const filtered = items.map((s) => s.trim()).filter(Boolean);
  if (filtered.length === 0) return "- _None listed._\n";
  return filtered.map((item) => `- ${escapeInline(item)}`).join("\n") + "\n";
}

function sectionPaperCards(
  paperCards: PaperCard[],
  groundingResults?: Record<string, GroundingResult[]>
): string {
  if (paperCards.length === 0) {
    return mdH2("Paper Cards", "论文卡片") + "_Not generated. / 尚未生成._\n\n";
  }

  const parts: string[] = [mdH2("Paper Cards", "论文卡片")];

  paperCards.forEach((card, index) => {
    const n = index + 1;
    const grounding = groundingResults?.[card.id];

    parts.push(`### Paper ${n}: ${escapeInline(displayValue(card.title))}\n`);
    parts.push(`- **Authors:** ${escapeInline(displayValue(card.authors))}`);
    parts.push(`- **Year:** ${escapeInline(displayValue(card.year))}`);
    parts.push(`- **Venue:** ${escapeInline(displayValue(card.venue))}`);
    parts.push(`- **Problem:** ${escapeInline(card.problem || "unknown")}`);
    parts.push(`- **Motivation:** ${escapeInline(card.motivation || "unknown")}`);
    parts.push(`- **Method:** ${escapeInline(card.method || "unknown")}`);
    parts.push(`- **Pipeline:** ${escapeInline(card.pipeline || "unknown")}`);
    parts.push("- **Key Contributions:**");
    parts.push("");
    parts.push(bulletList(card.key_contributions));
    parts.push("- **Limitations:**");
    parts.push("");
    parts.push(
      card.limitations.trim()
        ? escapeInline(card.limitations) + "\n"
        : "unknown\n"
    );
    parts.push(
      `- **Useful for My Research:** ${escapeInline(card.useful_for_my_research || "unknown")}`
    );
    parts.push("\n" + mdH3("Evidence Quotes", "证据引用"));

    if (card.evidence_quotes.length === 0) {
      parts.push("_No evidence quotes._\n");
    } else {
      card.evidence_quotes.forEach((quote, qi) => {
        const gr = grounding?.[qi];
        const status = quoteVerificationLabel(gr, quote);
        if (quote.trim()) {
          parts.push(blockquoteLines(quote));
          parts.push(`\n- **Status:** ${status}\n`);
        }
      });
    }
    parts.push("");
  });

  return parts.join("\n");
}

function sectionResearchMap(map: ResearchMap | null | undefined): string {
  if (!map) {
    return mdH2("Research Map", "研究地图") + "_Not generated. / 尚未生成._\n\n";
  }

  const lines: string[] = [mdH2("Research Map", "研究地图")];

  lines.push("### Main research themes\n");
  if (map.main_research_themes.length === 0) {
    lines.push("_None listed._\n");
  } else {
    map.main_research_themes.forEach((t) => {
      lines.push(`- **${escapeInline(t.theme)}** (${t.confidence} confidence)`);
      lines.push(`  - ${escapeInline(t.description)}`);
      lines.push(`  - Supporting papers: ${t.supporting_papers.map(escapeInline).join("; ") || "unknown"}`);
    });
    lines.push("");
  }

  lines.push("### Recurring methods\n");
  if (map.recurring_methods.length === 0) {
    lines.push("_None listed._\n");
  } else {
    map.recurring_methods.forEach((m) => {
      lines.push(`- **${escapeInline(m.method)}**`);
      lines.push(`  - ${escapeInline(m.description)}`);
      lines.push(`  - Supporting papers: ${m.supporting_papers.map(escapeInline).join("; ") || "unknown"}`);
    });
    lines.push("");
  }

  lines.push("### Representative papers\n");
  if (map.representative_papers.length === 0) {
    lines.push("_None listed._\n");
  } else {
    map.representative_papers.forEach((p) => {
      lines.push(`- **${escapeInline(p.title)}** — ${escapeInline(p.why_representative)}`);
    });
    lines.push("");
  }

  lines.push("### Evolution over time\n");
  lines.push(bulletList(map.evolution_over_time));

  lines.push("### Open questions\n");
  lines.push(bulletList(map.open_questions));

  lines.push("### Possible RA entry points\n");
  lines.push(bulletList(map.possible_RA_entry_points));

  lines.push("### Risks or gaps\n");
  lines.push(bulletList(map.risks_or_gaps));

  lines.push("### Suggested reading order\n");
  if (map.suggested_reading_order.length === 0) {
    lines.push("_None listed._\n");
  } else {
    map.suggested_reading_order.forEach((r, i) => {
      lines.push(`${i + 1}. **${escapeInline(r.title)}** — ${escapeInline(r.reason)}`);
    });
    lines.push("");
  }

  return lines.join("\n") + "\n";
}

function sectionFitAnalysis(fit: FitAnalysis | null | undefined): string {
  if (!fit) {
    return mdH2("Fit Analysis", "契合度") + "_Not generated. / 尚未生成._\n\n";
  }

  const lines: string[] = [mdH2("Fit Analysis", "契合度")];

  lines.push("### Strongest match points\n");
  if (fit.strongest_match_points.length === 0) {
    lines.push("_None listed._\n");
  } else {
    fit.strongest_match_points.forEach((s, i) => {
      lines.push(`${i + 1}. **${escapeInline(s.point)}**`);
      lines.push(`   - Evidence (you): ${escapeInline(s.evidence_from_user)}`);
      lines.push(`   - Evidence (map): ${escapeInline(s.evidence_from_research_map)}`);
      lines.push(`   - In email: ${escapeInline(s.how_to_use_in_email)}`);
    });
    lines.push("");
  }

  lines.push("### Weaker match points\n");
  if (fit.weaker_match_points.length === 0) {
    lines.push("_None listed._\n");
  } else {
    fit.weaker_match_points.forEach((w, i) => {
      lines.push(`${i + 1}. **${escapeInline(w.point)}**`);
      lines.push(`   - Why weak: ${escapeInline(w.why_weak)}`);
      lines.push(`   - Frame carefully: ${escapeInline(w.how_to_frame_carefully)}`);
    });
    lines.push("");
  }

  lines.push("### Risks or gaps\n");
  lines.push(bulletList(fit.risks_or_gaps));

  lines.push(`### Suggested positioning\n\n${escapeInline(fit.suggested_positioning)}\n`);

  lines.push(
    `### Recommended outreach angle\n\n${escapeInline(fit.recommended_outreach_angle)}\n`
  );

  lines.push("### Questions to ask professor\n");
  lines.push(bulletList(fit.questions_to_ask_professor));

  return lines.join("\n") + "\n";
}

function sectionOutreachEmail(email: OutreachEmailDraft | null | undefined): string {
  if (!email) {
    return mdH2("Outreach Email Draft", "套磁邮件草稿") + "_Not generated. / 尚未生成._\n\n";
  }

  const lines: string[] = [mdH2("Outreach Email Draft", "套磁邮件草稿")];

  lines.push(`**Subject:** ${escapeInline(email.subject)}\n`);

  lines.push("### Full email\n");
  lines.push("```text");
  lines.push(email.full_email.replace(/\r\n/g, "\n"));
  lines.push("```\n");

  lines.push("### Sections\n");
  lines.push(`- **Greeting:** ${escapeInline(email.greeting)}`);
  lines.push(`- **Opening:** ${escapeInline(email.opening)}`);
  lines.push(
    `- **Paper-specific paragraph:** ${escapeInline(email.paper_specific_paragraph)}`
  );
  lines.push(
    `- **Self-positioning paragraph:** ${escapeInline(email.self_positioning_paragraph)}`
  );
  lines.push(
    `- **Proposed RA contribution:** ${escapeInline(email.proposed_RA_contribution)}`
  );
  lines.push(
    `- **Availability / next step:** ${escapeInline(email.availability_or_next_step)}`
  );
  lines.push(`- **Closing:** ${escapeInline(email.closing)}\n`);

  return lines.join("\n") + "\n";
}

function sectionReviewChecklist(): string {
  return `${mdH2("Review Checklist", "发信前自查")}- [ ] ${bi("Verify paper titles and metadata", "论文标题和元数据对不对")}
- [ ] ${bi("Review unverified evidence quotes", "没对上的引用逐条看过")}
- [ ] ${bi("Confirm the email does not overstate fit", "邮件有没有把契合度吹过头")}
- [ ] ${bi("Customize professor name and greeting", "教授姓名和称呼改对了")}
- [ ] ${bi("Add real availability before sending", "可联系时间写的是真的")}
- [ ] ${bi("Review tone before sending", "语气再过一遍")}

`;
}

export function buildResearchBriefMarkdown(
  input: ResearchBriefMarkdownInput
): string {
  const generatedAt = input.generatedAt ?? new Date();
  const bg = input.userBackground?.trim();

  const sections = [
    "# Research Brief / 研究简报\n",
    `${bi("Generated at", "生成于")}: ${formatGeneratedAt(generatedAt)}\n`,
    mdH2("User Background", "个人背景"),
    bg ? `${escapeInline(bg)}\n` : "_Not provided. / 未填写._\n",
    "",
    sectionPaperCards(input.paperCards, input.groundingResults),
    sectionResearchMap(input.researchMap),
    sectionFitAnalysis(input.fitAnalysis),
    sectionOutreachEmail(input.outreachEmailDraft),
    sectionReviewChecklist(),
    "_Exported from Research Brief Builder / 由Research Brief Builder导出。Draft for human review — not auto-sent. / 草稿，发信前你自己定稿，系统不会替你发送。_\n",
  ];

  return sections.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
