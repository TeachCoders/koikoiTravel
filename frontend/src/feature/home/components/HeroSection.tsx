"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroBanner from "@/components/shared/HeroBanner";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { useHeroBanners } from "@/feature/heroBanner/api";
import type { HeroFullBanner } from "@/feature/heroBanner/type";

interface HeroSectionProps {
  initialHeroBanners?: HeroFullBanner[] | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ initialHeroBanners }) => {
  const { data: heroBannersData } = useHeroBanners("Home", {
    enabled: true,
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

  return (
    <HeroBanner
      slides={slides}
      align="left"
      tag="Private luxury & group tours"
      alt="KoiKoi Travel"
      interval={7000}
      title={
        <div className="font-luxury text-xl sm:text-4xl md:text-5xl md:leading-[1.1] lg:text-[56px] lg:leading-[1.1] max-w-4xl text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          <span className="block">We plan it like</span>
          <span className="block sm:whitespace-nowrap">
            It’s our own trip in India
          </span>
        </div>
      }
      subtitle={
        <p className="hidden sm:block mt-3 sm:mt-4 text-[15px] sm:text-lg md:text-xl lg:text-[22px] max-w-3xl font-semibold leading-snug sm:leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          Private luxury journeys and small-group tours across India, crafted with care and a personal trip manager by your side.
        </p>
      }
      // subtitle="Handcrafted private journeys across India, thoughtfully tailored to your style and pace."
    >
      {/* Dual Primary Call-to-Actions */}
      <div className="mt-3.5 sm:mt-6 flex flex-wrap items-center justify-start gap-2 sm:gap-3.5 pointer-events-auto">
        <Link
          href="/destinations/india"
          className="font-outfit px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-semibold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-1.5 sm:gap-2"
        >
          <span>Explore Destinations</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Link>

        <QuoteModal>
          <button
            type="button"
            className="font-outfit px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-1.5 sm:gap-2 cursor-pointer bg-white hover:bg-slate-100 text-slate-900"
          >
            <span>Plan My Trip</span>
          </button>
        </QuoteModal>
      </div>
    </HeroBanner>
  );
};

export default HeroSection;
