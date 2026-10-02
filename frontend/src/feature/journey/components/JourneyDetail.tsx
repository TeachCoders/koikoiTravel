"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { ImageWatermark } from "@/components/shared/ImageWatermark";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Sparkles,
  BadgeCheck,
  ShieldCheck,
  CalendarDays,
  ArrowRight,
  ChevronDown,
  Star,
  Route,
  MessageCircle,
  Phone,
  Snowflake,
  Sun,
  CloudRain,
  Moon,
  SunMoon,
  Timer,
  Clock,
} from "lucide-react";
import { useEffect, useState, Fragment, useMemo } from "react";
import dynamic from "next/dynamic";
import { useJourneyBySlug } from "@/feature/journey/api/useJourney";
import type { Journey } from "@/feature/journey/type";
import { groupMonthsBySeason } from "@/components/shared/seasonUtils";
import PageLoader from "@/components/shared/PageLoader";
import TourBookingForm from "@/feature/leads/components/TourBookingForm";
import { travelExperienceIcon } from "@/components/shared/TravelExperiencePills";
import RichContent, { sanitizeHtml } from "@/components/shared/RichContent";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { linkKeywords, buildExperienceLinkRules, type AutoLinkRule } from "@/lib/autoInternalLink";
import { cn, stripHtml } from "@/lib/utils";
import FaqSection from "@/feature/home/components/FaqSection";

const JourneyLightbox = dynamic(() => import("./JourneyLightbox"), { ssr: false });
const QuoteModal = dynamic(() => import("@/components/shared/QuoteModal").then((m) => m.QuoteModal), { ssr: false });

