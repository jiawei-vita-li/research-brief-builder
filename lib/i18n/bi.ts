/**
 * Bilingual helpers. Chinese copy is normalized so Latin letters and digits
 * sit flush against CJK text (no spaces): e.g. 导出Markdown, 至少80字.
 */
export function zhNormalize(zh: string): string {
  return zh
    .replace(/([\u4e00-\u9fff\u3001-\u303f\uff00-\uffef])\s+([A-Za-z0-9])/g, "$1$2")
    .replace(/([A-Za-z0-9])\s+([\u4e00-\u9fff\u3001-\u303f\uff00-\uffef])/g, "$1$2")
    .replace(/(\d)\s+([\u4e00-\u9fff])/g, "$1$2")
    .replace(/([\u4e00-\u9fff])\s+(\d)/g, "$1$2");
}

/** UI: English / 中文 (single line) */
export function bi(en: string, zh: string): string {
  return `${en} / ${zhNormalize(zh)}`;
}

/** Markdown export headings */
export function mdH2(en: string, zh: string): string {
  return `## ${en} / ${zhNormalize(zh)}\n\n`;
}

export function mdH3(en: string, zh: string): string {
  return `### ${en} / ${zhNormalize(zh)}\n\n`;
}
