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
import HeroBanner from "@/components/shared/HeroBanner";
import { useHeroBanners } from "@/feature/heroBanner/api";
import { FallbackImage } from "@/components/shared/FallbackImage";
import RichContent from "@/components/shared/RichContent";
import ToursSection from "@/components/shared/ToursSection";
import TourPackageCard from "@/components/shared/TourPackageCard";
import TravelGuideCollapsible from "@/components/shared/TravelGuideCollapsible";
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
import { QuoteModal } from "@/components/shared/QuoteModal";
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

  const cleanExpTitle = useMemo(() => {
    const raw = experience.title || experience.h1Title || "";
    const cleaned = raw
      .replace(/\s+(?:tours?|tour packages)\s*(?:in\s+)?(?:india)?$/i, "")
      .replace(/\s*\(.*?\)\s*/g, " ")
      .trim();
    return cleaned || raw || "Tour";
  }, [experience.title, experience.h1Title]);

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

  const { experienceJourneys } = useMemo(
    () => resolveTravelExperienceJourneys(journeys, experience),
    [journeys, experience]
  );

  const [durSelected, setDurSelected] = useState<string[]>([]);
  const [citySelected, setCitySelected] = useState<string[]>([]);
  const [seasonSelected, setSeasonSelected] = useState<string[]>([]);

  const activeFilterCount = durSelected.length + citySelected.length + seasonSelected.length;

  const clearFilters = () => {
    setDurSelected([]);
    setCitySelected([]);
    setSeasonSelected([]);
  };

  const filteredJourneys = useMemo(() => {
    if (activeFilterCount === 0) return experienceJourneys;
    return experienceJourneys.filter(
      (j) =>
        journeyMatchesDuration(j, durSelected) &&
        journeyMatchesCities(j, citySelected) &&
        journeyMatchesSeasons(j, seasonSelected)
    );
  }, [experienceJourneys, activeFilterCount, durSelected, citySelected, seasonSelected]);

  const { travelExperiences: allExperiences } = useGetTravelExperiences({ isActive: "true" });
  const otherExpsCount = (allExperiences || []).filter(
    (e: any) =>
      e.slug !== experience.slug &&
      e.slug !== "taj-mahal" &&
      e.slug !== "golden-triangle" &&
      e.slug !== "golden-triangle-tour-india" &&
      !/taj\s*mahal/i.test(e.title || "") &&
      !/golden\s*triangle/i.test(e.title || "")
  ).length;

  const hasCities = (experience?.cities || []).filter(
    (c: any) =>
      c.isActive !== false &&
      c.showOnSite !== false &&
      (c._count?.journeys ?? c.journeys?.length ?? 0) >= 4
  ).length > 0;
  const otherExpBgClass = hasCities ? "bg-section-tint" : "bg-white";
  const hasOtherExps = otherExpsCount > 0;
  const lastSectionBeforeFaq = hasOtherExps
    ? (hasCities ? "tint" : "white")
    : (hasCities ? "white" : "tint");
  const faqBgType: "white" | "pattern" = lastSectionBeforeFaq === "white" ? "pattern" : "white";
  const guideBgClass = faqBgType === "pattern" ? "bg-white" : "bg-section-tint";

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
          options: cityOptions(experienceJourneys),
          selected: citySelected,
          onChange: setCitySelected,
        },
        {
          id: "duration",
          title: "Duration",
          icon: <CalendarDays size={14} />,
          options: durationOptions(experienceJourneys),
          selected: durSelected,
          onChange: setDurSelected,
        },
      ]}
      activeCount={activeFilterCount}
      onClearAll={clearFilters}
      resultCount={filteredJourneys.length}
      totalCount={experienceJourneys.length}
    />
  );

  const heroImages =
    customHeroBanners.length > 0
      ? customHeroBanners.map((b) => b.image)
      : experience.banner?.images?.length
        ? experience.banner.images
        : [];

  const heroSlides =
    customHeroBanners.length > 0
      ? customHeroBanners.map((b) => ({ image: b.image, mobileImage: b.mobileImage }))
      : heroImages.map((img: string) => ({ image: img, mobileImage: null }));

  const isIllustratedBanner =
    heroImages.some((img: string) => img.includes("comic") || img.includes("banner")) ||
    heroImages.length === 1;

  return (
    <div>
      {/* ===== HERO ===== */}
      <HeroBanner
        slides={heroSlides}
        fallbackImage={experience.thumbImg || experience.image || experience.banner?.bannerImage}
        alt={h1Title}
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
        filterBar={experienceJourneys.length >= 8 ? filterBar : undefined}
        onClearFilters={clearFilters}
        contextName={h1Title}
        basePath={`/travel-experiences/${experience.slug}`}
        sharedLinkedHrefs={pageLinkedHrefs}
        excludeHrefs={excludeHrefs}
      >
        {filteredJourneys.length === 0 ? (
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {filteredJourneys.map((j) => (
                <TourPackageCard key={j.id} journey={j} contextName={h1Title} variant="default" />
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

      {/* ===== EXPLORE MORE DESTINATIONS (linked cities) ===== */}
      <ExploreDestinationsSection experience={experience} />

      {/* ===== OTHER TRAVEL EXPERIENCES ===== */}
      <OtherExperiencesSection currentSlug={experience.slug} bgClass={otherExpBgClass} />


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
        bgType={faqBgType}
      />

      {/* ===== ARTICLE / TRAVEL GUIDE (FULL WIDTH) - FOOTER SE PEHLE ===== */}
      {experience.moreDescription && (
        <section id="more" className={`${guideBgClass} border-y border-section-border py-10 md:py-14 relative`}>
          <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
            <TravelGuideCollapsible
              title={`Everything About ${experience.h1Title || experience.title}`}
              subtitle={`Complete guide to ${experience.h1Title || experience.title} in India — highlights, best time to visit & travel tips.`}
            >
              <RichContent
                html={experience.moreDescription}
                excludeHrefs={excludeHrefs}
              />
            </TravelGuideCollapsible>
          </div>
        </section>
      )}
    </div>
  );
}

function ExploreDestinationsSection({ experience }: { experience: TravelExperience }) {
  const cities = (experience?.cities || []).filter(
    (c: any) =>
      c.isActive !== false &&
      c.showOnSite !== false &&
      (c._count?.journeys ?? c.journeys?.length ?? 0) >= 4
  );
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
    <section className="bg-white py-14 sm:py-16 border-t border-slate-200/80 relative">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10">
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
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 via-30% to-transparent" />
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

function OtherExperiencesSection({
  currentSlug,
  bgClass = "bg-section-tint",
}: {
  currentSlug: string;
  bgClass?: string;
}) {
  const { travelExperiences } = useGetTravelExperiences({ isActive: "true" });
  const otherExps = (travelExperiences || []).filter(
    (e: any) =>
      e.slug !== currentSlug &&
      e.slug !== "taj-mahal" &&
      e.slug !== "golden-triangle" &&
      e.slug !== "golden-triangle-tour-india" &&
      !/taj\s*mahal/i.test(e.title || "") &&
      !/golden\s*triangle/i.test(e.title || "")
  );

  if (otherExps.length === 0) return null;

  return (
    <section className={`${bgClass} py-16 border-y border-section-border relative`}>
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
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 via-30% to-transparent" />
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
