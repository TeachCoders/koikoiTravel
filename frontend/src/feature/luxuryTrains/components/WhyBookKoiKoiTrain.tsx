"use client";

import React from "react";
import { ShieldCheck, HeartHandshake, Hotel, Car, MessageCircle, Clock } from "lucide-react";
import { QuoteModal } from "@/components/shared/QuoteModal";

export default function WhyBookKoiKoiTrain() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Zero Markup Guarantee",
      description: "Pay the exact official tariff established by IRCTC & State Tourism Boards. No hidden agency commissions or surprise fees."
    },
    {
      icon: Hotel,
      title: "Pre & Post Palace Hotel Stays",
      description: "Complete your royal holiday with negotiated rates at iconic 5-star heritage hotels like The Taj Mahal Palace Mumbai or The Oberoi New Delhi."
    },
    {
      icon: Car,
      title: "Complimentary Private Airport Chauffeur",
      description: "Enjoy stress-free private airport arrival and departure transfers to and from the luxury railway boarding terminals."
    },
    {
      icon: HeartHandshake,
      title: "Bespoke Custom Sightseeing",
      description: "Add private guided tours in Delhi, Mumbai, or Bengaluru before train embarkation, crafted specifically for you."
    },
    {
      icon: MessageCircle,
      title: "24/7 Dedicated Luxury Concierge",
      description: "From dietary preferences and cabin selection to visa guidance and flight coordination, your personal specialist is on WhatsApp 24/7."
    },
    {
      icon: Clock,
      title: "Quick Response within 12–24 Hours",
      description: "Get detailed date availability, official brochure PDFs, and transparent quotes delivered straight to your WhatsApp and email."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>The KoiKoi Travel Difference</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Book Your Luxury Train Journey with KoiKoi Travel?
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Booking a luxury train ticket is only part of your journey. We turn it into a seamless, end-to-end royal Indian expedition.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#F8904D]/50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F8904D]/10 text-[#F8904D] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Banner with CTA */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#0c1a2e] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Planning to Travel During the 2024–2025 Royal Season?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Limited to only 80 guests per train departure. Peak dates between October and March fill up fast.
              Let our luxury train advisors check live cabin availability for you today.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <QuoteModal>
              <button
                type="button"
                className="px-6 py-3.5 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-bold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Check Live Cabin Availability
              </button>
            </QuoteModal>
          </div>
        </div>
      </div>
    </section>
  );
}
