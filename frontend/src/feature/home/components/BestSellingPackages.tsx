"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import TourPackageCard from "@/components/shared/TourPackageCard";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";

const MAX_PACKAGES = 8;

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

  const packages = React.useMemo(() => {
    const ordered = journeys
      .filter((j: any) => (j.displayOrder ?? 0) > 0)
      .sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    if (ordered.length >= MAX_PACKAGES) {
      return ordered.slice(0, MAX_PACKAGES);
    }
    const orderedIds = new Set(ordered.map((j: any) => j.id));
    const backfill = journeys.filter((j: any) => !orderedIds.has(j.id));
    return [...ordered, ...backfill].slice(0, MAX_PACKAGES);
  }, [journeys]);

  return (
    <section id="packages" className="py-8 sm:py-10 md:py-12 bg-section-tint border-y border-section-border">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <SectionLabel>Featured Itineraries</SectionLabel>
            <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-slate-900 tracking-tight mt-1.5">
              Popular India <span className="text-[#F8904D]">Tour Packages</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1.5 max-w-xl">
              All-inclusive private tours featuring handpicked hotels, dedicated chauffeurs, and personalized sightseeing.
            </p>
          </div>
          <Link
            href="/tour-packages"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-section-border text-slate-800 text-sm font-semibold hover:border-[#2E8B8B] hover:text-[#2E8B8B] transition-all shadow-xs shrink-0"
          >
            <span>See all tours</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
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

        {/* Reassuring Note */}
        <p className="text-center text-xs sm:text-sm text-slate-500 mt-6 font-medium">
          Prices depend on your dates, group size and hotel level, so every trip is quoted for you.{" "}
          <Link href="/contact-us" className="text-[#F8904D] font-semibold hover:underline">
            Ask for your quote
          </Link>
        </p>

        {/* Bottom Center View All Tours CTA */}
        <div className="mt-6 flex justify-center">
          <Link
            href="/tour-packages"
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-[#F8904D] transition-all shadow-sm"
          >
            <span>View All Tours</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellingPackages;
