"use client";

import React, { useState, useEffect, useCallback } from "react";
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

  useEffect(() => {
    if (validImages.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [validImages.length, interval, next]);

  if (validImages.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Slide track */}
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

      {/* Dot pagination — same style as HeroSection */}
      {validImages.length > 1 && (
        <div className="absolute bottom-2.5 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {validImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-[#F8904D]"
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/70"
              }`}
            />
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
