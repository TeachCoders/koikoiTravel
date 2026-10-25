"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Star, ArrowRight, Check, Compass, Hotel, Car, Utensils, Ticket, Users, Tag } from "lucide-react";
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
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

function capitalizeWords(str: string): string {
  if (!str) return "";
  return str
    .split(/\s+/)
    .map((w) => (w.length > 0 ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
    .join(" ");
}

export function formatRouteText(journey: Partial<Journey>, stateFallback?: string): string {
  if (journey.destination && journey.destination.trim()) {
    return journey.destination
      .split(/[-–—,→]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => capitalizeWords(s))
      .join(" · ");
  }

  if (journey.route && journey.route.length > 0) {
    return journey.route
      .map((c: any) => capitalizeWords(c.h1Title || c.title || c.name || ""))
      .filter(Boolean)
      .join(" · ");
  }

  if (journey.cities && journey.cities.length > 0) {
    return journey.cities
      .map((c: any) => capitalizeWords(c.h1Title || c.title || c.name || ""))
      .filter(Boolean)
      .join(" · ");
  }

  return stateFallback ? capitalizeWords(stateFallback) : "";
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
  const state =
    journey.cities?.[0]?.state?.h1Title || journey.cities?.[0]?.state?.title;
  const href = journeyPackageHref(journey);
  const { rating, reviewsCount } = contextName ? getUniquePackageRating(journey) : { rating: null, reviewsCount: 0 };
  const isCompact = variant === "compact";

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)] hover:-translate-y-1.5 transition-all duration-350 ease-out h-full"
    >
      {/* Image Container */}
      <Link href={href} className="relative h-[220px] sm:h-[230px] w-full overflow-hidden shrink-0 block">
        <PackageImageWithFallback
          src={journey.thumbImg || journey.banner?.images?.[0] || ""}
          alt={`${journey.h1Title || journey.title}${journey.destination ? ` - ${journey.destination}` : ""} Tour Package | KoiKoi Travel`}
        />
      </Link>

      {/* Content Container */}
      <div className={`flex flex-col flex-1 bg-white relative z-10 ${isCompact ? "p-4 sm:p-5" : "p-4.5 sm:p-5"}`}>

        {/* Title with font-bold & relaxed line-height */}
        <Link href={href} className="inline-block mb-1">
          <h3 className="text-[17px] sm:text-[18px] font-bold text-slate-900 line-clamp-2 leading-[1.3] tracking-tight group-hover:text-[#F8904D] transition-colors min-h-[46px]">
            {journeyCardTitle(journey)}
          </h3>
        </Link>

        {!isCompact && (
          <>
            {/* Route / Destination in Teal */}
            {(journey.destination || state || (journey.route && journey.route.length > 0)) && (
              <div className="text-[13px] sm:text-[13.5px] text-[#2E8B8B] font-medium mb-3 truncate">
                {formatRouteText(journey, state)}
              </div>
            )}

            {/* Highlights List with Teal Checks */}
            {(journey.highlights?.length ?? 0) > 0 ? (
              <div className="space-y-1.5 mb-3">
                {journey.highlights!.slice(0, 3).map((hl, i) => (
                  <div key={i} className="flex items-start gap-2 text-[13px] text-slate-700 font-normal leading-[1.4]">
                    <Check size={14} className="shrink-0 text-[#2E8B8B] stroke-[2.5] mt-0.5" />
                    <span className="line-clamp-1">{hl}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-3" />
            )}
          </>
        )}

        {/* Dashed Separator + Inclusions + Buttons */}
        <div className="mt-auto pt-3 border-t border-dashed border-slate-200">
          <div className="text-[12px] sm:text-[12.5px] text-slate-500 font-normal mb-3 tracking-tight">
            Hotels · Meals · Sightseeing · Transfers
          </div>

          {/* Action Buttons Row */}
          <div className="grid grid-cols-2 gap-2.5">
            <QuoteModal>
              <button
                type="button"
                className="w-full py-2.5 px-3 rounded-full bg-[#F8904D] hover:bg-[#E96A1E] text-white font-semibold text-xs sm:text-[13.5px] shadow-2xs transition-all duration-200 cursor-pointer text-center active:scale-98"
              >
                Get a quote
              </button>
            </QuoteModal>
            <Link
              href={href}
              className="w-full py-2.5 px-3 rounded-full bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold text-xs sm:text-[13.5px] transition-all duration-200 cursor-pointer text-center flex items-center justify-center active:scale-98"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
