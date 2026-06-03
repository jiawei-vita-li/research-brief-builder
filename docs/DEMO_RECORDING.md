# 30-Second Demo GIF (Simulate → Export)

> **Language / 语言:** Each major section has **English** then **中文** (or inline `EN / 中文` for short items). **中文排版（zhNormalize）：** 保留的英文与数字前后不加空格（如：导出Markdown、至少80字、Phase1–6）。

---

## English

Record after the app runs locally or on Vercel. Target length: **25–35 seconds**, **1280×720** or **1920×1080**, 15–20 FPS.

### Storyboard

| Sec | Action | Narration (optional) |
|-----|--------|----------------------|
| 0–3 | App loaded, point at stepper + tagline | "AI-native workflow for RA outreach—not a chatbot." |
| 3–10 | Click **Simulate workflow**, wait for completion | "Six visible steps; structured artifacts, not one blob of text." |
| 10–14 | Tab **Paper Cards** — scroll one card | "Paper card with fields and evidence." |
| 14–17 | Tab **Research Map** — themes + confidence | "Professor-level map across papers." |
| 17–20 | Tab **Fit Analysis** — positioning | "Fit before you write the email." |
| 20–23 | Tab **Outreach Email** — draft badge | "Editable draft—not auto-sent." |
| 23–30 | **Export Markdown** (or Copy) — show download/toast | "Portable Markdown for final human review." |

### Windows — ScreenToGif (Free)

1. Install [ScreenToGif](https://www.screentosoft.com/).  
2. **Recorder** → region around browser window.  
3. Run storyboard above.  
4. **Edit** → trim pauses → **File → Save as** → GIF.  
5. Save to `docs/assets/demo.gif` (create folder).  

### macOS — QuickTime + convert

1. QuickTime → New Screen Recording → record storyboard.  
2. Convert to GIF with [gifski](https://gif.ski/) or FFmpeg:

```bash
ffmpeg -i demo.mov -vf "fps=15,scale=1280:-1:flags=lanczos" -loop 0 docs/assets/demo.gif
```

### Embed in README

```markdown
## Demo

![Simulate workflow → Export Markdown](./docs/assets/demo.gif)
```

### Tips

- Hide bookmarks bar; use light theme for readability.  
- Zoom browser to 110% if UI looks small on laptop.  
- Do **not** show API keys or `.env.local` in frame.  
- Simulate path needs **no** OpenAI key—ideal for public GIF.  

---

## 中文

本地或Vercel跑起来之后再录。建议 **25–35秒**，分辨率 **1280×720** 或 **1920×1080**，15–20 FPS。

### 分镜脚本

| 秒 | 操作 | 旁白（可选） |
|----|------|--------------|
| 0–3 | 页面打开，指一下步骤条和标语 | 「RA套磁用的分步工作流，不是聊天机器人。」 |
| 3–10 | 点 **Simulate workflow / 模拟工作流**，等跑完 | 「六步都看得见；每步是结构化块，不是一大坨字。」 |
| 10–14 | **Paper Cards / 论文卡片** — 滚一张卡片 | 「字段拆开，下面还有证据引文。」 |
| 14–17 | **Research Map / 研究地图** — 看主题和置信度 | 「多篇论文合在一起，像教授研究方向地图。」 |
| 17–20 | **Fit Analysis / 匹配分析** — 看定位 | 「写邮件前先想清楚怎么接。」 |
| 20–23 | **Outreach Email / 套磁邮件** — 看草稿徽章 | 「能改，只是草稿，不会帮你发。」 |
| 23–30 | **Export Markdown / 导出Markdown**（或Copy）— 露出下载或toast | 「导出Markdown，最后你自己定稿。」 |

### Windows — ScreenToGif（免费）

1. 装 [ScreenToGif](https://www.screentosoft.com/)。  
2. **Recorder / 录制器** → 框住浏览器窗口。  
3. 按上面分镜录一遍。  
4. **Edit / 编辑** → 剪掉发呆的停顿 → **File → Save as / 另存为** → GIF。  
5. 存到 `docs/assets/demo.gif`（没有文件夹就先建）。  

### macOS — QuickTime + 转换

1. QuickTime → New Screen Recording / 新建屏幕录制 → 按分镜录。  
2. 用 [gifski](https://gif.ski/) 或FFmpeg转成GIF：

```bash
ffmpeg -i demo.mov -vf "fps=15,scale=1280:-1:flags=lanczos" -loop 0 docs/assets/demo.gif
```

### 嵌进README

```markdown
## Demo

![Simulate workflow → Export Markdown](./docs/assets/demo.gif)
```

### 小贴士

- 书签栏藏起来；浅色主题录出来更清楚。  
- 笔记本上字太小就把浏览器缩放到110%。  
- 画面里**别**出现APIKey或.env.local。  
- 走Simulate这条路**不用**OpenAI Key，适合公开GIF。  
