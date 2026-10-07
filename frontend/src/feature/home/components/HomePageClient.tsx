"use client";

import React from "react";
import HeroSection from "./HeroSection";
import StatsCounter from "./StatsCounter";
import PopularDestinations from "./PopularDestinations";
import BestSellingPackages from "./BestSellingPackages";
import TravelExperiencesSection from "./TravelExperiencesSection";
import SeasonalTripsSection from "./SeasonalTripsSection";
import TrustedPartners from "./TrustedPartners";
import TravelerMoments from "./TravelerMoments";
import WhyChooseUsSection from "@/components/shared/WhyChooseUsSection";
import SeoTextBlock from "./TravelYourWaySection";
import type { State, PaginatedResponse as StatePage } from "@/feature/state/type";
import type { Country, PaginatedResponse as CountryPage } from "@/feature/country/type";
import type { TravelExperience, PaginatedResponse as ExperiencePage } from "@/feature/travelExperience/type";
import type { City, PaginatedResponse as CityPage } from "@/feature/city/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import type { Season, PaginatedResponse as SeasonPage } from "@/feature/season/type";

export const HomePageClient: React.FC<{
  initialStates?: StatePage<State> | null;
  initialCountries?: CountryPage<Country> | null;
  initialExperiences?: ExperiencePage<TravelExperience> | null;
  initialCities?: CityPage<City> | null;
  initialJourneys?: JourneyPage<Journey> | null;
  initialSeasons?: SeasonPage<Season> | null;
}> = ({
  initialStates,
  initialCountries,
  initialExperiences,
  initialJourneys,
  initialSeasons,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <SeoTextBlock />
      <BestSellingPackages initialJourneys={initialJourneys} />
      <PopularDestinations
        initialStates={initialStates}
        initialCountries={initialCountries}
        initialExperiences={initialExperiences}
      />
      <TravelExperiencesSection
        initialExperiences={initialExperiences}
        initialJourneys={initialJourneys}
      />
      <SeasonalTripsSection initialSeasons={initialSeasons} initialJourneys={initialJourneys} />
      <WhyChooseUsSection />
      <TrustedPartners />
    </div>
  );
};

export default HomePageClient;
