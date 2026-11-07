"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import Image from "next/image";
import {
  ChevronRight,
  ChevronDown,
  Sparkles,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useCountryBySlug } from "@/feature/country/api/useCountry";
import { useGetStates } from "@/feature/state/api/useState";
import { useGetCities } from "@/feature/city/api/useCity";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import { useGetTravelExperiences } from "@/feature/travelExperience/api/useTravelExperience";
import HeroBanner from "@/components/shared/HeroBanner";
import { useHeroBanners } from "@/feature/heroBanner/api";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CapsuleTabs } from "@/components/shared/CapsuleTabs";
import { SingleDestinationReusableCard } from "@/components/shared/SingleDestinationReusableCard";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { FallbackImage } from "@/components/shared/FallbackImage";
import RichContent from "@/components/shared/RichContent";
import DestinationGuideSection from "@/components/shared/DestinationGuideSection";
import FaqSection from "@/feature/home/components/FaqSection";
import { stripHtml, cn } from "@/lib/utils";
import { resolveStateJourneys } from "@/feature/journey/destinationJourneys";
import type { Country } from "@/feature/country/type";
import type { State, PaginatedResponse as StatePage } from "@/feature/state/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import DestinationsSkeleton from "./DestinationsSkeleton";

// ============================================================================
// INDIA TRAVEL FAQS (Fallback when CMS has no custom FAQs)
// ============================================================================
const DEFAULT_INDIA_FAQS = [
  {
    question: "What is the best time to visit India?",
    answer:
      "October to March is the best time for most of India, with cool, comfortable weather for sightseeing. April to June is hot in the plains but good for the hills and tiger safaris. July to September is monsoon season, with lush green landscapes and quieter destinations. The best months depend on the region, so tell us where you want to go and we will advise you.",
  },
  {
    question: "How do we get around India?",
    answer:
      "Most of our trips use a private air-conditioned car with a verified chauffeur, giving you total flexibility for photo stops and your own pace. For long distances we can add high-speed express trains or domestic flights, for example between Delhi and Kerala. We arrange all transfers for you seamlessly.",
  },
  {
    question: "What is the food like, and is it safe to eat?",
    answer:
      "Indian food is varied, flavorful, and world-renowned. Vegetarian options are widely available in every region, and spice levels can always be customized to your preference. Choose freshly cooked food at busy places, drink sealed bottled or filtered water, and tell us about any dietary needs in advance.",
  },
  {
    question: "What should I wear?",
    answer:
      "Light, comfortable cotton clothes work for most of the year. Carry a warm jacket or shawl for winter (November to February) in the north and in the mountains. At temples and religious places, cover your shoulders and knees, and wear slip-on shoes that are easy to remove.",
  },
  {
    question: "Can I do a day trip, for example to the Taj Mahal?",
    answer:
      "Yes. We offer same-day and short trips from Delhi, such as a private Taj Mahal sunrise visit by express car or Gatimaan Express train. Use the duration filter to see short options. Remember that the Taj Mahal is closed to general visitors on Fridays.",
  },
  {
    question: "How many days do I need for India?",
    answer:
      "For a first trip, 7 to 10 days works well for one region, such as the Golden Triangle or Rajasthan. If you want to combine regions, such as Rajasthan palaces plus Kerala backwaters, 12 to 15 days is more comfortable. We can plan shorter or longer trips tailored to your calendar.",
  },
  {
    question: "What are the top attractions in India?",
    answer:
      "Popular highlights include the Taj Mahal in Agra, the forts and royal palaces of Jaipur and Udaipur, the sacred ghats of Varanasi, the backwaters of Kerala, tiger reserves such as Ranthambore, and Himalayan valleys like Shimla and Kashmir.",
  },
  {
    question: "Is India safe for solo travellers and families?",
    answer:
      "Yes, millions of international visitors travel safely across India each year. With a private car, a vetted dedicated chauffeur, licensed guides, and 24/7 on-ground trip support, it is a comfortable and secure choice for families, seniors, and solo or women travelers.",
  },
  {
    question: "What handicrafts can I buy?",
    answer:
      "Popular authentic buys include textiles and block prints, fine jewelry, marble inlay art, blue pottery, carpets, pure spices, and Darjeeling tea. Prices in markets are often negotiable. Your guide can point you to trusted artisan workshops, and you are never forced to visit any shopping stops.",
  },
  {
    question: "Why book with KoiKoi Travel?",
    answer:
      "Every trip is private and tailor-made, featuring verified chauffeurs, licensed specialist guides, and a personal trip manager reachable around the clock on WhatsApp. We eliminate middlemen, do not enforce commission stops, and offer genuine local expertise.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Click 'Get a quote' on any tour package, fill in the form on this page, or message us directly on WhatsApp. Tell us your dates, group size, and hotel preferences, and our travel specialists will build a custom plan for you within 24 hours.",
  },
];

