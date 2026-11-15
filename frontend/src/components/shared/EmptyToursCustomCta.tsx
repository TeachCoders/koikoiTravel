"use client";

import React from "react";
import { MapPin, FileText, CheckCircle2 } from "lucide-react";
import { QuoteModal } from "@/components/shared/QuoteModal";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { getWhatsAppUrl } from "@/config/siteConfig";

interface EmptyToursCustomCtaProps {
  destinationName: string;
  className?: string;
}

export default function EmptyToursCustomCta({
  destinationName,
  className = "",
}: EmptyToursCustomCtaProps) {
  const dest = destinationName.trim() || "this destination";
  const waMessage = `Hi KoiKoi Travel, I want to plan a customized trip to ${dest}. Please share a custom itinerary and best quote.`;

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 md:p-10 shadow-sm text-center max-w-3xl mx-auto ${className}`}
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F8904D]">
        <MapPin className="w-7 h-7" />
      </div>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mb-2">
        Plan a Custom Holiday in {dest}
      </h3>

      <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
        Looking for a personalized itinerary? While we don&apos;t have a fixed pre-packaged itinerary listed online for {dest} yet, our travel experts craft 100% tailor-made holidays with private car &amp; chauffeur, handpicked hotels, and customized sightseeing.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
        <QuoteModal>
          <button
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F8904D] hover:bg-[#e07a38] text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Request Free Custom Quote</span>
          </button>
        </QuoteModal>

        <a
          href={getWhatsAppUrl(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all"
        >
          <WhatsAppIcon className="w-5 h-5 fill-white text-white shrink-0" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500 font-medium">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 100% Tailor-Made Itinerary
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Private AC Cab &amp; Chauffeur
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Verified Hotels &amp; Best Pricing
        </span>
      </div>
    </div>
  );
}
