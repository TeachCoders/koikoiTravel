import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Camera, Compass } from "lucide-react";
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
    : "Guest Photo Gallery | KoiKoi Travel";
  const description =
    truncateMeta(cmsPage?.seoDescription || cmsPage?.moreDescription || "") ||
    "Explore real travel photos shared by travelers during their journeys across India with KoiKoi Travel.";
  const canonical = cmsPage?.canonical || `${SITE_URL}/guest-gallery`;
  const ogImage = firstPhoto ? absoluteUrl(firstPhoto) : `${SITE_URL}/og-image.png`;

  return {
    title: { absolute: title },
    description,
    keywords: cmsPage?.seoKeyword || "guest photo gallery, traveler photos India, KoiKoi Travel reviews",
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
  // Fetch CMS page content created/managed in CMS (/dashboard/cms-page)
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
    rawDisplay.toLowerCase() === "guest-gallery" ? "Guest Gallery" : rawDisplay || "Guest Gallery";

  // Structured Data (Breadcrumbs + ImageGallery Schema for SEO)
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Guest Gallery", path: "/guest-gallery" },
  ]);

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Guest Photo Gallery | KoiKoi Travel",
    description: "Authentic travel photographs shared by real guests traveling across India with KoiKoi Travel.",
    url: `${SITE_URL}/guest-gallery`,
    image: galleryItems.map((item, idx) => ({
      "@type": "ImageObject",
      contentUrl: item.imageUrl.startsWith("http") ? item.imageUrl : `${SITE_URL}${item.imageUrl}`,
      caption: item.caption || item.location || `KoiKoi Travel Guest Photo ${idx + 1}`,
      name: item.caption || item.location || `Guest Travel Moment ${idx + 1}`,
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      {/* SSR Structured Data */}
      <JsonLd data={breadcrumbs} />
      <JsonLd data={gallerySchema} />

      {/* ── Hero Banner Section with Backdrop ── */}
      <section className="relative overflow-hidden bg-slate-900 text-white min-h-[320px] sm:min-h-[380px] flex items-center">
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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-16 md:py-20 w-full">
          {/* Breadcrumb nav */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-300/80 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#FFD9A8] font-semibold">Guest Gallery</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            {/* H1 Title */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
              {displayTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-200/90 text-sm sm:text-base leading-relaxed max-w-2xl font-normal drop-shadow-sm">
              Real holiday memories and travel moments shared by our guests across India.
            </p>

            {/* Quick Action Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <QuoteModal>
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Compass size={15} />
                  <span>Plan Your Journey</span>
                </button>
              </QuoteModal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Area ── */}
      <div id="gallery-grid" className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-8 sm:py-12 space-y-8">
        {/* Client Gallery Grid & Lightbox (uses CMS page content from dashboard) */}
        <GuestGalleryClient
          initialItems={galleryItems}
          cmsTitle={rawDisplay && rawDisplay.toLowerCase() !== "guest-gallery" ? rawDisplay : undefined}
          cmsDescription={cmsPage?.moreDescription || cmsPage?.seoDescription}
        />
      </div>
    </div>
  );
}
