# Product Brief

> **Language / 语言:** Each major section has **English** then **中文** (or inline `EN / 中文` for short items).

---

## English

### Product Name

**Research Brief Builder**

### One-liner

An AI-native workflow app that turns research papers into structured paper cards, a professor-level research map, fit analysis, and an editable RA outreach email — with source grounding and Markdown export for human review.

### Target User

**Primary:** Graduate student preparing RA or PhD outreach (CS / AI / agents / multimodal).

**Jobs to be done:**

- Read papers faster without losing structure  
- See a professor's direction across multiple papers  
- Position themselves honestly before writing cold email  
- Export a portable brief to edit in Obsidian / Notion / email client  

**Portfolio angle:** Demonstrates AI **product** thinking (workflow, schemas, HITL) for roles like AI coding tools / agent workflows (e.g. TRAE-style teams).

### Core User Pain

RA outreach is slow and fragmented: notes live in docs, summaries in chat, emails in another tab. Generic ChatGPT:

- Blurs paper-specific claims  
- Hides intermediate reasoning  
- Produces generic praise emails  
- Offers no verification against source text  

### Product Insight

Paper reading for outreach is a **pipeline**, not one prompt:

```
Upload or paste paper
  → (optional) PDF text extract — review first
  → Paper Cards (structured, grounded quotes)
  → Research Map (cross-paper synthesis)
  → Fit Analysis (how to position yourself)
  → Outreach Email (specific, editable draft)
  → Export Markdown (final handoff)
```

Each step produces an **artifact** the user can edit. The LLM never runs unless the user clicks.

### Differentiation (vs "Chat with PDF")

| Generic summarizer | Research Brief Builder |
|--------------------|-------------------------|
| One-shot prose | Staged artifacts |
| Black box | Visible stepper + status |
| No quote verification | Source grounding badges |
| Auto-send temptation | Draft + export only |
| Same UX for all tasks | RA outreach schema |

### MVP Status — Shipped

| Capability | Status |
|------------|--------|
| Mock demo (no API key) | ✅ Simulate workflow |
| Paste → Paper Card (LLM) | ✅ |
| User background on card | ✅ |
| Source grounding on quotes | ✅ |
| PDF → paste (client) | ✅ |
| Research Map synthesis | ✅ |
| Fit + Email generation | ✅ |
| Markdown export + clipboard | ✅ |
| Deploy-ready (Vercel) | ✅ See `docs/DEPLOYMENT.md` |

### What We Deliberately Do Not Build

- Scraping Scholar / professor sites  
- Sending email from the app  
- Login, billing, teams, vector DB  
- Storing user PDFs on server  

### Success Criteria (Met)

1. Paste or upload PDF text → review → generate paper card  
2. Multiple cards → synthesize research map with themes + confidence  
3. Background + map → fit analysis with strong/weak matches  
4. Editable outreach email with full draft  
5. Export `research-brief-YYYY-MM-DD.md` with review checklist  
6. Demo works without API key via Simulate  

### Key Metrics for Portfolio Story

- **Time-to-demo:** &lt;30s with Simulate → Export  
- **Trust:** grounding labels on evidence quotes  
- **Control:** every LLM step is explicit button + editable output  
- **Handoff:** Markdown file + clipboard for final human edit  

### 30-Second Demo Script (Interview)

1. *"This is an AI-native workflow, not a chatbot."*  
2. Click **Simulate workflow** — show stepper advancing.  
3. Open **Paper Cards** — structured fields, not a wall of text.  
4. Open **Research Map** — themes with confidence and supporting papers.  
5. Open **Fit Analysis** — positioning before email.  
6. Open **Outreach Email** — draft badge, not auto-sent.  
7. **Export Markdown** — portable brief + checklist.  
8. *"Real path uses OpenAI for each stage after the user reviews pasted or PDF text."*

Record as GIF: see `docs/DEMO_RECORDING.md`.

### Roadmap (Post-MVP)

- `localStorage` sessions per professor  
- Copy professor name into export template  
- Optional second LLM pass: "tighten email length"  
- Not planned: auto-send, scraping, auth  

---

## 中文

### 产品名称

**Research Brief Builder / 研究简报构建器**

### 一句话

AI 原生工作流应用：将研究论文转化为结构化论文卡片、教授级研究地图、匹配分析与可编辑 RA 外联邮件——含来源溯源与 Markdown 导出，供人工审阅。

