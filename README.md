# Research Brief Builder

**Repository / 仓库:** https://github.com/jiawei-vita-li/research-brief-builder

> **Language / 语言:** Each major section has **English** then **中文** (or inline `EN / 中文` for short items).

---

## English

AI-native workflow for graduate RA outreach: structured paper cards, research map, fit analysis, and outreach email drafts — with source grounding and Markdown export.

**Docs:** [Product brief](docs/PRODUCT_BRIEF.md) · [MVP spec](docs/MVP_SPEC.md) · [Deploy to Vercel](docs/DEPLOYMENT.md) · [Record demo GIF](docs/DEMO_RECORDING.md)

### UI copy convention

In-app labels and messages use the **`English / 中文`** pattern, centralized in [`lib/i18n/strings.ts`](lib/i18n/strings.ts). Documentation follows the same bilingual style; code blocks, env vars, and API routes stay unchanged.

### Demo

<!-- After recording, uncomment and add docs/assets/demo.gif -->
<!-- ![Simulate workflow → Export Markdown](docs/assets/demo.gif) -->

**Quick demo (no API key):** **Simulate workflow** → skim tabs → **Export Markdown** or **Copy to clipboard**.

### Live deploy (Vercel)

1. See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for step-by-step setup.
2. Set `OPENAI_API_KEY` (and optional `OPENAI_MODEL`) in Vercel → Environment Variables.
3. Redeploy after adding secrets.

```text
Live demo: https://YOUR_PROJECT.vercel.app   ← replace after deploy
```

### Run locally

```bash
cd research-brief-builder
npm install
cp .env.example .env.local
# Edit .env.local: OPENAI_API_KEY=sk-...
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### MVP features (Phases 1–6)

| Phase | Feature |
|-------|---------|
| 1 | Mock UI + **Simulate workflow** |
| 2 | **Generate Paper Card** (paste text + LLM) |
| 2.5 | User background + **source grounding** on quotes |
| 3 | **PDF upload** → client text extract (review before LLM) |
| 4 | **Synthesize Research Map** |
| 5 | **Generate Fit & Email** |
| 6 | **Export Markdown** + **Copy to clipboard** |

### Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run lint` — ESLint

### Interview pitch (one sentence)

*Structured, verifiable RA outreach workflow with visible steps and human-in-the-loop artifacts—not a generic paper summarizer or chat wrapper.*

---

## 中文

面向研究生 RA 外联的 AI 原生工作流：结构化论文卡片、研究地图、匹配分析与外联邮件草稿——含来源溯源与 Markdown 导出。

**文档：** [产品简介](docs/PRODUCT_BRIEF.md) · [MVP 规格](docs/MVP_SPEC.md) · [部署到 Vercel](docs/DEPLOYMENT.md) · [录制演示 GIF](docs/DEMO_RECORDING.md)

### 界面文案约定

应用内标签与提示采用 **`English / 中文`** 格式，集中在 [`lib/i18n/strings.ts`](lib/i18n/strings.ts)。本文档采用相同双语风格；代码块、环境变量名与 API 路由保持不变。

### 演示

<!-- 录制完成后，取消注释并添加 docs/assets/demo.gif -->
<!-- ![Simulate workflow → Export Markdown](docs/assets/demo.gif) -->

**快速演示（无需 API Key）：** **Simulate workflow / 模拟工作流** → 浏览各标签页 → **Export Markdown / 导出 Markdown** 或 **Copy to clipboard / 复制到剪贴板**。

### 线上部署（Vercel）

1. 分步说明见 **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**。
2. 在 Vercel → Environment Variables 中设置 `OPENAI_API_KEY`（及可选的 `OPENAI_MODEL`）。
3. 添加密钥后重新部署。

```text
Live demo: https://YOUR_PROJECT.vercel.app   ← 部署后替换
```

### 本地运行

```bash
cd research-brief-builder
npm install
cp .env.example .env.local
# 编辑 .env.local: OPENAI_API_KEY=sk-...
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

### MVP 功能（阶段 1–6）

| 阶段 | 功能 |
|------|------|
| 1 | 模拟 UI + **Simulate workflow / 模拟工作流** |
| 2 | **Generate Paper Card / 生成论文卡片**（粘贴文本 + LLM） |
| 2.5 | 用户背景 + 引文 **source grounding / 来源溯源** |
| 3 | **PDF upload / PDF 上传** → 客户端文本提取（LLM 前先审阅） |
| 4 | **Synthesize Research Map / 合成研究地图** |
| 5 | **Generate Fit & Email / 生成匹配与邮件** |
| 6 | **Export Markdown / 导出 Markdown** + **Copy to clipboard / 复制到剪贴板** |

### 脚本

- `npm run dev` — 开发服务器
- `npm run build` — 生产构建
- `npm run lint` — ESLint

### 面试一句话 pitch

*结构化、可核验的 RA 外联工作流，步骤可见、人机协同产出中间产物——而非通用论文摘要器或聊天套壳。*
