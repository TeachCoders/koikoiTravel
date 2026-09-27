"use client";

import { usePathname } from "next/navigation";
import { MessageCircle, Sparkles } from "lucide-react";
import { QuoteModal } from "@/components/shared/QuoteModal";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { openChatWidget } from "@/feature/chat/constants";

export default function MobileStickyActionBar() {
  const pathname = usePathname();
  // Journey detail renders its own WhatsApp + Book Now bar pinned to the bottom
  // of the viewport, so showing the global bar there stacks the two on top of
  // each other on mobile. The bare /tour-packages listing still gets this bar.
  const onJourneyDetail = pathname.startsWith("/tour-packages/");
  const hidden =
    onJourneyDetail ||
    pathname.startsWith("/offers") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/booking");

  if (hidden) return null;

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919136739178"; // Official WhatsApp

  return (
    <aside aria-label="Quick Actions" className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-[0_-10px_20px_rgb(0,0,0,0.06)]">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi KoiKoi Travel, I want to inquire about a custom holiday tour package.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#2E8B8B] text-white border border-[#2E8B8B] hover:bg-[#266f6f] transition-all active:scale-95"
        >
          <WhatsAppIcon className="w-[18px] h-[18px] text-white mb-0.5" />
          <span className="text-[11px] font-bold">WhatsApp</span>
        </a>

        {/* Instant Quote Button */}
        <QuoteModal>
          <button
            type="button"
            className="w-full flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#F8904D] text-white hover:bg-[#d57c42] transition-all active:scale-95 shadow-md shadow-[#F8904D]/30"
          >
            <Sparkles size={18} className="mb-0.5 animate-pulse" />
            <span className="text-[11px] font-bold">Get Quote</span>
          </button>
        </QuoteModal>

        {/* Live Chat Button — opens the chat widget mounted in the root layout */}
        <button
          type="button"
          onClick={openChatWidget}
          aria-label="Open live chat"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#1C1C1C] text-white hover:bg-black transition-all active:scale-95 shadow-md shadow-black/20"
        >
          <MessageCircle size={18} className="mb-0.5" />
          <span className="text-[11px] font-bold">Chat</span>
        </button>
      </div>
    </aside>
  );
}
