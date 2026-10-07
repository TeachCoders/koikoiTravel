"use client";

import React from "react";
import { Sparkles, MessageSquare, FileText, Compass } from "lucide-react";
import { QuoteModal } from "@/components/shared/QuoteModal";

const STEPS = [
  {
    num: "01",
    title: "Tell Us Your Ideas",
    description:
      "Share your destinations, travel dates, interests, group size, and budget.",
    icon: MessageSquare,
  },
  {
    num: "02",
    title: "Get Your Custom Itinerary",
    description:
      "Our travel experts create a personalized journey based on what you actually want to experience.",
    icon: FileText,
  },
  {
    num: "03",
    title: "Travel With Confidence",
    description:
      "Once you're happy with your plan, we arrange the important details and support you throughout your trip.",
    icon: Compass,
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 md:py-16 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F8904D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2E8B8B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F8904D] mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            How Does KoiKoi Travel Make Trip Planning Easy?
          </h2>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-black text-[#F8904D] tracking-tight">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-slate-700 text-slate-200 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center gap-2 text-xs font-semibold text-[#F8904D]">
                  <span>Step {idx + 1} of 3</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance & CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-slate-300 text-sm sm:text-base font-medium mb-6">
            That&apos;s it. <span className="text-white font-bold">You dream about India.</span> We help make it happen.
          </p>

          <QuoteModal>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F8904D] hover:bg-[#e07b3b] text-white font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-[#F8904D]/30 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>START PLANNING MY TRIP</span>
            </button>
          </QuoteModal>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

