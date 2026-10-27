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
  MapPin,
  Lock,
  Headphones,
  UserCheck,
  Users,
  Tag,
} from "lucide-react";
import { useEffect, useState, Fragment, useMemo } from "react";
import dynamic from "next/dynamic";
import { useJourneyBySlug } from "@/feature/journey/api/useJourney";
import type { Journey } from "@/feature/journey/type";
import { groupMonthsBySeason } from "@/components/shared/seasonUtils";
import PageLoader from "@/components/shared/PageLoader";
import { getJourneyBreadcrumbState } from "@/lib/breadcrumbHelper";
import TourBookingForm from "@/feature/leads/components/TourBookingForm";
import { travelExperienceIcon } from "@/components/shared/TravelExperiencePills";
import RichContent, { sanitizeHtml } from "@/components/shared/RichContent";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { linkKeywords, buildExperienceLinkRules, type AutoLinkRule } from "@/lib/autoInternalLink";
import { cn, stripHtml } from "@/lib/utils";
import FaqSection from "@/feature/home/components/FaqSection";
import TravelGuideCollapsible from "@/components/shared/TravelGuideCollapsible";

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
          term: c.h1Title || c.title,
          href:
            c.slug === c.state?.slug
              ? `/tour-packages/${c.state!.country!.slug}/${c.state!.slug}`
              : `/tour-packages/${c.state!.country!.slug}/${c.state!.slug}/${c.slug}`,
        })),
    [journey]
  );

  const paragraphLinkRules = useMemo<AutoLinkRule[]>(
    () => [...buildExperienceLinkRules(), ...cityLinkRules],
    [cityLinkRules]
  );

  // Single shared set of linked hrefs across the entire tour package page
  // Ensures maximum 1 link per destination across Overview, all Itinerary Days, Trip Guide, and FAQs
  const { linkedOverview, linkedDays, linkedMoreDesc, pageLinkedHrefs, excludeHrefs } = useMemo(() => {
    const pageLinked = new Set<string>();
    const exclude = [
      `/tour-packages/${slug}`,
      `/tour-packages/${journey?.slug || ""}`,
      slug,
    ];

    const overview = journey?.overView
      ? linkKeywords(journey.overView, paragraphLinkRules, {
          sharedLinkedHrefs: pageLinked,
          excludeHrefs: exclude,
        })
      : "";

    const days = (journey?.days || []).map((day) => {
      const desc = day.seoDescription || (day as any).description || "";
      return {
        ...day,
        linkedDescription: desc
          ? linkKeywords(desc, paragraphLinkRules, {
              sharedLinkedHrefs: pageLinked,
              excludeHrefs: exclude,
            })
          : "",
      };
    });

    const moreDesc = journey?.moreDescription
      ? linkKeywords(journey.moreDescription, paragraphLinkRules, {
          sharedLinkedHrefs: pageLinked,
          excludeHrefs: exclude,
        })
      : "";

    return {
      linkedOverview: overview,
      linkedDays: days,
      linkedMoreDesc: moreDesc,
      pageLinkedHrefs: pageLinked,
      excludeHrefs: exclude,
    };
  }, [journey, paragraphLinkRules, slug]);

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

  const bcState = getJourneyBreadcrumbState(journey);
  const countrySlug = bcState.countrySlug;
  const countryTitle = bcState.countryTitle;
  const stateSlug = bcState.stateSlug;
  const stateTitle = bcState.stateTitle;

  const heroImages = journey.banner?.images?.length
    ? journey.banner.images
    : journey.thumbImg
      ? [journey.thumbImg]
      : [];

  const lightboxSlides = heroImages.map((src) => ({ src, alt: journey.title }));

  const pageH1 = journey.h1Title || journey.title;
  const cleanJourneyTitle = (journey.title || "").split("|")[0].trim();
  const durationText =
    journey.duration ||
    (journey.noDays > 0
      ? journey.noDays === 1
        ? (/\bsame\s*day\b/i.test(cleanJourneyTitle) ? "Same Day" : "1 Day")
        : `${journey.noDays} Days`
      : "");
  const fullPageHeading = journey.h1Title
    ? journey.h1Title
    : durationText && !new RegExp(`\\b${durationText}\\b`, "i").test(cleanJourneyTitle)
      ? `${durationText} - ${cleanJourneyTitle}`
      : cleanJourneyTitle;
  const daysCount =
    typeof journey.noDays === "number" && journey.noDays > 0
      ? journey.noDays
      : parseInt((journey.duration || journey.title || journey.slug || "").match(/(\d+)\s*(?:day|days|d\b|-day)/i)?.[1] || "0", 10);
  const hasSpecialOffer = daysCount >= 8;

  const breadcrumbNavItems = [
    { label: "Home", href: "/" },
    { label: "Tour Packages", href: "/tour-packages" },
  ];

  if (countrySlug && countryTitle) {
    breadcrumbNavItems.push({
      label: countryTitle,
      href: `/tour-packages/${countrySlug}`,
    });
  }

  if (stateSlug && stateTitle && countrySlug) {
    breadcrumbNavItems.push({
      label: stateTitle,
      href: `/tour-packages/${countrySlug}/${stateSlug}`,
    });
  }

  // Extract accurate journey route:
  // 1. Explicit destination route label entered in dashboard (e.g. "Leh - Hemis Monastery - Nubra Valley - Pangong Tso - Leh")
  // 2. Explicit route/cities from journey
  // 3. Fallback: extract from day program titles
  const itineraryRoute = useMemo(() => {
    if (journey.destination && journey.destination.trim()) {
      const explicitParts = journey.destination
        .split(/[-–—→]/)
        .map((p) => p.trim())
        .filter(Boolean);
      if (explicitParts.length > 0) return explicitParts;
    }

    if (journey.route && journey.route.length > 0) {
      const routeCities = journey.route
        .map((c: any) => (c.h1Title || c.title || "").trim())
        .filter(Boolean);
      if (routeCities.length > 0) return routeCities;
    }

    const days = journey.days || [];
    if (!days.length) {
      return (journey.cities || []).map((c: any) => c.h1Title || c.title).filter(Boolean);
    }

    const candidateCities: string[] = [];
    const addCandidate = (cityStr?: string | null) => {
      if (!cityStr) return;
      const clean = cityStr.trim();
      if (clean && !candidateCities.some((c) => c.toLowerCase() === clean.toLowerCase())) {
        candidateCities.push(clean);
      }
    };

    (journey.cities || []).forEach((c) => addCandidate(c.h1Title || c.title));
    (journey.route || []).forEach((c) => addCandidate(c.h1Title || c.title));

    const routeFlow: string[] = [];
    days.forEach((d) => {
      const text = d.day || "";
      const foundInDay: { pos: number; city: string }[] = [];
      candidateCities.forEach((city) => {
        const escaped = city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`\\b${escaped}\\b`, "gi");
        let match: RegExpExecArray | null;
        while ((match = regex.exec(text)) !== null) {
          foundInDay.push({ pos: match.index, city });
        }
      });
      foundInDay.sort((a, b) => a.pos - b.pos);
      foundInDay.forEach(({ city }) => {
        if (!routeFlow.length || routeFlow[routeFlow.length - 1].toLowerCase() !== city.toLowerCase()) {
          routeFlow.push(city);
        }
      });
    });

    if (routeFlow.length > 0) return routeFlow;
    return candidateCities.slice(0, 6);
  }, [journey.days, journey.cities, journey.route, journey.destination]);

  return (
    <div className="pb-20 lg:pb-0 bg-[#f8f8f8] relative overflow-hidden">
      {/* Subtle India Travel Doodle Background */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23D4561A' stroke-width='0.8'%3E%3Crect x='0' y='0' width='200' height='200' fill='none'/%3E%3Cpath d='M90 60 L100 20 L110 60 M85 62 L80 75 L120 75 L115 62 M75 75 L75 90 L125 90 L125 75 M100 20 L100 14 M96 38 L100 25 L104 38 M80 90 L80 120 L120 120 L120 90 M85 120 L85 125 L115 125 L115 120 M100 90 L100 120'/%3E%3Ccircle cx='100' cy='72' r='4'/%3E%3Cpath d='M60 155 Q60 145 65 140 Q60 135 55 140 Q60 145 60 155 M52 160 L60 155 L68 160 M50 168 L52 160 L48 170 M68 160 L72 168 L64 170 M55 140 L48 135 M65 140 L72 135 M55 150 L52 155 M65 150 L68 155 M60 155 L60 168 M55 168 L65 168'/%3E%3Ccircle cx='60' cy='135' r='5'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3Ccircle cx='40' cy='40' r='5'/%3E%3Cpath d='M40 25 L40 15 M40 55 L40 65 M25 40 L15 40 M55 40 L65 40'/%3E%3Ccircle cx='160' cy='160' r='12'/%3E%3Ccircle cx='160' cy='160' r='7'/%3E%3Ccircle cx='160' cy='160' r='3'/%3E%3Cpath d='M160 148 L160 140 M160 172 L160 180 M148 160 L140 160 M172 160 L180 160'/%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* ===== BREADCRUMB ===== */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200/60 bg-white/60 backdrop-blur-xs relative z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-3 flex flex-wrap items-center gap-1.5 text-xs sm:text-[13px] text-slate-500 font-medium">
          {breadcrumbNavItems.map((item, idx) => (
            <Fragment key={idx}>
              {idx > 0 && <ChevronRight size={13} className="text-slate-300 shrink-0" />}
              <Link href={item.href} className="hover:text-[#F8904D] transition-colors shrink-0">
                {item.label}
              </Link>
            </Fragment>
          ))}
          <ChevronRight size={13} className="text-slate-300 shrink-0" />
          <span className="text-slate-900 font-semibold truncate max-w-[300px] md:max-w-none">
            {fullPageHeading}
          </span>
        </div>
      </nav>

      {/* ===== HERO + HEADING ===== */}
      <div className="relative border-b border-slate-200/60">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-5 md:py-8 relative z-10">

          {/* Header Info Block */}
          <div className="mb-6">

            {pageH1 && (
              <h1 className="font-heading text-xl sm:text-2xl md:text-[28px] font-bold tracking-tight text-slate-900 leading-[1.3]">
                {fullPageHeading}
              </h1>
            )}
          </div>

          {/* LEFT: BANNER | RIGHT: BOOKING CARD */}
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] lg:items-stretch items-start gap-8 lg:gap-10">
            <section className="h-full">
              {heroImages.length > 0 ? (
                <div className="flex flex-col h-full">
                  <div
                    className={cn(
                      "grid gap-2 md:gap-3 w-full h-[260px] md:h-[380px] lg:h-full",
                      heroImages.length === 1 ? "grid-cols-1 grid-rows-1" :
                        heroImages.length === 2 ? "grid-cols-1 grid-rows-2" :
                          "grid-cols-2 grid-rows-2" // 3 or 4+ images
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
                          priority
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
                          loading="eager"
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
                          loading="eager"
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
              <div className="rounded-3xl border border-slate-200/80 bg-white shadow-sm relative overflow-hidden flex flex-col justify-between p-6 sm:p-7 h-full">
                {/* Top: Header, Duration, Journey Route & Action Buttons */}
                <div className="space-y-4 relative z-10">
                  {/* Header: Title */}
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <span className="w-1.5 h-4.5 rounded-full bg-[#F8904D]" />
                    <h3 className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight">
                      Tour Snapshot
                    </h3>
                  </div>

                  {/* Duration & Simple Journey Route */}
                  <div className="space-y-2 text-xs sm:text-[13px]">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-bold uppercase text-[10.5px] tracking-wider w-16 shrink-0">Duration:</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {journey.duration ||
                          (journey.noDays > 0
                            ? journey.noDays === 1
                              ? (/\bsame\s*day\b/i.test(cleanJourneyTitle) ? "Same Day" : "1 Day")
                              : `${journey.noDays > 1 ? `${journey.noDays - 1} Nights / ` : ""}${journey.noDays} Days`
                            : "—")}
                      </span>
                    </div>

                    {itineraryRoute.length > 0 && (
                      <div className="flex items-start gap-2 pt-0.5">
                        <span className="text-slate-400 font-bold uppercase text-[10.5px] tracking-wider w-16 shrink-0 mt-0.5">Route:</span>
                        <div className="flex flex-wrap items-center gap-1 font-semibold text-slate-800 leading-relaxed">
                          {itineraryRoute.map((city, idx) => (
                            <Fragment key={idx}>
                              <span>{city}</span>
                              {idx < itineraryRoute.length - 1 && (
                                <span className="text-slate-300 font-normal px-0.5">→</span>
                              )}
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Experience Theme Tags */}
                    {journey.travelExperiences && journey.travelExperiences.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap pt-0.5">
                        <span className="text-slate-400 font-bold uppercase text-[10.5px] tracking-wider w-16 shrink-0">Theme:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {journey.travelExperiences.map((exp: any) => (
                            <Link
                              key={exp.id || exp.slug}
                              href={`/travel-experiences/${exp.slug}`}
                              className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F8904D]/10 text-[#F8904D] hover:bg-[#F8904D] hover:text-white transition-colors"
                            >
                              {exp.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2.5 w-full pt-1.5">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Hi KoiKoi Travel! I'm interested in "${journey.title}". Please share the best tailor-made quote and options.\n\nTour Page: ${pageUrl}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-[8px] bg-[#2E8B8B] hover:bg-[#247070] active:scale-95 text-white text-xs sm:text-sm font-bold shadow-sm transition-all text-center"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                      <span>WhatsApp Us</span>
                    </a>

                    <QuoteModal>
                      <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-[8px] bg-[#F8904D] hover:bg-[#d97536] active:scale-95 text-white text-xs sm:text-sm font-bold shadow-sm transition-all text-center cursor-pointer"
                      >
                        <CalendarDays size={15} className="shrink-0" />
                        <span>Request Quote</span>
                      </button>
                    </QuoteModal>
                  </div>

                  {/* Special Group Discounts Offer Tag Box - Only for 8+ Days Tours */}
                  {hasSpecialOffer && (
                    <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-orange-300/90 bg-gradient-to-r from-orange-50/90 via-amber-50/60 to-orange-50/40 p-3 shadow-xs">
                      {/* Shimmer Light Sweep Effect */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer-sweep pointer-events-none" />

                      <div className="relative z-10">
                        {/* Row 1: Tag Special Offer */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#F8904D] to-[#E96A1E] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
                            <Tag size={12} className="stroke-[2.6] animate-tag-wiggle" />
                            <span>Special Offer</span>
                          </span>
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F8904D] opacity-80" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F8904D]" />
                          </span>
                        </div>

                        {/* Row 2: Text below the tag */}
                        <p className="text-[12px] sm:text-[12.5px] text-slate-700 leading-relaxed font-normal">
                          Special discounts available for family group, student group, and corporate groups to India.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom: 100% Customizable Note followed by Verified Trust Badges */}
                <div className="pt-4 mt-4 border-t border-slate-100 space-y-3 relative z-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles size={15} className="text-[#2E8B8B] shrink-0" />
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        100% Tailor-Made &amp; Customizable
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed pl-6 font-normal">
                      This tour can be customized according to your travel needs, preferred pace, dates &amp; hotel category.
                    </p>
                  </div>

                  {/* Verified Trust Badges - Natural Pill Snapshot Style */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50/80 border border-slate-200/60 text-slate-800 text-xs font-semibold">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                      <span className="truncate">100% Free Planning</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50/80 border border-slate-200/60 text-slate-800 text-xs font-semibold">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                      <span className="truncate">Verified Chauffeurs</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50/80 border border-slate-200/60 text-slate-800 text-xs font-semibold">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                      <span className="truncate">Transparent Quotes</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50/80 border border-slate-200/60 text-slate-800 text-xs font-semibold">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                      <span className="truncate">24/7 Dedicated Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-[9fr_5fr] gap-6 lg:gap-8 items-start">
        {/* ===== MAIN ===== */}
        <div className="space-y-8 md:space-y-10 min-w-0">
          {journey.highlights && journey.highlights.length > 0 && (
            <section>
              <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#F8904D] mb-1.5">
                Highlights
              </span>
              <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-slate-900 tracking-tight mb-4">
                Key <span className="text-[#F8904D]">Experiences</span>
              </h2>
              <div className="bg-teal-50/50 rounded-2xl md:rounded-3xl p-5 md:p-6 border border-teal-100/80">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {journey.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm sm:text-[14.5px] font-normal text-slate-700 leading-relaxed">
                      <BadgeCheck size={18} className="shrink-0 mt-0.5 text-[#2E8B8B]" />
                      <span dangerouslySetInnerHTML={{ __html: h }} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {journey.overView && (
            <section>
              <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#F8904D] mb-1.5">
                Overview
              </span>
              <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-slate-900 tracking-tight mb-4">
                About <span className="text-[#F8904D]">This Tour</span>
              </h2>
              <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-slate-200/80 shadow-sm text-[15px] font-normal text-slate-600 leading-[1.8]">
                <RichContent html={linkedOverview} autoLink={false} className="rich-text-plain-links" />
              </div>
            </section>
          )}

          {journey.days && journey.days.length > 0 && (
            <section>
              <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#F8904D] mb-1.5">
                    Itinerary
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-slate-900 tracking-tight">
                    Day By Day <span className="text-[#F8904D]">Itinerary</span>
                  </h2>
                </div>
              </div>
              <div className="relative bg-white rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-sm border border-slate-200/80">
                <div className="day-accordion">
                  {linkedDays.map((day, i) => (
                    <DayItem
                      key={day.id}
                      index={i + 1}
                      day={day}
                      defaultOpen={i === 0}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {(journey.inclusions?.length ?? 0) > 0 || (journey.exclusions?.length ?? 0) > 0 ? (
            <section className="grid grid-cols-1 gap-6">
              {(journey.inclusions?.length ?? 0) > 0 && (
                <div className="bg-emerald-50/50 border border-emerald-200/70 rounded-2xl md:rounded-3xl p-5 md:p-7 shadow-xs">
                  <h2 className="font-heading text-lg sm:text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-emerald-600" /> What's Included
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {(journey.inclusions ?? []).map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm sm:text-[14.5px] font-normal text-slate-700 leading-relaxed">
                        <CheckCircle2 size={18} className="text-emerald-600 mt-[2px] shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(journey.exclusions?.length ?? 0) > 0 && (
                <div className="bg-red-50/50 border border-red-200/70 rounded-2xl md:rounded-3xl p-5 md:p-7 shadow-xs">
                  <h2 className="font-heading text-lg sm:text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                    <XCircle size={20} className="text-red-500" /> What's Excluded
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {(journey.exclusions ?? []).map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm sm:text-[14.5px] font-normal text-slate-700 leading-relaxed">
                        <XCircle size={18} className="text-red-400 mt-[2px] shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ) : null}

          {(journey.whyChooseUs?.length ?? 0) > 0 && (
            <section>
              <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#F8904D] mb-1.5">
                Why Choose Us
              </span>
              <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-slate-900 tracking-tight mb-4">
                Why Book With <span className="text-[#F8904D]">KoiKoi Travel</span>
              </h2>
              <div className="relative rounded-2xl md:rounded-3xl bg-gradient-to-br from-white via-[#F8FAFA] to-[#EBF3F3] p-6 md:p-8 overflow-hidden shadow-sm border border-[#2E8B8B]/15">
                {/* Background Watermark Icon */}
                <div className="absolute -top-8 -right-4 opacity-[0.04] pointer-events-none rotate-12">
                  <ShieldCheck className="w-56 h-56 md:w-64 md:h-64 text-[#2E8B8B]" />
                </div>
                {/* Subtle Glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2E8B8B]/10 blur-[80px] rounded-full pointer-events-none" />

                <ul className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {(journey.whyChooseUs ?? []).map((item, i) => (
                    <li key={i} className="flex items-start gap-3.5 text-sm sm:text-[14.5px] font-normal text-slate-700 leading-[1.6]">
                      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 border border-slate-200/80 shadow-xs">
                        <ShieldCheck size={16} className="text-[#2E8B8B]" />
                      </div>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        {/* ===== SIDEBAR (STICKY) ===== */}
        <aside className="space-y-6 lg:sticky lg:top-24 self-start w-full">
          <div className="rounded-3xl shadow-sm bg-white border border-slate-200/80 overflow-hidden">
            <TourBookingForm embedded />
          </div>

          {(journey.bookingPolicyList?.length ?? 0) > 0 ? (
            <div className="rounded-2xl md:rounded-3xl bg-slate-50/80 border border-slate-200/80 p-5 sm:p-6">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#2E8B8B] mb-4 flex items-center gap-2">
                <Sparkles size={15} className="text-[#F8904D]" />
                Booking Policy
              </h3>
              <ul className="space-y-3">
                {(journey.bookingPolicyList ?? []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-normal text-slate-600 leading-relaxed">
                    <BadgeCheck size={16} className="shrink-0 mt-[2px] text-[#2E8B8B]" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-2xl md:rounded-3xl bg-slate-50/80 border border-teal-200/60 p-4 sm:p-5">
              <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#2E8B8B] mb-3 flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#2E8B8B]" />
                Why Book With Confidence
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white border border-slate-200/70 text-slate-800 text-xs font-semibold">
                  <span className="w-6 h-6 rounded-lg bg-teal-50 text-[#2E8B8B] flex items-center justify-center shrink-0">
                    <Sparkles size={13} />
                  </span>
                  <span className="leading-snug truncate">100% Tailor-Made</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white border border-slate-200/70 text-slate-800 text-xs font-semibold">
                  <span className="w-6 h-6 rounded-lg bg-teal-50 text-[#2E8B8B] flex items-center justify-center shrink-0">
                    <BadgeCheck size={13} />
                  </span>
                  <span className="leading-snug truncate">Transparent Quotes</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white border border-slate-200/70 text-slate-800 text-xs font-semibold">
                  <span className="w-6 h-6 rounded-lg bg-teal-50 text-[#2E8B8B] flex items-center justify-center shrink-0">
                    <Headphones size={13} />
                  </span>
                  <span className="leading-snug truncate">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white border border-slate-200/70 text-slate-800 text-xs font-semibold">
                  <span className="w-6 h-6 rounded-lg bg-teal-50 text-[#2E8B8B] flex items-center justify-center shrink-0">
                    <UserCheck size={13} />
                  </span>
                  <span className="leading-snug truncate">Verified Chauffeurs</span>
                </div>
              </div>
            </div>
          )}

          {stateSlug && stateTitle && (
            <div className="rounded-2xl md:rounded-3xl bg-slate-900 text-white p-5 sm:p-6 text-center shadow-sm">
              <Star size={18} className="mx-auto text-[#F5B041] mb-2" />
              <p className="text-xs sm:text-sm text-slate-200">
                Discover more tours from <span className="font-bold text-white">{stateTitle}</span>
              </p>
              <Link
                href={`/tour-packages/${countrySlug}/${stateSlug}`}
                className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-white text-slate-900 text-xs sm:text-sm font-bold hover:bg-[#F8904D] hover:text-white transition-all shadow-xs"
              >
                View All Tours <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </aside>
      </div>

      {/* ===== FAQ SECTION (Placed Before Trip Guide) ===== */}
      <FaqSection
        faqs={journey.faqs}
        sharedLinkedHrefs={pageLinkedHrefs}
        excludeHrefs={excludeHrefs}
      />

      {/* ===== TRIP GUIDE (MORE DESCRIPTION) ===== */}
      {journey.moreDescription && (
        <section id="more" className="bg-slate-50/80 border-t border-slate-200/80 py-10 md:py-14">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
            <TravelGuideCollapsible
              title={`Essential Trip Guide: ${journey.title}`}
              subtitle="Detailed day-by-day insights, local tips, what to pack, and cultural etiquette for this journey."
              badge="Trip Guide & Travel Tips"
            >
              <RichContent
                html={linkedMoreDesc}
                autoLink={false}
                className="rich-text-plain-links text-[15px] sm:text-base text-slate-600 leading-[1.8]"
              />
            </TravelGuideCollapsible>
          </div>
        </section>
      )}

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
  day: { id: number; day: string; description?: string; seoDescription?: string; linkedDescription?: string; image?: string };
  defaultOpen?: boolean;
}) {
  const dayTitle = stripHtml(day.day.replace(/^Day\s*\d+\s*:\s*/i, "").trim());

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
      className="day-accordion-item group relative py-1 md:py-2 border-b border-slate-100 last:border-b-0"
    >
      <summary className="flex items-center justify-between gap-3 py-2.5 md:py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
        <span className="flex items-center gap-2 text-[15.5px] sm:text-[16.5px] font-semibold text-slate-900">
          <span className="text-[#F8904D] font-bold shrink-0">Day {index}:</span>
          <span className="text-slate-900 font-semibold">{dayTitle}</span>
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 text-slate-400 group-hover:text-slate-700 transition-transform duration-300 group-open:rotate-180"
        />
      </summary>

      <div className="day-accordion-content">
        {/* Single child so grid-template-rows 0fr -> 1fr can collapse/expand the
            whole block smoothly. Padding lives here, not on the outer wrapper, so
            nothing shows through while the row is at 0fr. */}
        <div className="day-accordion-inner pt-1 md:pt-2 pb-4">
          {(day.linkedDescription || day.seoDescription || day.description) && (
            <div className="text-[14.5px] sm:text-[15px] text-slate-600 font-normal leading-[1.75]">
              <RichContent
                html={day.linkedDescription || day.seoDescription || day.description || ""}
                autoLink={false}
                className="rich-text-plain-links"
              />
            </div>
          )}
          {day.image && (
            <div className="relative mt-4 w-full h-[200px] md:h-[280px] rounded-2xl overflow-hidden shadow-sm">
              <FallbackImage
                src={day.image}
                alt={day.day.replace(/^Day\s*\d+\s*:\s*/i, "")}
                fill
                loading={defaultOpen ? "eager" : "lazy"}
                sizes="(max-width: 1024px) 100vw, 60vw"
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
