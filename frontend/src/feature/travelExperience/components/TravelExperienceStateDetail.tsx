"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  MapPin,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Compass,
} from "lucide-react";
import HeroSlider from "@/components/shared/HeroSlider";
import { FallbackImage } from "@/components/shared/FallbackImage";
import TourPackageCard from "@/components/shared/TourPackageCard";
import type { TravelExperience } from "@/feature/travelExperience/type";
import type { State } from "@/feature/state/type";
import type { Journey } from "@/feature/journey/type";

interface Props {
  experience: TravelExperience;
  state: State;
  journeys: Journey[];
}

export default function TravelExperienceStateDetail({
  experience,
  state,
  journeys,
}: Props) {
  const cleanExpTitle = useMemo(() => {
    const raw = experience.title || experience.h1Title || "";
    return raw
      .replace(/\s+(?:tours?|tour packages)\s*(?:in\s+)?(?:india)?$/i, "")
      .replace(/\s*\(.*?\)\s*/g, " ")
      .trim() || raw;
  }, [experience.title, experience.h1Title]);

  const cleanStateTitle = useMemo(() => {
    return (state.h1Title || state.title || "")
      .replace(/\s*Tours?(\s*Packages?)?$/i, "")
      .trim();
  }, [state.title, state.h1Title]);

  const pageTitle = `${cleanExpTitle} Tours in ${cleanStateTitle}`;
  const heroImage =
    state.thumbImg ||
    experience.thumbImg ||
    journeys[0]?.thumbImg ||
    "/hero-banners/tajmahal-sunrise.webp";

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* ===== HERO ===== */}
      <section className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <FallbackImage
            src={heroImage}
            alt={pageTitle}
            fill
            priority
            className="object-cover object-center"
            theme="dark"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/70 pointer-events-none" />
        </div>

        <div className="relative z-20 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 h-full flex flex-col justify-center items-center py-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 mb-3 sm:mb-4 shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F8904D] shadow-[0_0_8px_#F8904D]" />
            <span className="font-luxury font-bold text-xs sm:text-sm uppercase tracking-[0.22em] text-[#FFD9A8]">
              {cleanStateTitle} • Handcrafted Themes
            </span>
          </div>

          <h1 className="font-luxury text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white leading-tight tracking-wide drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            {pageTitle}
          </h1>

          <p className="mt-4 text-white/90 text-sm sm:text-base max-w-2xl leading-relaxed font-normal drop-shadow-sm">
            Handpicked {cleanExpTitle.toLowerCase()} itineraries in {cleanStateTitle} with private AC chauffeur, verified local guides, and bespoke stays.
          </p>
        </div>
      </section>

      {/* ===== BREADCRUMB (BELOW HERO) ===== */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xs">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-3 flex flex-wrap items-center gap-1.5 text-[13px] text-slate-500 font-medium">
          <Link href="/" className="hover:text-[#F8904D] transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight size={13} className="text-slate-300 shrink-0" />
          <Link href="/travel-experiences" className="hover:text-[#F8904D] transition-colors shrink-0">
            Travel Experiences
          </Link>
          <ChevronRight size={13} className="text-slate-300 shrink-0" />
          <Link
            href={`/travel-experiences/${experience.slug}`}
            className="hover:text-[#F8904D] transition-colors shrink-0"
          >
            {experience.title}
          </Link>
          <ChevronRight size={13} className="text-slate-300 shrink-0" />
          <span className="text-slate-900 font-semibold">{cleanStateTitle}</span>
        </div>
      </nav>

      {/* ===== SEO INTRO SECTION (Pure white background) ===== */}
      <section className="bg-white border-b border-slate-100 py-8 sm:py-10 md:py-12">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F8904D]">
              <Sparkles size={13} /> Curated {cleanExpTitle} Itineraries
            </span>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              Best {cleanExpTitle} Holiday Packages in <span className="text-[#F8904D]">{cleanStateTitle}</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-2">
              Discover the unmatched allure of {cleanStateTitle} with our specially designed {cleanExpTitle.toLowerCase()} packages. Every itinerary is fully private, customizable, and backed by 24/7 dedicated trip support with honest pricing and no hidden costs.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PACKAGES GRID SECTION ===== */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-10 sm:py-14 space-y-8">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
              Available Tour Packages
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Showing {journeys.length} handcrafted {cleanExpTitle.toLowerCase()} itineraries in {cleanStateTitle}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
            {journeys.length} Packages
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {journeys.map((j) => (
            <TourPackageCard key={j.id} journey={j} />
          ))}
        </div>

        {/* ===== CROSS LINKING BAR ===== */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-slate-900">
              Looking for more travel options?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore other destinations for {cleanExpTitle} or browse all tour packages across {cleanStateTitle}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/travel-experiences/${experience.slug}`}
              className="px-5 py-2.5 rounded-full border border-slate-300 hover:border-slate-900 text-slate-800 text-xs sm:text-sm font-semibold transition-all hover:bg-slate-50 flex items-center gap-1.5"
            >
              <span>All {cleanExpTitle} Tours</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              href={`/tour-packages/india/${state.slug}`}
              className="px-5 py-2.5 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <Compass size={14} />
              <span>All {cleanStateTitle} Tours</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

