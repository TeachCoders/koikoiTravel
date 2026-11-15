"use client";

import React from "react";
import { FileText } from "lucide-react";
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
      className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-8 sm:py-10 ${className}`}
    >
      <QuoteModal>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F8904D] hover:bg-[#e07a38] text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <FileText className="w-4 h-4 shrink-0" />
          <span>Request Free Custom Quote</span>
        </button>
      </QuoteModal>

      <a
        href={getWhatsAppUrl(waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all"
      >
        <WhatsAppIcon className="w-5 h-5 fill-white text-white shrink-0" />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
}
