import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Camera, Sparkles, Compass, ShieldCheck, Heart, MapPin } from "lucide-react";
import JsonLd from "@/components/shared/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { fetchBySlugCached, fetchPublicJsonCached } from "@/feature/destinations/api/public-server";
import { fetchHeroBannersServer } from "@/feature/heroBanner/api/server";
import GuestGalleryClient from "@/feature/guestGallery/components/GuestGalleryClient";
import type { PaginatedGuestGallery } from "@/feature/guestGallery/type";
import type { CmsPage } from "@/feature/cms/type";
import { truncateMeta, absoluteUrl } from "@/lib/utils";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { QuoteModal } from "@/components/shared/QuoteModal";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://koikoitravel.com";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await fetchBySlugCached<CmsPage>("/cms/by-slug", "guest-gallery");
  const galleryResponse = await fetchPublicJsonCached<PaginatedGuestGallery>(
    "/guest-gallery?limit=10&isActive=true"
  );
  const firstPhoto = galleryResponse?.data?.[0]?.imageUrl;

  const title = (cmsPage?.seoTitle || "").toLowerCase().includes("koikoi")
    ? cmsPage!.seoTitle!
    : "Guest Photo Gallery | Real Traveler Moments | KoiKoi Travel";
  const description =
    truncateMeta(cmsPage?.seoDescription || cmsPage?.moreDescription || "") ||
    "Explore authentic, unscripted travel moments captured by our happy travelers during their custom private journeys across India with KoiKoi Travel.";
  const canonical = cmsPage?.canonical || `${SITE_URL}/guest-gallery`;
  const ogImage = firstPhoto ? absoluteUrl(firstPhoto) : `${SITE_URL}/og-image.png`;

  return {
    title: { absolute: title },
    description,
    keywords: cmsPage?.seoKeyword || "guest photo gallery, traveler reviews, India tour moments, real tourist photos India, KoiKoi Travel reviews",
    alternates: { canonical: "/guest-gallery" },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/guest-gallery`,
      type: "website",
      images: ogImage ? [{ url: ogImage, alt: "KoiKoi Travel Guest Gallery" }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function GuestGalleryPage() {
  // Fetch CMS page content
  const cmsPage = await fetchBySlugCached<CmsPage>("/cms/by-slug", "guest-gallery");

  // Fetch uploaded guest gallery photos (SSR)
  const galleryResponse = await fetchPublicJsonCached<PaginatedGuestGallery>(
    "/guest-gallery?limit=100&isActive=true"
  );
  const galleryItems = galleryResponse?.data || [];

  // Fetch hero banner or fallback
  const heroBanners = await fetchHeroBannersServer("Home");
  const heroImage =
    heroBanners[0]?.image ||
    galleryItems[0]?.imageUrl ||
    "/content/taj-mahal-holiday-1.webp";

  const rawDisplay = (cmsPage?.h1Title || cmsPage?.title || "").trim();
  const displayTitle =
    rawDisplay.toLowerCase() === "guest-gallery" ? "Guest Photo Gallery" : rawDisplay || "Guest Photo Gallery";

  // Structured Data (Breadcrumbs + ImageGallery Schema for SEO)
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Guest Gallery", path: "/guest-gallery" },
  ]);

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Guest Photo Gallery | KoiKoi Travel",
    description: "Authentic, unscripted travel photographs shared by real guests traveling across India with KoiKoi Travel.",
    url: `${SITE_URL}/guest-gallery`,
    image: galleryItems.map((item, idx) => ({
      "@type": "ImageObject",
      contentUrl: item.imageUrl.startsWith("http") ? item.imageUrl : `${SITE_URL}${item.imageUrl}`,
      caption: item.caption || item.location || `KoiKoi Travel Guest Photo ${idx + 1}`,
      name: item.caption || item.location || `Guest Travel Moment ${idx + 1}`,
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 font-sans text-slate-800 pb-20">
      {/* SSR Structured Data */}
      <JsonLd data={breadcrumbs} />
      <JsonLd data={gallerySchema} />

      {/* ── Luxury Hero Banner Section with Backdrop ── */}
      <section className="relative overflow-hidden bg-slate-900 text-white min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center">
        {/* Background Image with Fallback */}
        <div className="absolute inset-0">
          <FallbackImage
            src={heroImage}
            alt="KoiKoi Travel Guest Gallery"
            fill
            priority
            className="object-cover object-center scale-105"
          />
          {/* Multi-layered cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#2E8B8B]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[#F8904D]/15 blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20 md:py-24 w-full">
          {/* Breadcrumb nav */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-300/80 mb-5">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#FFD9A8] font-semibold">Guest Gallery</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFD9A8] text-xs font-bold tracking-wide uppercase shadow-sm">
              <Camera size={13} className="text-[#F8904D]" />
              <span>100% Real Guest Moments</span>
            </div>

            {/* H1 Title */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
              {displayTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-200/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal drop-shadow-sm">
              Real holiday memories, candid smiles, and scenic road trips shared by our happy travelers across India. Nothing is stock. Nothing is staged.
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <QuoteModal>
                <button
                  type="button"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#F8904D] to-[#e07b3b] hover:from-[#e07b3b] hover:to-[#c8692d] text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-950/40 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Compass size={16} />
                  <span>Plan Your Journey</span>
                </button>
              </QuoteModal>

              <a
                href="#gallery-grid"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-xs sm:text-sm transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <span>Browse {galleryItems.length} Photos</span>
              </a>
            </div>

            {/* Trust Highlights Bar */}
            <div className="pt-6 flex flex-wrap gap-2.5 sm:gap-3 text-xs text-slate-200/90">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/30 backdrop-blur-xs border border-white/10">
                <ShieldCheck size={14} className="text-emerald-400" /> Verified Travelers
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/30 backdrop-blur-xs border border-white/10">
                <Heart size={14} className="text-rose-400" /> Unscripted Vacations
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/30 backdrop-blur-xs border border-white/10">
                <MapPin size={14} className="text-amber-400" /> Across Incredible India
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Area ── */}
      <div id="gallery-grid" className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-10 sm:py-14 space-y-10">
        {/* Client Gallery Grid & Lightbox */}
        <GuestGalleryClient initialItems={galleryItems} />
      </div>
    </div>
  );
}
