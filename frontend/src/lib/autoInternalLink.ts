const KEYWORD_LINKS: { terms: string[]; href: string }[] = [
  { terms: ["Honeymoon", "Honeymoon Tour", "Romantic"], href: "/travel-experiences/honeymoon" },
  { terms: ["Heritage & Culture", "Heritage"], href: "/travel-experiences/heritage-and-culture" },
  { terms: ["Ayurveda & Yoga", "Ayurveda", "Yoga"], href: "/travel-experiences/ayurveda-yoga" },
  { terms: ["Wildlife", "Safari"], href: "/travel-experiences/wildlife" },
  { terms: ["Spiritual", "Pilgrimage"], href: "/travel-experiences/spiritual" },
  { terms: ["Hill Station", "Hill Stations", "Mountains"], href: "/travel-experiences/hill-station" },
  { terms: ["Desert Safari", "desert"], href: "/travel-experiences/desert-safari" },
  { terms: ["Golden Triangle"], href: "/travel-experiences/golden-triangle" },
  { terms: ["Taj Mahal"], href: "/travel-experiences/taj-mahal" },
  { terms: ["Family"], href: "/travel-experiences/family" },
  { terms: ["Weekend"], href: "/travel-experiences/weekend-tours-in-india" },
  { terms: ["Beach"], href: "/travel-experiences/beach-lake" },
  { terms: ["Itinerary", "Itineraries", "Day-by-day plan"], href: "/tour-packages" },
  { terms: ["Tour Package", "Tour Packages"], href: "/tour-packages" },
];

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function linkFirstOccurrence(html: string, rawKeyword: string, href: string): string {
  const re = new RegExp(`\\b${escapeRegex(rawKeyword)}\\b`, "i");
  const match = re.exec(html);
  if (!match) return html;
  const matchedText = match[0];
  const hrefWithSlash = href.startsWith("/") ? href : `/${href}`;
  return (
    html.slice(0, match.index) +
    `<a href="${hrefWithSlash}">${matchedText}</a>` +
    html.slice(match.index + matchedText.length)
  );
}

const ANCHOR_PATTERN = /<a\b[^>]*>[\s\S]*?<\/a>/gi;
const HEADING_PATTERN = /<h([1-6])\b[^>]*>[\s\S]*?<\/h\1>/gi;

function protectSegments(
  html: string,
  pattern: RegExp,
  prefix: string
): { html: string; restore: (s: string) => string } {
  const tokens: string[] = [];
  const protectedHtml = html.replace(pattern, (m) => {
    tokens.push(m);
    return `\u0000${prefix}${tokens.length - 1}\u0000`;
  });
  return {
    html: protectedHtml,
    restore: (s: string) =>
      s.replace(new RegExp(`\u0000${prefix}(\\d+)\u0000`, "g"), (_, i) => tokens[Number(i)]),
  };
}

/**
 * Existing anchors and headings (h1-h6) are held back from keyword linking so
 * auto-links are only ever injected into plain body text.
 */
function protectExistingLinksAndHeadings(html: string): {
  html: string;
  restore: (s: string) => string;
} {
  const headings = protectSegments(html, HEADING_PATTERN, "H");
  const anchors = protectSegments(headings.html, ANCHOR_PATTERN, "A");
  return { html: anchors.html, restore: (s) => headings.restore(anchors.restore(s)) };
}

export interface AutoLinkRule {
  term: string;
  href: string;
}

export function linkKeywords(html: string, rules: AutoLinkRule[]): string {
  if (!html || !rules.length) return html;

  const sorted = [...rules].sort((a, b) => b.term.length - a.term.length);
  let working = html;
  for (const rule of sorted) {
    const guarded = protectExistingLinksAndHeadings(working);
    working = guarded.restore(linkFirstOccurrence(guarded.html, rule.term, rule.href));
  }
  return working;
}

export function buildExperienceLinkRules(): AutoLinkRule[] {
  return KEYWORD_LINKS.flatMap((entry) =>
    entry.terms.map((term) => ({ term, href: entry.href }))
  );
}

export function autoLinkKeywords(html: string): string {
  return linkKeywords(html, buildExperienceLinkRules());
}