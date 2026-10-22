"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  Camera,
  Compass,
  ArrowRight,
} from "lucide-react";
import type { GuestGallery } from "../type";
import { QuoteModal } from "@/components/shared/QuoteModal";

interface GuestGalleryClientProps {
  initialItems: GuestGallery[];
  cmsTitle?: string | null;
  cmsDescription?: string | null;
}

export default function GuestGalleryClient({
  initialItems,
  cmsTitle,
  cmsDescription,
}: GuestGalleryClientProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const activePhoto =
    activePhotoIndex !== null && initialItems[activePhotoIndex]
      ? initialItems[activePhotoIndex]
      : null;

  const handlePrevPhoto = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (activePhotoIndex !== null && initialItems.length > 0) {
        setActivePhotoIndex(
          activePhotoIndex === 0 ? initialItems.length - 1 : activePhotoIndex - 1
        );
      }
    },
    [activePhotoIndex, initialItems.length]
  );

  const handleNextPhoto = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (activePhotoIndex !== null && initialItems.length > 0) {
        setActivePhotoIndex(
          activePhotoIndex === initialItems.length - 1 ? 0 : activePhotoIndex + 1
        );
      }
    },
    [activePhotoIndex, initialItems.length]
  );

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    if (activePhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePhotoIndex(null);
      } else if (e.key === "ArrowLeft") {
        handlePrevPhoto();
      } else if (e.key === "ArrowRight") {
        handleNextPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, handlePrevPhoto, handleNextPhoto]);

  return (
    <div className="space-y-8">
      {/* ── Intro Description Card (Managed from Dashboard CMS) ── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xs">
        {cmsTitle && (
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 tracking-tight">
            {cmsTitle}
          </h2>
        )}
        {cmsDescription ? (
          <div
            className="text-[15.5px] leading-relaxed text-slate-600 prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: cmsDescription }}
          />
        ) : (
          <p className="text-[15.5px] leading-relaxed text-slate-600">
            These are real photos from our happy guests. Every picture is a real
            holiday moment — a family trip, a honeymoon, a short drive, or a big
            adventure. Nothing is stock. Nothing is staged. If you love a place you
            see here, just tell us — we can plan the same trip for you with KoiKoi
            Travel.
          </p>
        )}
      </div>

      {/* ── Photo Grid ── */}
      {initialItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {initialItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border border-slate-200/80 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                <img
                  src={item.imageUrl}
                  alt={item.caption || item.location || `Guest Photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Top Right Expand Icon */}
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Maximize2 size={13} />
                </div>

                {/* Gradient Overlay for bottom details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-white">
                  {item.location && (
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FFD9A8] uppercase tracking-wider mb-0.5">
                      <MapPin size={11} className="text-[#F8904D]" />
                      <span>{item.location}</span>
                    </div>
                  )}

                  {item.caption && (
                    <p className="text-xs sm:text-[13px] font-semibold text-white line-clamp-1 drop-shadow-sm">
                      {item.caption}
                    </p>
                  )}

                  <span className="text-[10px] text-slate-300 font-medium mt-1 flex items-center gap-1 group-hover:text-white transition-colors">
                    Click to view <ArrowRight size={9} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          <Camera className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-60" />
          <h3 className="text-lg font-bold text-slate-800">No Guest Photos Yet</h3>
          <p className="text-slate-500 mt-1 text-sm">
            Check back later for new guest holiday moments.
          </p>
        </div>
      )}

      {/* ── Interactive Lightbox Modal ── */}
      {activePhoto && (
        <div
          onClick={() => setActivePhotoIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 select-none"
        >
          {/* Top Bar inside modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl flex items-center justify-between text-white py-2 z-50"
          >
            <div className="flex items-center gap-2">
              <Camera size={16} className="text-[#F8904D]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">
                Guest Photo {activePhotoIndex! + 1} of {initialItems.length}
              </span>
            </div>

            <button
              onClick={() => setActivePhotoIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
          </div>

          {/* Left Arrow Button */}
          {initialItems.length > 1 && (
            <button
              onClick={handlePrevPhoto}
              className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-50 hover:scale-105 active:scale-95 shadow-xl"
              aria-label="Previous Photo"
            >
              <ChevronLeft size={26} />
            </button>
          )}

          {/* Right Arrow Button */}
          {initialItems.length > 1 && (
            <button
              onClick={handleNextPhoto}
              className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-50 hover:scale-105 active:scale-95 shadow-xl"
              aria-label="Next Photo"
            >
              <ChevronRight size={26} />
            </button>
          )}

          {/* Main Photo Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex items-center justify-center max-w-5xl max-h-[72vh] sm:max-h-[76vh] w-full px-2"
          >
            <img
              src={activePhoto.imageUrl}
              alt={activePhoto.caption || activePhoto.location || `Guest Photo`}
              className="max-h-[70vh] sm:max-h-[74vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Bottom Bar: Caption, Location, and Plan Trip CTA */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-white z-50"
          >
            <div className="text-center sm:text-left space-y-0.5">
              {activePhoto.location && (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD9A8] uppercase tracking-wider">
                  <MapPin size={12} className="text-[#F8904D]" />
                  <span>{activePhoto.location}</span>
                </div>
              )}
              {activePhoto.caption && (
                <p className="text-sm font-semibold text-white">
                  {activePhoto.caption}
                </p>
              )}
            </div>

            <QuoteModal>
              <button
                type="button"
                className="px-4 py-2 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Compass size={13} />
                <span>Plan A Trip</span>
              </button>
            </QuoteModal>
          </div>
        </div>
      )}
    </div>
  );
}
