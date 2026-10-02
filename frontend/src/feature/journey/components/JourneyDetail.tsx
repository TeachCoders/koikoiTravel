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
  Camera,
  Car,
  Building2,
  SlidersHorizontal,
  Check,
  MapPin,
  Users,
  Compass,
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
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  const toggleAllDays = () => {
    const container = document.querySelector(".day-accordion");
    if (!container) return;
    const items = container.querySelectorAll<HTMLDetailsElement>("details");
    const nextState = !isAllExpanded;
    items.forEach((d) => {
      d.open = nextState;
    });
    setIsAllExpanded(nextState);
  };

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

  const pageH1 = journey.h1Title || journey.title || "";
  const durationText =
    journey.duration || (journey.noDays > 0 ? `${journey.noDays} Days` : "");
  const cleanJourneyTitle = (journey.title || "").split("|")[0].trim();

  // If pageH1 already starts with durationText (e.g. "8 Days - 8 Days Golden Triangle..."), strip leading duration to avoid duplicate
  const durationRegex = durationText ? new RegExp(`^${durationText.trim()}\\s*[-–—:|]*\\s*`, "i") : null;
  const displayTitle = durationRegex ? pageH1.replace(durationRegex, "").trim() : pageH1;

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
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-5 md:py-8 relative z-10">

          {/* Header Info Block */}
          <div className="mb-4">
            {/* Luxury Eyebrow Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E8B8B]/10 text-[#2E8B8B] text-xs font-bold tracking-wide">
                <Sparkles size={12} className="text-[#2E8B8B]" />
                {journey.banner?.bannerTag || "Private Bespoke Tour"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 text-[11px] font-bold">
                <ShieldCheck size={12} className="text-amber-600" />
                100% Private (No Strangers)
              </span>
              {journey.destination && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
                  <MapPin size={11} className="text-slate-500" />
                  {journey.route && journey.route.length > 0 ? `${new Set(journey.route.map(r => r.title.replace(/\s+Tours?$/i, ""))).size} Iconic Cities` : "Multi-City Tour"}
                </span>
              )}
            </div>

            {pageH1 && (
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-[32px] font-extrabold tracking-tight text-[#1C1C1C] mb-3 leading-[1.25]">
                {durationText && (
                  <span className="text-[#2E8B8B] inline-block mr-2.5">{durationText}</span>
                )}
                {durationText && displayTitle && (
                  <span className="text-slate-300 font-normal mr-2.5">|</span>
                )}
                <span>{displayTitle || pageH1}</span>
              </h1>
            )}

            {journey.destination && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2E8B8B] bg-[#2E8B8B]/10 border border-[#2E8B8B]/20 px-3 py-1 rounded-xl shrink-0">
                  <Route size={14} className="text-[#2E8B8B]" />
                  <span>Journey Route:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {(journey.route && journey.route.length > 0
                    ? journey.route.map((c) => c.title.replace(/\s+Tours?$/i, "").trim())
                    : journey.destination.split("-").map((s) => s.replace(/\s+Tours?$/i, "").trim())
                  ).map((city, idx, arr) => (
                    <Fragment key={idx}>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100/90 text-slate-800 text-[13px] font-bold border border-slate-200/70 shadow-2xs">
                        {city}
                      </span>
                      {idx < arr.length - 1 && (
                        <ChevronRight size={13} className="text-slate-400 shrink-0" />
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Luxury Amenities Ribbon */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 py-3 px-4 md:px-5 my-4 bg-gradient-to-r from-slate-50 via-teal-50/20 to-slate-50 border border-slate-200/70 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#2E8B8B]/10 flex items-center justify-center shrink-0 text-[#2E8B8B]">
                  <Car size={17} />
                </div>
                <div>
                  <p className="text-[12.5px] font-extrabold text-[#1C1C1C] leading-tight">Private AC Chauffeur</p>
                  <p className="text-[11px] text-slate-500 font-medium">Door-to-door comfort</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#F8904D]/10 flex items-center justify-center shrink-0 text-[#F8904D]">
                  <BadgeCheck size={17} />
                </div>
                <div>
                  <p className="text-[12.5px] font-extrabold text-[#1C1C1C] leading-tight">Licensed Local Guides</p>
                  <p className="text-[11px] text-slate-500 font-medium">English & multi-lingual</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-600">
                  <Building2 size={17} />
                </div>
                <div>
                  <p className="text-[12.5px] font-extrabold text-[#1C1C1C] leading-tight">Handpicked Stays</p>
                  <p className="text-[11px] text-slate-500 font-medium">4★, 5★ & Heritage</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600">
                  <SlidersHorizontal size={17} />
                </div>
                <div>
                  <p className="text-[12.5px] font-extrabold text-[#1C1C1C] leading-tight">100% Tailor-Made</p>
                  <p className="text-[11px] text-slate-500 font-medium">Custom pace & dates</p>
                </div>
              </div>
            </div>

          </div>

          {/* LEFT: BANNER | RIGHT: BOOKING CARD */}
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] lg:items-stretch items-start gap-8 lg:gap-10">
            <section className="h-full">
              {heroImages.length > 0 ? (
                <div className="flex flex-col h-full relative">
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

                  {/* Floating View All Photos Button */}
                  <button
                    type="button"
                    onClick={() => openLightbox(0)}
                    className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md text-[#1C1C1C] text-[12px] md:text-[13px] font-bold shadow-lg hover:bg-white hover:shadow-xl transition-all cursor-pointer border border-slate-200/80 active:scale-95"
                  >
                    <Camera size={15} className="text-[#2E8B8B]" />
                    <span>View All {heroImages.length} Photos</span>
                  </button>
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

                <div className="p-6 sm:p-7 lg:p-8 flex-1">
                  {/* 1. Price or Custom Quote */}
                  {(journey.pricePerPerson ?? 0) > 0 ? (
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
                      <hr className="my-6 border-slate-100" />
                    </>
                  ) : (
                    <div className="relative z-10 mb-6 pb-6 border-b border-slate-100">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 text-[#2E8B8B] text-[11px] font-bold uppercase tracking-wider mb-2">
                        <Sparkles size={12} /> Tailor-Made Private Tour
                      </div>
                      <h4 className="text-[21px] font-extrabold text-[#1C1C1C] tracking-tight mb-1">
                        Custom Pricing on Request
                      </h4>
                      <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                        Personalized based on travel dates, group size, and preferred stays (4★, 5★ Luxury or Boutique Ashrams).
                      </p>
                    </div>
                  )}

                  {/* 2. Quick Facts / Trip Overview */}
                  <div className="mb-6 relative z-10 space-y-4">
                    <h3 className="text-[19px] leading-[1.3] font-extrabold text-[#1C1C1C] flex items-center gap-2">
                      <Sparkles size={17} className="text-[#F8904D]" />
                      Trip Highlights &amp; Facts
                    </h3>

                    <div className="space-y-3.5">
                      {/* Duration */}
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2 text-[14px] text-slate-600 font-semibold">
                          <SunMoon size={16} className="text-[#2E8B8B]" />
                          Duration
                        </span>
                        <span className="text-[15px] font-extrabold text-[#1C1C1C]">
                          {journey.duration ||
                            (journey.noDays > 0
                              ? `${journey.noDays} Days ${journey.noDays > 1 ? `/ ${journey.noDays - 1} Nights` : ""}`
                              : "—")}
                        </span>
                      </div>

                      {/* Tour Type */}
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2 text-[14px] text-slate-600 font-semibold">
                          <Users size={16} className="text-[#2E8B8B]" />
                          Tour Type
                        </span>
                        <span className="text-[14px] font-bold text-slate-800">
                          100% Private Guided Tour
                        </span>
                      </div>

                      {/* Pace */}
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2 text-[14px] text-slate-600 font-semibold">
                          <Compass size={16} className="text-[#2E8B8B]" />
                          Tour Pace
                        </span>
                        <span className="text-[14px] font-bold text-slate-800">
                          Leisurely &amp; Rejuvenating
                        </span>
                      </div>

                      {/* Best Season to Visit */}
                      {(journey.months?.length ?? 0) > 0 && (
                        <div className="pt-3.5 border-t border-slate-100 flex flex-col gap-2">
                          <h4 className="text-[14px] font-bold text-[#1C1C1C] flex items-center gap-2">
                            <CalendarDays size={15} className="text-[#2E8B8B]" />
                            Best Season to Visit
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {groupMonthsBySeason(journey.months!).map((g) => {
                              const rangeText = formatSeasonRange(g);
                              return (
                                <div
                                  key={g.season}
                                  className={cn(
                                    "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[12px] font-bold border transition-all shadow-2xs",
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
                    <div className="relative z-10 pt-3.5 border-t border-slate-100">
                      <h4 className="text-[14px] font-bold text-[#1C1C1C] mb-2.5 flex items-center gap-2">
                        <Star size={15} className="text-[#F5B041] fill-[#F5B041]" />
                        Ideal For
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {journey.travelExperiences!.map((e) => (
                          <span
                            key={e.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50/80 hover:bg-orange-50/60 text-slate-700 hover:text-[#F8904D] text-[12px] font-bold border border-slate-200/80 hover:border-orange-200 transition-all shadow-2xs"
                          >
                            <span className="text-[#2E8B8B] shrink-0">{travelExperienceIcon(e.title)}</span>
                            <span>{e.title}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Interested in this tour - desktop CTA */}
                <div className="p-6 lg:p-7 bg-slate-50/80 border-t border-slate-100 hidden lg:flex flex-col gap-4 relative z-10">
                  <div>
                    <h3 className="text-[17px] font-extrabold text-[#1C1C1C] mb-1 leading-[1.3]">Ready to personalize this trip?</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                      Connect directly with our destination specialist for a tailor-made plan &amp; instant quote.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Hi KoiKoi Travel! I'm interested in "${journey.title}". Please share the best tailor-made quote and options.\n\nTour Page: ${pageUrl}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-[#2E8B8B] hover:bg-[#247070] active:scale-95 text-white text-[13px] font-bold shadow-md shadow-[#2E8B8B]/20 transition-all text-center"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                      <span>WhatsApp Us</span>
                    </a>

                    <QuoteModal>
                      <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-[#F8904D] hover:bg-[#d97536] active:scale-95 text-white text-[13px] font-bold shadow-md shadow-[#F8904D]/20 transition-all text-center cursor-pointer"
                      >
                        <CalendarDays size={16} className="shrink-0" />
                        <span>Request Quote</span>
                      </button>
                    </QuoteModal>
                  </div>

                  <div className="pt-2 flex items-center justify-around text-center text-[11px] font-bold text-slate-500 border-t border-slate-200/60 mt-1">
                    <span className="flex items-center gap-1 text-slate-600">
                      <Check size={13} className="text-[#2E8B8B]" />
                      Free Planning
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Clock size={12} className="text-slate-400" />
                      &lt;15m Response
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <ShieldCheck size={13} className="text-[#2E8B8B]" />
                      Zero Booking Fee
                    </span>
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ===== STICKY SUB-NAV / JUMP LINKS ===== */}
      <div className="sticky top-0 lg:top-[68px] z-30 bg-white/95 backdrop-blur-md border-y border-slate-200/80 py-2.5 shadow-xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {journey.highlights && journey.highlights.length > 0 && (
            <a href="#highlights" className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-bold text-slate-600 hover:text-[#2E8B8B] hover:bg-teal-50 transition-colors shrink-0">
              Key Experiences
            </a>
          )}
          {journey.overView && (
            <a href="#overview" className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-bold text-slate-600 hover:text-[#2E8B8B] hover:bg-teal-50 transition-colors shrink-0">
              About This Tour
            </a>
          )}
          {journey.days && journey.days.length > 0 && (
            <a href="#itinerary" className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-bold text-slate-600 hover:text-[#2E8B8B] hover:bg-teal-50 transition-colors shrink-0">
              Day-by-Day Itinerary ({journey.days.length} Days)
            </a>
          )}
          {((journey.inclusions?.length ?? 0) > 0 || (journey.exclusions?.length ?? 0) > 0) && (
            <a href="#inclusions" className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-bold text-slate-600 hover:text-[#2E8B8B] hover:bg-teal-50 transition-colors shrink-0">
              Inclusions &amp; Exclusions
            </a>
          )}
          {(journey.whyChooseUs?.length ?? 0) > 0 && (
            <a href="#why-us" className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-bold text-slate-600 hover:text-[#2E8B8B] hover:bg-teal-50 transition-colors shrink-0">
              Why Book With Us
            </a>
          )}
          {(journey.faqs?.length ?? 0) > 0 && (
            <a href="#faqs" className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-bold text-slate-600 hover:text-[#2E8B8B] hover:bg-teal-50 transition-colors shrink-0">
              FAQs
            </a>
          )}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-[9fr_5fr] gap-6 lg:gap-8">
        {/* ===== MAIN ===== */}
        <div className="space-y-8 md:space-y-12">
          {journey.highlights && journey.highlights.length > 0 && (
            <section id="highlights" className="scroll-mt-28">
              <span className="accent-label">Signature Highlights</span>
              <h2 className="h3 text-[22px] leading-[1.25] text-[#1C1C1C] mt-1 mb-4">Key Experiences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {journey.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-teal-100/90 shadow-[0_2px_10px_rgb(46,139,139,0.04)] hover:border-[#2E8B8B]/40 hover:shadow-md transition-all group"
                  >
                    <span className="w-7 h-7 rounded-xl bg-[#2E8B8B]/10 text-[#2E8B8B] group-hover:bg-[#2E8B8B] group-hover:text-white transition-colors flex items-center justify-center text-[12px] font-black shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[14.5px] font-semibold text-slate-800 leading-[1.5] group-hover:text-[#1C1C1C]">
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {journey.overView && (
            <section id="overview" className="scroll-mt-28">
              <span className="accent-label">Overview</span>
              <h2 className="h3 text-[22px] leading-[1.25] text-[#1C1C1C] mt-2 mb-4">About This Tour</h2>
              <div className="bg-white rounded-3xl p-6 md:p-9 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-[15.5px] text-slate-700 leading-[1.85]">
                <RichContent html={linkKeywords(journey.overView, paragraphLinkRules)} className="rich-text-plain-links" />
              </div>
            </section>
          )}

          {journey.days && journey.days.length > 0 && (
            <section id="itinerary" className="scroll-mt-28">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 md:mb-6">
                <div>
                  <span className="accent-label">Detailed Plan</span>
                  <h2 className="h3 text-[22px] leading-[1.25] text-[#1C1C1C] mt-1">Day By Day Itinerary</h2>
                </div>
                <button
                  type="button"
                  onClick={toggleAllDays}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <span>{isAllExpanded ? "Collapse All Days" : "Expand All Days"}</span>
                </button>
              </div>
              <div className="relative bg-white rounded-3xl p-2.5 md:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                <div className="day-accordion">
                  {journey.days.map((day, i) => (
                    <DayItem
                      key={day.id}
                      index={i + 1}
                      day={day}
                      defaultOpen={i === 0}
                      isAllExpanded={isAllExpanded}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {((journey.inclusions?.length ?? 0) > 0 || (journey.exclusions?.length ?? 0) > 0) && (
            <section id="inclusions" className="scroll-mt-28 space-y-4">
              <div>
                <span className="accent-label">Package Details</span>
                <h2 className="h3 text-[22px] leading-[1.25] text-[#1C1C1C] mt-1">What's Included &amp; Excluded</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(journey.inclusions?.length ?? 0) > 0 && (
                  <div className="bg-gradient-to-br from-emerald-50/60 to-teal-50/30 border border-emerald-200/70 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col">
                    <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-emerald-200/60">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <h3 className="font-heading text-[18px] font-bold text-emerald-950">What's Included</h3>
                        <p className="text-xs text-emerald-700 font-medium">All essential comforts covered</p>
                      </div>
                    </div>
                    <ul className="space-y-3.5 flex-1">
                      {(journey.inclusions ?? []).map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-[14.5px] font-semibold text-emerald-950 leading-relaxed">
                          <CheckCircle2 size={18} className="text-emerald-600 mt-[3px] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(journey.exclusions?.length ?? 0) > 0 && (
                  <div className="bg-gradient-to-br from-slate-50 to-red-50/30 border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col">
                    <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-200/70">
                      <div className="w-9 h-9 rounded-xl bg-slate-400 text-white flex items-center justify-center shrink-0">
                        <XCircle size={20} />
                      </div>
                      <div>
                        <h3 className="font-heading text-[18px] font-bold text-slate-800">What's Excluded</h3>
                        <p className="text-xs text-slate-500 font-medium">Transparent pricing — no hidden costs</p>
                      </div>
                    </div>
                    <ul className="space-y-3.5 flex-1">
                      {(journey.exclusions ?? []).map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-[14.5px] font-medium text-slate-700 leading-relaxed">
                          <XCircle size={18} className="text-rose-400 mt-[3px] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Customization reassurance banner */}
              <div className="rounded-2xl bg-teal-50/70 border border-teal-200/70 p-4 md:p-5 flex items-center gap-3 text-[13.5px] text-teal-900 font-medium">
                <Sparkles size={20} className="text-[#2E8B8B] shrink-0" />
                <span>
                  <strong>Want to include monument tickets, domestic flights, or lunch &amp; dinner?</strong> All inclusions can be fully customized according to your travel preferences.
                </span>
              </div>
            </section>
          )}

          {(journey.whyChooseUs?.length ?? 0) > 0 && (
            <section id="why-us" className="scroll-mt-28">
              <span className="accent-label">Our Commitment</span>
              <h2 className="h3 text-[22px] leading-[1.25] text-[#1C1C1C] mt-2 mb-4 md:mb-6">Why Book With KoiKoi Travel</h2>
              <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#F8FAFA] to-[#EBF3F3] p-6 md:p-10 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#2E8B8B]/10">
                <div className="absolute -top-8 -right-4 opacity-[0.05] pointer-events-none rotate-12">
                  <ShieldCheck className="w-56 h-56 md:w-64 md:h-64 text-[#2E8B8B]" />
                </div>
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2E8B8B]/10 blur-[80px] rounded-full pointer-events-none" />

                <ul className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  {(journey.whyChooseUs ?? []).map((item, i) => (
                    <li key={i} className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/90 border border-slate-200/60 shadow-2xs text-[14.5px] font-semibold text-slate-800 leading-[1.6]">
                      <div className="w-8 h-8 rounded-xl bg-[#2E8B8B]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#2E8B8B]">
                        <ShieldCheck size={18} />
                      </div>
                      <span>{item}</span>
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

          {(journey.bookingPolicyList?.length ?? 0) > 0 ? (
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
          ) : (
            <div className="rounded-3xl bg-gradient-to-br from-teal-50/50 to-slate-50 border border-teal-100/80 p-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#2E8B8B] mb-4 flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#2E8B8B]" />
                Why Book With Confidence
              </h4>
              <ul className="space-y-3 text-[13.5px] font-medium text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                  <span>100% Tailor-made with free itinerary consultation</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                  <span>Transparent quotes with no hidden fees</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                  <span>Dedicated 24/7 on-ground travel manager</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                  <span>Verified English-speaking guides &amp; licensed chauffeurs</span>
                </li>
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
      <div id="faqs" className="scroll-mt-28">
        <FaqSection faqs={journey.faqs} />
      </div>

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
  isAllExpanded,
}: {
  index: number;
  day: { id: number; day: string; description?: string; image?: string };
  defaultOpen?: boolean;
  isAllExpanded?: boolean;
}) {
  const dayTitle = sanitizeHtml(day.day.replace(/^Day\s*\d+\s*:\s*/i, "").trim());

  // Extract overnight stay if present in description (e.g. "Overnight stay: Agra")
  const overnightMatch = day.description?.match(/Overnight stay:\s*([^<\n]+)/i);
  const overnightStay = overnightMatch ? stripHtml(overnightMatch[1]).trim() : null;

  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const details = e.currentTarget;
    if (!details.open) return;
    if (isAllExpanded) return; // In Expand All mode, don't auto-close other days

    const container = details.closest(".day-accordion");
    if (!container) return;

    // Only one day stays open in normal mode. Closing the previously open day removes height from
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
      className="day-accordion-item group relative pl-0 py-1 md:py-2 first:pt-0 last:pb-0 border-b border-slate-100 last:border-b-0 rounded-2xl transition-colors duration-200"
    >
      <summary className="flex items-center justify-between gap-3 py-3 md:py-3.5 px-2 md:px-3 rounded-2xl hover:bg-slate-50/80 group-open:bg-teal-50/20 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none transition-colors">
        {/* Vertical Timeline Line */}
        <span
          aria-hidden="true"
          className="hidden md:block absolute left-[26px] top-0 -bottom-px w-[2px] bg-[#2E8B8B]/20 z-0 pointer-events-none"
        />
        <span className="flex items-center gap-3 font-heading text-[16px] md:text-[17px] font-bold text-[#1C1C1C] rich-text-plain-links relative z-10">
          {/* Timeline Dot with 2-digit Day */}
          <span className="hidden md:flex w-8 h-8 rounded-xl bg-white border-2 border-[#2E8B8B] group-open:bg-[#2E8B8B] group-open:text-white items-center justify-center shadow-xs z-10 transition-colors duration-300 shrink-0 text-[#2E8B8B]">
            <span className="text-[11px] font-black">{String(index).padStart(2, "0")}</span>
          </span>
          <span className="inline-block px-2 py-0.5 rounded-md bg-[#F8904D]/10 text-[#F8904D] text-xs font-extrabold uppercase shrink-0">
            Day {index}
          </span>
          <span dangerouslySetInnerHTML={{ __html: dayTitle }} />
        </span>
        <div className="flex items-center gap-2 shrink-0">
          {overnightStay && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
              <Moon size={11} className="text-indigo-500" />
              {overnightStay}
            </span>
          )}
          <ChevronDown
            size={18}
            className="text-[#2E8B8B] transition-transform duration-300 group-open:rotate-180"
          />
        </div>
      </summary>

      <div className="day-accordion-content">
        {/* Single child so grid-template-rows 0fr -> 1fr can collapse/expand the
            whole block smoothly. Padding lives here, not on the outer wrapper, so
            nothing shows through while the row is at 0fr. */}
        <div className="day-accordion-inner pt-2 md:pt-3 pb-5 px-3 md:pl-[56px] md:pr-4">
          {day.description && (
            <div className="text-[15px] text-slate-700 leading-[1.85]">
              <RichContent html={day.description} className="rich-text-plain-links" />
            </div>
          )}
          {day.image && (
            <div className="relative mt-4 w-full h-[220px] md:h-[320px] rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <FallbackImage
                src={day.image}
                alt={day.day.replace(/^Day\s*\d+\s*:\s*/i, "")}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover hover:scale-[1.02] transition-transform duration-500"
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
