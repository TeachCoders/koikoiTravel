"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FallbackImage from "@/components/shared/FallbackImage";

interface HeroSliderProps {
  images: string[];
  alt?: string;
  interval?: number;
}

export default function HeroSlider({ images, alt = "", interval = 5000 }: HeroSliderProps) {
  const validImages = (images || []).filter(
    (img) =>
      img &&
      !img.includes("unsplash.com") &&
      !img.includes("via.placeholder.com") &&
      !img.includes("placeholder.com")
  );

  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => {
    if (validImages.length === 0) return;
    setCurrent((prev) => (prev + 1) % validImages.length);
  }, [validImages.length]);

  const prev = useCallback(() => {
    if (validImages.length === 0) return;
    setCurrent((prev) => (prev - 1 + validImages.length) % validImages.length);
  }, [validImages.length]);

  // Reset timer on slide change so user gets full interval after manual click
  useEffect(() => {
    if (validImages.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [validImages.length, interval, next, current]);

  if (validImages.length === 0) return null;

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
          width: `${validImages.length * 100}%`,
          transform: `translateX(-${(current * 100) / validImages.length}%)`,
        }}
      >
        {validImages.map((img, i) => (
          <div
            key={i}
            className="relative h-full shrink-0 bg-slate-200 pointer-events-none"
            style={{ width: `${100 / validImages.length}%` }}
          >
            <SlideImage src={img} alt={alt} priority={i === 0} preload={true} />
          </div>
        ))}
      </div>

      {/* Navigation arrows (desktop) */}
      {validImages.length > 1 && (
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
      {validImages.length > 1 && (
        <div className="absolute bottom-2.5 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center pointer-events-auto select-none">
          {validImages.map((_, i) => (
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
  alt,
  priority,
  preload,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  preload?: boolean;
}) {
  return (
    <FallbackImage
      src={src}
      alt={alt}
      fill
      priority={priority}
      loading={preload ? "eager" : undefined}
      quality={90}
      sizes="100vw"
      theme="light"
      className="object-cover object-center"
    />
  );
}
