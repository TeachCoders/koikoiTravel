"use client";

import React from "react";
import {
  Sparkles,
  MapPin,
  Calendar,
  Shirt,
  Compass,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  ThermometerSun,
  Globe2,
} from "lucide-react";
import RichContent from "@/components/shared/RichContent";
import {
  getDestinationGuide,
  DestinationGuideInfo,
} from "@/lib/destinationGuideData";
import type { State } from "@/feature/state/type";

interface DestinationTravelGuideProps {
  state: State;
  pageLinkedHrefs?: Set<string>;
  excludeHrefs?: string[];
  className?: string;
}

export default function DestinationTravelGuide({
  state,
  pageLinkedHrefs,
  excludeHrefs,
  className = "",
}: DestinationTravelGuideProps) {
  const guideInfo: DestinationGuideInfo = getDestinationGuide({
    title: state.title,
    slug: state.slug,
    h1Title: state.h1Title,
    capital: state.capital,
    language: state.language,
    area: state.area,
    famousFor: state.famousFor,
    cities: state.cities as any,
  });

  const facts = [
    { label: "Capital", value: state.capital },
    { label: "Official Language", value: state.language },
    { label: "Area", value: state.area },
  ].filter((f) => f.value);

  const hasSeoDesc = Boolean(state.seoDescription?.trim());
  const hasMoreDesc = Boolean(state.moreDescription?.trim());
  const hasEditorialContent = hasSeoDesc || hasMoreDesc;

  return (
    <section
      id="more"
      className={`w-full bg-white border-t border-slate-200/60 py-10 sm:py-14 lg:py-16 ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* ===== SECTION HEADER ===== */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#F8904D] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F8904D]" />
            {guideInfo.eyebrow || "TRAVEL GUIDE"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {guideInfo.title || "Before you go"}
          </h2>
          {guideInfo.subtitle && (
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {guideInfo.subtitle}
            </p>
          )}
        </div>

        {/* ===== MERGED EXECUTIVE OVERVIEW BAR (NO SEPARATE SIDEBAR) ===== */}
        {((guideInfo.famousFor && guideInfo.famousFor.length > 0) ||
          facts.length > 0 ||
          guideInfo.weatherSummary) && (
          <div className="mb-10 rounded-2xl bg-gradient-to-r from-slate-50 via-teal-50/20 to-orange-50/20 border border-slate-200/80 p-5 sm:p-6 lg:p-7 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Famous For & Key Highlights */}
              <div className="md:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E8B8B]">
                    Famous For
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(guideInfo.famousFor || []).map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-medium bg-white text-slate-800 border border-slate-200 shadow-2xs"
                    >
                      <Check className="w-3.5 h-3.5 text-[#2E8B8B] stroke-[2.5]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Facts / Regional Metrics */}
              <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-200/80 pt-4 md:pt-0 md:pl-6 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Quick Destination Facts
                </span>
                <div className="space-y-2 text-xs sm:text-[13px]">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-center justify-between text-slate-700"
                    >
                      <span className="text-slate-500 font-normal">
                        {fact.label}:
                      </span>
                      <span className="font-semibold text-slate-900 capitalize">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                  {guideInfo.weatherSummary && (
                    <div className="pt-1 text-slate-600 leading-snug">
                      <span className="text-slate-500 font-normal">
                        Climate:{" "}
                      </span>
                      <span className="text-slate-800 font-medium">
                        {guideInfo.weatherSummary.split(",")[0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== MAIN TRAVEL GUIDE BODY (SINGLE COHESIVE CARD) ===== */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-xs space-y-10">
          {/* 1. BEST TIME TO VISIT / SEASONS */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-[#2E8B8B]" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Best time to visit
              </h3>
            </div>

            {/* 4-Quadrant Season Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {guideInfo.seasons.map((season, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-4 sm:p-5 transition-all ${
                    season.isPeak
                      ? "bg-[#EBF7F6] border-2 border-[#2E8B8B]/40 shadow-xs"
                      : "bg-slate-50/70 border border-slate-200/80"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-[15px] sm:text-[16px] text-slate-900">
                      {season.months}
                    </span>
                    {season.isPeak && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#2E8B8B] text-white">
                        Best Time
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                    {season.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Important Seasonal Tip / Fog & Weather Advisory */}
            {guideInfo.advisoryNote && (
              <div className="mt-4 rounded-xl border-l-4 border-[#F8904D] bg-[#F8904D]/10 p-4 sm:p-5">
                <p className="text-xs sm:text-[13.5px] md:text-[14px] text-slate-700 leading-relaxed font-normal">
                  <span className="font-semibold text-slate-900">
                    Traveler Tip:{" "}
                  </span>
                  {guideInfo.advisoryNote}
                </p>
              </div>
            )}
          </div>

          <hr className="border-t border-slate-200/70" />

          {/* 2. WHAT TO WEAR & PACK */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shirt className="w-5 h-5 text-[#2E8B8B]" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                What to wear
              </h3>
            </div>
            <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed font-normal max-w-4xl">
              {guideInfo.whatToWear}
            </p>
          </div>

          <hr className="border-t border-slate-200/70" />

          {/* 3. THINGS TO DO ALONG THE WAY / CURATED HIGHLIGHTS */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-[#2E8B8B]" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Things to do along the way
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5">
              {guideInfo.thingsToDo.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#2E8B8B]/10 text-[#2E8B8B] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <p className="text-sm sm:text-[14.5px] text-slate-700 leading-relaxed">
                    <span className="font-semibold text-slate-900">
                      {item.title}
                    </span>{" "}
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. KEY ATTRACTIONS BADGES */}
          {guideInfo.attractions && guideInfo.attractions.length > 0 && (
            <>
              <hr className="border-t border-slate-200/70" />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-[#2E8B8B]" />
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    Key Attractions & Landmarks
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {guideInfo.attractions.map((att, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-lg text-xs sm:text-[13px] font-medium bg-slate-100 text-slate-800 border border-slate-200/80"
                    >
                      {att}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ===== 5. COMPREHENSIVE EDITORIAL GUIDE (EXPANDABLE ACCORDION FOR FULL RICH CONTENT & SEO) ===== */}
        {hasEditorialContent && (
          <div className="mt-8">
            <details className="group border border-slate-200/90 rounded-2xl bg-white shadow-xs overflow-hidden transition-all duration-200">
              <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer p-5 sm:p-6 bg-gradient-to-r from-amber-50/40 via-white to-orange-50/30 hover:from-amber-50/70 hover:to-orange-50/50 transition-colors select-none flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 min-w-0 pr-0 sm:pr-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#D4561A] bg-amber-100/80 px-2.5 py-0.5 rounded-full mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4561A]" />
                    In-Depth Destination Encyclopedia
                  </span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                    Everything About {state.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 mt-1 leading-relaxed">
                    Complete historical background, city guides, culture, dining
                    & practical advice curated by KoiKoi Travel specialists.
                  </p>
                </div>

                <div className="btn-primary shrink-0 self-start sm:self-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full shadow-xs flex items-center gap-1.5 transition-transform group-hover:scale-105 pointer-events-none">
                  <span className="group-open:hidden flex items-center gap-1.5">
                    Read Full In-Depth Guide <ChevronDown className="w-4 h-4" />
                  </span>
                  <span className="hidden group-open:flex items-center gap-1.5">
                    Hide In-Depth Guide <ChevronUp className="w-4 h-4" />
                  </span>
                </div>
              </summary>

              <div className="p-6 sm:p-8 md:p-10 border-t border-slate-100 bg-white">
                {hasSeoDesc && (
                  <RichContent
                    html={state.seoDescription!}
                    sharedLinkedHrefs={pageLinkedHrefs}
                    excludeHrefs={excludeHrefs}
                  />
                )}

                {hasMoreDesc && (
                  <RichContent
                    html={state.moreDescription!}
                    sharedLinkedHrefs={pageLinkedHrefs}
                    excludeHrefs={excludeHrefs}
                    className={hasSeoDesc ? "mt-8" : ""}
                  />
                )}
              </div>
            </details>
          </div>
        )}
      </div>
    </section>
  );
}
