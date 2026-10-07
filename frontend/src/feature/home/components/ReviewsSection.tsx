"use client";

import React from "react";
import { Star, MessageCircle, Sparkles, CheckCircle } from "lucide-react";
import { FallbackImage } from "@/components/shared/FallbackImage";

const REVIEWS = [
  {
    quote:
      "From the first conversation to the final day, everything felt so easy. Our itinerary was perfectly suited to what we wanted.",
    author: "Sarah M.",
    country: "USA",
    trip: "Golden Triangle Tour",
    avatar: "/content/srinagar-holiday-1.webp",
  },
  {
    quote:
      "KoiKoi Travel made planning India so much simpler. The communication, hotels, transport and experiences were excellent.",
    author: "James T.",
    country: "UK",
    trip: "Rajasthan Tour",
    avatar: "/content/jaipur-holiday-1.webp",
  },
  {
    quote:
      "We wanted a trip that included sightseeing, wildlife and some adventure. The team created exactly what we were looking for.",
    author: "Emma L.",
    country: "Australia",
    trip: "Kerala Tour",
    avatar: "/content/manali-holiday-1.webp",
  },
];

export const ReviewsSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/919873003099?text=${encodeURIComponent(
    "Hi KoiKoi Travel, I would like to plan an India trip. Please share options."
  )}`;

  return (
    <section className="py-12 sm:py-16 bg-[#FAFBFB] border-b border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header with ratings */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F8904D] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Verified Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              What Our Travelers Say
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
              Real journeys. Real experiences. Real travelers.
            </p>
          </div>

          {/* Google & Tripadvisor Badges */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
              <span className="font-bold text-slate-800 text-xs sm:text-sm">Google</span>
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-slate-700">4.9/5</span>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
              <span className="font-bold text-slate-800 text-xs sm:text-sm">Tripadvisor</span>
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-slate-700">5.0/5</span>
            </div>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3.5 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-slate-200">
                      <FallbackImage
                        src={rev.avatar}
                        alt={rev.author}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{rev.author}</h4>
                      <p className="text-[11px] text-slate-500">
                        {rev.country} • <span className="text-[#2E8B8B] font-semibold">{rev.trip}</span>
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm italic leading-relaxed mb-4">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-1 text-amber-400 pt-3 border-t border-slate-100">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Talk to a Travel Expert on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
