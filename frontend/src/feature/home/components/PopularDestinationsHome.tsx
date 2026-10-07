"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, MapPin } from "lucide-react";
import { FallbackImage } from "@/components/shared/FallbackImage";

const DESTINATIONS = [
  {
    name: "Rajasthan",
    description: "Royal cities, colorful markets, desert adventures, wildlife, and unforgettable experiences.",
    image: "/content/rajasthan-tours-holiday-1.webp",
    href: "/tour-packages/india/rajasthan",
    buttonText: "Explore Rajasthan",
  },
  {
    name: "Agra",
    description: "Visit one of India's most iconic landmarks and combine it with exciting local experiences.",
    image: "/content/taj-mahal-holiday-1.webp",
    href: "/tour-packages/india/golden-triangle",
    buttonText: "Explore Agra",
  },
  {
    name: "Delhi",
    description: "Begin your India adventure with food, local experiences, sightseeing, and vibrant city life.",
    image: "/content/delhi-holiday-1.webp",
    href: "/tour-packages/india/golden-triangle",
    buttonText: "Explore Delhi",
  },
  {
    name: "Kashmir",
    description: "Discover spectacular mountain scenery, peaceful valleys, and outdoor adventures.",
    image: "/content/srinagar-holiday-1.webp",
    href: "/tour-packages/india/jammu-and-kashmir",
    buttonText: "Explore Kashmir",
  },
  {
    name: "Kerala",
    description: "Experience backwaters, beaches, green landscapes, wildlife, and relaxing stays.",
    image: "/content/jaipur-holiday-1.webp",
    href: "/tour-packages/india",
    buttonText: "Explore Kerala",
  },
  {
    name: "Himachal Pradesh",
    description: "Enjoy mountain scenery, outdoor adventures, beautiful valleys, and refreshing escapes.",
    image: "/content/manali-holiday-1.webp",
    href: "/tour-packages/india/himachal-pradesh",
    buttonText: "Explore Himachal",
  },
];

export const PopularDestinationsHome: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 md:py-16 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F8904D] mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Popular India Destinations
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Where Will Your India Journey Take You?
          </h2>
        </div>

        {/* 6 Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DESTINATIONS.map((dest, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#2E8B8B]/40 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <FallbackImage
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#F8904D]" />
                  <span className="font-bold text-base sm:text-lg">{dest.name}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {dest.description}
                </p>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <Link
                    href={dest.href}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2E8B8B] hover:text-[#236b6b] group-hover:translate-x-1 transition-all"
                  >
                    <span>{dest.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
            <span>EXPLORE ALL DESTINATIONS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinationsHome;

