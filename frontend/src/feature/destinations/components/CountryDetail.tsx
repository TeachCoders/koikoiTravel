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
  Clock,
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
  Compass,
} from "lucide-react";
import { useCountryBySlug } from "@/feature/country/api/useCountry";
import { useGetStates } from "@/feature/state/api/useState";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import { useGetTravelExperiences } from "@/feature/travelExperience/api/useTravelExperience";
import HeroBanner from "@/components/shared/HeroBanner";
import { useHeroBanners } from "@/feature/heroBanner/api";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { SingleDestinationReusableCard } from "@/components/shared/SingleDestinationReusableCard";
import TourPackageCard from "@/components/shared/TourPackageCard";
import StateCard from "./StateCard";
import { FallbackImage } from "@/components/shared/FallbackImage";
import RichContent from "@/components/shared/RichContent";
import { stripHtml } from "@/lib/utils";
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

  // ==========================================================================
  // 100% DYNAMIC ICONIC CIRCUITS (PULLED LIVE FROM DB STATES & EXPERIENCES)
  // ==========================================================================
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

      const image = item?.thumbImg || item?.banner?.images?.[0] || undefined;

      return {
        id: item?.id || slug,
        title,
        tag,
        description,
        href,
        count,
        image,
      };
    });
  }, [states, travelExperiences, displayedStates, countryJourneys]);

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
      {/* 2. TRUST BAR (4 VALUES PROPOSITIONS - MATCHING HOME WHY CHOOSE US)     */}
      {/* ====================================================================== */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 relative z-20 -mt-8 sm:-mt-10">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(18,48,47,0.08)] border border-section-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-section-border overflow-hidden">
          <div className="p-5 sm:p-6 flex items-start gap-4 hover:bg-slate-50/60 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2E8B8B] flex items-center justify-center shrink-0 font-bold text-sm">
              <Car size={20} />
            </div>
            <div>
              <b className="block text-sm font-bold text-slate-900 leading-snug">Private car & driver</b>
              <span className="text-xs text-slate-500 mt-1 block">Air-conditioned, verified chauffeur</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex items-start gap-4 hover:bg-slate-50/60 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2E8B8B] flex items-center justify-center shrink-0 font-bold text-sm">
              <Award size={20} />
            </div>
            <div>
              <b className="block text-sm font-bold text-slate-900 leading-snug">Licensed guides</b>
              <span className="text-xs text-slate-500 mt-1 block">English or other languages on request</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex items-start gap-4 hover:bg-slate-50/60 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2E8B8B] flex items-center justify-center shrink-0 font-bold text-sm">
              <Sliders size={20} />
            </div>
            <div>
              <b className="block text-sm font-bold text-slate-900 leading-snug">100% tailor-made</b>
              <span className="text-xs text-slate-500 mt-1 block">Your hotels, pace and route</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex items-start gap-4 hover:bg-slate-50/60 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2E8B8B] flex items-center justify-center shrink-0 font-bold text-sm">
              <PhoneCall size={20} />
            </div>
            <div>
              <b className="block text-sm font-bold text-slate-900 leading-snug">24/7 trip support</b>
              <span className="text-xs text-slate-500 mt-1 block">Real people on WhatsApp</span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 3. SECTION 0: ICONIC CIRCUITS (RELATING TO HOME POPULAR DESTINATIONS)   */}
      {/* ====================================================================== */}
      <section id="circuits" className="py-12 sm:py-16 md:py-20 bg-white border-b border-section-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <SectionLabel icon={<Compass className="w-3.5 h-3.5" />}>
                Iconic Circuits
              </SectionLabel>
              <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-slate-900 tracking-tight mt-1.5 font-heading">
                Start With a <span className="text-[#F8904D]">Classic Route</span>
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-1.5 max-w-xl">
                Five routes that first-time visitors love. Each one can be shortened, stretched or mixed.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="#trips"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-section-border text-slate-800 text-sm font-semibold hover:border-[#2E8B8B] hover:text-[#2E8B8B] transition-all shadow-xs cursor-pointer"
              >
                <span>Browse all tours</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 5 Destination Cards matching Home PopularDestinations */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
            {iconicCircuits.map((circ) => (
              <SingleDestinationReusableCard
                key={circ.id}
                title={circ.title}
                image={circ.image}
                eyebrow={circ.tag}
                description={circ.description}
                tourCountText={circ.count > 0 ? `${circ.count} Tours` : "View Trips"}
                href={circ.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 4. SECTION 1: FIND YOUR TRIP / PACKAGES (RELATING TO BEST SELLING PKGS)*/}
      {/* ====================================================================== */}
      <section
        id="trips"
        ref={tripsSectionRef}
        className="py-12 sm:py-16 md:py-20 bg-section-tint border-b border-section-border"
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="mb-6 sm:mb-8">
            <SectionLabel icon={<Sparkles className="w-3.5 h-3.5" />}>
              Featured Itineraries
            </SectionLabel>
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-slate-900 tracking-tight mt-1.5 font-heading">
              Choose Your <span className="text-[#F8904D]">India Journey</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
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
                      : "bg-white text-slate-700 border border-section-border hover:border-[#2E8B8B] hover:text-[#2E8B8B]"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Interactive Finder Controls */}
          <div className="bg-white border border-section-border rounded-2xl p-4 sm:p-5 shadow-xs mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-end">
              {/* Search input */}
              <div className="lg:col-span-5">
                <label htmlFor="fq" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Search
                </label>
                <div className="relative">
                  <input
                    id="fq"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="City or place, e.g. Jaipur, tiger, yoga"
                    className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2E8B8B] focus:ring-2 focus:ring-[#2E8B8B]/20 transition-all"
                  />
                  <Search size={15} className="absolute left-3 top-3 text-slate-400" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              </div>

              {/* Travel Style */}
              <div className="lg:col-span-3">
                <label htmlFor="fe" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Travel style
                </label>
                <select
                  id="fe"
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#2E8B8B] focus:ring-2 focus:ring-[#2E8B8B]/20 transition-all cursor-pointer"
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
                <label htmlFor="fd" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Duration
                </label>
                <select
                  id="fd"
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#2E8B8B] focus:ring-2 focus:ring-[#2E8B8B]/20 transition-all cursor-pointer"
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
                      ? "bg-white border border-slate-300 text-slate-800 hover:border-[#2E8B8B] hover:text-[#2E8B8B]"
                      : "bg-slate-100 text-slate-400 border border-transparent cursor-not-allowed"
                  }`}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Status line */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-6 pb-2">
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

          {/* Packages Grid: Uses KoiKoi's flagship TourPackageCard matching Home BestSellingPackages */}
          {filteredJourneys.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-slate-300">
              <HelpCircle size={40} className="mx-auto text-slate-400 mb-3" />
              <h3 className="text-lg font-bold text-slate-900">No packages match your search</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredJourneys.map((j) => (
                <TourPackageCard key={j.id} journey={j} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 5. STATES OF INDIA (COMPREHENSIVE DIRECTORY)                           */}
      {/* ====================================================================== */}
      <section id="states" className="py-12 sm:py-16 md:py-20 bg-white border-b border-section-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <SectionLabel icon={<Compass className="w-3.5 h-3.5" />}>
                Discover Every Region
              </SectionLabel>
              <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-slate-900 tracking-tight mt-1.5 font-heading">
                States in <span className="text-[#F8904D]">{displayTitle}</span>
                <span className="ml-3 align-middle text-xs font-bold text-[#F8904D] bg-[#F8904D]/10 px-3 py-1 rounded-full">
                  {displayedStates.length} States
                </span>
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
                Explore royal Rajasthan palaces, Taj Mahal heritage, lush Kerala backwaters, and Himalayan mountain passes.
              </p>
            </div>
          </div>

          {/* States Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
            {displayedStates.map((s) => (
              <StateCard
                key={s.id}
                state={s}
                countrySlug={country.slug}
                journeyCount={journeyCountForState(s.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 6. SECTION 3: HOW IT WORKS (EXACT SAME AS HOME PAGE HOW IT WORKS)      */}
      {/* ====================================================================== */}
      <section className="py-12 sm:py-16 md:py-20 bg-section-tint border-b border-section-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="mb-8 sm:mb-10 text-left">
            <SectionLabel icon={<Sparkles className="w-3.5 h-3.5" />}>
              Simple Process
            </SectionLabel>
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-slate-900 tracking-tight mt-1.5 font-heading">
              How It <span className="text-[#F8904D]">Works</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1.5 max-w-xl">
              Planning your dream India vacation should not feel like work. Three simple steps and you are set.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white border border-section-border rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="w-10 h-10 rounded-full bg-[#F8904D] text-white font-bold text-base flex items-center justify-center mb-5 shadow-sm shadow-[#F8904D]/30">
                  1
                </span>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                  Tell Us Your Plan
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
                  Share where you want to go, your dates and how many are travelling. Rough ideas are completely fine — our specialists guide you.
                </p>
              </div>
            </div>

            <div className="bg-white border border-section-border rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="w-10 h-10 rounded-full bg-[#F8904D] text-white font-bold text-base flex items-center justify-center mb-5 shadow-sm shadow-[#F8904D]/30">
                  2
                </span>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                  Get Your Custom Plan
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
                  We send a personalised itinerary with transparent pricing. Change the route, hotels or pace as many times as you like.
                </p>
              </div>
            </div>

            <div className="bg-white border border-section-border rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="w-10 h-10 rounded-full bg-[#F8904D] text-white font-bold text-base flex items-center justify-center mb-5 shadow-sm shadow-[#F8904D]/30">
                  3
                </span>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                  Travel With 24/7 Support
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
                  Your private car, driver and guides are arranged, and our team is on WhatsApp around the clock during your trip.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 6. EDITORIAL OVERVIEW (IF CMS HAS RICH CONTENT)                         */}
      {/* ====================================================================== */}
      {hasKnowMoreText && (
        <section className="py-10 bg-white border-b border-section-border">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
            <div className="max-w-4xl mx-auto border border-section-border rounded-2xl p-6 bg-slate-50/50">
              <button
                type="button"
                onClick={() => setIsSeoOpen(!isSeoOpen)}
                className="flex items-center justify-between w-full text-left text-sm sm:text-base font-bold text-slate-900 hover:text-[#2E8B8B] transition-colors cursor-pointer"
              >
                <span>Read detailed travel overview for {displayTitle}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${isSeoOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isSeoOpen && (
                <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
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
          </div>
        </section>
      )}

      {/* ====================================================================== */}
      {/* 7. SECTION: INDIA TRAVEL FAQS                                          */}
      {/* ====================================================================== */}
      <section id="faq" className="py-12 sm:py-16 md:py-20 bg-section-tint border-t border-section-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
            <SectionLabel icon={<HelpCircle className="w-3.5 h-3.5" />}>
              Got Questions?
            </SectionLabel>
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-slate-900 tracking-tight mt-1.5 font-heading">
              India Travel <span className="text-[#F8904D]">FAQs</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1.5 leading-relaxed">
              Quick answers to common questions about planning your India trip.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {allFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-section-border rounded-xl overflow-hidden bg-white transition-colors shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#2E8B8B] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`text-[#2E8B8B] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-white">
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
