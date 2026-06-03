# MVP Spec (Implemented)

> **Language / 语言:** Each major section has **English** then **中文** (or inline `EN / 中文` for short items). **中文排版（zhNormalize）：** 保留的英文与数字前后不加空格（如：导出Markdown、至少80字、Phase1–6）。

---

## English

Status: **Phases 1–6 complete** (local web app, client-first, OpenAI on server routes only).

### Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui (minimal set) |
| State | React local state (no DB) |
| LLM | OpenAI API (`gpt-4o-mini` default) via Route Handlers |
| PDF | `pdfjs-dist` (client-side extraction) |
| Export | Client-side Markdown build + download / clipboard |

Dependencies stay minimal: no auth, no vector DB, no email SDK.

### Architecture

```
Browser (React)
  ├── PDF extract (pdf.js)
  ├── Source grounding verify (client)
  ├── Markdown export / copy (client)
  └── fetch → /api/paper-card | /api/research-map | /api/fit-email

Next.js Route Handlers
  └── OpenAI structured output (Zod validate)
```

No server file storage. PDFs never uploaded to the server.

### Layout

1. **Header** — Research Brief Builder + tagline  
2. **Toolbar** — Simulate workflow + phase hint  
3. **Workflow stepper** — Upload/Paste → Parse → Analyze → Synthesize → Draft → Export  
4. **Left panel** — PDF upload, paste text, user background, Generate Paper Card  
5. **Main tabs** — Paper Cards | Research Map | Fit Analysis | Outreach Email  
6. **Right panel (Status)** — progress, messages, Export Markdown, Copy to clipboard, demo controls  

### User-Triggered Actions (Not Automatic)

| Action | Trigger | API |
|--------|---------|-----|
| Generate Paper Card | Button (paste ≥100 chars) | `POST /api/paper-card` |
| Synthesize Research Map | Button (≥1 paper card) | `POST /api/research-map` |
| Generate Fit & Email | Button (cards + map + background ≥80) | `POST /api/fit-email` |
| Export / Copy Markdown | Button (≥1 artifact) | Client only |

PDF upload **only fills** the paste area — it does **not** call the LLM.

### Core Data Objects

#### PaperCard

| Field | Notes |
|-------|--------|
| id, title, authors, year, venue | `unknown` if missing |
| problem, motivation, method, pipeline | Text |
| key_contributions | string[] |
| limitations, useful_for_my_research | Text |
| evidence_quotes | string[]; grounded client-side vs pasted text |

#### ResearchMap (Phase 4 schema)

| Field | Shape |
|-------|--------|
| main_research_themes | `{ theme, description, supporting_papers[], confidence: high\|medium\|low }[]` |
| recurring_methods | `{ method, description, supporting_papers[] }[]` |
| representative_papers | `{ title, why_representative }[]` |
| evolution_over_time | string[] |
| open_questions, possible_RA_entry_points, risks_or_gaps | string[] |
| suggested_reading_order | `{ title, reason }[]` |

#### FitAnalysis (Phase 5 schema)

| Field | Shape |
|-------|--------|
| strongest_match_points | `{ point, evidence_from_user, evidence_from_research_map, how_to_use_in_email }[]` |
| weaker_match_points | `{ point, why_weak, how_to_frame_carefully }[]` |
| risks_or_gaps | string[] |
| suggested_positioning, recommended_outreach_angle | string |
| questions_to_ask_professor | string[] |

#### OutreachEmailDraft (Phase 5 schema)

| Field | Notes |
|-------|--------|
| subject, greeting, opening | |
| paper_specific_paragraph, self_positioning_paragraph | |
| proposed_RA_contribution, availability_or_next_step, closing | |
| full_email | Complete draft in one block |

### UX Requirements (Enforced)

- Visible workflow steps; **not** a chatbot UI  
- All LLM outputs **editable** in place  
- **empty / loading / error** per tab where relevant  
- Missing paper metadata → **`unknown`** (muted badge in UI)  
- Evidence quotes → **Verified** / **Needs review** (source grounding)  
- Email is **draft only** — never auto-sent  

### Phase Summary (Shipped)

#### Phase 1 — Mock UI ✅

- Full layout, simulate workflow (fake loading → mock artifacts)  
- Editable cards, stepper, four tabs  

#### Phase 2 — Paper Card (LLM) ✅

- `POST /api/paper-card` `{ paperText, userBackground? }`  
- Zod schema + structured output  
- Separate from Simulate  

#### Phase 2.5 — Grounding + background ✅

- `verifyEvidenceQuotes()` — exact / normalized / not_found  
- `groundingResults` in API response; UI badges  
- `useful_for_my_research` uses optional user background  

