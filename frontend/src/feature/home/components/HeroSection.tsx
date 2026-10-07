"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CheckCircle2, MessageCircle, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { useHeroBanners } from "@/feature/heroBanner/api";

const DEFAULT_SLIDES = [
  { image: "/content/rajasthan-tours-holiday-1.webp", alt: "Plan Your Dream India Trip With KoiKoi Travel" },
  { image: "/content/srinagar-holiday-1.webp", alt: "Kashmir Himalayan Holidays" },
  { image: "/content/jaipur-holiday-1.webp", alt: "Jaipur Rajasthan Heritage Tours" },
  { image: "/content/manali-holiday-1.webp", alt: "Himachal Mountain Tours" },
];

const TRUST_POINTS = [
  "100% Custom Trips",
  "Local India Experts",
  "Transparent Pricing",
  "24/7 Trip Support",
];

export const HeroSection: React.FC = () => {
  const { data: heroData } = useHeroBanners("Home");
  const slides = heroData?.data?.length
    ? heroData.data.map((b) => ({
        image: b.image,
        alt: b.altText || b.title || "India Tour Holiday Banner",
      }))
    : DEFAULT_SLIDES;

  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const whatsappMessage = encodeURIComponent(
    "Hi KoiKoi Travel, I would like to plan my trip to India. Please help me with itinerary and quote."
  );
  const whatsappUrl = `https://wa.me/919873003099?text=${whatsappMessage}`;

  const scrollToLeadForm = () => {
    const el = document.getElementById("trip-lead-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[560px] sm:min-h-[600px] md:min-h-[640px] lg:min-h-[680px] flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Background slider with smooth crossfade / slide */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="relative w-full h-full shrink-0">
              <FallbackImage
                src={s.image}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                {...(!i ? {} : { loading: "eager" as const, decoding: "async" as const })}
                className="object-cover object-center scale-105 animate-subtle-zoom"
                theme="dark"
              />
            </div>
          ))}
        </div>
        {/* Deep cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-black/50" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Slide Navigation Arrows (Desktop) */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full items-center justify-center text-white transition-all shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full items-center justify-center text-white transition-all shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Hero Content */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20 md:py-24 text-center flex flex-col items-center">
        {/* Subtle Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F8904D] text-xs sm:text-[13px] font-bold tracking-wide uppercase mb-4 sm:mb-5 drop-shadow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>India Tailor-Made Travel Specialists</span>
        </div>

        {/* H1 Title */}
        <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] max-w-5xl mx-auto drop-shadow-lg">
          Plan Your Dream India Trip With KoiKoi Travel
        </h1>

        {/* Subtitle / Intro paragraph */}
        <p className="mt-5 sm:mt-6 text-white/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed font-normal drop-shadow">
          Your India journey should feel exciting—not complicated. Tell us where you want to go, when you&apos;re travelling, and what you want to experience. Our local travel experts will create a personalized itinerary around your interests, budget, and travel style.
        </p>

        {/* Primary & Secondary Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none">
          <QuoteModal>
            <button
              type="button"
              className="btn-primary w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-bold tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-[#F8904D]/25 hover:shadow-[#F8904D]/40 active:scale-95 transition-all cursor-pointer rounded-xl"
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
            <span>TALK TO A TRAVEL EXPERT</span>
          </a>
        </div>

        {/* 4 Trust Points Checklist */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 max-w-4xl text-white/90 text-xs sm:text-sm font-semibold">
          {TRUST_POINTS.map((point) => (
            <div key={point} className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </div>

        {/* Sub-cue text */}
        <div className="mt-8 pt-6 border-t border-white/15 max-w-2xl text-center">
          <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
            <span className="text-[#F8904D] font-bold">Not sure where to start?</span>{" "}
            Tell us what you have in mind. We&apos;ll help you build the perfect India trip.
          </p>
        </div>
      </div>

      {/* Slide Indicator Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-7 h-1.5 bg-[#F8904D]"
                  : "w-2 h-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection;
