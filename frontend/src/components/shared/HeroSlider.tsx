"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FallbackImage from "@/components/shared/FallbackImage";

export interface HeroSlideItem {
  image: string;
  mobileImage?: string | null;
  alt?: string;
}

interface HeroSliderProps {
  images?: string[];
  slides?: HeroSlideItem[];
  alt?: string;
  interval?: number;
}

export default function HeroSlider({ images, slides, alt = "", interval = 5000 }: HeroSliderProps) {
  const normalizedSlides: HeroSlideItem[] = (
    slides && slides.length > 0
      ? slides
      : (images || []).map((img) => ({ image: img, mobileImage: null }))
  ).filter(
    (s) =>
      s.image &&
      !s.image.includes("unsplash.com") &&
      !s.image.includes("via.placeholder.com") &&
      !s.image.includes("placeholder.com")
  );

  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => {
    if (normalizedSlides.length === 0) return;
    setCurrent((prev) => (prev + 1) % normalizedSlides.length);
  }, [normalizedSlides.length]);

  const prev = useCallback(() => {
    if (normalizedSlides.length === 0) return;
    setCurrent((prev) => (prev - 1 + normalizedSlides.length) % normalizedSlides.length);
  }, [normalizedSlides.length]);

  // Reset timer on slide change so user gets full interval after manual click
  useEffect(() => {
    if (normalizedSlides.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [normalizedSlides.length, interval, next, current]);

  if (normalizedSlides.length === 0) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) next();
          else prev();
        }
        touchStartX.current = null;
      }}
    >
      {/* Slide track */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out pointer-events-none"
        style={{
          width: `${normalizedSlides.length * 100}%`,
          transform: `translateX(-${(current * 100) / normalizedSlides.length}%)`,
        }}
      >
        {normalizedSlides.map((slide, i) => (
          <div
            key={i}
            className="relative h-full shrink-0 bg-slate-200 pointer-events-none"
            style={{ width: `${100 / normalizedSlides.length}%` }}
          >
            <SlideImage
              src={slide.image}
              mobileSrc={slide.mobileImage}
              alt={slide.alt || alt}
              priority={i === 0}
              preload={true}
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows (desktop) */}
      {normalizedSlides.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous slide"
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 bg-black/25 hover:bg-black/50 backdrop-blur-sm border border-white/20 rounded-full items-center justify-center text-white transition-all cursor-pointer pointer-events-auto"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              next();
            }}
            aria-label="Next slide"
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 bg-black/25 hover:bg-black/50 backdrop-blur-sm border border-white/20 rounded-full items-center justify-center text-white transition-all cursor-pointer pointer-events-auto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot pagination */}
      {normalizedSlides.length > 1 && (
        <div className="absolute bottom-2.5 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center pointer-events-auto select-none">
          {normalizedSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrent(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className="p-3 sm:p-3.5 flex items-center justify-center cursor-pointer focus:outline-none pointer-events-auto"
            >
              <span
                className={`block rounded-full transition-all duration-300 pointer-events-none ${
                  i === current
                    ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-[#F8904D]"
                    : "w-2 sm:w-2.5 h-1.5 sm:h-2 bg-white/60 hover:bg-white"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SlideImage({
  src,
  mobileSrc,
  alt,
  priority,
  preload,
}: {
  src: string;
  mobileSrc?: string | null;
  alt: string;
  priority?: boolean;
  preload?: boolean;
}) {
  if (mobileSrc) {
    return (
      <>
        {/* Mobile Viewport */}
        <div className="block sm:hidden absolute inset-0">
          <FallbackImage
            src={mobileSrc}
            alt={alt}
            fill
            priority={priority}
            loading={preload ? "eager" : undefined}
            quality={80}
            sizes="100vw"
            theme="light"
            className="object-cover object-center"
          />
        </div>
        {/* Desktop & Tablet Viewport */}
        <div className="hidden sm:block absolute inset-0">
          <FallbackImage
            src={src}
            alt={alt}
            fill
            priority={priority}
            loading={preload ? "eager" : undefined}
            quality={80}
            sizes="(max-width: 1024px) 100vw, 1920px"
            theme="light"
            className="object-cover object-center"
          />
        </div>
      </>
    );
  }

  return (
    <FallbackImage
      src={src}
      alt={alt}
      fill
      priority={priority}
      loading={preload ? "eager" : undefined}
      quality={80}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
      theme="light"
      className="object-cover object-center"
    />
  );
}
