import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import CountryDetail from "@/feature/destinations/components/CountryDetail";
import StateDetail from "@/feature/destinations/components/StateDetail";
import CityDetail from "@/feature/destinations/components/CityDetail";
import JourneyDetail from "@/feature/journey/components/JourneyDetail";
import CmsFallbackPage from "@/feature/cms/components/CmsFallbackPage";
import JsonLd from "@/components/shared/JsonLd";
import { breadcrumbSchema, faqSchema, touristDestinationSchema, touristTripSchema, webPageSchema, itemListSchema, graphSchema, buildTouristType } from "@/lib/jsonLd";
import { fetchBySlugCached, fetchPublicJsonCached } from "@/feature/destinations/api/public-server";
import { stripHtml, truncateMeta, cleanSeoTitle } from "@/lib/utils";
import { isIndexableCity } from "@/lib/cityValidation";
import { getJourneyBreadcrumbState } from "@/lib/breadcrumbHelper";
import { HOME_FAQS } from "@/lib/homeFaqs";
import type { Country } from "@/feature/country/type";
import type { State, PaginatedResponse as StatePage } from "@/feature/state/type";
import type { City } from "@/feature/city/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import type { TravelExperience, PaginatedResponse as ExperiencePage } from "@/feature/travelExperience/type";
import { journeyCardTitle, journeyPackageHref } from "@/feature/journey/filterOptions";
import {
  resolveStateJourneys,
  resolveCityJourneys,
  resolveCountryJourneys,
  trimJourneyForListing,
} from "@/feature/journey/destinationJourneys";
import type { CmsPage } from "@/feature/cms/type";
import { journeyParams } from "@/lib/prerender";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://koikoitravel.com";

