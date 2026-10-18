"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import HeroSearchBar from "@/components/shared/HeroSearchBar";
import { FallbackImage } from "@/components/shared/FallbackImage";
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
        {activeSlide?.title && (
          <div className="mb-2.5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium shadow-sm transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-[#F8904D] inline-block animate-pulse" />
            <span>{activeSlide.title}</span>
            {activeSlide.subtitle && (
              <span className="text-white/75">• {activeSlide.subtitle}</span>
            )}
          </div>
        )}

        <h1 className="font-luxury text-white text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight sm:tracking-normal leading-tight max-w-4xl mx-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] block">
          Tailor-Made India Tours by <span className="text-[#F8904D]">Your Trusted Inbound Tour Operator</span>
        </h1>

        <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-2.5 sm:mt-3 leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          Discover India with KoiKoi Travel. Personalized private holidays with verified chauffeurs, handpicked stays, and dedicated 24/7 on-trip assistance across Rajasthan, Kerala, South India, and the Golden Triangle.
        </p>

        {/* Dual Primary Call-to-Actions */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          <Link
            href="/tour-packages/india"
            className="px-5 sm:px-6 py-2.5 rounded-full bg-[#F8904D] hover:bg-[#e07f40] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <span>Explore Tour Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={`https://wa.me/919136739178?text=${encodeURIComponent("Hi KoiKoi Travel, I would like to plan a custom India tour package.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 sm:px-6 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30 font-semibold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366] shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29" />
            </svg>
            <span>Get Custom Itinerary on WhatsApp</span>
          </a>
        </div>

        <div className="mt-4 sm:mt-5">
          <HeroSearchBar />

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
