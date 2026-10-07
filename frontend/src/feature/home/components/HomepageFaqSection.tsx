"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "Can KoiKoi Travel create a custom India itinerary?",
    a: "Yes. KoiKoi Travel can create a personalized itinerary based on your destinations, travel dates, interests, preferred travel style, and budget.",
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
    a: "Yes. Hotel arrangements can be included based on your preferred location, comfort level, and budget.",
  },
  {
    q: "Can KoiKoi Travel arrange wildlife and safari experiences?",
    a: "Yes. Wildlife and safari experiences can be included in suitable India itineraries.",
  },
  {
    q: "Do you offer honeymoon and family trips?",
    a: "Yes. KoiKoi Travel can create customized honeymoon, family, adventure, wildlife, luxury, and private India journeys.",
  },
  {
    q: "How do I get a quote?",
    a: "Simply send us your travel dates, destinations, number of travelers, and preferences. Our team will create a personalized proposal for you.",
  },
  {
    q: "Can I contact KoiKoi Travel on WhatsApp?",
    a: "Yes. WhatsApp is an easy way to share your travel plans and speak with the KoiKoi Travel team.",
  },
];

export const HomepageFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-10 sm:py-14 md:py-16 bg-slate-50 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F8904D] mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Homepage FAQs
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Have questions about planning your India trip? Here are quick answers to common queries.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-[#2E8B8B] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#F8904D] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#2E8B8B]" : ""
                    }`}
                  />
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
    </section>
  );
};

export default HomepageFaqSection;

