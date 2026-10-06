"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Star, ArrowRight, Check, Compass, Hotel, Car, Utensils, Ticket } from "lucide-react";
import type { Journey } from "@/feature/journey/type";
import { journeyPackageHref, journeyCardTitle } from "@/feature/journey/filterOptions";
import { travelExperienceIcon } from "@/components/shared/TravelExperiencePills";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { WhatsAppPriceButton } from "@/components/shared/WhatsAppPriceButton";
import { QuoteModal } from "@/components/shared/QuoteModal";

function PackageImageWithFallback({ src, alt }: { src?: string; alt?: string }) {
  return (
    <FallbackImage
      src={src}
      alt={alt || "KoiKoi Travel Package"}
      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      fallbackSrc="/logo-with-name.png"
      theme="light"
    />
  );
}

function getUniquePackageRating(journey: Journey) {
  const str = (journey.id || journey.title || journey.slug || "package") + "";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const ratings = ["4.8", "4.9", "4.7", "5.0", "4.9", "4.8", "4.9"];
  const rating = ratings[Math.abs(hash) % ratings.length];

  const reviewCounts = [84, 142, 65, 118, 93, 210, 56, 175, 129, 98];
  const reviewsCount = reviewCounts[Math.abs(hash * 7) % reviewCounts.length];

  return { rating, reviewsCount };
}

function InclusionHotelIcon({ className = "w-5.5 h-5.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth="1.6">
      <rect x="5" y="3" width="14" height="18" rx="1.5" stroke="currentColor" className="text-white" />
      <rect x="8" y="6" width="2" height="2" rx="0.5" fill="currentColor" className="text-white/90" />
      <rect x="14" y="6" width="2" height="2" rx="0.5" fill="currentColor" className="text-white/90" />
      <rect x="8" y="10" width="2" height="2" rx="0.5" fill="currentColor" className="text-white/90" />
      <rect x="14" y="10" width="2" height="2" rx="0.5" fill="currentColor" className="text-white/90" />
      <rect x="8" y="14" width="2" height="2" rx="0.5" fill="currentColor" className="text-white/90" />
      <rect x="14" y="14" width="2" height="2" rx="0.5" fill="currentColor" className="text-white/90" />
      <path d="M10 21V17.5C10 17.22 10.22 17 10.5 17H13.5C13.78 17 14 17.22 14 17.5V21" fill="#2E8B8B" stroke="#2E8B8B" strokeWidth="0.8" />
    </svg>
  );
}

function InclusionMealsIcon({ className = "w-5.5 h-5.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 19H21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="text-white" />
      <path d="M4.5 17C4.5 11.5 7.8 7.5 12 7.5C16.2 7.5 19.5 11.5 19.5 17H4.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" className="text-white" />
      <circle cx="12" cy="5.2" r="1.8" fill="#2E8B8B" stroke="#2E8B8B" strokeWidth="0.6" />
    </svg>
  );
}

function InclusionSightseeingIcon({ className = "w-5.5 h-5.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 8.5L7.5 18H10.5L9.5 8.5H6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className="text-white" />
      <path d="M18 8.5L16.5 18H13.5L14.5 8.5H18Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className="text-white" />
      <rect x="9" y="10.5" width="6" height="3" rx="1" fill="#2E8B8B" stroke="#2E8B8B" strokeWidth="0.5" />
      <rect x="5.5" y="6" width="4" height="2.5" rx="0.8" stroke="currentColor" strokeWidth="1.5" className="text-white" />
      <rect x="14.5" y="6" width="4" height="2.5" rx="0.8" stroke="currentColor" strokeWidth="1.5" className="text-white" />
      <line x1="7" y1="18" x2="11" y2="18" stroke="#2E8B8B" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="18" x2="17" y2="18" stroke="#2E8B8B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function InclusionTransfersIcon({ className = "w-5.5 h-5.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 13L8 7.5H16L18 13" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className="text-white" />
      <rect x="4" y="12" width="16" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" className="text-white" />
      <circle cx="7.5" cy="18" r="2" fill="#2E8B8B" stroke="#2E8B8B" strokeWidth="1.3" className="text-white" />
      <circle cx="16.5" cy="18" r="2" fill="#2E8B8B" stroke="#2E8B8B" strokeWidth="1.3" className="text-white" />
    </svg>
  );
}

