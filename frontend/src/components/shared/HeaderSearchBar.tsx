"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  X,
  MapPin,
  Compass,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Calendar,
} from "lucide-react";
import { useGetStates } from "@/feature/state/api/useState";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import { useGetTravelExperiences } from "@/feature/travelExperience/api/useTravelExperience";
import { FallbackImage } from "./FallbackImage";
import { stripTourSuffix } from "@/lib/utils";

interface DestinationItem {
  id: number;
  title: string;
  slug: string;
  kind: "state" | "city";
  thumbImg?: string | null;
  subtitle?: string;
  href: string;
}

interface JourneyItem {
  id: number;
  title: string;
  slug: string;
  thumbImg?: string | null;
  duration?: string;
  noDays?: number;
  destination?: string;
  href: string;
}

interface ExperienceItem {
  id: number;
  title: string;
  slug: string;
  thumbImg?: string | null;
  href: string;
}

const POPULAR_DESTINATIONS = [
  { title: "Rajasthan", href: "/tour-packages/india/rajasthan", img: "/content/destination-rajasthan.webp" },
  { title: "Kerala", href: "/tour-packages/india/kerala", img: "/content/destination-kerala.webp" },
  { title: "Kashmir", href: "/tour-packages/india/jammu-and-kashmir", img: "/content/destination-kashmir.webp" },
  { title: "Golden Triangle", href: "/travel-experiences/golden-triangle", img: "/content/destination-golden-triangle.webp" },
  { title: "Ladakh", href: "/tour-packages/india/ladakh", img: "/content/destination-ladakh.webp" },
  { title: "Goa", href: "/tour-packages/india/goa", img: "/content/destination-goa.webp" },
];

