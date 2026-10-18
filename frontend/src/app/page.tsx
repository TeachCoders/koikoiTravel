import React, { Suspense } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

import HomeSections from "@/feature/home/components/HomeSections";
import HomeSectionsFallback from "@/feature/home/components/HomeSectionsFallback";
import JsonLd from "@/components/shared/JsonLd";
import { organizationSchema, websiteSchema, faqSchema } from "@/lib/jsonLd";
import { HOME_FAQS } from "@/lib/homeFaqs";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  metadataBase: new URL("https://koikoitravel.com"),
  title: "India Tour Operator & Tailor-Made Tours | KoiKoi Travel",
  description:
    "Discover India with KoiKoi Travel, a customize tour operator offering tailor-made India tours and private holidays across Rajasthan, Kerala, South India and beyond.",
  keywords: [
    "India tour operator",
    "Tailor-made India tours",
    "Customize tour operator India",
    "Tailor-made India holidays",
    "Customized India tours",
    "Private India tours",
    "India travel company",
    "India destination management company",
    "Kerala tailor-made tours",
    "South India tour packages",
    "Rajasthan tailor-made tours",
    "Golden Triangle private tours",
    "Kashmir and Ladakh tours",
    "KoiKoi Travel",
  ],
  alternates: { canonical: "https://koikoitravel.com" },
  verification: { google: "El1jKO1piAq20XL3gueQKlsrPhBvrZFOUF-Jg6addow" },
  openGraph: {
    title: "India Tour Operator & Tailor-Made Tours | KoiKoi Travel",
    description:
      "Discover India with KoiKoi Travel, a customize tour operator offering tailor-made India tours and private holidays across Rajasthan, Kerala, South India and beyond.",
    url: "https://koikoitravel.com",
    siteName: "KoiKoi Travel",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "KoiKoi Travel - Customize Tour Operator & Tailor-Made India Tours" }],
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
  },
};

export default async function Home() {
  const homeFaqJsonLd = faqSchema(HOME_FAQS);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 font-sans">
      <JsonLd data={[organizationSchema, websiteSchema, homeFaqJsonLd]} />
      <Header />
      <main className="flex-1">
        <HomeSections />
      </main>
      <Footer />
    </div>
  );
}
