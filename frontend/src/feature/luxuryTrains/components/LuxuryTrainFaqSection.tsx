"use client";

import React, { useState } from "react";
import { LUXURY_TRAIN_FAQS } from "../data/luxuryTrainsData";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

export default function LuxuryTrainFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#F8904D]" />
            <span>Essential Traveler Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Everything you need to know about preparing for an imperial rail journey across India.
          </p>
        </div>

        <div className="space-y-4">
          {LUXURY_TRAIN_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                >
                  <span className="font-bold text-base sm:text-lg text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#F8904D]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 text-center">
          <p className="text-sm text-slate-700 font-medium">
            Have a specific question about dates, routes, or cabin categories?
          </p>
          <a
            href="https://wa.me/919136739178?text=Hello%20KoiKoi%20Travel,%20I%20have%20a%20question%20regarding%20India%20Luxury%20Trains."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Speak with a Luxury Train Expert on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
