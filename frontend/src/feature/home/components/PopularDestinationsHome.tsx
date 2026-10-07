"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { FallbackImage } from "@/components/shared/FallbackImage";

const DESTINATIONS = [
  {
    name: "Rajasthan",
    image: "/content/rajasthan-tours-holiday-1.webp",
    href: "/tour-packages/india/rajasthan",
  },
  {
    name: "Agra",
    image: "/content/taj-mahal-holiday-1.webp",
    href: "/tour-packages/india/golden-triangle",
  },
  {
    name: "Delhi",
    image: "/content/delhi-holiday-1.webp",
    href: "/tour-packages/india/golden-triangle",
  },
  {
    name: "Kashmir",
    image: "/content/srinagar-holiday-1.webp",
    href: "/tour-packages/india/jammu-and-kashmir",
  },
  {
    name: "Kerala",
    image: "/content/jaipur-holiday-1.webp",
    href: "/tour-packages/india",
  },
  {
    name: "Himachal Pradesh",
    image: "/content/manali-holiday-1.webp",
    href: "/tour-packages/india/himachal-pradesh",
  },
];

export const PopularDestinationsHome: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F8904D] mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Incredible Destinations
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Where Will Your India Journey Take You?
          </h2>
        </div>

        {/* 6 Destination Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {DESTINATIONS.map((dest, idx) => (
            <Link
              key={idx}
              href={dest.href}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 block"
            >
              <FallbackImage
                src={dest.image}
                alt={dest.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16.6vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                <span className="font-bold text-xs sm:text-sm drop-shadow">{dest.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#F8904D] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            href="/tour-packages"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-95"
          >
            <span>Explore All Destinations</span>
            <ArrowRight className="w-4 h-4 text-[#F8904D]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinationsHome;
