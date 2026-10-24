"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FallbackImage } from "@/components/shared/FallbackImage";

interface DestinationCardProps {
  title: string;
  image?: string;
  subtitle?: ReactNode;
  tag?: string;
  href?: string;
  className?: string;
}

export default function DestinationCard({
  title,
  image,
  subtitle,
  tag,
  href,
  className,
}: DestinationCardProps) {
  const cardBody = (
    <div className="group relative w-full h-[175px] sm:h-[185px] rounded-2xl overflow-hidden bg-slate-900 border border-section-border shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-end p-5 text-left">
      <FallbackImage
        src={image}
        alt={`${title} Tour Packages & Sightseeing | KoiKoi Travel`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out opacity-85"
        fallbackSrc="/logo-with-name.png"
        theme="dark"
      />
      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

      {tag && (
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#F8904D] text-white shadow-xs">
            {tag}
          </span>
        </div>
      )}

      {/* Title & subtitle inside image */}
      <div className="relative z-10 text-white">
        <h3 className="font-bold text-lg sm:text-[19px] text-white group-hover:text-[#F8904D] transition-colors leading-tight line-clamp-1 drop-shadow-xs">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-[13px] text-orange-200/90 mt-0.5 font-medium line-clamp-1 drop-shadow-xs">
            {subtitle}
          </p>
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
