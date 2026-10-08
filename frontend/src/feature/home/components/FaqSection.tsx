"use client";

import React, { useState, useMemo } from "react";
import { HelpCircle, ChevronDown, MessageSquare, Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { HOME_FAQS } from "@/lib/homeFaqs";

interface FaqSectionProps {
  faqs?: any[];
  heading?: string;
  subtitle?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  faqs,
  heading = "Frequently Asked Questions",
  subtitle = "Simple answers about booking, payments, trip plans and help during your holiday.",
}) => {
  const [openId, setOpenId] = useState<number | string | null>(1);
  const toggleFaq = (id: number | string) => setOpenId(openId === id ? null : id);
  
  const faqData = useMemo(() => {
    return faqs && faqs.length > 0 
      ? faqs.map((f: any, i) => ({
          id: f.id || i + 1,
          question: f.ques || f.question || "",
          answer: f.ans || f.answer || "",
          category: f.category || undefined,
        }))
      : HOME_FAQS;
  }, [faqs]);

  // Split into 2 columns for desktop
  const col1 = useMemo(() => faqData.filter((_, i) => i % 2 === 0), [faqData]);
  const col2 = useMemo(() => faqData.filter((_, i) => i % 2 !== 0), [faqData]);

  const renderFaqCard = (faq: { id: number | string; question: string; answer: string }) => {
    const isOpen = openId === faq.id;
    return (
      <div
        key={faq.id}
        itemScope
        itemProp="mainEntity"
        itemType="https://schema.org/Question"
        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
          isOpen ? "border-[#2E8B8B]/40 shadow-sm bg-white" : "border-slate-200/80 bg-white hover:border-slate-300"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleFaq(faq.id)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${faq.id}`}
          className="w-full flex items-center justify-between gap-4 px-4 py-4 md:px-5 md:py-4 text-left cursor-pointer focus:outline-none"
        >
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span
              itemProp="name"
              className={`text-[15px] sm:text-[16px] font-semibold transition-colors leading-snug ${
                isOpen ? "text-[#2E8B8B]" : "text-slate-900"
              }`}
            >
              {faq.question}
            </span>
          </div>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen ? "bg-[#2E8B8B] text-white rotate-180" : "bg-slate-100 text-slate-500"
          }`}>
            <ChevronDown size={15} />
          </span>
        </button>

        {/* Answer is always preserved in DOM for SSR HTML crawlers */}
        <div
          id={`faq-answer-${faq.id}`}
          itemScope
          itemProp="acceptedAnswer"
          itemType="https://schema.org/Answer"
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
          aria-hidden={!isOpen}
        >
          <div
            itemProp="text"
            className="px-4 pb-4 md:px-5 md:pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3.5"
          >
            {faq.answer}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="faq" className="py-8 sm:py-10 md:py-12 bg-white relative border-t border-slate-200/70" itemScope itemType="https://schema.org/FAQPage">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 space-y-6 sm:space-y-8">
        {/* Section Header */}
        <div>
          <SectionLabel icon={<HelpCircle className="w-4 h-4" />}>Got Questions?</SectionLabel>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-slate-900 mt-2">{heading}</h2>
          <p className="mt-2 text-[15px] text-slate-500 max-w-2xl leading-relaxed">{subtitle}</p>
        </div>

        {/* 2-Column FAQ Layout on Desktop */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
          <div className="space-y-3">
            {col1.map(renderFaqCard)}
          </div>
          <div className="space-y-3">
            {col2.map(renderFaqCard)}
          </div>
        </div>

        {/* Still Have Questions CTA Banner */}
        <div className="mt-6 md:mt-8 rounded-2xl bg-gradient-to-r from-[#1C1C1C] via-[#243333] to-[#1C1C1C] text-white p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg border border-slate-800">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-[#2E8B8B]/20 border border-[#2E8B8B]/40 flex items-center justify-center shrink-0">
              <MessageSquare size={22} className="text-[#2E8B8B]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Still have questions about your trip?</h3>
              <p className="text-sm text-slate-300 mt-0.5">Talk to our destination specialist for personalized itinerary guidance & custom quotes.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <QuoteModal>
              <button
                type="button"
                className="btn-primary px-5 py-3 text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2 cursor-pointer shadow-md shadow-[#F8904D]/30 active:scale-95 transition-all"
              >
                <Sparkles size={15} />
                <span>Ask Travel Specialist</span>
              </button>
            </QuoteModal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
