"use client";

import React, { useMemo, useState } from "react";
import { MapPin, X, Loader2, Sparkles, CalendarDays, Globe, Sun } from "lucide-react";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import type { Journey, PaginatedResponse } from "@/feature/journey/type";
import FilterBar from "@/components/shared/FilterBar";
import TourPackageCard from "@/components/shared/TourPackageCard";
import Pagination from "@/components/shared/Pagination";
import {
  travelExperienceOptions,
  durationOptions,
  seasonOptions,
  journeyMatchesExperiences,
  journeyMatchesDuration,
  journeyMatchesSeasons,
} from "@/feature/journey/filterOptions";

export default function PackagesExplorer({
  initialCities = [],
  initialExperiences = [],
  initialStates = [],
  initialCountries = [],
  initialSearch = "",
  initialJourneys = null,
}: {
  initialCities?: string[];
  initialExperiences?: string[];
  initialStates?: string[];
  initialCountries?: string[];
  initialSearch?: string;
  initialJourneys?: PaginatedResponse<Journey> | null;
}) {
  const { journeys, isLoading } = useGetJourneys(
    { limit: 100, isActive: "true" },
    initialJourneys
  );

  const [selectedCountries, setSelectedCountries] = useState<string[]>(initialCountries);
  const [selectedStates, setSelectedStates] = useState<string[]>(initialStates);
  const [selectedCities, setSelectedCities] = useState<string[]>(initialCities);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>(initialExperiences);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);

  const countries = useMemo(() => {
    const set = new Set<string>();
    for (const j of journeys) {
      for (const c of j.cities ?? []) {
        const country = c.state?.country?.title;
        if (country) set.add(country.replace(/\s*Tour$/i, ""));
      }
      for (const r of j.route ?? []) {
        const country = r.state?.country?.title;
        if (country) set.add(country.replace(/\s*Tour$/i, ""));
      }
    }
    return [...set].sort();
  }, [journeys]);

  const countryOptions = useMemo(
    () =>
      countries.map((c) => ({
        value: c,
        label: c,
        count: journeys.filter((j) => {
          const cLower = c.toLowerCase();
          return (
            (j.cities ?? []).some((city) => city.state?.country?.title?.replace(/\s*Tour$/i, "").toLowerCase() === cLower) ||
            (j.route ?? []).some((r) => r.state?.country?.title?.replace(/\s*Tour$/i, "").toLowerCase() === cLower)
          );
        }).length,
      })),
    [countries, journeys]
  );

  const states = useMemo(() => {
    const set = new Set<string>();
    for (const j of journeys) {
      for (const c of j.cities ?? []) {
        const state = c.state?.title;
        if (state) set.add(state);
      }
      for (const r of j.route ?? []) {
        const state = r.state?.title;
        if (state) set.add(state);
      }
    }
    return [...set].sort();
  }, [journeys]);

  const stateOptions = useMemo(
    () =>
      states.map((s) => ({
        value: s,
        label: s,
        count: journeys.filter((j) => {
          const sLower = s.toLowerCase();
          return (
            (j.cities ?? []).some((c) => c.state?.title?.toLowerCase() === sLower) ||
            (j.route ?? []).some((r) => r.state?.title?.toLowerCase() === sLower)
          );
        }).length,
      })),
    [states, journeys]
  );

  const cityOptions = useMemo(() => {
    const map = new Map<string, { value: string; label: string; count: number }>();
    for (const j of journeys) {
      for (const c of j.cities ?? []) {
        const entry = map.get(c.slug);
        if (entry) entry.count += 1;
        else map.set(c.slug, { value: c.slug, label: c.title, count: 1 });
      }
    }
    return [...map.values()].sort((a, b) => b.count - a.count);
  }, [journeys]);

  const filtered = useMemo(() => {
    let list = journeys.filter((j) => {
      if (selectedCountries.length > 0) {
        const hasCountry =
          (j.cities ?? []).some((c) => {
            const title = c.state?.country?.title?.replace(/\s*Tour$/i, "").toLowerCase();
            const slug = c.state?.country?.slug?.toLowerCase();
            return selectedCountries.some((co) => {
              const col = co.toLowerCase();
              return col === title || col === slug;
            });
          }) ||
          (j.route ?? []).some((r) => {
            const title = r.state?.country?.title?.replace(/\s*Tour$/i, "").toLowerCase();
            const slug = r.state?.country?.slug?.toLowerCase();
            return selectedCountries.some((co) => {
              const col = co.toLowerCase();
              return col === title || col === slug;
            });
          });
        if (!hasCountry) return false;
      }

      if (selectedStates.length > 0) {
        const hasState =
          (j.cities ?? []).some((c) => {
            const title = c.state?.title?.toLowerCase();
            const slug = c.state?.slug?.toLowerCase();
            return selectedStates.some((s) => {
              const sl = s.toLowerCase();
              return sl === title || sl === slug;
            });
          }) ||
          (j.route ?? []).some((r) => {
            const title = r.state?.title?.toLowerCase();
            const slug = r.state?.slug?.toLowerCase();
            return selectedStates.some((s) => {
              const sl = s.toLowerCase();
              return sl === title || sl === slug;
            });
          });
        if (!hasState) return false;
      }

      if (selectedCities.length > 0) {
        const hasCity =
          (j.cities ?? []).some((c) => {
            const slug = c.slug?.toLowerCase();
            const title = c.title?.toLowerCase();
            return selectedCities.some((ci) => {
              const cil = ci.toLowerCase();
              return cil === slug || cil === title || cil === String(c.id);
            });
          }) ||
          (j.route ?? []).some((r) => {
            const slug = r.slug?.toLowerCase();
            const title = r.title?.toLowerCase();
            return selectedCities.some((ci) => {
              const cil = ci.toLowerCase();
              return cil === slug || cil === title || cil === String(r.id);
            });
          });
        if (!hasCity) return false;
      }

      if (!journeyMatchesExperiences(j, selectedExperiences)) return false;
      if (!journeyMatchesSeasons(j, selectedSeasons)) return false;
      if (!journeyMatchesDuration(j, selectedDurations)) return false;

      if (searchQuery && searchQuery.trim()) {
        const sq = searchQuery.trim().toLowerCase();
        const inTitle = j.title?.toLowerCase().includes(sq);
        const inDest = j.destination?.toLowerCase().includes(sq);
        const inDesc = j.seoDescription?.toLowerCase().includes(sq) || j.overView?.toLowerCase().includes(sq);
        const inState = (j.cities ?? []).some((c) => c.state?.title?.toLowerCase().includes(sq)) || (j.route ?? []).some((r) => r.state?.title?.toLowerCase().includes(sq));
        const inCity = (j.cities ?? []).some((c) => c.title?.toLowerCase().includes(sq)) || (j.route ?? []).some((r) => r.title?.toLowerCase().includes(sq));
        const inCountry = (j.cities ?? []).some((c) => c.state?.country?.title?.toLowerCase().includes(sq)) || (j.route ?? []).some((r) => r.state?.country?.title?.toLowerCase().includes(sq));
        const inExp = (j.travelExperiences ?? []).some((e) => e.title?.toLowerCase().includes(sq));
        if (!inTitle && !inDest && !inDesc && !inState && !inCity && !inCountry && !inExp) return false;
      }

      return true;
    });

    list = [...list].sort((a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0));
    return list;
  }, [journeys, selectedCountries, selectedStates, selectedCities, selectedExperiences, selectedSeasons, selectedDurations, searchQuery]);

  const clearAll = () => {
    setSelectedCountries([]);
    setSelectedStates([]);
    setSelectedCities([]);
    setSelectedExperiences([]);
    setSelectedSeasons([]);
    setSelectedDurations([]);
    setSearchQuery("");
  };

  const activeFilterCount =
    selectedCountries.length +
    selectedStates.length +
    selectedCities.length +
    selectedExperiences.length +
    selectedSeasons.length +
    selectedDurations.length +
    (searchQuery.trim() ? 1 : 0);

  const PAGE_SIZE = 16;
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
    const el = document.getElementById("packages-top");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="packages-top">
      <FilterBar
        sections={[
          {
            id: "country",
            title: "Country",
            icon: <Globe size={14} />,
            options: countryOptions,
            selected: selectedCountries,
            onChange: setSelectedCountries,
          },
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
            shortTitle: "City",
            icon: <MapPin size={14} />,
            options: cityOptions,
            selected: selectedCities,
            onChange: setSelectedCities,
          },
          {
            id: "experience",
            title: "Travel Experience",
            shortTitle: "Experience",
            icon: <Sparkles size={14} />,
            options: travelExperienceOptions(journeys),
            selected: selectedExperiences,
            onChange: setSelectedExperiences,
          },
          {
            id: "season",
            title: "Best Season / Month",
            shortTitle: "Season",
            icon: <Sun size={14} />,
            options: seasonOptions(journeys),
            selected: selectedSeasons,
            onChange: setSelectedSeasons,
          },
          {
            id: "duration",
            title: "Duration",
            icon: <CalendarDays size={14} />,
            options: durationOptions(journeys),
            selected: selectedDurations,
            onChange: setSelectedDurations,
          },
        ]}
        activeCount={activeFilterCount}
        onClearAll={clearAll}
        resultCount={filtered.length}
        totalCount={journeys.length}
      />

      <div className="mt-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-[#F8904D]" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#ececec] rounded-2xl">
            <X size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 font-medium">No tours match your filters</p>
            <button onClick={clearAll} className="mt-3 text-sm font-semibold text-[#F8904D] hover:underline cursor-pointer">
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedJourneys.map((j) => (
                <TourPackageCard key={j.id} journey={j} />
              ))}
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
      </div>
    </div>
  );
}

export function JourneyCard({ journey }: { journey: Journey }) {
  return <TourPackageCard journey={journey} />;
}

