export interface AutoLinkRule {
  term: string;
  href: string;
}

const KEYWORD_LINKS: { terms: string[]; href: string }[] = [
  // Core Travel Experiences
  {
    terms: ["Golden Triangle Tour", "Golden Triangle Tours", "Golden Triangle Itinerary", "Golden Triangle"],
    href: "/travel-experiences/golden-triangle",
  },
  {
    terms: ["Taj Mahal Tour", "Taj Mahal Tours", "Taj Mahal"],
    href: "/travel-experiences/taj-mahal",
  },
  {
    terms: ["Honeymoon Packages", "Honeymoon Tour", "Honeymoon Tours", "Honeymoon"],
    href: "/travel-experiences/honeymoon",
  },
  {
    terms: ["Heritage & Culture", "Heritage Tours", "Heritage Tour", "Cultural Heritage", "Heritage"],
    href: "/travel-experiences/heritage-and-culture",
  },
  {
    terms: ["Ayurveda & Yoga", "Ayurveda Retreat", "Yoga Retreat", "Ayurveda", "Yoga Tour"],
    href: "/travel-experiences/ayurveda-yoga",
  },
  {
    terms: ["Wildlife Safari", "Wildlife Tours", "Wildlife Tour", "Jungle Safari", "Tiger Safari", "Wildlife"],
    href: "/travel-experiences/wildlife",
  },
  {
    terms: ["Desert Safari", "Camel Safari", "Sam Sand Dunes", "Thar Desert"],
    href: "/travel-experiences/desert-safari",
  },
  {
    terms: ["Spiritual Tours", "Spiritual Tour", "Pilgrimage Tour", "Pilgrimage Tours", "Spiritual"],
    href: "/travel-experiences/spiritual",
  },
  {
    terms: ["Hill Station Tours", "Hill Station Tour", "Hill Stations", "Hill Station"],
    href: "/travel-experiences/hill-station",
  },
  {
    terms: ["Weekend Tours in India", "Weekend Tours", "Weekend Getaway", "Weekend Getaways"],
    href: "/travel-experiences/weekend-tours-in-india",
  },
  {
    terms: ["Family Tour Packages", "Family Holiday Packages", "Family Tour", "Family Vacations"],
    href: "/travel-experiences/family",
  },
  {
    terms: ["Beach Holidays", "Beach Holiday", "Beach & Lake", "Beach Tour"],
    href: "/travel-experiences/beach-lake",
  },

  // States
  {
    terms: ["Maharashtra Tour Packages", "Maharashtra Tours", "Maharashtra"],
    href: "/tour-packages/india/maharashtra",
  },
  {
    terms: ["Madhya Pradesh Tour Packages", "Madhya Pradesh Tours", "Madhya Pradesh"],
    href: "/tour-packages/india/madhya-pradesh",
  },
  {
    terms: ["Rajasthan Tour Packages", "Rajasthan Tours", "Rajasthan Heritage", "Rajasthan"],
    href: "/tour-packages/india/rajasthan",
  },
  {
    terms: ["Uttar Pradesh Tour Packages", "Uttar Pradesh Tours", "Uttar Pradesh"],
    href: "/tour-packages/india/uttar-pradesh",
  },
  {
    terms: ["Himachal Pradesh Tour Packages", "Himachal Pradesh Tours", "Himachal Pradesh", "Himachal"],
    href: "/tour-packages/india/himachal-pradesh",
  },
  {
    terms: ["Uttarakhand Tour Packages", "Uttarakhand Tours", "Uttarakhand"],
    href: "/tour-packages/india/uttarakhand",
  },
  {
    terms: ["Kashmir Tour Packages", "Kashmir Holiday Packages", "Jammu and Kashmir", "Kashmir"],
    href: "/tour-packages/india/jammu-and-kashmir",
  },
  {
    terms: ["Ladakh Tour Packages", "Ladakh Bike Trip", "Ladakh"],
    href: "/tour-packages/india/ladakh",
  },
  {
    terms: ["Delhi NCR", "Delhi Tour Packages", "New Delhi"],
    href: "/tour-packages/india/delhi",
  },
  {
    terms: ["Chandigarh"],
    href: "/tour-packages/india/chandigarh",
  },

  // Prominent Tourist Destinations & Cities
  { terms: ["Mumbai"], href: "/tour-packages/india/maharashtra/mumbai" },
  { terms: ["Ajanta Caves", "Ellora Caves", "Ajanta Ellora Caves", "Aurangabad", "Chhatrapati Sambhajinagar"], href: "/tour-packages/india/maharashtra/aurangabad" },
  { terms: ["Nashik"], href: "/tour-packages/india/maharashtra/nashik" },
  { terms: ["Tadoba National Park", "Tadoba-Andhari", "Tadoba"], href: "/tour-packages/india/maharashtra/tadoba" },
  { terms: ["Khajuraho Temples", "Khajuraho"], href: "/tour-packages/india/madhya-pradesh/khajuraho" },
  { terms: ["Orchha Fort", "Orchha"], href: "/tour-packages/india/madhya-pradesh/orchha" },
  { terms: ["Bandhavgarh National Park", "Bandhavgarh"], href: "/tour-packages/india/madhya-pradesh/bandhavgarh" },
  { terms: ["Kanha National Park", "Kanha"], href: "/tour-packages/india/madhya-pradesh/kanha-national-park" },
  { terms: ["Gwalior Fort", "Gwalior"], href: "/tour-packages/india/madhya-pradesh" },
  { terms: ["Jaipur"], href: "/tour-packages/india/rajasthan/jaipur" },
  { terms: ["Udaipur"], href: "/tour-packages/india/rajasthan/udaipur" },
  { terms: ["Jodhpur"], href: "/tour-packages/india/rajasthan/jodhpur" },
  { terms: ["Jaisalmer"], href: "/tour-packages/india/rajasthan/jaisalmer" },
  { terms: ["Pushkar"], href: "/tour-packages/india/rajasthan/pushkar" },
  { terms: ["Ranthambore National Park", "Ranthambore"], href: "/tour-packages/india/rajasthan/ranthambore" },
  { terms: ["Agra"], href: "/tour-packages/india/uttar-pradesh/agra" },
  { terms: ["Varanasi"], href: "/tour-packages/india/uttar-pradesh/varanasi" },
  { terms: ["Mathura"], href: "/tour-packages/india/uttar-pradesh/mathura" },
  { terms: ["Vrindavan"], href: "/tour-packages/india/uttar-pradesh/vrindavan" },
  { terms: ["Ayodhya"], href: "/tour-packages/india/uttar-pradesh/ayodhya" },
  { terms: ["Shimla"], href: "/tour-packages/india/himachal-pradesh/shimla" },
  { terms: ["Manali"], href: "/tour-packages/india/himachal-pradesh/manali" },
  { terms: ["Dharamshala"], href: "/tour-packages/india/himachal-pradesh/dharamshala" },
  { terms: ["Rishikesh"], href: "/tour-packages/india/uttarakhand/rishikesh" },
  { terms: ["Haridwar"], href: "/tour-packages/india/uttarakhand/haridwar" },
  { terms: ["Jim Corbett National Park", "Jim Corbett"], href: "/tour-packages/india/uttarakhand/jim-corbett-national-park" },
  { terms: ["Nainital"], href: "/tour-packages/india/uttarakhand/nainital" },
  { terms: ["Srinagar"], href: "/tour-packages/india/jammu-and-kashmir/srinagar" },
  { terms: ["Gulmarg"], href: "/tour-packages/india/jammu-and-kashmir/gulmarg" },
  { terms: ["Pahalgam"], href: "/tour-packages/india/jammu-and-kashmir/pahalgam" },
  { terms: ["Leh"], href: "/tour-packages/india/ladakh/leh" },
  { terms: ["Nubra Valley"], href: "/tour-packages/india/ladakh/nubra-valley" },
  { terms: ["Pangong Tso", "Pangong Lake"], href: "/tour-packages/india/ladakh/pangong-tso" },

  // General Tours Explorer
  { terms: ["India Tour Packages", "Tour Packages", "Tour Package", "Holiday Packages"], href: "/tour-packages" },
];

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildExperienceLinkRules(): AutoLinkRule[] {
  return KEYWORD_LINKS.flatMap((entry) =>
    entry.terms.map((term) => ({ term, href: entry.href }))
  );
}

