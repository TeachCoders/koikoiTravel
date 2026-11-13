import { fetchPublicJsonCached } from "@/feature/destinations/api/public-server";
import { fetchHeroBannersServer } from "@/feature/heroBanner/api/server";
import HomePageClient from "./HomePageClient";
import type { State, PaginatedResponse as StatePage } from "@/feature/state/type";
import type { TravelExperience, PaginatedResponse as ExperiencePage } from "@/feature/travelExperience/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import type { HeroFullBanner } from "@/feature/heroBanner/type";

export default async function HomeSections() {
  const [
    initialStates,
    initialExperiences,
    initialJourneys,
    initialHeroBanners,
  ] = await Promise.all([
    fetchPublicJsonCached<StatePage<State>>("/state?limit=100&isActive=true&includeAll=true"),
    fetchPublicJsonCached<ExperiencePage<TravelExperience>>("/holidays?limit=100&isActive=true"),
    fetchPublicJsonCached<JourneyPage<Journey>>("/journey?limit=100&isActive=true"),
    fetchHeroBannersServer("Home"),
  ]);

  // Strictly trim states to only what homepage cards need: { id, title, slug, thumbImg, tourCount } + cardShortDescription/banner
  const trimmedStates = initialStates
    ? {
        ...initialStates,
        data: (initialStates.data || []).map((s) => ({
          id: s.id,
          title: s.title,
          slug: s.slug,
          thumbImg: s.thumbImg,
          tourCount: s.tourCount ?? (Array.isArray(s.journeys) ? s.journeys.length : 0),
          cardShortDescription: s.cardShortDescription || "",
          banner: s.banner?.bannerTag ? { bannerTag: s.banner.bannerTag } : null,
        })) as unknown as State[],
      }
    : null;

  // Strictly trim experiences
  const trimmedExperiences = initialExperiences
    ? {
        ...initialExperiences,
        data: (initialExperiences.data || []).map((e) => ({
          id: e.id,
          title: e.title,
          slug: e.slug,
          thumbImg: e.thumbImg,
          tourCount: e.tourCount ?? (Array.isArray(e.journeys) ? e.journeys.length : 0),
          cardShortDescription: e.cardShortDescription || "",
        })) as unknown as TravelExperience[],
      }
    : null;

  // Strictly trim journeys to only 8 best selling cards with display props
  const rawJourneys = initialJourneys?.data || [];
  const orderedJourneys = [...rawJourneys]
    .filter((j: any) => (j.displayOrder ?? 0) > 0)
    .sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  const orderedIds = new Set(orderedJourneys.map((j: any) => j.id));
  const backfill = rawJourneys.filter((j: any) => !orderedIds.has(j.id));
  const topJourneys = [...orderedJourneys, ...backfill].slice(0, 8);

  const trimmedJourneys = initialJourneys
    ? {
        ...initialJourneys,
        data: topJourneys.map((j) => ({
          id: j.id,
          title: j.title,
          slug: j.slug,
          thumbImg: j.thumbImg,
          destination: j.destination,
          duration: j.duration,
          noDays: j.noDays,
          pricePerPerson: j.pricePerPerson,
          discountPrice: j.discountPrice,
          isBestSelling: j.isBestSelling,
          purchaseCount: j.purchaseCount,
          displayOrder: j.displayOrder,
          cities: (j.cities || []).map((c: any) => ({
            id: c.id,
            title: c.title,
            slug: c.slug,
            state: c.state ? { id: c.state.id, slug: c.state.slug } : null,
          })),
          states: (j.states || []).map((s: any) => ({ id: s.id, title: s.title, slug: s.slug })),
          travelExperiences: (j.travelExperiences || []).map((e: any) => ({
            id: e.id,
            title: e.title,
            slug: e.slug,
          })),
        })) as Journey[],
      }
    : null;

  // Strictly trim hero banners
  const trimmedHeroBanners = (initialHeroBanners || []).map((b) => ({
    id: b.id,
    image: b.image,
    mobileImage: b.mobileImage,
    altText: b.altText,
    title: b.title,
  })) as HeroFullBanner[];

  return (
    <HomePageClient
      initialStates={trimmedStates}
      initialExperiences={trimmedExperiences}
      initialJourneys={trimmedJourneys}
      initialHeroBanners={trimmedHeroBanners}
    />
  );
}
