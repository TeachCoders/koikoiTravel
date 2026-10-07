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
  accentLabel = "Popular Tour Packages",
  h1Title,
  overView,
  emptyLabel = "No tour packages found yet",
  filterBar,
  onClearFilters,
  contextName,
  sectionClassName = "py-8 sm:py-10 md:py-12 bg-white",
  id = "tours",
  cardVariant = "default",
}: ToursSectionProps) {
  const hasFilters = Boolean(filterBar && onClearFilters);

  return (
    <section id={id} className={`w-full relative ${sectionClassName}`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="mb-6 sm:mb-8">
          {accentLabel && (
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#F8904D] mb-1.5">
              {accentLabel}
            </span>
          )}
          {h1Title && (
            <h1 className="font-heading text-xl sm:text-2xl md:text-[28px] font-bold tracking-tight text-slate-900 mt-1.5 mb-2 leading-[1.3]">
              {h1Title}
            </h1>
          )}
          {overView && <RichContent html={overView} className="mt-2 text-slate-600 font-normal text-sm sm:text-base leading-relaxed" />}
        </div>

      {isLoading ? (
        <DestinationsSkeleton count={8} />
      ) : journeys.length === 0 ? (
        hasFilters ? (
          <div className="text-center py-14 mt-6 bg-white border border-slate-200 rounded-2xl">
            <p className="text-slate-500">No tour packages match your filters</p>
            <button
              onClick={onClearFilters}
              className="mt-3 text-sm font-semibold text-slate-600 hover:text-[#F8904D] transition-colors cursor-pointer"
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
