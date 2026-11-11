"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import TourPackageCard from "@/components/shared/TourPackageCard";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";

const MAX_PACKAGES = 8;

// Mobile: 1 | sm: 2 | Tablet (md): 3 | Laptop (lg): 4
const GRID =
  "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5";

export const BestSellingPackages: React.FC<{
  initialJourneys?: JourneyPage<Journey> | null;
}> = ({ initialJourneys }) => {
  const initialList = initialJourneys?.data || [];
  const hasInitial = initialList.length > 0;

  const { journeys, isLoading } = useGetJourneys(
    {
      limit: 100,
      isActive: "true",
    },
    undefined,
    { enabled: !hasInitial }
  );

  const packages = React.useMemo(() => {
    const list = hasInitial ? initialList : (journeys && journeys.length > 0 ? journeys : []);
    const ordered = list
      .filter((j: any) => (j.displayOrder ?? 0) > 0)
      .sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    if (ordered.length >= MAX_PACKAGES) {
      return ordered.slice(0, MAX_PACKAGES);
    }
    const orderedIds = new Set(ordered.map((j: any) => j.id));
    const backfill = list.filter((j: any) => !orderedIds.has(j.id));
    return [...ordered, ...backfill].slice(0, MAX_PACKAGES);
  }, [hasInitial, initialList, journeys]);

  return (
    <section
      id="packages"
      className="border-y border-section-border bg-section-tint py-6 sm:py-8 md:py-10"
    >
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-10">
        {/* Heading row: title (left) + "See all tours" (right, hamesha dikhta hai) */}
        <div className="mb-3 sm:mb-5">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <SectionLabel>Featured Itineraries</SectionLabel>
              <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900 sm:mt-1.5 sm:text-2xl md:text-[26px]">
                Find Inspiration for Your  <span className="text-[#F8904D]">India Journey</span>
              </h2>
            </div>

          </div>

          <div className="mt-2.5 w-full text-sm sm:text-base leading-relaxed text-slate-600 space-y-1.5">
            <p>
              <strong className="font-semibold text-slate-900">Looking for ideas for your India trip?</strong> Browse our suggested <strong className="font-semibold text-slate-900">India tour itineraries</strong> featuring <strong className="font-semibold text-slate-900">famous landmarks</strong>, <strong className="font-semibold text-slate-900">cultural experiences</strong>, <strong className="font-semibold text-slate-900">wildlife</strong>, and <strong className="font-semibold text-slate-900">beautiful destinations</strong>.
            </p>
            <p>
              Each journey can be <strong className="font-semibold text-slate-900">tailored to your interests and travel plans</strong>.
            </p>
          </div>
        </div>

        {isLoading && packages.length === 0 ? (
          <div className={GRID}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-[360px] animate-pulse rounded-xl border border-brand-200 bg-white sm:h-[400px]"
              />
            ))}
          </div>
        ) : packages.length === 0 ? (
          <p className="py-10 text-center text-slate-400">No packages yet.</p>
        ) : (
          <div className={GRID}>
            {packages.map((pkg) => (
              <TourPackageCard key={pkg.id} journey={pkg} />
            ))}
          </div>
        )}

        {/* Reassuring note */}
        <p className="mt-4 text-center text-xs font-medium leading-snug text-slate-500 sm:mt-5 sm:text-sm">
          Prices depend on your dates, group size and hotel level, so every trip
          is quoted for you.{" "}
          <Link
            href="/contact-us"
            className="font-semibold text-[#F8904D] hover:underline"
          >
            Ask for your quote
          </Link>
        </p>

        {/* Bottom CTA */}
        <div className="mt-3 flex justify-center sm:mt-4">
          <Link
            href="/tour-packages"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#F8904D] sm:px-6 sm:py-2.5"
          >
            <span>View All Tours</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellingPackages;