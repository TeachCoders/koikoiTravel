"use client";

import React, { useState } from "react";
import { Send, Sparkles, MapPin, Calendar, Users, Compass, Phone, CheckCircle, ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";

const POPULAR_DESTINATIONS = [
  "Golden Triangle (Delhi, Agra, Jaipur)",
  "Rajasthan (Jaipur, Jodhpur, Udaipur)",
  "Kashmir & Himalayas",
  "Kerala & South India Backwaters",
  "Wildlife & Tiger Safari",
  "Goa & Beach Escapes",
  "Himachal & Hill Stations",
  "Custom / Multiple Destinations",
];

const MONTH_OPTIONS = [
  "October 2026",
  "November 2026",
  "December 2026",
  "January 2027",
  "February 2027",
  "March 2027",
  "April - June 2027",
  "July - September 2027",
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

export const HomeLeadForm: React.FC = () => {
  const [destination, setDestination] = useState(POPULAR_DESTINATIONS[0]);
  const [travelMonth, setTravelMonth] = useState(MONTH_OPTIONS[1]);
  const [travellers, setTravellers] = useState(TRAVELLER_OPTIONS[1]);
  const [tripType, setTripType] = useState<string>("Family");
  const [whatsapp, setWhatsapp] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsapp.trim()) return;

    setLoading(true);

    const messageText = `*New Trip Inquiry from Website:*
• *Destination:* ${destination}
• *Travel Period:* ${travelMonth}
• *Travellers:* ${travellers}
• *Trip Type:* ${tripType}
• *Contact Name:* ${name.trim() || "Guest"}
• *WhatsApp / Phone:* ${whatsapp.trim()}`;

    // Also attempt to push lead to public inquiry API if available
    try {
      await fetch("https://api.koikoitravel.com/api/v1/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Website Visitor",
          phone: whatsapp.trim(),
          destination,
          travelDates: travelMonth,
          guests: travellers,
          tourType: tripType,
          source: "Homepage Hero Lead Form",
        }),
      }).catch(() => null);
    } catch {
      // ignore
    }

    setLoading(false);
    setSubmitted(true);

    // Auto redirect to WhatsApp
    const waUrl = `https://wa.me/919873003099?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <section id="trip-lead-form" className="relative bg-white py-10 sm:py-14 border-b border-slate-100">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-800 text-white relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F8904D]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2E8B8B]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-8 relative z-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F8904D] mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Start Your Custom Plan
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Tell Us About Your Trip
            </h2>
            <p className="mt-2 text-slate-300 text-xs sm:text-sm">
              Share a few quick details and our destination specialists will craft a customized itinerary for you.
            </p>
          </div>

          {submitted ? (
            <div className="relative z-10 bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 text-center max-w-lg mx-auto border border-emerald-500/30">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Inquiry Sent Successfully!</h3>
              <p className="text-slate-300 text-sm mb-6">
                Our India travel expert will review your preferences and message you on WhatsApp shortly with a personalized proposal.
              </p>
              <a
                href={`https://wa.me/919873003099?text=${encodeURIComponent(
                  `Hi KoiKoi Travel, I just submitted an itinerary request for ${destination}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {/* 1. Destination */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#F8904D]" />
                    Where would you like to go?
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-[#F8904D] focus:ring-1 focus:ring-[#F8904D] transition-colors"
                  >
                    {POPULAR_DESTINATIONS.map((d) => (
                      <option key={d} value={d} className="bg-slate-900 text-white">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Month */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#F8904D]" />
                    When are you travelling?
                  </label>
                  <select
                    value={travelMonth}
                    onChange={(e) => setTravelMonth(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-[#F8904D] focus:ring-1 focus:ring-[#F8904D] transition-colors"
                  >
                    {MONTH_OPTIONS.map((m) => (
                      <option key={m} value={m} className="bg-slate-900 text-white">
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Travellers */}
                <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#F8904D]" />
                    How many people are travelling?
                  </label>
                  <select
                    value={travellers}
                    onChange={(e) => setTravellers(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-[#F8904D] focus:ring-1 focus:ring-[#F8904D] transition-colors"
                  >
                    {TRAVELLER_OPTIONS.map((t) => (
                      <option key={t} value={t} className="bg-slate-900 text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4. Trip Type Chips */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#F8904D]" />
                  What type of trip are you planning?
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {TRIP_TYPES.map((type) => {
                    const isSelected = tripType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTripType(type)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-[#F8904D] text-white shadow-md shadow-[#F8904D]/30 border border-[#F8904D]"
                            : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Contact Info & Submit */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Smith"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#F8904D] focus:ring-1 focus:ring-[#F8904D]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+1 234 567 8900"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#F8904D] focus:ring-1 focus:ring-[#F8904D]"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-bold px-6 py-3.5 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#F8904D]/30 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{loading ? "Sending..." : "GET MY FREE CUSTOM ITINERARY"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Trust Subtext */}
              <div className="pt-2 text-center">
                <p className="text-xs text-slate-400 font-medium">
                  🔒 No booking commitment. No obligation. Just tell us what you want, and we&apos;ll help you plan it.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeLeadForm;

