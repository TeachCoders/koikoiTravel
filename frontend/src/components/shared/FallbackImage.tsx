"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ImageWatermark } from "@/components/shared/ImageWatermark";

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
const OPTIMIZABLE_HOSTS = new Set([
  "koikoitravel.com",
  "api.koikoitravel.com",
  "www.koikoitravel.com",
  "res.cloudinary.com",
  "images.unsplash.com",
  "localhost",
]);

function shouldBeUnoptimized(src?: string | null): boolean {
  if (!src || typeof src !== "string") return true;
  if (/\.(svg|gif)$/i.test(src)) return true;
  if (src.startsWith("/")) return false; // Local relative path -> optimize!
  try {
    const parsed = new URL(src.startsWith("//") ? `https:${src}` : src);
    return !OPTIMIZABLE_HOSTS.has(parsed.hostname);
  } catch {
    return true;
  }
}

export const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  alt = "KoiKoi Travel",
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
    return (
      <div
        className={`${
          fill ? "absolute inset-0" : "relative"
        } flex flex-col items-center justify-center overflow-hidden select-none p-4 w-full h-full ${containerClassName || className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <ImageWatermark theme={theme} logo={fallbackSrc} alt={alt} />
      </div>
    );
  }

  // Next.js Image for fast, optimized loading
  // For priority images (above-the-fold / hero), render instantly with no opacity lag.
  // For other images, use a subtle 150ms transition instead of an artificial 700ms delay.
  return (
    <>
      {!loaded && !priority && (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
          <ImageWatermark theme={theme} logo={fallbackSrc} alt={alt} />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        className={`${className} ${
          priority
            ? "opacity-100"
            : `transition-opacity duration-150 ease-out ${loaded ? "opacity-100" : "opacity-0"}`
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        unoptimized={unoptimized ?? shouldBeUnoptimized(src)}
        fill={fill}
        priority={priority}
        quality={quality}
        width={!fill ? (props.width ? Number(props.width) : 800) : undefined}
        height={!fill ? (props.height ? Number(props.height) : 600) : undefined}
        {...(props as any)}
      />
    </>
  );
};

export default FallbackImage;