export default function JourneyDetail({ slug, initialJourney }: { slug: string; initialJourney?: Journey | null }) {
  const { journey: queriedJourney, isLoading } = useJourneyBySlug(slug, initialJourney);
  const journey = queriedJourney || initialJourney;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [pageUrl, setPageUrl] = useState("");

  const cityLinkRules = useMemo<AutoLinkRule[]>(
    () =>
      (journey?.cities ?? [])
        .filter((c) => c.state?.slug && c.state?.country?.slug && c.slug)
        .map((c) => ({
          term: c.title,
          href: `/tour-packages/${c.state!.country!.slug}/${c.state!.slug}/${c.slug}`,
        })),
    [journey]
  );

  const paragraphLinkRules = useMemo<AutoLinkRule[]>(
    () => [...buildExperienceLinkRules(), ...cityLinkRules],
    [cityLinkRules]
  );

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const WHATSAPP_NUMBER =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919136739178";

  const SALES_PHONE = process.env.NEXT_PUBLIC_SALES_PHONE || "+919136739178";

  if (!journey && isLoading) return <PageLoader size="page" />;
  if (!journey) return notFound();

  const countrySlug = journey.cities?.[0]?.state?.country?.slug;
  const countryTitle = journey.cities?.[0]?.state?.country?.title;
  const stateSlug = journey.cities?.[0]?.state?.slug;
  const stateTitle = journey.cities?.[0]?.state?.title;

  const heroImages = journey.banner?.images?.length
    ? journey.banner.images
    : journey.thumbImg
      ? [journey.thumbImg]
      : [];

  const lightboxSlides = heroImages.map((src) => ({ src, alt: journey.title }));

  const pageH1 = journey.h1Title || journey.title;
  const durationText =
    journey.duration || (journey.noDays > 0 ? `${journey.noDays} Days` : "");
  const cleanJourneyTitle = (journey.title || "").split("|")[0].trim();

  const breadcrumbNavItems = [
    { label: "Home", href: "/" },
    { label: "Tour Packages", href: "/tour-packages" },
  ];

  if (countrySlug && countryTitle) {
    breadcrumbNavItems.push({
      label: countryTitle.replace(/\s*Tour$/i, ""),
      href: `/tour-packages/${countrySlug}`,
    });
  }

  if (stateSlug && stateTitle && countrySlug) {
    breadcrumbNavItems.push({
      label: stateTitle,
      href: `/tour-packages/${countrySlug}/${stateSlug}`,
    });
  }

  return (
    <div className="pb-20 lg:pb-0">
      {/* ===== BREADCRUMB ===== */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-2.5 flex flex-wrap items-center gap-1.5 text-[14px] text-slate-500">
          {breadcrumbNavItems.map((item, idx) => (
            <Fragment key={idx}>
              {idx > 0 && <ChevronRight size={14} className="text-slate-300 shrink-0" />}
              <Link href={item.href} className="hover:text-[#2E8B8B] transition-colors shrink-0">
                {item.label}
              </Link>
            </Fragment>
          ))}
          <ChevronRight size={14} className="text-slate-300 shrink-0" />
          <span className="text-[#1C1C1C] font-semibold truncate max-w-[320px] md:max-w-none">
            {cleanJourneyTitle}
          </span>
        </div>
      </nav>

      {/* ===== HERO + HEADING ===== */}
      <div className="bg-white relative overflow-hidden border-b border-slate-100">
        {/* Taj Mahal + Dance + Mandala pattern */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23D4561A' stroke-width='0.8'%3E%3Crect x='0' y='0' width='200' height='200' fill='none'/%3E%3Cpath d='M90 60 L100 20 L110 60 M85 62 L80 75 L120 75 L115 62 M75 75 L75 90 L125 90 L125 75 M100 20 L100 14 M96 38 L100 25 L104 38 M80 90 L80 120 L120 120 L120 90 M85 120 L85 125 L115 125 L115 120 M100 90 L100 120'/%3E%3Ccircle cx='100' cy='72' r='4'/%3E%3Cpath d='M60 155 Q60 145 65 140 Q60 135 55 140 Q60 145 60 155 M52 160 L60 155 L68 160 M50 168 L52 160 L48 170 M68 160 L72 168 L64 170 M55 140 L48 135 M65 140 L72 135 M55 150 L52 155 M65 150 L68 155 M60 155 L60 168 M55 168 L65 168'/%3E%3Ccircle cx='60' cy='135' r='5'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3Ccircle cx='40' cy='40' r='5'/%3E%3Cpath d='M40 25 L40 15 M40 55 L40 65 M25 40 L15 40 M55 40 L65 40'/%3E%3Ccircle cx='160' cy='160' r='12'/%3E%3Ccircle cx='160' cy='160' r='7'/%3E%3Ccircle cx='160' cy='160' r='3'/%3E%3Cpath d='M160 148 L160 140 M160 172 L160 180 M148 160 L140 160 M172 160 L180 160'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-5 md:py-10 relative z-10">

          {/* Header Info Block */}
          <div className="mb-5">

            {pageH1 && (
              <h1 className="font-heading text-[25px] font-extrabold tracking-tight text-[#1C1C1C] mb-3 leading-[1.2]">
                {durationText && (
                  <span className="text-[#2E8B8B]">{durationText}</span>
                )}
                {durationText && (
                  <span className="mx-2 text-slate-300">-</span>
                )}
                {pageH1}
              </h1>
            )}
            {journey.destination && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <div className="flex items-center gap-1.5 text-[13.5px] font-bold text-[#2E8B8B] bg-teal-50/80 border border-teal-200/80 px-3 py-1 rounded-xl shrink-0">
                  <Route size={15} className="text-[#2E8B8B]" />
                  <span>Journey Route:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {(journey.route && journey.route.length > 0
                    ? journey.route.map((c) => c.title)
                    : journey.destination.split("-").map((s) => s.trim())
                  ).map((city, idx, arr) => (
                    <Fragment key={idx}>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100/90 text-slate-800 text-[13px] font-bold border border-slate-200/70 shadow-2xs">
                        {city}
                      </span>
                      {idx < arr.length - 1 && (
                        <ChevronRight size={14} className="text-slate-400 shrink-0" />
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* LEFT: BANNER | RIGHT: BOOKING CARD */}
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] lg:items-stretch items-start gap-8 lg:gap-10">
            <section className="h-full">
              {heroImages.length > 0 ? (
                <div className="flex flex-col h-full">
                  <div
                    className={cn(
                      "grid gap-2 md:gap-3 lg:h-full w-full",
                      heroImages.length === 1 ? "grid-cols-1 grid-rows-1 md:h-[380px]" :
                        heroImages.length === 2 ? "grid-cols-1 grid-rows-2 h-[260px] md:h-[380px]" :
                          "grid-cols-2 grid-rows-2 h-[260px] md:h-[380px]" // 3 or 4+ images
                    )}
                  >
                    {/* Image 1 */}
                    <button
                      type="button"
                      onClick={() => openLightbox(0)}
                      className={cn(
                        "w-full h-full rounded-[16px] md:rounded-3xl overflow-hidden cursor-pointer group relative block p-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
                        heroImages.length === 3 ? "col-span-1 row-span-2" : "col-span-1 row-span-1"
                      )}
                    >
                      <FallbackImage
                        src={heroImages[0]}
                        alt={journey.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </button>

                    {/* Image 2 */}
                    {heroImages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => openLightbox(1)}
                        className="w-full h-full rounded-[16px] md:rounded-3xl overflow-hidden cursor-pointer group relative block p-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] col-span-1 row-span-1"
                      >
                        <FallbackImage
                          src={heroImages[1]}
                          alt={journey.title}
                          fill
                          loading="lazy"
                          sizes="(max-width: 1024px) 50vw, 27vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </button>
                    )}

                    {/* Image 3 */}
                    {heroImages.length > 2 && (
                      <button
                        type="button"
                        onClick={() => openLightbox(2)}
                        className="w-full h-full rounded-[16px] md:rounded-3xl overflow-hidden cursor-pointer group relative block p-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] col-span-1 row-span-1"
                      >
                        <FallbackImage
                          src={heroImages[2]}
                          alt={journey.title}
                          fill
                          loading="lazy"
                          sizes="(max-width: 1024px) 50vw, 27vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </button>
                    )}

                    {/* Image 4 */}
                    {heroImages.length > 3 && (
                      <button
                        type="button"
                        onClick={() => openLightbox(3)}
                        className="w-full h-full rounded-[16px] md:rounded-3xl overflow-hidden cursor-pointer group relative block p-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] col-span-1 row-span-1"
                      >
                        <FallbackImage
                          src={heroImages[3]}
                          alt={journey.title}
                          fill
                          loading="lazy"
                          sizes="(max-width: 1024px) 50vw, 27vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        {/* +More Photos overlay for 4+ images */}
                        {heroImages.length > 4 && (
                          <div className="absolute inset-0 bg-[#1C1C1C]/20 flex items-center justify-center transition-colors group-hover:bg-[#1C1C1C]/30">
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                openLightbox(4);
                              }}
                              className="px-4 py-2.5 rounded-xl bg-white/95 backdrop-blur-md text-[#1C1C1C] text-[12px] md:text-[13px] font-extrabold shadow-xl hover:bg-white transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              +{heroImages.length - 4} Photos
                            </span>
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative h-[260px] md:h-[380px] bg-slate-200 rounded-3xl overflow-hidden">
                  <ImageWatermark theme="light" />
                </div>
              )}
            </section>

            {/* RIGHT: DETAILS */}
            <aside className="h-full">
              <div className="rounded-3xl border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                  <Sparkles className="w-32 h-32 rotate-12" />
                </div>

                <div className="p-7 lg:p-8 flex-1">
                  {/* 1. Price */}
                  {(journey.pricePerPerson ?? 0) > 0 && (
                    <>
                      <div className="relative z-10">
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#2E8B8B] mb-2">Starting Price</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black text-[#F8904D]">
                            ₹{(journey.pricePerPerson ?? 0).toLocaleString()}
                          </span>
                          {(journey.discountPrice ?? 0) > 0 && (
                            <span className="text-lg font-medium text-slate-400 line-through">
                              ₹{(journey.discountPrice ?? 0).toLocaleString()}
                            </span>
                          )}
                          <span className="text-sm font-medium text-slate-500 ml-1">/ person</span>
                        </div>
                      </div>
                      <hr className="my-7 border-slate-100" />
                    </>
                  )}

                  {/* 2. Quick Facts / Trip Overview */}
                  <div className="mb-6 relative z-10 space-y-5">
                    <h3 className="text-[20px] leading-[1.3] font-extrabold text-[#1C1C1C] flex items-center gap-2">
                      <Sparkles size={18} className="text-[#F8904D]" />
                      Trip Overview
                    </h3>

                    <div className="space-y-4">
                      {/* Duration */}
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2 text-[14.5px] text-slate-600 font-semibold">
                          <SunMoon size={16} className="text-[#2E8B8B]" />
                          Duration
                        </span>
                        <span className="text-[15.5px] font-extrabold text-[#1C1C1C]">
                          {journey.duration ||
                            (journey.noDays > 0
                              ? `${journey.noDays > 1 ? `${journey.noDays - 1} Nights / ` : ""}${journey.noDays} Days`
                              : "—")}
                        </span>
                      </div>

                      {/* Best Season to Visit */}
                      {(journey.months?.length ?? 0) > 0 && (
                        <div className="pt-4 border-t border-slate-100/80 flex flex-col gap-2.5">
                          <h4 className="text-[14.5px] font-bold text-[#1C1C1C] flex items-center gap-2">
                            <CalendarDays size={16} className="text-[#2E8B8B]" />
                            Best Season to Visit
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {groupMonthsBySeason(journey.months!).map((g) => {
                              const rangeText = formatSeasonRange(g);
                              return (
                                <div
                                  key={g.season}
                                  className={cn(
                                    "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[12.5px] font-bold border transition-all shadow-2xs",
                                    getSeasonStyles(g.season)
                                  )}
                                >
                                  {getSeasonIcon(g.season)}
                                  <div className="flex items-center gap-1">
                                    <span>{g.label}</span>
                                    {rangeText && (
                                      <span className="opacity-75 font-medium text-[10.5px]">({rangeText})</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 3. Ideal For */}
                  {(journey.travelExperiences?.length ?? 0) > 0 && (
                    <div className="relative z-10 pt-4 border-t border-slate-100/80">
                      <h4 className="text-[14.5px] font-bold text-[#1C1C1C] mb-3 flex items-center gap-2">
                        <Star size={16} className="text-[#F5B041] fill-[#F5B041]" />
                        Ideal For
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {journey.travelExperiences!.map((e) => (
                          <span
                            key={e.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50/80 hover:bg-orange-50/60 text-slate-700 hover:text-[#F8904D] text-[12.5px] font-bold border border-slate-200/80 hover:border-orange-200 transition-all shadow-2xs"
                          >
                            <span className="text-[#2E8B8B] shrink-0">{travelExperienceIcon(e.title)}</span>
                            <span>{e.title}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* Interested in this tour - desktop only. On a phone the card
                    stacks and this pushes the itinerary down, and the sticky
                    action bar already carries both actions. */}
                <div className="p-6 lg:p-8 bg-slate-50 border-t border-slate-100 hidden lg:flex flex-col gap-4 relative z-10">
                  <div>
                    <h3 className="text-[18px] font-extrabold text-[#1C1C1C] mb-1 leading-[1.3]">Interested in this tour?</h3>
                    <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
                      Get in touch with our travel experts for a customized itinerary and instant best quote.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Hi! I'm interested in "${journey.title}". Please share the best price and availability.\n\nTour Page: ${pageUrl}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-xl bg-[#2E8B8B] hover:bg-[#247070] active:scale-95 text-white text-[12.5px] sm:text-[14.5px] font-bold shadow-md shadow-[#2E8B8B]/20 transition-all text-center"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                      <span>Get Best Price</span>
                    </a>

                    <QuoteModal>
                      <button
                        type="button"
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-xl bg-[#F8904D] hover:bg-[#b84513] active:scale-95 text-white text-[12.5px] sm:text-[14.5px] font-bold shadow-md shadow-[#F8904D]/20 transition-all text-center cursor-pointer"
                      >
                        <CalendarDays size={16} className="shrink-0" />
                        <span>Book Now</span>
                      </button>
                    </QuoteModal>
                  </div>

                  <div className="pt-2 flex items-center justify-around text-center text-[11px] font-bold text-slate-500 border-t border-slate-200/60 mt-1">
                    <span className="flex items-center gap-1 text-slate-600">
                      <ShieldCheck size={13} className="text-[#2E8B8B]" />
                      100% Customized
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Clock size={12} className="text-slate-400" />
                      &lt;15m Response
                    </span>
                  </div>
                </div>


              </div>
            </aside>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-[9fr_5fr] gap-6 lg:gap-8">
        {/* ===== MAIN ===== */}
        <div className="space-y-8 md:space-y-12">
          {journey.highlights && journey.highlights.length > 0 && (
            <section>
              <span className="accent-label">Highlights</span>
              <h2 className="h3 text-[22px] leading-[1.25] text-[#1C1C1C] mt-2 mb-3">Key Experiences</h2>
              <div className="bg-[#2E8B8B]/5 rounded-3xl p-5 md:p-6 border border-[#2E8B8B]/10">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {journey.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[15px] font-medium text-[#1C1C1C] leading-[1.5]">
                      <BadgeCheck size={18} className="shrink-0 mt-0.5 text-[#2E8B8B]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {journey.overView && (
            <section>
              <span className="accent-label">Overview</span>
              <h2 className="h3 text-[22px] leading-[1.25] text-[#1C1C1C] mt-3 mb-6">About This Tour</h2>
              <div className="bg-white rounded-3xl p-5 md:p-9 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-base text-slate-600 leading-[1.8]">
                <RichContent html={linkKeywords(journey.overView, paragraphLinkRules)} className="rich-text-plain-links" />
              </div>
            </section>
          )}

          {journey.days && journey.days.length > 0 && (
            <section>
              <div className="flex flex-wrap items-end justify-between gap-4 mb-5 md:mb-8">
                <div>
                  <span className="accent-label">Itinerary</span>
                  <h2 className="h3 text-[22px] leading-[1.25] text-[#1C1C1C] mt-2">Day By Day Itinerary</h2>
                </div>
              </div>
              <div className="relative bg-white rounded-3xl p-2 md:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                <div className="day-accordion">
                  {journey.days.map((day, i) => (
                    <DayItem key={day.id} index={i + 1} day={day} defaultOpen={i === 0} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {(journey.inclusions?.length ?? 0) > 0 || (journey.exclusions?.length ?? 0) > 0 ? (
            <div className="grid grid-cols-1 gap-6 lg:gap-8">
              {(journey.inclusions?.length ?? 0) > 0 && (
                <div className="bg-emerald-50/40 border border-emerald-100 rounded-3xl p-5 md:p-9 shadow-[0_8px_30px_rgb(16,185,129,0.04)]">
                  <h3 className="font-heading text-[20px] leading-[1.3] font-bold text-emerald-800 mb-5 flex items-center gap-2.5">
                    <CheckCircle2 size={22} className="text-emerald-500" /> What's Included
                  </h3>
                  <ul className="space-y-4">
                    {(journey.inclusions ?? []).map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[15px] font-bold text-emerald-950 leading-relaxed">
                        <CheckCircle2 size={20} className="text-emerald-500 mt-[2px] shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(journey.exclusions?.length ?? 0) > 0 && (
                <div className="bg-red-50/40 border border-red-100 rounded-3xl p-5 md:p-9 shadow-[0_8px_30px_rgb(239,68,68,0.04)]">
                  <h3 className="font-heading text-[20px] leading-[1.3] font-bold text-red-800 mb-5 flex items-center gap-2.5">
                    <XCircle size={22} className="text-red-500" /> What's Excluded
                  </h3>
                  <ul className="space-y-4">
                    {(journey.exclusions ?? []).map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-red-950 leading-relaxed">
                        <XCircle size={20} className="text-red-500 mt-[2px] shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : null}

          {(journey.whyChooseUs?.length ?? 0) > 0 && (
            <section>
              <span className="accent-label">Why Choose Us</span>
              <h2 className="h3 text-[22px] leading-[1.25] text-[#1C1C1C] mt-2 mb-4 md:mb-6">Why Book With Us</h2>
              <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#F8FAFA] to-[#EBF3F3] p-6 md:p-10 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#2E8B8B]/10">
                {/* Background Watermark Icon */}
                <div className="absolute -top-8 -right-4 opacity-[0.05] pointer-events-none rotate-12">
                  <ShieldCheck className="w-56 h-56 md:w-64 md:h-64 text-[#2E8B8B]" />
                </div>
                {/* Subtle Glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2E8B8B]/10 blur-[80px] rounded-full pointer-events-none" />

                <ul className="relative z-10 space-y-5 md:space-y-6">
                  {(journey.whyChooseUs ?? []).map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-[15px] font-semibold text-slate-700 leading-[1.7]">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 border border-slate-100 shadow-sm">
                        <ShieldCheck size={18} className="text-[#2E8B8B]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        {/* ===== SIDEBAR ===== */}
        <aside className="space-y-8 lg:sticky lg:top-24 self-start">
          <div className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white border border-slate-100 overflow-hidden">
            <TourBookingForm embedded />
          </div>

          {(journey.bookingPolicyList?.length ?? 0) > 0 && (
            <div className="rounded-3xl bg-slate-50 border border-slate-100 p-7">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#2E8B8B] mb-5 flex items-center gap-2">
                <Sparkles size={16} className="text-[#F8904D]" />
                Booking Policy
              </h4>
              <ul className="space-y-3.5">
                {(journey.bookingPolicyList ?? []).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] font-medium text-slate-600 leading-relaxed">
                    <BadgeCheck size={18} className="shrink-0 mt-[2px] text-[#2E8B8B]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {stateSlug && stateTitle && (
            <div className="rounded-2xl bg-[#1C1C1C] text-white p-6 text-center">
              <Star size={20} className="mx-auto text-[#F5B041] mb-2" />
              <p className="text-sm text-white/85">
                Discover more tours from <span className="font-bold">{stateTitle}</span>
              </p>
              <Link
                href={`/tour-packages/${countrySlug}/${stateSlug}`}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1C1C1C] text-sm font-semibold hover:bg-[#2E8B8B] hover:text-white transition-colors"
              >
                View All Tours <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </aside>
      </div>

      {/* ===== TRIP GUIDE (MORE DESCRIPTION) ===== */}
      {journey.moreDescription && (
        <section id="more" className="bg-[#f8f8f8] border-y border-slate-200/60 py-12 md:py-20">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10">
            <div className="max-w-4xl">
              <span className="accent-label">Trip Guide</span>
              <RichContent
                html={linkKeywords(journey.moreDescription, paragraphLinkRules)}
                className="rich-text-plain-links mt-4"
              />
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ SECTION ===== */}
      <FaqSection faqs={journey.faqs} />

      {lightboxOpen && (
        <JourneyLightbox
          open={lightboxOpen}
          index={lightboxIndex}
          close={() => setLightboxOpen(false)}
          slides={lightboxSlides}
        />
      )}

    </div>
  );
}

function DayItem({
  index,
  day,
  defaultOpen,
}: {
  index: number;
  day: { id: number; day: string; description?: string; image?: string };
  defaultOpen?: boolean;
}) {
  const dayTitle = sanitizeHtml(day.day.replace(/^Day\s*\d+\s*:\s*/i, "").trim());

  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const details = e.currentTarget;
    if (!details.open) return;
    const container = details.closest(".day-accordion");
    if (!container) return;

    // Only one day stays open. Closing the previously open day removes height from
    // the content ABOVE the tapped row, which would drag the page upwards and move
    // the row the user just tapped. Anchor the row and undo that shift so the top
    // of the page never jumps — this is very visible on mobile.
    const anchor = details.querySelector("summary") ?? details;
    const beforeTop = anchor.getBoundingClientRect().top;

    container
      .querySelectorAll<HTMLDetailsElement>("details[open]")
      .forEach((other) => {
        if (other !== details) other.open = false;
      });

    const shift = anchor.getBoundingClientRect().top - beforeTop;
    if (shift !== 0) {
      window.scrollBy({ top: shift, left: 0, behavior: "instant" });
    }
  };

  return (
    <details
      open={defaultOpen}
      onToggle={handleToggle}
      className="day-accordion-item group relative pl-0 py-0.5 md:py-1.5 first:pt-0 last:pb-0 border-b border-slate-100 last:border-b-0"
    >
      <summary className="flex items-center justify-between gap-3 py-2.5 md:py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
        {/* Vertical Timeline Line */}
        <span
          aria-hidden="true"
          className="hidden md:block absolute left-[15px] top-0 -bottom-px w-[2px] bg-[#2E8B8B]/20 z-0 pointer-events-none"
        />
        <span className="flex items-center gap-2.5 font-heading text-[17px] font-bold text-[#1C1C1C] rich-text-plain-links relative z-10">
          {/* Timeline Dot */}
          <span className="hidden md:flex w-8 h-8 rounded-full bg-white border-[3px] border-[#2E8B8B] items-center justify-center shadow-sm z-10 transition-colors duration-300 shrink-0">
            <span className="text-xs font-black text-[#2E8B8B]">{index}</span>
          </span>
          <span className="mr-1.5 text-[#F8904D]">Day {index}:</span>
          <span dangerouslySetInnerHTML={{ __html: dayTitle }} />
        </span>
        <ChevronDown
          size={20}
          className="shrink-0 text-[#2E8B8B] transition-transform duration-300 group-open:rotate-180"
        />
      </summary>

      <div className="day-accordion-content">
        {/* Single child so grid-template-rows 0fr -> 1fr can collapse/expand the
            whole block smoothly. Padding lives here, not on the outer wrapper, so
            nothing shows through while the row is at 0fr. */}
        <div className="day-accordion-inner pt-1 md:pt-2 pb-5 md:pl-[44px]">
          {day.description && (
            <div className="text-[15px] text-slate-600 leading-[1.8]">
              <RichContent html={day.description} className="rich-text-plain-links" />
            </div>
          )}
          {day.image && (
            <div className="relative mt-4 w-full h-[200px] md:h-[280px] rounded-2xl overflow-hidden shadow-sm">
              <FallbackImage
                src={day.image}
                alt={day.day.replace(/^Day\s*\d+\s*:\s*/i, "")}
                fill
                loading="lazy"
                sizes="100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </details>
  );
}

function formatSeasonRange(g: { range: string }) {
  if (!g.range) return "";
  const parts = g.range.split(" - ").map((p) => p.trim());
  if (parts.length === 2 && parts[0].toLowerCase() === parts[1].toLowerCase()) {
    return "";
  }
  return g.range;
}

function getSeasonIcon(seasonKey: string) {
  switch (seasonKey.toLowerCase()) {
    case "winter":
      return <Snowflake size={13} className="text-sky-600 shrink-0" />;
    case "spring":
      return <Sun size={13} className="text-amber-600 shrink-0" />;
    case "monsoon":
      return <CloudRain size={13} className="text-blue-600 shrink-0" />;
    default:
      return <Sparkles size={13} className="text-[#2E8B8B] shrink-0" />;
  }
}

function getSeasonStyles(seasonKey: string) {
  switch (seasonKey.toLowerCase()) {
    case "winter":
      return "bg-sky-50 text-sky-900 border-sky-200/90 shadow-sky-500/5";
    case "spring":
      return "bg-amber-50 text-amber-900 border-amber-200/90 shadow-amber-500/5";
    case "monsoon":
      return "bg-blue-50 text-blue-900 border-blue-200/90 shadow-blue-500/5";
    default:
      return "bg-teal-50 text-teal-900 border-teal-200/90 shadow-teal-500/5";
  }
}
