export interface JourneyBreadcrumbInfo {
  stateSlug: string;
  stateTitle: string;
  countrySlug: string;
  countryTitle: string;
}

/**
 * Converts a slug into a clean, human-readable breadcrumb title.
 * Examples:
 *   "mathura" -> "Mathura"
 *   "uttar-pradesh" -> "Uttar Pradesh"
 *   "himachal-pradesh" -> "Himachal Pradesh"
 *   "jim-corbett-national-park" -> "Jim Corbett National Park"
 *   "jammu-and-kashmir" -> "Jammu & Kashmir"
 */
export function formatBreadcrumbTitle(slug?: string | null, fallbackTitle?: string | null): string {
  // If clean title is already a short clean name (no "Tour", "Packages", long marketing text), use it
  if (fallbackTitle && typeof fallbackTitle === "string") {
    const trimmed = fallbackTitle.trim();
    if (!/(?:tour|package|itinerary|holiday|discover|travel|[|–—:])/i.test(trimmed) && trimmed.length <= 30) {
      return trimmed;
    }
  }

  if (!slug) return (fallbackTitle || "").split(/[-–|:—]/)[0].trim();

  // Convert slug to Title Case
  const words = slug.split("-").filter(Boolean);
  const minorWords = new Set(["and", "of", "the", "in", "with", "to"]);

  const formatted = words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (lower === "and") return "&";
      if (index > 0 && minorWords.has(lower)) return lower;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");

  return formatted;
}

export function getJourneyBreadcrumbState(journey: {
  title?: string | null;
  slug?: string | null;
  cities?: Array<{
    state?: {
      id?: number;
      title?: string | null;
      slug?: string | null;
      h1Title?: string | null;
      country?: { id?: number; title?: string | null; slug?: string | null; h1Title?: string | null } | null;
    } | null;
  }>;
}): JourneyBreadcrumbInfo {
  const titleLower = (journey.title || "").toLowerCase();
  const slugLower = (journey.slug || "").toLowerCase();
  const cities = journey.cities || [];

  // 1. South India detection
  const isPureKerala =
    titleLower.includes("kerala") &&
    !titleLower.includes("south india") &&
    !titleLower.includes("karnataka");

  const isSouthIndia =
    titleLower.includes("south india") ||
    slugLower.includes("south-india") ||
    slugLower.includes("karnataka-and-kerala") ||
    slugLower.includes("karnataka-with-north-kerala") ||
    cities.some((c) => {
      const s = c.state?.slug;
      return s === "tamil-nadu" || s === "karnataka" || s === "south-india";
    });

  if (isSouthIndia && !isPureKerala) {
    return {
      stateSlug: "south-india",
      stateTitle: "South India",
      countrySlug: "india",
      countryTitle: "India",
    };
  }

  // 2. Golden Triangle detection
  if (titleLower.includes("golden triangle") || slugLower.includes("golden-triangle")) {
    return {
      stateSlug: "golden-triangle",
      stateTitle: "Golden Triangle",
      countrySlug: "india",
      countryTitle: "India",
    };
  }

  // 3. Taj Mahal Day / Short Tours detection
  if (
    (titleLower.includes("taj mahal") &&
      (titleLower.includes("day tour") ||
        titleLower.includes("same day") ||
        titleLower.includes("from delhi"))) ||
    slugLower.includes("taj-mahal") ||
    slugLower.includes("same-day-agra")
  ) {
    return {
      stateSlug: "taj-mahal",
      stateTitle: "Taj Mahal",
      countrySlug: "india",
      countryTitle: "India",
    };
  }

  // 4. Extract from first city's state
  const firstCity = cities[0];
  if (firstCity?.state?.slug && firstCity.state.title) {
    let sSlug = firstCity.state.slug;
    let sTitle = formatBreadcrumbTitle(firstCity.state.slug, firstCity.state.title);

    if (sSlug === "tamil-nadu" || sSlug === "karnataka") {
      sSlug = "south-india";
      sTitle = "South India";
    }

    const cSlug = firstCity.state.country?.slug || "india";
    const cTitle = formatBreadcrumbTitle(cSlug, firstCity.state.country?.title || "India");

    return {
      stateSlug: sSlug,
      stateTitle: sTitle,
      countrySlug: cSlug,
      countryTitle: cTitle,
    };
  }

  return {
    stateSlug: "",
    stateTitle: "",
    countrySlug: "india",
    countryTitle: "India",
  };
}
