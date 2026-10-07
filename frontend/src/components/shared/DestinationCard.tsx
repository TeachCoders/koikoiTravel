import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
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
      className={cn(
        "group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/25 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-end border border-black/5 bg-slate-900 select-none",
        "h-[185px] sm:h-[195px]",
        className
      )}
    >
      <FallbackImage
        src={image}
        alt={`${title} Tour Packages & Sightseeing | KoiKoi Travel`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
        fallbackSrc="/logo-with-name.png"
        theme="dark"
      />
      
      {/* Dynamic dual gradient for rich contrast and depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 via-45% to-black/10 group-hover:from-black/95 group-hover:via-black/45 transition-colors duration-500" />

      {/* Floating Top Tag / Indicator */}
      <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
        {tag ? (
          <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 bg-[#F8904D] text-white shadow-md">
            <Sparkles className="w-2.5 h-2.5" />
            {tag}
          </span>
        ) : <span />}

        <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-[#F8904D] group-hover:border-[#F8904D] group-hover:rotate-45 transition-all duration-300 shadow-sm">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 p-4 pb-3.5 text-center flex flex-col items-center">
        <h3 className="font-heading text-[17px] sm:text-[18px] md:text-[19px] font-extrabold tracking-tight text-white capitalize leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:text-amber-200 transition-colors duration-300">
          {title}
        </h3>
        
        {subtitle && (
          <div className="mt-1.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white/95 tracking-wide shadow-sm group-hover:bg-white/25 group-hover:border-white/30 transition-all">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F8904D] shrink-0" />
            <span>{subtitle}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
