import DestinationCard from "@/components/shared/DestinationCard";
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
  const actualStateSlug = (city.state?.slug && (stateSlug === "golden-triangle" || stateSlug.includes("golden-triangle")))
    ? city.state.slug
    : stateSlug;
  const country = countrySlug ?? city.state?.country?.slug ?? "india";
  
  // Only make clickable if active tour packages exist (> 0)
  const isSelf = city.slug === actualStateSlug;
  const href = journeys > 0
    ? (isSelf
        ? `/tour-packages/${country}/${actualStateSlug}`
        : `/tour-packages/${country}/${actualStateSlug}/${city.slug}`)
    : undefined;

  return (
    <DestinationCard
      title={city.h1Title || city.title || ""}
      image={city.thumbImg ?? fallbackImage}
      subtitle={journeys > 0 ? `${journeys} ${journeys === 1 ? 'Tour Package' : 'Tour Packages'}` : "Tailor-Made on Request"}
      tag={journeys >= 5 ? "Popular Circuit" : undefined}
      href={href}
    />
  );
}
