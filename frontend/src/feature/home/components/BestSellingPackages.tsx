"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import TourPackageCard from "@/components/shared/TourPackageCard";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";

const MAX_PACKAGES = 4;

export const BestSellingPackages: React.FC<{
  initialJourneys?: JourneyPage<Journey> | null;
}> = ({ initialJourneys }) => {
  const { journeys, isLoading } = useGetJourneys(
    {
      limit: 100,
      isActive: "true",
    },
    initialJourneys
  );

  const packages = journeys
    .filter((j: any) => (j.displayOrder ?? 0) > 0)
    .slice(0, MAX_PACKAGES);

  return (
    <section id="packages" className="py-8 sm:py-10 md:py-12 bg-[#f8f8f8] relative overflow-hidden shadow-[inset_0_15px_20px_-15px_rgba(0,0,0,0.06)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 sm:mb-8">
          <div>
            <SectionLabel>Handpicked Top Tour Packages</SectionLabel>
            <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-slate-900 tracking-tight mt-1.5">
              Explore Our Most Loved India Tours
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1.5 max-w-xl">
              Wondering which India trip is right for you? Start with the journeys our travelers love most.
            </p>
          </div>
          <Link href="/tour-packages">
            <button className="btn-outline">
              <span>Explore All Tours</span><ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-white animate-pulse h-[420px] border border-brand-200" />
            ))}
          </div>
        ) : packages.length === 0 ? (
          <p className="text-center text-slate-400 py-16">No packages yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {packages.map((pkg) => (
              <TourPackageCard key={pkg.id} journey={pkg} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellingPackages;
