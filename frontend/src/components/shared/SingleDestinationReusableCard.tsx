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
  aspectRatio?: "portrait" | "standard" | "4/3" | "16/10" | "3/2";
  imagePosition?: "top" | "center";
  sizes?: string;
  priority?: boolean;
}

/**
 * SingleDestinationReusableCard
 * Universal, reusable destination card used across the site (Home, Country, State, City spotlights).
 *
 * Layout: photo on top with natural 4:3 aspect ratio and object-top framing
 * so monument domes and spires never get cropped. White content area below with
 * eyebrow, title, short description and View Tours CTA.
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
  aspectRatio = "4/3",
  imagePosition = "top",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px",
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

  const photoAspectClass =
    aspectRatio === "standard" || aspectRatio === "16/10"
      ? "aspect-[16/10]"
      : aspectRatio === "3/2"
      ? "aspect-[3/2]"
      : "aspect-[4/3]";

  const photoContent = (
    <>
      <FallbackImage
        src={image}
        alt={`${title} Tour Packages & Sightseeing | KoiKoi Travel`}
        fill
        sizes={sizes}
        quality={90}
        priority={priority}
        className={cn(
          "object-cover transition-transform duration-700 ease-out group-hover:scale-108",
          imagePosition === "top" ? "object-top" : "object-center"
        )}
        fallbackSrc="/logo-with-name.png"
      />

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
    </>
  );

  return (
    <div
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white text-left",
        "shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:border-slate-300",
        className
      )}
    >
      {/* 1. Photo area: linked separately */}
      {href ? (
        <Link
          href={href}
          aria-label={`View ${title} tour packages`}
          className={cn("relative block w-full overflow-hidden bg-[#F4EBDD]", photoAspectClass)}
        >
          {photoContent}
        </Link>
      ) : (
        <div className={cn("relative w-full overflow-hidden bg-[#F4EBDD]", photoAspectClass)}>
          {photoContent}
        </div>
      )}

      {/* Content area */}
      <div className="flex flex-1 flex-col gap-1.5 p-4 sm:p-5">
        {displayEyebrow && (
          <span className="line-clamp-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#F8904D]">
            {displayEyebrow}
          </span>
        )}

        {/* 2. Title: linked separately */}
        <h3 className="font-heading line-clamp-1 text-lg font-bold leading-tight text-slate-900 sm:text-xl">
          {href ? (
            <Link
              href={href}
              className="transition-colors duration-200 hover:text-[#F8904D] group-hover:text-[#F8904D]"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>

        {(displayDescription || subtitle) && (
          <p className="line-clamp-3 flex-1 text-[13px] leading-relaxed text-slate-600">
            {displayDescription || subtitle}
          </p>
        )}

        {/* 3. Footer / View tours CTA: linked separately */}
        {href && (
          <Link
            href={href}
            className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3.5 transition-colors group/cta"
          >
            <span className="text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover:text-[#F8904D] group-hover/cta:text-[#F8904D]">
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
          </Link>
        )}
      </div>
    </div>
  );
}

export default SingleDestinationReusableCard;