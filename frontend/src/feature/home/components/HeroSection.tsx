"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroSearchBar from "@/components/shared/HeroSearchBar";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { useHeroBanners } from "@/feature/heroBanner/api";

const DEFAULT_SLIDES = [
  { image: "/content/rajasthan-tours-holiday-1.webp", alt: "Rajasthan heritage tour" },
  { image: "/content/srinagar-holiday-1.webp", alt: "Srinagar Kashmir holiday" },
  { image: "/content/jaipur-holiday-1.webp", alt: "Jaipur royal heritage" },
  { image: "/content/manali-holiday-1.webp", alt: "Manali Himachal holiday" },
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

export const HeroSection: React.FC = () => {
  const { data: heroData } = useHeroBanners("Home");
  const slides = heroData?.data?.length
    ? heroData.data.map((b) => ({
        image: b.image,
        alt: b.altText || b.title || "Holiday tour banner",
      }))
    : DEFAULT_SLIDES;

  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full min-h-[380px] sm:min-h-[440px] md:min-h-[520px] py-10 sm:py-14 flex items-center justify-center bg-slate-900 z-20">
      {/* Background slider - clipped with overflow-hidden */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="relative w-full h-full shrink-0">
              <FallbackImage
                src={s.image}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                {...(!i ? {} : { loading: "eager" as const, decoding: "async" as const })}
                className="object-cover object-center"
                theme="dark"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25" />
      </div>

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full items-center justify-center text-white hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full items-center justify-center text-white hover:bg-white/20 transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-[#F8904D]"
                : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <div className="relative z-30 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 w-full text-center">
        <h1 className="font-luxury text-white text-xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight sm:tracking-normal leading-tight max-w-3xl mx-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] transition-all duration-700 block">
          Plan Your Dream India Trip With KoiKoi Travel
        </h1>

        <div className="mt-4 sm:mt-6 md:mt-8">
          <HeroSearchBar />

          {/* Quick Trending Destination Chips */}
          <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
