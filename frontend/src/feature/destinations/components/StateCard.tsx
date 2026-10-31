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
      description={state.cardShortDescription || undefined}
      tourCountText={journeys > 0 ? `${journeys} Tours` : `${cities} Cities`}
      subtitle={
        journeys > 0 ? (
          <span className="inline-flex items-center justify-center gap-1.5">
            <span>{cities} {cities === 1 ? "City" : "Cities"}</span>
            <span className="opacity-60">•</span>
            <span>{journeys} {journeys === 1 ? "Tour" : "Tours"}</span>
          </span>
        ) : (
          <span>{cities > 0 ? `${cities} Cities` : "Tailor-Made on Request"}</span>
        )
      }
      href={href}
    />
  );
}
