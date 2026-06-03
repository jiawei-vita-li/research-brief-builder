# Research Brief Builder

**Repository / 仓库:** https://github.com/jiawei-vita-li/research-brief-builder

> **Language / 语言:** Each major section has **English** then **中文** (or inline `EN / 中文` for short items). **中文排版（zhNormalize）：** 保留的英文与数字前后不加空格（如：导出Markdown、至少80字、Phase1–6）。

---

## English

AI-native workflow for graduate RA outreach: structured paper cards, research map, fit analysis, and outreach email drafts — with source grounding and Markdown export.

**Docs:** [Product brief](docs/PRODUCT_BRIEF.md) · [MVP spec](docs/MVP_SPEC.md) · [Deploy to Vercel](docs/DEPLOYMENT.md) · [Record demo GIF](docs/DEMO_RECORDING.md)

### UI copy convention

In-app labels use **`English / 中文`**, centralized in [`lib/i18n/strings.ts`](lib/i18n/strings.ts) with [`zhNormalize`](lib/i18n/bi.ts) (no spaces around Latin letters/digits in Chinese). Documentation follows the same bilingual style; code blocks, env vars, and API routes stay unchanged.

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

帮研究生做RA套磁的一套AI工作流：论文卡片、研究地图、匹配分析、邮件草稿都按结构来，引文能对照原文核对，最后可导出Markdown。

**文档：** [产品简介](docs/PRODUCT_BRIEF.md) · [MVP规格](docs/MVP_SPEC.md) · [部署到Vercel](docs/DEPLOYMENT.md) · [录制演示GIF](docs/DEMO_RECORDING.md)

### 界面文案约定

应用里标签和提示统一用 **`English / 中文`**，文案集中在 [`lib/i18n/strings.ts`](lib/i18n/strings.ts)，中文里的英文和数字前后不留空格（见 [`zhNormalize`](lib/i18n/bi.ts)）。文档同样双语；代码块、环境变量名、API路由不改。

### 演示

<!-- 录制完成后，取消注释并添加 docs/assets/demo.gif -->
<!-- ![Simulate workflow → Export Markdown](docs/assets/demo.gif) -->

**快速演示（不用APIKey）：** **Simulate workflow / 模拟工作流** → 点一圈各标签页 → **Export Markdown / 导出Markdown** 或 **Copy to clipboard / 复制到剪贴板**。

### 线上部署（Vercel）

1. 一步步怎么做，看 **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**。
2. 在Vercel → Environment Variables里填 `OPENAI_API_KEY`（可选 `OPENAI_MODEL`）。
3. 密钥加好后重新部署一次。

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

### MVP功能（Phase1–6）

| 阶段 | 功能 |
|------|------|
| 1 | 模拟UI + **Simulate workflow / 模拟工作流** |
| 2 | **Generate Paper Card / 生成论文卡片**（粘贴文本 + LLM） |
| 2.5 | 用户背景 + 引文 **source grounding / 对照原文** |
| 3 | **PDF upload / PDF上传** → 客户端抽文本（调LLM前先自己过一遍） |
| 4 | **Synthesize Research Map / 合成研究地图** |
| 5 | **Generate Fit & Email / 生成匹配与邮件** |
| 6 | **Export Markdown / 导出Markdown** + **Copy to clipboard / 复制到剪贴板** |

### 脚本

- `npm run dev` — 开发服务器
- `npm run build` — 生产构建
- `npm run lint` — ESLint

### 面试一句话pitch

*RA套磁按步骤走、中间结果能改能核对，不是「一键摘要」，也不是把ChatGPT包一层壳。*
