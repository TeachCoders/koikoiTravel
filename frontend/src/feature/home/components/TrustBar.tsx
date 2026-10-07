"use client";

import React from "react";
import { Sliders, UserCheck, ShieldCheck, Headphones } from "lucide-react";

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
    <section className="bg-white py-10 sm:py-12 border-b border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="text-center mb-8 sm:mb-10">
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
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-[#E6F6F0] text-[#00A66E] flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed max-w-[220px]">
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
