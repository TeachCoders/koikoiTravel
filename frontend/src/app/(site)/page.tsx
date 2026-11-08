import React from "react";
import HomeSections from "@/feature/home/components/HomeSections";
import JsonLd from "@/components/shared/JsonLd";
import { organizationSchema, websiteSchema, faqSchema } from "@/lib/jsonLd";
import { HOME_FAQS } from "@/lib/homeFaqs";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  metadataBase: new URL("https://koikoitravel.com"),
  title: {
    absolute: "Private Customized & Group Travel India | KoiKoi Travel",
  },
  description:
    "Private luxury India tours and small-group journeys, planned by a small travel team. Rajasthan, Golden Triangle, Kerala & South India. Get a free quote",
  keywords: [
    "Private Customized & Group Travel India",
    "India tour packages",
    "India tour operator",
    "Tailor-made India tours",
    "Customize tour operator India",
    "Tailor-made India holidays",
    "Customized India tours",
    "Private India tours",
    "Golden Triangle tour packages",
    "Rajasthan tour packages",
    "Kerala tour packages",
    "South India tour packages",
    "India travel company",
    "KoiKoi Travel",
  ],
  alternates: { canonical: "https://koikoitravel.com" },
  verification: { google: "El1jKO1piAq20XL3gueQKlsrPhBvrZFOUF-Jg6addow" },
  openGraph: {
    title: {
    absolute: "Private Customized & Group Travel India | KoiKoi Travel",
  },
    description:
      "Private luxury India tours and small-group journeys, planned by a small travel team. Rajasthan, Golden Triangle, Kerala & South India. Get a free quote",
    url: "https://koikoitravel.com",
    siteName: "KoiKoi Travel",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "KoiKoi Travel - Tailor-Made India Tour Packages" }],
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
  },
};

export default async function Home() {
  const homeFaqJsonLd = faqSchema(HOME_FAQS);

  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema, homeFaqJsonLd]} />
      <HomeSections />
    </>
  );
}
