import { SingleDestinationReusableCard } from "@/components/shared/SingleDestinationReusableCard";
import type { City } from "@/feature/city/type";

export default function CityCard({
  city,
  stateSlug,
  countrySlug,
  journeyCount,
  fallbackImage,
}: {
  city: Partial<City>;
  stateSlug: string;
  countrySlug?: string;
  journeyCount?: number;
  fallbackImage?: string;
}) {
  const journeys = city._count?.journeys ?? city.journeys?.length ?? journeyCount ?? 0;
  const isCircuit = stateSlug === "golden-triangle" || stateSlug === "taj-mahal" || stateSlug === "south-india" || stateSlug.includes("golden-triangle") || stateSlug.includes("taj-mahal") || stateSlug.includes("south-india");
  const actualStateSlug = (city.state?.slug && isCircuit)
    ? city.state.slug
    : stateSlug;
  const country = countrySlug ?? city.state?.country?.slug ?? "india";
  
  // Only make clickable if city has at least 4 tour packages, is active, and passes SEO rules
  const isSelf = city.slug === actualStateSlug;
  const hasSeo = Boolean(city.seoDescription || city.overView || city.moreDescription);
  const isEnabled = journeys >= 4 && hasSeo && city.isActive !== false && city.showOnSite !== false;
  const href = isEnabled
    ? (isSelf
        ? `/tour-packages/${country}/${actualStateSlug}`
        : `/tour-packages/${country}/${actualStateSlug}/${city.slug}`)
    : undefined;

  return (
    <SingleDestinationReusableCard
      title={city.h1Title || city.title || ""}
      image={city.thumbImg ?? fallbackImage}
      description={city.cardShortDescription || undefined}
      subtitle={journeys > 0 ? `${journeys} ${journeys === 1 ? 'Tour Package' : 'Tour Packages'}` : "Tailor-Made on Request"}
      tag={journeys >= 5 ? "Popular Circuit" : undefined}
      href={href}
    />
  );
}
