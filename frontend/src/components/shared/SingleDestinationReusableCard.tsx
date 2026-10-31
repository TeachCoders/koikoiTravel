"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FallbackImage } from "@/components/shared/FallbackImage";

export interface SingleDestinationReusableCardProps {
  title: string;
  image?: string | null;
  eyebrow?: string;
  tag?: string;
  description?: string;
  subtitle?: ReactNode;
  region?: string;
  tourCount?: number;
  tourCountText?: string;
  href?: string;
  className?: string;
  aspectRatio?: "portrait" | "standard";
  sizes?: string;
  priority?: boolean;
}

/**
 * SingleDestinationReusableCard
 * Universal, reusable destination card component used across site (Home, Country, State, City spotlights).
 * Supports both linkable and static card modes, responsive aspect ratio, fallback watermark, and crisp overlays.
 */
export function SingleDestinationReusableCard({
  title,
  image,
  eyebrow,
  tag,
  description,
  subtitle,
  region,
  tourCount,
  tourCountText,
  href,
  className,
  aspectRatio = "portrait",
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px",
  priority = false,
}: SingleDestinationReusableCardProps) {
  const displayEyebrow = eyebrow || tag;
  const displayDescription = description || (typeof subtitle === "string" ? subtitle : null);
  const displayTours =
    tourCountText ||
    (tourCount !== undefined
      ? tourCount > 0
        ? `${tourCount} Tours`
        : "Explore"
      : null);

  const cardContent = (
    <div
      className={cn(
        "group relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-end p-3.5 sm:p-4 text-left select-none",
        aspectRatio === "portrait"
          ? "aspect-[3/4] min-h-[290px] sm:min-h-[320px]"
          : "h-[310px] sm:h-[340px] md:h-[365px]",
        className
      )}
    >
      {/* Background Image with Fallback watermark */}
      <FallbackImage
        src={image}
        alt={`${title} Tour Packages & Sightseeing | KoiKoi Travel`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        fallbackSrc="/logo-with-name.png"
      />

      {/* Cinematic dark gradient at the bottom for crystal-clear readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none z-10" />

      {/* Optional top-right badge if tag is used separately from eyebrow */}
      {tag && eyebrow && tag !== eyebrow && (
        <div className="absolute top-3 right-3 z-20">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#F8904D] text-white shadow-xs">
            {tag}
          </span>
        </div>
      )}

      {/* Bottom Content Container */}
      <div className="relative z-20 text-white flex flex-col justify-end w-full">
        {displayEyebrow && (
          <span className="text-[10px] sm:text-[10.5px] font-bold text-[#F8904D] tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-1 mb-1">
            {displayEyebrow}
          </span>
        )}

        <h3 className="font-bold text-base sm:text-lg md:text-xl text-white group-hover:text-[#F8904D] transition-colors leading-tight line-clamp-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] font-heading">
          {title}
        </h3>

        {(displayDescription || subtitle) && (
          <p className="text-[11px] sm:text-xs text-white/90 mt-1 line-clamp-2 font-medium leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {displayDescription || subtitle}
          </p>
        )}

        {/* Bottom pill row */}
        {(region || displayTours) && (
          <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-white/20 text-[10.5px] sm:text-[11px] font-semibold text-white/95">
            {region ? (
              <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 truncate max-w-[62%]">
                {region}
              </span>
            ) : (
              <span />
            )}
            {displayTours && (
              <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 shrink-0 text-white font-bold">
                {displayTours}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F8904D] rounded-2xl"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

export default SingleDestinationReusableCard;
