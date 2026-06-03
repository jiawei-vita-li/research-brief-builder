# Vercel deploy (5 min) / 5分钟部署

## English

1. Open https://vercel.com/new → Import **jiawei-vita-li/research-brief-builder**
2. Framework: **Next.js** (auto)
3. **Environment variables** → Add:
   - `OPENAI_API_KEY` = your key (for Generate / Synthesize / Fit steps)
   - `OPENAI_MODEL` = `gpt-4o-mini` (optional)
4. Deploy → copy URL (e.g. `https://research-brief-builder.vercel.app`)
5. Update **README.md** `Live demo:` line + GitHub **About → Website**
6. Test: **Simulate workflow** works **without** API key

CLI failed earlier? Use Dashboard only (`vercel login` had token issues on some Windows setups).

## 中文

1. 打开 https://vercel.com/new → 导入 **jiawei-vita-li/research-brief-builder**
2. 框架选 **Next.js**（自动识别）
3. **Environment variables** 添加：
   - `OPENAI_API_KEY` = 你的密钥（生成卡片/地图/邮件时用）
   - `OPENAI_MODEL` = `gpt-4o-mini`（可选）
4. 部署完成后复制URL（例如 `https://research-brief-builder.vercel.app`）
5. 改 **README.md** 里的 `Live demo:`，并在GitHub **About → Website** 填同一链接
6. 验证：**模拟全流程** 不需要APIKey也能跑

CLI登录有问题就用网页部署即可。
