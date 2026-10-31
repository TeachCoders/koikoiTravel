"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { SingleDestinationReusableCard } from "@/components/shared/SingleDestinationReusableCard";
import { useGetStates } from "@/feature/state/api/useState";
import { useGetTravelExperiences } from "@/feature/travelExperience/api/useTravelExperience";
import type { State, PaginatedResponse as StatePage } from "@/feature/state/type";
import type { TravelExperience, PaginatedResponse as ExperiencePage } from "@/feature/travelExperience/type";

interface DestinationItem {
  id: string | number;
  title: string;
  image?: string;
  eyebrow?: string;
  description?: string;
  region?: string;
  tourCountText?: string;
  href: string;
  displayOrder: number;
}

export const PopularDestinations: React.FC<{
  initialStates?: StatePage<State> | null;
  initialCountries?: any;
  initialExperiences?: ExperiencePage<TravelExperience> | null;
}> = ({ initialStates, initialExperiences }) => {
  const { states, isLoading: statesLoading } = useGetStates(
    {
      limit: 100,
      isActive: "true",
    },
    initialStates
  );

  const { travelExperiences, isLoading: experiencesLoading } = useGetTravelExperiences(
    {
      limit: 100,
      isActive: "true",
    },
    initialExperiences
  );

  // Top 5 Curated Destinations requested for Home Page:
  // Taj Mahal, Golden Triangle, Rajasthan, Kerala, South India
  const destinations = useMemo<DestinationItem[]>(() => {
    const list: DestinationItem[] = [];

    // 1. Taj Mahal
    const tajState = states.find((s) => s.slug === "taj-mahal");
    const tajExp = travelExperiences.find((e) => e.slug === "taj-mahal");
    const tajTours = tajState?.tourCount ?? tajExp?.tourCount ?? 12;
    list.push({
      id: "dest-taj-mahal",
      title: "Taj Mahal",
      image: tajState?.thumbImg || tajExp?.thumbImg || undefined,
      eyebrow: tajState?.banner?.bannerTag || tajExp?.banner?.bannerTag || "HOME OF TAJ MAHAL, INDIA",
      description: "Agra & Taj Mahal private sightseeing & heritage tours",
      region: "Uttar Pradesh",
      tourCountText: `${tajTours} Tours`,
      href: "/tour-packages/india/taj-mahal",
      displayOrder: 1,
    });

    // 2. Golden Triangle
    const gtExp = travelExperiences.find(
      (e) => e.slug === "golden-triangle-tour-india" || e.slug === "golden-triangle"
    );
    const gtState = states.find(
      (s) => s.slug === "golden-triangle" || s.slug === "golden-triangle-tour-india"
    );
    const gtTours = gtExp?.tourCount ?? gtState?.tourCount ?? 15;
    list.push({
      id: "dest-golden-triangle",
      title: "Golden Triangle",
      image: gtExp?.thumbImg || gtState?.thumbImg || undefined,
      eyebrow: gtExp?.banner?.bannerTag || gtState?.banner?.bannerTag || "ICONIC HERITAGE CIRCUIT",
      description: "Delhi, Agra & Jaipur private sightseeing & heritage tours",
      region: "North India",
      tourCountText: `${gtTours} Tours`,
      href: "/tour-packages/india/golden-triangle",
      displayOrder: 2,
    });

    // 3. Rajasthan
    const rajState = states.find((s) => s.slug === "rajasthan");
    const rajTours = rajState?.tourCount ?? 32;
    list.push({
      id: "dest-rajasthan",
      title: "Rajasthan",
      image: rajState?.thumbImg || undefined,
      eyebrow: rajState?.banner?.bannerTag || "LAND OF KINGS & PALACES",
      description: "Jaipur, Udaipur & desert forts private heritage tours",
      region: "Royal India",
      tourCountText: `${rajTours} Tours`,
      href: "/tour-packages/india/rajasthan",
      displayOrder: 3,
    });

    // 4. Kerala
    const keralaState = states.find((s) => s.slug === "kerala");
    const keralaTours = keralaState?.tourCount ?? 15;
    list.push({
      id: "dest-kerala",
      title: "Kerala",
      image: keralaState?.thumbImg || undefined,
      eyebrow: keralaState?.banner?.bannerTag || "GOD'S OWN COUNTRY",
      description: "Alleppey, Munnar & tropical backwaters private tours",
      region: "South India",
      tourCountText: `${keralaTours} Tours`,
      href: "/tour-packages/india/kerala",
      displayOrder: 4,
    });

    // 5. South India
    const southState = states.find((s) => s.slug === "south-india");
    const southTours = southState?.tourCount ?? 10;
    list.push({
      id: "dest-south-india",
      title: "South India",
      image: southState?.thumbImg || undefined,
      eyebrow: southState?.banner?.bannerTag || "TEMPLES & TROPICAL COASTS",
      description: "Mahabalipuram, Madurai & temple heritage tours",
      region: "Dravidian Heritage",
      tourCountText: `${southTours} Tours`,
      href: "/tour-packages/india/south-india",
      displayOrder: 5,
    });

    return list;
  }, [states, travelExperiences]);

  const isLoading = statesLoading || experiencesLoading;

  return (
    <section
      id="destinations"
      className="py-8 sm:py-10 md:py-12 bg-white relative border-y border-section-border z-10"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4 relative z-30">
          <div>
            <SectionLabel>Popular Destinations</SectionLabel>
            <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-slate-900 tracking-tight mt-1.5 font-heading">
              Where Will Your India Journey <span className="text-[#F8904D]">Take You?</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1.5 max-w-xl">
              Discover iconic royal cities, peaceful valleys, desert landscapes, and tropical backwaters.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-section-border text-slate-800 text-sm font-semibold hover:border-[#2E8B8B] hover:text-[#2E8B8B] transition-all shadow-xs"
            >
              <span>All destinations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-[310px] sm:h-[340px] md:h-[365px] rounded-2xl sm:rounded-3xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <p className="text-center text-slate-400 py-16">No destinations found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 animate-in fade-in duration-500">
            {destinations.map((item) => (
              <SingleDestinationReusableCard
                key={item.id}
                title={item.title}
                image={item.image}
                eyebrow={item.eyebrow}
                description={item.description}
                region={item.region}
                tourCountText={item.tourCountText}
                href={item.href}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularDestinations;
