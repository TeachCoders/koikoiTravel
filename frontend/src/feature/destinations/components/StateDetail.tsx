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
import HeroSlider from "@/components/shared/HeroSlider";
import { useHeroBanners } from "@/feature/heroBanner/api";
import { FallbackImage } from "@/components/shared/FallbackImage";
import RichContent from "@/components/shared/RichContent";
import ToursSection from "@/components/shared/ToursSection";
import TourPackageCard from "@/components/shared/TourPackageCard";
import FilterBar from "@/components/shared/FilterBar";
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
import { resolveStateJourneys } from "@/feature/journey/destinationJourneys";
import type { State } from "@/feature/state/type";
import type { Journey, PaginatedResponse } from "@/feature/journey/type";
import CityCard from "./CityCard";
import DestinationsSkeleton from "./DestinationsSkeleton";
import FaqSection from "@/feature/home/components/FaqSection";
import TravelGuideCollapsible from "@/components/shared/TravelGuideCollapsible";

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

  if (isLoading) {
    return (
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <DestinationsSkeleton />
      </div>
    );
  }
  if (!state) return notFound();

  return <StateContent state={state} initialJourneys={initialJourneys} />;
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
  const { journeys, isLoading: journeysLoading } = useGetJourneys(
    { limit: 100, isActive: "true" },
    initialJourneys ?? undefined,
    { enabled: true }
  );

  // Resolved journeys using canonical destination resolver
  const { stateJourneys } = useMemo(
    () => resolveStateJourneys(journeys.length > 0 ? journeys : embeddedJourneys, state),
    [journeys, embeddedJourneys, state]
  );

  // Filters for Tour Packages
  const [expSelected, setExpSelected] = useState<string[]>([]);
  const [durSelected, setDurSelected] = useState<string[]>([]);
  const [citySelected, setCitySelected] = useState<string[]>([]);
  const [seasonSelected, setSeasonSelected] = useState<string[]>([]);

  const activeFilterCount =
    expSelected.length + durSelected.length + citySelected.length + seasonSelected.length;

  const clearFilters = () => {
    setExpSelected([]);
    setDurSelected([]);
    setCitySelected([]);
    setSeasonSelected([]);
  };

  const filteredCurrentJourneys = useMemo(() => {
    if (activeFilterCount === 0) return stateJourneys;
    return stateJourneys.filter(
      (j) =>
        journeyMatchesExperiences(j, expSelected) &&
        journeyMatchesDuration(j, durSelected) &&
        journeyMatchesCities(j, citySelected) &&
        journeyMatchesSeasons(j, seasonSelected)
    );
  }, [stateJourneys, activeFilterCount, expSelected, durSelected, citySelected, seasonSelected]);

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

  const isIllustratedBanner =
    heroImages.some((img: string) => img.includes("comic") || img.includes("banner")) ||
    heroImages.length === 1;

  const heroTitle =
    customHeroBanners[0]?.title ||
    state.h1Title ||
    state.banner?.bannerTitle ||
    state.title;

  const heroTag =
    customHeroBanners[0]?.subtitle ||
    state.banner?.bannerTag ||
    "";
  const pageH1 = state.h1Title;

  const facts = [
    { label: "Capital", value: state.capital },
    { label: "Language", value: state.language },
    { label: "Area", value: state.area },
  ].filter((f) => f.value);

  const stateCities = [...(state.cities ?? [])]
    .filter(
      (c) =>
        c.isActive !== false &&
        c.slug !== state.slug &&
        (c.title ?? "").trim().toLowerCase() !== (state.title ?? "").trim().toLowerCase()
    )
    .sort((a, b) => {
    const aOrder = a.displayOrder ?? 0;
    const bOrder = b.displayOrder ?? 0;
    if (aOrder > 0 && bOrder > 0) return aOrder - bOrder;
    if (aOrder > 0) return -1;
    if (bOrder > 0) return 1;
    return (a.title ?? "").localeCompare(b.title ?? "");
  });

  const journeyCountFor = (cityId?: number) =>
    cityId == null
      ? 0
      : stateJourneys.filter((j) => j.cities?.some((c) => c.id === cityId) || j.cityIds?.includes(cityId)).length;

  const cityImageFor = (cityId?: number) =>
    cityId == null
      ? undefined
      : stateJourneys.find((j) => j.cities?.some((c) => c.id === cityId) || j.cityIds?.includes(cityId))?.thumbImg;

  const displayedCities = useMemo(() => {
    return [...stateCities].sort((a, b) => {
      const aCount = journeyCountFor(a.id);
      const bCount = journeyCountFor(b.id);
      if (aCount > 0 && bCount === 0) return -1;
      if (aCount === 0 && bCount > 0) return 1;
      const aOrder = a.displayOrder && a.displayOrder > 0 ? a.displayOrder : 999;
      const bOrder = b.displayOrder && b.displayOrder > 0 ? b.displayOrder : 999;
      return aOrder - bOrder;
    });
  }, [stateCities, stateJourneys]);

  const cityCount = displayedCities.length ?? 0;

  const cleanStateName = (state.h1Title || state.title)
    .replace(/\s*Tours?(\s*Packages?)?$/i, "")
    .trim();

  const { swiperRef: citiesSwiperRef, slidePrev, slideNext, canScroll } = useSliderControl();

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
      <section className="relative w-full h-[140px] sm:h-[140px] md:h-[520px] overflow-hidden bg-slate-200">
        {heroImages.length > 0 ? (
          <>
            <HeroSlider images={heroImages} alt={state.title} />
            <div
              className={`absolute inset-0 z-10 pointer-events-none ${
                isIllustratedBanner
                  ? "bg-gradient-to-t from-black/40 via-transparent to-black/25"
                  : "bg-gradient-to-t from-black/55 via-black/20 to-black/10"
              }`}
            />
          </>
        ) : (
          <div className="absolute inset-0">
            <FallbackImage
              src={state.thumbImg || state.banner?.images?.[0]}
              alt={state.title}
              fill
              priority
              className="object-cover object-center"
              theme="dark"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10 z-10 pointer-events-none" />
          </div>
        )}

        <div className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 h-full flex flex-col justify-center items-center py-6 sm:py-8 text-center pointer-events-none">
          {heroTag && (
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 mb-3 sm:mb-4 shadow-xl pointer-events-auto">
                <span className="font-luxury font-normal text-xs sm:text-sm uppercase tracking-[0.1] md:tracking-[0.22em] text-white/95">
                {heroTag}
              </span>
            </div>
          )}

          <div className="font-luxury  text-xl sm:text-xl md:text-6xl lg:text-7xl font-black uppercase text-white leading-tight tracking-wide drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            {heroTitle}
          </div>
        </div>
      </section>

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
      {stateJourneys.length > 0 && (
        <ToursSection
          id="top-tours"
          basePath={basePath}
          isLoading={journeysLoading && stateJourneys.length === 0}
          accentLabel="State Itineraries"
          h1Title={formatToursH1(state.h1Title || state.title)}
          overView={state.overView ?? undefined}
          emptyLabel={`No tour packages found matching your criteria in ${cleanStateName}`}
          filterBar={stateJourneys.length >= 8 ? filterBar : undefined}
          onClearFilters={clearFilters}
          sectionClassName="py-8 sm:py-10 md:py-12 bg-[#f8f8f8] border-b border-slate-200/80 shadow-[inset_0_15px_20px_-15px_rgba(0,0,0,0.06)]"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {filteredCurrentJourneys.map((j) => (
                <TourPackageCard key={j.id} journey={j} variant="default" />
              ))}
            </div>
          )}
        </ToursSection>
      )}

      {/* ===== SECTION 3: CITIES / TOP DESTINATIONS IN STATE ===== */}
      {displayedCities.length > 0 && (
        <section id="cities" className="w-full bg-white py-8 sm:py-10 md:py-12 border-b border-slate-200/60">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between mb-6 sm:mb-8 flex-wrap gap-4">
            <div>
              <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#F8904D] mb-1.5">
                Top Destinations
              </span>
              <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-slate-900 mt-1.5">
                Cities in {state.h1Title || state.title}
                <span className="ml-3 align-middle text-xs font-medium text-[#F8904D] bg-[#F8904D]/10 px-2.5 py-1 rounded-full">
                  {cityCount} Cities
                </span>
              </h2>
            </div>
            {!journeysLoading && displayedCities.length > 4 && canScroll && (
              <div className="flex items-center gap-2">
                <button
                  onClick={slidePrev}
                  aria-label="Previous cities"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-sm hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={slideNext}
                  aria-label="Next cities"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-sm hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
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
              <p className="text-slate-500">No cities found in {state.title}</p>
            </div>
          ) : displayedCities.length <= 4 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
            <DestinationSlider swiperRef={citiesSwiperRef}>
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

      {/* ===== SECTION 3.5: POPULAR EXPERIENCES IN STATE (Min 3 packages rule) ===== */}
      {(() => {
        const expMap = new Map<string, { exp: any; count: number }>();
        for (const j of stateJourneys) {
          for (const e of (j.travelExperiences || [])) {
            if (!e.slug || e.slug === "golden-triangle-tour-india" || e.slug === "golden-triangle") continue;
            const existing = expMap.get(e.slug);
            if (existing) {
              existing.count += 1;
            } else {
              expMap.set(e.slug, { exp: e, count: 1 });
            }
          }
        }
        const validStateExps = Array.from(expMap.values())
          .filter((item) => item.count >= 3)
          .sort((a, b) => b.count - a.count);

        if (validStateExps.length === 0) return null;

        return (
          <section className="w-full bg-slate-50/80 py-8 sm:py-10 border-b border-slate-200/60">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
              <div className="mb-6">
                <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#F8904D] mb-1">
                  Curated Travel Themes
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Popular Experiences in {cleanStateName}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Explore handcrafted theme-based holiday packages across {cleanStateName}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {validStateExps.map(({ exp, count }) => (
                  <Link
                    key={exp.slug}
                    href={`/travel-experiences/${exp.slug}/${state.slug}`}
                    className="group bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#F8904D]/60 hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F8904D]/10 text-[#F8904D]">
                          <Sparkles size={11} /> {count} Packages
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#F8904D] transition-colors">
                        {exp.title} in {cleanStateName}
                      </h3>
                    </div>
                    <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-slate-900">
                      <span>Explore Tours</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-[#F8904D]" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}



      {/* ===== FAQ SECTION ===== */}
      <FaqSection
        faqs={state.faqs}
        contextName={state.title}
        contextSlug={state.slug}
        entityType="State"
        sharedLinkedHrefs={pageLinkedHrefs}
        excludeHrefs={excludeHrefs}
      />

      {/* ===== ARTICLE / MORE DESCRIPTION (ALL INFO) AT BOTTOM WITH WHITE BACKGROUND ===== */}
      {showMoreSection && (
        <section id="more" className="bg-white border-t border-slate-200/60 py-8 sm:py-10 md:py-12">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
            <div className={`grid grid-cols-1 gap-10 ${hasKnowMoreText && hasSidebar ? "lg:grid-cols-3" : ""}`}>
              {hasKnowMoreText && (
                <div className={hasSidebar ? "lg:col-span-2" : "w-full"}>
                  <TravelGuideCollapsible
                    title={`Everything About ${state.title}`}
                    subtitle={`Essential travel guide, top places to visit, culture, food & insider tips for ${state.title}.`}
                  >
                    {hasSeoDesc && (
                      <RichContent
                        html={state.seoDescription!}
                        sharedLinkedHrefs={pageLinkedHrefs}
                        excludeHrefs={excludeHrefs}
                      />
                    )}

                    {hasMoreDesc && (
                      <RichContent
                        html={state.moreDescription!}
                        sharedLinkedHrefs={pageLinkedHrefs}
                        excludeHrefs={excludeHrefs}
                        className={hasSeoDesc ? "mt-8" : ""}
                      />
                    )}
                  </TravelGuideCollapsible>
                </div>
              )}

              {hasSidebar && (
                <aside className={`space-y-6 lg:sticky lg:top-28 z-10 self-start ${!hasKnowMoreText ? "max-w-xl mx-auto w-full" : ""}`}>
              {facts.length > 0 && (
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-6 shadow-sm relative overflow-hidden">
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#2E8B8B] mb-4">
                    Quick Facts
                  </h3>
                  <dl className="flex flex-col divide-y divide-slate-200/70">
                    {facts.map((f) => (
                      <div key={f.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                        <dt className="text-[14px] text-slate-600 font-medium flex items-center gap-2">
                          {f.label}
                        </dt>
                        <dd className="text-[14.5px] font-semibold text-slate-900 text-right capitalize">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {state.famousFor && (
                <div className="rounded-2xl bg-gradient-to-br from-[#2E8B8B]/10 via-transparent to-[#2E8B8B]/5 border border-[#2E8B8B]/20 p-6 shadow-sm relative overflow-hidden">
                  <Sparkles className="absolute -top-4 -right-4 w-24 h-24 text-[#2E8B8B]/10 rotate-12" />
                  <div className="w-full flex items-center justify-between gap-3 text-left relative z-10">
                    <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900">
                      <Sparkles size={16} className="text-[#F8904D]" />
                      Famous For
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-2.5 relative z-10">
                    {stripHtml(state.famousFor)
                      .split(",")
                      .map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[14px] text-slate-700 font-medium leading-relaxed">
                          <BadgeCheck size={16} className="shrink-0 mt-[3px] text-[#2E8B8B]" />
                          {item.trim()}
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {stateJourneys.filter((j) => (j.displayOrder ?? 0) > 0).length > 0 && (
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-6 shadow-sm">
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#2E8B8B] mb-4 flex items-center justify-between">
                    Top 10 Tour Packages
                    <span className="text-[11px] font-semibold text-[#F8904D] bg-[#F8904D]/10 px-2 py-0.5 rounded-full">
                      {Math.min(
                        10,
                        stateJourneys.filter((j) => (j.displayOrder ?? 0) > 0).length
                      )}
                    </span>
                  </h3>
                  <ol className="mt-2 space-y-1">
                    {[...stateJourneys]
                      .filter((j) => (j.displayOrder ?? 0) > 0)
                      .sort(
                        (a, b) =>
                          (a.displayOrder ?? Number.MAX_SAFE_INTEGER) -
                          (b.displayOrder ?? Number.MAX_SAFE_INTEGER)
                      )
                      .slice(0, 10)
                      .map((j, i) => (
                        <li key={j.id}>
                          <Link
                            href={journeyPackageHref(j)}
                            className="flex items-start gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-white transition-colors group"
                          >
                            <span className="mt-[2px] w-[26px] h-[26px] shrink-0 rounded-full bg-slate-200 text-[#1C1C1C] text-[12px] font-semibold flex items-center justify-center group-hover:bg-[#2E8B8B] group-hover:text-white transition-colors shadow-sm">
                              {i + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <span className="text-[14.5px] font-medium text-[#333] leading-snug group-hover:text-[#2E8B8B] transition-colors block truncate">
                                {j.title.split("|")[0].trim()}
                              </span>
                              <div className="flex items-center gap-2 mt-0.5 text-[12px] font-medium text-slate-500">
                                <span>{j.duration || (j.noDays > 0 ? `${j.noDays} Days` : "")}</span>
                                {j.destination && (
                                  <>
                                    <span>•</span>
                                    <span className="truncate max-w-[140px]">{j.destination}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                  </ol>
                </div>
              )}
            </aside>
            )}
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
