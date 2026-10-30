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

  return (
    <HeroBanner
      slides={slides}
      align="left"
      gradient="left-and-bottom"
      tag="Private Journeys Across India"
      alt="KoiKoi Travel"
      interval={7000}
      title={
        <h1 className="font-luxury text-xl leading-snug sm:text-3xl md:text-5xl lg:text-[52px] font-black tracking-tight max-w-4xl text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
          <span>Making every Journey</span>
          <span className="block mt-0.5 sm:mt-1.5 sm:whitespace-nowrap">
            <span className="text-[#F8904D]">Memorable</span> — KoiKoi Travel
          </span>
        </h1>
      }
      subtitle="Handcrafted private journeys across India, thoughtfully tailored to your style and pace."
    >
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
            className="font-outfit px-5 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer bg-white hover:bg-slate-100 text-slate-900"
          >
            <span>Plan My Trip</span>
          </button>
        </QuoteModal>
      </div>
    </HeroBanner>
  );
};

export default HeroSection;
