"use client";

import React from "react";
import { Car, Hotel, SlidersHorizontal, Headphones } from "lucide-react";

export interface ServiceHighlightItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DEFAULT_HIGHLIGHTS: ServiceHighlightItem[] = [
  {
    icon: <Car className="w-5 h-5 text-[#2E8B8B]" />,
    title: "Private Cab & Chauffeur",
    description: "Dedicated AC vehicle for doorstep pickups & sightseeing",
  },
  {
    icon: <Hotel className="w-5 h-5 text-[#2E8B8B]" />,
    title: "Handpicked Verified Stays",
    description: "Carefully vetted heritage, boutique & premium hotels",
  },
  {
    icon: <SlidersHorizontal className="w-5 h-5 text-[#2E8B8B]" />,
    title: "100% Tailor-Made Itinerary",
    description: "Customize cities, nights & pacing as per your preference",
  },
  {
    icon: <Headphones className="w-5 h-5 text-[#2E8B8B]" />,
    title: "24/7 On-Trip Assistance",
    description: "Dedicated trip coordinator supporting you end-to-end",
  },
];

interface ServiceHighlightsProps {
  items?: ServiceHighlightItem[];
  className?: string;
}

export default function ServiceHighlights({
  items = DEFAULT_HIGHLIGHTS,
  className = "",
}: ServiceHighlightsProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 ${className}`}
      aria-label="KoiKoi Travel Service Highlights"
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] flex items-start gap-3 transition-all hover:border-[#2E8B8B]/40 hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-lg bg-[#2E8B8B]/10 flex items-center justify-center shrink-0">
            {item.icon}
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-slate-900 text-xs sm:text-sm tracking-tight leading-snug">
              {item.title}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-0.5 line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