### 目标用户

**主要用户：** 准备 RA 或博士外联的研究生（CS / AI / agents / 多模态方向）。

**待完成任务（Jobs to be done）：**

- 更快读论文且不丢失结构  
- 从多篇论文看清教授的研究方向  
- 写冷邮件前诚实定位自身  
- 导出便携简报，在 Obsidian / Notion / 邮件客户端中编辑  

**作品集角度：** 展示 AI **产品**思维（工作流、schema、HITL），适用于 AI 编程工具 / Agent 工作流类岗位（如 TRAE 风格团队）。

### 核心用户痛点

RA 外联慢且碎片化：笔记在文档里、摘要在聊天里、邮件在另一个标签页。通用 ChatGPT：

- 模糊论文特有论断  
- 隐藏中间推理  
- 产出泛泛的恭维邮件  
- 无法对照原文核验  

### 产品洞察

面向外联的论文阅读是一条 **流水线**，而非一个 prompt：

```
上传或粘贴论文
  →（可选）PDF 文本提取 — 先审阅
  → 论文卡片（结构化、溯源引文）
  → 研究地图（跨论文综合）
  → 匹配分析（如何定位自己）
  → 外联邮件（具体、可编辑草稿）
  → 导出 Markdown（最终交接）
```

每一步产出用户可编辑的 **产物（artifact）**。LLM 仅在用户点击时运行。

### 差异化（对比「Chat with PDF」）

| 通用摘要器 | Research Brief Builder |
|-----------|-------------------------|
| 一次性 prose | 分阶段产物 |
| 黑盒 | 可见步骤条 + 状态 |
| 无引文核验 | 来源溯源徽章 |
| 易诱发自动发送 | 仅草稿 + 导出 |
| 所有任务同一 UX | RA 外联专用 schema |

### MVP 状态 — 已交付

| 能力 | 状态 |
|------|------|
| 模拟演示（无需 API Key） | ✅ Simulate workflow |
| 粘贴 → 论文卡片（LLM） | ✅ |
| 卡片上的用户背景 | ✅ |
| 引文来源溯源 | ✅ |
| PDF → 粘贴区（客户端） | ✅ |
| 研究地图合成 | ✅ |
| 匹配 + 邮件生成 | ✅ |
| Markdown 导出 + 剪贴板 | ✅ |
| 可部署（Vercel） | ✅ 见 `docs/DEPLOYMENT.md` |

### 刻意不做

- 爬取 Scholar / 教授主页  
- 从应用内发送邮件  
- 登录、计费、团队、向量数据库  
- 在服务端存储用户 PDF  

### 成功标准（已达成）

1. 粘贴或上传 PDF 文本 → 审阅 → 生成论文卡片  
2. 多张卡片 → 合成含主题与置信度的研究地图  
3. 背景 + 地图 → 含强/弱匹配的匹配分析  
4. 可编辑外联邮件与完整草稿  
5. 导出 `research-brief-YYYY-MM-DD.md` 含审阅清单  
6. 通过 Simulate 无需 API Key 即可演示  

### 作品集关键指标

- **演示耗时：** Simulate → Export &lt;30 秒  
- **信任：** 证据引文上的溯源标签  
- **控制：** 每步 LLM 均为显式按钮 + 可编辑输出  
- **交接：** Markdown 文件 + 剪贴板供最终人工编辑  

### 30 秒演示脚本（面试）

1. *「这是 AI 原生工作流，不是聊天机器人。」*  
2. 点击 **Simulate workflow / 模拟工作流** — 展示步骤条推进。  
3. 打开 **Paper Cards / 论文卡片** — 结构化字段，非大段文字墙。  
4. 打开 **Research Map / 研究地图** — 主题、置信度与支持论文。  
5. 打开 **Fit Analysis / 匹配分析** — 写邮件前的定位。  
6. 打开 **Outreach Email / 外联邮件** — 草稿徽章，非自动发送。  
7. **Export Markdown / 导出 Markdown** — 便携简报 + 清单。  
8. *「真实路径在用户审阅粘贴或 PDF 文本后，各阶段调用 OpenAI。」*

录制 GIF：见 `docs/DEMO_RECORDING.md`。

### 路线图（MVP 之后）

- 按教授维度的 `localStorage` 会话  
- 将教授姓名写入导出模板  
- 可选第二轮 LLM：「压缩邮件长度」  
- 不计划：自动发送、爬取、认证  
