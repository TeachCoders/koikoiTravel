"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { QuoteModal } from "@/components/shared/QuoteModal";

const EXPERIENCES = [
  {
    icon: "🏰",
    title: "Rajasthan & Royal India",
    description: "Explore colorful cities, desert landscapes, local markets, and unforgettable experiences.",
    href: "/tour-packages/india/rajasthan",
    color: "from-amber-500/10 to-orange-500/5",
    border: "hover:border-amber-400",
  },
  {
    icon: "🐅",
    title: "Wildlife & Tiger Safari",
    description: "Enjoy exciting safari adventures and discover India's incredible wildlife.",
    href: "/travel-experiences/wildlife",
    color: "from-emerald-500/10 to-teal-500/5",
    border: "hover:border-emerald-400",
  },
  {
    icon: "🏔️",
    title: "Kashmir & Himalayan Adventures",
    description: "Experience mountain scenery, valleys, outdoor activities, and breathtaking landscapes.",
    href: "/tour-packages/india/jammu-and-kashmir",
    color: "from-cyan-500/10 to-blue-500/5",
    border: "hover:border-cyan-400",
  },
  {
    icon: "💑",
    title: "India Honeymoon",
    description: "Plan a romantic journey filled with beautiful stays, private experiences, and memorable moments.",
    href: "/travel-experiences/honeymoon-packages",
    color: "from-rose-500/10 to-pink-500/5",
    border: "hover:border-rose-400",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family Holidays",
    description: "Enjoy comfortable travel, fun activities, wildlife, sightseeing, and experiences for the whole family.",
    href: "/travel-experiences/family-packages",
    color: "from-indigo-500/10 to-purple-500/5",
    border: "hover:border-indigo-400",
  },
  {
    icon: "🕌",
    title: "Golden Triangle",
    description: "Discover Delhi, Agra, and Jaipur in one exciting India journey.",
    href: "/tour-packages/india/golden-triangle",
    color: "from-amber-600/10 to-yellow-500/5",
    border: "hover:border-amber-500",
  },
  {
    icon: "🌴",
    title: "Kerala & South India",
    description: "Enjoy beaches, backwaters, green landscapes, wildlife, and relaxing experiences.",
    href: "/tour-packages/india",
    color: "from-teal-500/10 to-emerald-500/5",
    border: "hover:border-teal-400",
  },
];

export const WhichExperienceSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 md:py-16 bg-slate-50 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F8904D] mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Travel Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Which India Experience Are You Looking For?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
            India can be relaxing, adventurous, romantic, wild, colorful, or all of them together. Choose the experience that matches your travel style.
          </p>
        </div>

        {/* 7 Experiences Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {EXPERIENCES.map((exp, idx) => (
            <Link
              key={idx}
              href={exp.href}
              className={`group bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${exp.border}`}
            >
              <div>
                <div className="text-3xl sm:text-4xl mb-3.5 group-hover:scale-110 transition-transform origin-left">
                  {exp.icon}
                </div>
                <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#2E8B8B] transition-colors leading-snug">
                  {exp.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  {exp.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#F8904D] group-hover:text-[#e07b3b]">
                <span>Explore Packages</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}

          {/* 8th Card as Direct CTA helper */}
          <div className="bg-gradient-to-br from-[#2E8B8B] to-slate-900 rounded-2xl p-5 sm:p-6 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-2xl">✨</span>
              <h3 className="font-bold text-base sm:text-lg mt-3 text-white leading-snug">
                Need a Custom Experience?
              </h3>
              <p className="text-white/80 text-xs sm:text-sm mt-2 leading-relaxed">
                Combine wildlife, royal forts, private backwaters, and luxury trains in one customized tour.
              </p>
            </div>
            <QuoteModal>
              <button
                type="button"
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-[#F8904D] hover:bg-[#e07b3b] text-white text-xs sm:text-sm font-bold shadow transition-all cursor-pointer text-center"
              >
                Custom Itinerary
              </button>
            </QuoteModal>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <QuoteModal>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F8904D] hover:bg-[#e07b3b] text-white font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-[#F8904D]/30 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>FIND MY PERFECT INDIA TRIP</span>
            </button>
          </QuoteModal>
        </div>
      </div>
    </section>
  );
};

export default WhichExperienceSection;

