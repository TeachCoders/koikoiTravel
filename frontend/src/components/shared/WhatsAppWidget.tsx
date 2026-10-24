"use client";

import { usePathname } from "next/navigation";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";

export default function WhatsAppWidget() {
  const pathname = usePathname();
  const hidden =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/booking");

  if (hidden) return null;

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919136739178";
  const message = "Hi KoiKoi Travel, I want to inquire about a custom holiday tour package.";

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[60]">
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-2.5 bg-[#17806f] hover:bg-[#12685a] text-white font-semibold text-[14px] sm:text-[15px] px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-[0_4px_18px_rgba(23,128,111,0.42)] hover:shadow-[0_8px_25px_rgba(23,128,111,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 select-none cursor-pointer"
      >
        <span className="w-5 h-5 flex items-center justify-center shrink-0">
          <WhatsAppIcon className="w-5 h-5 text-white" />
        </span>
        <span className="tracking-tight whitespace-nowrap">Chat on WhatsApp</span>
      </a>
    </aside>
  );
}
