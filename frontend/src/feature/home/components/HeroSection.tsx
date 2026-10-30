"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSlider from "@/components/shared/HeroSlider";
import { ImageWatermark } from "@/components/shared/ImageWatermark";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { useHeroBanners } from "@/feature/heroBanner/api";
import type { HeroFullBanner } from "@/feature/heroBanner/type";

interface HeroSectionProps {
  initialHeroBanners?: HeroFullBanner[] | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ initialHeroBanners }) => {
  const { data: heroBannersData } = useHeroBanners("Home", {
    enabled: !initialHeroBanners || initialHeroBanners.length === 0,
  });

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
        mobileImage: b.mobileImage || null,
        alt: b.altText || b.title || "Tailor-Made India Tours - KoiKoi Travel",
      }));
    }
    return [];
  }, [banners]);

  const hasSlides = slides.length > 0;

  return (
    <section
      className={`relative w-full h-[62vw] min-h-[280px] max-h-[480px] md:h-[31.25vw] md:min-h-[380px] md:max-h-[560px] flex items-center justify-center ${
        hasSlides ? "bg-slate-900" : "bg-slate-100"
      } z-20 overflow-hidden`}
    >
      {/* Background slider with same slide effect as Golden Triangle inner banner */}
      {hasSlides ? (
        <>
          <HeroSlider slides={slides} alt="KoiKoi Travel" interval={6000} />
          {/* Exact same gradient overlay as Golden Triangle / StateDetail banner */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent z-10 pointer-events-none" />
        </>
      ) : (
        <div className="absolute inset-0">
          <ImageWatermark />
        </div>
      )}

      <div className="relative z-30 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 w-full text-left font-outfit pointer-events-none">
        {/* Eyebrow Tag matching inner hero section */}
        <div className="mb-2.5 sm:mb-3">
          <div
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-xs pointer-events-auto ${
              hasSlides
                ? "bg-slate-950/60 backdrop-blur-md border border-white/20 text-white"
                : "bg-white/95 border border-slate-300 text-slate-800"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F8904D] shadow-[0_0_8px_#F8904D]" />
            <span className="font-luxury font-bold text-[11px] sm:text-xs md:text-[13px] uppercase tracking-[0.22em] select-none">
              Private Journeys Across India
            </span>
          </div>
        </div>

        {/* Main H1 Heading for Rock-Solid SEO & Search Engine Hierarchy */}
        <h1
          className={`font-luxury text-xl leading-snug sm:text-3xl md:text-5xl lg:text-[52px] font-black tracking-tight max-w-4xl ${
            hasSlides
              ? "text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
              : "text-slate-900 drop-shadow-xs"
          }`}
        >
          <span>Making every Journey</span>
          <span className="block mt-0.5 sm:mt-1.5 sm:whitespace-nowrap">
            <span className="text-[#F8904D]">Memorable</span> — KoiKoi Travel
          </span>
        </h1>

        {/* Short Subtitle */}
        <p
          className={`hidden sm:block font-outfit text-[15px] sm:text-base md:text-lg lg:text-[19px] max-w-3xl mt-3 sm:mt-4 leading-relaxed font-medium ${
            hasSlides
              ? "text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
              : "text-slate-600"
          }`}
        >
          Handcrafted private journeys across India, thoughtfully tailored to your style and pace.
        </p>

        {/* Dual Primary Call-to-Actions */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-start gap-2.5 sm:gap-3.5 pointer-events-auto">
          <Link
            href="/destinations"
            className="font-outfit px-5 sm:px-6 py-2.5 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-semibold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <span>Explore Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <QuoteModal>
            <button
              type="button"
              className={`font-outfit px-5 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer ${
                hasSlides
                  ? "bg-white hover:bg-slate-100 text-slate-900"
                  : "bg-slate-900 hover:bg-slate-800 text-white"
              }`}
            >
              <span>Plan My Trip</span>
            </button>
          </QuoteModal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
