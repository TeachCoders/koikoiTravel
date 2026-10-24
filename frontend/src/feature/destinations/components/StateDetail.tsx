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
import DoodleBackground from "@/components/shared/DoodleBackground";
import { GOLDEN_TRIANGLE_FAQS } from "@/feature/travelExperience/goldenTriangleFaqs";
import { SOUTH_INDIA_FAQS } from "../southIndiaFaqs";
import { TAJ_MAHAL_FAQS } from "../tajMahalFaqs";
import { QuoteModal } from "@/components/shared/QuoteModal";

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
    let citiesList = [...stateCities];
    const isCircuit = state.slug === "golden-triangle" || state.slug === "taj-mahal" || state.slug === "south-india" || state.slug?.includes("golden-triangle") || state.slug?.includes("taj-mahal") || state.slug?.includes("south-india");
    if (citiesList.length === 0 && isCircuit) {
      const seen = new Set<string>();
      const extracted: any[] = [];
      for (const j of stateJourneys) {
        for (const c of (j.cities || [])) {
          if (!c.slug || seen.has(c.slug)) continue;
          seen.add(c.slug);
          extracted.push(c);
        }
      }
      const priority = state.slug === "taj-mahal"
        ? ["agra", "delhi", "fatehpur-sikri", "jaipur"]
        : state.slug === "south-india"
        ? ["mahabalipuram", "pondicherry", "madurai", "thanjavur", "hampi", "mysore", "mysuru", "coorg", "ooty", "bangalore", "chennai", "nagarhole", "bandipur", "kodaikanal", "rameshwaram", "badami"]
        : ["delhi", "agra", "jaipur", "fatehpur-sikri", "ranthambore"];
      extracted.sort((a, b) => {
        const aIdx = priority.indexOf(a.slug);
        const bIdx = priority.indexOf(b.slug);
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
        return (a.title || "").localeCompare(b.title || "");
      });
      citiesList = extracted;
    }

    return citiesList.sort((a, b) => {
      const aCount = journeyCountFor(a.id);
      const bCount = journeyCountFor(b.id);
      if (aCount > 0 && bCount === 0) return -1;
      if (aCount === 0 && bCount > 0) return 1;
      const aOrder = a.displayOrder && a.displayOrder > 0 ? a.displayOrder : 999;
      const bOrder = b.displayOrder && b.displayOrder > 0 ? b.displayOrder : 999;
      return aOrder - bOrder;
    });
  }, [stateCities, stateJourneys, state.slug]);

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
      <section className="relative w-full h-[36vw] min-h-[234px] max-h-[520px] md:h-[520px] md:max-h-none overflow-hidden bg-slate-200">
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

        <div className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 h-full flex flex-col justify-center items-center py-4 sm:py-6 md:py-8 text-center pointer-events-none">
          {heroTag && (
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 mb-2 sm:mb-4 shadow-xl pointer-events-auto">
                <span className="font-luxury font-normal text-xs sm:text-sm uppercase tracking-[0.1] md:tracking-[0.22em] text-white/95">
                {heroTag}
              </span>
            </div>
          )}

          <div className="font-luxury text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase text-white leading-tight tracking-wide drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
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
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
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
      )}

      {/* ===== SECTION 3: CITIES / TOP DESTINATIONS IN STATE ===== */}
      {displayedCities.length > 0 && state.slug !== "golden-triangle" && (
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
        bgType={displayedCities.length > 0 && state.slug !== "golden-triangle" ? "pattern" : "white"}
      />

      {/* ===== TRAVEL GUIDE (100% DB DRIVEN - STRICT 2-BG ALTERNATION, NO SIDEBAR) ===== */}
      {showMoreSection && (
        <section
          id="more"
          className={`w-full relative border-t border-slate-200/60 py-10 sm:py-12 md:py-14 overflow-hidden ${
            displayedCities.length > 0 && state.slug !== "golden-triangle" ? "bg-white" : "bg-[#f8f8f8]"
          }`}
        >
          {!(displayedCities.length > 0 && state.slug !== "golden-triangle") && <DoodleBackground />}
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
            {/* Header */}
            <div className="mb-8">
              <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#F8904D] mb-1.5">
                TRAVEL GUIDE
              </span>
              <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold tracking-tight text-slate-900">
                Everything About {state.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
                Essential travel guide, top places to visit, culture, food & insider tips for {state.title}.
              </p>
            </div>

            {/* Merged Common DB Fields (Famous For & Quick Facts) */}
            {(hasFamousFor || facts.length > 0) && (
              <div className="mb-8 pb-6 border-b border-slate-200/80 space-y-4">
                {/* Famous For with icon and normal bullets from DB */}
                {hasFamousFor && (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles size={17} className="text-[#F8904D]" />
                      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                        Famous For
                      </h3>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 list-disc list-inside text-sm sm:text-[14.5px] text-slate-700 font-medium">
                      {stripHtml(state.famousFor!)
                        .split(",")
                        .map((item, i) => (
                          <li key={i} className="marker:text-[#2E8B8B]">
                            <span>{item.trim()}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Quick Facts from DB */}
                {facts.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-[13.5px] text-slate-600 pt-1">
                    {facts.map((f) => (
                      <div key={f.label} className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-normal">{f.label}:</span>
                        <span className="font-semibold text-slate-800 capitalize">{f.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 100% DB Rich Content */}
            <div className="max-w-none">
              {hasSeoDesc && (
                <div className="text-base sm:text-[17px] text-slate-700 leading-relaxed font-normal mb-8 pb-6 border-b border-slate-100">
                  <RichContent
                    html={state.seoDescription!}
                    sharedLinkedHrefs={pageLinkedHrefs}
                    excludeHrefs={excludeHrefs}
                  />
                </div>
              )}

              {hasMoreDesc && (
                <RichContent
                  html={state.moreDescription!}
                  sharedLinkedHrefs={pageLinkedHrefs}
                  excludeHrefs={excludeHrefs}
                />
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
