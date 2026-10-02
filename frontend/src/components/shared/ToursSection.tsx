"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { Suspense } from "react";
import { MapPin } from "lucide-react";
import RichContent from "@/components/shared/RichContent";
import TourPackageCard from "@/components/shared/TourPackageCard";
import Pagination from "@/components/shared/Pagination";
import DestinationsSkeleton from "@/feature/destinations/components/DestinationsSkeleton";
import type { Journey } from "@/feature/journey/type";

export interface ToursSectionProps {
  journeys: Journey[];
  isLoading?: boolean;
  accentLabel?: string;
  h1Title?: string | null;
  overView?: string;
  emptyLabel?: string;
  showCount?: number;
  filterBar?: React.ReactNode;
  onClearFilters?: () => void;
  contextName?: string;
  /**
   * The page's own path. Read it here rather than from `usePathname()` so the
   * prerendered HTML already has working pagination links, since a statically
   * generated page cannot read the pathname during the build.
   */
  basePath?: string;
}

/**
 * Pure layout, no hooks, so it can be shared by the prerendered fallback and
 * the live tree. `currentPage` and `query` are passed in rather than read here.
 */
function ToursSectionView({
  journeys,
  isLoading = false,
  accentLabel = "Popular Tours",
  h1Title,
  overView,
  emptyLabel = "No tours found yet",
  filterBar,
  onClearFilters,
  contextName,
  showCount,
  currentPage,
  basePath,
  query,
}: ToursSectionProps & { currentPage: number; query: string }) {
  const pageSize = showCount ?? 16;

  const totalPages = Math.ceil(journeys.length / pageSize);
  const safePage = Math.min(Math.max(currentPage, 1), totalPages || 1);
  const paginatedJourneys = journeys.slice((safePage - 1) * pageSize, safePage * pageSize);

  const hasFilters = Boolean(filterBar && onClearFilters);

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(query);
    params.set("page", pageNumber.toString());
    return `${basePath}?${params.toString()}#tours`;
  };

  return (
    <section id="tours" className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-10 md:py-20">
      <div className="mb-8 md:mb-14">
        {accentLabel && <span className="accent-label">{accentLabel}</span>}
        {h1Title && <h1 className="font-heading h2 text-[#1C1C1C] mt-3">{h1Title}</h1>}
        {overView && <RichContent html={overView} className="mt-4" />}
      </div>

      {isLoading ? (
        <DestinationsSkeleton count={pageSize} />
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
            {paginatedJourneys.map((j) => (
              <TourPackageCard key={j.id} journey={j} contextName={contextName} />
            ))}
          </div>

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            createPageUrl={createPageUrl}
          />
        </div>
      )}
    </section>
  );
}

/** Reads the page number from the URL. Must stay inside the Suspense boundary. */
function ToursSectionFromQuery(props: ToursSectionProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1", 10);

  return (
    <ToursSectionView
      {...props}
      basePath={props.basePath || pathname}
      query={searchParams.toString()}
      currentPage={Number.isNaN(page) ? 1 : page}
    />
  );
}

/**
 * The detail pages that mount this are statically generated, and reading the
 * query string during a build is not possible, so the hook has to sit behind a
 * boundary. The fallback renders page one, which is what the component shows
 * for anyone arriving without `?page=`, so the prerendered HTML and the live
 * tree agree and there is no visible swap on the common path.
 */
export default function ToursSection(props: ToursSectionProps) {
  return (
    <Suspense fallback={<ToursSectionView {...props} basePath={props.basePath || ""} query="" currentPage={1} />}>
      <ToursSectionFromQuery {...props} />
    </Suspense>
  );
}
