"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { QuoteModal } from "@/components/shared/QuoteModal";

const EXPERIENCES = [
  {
    icon: "🏰",
    title: "Rajasthan & Royal India",
    href: "/tour-packages/india/rajasthan",
  },
  {
    icon: "🐅",
    title: "Wildlife & Tiger Safari",
    href: "/travel-experiences/wildlife",
  },
  {
    icon: "🏔️",
    title: "Kashmir & Himalayas",
    href: "/tour-packages/india/jammu-and-kashmir",
  },
  {
    icon: "💖",
    title: "India Honeymoon",
    href: "/travel-experiences/honeymoon-packages",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family Holidays",
    href: "/travel-experiences/family-packages",
  },
  {
    icon: "🕌",
    title: "Golden Triangle",
    href: "/tour-packages/india/golden-triangle",
  },
  {
    icon: "🌴",
    title: "Kerala & South India",
    href: "/tour-packages/india",
  },
];

export const WhichExperienceSection: React.FC = () => {
  return (
    <section className="relative py-14 sm:py-20 bg-slate-900 text-slate-900 overflow-hidden">
      {/* Background Scenic Landscape */}
      <div className="absolute inset-0 pointer-events-none">
        <FallbackImage
          src="/content/srinagar-holiday-1.webp"
          alt="Scenic India landscape"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 scale-105"
          theme="dark"
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Which India Experience Are You Looking For?
          </h2>
          <p className="text-white/80 text-xs sm:text-sm mt-2 leading-relaxed max-w-2xl mx-auto">
            India can be relaxing, adventurous, romantic, wild, colorful or all of them together. Choose the experience that matches your travel style.
          </p>
        </div>

        {/* 8 Cards Grid (4 per row on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {EXPERIENCES.map((exp, idx) => (
            <Link
              key={idx}
              href={exp.href}
              className="group bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col items-center justify-center text-center border border-white/40"
            >
              <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform">
                {exp.icon}
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#00A66E] transition-colors">
                {exp.title}
              </h3>
            </Link>
          ))}

          {/* 8th Card: Dark Green Ask KoiKoi Card */}
          <QuoteModal>
            <div className="bg-[#005c3d] hover:bg-[#004a31] text-white rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer group border border-emerald-500/30 h-full">
              <p className="text-xs sm:text-sm font-bold leading-snug">
                Not sure which trip is best for you?
              </p>
              <span className="mt-2 text-xs font-semibold text-emerald-300 inline-flex items-center gap-1 group-hover:underline">
                Ask KoiKoi Travel <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </QuoteModal>
        </div>
      </div>
    </section>
  );
};

export default WhichExperienceSection;
