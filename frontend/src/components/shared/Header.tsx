"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { useGetStates } from "@/feature/state/api/useState";
import { useGetJourneys } from "@/feature/journey/api/useJourney";
import { useGetTravelExperiences } from "@/feature/travelExperience/api/useTravelExperience";
import type { State } from "@/feature/state/type";
import type { Journey } from "@/feature/journey/type";
import type { TravelExperience } from "@/feature/travelExperience/type";
import { stripTourSuffix, pickPriorityLinks, type NavChild } from "@/lib/utils";
import { QuoteModal } from "./QuoteModal";
import { RequestCallbackModal } from "./RequestCallbackModal";
import { DestinationTreeCountry, DestinationTreeState } from "./DestinationMegaMenu";
import LanguageSelector from "./LanguageSelector";
import HeaderSearchBar from "./HeaderSearchBar";

const DEFAULT_DESTINATION_LINKS: NavChild[] = [
  { href: "/tour-packages/india", label: "India" },
  { href: "/tour-packages/india/kerala", label: "Kerala" },
  { href: "/tour-packages/india/rajasthan", label: "Rajasthan" },
  { href: "/tour-packages/india/jammu-and-kashmir", label: "Jammu And Kashmir" },
  { href: "/tour-packages/india/himachal-pradesh", label: "Himachal Pradesh" },
  { href: "/tour-packages/india/uttarakhand", label: "Uttarakhand" },
  { href: "/tour-packages/india/ladakh", label: "Ladakh" },
  { href: "/tour-packages/india/goa", label: "Goa" },
  { href: "/tour-packages/india/golden-triangle", label: "Golden Triangle" },
  { href: "/tour-packages/india/uttar-pradesh", label: "Uttar Pradesh" },
  { href: "/tour-packages/india/madhya-pradesh", label: "Madhya Pradesh" },
  { href: "/tour-packages/india/maharashtra", label: "Maharashtra" },
  { href: "/tour-packages/india/punjab", label: "Punjab" },
  { href: "/tour-packages/india/delhi", label: "Delhi" },
];

const DEFAULT_TOUR_LINKS: NavChild[] = [
  { href: "/tour-packages/3-days-delhi-agra-weekend-tour", label: "3 Days Delhi Agra Weekend Tour" },
  { href: "/tour-packages/8-days-rajasthan-wildlife-tour", label: "8 Days Rajasthan Wildlife Tour" },
  { href: "/tour-packages/8-days-kerala-hills-backwaters-beaches-tour", label: "8 Days Kerala Hills & Backwaters" },
  { href: "/tour-packages/16-days-rajasthan-itinerary-with-agra-and-delhi", label: "16 Days Rajasthan with Agra & Delhi" },
  { href: "/tour-packages/india/golden-triangle", label: "Golden Triangle Tour" },
  { href: "/tour-packages/india/kerala", label: "Kerala Tour Packages" },
  { href: "/tour-packages/india/rajasthan", label: "Rajasthan Tour Packages" },
  { href: "/tour-packages/india/jammu-and-kashmir", label: "Kashmir Tour Packages" },
  { href: "/tour-packages/india/himachal-pradesh", label: "Himachal Tour Packages" },
  { href: "/tour-packages/india/uttarakhand", label: "Uttarakhand Tour Packages" },
  { href: "/tour-packages/india/ladakh", label: "Ladakh Tour Packages" },
  { href: "/tour-packages/india/goa", label: "Goa Holiday Packages" },
];

const DEFAULT_EXPERIENCE_LINKS: NavChild[] = [
  { href: "/travel-experiences/nature", label: "Nature" },
  { href: "/travel-experiences/golden-triangle-tour-india", label: "Golden Triangle Tours India" },
  { href: "/travel-experiences/desert-safari", label: "Desert Safari" },
  { href: "/travel-experiences/wildlife", label: "Wildlife" },
  { href: "/travel-experiences/honeymoon", label: "Honeymoon" },
  { href: "/travel-experiences/hill-station", label: "Hill Station" },
  { href: "/travel-experiences/ayurveda-yoga", label: "Ayurveda & yoga" },
  { href: "/travel-experiences/beach-lake", label: "Beach & Lakes" },
  { href: "/travel-experiences/heritage-and-culture", label: "Heritage & Culture" },
  { href: "/travel-experiences/spiritual", label: "Spiritual" },
  { href: "/travel-experiences/family", label: "Family" },
  { href: "/travel-experiences/weekend-tours-in-india", label: "Weekend" },
];

