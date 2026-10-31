"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import {
  MapPin,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Calendar,
  Clock,
  Globe,
  Languages,
  Building2,
  Coins,
  ShieldCheck,
  Check,
  ArrowRight,
  Search,
  X,
  Car,
  Award,
  Sliders,
  PhoneCall,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { useCountryBySlug } from "@/feature/country/api/useCountry";
import { useGetStates } from "@/feature/state/api/useState";
import { useGetCities } from "@/feature/city/api/useCity";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import { useGetTravelExperiences } from "@/feature/travelExperience/api/useTravelExperience";
import HeroBanner from "@/components/shared/HeroBanner";
import { useHeroBanners } from "@/feature/heroBanner/api";
import { FallbackImage } from "@/components/shared/FallbackImage";
import RichContent from "@/components/shared/RichContent";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { stripHtml } from "@/lib/utils";
import { journeyPackageHref } from "@/feature/journey/filterOptions";
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
      "Yes, millions of international visitors travel safely each year. With a private car, a vetted dedicated chauffeur, licensed guides, and 24/7 on-ground trip support, it is a comfortable and secure choice for families, seniors, and solo or women travelers.",
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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
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

  const { states } = useGetStates(
    { countryId: country.id, limit: 100 },
    initialStates
  );

  const { travelExperiences = [] } = useGetTravelExperiences({
    limit: 100,
    isActive: "true",
  });

  const { cities: dbCities = [] } = useGetCities({
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

  // 100% Dynamic Iconic Circuits derived from DB State & TravelExperience entities
  const iconicCircuits = useMemo(() => {
    const findState = (slug: string, altId?: number) =>
      states.find((s) => s.slug === slug || (altId && s.id === altId));

    const findExp = (slug: string) =>
      travelExperiences.find((e) => e.slug === slug);

    // Resolve entities dynamically
    const gt = findState("golden-triangle", 30) || findExp("golden-triangle");
    const raj = findState("rajasthan");
    const kerala = findState("kerala");
    const south = findState("south-india");
    const spiritual = findExp("spiritual") || findState("himachal-pradesh") || findState("jammu-and-kashmir");

    // Check if admin has set explicit displayOrder on states (e.g. 1..5)
    const statesWithOrder = displayedStates.filter(
      (s) => s.displayOrder && s.displayOrder > 0 && s.displayOrder <= 5
    );

    const candidates =
      statesWithOrder.length >= 4
        ? statesWithOrder.map((s) => ({ item: s, defaultSlug: s.slug, isExp: false }))
        : [
            { item: gt, defaultSlug: "golden-triangle", isExp: false },
            { item: raj, defaultSlug: "rajasthan", isExp: false },
            { item: kerala, defaultSlug: "kerala", isExp: false },
            { item: south, defaultSlug: "south-india", isExp: false },
            { item: spiritual, defaultSlug: "spiritual", isExp: !findState("himachal-pradesh") && Boolean(findExp("spiritual")) },
          ];

    return candidates.map(({ item, defaultSlug, isExp }) => {
      const slug = item?.slug || defaultSlug;
      const title =
        item?.banner?.bannerTitle ||
        item?.h1Title ||
        item?.title ||
        slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

      const tag = item?.banner?.bannerTag || "";

      const description =
        item?.cardShortDescription ||
        (item as any)?.attractions ||
        (item as any)?.famousFor?.replace(/<[^>]+>/g, "").slice(0, 100) ||
        (item as any)?.highlights?.replace(/<[^>]+>/g, "").slice(0, 100) ||
        item?.seoDescription?.replace(/<[^>]+>/g, "").slice(0, 100) ||
        "Private chauffeur, licensed guides and tailor-made sightseeing";

      const href = isExp
        ? `/travel-experiences/${slug}`
        : `/tour-packages/india/${slug}`;

      const count =
        item && "id" in item && "countryId" in item
          ? journeyCountForState(item.id) || (item as any).tourCount || 0
          : (item as any)?.tourCount || 0;

      return {
        id: item?.id || slug,
        title,
        tag,
        description,
        href,
        count,
      };
    });
  }, [states, travelExperiences, displayedStates, countryJourneys]);

  // 100% Dynamic Popular Cities derived from DB Cities
  const popularCities = useMemo(() => {
    if (dbCities && dbCities.length > 0) {
      return [...dbCities]
        .sort((a, b) => {
          const aCount = (a as any).tourCount || 0;
          const bCount = (b as any).tourCount || 0;
          if (bCount !== aCount) return bCount - aCount;
          return a.title.localeCompare(b.title);
        })
        .slice(0, 14)
        .map((c) => c.title);
    }
    return [
      "Jaipur", "Agra", "Delhi", "Udaipur", "Varanasi",
      "Kochi", "Munnar", "Alleppey", "Jodhpur", "Jaisalmer", "Shimla", "Amritsar",
    ];
  }, [dbCities]);

  // ==========================================================================
  // TRIP FINDER STATE & FILTERS
  // ==========================================================================
  const [selectedRegion, setSelectedRegion] = useState<"all" | "gt" | "raj" | "south" | "north">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [travelStyle, setTravelStyle] = useState<string>("all");
  const [durationFilter, setDurationFilter] = useState<string>("all");
  const [isSeoOpen, setIsSeoOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const tripsSectionRef = useRef<HTMLDivElement>(null);

  // Region Chips List
  const regionChips: { id: "all" | "gt" | "raj" | "south" | "north"; label: string }[] = [
    { id: "all", label: "All India" },
    { id: "gt", label: "Golden Triangle" },
    { id: "raj", label: "Rajasthan" },
    { id: "south", label: "Kerala & South" },
    { id: "north", label: "Himalayas & North" },
  ];

  // Helper matching journeys to Region Chip
  const matchesRegion = (j: Journey, reg: typeof selectedRegion) => {
    if (reg === "all") return true;
    const text = `${j.title} ${j.destination || ""} ${j.cities?.map((c) => c.title).join(" ") || ""} ${j.cities?.[0]?.state?.title || ""}`.toLowerCase();

    if (reg === "gt") {
      return (
        text.includes("delhi") ||
        text.includes("agra") ||
        text.includes("jaipur") ||
        text.includes("golden triangle") ||
        text.includes("uttar pradesh") ||
        text.includes("taj mahal")
      );
    }
    if (reg === "raj") {
      return (
        text.includes("rajasthan") ||
        text.includes("jaipur") ||
        text.includes("jodhpur") ||
        text.includes("udaipur") ||
        text.includes("jaisalmer") ||
        text.includes("bikaner") ||
        text.includes("ranthambore") ||
        text.includes("pushkar")
      );
    }
    if (reg === "south") {
      return (
        text.includes("kerala") ||
        text.includes("kochi") ||
        text.includes("munnar") ||
        text.includes("alleppey") ||
        text.includes("kovalam") ||
        text.includes("tamil nadu") ||
        text.includes("madurai") ||
        text.includes("chennai") ||
        text.includes("pondicherry") ||
        text.includes("mysore") ||
        text.includes("hampi") ||
        text.includes("karnataka") ||
        text.includes("goa") ||
        text.includes("south india")
      );
    }
    if (reg === "north") {
      return (
        text.includes("himalaya") ||
        text.includes("shimla") ||
        text.includes("manali") ||
        text.includes("himachal") ||
        text.includes("uttarakhand") ||
        text.includes("rishikesh") ||
        text.includes("varanasi") ||
        text.includes("amritsar") ||
        text.includes("kashmir") ||
        text.includes("ladakh") ||
        text.includes("punjab")
      );
    }
    return true;
  };

  // Helper matching journeys to Travel Style
  const matchesStyle = (j: Journey, style: string) => {
    if (style === "all") return true;
    const text = `${j.title} ${j.destination || ""} ${j.travelExperiences?.map((e) => e.title).join(" ") || ""}`.toLowerCase();

    if (style === "classic") return text.includes("classic") || text.includes("golden triangle") || text.includes("sightseeing") || text.includes("highlights");
    if (style === "weekend") return (j.noDays && j.noDays <= 3) || text.includes("weekend") || text.includes("day trip") || text.includes("short");
    if (style === "wildlife") return text.includes("wildlife") || text.includes("tiger") || text.includes("safari") || text.includes("ranthambore");
    if (style === "spiritual") return text.includes("spiritual") || text.includes("temple") || text.includes("ganges") || text.includes("varanasi") || text.includes("amritsar") || text.includes("rishikesh");
    if (style === "wellness") return text.includes("wellness") || text.includes("ayurveda") || text.includes("yoga");
    if (style === "hills") return text.includes("hills") || text.includes("mountain") || text.includes("shimla") || text.includes("manali") || text.includes("ladakh") || text.includes("kashmir");
    if (style === "heritage") return text.includes("heritage") || text.includes("fort") || text.includes("palace") || text.includes("royal") || text.includes("rajasthan");
    return true;
  };

  // Helper matching journeys to Duration
  const matchesDuration = (j: Journey, dur: string) => {
    if (dur === "all") return true;
    const days = j.noDays || 0;
    if (dur === "short") return days <= 2;
    if (dur === "mid") return days >= 3 && days <= 5;
    if (dur === "week") return days >= 6 && days <= 9;
    if (dur === "long") return days >= 10;
    return true;
  };

  // Filtered Journeys
  const filteredJourneys = useMemo(() => {
    return countryJourneys.filter((j) => {
      // 1. Region
      if (!matchesRegion(j, selectedRegion)) return false;

      // 2. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const text = `${j.title} ${j.destination || ""} ${j.cities?.map((c) => c.title).join(" ") || ""} ${j.cities?.[0]?.state?.title || ""} ${j.overView || ""}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      // 3. Travel Style
      if (!matchesStyle(j, travelStyle)) return false;

      // 4. Duration
      if (!matchesDuration(j, durationFilter)) return false;

      return true;
    });
  }, [countryJourneys, selectedRegion, searchQuery, travelStyle, durationFilter]);

  const isFiltered =
    selectedRegion !== "all" ||
    searchQuery.trim() !== "" ||
    travelStyle !== "all" ||
    durationFilter !== "all";

  const resetAllFilters = () => {
    setSelectedRegion("all");
    setSearchQuery("");
    setTravelStyle("all");
    setDurationFilter("all");
  };

  // Handle clicking a Popular Place pill
  const handlePlaceClick = (place: string) => {
    setSearchQuery(place);
    // Auto-select corresponding region chip for convenience
    const lower = place.toLowerCase();
    if (["jaipur", "agra", "delhi"].includes(lower)) setSelectedRegion("gt");
    else if (["udaipur", "jodhpur", "jaisalmer"].includes(lower)) setSelectedRegion("raj");
    else if (["kochi", "munnar", "alleppey"].includes(lower)) setSelectedRegion("south");
    else if (["varanasi", "shimla", "amritsar"].includes(lower)) setSelectedRegion("north");

    tripsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  // Quick Facts
  const quickFacts = [
    { label: "Capital", value: country.capital || "New Delhi" },
    { label: "Languages", value: country.language || "Hindi, English" },
    { label: "Currency", value: country.currency || "Indian Rupee (INR)" },
    { label: "Best time", value: country.bestTimeToVisit || "October to March" },
    { label: "Time zone", value: country.timezone || "UTC +5:30" },
    { label: "Dial code", value: country.dialCode || "+91" },
  ];

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
        fallbackImage={country.thumbImg || country.banner?.images?.[0] || "/banners/home-comic-banner.webp"}
        tag={heroTag}
        title={heroTitle}
        subtitle="Palaces, sacred rivers, backwaters and tiger reserves, all with your own car, driver and licensed guide. Pick a trip below or tell us what you have in mind."
        alt={displayTitle}
      >
        {/* Breadcrumb inside Hero for high-contrast legible look */}
        <div className="flex items-center justify-center gap-2 text-xs text-white/80 font-medium mb-3 sm:mb-4">
          <Link href="/" className="hover:text-white hover:underline transition-colors">
            Home
          </Link>
          <span className="text-white/40">›</span>
          <Link href="/destinations" className="hover:text-white hover:underline transition-colors">
            Destinations
          </Link>
          <span className="text-white/40">›</span>
          <span className="text-white font-semibold">India</span>
        </div>

        {/* Hero CTA buttons matching template */}
        <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 pointer-events-auto">
          <a
            href="#quote"
            className="px-6 py-3 rounded-full bg-[#F8904D] hover:bg-[#E07D3A] text-white font-bold text-sm sm:text-[15px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Plan My Tailor-Made Trip</span>
            <ArrowRight size={16} />
          </a>

          <a
            href="#circuits"
            className="px-6 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/40 hover:bg-white hover:text-[#1C1C1C] text-white font-semibold text-sm sm:text-[15px] transition-all"
          >
            Explore Iconic Circuits
          </a>
        </div>
      </HeroBanner>

      {/* ====================================================================== */}
      {/* 2. TRUST BAR (4 VALUES PROPOSITIONS)                                   */}
      {/* ====================================================================== */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-20 -mt-8 sm:-mt-10">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(18,48,47,0.08)] border border-[#EEE7DE] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#EEE7DE] overflow-hidden">
          <div className="p-5 sm:p-6 flex items-start gap-4 hover:bg-slate-50/60 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2E8B8B] flex items-center justify-center shrink-0 font-bold text-sm">
              <Car size={20} />
            </div>
            <div>
              <b className="block text-sm font-bold text-[#1C1C1C] leading-snug">Private car & driver</b>
              <span className="text-xs text-[#66758A] mt-1 block">Air-conditioned, verified chauffeur</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex items-start gap-4 hover:bg-slate-50/60 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2E8B8B] flex items-center justify-center shrink-0 font-bold text-sm">
              <Award size={20} />
            </div>
            <div>
              <b className="block text-sm font-bold text-[#1C1C1C] leading-snug">Licensed guides</b>
              <span className="text-xs text-[#66758A] mt-1 block">English or other languages on request</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex items-start gap-4 hover:bg-slate-50/60 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2E8B8B] flex items-center justify-center shrink-0 font-bold text-sm">
              <Sliders size={20} />
            </div>
            <div>
              <b className="block text-sm font-bold text-[#1C1C1C] leading-snug">100% tailor-made</b>
              <span className="text-xs text-[#66758A] mt-1 block">Your hotels, pace and route</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex items-start gap-4 hover:bg-slate-50/60 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2E8B8B] flex items-center justify-center shrink-0 font-bold text-sm">
              <PhoneCall size={20} />
            </div>
            <div>
              <b className="block text-sm font-bold text-[#1C1C1C] leading-snug">24/7 trip support</b>
              <span className="text-xs text-[#66758A] mt-1 block">Real people on WhatsApp</span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 3. SECTION 0: ICONIC CIRCUITS                                          */}
      {/* ====================================================================== */}
      <section id="circuits" className="py-16 sm:py-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="mb-8 sm:mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#F8904D] block mb-2">
              Iconic circuits
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight">
              Start with a <em className="not-italic text-[#F8904D]">classic route</em>
            </h2>
            <p className="text-[#66758A] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Five routes that first-time visitors love. Each one can be shortened, stretched or mixed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {iconicCircuits.map((circ) => (
              <Link
                key={circ.id}
                href={circ.href}
                className="group bg-[#FAF8F5] hover:bg-white border border-[#EEE7DE] hover:border-[#F8904D] rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-sm"
              >
                <div>
                  {circ.tag && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F8904D] block mb-1.5 truncate">
                      {circ.tag}
                    </span>
                  )}
                  <b className="block text-base font-bold text-[#1C1C1C] group-hover:text-[#F8904D] transition-colors leading-snug mb-2">
                    {circ.title}
                  </b>
                  <p className="text-xs font-semibold text-[#2E8B8B] leading-relaxed mb-6 line-clamp-3">
                    {circ.description}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#EEE7DE]/60">
                  <span className="text-[11px] font-medium text-[#66758A]">
                    {circ.count > 0 ? `${circ.count} tours` : "View trips"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#F8904D] group-hover:translate-x-1 transition-transform">
                    <span>View trips</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 4. SECTION 1: FIND YOUR TRIP / JOURNEY PACKAGES                        */}
      {/* ====================================================================== */}
      <section
        id="trips"
        ref={tripsSectionRef}
        className="py-16 sm:py-20 bg-white border-y border-[#EEE7DE]"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="mb-6 sm:mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#F8904D] block mb-2">
              Find your trip
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight">
              Choose your <em className="not-italic text-[#F8904D]">India journey</em>
            </h2>
            <p className="text-[#66758A] text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
              Search by city, pick a region, a style or how many days you have. Every package is a starting point and can be changed.
            </p>
          </div>

          {/* Region Chips */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-5" role="group" aria-label="Region Filters">
            {regionChips.map((chip) => {
              const active = selectedRegion === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setSelectedRegion(chip.id)}
                  aria-pressed={active}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-[#1C1C1C] text-white shadow-sm border border-[#1C1C1C]"
                      : "bg-[#FAF8F5] text-[#1C1C1C] border border-[#EEE7DE] hover:border-[#2E8B8B] hover:text-[#2E8B8B]"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Interactive Finder Controls */}
          <div className="bg-[#FAF8F5] border border-[#EEE7DE] rounded-2xl p-4 sm:p-5 shadow-sm mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-end">
              {/* Search input */}
              <div className="lg:col-span-5">
                <label htmlFor="fq" className="block text-[11px] font-bold text-[#66758A] uppercase tracking-wider mb-1.5">
                  Search
                </label>
                <div className="relative">
                  <input
                    id="fq"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="City or place, e.g. Jaipur, tiger, yoga"
                    className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-[#DDD5CA] bg-white text-sm text-[#1C1C1C] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2E8B8B] focus:ring-2 focus:ring-[#2E8B8B]/20 transition-all"
                  />
                  <Search size={15} className="absolute left-3 top-3 text-[#94A3B8]" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2.5 text-[#94A3B8] hover:text-[#1C1C1C]"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              </div>

              {/* Travel Style */}
              <div className="lg:col-span-3">
                <label htmlFor="fe" className="block text-[11px] font-bold text-[#66758A] uppercase tracking-wider mb-1.5">
                  Travel style
                </label>
                <select
                  id="fe"
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#DDD5CA] bg-white text-sm text-[#1C1C1C] focus:outline-none focus:border-[#2E8B8B] focus:ring-2 focus:ring-[#2E8B8B]/20 transition-all cursor-pointer"
                >
                  <option value="all">Any style</option>
                  <option value="classic">Classic sightseeing</option>
                  <option value="weekend">Short break</option>
                  <option value="wildlife">Wildlife</option>
                  <option value="spiritual">Spiritual</option>
                  <option value="wellness">Yoga & wellness</option>
                  <option value="hills">Hills & mountains</option>
                  <option value="heritage">Heritage & culture</option>
                </select>
              </div>

              {/* Duration */}
              <div className="lg:col-span-3">
                <label htmlFor="fd" className="block text-[11px] font-bold text-[#66758A] uppercase tracking-wider mb-1.5">
                  Duration
                </label>
                <select
                  id="fd"
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#DDD5CA] bg-white text-sm text-[#1C1C1C] focus:outline-none focus:border-[#2E8B8B] focus:ring-2 focus:ring-[#2E8B8B]/20 transition-all cursor-pointer"
                >
                  <option value="all">Any length</option>
                  <option value="short">Same day to 2 days</option>
                  <option value="mid">3 to 5 days</option>
                  <option value="week">6 to 9 days</option>
                  <option value="long">10 days or more</option>
                </select>
              </div>

              {/* Reset button */}
              <div className="lg:col-span-1">
                <button
                  type="button"
                  onClick={resetAllFilters}
                  disabled={!isFiltered}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                    isFiltered
                      ? "bg-white border border-[#DDD5CA] text-[#1C1C1C] hover:border-[#2E8B8B] hover:text-[#2E8B8B]"
                      : "bg-slate-100 text-slate-400 border border-transparent cursor-not-allowed"
                  }`}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Status line */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-[#66758A] mb-8 pb-2">
            <span>
              Showing <strong>{filteredJourneys.length}</strong> of {countryJourneys.length} trips in India
              {selectedRegion !== "all" && (
                <span className="text-[#2E8B8B] font-semibold"> • {regionChips.find((c) => c.id === selectedRegion)?.label}</span>
              )}
            </span>
            {isFiltered && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-[#F8904D] hover:underline font-semibold cursor-pointer"
              >
                Reset all filters
              </button>
            )}
          </div>

          {/* Packages Grid */}
          {filteredJourneys.length === 0 ? (
            <div className="text-center py-16 px-4 bg-[#FAF8F5] rounded-2xl border border-dashed border-[#DDD5CA]">
              <HelpCircle size={40} className="mx-auto text-slate-400 mb-3" />
              <h3 className="text-lg font-bold text-[#1C1C1C]">No packages match your search</h3>
              <p className="text-xs sm:text-sm text-[#66758A] mt-1 max-w-md mx-auto">
                Try loosening your filters or reach out directly — we can design any custom route for you.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="mt-4 px-5 py-2 rounded-full bg-[#1C1C1C] text-white text-xs font-bold hover:bg-[#F8904D] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJourneys.map((j) => {
                const href = journeyPackageHref(j);
                const days = j.duration || (j.noDays > 0 ? `${j.noDays} Days` : "Custom");
                const tag = j.banner?.bannerTag || j.travelExperiences?.[0]?.title || "Bestseller";
                const route = j.destination || (j.cities?.map((c) => c.title).join(" → ")) || "Delhi → Agra → Jaipur";
                const img = j.thumbImg || j.banner?.images?.[0] || "/banners/home-comic-banner.webp";

                return (
                  <div
                    key={j.id}
                    className="group bg-white border border-[#EEE7DE] hover:border-[#F8904D] rounded-2xl overflow-hidden flex flex-col shadow-[0_2px_10px_rgba(18,48,47,0.04)] hover:shadow-[0_8px_24px_rgba(18,48,47,0.1)] hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Card Image */}
                    <Link href={href} className="relative h-[200px] w-full block overflow-hidden bg-slate-900 shrink-0">
                      <FallbackImage
                        src={img}
                        alt={j.h1Title || j.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute top-3.5 left-3.5 bg-white text-[#1C1C1C] font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                        {days}
                      </span>
                      <span className="absolute top-3.5 right-3.5 bg-black/75 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    </Link>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <Link href={href} className="block">
                          <h3 className="text-base sm:text-lg font-bold text-[#1C1C1C] group-hover:text-[#F8904D] transition-colors line-clamp-2 leading-snug">
                            {j.h1Title || j.title}
                          </h3>
                        </Link>
                        <div className="text-xs font-semibold text-[#2E8B8B] mt-1.5 mb-3 line-clamp-1">
                          {route}
                        </div>

                        {/* Inclusions Highlights */}
                        <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                          <li className="flex items-start gap-2">
                            <Check size={14} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                            <span>Private AC executive vehicle & chauffeur</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={14} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                            <span>Licensed English-speaking monument historian</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={14} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                            <span>Boutique / luxury handpicked hotel options</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-5 pt-3 border-t border-dashed border-[#EEE7DE]">
                        <p className="text-[11px] text-[#66758A] mb-3">
                          Private car, driver, hotels & breakfast included
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href={href}
                            className="px-3 py-2 rounded-full border border-[#EEE7DE] hover:border-[#2E8B8B] text-[#1C1C1C] hover:text-[#2E8B8B] text-xs font-bold text-center transition-colors"
                          >
                            View details
                          </Link>
                          <QuoteModal>
                            <button
                              type="button"
                              className="px-3 py-2 rounded-full bg-[#F8904D] hover:bg-[#E07D3A] text-white text-xs font-bold text-center shadow-xs transition-colors cursor-pointer"
                            >
                              Get a quote
                            </button>
                          </QuoteModal>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 5. SECTION 2: EXPLORE BY STATE & POPULAR PLACES                        */}
      {/* ====================================================================== */}
      <section id="places" className="py-16 sm:py-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#F8904D] block mb-2">
              Explore by state
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight">
              Where do you want <em className="not-italic text-[#F8904D]">to go?</em>
            </h2>
            <p className="text-[#66758A] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Browse every trip in a state or region.
            </p>
          </div>

          {/* States Grid (100% Dynamic from DB State table) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
            {displayedStates.map((s) => {
              const realCount = journeyCountForState(s.id) || s.tourCount || 0;
              const countLabel = realCount > 0 ? `${realCount} tours` : "View trips";
              const href = `/tour-packages/india/${s.slug}`;
              const title = s.banner?.bannerTitle || s.h1Title || s.title;

              return (
                <Link
                  key={s.id}
                  href={href}
                  className="bg-white hover:bg-slate-50 border border-[#EEE7DE] hover:border-[#F8904D] rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <b className="block text-sm sm:text-base font-bold text-[#1C1C1C] leading-snug">
                    {title}
                  </b>
                  <small className="text-xs text-[#66758A] mt-2 block font-medium">
                    {countLabel}
                  </small>
                </Link>
              );
            })}

            {/* See all destinations card */}
            <Link
              href="/destinations"
              className="bg-[#2E8B8B]/10 hover:bg-[#2E8B8B] text-[#2E8B8B] hover:text-white border border-[#2E8B8B]/30 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:-translate-y-0.5 hover:shadow-sm"
            >
              <b className="block text-sm sm:text-base font-bold leading-snug">
                See all destinations
              </b>
              <small className="text-xs mt-2 block font-bold">
                Explore all &rarr;
              </small>
            </Link>
          </div>

          {/* Popular Places to Visit (100% Dynamic from DB Cities) */}
          <div className="pt-6 border-t border-[#EEE7DE]">
            <h3 className="text-lg sm:text-xl font-bold text-[#1C1C1C] mb-1">
              Popular places to visit
            </h3>
            <p className="text-xs sm:text-sm text-[#66758A] mb-4">
              Tap a city to filter the trips above that include it.
            </p>
            <div className="flex flex-wrap gap-2">
              {popularCities.map((place) => (
                <button
                  key={place}
                  type="button"
                  onClick={() => handlePlaceClick(place)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    searchQuery.toLowerCase() === place.toLowerCase()
                      ? "bg-[#2E8B8B] text-white border-[#2E8B8B]"
                      : "bg-white border-[#EEE7DE] text-[#1C1C1C] hover:border-[#2E8B8B] hover:text-[#2E8B8B]"
                  }`}
                >
                  {place}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 6. SECTION 3: HOW IT WORKS                                             */}
      {/* ====================================================================== */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#EEE7DE]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#F8904D] block mb-2">
              Simple process
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight">
              How it <em className="not-italic text-[#F8904D]">works</em>
            </h2>
            <p className="text-[#66758A] text-sm sm:text-base mt-2 leading-relaxed">
              Planning should not feel like work. Three steps and you are set.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF8F5] border border-[#EEE7DE] rounded-2xl p-6 sm:p-7 relative hover:shadow-md transition-shadow">
              <span className="text-3xl font-extrabold text-[#F8904D]/30 block mb-3 font-mono">
                01
              </span>
              <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">
                Tell us your plan
              </h3>
              <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed">
                Share where you want to go, your dates and how many are travelling. Rough ideas are fine.
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#EEE7DE] rounded-2xl p-6 sm:p-7 relative hover:shadow-md transition-shadow">
              <span className="text-3xl font-extrabold text-[#F8904D]/30 block mb-3 font-mono">
                02
              </span>
              <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">
                Get your custom plan
              </h3>
              <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed">
                We send a personalised itinerary and quote. Change the route, hotels or pace until it feels right.
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#EEE7DE] rounded-2xl p-6 sm:p-7 relative hover:shadow-md transition-shadow">
              <span className="text-3xl font-extrabold text-[#F8904D]/30 block mb-3 font-mono">
                03
              </span>
              <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">
                Travel with support
              </h3>
              <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed">
                Your private car, driver and guides are arranged, and our team is on WhatsApp during the trip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 7. SECTION 4: INDIA TRAVEL GUIDE & QUICK FACTS                         */}
      {/* ====================================================================== */}
      <section id="guide" className="py-16 sm:py-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#F8904D] block mb-2">
              India travel guide
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight">
              Before you <em className="not-italic text-[#F8904D]">go</em>
            </h2>
            <p className="text-[#66758A] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              A few simple tips so your first India trip runs smoothly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Practical Advice */}
            <div className="lg:col-span-8 bg-white border border-[#EEE7DE] rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
              {/* Best Time To Visit */}
              <div>
                <h3 className="text-lg font-bold text-[#1C1C1C] mb-3 flex items-center gap-2">
                  <Calendar size={18} className="text-[#2E8B8B]" />
                  <span>Best time to visit</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200">
                    <b className="block text-xs font-bold text-[#2E8B8B]">
                      October to March (Recommended)
                    </b>
                    <span className="text-xs text-slate-600 block mt-1">
                      Cool and comfortable for most of India; ideal for palaces and sightseeing.
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EEE7DE]">
                    <b className="block text-xs font-bold text-[#1C1C1C]">
                      April to June
                    </b>
                    <span className="text-xs text-slate-600 block mt-1">
                      Hot in the plains; best for tiger sightings and cool Himalayan hills.
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EEE7DE]">
                    <b className="block text-xs font-bold text-[#1C1C1C]">
                      July to September
                    </b>
                    <span className="text-xs text-slate-600 block mt-1">
                      Monsoon season; lush green landscapes, quieter sights, and Ayurveda in Kerala.
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EEE7DE]">
                    <b className="block text-xs font-bold text-[#1C1C1C]">
                      Winter (Dec to Feb)
                    </b>
                    <span className="text-xs text-slate-600 block mt-1">
                      Crisp cool in the north and mountains; pleasantly warm and sunny in the south.
                    </span>
                  </div>
                </div>
              </div>

              {/* What to Pack */}
              <div className="pt-6 border-t border-[#EEE7DE]">
                <h3 className="text-lg font-bold text-[#1C1C1C] mb-3">
                  What to pack
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <Check size={16} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                    <span>Light cotton clothes, plus a warm layer for winter in the north</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={16} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                    <span>Comfortable walking shoes that are easy to slip off at temples</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={16} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                    <span>Sun hat, sunglasses and high-SPF sunscreen</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={16} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                    <span>A scarf or shawl to cover shoulders at religious monuments</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={16} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                    <span>Basic travel medicines and an India power adapter (Type D/M)</span>
                  </li>
                </ul>
              </div>

              {/* Dress & Etiquette */}
              <div className="pt-6 border-t border-[#EEE7DE]">
                <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">
                  Dress and etiquette
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Dress modestly at temples, mosques and gurudwaras: cover shoulders and knees. Remove shoes before entering sacred premises, and always ask politely before photographing locals or inside sanctums.
                </p>
              </div>

              {/* Food & Water */}
              <div className="pt-6 border-t border-[#EEE7DE]">
                <h3 className="text-lg font-bold text-[#1C1C1C] mb-3">
                  Food and water
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <Check size={16} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                    <span>Drink sealed bottled or properly filtered water throughout your trip.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={16} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                    <span>Pick busy, freshly cooked restaurants. Your guide can suggest top authentic spots.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={16} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                    <span>Vegetarian food is widely available and diverse. Inform us of any allergies in advance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={16} className="text-[#2E8B8B] shrink-0 mt-0.5" />
                    <span>Spice levels vary greatly. Feel free to request &quot;mild&quot; or &quot;less spicy&quot;.</span>
                  </li>
                </ul>
              </div>

              {/* Shopping */}
              <div className="pt-6 border-t border-[#EEE7DE]">
                <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">
                  Shopping
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Handicrafts, textiles, jewelry, spices, and marble inlay work are world-famous. Polite bargaining is normal in bazaars. <strong>We maintain a strict policy of zero forced shopping stops</strong> on your itinerary.
                </p>
              </div>

              {/* Expandable Full SEO Article */}
              {hasKnowMoreText && (
                <div className="pt-6 border-t border-[#EEE7DE]">
                  <button
                    type="button"
                    onClick={() => setIsSeoOpen(!isSeoOpen)}
                    className="flex items-center justify-between w-full text-left py-2 text-sm font-bold text-[#2E8B8B] hover:text-[#1C1C1C] transition-colors cursor-pointer"
                  >
                    <span>Read full editorial guide to {displayTitle}</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${isSeoOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isSeoOpen && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
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
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Sticky Quick Facts Panel */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <aside className="bg-white border border-[#EEE7DE] rounded-2xl p-6 sm:p-7 shadow-sm">
                <h3 className="text-base font-bold text-[#1C1C1C] mb-4 pb-3 border-b border-[#EEE7DE]">
                  Quick facts
                </h3>
                <dl className="space-y-3 text-xs sm:text-sm">
                  {quickFacts.map((f) => (
                    <div key={f.label} className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
                      <dt className="text-[#66758A] font-medium">{f.label}</dt>
                      <dd className="font-bold text-[#1C1C1C] text-right">{f.value}</dd>
                    </div>
                  ))}
                </dl>

                <h4 className="text-xs font-bold text-[#1C1C1C] uppercase tracking-wider mt-6 mb-1.5">
                  Famous for
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Taj Mahal, royal palaces, sacred Ganges, backwaters, tiger reserves, Himalayan valleys
                </p>

                <h4 className="text-xs font-bold text-[#1C1C1C] uppercase tracking-wider mt-4 mb-1.5">
                  Weather
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  October to March pleasant, April to June hot, July to September monsoon
                </p>

                <h4 className="text-xs font-bold text-[#1C1C1C] uppercase tracking-wider mt-4 mb-1.5">
                  Attractions
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Taj Mahal, Amber Fort, Red Fort, Hawa Mahal, Udaipur City Palace, Varanasi Ghats, Kerala backwaters, Golden Temple
                </p>

                <div className="mt-6 pt-4 border-t border-[#EEE7DE]">
                  <a
                    href="#quote"
                    className="w-full py-2.5 rounded-xl bg-[#2E8B8B] hover:bg-[#267373] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Request Custom Quote</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 8. SECTION 5: INDIA TRAVEL FAQS                                        */}
      {/* ====================================================================== */}
      <section id="faq" className="py-16 sm:py-20 bg-white border-t border-[#EEE7DE]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#F8904D] block mb-2">
              Got questions?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight">
              India travel <em className="not-italic text-[#F8904D]">FAQs</em>
            </h2>
            <p className="text-[#66758A] text-sm sm:text-base mt-2 leading-relaxed">
              Quick answers to common questions about planning your India trip.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {allFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#EEE7DE] rounded-xl overflow-hidden bg-[#FAF8F5] transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#1C1C1C] hover:text-[#2E8B8B] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`text-[#2E8B8B] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
