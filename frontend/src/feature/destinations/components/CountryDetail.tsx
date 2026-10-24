"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import Image from "next/image";
import {
  MapPin,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CalendarDays,
  Building2,
  Languages,
  Coins,
  Calendar,
  Clock,
  Globe,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sun,
  Compass,
  PhoneCall,
  Star,
  Users,
} from "lucide-react";
import { useCountryBySlug } from "@/feature/country/api/useCountry";
import { useGetStates } from "@/feature/state/api/useState";
import { useGetCities } from "@/feature/city/api/useCity";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import DestinationSlider, { useSliderControl } from "@/components/shared/DestinationSlider";
import HeroSlider from "@/components/shared/HeroSlider";
import { useHeroBanners } from "@/feature/heroBanner/api";
import { FallbackImage } from "@/components/shared/FallbackImage";
import RichContent from "@/components/shared/RichContent";
import ToursSection from "@/components/shared/ToursSection";
import TravelGuideCollapsible from "@/components/shared/TravelGuideCollapsible";
import FilterBar from "@/components/shared/FilterBar";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { formatToursH1, stripHtml } from "@/lib/utils";
import {
  travelExperienceOptions,
  durationOptions,
  journeyMatchesExperiences,
  journeyMatchesDuration,
  journeyMatchesSeasons,
  journeyPackageHref,
} from "@/feature/journey/filterOptions";
import type { Country } from "@/feature/country/type";
import type { State, PaginatedResponse as StatePage } from "@/feature/state/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import StateCard from "./StateCard";
import DestinationsSkeleton from "./DestinationsSkeleton";
import FaqSection from "@/feature/home/components/FaqSection";

// ============================================================================
// AUDLEY TRAVEL BENCHMARK DATA: ICONIC REGIONS / CIRCUITS
// ============================================================================
const ICONIC_REGIONS = [
  {
    id: "golden-triangle",
    title: "Golden Triangle & Tigers",
    tag: "Iconic Circuit #1",
    route: "Delhi • Agra • Jaipur • Ranthambore",
    description: "Mughal grandeur, sunrise at the Taj Mahal, Jaipur's Amber Fort, and private tiger safaris.",
    image: "/banners/golden-triangle-comic-banner.webp",
    fallbackImage: "/content/3-days-jaipur-agra-tirp-from-delhi-golden-triangle-holiday-3.webp",
    href: "/travel-experiences/golden-triangle-tour-india",
    highlights: ["Taj Mahal at Dawn", "Amer Fort Elephant/Jeep", "Ranthambore Royal Bengal Tigers"],
  },
  {
    id: "rajasthan",
    title: "Royal Rajasthan & Thar Desert",
    tag: "Land of Maharajas",
    route: "Jaipur • Jodhpur • Udaipur • Jaisalmer",
    description: "Centuries-old cliffside fortresses, romantic lake palaces, golden sand dunes, and living royal heritage.",
    image: "/banners/rajasthan-comic-banner.webp",
    fallbackImage: "/content/rajasthan-tours-holiday-1.webp",
    href: "/tour-packages/india/rajasthan",
    highlights: ["Udaipur Lake Pichola Cruise", "Mehrangarh Fort Jodhpur", "Thar Desert Luxury Camping"],
  },
  {
    id: "kerala",
    title: "Kerala Backwaters & Coast",
    tag: "God's Own Country",
    route: "Kochi • Munnar • Alleppey • Kovalam",
    description: "Emerald tea terraces, slow private houseboat cruises through coconut canals, and authentic Ayurvedic wellness.",
    image: "/banners/kerala-comic-banner.webp",
    fallbackImage: "/content/kerala-holiday-1.webp",
    href: "/tour-packages/india/kerala",
    highlights: ["Overnight Private Houseboat", "Munnar Mist-Clad Tea Hills", "Ayurvedic Rejuvenation"],
  },
  {
    id: "himalayas-spiritual",
    title: "Himalayas & Sacred Ganges",
    tag: "Spiritual & Mountain Trails",
    route: "Varanasi • Rishikesh • Shimla • Amritsar",
    description: "Dusk Ganga Aarti ceremonies in Varanasi, Himalayan Toy Train rides, and the soul-stirring Golden Temple.",
    image: "/banners/spiritual-comic-banner.webp",
    fallbackImage: "/content/varanasi-holiday-5.webp",
    href: "/travel-experiences/spiritual",
    highlights: ["Varanasi Evening Ganga Aarti", "Shimla Heritage Toy Train", "Amritsar Golden Temple"],
  },
];

