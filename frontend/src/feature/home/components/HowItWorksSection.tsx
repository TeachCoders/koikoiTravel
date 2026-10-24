"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { QuoteModal } from "@/components/shared/QuoteModal";

const STEPS = [
  {
    num: "1",
    title: "Tell Us Your Plan",
    description:
      "Share where you want to go, your dates and how many are travelling. Rough ideas are completely fine — our destination specialists guide you.",
  },
  {
    num: "2",
    title: "Get Your Custom Plan",
    description:
      "We send a personalised itinerary with transparent pricing. Change the route, hotels or pace as many times as you like until it feels right.",
  },
  {
    num: "3",
    title: "Travel With 24/7 Support",
    description:
      "Your private car, driver and licensed guides are arranged. Our dedicated team is with you on WhatsApp around the clock during your trip.",
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 bg-white border-y border-section-border relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-8 sm:mb-10 text-left">
          <SectionLabel icon={<Sparkles className="w-3.5 h-3.5" />}>Simple Process</SectionLabel>
          <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-slate-900 tracking-tight mt-1.5">
            How It <span className="text-[#F8904D]">Works</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-1.5 max-w-xl">
            Planning your dream India vacation should not feel like work. Three simple steps and you are set.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-section-tint border border-section-border rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Number Badge */}
                <span className="w-10 h-10 rounded-full bg-[#F8904D] text-white font-bold text-base flex items-center justify-center mb-5 shadow-sm shadow-[#F8904D]/30">
                  {step.num}
                </span>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA & Note */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-section-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-[#2E8B8B] font-semibold text-sm sm:text-base">
            That&apos;s it. You dream about India — we craft and manage everything seamlessly.
          </p>
          <QuoteModal>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-sm transition-all cursor-pointer shrink-0 self-start sm:self-auto"
            >
              <span>Start Planning My Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </QuoteModal>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
