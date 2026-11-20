"use client";

import React from "react";
import Link from "next/link";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { Sparkles, Train, ShieldCheck, Clock, Award, MessageCircle } from "lucide-react";

interface LuxuryTrainHeroProps {
  onSelectTrain?: (trainId: string) => void;
}

export default function LuxuryTrainHero({ onSelectTrain }: LuxuryTrainHeroProps) {
  const WHATSAPP_URL = "https://wa.me/919136739178?text=Hello%20KoiKoi%20Travel,%20I%20am%20interested%20in%20booking%20an%20India%20Luxury%20Train%20journey.";

  return (
    <div className="relative bg-gradient-to-b from-[#071326] via-[#0b1e38] to-[#0c1a2e] text-white pt-8 pb-16 sm:pb-20 overflow-hidden">
      {/* Subtle royal pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-[radial-gradient(#F8904D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
      />

      {/* Ambient glowing radial blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#F8904D]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-300/80 mb-6 sm:mb-8 font-medium">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#F8904D] font-semibold">Luxury Trains of India</span>
        </nav>

        {/* Hero Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-lg">
          <Sparkles className="w-4 h-4 text-[#F8904D]" />
          <span>India&apos;s 4 Iconic Palaces on Wheels</span>
        </div>

        {/* Main Heading */}
        <div className="mt-5 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Relive India&apos;s Royal Heritage in{" "}
            <span className="bg-gradient-to-r from-[#F8904D] via-amber-300 to-[#F8904D] bg-clip-text text-transparent">
              Imperial Opulence
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-light max-w-3xl">
            Traverse India like erstwhile Maharajas and British Viceroys. Handcrafted itineraries across Rajasthan,
            the Western Ghats, and South India with private royal suites, personal Khidmatgars, fine dining, and VIP off-board palace tours.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <QuoteModal>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-semibold text-base shadow-[0_4px_20px_rgba(248,144,77,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Train className="w-5 h-5" />
              <span>Request Train Availability & Quote</span>
            </button>
          </QuoteModal>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-base border border-emerald-500/40 backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href="#train-showcase"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-base border border-white/20 backdrop-blur-md transition-colors"
          >
            <span>Compare 4 Trains</span>
            <span>↓</span>
          </a>
        </div>

        {/* Quick Train Selector Tabs */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Quick Jump to Train:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
            {[
              { id: "maharajas-express", name: "Maharajas' Express", highlight: "World's Leading Luxury Train" },
              { id: "palace-on-wheels", name: "Palace on Wheels", highlight: "Rajasthan Royal Heritage" },
              { id: "golden-chariot", name: "The Golden Chariot", highlight: "South India & Goa Odyssey" },
              { id: "deccan-odyssey", name: "Deccan Odyssey", highlight: "Blue Limousine on Rails" },
            ].map((train) => (
              <a
                key={train.id}
                href={`#${train.id}`}
                onClick={(e) => {
                  if (onSelectTrain) {
                    onSelectTrain(train.id);
                  }
                }}
                className="group flex flex-col p-3 sm:p-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#F8904D]/60 transition-all text-left"
              >
                <span className="font-bold text-sm sm:text-base text-white group-hover:text-[#F8904D] transition-colors flex items-center justify-between">
                  {train.name}
                  <span className="text-xs text-[#F8904D] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 mt-1 line-clamp-1">{train.highlight}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Authorized Booking Assistance</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Best Guaranteed Rates</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-[#F8904D] shrink-0" />
            <span>Quotes within 12–24 Hours</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Tailor-made Pre/Post Extensions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
