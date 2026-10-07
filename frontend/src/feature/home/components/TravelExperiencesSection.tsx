"use client";

import React from "react";
import { Sparkles, ArrowRight, Crown, Compass } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { useGetTravelExperiences } from "@/feature/travelExperience/api/useTravelExperience";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import { resolveExperienceTheme, FALLBACK_IMAGE } from "@/feature/travelExperience/theme";
import { stripHtml } from "@/lib/utils";
import { FallbackImage } from "@/components/shared/FallbackImage";
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

  return (
    <section id="experiences" className="py-20 bg-white relative shadow-[inset_0_15px_20px_-15px_rgba(0,0,0,0.06)]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel>Curated Travel Styles</SectionLabel>
            <h2 className="h2 text-[#1C1C1C] mt-2">Travel Built Around Your Vibe</h2>
            <p className="mt-2 text-base text-[#555] max-w-xl">
              From peaceful hill stations to mountain adventures, pick the trip style that fits you best.
            </p>
          </div>
          <Link href="/travel-experiences">
            <button className="btn-outline px-5 py-2.5 text-sm font-medium flex items-center gap-2">
              <span>View All Experiences</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl bg-slate-50 animate-pulse h-[340px] border border-slate-100"
              />
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <p className="text-center text-slate-400 py-16">No travel experiences yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.slice(0, 6).map((exp: any) => {
              const theme = resolveExperienceTheme(exp.title);
              const count = tourCount(exp.id);
              return (
                <Link
                  key={exp.id}
                  href={`/travel-experiences/${exp.slug}`}
                  className="group relative rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between items-center text-center select-none"
                >
                  {/* Top Cartoon Illustration Container */}
                  <div className={`w-full h-40 rounded-2xl bg-gradient-to-b ${theme.bgGradient} flex items-center justify-center relative overflow-hidden p-3 border border-slate-100`}>
                    {/* Top Tag / Pill */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border shadow-xs ${theme.tagColor}`}>
                        {theme.icon}
                        <span>{theme.tag}</span>
                      </span>
                    </div>

                    {/* Tour Count Pill */}
                    {count > 0 && (
                      <div className="absolute top-2.5 right-2.5 z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-white/90 backdrop-blur-xs border border-slate-200 text-slate-700 shadow-2xs">
                          {count} Tours
                        </span>
                      </div>
                    )}

                    {/* Animated / Hover Zoom Cartoon Illustration */}
                    <div className="w-full h-full flex items-center justify-center group-hover:scale-108 transition-transform duration-500 ease-out">
                      {theme.illustration}
                    </div>
                  </div>

                  {/* Middle Text Info */}
                  <div className="pt-4 flex-1 flex flex-col items-center">
                    <h3 className="font-heading text-lg sm:text-[19px] font-bold text-slate-900 leading-snug group-hover:text-[#F8904D] transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-500 mt-2 line-clamp-2 leading-relaxed max-w-xs">
                      {stripHtml(exp.overView || exp.description || "Discover hand-crafted holiday itineraries designed for your unique travel style.")}
                    </p>
                  </div>

                  {/* Bottom Action Button (Klook Style) */}
                  <div className="mt-5 w-full">
                    <span className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border border-slate-300 text-slate-800 bg-white group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all shadow-xs inline-flex items-center justify-center gap-1.5">
                      <span>{theme.ctaText || "Explore Tours"}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