// ============================================================================
// AUDLEY TRAVEL BENCHMARK DATA: PLACES TO VISIT (CITY-BY-CITY DIRECTORY)
// ============================================================================
interface CitySpotlight {
  name: string;
  state: string;
  region: "golden-triangle" | "rajasthan" | "kerala" | "himalayas";
  tag: string;
  image: string;
  href: string;
  highlight: string;
  tourCount?: number;
}

const TOP_CITIES_SPOTLIGHT: CitySpotlight[] = [
  {
    name: "Jaipur",
    state: "Rajasthan",
    region: "rajasthan",
    tag: "The Pink City",
    image: "/content/jaipur-holiday-1.webp",
    href: "/tour-packages/india/rajasthan/jaipur",
    highlight: "Amber Fort, Hawa Mahal & artisan jewelry bazaars",
  },
  {
    name: "Agra",
    state: "Uttar Pradesh",
    region: "golden-triangle",
    tag: "Home of Taj Mahal",
    image: "/content/taj-mahal-holiday-4.webp",
    href: "/tour-packages/india/uttar-pradesh/agra",
    highlight: "Taj Mahal sunrise, Agra Fort & Mehtab Bagh gardens",
  },
  {
    name: "Delhi",
    state: "Delhi NCR",
    region: "golden-triangle",
    tag: "Historic Capital",
    image: "/content/3-days-delhi-agra-jaipur-tirp-from-delhi-holiday-1.webp",
    href: "/tour-packages/india/delhi",
    highlight: "Old Delhi rickshaw ride, Humayun Tomb & Qutub Minar",
  },
  {
    name: "Udaipur",
    state: "Rajasthan",
    region: "rajasthan",
    tag: "Venice of the East",
    image: "/content/udaipur-holiday-1.webp",
    href: "/tour-packages/india/rajasthan/udaipur",
    highlight: "Lake Pichola boat cruise & grand City Palace complex",
  },
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    region: "himalayas",
    tag: "Spiritual Capital",
    image: "/content/varanasi-holiday-2.webp",
    href: "/tour-packages/india/uttar-pradesh/varanasi",
    highlight: "Dawn boat ride on the sacred Ganges & dusk Ganga Aarti",
  },
  {
    name: "Kochi",
    state: "Kerala",
    region: "kerala",
    tag: "Queen of Arabian Sea",
    image: "/content/kochi-holiday-1.webp",
    href: "/tour-packages/india/kerala/kochi",
    highlight: "Chinese fishing nets, Fort Kochi & spice warehouses",
  },
  {
    name: "Munnar",
    state: "Kerala",
    region: "kerala",
    tag: "Misty Tea Haven",
    image: "/content/munnar-holiday-1.webp",
    href: "/tour-packages/india/kerala/munnar",
    highlight: "Rolling tea plantations, cool mountain breeze & waterfalls",
  },
  {
    name: "Alleppey",
    state: "Kerala",
    region: "kerala",
    tag: "Backwater Capital",
    image: "/content/alleppey-holiday-1.webp",
    href: "/tour-packages/india/kerala/alleppey",
    highlight: "Private Kettuvallam houseboats gliding through palm canals",
  },
  {
    name: "Jodhpur",
    state: "Rajasthan",
    region: "rajasthan",
    tag: "The Blue City",
    image: "/content/jodhpur-holiday-1.webp",
    href: "/tour-packages/india/rajasthan/jodhpur",
    highlight: "Towering Mehrangarh Fort & indigo-painted old town",
  },
  {
    name: "Jaisalmer",
    state: "Rajasthan",
    region: "rajasthan",
    tag: "The Golden City",
    image: "/content/jaisalmer-holiday-1.webp",
    href: "/tour-packages/india/rajasthan/jaisalmer",
    highlight: "Living sandstone fort & sunset camel safari on dunes",
  },
  {
    name: "Shimla",
    state: "Himachal Pradesh",
    region: "himalayas",
    tag: "Colonial Summer Capital",
    image: "/content/shimla-holiday-1.webp",
    href: "/tour-packages/india/himachal-pradesh/shimla",
    highlight: "UNESCO Toy Train, colonial Mall Road & pine mountain vistas",
  },
  {
    name: "Amritsar",
    state: "Punjab",
    region: "himalayas",
    tag: "City of Golden Temple",
    image: "/content/amritsar-holiday-1.webp",
    href: "/tour-packages/india/punjab/amritsar",
    highlight: "Sacred Golden Temple illuminated at night & Wagah border",
  },
];

