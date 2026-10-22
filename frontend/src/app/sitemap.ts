import type { MetadataRoute } from "next";
const API_BASE = process.env.API_BASE_URL || "http://localhost:5000";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://koikoitravel.com";

export const revalidate = 300;

type SitemapItem = {
  slug: string;
  updatedAt?: string;
  country?: { slug: string } | null;
  state?: { slug: string; country?: { slug: string } | null } | null;
  cities?: { slug: string; state?: { slug: string; country?: { slug: string } | null } | null }[];
  category?: string;
};

async function fetchAll<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch {
    return [];
  }
}

function url(path: string, lastModified?: string): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  };
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

  const entries: MetadataRoute.Sitemap = [
    url("/", new Date().toISOString()),
    url("/destinations"),
    url("/travel-experiences"),
    url("/blog"),
    url("/tour-packages"),
  ];

  countries.forEach((c: SitemapItem) => entries.push(url(`/tour-packages/${c.slug}`, c.updatedAt)));
  states.forEach((s: SitemapItem) => {
    if (s.slug === "golden-triangle" || s.slug === "golden-triangle-tour-india") return;
    if (s.country?.slug) entries.push(url(`/tour-packages/${s.country.slug}/${s.slug}`, s.updatedAt));
  });
  cities.forEach((c: SitemapItem) => {
    if (c.state?.country?.slug) {
      entries.push(url(`/tour-packages/${c.state.country.slug}/${c.state.slug}/${c.slug}`, c.updatedAt));
    }
  });
  experiences.forEach((e: SitemapItem) => entries.push(url(`/travel-experiences/${e.slug}`, e.updatedAt)));

  // Append valid state-experience combinations (strictly minimum 3 packages, excluding Golden Triangle)
  const expStateCombos = new Map<string, { expSlug: string; stateSlug: string; count: number; updatedAt?: string }>();
  journeys.forEach((j: any) => {
    (j.travelExperiences || []).forEach((exp: any) => {
      if (!exp.slug || exp.slug === "golden-triangle-tour-india" || exp.slug === "golden-triangle") return;
      (j.states || []).forEach((st: any) => {
        if (!st.slug) return;
        const key = `${exp.slug}___${st.slug}`;
        const item = expStateCombos.get(key);
        if (item) {
          item.count += 1;
        } else {
          expStateCombos.set(key, { expSlug: exp.slug, stateSlug: st.slug, count: 1, updatedAt: j.updatedAt });
        }
      });
    });
  });

  expStateCombos.forEach((val) => {
    if (val.count >= 3) {
      entries.push(url(`/travel-experiences/${val.expSlug}/${val.stateSlug}`, val.updatedAt));
    }
  });
  journeys.forEach((j: SitemapItem) => {
    entries.push(url(`/tour-packages/${j.slug}`, j.updatedAt));
  });
  posts.forEach((p: SitemapItem) => entries.push(url(`/blog/${p.slug}`, p.updatedAt)));
  cmsPages.forEach((c: SitemapItem) => {
    if (RESERVED_SLUGS.has(c.slug)) return;
    entries.push(url(`/${c.slug}`, c.updatedAt));
  });

  return entries;
}
