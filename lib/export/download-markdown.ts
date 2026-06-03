/** Filename pattern: research-brief-YYYY-MM-DD.md */
export function getResearchBriefFilename(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `research-brief-${y}-${m}-${d}.md`;
}

/** Trigger a browser download of Markdown content (client-only). */
export function downloadMarkdown(filename: string, content: string): void {
  if (typeof window === "undefined") {
    throw new Error("downloadMarkdown is only available in the browser.");
  }

  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
