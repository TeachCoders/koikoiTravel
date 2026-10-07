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
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F8904D] text-xs font-bold tracking-widest uppercase mb-4 sm:mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Start Your Journey Today
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
          Ready to Experience India Your Way?
        </h2>

        <p className="mt-4 text-white/85 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
          Don&apos;t spend weeks trying to figure out routes, hotels, transportation and activities on your own. Tell KoiKoi Travel what you want from your India journey, and we&apos;ll help you turn your ideas into a personalized trip.
        </p>

        <div className="my-5 px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <p className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F8904D] to-white">
            Your dates. Your interests. Your pace. Your India.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <QuoteModal>
            <button
              type="button"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F8904D] hover:bg-[#e07b3b] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#F8904D]/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get My Free Itinerary</span>
            </button>
          </QuoteModal>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-900/30 transition-all active:scale-95 flex items-center justify-center gap-2 border border-emerald-400/30"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Contact WhatsApp</span>
          </a>
        </div>

        {/* 4 Checkmarks */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/80 font-medium">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#F8904D]" />
            <span>100% Custom Trips</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#F8904D]" />
            <span>Local India Experts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#F8904D]" />
            <span>Transparent Pricing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#F8904D]" />
            <span>24/7 Trip Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
