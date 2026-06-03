# MVP Spec (Implemented)

> **Language / 语言:** Each major section has **English** then **中文** (or inline `EN / 中文` for short items).

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

状态：**阶段 1–6 已完成**（本地 Web 应用，客户端优先，OpenAI 仅通过服务端路由）。

### 技术栈

| 层级 | 选型 |
|------|------|
| 框架 | Next.js 16 App Router |
| 语言 | TypeScript |
| 样式 | Tailwind CSS + shadcn/ui（最小集合） |
| 状态 | React 本地状态（无数据库） |
| LLM | OpenAI API（默认 `gpt-4o-mini`）经 Route Handlers |
| PDF | `pdfjs-dist`（客户端提取） |
| 导出 | 客户端 Markdown 构建 + 下载 / 剪贴板 |

依赖保持最小：无认证、无向量库、无邮件 SDK。

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

无服务端文件存储。PDF 从不上传至服务器。

### 布局

1. **Header / 页头** — Research Brief Builder + 标语  
2. **Toolbar / 工具栏** — Simulate workflow + 阶段提示  
3. **Workflow stepper / 工作流步骤条** — Upload/Paste → Parse → Analyze → Synthesize → Draft → Export  
4. **Left panel / 左侧面板** — PDF 上传、粘贴文本、用户背景、Generate Paper Card  
5. **Main tabs / 主标签页** — Paper Cards | Research Map | Fit Analysis | Outreach Email  
6. **Right panel (Status) / 右侧面板（状态）** — 进度、消息、Export Markdown、Copy to clipboard、演示控件  

### 用户触发的操作（非自动）

| 操作 | 触发条件 | API |
|------|----------|-----|
| Generate Paper Card / 生成论文卡片 | 按钮（粘贴 ≥100 字符） | `POST /api/paper-card` |
| Synthesize Research Map / 合成研究地图 | 按钮（≥1 张论文卡片） | `POST /api/research-map` |
| Generate Fit & Email / 生成匹配与邮件 | 按钮（卡片 + 地图 + 背景 ≥80） | `POST /api/fit-email` |
| Export / Copy Markdown / 导出 / 复制 Markdown | 按钮（≥1 个产物） | 仅客户端 |

PDF 上传 **仅填充** 粘贴区 — **不会** 调用 LLM。

### 核心数据对象

#### PaperCard / 论文卡片

| 字段 | 说明 |
|------|------|
| id, title, authors, year, venue | 缺失时为 `unknown` |
| problem, motivation, method, pipeline | 文本 |
| key_contributions | string[] |
| limitations, useful_for_my_research | 文本 |
| evidence_quotes | string[]；客户端对照粘贴文本溯源 |

#### ResearchMap（阶段 4 schema）

| 字段 | 结构 |
|------|------|
| main_research_themes | `{ theme, description, supporting_papers[], confidence: high\|medium\|low }[]` |
| recurring_methods | `{ method, description, supporting_papers[] }[]` |
| representative_papers | `{ title, why_representative }[]` |
| evolution_over_time | string[] |
| open_questions, possible_RA_entry_points, risks_or_gaps | string[] |
| suggested_reading_order | `{ title, reason }[]` |

#### FitAnalysis（阶段 5 schema）

| 字段 | 结构 |
|------|------|
| strongest_match_points | `{ point, evidence_from_user, evidence_from_research_map, how_to_use_in_email }[]` |
| weaker_match_points | `{ point, why_weak, how_to_frame_carefully }[]` |
| risks_or_gaps | string[] |
| suggested_positioning, recommended_outreach_angle | string |
| questions_to_ask_professor | string[] |

#### OutreachEmailDraft（阶段 5 schema）

| 字段 | 说明 |
|------|------|
| subject, greeting, opening | |
| paper_specific_paragraph, self_positioning_paragraph | |
| proposed_RA_contribution, availability_or_next_step, closing | |
| full_email | 完整草稿（单块） |

### UX 要求（已落实）

- 可见工作流步骤；**非** 聊天机器人 UI  
- 所有 LLM 输出 **可就地编辑**  
- 各标签页 relevant 的 **empty / loading / error** 状态  
- 缺失论文元数据 → **`unknown`**（UI 中 muted 徽章）  
- 证据引文 → **Verified / 已验证** / **Needs review / 待审阅**（来源溯源）  
- 邮件 **仅草稿** — 永不自动发送  

### 阶段摘要（已交付）

#### 阶段 1 — Mock UI ✅

- 完整布局，simulate workflow（模拟加载 → mock 产物）  
- 可编辑卡片、步骤条、四个标签页  

#### 阶段 2 — Paper Card（LLM）✅

- `POST /api/paper-card` `{ paperText, userBackground? }`  
- Zod schema + 结构化输出  
- 与 Simulate 分离  

#### 阶段 2.5 — 溯源 + 背景 ✅

- `verifyEvidenceQuotes()` — exact / normalized / not_found  
- API 响应含 `groundingResults`；UI 徽章  
- `useful_for_my_research` 使用可选用户背景  

#### 阶段 3 — PDF 上传 ✅

- 客户端 `pdfjs-dist`，最大 15MB  
- 分页符 `--- Page N ---`  
- 填充粘贴区；Generate 前由用户审阅  

#### 阶段 4 — Research Map ✅

- `POST /api/research-map` `{ paperCards, userBackground? }`  
- 丰富地图 schema；置信度 + 支持论文徽章  
- &lt;2 张论文卡片时警告  

#### 阶段 5 — Fit & Email ✅

- `POST /api/fit-email` `{ paperCards, researchMap, userBackground }`（背景必填，≥80 字符）  
- 结构化匹配 + 分段邮件 + `full_email`  
- 真实发送前人机协同  

#### 阶段 6 — Markdown 导出 ✅

- `buildResearchBriefMarkdown()` + 下载 `research-brief-YYYY-MM-DD.md`  
- 导出含审阅清单  
- **Copy to clipboard / 复制到剪贴板**（无后端）  

### API 环境变量

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini   # optional
```

### 面试演示路径（30 秒，无 API Key）

1. **Simulate workflow / 模拟工作流** — 六步，mock 数据  
2. 浏览 **Paper Cards** / **Research Map** / **Fit** / **Email** 标签页  
3. **Export Markdown / 导出 Markdown** 或 **Copy to clipboard / 复制到剪贴板**  
4. 说明：分阶段产物、溯源、人工审阅、便携交接 — 非聊天套壳  

### 面试演示路径（有 API Key）

1. 粘贴论文文本 → **Generate Paper Card / 生成论文卡片**（展示溯源）  
2. **Synthesize Research Map / 合成研究地图**（理想情况 2+ 张卡片）  
3. **Generate Fit & Email / 生成匹配与邮件**  
4. **Export Markdown / 导出 Markdown**  

### 非目标（仍不在范围内）

- Google Scholar / 教授主页爬取  
- 邮件发送、Gmail、认证、支付  
- 多用户后端、向量库、SQLite 持久化  
- PDF 导出、服务端 PDF 存储  

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
