"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {validImages.map((img, i) => (
          <div key={i} className="relative w-full h-full shrink-0 bg-[#1C1C1C]">
            <SlideImage src={img} alt={alt} priority={i === 0} />
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

function SlideImage({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      loading={priority ? undefined : "eager"}
      sizes="100vw"
      onLoad={() => setLoaded(true)}
      unoptimized={
        typeof src === "string" &&
        src.startsWith("/") &&
        /\.(webp|avif)$/i.test(src)
      }
      className={`object-cover object-center transition-opacity duration-700 ease-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
