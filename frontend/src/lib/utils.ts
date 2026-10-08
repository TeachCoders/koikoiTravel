import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://koikoitravel.com";

export function absoluteUrl(src?: string | null): string | undefined {
  if (!src) return undefined;
  if (/^https?:\/\//.test(src)) return src;
  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stripHtml(html?: string) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&ndash;/gi, "\u2013")
    .replace(/&mdash;/gi, "\u2014")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateMeta(text?: string, max = 150): string {
  if (!text) return "";
  const clean = stripHtml(text);
  if (clean.length <= max) return clean;
  const hardCut = clean.slice(0, max);
  const lastSpace = hardCut.lastIndexOf(" ");
  // Word-boundary pe kaate hain taaki beech se shabd na toote
  const body = lastSpace > max * 0.5 ? hardCut.slice(0, lastSpace) : hardCut;
  return body.replace(/[\s,;:.!?\-–—]+$/, "");
}

export function stripTourSuffix(label?: string | null): string {
  if (!label) return "";
  const t = label.trim();
  const lower = t.toLowerCase();
  const suffixes = [" tour packages", " tours", " tour"];
  const matched = suffixes.find((s) => lower.endsWith(s));
  return matched ? t.slice(0, t.length - matched.length).trim() : t;
}

export function formatToursH1(title?: string | null): string {
  if (!title) return "Tour Packages";
  const clean = stripTourSuffix(title);
  return `${clean} Tour Packages`;
}

export const MAX_NAV_ITEMS = 12;

export type NavChild = { href: string; label: string };

export function pickPriorityLinks<T>(
  items: T[],
  getPriority: (item: T) => number,
  mapItem: (item: T) => NavChild
): NavChild[] {
  const sorted = [...items].sort(
    (a, b) => (getPriority(a) || 0) - (getPriority(b) || 0)
  );
  const prioritized = sorted
    .filter((item) => (getPriority(item) || 0) > 0)
    .slice(0, MAX_NAV_ITEMS)
    .map(mapItem);
  if (prioritized.length) return prioritized;
  return sorted.slice(0, MAX_NAV_ITEMS).map(mapItem);
}


