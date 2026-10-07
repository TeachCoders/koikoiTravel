"use client";

import React from "react";
import { Sparkles, MessageCircle } from "lucide-react";
import { QuoteModal } from "@/components/shared/QuoteModal";

export const FinalCtaSection: React.FC = () => {
  const whatsappMessage = encodeURIComponent(
    "Hi KoiKoi Travel, I'm ready to plan my trip to India. Please help me create a personalized itinerary."
  );
  const whatsappUrl = `https://wa.me/919873003099?text=${whatsappMessage}`;

  return (
    <section className="relative py-14 sm:py-20 md:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden border-b border-slate-800">
      {/* Decorative blurred background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#F8904D]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#2E8B8B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 text-center relative z-10 flex flex-col items-center">
        {/* Subtle Pill */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F8904D] text-xs font-bold tracking-widest uppercase mb-4 sm:mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Start Your Journey Today
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
          Ready to Experience India Your Way?
        </h2>

        {/* Subtitle */}
        <p className="mt-5 sm:mt-6 text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed">
          Don&apos;t spend weeks trying to figure out routes, hotels, transportation, and activities on your own. Tell KoiKoi Travel what you want from your India journey, and we&apos;ll help you turn your ideas into a personalized trip.
        </p>

        {/* Key Highlight */}
        <div className="my-6 sm:my-8 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <p className="text-base sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F8904D] to-white">
            Your dates. Your interests. Your pace. Your India.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-md sm:max-w-none">
          <QuoteModal>
            <button
              type="button"
              className="btn-primary w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-bold tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-[#F8904D]/30 active:scale-95 transition-all cursor-pointer rounded-xl"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span>GET MY FREE ITINERARY</span>
            </button>
          </QuoteModal>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base tracking-wide shadow-xl shadow-emerald-900/30 active:scale-95 transition-all border border-emerald-400/30"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>CHAT WITH KOIKOI TRAVEL</span>
          </a>
        </div>

        {/* Reassurance text */}
        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-slate-400 font-medium">
          ✨ No pressure. No complicated planning. Just a conversation about your trip.
        </p>
      </div>
    </section>
  );
};

export default FinalCtaSection;

