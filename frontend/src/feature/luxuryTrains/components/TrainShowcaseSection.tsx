"use client";

import React, { useState } from "react";
import Image from "next/image";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { LUXURY_TRAINS_DATA, LuxuryTrain } from "../data/luxuryTrainsData";
import { 
  Award, 
  Calendar, 
  MapPin, 
  Users, 
  Wifi, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  MessageCircle, 
  ChevronRight,
  ShieldAlert,
  BedDouble,
  UtensilsCrossed
} from "lucide-react";

export default function TrainShowcaseSection() {
  const [selectedTrainId, setSelectedTrainId] = useState<string>("maharajas-express");
  const [activeTabByTrain, setActiveTabByTrain] = useState<Record<string, "overview" | "cabins" | "circuits" | "dining">>({
    "maharajas-express": "overview",
    "palace-on-wheels": "overview",
    "golden-chariot": "overview",
    "deccan-odyssey": "overview",
  });

  const setTab = (trainId: string, tab: "overview" | "cabins" | "circuits" | "dining") => {
    setActiveTabByTrain((prev) => ({ ...prev, [trainId]: tab }));
  };

  const getTab = (trainId: string) => activeTabByTrain[trainId] || "overview";

  return (
    <section id="train-showcase" className="py-14 sm:py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#e07b3b] text-xs font-bold tracking-wider uppercase mb-3">
            <Award className="w-3.5 h-3.5 text-[#F8904D]" />
            <span>India&apos;s Royal Fleet</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            The 4 Legendary Luxury Trains of India
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Every train features authentic royal décor, private en-suite cabins, gourmet multi-course dining cars,
            and curated off-train excursions. Select any train below to explore circuits, cabins, and fares.
          </p>
        </div>

        {/* Train Cards List */}
        <div className="mt-12 space-y-16">
          {LUXURY_TRAINS_DATA.map((train, index) => {
            const currentTab = getTab(train.id);
            const isEven = index % 2 === 1;

            return (
              <div
                key={train.id}
                id={train.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.05)] overflow-hidden transition-all scroll-mt-24"
              >
                {/* Train Header Banner */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#0c1a2e] text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-700/50">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <span className="px-3 py-1 rounded-full bg-[#F8904D] text-white text-xs font-bold tracking-wide uppercase shadow-sm">
                        {train.badge}
                      </span>
                      <span className="text-xs text-slate-300 font-medium">
                        Operated by {train.operator}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                      {train.name}
                    </h3>
                    <p className="text-amber-300/90 text-sm sm:text-base mt-1 font-medium italic">
                      &ldquo;{train.tagline}&rdquo;
                    </p>
                  </div>

                  {/* Pricing Box & Fast Action */}
                  <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 shrink-0 backdrop-blur-md">
                    <div>
                      <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider block">
                        Starting Tariff / Tour
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl sm:text-3xl font-extrabold text-white">
                          ${train.startingPriceUSD.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-300">USD</span>
                        <span className="text-sm font-semibold text-amber-300">
                          ({train.startingPriceINR})
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        *All-inclusive: Meals, Sightseeing & Private Cabin
                      </span>
                    </div>

                    <div className="mt-3 sm:mt-0 md:mt-3 flex items-center gap-2">
                      <QuoteModal>
                        <button
                          type="button"
                          className="px-5 py-2.5 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white text-xs sm:text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        >
                          Check Dates & Fares
                        </button>
                      </QuoteModal>
                      <a
                        href={`https://wa.me/919136739178?text=Hello%20KoiKoi%20Travel,%20I%20am%20inquiring%20about%20booking%20the%20${encodeURIComponent(train.name)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Train Content Body with Internal Tabs */}
                <div className="p-6 sm:p-8">
                  {/* Tab Navigation */}
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6 overflow-x-auto">
                    {[
                      { key: "overview", label: "Overview & Highlights", icon: Sparkles },
                      { key: "circuits", label: `Curated Circuits (${train.circuits.length})`, icon: MapPin },
                      { key: "cabins", label: `Royal Cabins (${train.cabins.length})`, icon: BedDouble },
                      { key: "dining", label: "Fine Dining & Lounges", icon: UtensilsCrossed },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = currentTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => setTab(train.id, tab.key as any)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                            isActive
                              ? "bg-slate-900 text-white shadow-sm"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? "text-[#F8904D]" : "text-slate-400"}`} />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* TAB 1: OVERVIEW */}
                  {currentTab === "overview" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left: Description & Specs */}
                      <div className="lg:col-span-7 space-y-6">
                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                          {train.description}
                        </p>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs sm:text-sm">
                          <div>
                            <span className="text-slate-400 block text-[11px] uppercase font-semibold">Total Guests</span>
                            <span className="font-bold text-slate-800">{train.specifications.totalGuestCapacity} Guests Only</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px] uppercase font-semibold">Carriages</span>
                            <span className="font-bold text-slate-800">{train.specifications.totalCoaches} Royal Coaches</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px] uppercase font-semibold">Suspension</span>
                            <span className="font-bold text-slate-800">{train.specifications.suspensionType}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px] uppercase font-semibold">Wi-Fi Internet</span>
                            <span className="font-bold text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> High-speed Included
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px] uppercase font-semibold">Ayurvedic Spa</span>
                            <span className="font-bold text-slate-800">Onboard Coach</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px] uppercase font-semibold">Duration</span>
                            <span className="font-bold text-[#F8904D]">{train.durationDefault}</span>
                          </div>
                        </div>

                        {/* Highlights List */}
                        <div>
                          <h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-900 mb-3">
                            Royal Inclusions & Highlights
                          </h4>
                          <ul className="space-y-2.5">
                            {train.keyHighlights.map((highlight, hIdx) => (
                              <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right: Visual Card with Image & Official Badge */}
                      <div className="lg:col-span-5 space-y-4">
                        <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden shadow-md group">
                          {/* Fallback image with styling */}
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${train.heroImage})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block">
                              Imperial Experience
                            </span>
                            <p className="text-base font-bold text-white drop-shadow-sm">
                              {train.name} – {train.tagline}
                            </p>
                          </div>
                        </div>

                        {/* Awards Box */}
                        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                          <h5 className="text-xs uppercase font-extrabold text-amber-900 flex items-center gap-1.5 mb-2">
                            <Award className="w-4 h-4 text-[#F8904D]" />
                            Awards & Accreditations
                          </h5>
                          <ul className="space-y-1 text-xs text-amber-950/80">
                            {train.awards.map((award, aIdx) => (
                              <li key={aIdx} className="flex items-center gap-1.5">
                                <span className="text-[#F8904D]">•</span>
                                <span>{award}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Official link notice */}
                        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                          <span>Official Partner Desk: KoiKoi Travel</span>
                          <a
                            href={train.officialWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 underline font-medium"
                          >
                            <span>Official Train Info</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: CIRCUITS */}
                  {currentTab === "circuits" && (
                    <div className="space-y-6">
                      <p className="text-sm text-slate-600">
                        {train.name} operates {train.circuits.length} distinct royal circuits. Select your desired itinerary:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {train.circuits.map((circuit) => (
                          <div
                            key={circuit.id}
                            className="p-5 rounded-2xl border border-slate-200 hover:border-[#F8904D]/60 hover:shadow-md transition-all bg-white flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold">
                                  {circuit.duration}
                                </span>
                                <span className="text-xs font-bold text-[#F8904D]">
                                  From ${circuit.startingPriceUSD.toLocaleString()} USD
                                </span>
                              </div>

                              <h4 className="text-lg font-bold text-slate-900">
                                {circuit.title}
                              </h4>

                              {/* Route Path Chips */}
                              <div className="mt-3 py-2 px-3 bg-slate-50 rounded-xl text-xs font-medium text-slate-700 leading-relaxed border border-slate-100">
                                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">
                                  Route Circuit:
                                </span>
                                {circuit.routeSummary}
                              </div>

                              {/* Highlights */}
                              <div className="mt-3">
                                <span className="text-[11px] uppercase font-bold text-slate-500 block mb-1.5">
                                  Circuit Highlights:
                                </span>
                                <ul className="space-y-1">
                                  {circuit.highlights.slice(0, 3).map((h, hIdx) => (
                                    <li key={hIdx} className="text-xs text-slate-600 flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                      <span>{h}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Booking Action */}
                            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-xs text-slate-500">
                                Season: <strong className="text-slate-800">{circuit.season}</strong>
                              </span>
                              <QuoteModal>
                                <button
                                  type="button"
                                  className="text-xs font-bold px-4 py-2 rounded-lg bg-slate-900 hover:bg-[#F8904D] text-white transition-colors cursor-pointer"
                                >
                                  Inquire Circuit
                                </button>
                              </QuoteModal>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: CABINS */}
                  {currentTab === "cabins" && (
                    <div className="space-y-6">
                      <p className="text-sm text-slate-600">
                        Designed like private imperial chambers with royal furnishings and modern en-suite amenities:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {train.cabins.map((cabin, cIdx) => (
                          <div
                            key={cIdx}
                            className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-base font-bold text-slate-900">
                                  {cabin.name}
                                </h4>
                                <span className="text-xs font-bold text-[#F8904D] bg-[#F8904D]/10 px-2 py-0.5 rounded-md">
                                  {cabin.size}
                                </span>
                              </div>

                              <span className="text-xs text-slate-500 font-medium block mb-2">
                                Bed Type: {cabin.bedType} • Category: {cabin.type}
                              </span>

                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                                {cabin.description}
                              </p>

                              <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                                {cabin.features.map((feat, fIdx) => (
                                  <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <span>{feat}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-5 pt-3">
                              <QuoteModal>
                                <button
                                  type="button"
                                  className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-900 border border-slate-300 hover:border-slate-900 text-slate-800 hover:text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                                >
                                  Reserve {cabin.name}
                                </button>
                              </QuoteModal>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: DINING & LOUNGES */}
                  {currentTab === "dining" && (
                    <div className="space-y-6">
                      <p className="text-sm text-slate-600">
                        Indulge in royal culinary creations curated by master chefs, served in bespoke dining carriages:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {train.diningAndLounges.map((venue, vIdx) => (
                          <div
                            key={vIdx}
                            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between"
                          >
                            <div>
                              <span className="text-[10px] uppercase font-bold text-[#F8904D] tracking-wider block mb-1">
                                {venue.type}
                              </span>
                              <h4 className="text-base font-bold text-slate-900 mb-2">
                                {venue.name}
                              </h4>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {venue.description}
                              </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                              <UtensilsCrossed className="w-3.5 h-3.5" />
                              <span>Inclusive in your ticket</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