export default function TourPackageCard({
  journey,
  contextName,
  variant = "default",
}: {
  journey: Journey;
  contextName?: string;
  variant?: "default" | "compact";
}) {
  const price = journey.discountPrice ?? journey.pricePerPerson ?? 0;
  const hasDiscount = journey.discountPrice && journey.discountPrice > price;
  const offPercent = hasDiscount
    ? Math.round(((journey.discountPrice! - price) / journey.discountPrice!) * 100)
    : 0;
  const state = journey.cities?.[0]?.state?.title;
  const href = journeyPackageHref(journey);
  const { rating, reviewsCount } = contextName ? getUniquePackageRating(journey) : { rating: null, reviewsCount: 0 };
  const isCompact = variant === "compact";

  // Filter out "Golden Triangle" / "Golden Triangle Tour India"
  const travelExperiences = (journey.travelExperiences || []).filter(
    (t) => !t.title.toLowerCase().includes("golden triangle")
  );

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)] hover:-translate-y-1.5 transition-all duration-350 ease-out h-full"
    >
      {/* Image Container */}
      <Link href={href} className="relative h-[240px] w-full overflow-hidden shrink-0 block">
        <PackageImageWithFallback
          src={journey.thumbImg || journey.banner?.images?.[0] || ""}
          alt={`${journey.h1Title || journey.title}${journey.destination ? ` - ${journey.destination}` : ""} Tour Package | KoiKoi Travel`}
        />

        {/* Subtle Edge Vignettes */}
        <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          {journey.isBestSelling ? (
            <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-900 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md pointer-events-auto">
              <Star size={10} fill="currentColor" className="text-slate-900" /> Best Seller
            </span>
          ) : <span />}

          {hasDiscount && offPercent > 0 && (
            <span className="bg-[#F8904D] text-white text-[10.5px] font-semibold px-2 py-0.5 rounded-full shadow-md pointer-events-auto shrink-0">
              {offPercent}% OFF
            </span>
          )}
        </div>

        {/* Bottom Inclusions Bar (MakeMyTrip / OTA Style Overlay with Prominent Icons & Text) */}
        {!isCompact && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent pt-9 pb-3 px-3.5 flex items-end justify-between pointer-events-none">
            <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full max-w-[290px]">
              <div className="flex flex-col items-center text-center">
                <InclusionHotelIcon className="w-5.5 h-5.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
                <span className="text-[11px] sm:text-[11.5px] font-medium text-white mt-1 tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">Hotels</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <InclusionMealsIcon className="w-5.5 h-5.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
                <span className="text-[11px] sm:text-[11.5px] font-medium text-white mt-1 tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">Meals</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <InclusionSightseeingIcon className="w-5.5 h-5.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
                <span className="text-[11px] sm:text-[11.5px] font-medium text-white mt-1 tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">Sightseeing</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <InclusionTransfersIcon className="w-5.5 h-5.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
                <span className="text-[11px] sm:text-[11.5px] font-medium text-white mt-1 tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">Transfers</span>
              </div>
            </div>

            {contextName && rating && (
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-black/55 backdrop-blur-md border border-white/20 px-2.5 py-0.5 rounded-full shadow-sm mb-0.5">
                <Star size={10} fill="currentColor" className="text-amber-400 shrink-0" />
                <span>{rating} <span className="text-white/70 font-normal text-[10px]">({reviewsCount})</span></span>
              </div>
            )}
          </div>
        )}
      </Link>

      {/* Content Container */}
      <div className={`flex flex-col flex-1 bg-white relative z-10 ${isCompact ? "p-4 sm:p-5" : "p-4.5 sm:p-5"}`}>

        {/* Title with font-weight 500 & relaxed line-height */}
        <Link href={href} className="inline-block mb-1.5">
          <h3 className="text-[15.5px] sm:text-[16.5px] font-medium text-slate-900 line-clamp-2 leading-[1.42] tracking-[-0.01em] group-hover:text-[#2E8B8B] transition-colors min-h-[46px]">
            {journeyCardTitle(journey)}
          </h3>
        </Link>

        {!isCompact && (
          <>
            {/* Route / Destination */}
            {(journey.destination || state) && (
              <div className="flex items-center gap-1.5 mb-2.5 text-[12.5px] text-slate-500 font-normal">
                <MapPin size={14} className="shrink-0 text-[#2E8B8B]" />
                <span className="truncate">{journey.destination || state}</span>
              </div>
            )}

            {/* Travel Experiences Badges (Filtered, Before Highlights) */}
            {travelExperiences.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-3">
                {travelExperiences.slice(0, 2).map((t) => (
                  <span
                    key={t.id}
                    className="inline-flex items-center gap-1 text-[11px] font-normal text-slate-700 bg-slate-50 border border-slate-200/90 px-2.5 py-0.5 rounded-full shadow-2xs"
                  >
                    {travelExperienceIcon(t.title, "w-3 h-3 text-[#2E8B8B]")}
                    <span>{t.title}</span>
                  </span>
                ))}
                {travelExperiences.length > 2 && (
                  <span className="inline-flex items-center text-[10.5px] font-medium text-[#2E8B8B] bg-teal-50/90 border border-teal-200/80 px-2 py-0.5 rounded-full">
                    +{travelExperiences.length - 2} more
                  </span>
                )}
              </div>
            )}

            {/* Highlights List */}
            {(journey.highlights?.length ?? 0) > 0 ? (
              <div className="space-y-2 mb-4">
                {journey.highlights!.slice(0, 3).map((hl, i) => (
                  <div key={i} className="flex items-start gap-2 text-[12.5px] sm:text-[13px] text-slate-600 leading-[1.4]">
                    <Check size={14} className="shrink-0 text-slate-500 stroke-[2.2] mt-0.5" />
                    <span className="line-clamp-1">{hl}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-4" />
            )}
          </>
        )}

        {/* Pricing & CTA Section */}
        <div className="mt-auto pt-2 flex flex-col gap-2.5">
          {/* Price Header (Only when price > 0) */}
          {price > 0 && (
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[11.5px] text-slate-400 font-normal">Starts from</span>
                <span className="text-[17px] font-medium text-slate-900 tracking-tight">
                  ₹{price.toLocaleString("en-IN")}
                </span>
                <span className="text-[11.5px] text-slate-400 font-normal">/ person</span>
              </div>
              {hasDiscount && offPercent > 0 && (
                <span className="text-[11.5px] text-slate-400 line-through">
                  ₹{journey.discountPrice!.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          )}

          {/* Action Buttons Row (Default Minimalist Outline -> Card Hover Active Background) */}
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <WhatsAppPriceButton
              packageName={journey.h1Title || journey.title}
              label="WhatsApp"
              className="w-full py-2.5 px-2 bg-transparent group-hover:bg-emerald-50/80 active:scale-95 border border-slate-200/90 group-hover:border-emerald-200/90 text-slate-700 group-hover:text-emerald-800 font-medium text-[12px] tracking-tight rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap"
              iconClassName="w-3.5 h-3.5 fill-[#25D366] shrink-0"
            />
            <Link
              href={href}
              title="View Details"
              className="w-full py-2.5 px-2 rounded-xl bg-transparent group-hover:bg-[#F8904D] border border-slate-300 group-hover:border-[#F8904D] text-slate-800 group-hover:text-white active:scale-95 font-medium text-[12px] tracking-tight flex items-center justify-center gap-1 transition-all duration-300 cursor-pointer whitespace-nowrap shadow-2xs group-hover:shadow-sm"
            >
              <span>View Details</span>
              <ArrowRight size={13} className="shrink-0 stroke-[2.2]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
