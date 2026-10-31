"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import {
  ChevronRight,
  Sparkles,
  CalendarDays,
  Sun,
  CloudSun,
  Compass,
  ChevronDown,
} from "lucide-react";
import { useCityBySlug } from "@/feature/city/api/useCity";
import type { City } from "@/feature/city/type";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import HeroBanner from "@/components/shared/HeroBanner";
import { useHeroBanners } from "@/feature/heroBanner/api";
import { FallbackImage } from "@/components/shared/FallbackImage";
import RichContent from "@/components/shared/RichContent";
import ExpandableRichContent from "@/components/shared/ExpandableRichContent";
import ToursSection from "@/components/shared/ToursSection";
import FilterBar from "@/components/shared/FilterBar";
import {
  travelExperienceOptions,
  durationOptions,
  seasonOptions,
  journeyMatchesExperiences,
  journeyMatchesDuration,
  journeyMatchesSeasons,
} from "@/feature/journey/filterOptions";
import { cn, stripHtml, formatToursH1 } from "@/lib/utils";
import { resolveCityJourneys } from "@/feature/journey/destinationJourneys";
import DestinationsSkeleton from "./DestinationsSkeleton";
import FaqSection from "@/feature/home/components/FaqSection";

export default function CityDetail({
  citySlug,
  initialCity,
  initialJourneys,
}: {
  citySlug: string;
  initialCity?: City | null;
  initialJourneys?: JourneyPage<Journey> | null;
}) {
  const { city, isLoading } = useCityBySlug(citySlug, initialCity);

  if (isLoading) {
    return (
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <DestinationsSkeleton />
      </div>
    );
  }
  if (!city) return notFound();

  return <CityContent city={city} initialJourneys={initialJourneys} />;
}

