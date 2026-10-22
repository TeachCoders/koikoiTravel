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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* SSR Structured Data */}
      <JsonLd data={breadcrumbs} />
      <JsonLd data={gallerySchema} />

      {/* ── Hero Banner Section (Centered layout matching Tour Packages) ── */}
      <section className="relative bg-slate-900 py-12 md:py-16 overflow-hidden">
        {/* Background Image with Fallback */}
        <div className="absolute inset-0">
          <FallbackImage
            src={heroImage}
            alt="KoiKoi Travel Guest Gallery"
            fill
            priority
            className="object-cover object-center scale-105 opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/80 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 text-center flex flex-col items-center">
          <span className="font-luxury font-black inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest text-[#F8904D] mb-3">
            <Camera size={14} /> Authentic Travel Memories
          </span>
          <h1 className="font-luxury text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-wide drop-shadow-md">
            {displayTitle}
          </h1>
          <p className="mt-3 text-white/85 text-sm sm:text-base max-w-2xl leading-relaxed">
            Real holiday memories and travel moments shared by our guests across India.
          </p>

          <div className="mt-6">
            <QuoteModal>
              <button
                type="button"
                className="btn-primary px-7 py-3 text-sm font-semibold tracking-wide flex items-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
              >
                <Compass size={15} />
                <span>Plan Your Journey</span>
              </button>
            </QuoteModal>
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB (BELOW HERO - Consistent with Tour Packages & Destinations) ── */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-100 bg-slate-50/60">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-3 flex items-center gap-1.5 text-xs sm:text-[13px] text-slate-500 font-medium">
          <Link href="/" className="hover:text-[#F8904D] transition-colors">
            Home
          </Link>
          <ChevronRight size={13} className="text-slate-300 shrink-0" />
          <span className="text-slate-900 font-semibold">Guest Gallery</span>
        </div>
      </nav>

      {/* ── SEO & CMS EDITORIAL CONTENT (Pure white section matching Tour Packages) ── */}
      {(cmsPage?.moreDescription || cmsPage?.seoDescription) && (
        <section className="bg-white border-b border-slate-100 py-8 sm:py-10 md:py-12">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
            <div className="text-center max-w-4xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F8904D]">
                <Camera size={13} /> Why Travellers Trust KoiKoi Travel
              </span>
              <h2 className="font-heading text-xl sm:text-2xl md:text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
                Simple, Honest Memories from <span className="text-[#F8904D]">Our Travellers</span>
              </h2>
              <div
                className="mt-6 w-full space-y-4 text-sm sm:text-[15px] leading-relaxed text-slate-600 font-normal prose prose-slate max-w-none text-left sm:text-justify [&>p]:leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: cmsPage?.moreDescription || cmsPage?.seoDescription || "",
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── MAIN GALLERY GRID (Clean grid layout) ── */}
      <div id="gallery-grid" className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-8 sm:py-12">
        <GuestGalleryClient initialItems={galleryItems} />
      </div>
    </div>
  );
}
