/** Copy Markdown to the system clipboard (client-only). */
export async function copyMarkdownToClipboard(content: string): Promise<void> {
  if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
    throw new Error("Clipboard API is not available in this browser.");
  }
  await navigator.clipboard.writeText(content);
}
