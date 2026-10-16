import type { Journey } from "@/feature/journey/type";
import type { State } from "@/feature/state/type";
import type { City } from "@/feature/city/type";
import type { Country } from "@/feature/country/type";
import type { TravelExperience } from "@/feature/travelExperience/type";
import type { Season } from "@/feature/season/type";

export function sortByDisplayOrderAndBestSelling(a: Journey, b: Journey): number {
  const aOrder = a.displayOrder ?? 0;
  const bOrder = b.displayOrder ?? 0;
  if (aOrder > 0 && bOrder > 0) return aOrder - bOrder;
  if (aOrder > 0) return -1;
  if (bOrder > 0) return 1;
  if (a.isBestSelling && !b.isBestSelling) return -1;
  if (!a.isBestSelling && b.isBestSelling) return 1;
  return 0;
}

export function resolveStateJourneys(
  allJourneys: Journey[] | undefined,
  state: {
    id?: number;
    slug?: string;
    cities?: { id?: number; slug?: string }[];
    journeys?: Journey[];
    featuredJourneyOrder?: number[] | null;
  }
) {
  const embeddedJourneys = (state.journeys ?? []) as Journey[];
  const list = allJourneys && allJourneys.length > 0 ? allJourneys : embeddedJourneys;
  const matching = list.filter((j) =>
    embeddedJourneys.some((ej) => ej.id === j.id) ||
    (j as any).states?.some((s: any) => s.id === state.id || s.slug === state.slug) ||
    j.cities?.some(
      (c) =>
        c.state?.id === state.id ||
        c.state?.slug === state.slug ||
        (state.cities && state.cities.some((sc) => sc.id === c.id))
    ) ||
    (state.cities && j.cityIds?.some((cid) => state.cities?.some((sc) => sc.id === cid)))
  );

  const baseList = matching.length > 0 ? matching : embeddedJourneys;
  const stateJourneys = [...baseList].sort(sortByDisplayOrderAndBestSelling);

  const order = (state.featuredJourneyOrder || []) as number[];
  let featuredJourneys: Journey[] = [];
  if (order.length > 0) {
    featuredJourneys = order
      .map((id) => stateJourneys.find((j) => j.id === id))
      .filter((j): j is Journey => Boolean(j));
  }
  if (featuredJourneys.length === 0) {
    if (embeddedJourneys.length > 0) {
      featuredJourneys = embeddedJourneys;
    } else {
      featuredJourneys = stateJourneys.slice(0, 10);
    }
  }

  const topIds = new Set(featuredJourneys.map((j) => j.id));
  const otherJourneys = stateJourneys.filter((j) => !topIds.has(j.id));
  const hasBothCategories = featuredJourneys.length > 0 && otherJourneys.length > 0;

  const allOrderedJourneys = hasBothCategories
    ? [...featuredJourneys, ...otherJourneys]
    : stateJourneys;

  return {
    stateJourneys,
    featuredJourneys,
    otherJourneys,
    hasBothCategories,
    allOrderedJourneys,
  };
}

export function resolveCityJourneys(
  allJourneys: Journey[] | undefined,
  city: {
    id?: number;
    slug?: string;
    journeys?: Journey[];
  }
): Journey[] {
  const embeddedJourneys = (city.journeys ?? []) as Journey[];
  const allCityJourneys = (allJourneys || []).filter(
    (j) => j.cities?.some((c) => c.id === city.id) || j.cityIds?.includes(city.id || 0)
  );
  const embeddedIds = new Set(embeddedJourneys.map((j) => j.id));
  const remainingJourneys = allCityJourneys
    .filter((j) => !embeddedIds.has(j.id))
    .sort(sortByDisplayOrderAndBestSelling);

  const cityJourneys =
    embeddedJourneys.length > 0
      ? [...embeddedJourneys, ...remainingJourneys]
      : (allCityJourneys.length > 0 ? allCityJourneys : embeddedJourneys).sort(
          sortByDisplayOrderAndBestSelling
        );

  return cityJourneys;
}

export function resolveCountryJourneys(
  allJourneys: Journey[] | undefined,
  country: { id?: number }
) {
  return (allJourneys || [])
    .filter((j) => j.cities?.some((c) => c.state?.country?.id === country.id))
    .sort(sortByDisplayOrderAndBestSelling);
}

export function resolveTravelExperienceJourneys(
  allJourneys: Journey[] | undefined,
  experience: {
    slug?: string;
    featuredJourneyOrder?: number[] | null;
  }
) {
  const experienceJourneys = (allJourneys || [])
    .filter((j) =>
      (j.travelExperiences || []).some((e: any) => e.slug === experience.slug)
    )
    .sort((a, b) => {
      const order = experience.featuredJourneyOrder || [];
      const ai = order.indexOf(a.id);
      const bi = order.indexOf(b.id);
      const aRank = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
      const bRank = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
      if (aRank !== bRank) return aRank - bRank;
      return sortByDisplayOrderAndBestSelling(a, b);
    });

  const order = (experience.featuredJourneyOrder || []) as number[];
  let topTours: Journey[] = [];
  if (order.length > 0) {
    topTours = order
      .map((id) => experienceJourneys.find((j) => j.id === id))
      .filter((j): j is Journey => Boolean(j));
  }
  if (topTours.length === 0) {
    topTours = experienceJourneys.slice(0, 8);
  } else if (topTours.length >= experienceJourneys.length && experienceJourneys.length > 6) {
    // If all tours were previously saved in featuredJourneyOrder,
    // keep top 8 in Top Tour Packages and place remaining into Other Tour Packages
    // so 2 tabs always display just like on destination pages!
    topTours = topTours.slice(0, 8);
  }

  const topIds = new Set(topTours.map((j) => j.id));
  const otherTours = experienceJourneys.filter((j) => !topIds.has(j.id));
  const hasTabs = topTours.length > 0 && otherTours.length > 0;

  const allOrderedJourneys = hasTabs ? [...topTours, ...otherTours] : experienceJourneys;

  return {
    experienceJourneys,
    topTours,
    otherTours,
    hasTabs,
    allOrderedJourneys,
  };
}

export function resolveSeasonJourneys(
  allJourneys: Journey[] | undefined,
  season: { id?: number }
) {
  return (allJourneys || [])
    .filter((j) => j.months?.some((m) => m.id === season.id))
    .sort(sortByDisplayOrderAndBestSelling);
}
