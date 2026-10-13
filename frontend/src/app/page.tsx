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
  title: "Best Travel Agency in India | Custom Tour Packages - KoiKoi Travel",
  description:
    "KoiKoi Travel is the best travel agency in India for custom holiday packages, luxury stays, private verified chauffeur cabs, and 24/7 on-ground assistance.",
  keywords: [
    "Best Travel Agency in India",
    "Tour Operator in India",
    "Custom India Tour Packages",
    "Private Chauffeur Tour India",
    "Rajasthan Tour Packages",
    "Golden Triangle Tour India",
    "Kerala Holiday Packages",
    "Inbound Travel Agency India",
    "KoiKoi Travel",
  ],
  alternates: { canonical: "https://koikoitravel.com" },
  verification: { google: "El1jKO1piAq20XL3gueQKlsrPhBvrZFOUF-Jg6addow" },
  openGraph: {
    title: "Best Travel Agency in India | Custom Tour Packages - KoiKoi Travel",
    description:
      "KoiKoi Travel is the best travel agency in India. Plan your tailor-made holiday, Rajasthan tours, Kerala backwaters, Kashmir & Golden Triangle trips.",
    url: "https://koikoitravel.com",
    siteName: "KoiKoi Travel India",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "KoiKoi Travel - Best Travel Agency in India" }],
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
