"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Sparkles, X } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { QuoteModal } from "@/components/shared/QuoteModal";

// KoiKoi Travel Official Film
const INCREDIBLE_INDIA_VIDEO_ID = "R4yeNWUvF0Q";

export default function SeoTextBlock() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-section-tint border-y border-section-border py-10 sm:py-12 md:py-16 relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
          {/* Left: text */}
          <div>
            <SectionLabel>Our Story</SectionLabel>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mt-2">
              <span className="text-[#F8904D]">KoiKoi Travel</span> : Private
              Customized &amp; Group Travel India
            </h1>

            <p className="mt-2 text-lg sm:text-xl font-semibold text-slate-800">
              India, Planned by{" "}
              <span className="text-[#F8904D]">People Who Care</span>
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4 max-w-xl">
              KoiKoi Travel is a small team crafting private luxury journeys and
              small-group tours across India. We plan every trip as if it were
              our own, so you can enjoy India while we take care of the rest.
            </p>

            <p className="mt-4 max-w-xl border-l-4 border-[#F8904D] pl-3 text-sm sm:text-base italic leading-relaxed text-slate-700">
              Built by two travel lovers with over 20 years of combined experience in the
              travel industry.
            </p>

            <p className="mt-5 text-base font-semibold text-slate-800 max-w-xl">
              Share your dates and we&apos;ll send a custom itinerary and get quote
              on WhatsApp & email within 12 hours.
            </p>

            <div className="mt-6 flex items-center flex-wrap gap-3">
              <QuoteModal>
                <button
                  type="button"
                  className="font-outfit cursor-pointer rounded-full bg-[#F8904D] px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-[#e07b3b] active:scale-95"
                >
                  Get My Free Quote
                </button>
              </QuoteModal>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-1.5 px-2 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Learn more about us
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right: High-Performance Facade Video Player (Zero Page-Load Delay) */}
          <div className="mx-auto w-full max-w-xl lg:max-w-none pr-0 sm:pr-2 pt-2">
            <div className="relative group">
              {/* Offset Decorative Accent Frame */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-2.5 translate-y-2.5 sm:translate-x-3.5 sm:translate-y-3.5 rounded-2xl bg-gradient-to-br from-[#F8904D] to-[#E0722E] shadow-md transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4"
              />

              {/* Main Media Box */}
              <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] overflow-hidden rounded-2xl bg-slate-950 shadow-2xl border-2 border-white">
                {!isPlaying ? (
                  /* Lightweight Facade (0 KB YouTube scripts until user clicks) */
                  <div className="relative h-full w-full cursor-pointer select-none" onClick={() => setIsPlaying(true)}>
                    {/* Poster Image */}
                    <Image
                      src="/content/koikoi-travel-video-cover.jpg"
                      alt="KoiKoi Travel | Private India Tours"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      priority={false}
                    />

                    {/* Cinematic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-black/30 transition-opacity duration-300 group-hover:opacity-85" />

                    {/* Top Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/20 shadow-sm">
                        <Sparkles className="h-3 w-3 text-[#F8904D]" />
                        <span>KoiKoi Travel • Official Film</span>
                      </div>
                    </div>

                    {/* Center Glowing Play Button */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying(true);
                        }}
                        aria-label="Play KoiKoi Travel Video"
                        className="group/btn relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#F8904D] text-white shadow-2xl shadow-[#F8904D]/50 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                      >
                        <span className="absolute inset-0 rounded-full bg-[#F8904D] animate-ping opacity-35 pointer-events-none" />
                        <Play className="h-7 w-7 sm:h-8 sm:w-8 fill-white translate-x-0.5" />
                      </button>

                      <span className="rounded-full bg-black/50 px-3.5 py-1 text-xs font-medium text-white/90 backdrop-blur-sm border border-white/10 tracking-wide">
                        Click to Watch (2 Min Film)
                      </span>
                    </div>
                  </div>
                ) : (
                  /* YouTube Iframe (Loaded ONLY on user demand) */
                  <div className="relative h-full w-full bg-black">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(false)}
                      aria-label="Close Video"
                      className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/75 text-white backdrop-blur-md transition-all hover:bg-black hover:scale-110 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <iframe
                      src={`https://www.youtube.com/embed/${INCREDIBLE_INDIA_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                      title="KoiKoi Travel | Private India Tours - Varanasi, Wildlife, Kerala & Maharajas' Express"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="h-full w-full border-0"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
