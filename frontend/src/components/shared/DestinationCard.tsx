"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FallbackImage } from "@/components/shared/FallbackImage";

export interface DestinationCardProps {
  title: string;
  image?: string;
  subtitle?: ReactNode;
  tag?: string;
  eyebrow?: string;
  description?: string;
  region?: string;
  tourCountText?: string;
  href?: string;
  className?: string;
}

export default function DestinationCard({
  title,
  image,
  subtitle,
  tag,
  eyebrow,
  description,
  region,
  tourCountText,
  href,
  className,
}: DestinationCardProps) {
  const cardBody = (
    <div className="group relative w-full h-[310px] sm:h-[340px] md:h-[365px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/50 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-end p-4 sm:p-5 text-left">
      <FallbackImage
        src={image}
        alt={`${title} Tour Packages & Sightseeing | KoiKoi Travel`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out opacity-90"
        fallbackSrc="/banners/rajasthan-comic-banner.webp"
        theme="dark"
      />
      {/* Dark gradient overlay for high contrast and crystal-clear text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/55 via-50% to-transparent pointer-events-none" />

      {tag && (
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#F8904D] text-white shadow-xs">
            {tag}
          </span>
        </div>
      )}

      {/* Content at bottom */}
      <div className="relative z-10 text-white flex flex-col justify-end w-full">
        {eyebrow && (
          <span className="text-[10.5px] sm:text-[11.5px] font-bold text-[#F8904D] tracking-wider uppercase drop-shadow-xs line-clamp-1 mb-1">
            {eyebrow}
          </span>
        )}

        <h3 className="font-bold text-xl sm:text-2xl text-white group-hover:text-[#F8904D] transition-colors leading-tight line-clamp-1 drop-shadow-xs font-heading">
          {title}
        </h3>

        {(description || subtitle) && (
          <p className="text-xs sm:text-[13px] text-slate-300 mt-1 line-clamp-2 font-normal leading-snug drop-shadow-xs">
            {description || subtitle}
          </p>
        )}

        {/* Bottom pill row */}
        {(region || tourCountText) && (
          <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-white/15">
            {region ? (
              <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] sm:text-xs font-medium text-slate-300 border border-white/10 truncate max-w-[60%]">
                {region}
              </span>
            ) : (
              <span />
            )}
            {tourCountText && (
              <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-white border border-white/10 shrink-0">
                {tourCountText}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (!href) {
    return (
      <div className={cn("block select-none cursor-default opacity-85", className)}>
        {cardBody}
      </div>
    );
  }

  return (
    <Link href={href} className={cn("group block select-none", className)}>
      {cardBody}
    </Link>
  );
}
