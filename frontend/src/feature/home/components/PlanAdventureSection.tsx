"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SingleDestinationReusableCard } from "@/components/shared/SingleDestinationReusableCard";
import { CapsuleTabs } from "@/components/shared/CapsuleTabs";
import { SectionLabel } from "@/components/shared/SectionLabel";
import type { State, PaginatedResponse as StatePage } from "@/feature/state/type";
import type { TravelExperience, PaginatedResponse as ExperiencePage } from "@/feature/travelExperience/type";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import type { Season, PaginatedResponse as SeasonPage } from "@/feature/season/type";
import { useGetStates } from "@/feature/state/api/useState";
import { useGetTravelExperiences } from "@/feature/travelExperience/api/useTravelExperience";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import { resolveStateJourneys, resolveTravelExperienceJourneys } from "@/feature/journey/destinationJourneys";
import { stripHtml } from "@/lib/utils";

interface DestinationItem {
  id: string | number;
  title: string;
  image?: string;
  eyebrow?: string;
  description?: string;
  tourCountText?: string;
  href: string;
}

interface PlanAdventureSectionProps {
  initialStates?: StatePage<State> | null;
  initialExperiences?: ExperiencePage<TravelExperience> | null;
  initialJourneys?: JourneyPage<Journey> | null;
  initialSeasons?: SeasonPage<Season> | null;
}

