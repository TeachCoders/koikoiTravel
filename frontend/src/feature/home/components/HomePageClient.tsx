"use client";

import React from "react";
import HeroSection from "./HeroSection";
import SeoTextBlock from "./TravelYourWaySection";
import BestSellingPackages from "./BestSellingPackages";
import PopularDestinations from "./PopularDestinations";
import TravelExperiencesSection from "./TravelExperiencesSection";
import HowItWorksSection from "./HowItWorksSection";
import WhyChooseUsSection from "@/components/shared/WhyChooseUsSection";
import FaqSection from "./FaqSection";
import TrustedPartners from "./TrustedPartners";
import type { State, PaginatedResponse as StatePage } from "@/feature/state/type";
import type { Country, PaginatedResponse as CountryPage } from "@/feature/country/type";
import type { TravelExperience, PaginatedResponse as ExperiencePage } from "@/feature/travelExperience/type";
import type { City, PaginatedResponse as CityPage } from "@/feature/city/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import type { Season, PaginatedResponse as SeasonPage } from "@/feature/season/type";
import type { PaginatedGuestGallery } from "@/feature/guestGallery/type";
import type { HeroFullBanner } from "@/feature/heroBanner/type";

export const HomePageClient: React.FC<{
  initialStates?: StatePage<State> | null;
  initialCountries?: CountryPage<Country> | null;
  initialExperiences?: ExperiencePage<TravelExperience> | null;
  initialCities?: CityPage<City> | null;
  initialJourneys?: JourneyPage<Journey> | null;
  initialSeasons?: SeasonPage<Season> | null;
  initialGuestGallery?: PaginatedGuestGallery | null;
  initialHeroBanners?: HeroFullBanner[] | null;
}> = ({
  initialStates,
  initialCountries,
  initialExperiences,
  initialJourneys,
  initialGuestGallery,
  initialHeroBanners,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection initialHeroBanners={initialHeroBanners} />
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
      <HowItWorksSection />
      <WhyChooseUsSection initialGuestGallery={initialGuestGallery} />
      <SeoTextBlock />
      <FaqSection bgType="pattern" />
      <TrustedPartners />
    </div>
  );
};

export default HomePageClient;
