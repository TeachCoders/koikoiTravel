"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, useMemo, useCallback } from "react";
import {
  MapPin,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CalendarDays,
  Sun,
  BadgeCheck,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { useStateBySlug } from "@/feature/state/api/useState";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import DestinationSlider, { useSliderControl } from "@/components/shared/DestinationSlider";
import HeroBanner from "@/components/shared/HeroBanner";
import { useHeroBanners } from "@/feature/heroBanner/api";
import { FallbackImage } from "@/components/shared/FallbackImage";
import DestinationGuideSection from "@/components/shared/DestinationGuideSection";
import ToursSection from "@/components/shared/ToursSection";
import TourPackageCard from "@/components/shared/TourPackageCard";
import FilterBar, { type SortOption } from "@/components/shared/FilterBar";
import {
  travelExperienceOptions,
  durationOptions,
  seasonOptions,
  cityOptions,
  journeyMatchesExperiences,
  journeyMatchesDuration,
  journeyMatchesSeasons,
  journeyMatchesCities,
  journeyPackageHref,
} from "@/feature/journey/filterOptions";
import { cn, stripHtml, formatToursH1 } from "@/lib/utils";
import { resolveStateJourneys, sortByDaysAscending } from "@/feature/journey/destinationJourneys";
import type { State } from "@/feature/state/type";
import type { Journey, PaginatedResponse } from "@/feature/journey/type";
import CityCard from "./CityCard";
import DestinationsSkeleton from "./DestinationsSkeleton";
import FaqSection from "@/feature/home/components/FaqSection";
import DoodleBackground from "@/components/shared/DoodleBackground";
import { GOLDEN_TRIANGLE_FAQS } from "@/feature/travelExperience/goldenTriangleFaqs";
import { SOUTH_INDIA_FAQS } from "../southIndiaFaqs";
import { TAJ_MAHAL_FAQS } from "../tajMahalFaqs";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { isIndexableCity } from "@/lib/cityValidation";

export default function StateDetail({
  slug,
  initialState,
  initialJourneys,
}: {
  slug: string;
  initialState?: State | null;
  initialJourneys?: PaginatedResponse<Journey> | null;
}) {
  const { state, isLoading } = useStateBySlug(slug, initialState);
  const activeState = state || initialState;

  if (!activeState && isLoading) {
    return (
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <DestinationsSkeleton />
      </div>
    );
  }
  if (!activeState) return notFound();

  return <StateContent state={activeState} initialJourneys={initialJourneys} />;
}

function StateContent({ state, initialJourneys }: { state: State; initialJourneys?: PaginatedResponse<Journey> | null }) {
  const countrySlug = state.country?.slug || "india";
  const pageLinkedHrefs = useMemo(() => new Set<string>(), [state.id]);
  const excludeHrefs = useMemo(() => [
    `/tour-packages/${countrySlug}/${state.slug}`,
    `/${countrySlug}/${state.slug}`,
    `/tour-packages/india/${state.slug}`,
    `/india/${state.slug}`,
  ], [countrySlug, state.slug]);

  const embeddedJourneys = state.journeys ?? [];
  const initialList = initialJourneys?.data;
  const hasInitial = Array.isArray(initialList) && initialList.length > 0;

  const { journeys, isLoading: journeysLoading } = useGetJourneys(
    { limit: 100, isActive: "true" },
    undefined,
    { enabled: !hasInitial }
  );

  // Resolved journeys using canonical destination resolver
  const { stateJourneys } = useMemo(() => {
    if (hasInitial) {
      return { stateJourneys: initialList };
    }
    return resolveStateJourneys(journeys.length > 0 ? journeys : embeddedJourneys, state);
  }, [hasInitial, initialList, journeys, embeddedJourneys, state]);

  // Filters for Tour Packages
  const [expSelected, setExpSelected] = useState<string[]>([]);
  const [durSelected, setDurSelected] = useState<string[]>([]);
  const [citySelected, setCitySelected] = useState<string[]>([]);
  const [seasonSelected, setSeasonSelected] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("days-asc");

  const activeFilterCount =
    expSelected.length + durSelected.length + citySelected.length + seasonSelected.length;

  const clearFilters = () => {
    setExpSelected([]);
    setDurSelected([]);
    setCitySelected([]);
    setSeasonSelected([]);
    setSortBy("days-asc");
  };

  const filteredCurrentJourneys = useMemo(() => {
    let list = stateJourneys;
    if (activeFilterCount > 0) {
      list = stateJourneys.filter(
        (j) =>
          journeyMatchesExperiences(j, expSelected) &&
          journeyMatchesDuration(j, durSelected) &&
          journeyMatchesCities(j, citySelected) &&
          journeyMatchesSeasons(j, seasonSelected)
      );
    }
    if (sortBy === "days-desc") {
      return [...list].sort((a, b) => sortByDaysAscending(b, a));
    }
    if (sortBy === "popular") {
      return [...list].sort((a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0));
    }
    return [...list].sort(sortByDaysAscending);
  }, [stateJourneys, activeFilterCount, expSelected, durSelected, citySelected, seasonSelected, sortBy]);

  const { data: heroBannersData } = useHeroBanners("State", {
    slug: state.slug,
    entityId: state.id,
  });
  const customHeroBanners = heroBannersData?.data || [];

  const heroImages =
    customHeroBanners.length > 0
      ? customHeroBanners.map((b) => b.image)
      : state.banner?.images?.length
        ? state.banner.images
        : state.thumbImg
          ? [state.thumbImg]
          : [];

  const heroSlides =
    customHeroBanners.length > 0
      ? customHeroBanners.map((b) => ({ image: b.image, mobileImage: b.mobileImage }))
      : heroImages.map((img: string) => ({ image: img, mobileImage: null }));

  const isIllustratedBanner =
    heroImages.some((img: string) => img.includes("comic") || img.includes("banner")) ||
    heroImages.length === 1;

  const heroTitle =
    state.banner?.bannerTitle ||
    customHeroBanners[0]?.title ||
    state.h1Title ||
    state.title;

  const heroTag =
    state.banner?.bannerTag ||
    customHeroBanners[0]?.subtitle ||
    "";
  const pageH1 = state.h1Title;

  const facts = [
    { label: "Capital", value: state.capital },
    { label: "Language", value: state.language },
    { label: "Area", value: state.area },
  ].filter((f) => f.value);

  const journeyCountFor = (cityId?: number) =>
    cityId == null
      ? 0
      : stateJourneys.filter((j) => j.cities?.some((c) => c.id === cityId) || j.cityIds?.includes(cityId)).length;

  const cityImageFor = (cityId?: number) =>
    cityId == null
      ? undefined
      : stateJourneys.find((j) => j.cities?.some((c) => c.id === cityId) || j.cityIds?.includes(cityId))?.thumbImg;

  const stateCities = [...(state.cities ?? [])]
    .filter(
      (c) =>
        c.isActive !== false &&
        c.showOnSite !== false &&
        c.slug !== state.slug &&
        (c.title ?? "").trim().toLowerCase() !== (state.title ?? "").trim().toLowerCase() &&
        journeyCountFor(c.id) >= 2
    )
    .sort((a, b) => {
    const aOrder = a.displayOrder ?? 0;
    const bOrder = b.displayOrder ?? 0;
    if (aOrder > 0 && bOrder > 0) return aOrder - bOrder;
    if (aOrder > 0) return -1;
    if (bOrder > 0) return 1;
    return (a.title ?? "").localeCompare(b.title ?? "");
  });

  const isTajMahal = state.slug === "taj-mahal" || state.slug?.includes("taj-mahal");
  const isGoldenTriangle = state.slug === "golden-triangle" || state.slug?.includes("golden-triangle");
  const isCharDham = state.slug === "chardham" || state.slug === "chardham-yatra" || state.slug?.includes("chardham");

  const displayedCities = useMemo(() => {
    if (isTajMahal || isGoldenTriangle) return [];

    // Show only valid cities under this state that have at least 2 tours
    return stateCities.filter(
      (c) =>
        c.isActive !== false &&
        c.showOnSite !== false &&
        journeyCountFor(c.id) >= 2
    );
  }, [stateCities, isTajMahal, isGoldenTriangle, state.slug]);

  const cityCount = displayedCities.length ?? 0;
  const showCitiesSection = displayedCities.length > 0 && !isGoldenTriangle && !isTajMahal;

  const cleanStateName = (state.h1Title || state.title)
    .replace(/\s*Tours?(\s*Packages?)?$/i, "")
    .trim();

  const { swiperRef: citiesSwiperRef, handleSwiper: handleCitiesSwiper, slidePrev, slideNext, canScroll } = useSliderControl();

  const filterBar = (
    <FilterBar
      sections={[
        {
          id: "city",
          title: "Destination",
          icon: <MapPin size={14} />,
          options: cityOptions(stateJourneys),
          selected: citySelected,
          onChange: setCitySelected,
        },
        {
          id: "experience",
          title: "Travel Experience",
          icon: <Sparkles size={14} />,
          options: travelExperienceOptions(stateJourneys),
          selected: expSelected,
          onChange: setExpSelected,
        },
        {
          id: "duration",
          title: "Duration",
          icon: <CalendarDays size={14} />,
          options: durationOptions(stateJourneys),
          selected: durSelected,
          onChange: setDurSelected,
        },
      ]}
      activeCount={activeFilterCount}
      onClearAll={clearFilters}
      resultCount={filteredCurrentJourneys.length}
      totalCount={stateJourneys.length}
      sortConfig={{ value: sortBy, onChange: setSortBy }}
    />
  );

  const hasSeoDesc = Boolean(stripHtml(state.seoDescription).trim());
  const hasMoreDesc = Boolean(stripHtml(state.moreDescription).trim());
  const hasKnowMoreText = hasSeoDesc || hasMoreDesc;

  const hasFamousFor = Boolean(stripHtml(state.famousFor || "").trim());
  const hasTopPackages = stateJourneys.filter((j) => (j.displayOrder ?? 0) > 0).length > 0;
  const hasSidebar = facts.length > 0 || hasFamousFor || hasTopPackages;
  const showMoreSection = hasKnowMoreText || hasSidebar;

  const basePath = state.country?.slug
    ? `/tour-packages/${state.country.slug}/${state.slug}`
    : `/tour-packages/${state.slug}`;

  return (
    <div>
      {/* ===== HERO ===== */}
      <HeroBanner
        slides={heroSlides}
        fallbackImage={state.thumbImg || state.banner?.images?.[0]}
        alt={state.title}
        tag={heroTag}
        title={heroTitle}
      />

      {/* ===== BREADCRUMB (BELOW HERO) ===== */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200/80 bg-slate-50/80 backdrop-blur-xs">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-3 flex flex-wrap items-center gap-1.5 text-[13px] text-slate-500 font-medium">
          <Link href="/" className="hover:text-[#2E8B8B] transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight size={13} className="text-slate-400 shrink-0" />
          <Link href="/tour-packages" className="hover:text-[#2E8B8B] transition-colors shrink-0">
            Tour Packages
          </Link>
          {state.country && (
            <>
              <ChevronRight size={13} className="text-slate-400 shrink-0" />
              <Link
                href={`/tour-packages/${state.country.slug}`}
                className="hover:text-[#2E8B8B] transition-colors shrink-0"
              >
                {((state.country as any)?.h1Title || state.country.title).replace(/\s*Tour$/i, "")}
              </Link>
            </>
          )}
          <ChevronRight size={13} className="text-slate-400 shrink-0" />
          <span className="text-slate-900 font-semibold">{state.h1Title || state.title}</span>
        </div>
      </nav>

      {/* ===== SECTION 2: TOUR PACKAGES IN STATE ===== */}
      <ToursSection
        id="top-tours"
        basePath={basePath}
        isLoading={journeysLoading && stateJourneys.length === 0}
        accentLabel="State Itineraries"
        h1Title={formatToursH1(state.h1Title || state.title)}
        overView={state.overView ?? undefined}
        emptyLabel={`No tour packages found matching your criteria in ${cleanStateName}`}
        filterBar={stateJourneys.length > 0 ? filterBar : undefined}
        onClearFilters={clearFilters}
        sectionClassName="py-8 sm:py-10 md:py-12 bg-section-tint border-y border-section-border"
        cardVariant="default"
        sharedLinkedHrefs={pageLinkedHrefs}
        excludeHrefs={excludeHrefs}
      >
          {filteredCurrentJourneys.length === 0 ? (
            <div className="text-center py-14 mt-6 bg-white border border-slate-200 rounded-2xl">
              <p className="text-slate-500">
                {activeFilterCount > 0
                  ? "No tour packages match your filters"
                  : `No tour packages found yet in ${cleanStateName}`}
              </p>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-3 text-sm font-semibold text-slate-600 hover:text-[#F8904D] transition-colors cursor-pointer"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className={
                filteredCurrentJourneys.length === 1
                  ? "grid grid-cols-1 max-w-md mx-auto gap-6 mt-6"
                  : filteredCurrentJourneys.length === 2
                  ? "grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
                  : filteredCurrentJourneys.length === 3
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"
              }>
                {filteredCurrentJourneys.map((j) => (
                  <TourPackageCard key={j.id} journey={j} variant="default" />
                ))}
              </div>

              {/* Custom DMC Pricing & Trust Note */}
              <div className="mt-8 pt-4 text-left text-sm sm:text-base md:text-[17px] text-slate-700 font-medium leading-relaxed">
                Prices depend on your dates, group size and hotel level, so every trip is quoted for you.{" "}
                <QuoteModal>
                  <button type="button" className="text-[#F8904D] hover:text-[#d85511] font-semibold hover:underline cursor-pointer">
                    Ask for your quote
                  </button>
                </QuoteModal>
              </div>
            </>
          )}
        </ToursSection>

      {/* ===== SECTION 3: CITIES / TOP DESTINATIONS IN STATE ===== */}
      {showCitiesSection && (
        <section id="cities" className="w-full bg-white py-8 sm:py-10 md:py-12 border-b border-slate-200/60">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between mb-6 sm:mb-8 flex-wrap gap-4">
            <div>
              <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#F8904D] mb-1.5">
                {isCharDham ? "Sacred Pilgrimage Shrines" : "Top Destinations"}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-slate-900 mt-1.5 font-heading">
                {isCharDham ? (
                  <>
                    The 4 Sacred Dhams of <span className="text-[#F8904D]">{cleanStateName}</span>
                  </>
                ) : (
                  <>
                    Cities in {cleanStateName} <span className="text-[#F8904D]">Tours</span>
                  </>
                )}
                <span className="ml-3 align-middle text-xs font-medium text-[#F8904D] bg-[#F8904D]/10 px-2.5 py-1 rounded-full font-sans">
                  {cityCount} {isCharDham ? "Sacred Dhams" : "Cities"}
                </span>
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
                {isCharDham
                  ? "Embark on a divine spiritual journey across the revered Himalayan shrines of Yamunotri, Gangotri, Kedarnath, and Badrinath."
                  : `Discover iconic royal cities, peaceful lakes, desert landscapes, and historic forts across ${cleanStateName}.`}
              </p>
            </div>
            {!journeysLoading && canScroll && (
              <div className="flex items-center gap-2">
                <button
                  onClick={slidePrev}
                  aria-label="Previous cities"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-xs hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={slideNext}
                  aria-label="Next cities"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-xs hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          {journeysLoading ? (
            <DestinationsSkeleton count={6} />
          ) : displayedCities.length === 0 ? (
            <div className="text-center py-14">
              <MapPin size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500">{isCharDham ? "No sacred dhams found" : `No cities found in ${state.title}`}</p>
            </div>
          ) : displayedCities.length <= 4 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {displayedCities.map((c) => {
                const cityId = c.id;
                if (cityId == null) return null;
                return (
                  <CityCard
                    key={cityId}
                    city={c}
                    stateSlug={state.slug}
                    countrySlug={state.country?.slug}
                    journeyCount={journeyCountFor(cityId)}
                    fallbackImage={cityImageFor(cityId)}
                  />
                );
              })}
            </div>
          ) : (
            <DestinationSlider swiperRef={citiesSwiperRef} onSwiper={handleCitiesSwiper}>
              {displayedCities.map((c) => {
                const cityId = c.id;
                if (cityId == null) return null;
                return (
                  <CityCard
                    key={cityId}
                    city={c}
                    stateSlug={state.slug}
                    countrySlug={state.country?.slug}
                    journeyCount={journeyCountFor(cityId)}
                    fallbackImage={cityImageFor(cityId)}
                  />
                );
              })}
            </DestinationSlider>
          )}
          </div>
        </section>
      )}




      {/* ===== FAQ SECTION (STRICT 2-BG ALTERNATION) ===== */}
      <FaqSection
        faqs={
          state.faqs?.length
            ? state.faqs
            : state.slug === "golden-triangle"
            ? (GOLDEN_TRIANGLE_FAQS as any)
            : state.slug === "south-india"
            ? (SOUTH_INDIA_FAQS as any)
            : state.slug === "taj-mahal"
            ? (TAJ_MAHAL_FAQS as any)
            : undefined
        }
        contextName={state.title}
        contextSlug={state.slug}
        entityType="State"
        sharedLinkedHrefs={pageLinkedHrefs}
        excludeHrefs={excludeHrefs}
        bgType={showCitiesSection ? "pattern" : "white"}
      />

      {/* ===== TRAVEL GUIDE (100% DB DRIVEN - COMPLETE LAST BEFORE FOOTER) ===== */}
      <DestinationGuideSection
        title={state.h1Title || state.title}
        badgeLabel="TRAVEL GUIDE"
        famousFor={state.famousFor}
        moreDescription={state.moreDescription}
        seoDescription={state.seoDescription}
        sharedLinkedHrefs={pageLinkedHrefs}
        excludeHrefs={excludeHrefs}
        className={`w-full relative border-y border-section-border py-10 sm:py-12 md:py-14 ${
          showCitiesSection ? "bg-white" : "bg-section-tint"
        }`}
      />
    </div>
  );
}
