"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { QuoteModal } from "@/components/shared/QuoteModal";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";

const CURATED_BESTSELLERS = [
  {
    title: "Golden Triangle Tour India",
    destinations: "Delhi • Agra • Jaipur",
    description:
      "See India's most iconic destinations with a comfortable private journey designed around your pace.",
    image: "/content/taj-mahal-holiday-1.webp",
    href: "/tour-packages/3-days-delhi-agra-private-tour-with-tajmahal",
    badge: "Most Popular",
    duration: "3 to 5 Days",
  },
  {
    title: "Rajasthan Tour Package",
    destinations: "Jaipur • Jodhpur • Udaipur",
    description:
      "Experience royal cities, colorful markets, desert adventures, beautiful forts, and unforgettable local experiences.",
    image: "/content/rajasthan-tours-holiday-1.webp",
    href: "/tour-packages/india/rajasthan",
    badge: "Bestseller",
    duration: "7 to 10 Days",
  },
  {
    title: "Kashmir Holiday Package",
    destinations: "Srinagar • Gulmarg • Pahalgam",
    description:
      "Enjoy mountain landscapes, peaceful valleys, outdoor adventures, and unforgettable Himalayan experiences.",
    image: "/content/srinagar-holiday-1.webp",
    href: "/tour-packages/india/jammu-and-kashmir",
    badge: "Scenic Paradise",
    duration: "5 to 7 Days",
  },
  {
    title: "Kerala Tour Package",
    destinations: "Kochi • Munnar • Alleppey",
    description:
      "Combine green hills, wildlife, beaches, local experiences, and a relaxing houseboat stay.",
    image: "/content/delhi-holiday-1.webp",
    href: "/tour-packages/india",
    badge: "Nature & Backwaters",
    duration: "6 to 8 Days",
  },
  {
    title: "India Wildlife Tour",
    destinations: "National Parks • Tiger Safari • Wildlife Experiences",
    description:
      "Get closer to India's incredible wildlife with carefully planned safari experiences and comfortable stays.",
    image: "/content/rajasthan-tours-holiday-2.webp",
    href: "/travel-experiences/wildlife-safari",
    badge: "Wild Safari",
    duration: "5 to 8 Days",
  },
  {
    title: "India Honeymoon Package",
    destinations: "Romantic India • Private Experiences • Beautiful Stays",
    description:
      "Create a memorable honeymoon with romantic stays, private experiences, scenic destinations, and plenty of time together.",
    image: "/content/manali-holiday-1.webp",
    href: "/travel-experiences/honeymoon-packages",
    badge: "Romantic Escape",
    duration: "6 to 9 Days",
  },
];

export const BestSellingPackages: React.FC<{
  initialJourneys?: JourneyPage<Journey> | null;
}> = () => {
  return (
    <section id="packages" className="py-10 sm:py-14 md:py-16 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F8904D] mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Best-Selling Tours
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Explore Our Most Loved India Tours
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
            Wondering which India trip is right for you? Start with the journeys our travelers love most.
          </p>
        </div>

        {/* 6 Tour Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CURATED_BESTSELLERS.map((tour, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#F8904D]/40 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Tour Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <FallbackImage
                  src={tour.image}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider border border-white/10">
                    {tour.badge}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#F8904D] shrink-0" />
                    <span>{tour.destinations}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#2E8B8B] transition-colors leading-snug">
                    <Link href={tour.href}>{tour.title}</Link>
                  </h3>
                  <p className="mt-2.5 text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {tour.description}
                  </p>
                </div>

                {/* CTAs */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <Link
                    href={tour.href}
                    className="flex-1 text-center py-2.5 px-3 rounded-xl border border-slate-300 hover:border-[#2E8B8B] hover:text-[#2E8B8B] text-slate-700 text-xs sm:text-sm font-bold transition-all"
                  >
                    VIEW TOUR
                  </Link>

                  <QuoteModal>
                    <button
                      type="button"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#F8904D] hover:bg-[#e07b3b] text-white text-xs sm:text-sm font-bold shadow-sm shadow-[#F8904D]/30 active:scale-95 transition-all cursor-pointer text-center"
                    >
                      GET A QUOTE
                    </button>
                  </QuoteModal>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Explorer Button */}
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
