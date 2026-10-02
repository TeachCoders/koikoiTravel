import { fetchPublicJsonCached } from "@/feature/destinations/api/public-server";
import { HeroFullBanner } from "../type";

/**
 * Server Component / ISR-friendly fetch for Hero Banners.
 */
export async function fetchHeroBannersServer(
  entityType: string,
  options?: { entityId?: number; slug?: string; pageSlug?: string }
): Promise<HeroFullBanner[]> {
  try {
    const params = new URLSearchParams();
    params.append("entityType", entityType);
    if (options?.entityId) {
      params.append("entityId", String(options.entityId));
    }
    const slug = options?.slug || options?.pageSlug;
    if (slug) {
      params.append("slug", slug);
    }

    const res = await fetchPublicJsonCached<{ success: boolean; data: HeroFullBanner[] }>(
      `/hero-full-banner?${params.toString()}`,
      undefined,
      300
    );
    return res?.data || [];
  } catch (err) {
    console.error(`[fetchHeroBannersServer] Error fetching ${entityType}:`, err);
    return [];
  }
}
