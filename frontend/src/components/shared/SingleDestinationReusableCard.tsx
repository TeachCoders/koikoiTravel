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
 * Universal, reusable destination card used across the site (Home, Country, State, City spotlights).
 *
 * Layout: photo on top, white content area below. Text never sits on the photo,
 * so it stays readable with any image (and when the image is missing, the
 * fallback logo watermark shows on a soft tint instead of a broken-looking card).
 * Supports linkable and static modes. Props are unchanged from the previous version.
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
        "group relative flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white text-left select-none",
        "shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:border-slate-300",
        className
      )}
    >
      {/* Photo area */}
      <div
        className={cn(
          "relative w-full overflow-hidden bg-[#F4EBDD]",
          aspectRatio === "portrait"
            ? "h-[210px] sm:h-[230px] md:h-[240px]"
            : "h-[170px] sm:h-[190px] md:h-[200px]"
        )}
      >
        <FallbackImage
          src={image}
          alt={`${title} Tour Packages & Sightseeing | KoiKoi Travel`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
          fallbackSrc="/logo-with-name.png"
        />

        {/* Region chip (top-left) */}
        {region && (
          <span className="absolute left-3 top-3 z-10 max-w-[60%] truncate rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-sm transition-shadow group-hover:shadow-md">
            {region}
          </span>
        )}

        {/* Tours badge (top-right) */}
        {displayTours && (
          <span className="absolute right-3 top-3 z-10 shrink-0 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition-shadow group-hover:shadow-md">
            {displayTours}
          </span>
        )}

        {/* Extra tag, only when it differs from the eyebrow (bottom-left) */}
        {tag && eyebrow && tag !== eyebrow && (
          <span className="absolute bottom-3 left-3 z-10 rounded-full bg-[#F8904D] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
            {tag}
          </span>
        )}
      </div>

      {/* Content area */}
      <div className="flex flex-1 flex-col gap-1.5 p-4 sm:p-5">
        {displayEyebrow && (
          <span className="line-clamp-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#F8904D]">
            {displayEyebrow}
          </span>
        )}

        <h3 className="font-heading line-clamp-1 text-lg font-bold leading-tight text-slate-900 transition-colors duration-200 group-hover:text-[#F8904D] sm:text-xl">
          {title}
        </h3>

        {(displayDescription || subtitle) && (
          <p className="line-clamp-2 flex-1 text-[13px] leading-relaxed text-slate-600">
            {displayDescription || subtitle}
          </p>
        )}

        {/* Footer: only for clickable cards */}
        {href && (
          <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-3.5">
            <span className="text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover:text-[#F8904D]">
              View tours
            </span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#F8904D] text-white shadow-xs transition-all duration-300 ease-out group-hover:bg-[#E87A36] group-hover:scale-105 group-hover:translate-x-1 group-hover:shadow-md">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group block w-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F8904D] focus-visible:ring-offset-2"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

export default SingleDestinationReusableCard;