export const PlanAdventureSection: React.FC<PlanAdventureSectionProps> = ({
  initialStates,
  initialExperiences,
  initialJourneys,
}) => {
  const [activeTab, setActiveTab] = useState<"destination" | "experience">("destination");

  // Synchronously extract lists from server props so SSR immediately has access to items
  const initialStatesList = useMemo(() => {
    if (!initialStates) return [];
    if (Array.isArray(initialStates)) return initialStates;
    if (Array.isArray((initialStates as any).data)) return (initialStates as any).data;
    if (Array.isArray((initialStates as any).items)) return (initialStates as any).items;
    return [];
  }, [initialStates]);

  const initialExpList = useMemo(() => {
    if (!initialExperiences) return [];
    if (Array.isArray(initialExperiences)) return initialExperiences;
    if (Array.isArray((initialExperiences as any).data)) return (initialExperiences as any).data;
    if (Array.isArray((initialExperiences as any).items)) return (initialExperiences as any).items;
    return [];
  }, [initialExperiences]);

  const initialJourneysList = useMemo(() => {
    if (!initialJourneys) return [];
    if (Array.isArray(initialJourneys)) return initialJourneys;
    if (Array.isArray((initialJourneys as any).data)) return (initialJourneys as any).data;
    if (Array.isArray((initialJourneys as any).items)) return (initialJourneys as any).items;
    return [];
  }, [initialJourneys]);

  // Fetch / Hydrate States (Destinations)
  const { states: clientStates } = useGetStates(
    {
      limit: 100,
      isActive: "true",
      includeAll: "true",
    } as any,
    initialStates
  );

  // Fetch / Hydrate Travel Experiences
  const { travelExperiences: clientExperiences } = useGetTravelExperiences(
    {
      limit: 100,
      isActive: "true",
    },
    initialExperiences
  );

  // Fetch / Hydrate Journeys for accurate tour count
  const { journeys: clientJourneys } = useGetJourneys(
    {
      limit: 100,
      isActive: "true",
    },
    initialJourneys
  );

  // Effective data sources (Server Props + React Query cache)
  const states = clientStates && clientStates.length > 0 ? clientStates : initialStatesList;
  const travelExperiences = clientExperiences && clientExperiences.length > 0 ? clientExperiences : initialExpList;
  const journeys = clientJourneys && clientJourneys.length > 0 ? clientJourneys : initialJourneysList;

  // Helper to resolve accurate tour count for states (checks curated order first, then tagged/destination journeys)
  const getStateCount = (stateObj: any, fallbackCount: number = 0) => {
    if (!stateObj) return fallbackCount;
    if (journeys && journeys.length > 0) {
      const { stateJourneys } = resolveStateJourneys(journeys, stateObj);
      if (stateJourneys && stateJourneys.length > 0) return stateJourneys.length;
    }
    const curatedOrder = stateObj.featuredJourneyOrder;
    if (Array.isArray(curatedOrder) && curatedOrder.length > 0) return curatedOrder.length;
    if (Array.isArray(stateObj.journeys) && stateObj.journeys.length > 0) return stateObj.journeys.length;
    return stateObj.tourCount || fallbackCount;
  };

  // Helper to resolve accurate tour count for experiences (checks curated order first, then tagged journeys)
  const getExperienceCount = (expObj: any, fallbackCount: number = 0) => {
    if (!expObj) return fallbackCount;
    if (journeys && journeys.length > 0) {
      const { experienceJourneys } = resolveTravelExperienceJourneys(journeys, expObj);
      if (experienceJourneys && experienceJourneys.length > 0) return experienceJourneys.length;
    }
    const curatedOrder = expObj.featuredJourneyOrder;
    if (Array.isArray(curatedOrder) && curatedOrder.length > 0) return curatedOrder.length;
    if (Array.isArray(expObj.journeys) && expObj.journeys.length > 0) return expObj.journeys.length;
    return expObj.tourCount || fallbackCount;
  };

  // 1. Top Curated Destinations (SingleDestinationReusableCard format)
  const destinations = useMemo<DestinationItem[]>(() => {
    const list: DestinationItem[] = [];

    // 1. Taj Mahal
    const tajState = states.find((s: any) => s.slug === "taj-mahal");
    const tajExp = travelExperiences.find((e: any) => e.slug === "taj-mahal");
    const tajTours = getStateCount(tajState, getExperienceCount(tajExp, 12));
    list.push({
      id: "dest-taj-mahal",
      title: "Taj Mahal",
      image: tajState?.thumbImg || tajExp?.thumbImg || "/india/trip/url-banner-thumb-1793419518009-8d41ab.webp",
      eyebrow: tajState?.banner?.bannerTag || tajExp?.banner?.bannerTag || "HOME OF TAJ MAHAL, INDIA",
      description: tajState?.cardShortDescription || tajExp?.cardShortDescription || "Agra & Taj Mahal private sightseeing & heritage tours",
      tourCountText: `${tajTours} Tours`,
      href: "/tour-packages/india/taj-mahal",
    });

    // 2. Golden Triangle (Driven exclusively by State 30)
    const gtState = states.find((s: any) => s.id === 30 || s.slug === "golden-triangle");
    const gtTours = getStateCount(gtState, 13);
    list.push({
      id: "dest-golden-triangle",
      title: "Golden Triangle",
      image: gtState?.thumbImg || "/india/trip/desktop-banner-1793421572670-thumb-1793421572676-a2298d.webp",
      eyebrow: gtState?.banner?.bannerTag || "FIRST CHOICE OF TRAVEL IN INDIA",
      description: gtState?.cardShortDescription || "Discover Golden Triangle tours with Delhi, Agra, Jaipur, Taj Mahal, forts and local markets in India",
      tourCountText: `${gtTours} Tours`,
      href: "/tour-packages/india/golden-triangle",
    });

    // 3. Rajasthan
    const rajState = states.find((s: any) => s.slug === "rajasthan");
    const rajTours = getStateCount(rajState, 16);
    list.push({
      id: "dest-rajasthan",
      title: "Rajasthan",
      image: rajState?.thumbImg || "/india/trip/rajasthan-thumb.webp",
      eyebrow: rajState?.banner?.bannerTag || "LAND OF KINGS & PALACES",
      description: rajState?.cardShortDescription || "Jaipur, Udaipur & desert forts private heritage tours",
      tourCountText: `${rajTours} Tours`,
      href: "/tour-packages/india/rajasthan",
    });

    // 4. Kerala
    const keralaState = states.find((s: any) => s.slug === "kerala");
    const keralaTours = getStateCount(keralaState, 7);
    list.push({
      id: "dest-kerala",
      title: "Kerala",
      image: keralaState?.thumbImg || "/india/trip/allerpey-house-boat-1793424353077-thumb-1793424353083-271e0e.webp",
      eyebrow: keralaState?.banner?.bannerTag || "GOD'S OWN COUNTRY",
      description: keralaState?.cardShortDescription || "Alleppey, Munnar & tropical backwaters private tours",
      tourCountText: `${keralaTours} Tours`,
      href: "/tour-packages/india/kerala",
    });

    // 5. South India
    const southState = states.find((s: any) => s.slug === "south-india");
    const southTours = getStateCount(southState, 11);
    list.push({
      id: "dest-south-india",
      title: "South India",
      image: southState?.thumbImg || "/india/trip/south-india-1793424596731-thumb-1793424596737-527f4a.webp",
      eyebrow: southState?.banner?.bannerTag || "TEMPLES & TROPICAL COASTS",
      description: southState?.cardShortDescription || "Mahabalipuram, Madurai & temple heritage tours",
      tourCountText: `${southTours} Tours`,
      href: "/tour-packages/india/south-india",
    });

    return list;
  }, [states, travelExperiences, journeys]);

  // 2. Curated Experiences (Guaranteed 5 items for SSR SEO and full content)
  const experiences = useMemo<DestinationItem[]>(() => {
    const rawFiltered = travelExperiences
      .filter(
        (e: any) =>
          !/^test\b/i.test(e.title || "") &&
          e.slug !== "taj-mahal" &&
          e.slug !== "golden-triangle" &&
          e.slug !== "golden-triangle-tour-india"
      )
      .map((exp: any) => {
        const count = getExperienceCount(exp, 4);
        let eyebrow = "EXPERIENCE INDIA";
        if (/wildlife/i.test(exp.title)) eyebrow = "WILDLIFE & JUNGLE SAFARI";
        else if (/heritage/i.test(exp.title)) eyebrow = "ROYAL HERITAGE & CULTURE";
        else if (/honeymoon/i.test(exp.title)) eyebrow = "ROMANTIC HONEYMOON GETAWAY";
        else if (/spiritual/i.test(exp.title)) eyebrow = "SACRED TEMPLES & PILGRIMAGE";
        else if (/ayurveda/i.test(exp.title)) eyebrow = "HOLISTIC AYURVEDA & YOGA";
        else if (/desert/i.test(exp.title)) eyebrow = "DESERT SAFARI & DUNES";
        else if (/family/i.test(exp.title)) eyebrow = "FAMILY VACATIONS IN INDIA";

        const rawDesc = stripHtml(exp.cardShortDescription || exp.overView || exp.description || "");
        const description =
          rawDesc.length > 90 ? `${rawDesc.slice(0, 90)}...` : rawDesc || "Handcrafted private holiday itineraries designed for your travel style";

        return {
          id: `exp-${exp.id}`,
          title: exp.title,
          image: exp.thumbImg || "/wildlife/trip/indian-wild-life-trip-journey-600x400-1793958493477-028d48.webp",
          eyebrow,
          description,
          tourCountText: `${count} Tours`,
          href: `/travel-experiences/${exp.slug}`,
        };
      });

    // Curated fallbacks matching the exact text: Wildlife, Ayurveda & Yoga, Heritage, Spiritual, Family
    const fallbackExperiences: DestinationItem[] = [
      {
        id: "exp-fallback-wildlife",
        title: "Wildlife Safari",
        image: "/wildlife/trip/indian-wild-life-trip-journey-600x400-1793958493477-028d48.webp",
        eyebrow: "WILDLIFE & JUNGLE SAFARI",
        description: "Thrilling jeep safaris to spot Bengal tigers, rhinos & rare wildlife in premier national parks",
        tourCountText: `${getExperienceCount(travelExperiences.find((e: any) => /wildlife/i.test(e.slug || e.title)), 10)} Tours`,
        href: "/travel-experiences/wildlife-safari",
      },
      {
        id: "exp-fallback-ayurveda",
        title: "Ayurveda & Yoga",
        image: "/india/trip/allerpey-house-boat-1793424353077-thumb-1793424353083-271e0e.webp",
        eyebrow: "HOLISTIC AYURVEDA & YOGA",
        description: "Rejuvenating holistic retreats, authentic daily yoga & ancient Ayurvedic healing therapies",
        tourCountText: `${getExperienceCount(travelExperiences.find((e: any) => /ayurveda/i.test(e.slug || e.title)), 3)} Tours`,
        href: "/travel-experiences/ayurveda-yoga",
      },
      {
        id: "exp-fallback-heritage",
        title: "Heritage & Culture",
        image: "/india/trip/rajasthan-thumb.webp",
        eyebrow: "ROYAL HERITAGE & CULTURE",
        description: "Grand royal fortresses, historic palaces and immersive living traditions across India",
        tourCountText: `${getExperienceCount(travelExperiences.find((e: any) => /heritage/i.test(e.slug || e.title)), 6)} Tours`,
        href: "/travel-experiences/heritage-culture",
      },
      {
        id: "exp-fallback-spiritual",
        title: "Spiritual Journeys",
        image: "/india/trip/south-india-1793424596731-thumb-1793424596737-527f4a.webp",
        eyebrow: "SACRED TEMPLES & PILGRIMAGE",
        description: "Varanasi Ganga evening aarti, sacred Dravidian temples & peaceful spiritual pilgrimages",
        tourCountText: `${getExperienceCount(travelExperiences.find((e: any) => /spiritual/i.test(e.slug || e.title)), 4)} Tours`,
        href: "/travel-experiences/spiritual-journeys",
      },
      {
        id: "exp-fallback-family",
        title: "Family Vacations",
        image: "/india/trip/desktop-banner-1793421572670-thumb-1793421572676-a2298d.webp",
        eyebrow: "FAMILY VACATIONS IN INDIA",
        description: "Comfortable, kid-friendly holidays with private transport, relaxed pacing & memorable experiences",
        tourCountText: `${getExperienceCount(travelExperiences.find((e: any) => /family/i.test(e.slug || e.title)), 2)} Tours`,
        href: "/travel-experiences/family-vacations",
      },
    ];

    if (rawFiltered.length >= 5) {
      return rawFiltered.slice(0, 5);
    }

    // Merge API experiences with curated fallbacks to guarantee 5 rich items
    const merged = [...rawFiltered];
    for (const fb of fallbackExperiences) {
      if (merged.length >= 5) break;
      if (!merged.some((m) => m.title.toLowerCase() === fb.title.toLowerCase())) {
        merged.push(fb);
      }
    }
    return merged.slice(0, 5);
  }, [travelExperiences, journeys]);

  const getViewAllLink = () => {
    switch (activeTab) {
      case "experience":
        return { label: "All experiences", href: "/travel-experiences" };
      default:
        return { label: "All destinations", href: "/tour-packages/india" };
    }
  };

  const viewAll = getViewAllLink();

  return (
    <section id="explore-adventure" className="py-8 sm:py-10 md:py-12 bg-white relative border-y border-section-border z-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* ===== TOP HEADER & PILL TABS (LEFT-ALIGNED & FULL WIDTH) ===== */}
        <div className="mb-6 sm:mb-8">
          {/* Eyebrow */}
          <SectionLabel>Start Exploring</SectionLabel>

          {/* Main Title (Left-aligned) */}
          <h2 className="font-heading text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-bold text-slate-900 tracking-tight mt-1.5 leading-tight">
            Plan Your India Holiday, <span className="text-[#F8904D]">Your Way</span>
          </h2>

          {/* Subtitle (FULL WIDTH, STRUCTURED WITH PARAGRAPH BREAKS) */}
          <div className="text-slate-600 text-sm sm:text-base mt-2.5 w-full leading-relaxed font-normal text-left space-y-1.5">
            <p>
              <strong className="font-semibold text-slate-900">Plan your India holiday your way.</strong> Choose <strong className="font-semibold text-slate-900">By Destination</strong> to find places like <strong className="font-semibold text-slate-900">Rajasthan</strong>, where you can visit grand royal palaces, the <strong className="font-semibold text-slate-900">Taj Mahal</strong>, a world-famous monument of love, <strong className="font-semibold text-slate-900">Kerala</strong>, known as God&apos;s Own Country for its beautiful backwaters, and <strong className="font-semibold text-slate-900">South India</strong>, famous for its ancient temples.
            </p>
            <p>
              Or choose <strong className="font-semibold text-slate-900">By Experience</strong> to enjoy relaxing <strong className="font-semibold text-slate-900">Ayurveda and Yoga</strong> retreats, exciting <strong className="font-semibold text-slate-900">wildlife adventures</strong> with jungle jeep safaris, <strong className="font-semibold text-slate-900">spiritual journeys</strong>, <strong className="font-semibold text-slate-900">family holidays</strong> and peaceful <strong className="font-semibold text-slate-900">hill station escapes</strong>. Find the holiday that suits your interests.
            </p>
          </div>

          {/* Tabs Switcher (Centered) */}
          <div className="mt-5 sm:mt-6 flex justify-center">
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

        {/* =========================================================================
            100% SEO (VIEW SOURCE) GUARANTEE:
            Both Destinations and Experiences are ALWAYS rendered directly into the HTML.
            No skeleton pulse hides them during SSR.
            Active tab has "block", inactive has "hidden" so web crawlers index all card texts.
           ========================================================================= */}

        {/* TAB 1: DESTINATIONS GRID */}
        <div className={activeTab === "destination" ? "block" : "hidden"} aria-hidden={activeTab !== "destination"}>
          <div className="grid grid-cols-1 min-[350px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 animate-in fade-in duration-300">
            {destinations.map((item) => (
              <SingleDestinationReusableCard
                key={item.id}
                title={item.title}
                image={item.image}
                eyebrow={item.eyebrow}
                description={item.description}
                tourCountText={item.tourCountText}
                href={item.href}
              />
            ))}
          </div>
        </div>

        {/* TAB 2: EXPERIENCES GRID */}
        <div className={activeTab === "experience" ? "block" : "hidden"} aria-hidden={activeTab !== "experience"}>
          <div className="grid grid-cols-1 min-[350px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 animate-in fade-in duration-300">
            {experiences.map((item) => (
              <SingleDestinationReusableCard
                key={item.id}
                title={item.title}
                image={item.image}
                eyebrow={item.eyebrow}
                description={item.description}
                tourCountText={item.tourCountText}
                href={item.href}
              />
            ))}
          </div>
        </div>

        {/* Bottom Centered CTA Button */}
        <div className="mt-7 sm:mt-9 flex justify-center">
          <Link
            href={viewAll.href}
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#F8904D] active:scale-95 cursor-pointer"
          >
            <span>{viewAll.label}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PlanAdventureSection;
