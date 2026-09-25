import DOMPurify from "isomorphic-dompurify";
import { cn } from "@/lib/utils";

function isDarkCssColor(cssColor: string): boolean {
  let r = 0, g = 0, b = 0;
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(cssColor.trim());
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.split("").map((ch) => ch + ch).join("");
    r = parseInt(h.slice(0, 2), 16);
    g = parseInt(h.slice(2, 4), 16);
    b = parseInt(h.slice(4, 6), 16);
  } else {
    const rgb = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(cssColor.trim());
    if (!rgb) return false;
    r = Number(rgb[1]);
    g = Number(rgb[2]);
    b = Number(rgb[3]);
  }
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128;
}

function fixTableCellTextContrast(html: string): string {
  return html.replace(/<(td|th)\b([^>]*)>/gi, (tag, _cell, attrs) => {
    const styleMatch = /\bstyle\s*=\s*(['"])(.*?)\1/i.exec(attrs);
    if (!styleMatch || /(^|[; ])color\s*:/i.test(styleMatch[2])) return tag;
    const bg = /\bbackground-color\s*:\s*([^;]+)/i.exec(styleMatch[2]);
    if (!bg || !isDarkCssColor(bg[1])) return tag;
    const incoming = styleMatch[1];
    const style = styleMatch[2];
    const needsTerminator = !/;\s*$/.test(style);
    const newStyle = `${style}${needsTerminator ? ";" : ""}color: rgb(255,255,255)`;
    return tag.replace(styleMatch[0], `style=${incoming}${newStyle}${incoming}`);
  });
}

export function sanitizeHtml(html: string): string {
  const clean = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ["style", "script", "iframe", "form", "input", "button"],
    ADD_ATTR: ["target", "rel"],
  });
  const fixed = fixTableCellTextContrast(clean).replace(/<h1\b[^>]*>/gi, (match) => match.replace(/<h1/i, "<h2")).replace(/<\/h1>/gi, "</h2>");
  return fixed;
}

export default function RichContent({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn("rich-text", className)}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
    />
  );
}
