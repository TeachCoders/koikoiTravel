"use client";

import React from "react";
import { ROYAL_EXPERIENCE_PILLARS } from "../data/luxuryTrainsData";
import { Crown, Utensils, UserCheck, Compass, Wine, Sparkles } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  crown: Crown,
  utensils: Utensils,
  "user-check": UserCheck,
  compass: Compass,
  wine: Wine,
  sparkles: Sparkles,
};

export default function RoyalExperienceSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F8904D]/10 text-[#e07b3b] text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F8904D]" />
            <span>The Art of Royal Hospitality</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            An Unrivaled Standard of Sovereign Luxury
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Every moment aboard India&apos;s luxury trains is curated to reflect the extravagance of princely India,
            combined with modern 5-star conveniences and personalized care.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROYAL_EXPERIENCE_PILLARS.map((pillar, idx) => {
            const Icon = ICON_MAP[pillar.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="group p-6 sm:p-8 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-[#F8904D]/50 hover:bg-white hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-[#F8904D] mb-5 shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F8904D] block mb-1">
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#F8904D] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Complimentary onboard privilege</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
