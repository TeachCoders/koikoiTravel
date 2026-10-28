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
    <div className="group relative w-full h-[310px] sm:h-[340px] md:h-[365px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-end p-4 sm:p-5 text-left">
      <FallbackImage
        src={image}
        alt={`${title} Tour Packages & Sightseeing | KoiKoi Travel`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        fallbackSrc="/logo-with-name.png"
      />
      {/* Soft gradient only right around the text at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

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
          <span className="text-[10.5px] sm:text-[11.5px] font-bold text-[#F8904D] tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-1 mb-1">
            {eyebrow}
          </span>
        )}

        <h3 className="font-bold text-xl sm:text-2xl text-white group-hover:text-[#F8904D] transition-colors leading-tight line-clamp-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] font-heading">
          {title}
        </h3>

        {(description || subtitle) && (
          <p className="text-xs sm:text-[13px] text-slate-100 mt-1 line-clamp-2 font-medium leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {description || subtitle}
          </p>
        )}

        {/* Bottom pill row */}
        {(region || tourCountText) && (
          <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-white/25">
            {region ? (
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] sm:text-xs font-medium text-slate-100 border border-white/20 truncate max-w-[60%]">
                {region}
              </span>
            ) : (
              <span />
            )}
            {tourCountText && (
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-white border border-white/20 shrink-0">
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
      <div className={cn("block select-none cursor-default", className)}>
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
