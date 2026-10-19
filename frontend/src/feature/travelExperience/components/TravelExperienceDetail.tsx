"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import {
  MapPin,
  ChevronRight,
  Sparkles,
  ArrowRight,
  CalendarDays,
  Sun,
  BadgeCheck,
} from "lucide-react";
import { useTravelExperienceBySlug, useGetTravelExperiences } from "@/feature/travelExperience/api/useTravelExperience";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
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
  DURATION_BUCKETS,
} from "@/feature/journey/filterOptions";
import { cn, formatToursH1 } from "@/lib/utils";
import { resolveTravelExperienceJourneys } from "@/feature/journey/destinationJourneys";
import DestinationsSkeleton from "@/feature/destinations/components/DestinationsSkeleton";
import FaqSection from "@/feature/home/components/FaqSection";
import { GOLDEN_TRIANGLE_FAQS } from "../goldenTriangleFaqs";
import type { TravelExperience, TravelExperienceCity } from "@/feature/travelExperience/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";

export default function TravelExperienceDetail({
  slug,
  initialExperience,
  initialJourneys,
}: {
  slug: string;
  initialExperience?: any;
  initialJourneys?: JourneyPage<Journey> | null;
}) {
  const { travelExperience, isLoading } = useTravelExperienceBySlug(slug, initialExperience);

  if (isLoading) {
    return (
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <DestinationsSkeleton />
      </div>
    );
  }
  if (!travelExperience) return notFound();

  return <ExperienceContent experience={travelExperience} initialJourneys={initialJourneys} />;
}

