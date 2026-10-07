"use client";

import React from "react";
import HeroSection from "./HeroSection";
import HomeLeadForm from "./HomeLeadForm";
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
      {/* 1. Hero Section + CTAs */}
      <HeroSection />

      {/* 2. Short Lead Form */}
      <HomeLeadForm />

      {/* 3. Trust Bar */}
      <TrustBar />

      {/* 4. Best-Selling Tours */}
      <BestSellingPackages initialJourneys={initialJourneys} />

      {/* 5. Which India Experience? */}
      <WhichExperienceSection />

      {/* 6. Why KoiKoi Travel */}
      <WhyBookWithUsSection />

      {/* 7. How It Works (3 Steps) */}
      <HowItWorksSection />

      {/* 8. Amazing Experiences / Activities */}
      <ActivitiesSection />

      {/* 9. Real Traveler Reviews */}
      <ReviewsSection />

      {/* 10. Popular Destinations */}
      <PopularDestinationsHome />

      {/* 11. Homepage FAQs */}
      <HomepageFaqSection />

      {/* 12. Final WhatsApp + Free Itinerary CTA */}
      <FinalCtaSection />
    </div>
  );
};

export default HomePageClient;
