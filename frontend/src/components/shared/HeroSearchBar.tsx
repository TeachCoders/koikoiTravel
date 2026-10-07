"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Globe, Landmark, ArrowRight, X } from "lucide-react";
import { useJourneyFilters } from "@/feature/journey/api/useJourney";
import { useGetStates } from "@/feature/state/api/useState";
import { useGetCountries } from "@/feature/country/api/useCountry";
import { travelExperienceIcon } from "@/components/shared/TravelExperiencePills";

interface StateOption {
  id: number;
  slug: string;
  title: string;
}

interface CountryOption {
  id: number;
  slug: string;
  title: string;
}

interface CityOption {
  id: number;
  slug: string;
  title: string;
  stateTitle?: string | null;
}

interface ExpOption {
  id: number;
  slug: string;
  title: string;
}

type SuggestionKind = "state" | "city" | "country" | "exp";

interface Suggestion {
  kind: SuggestionKind;
  key: string;
  title: string;
  subtitle?: string;
  badge: string;
  item: StateOption | CountryOption | CityOption | ExpOption;
}

export default function HeroSearchBar() {
  const router = useRouter();
  const { cities = [], experiences = [] } = useJourneyFilters();
  const { states = [] } = useGetStates({ limit: 100, isActive: "true" });
  const { countries = [] } = useGetCountries({ limit: 100, isActive: "true" });

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = useMemo<Suggestion[]>(() => {
    // Filter states
    const stateMatches = (states as StateOption[])
      .filter((s) => !q || s.title?.toLowerCase().includes(q))
      .slice(0, q ? 3 : 2)
      .map((s) => ({
        kind: "state" as const,
        key: `state-${s.id}-${s.slug}`,
        title: s.title,
        badge: "State",
        item: s,
      }));

    // Filter cities
    const cityMatches = (cities as CityOption[])
      .filter((c) => !q || c.title?.toLowerCase().includes(q) || c.stateTitle?.toLowerCase().includes(q))
      .slice(0, q ? 4 : 3)
      .map((c) => ({
        kind: "city" as const,
        key: `city-${c.id}-${c.slug}`,
        title: c.title,
        subtitle: c.stateTitle ? `${c.stateTitle}` : undefined,
        badge: "City",
        item: c,
      }));

    // Filter experiences
    const expMatches = (experiences as ExpOption[])
      .filter((e) => !q || e.title?.toLowerCase().includes(q))
      .slice(0, q ? 3 : 2)
      .map((e) => ({
        kind: "exp" as const,
        key: `exp-${e.id}-${e.slug}`,
        title: e.title,
        badge: "Experience",
        item: e,
      }));

    // Filter countries
    const countryMatches = (countries as CountryOption[])
      .filter((co) => !q || co.title?.toLowerCase().includes(q))
      .slice(0, q ? 2 : 1)
      .map((co) => ({
        kind: "country" as const,
        key: `country-${co.id}-${co.slug}`,
        title: co.title?.replace(/\s*Tour$/i, ""),
        badge: "Country",
        item: co,
      }));

    const all = [...stateMatches, ...cityMatches, ...expMatches, ...countryMatches];

    if (q) {
      all.sort((a, b) => {
        const aStarts = a.title.toLowerCase().startsWith(q) ? 0 : 1;
        const bStarts = b.title.toLowerCase().startsWith(q) ? 0 : 1;
        return aStarts - bStarts;
      });
    }

    return all.slice(0, 8);
  }, [q, states, cities, experiences, countries]);

  const selectSuggestion = (s: Suggestion) => {
    setOpen(false);
    setQuery("");
    if (s.kind === "state") {
      router.push(`/tour-packages?state=${encodeURIComponent(s.title)}`);
    } else if (s.kind === "country") {
      router.push(`/tour-packages?country=${encodeURIComponent(s.title)}`);
    } else if (s.kind === "city") {
      const city = s.item as CityOption;
      router.push(`/tour-packages?city=${encodeURIComponent(city.slug || city.title)}`);
    } else if (s.kind === "exp") {
      router.push(`/tour-packages?exp=${encodeURIComponent(s.title)}`);
    }
  };

  const handleSearch = () => {
    setOpen(false);
    const trimmed = query.trim();
    if (!trimmed) {
      router.push("/tour-packages");
      return;
    }

    // Check if query exactly matches a state
    const matchState = (states as StateOption[]).find(
      (s) => s.title.toLowerCase() === trimmed.toLowerCase()
    );
    if (matchState) {
      router.push(`/tour-packages?state=${encodeURIComponent(matchState.title)}`);
      return;
    }

    // Check if query matches a city
    const matchCity = (cities as CityOption[]).find(
      (c) => c.title.toLowerCase() === trimmed.toLowerCase()
    );
    if (matchCity) {
      router.push(`/tour-packages?city=${encodeURIComponent(matchCity.slug || matchCity.title)}`);
      return;
    }

    // Check if query matches a country
    const matchCountry = (countries as CountryOption[]).find(
      (c) => c.title.toLowerCase().replace(/\s*tour$/i, "") === trimmed.toLowerCase()
    );
    if (matchCountry) {
      router.push(`/tour-packages?country=${encodeURIComponent(matchCountry.title.replace(/\s*Tour$/i, ""))}`);
      return;
    }

    // Check if query matches an experience
    const matchExp = (experiences as ExpOption[]).find(
      (e) => e.title.toLowerCase() === trimmed.toLowerCase()
    );
    if (matchExp) {
      router.push(`/tour-packages?exp=${encodeURIComponent(matchExp.title)}`);
      return;
    }

    // Default to search query
    router.push(`/tour-packages?search=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && activeIndex >= 0 && suggestions[activeIndex]) {
        selectSuggestion(suggestions[activeIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const getIcon = (kind: SuggestionKind, title: string) => {
    switch (kind) {
      case "state":
        return <Landmark className="w-4 h-4 text-[#2E8B8B] shrink-0" />;
      case "country":
        return <Globe className="w-4 h-4 text-[#2E8B8B] shrink-0" />;
      case "city":
        return <MapPin className="w-4 h-4 text-[#2E8B8B] shrink-0" />;
      case "exp":
        return (
          <span className="w-4 h-4 shrink-0 text-[#F8904D] flex items-center justify-center">
            {travelExperienceIcon(title)}
          </span>
        );
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
      <div className="relative bg-gradient-to-r from-[#2E8B8B]/60 via-[#2E8B8B]/40 to-[#2E8B8B]/60 p-[1.5px] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.55)]">
        <div className="bg-white rounded-[14px] p-1.5 sm:p-2.5">
          <div className="flex flex-row items-center gap-0">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                  setActiveIndex(-1);
                }}
                onFocus={() => {
                  setOpen(true);
                  setActiveIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Where do you want to go? Try 'Rajasthan', 'Jaipur'..."
                className="w-full h-11 sm:h-14 rounded-l-xl rounded-r-none border border-r-0 border-slate-200 bg-slate-50 pl-10 sm:pl-12 pr-8 sm:pr-10 text-sm sm:text-base font-normal text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#F8904D] focus:ring-2 focus:ring-[#F8904D]/20 transition-all"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setOpen(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="h-11 sm:h-14 btn-gold px-5 sm:px-8 rounded-r-xl rounded-l-none font-bold text-sm sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 shrink-0 transition-transform active:scale-95 cursor-pointer shadow-md"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-width Google-like Autocomplete Dropdown matching the Search Container */}
      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2.5 bg-white rounded-2xl border border-slate-200/90 shadow-[0_24px_60px_rgba(0,0,0,0.25)] z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 divide-y divide-slate-100">
          <div className="px-4 py-2 bg-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <span>{q ? "Suggestions" : "Popular Destinations & Experiences"}</span>
            <span className="hidden sm:inline">Click item to open directly</span>
          </div>

          <div className="py-1.5 max-h-80 overflow-y-auto">
            {suggestions.map((s, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={s.key}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseDown={(ev) => {
                    ev.preventDefault();
                    selectSuggestion(s);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors cursor-pointer ${
                    isActive ? "bg-[#2E8B8B]/10" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      {getIcon(s.kind, s.title)}
                    </div>
                    <div className="min-w-0 flex flex-col">
                      <span className="font-semibold text-sm text-[#1C1C1C] truncate">
                        {s.title}
                      </span>
                      {s.subtitle && (
                        <span className="text-xs text-slate-500 truncate">
                          {s.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        s.kind === "state"
                          ? "bg-[#2E8B8B]/10 text-[#2E8B8B]"
                          : s.kind === "country"
                          ? "bg-blue-50 text-blue-600"
                          : s.kind === "city"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-[#F8904D]/10 text-[#F8904D]"
                      }`}
                    >
                      {s.badge}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                </button>
              );
            })}
          </div>

          {q && (
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="px-4 py-2.5 bg-slate-50 hover:bg-[#2E8B8B]/10 cursor-pointer flex items-center gap-2 text-sm text-[#2E8B8B] font-semibold transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Search for &ldquo;{query}&rdquo; in All Tour Packages</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
