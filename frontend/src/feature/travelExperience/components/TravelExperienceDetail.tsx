"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
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
import { FallbackImage } from "@/components/shared/FallbackImage";
import RichContent from "@/components/shared/RichContent";
import ToursSection from "@/components/shared/ToursSection";
import FilterBar from "@/components/shared/FilterBar";
import { QuoteModal } from "@/components/shared/QuoteModal";
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
import { cn } from "@/lib/utils";
import DestinationsSkeleton from "@/feature/destinations/components/DestinationsSkeleton";
import FaqSection from "@/feature/home/components/FaqSection";
import type { TravelExperience, TravelExperienceCity } from "@/feature/travelExperience/type";

export default function TravelExperienceDetail({
  slug,
  initialExperience,
}: {
  slug: string;
  initialExperience?: any;
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

  return <ExperienceContent experience={travelExperience} />;
}

function ExperienceContent({ experience }: { experience: any }) {
  const h1Title = experience.h1Title || experience.title;

  const { journeys, isLoading: journeysLoading } = useGetJourneys({
    limit: 100,
    isActive: "true",
  });
  const experienceJourneys = (journeys || [])
    .filter((j) =>
      (j.travelExperiences || []).some((e: any) => e.slug === experience.slug)
    )
    .sort((a, b) => {
      const order = experience.featuredJourneyOrder || [];
      const ai = order.indexOf(a.id);
      const bi = order.indexOf(b.id);
      const aRank = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
      const bRank = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
      return aRank - bRank;
    });

  const [durSelected, setDurSelected] = useState<string[]>([]);
  const [citySelected, setCitySelected] = useState<string[]>([]);
  const [seasonSelected, setSeasonSelected] = useState<string[]>([]);

  const filteredJourneys = experienceJourneys.filter(
    (j) =>
      journeyMatchesDuration(j, durSelected) &&
      journeyMatchesCities(j, citySelected) &&
      journeyMatchesSeasons(j, seasonSelected)
  );

  const activeFilterCount = durSelected.length + citySelected.length + seasonSelected.length;

  const clearFilters = () => {
    setDurSelected([]);
    setCitySelected([]);
    setSeasonSelected([]);
  };

  const heroTitle = experience.banner?.bannerTitle || h1Title;
  const heroTag = experience.banner?.bannerTag || "";

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
          id: "season",
          title: "Best Season / Month",
          icon: <Sun size={14} />,
          options: seasonOptions(experienceJourneys),
          selected: seasonSelected,
          onChange: setSeasonSelected,
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

  const heroImages = experience.banner?.images?.length ? experience.banner.images : [];

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative aspect-[1200/400] min-h-[300px] sm:min-h-[380px] md:min-h-[520px] overflow-hidden bg-slate-200">
        {heroImages.length > 0 ? (
          <>
            <HeroSlider images={heroImages} alt={h1Title} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-950/20" />
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/30" />
          </div>
        )}

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 h-full flex flex-col justify-center items-center py-8 text-center">
          {heroTag && (
            <p className="hidden sm:block max-w-2xl mx-auto mb-2 text-base sm:text-lg font-bold tracking-wider uppercase text-white/90 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              {heroTag}
            </p>
          )}

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white leading-tight tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            {heroTitle}
          </h1>

          <div className="hidden sm:flex mt-7 flex-wrap items-center justify-center gap-3">
            <QuoteModal>
              <button
                type="button"
                className="btn-primary px-7 py-3.5 text-sm font-bold tracking-wide flex items-center gap-2 cursor-pointer shadow-lg shadow-[#F8904D]/30 active:scale-95 transition-all"
              >
                <Sparkles size={16} />
                <span>Plan My {h1Title} Trip</span>
              </button>
            </QuoteModal>

            <a href="#tours" className="px-6 py-3.5 text-sm font-bold tracking-wide rounded-xl border border-white/40 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-200 flex items-center gap-2">
              <span>Explore Packages</span>
              <ArrowRight size={16} />
            </a>

            <a href="#more" className="px-6 py-3.5 text-sm font-medium tracking-wide rounded-xl border border-white/20 text-white/80 bg-black/20 backdrop-blur-md hover:bg-white/10 transition-all duration-200">
              About {h1Title}
            </a>
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
        journeys={filteredJourneys}
        isLoading={journeysLoading}
        h1Title={experience.h1Title}
        overView={experience.overView ?? undefined}
        emptyLabel={`No tours found for ${h1Title} yet`}
        showCount={16}
        filterBar={experienceJourneys.length > 0 ? filterBar : undefined}
        onClearFilters={clearFilters}
        contextName={h1Title}
      />

      {/* ===== EXPLORE MORE DESTINATIONS (linked cities) ===== */}
      <ExploreDestinationsSection experience={experience} />

      {/* ===== MORE DESCRIPTION (ALL INFO) ===== */}
      <section id="more" className="bg-[#f8f8f8] border-y border-slate-200/60 py-16 md:py-20">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <span className="accent-label">Know More</span>

              {experience.moreDescription && (
                <RichContent html={experience.moreDescription} />
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 self-start">
              {facts.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#2E8B8B] mb-4">
                    Quick Info
                  </h4>
                  <dl className="space-y-3">
                    {facts.map((f) => (
                      <div key={f.label} className="flex items-center justify-between gap-4">
                        <dt className="text-sm text-slate-500">{f.label}</dt>
                        <dd className="text-sm font-semibold text-[#1C1C1C] text-right">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {highlights.length > 0 && (
                <div className="rounded-2xl bg-gradient-to-br from-[#1C1C1C] to-[#2b2b2b] text-white p-7 shadow-xl overflow-hidden relative">
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#F8904D]/20 blur-2xl" />
                  <h3 className="flex items-center gap-2 text-lg font-bold mb-4 text-white">
                    <Sparkles size={18} className="text-[#F5B041]" />
                    Highlights
                  </h3>
                  <ul className="space-y-2.5">
                    {highlights.map((h: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/85">
                        <BadgeCheck size={16} className="shrink-0 mt-0.5 text-[#F5B041]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {experienceJourneys.filter((j) => (j.displayOrder ?? 0) > 0).length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#2E8B8B] mb-1 flex items-center justify-between">
                    Top 10 Tour Packages
                    <span className="text-[10px] font-semibold text-[#F8904D] bg-[#F8904D]/10 px-2 py-0.5 rounded-full">
                      {Math.min(
                        10,
                        experienceJourneys.filter((j) => (j.displayOrder ?? 0) > 0).length
                      )}
                    </span>
                  </h4>
                  <ol className="mt-2">
                    {[...experienceJourneys]
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
                            className="flex items-start gap-2.5 py-1.5 group"
                          >
                            <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-[#f5f5f5] text-[#1C1C1C] text-[11px] font-bold flex items-center justify-center group-hover:bg-[#2E8B8B] group-hover:text-white transition-colors">
                              {i + 1}
                            </span>
                            <span className="text-sm text-[#555] leading-snug group-hover:text-[#2E8B8B] transition-colors">
                              {j.title}
                            </span>
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

      {/* ===== OTHER TRAVEL EXPERIENCES ===== */}
      <OtherExperiencesSection currentSlug={experience.slug} />

      {/* ===== FAQ SECTION ===== */}
      <FaqSection faqs={experience?.faqs} />
    </div>
  );
}

function ExploreDestinationsSection({ experience }: { experience: TravelExperience }) {
  const cities = experience?.cities || [];
  if (!Array.isArray(cities) || cities.length === 0) return null;

  const h1Title = experience.h1Title || experience.title;
  const countries = Array.from(
    new Set(
      cities
        .map((c) => c.state?.country?.title?.replace(/\s*Tour$/i, ""))
        .filter((x): x is string => Boolean(x))
    )
  ) as string[];

  return (
    <section className="bg-white py-16 border-t border-slate-200/80">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="mb-8">
          <span className="accent-label">Explore More</span>
          <h2 className="h3 text-[#1C1C1C] mt-1">
            Explore More {h1Title} Destinations{countries.length > 0 ? ` in ${countries.join(", ")}` : ""}
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
    <section className="bg-white py-16 border-t border-slate-200/80">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10">
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
