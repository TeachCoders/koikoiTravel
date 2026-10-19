import React from "react";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";

interface TravelGuideCollapsibleProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export default function TravelGuideCollapsible({
  title,
  subtitle = "Best time to visit, hidden gems, local culture, must-try food & packing secrets curated by India travel experts.",
  badge = "Insider Travel Guide & Tips",
  children,
  className = "",
  defaultOpen = false,
}: TravelGuideCollapsibleProps) {
  return (
    <details
      open={defaultOpen}
      className={`group border border-slate-200/90 rounded-2xl bg-white shadow-xs overflow-hidden transition-all duration-200 ${className}`}
    >
      <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer p-5 sm:p-6 bg-gradient-to-r from-amber-50/50 via-white to-orange-50/30 hover:from-amber-50/80 hover:to-orange-50/60 transition-colors select-none flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0 pr-0 sm:pr-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#D4561A] bg-amber-100/80 px-2.5 py-0.5 rounded-full mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4561A]" />
            {badge}
          </span>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-[13px] text-slate-500 mt-1 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="btn-primary shrink-0 self-start sm:self-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-full shadow-xs flex items-center gap-1.5 transition-transform group-hover:scale-105 pointer-events-none">
          <span className="group-open:hidden flex items-center gap-1.5">
            Read Full Guide <ChevronDown className="w-4 h-4" />
          </span>
          <span className="hidden group-open:flex items-center gap-1.5">
            Hide Guide <ChevronUp className="w-4 h-4" />
          </span>
        </div>
      </summary>

      <div className="p-6 sm:p-8 md:p-10 border-t border-slate-100 bg-white">
        {children}
      </div>
    </details>
  );
}

