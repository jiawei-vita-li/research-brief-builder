# For Reviewers / 面试官速览

> **Language / 语言:** English first, then 中文. **zhNormalize:** no spaces around English/digits in 中文 (e.g. 导出Markdown、至少80字).

---

## English

### One sentence

**Staged RA outreach workflow with editable artifacts and quote grounding—not a chat wrapper.**

### Try in 30 seconds (no API key)

1. Open **Live demo** (README) or run `npm run dev`
2. Click **Simulate workflow**
3. Skim **Paper Cards → Research Map → Fit Analysis → Outreach Email**
4. **Export Markdown** or **Copy to clipboard**

### With API key

Paste paper text (≥100 chars) → **Generate Paper Card** → **Synthesize Research Map** → fill background (≥80 chars) → **Generate Fit & Email** → export.

### Three product decisions

| Decision | Why |
|----------|-----|
| **Explicit buttons per LLM step** | User reviews PDF/paste before any model call; no “upload and pray.” |
| **Structured schemas (Zod)** | Paper card, map, fit, email are **artifacts**, not one blob of prose. |
| **Client-side quote grounding** | Evidence quotes checked against pasted text; badges = trust, not vibes. |

### Tradeoffs (honest)

- Research map is weaker with only **1** paper card (warning in UI).
- PDF extract is client-side; scanned PDFs may fail—paste is the fallback.
- No auth/DB: portfolio MVP; sessions are not persisted.

### vs “Chat with PDF”

| Chat summarizer | This app |
|-----------------|----------|
| One-shot answer | Stepwise artifacts |
| Hidden steps | Visible stepper + status |
| No quote check | Verified / Needs review |
| Feels “send ready” | Draft + export only |

### What I’d say in an interview

1. *“It’s a workflow product, not a chatbot.”*
2. Show **Simulate** and **grounding badges** on a paper card.
3. *“Every stage is editable; Markdown is the handoff.”*
4. If asked about scope: point to **Non-goals** in [PRODUCT_BRIEF.md](./PRODUCT_BRIEF.md).

### Deep dives

- [Product brief](./PRODUCT_BRIEF.md) — positioning, pain, differentiation  
- [MVP spec](./MVP_SPEC.md) — APIs, schemas, phases  
- [Deployment](./DEPLOYMENT.md) — Vercel + `OPENAI_API_KEY`

### Author

GitHub: [@jiawei-vita-li](https://github.com/jiawei-vita-li) · Repo: [research-brief-builder](https://github.com/jiawei-vita-li/research-brief-builder)

---

## 中文

### 一句话

**按步骤做RA套磁的工作流，中间结果能改、引文能对照原文，不是把ChatGPT包一层壳。**

### 30秒怎么试（不用APIKey）

1. 打开README里的**线上演示**，或本地 `npm run dev`
2. 点 **Simulate workflow / 模拟全流程**
3. 快速扫 **论文卡片 → 研究地图 → 契合度 → 套磁邮件**
4. **导出Markdown** 或 **复制到剪贴板**

### 有APIKey时

粘贴正文（≥100字）→ **生成论文卡片** → **合成研究地图** → 背景写满（≥80字）→ **生成契合度与邮件** → 导出。

### 三个产品取舍

| 取舍 | 原因 |
|------|------|
| **每步单独按钮调模型** | 上传/粘贴后你先审，再决定是否生成 |
| **Zod结构化输出** | 卡片、地图、契合度、邮件都是可改的**中间结果**，不是一整段摘要 |
| **引文在客户端对照原文** | 能对上/对不上有徽章，发信前你自己把关 |

### 已知局限（实话实说）

- 只有**1**张论文卡片时，研究地图可能偏浅（界面会提示）。
- PDF在浏览器里抽文本，扫描版容易翻车，可以改粘贴。
- 无登录、无数据库：作品集MVP，刷新后不落库。

### 和「ChatPDF」的差别

| 聊天摘要 | 本项目 |
|----------|--------|
| 一问一答 | 分步产出 |
| 步骤看不见 | 步骤条+状态 |
| 引文难核对 | 已对上/待核对 |
| 像能直接发 | 只有草稿+导出 |

### 面试口述（30秒）

1. 「这是工作流产品，不是聊天机器人。」
2. 演示 **模拟全流程** 和卡片上的 **对照原文** 徽章。
3. 「每一步都能改，最后Markdown带走自己定稿。」
4. 问范围时，指向 [PRODUCT_BRIEF.md](./PRODUCT_BRIEF.md) 里的「刻意不做」。

### 延伸阅读

- [产品简介](./PRODUCT_BRIEF.md)  
- [MVP规格](./MVP_SPEC.md)  
- [部署](./DEPLOYMENT.md)
