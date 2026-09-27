"use client";

import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/counter.css";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/** Arrows only earn their space once there is room for them; on phones the
 *  carousel is driven by swipe, so the buttons would just crowd the photo. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return isDesktop;
}

interface JourneyLightboxProps {
  open: boolean;
  index: number;
  slides: { src: string; alt: string }[];
  close: () => void;
}

export default function JourneyLightbox({ open, index, slides, close }: JourneyLightboxProps) {
  const isDesktop = useIsDesktop();

  return (
    <Lightbox
      open={open}
      index={index}
      close={close}
      slides={slides}
      plugins={[Counter, Zoom]}
      carousel={{
        padding: isDesktop ? 76 : 58,
        spacing: isDesktop ? 48 : 12,
        finite: true,
        preload: 6,
      }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
      }}
      counter={{
        container: {
          className:
            "pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-center pt-3.5",
        },
        className:
          "tabular-nums rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md",
        separator: "  /  ",
      }}
      styles={{
        root: {
          backgroundColor: "rgba(6, 9, 15, 0.97)",
          backdropFilter: "blur(16px) saturate(120%)",
        },
        container: {
          backgroundColor: "rgba(6, 9, 15, 0.97)",
        },
        button: {
          width: 44,
          height: 44,
          display: "grid",
          placeItems: "center",
          borderRadius: 9999,
          color: "#ffffff",
          backgroundColor: "rgba(255, 255, 255, 0.10)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          cursor: "pointer",
        },
        toolbar: {
          padding: 14,
        },
        navigationPrev: {
          display: isDesktop ? "grid" : "none",
        },
        navigationNext: {
          display: isDesktop ? "grid" : "none",
        },
      }}
      render={{
        iconClose: () => <X size={18} strokeWidth={2.5} />,
        iconPrev: () => <ChevronLeft size={22} strokeWidth={2.5} />,
        iconNext: () => <ChevronRight size={22} strokeWidth={2.5} />,
        slideHeader: () => (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#06090f]/80 to-transparent" />
        ),
        slideFooter: () => (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#06090f]/80 to-transparent" />
        ),
      }}
    />
  );
}
