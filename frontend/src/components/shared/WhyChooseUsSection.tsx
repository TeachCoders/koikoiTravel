"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, HeartHandshake, Banknote, UserCheck, ChevronLeft, ChevronRight, Maximize2, X, MapPin } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { useGuestGallery } from "@/feature/guestGallery/api";
import FallbackImage from "@/components/shared/FallbackImage";

interface WhyChooseUsSectionProps {
  images?: string[];
  hideGallery?: boolean;
}

const REVIEWS = [
  {
    id: 1,
    name: "James & Eleanor Vance",
    location: "London, UK",
    tripName: "Golden Triangle & Varanasi (8D/7N)",
    rating: 5,
    comment: "Landing in Delhi at 2 AM was seamless with our driver Ramesh waiting with a warm smile. Clean vehicle, bottled water always ready, and he took us to a quiet rooftop facing the Taj Mahal!",
  },
  {
    id: 2,
    name: "Marcus & Clara Weber",
    location: "Munich, Germany",
    tripName: "Rajasthan Forts & Desert Safari (7D/6N)",
    rating: 5,
    comment: "What we appreciated most was the complete transparency with zero hidden charges. Our driver Kuldeep was extremely courteous. Sleeping under the stars in Jaisalmer was magical!",
  },
  {
    id: 3,
    name: "Sarah & Daniel Jenkins",
    location: "Manchester, UK",
    tripName: "Kashmir Luxury Tour (6D/5N)",
    rating: 5,
    comment: "Our driver Tariq was amazing in Kashmir! Clean Innova cab, warm hotel rooms in Pahalgam, and zero hassle with Gulmarg snow passes.",
  },
  {
    id: 4,
    name: "Liam & Emma Davies",
    location: "Sydney, Australia",
    tripName: "Kerala Backwaters & Hills (5D/4N)",
    rating: 5,
    comment: "Traveled with our elderly mother and a toddler. Driver Sunil drove very carefully on Munnar curves, and the houseboat chef cooked mild non-spicy food specifically for our kid!",
  },
  {
    id: 5,
    name: "Clara & Thomas Schmidt",
    location: "Berlin, Germany",
    tripName: "Himachal Manali & Shimla (7D/6N)",
    rating: 5,
    comment: "Booked for 6 of us. Clean cab, huge breakfast spread, and Atal Tunnel permits were pre-arranged to avoid traffic jams. Highly recommend their local team!",
  },
];

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ images = [], hideGallery = false }) => {
  const { data: apiData } = useGuestGallery(1, 8, true);
  
  const dbItems = apiData?.data?.map(item => ({
    url: item.imageUrl,
    caption: item.caption || "",
    location: item.location || ""
  })) || [];

  let galleryItems = images && images.length > 0 
    ? images.map(url => ({ url, caption: "", location: "" }))
    : dbItems;

  galleryItems = galleryItems.slice(0, 8);

  if (galleryItems.length === 0) {
    galleryItems = [{ url: "", caption: "", location: "" }];
  }
  
  const showGallery = !hideGallery && galleryItems.length > 0;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Review Slider State
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const rTimer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(rTimer);
  }, []);

  useEffect(() => {
    if (!showGallery || galleryItems.length <= 1 || isLightboxOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [showGallery, galleryItems.length, isLightboxOpen]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const currentReview = REVIEWS[reviewIndex];

  return (
    <section className="py-12 md:py-20 bg-white shadow-[inset_0_15px_20px_-15px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        
        <div className={`grid grid-cols-1 ${showGallery ? "lg:grid-cols-2 gap-12 lg:gap-16" : "gap-12"} items-center`}>
          
          {/* Left Column: Reviews & Trusted Traveler Proof */}
          <div className="flex flex-col justify-center">
            <SectionLabel>Verified Reviews & Experiences</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2 mb-3">
              Loved by Travelers Worldwide
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed max-w-xl">
              Unlike generic travel booking engines, we provide dedicated private local tour managers, 100% custom itineraries, and verified reliable drivers.
            </p>

            {/* Overall Rating Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-6 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 w-fit">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-base font-bold">★</span>
                ))}
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                4.9 / 5.0 Rating
              </span>
              <span className="text-xs text-slate-500 font-medium">
                • 1,200+ Happy Guests Worldwide
              </span>
            </div>

            {/* Active Review Card with Smooth Controls */}
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-50 to-orange-50/30 border border-slate-200/90 p-6 sm:p-7 shadow-sm mb-6">
              {/* Top Star Rating & Tour Name */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <span key={i} className="text-base">★</span>
                  ))}
                </div>
                <span className="text-[11.5px] font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 shadow-2xs">
                  {currentReview.tripName}
                </span>
              </div>

              {/* Review Comment Quote */}
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-5">
                "{currentReview.comment}"
              </p>

              {/* Reviewer Info & Navigation Arrows */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    {currentReview.name.split(" ")[0]?.[0]}
                    {currentReview.name.split(" ")[1]?.[0] || ""}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{currentReview.name}</span>
                      <span className="text-emerald-700 text-[11px] font-bold">✓ Verified</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">{currentReview.location}</p>
                  </div>
                </div>

                {/* Review Navigation Prev / Next */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setReviewIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1))}
                    className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-900 hover:text-white hover:border-slate-900 flex items-center justify-center text-slate-700 transition-all cursor-pointer shadow-2xs"
                    aria-label="Previous Review"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewIndex((prev) => (prev + 1) % REVIEWS.length)}
                    className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-900 hover:text-white hover:border-slate-900 flex items-center justify-center text-slate-700 transition-all cursor-pointer shadow-2xs"
                    aria-label="Next Review"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span>100% Tailored Private Trips</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span>24/7 Personal Trip Manager</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span>Direct Local Transparent Pricing</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span>Verified Clean Vehicles & Drivers</span>
              </div>
            </div>
          </div>
          
          {/* Right Column: Photo Slider + Lightbox Feature */}
          {showGallery && (
            <div className="flex flex-col">

              <div className="relative group">
              {/* Rotated Accent Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/25 via-orange-400/15 to-amber-500/10 rounded-[40px] transform rotate-3" />
              
              <div 
                className="relative z-10 w-full h-[520px] sm:h-[600px] rounded-[40px] overflow-hidden shadow-2xl bg-white border border-slate-100 cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              >
                
                {/* Expand Lightbox Hint Icon */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                  className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-90 hover:opacity-100 hover:scale-110 shadow-lg border border-white/30"
                  title="Expand Fullscreen Lightbox"
                >
                  <Maximize2 size={18} />
                </button>

                {/* Horizontal Track Slider */}
                <div className="w-full h-full overflow-hidden relative">
                  <div
                    className="flex w-full h-full transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {galleryItems.map((item, idx) => (
                      <div key={idx} className="w-full h-full relative shrink-0 flex-none group/slide overflow-hidden rounded-3xl">
                        <FallbackImage
                          src={item.url || null}
                          alt={`Traveler Moment ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/slide:scale-105"
                          fill
                        />
                        
                        {(item.caption || item.location) && (
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-8 pt-32 flex flex-col justify-end pointer-events-none transition-all duration-300">
                            {item.caption && <h4 className="text-white font-black text-2xl sm:text-3xl tracking-tight drop-shadow-xl mb-2">{item.caption}</h4>}
                            {item.location && (
                              <p className="text-orange-300 text-sm sm:text-base font-bold flex items-center gap-2 drop-shadow-md">
                                <MapPin size={16} className="text-orange-400" />
                                {item.location}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Controls */}
                {galleryItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 border border-slate-200/60 opacity-90 hover:opacity-100"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft size={22} />
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 border border-slate-200/60 opacity-90 hover:opacity-100"
                      aria-label="Next Slide"
                    >
                      <ChevronRight size={22} />
                    </button>

                    {/* Indicator Dots */}
                    <div className="absolute bottom-6 inset-x-0 z-30 flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                        {galleryItems.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentIndex(idx);
                            }}
                            className={`h-2 rounded-full transition-all ${
                              idx === currentIndex ? "w-6 bg-orange-500" : "w-2 bg-white/70 hover:bg-white"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>

            {/* Premium Gallery Subtext */}
            <div className="mt-8 px-4 text-center lg:text-right self-center lg:self-end">
              <h4 className="text-slate-800 font-extrabold text-xl sm:text-2xl tracking-tight flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3">
                <span className="w-12 h-px bg-orange-400 hidden sm:block"></span>
                Photos of sightseeing and shared by our travelers
              </h4>
            </div>
          </div>
          )}

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all"
            title="Close Lightbox"
          >
            <X size={24} />
          </button>

          {/* Photo Counter */}
          <div className="absolute top-6 left-6 z-50 text-white/90 font-bold text-sm bg-black/50 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">
            {currentIndex + 1} / {galleryItems.length}
          </div>

          {/* Lightbox Image Container */}
          <div 
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full min-h-[50vh]">
              <FallbackImage
                src={galleryItems[currentIndex]?.url || null}
                alt={`Lightbox Photo ${currentIndex + 1}`}
                className="object-contain rounded-2xl shadow-2xl"
                fill
              />
            </div>

            {(galleryItems[currentIndex]?.caption || galleryItems[currentIndex]?.location) && (
              <div className="mt-6 text-center shrink-0 animate-fade-in-up">
                {galleryItems[currentIndex]?.caption && (
                  <h3 className="text-white font-black text-3xl sm:text-4xl tracking-tight drop-shadow-lg mb-2">
                    {galleryItems[currentIndex].caption}
                  </h3>
                )}
                {galleryItems[currentIndex]?.location && (
                  <div className="inline-flex items-center justify-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm shadow-sm">
                    <MapPin size={14} className="text-orange-400" />
                    <span className="text-white/90 text-sm font-semibold tracking-wide uppercase">
                      {galleryItems[currentIndex].location}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Prev / Next Buttons in Lightbox */}
            {galleryItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black p-3.5 rounded-full border border-white/30 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black p-3.5 rounded-full border border-white/30 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default WhyChooseUsSection;
