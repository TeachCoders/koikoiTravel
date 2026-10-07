import { fetchPublicJsonCached } from "@/feature/destinations/api/public-server";
import HomePageClient from "./HomePageClient";
import type { State, PaginatedResponse as StatePage } from "@/feature/state/type";
import type { Country, PaginatedResponse as CountryPage } from "@/feature/country/type";
import type { TravelExperience, PaginatedResponse as ExperiencePage } from "@/feature/travelExperience/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import type { Season, PaginatedResponse as SeasonPage } from "@/feature/season/type";

export default async function HomeSections() {
  const [initialStates, initialCountries, initialExperiences, initialJourneys, initialSeasons] = await Promise.all([
    fetchPublicJsonCached<StatePage<State>>("/state?limit=100&isActive=true"),
    fetchPublicJsonCached<CountryPage<Country>>("/country?limit=100&isActive=true"),
    fetchPublicJsonCached<ExperiencePage<TravelExperience>>("/holidays?limit=100&isActive=true"),
    fetchPublicJsonCached<JourneyPage<Journey>>("/journey?limit=100&isActive=true"),
    fetchPublicJsonCached<SeasonPage<Season>>("/season?limit=100&isActive=true"),
  ]);

  return (
    <HomePageClient
      initialStates={initialStates}
      initialCountries={initialCountries}
      initialExperiences={initialExperiences}
      initialJourneys={initialJourneys}
      initialSeasons={initialSeasons}
    />
  );
}