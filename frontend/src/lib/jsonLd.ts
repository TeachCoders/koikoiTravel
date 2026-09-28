import { SITE_URL } from "./apiClient";
import { truncateMeta } from "./utils";

function absoluteImage(src?: string): string | undefined {
  if (!src) return undefined;
  if (/^https?:\/\//.test(src)) return src;
  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`;
}
export const organizationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "KoiKoi Travel",
  alternateName: ["KoiKoi Travel India", "KoiKoi Travel Inbound India"],
  url: SITE_URL,
  logo: `${SITE_URL}/logo-with-name.png`,
  image: `${SITE_URL}/logo-with-name.png`,
  telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    ? `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`
    : "+919136739178",
  email: "support@koikoitravel.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "FIEE Complex, Okhla Phase 2",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110020",
    addressCountry: "IN",
  },
  priceRange: "$$", // Foreigners ke liye USD symbol reference better rehta hai
  areaServed: "Worldwide", // Batata hai ki aap pure globe se clients accept karte hain
  knowsAbout: [
    "India Inbound Tourism",
    "Customized India Tour Packages",
    "Private Chauffeur & Cab Rentals India",
    "Luxury Golden Triangle Tours"
  ],
  sameAs: ["https://www.facebook.com/koikoiTravel/"]
};

export const websiteSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KoiKoi Travel",
  alternateName: "KoiKoi Travel - India Inbound Travel Specialist",
  url: SITE_URL,
  description: "Bespoke India tour packages, private luxury stays, verified drivers, and local guides for foreign travelers.",
  inLanguage: ["en", "en-US"],
  publisher: {
    "@type": "TravelAgency",
    name: "KoiKoi Travel India",
  },
  potentialAction: {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export function breadcrumbSchema(
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      // Google visible breadcrumb text se exact match maangta hai
      name: item.name.replace(/\s+/g, " ").trim(),
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

interface ArticleInput {
  title: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  url: string;
  keywords?: string;
  category?: string;
  wordCount?: number;
  timeRequired?: string;
}

export function articleSchema(post: ArticleInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description ? truncateMeta(post.description) : undefined,
    image: absoluteImage(post.image),
    datePublished: post.datePublished || undefined,
    dateModified: post.dateModified || undefined,
    author: post.author
      ? { "@type": "Person", name: post.author }
      : { "@type": "Organization", name: "KoiKoi Travel" },
    publisher: {
      "@type": "Organization",
      name: "KoiKoi Travel",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-with-name.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${post.url}`,
    },
    ...(post.category ? { articleSection: post.category } : {}),
    ...(post.keywords ? { keywords: post.keywords } : {}),
    ...(post.wordCount ? { wordCount: post.wordCount } : {}),
    ...(post.timeRequired ? { timeRequired: post.timeRequired } : {}),
    inLanguage: "en",
    isAccessibleForFree: true,
    copyrightYear: post.datePublished ? new Date(post.datePublished).getFullYear() : undefined,
  };
}

interface TouristTripInput {
  name: string;
  description?: string;
  image?: string;
  url: string;
  itinerary?: { day: string; description?: string }[];
  touristType?: string[];
  keywords?: string;
}

export function touristTripSchema(trip: TouristTripInput): Record<string, unknown> {
  return {
    "@type": "TouristTrip",
    name: trip.name,
    description: trip.description ? truncateMeta(trip.description) : undefined,
    image: absoluteImage(trip.image),
    url: `${SITE_URL}${trip.url}`,
    provider: {
      "@type": "TravelAgency",
      name: "KoiKoi Travel",
      url: SITE_URL,
    },
    ...(trip.touristType && trip.touristType.length > 0 ? { touristType: trip.touristType } : {}),
    ...(trip.keywords ? { keywords: trip.keywords } : {}),
    ...(trip.itinerary && trip.itinerary.length > 0
      ? {
        itinerary: {
          "@type": "ItemList",
          numberOfItems: trip.itinerary.length,
          itemListElement: trip.itinerary.map((d, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: d.day,
            description: d.description ? truncateMeta(d.description, 300) : undefined,
          })),
        },
      }
      : {}),
  };
}

