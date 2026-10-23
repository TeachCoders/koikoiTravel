import type { Journey } from "@/feature/journey/type";
import type { State } from "@/feature/state/type";
import type { City } from "@/feature/city/type";
import type { Country } from "@/feature/country/type";
import type { TravelExperience } from "@/feature/travelExperience/type";
import type { Season } from "@/feature/season/type";

export function parseJourneyDays(j: {
  noDays?: number | null;
  duration?: string | null;
  title?: string | null;
  slug?: string | null;
}): number {
  if (typeof j?.noDays === "number" && j.noDays > 0) return j.noDays;
  if (j?.duration) {
    const match = String(j.duration).match(/(\d+)\s*(?:Day|Night|D)/i);
    if (match) return parseInt(match[1], 10);
  }
  if (j?.title) {
    const match = String(j.title).match(/(\d+)\s*(?:Day|Night|D)/i);
    if (match) return parseInt(match[1], 10);
  }
  if (j?.slug) {
    const match = String(j.slug).match(/(\d+)-day/i);
    if (match) return parseInt(match[1], 10);
  }
  return 999;
}

export function sortByDaysAscending(a: any, b: any): number {
  const aDays = parseJourneyDays(a);
  const bDays = parseJourneyDays(b);
  if (aDays !== bDays) return aDays - bDays;
  return (a.title || "").localeCompare(b.title || "");
}

export function sortByDisplayOrderAndBestSelling(a: Journey, b: Journey): number {
  const aOrder = a.displayOrder ?? 0;
  const bOrder = b.displayOrder ?? 0;
  if (aOrder > 0 && bOrder > 0) return aOrder - bOrder;
  if (aOrder > 0) return -1;
  if (bOrder > 0) return 1;
  if (a.isBestSelling && !b.isBestSelling) return -1;
  if (!a.isBestSelling && b.isBestSelling) return 1;
  return sortByDaysAscending(a, b);
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
  let selectedJourneys: Journey[] = [];
  if (order.length > 0) {
    selectedJourneys = order
      .map((id) => (allJourneys || []).find((j) => j.id === id) || stateJourneys.find((j) => j.id === id))
      .filter((j): j is Journey => Boolean(j));
  } else if (embeddedJourneys.length > 0) {
    selectedJourneys = embeddedJourneys;
  }

  // Strictly show the curated/selected packages. Fall back to state journeys only if none selected.
  const finalJourneys = selectedJourneys.length > 0 ? selectedJourneys : stateJourneys;

  return {
    stateJourneys: finalJourneys,
    featuredJourneys: finalJourneys,
    otherJourneys: [],
    hasBothCategories: false,
    allOrderedJourneys: finalJourneys,
  };
}

export function resolveCityJourneys(
  allJourneys: Journey[] | undefined,
  city: {
    id?: number;
    slug?: string;
    journeys?: Journey[];
    featuredJourneyOrder?: number[] | null;
  }
): Journey[] {
  const embeddedJourneys = (city.journeys ?? []) as Journey[];
  const order = (city.featuredJourneyOrder || []) as number[];
  const allCityJourneys = (allJourneys || []).filter(
    (j) => j.cities?.some((c) => c.id === city.id) || j.cityIds?.includes(city.id || 0)
  );

  let selectedJourneys: Journey[] = [];
  if (order.length > 0) {
    selectedJourneys = order
      .map((id) => (allJourneys || []).find((j) => j.id === id) || allCityJourneys.find((j) => j.id === id))
      .filter((j): j is Journey => Boolean(j));
  } else if (embeddedJourneys.length > 0) {
    selectedJourneys = embeddedJourneys;
  }

  return selectedJourneys.length > 0
    ? selectedJourneys
    : allCityJourneys.sort(sortByDisplayOrderAndBestSelling);
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
  const order = (experience.featuredJourneyOrder || []) as number[];
  const taggedJourneys = (allJourneys || [])
    .filter((j) =>
      (j.travelExperiences || []).some((e: any) => e.slug === experience.slug)
    )
    .sort(sortByDaysAscending);

  let selectedTours: Journey[] = [];
  if (order.length > 0) {
    selectedTours = order
      .map((id) => (allJourneys || []).find((j) => j.id === id) || taggedJourneys.find((j) => j.id === id))
      .filter((j): j is Journey => Boolean(j));
  }

  // Strictly show the curated/selected packages. Fall back to tagged journeys only if none selected.
  const finalJourneys = selectedTours.length > 0 ? selectedTours : taggedJourneys;

  return {
    experienceJourneys: finalJourneys,
    topTours: finalJourneys,
    otherTours: [],
    hasTabs: false,
    allOrderedJourneys: finalJourneys,
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
