"use client";

import React, { useState } from "react";
import { Plus, Minus, Sparkles } from "lucide-react";

const FAQS_COL1 = [
  {
    q: "Can KoiKoi Travel create a custom India itinerary?",
    a: "Yes. KoiKoi Travel can create a personalized itinerary based on your destinations, travel dates, interests, preferred travel style and budget.",
  },
  {
    q: "Can I change the itinerary?",
    a: "Yes. Your itinerary can be adjusted before confirmation so it better matches what you want from your India trip.",
  },
  {
    q: "Do you arrange private transportation?",
    a: "Private transportation can be arranged for many India itineraries, depending on the route and package.",
  },
  {
    q: "Can you arrange hotels?",
    a: "Yes. Hotel arrangements can be included based on your preferred location, comfort level and budget.",
  },
];

const FAQS_COL2 = [
  {
    q: "Can KoiKoi Travel arrange wildlife and safari experiences?",
    a: "Yes. Wildlife and safari experiences can be included in suitable India itineraries.",
  },
  {
    q: "Do you offer honeymoon and family trips?",
    a: "Yes. KoiKoi Travel can create customized honeymoon, family, adventure, wildlife, luxury and private India journeys.",
  },
  {
    q: "How do I get a quote?",
    a: "Simply send us your travel dates, destinations, number of travelers and preferences. Our team will create a personalized proposal for you.",
  },
  {
    q: "Can I contact KoiKoi Travel on WhatsApp?",
    a: "Yes. WhatsApp is an easy way to share your travel plans and speak with the KoiKoi Travel team.",
  },
];

export const HomepageFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>("c1-0");

  const toggle = (id: string) => {
    setOpenIndex((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAFBFB] border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F8904D] mb-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Common Questions
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* 2-Column FAQ Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
          {/* Column 1 */}
          <div className="space-y-3">
            {FAQS_COL1.map((faq, idx) => {
              const id = `c1-${idx}`;
              const isOpen = openIndex === id;
              return (
                <div
                  key={id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggle(id)}
                    className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-3 font-semibold text-slate-900 text-xs sm:text-sm hover:text-[#2E8B8B] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#F8904D] shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            {FAQS_COL2.map((faq, idx) => {
              const id = `c2-${idx}`;
              const isOpen = openIndex === id;
              return (
                <div
                  key={id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggle(id)}
                    className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-3 font-semibold text-slate-900 text-xs sm:text-sm hover:text-[#2E8B8B] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#F8904D] shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageFaqSection;
