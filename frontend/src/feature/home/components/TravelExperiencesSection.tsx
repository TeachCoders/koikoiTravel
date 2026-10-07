"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { useGetTravelExperiences } from "@/feature/travelExperience/api/useTravelExperience";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import { resolveExperienceTheme } from "@/feature/travelExperience/theme";
import { stripHtml } from "@/lib/utils";
import type { TravelExperience, PaginatedResponse as ExperiencePage } from "@/feature/travelExperience/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";

export const TravelExperiencesSection: React.FC<{
  initialExperiences?: ExperiencePage<TravelExperience> | null;
  initialJourneys?: JourneyPage<Journey> | null;
}> = ({ initialExperiences, initialJourneys }) => {
  const { travelExperiences, isLoading } = useGetTravelExperiences(
    {
      limit: 100,
      isActive: "true",
    },
    initialExperiences
  );
  const { journeys } = useGetJourneys(
    {
      limit: 100,
      isActive: "true",
    },
    initialJourneys
  );

  const experiences = travelExperiences.filter(
    (e: any) => !/^test\b/i.test(e.title || "")
  );

  const tourCount = (id: number) =>
    journeys.filter((j: any) =>
      (j.travelExperiences || []).some((e: any) => e.id === id)
    ).length;

  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, experiences.length]);

  const handleScroll = (direction: "left" | "right") => {
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth * 0.75; // Scroll approx 3/4th screen or 3-4 cards
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="experiences" className="py-8 sm:py-10 md:py-12 bg-white relative border-t border-slate-100 shadow-[inset_0_15px_20px_-15px_rgba(0,0,0,0.06)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header with Title & Arrow Slider Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 sm:mb-8">
          <div>
            <SectionLabel>Travel Experiences & Activities</SectionLabel>
            <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-slate-900 tracking-tight mt-1.5">Explore by Travel Experience & Vibe</h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1.5 max-w-xl">
              From cultural heritage tours & wildlife jungle safaris to spiritual yatras & romantic getaways — discover curated travel activities tailored to your passion.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Prev / Next Slider Navigation Buttons */}
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xs cursor-pointer"
              aria-label="Previous Experiences"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xs cursor-pointer"
              aria-label="Next Experiences"
            >
              <ChevronRight size={20} />
            </button>

            {/* View All Button */}
            <Link href="/travel-experiences" className="hidden sm:inline-block ml-2">
              <button className="btn-outline">
                <span>View All ({experiences.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>

        {/* Carousel / Slider Container */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-slate-50 animate-pulse h-[340px] border border-slate-100"
              />
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <p className="text-center text-slate-400 py-12">No travel experiences yet.</p>
        ) : (
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-2 -mx-2 px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {experiences.map((exp: any) => {
              const theme = resolveExperienceTheme(exp.title);
              const count = tourCount(exp.id);
              return (
                <Link
                  key={exp.id}
                  href={`/travel-experiences/${exp.slug}`}
                  className={`w-[85%] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] shrink-0 snap-start group relative rounded-2xl bg-gradient-to-b ${theme.bgGradient} border border-slate-200/90 p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between items-center text-center select-none`}
                >
                  {/* Top Illustration (Direct on card gradient, no inner border) */}
                  <div className="w-full h-32 sm:h-36 flex items-center justify-center relative pt-1">
                    {/* Tour Count Pill */}
                    {count > 0 && (
                      <div className="absolute top-0 right-0 z-10">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-white/95 backdrop-blur-xs border border-slate-200 text-slate-700 shadow-2xs">
                          {count} Tours
                        </span>
                      </div>
                    )}

                    {/* Animated / Hover Zoom Cartoon Illustration */}
                    <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-out">
                      {theme.illustration}
                    </div>
                  </div>

                  {/* Middle Text Info (Klook font sizes & weights) */}
                  <div className="pt-4 flex-1 flex flex-col items-center">
                    <h3 className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#F8904D] transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 font-normal mt-1.5 line-clamp-2 leading-relaxed max-w-[260px]">
                      {stripHtml(exp.overView || exp.description || "Discover hand-crafted holiday itineraries designed for your unique travel style.")}
                    </p>
                  </div>

                  {/* Bottom Action Button (Klook Outline Style) */}
                  <div className="mt-5 w-full flex justify-center">
                    <span className="px-4 py-1.5 rounded-full text-xs sm:text-[12.5px] font-medium border border-slate-900 text-slate-900 bg-white/80 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all shadow-xs inline-flex items-center justify-center gap-1.5">
                      <span>{theme.ctaText || "Explore Tours"}</span>
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TravelExperiencesSection;
