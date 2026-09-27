"use client";

import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/counter.css";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/** The one breakpoint that matters here: below it the photo runs full width and
 *  the arrows get a smaller hit target, from md up we use the framed layout. */
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

  // On a phone the photo should span the full viewport width, so the carousel
  // gives up its breathing room. From md up we can afford the inset that frames
  // the image and keeps it clear of the arrows.
  const padding = isDesktop ? 76 : 0;
  const spacing = isDesktop ? 48 : 0;

  // The close button stays a comfortable 44px, but the arrows sit on top of
  // the photo on a phone and crowd it, so they step down there.
  const arrowSize = isDesktop ? 44 : 34;
  const arrowIcon = isDesktop ? 22 : 17;
  const arrowSurface = {
    display: "grid",
    placeItems: "center",
    borderRadius: 9999,
    color: "#ffffff",
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    border: "1px solid rgba(255, 255, 255, 0.16)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    cursor: "pointer",
  } as const;

  return (
    <Lightbox
      open={open}
      index={index}
      close={close}
      slides={slides}
      plugins={[Counter, Zoom]}
      carousel={{
        padding,
        spacing,
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
          ...arrowSurface,
          width: arrowSize,
          height: arrowSize,
        },
        navigationNext: {
          ...arrowSurface,
          width: arrowSize,
          height: arrowSize,
        },
      }}
      render={{
        iconClose: () => <X size={18} strokeWidth={2.5} />,
        iconPrev: () => <ChevronLeft size={arrowIcon} strokeWidth={2.5} />,
        iconNext: () => <ChevronRight size={arrowIcon} strokeWidth={2.5} />,
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
