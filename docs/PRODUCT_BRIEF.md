# Product Brief

> **Language / 语言:** Each major section has **English** then **中文** (or inline `EN / 中文` for short items). **中文排版（zhNormalize）：** 保留的英文与数字前后不加空格（如：导出Markdown、至少80字、Phase1–6）。

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

把论文拆成结构化卡片、研究地图、匹配分析和可改动的RA套磁邮件草稿；引文能对照原文，最后导出Markdown给你自己改。

### 目标用户

**主要用户：** 正在准备RA或博士套磁的研究生（CS/AI/agents/多模态等方向）。

**想解决的事（Jobs to be done）：**

- 读论文快一点，但别把结构读散  
- 多篇论文放在一起，看清教授在做什么  
- 写冷邮件前，先想清楚自己该怎么讲  
- 导出一份简报，到Obsidian/Notion/邮件客户端里继续改  

**作品集角度：** 体现AI**产品**思路（工作流、schema、HITL），适合投AI编程工具、Agent工作流类岗位（比如TRAE那种团队）。

### 核心用户痛点

RA套磁往往又慢又碎：笔记在文档、摘要在聊天、邮件在另一个标签页。通用ChatGPT还容易：

- 把论文里特有的说法讲糊  
- 中间推理看不见  
- 邮件写得像模板恭维  
- 没法回头对原文  

### 产品洞察

为套磁读论文，应该是一条**流水线**，不是一个prompt糊到底：

```
上传或粘贴论文
  →（可选）PDF抽文本 — 你先过一遍
  → 论文卡片（结构化 + 可核对引文）
  → 研究地图（跨论文归纳）
  → 匹配分析（你怎么接得上）
  → 套磁邮件（具体、可改草稿）
  → 导出Markdown（带走继续改）
```

每一步都会留下你能改的**中间结果（artifact）**。LLM只有在你点按钮时才跑。

### 差异化（对比「Chat with PDF」）

| 通用摘要器 | Research Brief Builder |
|-----------|-------------------------|
| 一次性长文 | 分步、分块输出 |
| 黑盒 | 步骤条 + 状态看得见 |
| 引文不好核对 | 引文对照原文的徽章 |
| 容易想「直接发」 | 只有草稿 + 导出 |
| 啥任务都一个界面 | 按RA套磁设计的schema |

### MVP状态 — 已交付

| 能力 | 状态 |
|------|------|
| 模拟演示（不用APIKey） | ✅ Simulate workflow |
| 粘贴 → 论文卡片（LLM） | ✅ |
| 卡片上的用户背景 | ✅ |
| 引文对照原文 | ✅ |
| PDF → 粘贴区（客户端） | ✅ |
| 研究地图合成 | ✅ |
| 匹配 + 邮件生成 | ✅ |
| Markdown导出 + 剪贴板 | ✅ |
| 可部署（Vercel） | ✅ 见 `docs/DEPLOYMENT.md` |

### 刻意不做

- 爬Scholar/教授主页  
- 在应用里发邮件  
- 登录、计费、团队、向量库  
- 服务端存用户PDF  

### 成功标准（已达成）

1. 粘贴或上传PDF文本 → 自己审一遍 → 生成论文卡片  
2. 多张卡片 → 合成带主题和置信度的研究地图  
3. 背景 + 地图 → 匹配分析（强/弱项都写清楚）  
4. 可编辑套磁邮件 + 完整草稿  
5. 导出 `research-brief-YYYY-MM-DD.md`，带审阅清单  
6. 用Simulate演示，不用APIKey也行  

### 作品集关键指标

- **演示耗时：** Simulate → Export 不到30秒  
- **信任：** 证据引文带核对标签  
- **控制：** 每步LLM都是显式按钮 + 输出可改  
- **交接：** Markdown文件 + 剪贴板，最后你自己定稿  

### 30秒演示脚本（面试）

1. *「这是按步骤走的工作流，不是聊天机器人。」*  
2. 点 **Simulate workflow / 模拟工作流** — 让步骤条往前走。  
3. 打开 **Paper Cards / 论文卡片** — 看字段，不是一整墙字。  
4. 打开 **Research Map / 研究地图** — 主题、置信度、支撑论文。  
5. 打开 **Fit Analysis / 匹配分析** — 写邮件前先定位。  
6. 打开 **Outreach Email / 套磁邮件** — 草稿徽章，不会自动发。  
7. **Export Markdown / 导出Markdown** — 简报 + 清单带走。  
8. *「真用时，你先审粘贴或PDF文本，再分阶段调OpenAI。」*

录制GIF：见 `docs/DEMO_RECORDING.md`。

### 路线图（MVP之后）

- 按教授存 `localStorage` 会话  
- 导出模板里带上教授姓名  
- 可选第二轮LLM：「把邮件压短一点」  
- 不做：自动发送、爬取、登录  
