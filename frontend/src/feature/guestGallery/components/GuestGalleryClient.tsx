"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Search,
  Maximize2,
  Heart,
  Camera,
  MessageCircle,
  Compass,
  ArrowRight,
  Share2,
} from "lucide-react";
import type { GuestGallery } from "../type";
import { QuoteModal } from "@/components/shared/QuoteModal";

interface GuestGalleryClientProps {
  initialItems: GuestGallery[];
}

const CATEGORY_TAGS = [
  { key: "all", label: "🌟 All Moments" },
  { key: "family", label: "👨‍👩‍👧‍👦 Family & Groups" },
  { key: "couples", label: "💑 Couples & Honeymoon" },
  { key: "heritage", label: "🏰 Forts & Heritage" },
  { key: "scenic", label: "🌿 Nature & Road Trips" },
];

export default function GuestGalleryClient({ initialItems }: GuestGalleryClientProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  // Filter items based on search query and active tag
  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      // 1. Text Search matching location or caption
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (item.caption && item.caption.toLowerCase().includes(q)) ||
        (item.location && item.location.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      // 2. Tag filter
      if (activeTag === "all") return true;

      const combinedText = `${item.caption || ""} ${item.location || ""}`.toLowerCase();
      if (activeTag === "family") {
        return /family|group|kids|children|friends|parents|tourists/i.test(combinedText);
      }
      if (activeTag === "couples") {
        return /couple|honeymoon|romantic|wedding|anniversary/i.test(combinedText);
      }
      if (activeTag === "heritage") {
        return /fort|palace|taj|monument|temple|agra|jaipur|delhi|heritage/i.test(combinedText);
      }
      if (activeTag === "scenic") {
        return /nature|backwaters|kerala|himalaya|mountain|lake|beach|drive|safari/i.test(combinedText);
      }

      return true;
    });
  }, [initialItems, searchQuery, activeTag]);

  const activePhoto =
    activePhotoIndex !== null && filteredItems[activePhotoIndex]
      ? filteredItems[activePhotoIndex]
      : null;

  const handlePrevPhoto = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (activePhotoIndex !== null && filteredItems.length > 0) {
        setActivePhotoIndex(
          activePhotoIndex === 0 ? filteredItems.length - 1 : activePhotoIndex - 1
        );
      }
    },
    [activePhotoIndex, filteredItems.length]
  );

  const handleNextPhoto = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (activePhotoIndex !== null && filteredItems.length > 0) {
        setActivePhotoIndex(
          activePhotoIndex === filteredItems.length - 1 ? 0 : activePhotoIndex + 1
        );
      }
    },
    [activePhotoIndex, filteredItems.length]
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
      {/* ── Storytelling Intro Card ── */}
      <div className="relative overflow-hidden bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#2E8B8B]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E8B8B] tracking-wider uppercase">
              <Sparkles size={14} className="text-[#F8904D]" />
              <span>Real Holidays, Zero Filters</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Stories & Smiles Shared by Our Travelers
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed max-w-2xl">
              Every picture here is a genuine holiday moment — a family reunion, a golden sunrise over the Taj Mahal, or a serene mountain trail. Nothing is stock. If a place inspires you, tell us and we will plan the same trip for you with KoiKoi Travel.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3.5 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
            <div className="text-center p-2.5 bg-white rounded-xl shadow-2xs border border-slate-200/60">
              <span className="block text-xl sm:text-2xl font-black text-[#2E8B8B]">100%</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Real Guests</span>
            </div>
            <div className="text-center p-2.5 bg-white rounded-xl shadow-2xs border border-slate-200/60">
              <span className="block text-xl sm:text-2xl font-black text-[#F8904D]">4.9★</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Guest Rating</span>
            </div>
            <div className="text-center p-2.5 bg-white rounded-xl shadow-2xs border border-slate-200/60">
              <span className="block text-xl sm:text-2xl font-black text-slate-800">500+</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Tours Hosted</span>
            </div>
            <div className="text-center p-2.5 bg-white rounded-xl shadow-2xs border border-slate-200/60">
              <span className="block text-xl sm:text-2xl font-black text-[#2E8B8B]">24/7</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Trip Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_TAGS.map((tag) => (
            <button
              key={tag.key}
              type="button"
              onClick={() => setActiveTag(tag.key)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTag === tag.key
                  ? "bg-gradient-to-r from-[#2E8B8B] to-[#247070] text-white shadow-sm shadow-[#2E8B8B]/25"
                  : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Search Bar + Counter */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location or guest..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#2E8B8B] focus:ring-2 focus:ring-[#2E8B8B]/15 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="shrink-0 bg-white px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 border border-slate-200 shadow-2xs">
            {filteredItems.length} {filteredItems.length === 1 ? "Photo" : "Photos"}
          </div>
        </div>
      </div>

      {/* ── Photo Grid ── */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative bg-white rounded-[24px] overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-200/80 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                <img
                  src={item.imageUrl}
                  alt={item.caption || item.location || `Guest Travel Moment ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Top Right Expand Icon Badge */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                  <Maximize2 size={14} />
                </div>

                {/* Gradient Overlay for bottom details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  {item.location && (
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#FFD9A8] uppercase tracking-wider mb-1">
                      <MapPin size={12} className="text-[#F8904D]" />
                      <span>{item.location}</span>
                    </div>
                  )}

                  <p className="text-xs sm:text-[13px] font-semibold text-white line-clamp-1 drop-shadow-sm">
                    {item.caption || (item.location ? `Trip to ${item.location}` : `Guest Moment ${index + 1}`)}
                  </p>

                  <span className="text-[10px] text-slate-300 font-medium mt-1 flex items-center gap-1 group-hover:text-white transition-colors">
                    Click to view full photo <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          <Camera className="w-12 h-12 text-[#2E8B8B] mx-auto mb-3 opacity-50" />
          <h3 className="text-xl font-bold text-slate-800">No Matching Photos Found</h3>
          <p className="text-slate-500 mt-1 text-sm max-w-md mx-auto">
            {searchQuery
              ? `No travel photos matched "${searchQuery}". Try searching for another place or clear your search.`
              : "Check back later for new guest travel moments."}
          </p>
          {(searchQuery || activeTag !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveTag("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#2E8B8B] hover:bg-[#267373] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}

      {/* ── Interactive Lightbox Modal ── */}
      {activePhoto && (
        <div
          onClick={() => setActivePhotoIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200"
        >
          {/* Top Bar inside modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl flex items-center justify-between text-white py-2 z-50"
          >
            <div className="flex items-center gap-2">
              <Camera size={18} className="text-[#F8904D]" />
              <span className="text-xs sm:text-sm font-bold tracking-wide">
                Guest Travel Moment {activePhotoIndex! + 1} of {filteredItems.length}
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
          {filteredItems.length > 1 && (
            <button
              onClick={handlePrevPhoto}
              className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-50 hover:scale-105 active:scale-95 shadow-xl"
              aria-label="Previous Photo"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Right Arrow Button */}
          {filteredItems.length > 1 && (
            <button
              onClick={handleNextPhoto}
              className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-50 hover:scale-105 active:scale-95 shadow-xl"
              aria-label="Next Photo"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Main Photo Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex items-center justify-center max-w-5xl max-h-[72vh] sm:max-h-[76vh] w-full px-2"
          >
            <img
              src={activePhoto.imageUrl}
              alt={activePhoto.caption || activePhoto.location || `Guest Travel Moment`}
              className="max-h-[70vh] sm:max-h-[74vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Bottom Bar: Caption, Location, and Plan Trip CTA */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-white z-50"
          >
            <div className="text-center sm:text-left space-y-0.5">
              {activePhoto.location && (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD9A8] uppercase tracking-wider">
                  <MapPin size={13} className="text-[#F8904D]" />
                  <span>{activePhoto.location}</span>
                </div>
              )}
              <p className="text-sm sm:text-base font-semibold text-white">
                {activePhoto.caption || "Authentic holiday memory with KoiKoi Travel"}
              </p>
            </div>

            <QuoteModal>
              <button
                type="button"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F8904D] to-[#e07b3b] hover:from-[#e07b3b] hover:to-[#c8692d] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Compass size={14} />
                <span>Plan A Trip Like This</span>
              </button>
            </QuoteModal>
          </div>
        </div>
      )}

      {/* ── Bottom Conversion & Share Section ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c4e4e] via-[#2E8B8B] to-[#1e5a5a] text-white p-8 sm:p-12 border border-[#2E8B8B]/40 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F8904D]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFD9A8] text-xs font-bold uppercase tracking-wider">
            <Heart size={13} className="text-[#F8904D]" />
            <span>Create Memories of a Lifetime</span>
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            Ready to Experience Incredible India Yourself?
          </h3>

          <p className="text-slate-100 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            From majestic Rajput palaces and tranquil backwaters to custom private chauffeur tours, our destination specialists tailor every journey around your dreams.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
            <QuoteModal>
              <button
                type="button"
                className="px-7 py-3.5 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-bold text-sm shadow-lg shadow-black/25 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Compass size={16} />
                <span>Get Free Custom Itinerary</span>
              </button>
            </QuoteModal>

            <a
              href="https://wa.me/919910000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm backdrop-blur-md transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <MessageCircle size={16} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