function ExperienceContent({
  experience,
  initialJourneys,
}: {
  experience: any;
  initialJourneys?: JourneyPage<Journey> | null;
}) {
  const h1Title = experience.h1Title || experience.title;

  const pageLinkedHrefs = useMemo(() => new Set<string>(), [experience.id]);
  const excludeHrefs = useMemo(() => [
    `/travel-experiences/${experience.slug}`,
    experience.slug,
  ], [experience.slug]);

  const { journeys, isLoading: journeysLoading } = useGetJourneys(
    {
      limit: 100,
      isActive: "true",
    },
    initialJourneys ?? undefined
  );
  const [activeTab, setActiveTab] = useState<"top-tours" | "all-tours">("top-tours");

  const {
    experienceJourneys,
    topTours,
    otherTours,
    hasTabs,
  } = useMemo(
    () => resolveTravelExperienceJourneys(journeys, experience),
    [journeys, experience]
  );

  const currentTabJourneys = hasTabs
    ? activeTab === "top-tours"
      ? topTours
      : otherTours
    : experienceJourneys;

  const [durSelected, setDurSelected] = useState<string[]>([]);
  const [citySelected, setCitySelected] = useState<string[]>([]);
  const [seasonSelected, setSeasonSelected] = useState<string[]>([]);

  const activeFilterCount = durSelected.length + citySelected.length + seasonSelected.length;

  const clearFilters = () => {
    setDurSelected([]);
    setCitySelected([]);
    setSeasonSelected([]);
  };

  const filteredTopTours = useMemo(() => {
    if (activeFilterCount === 0) return topTours;
    return topTours.filter(
      (j) =>
        journeyMatchesDuration(j, durSelected) &&
        journeyMatchesCities(j, citySelected) &&
        journeyMatchesSeasons(j, seasonSelected)
    );
  }, [topTours, activeFilterCount, durSelected, citySelected, seasonSelected]);

  const filteredOtherTours = useMemo(() => {
    if (activeFilterCount === 0) return otherTours;
    return otherTours.filter(
      (j) =>
        journeyMatchesDuration(j, durSelected) &&
        journeyMatchesCities(j, citySelected) &&
        journeyMatchesSeasons(j, seasonSelected)
    );
  }, [otherTours, activeFilterCount, durSelected, citySelected, seasonSelected]);

  const filteredJourneys = useMemo(() => {
    if (!hasTabs) {
      if (activeFilterCount === 0) return experienceJourneys;
      return experienceJourneys.filter(
        (j) =>
          journeyMatchesDuration(j, durSelected) &&
          journeyMatchesCities(j, citySelected) &&
          journeyMatchesSeasons(j, seasonSelected)
      );
    }
    return activeTab === "top-tours" ? filteredTopTours : filteredOtherTours;
  }, [hasTabs, activeTab, filteredTopTours, filteredOtherTours, experienceJourneys, activeFilterCount, durSelected, citySelected, seasonSelected]);

  const { data: heroBannersData } = useHeroBanners("TravelExperience", {
    slug: experience.slug,
    entityId: experience.id,
  });
  const customHeroBanners = heroBannersData?.data || [];

  const heroTitle =
    customHeroBanners[0]?.title ||
    experience.banner?.bannerTitle ||
    h1Title;

  const heroTag =
    customHeroBanners[0]?.subtitle ||
    experience.banner?.bannerTag ||
    "";

  const facts = [
    { label: "Duration", value: experience.duration },
    { label: "Ideal For", value: experience.idealFor },
    { label: "Budget Range", value: experience.budgetRange },
  ].filter((f) => f.value);

  const highlights = experience.highlights
    ? experience.highlights
        .split("\n")
        .map((h: string) => h.trim())
        .filter(Boolean)
    : [];

  const filterBar = (
    <FilterBar
      sections={[
        {
          id: "city",
          title: "Destination",
          icon: <MapPin size={14} />,
          options: cityOptions(currentTabJourneys),
          selected: citySelected,
          onChange: setCitySelected,
        },
        // {
        //   id: "season",
        //   title: "Best Season / Month",
        //   icon: <Sun size={14} />,
        //   options: seasonOptions(currentTabJourneys),
        //   selected: seasonSelected,
        //   onChange: setSeasonSelected,
        // },
        {
          id: "duration",
          title: "Duration",
          icon: <CalendarDays size={14} />,
          options: durationOptions(currentTabJourneys),
          selected: durSelected,
          onChange: setDurSelected,
        },
      ]}
      activeCount={activeFilterCount}
      onClearAll={clearFilters}
      resultCount={filteredJourneys.length}
      totalCount={currentTabJourneys.length}
    />
  );

  const tourTabs = hasTabs ? (
    <div className="flex items-center gap-2 sm:gap-3 p-1.5 bg-slate-200/70 rounded-2xl w-fit max-w-full overflow-x-auto mb-6 border border-slate-300/60 shadow-xs">
      <button
        type="button"
        onClick={() => {
          setActiveTab("top-tours");
          clearFilters();
        }}
        className={cn(
          "flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap",
          activeTab === "top-tours"
            ? "bg-[#2E8B8B] text-white shadow-md shadow-[#2E8B8B]/25"
            : "text-slate-700 hover:text-slate-950 hover:bg-white/70"
        )}
      >
        <span>Top Tour Packages</span>
        <span
          className={cn(
            "px-2 py-0.5 rounded-full text-[11px] font-extrabold tabular-nums",
            activeTab === "top-tours"
              ? "bg-white text-[#2E8B8B]"
              : "bg-slate-300 text-slate-800"
          )}
        >
          {topTours.length}
        </span>
      </button>

      <button
        type="button"
        onClick={() => {
          setActiveTab("all-tours");
          clearFilters();
        }}
        className={cn(
          "flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap",
          activeTab === "all-tours"
            ? "bg-[#2E8B8B] text-white shadow-md shadow-[#2E8B8B]/25"
            : "text-slate-700 hover:text-slate-950 hover:bg-white/70"
        )}
      >
        <span>Other Tour Packages</span>
        <span
          className={cn(
            "px-2 py-0.5 rounded-full text-[11px] font-extrabold tabular-nums",
            activeTab === "all-tours"
              ? "bg-white text-[#2E8B8B]"
              : "bg-slate-300 text-slate-800"
          )}
        >
          {otherTours.length}
        </span>
      </button>
    </div>
  ) : null;

  const heroImages =
    customHeroBanners.length > 0
      ? customHeroBanners.map((b) => b.image)
      : experience.banner?.images?.length
        ? experience.banner.images
        : [];

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative w-full h-[300px] sm:h-[380px] md:h-[520px] overflow-hidden bg-slate-200">
        {heroImages.length > 0 ? (
          <>
            <HeroSlider images={heroImages} alt={h1Title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10 z-10 pointer-events-none" />
          </>
        ) : (
          <div className="absolute inset-0">
            <FallbackImage
              src={experience.thumbImg || experience.image || experience.banner?.bannerImage}
              alt={h1Title}
              fill
              priority
              className="object-cover object-center"
              theme="dark"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10 z-10 pointer-events-none" />
          </div>
        )}

        <div className="relative z-20 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 h-full flex flex-col justify-center items-center py-8 text-center">
          {heroTag && (
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 mb-3 sm:mb-4 shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F8904D] shadow-[0_0_8px_#F8904D]" />
              <span className="font-luxury font-bold text-xs sm:text-sm uppercase tracking-[0.22em] text-white/95">
                {heroTag}
              </span>
            </div>
          )}

          <div className="font-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white leading-tight tracking-wide drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            {heroTitle}
          </div>
        </div>
      </section>

      {/* ===== BREADCRUMB (BELOW HERO) ===== */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-slate-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-3 flex flex-wrap items-center gap-1.5 text-[14px] text-slate-500">
          <Link href="/" className="hover:text-[#2E8B8B] transition-colors shrink-0 font-medium">
            Home
          </Link>
          <ChevronRight size={14} className="text-slate-300 shrink-0" />
          <Link href="/travel-experiences" className="hover:text-[#2E8B8B] transition-colors shrink-0 font-medium">
            Travel Experiences
          </Link>
          <ChevronRight size={14} className="text-slate-300 shrink-0" />
          <span className="text-[#1C1C1C] font-semibold">{h1Title}</span>
        </div>
      </nav>

      {/* ===== SHORT DESCRIPTION + TOURS ===== */}
      <ToursSection
        id="experience-tours"
        isLoading={journeysLoading}
        h1Title={formatToursH1(experience.h1Title || experience.title)}
        overView={experience.overView ?? undefined}
        emptyLabel={`No tours found for ${h1Title} yet`}
        showCount={16}
        tabs={tourTabs}
        filterBar={currentTabJourneys.length >= 8 ? filterBar : undefined}
        onClearFilters={clearFilters}
        contextName={h1Title}
        basePath={`/travel-experiences/${experience.slug}`}
        sharedLinkedHrefs={pageLinkedHrefs}
        excludeHrefs={excludeHrefs}
      >
        {hasTabs ? (
          <>
            {/* Tab 1 Panel: Top Tours - SSR rendered in HTML */}
            <div
              className={activeTab === "top-tours" ? "block" : "hidden"}
              role="tabpanel"
              aria-hidden={activeTab !== "top-tours"}
            >
              {filteredTopTours.length === 0 ? (
                <div className="text-center py-14 mt-6 bg-white border border-slate-200 rounded-2xl">
                  <p className="text-slate-500">
                    {activeFilterCount > 0
                      ? "No tours match your filters"
                      : `No tours found for ${h1Title} yet`}
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
                  {filteredTopTours.map((j) => (
                    <TourPackageCard key={j.id} journey={j} contextName={h1Title} variant="default" />
                  ))}
                </div>
              )}
            </div>

            {/* Tab 2 Panel: All Tours - SSR rendered in HTML */}
            <div
              className={activeTab === "all-tours" ? "block" : "hidden"}
              role="tabpanel"
              aria-hidden={activeTab !== "all-tours"}
            >
              {filteredOtherTours.length === 0 ? (
                <div className="text-center py-14 mt-6 bg-white border border-slate-200 rounded-2xl">
                  <p className="text-slate-500">
                    {activeFilterCount > 0
                      ? "No tours match your filters"
                      : `No tours found for ${h1Title} yet`}
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
                  {filteredOtherTours.map((j) => (
                    <TourPackageCard key={j.id} journey={j} contextName={h1Title} variant="default" />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : filteredJourneys.length === 0 ? (
          <div className="text-center py-14 mt-6 bg-white border border-slate-200 rounded-2xl">
            <p className="text-slate-500">
              {activeFilterCount > 0
                ? "No tours match your filters"
                : `No tours found for ${h1Title} yet`}
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
            {filteredJourneys.map((j) => (
              <TourPackageCard key={j.id} journey={j} contextName={h1Title} variant="default" />
            ))}
          </div>
        )}
      </ToursSection>

      {/* ===== EXPLORE MORE DESTINATIONS (linked cities) ===== */}
      <ExploreDestinationsSection experience={experience} />

      {/* ===== OTHER TRAVEL EXPERIENCES ===== */}
      <OtherExperiencesSection currentSlug={experience.slug} />

      {/* ===== FAQ SECTION ===== */}
      <FaqSection
        faqs={
          experience.slug === "golden-triangle" || experience.slug === "golden-triangle-tour-india"
            ? (GOLDEN_TRIANGLE_FAQS as any)
            : experience?.faqs
        }
        contextName={experience.title}
        contextSlug={experience.slug}
        entityType="TravelExperience"
        sharedLinkedHrefs={pageLinkedHrefs}
        excludeHrefs={excludeHrefs}
      />

      {/* ===== ARTICLE / TRAVEL GUIDE (FULL WIDTH) - FOOTER SE PEHLE ===== */}
      {experience.moreDescription && (
        <section id="more" className="bg-[#f8f8f8] border-t border-slate-200/60 py-16 md:py-20 relative overflow-hidden">
          {/* Subtle India Travel Doodle Background */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23D4561A' stroke-width='0.8'%3E%3Crect x='0' y='0' width='200' height='200' fill='none'/%3E%3Cpath d='M90 60 L100 20 L110 60 M85 62 L80 75 L120 75 L115 62 M75 75 L75 90 L125 90 L125 75 M100 20 L100 14 M96 38 L100 25 L104 38 M80 90 L80 120 L120 120 L120 90 M85 120 L85 125 L115 125 L115 120 M100 90 L100 120'/%3E%3Ccircle cx='100' cy='72' r='4'/%3E%3Cpath d='M60 155 Q60 145 65 140 Q60 135 55 140 Q60 145 60 155 M52 160 L60 155 L68 160 M50 168 L52 160 L48 170 M68 160 L72 168 L64 170 M55 140 L48 135 M65 140 L72 135 M55 150 L52 155 M65 150 L68 155 M60 155 L60 168 M55 168 L65 168'/%3E%3Ccircle cx='60' cy='135' r='5'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3Ccircle cx='40' cy='40' r='5'/%3E%3Cpath d='M40 25 L40 15 M40 55 L40 65 M25 40 L15 40 M55 40 L65 40'/%3E%3Ccircle cx='160' cy='160' r='12'/%3E%3Ccircle cx='160' cy='160' r='7'/%3E%3Ccircle cx='160' cy='160' r='3'/%3E%3Cpath d='M160 148 L160 140 M160 172 L160 180 M148 160 L140 160 M172 160 L180 160'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
          <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
            <div className="w-full">
              <span className="accent-label">Know More</span>

              <RichContent
                html={experience.moreDescription}
                excludeHrefs={excludeHrefs}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function ExploreDestinationsSection({ experience }: { experience: TravelExperience }) {
  const cities = experience?.cities || [];
  if (!Array.isArray(cities) || cities.length === 0) return null;

  const h1Title = experience.h1Title || experience.title;
  const cleanExperienceTitle =
    (experience.title || experience.h1Title || "")
      .replace(/\s+(?:tours?|tour packages)\s*(?:in\s+)?india$/i, "")
      .trim() || h1Title;
  const countries = Array.from(
    new Set(
      cities
        .map((c) => c.state?.country?.title?.replace(/\s*Tour$/i, ""))
        .filter((x): x is string => Boolean(x))
    )
  ) as string[];

  return (
    <section className="bg-[#f8f8f8] py-16 border-t border-slate-200/80 relative overflow-hidden">
      {/* Subtle India Travel Doodle Background */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23D4561A' stroke-width='0.8'%3E%3Crect x='0' y='0' width='200' height='200' fill='none'/%3E%3Cpath d='M90 60 L100 20 L110 60 M85 62 L80 75 L120 75 L115 62 M75 75 L75 90 L125 90 L125 75 M100 20 L100 14 M96 38 L100 25 L104 38 M80 90 L80 120 L120 120 L120 90 M85 120 L85 125 L115 125 L115 120 M100 90 L100 120'/%3E%3Ccircle cx='100' cy='72' r='4'/%3E%3Cpath d='M60 155 Q60 145 65 140 Q60 135 55 140 Q60 145 60 155 M52 160 L60 155 L68 160 M50 168 L52 160 L48 170 M68 160 L72 168 L64 170 M55 140 L48 135 M65 140 L72 135 M55 150 L52 155 M65 150 L68 155 M60 155 L60 168 M55 168 L65 168'/%3E%3Ccircle cx='60' cy='135' r='5'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3Ccircle cx='40' cy='40' r='5'/%3E%3Cpath d='M40 25 L40 15 M40 55 L40 65 M25 40 L15 40 M55 40 L65 40'/%3E%3Ccircle cx='160' cy='160' r='12'/%3E%3Ccircle cx='160' cy='160' r='7'/%3E%3Ccircle cx='160' cy='160' r='3'/%3E%3Cpath d='M160 148 L160 140 M160 172 L160 180 M148 160 L140 160 M172 160 L180 160'/%3E%3C/g%3E%3C/svg%3E")`
      }} />
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="mb-8">
          <span className="accent-label">Explore More</span>
          <h2 className="h3 text-[#1C1C1C] mt-1">
            Explore More {cleanExperienceTitle} Destinations{countries.length > 0 ? ` in ${countries.join(", ")}` : ""}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city: TravelExperienceCity) => {
            const countrySlug = city?.state?.country?.slug;
            const stateSlug = city?.state?.slug;
            const href =
              countrySlug && stateSlug
                ? `/tour-packages/${countrySlug}/${stateSlug}/${city.slug}`
                : `/tour-packages/${city.slug}`;
            return (
              <Link
                key={city.id || city.slug}
                href={href}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-900 h-64 flex flex-col justify-end p-6"
              >
                <FallbackImage
                  src={city.thumbImg || experience.thumbImg}
                  alt={city.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="relative z-10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5B041] mb-1 block">
                    {city?.state?.title || "Destination"}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#F5B041] transition-colors">
                    {city.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OtherExperiencesSection({ currentSlug }: { currentSlug: string }) {
  const { travelExperiences } = useGetTravelExperiences({ isActive: "true" });
  const otherExps = (travelExperiences || []).filter((e: any) => e.slug !== currentSlug);

  if (otherExps.length === 0) return null;

  return (
    <section className="bg-[#f8f8f8] py-16 border-t border-slate-200/80 relative overflow-hidden">
      {/* Subtle India Travel Doodle Background */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23D4561A' stroke-width='0.8'%3E%3Crect x='0' y='0' width='200' height='200' fill='none'/%3E%3Cpath d='M90 60 L100 20 L110 60 M85 62 L80 75 L120 75 L115 62 M75 75 L75 90 L125 90 L125 75 M100 20 L100 14 M96 38 L100 25 L104 38 M80 90 L80 120 L120 120 L120 90 M85 120 L85 125 L115 125 L115 120 M100 90 L100 120'/%3E%3Ccircle cx='100' cy='72' r='4'/%3E%3Cpath d='M60 155 Q60 145 65 140 Q60 135 55 140 Q60 145 60 155 M52 160 L60 155 L68 160 M50 168 L52 160 L48 170 M68 160 L72 168 L64 170 M55 140 L48 135 M65 140 L72 135 M55 150 L52 155 M65 150 L68 155 M60 155 L60 168 M55 168 L65 168'/%3E%3Ccircle cx='60' cy='135' r='5'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3Ccircle cx='40' cy='40' r='5'/%3E%3Cpath d='M40 25 L40 15 M40 55 L40 65 M25 40 L15 40 M55 40 L65 40'/%3E%3Ccircle cx='160' cy='160' r='12'/%3E%3Ccircle cx='160' cy='160' r='7'/%3E%3Ccircle cx='160' cy='160' r='3'/%3E%3Cpath d='M160 148 L160 140 M160 172 L160 180 M148 160 L140 160 M172 160 L180 160'/%3E%3C/g%3E%3C/svg%3E")`
      }} />
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="accent-label">Explore More</span>
            <h2 className="h3 text-[#1C1C1C] mt-1">Other Travel Experiences</h2>
          </div>
          <Link
            href="/travel-experiences"
            className="text-sm font-bold text-[#2E8B8B] hover:text-[#F8904D] transition-colors flex items-center gap-1.5"
          >
            <span>View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherExps.slice(0, 4).map((exp: any) => (
            <Link
              key={exp.id || exp.slug}
              href={`/travel-experiences/${exp.slug}`}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-900 h-64 flex flex-col justify-end p-6"
            >
              <FallbackImage
                src={exp.thumbImg || exp.banner?.images?.[0] || exp.image}
                alt={exp.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5B041] mb-1 block">
                  Experience
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-[#F5B041] transition-colors">
                  {exp.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