function absoluteUrl(src?: string | null): string | undefined {
  if (!src) return undefined;
  if (/^https?:\/\//.test(src)) return src;
  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`;
}

function journeySlugCanonical(slug: string, stored?: string | null): string {
  const derived = `/tour-packages/${slug}`;
  if (!stored) return derived;
  const base = stored.includes("://")
    ? stored.slice(stored.indexOf("/", stored.indexOf("://") + 3))
    : stored;
  return base.startsWith("/tour-packages/") ? base : derived;
}

import { getDestinationFaqs } from "@/lib/destinationFaqs";

function resolveFaqItems(
  faqs?: { ques: string; ans: string }[],
  contextSlug?: string,
  contextName?: string,
  entityType?: string
): { question: string; answer: string }[] {
  if (faqs && faqs.length > 0) {
    const valid = faqs
      .filter((f) => f?.ques && f?.ans)
      .map((f) => ({ question: stripHtml(f.ques), answer: stripHtml(f.ans) }));
    if (valid.length > 0) return valid;
  }
  if (contextSlug || contextName) {
    return getDestinationFaqs(contextSlug, contextName, entityType).map((f) => ({
      question: f.question,
      answer: f.answer,
    }));
  }
  return [];
}

export const revalidate = 300;

type Props = { params: Promise<{ slug: string[] }> };

export async function generateStaticParams() {
  return journeyParams();
}

type Resolved =
  | { type: "country"; country: Country }
  | { type: "state"; state: State }
  | { type: "city"; city: City }
  | { type: "journey"; journey: Journey }
  | { type: "cms"; cms: CmsPage }
  | { type: "notfound" };

async function resolveSlug(slug: string[]): Promise<Resolved> {
  if (slug.length === 0) return { type: "notfound" };

  if (slug.length === 1) {
    const segment = slug[0];
    const journey = await fetchBySlugCached<Journey>("/journey/by-slug", segment);
    if (journey) return { type: "journey", journey };
    const country = await fetchBySlugCached<Country>("/country/by-slug", segment);
    if (country) return { type: "country", country };
    const cms = await fetchBySlugCached<CmsPage>("/cms/by-slug", segment);
    if (cms) return { type: "cms", cms };
    return { type: "notfound" };
  }

  if (slug.length === 2) {
    const [countrySlug, stateSlug] = slug;
    const state = await fetchBySlugCached<State>("/state/by-slug", stateSlug);
    if (state && state.country?.slug === countrySlug) {
      if (state.isActive === false || state.showOnSite === false) {
        return { type: "notfound" };
      }
      return { type: "state", state };
    }
    const cms = await fetchBySlugCached<CmsPage>("/cms/by-slug", slug.join("/"));
    if (cms) return { type: "cms", cms };
    return { type: "notfound" };
  }

  if (slug.length === 3) {
    const [countrySlug, stateSlug, citySlug] = slug;
    if (stateSlug === citySlug) {
      return { type: "notfound" };
    }
    const city = await fetchBySlugCached<City>("/city/by-slug", citySlug);
    if (
      city &&
      city.state?.slug === stateSlug &&
      city.state?.country?.slug === countrySlug
    ) {
      if (city.isActive === false || city.showOnSite === false) {
        return { type: "notfound" };
      }
      return { type: "city", city };
    }
    const cms = await fetchBySlugCached<CmsPage>("/cms/by-slug", slug.join("/"));
    if (cms) return { type: "cms", cms };

    return { type: "notfound" };
  }

  const cms = await fetchBySlugCached<CmsPage>("/cms/by-slug", slug.join("/"));
  if (cms) return { type: "cms", cms };
  return { type: "notfound" };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveSlug(slug);

  switch (resolved.type) {
    case "country": {
      const { country } = resolved;
      const rawTitle =
        country?.seoTitle ||
        country?.title?.replace(/\s*Tour$/i, "") ||
        country?.title ||
        (slug[0] ? slug[0] : "Tour Package");
      const title = cleanSeoTitle(rawTitle);
      const seoDescription =
        truncateMeta(country?.seoDescription || country?.overView || "");
      const canonical = `/tour-packages/${country.slug}`;
      const ogImage = absoluteUrl(country?.thumbImg);
      return {
        title,
        description: seoDescription,
        keywords: country?.seoKeyword,
        alternates: { canonical },
        openGraph: {
          type: "website",
          title,
          description: seoDescription,
          url: canonical,
          images: ogImage ? [{ url: ogImage, alt: title }] : undefined,
        },
        twitter: {
          card: "summary_large_image",
          title,
          description: seoDescription,
          images: ogImage ? [ogImage] : undefined,
        },
      };
    }
    case "state": {
      const { state } = resolved;
      const initialJourneys = await fetchPublicJsonCached<JourneyPage<Journey>>(
        "/journey?limit=100&isActive=true"
      );
      const { allOrderedJourneys } = resolveStateJourneys(initialJourneys?.data, state);
      const hasFewTours = allOrderedJourneys.length < 2;

      const rawTitle = state.seoTitle || state.h1Title || state.title;
      const title = cleanSeoTitle(rawTitle);
      const seoDescription = truncateMeta(state.seoDescription || state.overView);
      const canonical = `/tour-packages/${state.country?.slug}/${state.slug}`;
      const ogImage = absoluteUrl(state.thumbImg);
      return {
        title,
        description: seoDescription,
        keywords: state.seoKeyword,
        alternates: { canonical },
        robots: hasFewTours ? { index: false, follow: true } : undefined,
        openGraph: {
          type: "website",
          title,
          description: seoDescription,
          url: canonical,
          images: ogImage ? [{ url: ogImage, alt: state.title }] : undefined,
        },
        twitter: {
          card: "summary_large_image",
          title,
          description: seoDescription,
          images: ogImage ? [ogImage] : undefined,
        },
      };
    }
    case "city": {
      const { city } = resolved;
      const initialJourneys = await fetchPublicJsonCached<JourneyPage<Journey>>(
        "/journey?limit=100&isActive=true"
      );
      const cityJourneys = resolveCityJourneys(initialJourneys?.data, city);
      const hasFewTours = cityJourneys.length < 2;

      const rawTitle = city.seoTitle || city.h1Title || city.title;
      const title = cleanSeoTitle(rawTitle);
      const seoDescription = truncateMeta(city.seoDescription || city.overView);
      const canonical =
        `/tour-packages/${city.state?.country?.slug}/${city.state?.slug}/${city.slug}`;
      const ogImage = absoluteUrl(city.thumbImg);
      return {
        title,
        description: seoDescription,
        keywords: city.seoKeyword,
        alternates: { canonical },
        robots: hasFewTours ? { index: false, follow: true } : undefined,
        openGraph: {
          type: "website",
          title,
          description: seoDescription,
          url: canonical,
          images: ogImage ? [{ url: ogImage, alt: city.title }] : undefined,
        },
        twitter: {
          card: "summary_large_image",
          title,
          description: seoDescription,
          images: ogImage ? [ogImage] : undefined,
        },
      };
    }
    case "journey": {
      const { journey } = resolved;
      const rawTitle = journey.seoTitle || journey.h1Title || journey.title;
      const title = cleanSeoTitle(rawTitle);
      const seoDescription = truncateMeta(journey.seoDescription || journey.overView);
      const canonical = journeySlugCanonical(journey.slug, journey.canonical);
      const ogImage = absoluteUrl(journey.thumbImg || journey.banner?.images?.[0]);
      return {
        title,
        description: seoDescription,
        keywords: journey.seoKeyword,
        alternates: { canonical },
        openGraph: {
          type: "website",
          title,
          description: seoDescription,
          url: canonical,
          images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: journey.title }] : undefined,
        },
        twitter: {
          card: "summary_large_image",
          title,
          description: seoDescription,
          images: ogImage ? [ogImage] : undefined,
        },
      };
    }
    case "cms": {
      const { cms } = resolved;
      const rawTitle = cms.seoTitle || cms.title;
      const title = cleanSeoTitle(rawTitle);
      const seoDescription = truncateMeta(cms.seoDescription || cms.moreDescription || "");
      return {
        title,
        description: seoDescription || undefined,
        keywords: cms.seoKeyword || undefined,
        alternates: { canonical: cms.canonical || `/tour-packages/${cms.slug}` },
      };
    }
    default:
      return {
        title: "Page Not Found",
        robots: { index: false, follow: false },
      };
  }
}

export default async function TourPackageCatchAllPage({ params }: Props) {
  const { slug } = await params;
  const resolved = await resolveSlug(slug);

  switch (resolved.type) {
    case "country": {
      const { country } = resolved;
      const [initialStates, initialJourneys, initialExperiences] = await Promise.all([
        country
          ? fetchPublicJsonCached<StatePage<State>>(`/state?limit=100&countryId=${country.id}`)
          : null,
        fetchPublicJsonCached<JourneyPage<Journey>>("/journey?limit=100&isActive=true"),
        fetchPublicJsonCached<ExperiencePage<TravelExperience>>("/holidays?limit=100&isActive=true"),
      ]);

      const countryJourneys = resolveCountryJourneys(initialJourneys?.data, country);
      const trimmedCountryJourneys = countryJourneys.map(trimJourneyForListing);
      const trimmedCountry = {
        ...country,
        journeys: [],
      };
      const trimmedStates = initialStates
        ? {
            ...initialStates,
            data: (initialStates.data || []).map((s: any) => ({
              id: s.id,
              title: s.title,
              slug: s.slug,
              thumbImg: s.thumbImg,
              tourCount: s.tourCount,
              cities: (s.cities || []).map((c: any) => ({ id: c.id, title: c.title, slug: c.slug })),
            })),
          }
        : null;

      const schema = graphSchema([
        touristDestinationSchema({
          name: country.title,
          description: country.seoDescription || country.overView || undefined,
          image: country.thumbImg || undefined,
          url: `/tour-packages/${country.slug}`,
        }),
        itemListSchema(
          countryJourneys.map((j) => ({
            name: journeyCardTitle(j),
            url: journeyPackageHref(j),
          }))
        ),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tour Packages", path: "/tour-packages" },
          { name: country.title.replace(/\s*Tour$/i, ""), path: `/tour-packages/${country.slug}` },
        ]),
        faqSchema(resolveFaqItems(country.faqs, country.slug, country.title, "Country")),
      ]);

      return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
          <JsonLd data={schema} />
          <main className="flex-1">
            <CountryDetail
              slug={country.slug}
              initialCountry={trimmedCountry as any}
              initialStates={trimmedStates as any}
              initialJourneys={{ data: trimmedCountryJourneys, total: trimmedCountryJourneys.length } as any}
              initialExperiences={initialExperiences}
            />
          </main>
        </div>
      );
    }

    case "state": {
      const { state } = resolved;
      const initialJourneys = await fetchPublicJsonCached<JourneyPage<Journey>>(
        "/journey?limit=100&isActive=true"
      );
      const { allOrderedJourneys } = resolveStateJourneys(initialJourneys?.data, state);
      const trimmedJourneys = allOrderedJourneys.map(trimJourneyForListing);
      const trimmedState = {
        ...state,
        journeys: [],
        cities: (state.cities || []).map((c: any) => ({
          id: c.id,
          title: c.title,
          slug: c.slug,
          thumbImg: c.thumbImg,
          displayOrder: c.displayOrder,
          showOnSite: c.showOnSite,
          isActive: c.isActive,
          tourCount: c.tourCount,
          _count: c._count,
        })),
      };
      const schema = graphSchema([
        touristDestinationSchema({
          name: state.title,
          description: state.seoDescription || state.overView || undefined,
          image: state.thumbImg || undefined,
          url: `/tour-packages/${state.country?.slug}/${state.slug}`,
        }),
        itemListSchema(
          allOrderedJourneys.map((j) => ({
            name: journeyCardTitle(j),
            url: journeyPackageHref(j),
          }))
        ),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tour Packages", path: "/tour-packages" },
          ...(state.country?.slug
            ? [{ name: state.country.title.replace(/\s*Tour$/i, ""), path: `/tour-packages/${state.country.slug}` }]
            : []),
          { name: state.title, path: `/tour-packages/${state.country?.slug}/${state.slug}` },
        ]),
        faqSchema(resolveFaqItems(state.faqs, state.slug, state.title, "State")),
      ]);
      return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
          <JsonLd data={schema} />
          <main className="flex-1">
            <StateDetail slug={state.slug} initialState={trimmedState} initialJourneys={{ data: trimmedJourneys, total: trimmedJourneys.length } as any} />
          </main>
        </div>
      );
    }

    case "city": {
      const { city } = resolved;
      const initialJourneys = await fetchPublicJsonCached<JourneyPage<Journey>>(
        "/journey?limit=100&isActive=true"
      );
      const cityJourneys = resolveCityJourneys(initialJourneys?.data, city);
      const trimmedJourneys = cityJourneys.map(trimJourneyForListing);
      const trimmedCity = {
        ...city,
        journeys: [],
        state: city.state
          ? {
              id: city.state.id,
              title: city.state.title,
              slug: city.state.slug,
              country: city.state.country ? { slug: city.state.country.slug, title: city.state.country.title } : null,
            }
          : null,
      };
      const schema = graphSchema([
        touristDestinationSchema({
          name: city.title,
          description: city.seoDescription || city.overView || undefined,
          image: city.thumbImg || undefined,
          url: `/tour-packages/${city.state?.country?.slug}/${city.state?.slug}/${city.slug}`,
        }),
        itemListSchema(
          cityJourneys.map((j) => ({
            name: journeyCardTitle(j),
            url: journeyPackageHref(j),
          }))
        ),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tour Packages", path: "/tour-packages" },
          ...(city.state?.country?.slug
            ? [{ name: city.state.country.title.replace(/\s*Tour$/i, ""), path: `/tour-packages/${city.state.country.slug}` }]
            : []),
          ...(city.state?.slug
            ? [{ name: city.state.title, path: `/tour-packages/${city.state.country?.slug}/${city.state.slug}` }]
            : []),
          { name: city.title, path: `/tour-packages/${city.state?.country?.slug}/${city.state?.slug}/${city.slug}` },
        ]),
        faqSchema(resolveFaqItems(city.faqs, city.slug, city.title, "City")),
      ]);
      return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
          <JsonLd data={schema} />
          <main className="flex-1">
            <CityDetail citySlug={city.slug} initialCity={trimmedCity as any} initialJourneys={{ data: trimmedJourneys, total: trimmedJourneys.length } as any} />
          </main>
        </div>
      );
    }

    case "journey": {
      const { journey } = resolved;
      const canonical = journeySlugCanonical(journey.slug, journey.canonical);
      const journeyFaqs = resolveFaqItems(journey.faqs, journey.slug, journey.title, "Journey");
      const breadcrumbItems: { name: string; path: string }[] = [
        { name: "Home", path: "/" },
        { name: "Tour Packages", path: "/tour-packages" },
      ];
      const bcState = getJourneyBreadcrumbState(journey);
      if (bcState.countrySlug && bcState.countryTitle) {
        breadcrumbItems.push({
          name: bcState.countryTitle,
          path: `/tour-packages/${bcState.countrySlug}`,
        });
      }
      if (bcState.stateSlug && bcState.stateTitle && bcState.countrySlug) {
        breadcrumbItems.push({
          name: bcState.stateTitle,
          path: `/tour-packages/${bcState.countrySlug}/${bcState.stateSlug}`,
        });
      }
      const durationLabel = journey.duration || (journey.noDays > 0 ? `${journey.noDays} Days` : "");
      const fullHeadingTitle = journey.slug === "10-days-golden-triangle-with-shimla-tour"
        ? "Golden Triangle with Shimla Tour"
        : durationLabel && !new RegExp(`^\\s*${durationLabel}`, "i").test(journey.h1Title || journey.title)
          ? `${durationLabel} - ${journey.h1Title || journey.title}`
          : (journey.h1Title || journey.title);
      breadcrumbItems.push({ name: fullHeadingTitle, path: canonical });

      // Journey text: day titles + day content + page overview — signals yahin se aate hain
      const journeyText = [
        journey.overView || "",
        journey.moreDescription || "",
        ...(journey.days ?? []).map((d) => `${d.day ?? ""} ${stripHtml(d.seoDescription || "")}`),
      ].join(" ");
      const { touristType, keywords } = buildTouristType(
        journey.travelExperiences,
        journeyText
      );

      const tripImg = journey.thumbImg || journey.banner?.images?.[0] || undefined;
      const tourProductNode = touristTripSchema({
        name: journey.h1Title || journey.title,
        description: journey.seoDescription || journey.overView || undefined,
        image: tripImg,
        url: canonical,
        touristType,
        keywords: keywords.join(", ") || undefined,
        itinerary: journey.days?.map((d) => ({
          day: d.day || "",
          description: d.seoDescription || undefined,
        })),
      });

      const webPageNode = webPageSchema(
        {
          name: journey.h1Title || journey.title,
          url: canonical,
          description: journey.seoDescription || journey.overView || undefined,
          image: tripImg,
        },
        "ItemPage"
      );

      const schema = journey
        ? graphSchema([
            ...(webPageNode ? [webPageNode] : []),
            ...(tourProductNode ? [tourProductNode] : []),
            breadcrumbSchema(breadcrumbItems),
            faqSchema(journeyFaqs),
          ])
        : null;
      const allJourneysRes = await fetchPublicJsonCached<JourneyPage<Journey>>(
        "/journey?limit=100&isActive=true"
      );
      const stateSlug = journey.states?.[0]?.slug || journey.cities?.[0]?.state?.slug;
      const relatedJourneys = (allJourneysRes?.data || [])
        .filter((j) => j.id !== journey.id && (
          j.states?.some((s) => s.slug === stateSlug) ||
          j.cities?.some((c) => c.state?.slug === stateSlug)
        ))
        .slice(0, 4);

      return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
          {schema && <JsonLd data={schema} />}
          <main className="flex-1">
            <JourneyDetail slug={journey.slug} initialJourney={journey} relatedJourneys={relatedJourneys} />
          </main>
        </div>
      );
    }

    case "cms":
      return <CmsFallbackPage slug={slug.join("/")} />;

    default:
      return notFound();
  }
}
