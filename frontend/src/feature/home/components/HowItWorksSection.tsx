"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { QuoteModal } from "@/components/shared/QuoteModal";

const STEPS = [
  {
    num: "01",
    title: "Tell Us Your Ideas",
    description: "Share your destinations, dates, special group size and budget.",
  },
  {
    num: "02",
    title: "Get Your Custom Itinerary",
    description: "Our local experts create a personalized journey for you.",
  },
  {
    num: "03",
    title: "Travel With Confidence",
    description: "We arrange the important details and support you throughout your trip.",
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAFBFB] border-b border-slate-100 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Traveler Image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <FallbackImage
                src="/content/rajasthan-tours-holiday-1.webp"
                alt="Traveler exploring India"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: 3 Steps */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-8">
              How Does KoiKoi Travel Make Trip Planning Easy?
            </h2>

            {/* 3 Horizontal Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {STEPS.map((step, idx) => (
                <div key={idx} className="flex flex-col items-start relative">
                  <span className="w-8 h-8 rounded-full bg-[#00A66E] text-white font-bold text-xs flex items-center justify-center mb-3 shrink-0 shadow-sm">
                    {step.num}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Action button & script text */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-4 border-t border-slate-200/80">
              <QuoteModal>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#00A66E] hover:bg-[#00915f] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Start Planning My Trip</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </QuoteModal>

              <p className="text-[#00A66E] font-medium text-sm sm:text-base italic">
                That&apos;s it. You dream about India. We help make it happen.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