#### Phase 3 — PDF upload ✅

- Client `pdfjs-dist`, max 15MB  
- Page separators `--- Page N ---`  
- Fills paste area; user reviews before Generate  

#### Phase 4 — Research Map ✅

- `POST /api/research-map` `{ paperCards, userBackground? }`  
- Rich map schema; confidence + supporting paper badges  
- Warning if &lt;2 paper cards  

#### Phase 5 — Fit & Email ✅

- `POST /api/fit-email` `{ paperCards, researchMap, userBackground }` (background required, ≥80 chars)  
- Structured fit + segmented email + `full_email`  
- Human-in-the-loop before any real send  

#### Phase 6 — Markdown export ✅

- `buildResearchBriefMarkdown()` + download `research-brief-YYYY-MM-DD.md`  
- Review checklist in export  
- **Copy to clipboard** (no backend)  

### API Environment Variables

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini   # optional
```

### Interview Demo Path (30s, No API Key)

1. **Simulate workflow** — six steps, mock data  
2. Skim **Paper Cards** / **Research Map** / **Fit** / **Email** tabs  
3. **Export Markdown** or **Copy to clipboard**  
4. Say: staged artifacts, grounding, human review, portable handoff — not a chat wrapper  

### Interview Demo Path (With API Key)

1. Paste paper text → **Generate Paper Card** (show grounding)  
2. **Synthesize Research Map** (2+ cards ideal)  
3. **Generate Fit & Email**  
4. **Export Markdown**  

### Non-Goals (Still Out of Scope)

- Google Scholar / professor homepage scraping  
- Email send, Gmail, auth, payments  
- Multi-user backend, vector DB, SQLite persistence  
- PDF export, server-side PDF storage  

### File Map (Key Paths)

```
app/api/paper-card/route.ts
app/api/research-map/route.ts
app/api/fit-email/route.ts
lib/schemas/
lib/export/markdown.ts
lib/pdf/extract-pdf-text.ts
lib/grounding/verify-quotes.ts
components/home-page.tsx
```

---

## 中文

状态：**Phase1–6 已完成**（本地Web应用，偏客户端，OpenAI只走服务端路由）。

### 技术栈

| 层级 | 选型 |
|------|------|
| 框架 | Next.js 16 App Router |
| 语言 | TypeScript |
| 样式 | Tailwind CSS + shadcn/ui（最小集合） |
| 状态 | React本地状态（无数据库） |
| LLM | OpenAI API（默认 `gpt-4o-mini`）经Route Handlers |
| PDF | `pdfjs-dist`（客户端提取） |
| 导出 | 客户端拼Markdown + 下载/剪贴板 |

依赖尽量瘦：无登录、无向量库、无邮件SDK。

### 架构

```
Browser (React)
  ├── PDF extract (pdf.js)
  ├── Source grounding verify (client)
  ├── Markdown export / copy (client)
  └── fetch → /api/paper-card | /api/research-map | /api/fit-email

Next.js Route Handlers
  └── OpenAI structured output (Zod validate)