function buildDefaultDestinationTree(): DestinationTreeCountry[] {
  return [
    {
      id: 1,
      title: "India",
      slug: "india",
      href: "/tour-packages/india",
      states: [
        {
          id: 1,
          title: "Kerala",
          slug: "kerala",
          href: "/tour-packages/india/kerala",
          displayOrder: 1,
          cities: [
            { id: 101, title: "Munnar", slug: "munnar", href: "/tour-packages/india/kerala/munnar" },
            { id: 102, title: "Alleppey", slug: "alleppey", href: "/tour-packages/india/kerala/alleppey" },
            { id: 103, title: "Kochi", slug: "kochi", href: "/tour-packages/india/kerala/kochi" },
            { id: 104, title: "Kovalam", slug: "kovalam", href: "/tour-packages/india/kerala/kovalam" },
            { id: 105, title: "Thekkady", slug: "thekkady", href: "/tour-packages/india/kerala/thekkady" },
            { id: 106, title: "Kumarakom", slug: "kumarakom", href: "/tour-packages/india/kerala/kumarakom" },
          ],
        },
        {
          id: 2,
          title: "Rajasthan",
          slug: "rajasthan",
          href: "/tour-packages/india/rajasthan",
          displayOrder: 2,
          cities: [
            { id: 201, title: "Jaipur", slug: "jaipur", href: "/tour-packages/india/rajasthan/jaipur" },
            { id: 202, title: "Udaipur", slug: "udaipur", href: "/tour-packages/india/rajasthan/udaipur" },
            { id: 203, title: "Jodhpur", slug: "jodhpur", href: "/tour-packages/india/rajasthan/jodhpur" },
            { id: 204, title: "Jaisalmer", slug: "jaisalmer", href: "/tour-packages/india/rajasthan/jaisalmer" },
            { id: 205, title: "Pushkar", slug: "pushkar", href: "/tour-packages/india/rajasthan/pushkar" },
            { id: 206, title: "Bikaner", slug: "bikaner", href: "/tour-packages/india/rajasthan/bikaner" },
            { id: 207, title: "Mount Abu", slug: "mount-abu", href: "/tour-packages/india/rajasthan/mount-abu" },
            { id: 208, title: "Ranakpur", slug: "ranakpur", href: "/tour-packages/india/rajasthan/ranakpur" },
            { id: 209, title: "Neemrana", slug: "neemrana", href: "/tour-packages/india/rajasthan/neemrana" },
            { id: 210, title: "Chittorgarh", slug: "chittorgarh", href: "/tour-packages/india/rajasthan/chittorgarh" },
            { id: 211, title: "Sariska", slug: "sariska", href: "/tour-packages/india/rajasthan/sariska" },
            { id: 212, title: "Bharatpur", slug: "bharatpur", href: "/tour-packages/india/rajasthan/bharatpur" },
            { id: 213, title: "Mandawa", slug: "mandawa", href: "/tour-packages/india/rajasthan/mandawa" },
            { id: 214, title: "Alwar", slug: "alwar", href: "/tour-packages/india/rajasthan/alwar" },
            { id: 215, title: "Bundi", slug: "bundi", href: "/tour-packages/india/rajasthan/bundi" },
            { id: 216, title: "Ajmer", slug: "ajmer", href: "/tour-packages/india/rajasthan/ajmer" },
          ],
        },
        {
          id: 3,
          title: "Jammu And Kashmir",
          slug: "jammu-and-kashmir",
          href: "/tour-packages/india/jammu-and-kashmir",
          displayOrder: 3,
          cities: [
            { id: 301, title: "Srinagar", slug: "srinagar", href: "/tour-packages/india/jammu-and-kashmir/srinagar" },
            { id: 302, title: "Gulmarg", slug: "gulmarg", href: "/tour-packages/india/jammu-and-kashmir/gulmarg" },
            { id: 303, title: "Pahalgam", slug: "pahalgam", href: "/tour-packages/india/jammu-and-kashmir/pahalgam" },
            { id: 304, title: "Sonamarg", slug: "sonamarg", href: "/tour-packages/india/jammu-and-kashmir/sonamarg" },
            { id: 305, title: "Patnitop", slug: "patnitop", href: "/tour-packages/india/jammu-and-kashmir/patnitop" },
          ],
        },
        {
          id: 4,
          title: "Himachal Pradesh",
          slug: "himachal-pradesh",
          href: "/tour-packages/india/himachal-pradesh",
          displayOrder: 4,
          cities: [
            { id: 401, title: "Shimla", slug: "shimla", href: "/tour-packages/india/himachal-pradesh/shimla" },
            { id: 402, title: "Manali", slug: "manali", href: "/tour-packages/india/himachal-pradesh/manali" },
            { id: 403, title: "Dharamshala", slug: "dharamshala", href: "/tour-packages/india/himachal-pradesh/dharamshala" },
            { id: 404, title: "Kufri", slug: "kufri", href: "/tour-packages/india/himachal-pradesh/kufri" },
            { id: 405, title: "Kasauli", slug: "kasauli", href: "/tour-packages/india/himachal-pradesh/kasauli" },
            { id: 406, title: "Rohtang Pass", slug: "rohtang-pass", href: "/tour-packages/india/himachal-pradesh/rohtang-pass" },
            { id: 407, title: "Sarchu", slug: "sarchu", href: "/tour-packages/india/himachal-pradesh/sarchu" },
          ],
        },
        {
          id: 5,
          title: "Ladakh",
          slug: "ladakh",
          href: "/tour-packages/india/ladakh",
          displayOrder: 5,
          cities: [
            { id: 501, title: "Leh", slug: "leh", href: "/tour-packages/india/ladakh/leh" },
            { id: 502, title: "Nubra Valley", slug: "nubra-valley", href: "/tour-packages/india/ladakh/nubra-valley" },
            { id: 503, title: "Pangong Tso", slug: "pangong-tso", href: "/tour-packages/india/ladakh/pangong-tso" },
            { id: 504, title: "Kargil", slug: "kargil", href: "/tour-packages/india/ladakh/kargil" },
            { id: 505, title: "Hanle", slug: "hanle", href: "/tour-packages/india/ladakh/hanle" },
            { id: 506, title: "Alchi Monastery", slug: "alchi-monastery", href: "/tour-packages/india/ladakh/alchi-monastery" },
            { id: 507, title: "Hemis Monastery", slug: "hemis-monastery", href: "/tour-packages/india/ladakh/hemis-monastery" },
            { id: 508, title: "Magnetic Hill", slug: "magnetic-hill", href: "/tour-packages/india/ladakh/magnetic-hill" },
          ],
        },
        {
          id: 6,
          title: "Uttarakhand",
          slug: "uttarakhand",
          href: "/tour-packages/india/uttarakhand",
          displayOrder: 6,
          cities: [
            { id: 601, title: "Rishikesh", slug: "rishikesh", href: "/tour-packages/india/uttarakhand/rishikesh" },
            { id: 602, title: "Nainital", slug: "nainital", href: "/tour-packages/india/uttarakhand/nainital" },
            { id: 603, title: "Mussoorie", slug: "mussoorie", href: "/tour-packages/india/uttarakhand/mussoorie" },
            { id: 604, title: "Auli", slug: "auli", href: "/tour-packages/india/uttarakhand/auli" },
            { id: 605, title: "Jim Corbett National Park", slug: "jim-corbett-national-park", href: "/tour-packages/india/uttarakhand/jim-corbett-national-park" },
          ],
        },
        {
          id: 7,
          title: "Uttar Pradesh",
          slug: "uttar-pradesh",
          href: "/tour-packages/india/uttar-pradesh",
          displayOrder: 7,
          cities: [
            { id: 701, title: "Agra", slug: "agra", href: "/tour-packages/india/uttar-pradesh/agra" },
            { id: 702, title: "Varanasi", slug: "varanasi", href: "/tour-packages/india/uttar-pradesh/varanasi" },
            { id: 703, title: "Lucknow", slug: "lucknow", href: "/tour-packages/india/uttar-pradesh/lucknow" },
            { id: 704, title: "Mathura", slug: "mathura", href: "/tour-packages/india/uttar-pradesh/mathura" },
          ],
        },
        {
          id: 8,
          title: "Goa",
          slug: "goa",
          href: "/tour-packages/india/goa",
          displayOrder: 8,
          cities: [
            { id: 801, title: "North Goa", slug: "north-goa", href: "/tour-packages/india/goa/north-goa" },
            { id: 802, title: "South Goa", slug: "south-goa", href: "/tour-packages/india/goa/south-goa" },
          ],
        },
        {
          id: 9,
          title: "Madhya Pradesh",
          slug: "madhya-pradesh",
          href: "/tour-packages/india/madhya-pradesh",
          displayOrder: 9,
          cities: [
            { id: 901, title: "Khajuraho", slug: "khajuraho", href: "/tour-packages/india/madhya-pradesh/khajuraho" },
            { id: 902, title: "Bandhavgarh", slug: "bandhavgarh", href: "/tour-packages/india/madhya-pradesh/bandhavgarh" },
            { id: 903, title: "Kanha National Park", slug: "kanha-national-park", href: "/tour-packages/india/madhya-pradesh/kanha-national-park" },
          ],
        },
        {
          id: 10,
          title: "Maharashtra",
          slug: "maharashtra",
          href: "/tour-packages/india/maharashtra",
          displayOrder: 10,
          cities: [
            { id: 1001, title: "Mumbai", slug: "mumbai", href: "/tour-packages/india/maharashtra/mumbai" },
            { id: 1002, title: "Tadoba", slug: "tadoba", href: "/tour-packages/india/maharashtra/tadoba" },
            { id: 1003, title: "Pench", slug: "pench", href: "/tour-packages/india/maharashtra/pench" },
            { id: 1004, title: "Nashik", slug: "nashik", href: "/tour-packages/india/maharashtra/nashik" },
            { id: 1005, title: "Nagpur", slug: "nagpur", href: "/tour-packages/india/maharashtra/nagpur" },
          ],
        },
        {
          id: 11,
          title: "Punjab",
          slug: "punjab",
          href: "/tour-packages/india/punjab",
          displayOrder: 11,
          cities: [
            { id: 1101, title: "Amritsar", slug: "amritsar", href: "/tour-packages/india/punjab/amritsar" },
          ],
        },
        {
          id: 12,
          title: "Delhi",
          slug: "delhi",
          href: "/tour-packages/india/delhi",
          displayOrder: 12,
          cities: [
            { id: 1201, title: "Gurugram", slug: "gurugram", href: "/tour-packages/india/delhi/gurugram" },
            { id: 1202, title: "New Delhi", slug: "new-delhi", href: "/tour-packages/india/delhi/new-delhi" },
          ],
        },
      ],
    },
  ];
}

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isOfferPage = pathname?.startsWith("/offers/");

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);
  const [expandedCountries, setExpandedCountries] = useState<Record<number, boolean>>({});
  const [expandedStates, setExpandedStates] = useState<Record<number, boolean>>({});
  const megaMenuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearMegaMenuCloseTimer = useCallback(() => {
    if (megaMenuCloseTimer.current) {
      clearTimeout(megaMenuCloseTimer.current);
      megaMenuCloseTimer.current = null;
    }
  }, []);

  const scheduleMegaMenuClose = useCallback(() => {
    megaMenuCloseTimer.current = setTimeout(() => {
      setOpenDesktopDropdown(null);
      megaMenuCloseTimer.current = null;
    }, 120);
  }, []);

  const handleMobileOpen = useCallback(() => {
    setOpenMenuKey(null);
    setExpandedCountries({});
    setExpandedStates({});
    setIsMobileMenuOpen(true);
  }, []);

  const handleMobileClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMenu = useCallback((key: string) => {
    setOpenMenuKey((prev) => (prev === key ? null : key));
  }, []);

  const toggleCountryExpanded = useCallback((id: number) => {
    setExpandedCountries((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleStateExpanded = useCallback((id: number) => {
    setExpandedStates((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  const { states } = useGetStates({ limit: 100, isActive: "true" });
  const { journeys } = useGetJourneys({ limit: 100, isActive: "true" });
  const { travelExperiences } = useGetTravelExperiences({
    limit: 100,
    isActive: "true",
  });

  const destinationTree = useMemo(() => {
    if (!states || states.length === 0) return [];

    const countryMap = new Map<number, DestinationTreeCountry>();

    states.forEach(state => {
      if (!state.country) return;
      // Golden Triangle is an Experience (/travel-experiences/golden-triangle-tour-india), not a State
      if (state.slug === "golden-triangle" || state.slug === "golden-triangle-tour-india") return;

      if (!countryMap.has(state.country.id)) {
        countryMap.set(state.country.id, {
          id: state.country.id,
          title: state.country.title,
          slug: state.country.slug,
          href: `/tour-packages/${state.country.slug}`,
          states: []
        });
      }

      const countryEntry = countryMap.get(state.country.id)!;

      const sortedCities = [...(state.cities || [])]
        .sort((a, b) => {
          const aOrder = a.displayOrder && a.displayOrder > 0 ? a.displayOrder : 999;
          const bOrder = b.displayOrder && b.displayOrder > 0 ? b.displayOrder : 999;
          return aOrder - bOrder;
        })
        .map(city => ({
          id: city.id as number,
          title: stripTourSuffix(city.title || ""),
          slug: city.slug || "",
          href: `/tour-packages/${state.country!.slug}/${state.slug}/${city.slug}`
        }));

      countryEntry.states.push({
        id: state.id,
        title: stripTourSuffix(state.h1Title || state.title || ""),
        slug: state.slug,
        href: `/tour-packages/${state.country.slug}/${state.slug}`,
        displayOrder: state.displayOrder && state.displayOrder > 0 ? state.displayOrder : 999,
        cities: sortedCities
      });
    });

    const result = Array.from(countryMap.values())
      .filter((country) => country.states.length > 0)
      .map((country) => {
        country.states.sort((a, b) => a.displayOrder - b.displayOrder);
        return country;
      });

    result.sort((a, b) => {
      if (a.slug.toLowerCase() === 'india') return -1;
      if (b.slug.toLowerCase() === 'india') return 1;
      return a.title.localeCompare(b.title);
    });

    return result;
  }, [states]);

  const tourLinks = useMemo(() => {
    const links = pickPriorityLinks<Journey>(
      journeys,
      (j) => j.displayOrder ?? 0,
      (j) => {
        return {
          href: `/tour-packages/${j.slug}`,
          label: stripTourSuffix(j.title || j.h1Title),
        };
      }
    );
    return links.length > 0 ? links : DEFAULT_TOUR_LINKS;
  }, [journeys]);

  const experienceLinks = useMemo(
    () => {
      const links = pickPriorityLinks<TravelExperience>(
        travelExperiences,
        (e) => e.displayOrder ?? 0,
        (e) => ({ href: `/travel-experiences/${e.slug}`, label: stripTourSuffix(e.title || e.h1Title) })
      );
      return links.length > 0 ? links : DEFAULT_EXPERIENCE_LINKS;
    },
    [travelExperiences]
  );

  const safeDestinationTree = useMemo<DestinationTreeCountry[]>(
    () => (destinationTree.length > 0 ? destinationTree : buildDefaultDestinationTree()),
    [destinationTree]
  );

  const destinationLinks = useMemo<NavChild[]>(() => {
    const links: NavChild[] = [];
    safeDestinationTree.forEach((country) =>
      country.states.forEach((state) =>
        links.push({ href: state.href, label: state.title })
      )
    );
    return links.length > 0 ? links.slice(0, 16) : DEFAULT_DESTINATION_LINKS;
  }, [safeDestinationTree]);

  type NavLink = {
    href: string;
    label: string;
    isDestinationMega?: boolean;
    tree?: DestinationTreeCountry[];
    children?: NavChild[];
    dropdownStyle?: string;
    dropdownColumns?: number;
    seeAllHref?: string;
    dropdownTitle?: string;
    dropdownSubtext?: string;
    directHref?: string;
  };

  const navLinks: NavLink[] = useMemo(
    () => [
      {
        href: "/destinations",
        label: "Destinations",
        directHref: "/destinations",
        children: [{ href: "/destinations", label: "All Destinations" }, ...destinationLinks],
        dropdownStyle: "mega",
        dropdownColumns: 2,
        seeAllHref: "/destinations",
        dropdownTitle: "Top Destinations",
        dropdownSubtext: "Explore all destinations worldwide",
      },
      {
        href: "/tour-packages",
        label: "Tours",
        children: tourLinks,
        dropdownStyle: "mega",
        dropdownColumns: 2,
        seeAllHref: "/tour-packages",
        dropdownTitle: "Top Tour Packages",
        dropdownSubtext: "Explore all tour packages",
      },
      {
        href: "/travel-experiences",
        label: "Experiences",
        children: experienceLinks,
        dropdownStyle: "mega",
        seeAllHref: "/travel-experiences",
        dropdownTitle: "Top Experiences",
        dropdownSubtext: "Explore all experiences",
      },
      {
        href: "/about-company",
        label: "About Company",
        children: [
          { href: "/about-us", label: "About Us" },
          { href: "/guest-gallery", label: "Guest Gallery" },
          { href: "/contact-us", label: "Contact Us" },
        ],
        dropdownStyle: "mega",
        dropdownColumns: 1,
        dropdownTitle: "About Company",
      },
    ],
    [destinationLinks, tourLinks, experienceLinks]
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderMobileAccordion = navLinks.map((link) => {
    const isDrill = link.isDestinationMega && link.tree && link.tree.length > 0;
    const hasChildren = link.children && link.children.length > 0;
    const isOpen = openMenuKey === link.href;

    return (
      <div key={link.href} className="border-b border-[#f2f2f2] last:border-0">
        {!isDrill && !hasChildren ? (
          <Link
            href={link.href}
            onClick={handleMobileClose}
            className="flex w-full items-center justify-between px-2 py-3.5 text-[16px] font-semibold text-[#1C1C1C] transition-colors hover:bg-[#f6f7f8]"
          >
            {link.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => toggleMenu(link.href)}
            aria-expanded={isOpen}
            className="flex w-full items-center justify-between px-2 py-3.5 text-[16px] font-semibold text-[#1C1C1C] transition-colors hover:bg-[#f6f7f8]"
          >
            <span>{link.label}</span>
            <ChevronDown
              className={`h-5 w-5 text-[#999] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        )}

        <div
          className={`grid transition-all duration-300 ease-in-out ${isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
            }`}
        >
          <div className="overflow-hidden">
            <div className="pb-3">
            {isDrill ? (
              safeDestinationTree.map((country) => {
                const isCountryOpen = !!expandedCountries[country.id];
                return (
                  <div key={country.id}>
                    <button
                      type="button"
                      onClick={() => toggleCountryExpanded(country.id)}
                      aria-expanded={isCountryOpen}
                      className="flex w-full items-center justify-between px-4 py-2.5 text-[15px] font-semibold text-[#1C1C1C] transition-colors hover:bg-[#f6f7f8]"
                    >
                      <span>{country.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-[#999] transition-transform duration-300 ${isCountryOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${isCountryOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <div>
                        <Link
                          href={country.href}
                          onClick={handleMobileClose}
                          className="flex items-center gap-1 px-4 py-2 text-[14px] font-bold text-[#F8904D]"
                        >
                          View all {country.title} tours <span aria-hidden>→</span>
                        </Link>
                        {country.states.map((state) => {
                          const isStateOpen = !!expandedStates[state.id];
                          return (
                            <div key={state.id}>
                              <button
                                type="button"
                                onClick={() => toggleStateExpanded(state.id)}
                                aria-expanded={isStateOpen}
                                className="flex w-full items-center justify-between px-6 py-2.5 text-[15px] font-semibold text-[#2E8B8B] transition-colors hover:bg-[#f6f7f8]"
                              >
                                <span>{state.title}</span>
                                <ChevronDown
                                  className={`h-4 w-4 text-[#999] transition-transform duration-300 ${isStateOpen ? "rotate-180" : ""}`}
                                />
                              </button>
                              <div
                              className={`grid transition-all duration-300 ease-in-out ${isStateOpen
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                                }`}
                            >
                              <div className="overflow-hidden">
                                <div className="flex flex-col">
                                  {state.cities.map((city) => (
                                    <Link
                                      key={city.id}
                                      href={city.href}
                                      onClick={handleMobileClose}
                                      className="px-8 py-2 text-[14px] text-[#444] transition-colors hover:bg-[#f6f7f8] hover:text-[#2E8B8B]"
                                    >
                                      {city.title}
                                    </Link>
                                  ))}
                                  <Link
                                    href={state.href}
                                    onClick={handleMobileClose}
                                    className="flex items-center gap-1 px-6 py-2 text-[14px] font-bold text-[#F8904D]"
                                  >
                                    View all {state.title} tours <span aria-hidden>→</span>
                                  </Link>
                                </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                {link.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={handleMobileClose}
                    className="block px-4 py-2.5 text-[15px] font-medium text-[#444] transition-colors hover:bg-[#f6f7f8] hover:text-[#1C1C1C]"
                  >
                    <span suppressHydrationWarning>{child.label}</span>
                  </Link>
                ))}
                {link.seeAllHref && (
                  <Link
                    href={link.seeAllHref}
                    onClick={handleMobileClose}
                    className="flex items-center gap-1 px-4 py-2.5 text-[14px] font-bold text-[#F8904D]"
                  >
                    See All <span aria-hidden>→</span>
                  </Link>
                )}
              </>
            )}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-200 ${isScrolled
          ? "bg-white/98 backdrop-blur-md shadow-md border-b border-slate-200/80"
          : "bg-white border-b border-slate-100"
          }`}
      >
        <div
          className={`max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 transition-[padding] duration-200 ${
            isScrolled ? "py-2 sm:py-2.5" : "py-3 sm:py-3.5"
          }`}
        >
        {/* ===== Single Compact Row: Logo | Search Bar | Nav Links + Create My Trip ===== */}
        <div className="flex items-center justify-between gap-1.5 lg:gap-2.5 xl:gap-4">
          {/* 1. Brand Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo-with-name.png"
              alt="KoiKoi Travel"
              width={685}
              height={222}
              priority
              className="w-[125px] sm:w-[140px] md:w-[155px] lg:w-[168px] xl:w-[175px] h-auto object-contain"
            />
          </Link>

          {/* 2. Navigation Links (Centered) */}
          {!isOfferPage && (
            <nav className="hidden md:flex items-center justify-center gap-0.5 lg:gap-1 flex-1 mx-1 lg:mx-2 xl:mx-3 shrink-0">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => (link.children || link.isDestinationMega) ? (clearMegaMenuCloseTimer(), setOpenDesktopDropdown(link.href)) : null}
                  onMouseLeave={() => (link.children || link.isDestinationMega) ? scheduleMegaMenuClose() : setOpenDesktopDropdown(null)}
                >
                  {link.directHref ? (
                    <div className="flex items-center h-full">
                      <Link
                        href={link.directHref}
                        onClick={() => setOpenDesktopDropdown(null)}
                        className={`relative whitespace-nowrap px-2 xl:px-2.5 py-1.5 text-[12.5px] xl:text-[13.5px] font-medium tracking-normal rounded-full transition-all duration-200 group flex items-center gap-1 hover:text-[#2E8B8B] hover:bg-[#2E8B8B]/5 ${openDesktopDropdown === link.href
                          ? "text-[#2E8B8B] bg-[#2E8B8B]/5"
                          : "text-[#333]"
                          }`}
                      >
                        <span className="relative z-10">{link.label}</span>
                      </Link>
                      <button
                        type="button"
                        aria-label={`Open ${link.label} menu`}
                        onClick={() =>
                          setOpenDesktopDropdown(
                            openDesktopDropdown === link.href ? null : link.href
                          )
                        }
                        className={`pr-1.5 pl-0.5 py-1.5 cursor-pointer transition-colors duration-200 ${openDesktopDropdown === link.href
                          ? "text-[#2E8B8B]"
                          : "text-[#888] hover:text-[#2E8B8B]"
                          }`}
                      >
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${openDesktopDropdown === link.href ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                    </div>
                  ) : link.children || link.isDestinationMega ? (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDesktopDropdown(
                          openDesktopDropdown === link.href ? null : link.href
                        )
                      }
                      className={`relative whitespace-nowrap px-2 xl:px-2.5 py-1.5 text-[12.5px] xl:text-[13.5px] font-medium tracking-normal rounded-full transition-all duration-200 group flex items-center gap-1 hover:text-[#2E8B8B] hover:bg-[#2E8B8B]/5 cursor-pointer ${openDesktopDropdown === link.href
                        ? "text-[#2E8B8B] bg-[#2E8B8B]/5"
                        : "text-[#333]"
                        }`}
                    >
                      <span className="relative z-10" suppressHydrationWarning>{link.label}</span>
                      <ChevronDown
                        className={`w-3 h-3 relative z-10 transition-transform duration-200 ${openDesktopDropdown === link.href ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`relative whitespace-nowrap px-2 xl:px-2.5 py-1.5 text-[12.5px] xl:text-[13.5px] font-medium tracking-normal rounded-full transition-all duration-200 group flex items-center gap-1 hover:text-[#2E8B8B] hover:bg-[#2E8B8B]/5 ${openDesktopDropdown === link.href
                        ? "text-[#2E8B8B] bg-[#2E8B8B]/5"
                        : "text-[#333]"
                        }`}
                    >
                      <span className="relative z-10" suppressHydrationWarning>{link.label}</span>
                    </Link>
                  )}

                  {link.children && link.dropdownStyle === "mega" && (
                    <div
                      onMouseEnter={() => setOpenDesktopDropdown(link.href)}
                      onMouseLeave={() => setOpenDesktopDropdown(null)}
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-opacity duration-200 ${openDesktopDropdown === link.href
                        ? "opacity-100 visible pointer-events-auto"
                        : "opacity-0 invisible pointer-events-none"
                        }`}
                    >
                      <div
                        className={`bg-white rounded-2xl border border-slate-200/90 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] p-5 ${link.dropdownColumns === 1 ? "w-[280px]" : "w-[720px] max-w-[85vw]"
                          }`}
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-[16px] font-bold text-[#2E8B8B] tracking-tight">
                            {link.dropdownTitle ?? "Popular Tour Packages"}
                          </span>
                        </div>
                        <div
                          className={`grid gap-x-6 gap-y-1 ${link.dropdownColumns === 1
                            ? "grid-cols-1"
                            : link.dropdownColumns === 2
                              ? "grid-cols-2"
                              : "grid-cols-3"
                            }`}
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpenDesktopDropdown(null)}
                              className="px-2.5 py-1.5 -mx-2.5 rounded-lg text-[14px] text-slate-700 hover:text-[#2E8B8B] hover:bg-slate-50 font-medium transition-colors duration-150 truncate block"
                            >
                              <span suppressHydrationWarning>{child.label}</span>
                            </Link>
                          ))}
                        </div>
                        {link.seeAllHref && (
                          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[13px] text-slate-500 font-medium">
                              {link.dropdownSubtext ?? "Explore all destinations worldwide"}
                            </span>
                            <Link
                              href={link.seeAllHref}
                              onClick={() => setOpenDesktopDropdown(null)}
                              className="text-[14px] font-bold text-[#F8904D] hover:text-[#e07a38] transition-colors flex items-center gap-1"
                            >
                              <span>See All</span>
                              <span aria-hidden>→</span>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* 3. Right Controls: Search Bar -> Language Selector -> Create My Trip Button */}
          {!isOfferPage && (
            <div className="hidden md:flex items-center gap-1.5 lg:gap-2 xl:gap-2.5 shrink-0">
              {/* Search Bar (Next to Language Selector) */}
              <div className="w-[130px] md:w-[150px] lg:w-[175px] xl:w-[220px] 2xl:w-[260px]">
                <HeaderSearchBar />
              </div>

              {/* Language Selector (Next to Create My Trip) */}
              <LanguageSelector />

              {/* Create My Trip CTA Button */}
              <QuoteModal>
                <button
                  type="button"
                  className="btn-primary px-2.5 lg:px-3.5 h-10 sm:h-11 md:h-11 text-xs lg:text-[13px] font-semibold tracking-wide flex items-center justify-center gap-1 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <span>Create My Trip</span>
                </button>
              </QuoteModal>
            </div>
          )}

          {/* Mobile Right Controls: Language Selector + Create My Trip + Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
            <LanguageSelector />

            <QuoteModal>
              <button
                type="button"
                className="btn-primary px-2.5 sm:px-3 h-10 sm:h-11 text-xs font-semibold flex items-center justify-center gap-1 shadow-xs cursor-pointer shrink-0"
              >
                <span>Create My Trip</span>
              </button>
            </QuoteModal>

            {!isOfferPage && (
              <button
                onClick={() => (isMobileMenuOpen ? handleMobileClose() : handleMobileOpen())}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                className="p-1.5 rounded-lg text-[#555] hover:bg-[#f5f5f5] transition-colors focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar (Only shown on mobile beneath logo row) */}
        {!isOfferPage && (
          <div className="mt-2 pb-1 md:hidden">
            <HeaderSearchBar />
          </div>
        )}
      </div>

      {/* Mobile drawer navigation (slide-in, drill-down) */}
      {!isOfferPage &&
        typeof document !== "undefined" &&
        mounted &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className={`fixed inset-0 z-[65] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              onClick={handleMobileClose}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <div
              className={`fixed top-0 left-0 z-[70] flex h-full w-[86vw] max-w-[380px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Drawer head */}
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#ececec] px-4">
                <Link
                  href="/"
                  onClick={handleMobileClose}
                  className="text-[19px] font-extrabold tracking-tight text-[#1C1C1C]"
                >
                  KoiKoi Travel<span className="text-[#2E8B8B]"> Holidays</span>
                </Link>
                <button
                  onClick={handleMobileClose}
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-[#555] transition-colors hover:bg-[#f5f5f5]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Accordion menu */}
              <div className="flex-1 overflow-y-auto px-3 py-3">
                <div className="space-y-2">{renderMobileAccordion}</div>
              </div>

                  {/* Drawer actions */}
              <div className="shrink-0 space-y-2 border-t border-[#ececec] px-4 py-3">
                <QuoteModal>
                  <button className="btn-primary w-full py-3 text-base">
                    <span>Enquire Now</span>
                  </button>
                </QuoteModal>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919136739178"}?text=${encodeURIComponent("Hi KoiKoi Travel, I want to inquire about a custom holiday tour package.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#2E8B8B] py-3 text-base font-bold text-white transition-colors hover:bg-[#266f6f] active:scale-95"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </>,
          document.body
        )}
    </header>
    {/* Spacer to preserve document flow so banner and content are never clipped under fixed header */}
    <div
      className={`${isOfferPage ? "h-[76px]" : "h-[120px] md:h-[76px]"} w-full shrink-0 pointer-events-none`}
      aria-hidden="true"
    />
  </>
  );
};

export default Header;
