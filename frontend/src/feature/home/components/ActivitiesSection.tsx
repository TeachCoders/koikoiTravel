"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FallbackImage } from "@/components/shared/FallbackImage";

const ACTIVITIES = [
  {
    title: "Tiger Safari",
    image: "/content/rajasthan-tours-holiday-2.webp",
    href: "/travel-experiences/wildlife",
  },
  {
    title: "Elephant Experiences",
    image: "/content/delhi-holiday-1.webp",
    href: "/travel-experiences/wildlife",
  },
  {
    title: "Desert Adventures",
    image: "/content/rajasthan-tours-holiday-1.webp",
    href: "/tour-packages/india/rajasthan",
  },
  {
    title: "Mountain Adventures",
    image: "/content/manali-holiday-1.webp",
    href: "/tour-packages/india/jammu-and-kashmir",
  },
  {
    title: "Backwater Experiences",
    image: "/content/jaipur-holiday-1.webp",
    href: "/tour-packages/india",
  },
  {
    title: "Local Food Experiences",
    image: "/content/srinagar-holiday-1.webp",
    href: "/travel-experiences",
  },
  {
    title: "Forts & Palaces",
    image: "/content/rajasthan-tours-holiday-1.webp",
    href: "/tour-packages/india/rajasthan",
  },
  {
    title: "Sunset & Sunrise",
    image: "/content/taj-mahal-holiday-1.webp",
    href: "/tour-packages/india/golden-triangle",
  },
];

export const ActivitiesSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Amazing Things You Can Experience in India
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
            Your India holiday should be more than checking destinations off a list.
          </p>
        </div>

        {/* 8 Image Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {ACTIVITIES.map((act, idx) => (
            <Link
              key={idx}
              href={act.href}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 block"
            >
              <FallbackImage
                src={act.image}
                alt={act.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12.5vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-2 right-2 text-center text-white">
                <h3 className="font-bold text-[11px] sm:text-xs leading-tight drop-shadow">
                  {act.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            href="/travel-experiences"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#00A66E] hover:bg-[#00915f] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-95"
          >
            <span>Explore India Experiences</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
