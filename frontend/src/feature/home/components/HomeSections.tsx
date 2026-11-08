import { fetchPublicJsonCached } from "@/feature/destinations/api/public-server";
import { fetchHeroBannersServer } from "@/feature/heroBanner/api/server";
import HomePageClient from "./HomePageClient";
import type { State, PaginatedResponse as StatePage } from "@/feature/state/type";
import type { Country, PaginatedResponse as CountryPage } from "@/feature/country/type";
import type { TravelExperience, PaginatedResponse as ExperiencePage } from "@/feature/travelExperience/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import type { Season, PaginatedResponse as SeasonPage } from "@/feature/season/type";
import type { PaginatedGuestGallery } from "@/feature/guestGallery/type";

export default async function HomeSections() {
  const [
    initialStates,
    initialCountries,
    initialExperiences,
    initialJourneys,
    initialSeasons,
    initialGuestGallery,
    initialHeroBanners,
  ] = await Promise.all([
    fetchPublicJsonCached<StatePage<State>>("/state?limit=100&isActive=true&includeAll=true"),
    fetchPublicJsonCached<CountryPage<Country>>("/country?limit=100&isActive=true"),
    fetchPublicJsonCached<ExperiencePage<TravelExperience>>("/holidays?limit=100&isActive=true"),
    fetchPublicJsonCached<JourneyPage<Journey>>("/journey?limit=100&isActive=true"),
    fetchPublicJsonCached<SeasonPage<Season>>("/season?limit=100&isActive=true"),
    fetchPublicJsonCached<PaginatedGuestGallery>("/guest-gallery?page=1&limit=8&isActive=true"),
    fetchHeroBannersServer("Home"),
  ]);

  // Trim journeys to only the cards displayed on homepage, stripping heavy itinerary text
  const trimmedJourneys = initialJourneys
    ? {
        ...initialJourneys,
        data: (initialJourneys.data || []).slice(0, 16).map((j) => ({
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

  return (
    <HomePageClient
      initialStates={initialStates}
      initialCountries={initialCountries}
      initialExperiences={initialExperiences}
      initialJourneys={trimmedJourneys}
      initialSeasons={initialSeasons}
      initialGuestGallery={initialGuestGallery}
      initialHeroBanners={initialHeroBanners}
    />
  );
}