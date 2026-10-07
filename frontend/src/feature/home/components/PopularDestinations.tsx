"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import DestinationCard from "@/components/shared/DestinationCard";
import { useGetStates } from "@/feature/state/api/useState";
import { useGetCountries } from "@/feature/country/api/useCountry";
import { useGetTravelExperiences } from "@/feature/travelExperience/api/useTravelExperience";
import type { State, PaginatedResponse as StatePage } from "@/feature/state/type";
import type { Country, PaginatedResponse as CountryPage } from "@/feature/country/type";
import type { TravelExperience, PaginatedResponse as ExperiencePage } from "@/feature/travelExperience/type";

interface DestinationItem {
  id: string | number;
  countryId?: number;
  title: string;
  image?: string;
  subtitle?: string;
  href: string;
  displayOrder: number;
}

export const PopularDestinations: React.FC<{
  initialStates?: StatePage<State> | null;
  initialCountries?: CountryPage<Country> | null;
  initialExperiences?: ExperiencePage<TravelExperience> | null;
}> = ({ initialStates, initialCountries, initialExperiences }) => {
  const { states, isLoading: statesLoading } = useGetStates(
    {
      limit: 100,
      isActive: "true",
    },
    initialStates
  );

  const { countries, isLoading: countriesLoading } = useGetCountries(
    {
      limit: 100,
      isActive: "true",
    },
    initialCountries
  );

  const { travelExperiences, isLoading: experiencesLoading } = useGetTravelExperiences(
    {
      limit: 100,
      isActive: "true",
    },
    initialExperiences
  );

  // Available countries
  const availableCountries = useMemo(() => {
    return countries.map((c) => ({
      id: String(c.id),
      slug: c.slug,
      name: c.title.replace(/\s*Tour$/i, "").trim(),
    }));
  }, [countries]);

  // Find India country or default to first country
  const defaultCountryId = useMemo(() => {
    const india = availableCountries.find(
      (c) => c.slug.toLowerCase() === "india" || c.name.toLowerCase() === "india"
    );
    return india ? india.id : availableCountries[0]?.id || null;
  }, [availableCountries]);

  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeCountryId = selectedCountryId ?? defaultCountryId;

  // Default to India when countries are loaded
  useEffect(() => {
    if (defaultCountryId && !selectedCountryId) {
      setSelectedCountryId(defaultCountryId);
    }
  }, [defaultCountryId, selectedCountryId]);

  // Left Column items (Inbound / Iconic circuit destinations)
  const leftItems = useMemo<DestinationItem[]>(() => {
    return states
      .filter((s) => (s.displayOrder ?? 0) > 0)
      .map((s) => {
        const tours = s.tourCount ?? (s.journeys?.length || 0);
        const countrySlug = s.country?.slug || "india";
        return {
          id: `left-state-${s.id}`,
          countryId: s.countryId || s.country?.id,
          title: s.title,
          image:
            s.thumbImg ||
            s.banner?.images?.[0] ||
            (s.slug === "golden-triangle"
              ? "/golden-triangle/trip/golden-triangle.webp"
              : undefined),
          subtitle: tours > 0 ? `${tours}+ tours` : undefined,
          href:
            s.slug === "golden-triangle"
              ? `/travel-experiences/golden-triangle`
              : `/tour-packages/${countrySlug}/${s.slug}`,
          displayOrder: s.displayOrder ?? 999,
        };
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [states]);

  // Right Column items (Domestic / Regional destinations) - exclude any state already in leftItems
  const rightItems = useMemo<DestinationItem[]>(() => {
    const leftStateIds = new Set(
      states.filter((s) => (s.displayOrder ?? 0) > 0).map((s) => s.id)
    );
    return states
      .filter((s) => (s.domesticDisplayOrder ?? 0) > 0 && !leftStateIds.has(s.id))
      .map((s) => {
        const tours = s.tourCount ?? (s.journeys?.length || 0);
        const countrySlug = s.country?.slug || "india";
        return {
          id: `right-state-${s.id}`,
          countryId: s.countryId || s.country?.id,
          title: s.title,
          image:
            s.thumbImg ||
            s.banner?.images?.[0] ||
            (s.slug === "golden-triangle"
              ? "/golden-triangle/trip/golden-triangle.webp"
              : undefined),
          subtitle: tours > 0 ? `${tours}+ tours` : undefined,
          href:
            s.slug === "golden-triangle"
              ? `/travel-experiences/golden-triangle`
              : `/tour-packages/${countrySlug}/${s.slug}`,
          displayOrder: s.domesticDisplayOrder ?? 999,
        };
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [states]);

  // Filter items by selected country
  const filteredLeftItems = useMemo(() => {
    if (!activeCountryId || activeCountryId === "all") return leftItems;
    return leftItems.filter(
      (i) => !i.countryId || String(i.countryId) === String(activeCountryId)
    );
  }, [leftItems, activeCountryId]);

  const filteredRightItems = useMemo(() => {
    if (!activeCountryId || activeCountryId === "all") return rightItems;
    return rightItems.filter(
      (i) => !i.countryId || String(i.countryId) === String(activeCountryId)
    );
  }, [rightItems, activeCountryId]);

  const isLoading = statesLoading || countriesLoading || experiencesLoading;

  // Derive left and right columns: if right items configured, use them. Otherwise split left items in two
  const { displayLeft, displayRight } = useMemo(() => {
    if (filteredRightItems.length > 0) {
      return {
        displayLeft: filteredLeftItems,
        displayRight: filteredRightItems,
      };
    }
    const half = Math.ceil(filteredLeftItems.length / 2);
    return {
      displayLeft: filteredLeftItems.slice(0, half),
      displayRight: filteredLeftItems.slice(half),
    };
  }, [filteredLeftItems, filteredRightItems]);

  const activeCountryObj = availableCountries.find(
    (c) => c.id === activeCountryId
  );
  const activeCountryName = activeCountryObj
    ? activeCountryObj.name
    : activeCountryId === "all"
    ? "All Destinations"
    : "India";

  const renderColumnGrid = (columnItems: DestinationItem[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
      {columnItems.map((item) => (
        <DestinationCard
          key={item.id}
          title={item.title}
          image={item.image}
          subtitle={item.subtitle}
          href={item.href}
          className="!rounded-2xl !h-[185px] sm:!h-[195px] w-full"
        />
      ))}
    </div>
  );

  return (
    <section
      id="destinations"
      className="py-20 bg-white relative border shadow-[inset_0_15px_20px_-15px_rgba(0,0,0,0.06)] z-10"
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6 relative z-30">
          <div>
            <SectionLabel>Popular Destinations</SectionLabel>
            <h2 className="h2 text-[#1C1C1C] mt-2">Explore Top Places</h2>
            <p className="mt-2 text-base text-[#555]">
              Find the best holiday packages for India&apos;s most loved states and iconic circuits.
            </p>
          </div>

          {!isLoading && availableCountries.length > 0 && (
            <div className="relative inline-block shrink-0">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center justify-between gap-3 bg-white border px-6 py-3 rounded-full text-sm font-bold shadow-sm outline-none transition-all min-w-[200px] ${
                  isDropdownOpen
                    ? "border-orange-500 ring-2 ring-orange-500/20"
                    : "border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <span className="truncate text-slate-800">
                  {activeCountryName}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180 text-orange-500" : ""
                  }`}
                />
              </button>

              {/* Custom Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute right-0 lg:right-0 mt-2 w-full lg:w-[240px] bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-[300px] overflow-y-auto py-2 custom-scrollbar">
                      {availableCountries.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCountryId("all");
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-5 py-3 text-sm font-bold transition-colors ${
                            selectedCountryId === "all"
                              ? "bg-orange-50 text-orange-600"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          All Destinations
                        </button>
                      )}
                      {availableCountries.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            setSelectedCountryId(c.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-5 py-3 text-sm font-bold transition-colors ${
                            selectedCountryId === c.id
                              ? "bg-orange-50 text-orange-600"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-slate-100 animate-pulse h-[185px]" />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-slate-100 animate-pulse h-[185px]" />
              ))}
            </div>
          </div>
        ) : displayLeft.length === 0 && displayRight.length === 0 ? (
          <p className="text-center text-slate-400 py-16">No destinations found.</p>
        ) : (
          <div className="space-y-6">
            <div
              key={selectedCountryId || "all"}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 animate-in fade-in duration-500"
            >
              <div>{renderColumnGrid(displayLeft)}</div>
              <div>{renderColumnGrid(displayRight)}</div>
            </div>

            {/* View All Link at the bottom if list is long */}
            {(leftItems.length + rightItems.length) > 12 && (
              <div className="flex justify-center pt-4">
                <Link
                  href="/tour-packages"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-50 text-orange-600 text-sm font-bold hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                >
                  <span>View All Destinations</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularDestinations;

