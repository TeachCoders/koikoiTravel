"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
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
  },
  {
    title: "Rajasthan Tour Package",
    destinations: "Jaipur • Jodhpur • Udaipur | 7 Days",
    bullets: ["Royal forts & palaces", "Desert experiences", "Colorful local markets"],
    image: "/content/rajasthan-tours-holiday-1.webp",
    href: "/tour-packages/india/rajasthan",
  },
  {
    title: "Kashmir Holiday Package",
    destinations: "Srinagar • Gulmarg • Pahalgam | 6 Days",
    bullets: ["Mountain landscapes", "Breathtaking valleys", "Outdoor adventures"],
    image: "/content/srinagar-holiday-1.webp",
    href: "/tour-packages/india/jammu-and-kashmir",
  },
  {
    title: "Kerala Tour Package",
    destinations: "Kochi • Munnar • Alleppey | 6 Days",
    bullets: ["Backwaters & beaches", "Tea gardens & wildlife", "Houseboat experience"],
    image: "/content/jaipur-holiday-1.webp",
    href: "/tour-packages/india",
  },
  {
    title: "India Wildlife Tour",
    destinations: "National Parks • Tiger Safari | 6 Days",
    bullets: ["Tiger safaris", "Wildlife & nature", "Comfortable stays"],
    image: "/content/rajasthan-tours-holiday-2.webp",
    href: "/travel-experiences/wildlife",
  },
  {
    title: "India Honeymoon Package",
    destinations: "Romantic India | 7 Days",
    bullets: ["Romantic stays", "Private experiences", "Scenic destinations"],
    image: "/content/manali-holiday-1.webp",
    href: "/travel-experiences/honeymoon-packages",
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Explore Our Most Loved India Tours
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
            Wondering which India trip is right for you? Start with the journeys our travelers love most.
          </p>
        </div>

        {/* 6 Tour Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CURATED_BESTSELLERS.map((tour, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
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
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    <Link href={tour.href} className="hover:text-[#00A66E] transition-colors">
                      {tour.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {tour.destinations}
                  </p>

                  {/* Bullet Points */}
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                    {tour.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00A66E] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <Link
                    href={tour.href}
                    className="py-2.5 px-3 rounded-xl bg-[#00A66E] hover:bg-[#00915f] text-white text-xs sm:text-sm font-bold text-center transition-all shadow-sm"
                  >
                    View Tour
                  </Link>

                  <QuoteModal>
                    <button
                      type="button"
                      className="py-2.5 px-3 rounded-xl border border-slate-300 hover:border-[#00A66E] hover:text-[#00A66E] text-slate-700 text-xs sm:text-sm font-bold text-center transition-all cursor-pointer"
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
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#00A66E] text-[#00A66E] hover:bg-[#00A66E] hover:text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm"
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
