import type { MetadataRoute } from "next";
import { isIndexableCity } from "@/lib/cityValidation";

const API_BASE = process.env.API_BASE_URL || "http://localhost:5000";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://koikoitravel.com";

export const revalidate = 300;

type SitemapItem = {
  id?: number;
  slug: string;
  destination?: string;
  updatedAt?: string;
  contentUpdatedAt?: string;
  isActive?: boolean;
  showOnSite?: boolean;
  tourCount?: number;
  journeys?: any[];
  country?: { slug: string } | null;
  state?: { slug: string; country?: { slug: string } | null } | null;
  states?: { slug: string }[];
  cities?: { slug: string; state?: { slug: string; country?: { slug: string } | null } | null }[];
  category?: string;
};

async function fetchAll<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 300 } });
    if (!res.ok) {
      console.error(`[sitemap] Error fetching ${path}: ${res.status} ${res.statusText}`);
      return [];
    }
    const json = await res.json();
    return json?.data || [];
  } catch (err) {
    console.error(`[sitemap] Network error fetching ${path}:`, err);
    return [];
  }
}

function toValidDate(dateVal?: string | Date | null): Date | undefined {
  if (!dateVal) return undefined;
  const d = dateVal instanceof Date ? dateVal : new Date(dateVal);
  return isNaN(d.getTime()) ? undefined : d;
}

function maxDate(...dates: (Date | string | undefined | null)[]): Date | undefined {
  let latest: Date | undefined = undefined;
  for (const d of dates) {
    const valid = toValidDate(d);
    if (valid) {
      if (!latest || valid.getTime() > latest.getTime()) {
        latest = valid;
      }
    }
  }
  return latest;
}

function url(path: string, lastModified?: string | Date | null): MetadataRoute.Sitemap[number] {
  const item: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}${path}`,
  };
  const d = toValidDate(lastModified);
  if (d) {
    item.lastModified = d;
  }
  return item;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [countries, states, cities, experiences, journeys, posts, cmsPages] =
    await Promise.all([
      fetchAll<SitemapItem>("/country?limit=5000&isActive=true"),
      fetchAll<SitemapItem>("/state?limit=5000&isActive=true"),
      fetchAll<SitemapItem>("/city?limit=5000&isActive=true"),
      fetchAll<SitemapItem>("/holidays?limit=5000&isActive=true"),
      fetchAll<SitemapItem>("/journey?limit=5000&isActive=true"),
      fetchAll<SitemapItem>("/blog?limit=5000&isActive=true"),
      fetchAll<SitemapItem>("/cms?limit=5000&isActive=true"),
    ]);

  const RESERVED_SLUGS = new Set([
    "tour-packages",
    "travel-experiences",
    "blog",
    "packages",
    "auth",
    "booking",
    "profile",
    "dashboard",
    "destinations",
  ]);

  // Compute realistic lastModified for hubs based on active child content
  const tourPackagesLastMod = maxDate(...journeys.map((j) => j.contentUpdatedAt));
  const destinationsLastMod = maxDate(
    ...states.map((s) => s.contentUpdatedAt),
    ...cities.map((c) => c.contentUpdatedAt)
  );
  const travelExperiencesLastMod = maxDate(...experiences.map((e) => e.contentUpdatedAt));
  const blogLastMod = maxDate(...posts.map((p) => p.contentUpdatedAt));
  const homeLastMod = maxDate(
    tourPackagesLastMod,
    destinationsLastMod,
    travelExperiencesLastMod,
    blogLastMod
  );

  const goldenTriangleState = states.find(
    (s) => s.slug === "golden-triangle" || s.slug === "golden-triangle-tour-india"
  );
  const gtLastMod = maxDate(
    goldenTriangleState?.contentUpdatedAt,
    ...journeys
      .filter((j) => (j.cities || []).some((c: any) => c.slug === "agra" || c.slug === "jaipur" || c.slug === "delhi"))
      .map((j) => j.contentUpdatedAt)
  );

  const entries: MetadataRoute.Sitemap = [
    url("/", homeLastMod),
    url("/tour-packages", tourPackagesLastMod),
    url("/destinations", destinationsLastMod),
    url("/travel-experiences", travelExperiencesLastMod),
    url("/tour-packages/india/golden-triangle", gtLastMod),
    url("/blog", blogLastMod),
    url("/contact-us"),
  ];

  // Count journeys per state and city to filter out thin pages (< 2 tours)
  const stateTourCount = new Map<string, number>();
  const cityTourCount = new Map<string, number>();

  journeys.forEach((j: SitemapItem) => {
    const visitedStates = new Set<string>();
    const visitedCities = new Set<string>();

    (j.cities || []).forEach((c: any) => {
      if (c.slug && !visitedCities.has(c.slug)) {
        visitedCities.add(c.slug);
        cityTourCount.set(c.slug, (cityTourCount.get(c.slug) || 0) + 1);
      }
      if (c.state?.slug && !visitedStates.has(c.state.slug)) {
        visitedStates.add(c.state.slug);
        stateTourCount.set(c.state.slug, (stateTourCount.get(c.state.slug) || 0) + 1);
      }
    });

    (j.states || []).forEach((s: any) => {
      if (s.slug && !visitedStates.has(s.slug)) {
        visitedStates.add(s.slug);
        stateTourCount.set(s.slug, (stateTourCount.get(s.slug) || 0) + 1);
      }
    });
  });

  countries.forEach((c: SitemapItem) => {
    entries.push(url(`/tour-packages/${c.slug}`, c.contentUpdatedAt));
  });

  states.forEach((s: any) => {
    if (s.slug === "golden-triangle" || s.slug === "golden-triangle-tour-india") return;
    if (s.isActive === false || s.showOnSite === false) return;
    const count = stateTourCount.get(s.slug) || 0;
    if (count < 2 && s.slug !== "south-india") return;
    const countrySlug = s.country?.slug || "india";
    entries.push(url(`/tour-packages/${countrySlug}/${s.slug}`, s.contentUpdatedAt));
  });

  cities.forEach((c: any) => {
    if (!isIndexableCity(c.state?.slug, c.slug)) return;
    const count = c.tourCount ?? (Array.isArray(c.journeys) ? c.journeys.length : 0);
    if (count < 2) return;
    if (c.isActive === false || c.showOnSite === false) return;
    const countrySlug = c.state?.country?.slug || "india";
    entries.push(
      url(`/tour-packages/${countrySlug}/${c.state.slug}/${c.slug}`, c.contentUpdatedAt)
    );
  });

  experiences.forEach((e: SitemapItem) => {
    if (e.slug === "golden-triangle" || e.slug === "golden-triangle-tour-india" || e.slug === "taj-mahal") return;
    entries.push(url(`/travel-experiences/${e.slug}`, e.contentUpdatedAt));
  });

  journeys.forEach((j: SitemapItem) => {
    entries.push(url(`/tour-packages/${j.slug}`, j.contentUpdatedAt));
  });

  posts.forEach((p: SitemapItem) => {
    entries.push(url(`/blog/${p.slug}`, p.contentUpdatedAt));
  });

  cmsPages.forEach((c: any) => {
    if (RESERVED_SLUGS.has(c.slug)) return;
    if (c.slug === "cancellation-and-refund-policy") return;
    entries.push(url(`/${c.slug}`, c.contentUpdatedAt));
  });

  return entries;
}
