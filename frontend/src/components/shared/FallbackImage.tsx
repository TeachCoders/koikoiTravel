"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ImageWatermark } from "@/components/shared/ImageWatermark";

export interface FallbackImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "placeholder"> {
  src?: string | null;
  alt?: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  theme?: "dark" | "light" | "auto";
  fill?: boolean;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  quality?: number;
  unoptimized?: boolean;
  sizes?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
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

const FRONTEND_STATIC_FILES = new Set([
  "/logo-with-name.png",
  "/icon.png",
  "/og-image.png",
  "/favicon.ico",
  "/apple-icon.png",
]);

function shouldBeUnoptimized(src?: string | null): boolean {
  if (!src || typeof src !== "string") return true;
  if (FRONTEND_STATIC_FILES.has(src)) return true;
  // SVGs and animated GIFs are vector/animated so resizing them breaks animation or vector scaling
  if (/\.(svg|gif)$/i.test(src)) return true;
  if (src.startsWith("/banners/")) return true;
  if (src.startsWith("/hero-banners/")) return true;
  if (src.startsWith("/")) {
    return false;
  }
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
  fetchPriority,
  loading,
  quality = 75,
  unoptimized,
  sizes,
  placeholder,
  blurDataURL,
  ...props
}) => {
  const isInvalidPlaceholder =
    typeof src === "string" &&
    (src.includes("via.placeholder.com") ||
      src.includes("placeholder.com"));

  const [error, setError] = useState(!src || isInvalidPlaceholder);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setError(!src || isInvalidPlaceholder);
    setLoaded(false);
  }, [src, isInvalidPlaceholder]);

  if (error || !src || isInvalidPlaceholder) {
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

  const isPriority = Boolean(priority);
  const effectiveLoading = isPriority ? "eager" : (loading || "lazy");
  const effectiveFetchPriority = isPriority ? "high" : (fetchPriority ?? undefined);
  const computedSizes = sizes || (fill ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : undefined);

  // Next.js Image for fast, optimized loading
  // For priority images (above-the-fold / hero), render instantly with no opacity lag.
  // For other images, use a subtle 150ms transition instead of an artificial delay.
  return (
    <>
      {!loaded && !isPriority && !placeholder && (
        <div
          className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none animate-pulse ${
            theme === "dark" ? "bg-slate-800/80" : "bg-slate-100/80"
          }`}
          aria-hidden="true"
        />
      )}
      <Image
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        unoptimized={unoptimized ?? shouldBeUnoptimized(src)}
        fill={fill}
        priority={isPriority}
        fetchPriority={effectiveFetchPriority}
        loading={effectiveLoading}
        quality={quality}
        sizes={computedSizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        width={!fill ? (props.width ? Number(props.width) : 800) : undefined}
        height={!fill ? (props.height ? Number(props.height) : 600) : undefined}
        {...(props as any)}
      />
    </>
  );
};

export default FallbackImage;
