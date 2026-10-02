"use client";

import React, { useState, useEffect, useCallback } from "react";
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

  const next = useCallback(() => {
    if (validImages.length === 0) return;
    setCurrent((prev) => (prev + 1) % validImages.length);
  }, [validImages.length]);

  const prev = useCallback(() => {
    if (validImages.length === 0) return;
    setCurrent((prev) => (prev - 1 + validImages.length) % validImages.length);
  }, [validImages.length]);

  useEffect(() => {
    if (validImages.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [validImages.length, interval, next]);

  if (validImages.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Track width = 100% × number of slides so each slide div gets correct dimensions */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${validImages.length * 100}%`,
          transform: `translateX(-${(current * 100) / validImages.length}%)`,
        }}
      >
        {validImages.map((img, i) => (
          <div
            key={i}
            className="relative h-full shrink-0 bg-slate-200"
            style={{ width: `${100 / validImages.length}%` }}
          >
            <SlideImage src={img} alt={alt} priority={i === 0} preload={i === 1} />
          </div>
        ))}
      </div>

      {validImages.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
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