function DestinationTourCard({
  state,
  journeys,
  countrySlug,
  image,
  eyebrow,
}: {
  state: State;
  journeys: Journey[];
  countrySlug: string;
  image: string;
  eyebrow: string;
}) {
  const cleanTitle = (state.title || "").replace(/\s*Tours?$/i, "");
  const displayedJourneys = journeys.slice(0, 5);
  const totalCount = journeys.length;
  const hasMore = totalCount > 5;
  const destinationHref = `/tour-packages/${countrySlug}/${state.slug}`;

  return (
    <div className="group/card flex flex-col bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* 1. Cinematic Header Photo & Luxury Centered Branding */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
        <FallbackImage
          src={image}
          alt={`${cleanTitle} Tour Packages | KoiKoi Travel`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
          fallbackSrc="/logo-with-name.png"
        />

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/25 pointer-events-none" />

        {/* Top-Right Badge: Tour Count (Frosted Glass) */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="px-3 py-1 rounded-full bg-slate-950/65 backdrop-blur-md text-[11px] font-bold text-white border border-white/20 shadow-xs">
            {totalCount} {totalCount === 1 ? "Tour" : "Tours"}
          </span>
        </div>

        {/* Centered Eyebrow & Title Overlay */}
        <div className="absolute inset-0 p-4 z-10 flex flex-col items-center justify-center text-center">
          {eyebrow && (
            <div className="mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/65 backdrop-blur-md border border-white/20 text-white shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F8904D] shadow-[0_0_8px_#F8904D]" />
                <span className="font-semibold text-[11px] sm:text-xs uppercase tracking-wider text-white">
                  {eyebrow}
                </span>
              </div>
            </div>
          )}
          <Link
            href={destinationHref}
            className="group/t inline-block px-2"
          >
            <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wide leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] group-hover/t:text-[#F8904D] transition-colors text-center">
              {cleanTitle} <span className="text-[#F8904D]">Tours</span>
            </h3>
          </Link>
        </div>
      </div>

      {/* 2. Premium Itineraries List with Generous Top-Bottom Spacing */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {displayedJourneys.map((j) => {
            const rawTitle = j.h1Title || j.title || "India Tour Package";
            const hasDaysInTitle = /^\d+\s*Days?/i.test(rawTitle);
            const displayTitle = hasDaysInTitle || !j.noDays
              ? rawTitle
              : `${j.noDays} Days - ${rawTitle}`;

            const routeText =
              j.cities && j.cities.length > 0
                ? j.cities.map((c) => c.title).join(" • ")
                : j.destination || "India";

            return (
              <Link
                key={j.id}
                href={`/tour-packages/${j.slug}`}
                className="group/item flex items-center gap-3.5 px-3 py-2.5 sm:py-3 rounded-xl border border-slate-100 hover:border-[#F8904D]/35 hover:bg-[#FAF8F5] transition-all duration-200 shadow-2xs hover:shadow-xs"
              >
                {/* Clean Thumbnail */}
                <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200/70 shadow-2xs">
                  <FallbackImage
                    src={j.thumbImg || "/logo-with-name.png"}
                    alt={displayTitle}
                    fill
                    sizes="64px"
                    className="object-cover group-hover/item:scale-105 transition-transform duration-300"
                    fallbackSrc="/logo-with-name.png"
                  />
                </div>

                {/* Middle Info: Days in Name + Normal Bold + Clear Spacing */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] sm:text-[13.5px] font-semibold text-slate-800 group-hover/item:text-[#F8904D] transition-colors leading-snug">
                    {displayTitle}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11.5px] text-slate-500 mt-1 font-normal">
                    <MapPin className="w-3 h-3 text-[#F8904D] shrink-0" />
                    <span className="truncate">{routeText}</span>
                  </div>
                </div>

                {/* Right Action: Sleek Circular Arrow Button */}
                <div className="shrink-0 w-8 h-8 rounded-full bg-slate-100 group-hover/item:bg-[#F8904D] text-slate-500 group-hover/item:text-white flex items-center justify-center transition-all duration-200 shadow-2xs">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/item:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* 3. Card Footer */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Showing {displayedJourneys.length} of {totalCount} tours</span>
          </div>
          <Link
            href={destinationHref}
            className="font-semibold text-[#F8904D] hover:text-[#d85511] inline-flex items-center gap-1.5 group/btn hover:underline"
          >
            <span>{hasMore ? `View all ${totalCount} tours` : `View tours`}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CountryDetail({
  slug,
  initialCountry,
  initialStates,
  initialJourneys,
}: {
  slug: string;
  initialCountry?: Country | null;
  initialStates?: StatePage<State> | null;
  initialJourneys?: JourneyPage<Journey> | null;
}) {
  const { country, isLoading } = useCountryBySlug(slug, initialCountry);

  if (isLoading) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-12">
        <DestinationsSkeleton />
      </div>
    );
  }
  if (!country) return notFound();

  return (
    <CountryContent
      country={country}
      initialStates={initialStates}
      initialJourneys={initialJourneys}
    />
  );
}

function CountryContent({
  country,
  initialStates,
  initialJourneys,
}: {
  country: Country;
  initialStates?: StatePage<State> | null;
  initialJourneys?: JourneyPage<Journey> | null;
}) {
  const [activeTab, setActiveTab] = useState<"destination" | "experience">("destination");
  const [isCityTableExpanded, setIsCityTableExpanded] = useState(false);
  const isIndia = country.slug === "india";
  const displayTitle = country.title.replace(/\s*Tour$/i, "") || country.title;
  const hasSeoDesc = Boolean(stripHtml(country.seoDescription).trim());
  const hasMoreDesc = Boolean(stripHtml(country.moreDescription).trim());
  const hasKnowMoreText = hasSeoDesc || hasMoreDesc;

  const pageLinkedHrefs = useMemo(() => new Set<string>(), [country.id]);
  const excludeHrefs = useMemo(
    () => [
      `/tour-packages/${country.slug}`,
      `/${country.slug}`,
      "/tour-packages/india",
      "/india",
    ],
    [country.slug]
  );

  // Synchronously extract lists from server props so SSR immediately has access to items
  const initialStatesList = useMemo<State[]>(() => {
    if (!initialStates) return [];
    if (Array.isArray(initialStates)) return initialStates;
    if (Array.isArray(initialStates.data)) return initialStates.data;
    if (Array.isArray((initialStates as any).items)) return (initialStates as any).items;
    return [];
  }, [initialStates]);

  const initialJourneysList = useMemo<Journey[]>(() => {
    if (!initialJourneys) return [];
    if (Array.isArray(initialJourneys)) return initialJourneys;
    if (Array.isArray(initialJourneys.data)) return initialJourneys.data;
    if (Array.isArray((initialJourneys as any).items)) return (initialJourneys as any).items;
    return [];
  }, [initialJourneys]);

  const { states: clientStates } = useGetStates(
    { countryId: country.id, limit: 100 },
    initialStates
  );

  const { travelExperiences = [] } = useGetTravelExperiences({
    limit: 100,
    isActive: "true",
  });

  const { cities: apiCities = [] } = useGetCities({
    limit: 200,
    isActive: "true",
    countryId: country.id,
  });

  const { journeys: clientJourneys, isLoading: journeysLoading } = useGetJourneys(
    { limit: 100, isActive: "true" },
    initialJourneys
  );

  const states: State[] = clientStates && clientStates.length > 0 ? clientStates : initialStatesList;
  const journeys: Journey[] = clientJourneys && clientJourneys.length > 0 ? clientJourneys : initialJourneysList;

  const countryJourneys = useMemo<Journey[]>(() => {
    return journeys.filter(
      (j: Journey) => j.cities?.some((c) => c.state?.country?.id === country.id)
    );
  }, [journeys, country.id]);

  const journeyCountForState = (stateId: number) => {
    const s = states.find((st: State) => st.id === stateId);
    const directCount = s?.journeys?.length || s?.tourCount || 0;
    const cityCount = countryJourneys.filter((j: Journey) =>
      j.cities?.some((c) => c.state?.id === stateId || s?.cities?.some((sc) => sc.id === c.id))
    ).length;
    return Math.max(directCount, cityCount);
  };

  const displayedStates = useMemo(() => {
    return [...states]
      .filter((s) => {
        const slug = (s.slug || "").toLowerCase().trim();
        const title = (s.title || "").toLowerCase().trim();
        // User requested: exclude Tamil Nadu, Karnataka & Punjab from India page
        if (
          slug === "tamil-nadu" ||
          slug === "tamilnadu" ||
          title.replace(/\s+/g, "").includes("tamilnadu") ||
          slug === "karnataka" ||
          title.replace(/\s+/g, "").includes("karnataka") ||
          slug === "punjab" ||
          title.replace(/\s+/g, "").includes("punjab")
        ) {
          return false;
        }
        // Exclude states hidden from site or inactive
        if (s.showOnSite === false || s.isActive === false) return false;

        // Condition: jinke url / tours open nahi ho rahe unhe hide karo
        const count = journeyCountForState(s.id);
        const hasCities = Boolean((s.cities && s.cities.length > 0) || (s._count?.cities && s._count.cities > 0));
        if (count === 0 && !hasCities) return false;

        return true;
      })
      .sort((a, b) => {
        const aSlug = (a.slug || "").toLowerCase();
        const bSlug = (b.slug || "").toLowerCase();
        const priorityOrder = ["taj-mahal", "golden-triangle", "rajasthan", "kerala", "south-india"];
        const aPri = priorityOrder.indexOf(aSlug);
        const bPri = priorityOrder.indexOf(bSlug);
        if (aPri !== -1 && bPri !== -1) return aPri - bPri;
        if (aPri !== -1) return -1;
        if (bPri !== -1) return 1;

        const aOrder = a.displayOrder && a.displayOrder > 0 ? a.displayOrder : 999;
        const bOrder = b.displayOrder && b.displayOrder > 0 ? b.displayOrder : 999;
        if (aOrder !== bOrder) return aOrder - bOrder;
        return (a.title || "").localeCompare(b.title || "");
      });
  }, [states, countryJourneys]);

  const getDestinationImage = (s: State) => {
    if (s.thumbImg) return s.thumbImg;
    if (s.banner?.images?.[0]) return s.banner.images[0];
    const slug = (s.slug || "").toLowerCase();
    if (slug === "taj-mahal") return "/india/trip/url-banner-thumb-1793419518009-8d41ab.webp";
    if (slug === "golden-triangle") return "/india/trip/desktop-banner-1793421572670-thumb-1793421572676-a2298d.webp";
    if (slug === "rajasthan") return "/india/trip/rajasthan-thumb.webp";
    if (slug === "kerala") return "/india/trip/allerpey-house-boat-1793424353077-thumb-1793424353083-271e0e.webp";
    if (slug === "south-india") return "/india/trip/south-india-1793424596731-thumb-1793424596737-527f4a.webp";
    return "/content/jaipur-holiday-1.webp";
  };

  const getDestinationEyebrow = (s: State) => {
    if (s.banner?.bannerTag) return s.banner.bannerTag;
    const slug = (s.slug || "").toLowerCase();
    if (slug === "taj-mahal") return "HOME OF TAJ MAHAL, INDIA";
    if (slug === "golden-triangle") return "FIRST CHOICE OF TRAVEL IN INDIA";
    if (slug === "rajasthan") return "LAND OF KINGS & PALACES";
    if (slug === "kerala") return "GOD'S OWN COUNTRY";
    if (slug === "south-india") return "TEMPLES & TROPICAL COASTS";
    const cleanTitle = (s.title || "").replace(/\s*Tours?$/i, "");
    return `${cleanTitle.toUpperCase()}, INDIA`;
  };

  const getDestinationDescription = (s: State) => {
    if (s.cardShortDescription) return s.cardShortDescription;
    const slug = (s.slug || "").toLowerCase();
    if (slug === "taj-mahal") return "Agra & Taj Mahal private sightseeing & heritage tours";
    if (slug === "golden-triangle") return "Discover Golden Triangle tours with Delhi, Agra, Jaipur, Taj Mahal, forts and local markets in India";
    if (slug === "rajasthan") return "Jaipur, Udaipur & desert forts private heritage tours";
    if (slug === "kerala") return "Alleppey, Munnar & tropical backwaters private tours";
    if (slug === "south-india") return "Mahabalipuram, Madurai & temple heritage tours";
    const raw = stripHtml(s.overView || "");
    return raw.length > 90 ? `${raw.slice(0, 90)}...` : raw || undefined;
  };

  const getExperienceEyebrow = (exp: any) => {
    if (exp.banner?.bannerTag) return stripHtml(exp.banner.bannerTag);
    const title = exp.title || "";
    if (/wildlife/i.test(title)) return "WILDLIFE & JUNGLE SAFARI";
    if (/heritage/i.test(title)) return "ROYAL HERITAGE & CULTURE";
    if (/honeymoon/i.test(title)) return "ROMANTIC HONEYMOON GETAWAY";
    if (/spiritual/i.test(title)) return "SACRED TEMPLES & PILGRIMAGE";
    if (/ayurveda/i.test(title)) return "HOLISTIC AYURVEDA & YOGA";
    if (/desert/i.test(title)) return "DESERT SAFARI & DUNES";
    if (/family/i.test(title)) return "FAMILY VACATIONS IN INDIA";
    return "HOLIDAY THEME";
  };

  const getExperienceDescription = (exp: any) => {
    const raw = exp.cardShortDescription || exp.overView || exp.description || "";
    const clean = stripHtml(raw).trim();
    return clean.length > 95 ? `${clean.slice(0, 95)}...` : clean || undefined;
  };

  // ==========================================================================
  // 100% SSR-SAFE DESTINATION GROUPS (WITH RESOLVED CANONICAL PACKAGES)
  // ==========================================================================
  const destinationGroups = useMemo(() => {
    return displayedStates
      .map((s) => {
        const { stateJourneys } = resolveStateJourneys(countryJourneys, s);
        return {
          state: s,
          journeys: stateJourneys,
        };
      })
      .filter((g) => g.journeys.length > 0);
  }, [displayedStates, countryJourneys]);

  // ==========================================================================
  // TOP TOURIST CITIES FROM A-Z (100% DYNAMIC FROM API - NO STATIC FALLBACKS)
  // Strict Filtering:
  // 1. City must be explicitly active (isActive !== false && showOnSite !== false)
  // 2. Parent state must exist, be active, belong to this country, and not be excluded
  // 3. City must have at least 1 active tour/journey so its URL actually works and opens
  // ==========================================================================
  const azCityGroups = useMemo(() => {
    const map: Record<string, { title: string; slug: string; stateSlug: string }[]> = {};

    // Excluded states for India page
    const isExcludedState = (sSlug?: string, sTitle?: string) => {
      const slug = (sSlug || "").toLowerCase().trim();
      const title = (sTitle || "").toLowerCase().trim().replace(/\s+/g, "");
      return (
        slug === "tamil-nadu" ||
        slug === "tamilnadu" ||
        title.includes("tamilnadu") ||
        slug === "karnataka" ||
        title.includes("karnataka") ||
        slug === "punjab" ||
        title.includes("punjab")
      );
    };

    // Lookup map of valid active parent states
    const validStateMap = new Map<number | string, State>();
    displayedStates.forEach((s) => {
      if (s.id) validStateMap.set(s.id, s);
      if (s.slug) validStateMap.set(s.slug.toLowerCase(), s);
    });

    // Pool candidate cities from states and apiCities
    const candidateCities: any[] = [];
    states.forEach((s) => {
      if (isExcludedState(s.slug, s.title)) return;
      if (s.isActive === false || s.showOnSite === false) return;
      (s.cities || []).forEach((c) => {
        candidateCities.push({ ...c, state: s });
      });
    });

    apiCities.forEach((c: any) => {
      const parentState = c.state || (c.stateId ? validStateMap.get(c.stateId) : null);
      if (parentState) {
        candidateCities.push({ ...c, state: parentState });
      }
    });

    const seenCitySlugs = new Set<string>();

    candidateCities.forEach((c) => {
      if (!c?.title || !c?.slug) return;
      const cSlug = c.slug.toLowerCase().trim();
      if (seenCitySlugs.has(cSlug)) return;

      const anyCity = c as any;

      // 1. Disable check: do not show if city is disabled or hidden from site
      if (anyCity.isActive === false || anyCity.showOnSite === false) return;

      // 2. Parent state check: must exist, be active, and not excluded
      const stateObj = anyCity.state;
      if (!stateObj || !stateObj.slug) return;
      const sSlug = stateObj.slug.toLowerCase().trim();
      const sTitle = stateObj.title || "";
      if (isExcludedState(sSlug, sTitle)) return;
      if (stateObj.isActive === false || stateObj.showOnSite === false) return;

      // 3. Country match
      const cCountryId = stateObj.country?.id || stateObj.countryId;
      const cCountrySlug = stateObj.country?.slug;
      if (cCountryId && cCountryId !== country.id) return;
      if (cCountrySlug && cCountrySlug !== country.slug) return;

      // 4. Tour/journey check: City MUST have active journeys/tours
      // Excludes cities like Chittorgarh that have 0 tours or inactive pages
      const journeyCount =
        (anyCity._count?.journeys && anyCity._count.journeys > 0) ||
        (anyCity.tourCount && anyCity.tourCount > 0) ||
        (anyCity.journeys && anyCity.journeys.length > 0);

      const hasJourneyInCountry = countryJourneys.some((j: Journey) =>
        j.cities?.some((jc) => jc.id === c.id || jc.slug?.toLowerCase() === cSlug)
      );

      if (!journeyCount && !hasJourneyInCountry) {
        return;
      }

      const cleanTitle = c.title.trim();
      const firstLetter = cleanTitle.charAt(0).toUpperCase();
      if (!firstLetter || !/[A-Z]/.test(firstLetter)) return;

      seenCitySlugs.add(cSlug);

      if (!map[firstLetter]) {
        map[firstLetter] = [];
      }
      map[firstLetter].push({
        title: cleanTitle,
        slug: c.slug,
        stateSlug: stateObj.slug,
      });
    });

    // Sort letters alphabetically and cities within each letter
    const sortedEntries = Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
    sortedEntries.forEach(([, list]) => {
      list.sort((a, b) => a.title.localeCompare(b.title));
    });

    return sortedEntries;
  }, [apiCities, states, displayedStates, countryJourneys, country.id, country.slug]);

  const totalCitiesCount = useMemo(() => {
    return azCityGroups.reduce((acc, [, list]) => acc + list.length, 0);
  }, [azCityGroups]);

  // Hero Banners Data
  const { data: heroBannersData } = useHeroBanners("Country", {
    slug: country.slug,
    entityId: country.id,
  });
  const customHeroBanners = heroBannersData?.data || [];

  const heroImages =
    customHeroBanners.length > 0
      ? customHeroBanners.map((b) => b.image)
      : country.banner?.images?.length
      ? country.banner.images
      : country.thumbImg
      ? [country.thumbImg]
      : ["/banners/home-comic-banner.webp"];

  const heroSlides =
    customHeroBanners.length > 0
      ? customHeroBanners.map((b) => ({ image: b.image, mobileImage: b.mobileImage }))
      : heroImages.map((img: string) => ({ image: img, mobileImage: null }));

  const heroTitle =
    customHeroBanners[0]?.title ||
    country.banner?.bannerTitle ||
    country.h1Title ||
    "India Tour Packages, Tailor-Made For You";

  const heroTag =
    customHeroBanners[0]?.subtitle ||
    country.banner?.bannerTag ||
    "Incredible India • Private Journeys";

  const heroSubtitle =
    country.seoDescription?.trim() ||
    (isIndia
      ? "Explore the beauty of India Tour - explore the diverse culture, historic monuments, and beautiful landscapes. Book the best India Tour tour packages with KoiKoi Travel for a peaceful vacation!"
      : country.overView || `Explore the beauty of ${displayTitle} with KoiKoi Travel.`);

  // Combined FAQs (Curated Benchmark + CMS)
  const allFaqs = useMemo(() => {
    if (country.faqs && country.faqs.length > 0) {
      return country.faqs.map((f: any) => ({
        question: f.question || f.ques || "",
        answer: f.answer || f.ans || "",
      }));
    }
    return DEFAULT_INDIA_FAQS;
  }, [country.faqs]);

  // Schema.org FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1C1C1C] min-h-screen font-sans selection:bg-[#F8904D]/20 selection:text-[#F8904D]">
      {/* Schema.org FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ====================================================================== */}
      {/* 1. HERO BANNER                                                         */}
      {/* ====================================================================== */}
      <HeroBanner
        slides={heroSlides}
        fallbackImage={country.thumbImg || country.banner?.images?.[0]}
        alt={country.title}
        tag={heroTag}
        title={heroTitle}
      />

      {/* ===== BREADCRUMB (BELOW HERO) ===== */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200/80 bg-slate-50/80 backdrop-blur-xs">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-3 flex flex-wrap items-center gap-1.5 text-[13px] text-slate-500 font-medium">
          <Link href="/" className="hover:text-[#2E8B8B] transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight size={13} className="text-slate-400 shrink-0" />
          <Link href="/tour-packages" className="hover:text-[#2E8B8B] transition-colors shrink-0">
            Tour Packages
          </Link>
          <ChevronRight size={13} className="text-slate-400 shrink-0" />
          <span className="text-slate-900 font-semibold">{country.h1Title || country.title}</span>
        </div>
      </nav>

      {/* ====================================================================== */}
      {/* 1. EDITORIAL INTRO SECTION (FULL-WIDTH LUXURY VIEW)                    */}
      {/* ====================================================================== */}
      <section className="py-10 sm:py-14 md:py-16 bg-[#FAF8F5] border-b border-section-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="w-full">
            {/* Header: Tag, Styled H1 & Subheading (Matches Home Page Hierarchy) */}
            <div>
              <SectionLabel>{isIndia ? "Incredible India" : `Explore ${displayTitle}`}</SectionLabel>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mt-2">
                Travel to <span className="text-[#F8904D]">{displayTitle}</span>
              </h1>
              <p className="mt-2 text-lg sm:text-xl font-semibold text-slate-800">
                Which {displayTitle} Will You Travel Through?
              </p>
            </div>

            {/* Full-Width Content */}
            <p className="text-base sm:text-lg md:text-xl text-slate-800 font-medium mt-4 leading-relaxed">
              <strong className="font-bold text-slate-900">India is not one trip.</strong> A week in{" "}
              <strong className="font-bold text-slate-900">Rajasthan</strong>, a fortnight in{" "}
              <strong className="font-bold text-slate-900">Kerala</strong> and a few days in the{" "}
              <strong className="font-bold text-slate-900">Himalayas</strong> can feel like three different countries, each with its own food, language and pace. That is why we do not sell one fixed route. We start with what you want from your holiday, then build the journey around it.
            </p>

            <div className="mt-4 space-y-4 text-sm sm:text-base md:text-[16.5px] text-slate-700 leading-relaxed font-normal">
              <p>
                If you love palaces and living history,{" "}
                <strong className="font-bold text-slate-900">Rajasthan and the Golden Triangle</strong> are a natural fit. If you want calm,{" "}
                <strong className="font-bold text-slate-900">Kerala&apos;s backwaters and tea hills</strong> slow everything down. For{" "}
                <strong className="font-bold text-slate-900">wildlife</strong>,{" "}
                <strong className="font-bold text-slate-900">spiritual cities</strong> or{" "}
                <strong className="font-bold text-slate-900">mountain air</strong>, there is a route for that too. Not sure where to begin? Tell us your dates and what you enjoy, and we will suggest a plan.
              </p>

              <p>
                <strong className="font-bold text-slate-900">Every trip is private or small-group</strong>, with a personal trip manager on WhatsApp. Prices are quoted for your dates and hotel level, with{" "}
                <strong className="font-bold text-slate-900">no hidden charges</strong> and{" "}
                <strong className="font-bold text-slate-900">no forced shopping stops</strong>.
              </p>
            </div>

            {/* Expandable A-Z Tour Cities Directory (Inside Section - Default Collapsed, 100% SSR Safe) */}
            {azCityGroups.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-200/80">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Explore {displayTitle} Tour Cities from A-Z
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Browse our comprehensive directory of tourist cities across {displayTitle}.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCityTableExpanded(!isCityTableExpanded)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-800 hover:text-[#F8904D] bg-white hover:bg-slate-50 border border-slate-300 transition-all cursor-pointer shadow-2xs shrink-0 self-start sm:self-auto"
                  >
                    <span>
                      {isCityTableExpanded
                        ? "Hide Cities List"
                        : `Browse Cities from A-Z (${totalCitiesCount} cities)`}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isCityTableExpanded && "rotate-180"
                      )}
                    />
                  </button>
                </div>

                {/* 100% SSR SEO Guarantee: Rendered in HTML for Googlebot, toggled via CSS */}
                <div
                  className={cn(
                    "mt-4 transition-all duration-300",
                    isCityTableExpanded ? "block" : "hidden"
                  )}
                  aria-hidden={!isCityTableExpanded}
                >
                  <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100/80 border-b border-slate-200 text-xs sm:text-[13px] font-bold text-slate-700">
                            <th className="w-16 sm:w-20 p-3 sm:p-3.5 border-r border-slate-200 text-center font-bold">
                              Letter
                            </th>
                            <th className="p-3 sm:p-3.5 pl-4 sm:pl-6 font-bold">
                              City List
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {azCityGroups.map(([letter, cityList]) => (
                            <tr
                              key={letter}
                              className="border-b border-slate-200/70 last:border-b-0 hover:bg-slate-50/60 transition-colors"
                            >
                              <td className="w-16 sm:w-20 p-3 sm:p-3.5 border-r border-slate-200 text-center align-top font-bold text-slate-900 text-sm sm:text-base bg-slate-50/40">
                                {letter}
                              </td>
                              <td className="p-3 sm:p-3.5 pl-4 sm:pl-6 align-top text-xs sm:text-[13.5px] leading-relaxed text-slate-600">
                                {cityList.map((c, i) => {
                                  const href = c.stateSlug
                                    ? `/tour-packages/${country.slug}/${c.stateSlug}/${c.slug}`
                                    : `/tour-packages?city=${c.slug}`;

                                  return (
                                    <span key={`${c.slug}-${i}`}>
                                      <Link
                                        href={href}
                                        className="text-slate-800 hover:text-[#F8904D] hover:underline underline-offset-2 transition-colors font-medium"
                                      >
                                        {c.title}
                                      </Link>
                                      {i < cityList.length - 1 && (
                                        <span className="text-slate-400 mr-1.5">, </span>
                                      )}
                                    </span>
                                  );
                                })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 2. TOURS BY DESTINATION & BY EXPERIENCE (WITH CAPSULE TABS & 100% SSR) */}
      {/* ====================================================================== */}
      <section id="tour-packages" className="py-10 sm:py-14 md:py-16 bg-white border-b border-section-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <SectionLabel>Curated Itineraries</SectionLabel>
              <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-slate-900 tracking-tight mt-1.5 font-heading">
                Explore <span className="text-[#F8904D]">{displayTitle}</span> Tours
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
                Discover iconic royal cities, peaceful lakes, desert landscapes, and holiday themes with handpicked private itineraries.
              </p>
            </div>

            {/* Tabs Switcher */}
            <div className="flex justify-start sm:justify-end shrink-0">
              <CapsuleTabs<"destination" | "experience">
                tabs={[
                  { id: "destination", label: "By destination" },
                  { id: "experience", label: "By experience" },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
            </div>
          </div>

          {/* TAB 1: BY DESTINATION (3-Column Grid) - 100% SSR Crawlable */}
          <div
            className={activeTab === "destination" ? "block" : "hidden"}
            aria-hidden={activeTab !== "destination"}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinationGroups.map(({ state, journeys: stJourneys }) => (
                <DestinationTourCard
                  key={state.id}
                  state={state}
                  journeys={stJourneys}
                  countrySlug={country.slug}
                  image={getDestinationImage(state)}
                  eyebrow={getDestinationEyebrow(state)}
                />
              ))}
            </div>
          </div>

          {/* TAB 2: BY EXPERIENCE (5-Column Grid) - 100% SSR Crawlable */}
          <div
            className={activeTab === "experience" ? "block" : "hidden"}
            aria-hidden={activeTab !== "experience"}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
              {travelExperiences.map((exp) => (
                <SingleDestinationReusableCard
                  key={exp.id}
                  title={exp.title}
                  image={exp.thumbImg || exp.banner?.images?.[0] || "/content/jaipur-holiday-1.webp"}
                  eyebrow={getExperienceEyebrow(exp)}
                  description={getExperienceDescription(exp)}
                  tourCountText={`${exp.journeys?.length || exp.tourCount || 0} tours`}
                  href={`/travel-experiences/${exp.slug}`}
                />
              ))}
            </div>
          </div>

          {/* Custom DMC Pricing & Trust Note */}
          <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-section-tint border border-section-border text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div>
              <h4 className="text-sm sm:text-base md:text-lg font-bold text-slate-900">
                Looking for a 100% tailor-made private journey in India?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Prices depend on your travel dates, group size, and preferred hotel level. Connect with your dedicated personal trip manager.
              </p>
            </div>
            <QuoteModal>
              <button
                type="button"
                className="shrink-0 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-[#F8904D] transition-colors cursor-pointer shadow-xs"
              >
                Ask for your quote →
              </button>
            </QuoteModal>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 3. FAQ SECTION (STRICT 2-BG ALTERNATION: PATTERN / TINT)               */}
      {/* ====================================================================== */}
      <FaqSection
        faqs={allFaqs}
        contextName={displayTitle}
        contextSlug={country.slug}
        entityType="Country"
        sharedLinkedHrefs={pageLinkedHrefs}
        excludeHrefs={excludeHrefs}
        bgType="pattern"
      />

      {/* ====================================================================== */}
      {/* 4. DESTINATION GUIDE (STRICT 2-BG ALTERNATION: WHITE)                  */}
      {/* ====================================================================== */}
      <DestinationGuideSection
        title={country.h1Title || country.title || "Incredible India"}
        badgeLabel="DESTINATION OVERVIEW"
        moreDescription={country.moreDescription}
        seoDescription={country.seoDescription}
        sharedLinkedHrefs={pageLinkedHrefs}
        excludeHrefs={excludeHrefs}
        className="w-full relative border-t border-section-border py-10 sm:py-12 md:py-14 bg-white"
      />
    </div>
  );
}
