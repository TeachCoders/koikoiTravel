"use client";

import React from "react";
import { Sliders, UserCheck, ShieldCheck, Headphones, Sparkles } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Sliders,
    title: "Custom Itineraries",
    description: "Trips designed around you",
  },
  {
    icon: UserCheck,
    title: "Local Travel Experts",
    description: "Real destination knowledge",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    description: "No hidden costs",
  },
  {
    icon: Headphones,
    title: "Personal Trip Support",
    description: "Help before & during your journey",
  },
];

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-slate-50/80 py-10 sm:py-12 border-b border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F8904D] mb-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Trust & Excellence
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Why Travelers Choose KoiKoi Travel
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#F8904D]/30 transition-all flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#2E8B8B]/10 text-[#2E8B8B] flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed max-w-[220px]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
