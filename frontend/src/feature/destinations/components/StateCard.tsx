import { SingleDestinationReusableCard } from "@/components/shared/SingleDestinationReusableCard";
import type { State } from "@/feature/state/type";

export default function StateCard({
  state,
  countrySlug,
  journeyCount,
}: {
  state: State;
  countrySlug?: string;
  journeyCount?: number;
}) {
  const cities = state._count?.cities ?? state.cities?.length ?? 0;
  const journeys = journeyCount ?? state.journeys?.length ?? state.tourCount ?? 0;
  const country = countrySlug ?? state.country?.slug;
  
  const href = country
    ? `/tour-packages/${country}/${state.slug}`
    : `/tour-packages/${state.slug}`;

  return (
    <SingleDestinationReusableCard
      title={state.banner?.bannerTitle || state.h1Title || state.title}
      image={state.thumbImg || state.banner?.images?.[0]}
      eyebrow={state.banner?.bannerTag || undefined}
      tourCountText={journeys > 0 ? `${journeys} Tours` : `${cities} Cities`}
      href={href}
      variant="overlay"
      aspectRatio="4/3"
    />
  );
}
