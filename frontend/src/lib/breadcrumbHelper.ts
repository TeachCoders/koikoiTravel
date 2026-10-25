export interface JourneyBreadcrumbInfo {
  stateSlug: string;
  stateTitle: string;
  countrySlug: string;
  countryTitle: string;
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
      stateTitle: "South India Tours",
      countrySlug: "india",
      countryTitle: "India",
    };
  }

  // 2. Golden Triangle detection
  if (titleLower.includes("golden triangle") || slugLower.includes("golden-triangle")) {
    return {
      stateSlug: "golden-triangle",
      stateTitle: "Golden Triangle Tours",
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
      stateTitle: "Taj Mahal Tours",
      countrySlug: "india",
      countryTitle: "India",
    };
  }

  // 4. Extract from first city's state
  const firstCity = cities[0];
  if (firstCity?.state?.slug && firstCity.state.title) {
    let sSlug = firstCity.state.slug;
    let sTitle = firstCity.state.h1Title || firstCity.state.title;

    if (sSlug === "tamil-nadu" || sSlug === "karnataka") {
      sSlug = "south-india";
      sTitle = "South India Tours";
    }

    const cSlug = firstCity.state.country?.slug || "india";
    const cTitle = (firstCity.state.country?.title || "India").replace(/\s*Tour$/i, "");

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
