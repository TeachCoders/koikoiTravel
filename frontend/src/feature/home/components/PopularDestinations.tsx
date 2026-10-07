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
    }
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

  // Default to India when countries are loaded
  useEffect(() => {
    if (defaultCountryId && !selectedCountryId) {
      setSelectedCountryId(defaultCountryId);
    }
  }, [defaultCountryId, selectedCountryId]);

  // Destination items (Top Ordered States + Golden Triangle)
  const items = useMemo<DestinationItem[]>(() => {
    // 1. States with displayOrder > 0
    const orderedStates: DestinationItem[] = states
      .filter((s) => (s.displayOrder ?? 0) > 0)
      .map((s) => {
        const tours = s.tourCount ?? (s.journeys?.length || 0);
        const countrySlug = s.country?.slug || "india";
        return {
          id: `state-${s.id}`,
          countryId: s.countryId || s.country?.id,
          title: s.title,
          image: s.thumbImg || s.banner?.images?.[0],
          subtitle: tours > 0 ? `${tours}+ tours` : undefined,
          href: `/tour-packages/${countrySlug}/${s.slug}`,
          displayOrder: s.displayOrder ?? 999,
        };
      });

    // 2. Include Golden Triangle experience
    const goldenTriangle = travelExperiences.find(
      (e) =>
        e.slug === "golden-triangle" ||
        e.title.toLowerCase().includes("golden triangle")
    );

    const gtCountry = availableCountries.find((c) => c.slug.toLowerCase() === "india");
    const gtCountryId = gtCountry ? Number(gtCountry.id) : undefined;

    const gtItem: DestinationItem | null = goldenTriangle
      ? {
          id: `exp-${goldenTriangle.id}`,
          countryId: gtCountryId,
          title: "Golden Triangle",
          image:
            goldenTriangle.thumbImg ||
            goldenTriangle.banner?.images?.[0] ||
            "/golden-triangle/trip/golden-triangle.webp",
          subtitle:
            (goldenTriangle.tourCount ?? 0) > 0
              ? `${goldenTriangle.tourCount}+ tours`
              : "19+ tours",
          href: `/travel-experiences/${goldenTriangle.slug}`,
          displayOrder:
            goldenTriangle.displayOrder && goldenTriangle.displayOrder > 0
              ? goldenTriangle.displayOrder
              : 9,
        }
      : null;

    const allItems = [...orderedStates];
    if (gtItem) {
      allItems.push(gtItem);
    }

    return allItems.sort((a, b) => a.displayOrder - b.displayOrder);
  }, [states, travelExperiences, availableCountries]);

  // Filter items by selected country
  const filteredItems = useMemo(() => {
    if (!selectedCountryId || selectedCountryId === "all") return items;
    return items.filter(
      (i) => !i.countryId || String(i.countryId) === String(selectedCountryId)
    );
  }, [items, selectedCountryId]);

  const isLoading = statesLoading || countriesLoading || experiencesLoading;
  const bentoItems = filteredItems.slice(0, 18);

  const activeCountryObj = availableCountries.find(
    (c) => c.id === selectedCountryId
  );
  const activeCountryName = activeCountryObj
    ? activeCountryObj.name
    : selectedCountryId === "all"
    ? "All Destinations"
    : "India";

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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 auto-rows-[160px] lg:auto-rows-[180px]">
            <div className="col-span-2 row-span-2 rounded-2xl bg-slate-100 animate-pulse h-full" />
            <div className="rounded-2xl bg-slate-100 animate-pulse h-full" />
            <div className="rounded-2xl bg-slate-100 animate-pulse h-full" />
            <div className="rounded-2xl bg-slate-100 animate-pulse h-full" />
            <div className="rounded-2xl bg-slate-100 animate-pulse h-full" />
          </div>
        ) : bentoItems.length === 0 ? (
          <p className="text-center text-slate-400 py-16">No destinations found.</p>
        ) : (
          <div className="space-y-6">
            <div
              key={selectedCountryId || "all"}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 auto-rows-[140px] sm:auto-rows-[160px] lg:auto-rows-[180px] animate-in fade-in duration-500"
            >
              {bentoItems.map((item, idx) => {
                const isLarge =
                  idx === 0 || (bentoItems.length >= 14 && idx === 13);

                return (
                  <DestinationCard
                    key={item.id}
                    title={item.title}
                    image={item.image}
                    subtitle={item.subtitle}
                    href={item.href}
                    className={`!rounded-2xl !h-full w-full ${
                      isLarge
                        ? "col-span-2 row-span-2"
                        : "col-span-1 row-span-1"
                    }`}
                  />
                );
              })}
            </div>

            {/* View All Link at the bottom if filtered list is long */}
            {items.length > 18 && (
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
