"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import {
  MapPin,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CalendarDays,
  Sun,
  BadgeCheck,
  ChevronDown,
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
import type { State } from "@/feature/state/type";
import type { Journey, PaginatedResponse } from "@/feature/journey/type";
import CityCard from "./CityCard";
import DestinationsSkeleton from "./DestinationsSkeleton";
import FaqSection from "@/feature/home/components/FaqSection";

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
  const embeddedJourneys = state.journeys ?? [];
  const { journeys, isLoading: journeysLoading } = useGetJourneys(
    { limit: 100, isActive: "true" },
    initialJourneys ?? undefined,
    { enabled: true }
  );

  // All active journeys that visit cities in this state
  const stateJourneys = (
    journeys.length > 0
      ? journeys.filter((j) =>
          j.cities?.some((c) => c.state?.id === state.id || (state.cities && state.cities.some((sc) => sc.id === c.id))) ||
          (state.cities && j.cityIds?.some((cid) => state.cities?.some((sc) => sc.id === cid)))
        )
      : embeddedJourneys
  ).sort((a, b) => {
    const aOrder = a.displayOrder ?? 0;
    const bOrder = b.displayOrder ?? 0;
    if (aOrder > 0 && bOrder > 0) return aOrder - bOrder;
    if (aOrder > 0) return -1;
    if (bOrder > 0) return 1;
    if (a.isBestSelling && !b.isBestSelling) return -1;
    if (!a.isBestSelling && b.isBestSelling) return 1;
    return 0;
  });

  // 1. Featured / Top Journeys selected from dashboard (or fallback to highest displayOrder / isBestSelling)
  const dashboardTopJourneys = embeddedJourneys.length > 0 ? embeddedJourneys : [];
  const topJourneys: Journey[] =
    dashboardTopJourneys.length > 0
      ? dashboardTopJourneys
      : stateJourneys
          .filter((j) => (j.displayOrder ?? 0) > 0 || j.isBestSelling)
          .slice(0, 8);

  const topJourneyIdSet = new Set(topJourneys.map((j) => j.id));

  // 2. Multi-City & Extended Journeys (State tours excluding the top featured ones)
  const multiCityJourneys = stateJourneys.filter((j) => !topJourneyIdSet.has(j.id));

  // Filters for Top Tour Packages
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

  const filteredTopJourneys =
    activeFilterCount > 0
      ? stateJourneys.filter(
          (j) =>
            journeyMatchesExperiences(j, expSelected) &&
            journeyMatchesDuration(j, durSelected) &&
            journeyMatchesCities(j, citySelected) &&
            journeyMatchesSeasons(j, seasonSelected)
        )
      : topJourneys;

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

  const heroTitle =
    customHeroBanners[0]?.title ||
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

  const stateCities = [...(state.cities ?? [])].sort((a, b) => {
    const aOrder = a.displayOrder ?? 0;
    const bOrder = b.displayOrder ?? 0;
    if (aOrder > 0 && bOrder > 0) return aOrder - bOrder;
    if (aOrder > 0) return -1;
    if (bOrder > 0) return 1;
    return (a.title ?? "").localeCompare(b.title ?? "");
  });

  const journeyCountFor = (cityId: number) =>
    stateJourneys.filter((j) => j.cities?.some((c) => c.id === cityId) || j.cityIds?.includes(cityId)).length;

  const cityImageFor = (cityId: number) =>
    stateJourneys.find((j) => j.cities?.some((c) => c.id === cityId) || j.cityIds?.includes(cityId))?.thumbImg;

  const displayedCities = useMemo(() => {
    return [...stateCities].sort((a, b) => {
      const aOrder = a.displayOrder && a.displayOrder > 0 ? a.displayOrder : 999;
      const bOrder = b.displayOrder && b.displayOrder > 0 ? b.displayOrder : 999;
      return aOrder - bOrder;
    });
  }, [stateCities]);

  const cityCount = displayedCities.length ?? 0;

  const { swiperRef: citiesSwiperRef, slidePrev, slideNext, canScroll } = useSliderControl();
  const {
    swiperRef: multiCitySwiperRef,
    slidePrev: multiCityPrev,
    slideNext: multiCityNext,
    canScroll: multiCityCanScroll,
  } = useSliderControl();

  const filterBar = (
    <FilterBar
      sections={[
        {
          id: "city",
          title: "Destination",
          icon: <MapPin size={14} />,
          options: cityOptions(stateJourneys, (c) => c.state?.id === state.id),
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
          id: "season",
          title: "Best Season / Month",
          icon: <Sun size={14} />,
          options: seasonOptions(stateJourneys),
          selected: seasonSelected,
          onChange: setSeasonSelected,
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
      resultCount={filteredTopJourneys.length}
      totalCount={stateJourneys.length}
    />
  );

  const hasKnowMoreText = Boolean(state.seoDescription || state.moreDescription);
  const basePath = state.country?.slug
    ? `/tour-packages/${state.country.slug}/${state.slug}`
    : `/tour-packages/${state.slug}`;

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative w-full h-[300px] sm:h-[380px] md:h-[520px] overflow-hidden bg-slate-200">
        {heroImages.length > 0 ? (
          <>
            <HeroSlider images={heroImages} alt={state.title} />
            <div className="absolute inset-0 bg-slate-950/20" />
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/30" />
          </div>
        )}

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 h-full flex flex-col justify-center items-center py-6 sm:py-8 text-center">
          {heroTag && (
            <p className="sm:block w-fit max-w-2xl mx-auto mb-3 text-[17px] font-bold uppercase tracking-[0.28em] leading-relaxed pr-[0.28em] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_14px_rgba(0,0,0,0.8)]">
              {heroTag}
            </p>
          )}

          <div className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white leading-tight tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,1)] drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_14px_36px_rgba(0,0,0,0.85)]">
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
                {state.country.title.replace(/\s*Tour$/i, "")}
              </Link>
            </>
          )}
          <ChevronRight size={13} className="text-slate-400 shrink-0" />
          <span className="text-slate-900 font-semibold">{state.title}</span>
        </div>
      </nav>

      {/* ===== SECTION 2: TOP TOUR PACKAGES IN STATE ===== */}
      {(topJourneys.length > 0 || stateJourneys.length > 0) && (
        <ToursSection
          id="top-tours"
          basePath={basePath}
          journeys={filteredTopJourneys}
          isLoading={journeysLoading && topJourneys.length === 0}
          accentLabel="Handpicked Top Tour Packages"
          h1Title={formatToursH1(state.title)}
          overView={state.overView ?? undefined}
          emptyLabel={`No tour packages found matching your criteria in ${state.title}`}
          filterBar={stateJourneys.length > 0 ? filterBar : undefined}
          onClearFilters={clearFilters}
          sectionClassName="py-8 sm:py-10 md:py-12 bg-[#f8f8f8] border-b border-slate-200/80 shadow-[inset_0_15px_20px_-15px_rgba(0,0,0,0.06)]"
          cardVariant="default"
        />
      )}

      {/* ===== SECTION 3: CITIES / TOP DESTINATIONS IN STATE ===== */}
      {(journeysLoading || displayedCities.length > 0) && (
        <section id="cities" className="w-full bg-white py-8 sm:py-10 md:py-12 border-b border-slate-200/60">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between mb-6 sm:mb-8 flex-wrap gap-4">
            <div>
              <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#F8904D] mb-1.5">
                Top Destinations
              </span>
              <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-slate-900 mt-1.5">
                Cities in {state.title}
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

      {/* ===== SECTION 4: MULTI-CITY TOURS WITH STATE (SLIDER FORMAT) ===== */}
      {!journeysLoading && multiCityJourneys.length > 0 && (
        <section id="multi-city-tours" className="w-full bg-[#f8f8f8] py-8 sm:py-10 md:py-12 border-b border-slate-200/60">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between mb-6 sm:mb-8 flex-wrap gap-4">
              <div>
                <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#F8904D] mb-1.5">
                  Circuits & Extended Tours
                </span>
                <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-slate-900 mt-1.5">
                  Multi City Tours with {state.title}
                  <span className="ml-3 align-middle text-xs font-medium text-[#F8904D] bg-[#F8904D]/10 px-2.5 py-1 rounded-full">
                    {multiCityJourneys.length} Tours
                  </span>
                </h2>
              </div>
              {!journeysLoading && multiCityJourneys.length > 4 && multiCityCanScroll && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={multiCityPrev}
                    aria-label="Previous multi-city tours"
                    className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-sm hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={multiCityNext}
                    aria-label="Next multi-city tours"
                    className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-sm hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>

            {journeysLoading ? (
              <DestinationsSkeleton count={4} />
            ) : multiCityJourneys.length === 0 ? (
              <div className="text-center py-14">
                <MapPin size={40} className="mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500">No multi-city tours found for {state.title}</p>
              </div>
            ) : multiCityJourneys.length <= 4 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {multiCityJourneys.map((j) => (
                  <TourPackageCard
                    key={j.id}
                    journey={j}
                    variant="compact"
                  />
                ))}
              </div>
            ) : (
              <DestinationSlider
                swiperRef={multiCitySwiperRef}
                options={{
                  loop: multiCityJourneys.length > 5,
                  autoplay: false,
                  spaceBetween: 24,
                  breakpoints: {
                    0: { slidesPerView: 1.15, spaceBetween: 14 },
                    640: { slidesPerView: 2, spaceBetween: 18 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    1280: { slidesPerView: 4, spaceBetween: 24 },
                  },
                }}
              >
                {multiCityJourneys.map((j) => (
                  <TourPackageCard
                    key={j.id}
                    journey={j}
                    variant="compact"
                  />
                ))}
              </DestinationSlider>
            )}
          </div>
        </section>
      )}

      {/* ===== FAQ SECTION ===== */}
      <FaqSection faqs={state.faqs} />

      {/* ===== ARTICLE / MORE DESCRIPTION (ALL INFO) AT BOTTOM WITH WHITE BACKGROUND ===== */}
      <section id="more" className="bg-white border-t border-slate-200/60 py-8 sm:py-10 md:py-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className={`grid grid-cols-1 gap-10 ${hasKnowMoreText ? "lg:grid-cols-3" : ""}`}>
          {hasKnowMoreText && (
              <div className="lg:col-span-2">
                <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#F8904D] mb-1.5">
                  Know More
                </span>
                <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-slate-900 mt-1.5 mb-6">
                  Everything About {state.title}
                </h2>

                {state.seoDescription && (
                  <RichContent html={state.seoDescription} />
                )}

                {state.moreDescription && (
                  <RichContent html={state.moreDescription} className="mt-8" />
                )}
              </div>
          )}

            <aside className="space-y-6 lg:sticky lg:top-28 z-10 self-start">
              {facts.length > 0 && (
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-6 shadow-sm relative overflow-hidden">
                  <h4 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#2E8B8B] mb-4">
                    Quick Facts
                  </h4>
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
                  <h4 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#2E8B8B] mb-4 flex items-center justify-between">
                    Top 10 Tour Packages
                    <span className="text-[11px] font-semibold text-[#F8904D] bg-[#F8904D]/10 px-2 py-0.5 rounded-full">
                      {Math.min(
                        10,
                        stateJourneys.filter((j) => (j.displayOrder ?? 0) > 0).length
                      )}
                    </span>
                  </h4>
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
                                {((j.discountPrice ?? 0) > 0 || (j.pricePerPerson ?? 0) > 0) ? (
                                  <>
                                    <span>•</span>
                                    <span className="text-[#F8904D] font-semibold">
                                      ₹{((j.discountPrice || j.pricePerPerson) as number).toLocaleString("en-IN")}
                                    </span>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                  </ol>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
