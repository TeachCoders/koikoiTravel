"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

const ACTIVITIES = [
  {
    icon: "🐅",
    title: "Tiger Safari",
    description: "Head into the wild and experience India's incredible wildlife.",
    href: "/travel-experiences/wildlife",
  },
  {
    icon: "🐘",
    title: "Elephant Experiences",
    description: "Enjoy memorable wildlife and nature experiences in carefully selected destinations.",
    href: "/travel-experiences/wildlife",
  },
  {
    icon: "🏜️",
    title: "Desert Adventures",
    description: "Experience Rajasthan's desert landscapes, local culture, and exciting outdoor activities.",
    href: "/tour-packages/india/rajasthan",
  },
  {
    icon: "⛰️",
    title: "Mountain Adventures",
    description: "Discover scenic valleys, mountain landscapes, and outdoor experiences.",
    href: "/tour-packages/india/jammu-and-kashmir",
  },
  {
    icon: "🚣",
    title: "Backwater Experiences",
    description: "Slow down and enjoy Kerala's peaceful waterways and beautiful scenery.",
    href: "/tour-packages/india",
  },
  {
    icon: "🍛",
    title: "Local Food Experiences",
    description: "Taste regional flavors and discover India's incredible food culture.",
    href: "/travel-experiences",
  },
  {
    icon: "🏰",
    title: "Forts & Palaces",
    description: "Explore spectacular places while experiencing the vibrant cities around them.",
    href: "/tour-packages/india/rajasthan",
  },
  {
    icon: "🌅",
    title: "Sunrise & Sunset Experiences",
    description: "Add beautiful moments to your itinerary that you'll remember long after your trip.",
    href: "/tour-packages/india/golden-triangle",
  },
];

export const ActivitiesSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 md:py-16 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F8904D] mb-2">
            <Sparkles className="w-3.5 h-3.5" /> India Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Amazing Things You Can Experience in India
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
            Your India holiday should be more than checking destinations off a list.
          </p>
        </div>

        {/* 8 Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {ACTIVITIES.map((act, idx) => (
            <Link
              key={idx}
              href={act.href}
              className="group bg-slate-50 hover:bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/70 hover:border-[#2E8B8B]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform origin-left">
                  {act.icon}
                </div>
                <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#2E8B8B] transition-colors leading-snug">
                  {act.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  {act.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-[#F8904D] group-hover:text-[#e07b3b]">
                <span>Discover</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/travel-experiences"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base tracking-wide shadow-md transition-all active:scale-95"
          >
            <span>EXPLORE INDIA EXPERIENCES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;

