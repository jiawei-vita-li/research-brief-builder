# Deploy to Vercel

> **Language / 语言:** Each major section has **English** then **中文** (or inline `EN / 中文` for short items).

---

## English

### Prerequisites

- [Vercel](https://vercel.com) account  
- GitHub repo (recommended) or Vercel CLI  
- OpenAI API key with billing enabled  

### Option A — Vercel Dashboard (Recommended)

1. Push `research-brief-builder` to GitHub (repo root = this folder, or monorepo subfolder).

2. [vercel.com/new](https://vercel.com/new) → Import repository.

3. **Root Directory:** If the app lives in a subfolder, set e.g. `research-brief-builder`.

4. **Framework Preset:** Next.js (auto-detected).

5. **Environment Variables** (Production + Preview):

   | Name | Value |
   |------|--------|
   | `OPENAI_API_KEY` | `sk-...` |
   | `OPENAI_MODEL` | `gpt-4o-mini` (optional) |

6. Deploy → copy production URL (e.g. `https://research-brief-builder.vercel.app`).

7. **Verify**
   - Open URL → **Simulate workflow** works without API key.  
   - Paste text → **Generate Paper Card** works with key set.  

### Option B — Vercel CLI

```bash
cd research-brief-builder
npm i -g vercel
vercel login
vercel link
vercel env add OPENAI_API_KEY
# paste sk-... when prompted; select Production, Preview, Development

vercel env add OPENAI_MODEL
# optional: gpt-4o-mini

vercel --prod
```

### Security Notes

- Never commit `.env.local` or keys to git (`.gitignore` already excludes `.env*`).  
- `OPENAI_API_KEY` is **server-only** (Route Handlers); not exposed to the browser.  
- Rotate key if leaked in logs or screen recording.  

### Build Settings (Default)

- Build command: `npm run build`  
- Output: Next.js default  
- Node: 20.x (Vercel default is fine)  

### Troubleshooting

| Issue | Fix |
|-------|-----|
| 503 CONFIG_ERROR on Generate | Add `OPENAI_API_KEY` in Vercel → Settings → Environment Variables → Redeploy |
| PDF extract fails on deploy | PDF.js worker loads from unpkg CDN; check network/adblock |
| Build fails locally | Run `npm run build` and fix TypeScript errors first |

### Custom Domain (Optional)

Vercel project → Settings → Domains → add e.g. `brief.yourdomain.com`.

### Portfolio README Snippet

After deploy, add to your portfolio / GitHub README:

```markdown
**Live demo:** https://your-app.vercel.app

30s walkthrough: Simulate workflow → tabs → Export Markdown (no API key required for demo).
```

Add `docs/assets/demo.gif` after recording (see `DEMO_RECORDING.md`).

---

## 中文

### 前置条件

- [Vercel](https://vercel.com) 账号  
- GitHub 仓库（推荐）或 Vercel CLI  
- 已开通计费的 OpenAI API Key  

### 方案 A — Vercel 控制台（推荐）

1. 将 `research-brief-builder` 推送到 GitHub（仓库根目录为本文件夹，或 monorepo 子目录）。

2. 打开 [vercel.com/new](https://vercel.com/new) → Import repository。

3. **Root Directory / 根目录：** 若应用在子文件夹中，设置如 `research-brief-builder`。

4. **Framework Preset / 框架预设：** Next.js（自动检测）。

5. **Environment Variables / 环境变量**（Production + Preview）：

   | Name | Value |
   |------|--------|
   | `OPENAI_API_KEY` | `sk-...` |
   | `OPENAI_MODEL` | `gpt-4o-mini` (optional) |

6. Deploy / 部署 → 复制生产 URL（如 `https://research-brief-builder.vercel.app`）。

7. **Verify / 验证**
   - 打开 URL → **Simulate workflow / 模拟工作流** 无需 API Key 即可运行。  
   - 粘贴文本 → 配置 Key 后 **Generate Paper Card / 生成论文卡片** 可用。  

### 方案 B — Vercel CLI

```bash
cd research-brief-builder
npm i -g vercel
vercel login
vercel link
vercel env add OPENAI_API_KEY
# paste sk-... when prompted; select Production, Preview, Development

vercel env add OPENAI_MODEL
# optional: gpt-4o-mini

vercel --prod
```

### 安全说明

- 切勿将 `.env.local` 或密钥提交到 git（`.gitignore` 已排除 `.env*`）。  
- `OPENAI_API_KEY` **仅服务端**（Route Handlers）；不暴露给浏览器。  
- 若在日志或录屏中泄露，请轮换密钥。  

### 构建设置（默认）

- Build command / 构建命令：`npm run build`  
- Output / 输出：Next.js 默认  
- Node：20.x（Vercel 默认即可）  

### 故障排查

| Issue / 问题 | Fix / 修复 |
|--------------|------------|
| Generate 时 503 CONFIG_ERROR | 在 Vercel → Settings → Environment Variables 添加 `OPENAI_API_KEY` → 重新部署 |
| 部署后 PDF 提取失败 | PDF.js worker 从 unpkg CDN 加载；检查网络/广告拦截 |
| 本地构建失败 | 先运行 `npm run build` 并修复 TypeScript 错误 |

### 自定义域名（可选）

Vercel project → Settings → Domains → 添加如 `brief.yourdomain.com`。

### 作品集 README 片段

部署后，添加至作品集 / GitHub README：

```markdown
**Live demo:** https://your-app.vercel.app

30s walkthrough: Simulate workflow → tabs → Export Markdown (no API key required for demo).
```

录制后添加 `docs/assets/demo.gif`（见 `DEMO_RECORDING.md`）。
