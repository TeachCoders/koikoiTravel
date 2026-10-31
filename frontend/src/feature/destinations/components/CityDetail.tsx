"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import {
  ChevronRight,
  Sparkles,
  CalendarDays,
  Sun,
} from "lucide-react";
import { useCityBySlug } from "@/feature/city/api/useCity";
import type { City } from "@/feature/city/type";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import HeroBanner from "@/components/shared/HeroBanner";
import { useHeroBanners } from "@/feature/heroBanner/api";
import { FallbackImage } from "@/components/shared/FallbackImage";
import DestinationGuideSection from "@/components/shared/DestinationGuideSection";
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

      {/* ===== DESTINATION GUIDE (COMPLETE LAST BEFORE FOOTER) ===== */}
      <DestinationGuideSection
        title={city.h1Title || city.title}
        famousFor={city.famousFor}
        moreDescription={city.moreDescription}
        seoDescription={city.seoDescription}
        attractions={city.attractions}
        weather={city.weather}
        sharedLinkedHrefs={pageLinkedHrefs}
        excludeHrefs={excludeHrefs}
      />
    </div>
  );
}
