import { fetchPublicJsonCached } from "@/feature/destinations/api/public-server";
import HomePageClient from "./HomePageClient";
import type { State, PaginatedResponse as StatePage } from "@/feature/state/type";
import type { City, PaginatedResponse as CityPage } from "@/feature/city/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import type { Season, PaginatedResponse as SeasonPage } from "@/feature/season/type";

export default async function HomeSections() {
  const [initialStates, initialCities, initialJourneys, initialSeasons] = await Promise.all([
    fetchPublicJsonCached<StatePage<State>>("/state?limit=100&isActive=true"),
    fetchPublicJsonCached<CityPage<City>>("/city?limit=1000&isActive=true"),
    fetchPublicJsonCached<JourneyPage<Journey>>("/journey?limit=100&isActive=true"),
    fetchPublicJsonCached<SeasonPage<Season>>("/season?limit=100&isActive=true"),
  ]);

  return (
    <HomePageClient
      initialStates={initialStates}
      initialCities={initialCities}
      initialJourneys={initialJourneys}
      initialSeasons={initialSeasons}
    />
  );
}