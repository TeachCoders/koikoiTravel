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
  const country = countrySlug ?? city.state?.country?.slug;
  
  // Only make clickable if active tour packages exist (> 0)
  const href = journeys > 0
    ? (country
        ? `/tour-packages/${country}/${stateSlug}/${city.slug}`
        : `/tour-packages/${stateSlug}/${city.slug}`)
    : undefined;

  return (
    <DestinationCard
      title={city.title ?? ""}
      image={city.thumbImg ?? fallbackImage}
      subtitle={journeys > 0 ? `${journeys} ${journeys === 1 ? 'Tour Package' : 'Tour Packages'}` : "Coming Soon"}
      tag={journeys >= 5 ? "Popular Circuit" : undefined}
      href={href}
    />
  );
}