/**
 * Links keywords safely across HTML text nodes.
 * STRICTLY PREVENTS linking inside:
 * - <h1>, <h2>, <h3>, <h4>, <h5>, <h6> headings
 * - Existing <a> anchor links
 * - HTML tags & attributes
 */
export function linkKeywords(html: string, rules: AutoLinkRule[]): string {
  if (!html || !rules.length) return html;

  const sortedRules = [...rules].sort((a, b) => b.term.length - a.term.length);
  const protectedTokens: string[] = [];

  // Step 1: Protect all headings (h1, h2, h3, h4, h5, h6) so they are NEVER linked
  let working = html.replace(/<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>/gi, (m) => {
    protectedTokens.push(m);
    return `___NO_LINK_H_${protectedTokens.length - 1}___`;
  });

  // Step 2: Protect existing <a>...</a> tags so they don't get nested links
  working = working.replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, (m) => {
    protectedTokens.push(m);
    return `___NO_LINK_A_${protectedTokens.length - 1}___`;
  });

  // Step 3: Protect HTML tags so search only runs in plain text
  const tagTokens: string[] = [];
  working = working.replace(/<[^>]+>/g, (m) => {
    tagTokens.push(m);
    return `___HTML_TAG_${tagTokens.length - 1}___`;
  });

  // Step 4: Link first occurrence of each unique keyword in body text
  for (const rule of sortedRules) {
    const regex = new RegExp(`\\b(${escapeRegex(rule.term)})\\b`, "i");
    const match = regex.exec(working);
    if (match) {
      const matchedText = match[1];
      const href = rule.href.startsWith("/") ? rule.href : `/${rule.href}`;
      const anchor = `<a href="${href}" class="text-[#2E8B8B] hover:underline font-medium">${matchedText}</a>`;
      protectedTokens.push(anchor);
      const tokenRef = `___LINK_INJECTED_${protectedTokens.length - 1}___`;

      working =
        working.slice(0, match.index) +
        tokenRef +
        working.slice(match.index + matchedText.length);
    }
  }

  // Step 5: Restore HTML tags
  working = working.replace(/___HTML_TAG_(\d+)___/g, (_, i) => tagTokens[Number(i)] ?? "");

  // Step 6: Restore headings, existing links, and newly injected links
  working = working.replace(/___(?:NO_LINK_[AH]|LINK_INJECTED)_(\d+)___/g, (_, i) => protectedTokens[Number(i)] ?? "");

  return working;
}

export function autoLinkKeywords(html: string): string {
  return linkKeywords(html, buildExperienceLinkRules());
}