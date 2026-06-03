# 30-Second Demo GIF (Simulate → Export)

> **Language / 语言:** Each major section has **English** then **中文** (or inline `EN / 中文` for short items).

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

在本地或 Vercel 上运行应用后录制。目标时长：**25–35 秒**，分辨率 **1280×720** 或 **1920×1080**，15–20 FPS。

### 分镜脚本

| 秒 | 操作 | 旁白（可选） |
|----|------|--------------|
| 0–3 | 应用已加载，指向步骤条 + 标语 | 「面向 RA 外联的 AI 原生工作流——不是聊天机器人。」 |
| 3–10 | 点击 **Simulate workflow / 模拟工作流**，等待完成 | 「六步可见；结构化产物，而非一大段文字。」 |
| 10–14 | 标签页 **Paper Cards / 论文卡片** — 滚动一张卡片 | 「带字段与证据的论文卡片。」 |
| 14–17 | 标签页 **Research Map / 研究地图** — 主题 + 置信度 | 「跨论文的教授级地图。」 |
| 17–20 | 标签页 **Fit Analysis / 匹配分析** — 定位 | 「写邮件前先匹配。」 |
| 20–23 | 标签页 **Outreach Email / 外联邮件** — 草稿徽章 | 「可编辑草稿——非自动发送。」 |
| 23–30 | **Export Markdown / 导出 Markdown**（或 Copy）— 展示下载/toast | 「供最终人工审阅的便携 Markdown。」 |

### Windows — ScreenToGif（免费）

1. 安装 [ScreenToGif](https://www.screentosoft.com/)。  
2. **Recorder / 录制器** → 框选浏览器窗口区域。  
3. 按上方分镜执行。  
4. **Edit / 编辑** → 裁剪停顿 → **File → Save as / 另存为** → GIF。  
5. 保存至 `docs/assets/demo.gif`（需创建文件夹）。  

### macOS — QuickTime + 转换

1. QuickTime → New Screen Recording / 新建屏幕录制 → 按分镜录制。  
2. 用 [gifski](https://gif.ski/) 或 FFmpeg 转为 GIF：

```bash
ffmpeg -i demo.mov -vf "fps=15,scale=1280:-1:flags=lanczos" -loop 0 docs/assets/demo.gif
```

### 嵌入 README

```markdown
## Demo

![Simulate workflow → Export Markdown](./docs/assets/demo.gif)
```

### 提示

- 隐藏书签栏；使用浅色主题以提高可读性。  
- 笔记本上 UI 偏小时，浏览器缩放至 110%。  
- **切勿** 在画面中暴露 API Key 或 `.env.local`。  
- Simulate 路径 **无需** OpenAI Key——适合公开 GIF。  
