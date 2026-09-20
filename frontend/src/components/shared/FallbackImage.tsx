"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export interface FallbackImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | null;
  alt?: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  theme?: "dark" | "light" | "auto";
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  unoptimized?: boolean;
}

/**
 * Reusable FallbackImage component powered by Next.js <Image /> across the entire application.
 * Fast image loading with Next.js image optimization.
 * Automatically falls back to a clean, subtle light-gray brand logo watermark
 * when an image URL is missing, invalid, or fails to load.
 */
export const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  alt = "Koikoi travel",
  fallbackSrc = "/logo-with-name.png",
  className = "",
  containerClassName = "",
  aspectRatio,
  theme = "light",
  fill,
  priority,
  quality = 80,
  unoptimized,
  ...props
}) => {
  const isThirdParty =
    typeof src === "string" &&
    (src.includes("unsplash.com") ||
      src.includes("via.placeholder.com") ||
      src.includes("placeholder.com"));

  const [error, setError] = useState(!src || isThirdParty);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setError(!src || isThirdParty);
    setLoaded(false);
  }, [src, isThirdParty]);

  if (error || !src || isThirdParty) {
    const isDark = theme === "dark";

    return (
      <div
        className={`${
          fill ? "absolute inset-0" : "relative"
        } flex flex-col items-center justify-center overflow-hidden select-none p-4 w-full h-full ${
          isDark
            ? "bg-[#1C1C1C]/90"
            : "bg-slate-100/70 border border-slate-200/60"
        } ${containerClassName || className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        {/* Decorative subtle ambient circle watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className={`w-40 h-40 border-[10px] rounded-full ${isDark ? "border-white" : "border-slate-500"}`} />
        </div>

        {/* Centered Grayscale Brand Logo with Soft Light Opacity */}
        <div className="relative w-40 h-16 max-w-[75%] max-h-[65%] flex items-center justify-center z-10">
          <Image
            src={fallbackSrc}
            alt={alt}
            width={160}
            height={70}
            className={`object-contain filter grayscale opacity-35 hover:opacity-55 transition-all duration-300 ${
              isDark ? "invert opacity-40 hover:opacity-60" : ""
            }`}
            unoptimized
          />
        </div>
      </div>
    );
  }

  // Next.js Image for fast, optimized loading
  return (
    <Image
      src={src}
      alt={alt}
      className={`${className} transition-opacity duration-700 ease-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      unoptimized={
        unoptimized ??
        (typeof src === "string" &&
          (src.startsWith("//") ||
            src.startsWith("http") ||
            (src.startsWith("/") && /\.(webp|avif|gif|svg)$/i.test(src))))
      }
      fill={fill}
      priority={priority}
      quality={quality}
      width={!fill ? (props.width ? Number(props.width) : 800) : undefined}
      height={!fill ? (props.height ? Number(props.height) : 600) : undefined}
      {...(props as any)}
    />
  );
};

export default FallbackImage;
