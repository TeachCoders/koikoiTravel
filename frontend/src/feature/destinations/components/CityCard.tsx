import { SingleDestinationReusableCard } from "@/components/shared/SingleDestinationReusableCard";
import type { City } from "@/feature/city/type";
import { stripHtml } from "@/lib/utils";

const CITY_EYEBROWS: Record<string, string> = {
  kedarnath: "12 JYOTIRLINGA DHAM",
  badrinath: "HOLY VISHNU ABODE",
  gangotri: "ORIGIN OF SACRED GANGA",
  yamunotri: "SOURCE OF HOLY YAMUNA",
  jaipur: "The Pink City of India",
  udaipur: "City of Lakes of India",
  jodhpur: "The Blue City of India",
  ranthambore: "Land of Bengal Tigers in India",
  jaisalmer: "The Golden City of India",
  pushkar: "The Holy Lake City of India",
  bikaner: "The Camel Country in India",
  chittorgarh: "The Largest Fort City of India",
  agra: "Home of Taj Mahal",
  delhi: "Historic Capital of India",
  varanasi: "The Spiritual Capital of India",
  munnar: "Tea Gardens & Hills",
  alleppey: "Backwaters & Houseboats",
  kochi: "Colonial Port & Spice Coast",
  cochin: "Colonial Port & Spice Coast",
  srinagar: "Paradise On Earth in India",
  gulmarg: "Meadow of Flowers & Ski Capital",
  pahalgam: "Valley of Shepherds & Pine Forests",
  sonamarg: "Meadow of Gold & Glacier Trails",
};

const CITY_DESCRIPTIONS: Record<string, string> = {
  kedarnath: "Visit the revered Himalayan Jyotirlinga temple of Lord Shiva surrounded by towering snow-clad peaks.",
  badrinath: "Seek blessings at the sacred Char Dham temple of Lord Badri Narayan nestled in the Garhwal Himalayas.",
  gangotri: "Worship at the high-altitude shrine where the holy River Bhagirathi descends amidst serene mountain valleys.",
  yamunotri: "Begin the sacred Char Dham Yatra at the pristine thermal springs and ancient shrine of Goddess Yamuna.",
  jaipur: "Explore the Amber Fort, Hawa Mahal, royal palaces, and vibrant bazaars of the Pink City.",
  udaipur: "Discover shimmering Lake Pichola, fairy-tale marble palaces, and scenic sunset boat rides.",
  jodhpur: "Witness the majestic Mehrangarh Fort, blue-washed heritage streets, and royal cenotaphs.",
  ranthambore: "Experience thrilling open-jeep tiger safaris in India's famous ancient royal reserve.",
  jaisalmer: "Venture into golden sandstone forts, camel desert dunes, and starlit camp safaris.",
  pushkar: "Walk around the sacred holy lake, historic Brahma Temple, and colorful annual fairgrounds.",
  bikaner: "Visit the grand Junagarh Fort, red sandstone palaces, and authentic desert culture.",
  srinagar: "Experience tranquil Dal Lake shikara rides, traditional houseboats, and Mughal gardens.",
  gulmarg: "Ride the scenic Gondola cable car, enjoy snow-clad alpine peaks, and world-class ski slopes.",
  pahalgam: "Discover scenic Lidder River banks, lush Betaab Valley, and horse trails in pine forests.",
  sonamarg: "Explore the majestic Thajiwas Glacier, alpine meadows, and pristine trout-fishing rivers.",
};

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
  const isCircuit =
    stateSlug === "golden-triangle" ||
    stateSlug === "taj-mahal" ||
    stateSlug === "south-india" ||
    stateSlug.includes("golden-triangle") ||
    stateSlug.includes("taj-mahal") ||
    stateSlug.includes("south-india");

  const actualStateSlug = city.state?.slug && isCircuit ? city.state.slug : stateSlug;
  const country = countrySlug ?? city.state?.country?.slug ?? "india";

  const isSelf = city.slug === actualStateSlug;
  const href = city.slug
    ? isSelf
      ? `/tour-packages/${country}/${actualStateSlug}`
      : `/tour-packages/${country}/${actualStateSlug}/${city.slug}`
    : undefined;

  const citySlug = (city.slug || "").toLowerCase().trim();
  const isDham =
    citySlug === "kedarnath" ||
    citySlug === "badrinath" ||
    citySlug === "gangotri" ||
    citySlug === "yamunotri";

  const eyebrow =
    (isDham && CITY_EYEBROWS[citySlug]) ||
    city.banner?.bannerTag?.trim() ||
    CITY_EYEBROWS[citySlug] ||
    (journeys >= 5 ? "POPULAR CIRCUIT" : "POPULAR DESTINATION");

  const description =
    (isDham && CITY_DESCRIPTIONS[citySlug]) ||
    city.cardShortDescription ||
    CITY_DESCRIPTIONS[citySlug] ||
    (city.seoDescription ? stripHtml(city.seoDescription).slice(0, 115).trim() + "..." : null) ||
    (city.overView ? stripHtml(city.overView).slice(0, 115).trim() + "..." : null) ||
    `Explore ${city.title} private sightseeing, heritage monuments & tailor-made tours.`;

  return (
    <SingleDestinationReusableCard
      title={city.h1Title || city.title || ""}
      image={city.thumbImg ?? fallbackImage}
      eyebrow={eyebrow}
      description={description}
      tourCountText={journeys > 0 ? `${journeys} ${journeys === 1 ? "Tour" : "Tours"}` : "Private Tours"}
      href={href}
      aspectRatio="4/3"
    />
  );
}
