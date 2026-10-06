import Link from "next/link";
import type { ReactNode } from "react";
import { MapPin } from "lucide-react";
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
        "group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-350 flex flex-col justify-end",
        "h-[200px] sm:h-[230px]",
        className
      )}
    >
      <FallbackImage
        src={image}
        alt={`${title} Tour Packages & Sightseeing | KoiKoi Travel`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        fallbackSrc="/logo-with-name.png"
        theme="dark"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {tag && (
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center bg-[#F8904D] text-white shadow-md">
            {tag}
          </span>
        </div>
      )}
      <div className="relative z-10 p-4 text-center text-white">
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white capitalize drop-shadow-sm">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 px-3 py-0.5 text-xs font-medium text-white/90">
            {subtitle}
          </p>
        )}
      </div>
    </Link>
  );
}
