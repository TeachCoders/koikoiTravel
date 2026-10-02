import type { Metadata } from "next";
import TravelExperienceDetail from "@/feature/travelExperience/components/TravelExperienceDetail";
import JsonLd from "@/components/shared/JsonLd";
import { breadcrumbSchema, touristAttractionSchema, itemListSchema, faqSchema, graphSchema } from "@/lib/jsonLd";
import { fetchBySlugCached, fetchPublicJsonCached } from "@/feature/destinations/api/public-server";
import { stripHtml, absoluteUrl,  truncateMeta } from "@/lib/utils";
import { HOME_FAQS } from "@/lib/homeFaqs";
import type { TravelExperience } from "@/feature/travelExperience/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import { journeyCardTitle, journeyPackageHref } from "@/feature/journey/filterOptions";
import { travelExperienceParams } from "@/lib/prerender";

export const revalidate = 300;

export async function generateStaticParams() {
  return travelExperienceParams();
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchBySlugCached<TravelExperience>("/holidays/by-slug", slug);
  if (!data) return { title: "Travel Experience Not Found | KoiKoi Travel" };
  const title = data.seoTitle || data.title;
  const seoDescription = truncateMeta(data.seoDescription || data.moreDescription || "");
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
  const data = await fetchBySlugCached<TravelExperience>("/holidays/by-slug", slug);

  let schema = null;
  let journeys: JourneyPage<Journey> | null = null;
  if (data) {
    journeys = await fetchPublicJsonCached<JourneyPage<Journey>>("/journey?limit=100&isActive=true");
    const order = (data.featuredJourneyOrder || []) as number[];
    const relatedJourneys = (journeys?.data || [])
      .filter((j) =>
        (j.travelExperiences || []).some((e) => e.slug === data.slug)
      )
      .sort((a, b) => {
        const ai = order.indexOf(a.id);
        const bi = order.indexOf(b.id);
        const aRank = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
        const bRank = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
        return aRank - bRank;
      });
    const faqItems =
      data.faqs && data.faqs.length > 0
        ? data.faqs
            .filter((f) => f?.ques && f?.ans)
            .map((f) => ({ question: stripHtml(f.ques), answer: stripHtml(f.ans) }))
        : HOME_FAQS;
    schema = graphSchema([
      touristAttractionSchema({
        name: data.h1Title || data.title,
        description: data.seoDescription || data.overView || undefined,
        image: data.thumbImg || data.banner?.images?.[0] || undefined,
        url: `/travel-experiences/${data.slug}`,
      }),
      itemListSchema(
        relatedJourneys.slice(0, 10).map((j) => ({
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
