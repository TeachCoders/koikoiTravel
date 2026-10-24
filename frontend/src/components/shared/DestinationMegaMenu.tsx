"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Compass, Sparkles, ArrowRight } from "lucide-react";

export interface DestinationTreeExperience {
  id: number;
  title: string;
  slug: string;
  href: string;
  count?: number;
}

export interface DestinationTreeCountry {
  id: number;
  title: string;
  slug: string;
  href: string;
  states: DestinationTreeState[];
}

export interface DestinationTreeState {
  id: number;
  title: string;
  slug: string;
  href: string;
  displayOrder: number;
  cities: DestinationTreeCity[];
  experiences?: DestinationTreeExperience[];
}

export interface DestinationTreeCity {
  id: number;
  title: string;
  slug: string;
  href: string;
}

interface DestinationMegaMenuProps {
  tree: DestinationTreeCountry[];
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

export const DestinationMegaMenu: React.FC<DestinationMegaMenuProps> = ({
  tree,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
}) => {
  const [activeCountryId, setActiveCountryId] = useState<number | null>(null);
  const [activeStateId, setActiveStateId] = useState<number | null>(null);

  // Active Country
  const displayCountryId = activeCountryId ?? (tree.length > 0 ? tree[0].id : null);
  const activeCountry = tree.find((c) => c.id === displayCountryId);

  // Active State inside Active Country
  const displayStateId =
    activeStateId && activeCountry?.states.some((s) => s.id === activeStateId)
      ? activeStateId
      : activeCountry?.states[0]?.id ?? null;

  const activeState = activeCountry?.states.find((s) => s.id === displayStateId);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute left-0 top-full transition-opacity duration-200 w-full z-50 ${
        isOpen
          ? "opacity-100 visible pointer-events-auto"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      <div className="w-full bg-white border-b border-[#ececec] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.14)]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex h-[460px] overflow-hidden">

          {/* COLUMN 1: Country List */}
          <div className="w-[190px] bg-slate-50 border-r border-[#ececec] shrink-0 py-4 px-3 flex flex-col overflow-y-auto custom-scrollbar">
            <div className="h-7 flex items-center mb-2 px-2">
              <span className="text-[12px] font-extrabold tracking-widest text-[#888] uppercase flex items-center gap-1.5">
                <Compass size={14} className="text-[#F8904D]" />
                Country
              </span>
            </div>
            <div className="space-y-1">
              {tree.map((country) => {
                const isActive = displayCountryId === country.id;
                return (
                  <Link
                    key={country.id}
                    href={country.href}
                    onClick={onClose}
                    onMouseEnter={() => {
                      setActiveCountryId(country.id);
                      setActiveStateId(null);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl transition-colors duration-150 text-[16px] font-bold ${
                      isActive
                        ? "bg-[#2E8B8B] text-white shadow-xs"
                        : "text-[#555] hover:bg-slate-200/70 hover:text-[#2E8B8B]"
                    }`}
                  >
                    <span>{country.title}</span>
                    <ChevronRight
                      size={15}
                      className={`transition-transform duration-150 ${
                        isActive ? "opacity-100 translate-x-0.5" : "opacity-40"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: States List (Sorted by Popularity) */}
          <div className="w-[260px] bg-slate-50/50 border-r border-[#ececec] shrink-0 py-4 px-3 flex flex-col overflow-y-auto custom-scrollbar">
            <div className="h-7 flex items-center mb-2 px-2">
              <span className="text-[12px] font-extrabold tracking-widest text-[#888] uppercase">
                Popular States & Regions
              </span>
            </div>
            {activeCountry && activeCountry.states.length > 0 ? (
              <div className="space-y-1">
                {activeCountry.states.map((state) => {
                  const isActive = displayStateId === state.id;
                  const cityCount = state.cities.length;
                  return (
                    <div
                      key={state.id}
                      onMouseEnter={() => setActiveStateId(state.id)}
                      className="group"
                    >
                      <Link
                        href={state.href}
                        onClick={onClose}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-xl transition-colors duration-150 text-[15px] font-semibold ${
                          isActive
                            ? "bg-white text-[#2E8B8B] font-bold shadow-xs border border-slate-200/60"
                            : "text-[#555] hover:bg-white/80 hover:text-[#2E8B8B]"
                        }`}
                      >
                        <span className="truncate">{state.title}</span>
                        <div className="flex items-center gap-1 shrink-0">
                          {cityCount > 0 && (
                            <span
                              className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${
                                isActive
                                  ? "bg-[#2E8B8B]/10 text-[#2E8B8B]"
                                  : "bg-slate-200/80 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                              }`}
                            >
                              {cityCount}
                            </span>
                          )}
                          <ChevronRight
                            size={14}
                            className={`transition-colors ${
                              isActive
                                ? "text-[#2E8B8B] opacity-100"
                                : "text-slate-400 opacity-40 group-hover:opacity-80"
                            }`}
                          />
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-3 text-[14px] text-slate-400 italic">No states available</div>
            )}
          </div>

          {/* COLUMN 3: 2-in-1 Smart Split (Iconic Cities + Curated Themes) */}
          <div className="flex-1 py-4 px-7 bg-white flex flex-col justify-between overflow-y-auto custom-scrollbar">
            {activeState ? (
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pt-1 pb-2 border-b border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-[18px] font-bold text-[#2E8B8B] tracking-tight">
                      {activeState.title}
                    </h3>
                    <span className="text-[13px] text-slate-400 font-medium">
                      ({activeCountry?.title})
                    </span>
                  </div>
                  <Link
                    href={activeState.href}
                    onClick={onClose}
                    className="text-[13px] font-bold text-[#F8904D] hover:underline inline-flex items-center gap-1"
                  >
                    <span>View All {activeState.title} Packages</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                {/* 2-Column Split: Cities (Left) + Experiences (Right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                  {/* Left: Iconic Cities */}
                  <div className="space-y-2.5">
                    <div className="text-[12px] font-extrabold text-[#777] uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-100">
                      <MapPin size={13} className="text-[#2E8B8B]" />
                      Iconic Cities & Places
                    </div>
                    {activeState.cities.length > 0 ? (
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                        {activeState.cities.slice(0, 8).map((city) => (
                          <Link
                            key={city.id}
                            href={city.href}
                            onClick={onClose}
                            className="group flex items-center gap-1.5 py-1 text-[14px] font-medium text-slate-700 hover:text-[#2E8B8B] transition-colors truncate"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#2E8B8B] transition-colors shrink-0" />
                            <span className="truncate">{city.title}</span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[13px] text-slate-400 italic">Explore state tours directly.</p>
                    )}
                    {activeState.cities.length > 8 && (
                      <Link
                        href={activeState.href}
                        onClick={onClose}
                        className="text-[12px] font-semibold text-[#2E8B8B] hover:underline inline-flex items-center gap-1 pt-1"
                      >
                        View all {activeState.cities.length} destinations <span aria-hidden>→</span>
                      </Link>
                    )}
                  </div>

                  {/* Right: Curated Experiences / Thematic Tours */}
                  <div className="space-y-2.5">
                    <div className="text-[12px] font-extrabold text-[#777] uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-100">
                      <Sparkles size={13} className="text-[#F8904D]" />
                      Popular Tour Experiences
                    </div>
                    {activeState.experiences && activeState.experiences.length > 0 ? (
                      <div className="space-y-1.5">
                        {activeState.experiences.slice(0, 4).map((exp) => (
                          <Link
                            key={exp.slug}
                            href={exp.href}
                            onClick={onClose}
                            className="group flex items-center justify-between p-2 rounded-xl bg-slate-50/80 hover:bg-[#2E8B8B]/5 border border-slate-100 hover:border-[#2E8B8B]/20 transition-all text-slate-800"
                          >
                            <span className="text-[13.5px] font-semibold group-hover:text-[#2E8B8B] transition-colors truncate">
                              {exp.title} in {activeState.title}
                            </span>
                            {exp.count && exp.count > 0 && (
                              <span className="text-[11px] font-bold text-slate-500 bg-white group-hover:bg-[#2E8B8B]/10 group-hover:text-[#2E8B8B] px-2 py-0.5 rounded-full shrink-0 ml-2 shadow-2xs">
                                {exp.count} Tours
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-xl text-[13px] text-slate-500 space-y-1">
                        <p className="font-semibold text-slate-700">Handcrafted Itineraries</p>
                        <p>Private & customized tour packages available for {activeState.title}.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Highlight Strip */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[12.5px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-600">Popular Inbound Circuits:</span>
                    <Link
                      href="/tour-packages/india/golden-triangle"
                      onClick={onClose}
                      className="text-[#2E8B8B] font-semibold hover:underline"
                    >
                      Golden Triangle Tours
                    </Link>
                    <span>•</span>
                    <Link
                      href="/travel-experiences/wildlife"
                      onClick={onClose}
                      className="text-[#2E8B8B] font-semibold hover:underline"
                    >
                      Wildlife Safaris
                    </Link>
                  </div>
                  <Link
                    href={activeState.href}
                    onClick={onClose}
                    className="font-bold text-[#F8904D] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Explore {activeState.title} Holiday Packages</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-[15px] italic">
                Select a state to view destinations
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DestinationMegaMenu;