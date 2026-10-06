"use client";

import { MapPin } from "lucide-react";
import RichContent from "@/components/shared/RichContent";
import TourPackageCard from "@/components/shared/TourPackageCard";
import DestinationsSkeleton from "@/feature/destinations/components/DestinationsSkeleton";
import type { Journey } from "@/feature/journey/type";

export interface ToursSectionProps {
  journeys: Journey[];
  isLoading?: boolean;
  accentLabel?: string;
  h1Title?: string | null;
  overView?: string;
  emptyLabel?: string;
  filterBar?: React.ReactNode;
  onClearFilters?: () => void;
  contextName?: string;
  basePath?: string;
  showCount?: number;
  sectionClassName?: string;
  id?: string;
  cardVariant?: "default" | "compact";
}

export default function ToursSection({
  journeys,
  isLoading = false,
  accentLabel = "Popular Tours",
  h1Title,
  overView,
  emptyLabel = "No tours found yet",
  filterBar,
  onClearFilters,
  contextName,
  sectionClassName = "py-12 md:py-20 bg-white",
  id = "tours",
  cardVariant = "default",
}: ToursSectionProps) {
  const hasFilters = Boolean(filterBar && onClearFilters);

  return (
    <section id={id} className={`w-full relative ${sectionClassName}`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="mb-8 md:mb-12">
          {accentLabel && (
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#2E8B8B]">
              {accentLabel}
            </span>
          )}
          {h1Title && (
            <h1 className="font-heading text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-[-0.02em] text-slate-900 mt-2 leading-[1.2]">
              {h1Title}
            </h1>
          )}
          {overView && <RichContent html={overView} className="mt-4" />}
        </div>

      {isLoading ? (
        <DestinationsSkeleton count={8} />
      ) : journeys.length === 0 ? (
        hasFilters ? (
          <div className="text-center py-14 mt-6 bg-white border border-slate-200 rounded-2xl">
            <p className="text-slate-500">No tours match your filters</p>
            <button
              onClick={onClearFilters}
              className="mt-3 text-sm font-semibold text-slate-500 hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="text-center py-14">
            <MapPin size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500">{emptyLabel}</p>
          </div>
        )
      ) : (
        <div>
          {filterBar}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {journeys.map((j) => (
              <TourPackageCard key={j.id} journey={j} contextName={contextName} variant={cardVariant} />
            ))}
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
