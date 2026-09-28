import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CmsPageDetail from "@/feature/cms/components/CmsPageDetail";
import JsonLd from "@/components/shared/JsonLd";
import { breadcrumbSchema, webPageSchema, graphSchema } from "@/lib/jsonLd";
import { fetchBySlugCached } from "@/feature/destinations/api/public-server";
import { absoluteUrl, truncateMeta } from "@/lib/utils";
import type { CmsPage } from "@/feature/cms/type";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchBySlugCached<CmsPage>("/cms/by-slug", slug);
  if (!page) return { title: "Page Not Found | KoiKoi Travel" };
  const seoDescription = truncateMeta(page.seoDescription || page.moreDescription || "");
  const title = page.seoTitle || page.title;
  const canonical = page.canonical || `/${page.slug}`;
  const ogImage = absoluteUrl(page.thumbImg);
  return {
    title,
    description: seoDescription || undefined,
    keywords: page.seoKeyword || undefined,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title,
      description: seoDescription || undefined,
      url: canonical,
      images: ogImage ? [{ url: ogImage, alt: page.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: seoDescription || undefined,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function CmsPageRoute({ params }: Props) {
  const { slug } = await params;
  const page = await fetchBySlugCached<CmsPage>("/cms/by-slug", slug);
  if (!page) return notFound();

  // about-us par AboutPage, baaki CMS pages par WebPage
  const pageType = page.slug === "about-us" ? "AboutPage" : "WebPage";

  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema(
            {
              name: page.h1Title || page.title,
              url: `/${page.slug}`,
              description: page.seoDescription || page.moreDescription || undefined,
            },
            pageType
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: page.title, path: `/${page.slug}` },
          ]),
        ])}
      />
      <CmsPageDetail page={page} />
    </>
  );
}