// ============================================================================
// AUDLEY TRAVEL BENCHMARK: WHEN TO VISIT SEASONS
// ============================================================================
const SEASONS_DATA = [
  {
    title: "October to March",
    badge: "The Golden Season (Recommended)",
    weather: "18°C – 28°C • Bright sunshine & crisp cool evenings",
    description: "The ideal window for first-time visitors to India. Enjoy comfortable sightseeing across Delhi, Agra, and the forts of Rajasthan. Kerala backwaters are calm and inviting, and major cultural festivals like Diwali, Pushkar Fair, and Holi unfold during this period.",
    idealFor: ["Golden Triangle tours", "Rajasthan desert & palaces", "Kerala houseboat cruises", "Wildlife safaris"],
    highlight: "Peak Travel Window",
  },
  {
    title: "April to June",
    badge: "Wildlife & Himalayan Retreats",
    weather: "Hot in central plains • 15°C – 25°C in the mountains",
    description: "While the plains heat up, this is the single best time of the year for wildlife enthusiasts to spot Royal Bengal Tigers in Ranthambore, Bandhavgarh, and Corbett, as animals congregate around diminishing waterholes. It is also the perfect time to retreat into the cool pine valleys of Shimla, Manali, and Ladakh.",
    idealFor: ["Royal Bengal Tiger safaris", "Shimla & Manali mountain escapes", "Ladakh high-altitude passes"],
    highlight: "Best Tiger Sightings",
  },
  {
    title: "July to September",
    badge: "Monsoon Magic & High Himalayas",
    weather: "Warm tropical rains • Fresh green countryside",
    description: "Monsoons bring India's nature roaring back to life with roaring waterfalls, emerald tea gardens, and lush countryside. This is considered the authentic rejuvenation season for Ayurvedic wellness treatments in Kerala. High-altitude Ladakh in the far north remains arid and dry, offering spectacular summer mountain journeys.",
    idealFor: ["Authentic Kerala Ayurveda retreats", "Ladakh road trips & monasteries", "Valley of Flowers trekking"],
    highlight: "Ayurveda & High Himalayas",
  },
];

