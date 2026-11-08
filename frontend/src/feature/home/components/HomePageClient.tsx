"use client";

import React from "react";
import HeroSection from "./HeroSection";
import SeoTextBlock from "./TravelYourWaySection";
import BestSellingPackages from "./BestSellingPackages";
import PlanAdventureSection from "./PlanAdventureSection";
import HowItWorksSection from "./HowItWorksSection";
import WhyChooseUsSection from "@/components/shared/WhyChooseUsSection";
import FaqSection from "./FaqSection";
import type { State, PaginatedResponse as StatePage } from "@/feature/state/type";
import type { TravelExperience, PaginatedResponse as ExperiencePage } from "@/feature/travelExperience/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import type { HeroFullBanner } from "@/feature/heroBanner/type";

export const HomePageClient: React.FC<{
  initialStates?: StatePage<State> | null;
  initialExperiences?: ExperiencePage<TravelExperience> | null;
  initialJourneys?: JourneyPage<Journey> | null;
  initialHeroBanners?: HeroFullBanner[] | null;
}> = ({
  initialStates,
  initialExperiences,
  initialJourneys,
  initialHeroBanners,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection initialHeroBanners={initialHeroBanners} />
      <SeoTextBlock />
      
      <PlanAdventureSection
        initialStates={initialStates}
        initialExperiences={initialExperiences}
        initialJourneys={initialJourneys}
      />
      
      <BestSellingPackages initialJourneys={initialJourneys} />
      <WhyChooseUsSection />
      <HowItWorksSection />
 
      <FaqSection bgType="white" />
    </div>
  );
};

export default HomePageClient;
