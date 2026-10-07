"use client";

import React from "react";
import { SlidersHorizontal, Compass, ShieldCheck, Headphones, Car, Users2, ArrowRight } from "lucide-react";
import { QuoteModal } from "@/components/shared/QuoteModal";

const REASONS = [
  {
    icon: SlidersHorizontal,
    title: "Your Trip, Your Way",
    description: "We build your journey around your interests & budget.",
  },
  {
    icon: Compass,
    title: "Local Knowledge",
    description: "Real practical destination advice from people who know India.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Planning",
    description: "Know what you pay for before you travel.",
  },
  {
    icon: Headphones,
    title: "Personal Support",
    description: "Team here before, during & after journey.",
  },
  {
    icon: Car,
    title: "Private & Comfortable",
    description: "Safe, verified and comfortable transport.",
  },
  {
    icon: Users2,
    title: "One Team",
    description: "From your first enquiry to your return journey.",
  },
];

export const WhyBookWithUsSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Why Book Your India Trip With KoiKoi Travel?
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
            Planning India can feel overwhelming. We make it simple and seamless.
          </p>
        </div>

        {/* 6 Icons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {REASONS.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-[#E6F6F0] text-[#00A66E] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {reason.title}
                </h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <QuoteModal>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#00A66E] hover:bg-[#00915f] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>Plan My India Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </QuoteModal>
        </div>
      </div>
    </section>
  );
};

export default WhyBookWithUsSection;
