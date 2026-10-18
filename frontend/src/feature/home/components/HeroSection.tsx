"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { useHeroBanners } from "@/feature/heroBanner/api";
import type { HeroFullBanner } from "@/feature/heroBanner/type";

const DEFAULT_SLIDES = [
  { image: "/content/rajasthan-tours-holiday-1.webp", alt: "Rajasthan royal heritage tour" },
  { image: "/content/srinagar-holiday-1.webp", alt: "Srinagar Kashmir mountain holiday" },
  { image: "/content/jaipur-holiday-1.webp", alt: "Jaipur cultural heritage tour" },
  { image: "/content/manali-holiday-1.webp", alt: "Manali Himachal holiday package" },
];

const TRENDING_CHIPS = [
  { label: "Golden Triangle", href: "/travel-experiences/golden-triangle" },
  { label: "Rajasthan", href: "/tour-packages/india/rajasthan" },
  { label: "Kerala", href: "/tour-packages/india/kerala" },
  { label: "Ladakh", href: "/tour-packages/india/ladakh" },
  { label: "Tamilnadu", href: "/tour-packages/india/tamil-nadu" },
  { label: "Goa", href: "/tour-packages/india/goa" },
  { label: "Mumbai", href: "/tour-packages/india/maharashtra/mumbai" },
  { label: "Wildlife", href: "/travel-experiences/wildlife" },
  { label: "Honeymoon", href: "/travel-experiences/honeymoon" },
];

interface HeroSectionProps {
  initialHeroBanners?: HeroFullBanner[] | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ initialHeroBanners }) => {
  const { data: heroBannersData } = useHeroBanners("Home");

  const banners = useMemo(() => {
    if (heroBannersData?.data && heroBannersData.data.length > 0) {
      return heroBannersData.data;
    }
    if (initialHeroBanners && initialHeroBanners.length > 0) {
      return initialHeroBanners;
    }
    return [];
  }, [heroBannersData?.data, initialHeroBanners]);

  const slides = useMemo(() => {
    if (banners.length > 0) {
      return banners.map((b) => ({
        image: b.image,
        alt: b.altText || b.title || "Tailor-Made India Tours - KoiKoi Travel",
        title: b.title || null,
        subtitle: b.subtitle || null,
      }));
    }
    return DEFAULT_SLIDES.map((s) => ({
      image: s.image,
      alt: s.alt,
      title: null as string | null,
      subtitle: null as string | null,
    }));
  }, [banners]);

  const [current, setCurrent] = useState(0);

  // Reset to first slide if slides list changes
  useEffect(() => {
    setCurrent(0);
  }, [slides.length]);

  const next = useCallback(() => {
    if (slides.length <= 1) return;
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    if (slides.length <= 1) return;
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Automatic slide rotation
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  const safeCurrent = slides.length > 0 ? current % slides.length : 0;
  const activeSlide = slides[safeCurrent];

  return (
    <section className="relative w-full min-h-[420px] sm:min-h-[480px] md:min-h-[560px] py-10 sm:py-14 flex items-center justify-center bg-slate-900 z-20">
      {/* Background slider with permanent Slide 0 for rock-solid LCP performance */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base Slide 0: Always in DOM at z-0 with full opacity for instant LCP detection */}
        <div className="absolute inset-0 z-0" key={slides[0]?.image || "slide-0"}>
          <FallbackImage
            src={slides[0]?.image}
            alt={slides[0]?.alt || "KoiKoi Travel Hero Banner"}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
            className="object-cover object-center"
            quality={80}
          />
        </div>

        {/* Subsequent slides 1..N: Crossfade on top (z-10) when active */}
        {slides.slice(1).map((s, index) => {
          const slideIndex = index + 1;
          const isActive = safeCurrent === slideIndex;
          return (
            <div
              key={s.image || slideIndex}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <FallbackImage
                src={s.image}
                alt={s.alt || `Slide ${slideIndex + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
                className="object-cover object-center"
                quality={80}
              />
            </div>
          );
        })}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 z-10 pointer-events-none" />
      </div>

      {/* Navigation arrows (desktop) - only when multiple slides */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Bottom slide indicator dots with touch-friendly 44px hit-target */}
      {slides.length > 1 && (
        <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="p-2.5 flex items-center justify-center cursor-pointer focus:outline-none"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === safeCurrent
                    ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-[#F8904D]"
                    : "w-2 sm:w-2.5 h-1.5 sm:h-2 bg-white/60 hover:bg-white"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      <div className="relative z-30 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 w-full text-center">
        {/* Eyebrow Tag matching reference image */}
        <div className="mb-2.5 sm:mb-3">
          <span className="text-white/90 text-[11px] sm:text-xs md:text-[13px] font-bold uppercase tracking-[0.2em] px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 inline-block drop-shadow-sm select-none">
            Private Journeys Across India
          </span>
        </div>

        {/* Main Heading requested by user */}
        <h1 className="font-luxury text-white text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] block">
          Your Journey, Your Trusted <span className="text-[#F8904D]">Customize Tour Operator</span> — KoiKoi Travel
        </h1>

        {/* Short Subtitle matching reference length */}
        <p className="text-white/95 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-2.5 sm:mt-3 leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          Custom journeys across India and Asia, planned around your interests, pace and travel dates.
        </p>

        {/* Dual Primary Call-to-Actions matching reference image with KoiKoi theme */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          <Link
            href="/destinations"
            className="px-5 sm:px-6 py-2.5 rounded-full bg-[#2E8B8B] hover:bg-[#257272] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-teal-950/40 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <span>Explore Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <QuoteModal>
            <button
              type="button"
              className="px-5 sm:px-6 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm shadow-lg shadow-black/20 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Plan My Trip</span>
            </button>
          </QuoteModal>
        </div>

        {/* Rating and Experience Badges matching reference image */}
        <div className="mt-3.5 sm:mt-4 flex items-center justify-center gap-2 text-white text-xs sm:text-[13px] font-semibold drop-shadow-md select-none">
          <span className="text-amber-400 tracking-wider text-sm">★★★★★</span>
          <span className="font-bold">4.9/5 Traveller Rating</span>
          <span className="text-white/40">|</span>
          <span className="text-white/90">7+ Years Experience</span>
        </div>

        <div className="mt-4 sm:mt-5">
          {/* Quick Trending Destination Chips */}
          <div className="mt-3 sm:mt-3.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span className="text-white/80 text-[11px] sm:text-xs font-semibold uppercase tracking-wider select-none mr-0.5">
              Trending:
            </span>
            {TRENDING_CHIPS.map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="px-3 py-1 rounded-full text-xs font-medium text-white/90 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 hover:border-[#F8904D] hover:text-[#F8904D] transition-all hover:scale-105 active:scale-95 shadow-sm inline-flex items-center"
              >
                {chip.label}
              </Link>
            ))}
          </div>

          {/* Verified Trust Points Above the Fold */}
          <div className="mt-4 sm:mt-5 pt-3.5 border-t border-white/15 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-white/90 text-[11.5px] sm:text-xs md:text-[12.5px] font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px] font-bold">✓</span>
              100% Tailored Itineraries
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px] font-bold">✓</span>
              Verified Private Chauffeurs
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px] font-bold">✓</span>
              Transparent Fixed Quotes
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px] font-bold">✓</span>
              24/7 Dedicated Support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
