import React, { Suspense } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

import HomeSections from "@/feature/home/components/HomeSections";
import HomeSectionsFallback from "@/feature/home/components/HomeSectionsFallback";
import JsonLd from "@/components/shared/JsonLd";
import { faqSchema } from "@/lib/jsonLd";
import { HOME_FAQS } from "@/lib/homeFaqs";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL("https://koikoitravel.com"),
  title: "Koikoi travel | Premier India Inbound Tour Operator & Local DMC",
  description:
    "Leading India inbound tour operator offering bespoke luxury tours, private cab rentals, and custom holiday packages across India.",
  alternates: { canonical: "https://koikoitravel.com" },
  verification: { google: "El1jKO1piAq20XL3gueQKlsrPhBvrZFOUF-Jg6addow" },
  openGraph: {
    title: "Koikoi travel | Premier India Inbound Tour Operator & Local DMC",
    description:
      "Bespoke India holiday packages, private luxury transport, and local tour guides for international tourists.",
    url: "https://koikoitravel.com",
    siteName: "Koikoi travel India",
    locale: "en_US", // International inbound clients target karne ke liye en_US optimal hai
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Koikoi travel" }],
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
  },
};;

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 font-sans">
      <JsonLd data={faqSchema(HOME_FAQS)} />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<HomeSectionsFallback />}>
          <HomeSections />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
