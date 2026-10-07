"use client";

import React from "react";
import { Sliders, Compass, ShieldCheck, Headphones } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Sliders,
    title: "Custom Itineraries",
    description: "Trips designed around you",
  },
  {
    icon: Compass,
    title: "Local Travel Experts",
    description: "Real destination knowledge",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    description: "No confusing hidden costs",
  },
  {
    icon: Headphones,
    title: "Personal Trip Support",
    description: "Help before and during your journey",
  },
];

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-slate-50 border-b border-slate-200/80 py-8 sm:py-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-[#F8904D] font-bold text-[11px] sm:text-xs uppercase tracking-widest block mb-1">
            Trust & Transparency
          </span>
          <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-slate-900 tracking-tight">
            Why Travelers Choose KoiKoi Travel
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/70 shadow-sm hover:shadow-md hover:border-[#F8904D]/30 transition-all flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2E8B8B]/10 text-[#2E8B8B] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;

