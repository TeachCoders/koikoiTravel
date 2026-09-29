"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroSearchBar from "@/components/shared/HeroSearchBar";
import { FallbackImage } from "@/components/shared/FallbackImage";

const SLIDES = [
  { image: "/content/rajasthan-tours-holiday-1.webp", alt: "Rajasthan heritage tour" },
  { image: "/content/srinagar-holiday-1.webp", alt: "Srinagar Kashmir holiday" },
  { image: "/content/jaipur-holiday-1.webp", alt: "Jaipur royal heritage" },
  { image: "/content/manali-holiday-1.webp", alt: "Manali Himachal holiday" },
];

export const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[300px] sm:h-[380px] md:h-[520px] flex items-center justify-center overflow-hidden bg-slate-200">
      <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {SLIDES.map((s, i) => (
          <div key={i} className="relative w-full h-full shrink-0">
            <FallbackImage
              src={s.image}
              alt={s.alt}
              fill
              priority={i === 0}
              unoptimized
              {...(!i ? {} : { loading: "eager" as const, decoding: "async" as const })}
              className="object-cover object-center"
              theme="dark"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

      <button onClick={prev}
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full items-center justify-center text-white hover:bg-white/20 transition-all">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next}
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full items-center justify-center text-white hover:bg-white/20 transition-all">
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-2.5 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-white" : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 w-full text-center">

        <h1 className="text-white !text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] transition-all duration-700 block">
          Find Your Perfect <span className="text-[#F8904D]">Holiday</span>
        </h1>

        <div className="mt-3 sm:mt-6 md:mt-8">
          <HeroSearchBar />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
