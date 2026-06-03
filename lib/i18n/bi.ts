/** Bilingual UI copy: English / 中文 */
export function bi(en: string, zh: string): string {
  return `${en} / ${zh}`;
}

/** Markdown section heading */
export function mdH2(en: string, zh: string): string {
  return `## ${en} / ${zh}\n\n`;
}

export function mdH3(en: string, zh: string): string {
  return `### ${en} / ${zh}\n\n`;
}
