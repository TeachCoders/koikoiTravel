"use client";

import React from "react";
import HeroSection from "./HeroSection";
import TrustBar from "./TrustBar";
import BestSellingPackages from "./BestSellingPackages";
import WhichExperienceSection from "./WhichExperienceSection";
import WhyBookWithUsSection from "./WhyBookWithUsSection";
import HowItWorksSection from "./HowItWorksSection";
import ActivitiesSection from "./ActivitiesSection";
import ReviewsSection from "./ReviewsSection";
import PopularDestinationsHome from "./PopularDestinationsHome";
import HomepageFaqSection from "./HomepageFaqSection";
import FinalCtaSection from "./FinalCtaSection";
import type { State, PaginatedResponse as StatePage } from "@/feature/state/type";
import type { Country, PaginatedResponse as CountryPage } from "@/feature/country/type";
import type { TravelExperience, PaginatedResponse as ExperiencePage } from "@/feature/travelExperience/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import type { Season, PaginatedResponse as SeasonPage } from "@/feature/season/type";

export const HomePageClient: React.FC<{
  initialStates?: StatePage<State> | null;
  initialCountries?: CountryPage<Country> | null;
  initialExperiences?: ExperiencePage<TravelExperience> | null;
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section with Floating Lead Form (Split Layout) */}
      <HeroSection />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Best-Selling Tours */}
      <BestSellingPackages initialJourneys={initialJourneys} />

      {/* 4. Which India Experience Are You Looking For? */}
      <WhichExperienceSection />

      {/* 5. Why Book Your India Trip With KoiKoi Travel? */}
      <WhyBookWithUsSection />

      {/* 6. How Does KoiKoi Travel Make Trip Planning Easy? */}
      <HowItWorksSection />

      {/* 7. Amazing Things You Can Experience in India */}
      <ActivitiesSection />

      {/* 8. What Our Travelers Say */}
      <ReviewsSection />

      {/* 9. Where Will Your India Journey Take You? */}
      <PopularDestinationsHome />

      {/* 10. Frequently Asked Questions */}
      <HomepageFaqSection />

      {/* 11. Ready to Experience India Your Way? (Final CTA) */}
      <FinalCtaSection />
    </div>
  );
};

export default HomePageClient;
