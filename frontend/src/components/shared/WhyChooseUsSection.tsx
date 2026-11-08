"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { PaginatedGuestGallery } from "@/feature/guestGallery/type";

interface WhyChooseUsSectionProps {
  images?: string[];
  hideGallery?: boolean;
  initialGuestGallery?: PaginatedGuestGallery | null;
}

interface TrustCardItem {
  tag: string;
  title: string;
  tagline: string;
  image: string;
  desc: string;
}

const TRUST_CARDS_DATA: TrustCardItem[] = [
  {
    tag: "YOUR",
    title: "PERSONAL TRAVEL DESIGNER",
    tagline: "We're Travelers First, Planners Second.”",
    image: "/images/why-choose-us/designer-v5.jpg",
    desc: "Deeply rooted in India for authentic advice. Passionate about crafting your unique journey.",
  },
  {
    tag: "YOUR",
    title: "LOCAL STORYTELLER",
    tagline: "We share the stories you won't find in a guidebook”",
    image: "/images/why-choose-us/storyteller-v5.jpg",
    desc: "Connecting you with the top 20% of local storytellers. Your personal photographer for cherished moments.",
  },
  {
    tag: "YOUR",
    title: "PRIVATE DRIVER & CAR",
    tagline: "20% more space, 100% on your schedule.”",
    image: "/images/why-choose-us/driver-v5.jpg",
    desc: "A seamless journey that moves at your own pace. Your private, comfortable space on the road.",
  },
  {
    tag: "YOUR",
    title: "24/7 TRAVEL SUPPORT",
    tagline: "Any Problem, Anytime, Anywhere.”",
    image: "/images/why-choose-us/support-v5.jpg",
    desc: "Your safety and peace of mind are our priority. Instant responses, so you're never left waiting.",
  },
];

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = () => {
  return (
    <section className="overflow-hidden border-y border-section-border bg-white py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-10">
        
        {/* Section Heading */}
        <div className="mb-6 sm:mb-8 max-w-3xl">
          <SectionLabel>THE KOIKOI PROMISE • A 4-ON-1 TEAM DEDICATED TO YOU</SectionLabel>

          <h2 className="font-heading text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-bold text-slate-900 tracking-tight mt-1.5 leading-tight">
            Why Book Your India Trip <span className="text-[#F8904D]">With KoiKoi Travel?</span>
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            Here is what we promise: Complete peace of mind, backed by a dedicated 4-on-1 team from inquiry to departure — your personal trip designer, expert storyteller, private chauffeur, and 24/7 care manager.
          </p>
        </div>

        {/* 4 Cards Grid - Clean, Editorial */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {TRUST_CARDS_DATA.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-between text-center rounded-2xl bg-section-tint border border-section-border p-5 sm:p-6 min-h-[440px] sm:min-h-[470px] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
            >
              {/* Top: Tag + Title + Quote + Tagline */}
              <div className="flex flex-col items-center w-full">
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-slate-900">
                  {card.tag}
                </span>

                <h3
                  className="mt-1.5 font-bold text-base sm:text-lg lg:text-[19px] tracking-tight text-[#F8904D] uppercase leading-snug min-h-[48px] flex items-center justify-center max-w-[220px]"
                  dangerouslySetInnerHTML={{ __html: card.title }}
                />

                {/* Quotation mark */}
                <span className="text-2xl sm:text-3xl font-serif text-[#F8904D]/70 leading-none mt-1.5 select-none">
                  “
                </span>

                {/* Italic Tagline */}
                <p
                  className="text-sm sm:text-[15px] md:text-base italic font-semibold text-slate-800 leading-snug px-1 -mt-1 min-h-[44px] flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: card.tagline }}
                />
              </div>

              {/* Center: Illustration Image with Uniform Height across all 4 cards */}
              <div className="my-3.5 w-full aspect-[3/2] flex items-center justify-center overflow-hidden rounded-md bg-[#F8F3EF]">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Bottom: Description */}
              <p
                className="text-sm sm:text-[15px] text-slate-600 leading-relaxed px-1 mt-auto"
                dangerouslySetInnerHTML={{ __html: card.desc }}
              />
            </div>
          ))}
        </div>

        {/* Clear terms (trust) */}
        <p className="mt-4 text-xs leading-snug text-slate-500 sm:mt-5 sm:text-sm">
          Clear terms, always. Read our{" "}
          <Link
            href="/cancellation-and-refund"
            className="font-semibold text-[#F8904D] hover:underline"
          >
            Cancellation &amp; Refund
          </Link>{" "}
          policy and{" "}
          <Link
            href="/terms-and-conditions"
            className="font-semibold text-[#F8904D] hover:underline"
          >
            Terms of Service
          </Link>{" "}
          before you book.
        </p>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;
