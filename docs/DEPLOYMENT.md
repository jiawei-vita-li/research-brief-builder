# Deploy to Vercel

> **Language / 语言:** Each major section has **English** then **中文** (or inline `EN / 中文` for short items). **中文排版（zhNormalize）：** 保留的英文与数字前后不加空格（如：导出Markdown、至少80字、Phase1–6）。

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

- [Vercel](https://vercel.com)账号  
- GitHub仓库（推荐）或Vercel CLI  
- 已开通计费的OpenAI APIKey  

### 方案A — Vercel控制台（推荐）

1. 把 `research-brief-builder` 推到GitHub（仓库根目录就是这个文件夹，或在monorepo子目录里）。

2. 打开 [vercel.com/new](https://vercel.com/new) → Import repository。

3. **Root Directory / 根目录：** 应用在子文件夹里就填，比如 `research-brief-builder`。

4. **Framework Preset / 框架：** Next.js（一般会自己识别）。

5. **Environment Variables / 环境变量**（Production + Preview）：

   | Name | Value |
   |------|--------|
   | `OPENAI_API_KEY` | `sk-...` |
   | `OPENAI_MODEL` | `gpt-4o-mini` (optional) |

6. Deploy → 记下生产环境URL（例如 `https://research-brief-builder.vercel.app`）。

7. **验收**
   - 打开URL → **Simulate workflow / 模拟工作流** 不用APIKey也能跑。  
   - 粘贴一段文字 → 配好Key后 **Generate Paper Card / 生成论文卡片** 能出结果。  

### 方案B — Vercel CLI

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

- 别把 `.env.local` 或密钥提交进git（`.gitignore` 已忽略 `.env*`）。  
- `OPENAI_API_KEY` **只在服务端**（Route Handlers），浏览器拿不到。  
- 日志或录屏里漏了Key，就去OpenAI后台轮换。  

### 构建设置（默认）

- 构建命令：`npm run build`  
- 输出：Next.js默认  
- Node：20.x（用Vercel默认就行）  

### 常见问题

| 现象 | 处理 |
|------|------|
| 点Generate报503 CONFIG_ERROR | Vercel → Settings → Environment Variables 补上 `OPENAI_API_KEY` → 重新部署 |
| 线上PDF抽文本失败 | PDF.js worker走unpkg CDN；查网络或广告拦截 |
| 本地 `npm run build` 挂 | 先本地修完TypeScript再部署 |

### 自定义域名（可选）

Vercel project → Settings → Domains → 加比如 `brief.yourdomain.com`。

### 作品集README片段

部署完可以贴到作品集或GitHub README：

```markdown
**Live demo:** https://your-app.vercel.app

30s walkthrough: Simulate workflow → tabs → Export Markdown (no API key required for demo).
```

录完演示再补 `docs/assets/demo.gif`（见 `DEMO_RECORDING.md`）。