// ============================================================================
// THE KOIKOI BESPOKE DIFFERENCE (4 LUXURY DMC PILLARS)
// ============================================================================
const BESPOKE_PILLARS = [
  {
    title: "100% Tailor-Made & Flexible",
    description: "No rigid bus schedules or crowded groups. Every route, hotel, and private activity is customized specifically to your travel pace, preferences, and interests.",
    icon: Compass,
  },
  {
    title: "Private Chauffeur & Sanitized Fleet",
    description: "Travel with complete peace of mind in a private, air-conditioned executive vehicle with a professional, vetted English-speaking chauffeur throughout.",
    icon: ShieldCheck,
  },
  {
    title: "Handpicked Heritage Palaces & Havens",
    description: "We bypass bland international hotel chains in favor of authentic royal palaces, boutique colonial havelis, and luxury private backwater houseboats.",
    icon: Sparkles,
  },
  {
    title: "24/7 Dedicated India Concierge",
    description: "From the moment you step off your plane at Delhi or Mumbai until your flight home, our team provides 24/7 on-trip assistance and dedicated support.",
    icon: PhoneCall,
  },
];

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
      <div className="max-w-[1600px] mx-auto px-6 py-12">
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

  const { states, isLoading: statesLoading } = useGetStates(
    { countryId: country.id, limit: 100 },
    initialStates
  );

  const { cities: dbCities, isLoading: citiesLoading } = useGetCities({
    countryId: country.id,
    limit: 100,
    isActive: "true",
  });

  const { journeys, isLoading: journeysLoading } = useGetJourneys(
    { limit: 100, isActive: "true" },
    initialJourneys
  );

  const countryJourneys = journeys.filter(
    (j) => j.cities?.some((c) => c.state?.country?.id === country.id)
  );

  const journeyCountForState = (stateId: number) =>
    countryJourneys.filter((j) => j.cities?.some((c) => c.state?.id === stateId)).length;

  const displayedStates = useMemo(() => {
    return [...states].sort((a, b) => {
      const aOrder = a.displayOrder && a.displayOrder > 0 ? a.displayOrder : 999;
      const bOrder = b.displayOrder && b.displayOrder > 0 ? b.displayOrder : 999;
      return aOrder - bOrder;
    });
  }, [states]);

  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [expSelected, setExpSelected] = useState<string[]>([]);
  const [seasonSelected, setSeasonSelected] = useState<string[]>([]);
  const [durSelected, setDurSelected] = useState<string[]>([]);
  const [cityTab, setCityTab] = useState<string>("all");

  const stateOptionsList = useMemo(() => {
    const map = new Map<string, { value: string; label: string; count: number }>();
    for (const s of displayedStates) {
      const count = journeyCountForState(s.id) || (s.tourCount || 0);
      map.set(s.title, { value: s.title, label: s.title, count });
    }
    return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
  }, [displayedStates, countryJourneys]);

  const cityOptionsList = useMemo(() => {
    const map = new Map<string, { value: string; label: string; count: number }>();
    for (const j of countryJourneys) {
      for (const c of j.cities ?? []) {
        const entry = map.get(c.slug);
        if (entry) entry.count += 1;
        else map.set(c.slug, { value: c.slug, label: c.title, count: 1 });
      }
    }
    return [...map.values()].sort((a, b) => b.count - a.count);
  }, [countryJourneys]);

  const filteredJourneys = countryJourneys.filter((j) => {
    if (selectedStates.length > 0) {
      const st = j.cities?.[0]?.state?.title;
      if (!st || !selectedStates.includes(st)) return false;
    }
    if (selectedCities.length > 0) {
      const slugs = new Set(selectedCities);
      if (!(j.cities ?? []).some((c) => slugs.has(c.slug))) return false;
    }
    if (!journeyMatchesExperiences(j, expSelected)) return false;
    if (!journeyMatchesSeasons(j, seasonSelected)) return false;
    if (!journeyMatchesDuration(j, durSelected)) return false;
    return true;
  });

  const activeFilterCount =
    selectedStates.length +
    selectedCities.length +
    expSelected.length +
    seasonSelected.length +
    durSelected.length;

  const clearFilters = () => {
    setSelectedStates([]);
    setSelectedCities([]);
    setExpSelected([]);
    setSeasonSelected([]);
    setDurSelected([]);
  };

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

  const heroTitle =
    customHeroBanners[0]?.title ||
    country.banner?.bannerTitle ||
    country.h1Title ||
    (isIndia ? "India Private Tours & Tailor-Made Holidays" : displayTitle);

  const heroTag =
    customHeroBanners[0]?.subtitle ||
    country.banner?.bannerTag ||
    (isIndia ? "Incredible India • Private Journeys" : "");

  const facts = [
    { icon: Building2, label: "Capital", value: country.capital },
    { icon: Languages, label: "Language", value: country.language },
    { icon: Coins, label: "Currency", value: country.currency },
    { icon: Calendar, label: "Best Time", value: country.bestTimeToVisit },
    { icon: Globe, label: "Timezone", value: country.timezone },
    { icon: Clock, label: "Dial Code", value: country.dialCode },
  ].filter((f) => f.value);

  const hasTopPackages = countryJourneys.filter((j) => (j.displayOrder ?? 0) > 0).length > 0;
  const hasSidebar = facts.length > 0 || hasTopPackages;
  const showMoreSection = hasKnowMoreText || hasSidebar;

  const { swiperRef: statesSwiperRef, slidePrev, slideNext, canScroll } = useSliderControl();

  const filterBar = (
    <FilterBar
      sections={[
        {
          id: "state",
          title: "State",
          options: stateOptionsList,
          selected: selectedStates,
          onChange: setSelectedStates,
        },
        {
          id: "city",
          title: "Destination",
          icon: <MapPin size={14} />,
          options: cityOptionsList,
          selected: selectedCities,
          onChange: setSelectedCities,
        },
        {
          id: "experience",
          title: "Travel Experience",
          icon: <Sparkles size={14} />,
          options: travelExperienceOptions(countryJourneys),
          selected: expSelected,
          onChange: setExpSelected,
        },
        {
          id: "duration",
          title: "Duration",
          icon: <CalendarDays size={14} />,
          options: durationOptions(countryJourneys),
          selected: durSelected,
          onChange: setDurSelected,
        },
      ]}
      activeCount={activeFilterCount}
      onClearAll={clearFilters}
      resultCount={filteredJourneys.length}
      totalCount={countryJourneys.length}
    />
  );

  const displayedCitiesSpotlight = useMemo(() => {
    // 100% Dynamic from Database (City table)
    if (dbCities && dbCities.length > 0) {
      const sorted = [...dbCities].sort((a, b) => {
        const aTours = a.tourCount || 0;
        const bTours = b.tourCount || 0;
        if (bTours !== aTours) return bTours - aTours;
        return (a.displayOrder && a.displayOrder > 0 ? a.displayOrder : 999) - (b.displayOrder && b.displayOrder > 0 ? b.displayOrder : 999);
      });

      const mapped = sorted.map((c) => {
        const stateSlug = c.state?.slug || "";
        let region = "all";
        if (["rajasthan"].includes(stateSlug)) region = "rajasthan";
        else if (["kerala", "tamil-nadu", "karnataka", "goa"].includes(stateSlug)) region = "kerala";
        else if (["himachal-pradesh", "uttarakhand", "jammu-and-kashmir", "ladakh", "punjab"].includes(stateSlug)) region = "himalayas";
        else if (["delhi", "uttar-pradesh"].includes(stateSlug)) region = "golden-triangle";

        const href = c.state?.slug ? `/tour-packages/india/${c.state.slug}/${c.slug}` : `/tour-packages/india/${c.slug}`;
        const tag = c.banner?.bannerTag || c.h1Title || c.state?.title || "Heritage City";
        const image = c.thumbImg || c.banner?.images?.[0] || "/content/jaipur-holiday-1.webp";
        const highlight = c.attractions || c.famousFor?.replace(/<[^>]+>/g, "").slice(0, 90) || `${c.title} private sightseeing & heritage tours`;

        return {
          id: c.id,
          name: c.title,
          state: c.state?.title || "",
          region,
          tag,
          image,
          href,
          highlight,
          tourCount: c.tourCount || 0,
        };
      });

      if (cityTab === "all") return mapped.slice(0, 18);
      return mapped.filter((c) => c.region === cityTab).slice(0, 18);
    }

    if (cityTab === "all") return TOP_CITIES_SPOTLIGHT;
    return TOP_CITIES_SPOTLIGHT.filter((c) => c.region === cityTab);
  }, [dbCities, cityTab]);

  return (
    <div className="bg-white">
      {/* ====================================================================== */}
      {/* 1. AUDLEY-STYLE EDITORIAL HERO BANNER                                  */}
      {/* ====================================================================== */}
      <section className="relative w-full h-[56vw] min-h-[360px] max-h-[520px] md:h-[520px] lg:h-[560px] md:max-h-none overflow-hidden bg-slate-900">
        {heroImages.length > 0 ? (
          <>
            <HeroSlider images={heroImages} alt={displayTitle} />
            {/* Subtle overlay so illustrated artwork colors and center text stay legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/35 z-10 pointer-events-none" />
          </>
        ) : (
          <div className="absolute inset-0">
            <FallbackImage
              src={country.thumbImg || country.banner?.images?.[0] || "/banners/home-comic-banner.webp"}
              alt={displayTitle}
              fill
              priority
              className="object-fit object-center"
              theme="dark"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/35 z-10 pointer-events-none" />
          </div>
        )}

        {/* Hero Content (Centered Audley Travel Style) */}
        <div className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 h-full flex flex-col justify-center items-center py-6 sm:py-8 text-center">
          {heroTag && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/25 mb-3 sm:mb-4 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#F8904D] shadow-[0_0_10px_#F8904D]" />
              <span className="font-luxury font-bold text-xs sm:text-[13px] uppercase tracking-[0.24em] text-white">
                {heroTag}
              </span>
            </div>
          )}

          <h1 className="font-luxury text-[42px] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[62px] font-black uppercase text-white tracking-wide drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)] max-w-5xl">
            {heroTitle}
          </h1>

          <p className="mt-3 sm:mt-4 text-white/95 text-sm sm:text-base md:text-lg max-w-3xl font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Handcrafted private journeys across royal palaces, sacred rivers, tranquil backwaters and wild tiger sanctuaries. Tailored 100% to your pace.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <QuoteModal>
              <button
                type="button"
                className="font-outfit px-6 py-2.5 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-bold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Plan Your Tailor-Made Trip</span>
                <ArrowRight size={15} />
              </button>
            </QuoteModal>

            <a
              href="#circuits"
              className="font-outfit px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm transition-all"
            >
              Explore Iconic Circuits
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 2. AUDLEY-STYLE QUICK JUMP SUB-NAV BAR (STICKY)                        */}
      {/* ====================================================================== */}
      <nav aria-label="Country Navigation" className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between overflow-x-auto no-scrollbar py-3 gap-6 text-[13px] font-semibold text-slate-600">
          <div className="flex items-center gap-6 shrink-0">
            {isIndia && (
              <>
                <a href="#circuits" className="hover:text-[#F8904D] transition-colors whitespace-nowrap">
                  Iconic Circuits
                </a>
                <a href="#places" className="hover:text-[#F8904D] transition-colors whitespace-nowrap">
                  Places to Visit
                </a>
              </>
            )}
            <a href="#tours" className="hover:text-[#F8904D] transition-colors whitespace-nowrap">
              Tailor-Made Packages ({countryJourneys.length})
            </a>
            {isIndia && (
              <>
                <a href="#timing" className="hover:text-[#F8904D] transition-colors whitespace-nowrap">
                  When to Visit
                </a>
                <a href="#difference" className="hover:text-[#F8904D] transition-colors whitespace-nowrap">
                  The KoiKoi Difference
                </a>
              </>
            )}
            <a href="#states" className="hover:text-[#F8904D] transition-colors whitespace-nowrap">
              States of {displayTitle} ({displayedStates.length})
            </a>
            {showMoreSection && (
              <a href="#guide" className="hover:text-[#F8904D] transition-colors whitespace-nowrap">
                Travel Guide & FAQs
              </a>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <QuoteModal>
              <button
                type="button"
                className="text-xs font-bold text-[#F8904D] bg-[#F8904D]/10 hover:bg-[#F8904D]/20 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                Request Custom Itinerary
              </button>
            </QuoteModal>
          </div>
        </div>
      </nav>

      {/* ====================================================================== */}
      {/* 3. BREADCRUMB                                                          */}
      {/* ====================================================================== */}
      <div className="bg-slate-50 border-b border-slate-200/60 py-2.5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-[#2E8B8B] transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="text-slate-300" />
          <Link href="/destinations" className="hover:text-[#2E8B8B] transition-colors">
            Destinations
          </Link>
          <ChevronRight size={12} className="text-slate-300" />
          <span className="text-slate-900 font-semibold">{displayTitle}</span>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 4. AUDLEY PILLAR 1: EXPLORE INDIA BY REGION & ICONIC CIRCUITS          */}
      {/* ====================================================================== */}
      {isIndia && (
        <section id="circuits" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/70">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#F8904D]">
                <Compass size={14} /> Iconic Inbound Circuits
              </span>
              <h2 className="text-2xl sm:text-4xl font-luxury font-black text-slate-900 mt-2 uppercase">
                Explore India by Region
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                Whether you dream of royal Rajput palaces, sunrise over the Taj Mahal, misty tea hills, or tranquil backwaters — our specialists design seamless private circuits tailored to you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ICONIC_REGIONS.map((region) => (
                <div
                  key={region.id}
                  className="group rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <FallbackImage
                      src={region.image}
                      alt={region.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-[#F8904D] border border-white/20">
                      {region.tag}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#F8904D] transition-colors leading-snug">
                        {region.title}
                      </h3>
                      <div className="text-xs font-bold text-[#2E8B8B] mt-1 tracking-wide">
                        {region.route}
                      </div>
                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                        {region.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                        {region.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11.5px] text-slate-600 font-medium">
                            <CheckCircle2 size={13} className="text-[#2E8B8B] shrink-0" />
                            <span className="truncate">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3">
                      <Link
                        href={region.href}
                        className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-[#F8904D] text-slate-800 hover:text-white text-xs font-bold transition-all group/btn"
                      >
                        <span>Explore Circuit & Tours</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================== */}
      {/* 5. AUDLEY PILLAR 2: PLACES TO VISIT IN INDIA (CITY DIRECTORY)          */}
      {/* ====================================================================== */}
      {isIndia && (
        <section id="places" className="py-14 sm:py-20 bg-white border-b border-slate-200/70">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#F8904D]">
                  <MapPin size={14} /> City-by-City Directory
                </span>
                <h2 className="text-2xl sm:text-4xl font-luxury font-black text-slate-900 mt-2 uppercase">
                  Places to Visit in India
                </h2>
                <p className="text-slate-600 text-sm mt-1 max-w-2xl">
                  Discover India's most captivating heritage cities, palace capitals, and serene natural escapes.
                </p>
              </div>

              {/* Region Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {[
                  { key: "all", label: "All Places (12)" },
                  { key: "golden-triangle", label: "Golden Triangle" },
                  { key: "rajasthan", label: "Rajasthan" },
                  { key: "kerala", label: "Kerala" },
                  { key: "himalayas", label: "Himalayas & North" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setCityTab(tab.key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      cityTab === tab.key
                        ? "bg-[#1C1C1C] text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* City Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5">
              {displayedCitiesSpotlight.map((city) => (
                <Link
                  key={city.name}
                  href={city.href}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 aspect-[3/4] flex flex-col justify-end p-4 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <FallbackImage
                    src={city.image}
                    alt={city.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />

                  <div className="relative z-20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F8904D] block mb-0.5">
                      {city.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#F8904D] transition-colors leading-tight">
                      {city.name}
                    </h3>
                    <p className="text-[11px] text-white/80 line-clamp-2 mt-1 leading-snug">
                      {city.highlight}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-semibold text-white/90 pt-2 border-t border-white/15">
                      <span>{city.state}</span>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white/95">
                        {(city.tourCount ?? 0) > 0 ? `${city.tourCount} Tours` : "Explore"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================== */}
      {/* 6. TOURS SECTION (PRIVATE TAILOR-MADE ITINERARIES)                      */}
      {/* ====================================================================== */}
      <section id="tours">
        <ToursSection
          basePath={`/tour-packages/${country.slug}`}
          journeys={filteredJourneys}
          isLoading={journeysLoading}
          h1Title={formatToursH1(country.title || displayTitle)}
          overView={country.overView ?? undefined}
          emptyLabel={`No tours found in ${displayTitle} yet`}
          filterBar={countryJourneys.length >= 6 ? filterBar : undefined}
          onClearFilters={clearFilters}
          sharedLinkedHrefs={pageLinkedHrefs}
          excludeHrefs={excludeHrefs}
        />
      </section>

      {/* ====================================================================== */}
      {/* 7. AUDLEY PILLAR 3: WHEN TO VISIT INDIA (SEASONAL PLANNING GUIDE)      */}
      {/* ====================================================================== */}
      {isIndia && (
        <section id="timing" className="py-14 sm:py-20 bg-slate-50 border-y border-slate-200/70">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#F8904D]">
                <Sun size={14} /> Trip Planning
              </span>
              <h2 className="text-2xl sm:text-4xl font-luxury font-black text-slate-900 mt-2 uppercase">
                Best Time to Visit India
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                India is a subcontinent of contrasting climates. Here is our specialists' month-by-month guide to choosing your ideal travel window.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SEASONS_DATA.map((season, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#F8904D] bg-[#F8904D]/10 px-3 py-1 rounded-full">
                      {season.highlight}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-4">
                      {season.title}
                    </h3>
                    <div className="text-xs font-semibold text-[#2E8B8B] mt-1">
                      {season.weather}
                    </div>
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      {season.description}
                    </p>

                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Recommended For:
                      </span>
                      <ul className="space-y-1.5">
                        {season.idealFor.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F8904D]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <QuoteModal>
                      <button
                        type="button"
                        className="w-full py-2.5 rounded-xl border border-slate-300 hover:border-slate-900 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Enquire for this Season
                      </button>
                    </QuoteModal>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================== */}
      {/* 8. AUDLEY PILLAR 4: THE KOIKOI BESPOKE DIFFERENCE                      */}
      {/* ====================================================================== */}
      {isIndia && (
        <section id="difference" className="py-14 sm:py-20 bg-[#1C1C1C] text-white">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#F8904D]">
                <ShieldCheck size={14} /> Bespoke Luxury Travel
              </span>
              <h2 className="text-2xl sm:text-4xl font-luxury font-black text-white mt-2 uppercase">
                The KoiKoi Travel Difference
              </h2>
              <p className="text-white/75 text-sm sm:text-base mt-2">
                Why international travelers from the US, UK, Europe, and Australia choose KoiKoi Travel for their private journeys across India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BESPOKE_PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F8904D]/15 border border-[#F8904D]/30 flex items-center justify-center text-[#F8904D] mb-5">
                    <pillar.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <QuoteModal>
                <button
                  type="button"
                  className="font-outfit px-7 py-3 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Connect with an India Specialist</span>
                  <ArrowRight size={16} />
                </button>
              </QuoteModal>
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================== */}
      {/* 9. STATES OF INDIA (COMPREHENSIVE DIRECTORY)                           */}
      {/* ====================================================================== */}
      <section id="states" className="w-full bg-white py-14 sm:py-20 border-b border-slate-200/60">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="flex items-end justify-between mb-8 sm:mb-10 flex-wrap gap-4">
            <div>
              <span className="accent-label">Discover Every Region</span>
              <h2 className="h3 text-[#1C1C1C] mt-2">
                States in {displayTitle}
                <span className="ml-3 align-middle text-sm font-semibold text-[#F8904D] bg-[#F8904D]/10 px-3 py-1 rounded-full">
                  {statesLoading || journeysLoading ? "..." : displayedStates.length} States
                </span>
              </h2>
            </div>
            {!statesLoading && !journeysLoading && displayedStates.length > 4 && canScroll && (
              <div className="flex items-center gap-2">
                <button
                  onClick={slidePrev}
                  aria-label="Previous states"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-[#1C1C1C] flex items-center justify-center shadow-sm hover:bg-[#1C1C1C] hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={slideNext}
                  aria-label="Next states"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-[#1C1C1C] flex items-center justify-center shadow-sm hover:bg-[#1C1C1C] hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          {statesLoading || journeysLoading ? (
            <DestinationsSkeleton count={6} />
          ) : displayedStates.length === 0 ? (
            <div className="text-center py-14">
              <MapPin size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500">No states with tours found in {displayTitle}</p>
            </div>
          ) : displayedStates.length <= 4 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {displayedStates.map((s) => (
                <StateCard
                  key={s.id}
                  state={s}
                  countrySlug={country.slug}
                  journeyCount={journeyCountForState(s.id)}
                />
              ))}
            </div>
          ) : (
            <DestinationSlider
              swiperRef={statesSwiperRef}
              options={{
                breakpoints: {
                  0: { slidesPerView: 1.2, spaceBetween: 12 },
                  480: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                  1280: { slidesPerView: 5 },
                },
              }}
            >
              {displayedStates.map((s) => (
                <StateCard
                  key={s.id}
                  state={s}
                  countrySlug={country.slug}
                  journeyCount={journeyCountForState(s.id)}
                />
              ))}
            </DestinationSlider>
          )}
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 10. TRAVEL GUIDE & ESSENTIAL FACTS (SEO VALUE PRESERVED)               */}
      {/* ====================================================================== */}
      {showMoreSection && (
        <section id="guide" className="bg-[#f8f8f8] border-b border-slate-200/60 py-10 sm:py-14">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10">
            <div className={`grid grid-cols-1 gap-10 ${hasKnowMoreText && hasSidebar ? "lg:grid-cols-3" : ""}`}>
              {hasKnowMoreText && (
                <div className={hasSidebar ? "lg:col-span-2" : "w-full"}>
                  <TravelGuideCollapsible
                    title={`Essential Travel Guide to ${displayTitle}`}
                    subtitle={`Heritage, geography, cultural etiquette & insider planning advice for your private trip to ${displayTitle}.`}
                  >
                    {hasSeoDesc && (
                      <RichContent
                        html={country.seoDescription!}
                        sharedLinkedHrefs={pageLinkedHrefs}
                        excludeHrefs={excludeHrefs}
                      />
                    )}

                    {hasMoreDesc && (
                      <RichContent
                        html={country.moreDescription!}
                        sharedLinkedHrefs={pageLinkedHrefs}
                        excludeHrefs={excludeHrefs}
                        className={hasSeoDesc ? "mt-8" : ""}
                      />
                    )}
                  </TravelGuideCollapsible>
                </div>
              )}

              {hasSidebar && (
                <aside
                  className={`space-y-6 lg:sticky lg:top-28 z-10 self-start ${
                    !hasKnowMoreText ? "max-w-xl mx-auto w-full" : ""
                  }`}
                >
                  {facts.length > 0 && (
                    <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                      <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#2E8B8B] mb-5">
                        Quick Travel Facts
                      </h3>
                      <dl className="flex flex-col divide-y divide-slate-100">
                        {facts.map((f) => (
                          <div
                            key={f.label}
                            className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                          >
                            <dt className="text-[14px] text-slate-700 font-semibold flex items-center gap-2">
                              <f.icon size={15} className="shrink-0 text-[#2E8B8B]/70" /> {f.label}
                            </dt>
                            <dd className="text-[14px] font-bold text-[#1C1C1C] text-right capitalize">
                              {f.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}

                  {countryJourneys.filter((j) => (j.displayOrder ?? 0) > 0).length > 0 && (
                    <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                      <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#2E8B8B] mb-5 flex items-center justify-between">
                        Top Curated Itineraries
                        <span className="text-[10px] font-black text-[#F8904D] bg-[#F8904D]/10 px-2.5 py-0.5 rounded-full">
                          {Math.min(
                            10,
                            countryJourneys.filter((j) => (j.displayOrder ?? 0) > 0).length
                          )}
                        </span>
                      </h3>
                      <ol className="mt-2 space-y-1">
                        {[...countryJourneys]
                          .filter((j) => (j.displayOrder ?? 0) > 0)
                          .sort(
                            (a, b) =>
                              (a.displayOrder ?? Number.MAX_SAFE_INTEGER) -
                              (b.displayOrder ?? Number.MAX_SAFE_INTEGER)
                          )
                          .slice(0, 10)
                          .map((j, i) => (
                            <li key={j.id}>
                              <Link
                                href={journeyPackageHref(j)}
                                className="flex items-start gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                              >
                                <span className="mt-[2px] w-[24px] h-[24px] shrink-0 rounded-full bg-slate-100 text-[#1C1C1C] text-[11px] font-black flex items-center justify-center group-hover:bg-[#2E8B8B] group-hover:text-white transition-colors shadow-sm">
                                  {i + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <span className="text-[14px] font-semibold text-[#333] leading-snug group-hover:text-[#2E8B8B] transition-colors block truncate">
                                    {j.title.split("|")[0].trim()}
                                  </span>
                                  <div className="flex items-center gap-2 mt-0.5 text-[11px] font-medium text-slate-500">
                                    <span>
                                      {j.duration || (j.noDays > 0 ? `${j.noDays} Days` : "")}
                                    </span>
                                    {j.destination && (
                                      <>
                                        <span>•</span>
                                        <span className="truncate max-w-[130px]">
                                          {j.destination}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                      </ol>
                    </div>
                  )}
                </aside>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================== */}
      {/* 11. FAQS SECTION                                                       */}
      {/* ====================================================================== */}
      <FaqSection
        faqs={country.faqs}
        contextName={displayTitle}
        contextSlug={country.slug}
        entityType="Country"
        sharedLinkedHrefs={pageLinkedHrefs}
        excludeHrefs={excludeHrefs}
      />
    </div>
  );
}
