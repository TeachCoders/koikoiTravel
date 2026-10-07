import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FallbackImage } from "@/components/shared/FallbackImage";

interface DestinationCardProps {
  title: string;
  image?: string;
  subtitle?: ReactNode;
  tag?: string;
  href: string;
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
  return (
    <Link
      href={href}
      className={cn("group block text-center select-none", className)}
    >
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200/60 group-hover:shadow-md group-hover:border-slate-300 transition-all duration-300">
        <FallbackImage
          src={image}
          alt={`${title} Tour Packages & Sightseeing | KoiKoi Travel`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          fallbackSrc="/logo-with-name.png"
          theme="light"
        />
        {tag && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center bg-[#F8904D] text-white shadow-sm">
              {tag}
            </span>
          </div>
        )}
      </div>

      <div className="pt-2.5 pb-1">
        <h3 className="font-heading text-sm sm:text-[15px] font-bold text-slate-900 capitalize group-hover:text-[#F8904D] transition-colors leading-tight line-clamp-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-[12px] text-slate-500 mt-0.5 font-normal line-clamp-1">
            {subtitle}
          </p>
        )}
      </div>
    </Link>
  );
}
