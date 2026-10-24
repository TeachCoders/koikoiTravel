import type { Metadata } from "next";
import { redirect } from "next/navigation";
import TravelExperienceDetail from "@/feature/travelExperience/components/TravelExperienceDetail";
import JsonLd from "@/components/shared/JsonLd";
import { breadcrumbSchema, touristAttractionSchema, itemListSchema, faqSchema, graphSchema } from "@/lib/jsonLd";
import { fetchBySlugCached, fetchPublicJsonCached } from "@/feature/destinations/api/public-server";
import { stripHtml, absoluteUrl,  truncateMeta } from "@/lib/utils";
import { HOME_FAQS } from "@/lib/homeFaqs";
import type { TravelExperience } from "@/feature/travelExperience/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import { journeyCardTitle, journeyPackageHref } from "@/feature/journey/filterOptions";
import { resolveTravelExperienceJourneys } from "@/feature/journey/destinationJourneys";
import { travelExperienceParams } from "@/lib/prerender";

import { getDestinationFaqs } from "@/lib/destinationFaqs";
import { GOLDEN_TRIANGLE_FAQS } from "@/feature/travelExperience/goldenTriangleFaqs";

export const revalidate = 300;

export async function generateStaticParams() {
  return travelExperienceParams();
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "golden-triangle" || slug === "golden-triangle-tour-india") {
    redirect("/tour-packages/india/golden-triangle");
  }
  const data = await fetchBySlugCached<TravelExperience>("/holidays/by-slug", slug);
  if (!data) return { title: "Travel Experience Not Found | KoiKoi Travel" };

  const isGoldenTriangle = slug === "golden-triangle-tour-india" || slug === "golden-triangle" || data.slug === "golden-triangle-tour-india" || data.slug === "golden-triangle";
  const title = isGoldenTriangle
    ? "Golden Triangle Tour Packages (Delhi Agra Jaipur) | Private Car & Chauffeur"
    : data.seoTitle || data.title;
  const seoDescription = isGoldenTriangle
    ? "Explore Delhi, Agra & Jaipur with 100% private AC chauffeur, verified guides & customizable 1 to 7+ days itineraries. Tailor-made Golden Triangle holiday packages. Request your custom quote!"
    : truncateMeta(data.seoDescription || data.moreDescription || "");
  const canonical = canonicalFor(data, slug);
  const ogImage = absoluteUrl(data.thumbImg);
  return {
    title,
    description: seoDescription,
    keywords: data.seoKeyword,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title,
      description: seoDescription,
      url: canonical,
      images: ogImage ? [{ url: ogImage, alt: data.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: seoDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function canonicalFor(
  data: { canonical?: string | null; slug: string },
  paramSlug: string
): string {
  const derived = `/travel-experiences/${data.slug || paramSlug}`;
  if (!data.canonical) return derived;
  const base = data.canonical.includes("://")
    ? data.canonical.slice(data.canonical.indexOf("/", data.canonical.indexOf("://") + 3))
    : data.canonical;
  return base.startsWith("/travel-experiences/") ? base : derived;
}

export default async function TravelExperiencePage({ params }: Props) {
  const { slug } = await params;
  if (slug === "golden-triangle" || slug === "golden-triangle-tour-india") {
    redirect("/tour-packages/india/golden-triangle");
  }
  const data = await fetchBySlugCached<TravelExperience>("/holidays/by-slug", slug);

  let schema = null;
  let journeys: JourneyPage<Journey> | null = null;
  if (data) {
    journeys = await fetchPublicJsonCached<JourneyPage<Journey>>("/journey?limit=100&isActive=true");
    const { allOrderedJourneys } = resolveTravelExperienceJourneys(journeys?.data, data);
    const isGoldenTriangle = slug === "golden-triangle-tour-india" || slug === "golden-triangle" || data.slug === "golden-triangle-tour-india" || data.slug === "golden-triangle";
    const rawFaqs = isGoldenTriangle ? (GOLDEN_TRIANGLE_FAQS as any) : data.faqs;
    const faqItems = getDestinationFaqs(
      data.slug,
      data.title,
      "TravelExperience",
      rawFaqs
    );
    schema = graphSchema([
      touristAttractionSchema({
        name: data.h1Title || data.title,
        description: data.seoDescription || data.overView || undefined,
        image: data.thumbImg || data.banner?.images?.[0] || undefined,
        url: `/travel-experiences/${data.slug}`,
      }),
      itemListSchema(
        allOrderedJourneys.map((j) => ({
          name: journeyCardTitle(j),
          url: journeyPackageHref(j),
        }))
      ),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Travel Experiences", path: "/travel-experiences" },
        { name: data.title, path: `/travel-experiences/${data.slug}` },
      ]),
      faqSchema(faqItems),
    ]);
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {schema && <JsonLd data={schema} />}
      <main className="flex-1">
        <TravelExperienceDetail slug={slug} initialExperience={data} initialJourneys={journeys} />
      </main>
    </div>
  );
}