```

服务端不存文件。PDF不会上传到服务器。

### 布局

1. **Header / 页头** — Research Brief Builder + 标语  
2. **Toolbar / 工具栏** — Simulate workflow + 当前阶段提示  
3. **Workflow stepper / 步骤条** — Upload/Paste → Parse → Analyze → Synthesize → Draft → Export  
4. **Left panel / 左侧** — PDF上传、粘贴文本、用户背景、Generate Paper Card  
5. **Main tabs / 主区** — Paper Cards | Research Map | Fit Analysis | Outreach Email  
6. **Right panel (Status) / 右侧状态** — 进度、消息、Export Markdown、Copy to clipboard、演示控件  

### 用户触发的操作（不会自动跑）

| 操作 | 触发条件 | API |
|------|----------|-----|
| Generate Paper Card / 生成论文卡片 | 按钮（粘贴≥100字） | `POST /api/paper-card` |
| Synthesize Research Map / 合成研究地图 | 按钮（≥1张论文卡片） | `POST /api/research-map` |
| Generate Fit & Email / 生成匹配与邮件 | 按钮（卡片+地图+背景≥80字） | `POST /api/fit-email` |
| Export / Copy Markdown / 导出/复制Markdown | 按钮（至少有一份输出） | 仅客户端 |

PDF上传**只填**粘贴区 — **不会**自动调LLM。

### 核心数据对象

#### PaperCard / 论文卡片

| 字段 | 说明 |
|------|------|
| id, title, authors, year, venue | 缺了就用 `unknown` |
| problem, motivation, method, pipeline | 文本 |
| key_contributions | string[] |
| limitations, useful_for_my_research | 文本 |
| evidence_quotes | string[]；客户端对照粘贴文本做grounding |

#### ResearchMap（Phase4 schema）

| 字段 | 结构 |
|------|------|
| main_research_themes | `{ theme, description, supporting_papers[], confidence: high\|medium\|low }[]` |
| recurring_methods | `{ method, description, supporting_papers[] }[]` |
| representative_papers | `{ title, why_representative }[]` |
| evolution_over_time | string[] |
| open_questions, possible_RA_entry_points, risks_or_gaps | string[] |
| suggested_reading_order | `{ title, reason }[]` |

#### FitAnalysis（Phase5 schema）

| 字段 | 结构 |
|------|------|
| strongest_match_points | `{ point, evidence_from_user, evidence_from_research_map, how_to_use_in_email }[]` |
| weaker_match_points | `{ point, why_weak, how_to_frame_carefully }[]` |
| risks_or_gaps | string[] |
| suggested_positioning, recommended_outreach_angle | string |
| questions_to_ask_professor | string[] |

#### OutreachEmailDraft（Phase5 schema）

| 字段 | 说明 |
|------|------|
| subject, greeting, opening | |
| paper_specific_paragraph, self_positioning_paragraph | |
| proposed_RA_contribution, availability_or_next_step, closing | |
| full_email | 整封草稿（一块文本） |

### UX要求（已落实）

- 工作流步骤看得见；**不是**聊天界面  
- LLM输出**当场能改**  
- 各标签页该有的 **empty / loading / error** 都要有  
- 论文元数据缺了 → **`unknown`**（UI里灰色徽章）  
- 证据引文 → **Verified / 已验证** / **Needs review / 待核对**（对照原文）  
- 邮件**只是草稿** — 不会自动发  

### 阶段摘要（已交付）

#### Phase1 — Mock UI ✅

- 完整布局，Simulate workflow（假加载 → mock数据）  
- 卡片可改、步骤条、四个标签页  

#### Phase2 — Paper Card（LLM）✅

- `POST /api/paper-card` `{ paperText, userBackground? }`  
- Zod schema + 结构化输出  
- 和Simulate分开  

#### Phase2.5 — grounding + 背景 ✅

- `verifyEvidenceQuotes()` — exact / normalized / not_found  
- API返回 `groundingResults`；UI显示徽章  
- `useful_for_my_research` 会吃可选的用户背景  

#### Phase3 — PDF上传 ✅

- 客户端 `pdfjs-dist`，最大15MB  
- 分页符 `--- Page N ---`  
- 填进粘贴区；点Generate前你自己审  

#### Phase4 — Research Map ✅

- `POST /api/research-map` `{ paperCards, userBackground? }`  
- 地图schema较全；置信度 + 支撑论文徽章  
- 论文卡片&lt;2张时会提示  

#### Phase5 — Fit & Email ✅

- `POST /api/fit-email` `{ paperCards, researchMap, userBackground }`（背景必填，≥80字）  
- 结构化匹配 + 分段邮件 + `full_email`  
- 真发邮件前你自己把关  

#### Phase6 — Markdown导出 ✅

- `buildResearchBriefMarkdown()` + 下载 `research-brief-YYYY-MM-DD.md`  
- 导出里带审阅清单  
- **Copy to clipboard / 复制到剪贴板**（纯前端）  

### API环境变量

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini   # optional
```

### 面试演示（约30秒，不用APIKey）

1. **Simulate workflow / 模拟工作流** — 六步，mock数据  
2. 扫一眼 **Paper Cards** / **Research Map** / **Fit** / **Email**  
3. **Export Markdown / 导出Markdown** 或 **Copy to clipboard / 复制到剪贴板**  
4. 讲清楚：分步输出、引文核对、你来审、Markdown带走 — 不是聊天套壳  

### 面试演示（有APIKey）

1. 粘贴论文 → **Generate Paper Card / 生成论文卡片**（展示grounding）  
2. **Synthesize Research Map / 合成研究地图**（最好2张卡片以上）  
3. **Generate Fit & Email / 生成匹配与邮件**  
4. **Export Markdown / 导出Markdown**  

### 非目标（仍不做）

- 爬Google Scholar / 教授主页  
- 发邮件、Gmail、登录、支付  
- 多用户后端、向量库、SQLite持久化  
- 导出PDF、服务端存PDF  

### 文件地图（关键路径）

```
app/api/paper-card/route.ts
app/api/research-map/route.ts
app/api/fit-email/route.ts
lib/schemas/
lib/export/markdown.ts
lib/pdf/extract-pdf-text.ts
lib/grounding/verify-quotes.ts
components/home-page.tsx
```
