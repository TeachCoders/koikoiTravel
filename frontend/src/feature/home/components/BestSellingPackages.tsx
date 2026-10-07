"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { QuoteModal } from "@/components/shared/QuoteModal";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";

const CURATED_BESTSELLERS = [
  {
    title: "Golden Triangle Tour India",
    destinations: "Delhi • Agra • Jaipur | 5 Days",
    bullets: ["Iconic monuments", "Rich culture & history", "Local fabric experiences"],
    image: "/content/delhi-holiday-1.webp",
    href: "/tour-packages/india/golden-triangle",
    badge: "Most Popular",
  },
  {
    title: "Rajasthan Tour Package",
    destinations: "Jaipur • Jodhpur • Udaipur | 7 Days",
    bullets: ["Royal forts & palaces", "Desert experiences", "Colorful local markets"],
    image: "/content/rajasthan-tours-holiday-1.webp",
    href: "/tour-packages/india/rajasthan",
    badge: "Bestseller",
  },
  {
    title: "Kashmir Holiday Package",
    destinations: "Srinagar • Gulmarg • Pahalgam | 6 Days",
    bullets: ["Mountain landscapes", "Breathtaking valleys", "Outdoor adventures"],
    image: "/content/srinagar-holiday-1.webp",
    href: "/tour-packages/india/jammu-and-kashmir",
    badge: "Scenic Paradise",
  },
  {
    title: "Kerala Tour Package",
    destinations: "Kochi • Munnar • Alleppey | 6 Days",
    bullets: ["Backwaters & beaches", "Tea gardens & wildlife", "Houseboat experience"],
    image: "/content/jaipur-holiday-1.webp",
    href: "/tour-packages/india",
    badge: "Backwaters & Hills",
  },
  {
    title: "India Wildlife Tour",
    destinations: "National Parks • Tiger Safari | 6 Days",
    bullets: ["Tiger safaris", "Wildlife & nature", "Comfortable stays"],
    image: "/content/rajasthan-tours-holiday-2.webp",
    href: "/travel-experiences/wildlife",
    badge: "Wildlife Safari",
  },
  {
    title: "India Honeymoon Package",
    destinations: "Romantic India | 7 Days",
    bullets: ["Romantic stays", "Private experiences", "Scenic destinations"],
    image: "/content/manali-holiday-1.webp",
    href: "/travel-experiences/honeymoon-packages",
    badge: "Romantic Escape",
  },
];

export const BestSellingPackages: React.FC<{
  initialJourneys?: JourneyPage<Journey> | null;
}> = () => {
  return (
    <section id="packages" className="py-12 sm:py-16 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F8904D] mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Best-Selling Tours
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Explore Our Most Loved India Tours
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
            Wondering which India trip is right for you? Start with the journeys our travelers love most.
          </p>
        </div>

        {/* 6 Tour Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CURATED_BESTSELLERS.map((tour, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#F8904D]/40 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <FallbackImage
                  src={tour.image}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider border border-white/10">
                    {tour.badge}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#2E8B8B] transition-colors leading-snug">
                    <Link href={tour.href}>
                      {tour.title}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#F8904D] shrink-0" />
                    <span>{tour.destinations}</span>
                  </div>

                  {/* Bullet Points */}
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                    {tour.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E8B8B] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <Link
                    href={tour.href}
                    className="py-2.5 px-3 rounded-xl border border-slate-300 hover:border-[#2E8B8B] hover:text-[#2E8B8B] text-slate-700 text-xs sm:text-sm font-bold text-center transition-all"
                  >
                    View Tour
                  </Link>

                  <QuoteModal>
                    <button
                      type="button"
                      className="py-2.5 px-3 rounded-xl bg-[#F8904D] hover:bg-[#e07b3b] text-white text-xs sm:text-sm font-bold text-center shadow-md shadow-[#F8904D]/30 active:scale-95 transition-all cursor-pointer"
                    >
                      Get Quote
                    </button>
                  </QuoteModal>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/tour-packages"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base tracking-wide shadow-md transition-all active:scale-95"
          >
            <span>EXPLORE ALL INDIA TOURS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellingPackages;
