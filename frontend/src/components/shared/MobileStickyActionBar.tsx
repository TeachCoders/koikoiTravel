"use client";

import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { QuoteModal } from "@/components/shared/QuoteModal";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";

export default function MobileStickyActionBar() {
  const pathname = usePathname();
  const hidden =
    pathname.startsWith("/offers") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/booking");

  if (hidden) return null;

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919136739178"; // Official WhatsApp

  return (
    <aside aria-label="Quick Actions" className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-[0_-10px_20px_rgb(0,0,0,0.06)]">
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi KoiKoi Travel, I want to inquire about a custom holiday tour package.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-[#2E8B8B] text-white hover:bg-[#247070] transition-all active:scale-95 shadow-sm"
        >
          <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
          <span className="text-xs font-bold">WhatsApp</span>
        </a>

        {/* Instant Quote Button */}
        <QuoteModal>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#F8904D] text-white hover:bg-[#d57c42] transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <Sparkles size={15} className="shrink-0" />
            <span className="text-xs font-bold">Get Free Quote</span>
          </button>
        </QuoteModal>
      </div>
    </aside>
  );
}
