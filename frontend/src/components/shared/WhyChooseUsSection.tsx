"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PaginatedGuestGallery } from "@/feature/guestGallery/type";

interface WhyChooseUsSectionProps {
  images?: string[];
  hideGallery?: boolean;
  initialGuestGallery?: PaginatedGuestGallery | null;
}

const ADVANTAGE_POINTS = [
  {
    num: "1",
    title: "100% tailored private trips",
    desc: "Your hotels, pace and route. Nothing is fixed.",
  },
  {
    num: "2",
    title: "Personal trip manager",
    desc: "One person you can message, available around the clock.",
  },
  {
    num: "3",
    title: "Comfortable cars, courteous drivers",
    desc: "Verified chauffeurs who stay with you throughout.",
  },
  {
    num: "4",
    title: "No forced shopping stops",
    desc: "You decide where to stop, and where not to.",
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Marcus & Clara Weber",
    location: "Munich, Germany",
    tripName: "Rajasthan Forts & Desert Safari (7D/6N)",
    rating: 5,
    comment:
      "What we appreciated most was the complete transparency with zero hidden charges. Our driver Kuldeep was extremely courteous. Sleeping under the stars in Jaisalmer was magical!",
  },
  {
    id: 2,
    name: "James & Eleanor Vance",
    location: "London, UK",
    tripName: "Golden Triangle & Varanasi (8D/7N)",
    rating: 5,
    comment:
      "Landing in Delhi at 2 AM was seamless with our driver Ramesh waiting with a warm smile. Clean vehicle, bottled water always ready, and he took us to a quiet rooftop facing the Taj Mahal!",
  },
  {
    id: 3,
    name: "Sarah & Daniel Jenkins",
    location: "Manchester, UK",
    tripName: "Kashmir Luxury Tour (6D/5N)",
    rating: 5,
    comment:
      "Our driver Tariq was amazing in Kashmir! Clean Innova cab, warm hotel rooms in Pahalgam, and zero hassle with Gulmarg snow passes.",
  },
  {
    id: 4,
    name: "Liam & Emma Davies",
    location: "Sydney, Australia",
    tripName: "Kerala Backwaters & Hills (5D/4N)",
    rating: 5,
    comment:
      "Traveled with our elderly mother and a toddler. Driver Sunil drove very carefully on Munnar curves, and the houseboat chef cooked mild non-spicy food specifically for our kid!",
  },
  {
    id: 5,
    name: "Clara & Thomas Schmidt",
    location: "Berlin, Germany",
    tripName: "Rajasthan Grand Tour (10D/9N)",
    rating: 5,
    comment:
      "Every detail from arrival to departure was flawless. Our guide made the forts come alive with fascinating historical stories. Unforgettable holiday!",
  },
];

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = () => {
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentReview = REVIEWS[reviewIndex];

  return (
    <section className="py-14 sm:py-20 bg-section-tint border-y border-section-border overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading & 4 Key Advantage Points */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#F8904D] mb-2.5 block">
              The KoiKoi Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-slate-900 tracking-tight leading-[1.2] mb-3">
              Why book your India trip <span className="text-[#F8904D]">with KoiKoi?</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mb-8 leading-relaxed max-w-xl">
              Unlike generic booking engines, we plan every trip for you, with a real person who knows the route.
            </p>

            {/* 4 Points List */}
            <ul className="space-y-5">
              {ADVANTAGE_POINTS.map((pt) => (
                <li key={pt.num} className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-[#e6f4f1] text-[#1b8a7d] font-bold text-base flex items-center justify-center shrink-0 shadow-2xs">
                    {pt.num}
                  </span>
                  <div>
                    <b className="block text-slate-900 font-bold text-base leading-snug">
                      {pt.title}
                    </b>
                    <span className="text-slate-600 text-sm leading-relaxed block mt-0.5">
                      {pt.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Quote Card matching koikoi-home.html */}
          <div className="bg-white border border-section-border rounded-2xl p-7 sm:p-9 shadow-[0_6px_24px_rgba(18,48,47,0.08)] flex flex-col justify-between">
            <div>
              {/* Stars */}
              <div className="text-[#F8904D] text-lg tracking-[3px] mb-3">
                ★★★★★
              </div>

              {/* Trip Badge */}
              <div className="inline-block text-xs font-medium bg-section-tint border border-section-border rounded-full px-3.5 py-1 text-slate-700 mb-4" suppressHydrationWarning>
                {currentReview.tripName}
              </div>

              {/* Blockquote */}
              <blockquote className="text-slate-700 text-sm sm:text-[15.5px] italic leading-relaxed min-h-[72px]" suppressHydrationWarning>
                &ldquo;{currentReview.comment}&rdquo;
              </blockquote>
            </div>

            <div>
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs" suppressHydrationWarning>
                    {currentReview.name.split(" ")[0]?.[0]}
                    {currentReview.name.split(" ")[1]?.[0] || ""}
                  </div>
                  <div>
                    <b className="block text-slate-900 font-bold text-sm leading-snug" suppressHydrationWarning>
                      {currentReview.name}
                    </b>
                    <small className="text-slate-500 text-xs block" suppressHydrationWarning>
                      {currentReview.location}
                    </small>
                  </div>
                </div>

                {/* Review Dots */}
                <div className="flex items-center gap-1.5">
                  {REVIEWS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setReviewIndex(idx)}
                      className="p-1 cursor-pointer focus:outline-none"
                      aria-label={`Go to review ${idx + 1}`}
                    >
                      <span
                        className={`block h-2 rounded-full transition-all ${
                          idx === reviewIndex ? "w-5 bg-[#F8904D]" : "w-2 bg-slate-200 hover:bg-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Link
                href="/guest-gallery"
                className="inline-block mt-4 text-sm font-semibold text-[#1b8a7d] hover:underline"
              >
                See moments shared by our guests &rarr;
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
