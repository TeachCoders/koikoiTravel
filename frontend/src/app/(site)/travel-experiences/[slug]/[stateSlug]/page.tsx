import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/shared/JsonLd";
import {
  breadcrumbSchema,
  touristAttractionSchema,
  itemListSchema,
  graphSchema,
} from "@/lib/jsonLd";
import {
  fetchBySlugCached,
  fetchPublicJsonCached,
} from "@/feature/destinations/api/public-server";
import { absoluteUrl } from "@/lib/utils";
import type { TravelExperience } from "@/feature/travelExperience/type";
import type { State } from "@/feature/state/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import {
  journeyCardTitle,
  journeyPackageHref,
} from "@/feature/journey/filterOptions";
import TravelExperienceStateDetail from "@/feature/travelExperience/components/TravelExperienceStateDetail";

export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string; stateSlug: string }>;
};

// Helper to filter matching journeys for (experience + state)
function filterMatchingJourneys(
  allJourneys: Journey[] | undefined,
  experienceSlug: string,
  stateSlug: string
): Journey[] {
  if (!allJourneys || allJourneys.length === 0) return [];
  return allJourneys.filter((j) => {
    const hasExp = (j.travelExperiences || []).some(
      (e: any) => e.slug === experienceSlug
    );
    if (!hasExp) return false;
    const hasState =
      (j.states || []).some((s: any) => s.slug === stateSlug) ||
      (j.cities || []).some((c: any) => c.state?.slug === stateSlug);
    return hasState;
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, stateSlug } = await params;

  // Golden Triangle should never be nested under states as per user rule
  if (slug === "golden-triangle-tour-india" || slug === "golden-triangle") {
    return { title: "Page Not Found | KoiKoi Travel" };
  }

  const [experience, state, journeysResponse] = await Promise.all([
    fetchBySlugCached<TravelExperience>("/holidays/by-slug", slug),
    fetchBySlugCached<State>("/state/by-slug", stateSlug),
    fetchPublicJsonCached<JourneyPage<Journey>>("/journey?limit=150&isActive=true"),
  ]);

  if (!experience || !state) {
    return { title: "Travel Experience Not Found | KoiKoi Travel" };
  }

  const matching = filterMatchingJourneys(journeysResponse?.data, slug, stateSlug);
  // Strict rule: Only show page if there are at least 3 packages
  if (matching.length < 3) {
    return { title: "Page Not Found | KoiKoi Travel" };
  }

  const cleanExp = (experience.title || "")
    .replace(/\s+(?:tours?|tour packages)\s*(?:in\s+)?(?:india)?$/i, "")
    .trim();
  const cleanState = (state.h1Title || state.title || "")
    .replace(/\s*Tours?(\s*Packages?)?$/i, "")
    .trim();

  const title = `${cleanExp} Tours in ${cleanState} | Private Custom Packages | KoiKoi Travel`;
  const description = `Discover top-rated ${cleanExp.toLowerCase()} holiday packages in ${cleanState} with 100% private AC cab, verified guides & customizable itineraries. Request a quote with KoiKoi Travel.`;
  const canonical = `/travel-experiences/${slug}/${stateSlug}`;
  const ogImage = absoluteUrl(state.thumbImg || experience.thumbImg);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage, alt: `${cleanExp} in ${cleanState}` }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function TravelExperienceStatePage({ params }: Props) {
  const { slug, stateSlug } = await params;

  // Golden Triangle exempt from state nesting
  if (slug === "golden-triangle-tour-india" || slug === "golden-triangle") {
    return notFound();
  }

  const [experience, state, journeysResponse] = await Promise.all([
    fetchBySlugCached<TravelExperience>("/holidays/by-slug", slug),
    fetchBySlugCached<State>("/state/by-slug", stateSlug),
    fetchPublicJsonCached<JourneyPage<Journey>>("/journey?limit=150&isActive=true"),
  ]);

  if (!experience || !state) {
    return notFound();
  }

  const matchingJourneys = filterMatchingJourneys(journeysResponse?.data, slug, stateSlug);

  // Strict Rule: Minimum 3 packages required to create/display the page
  if (matchingJourneys.length < 3) {
    return notFound();
  }

  const cleanExp = (experience.title || "")
    .replace(/\s+(?:tours?|tour packages)\s*(?:in\s+)?(?:india)?$/i, "")
    .trim();
  const cleanState = (state.h1Title || state.title || "")
    .replace(/\s*Tours?(\s*Packages?)?$/i, "")
    .trim();

  const pageUrl = `/travel-experiences/${slug}/${stateSlug}`;

  // SEO Schema
  const schema = graphSchema([
    touristAttractionSchema({
      name: `${cleanExp} in ${cleanState}`,
      description: `Handcrafted ${cleanExp.toLowerCase()} tour packages in ${cleanState} with private transfers and personalized itineraries.`,
      image: state.thumbImg || experience.thumbImg || undefined,
      url: pageUrl,
    }),
    itemListSchema(
      matchingJourneys.map((j) => ({
        name: journeyCardTitle(j),
        url: journeyPackageHref(j),
      }))
    ),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Travel Experiences", path: "/travel-experiences" },
      { name: experience.title, path: `/travel-experiences/${experience.slug}` },
      { name: cleanState, path: pageUrl },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <main>
        <TravelExperienceStateDetail
          experience={experience}
          state={state}
          journeys={matchingJourneys}
        />
      </main>
    </>
  );
}

