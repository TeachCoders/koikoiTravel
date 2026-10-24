"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, MapPin, Compass, Sparkles } from "lucide-react";
import { useGetStates } from "@/feature/state/api/useState";
import { useGetCities } from "@/feature/city/api/useCity";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import { useGetTravelExperiences } from "@/feature/travelExperience/api/useTravelExperience";
import { FallbackImage } from "./FallbackImage";
import { stripTourSuffix } from "@/lib/utils";

interface DestinationResult {
  id: string | number;
  title: string;
  kind: "state" | "city";
  thumbImg?: string | null;
  href: string;
}

interface JourneyResult {
  id: number;
  title: string;
  slug: string;
  thumbImg?: string | null;
  duration?: string;
  href: string;
}

interface ExperienceResult {
  id: number;
  title: string;
  slug: string;
  thumbImg?: string | null;
  href: string;
}

interface HeaderSearchBarProps {
  autoFocus?: boolean;
  onClose?: () => void;
  className?: string;
  placeholder?: string;
  isMobileModal?: boolean;
}

export default function HeaderSearchBar({
  autoFocus = false,
  onClose,
  className = "",
  placeholder = "Search destinations, tours...",
  isMobileModal = false,
}: HeaderSearchBarProps = {}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Fetch all active data
  const { states = [] } = useGetStates({ limit: 100, isActive: "true" });
  const { cities = [] } = useGetCities({ limit: 150, isActive: "true" });
  const { journeys = [] } = useGetJourneys({ limit: 150, isActive: "true" });
  const { travelExperiences = [] } = useGetTravelExperiences({ limit: 100, isActive: "true" });

  const q = query.trim().toLowerCase();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prepare full list of all destinations (States and Cities combined, deduplicated)
  const allDestinations = useMemo<DestinationResult[]>(() => {
    const list: DestinationResult[] = [];
    const seenHrefs = new Set<string>();

    // 1. Add all States
    states.forEach((s) => {
      if (!s.slug || s.slug === "golden-triangle" || s.slug === "golden-triangle-tour-india") return;
      const countrySlug = s.country?.slug || "india";
      const href = `/tour-packages/${countrySlug}/${s.slug}`;
      if (!seenHrefs.has(href)) {
        seenHrefs.add(href);
        list.push({
          id: `state-${s.id}`,
          title: stripTourSuffix(s.title || s.h1Title || ""),
          kind: "state",
          thumbImg: s.thumbImg,
          href,
        });
      }

      // Also add cities embedded inside state if present
      if (s.cities && Array.isArray(s.cities)) {
        s.cities.forEach((c) => {
          if (!c.title || !c.slug) return;
          const cityHref = `/tour-packages/${countrySlug}/${s.slug}/${c.slug}`;
          if (!seenHrefs.has(cityHref)) {
            seenHrefs.add(cityHref);
            list.push({
              id: `city-${c.id}`,
              title: stripTourSuffix(c.title),
              kind: "city",
              thumbImg: c.thumbImg || s.thumbImg,
              href: cityHref,
            });
          }
        });
      }
    });

    // 2. Add Cities from useGetCities (ensures 100% of cities are searchable with images)
    cities.forEach((c) => {
      if (!c.title || !c.slug) return;
      const countrySlug = c.state?.country?.slug || "india";
      const stateSlug = c.state?.slug;
      if (!stateSlug) return;
      const cityHref = `/tour-packages/${countrySlug}/${stateSlug}/${c.slug}`;
      if (!seenHrefs.has(cityHref)) {
        seenHrefs.add(cityHref);
        list.push({
          id: `city-${c.id}`,
          title: stripTourSuffix(c.title),
          kind: "city",
          thumbImg: c.thumbImg || null,
          href: cityHref,
        });
      }
    });

    return list;
  }, [states, cities]);

  // Filter matched destinations: States first, then Cities (matching query)
  const matchedDestinations = useMemo<DestinationResult[]>(() => {
    if (!q) return [];

    const statesList: DestinationResult[] = [];
    const citiesList: DestinationResult[] = [];

    allDestinations.forEach((d) => {
      const titleLower = d.title.toLowerCase();
      if (titleLower.includes(q)) {
        if (d.kind === "state") {
          statesList.push(d);
        } else {
          citiesList.push(d);
        }
      }
    });

    const sortByRelevance = (a: DestinationResult, b: DestinationResult) => {
      const aStarts = a.title.toLowerCase().startsWith(q) ? 0 : 1;
      const bStarts = b.title.toLowerCase().startsWith(q) ? 0 : 1;
      if (aStarts !== bStarts) return aStarts - bStarts;
      return a.title.localeCompare(b.title);
    };

    statesList.sort(sortByRelevance);
    citiesList.sort(sortByRelevance);

    // Return matching states first, then matching cities (max 6 total destinations)
    return [...statesList, ...citiesList].slice(0, 6);
  }, [allDestinations, q]);

  // Filter matched tour packages (Tour Itineraries)
  const matchedJourneys = useMemo<JourneyResult[]>(() => {
    if (!q) return [];

    return journeys
      .filter((j) => {
        const title = (j.title || "").toLowerCase();
        const h1 = (j.h1Title || "").toLowerCase();
        const dest = (j.destination || "").toLowerCase();
        const kw = (j.seoKeyword || "").toLowerCase();
        return title.includes(q) || h1.includes(q) || dest.includes(q) || kw.includes(q);
      })
      .sort((a, b) => {
        const aTitle = (a.title || "").toLowerCase();
        const bTitle = (b.title || "").toLowerCase();
        const aStarts = aTitle.startsWith(q) ? 0 : 1;
        const bStarts = bTitle.startsWith(q) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
        return (a.displayOrder || 999) - (b.displayOrder || 999);
      })
      .slice(0, 8)
      .map((j) => ({
        id: j.id,
        title: j.title || j.h1Title || "Tour Package",
        slug: j.slug,
        thumbImg: j.thumbImg,
        duration: j.duration,
        href: `/tour-packages/${j.slug}`,
      }));
  }, [journeys, q]);

  // Filter matched travel experiences
  const matchedExperiences = useMemo<ExperienceResult[]>(() => {
    if (!q) return [];

    return travelExperiences
      .filter((e) => (e.title || "").toLowerCase().includes(q))
      .slice(0, 4)
      .map((e) => ({
        id: e.id,
        title: stripTourSuffix(e.title || e.h1Title || ""),
        slug: e.slug,
        thumbImg: e.thumbImg,
        href: `/travel-experiences/${e.slug}`,
      }));
  }, [travelExperiences, q]);

  // Flat list of all current suggestions for arrow-key navigation
  const flatSuggestions = useMemo(() => {
    return [
      ...matchedDestinations.map((d) => ({ href: d.href })),
      ...matchedJourneys.map((j) => ({ href: j.href })),
      ...matchedExperiences.map((e) => ({ href: e.href })),
    ];
  }, [matchedDestinations, matchedJourneys, matchedExperiences]);

  // Direct navigation handler: clicking any result immediately navigates to its page
  const handleSelect = useCallback(
    (href: string) => {
      setIsOpen(false);
      setQuery("");
      if (onClose) onClose();
      router.push(href);
    },
    [router, onClose]
  );

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (activeIndex >= 0 && flatSuggestions[activeIndex]) {
      handleSelect(flatSuggestions[activeIndex].href);
      return;
    }
    if (matchedDestinations.length > 0) {
      handleSelect(matchedDestinations[0].href);
      return;
    }
    if (matchedJourneys.length > 0) {
      handleSelect(matchedJourneys[0].href);
      return;
    }
    if (matchedExperiences.length > 0) {
      handleSelect(matchedExperiences[0].href);
      return;
    }
    if (q) {
      setIsOpen(false);
      if (onClose) onClose();
      router.push(`/tour-packages?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen && q) {
        setIsOpen(true);
        return;
      }
      setActiveIndex((prev) => (prev < flatSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : flatSuggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setActiveIndex(-1);
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const hasResults =
    matchedDestinations.length > 0 ||
    matchedJourneys.length > 0 ||
    matchedExperiences.length > 0;

  return (
    <div ref={containerRef} className={`relative w-full ${className || "max-w-[500px] lg:max-w-[560px]"}`}>
      {/* Clean Pill Search Bar matching Travelogy reference */}
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center rounded-full border transition-all duration-200 ${
          isMobileModal ? "h-11 bg-white border-slate-300" : "h-10 sm:h-11 md:h-11"
        } shadow-xs ${
          isOpen && q
            ? "bg-white border-[#2E8B8B] ring-2 ring-[#2E8B8B]/15 shadow-md"
            : "bg-slate-50 hover:bg-slate-100/80 border-slate-200 hover:border-slate-300"
        }`}
      >
        <div className="pl-3.5 pr-2 text-slate-400 shrink-0">
          <Search className="w-4.5 h-4.5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
            setIsOpen(val.trim().length > 0);
            setActiveIndex(-1);
          }}
          onFocus={() => {
            if (query.trim().length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search destinations, tours"
          className="w-full h-full py-2 md:py-2.5 text-xs sm:text-[13px] md:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none pr-3"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Clear search input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Autocomplete Dropdown: Only shown when user is typing (NO popular grid) */}
      {isOpen && q && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.14)] border border-slate-200 overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-150">
          <div className="max-h-[440px] overflow-y-auto divide-y divide-slate-100 scrollbar-thin scrollbar-thumb-slate-200">
            {hasResults ? (
              <>
                {/* 1. DESTINATIONS (States & Cities) */}
                {matchedDestinations.length > 0 && (
                  <div className="py-1">
                    {matchedDestinations.map((dest, idx) => {
                      const isSelected = activeIndex === idx;
                      return (
                        <button
                          key={`dest-${dest.id}`}
                          type="button"
                          onClick={() => handleSelect(dest.href)}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={`w-full flex items-start gap-3 px-3.5 py-2.5 transition-colors text-left cursor-pointer ${
                            isSelected ? "bg-[#2E8B8B]/10 text-[#2E8B8B]" : "hover:bg-slate-50 text-slate-800"
                          }`}
                        >
                          <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0 bg-slate-100 border border-slate-200/70 flex items-center justify-center mt-0.5">
                            {dest.thumbImg ? (
                              <FallbackImage
                                src={dest.thumbImg}
                                alt={dest.title}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-teal-50 text-[#2E8B8B]">
                                <MapPin className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[14px] font-medium leading-snug break-words whitespace-normal block">
                              {dest.title}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. TOUR ITINERARY (Matching Travelogy reference) */}
                {matchedJourneys.length > 0 && (
                  <div className="py-1">
                    <div className="px-3.5 pt-2.5 pb-1 text-[13px] font-semibold text-slate-500">
                      Tour Itinerary
                    </div>
                    {matchedJourneys.map((j, idx) => {
                      const overallIdx = matchedDestinations.length + idx;
                      const isSelected = activeIndex === overallIdx;
                      return (
                        <button
                          key={`journey-${j.id}`}
                          type="button"
                          onClick={() => handleSelect(j.href)}
                          onMouseEnter={() => setActiveIndex(overallIdx)}
                          className={`w-full flex items-start gap-3 px-3.5 py-2.5 transition-colors text-left cursor-pointer ${
                            isSelected ? "bg-[#2E8B8B]/10 text-[#2E8B8B]" : "hover:bg-slate-50 text-slate-800"
                          }`}
                        >
                          <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0 bg-slate-100 border border-slate-200/70 flex items-center justify-center mt-0.5">
                            {j.thumbImg ? (
                              <FallbackImage
                                src={j.thumbImg}
                                alt={j.title}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-orange-50 text-[#F8904D]">
                                <Compass className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[14px] font-medium leading-snug break-words whitespace-normal block">
                              {j.title}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 3. TRAVEL EXPERIENCES */}
                {matchedExperiences.length > 0 && (
                  <div className="py-1">
                    <div className="px-3.5 pt-2.5 pb-1 text-[13px] font-semibold text-slate-500">
                      Travel Experiences
                    </div>
                    {matchedExperiences.map((exp, idx) => {
                      const overallIdx =
                        matchedDestinations.length + matchedJourneys.length + idx;
                      const isSelected = activeIndex === overallIdx;
                      return (
                        <button
                          key={`exp-${exp.id}`}
                          type="button"
                          onClick={() => handleSelect(exp.href)}
                          onMouseEnter={() => setActiveIndex(overallIdx)}
                          className={`w-full flex items-start gap-3 px-3.5 py-2.5 transition-colors text-left cursor-pointer ${
                            isSelected ? "bg-[#2E8B8B]/10 text-[#2E8B8B]" : "hover:bg-slate-50 text-slate-800"
                          }`}
                        >
                          <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0 bg-slate-100 border border-slate-200/70 flex items-center justify-center mt-0.5">
                            {exp.thumbImg ? (
                              <FallbackImage
                                src={exp.thumbImg}
                                alt={exp.title}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-teal-50 text-[#2E8B8B]">
                                <Sparkles className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[14px] font-medium leading-snug break-words whitespace-normal block">
                              {exp.title}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <div className="p-6 text-center text-sm text-slate-500">
                No matching destinations or tour packages for &ldquo;{query}&rdquo;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