export default function HeaderSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { states = [] } = useGetStates({ limit: 100, isActive: "true" });
  const { journeys = [] } = useGetJourneys({ limit: 100, isActive: "true" });
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

  // Prepare all searchable destinations (States & Cities)
  const allDestinations = useMemo<DestinationItem[]>(() => {
    const list: DestinationItem[] = [];

    states.forEach((s) => {
      if (s.slug === "golden-triangle") return;
      const countrySlug = s.country?.slug || "india";
      list.push({
        id: s.id,
        title: s.title,
        slug: s.slug,
        kind: "state",
        thumbImg: s.thumbImg,
        subtitle: "State in India",
        href: `/tour-packages/${countrySlug}/${s.slug}`,
      });

      if (s.cities && Array.isArray(s.cities)) {
        s.cities.forEach((c) => {
          if (!c.title || !c.slug) return;
          list.push({
            id: c.id as number,
            title: stripTourSuffix(c.title),
            slug: c.slug,
            kind: "city",
            thumbImg: c.thumbImg || s.thumbImg,
            subtitle: `City in ${s.title}`,
            href: `/tour-packages/${countrySlug}/${s.slug}/${c.slug}`,
          });
        });
      }
    });

    return list;
  }, [states]);

  // Filter destinations based on query
  const matchedDestinations = useMemo(() => {
    if (!q) return [];
    return allDestinations
      .filter((d) => d.title.toLowerCase().includes(q) || (d.subtitle && d.subtitle.toLowerCase().includes(q)))
      .sort((a, b) => {
        const aStarts = a.title.toLowerCase().startsWith(q) ? 0 : 1;
        const bStarts = b.title.toLowerCase().startsWith(q) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
        return a.title.localeCompare(b.title);
      })
      .slice(0, 5);
  }, [allDestinations, q]);

  // Filter tour itineraries / packages based on query
  const matchedJourneys = useMemo<JourneyItem[]>(() => {
    if (!q) return [];
    return journeys
      .filter((j) => {
        const titleMatch = (j.title || "").toLowerCase().includes(q);
        const h1Match = (j.h1Title || "").toLowerCase().includes(q);
        const destMatch = (j.destination || "").toLowerCase().includes(q);
        const kwMatch = (j.seoKeyword || "").toLowerCase().includes(q);
        return titleMatch || h1Match || destMatch || kwMatch;
      })
      .sort((a, b) => {
        const aStarts = (a.title || "").toLowerCase().startsWith(q) ? 0 : 1;
        const bStarts = (b.title || "").toLowerCase().startsWith(q) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
        return (a.displayOrder || 999) - (b.displayOrder || 999);
      })
      .slice(0, 7)
      .map((j) => ({
        id: j.id,
        title: j.title || j.h1Title || "Tour Package",
        slug: j.slug,
        thumbImg: j.thumbImg,
        duration: j.duration,
        noDays: j.noDays,
        destination: j.destination,
        href: `/tour-packages/${j.slug}`,
      }));
  }, [journeys, q]);

  // Filter travel experiences
  const matchedExperiences = useMemo<ExperienceItem[]>(() => {
    if (!q) return [];
    return travelExperiences
      .filter((e) => (e.title || "").toLowerCase().includes(q))
      .slice(0, 3)
      .map((e) => ({
        id: e.id,
        title: e.title,
        slug: e.slug,
        thumbImg: e.thumbImg,
        href: `/travel-experiences/${e.slug}`,
      }));
  }, [travelExperiences, q]);

  // Flat list of all current suggestions for keyboard navigation
  const allCurrentSuggestions = useMemo(() => {
    return [
      ...matchedDestinations.map((d) => ({ ...d, type: "destination" as const })),
      ...matchedJourneys.map((j) => ({ ...j, type: "journey" as const })),
      ...matchedExperiences.map((e) => ({ ...e, type: "experience" as const })),
    ];
  }, [matchedDestinations, matchedJourneys, matchedExperiences]);

  const handleSelect = useCallback(
    (href: string) => {
      setIsOpen(false);
      setQuery("");
      router.push(href);
    },
    [router]
  );

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (activeIndex >= 0 && allCurrentSuggestions[activeIndex]) {
      handleSelect(allCurrentSuggestions[activeIndex].href);
      return;
    }
    if (matchedDestinations.length > 0 && !matchedJourneys.length) {
      handleSelect(matchedDestinations[0].href);
      return;
    }
    if (matchedJourneys.length > 0 && !matchedDestinations.length) {
      handleSelect(matchedJourneys[0].href);
      return;
    }
    if (q) {
      setIsOpen(false);
      router.push(`/tour-packages?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      setActiveIndex((prev) => (prev < allCurrentSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : allCurrentSuggestions.length - 1));
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
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const hasResults = matchedDestinations.length > 0 || matchedJourneys.length > 0 || matchedExperiences.length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-[480px] lg:max-w-[540px]">
      {/* Search Input Bar */}
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center bg-white rounded-full border transition-all duration-200 shadow-sm ${
          isOpen
            ? "border-[#2E8B8B] ring-2 ring-[#2E8B8B]/15 shadow-md"
            : "border-slate-300 hover:border-[#2E8B8B]/60"
        }`}
      >
        <div className="pl-4 pr-2 text-[#2E8B8B] shrink-0">
          <Search className="w-4 h-4 md:w-4.5 md:h-4.5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search destinations, tour packages, places..."
          aria-label="Search destinations and tour packages"
          className="w-full py-2 md:py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Clear search input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Autocomplete Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-200/90 overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-150">
          <div className="max-h-[460px] overflow-y-auto divide-y divide-slate-100 scrollbar-thin scrollbar-thumb-slate-200">
            {/* If user is typing and results exist */}
            {q && hasResults && (
              <>
                {/* 1. DESTINATIONS GROUP */}
                {matchedDestinations.length > 0 && (
                  <div className="p-2">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#2E8B8B]" />
                      <span>Destinations</span>
                    </div>
                    <div className="space-y-0.5">
                      {matchedDestinations.map((dest, idx) => {
                        const isSelected = activeIndex === idx;
                        return (
                          <button
                            key={`dest-${dest.kind}-${dest.id}`}
                            type="button"
                            onClick={() => handleSelect(dest.href)}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                              isSelected ? "bg-[#2E8B8B]/10 text-[#2E8B8B]" : "hover:bg-slate-50 text-slate-800"
                            }`}
                          >
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80">
                              <FallbackImage
                                src={dest.thumbImg}
                                alt={dest.title}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-slate-900 truncate">{dest.title}</p>
                              {dest.subtitle && (
                                <p className="text-xs text-slate-500 truncate">{dest.subtitle}</p>
                              )}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0">
                              {dest.kind}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. TOUR ITINERARY GROUP (Matching Image 1) */}
                {matchedJourneys.length > 0 && (
                  <div className="p-2">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-[#F8904D]" />
                      <span>Tour Itinerary</span>
                    </div>
                    <div className="space-y-0.5">
                      {matchedJourneys.map((journey, idx) => {
                        const overallIdx = matchedDestinations.length + idx;
                        const isSelected = activeIndex === overallIdx;
                        return (
                          <button
                            key={`journey-${journey.id}`}
                            type="button"
                            onClick={() => handleSelect(journey.href)}
                            onMouseEnter={() => setActiveIndex(overallIdx)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                              isSelected ? "bg-[#2E8B8B]/10 text-[#2E8B8B]" : "hover:bg-slate-50 text-slate-800"
                            }`}
                          >
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80">
                              <FallbackImage
                                src={journey.thumbImg}
                                alt={journey.title}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-900 truncate leading-snug">
                                {journey.title}
                              </p>
                              {journey.duration ? (
                                <p className="text-xs text-[#2E8B8B] font-medium flex items-center gap-1 mt-0.5">
                                  <Calendar className="w-3 h-3" />
                                  <span>{journey.duration}</span>
                                </p>
                              ) : journey.noDays ? (
                                <p className="text-xs text-[#2E8B8B] font-medium flex items-center gap-1 mt-0.5">
                                  <Calendar className="w-3 h-3" />
                                  <span>{journey.noDays} Days Tour</span>
                                </p>
                              ) : null}
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-300 shrink-0 group-hover:text-[#2E8B8B]" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. EXPERIENCES GROUP */}
                {matchedExperiences.length > 0 && (
                  <div className="p-2">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#2E8B8B]" />
                      <span>Experiences</span>
                    </div>
                    <div className="space-y-0.5">
                      {matchedExperiences.map((exp, idx) => {
                        const overallIdx = matchedDestinations.length + matchedJourneys.length + idx;
                        const isSelected = activeIndex === overallIdx;
                        return (
                          <button
                            key={`exp-${exp.id}`}
                            type="button"
                            onClick={() => handleSelect(exp.href)}
                            onMouseEnter={() => setActiveIndex(overallIdx)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                              isSelected ? "bg-[#2E8B8B]/10 text-[#2E8B8B]" : "hover:bg-slate-50 text-slate-800"
                            }`}
                          >
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80">
                              <FallbackImage
                                src={exp.thumbImg}
                                alt={exp.title}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-900 truncate">{exp.title}</p>
                              <p className="text-xs text-slate-500">Travel Experience</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* If user is typing but NO results found */}
            {q && !hasResults && (
              <div className="p-6 text-center">
                <Compass className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">No matching places or packages</p>
                <p className="text-xs text-slate-500 mt-1">
                  Try searching for &quot;Rajasthan&quot;, &quot;Kerala&quot;, &quot;Agra&quot;, or &quot;Golden Triangle&quot;
                </p>
              </div>
            )}

            {/* Initial state (user focused input before typing) */}
            {!q && (
              <div className="p-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-[#F8904D]" />
                  <span>Popular Destinations</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {POPULAR_DESTINATIONS.map((pop) => (
                    <button
                      key={pop.title}
                      type="button"
                      onClick={() => handleSelect(pop.href)}
                      className="flex items-center gap-2 p-2 rounded-xl border border-slate-100 hover:border-[#2E8B8B]/40 hover:bg-[#2E8B8B]/5 transition-all text-left group"
                    >
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                        <Image src={pop.img} alt={pop.title} fill sizes="32px" className="object-cover" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-[#2E8B8B] truncate">
                        {pop.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer "View all packages" link */}
            {q && (
              <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">
                  Showing top results for &ldquo;{query}&rdquo;
                </span>
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="font-bold text-[#F8904D] hover:text-[#e07a38] flex items-center gap-1"
                >
                  <span>View all packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
