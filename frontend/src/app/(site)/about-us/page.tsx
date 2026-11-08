import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/shared/JsonLd";
import { breadcrumbSchema, webPageSchema, graphSchema } from "@/lib/jsonLd";
import { fetchBySlugCached } from "@/feature/destinations/api/public-server";
import RichContent from "@/components/shared/RichContent";
import { autoLinkKeywords } from "@/lib/autoInternalLink";
import type { CmsPage } from "@/feature/cms/type";
import { truncateMeta } from "@/lib/utils";
import { ABOUT_US_CONTENT_HTML } from "@/feature/cms/aboutUsContent";
import { WhyChooseUsSection } from "@/components/shared/WhyChooseUsSection";
import { HowItWorksSection } from "@/feature/home/components/HowItWorksSection";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await fetchBySlugCached<CmsPage>("/cms/by-slug", "about-us", 60);

  const title = cmsPage?.seoTitle || "About Us | KoiKoi Travel - Private Luxury & Small Group Tours";
  const description =
    truncateMeta(cmsPage?.seoDescription || cmsPage?.moreDescription || "") ||
    "KoiKoi Travel is a small, India-based tour operator crafting private luxury journeys and small-group tours across India. Plan every trip as if it were our own.";
  const canonical = cmsPage?.canonical || "/about-us";

  return {
    title,
    description,
    keywords:
      cmsPage?.seoKeyword ||
      "about koikoi travel, private india tours, india inbound tour operator, delhi travel agency, custom india tour",
    alternates: { canonical },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About KoiKoi Travel" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function AboutUsPage() {
  const cmsPage = await fetchBySlugCached<CmsPage>("/cms/by-slug", "about-us", 60);

  const displayTitle = cmsPage?.h1Title || cmsPage?.title || "About KoiKoi Travel";

  // Directly use whatever is in cmsPage.moreDescription from CMS!
  // If empty, fall back to ABOUT_US_CONTENT_HTML.
  const contentHtml = cmsPage?.moreDescription || ABOUT_US_CONTENT_HTML;

  return (
    <div>
      {/* Schema.org AboutPage Structured Data */}
      <JsonLd
        data={graphSchema([
          webPageSchema(
            {
              name: displayTitle,
              url: "/about-us",
              description: cmsPage?.seoDescription || "About KoiKoi Travel, private tour operator in India.",
            },
            "AboutPage"
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about-us" },
          ]),
        ])}
      />

      {/* ===== HERO / HEADER ===== */}
      <section className="relative bg-[#2E8B8B] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-16 right-0 w-72 h-72 rounded-full bg-[#F8904D]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[1600px] py-12 md:py-16 mx-auto px-6 sm:px-8 lg:px-10 h-full flex flex-col justify-center">
          {/* Main Title (H1) */}
          <h1 className="font-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-wide drop-shadow-lg mb-3 max-w-4xl">
            {displayTitle}
          </h1>

          {/* Breadcrumbs below Title */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-white/70 text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-white/40" />
            <span className="text-white/95 font-medium">About Us</span>
          </nav>
        </div>
      </section>

      {/* ===== FULL VIEW CONTENT (NO BORDER, EXACTLY LIKE BEFORE) ===== */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-12 md:py-16 space-y-10">
        <div className="prose prose-lg max-w-none text-slate-800">
          <RichContent html={autoLinkKeywords(contentHtml)} />
        </div>
      </section>

      {/* ===== 1. WHY BOOK YOUR INDIA TRIP WITH KOIKOI TRAVEL ===== */}
      <WhyChooseUsSection />

      {/* ===== 2. HOW IT WORKS (3-STEP TAILOR-MADE BOOKING PROCESS) ===== */}
      <HowItWorksSection />
    </div>
  );
}