export function graphSchema(nodes: Record<string, unknown>[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    // Har node ka apna "@context" hatate hain — ek document me ek hi chahiye
    "@graph": nodes.map((node) => {
      if (!node["@context"]) return node;
      const rest = { ...node };
      delete rest["@context"];
      return rest;
    }),
  };
}

export function faqSchema(
  faqs: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function itemListSchema(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
    })),
  };
}

interface TouristDestinationInput {
  name: string;
  description?: string;
  image?: string;
  url: string;
}

export function touristDestinationSchema(dest: TouristDestinationInput): Record<string, unknown> {
  return {
    "@type": "TouristDestination",
    name: dest.name,
    description: dest.description ? truncateMeta(dest.description) : undefined,
    image: absoluteImage(dest.image),
    url: `${SITE_URL}${dest.url}`,
  };
}

const TOURIST_TYPE_MAP: Record<string, string[]> = {
  honeymoon: ["Honeymoon"],
  "heritage and culture": ["Cultural Tourism", "Heritage Tourism"],
  "cultural tourism": ["Cultural Tourism"],
  "heritage tourism": ["Heritage Tourism"],
  luxury: ["Luxury Tourism"],
  "luxury escapes": ["Luxury Tourism"],
  family: ["Family"],
  "family vacation": ["Family"],
  adventure: ["Adventure Tourism"],
  trekking: ["Adventure Tourism"],
  wildlife: ["Wildlife Tourism"],
  safari: ["Wildlife Tourism"],
  pilgrimage: ["Pilgrimage Tourism"],
  spiritual: ["Pilgrimage Tourism"],
  beach: ["Beach Tourism"],
};

const JOURNEY_SIGNALS: { type: string; words: string[] }[] = [
  { type: "Cultural Tourism", words: ["cultural", "folk dance", "culture"] },
  {
    type: "Heritage Tourism",
    words: ["heritage", "fort", "palace", "mughal", "rajput", "unesco", "historic", "architect"],
  },
  { type: "Architecture Tourism", words: ["architect"] },
];

export function buildTouristType(
  experiences?: { title: string }[],
  journeyText?: string
): { touristType: string[]; keywords: string[] } {
  const keywords: string[] = [];
  const types: string[] = [];

  for (const exp of experiences ?? []) {
    const title = exp.title?.trim();
    if (!title) continue;
    if (!keywords.some((k) => k.toLowerCase() === title.toLowerCase())) {
      keywords.push(title);
    }
    const mapped = TOURIST_TYPE_MAP[title.toLowerCase()];
    if (mapped) {
      for (const t of mapped) if (!types.includes(t)) types.push(t);
    }
  }

  const haystack = (journeyText ?? "").toLowerCase();
  if (haystack.trim()) {
    for (const signal of JOURNEY_SIGNALS) {
      if (!types.includes(signal.type) && signal.words.some((w) => haystack.includes(w))) {
        types.push(signal.type);
      }
    }
  }

  return { touristType: types, keywords };
}

interface TouristAttractionInput {
  name: string;
  description?: string;
  image?: string;
  url: string;
}

export function touristAttractionSchema(att: TouristAttractionInput): Record<string, unknown> {
  return {
    "@type": "TouristAttraction",
    name: att.name,
    description: att.description ? truncateMeta(att.description) : undefined,
    image: absoluteImage(att.image),
    url: `${SITE_URL}${att.url}`,
  };
}

interface WebPageInput {
  name: string;
  url: string;
  description?: string;
}

export function webPageSchema(
  page: WebPageInput,
  type: "AboutPage" | "ContactPage" | "WebPage"
): Record<string, unknown> {
  return {
    "@type": type,
    name: page.name,
    description: page.description ? truncateMeta(page.description) : undefined,
    url: `${SITE_URL}${page.url}`,
    isPartOf: { "@type": "WebSite", name: "KoiKoi Travel", url: SITE_URL },
  };
}
