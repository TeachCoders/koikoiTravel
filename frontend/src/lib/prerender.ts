import { fetchPublicJsonCached } from "@/feature/destinations/api/public-server";

/**
 * Slug sources for `generateStaticParams`. Marketing pages are fully determined by
 * the CMS, so every slug can be known at build time. Each helper swallows fetch
 * failures and returns an empty list on purpose: an unreachable backend during a
 * deploy must not fail the build. An empty list leaves the route's
 * `dynamicParams` behaviour in place, so those pages simply render on demand
 * until the next successful build rather than 404.
 */
type SlugRow = { slug?: string | null };

/**
 * `fetchPublicJsonCached` hands back the whole `{ success, data }` envelope, so
 * every helper below unwraps `data` before reading rows. An API error surfaces as
 * `null`, which is why the cast here is only reached on a 2xx response.
 */
async function rowsFor<T>(path: string): Promise<T[]> {
  const res = await fetchPublicJsonCached<{ data?: T[] }>(path, undefined, 3600);
  return Array.isArray(res?.data) ? res.data : [];
}

async function allSlugs(path: string): Promise<string[]> {
  const rows = await rowsFor<SlugRow>(path);
  return rows
    .map((row) => row?.slug)
    .filter((slug): slug is string => typeof slug === "string" && slug.length > 0);
}

/** Paths the frontend already serves itself, so they never become CMS pages. */
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
  "contact",
  "guest-gallery",
  "season",
  "contact-us",
]);

export async function cmsPageParams(): Promise<{ slug: string[] }[]> {
  const slugs = await allSlugs("/cms?limit=5000");
  return slugs
    .filter((slug) => !RESERVED_SLUGS.has(slug))
    .map((slug) => ({ slug: [slug] }));
}

export async function countryParams(): Promise<{ country: string }[]> {
  return (await allSlugs("/country?limit=5000")).map((country) => ({ country }));
}

export async function stateParams(): Promise<{ country: string; stateSlug: string }[]> {
  const rows = await rowsFor<{ slug?: string; country?: { slug?: string } | null }>(
    "/state?limit=5000"
  );
  return rows
    .filter((row) => row?.slug && row.country?.slug)
    .map((row) => ({ country: row.country!.slug!, stateSlug: row.slug! }));
}

export async function cityParams(): Promise<
  { country: string; stateSlug: string; citySlug: string }[]
> {
  const rows = await rowsFor<{
    slug?: string;
    state?: { slug?: string; country?: { slug?: string } | null } | null;
  }>("/city?limit=5000");
  return rows
    .filter((row) => row?.slug && row.state?.slug && row.state.country?.slug)
    .map((row) => ({
      country: row.state!.country!.slug!,
      stateSlug: row.state!.slug!,
      citySlug: row.slug!,
    }));
}

export async function blogPostParams(): Promise<{ slug: string }[]> {
  return (await allSlugs("/blog?limit=5000&isActive=true")).map((slug) => ({ slug }));
}

export async function travelExperienceParams(): Promise<{ slug: string }[]> {
  // The experience model is mounted at /holidays, not /travel-experience.
  return (await allSlugs("/holidays?limit=5000&isActive=true")).map((slug) => ({ slug }));
}

export async function seasonParams(): Promise<{ slug: string }[]> {
  return (await allSlugs("/season?limit=5000&isActive=true")).map((slug) => ({ slug }));
}

/**
 * `/tour-packages/[...slug]` renders four different entity types off the same
 * path, so a segment is only prerenderable once we know which one owns it.
 * A slug that resolves to nothing at build time is left out and rendered on
 * demand instead.
 */
export async function journeyParams(): Promise<{ slug: string[] }[]> {
  const [journeys, cms, countries] = await Promise.all([
    allSlugs("/journey?limit=5000&isActive=true"),
    allSlugs("/cms?limit=5000"),
    allSlugs("/country?limit=5000"),
  ]);

  const single = new Set([...journeys, ...cms, ...countries].filter((s) => !s.includes("/")));
  return [...single].map((slug) => ({ slug: [slug] }));
}
