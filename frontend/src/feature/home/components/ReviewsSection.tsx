"use client";

import React from "react";
import { Sparkles, Star, CheckCircle, MessageCircle } from "lucide-react";

const REVIEWS = [
  {
    quote:
      "From the first conversation to the final day, everything felt so easy. Our itinerary was perfectly suited to what we wanted.",
    author: "David & Sarah M.",
    country: "United Kingdom",
    trip: "Golden Triangle & Rajasthan Tour",
    rating: 5,
  },
  {
    quote:
      "KoiKoi Travel made planning India so much simpler. The communication, hotels, transport, and experiences were excellent.",
    author: "Elena Rossi",
    country: "Italy",
    trip: "Kerala & South India Holiday",
    rating: 5,
  },
  {
    quote:
      "We wanted a trip that included sightseeing, wildlife, and some adventure. The team created exactly what we were looking for.",
    author: "Michael Chen",
    country: "Singapore",
    trip: "Wildlife & Taj Mahal Private Tour",
    rating: 5,
  },
];

export const ReviewsSection: React.FC = () => {
  const whatsappMessage = encodeURIComponent(
    "Hi KoiKoi Travel, I would like to plan a custom India holiday. Please help me with options."
  );
  const whatsappUrl = `https://wa.me/919873003099?text=${whatsappMessage}`;

  return (
    <section className="py-10 sm:py-14 md:py-16 bg-slate-50 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F8904D] mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Traveler Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            What Our Travelers Say
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
            Real journeys. Real experiences. Real travelers.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#F8904D] mb-4">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      {rev.author}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {rev.country} • <span className="text-[#2E8B8B] font-medium">{rev.trip}</span>
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base tracking-wide shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>TALK TO A TRAVEL EXPERT ON WHATSAPP</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

