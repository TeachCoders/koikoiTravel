"use client";

import React from "react";
import { Sparkles, SlidersHorizontal, Compass, ShieldCheck, HeartHandshake, Car, Users2 } from "lucide-react";
import { QuoteModal } from "@/components/shared/QuoteModal";

const REASONS = [
  {
    icon: SlidersHorizontal,
    title: "Your Trip, Your Way",
    description:
      "We don't believe everyone should follow the same itinerary. We build your journey around your interests, travel style, dates, and budget.",
  },
  {
    icon: Compass,
    title: "Local Knowledge That Matters",
    description:
      "Get practical destination advice from people who understand how travel works on the ground.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Travel Planning",
    description:
      "Know what you're paying for before you travel, with clear arrangements and straightforward communication.",
  },
  {
    icon: HeartHandshake,
    title: "Personal Support",
    description:
      "From your first enquiry to your return journey, our team is here to help when you need us.",
  },
  {
    icon: Car,
    title: "Private & Comfortable Travel",
    description:
      "Enjoy carefully arranged transportation and a smoother journey between destinations.",
  },
  {
    icon: Users2,
    title: "One Team From Start to Finish",
    description:
      "Instead of coordinating multiple companies yourself, let KoiKoi Travel handle the important details.",
  },
];

export const WhyBookWithUsSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 md:py-16 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F8904D] mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Why Book With Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Why Book Your India Trip With KoiKoi Travel?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
            Planning India can feel overwhelming. There are thousands of hotels, routes, destinations, activities, and transport options to choose from.{" "}
            <span className="font-semibold text-slate-900">KoiKoi Travel makes it simple.</span>
          </p>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {REASONS.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/70 hover:border-[#2E8B8B]/40 hover:shadow-md transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2E8B8B]/10 text-[#2E8B8B] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
                    {reason.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <QuoteModal>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base tracking-wide shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F8904D]" />
              <span>PLAN MY INDIA TRIP</span>
            </button>
          </QuoteModal>
        </div>
      </div>
    </section>
  );
};

export default WhyBookWithUsSection;

