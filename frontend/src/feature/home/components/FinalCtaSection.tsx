"use client";

import React from "react";
import { Sparkles, MessageCircle, Check } from "lucide-react";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { QuoteModal } from "@/components/shared/QuoteModal";

export const FinalCtaSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/919873003099?text=${encodeURIComponent(
    "Hi KoiKoi Travel, I am ready to plan my trip to India. Please help me create a personalized itinerary."
  )}`;

  return (
    <section className="relative py-16 sm:py-20 bg-slate-950 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <FallbackImage
          src="/content/taj-mahal-holiday-1.webp"
          alt="Taj Mahal at sunset"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
          theme="dark"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
          Ready to Experience India Your Way?
        </h2>

        <p className="mt-4 text-white/85 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
          Don&apos;t spend weeks trying to figure out routes, hotels, transportation and activities on your own. Tell KoiKoi Travel what you want from your India journey, and we&apos;ll help you turn your ideas into a personalized trip.
        </p>

        <p className="my-4 text-xs sm:text-sm font-semibold text-[#F8904D]">
          Your dates. Your interests. Your pace. Your India.
        </p>

        {/* CTAs */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <QuoteModal>
            <button
              type="button"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#00A66E] hover:bg-[#00915f] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#00A66E]/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get My Free Itinerary</span>
            </button>
          </QuoteModal>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-transparent border border-emerald-400 hover:bg-emerald-500/20 text-white font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Contact WhatsApp</span>
          </a>
        </div>

        {/* 4 Checkmarks */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/80 font-medium">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Custom Trips</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Local India Experts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Transparent Pricing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>24/7 Trip Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
