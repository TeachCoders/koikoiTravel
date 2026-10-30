"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { MapPin, ChevronRight, Sparkles, CalendarDays, Sun } from "lucide-react";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import TourPackageCard from "@/components/shared/TourPackageCard";
import { QuoteModal } from "@/components/shared/QuoteModal";
import Pagination from "@/components/shared/Pagination";
import FilterBar from "@/components/shared/FilterBar";
import DestinationsSkeleton from "@/feature/destinations/components/DestinationsSkeleton";
import HeroBanner from "@/components/shared/HeroBanner";
import { useCountryBySlug } from "@/feature/country/api/useCountry";
import type { Journey } from "@/feature/journey/type";
import type { Country } from "@/feature/country/type";
import {
  travelExperienceOptions,
  durationOptions,
  seasonOptions,
  journeyMatchesExperiences,
  journeyMatchesDuration,
  journeyMatchesSeasons,
} from "@/feature/journey/filterOptions";

const PAGE_SIZE = 16;

export default function TourPackagesList({
  countrySlug,
  initialJourneys,
  initialCountry,
}: {
  countrySlug: string;
  initialJourneys?: Journey[];
  initialCountry?: Country | null;
}) {
  const { country, isLoading: countryLoading } = useCountryBySlug(countrySlug, initialCountry);
  const { journeys, isLoading } = useGetJourneys(
    { limit: 1000, isActive: "true" },
    initialJourneys
      ? {
          success: true,
          data: initialJourneys,
          pagination: { page: 1, limit: 1000, total: initialJourneys.length, totalPages: 1 },
        }
      : undefined
  );

  const countryJourneys = useMemo(
    () => journeys.filter((j) => j.cities?.some((c) => c.state?.country?.slug === countrySlug)),
    [journeys, countrySlug]
  );

  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);

  const states = useMemo(() => {
    const set = new Set<string>();
    for (const j of countryJourneys) {
      const state = j.cities?.[0]?.state?.title;
      if (state) set.add(state);
    }
    return [...set].sort();
  }, [countryJourneys]);

  const stateOptions = useMemo(
    () =>
      states.map((s) => ({
        value: s,
        label: s,
        count: countryJourneys.filter((j) => j.cities?.[0]?.state?.title === s).length,
      })),
    [states, countryJourneys]
  );

  const cityOptions = useMemo(() => {
    const map = new Map<string, { value: string; label: string; count: number }>();
    for (const j of countryJourneys) {
      for (const c of j.cities ?? []) {
        const entry = map.get(c.slug);
        if (entry) entry.count += 1;
        else map.set(c.slug, { value: c.slug, label: c.title, count: 1 });
      }
    }
    return [...map.values()].sort((a, b) => b.count - a.count);
  }, [countryJourneys]);

  const filtered = useMemo(() => {
    let list = countryJourneys.filter((j) => {
      if (selectedStates.length > 0) {
        const state = j.cities?.[0]?.state?.title;
        if (!state || !selectedStates.includes(state)) return false;
      }
      if (selectedCities.length > 0) {
        const slugs = new Set(selectedCities);
        if (!(j.cities ?? []).some((c) => slugs.has(c.slug))) return false;
      }
      if (!journeyMatchesExperiences(j, selectedExperiences)) return false;
      if (!journeyMatchesSeasons(j, selectedSeasons)) return false;
      if (!journeyMatchesDuration(j, selectedDurations)) return false;
      return true;
    });

    list = [...list].sort((a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0));
    return list;
  }, [countryJourneys, selectedStates, selectedCities, selectedExperiences, selectedSeasons, selectedDurations]);

  const clearAll = () => {
    setSelectedStates([]);
    setSelectedCities([]);
    setSelectedExperiences([]);
    setSelectedSeasons([]);
    setSelectedDurations([]);
  };

  const activeFilterCount =
    selectedStates.length +
    selectedCities.length +
    selectedExperiences.length +
    selectedSeasons.length +
    selectedDurations.length;

  const [currentPage, setCurrentPage] = useState(1);

  const key = filtered.map((j) => String(j.id ?? "")).join(",");
  const [prevKey, setPrevKey] = useState(key);
  if (prevKey !== key) {
    setPrevKey(key);
    setCurrentPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedJourneys = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handlePageChange = (p: number) => {
    setCurrentPage(p);
    const el = document.getElementById("packages");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const title =
    country?.h1Title?.replace(/\s*Tour$/i, "") ||
    country?.title.replace(/\s*Tour$/i, "") ||
    countrySlug;

  const heroImages = country?.banner?.images?.length
    ? country.banner.images
    : country?.thumbImg
      ? [country.thumbImg]
      : [];

  return (
    <div>
      <HeroBanner
        images={heroImages}
        tag={`${title} Holidays`}
        title={`${title} Tour Packages`}
        subtitle={`All-inclusive holiday itineraries across ${title} with private cabs, star hotels, and verified local guides.`}
        alt={title}
      />

      <section id="packages" className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-12 md:py-16">
        {isLoading || countryLoading ? (
          <DestinationsSkeleton count={PAGE_SIZE} />
        ) : countryJourneys.length === 0 ? (
          <div className="text-center py-14 bg-white border border-slate-200 rounded-2xl">
            <MapPin size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500">No tour packages found in {title} yet</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <FilterBar
                sections={[
                  {
                    id: "state",
                    title: "State",
                    options: stateOptions,
                    selected: selectedStates,
                    onChange: setSelectedStates,
                  },
                  {
                    id: "city",
                    title: "Destination",
                    icon: <MapPin size={14} />,
                    options: cityOptions,
                    selected: selectedCities,
                    onChange: setSelectedCities,
                  },
                  {
                    id: "experience",
                    title: "Travel Experience",
                    icon: <Sparkles size={14} />,
                    options: travelExperienceOptions(countryJourneys),
                    selected: selectedExperiences,
                    onChange: setSelectedExperiences,
                  },
                  // {
                  //   id: "season",
                  //   title: "Best Season / Month",
                  //   icon: <Sun size={14} />,
                  //   options: seasonOptions(countryJourneys),
                  //   selected: selectedSeasons,
                  //   onChange: setSelectedSeasons,
                  // },
                  {
                    id: "duration",
                    title: "Duration",
                    icon: <CalendarDays size={14} />,
                    options: durationOptions(countryJourneys),
                    selected: selectedDurations,
                    onChange: setSelectedDurations,
                  },
                ]}
                activeCount={activeFilterCount}
                onClearAll={clearAll}
                resultCount={filtered.length}
                totalCount={countryJourneys.length}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedJourneys.map((j) => (
                <TourPackageCard key={j.id} journey={j} />
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
            {totalPages > 1 && (
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
}
