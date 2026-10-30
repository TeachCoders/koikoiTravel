"use client";

import React, { useMemo } from "react";
import HeroSlider, { HeroSlideItem } from "@/components/shared/HeroSlider";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { ImageWatermark } from "@/components/shared/ImageWatermark";

export interface HeroBannerProps {
  /** Array of slides with desktop image and optional dedicated mobile image */
  slides?: HeroSlideItem[];
  /** Backward-compatible array of image URLs (auto-converted to slides) */
  images?: string[];
  /** Fallback single image if no slides/images provided */
  fallbackImage?: string | null;
  /** Image alt text */
  alt?: string;
  /** Eyebrow tag / pill above title (e.g. "ICONIC CIRCUIT #1") */
  tag?: string | null;
  /** Main heading title */
  title?: React.ReactNode;
  /** Optional subtitle or description */
  subtitle?: React.ReactNode;
  /** Content alignment: "center" (default for inner pages) or "left" (for Home page) */
  align?: "center" | "left";
  /** Gradient overlay style: "bottom" (default) or "left-and-bottom" (for left-aligned text) */
  gradient?: "bottom" | "left-and-bottom";
  /** Auto slide interval in ms (default: 6000) */
  interval?: number;
  /** Custom children (e.g. CTA buttons, search bar, modals) placed inside the banner */
  children?: React.ReactNode;
  /** Custom height classes (defaults to 30% taller cinematic ratio) */
  heightClass?: string;
  /** Additional container classes */
  className?: string;
}

/**
 * Universal HeroBanner Component
 * 
 * Reusable across Home Page, State/Circuit (Golden Triangle), City, Country,
 * Travel Experience, Season, and Tour Package pages.
 * 
 * Ensures:
 * - 100% sharp 16:5 / 3:2 panoramic aspect ratio (zero blur, zero stretching)
 * - Seamless horizontal sliding transition with touch swipe on mobile
 * - Unified typography, frosted glass tags, and subtle dark gradient overlays
 */
export default function HeroBanner({
  slides,
  images,
  fallbackImage,
  alt = "KoiKoi Travel",
  tag,
  title,
  subtitle,
  align = "center",
  gradient = "bottom",
  interval = 6000,
  children,
  heightClass = "h-[80vw] min-h-[365px] max-h-[630px] md:h-[41vw] md:min-h-[505px] md:max-h-[735px]",
  className = "",
}: HeroBannerProps) {
  // Normalize slides
  const normalizedSlides: HeroSlideItem[] = useMemo(() => {
    if (slides && slides.length > 0) {
      return slides.filter((s) => Boolean(s.image));
    }
    if (images && images.length > 0) {
      return images.filter(Boolean).map((img) => ({ image: img, mobileImage: null }));
    }
    return [];
  }, [slides, images]);

  const hasSlides = normalizedSlides.length > 0;
  const hasFallback = !hasSlides && Boolean(fallbackImage);

  return (
    <section
      className={`relative w-full ${heightClass} overflow-hidden flex items-center justify-center ${
        hasSlides || hasFallback ? "bg-slate-900" : "bg-slate-100"
      } z-20 ${className}`}
    >
      {/* 1. Background Layer: Slides, Fallback, or Watermark */}
      {hasSlides ? (
        <>
          <HeroSlider slides={normalizedSlides} alt={alt} interval={interval} />
          {/* Subtle bottom-to-top gradient for high text contrast without muddying photo clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10 z-10 pointer-events-none" />
          {/* Optional left-to-right gradient for left-aligned content (e.g. Home page) */}
          {gradient === "left-and-bottom" && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent z-10 pointer-events-none" />
          )}
        </>
      ) : hasFallback ? (
        <div className="absolute inset-0">
          <FallbackImage
            src={fallbackImage!}
            alt={alt}
            fill
            priority
            className="object-cover object-center"
            theme="light"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10 z-10 pointer-events-none" />
        </div>
      ) : (
        <div className="absolute inset-0">
          <ImageWatermark />
        </div>
      )}

      {/* 2. Content Overlay Layer */}
      <div
        className={`relative z-30 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 h-full w-full flex flex-col justify-center pointer-events-none py-4 sm:py-6 md:py-8 ${
          align === "center" ? "items-center text-center" : "items-start text-left font-outfit"
        }`}
      >
        {/* Eyebrow Tag / Badge */}
        {tag && (
          <div className="mb-2 sm:mb-4 pointer-events-auto">
            <div
              className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-xs ${
                hasSlides || hasFallback
                  ? "bg-slate-950/60 backdrop-blur-md border border-white/20 text-white"
                  : "bg-white/95 border border-slate-300 text-slate-800"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F8904D] shadow-[0_0_8px_#F8904D]" />
              <span className="font-luxury font-bold text-[11px] sm:text-xs md:text-[13px] uppercase tracking-[0.14em] sm:tracking-[0.22em] select-none">
                {tag}
              </span>
            </div>
          </div>
        )}

        {/* Title */}
        {title && (
          typeof title === "string" ? (
            <div
              className={`font-luxury text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-wide ${
                hasSlides || hasFallback
                  ? "text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
                  : "text-slate-900 drop-shadow-xs"
              }`}
            >
              {title}
            </div>
          ) : (
            title
          )
        )}

        {/* Subtitle */}
        {subtitle && (
          typeof subtitle === "string" ? (
            <p
              className={`hidden sm:block mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-3xl font-medium leading-relaxed ${
                hasSlides || hasFallback
                  ? "text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
                  : "text-slate-600"
              }`}
            >
              {subtitle}
            </p>
          ) : (
            subtitle
          )
        )}

        {/* Custom Children (Buttons, CTA, Modals) */}
        {children}
      </div>
    </section>
  );
}