function CityContent({
  city,
  initialJourneys,
}: {
  city: City;
  initialJourneys?: JourneyPage<Journey> | null;
}) {
  const state = city.state;
  const countrySlug = state?.country?.slug;
  const stateSlug = state?.slug;

  const pageLinkedHrefs = useMemo(() => new Set<string>(), [city.id]);
  const excludeHrefs = useMemo(() => [
    `/tour-packages/${countrySlug || "india"}/${stateSlug}/${city.slug}`,
    `/${countrySlug || "india"}/${stateSlug}/${city.slug}`,
    `/tour-packages/india/${stateSlug}/${city.slug}`,
    city.slug,
  ], [countrySlug, stateSlug, city.slug]);

  const { journeys, isLoading: journeysLoading } = useGetJourneys(
    { limit: 100, isActive: "true" },
    initialJourneys
  );
  const cityJourneys = useMemo(
    () => resolveCityJourneys(journeys, city),
    [journeys, city]
  );

  const [expSelected, setExpSelected] = useState<string[]>([]);
  const [durSelected, setDurSelected] = useState<string[]>([]);
  const [seasonSelected, setSeasonSelected] = useState<string[]>([]);

  const filteredJourneys = cityJourneys.filter(
    (j) =>
      journeyMatchesExperiences(j, expSelected) &&
      journeyMatchesDuration(j, durSelected) &&
      journeyMatchesSeasons(j, seasonSelected)
  );

  const activeFilterCount = expSelected.length + durSelected.length + seasonSelected.length;

  const clearFilters = () => {
    setExpSelected([]);
    setDurSelected([]);
    setSeasonSelected([]);
  };

  const { data: heroBannersData } = useHeroBanners("City", {
    slug: city.slug,
    entityId: city.id,
  });
  const customHeroBanners = heroBannersData?.data || [];

  const heroImages =
    customHeroBanners.length > 0
      ? customHeroBanners.map((b) => b.image)
      : city.banner?.images?.length
        ? city.banner.images
        : city.thumbImg
          ? [city.thumbImg]
          : [];

  const heroSlides =
    customHeroBanners.length > 0
      ? customHeroBanners.map((b) => ({ image: b.image, mobileImage: b.mobileImage }))
      : heroImages.map((img) => ({ image: img, mobileImage: null }));

  const heroTitle =
    customHeroBanners[0]?.title ||
    city.h1Title ||
    city.banner?.bannerTitle ||
    city.title;

  const heroTag =
    customHeroBanners[0]?.subtitle ||
    city.banner?.bannerTag ||
    "";
  const pageH1 = city.h1Title;


  const filterBar = (
    <FilterBar
      sections={[
        {
          id: "experience",
          title: "Travel Experience",
          icon: <Sparkles size={14} />,
          options: travelExperienceOptions(cityJourneys),
          selected: expSelected,
          onChange: setExpSelected,
        },
        // {
        //   id: "season",
        //   title: "Best Season / Month",
        //   icon: <Sun size={14} />,
        //   options: seasonOptions(cityJourneys),
        //   selected: seasonSelected,
        //   onChange: setSeasonSelected,
        // },
        {
          id: "duration",
          title: "Duration",
          icon: <CalendarDays size={14} />,
          options: durationOptions(cityJourneys),
          selected: durSelected,
          onChange: setDurSelected,
        },
      ]}
      activeCount={activeFilterCount}
      onClearAll={clearFilters}
      resultCount={filteredJourneys.length}
      totalCount={cityJourneys.length}
    />
  );

  const hasSeoDesc = Boolean(stripHtml(city.seoDescription).trim());
  const hasMoreDesc = Boolean(stripHtml(city.moreDescription).trim());
  const hasAttractions = Boolean(stripHtml(city.attractions).trim());
  const hasWeather = Boolean(stripHtml(city.weather).trim());
  const hasKnowMoreText = hasSeoDesc || hasMoreDesc || hasAttractions || hasWeather;

  const hasFamousFor = Boolean(stripHtml(city.famousFor || "").trim());
  const showMoreSection = hasKnowMoreText || hasFamousFor;

  return (
    <div>
      {/* ===== HERO ===== */}
      <HeroBanner
        slides={heroSlides}
        fallbackImage={city.thumbImg || city.banner?.images?.[0]}
        alt={city.title}
        tag={heroTag}
        title={heroTitle}
      />

      {/* ===== BREADCRUMB (BELOW HERO) ===== */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-slate-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-3 flex flex-wrap items-center gap-1.5 text-[14px] text-slate-500">
          <Link href="/" className="hover:text-[#2E8B8B] transition-colors shrink-0 font-medium">
            Home
          </Link>
          <ChevronRight size={14} className="text-slate-300 shrink-0" />
          <Link href="/tour-packages" className="hover:text-[#2E8B8B] transition-colors shrink-0 font-medium">
            Tour Packages
          </Link>
          {state?.country && (
            <>
              <ChevronRight size={14} className="text-slate-300 shrink-0" />
              <Link
                href={`/tour-packages/${state.country.slug}`}
                className="hover:text-[#2E8B8B] transition-colors shrink-0 font-medium"
              >
                {state.country.title.replace(/\s*Tour$/i, "")}
              </Link>
            </>
          )}
          {state && (
            <>
              <ChevronRight size={14} className="text-slate-300 shrink-0" />
              <Link
                href={countrySlug ? `/tour-packages/${countrySlug}/${state.slug}` : `/tour-packages/${state.slug}`}
                className="hover:text-[#2E8B8B] transition-colors shrink-0 font-medium capitalize"
              >
                {(state as any)?.h1Title || state.title}
              </Link>
            </>
          )}
          <ChevronRight size={14} className="text-slate-300 shrink-0" />
          <span className="text-[#1C1C1C] font-semibold capitalize">{city.h1Title || city.title}</span>
        </div>
      </nav>

      {/* ===== SHORT DESCRIPTION + TOURS ===== */}
      <ToursSection
        basePath={
          countrySlug && state?.slug
            ? `/tour-packages/${countrySlug}/${state.slug}/${city.slug}`
            : `/tour-packages/${city.slug}`
        }
        journeys={filteredJourneys}
        isLoading={journeysLoading}
        h1Title={formatToursH1(city.h1Title || city.title)}
        overView={city.overView ?? undefined}
        emptyLabel={`No tours found in ${city.h1Title || city.title} yet`}
        filterBar={cityJourneys.length >= 8 ? filterBar : undefined}
        onClearFilters={clearFilters}
        sharedLinkedHrefs={pageLinkedHrefs}
        excludeHrefs={excludeHrefs}
      />

      {/* ===== KNOW MORE (ALL INFO) - FULL VIEW ===== */}
      {showMoreSection && (
        <section id="more" className="bg-white border-y border-section-border py-8 sm:py-10 md:py-12">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
            {/* Header */}
            <div className="mb-6">
              <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#F8904D] mb-1.5">
                Destination Guide
              </span>
              <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold tracking-tight text-slate-900">
                Everything About {city.h1Title || city.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
                Essential travel guide, top attractions, weather, local tips & culture for {city.h1Title || city.title}.
              </p>
            </div>

            {/* Famous For */}
            {hasFamousFor && (
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={17} className="text-[#F8904D]" />
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                    Famous For
                  </h3>
                </div>
                {city.famousFor && /<li\b/i.test(city.famousFor) ? (
                  <RichContent
                    html={city.famousFor}
                    sharedLinkedHrefs={pageLinkedHrefs}
                    excludeHrefs={excludeHrefs}
                    className="text-sm sm:text-[15px] text-slate-700 leading-relaxed [&>ul]:my-0 [&>ul]:space-y-2 [&_li]:my-1.5 [&_li]:text-sm sm:[&_li]:text-[15px] [&_p]:inline [&_p]:m-0"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {stripHtml(city.famousFor || "")
                      .split(/[,•\n]+/)
                      .map((item) => item.trim())
                      .filter(Boolean)
                      .map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-[13.5px] font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2E8B8B]" />
                          {item}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* 100% DB Rich Content */}
            <div className="max-w-none">
              <ExpandableRichContent
                html={city.moreDescription}
                fallbackHtml={city.seoDescription}
                sharedLinkedHrefs={pageLinkedHrefs}
                excludeHrefs={excludeHrefs}
                hideAllContentWhenCollapsed={hasFamousFor}
                extraContent={
                  (hasAttractions || hasWeather) ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-200/80">
                      {hasAttractions && (
                        <div className="bg-slate-50/70 rounded-xl p-4 sm:p-5 border border-slate-200/70">
                          <div className="flex items-center gap-2 text-[#2E8B8B] font-bold text-xs sm:text-sm uppercase tracking-wider mb-1.5">
                            <Compass size={17} />
                            <span>Top Attractions</span>
                          </div>
                          <p className="text-sm sm:text-[14.5px] text-slate-700 font-medium leading-relaxed">
                            {stripHtml(city.attractions!)}
                          </p>
                        </div>
                      )}
                      {hasWeather && (
                        <div className="bg-slate-50/70 rounded-xl p-4 sm:p-5 border border-slate-200/70">
                          <div className="flex items-center gap-2 text-[#F8904D] font-bold text-xs sm:text-sm uppercase tracking-wider mb-1.5">
                            <CloudSun size={17} />
                            <span>Weather & Best Time</span>
                          </div>
                          <p className="text-sm sm:text-[14.5px] text-slate-700 font-medium leading-relaxed">
                            {stripHtml(city.weather!)}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : null
                }
              />
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ SECTION ===== */}
      <FaqSection
        faqs={city.faqs}
        contextName={city.title}
        contextSlug={city.slug}
        entityType="City"
        sharedLinkedHrefs={pageLinkedHrefs}
        excludeHrefs={excludeHrefs}
        bgType="pattern"
      />
    </div>
  );
}
