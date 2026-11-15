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

const DARK_HERO_BLUR =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%231e293b'/%3E%3Cstop offset='50%25' stop-color='%23334155'/%3E%3Cstop offset='100%25' stop-color='%230f172a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3Ccircle cx='8' cy='6' r='5' fill='%23F8904D' opacity='0.16'/%3E%3C/svg%3E";

const LIGHT_BLUR =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23f1f5f9'/%3E%3Cstop offset='100%25' stop-color='%23e2e8f0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E";

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
  const [imgSrc, setImgSrc] = useState(src);
  const [triedLiveFallback, setTriedLiveFallback] = useState(false);

  useEffect(() => {
    setError(!src || isInvalidPlaceholder);
    setLoaded(false);
    setImgSrc(src);
    setTriedLiveFallback(false);
  }, [src, isInvalidPlaceholder]);

  const handleError = () => {
    // If a relative image fails (e.g. locally missing upload), immediately try the live production site
    if (
      !triedLiveFallback &&
      typeof imgSrc === "string" &&
      imgSrc.startsWith("/") &&
      !imgSrc.startsWith("//") &&
      !FRONTEND_STATIC_FILES.has(imgSrc)
    ) {
      setTriedLiveFallback(true);
      setImgSrc(`https://koikoitravel.com${imgSrc}`);
      return;
    }
    setError(true);
  };

  if (error || !imgSrc || isInvalidPlaceholder) {
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

  const isDark = theme === "dark";
  const defaultBlur = isDark ? DARK_HERO_BLUR : LIGHT_BLUR;
  const effectivePlaceholder = placeholder || "blur";
  const effectiveBlurDataURL = blurDataURL || defaultBlur;

  // Next.js Image for fast, optimized loading with instant SVG blur placeholder & shimmer skeleton
  return (
    <>
      {fill && !loaded && (
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${
            isDark ? "bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e1e24]" : "bg-slate-100"
          }`}
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-shimmer-sweep" />
        </div>
      )}
      <Image
        src={imgSrc}
        alt={alt}
        className={`${className} transition-opacity duration-500 ease-out relative z-[1]`}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        unoptimized={unoptimized ?? shouldBeUnoptimized(imgSrc)}
        fill={fill}
        priority={isPriority}
        fetchPriority={effectiveFetchPriority}
        loading={effectiveLoading}
        quality={quality}
        sizes={computedSizes}
        placeholder={effectivePlaceholder}
        blurDataURL={effectiveBlurDataURL}
        width={!fill ? (props.width ? Number(props.width) : 800) : undefined}
        height={!fill ? (props.height ? Number(props.height) : 600) : undefined}
        {...(props as any)}
      />
    </>
  );
};

export default FallbackImage;
