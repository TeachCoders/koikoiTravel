"use client";

import React, { useState } from "react";
import { Check, Sparkles, MessageCircle, ArrowRight, ShieldCheck, Clock, Users, MapPin, Calendar, Compass } from "lucide-react";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { QuoteModal } from "@/components/shared/QuoteModal";

const POPULAR_DESTINATIONS = [
  "Golden Triangle (Delhi, Agra, Jaipur)",
  "Rajasthan (Jaipur, Jodhpur, Udaipur)",
  "Kashmir & Himalayas",
  "Kerala & South India",
  "Wildlife & Tiger Safari",
  "Goa & Beaches",
  "Custom / Multiple Places",
];

const MONTH_OPTIONS = [
  "October 2026",
  "November 2026",
  "December 2026",
  "January 2027",
  "February 2027",
  "March 2027",
  "April - June 2027",
  "Flexible / Not Decided",
];

const TRAVELLER_OPTIONS = [
  "1 Solo Traveller",
  "2 Couple / Pair",
  "3 - 5 Family / Friends",
  "6+ Large Group",
];

const TRIP_TYPES = [
  "Family",
  "Honeymoon",
  "Adventure",
  "Wildlife",
  "Cultural",
  "Luxury",
  "Other",
];

export const HeroSection: React.FC = () => {
  const [destination, setDestination] = useState("");
  const [travelMonth, setTravelMonth] = useState("");
  const [travellers, setTravellers] = useState("");
  const [tripType, setTripType] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);

  const whatsappMessage = encodeURIComponent(
    "Hi KoiKoi Travel, I would like to plan my trip to India. Please help me with itinerary and quote."
  );
  const whatsappUrl = `https://wa.me/919873003099?text=${whatsappMessage}`;

  const handleHeroFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsapp.trim()) return;

    setLoading(true);

    const messageText = `*New Trip Inquiry from Website:*
• *Destination:* ${destination || "Open to suggestions"}
• *Travel Month:* ${travelMonth || "Flexible"}
• *Travellers:* ${travellers || "2 Travellers"}
• *Trip Type:* ${tripType || "Holiday"}
• *WhatsApp Number:* ${whatsapp.trim()}`;

    try {
      await fetch("https://api.koikoitravel.com/api/v1/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: whatsapp.trim(),
          destination: destination || "India Tour",
          travelDates: travelMonth || "Flexible",
          guests: travellers || "2",
          tourType: tripType || "Custom",
          source: "Homepage Split Hero Form",
        }),
      }).catch(() => null);
    } catch {
      // ignore
    }

    setLoading(false);
    const waUrl = `https://wa.me/919873003099?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <section className="relative w-full min-h-[620px] lg:min-h-[680px] flex items-center bg-slate-950 overflow-hidden py-12 lg:py-16">
      {/* Taj Mahal Panoramic Hero Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FallbackImage
          src="/content/taj-mahal-holiday-1.webp"
          alt="Taj Mahal India - KoiKoi Travel"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] scale-105"
          theme="dark"
        />
        {/* Cinematic dark overlay to make white text & floating card pop */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/50" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Main Value Prop & CTAs */}
          <div className="lg:col-span-7 text-white flex flex-col items-start">
            <span className="text-white/85 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 block">
              Your India Journey, Your Way
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.12] text-white">
              Plan Your Dream India Trip With{" "}
              <span className="text-[#F8904D]">KoiKoi Travel</span>
            </h1>

            <p className="mt-4 sm:mt-5 text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
              Your India journey should feel exciting—not complicated. Tell us where you want to go, when you&apos;re travelling, and what you want to experience. Our local travel experts will create a personalized itinerary around your interests, budget and travel style.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <QuoteModal>
                <button
                  type="button"
                  className="px-6 sm:px-7 py-3.5 rounded-xl bg-[#00A66E] hover:bg-[#00915f] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#00A66E]/30 active:scale-95 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get My Free Itinerary</span>
                </button>
              </QuoteModal>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
              >
                <span>Talk to a Travel Expert</span>
              </a>
            </div>

            {/* 4 Trust Checkmarks */}
            <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm text-white/90 font-medium">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Custom Trips</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Local India Experts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Transparent Pricing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24/7 Trip Support</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Floating Lead Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 text-slate-900 relative">
              <div className="mb-5">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  Tell Us About Your Trip
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Get a free custom itinerary on WhatsApp
                </p>
              </div>

              <form onSubmit={handleHeroFormSubmit} className="space-y-3.5">
                {/* 1. Destination */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00A66E]" />
                    Where would you like to go?
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00A66E] focus:bg-white transition-colors"
                  >
                    <option value="">Select destination</option>
                    {POPULAR_DESTINATIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. When travelling */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#00A66E]" />
                    When are you travelling?
                  </label>
                  <select
                    value={travelMonth}
                    onChange={(e) => setTravelMonth(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00A66E] focus:bg-white transition-colors"
                  >
                    <option value="">Select month</option>
                    {MONTH_OPTIONS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. How many people */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#00A66E]" />
                    How many people?
                  </label>
                  <select
                    value={travellers}
                    onChange={(e) => setTravellers(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00A66E] focus:bg-white transition-colors"
                  >
                    <option value="">Select travellers</option>
                    {TRAVELLER_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Type of trip */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-[#00A66E]" />
                    Type of trip
                  </label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00A66E] focus:bg-white transition-colors"
                  >
                    <option value="">Select trip type</option>
                    {TRIP_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. WhatsApp Number */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Your WhatsApp number
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+91 98765-43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00A66E] focus:bg-white transition-colors"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-[#00A66E] hover:bg-[#00915f] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#00A66E]/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{loading ? "Processing..." : "Get My Free Custom Itinerary"}</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
