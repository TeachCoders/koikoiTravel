"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Star, ArrowRight, CheckCircle2, Compass, Hotel, Car, Utensils, Ticket } from "lucide-react";
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

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)] hover:-translate-y-1.5 transition-all duration-350 ease-out h-full"
    >
      {/* Image Container */}
      <Link href={href} className="relative h-[230px] w-full overflow-hidden shrink-0 block">
        <PackageImageWithFallback
          src={journey.thumbImg || journey.banner?.images?.[0] || ""}
          alt={`${journey.h1Title || journey.title}${journey.destination ? ` - ${journey.destination}` : ""} Tour Package | KoiKoi Travel`}
        />

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        {!isCompact && (
          <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-start pointer-events-none">
            <div className="flex flex-col gap-2 items-start pointer-events-auto">
              {journey.isBestSelling && (
                <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-900 text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  <Star size={11} fill="currentColor" className="text-slate-900" /> Best Seller
                </span>
              )}
            </div>
            {hasDiscount && offPercent > 0 && (
              <span className="bg-[#F8904D] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md pointer-events-auto">
                {offPercent}% OFF
              </span>
            )}
          </div>
        )}

        {/* Dynamic Context Icon (Top Right) */}
        {!isCompact && contextName && (
          <div
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white shadow-md pointer-events-none"
            title={contextName}
          >
            {travelExperienceIcon(contextName, "w-4 h-4")}
          </div>
        )}

        {/* Bottom Image Info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {journey.noDays > 0 && (
            <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white bg-black/55 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full shadow-sm">
              <Clock size={13} className="opacity-90" />
              {journey.noDays === 1 ? "1 Day" : `${journey.noDays - 1}N / ${journey.noDays}D`}
            </span>
          )}
          {!isCompact && contextName && rating && (
            <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-amber-300 bg-black/50 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full shadow-sm">
              <Star size={11} fill="currentColor" className="text-amber-400 shrink-0" />
              <span>{rating} <span className="text-white/80 font-normal">({reviewsCount})</span></span>
            </span>
          )}
        </div>
      </Link>

      {/* Content Container */}
      <div className={`flex flex-col flex-1 bg-white relative z-10 ${isCompact ? "p-4 sm:p-5" : "p-5 sm:p-6"}`}>
        <Link href={href} className={`inline-block ${isCompact ? "mb-auto" : "mb-2.5"}`}>
          <h3 className="text-[16.5px] sm:text-[17px] font-semibold text-slate-900 line-clamp-2 leading-[1.38] group-hover:text-[#2E8B8B] transition-colors">
            {journeyCardTitle(journey)}
          </h3>
        </Link>

        {!isCompact && (
          <>
            {/* Route / Destination */}
            {(journey.destination || state) && (
              <div className="flex items-start gap-1.5 mb-3 text-[13px] text-slate-500 font-medium">
                <MapPin size={15} className="shrink-0 text-[#2E8B8B] mt-[2px]" />
                <span className="line-clamp-1">{journey.destination || state}</span>
              </div>
            )}

            {/* Inclusions Feature Badges */}
            <div className="flex items-center justify-between gap-1 py-2 px-2.5 mb-3.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-semibold text-slate-600">
              <span title="3★/4★ Handpicked Hotels" className="flex items-center gap-1">
                <Hotel size={13} className="text-slate-800" /> Hotel
              </span>
              <span className="text-slate-300">•</span>
              <span title="Private Cab Transfers" className="flex items-center gap-1">
                <Car size={13} className="text-slate-800" /> Cab
              </span>
              <span className="text-slate-300">•</span>
              <span title="Daily Breakfast Included" className="flex items-center gap-1">
                <Utensils size={13} className="text-slate-800" /> Meals
              </span>
              <span className="text-slate-300">•</span>
              <span title="Guided Sightseeing" className="flex items-center gap-1">
                <Ticket size={13} className="text-slate-800" /> Tours
              </span>
            </div>

            {/* Experience Pills */}
            {(journey.travelExperiences?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {journey.travelExperiences!.slice(0, 3).map((t) => (
                  <span
                    key={t.id}
                    className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#2E8B8B] bg-teal-50/80 border border-teal-200/50 px-2.5 py-0.5 rounded-full"
                  >
                    {travelExperienceIcon(t.title, "w-3 h-3")}
                    {t.title}
                  </span>
                ))}
              </div>
            )}

            {/* Highlights List */}
            {(journey.highlights?.length ?? 0) > 0 && (
              <div className="space-y-2 mb-5">
                {journey.highlights!.slice(0, 3).map((hl, i) => (
                  <div key={i} className="flex items-start gap-2 text-[13.5px] text-slate-600 font-medium leading-snug">
                    <CheckCircle2 size={15} className="shrink-0 text-[#2E8B8B] mt-[2px]" />
                    <span className="line-clamp-1">{hl}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Pricing & CTA - Balanced 2-Column Action Bar */}
        <div className="mt-auto pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Column 1: Teal Green Price Action Button */}
          <WhatsAppPriceButton
            packageName={journey.h1Title || journey.title}
            label={price > 0 ? `₹${price.toLocaleString()} • WhatsApp` : "Price on Request"}
            className="px-3 py-2 bg-[#2E8B8B] hover:bg-[#247070] active:scale-95 text-white font-semibold tracking-tight rounded-xl text-[12.5px] flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm shadow-[#2E8B8B]/20 whitespace-nowrap shrink-0"
            iconClassName="w-3.5 h-3.5 fill-white shrink-0"
          />

          {/* Column 2: Details Button - Outlined Orange */}
          <Link
            href={href}
            title="View Details"
            className="group/btn flex items-center gap-1.5 px-3 py-2 rounded-xl bg-orange-50/70 border border-orange-200 text-[#F8904D] hover:bg-[#F8904D] hover:border-[#F8904D] hover:text-white hover:shadow-md hover:shadow-[#F8904D]/25 active:scale-95 font-semibold tracking-tight text-[12.5px] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>View Details</span>
            <ArrowRight
              size={14}
              className="shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
