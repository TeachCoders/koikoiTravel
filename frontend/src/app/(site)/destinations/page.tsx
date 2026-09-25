import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Compass,
  Crown,
  ArrowRight,
  ChevronRight,
  Globe2,
  Route,
  CheckCircle2,
  CalendarRange,
} from "lucide-react";
import { fetchPublicJsonCached } from "@/feature/destinations/api/public-server";
import { stripHtml } from "@/lib/utils";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { FaqSection } from "@/feature/home/components/FaqSection";
import { QuoteModal } from "@/components/shared/QuoteModal";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://koikoitravel.com";

export const revalidate = 60;

type CBanner = {
  entityId: number;
  bannerTitle?: string | null;
  bannerTag?: string | null;
  images?: string[];
} | null;

type CCountry = {
  id: number;
  title: string;
  slug: string;
  h1Title?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  overView?: string | null;
  thumbImg?: string | null;
  capital?: string | null;
  language?: string | null;
  bestTimeToVisit?: string | null;
  currency?: string | null;
  displayOrder?: number | null;
  tourCount?: number;
  banner?: CBanner;
};

type CState = {
  id: number;
  countryId: number;
  title: string;
  slug: string;
  h1Title?: string | null;
  seoDescription?: string | null;
  overView?: string | null;
  thumbImg?: string | null;
  displayOrder?: number | null;
  tourCount?: number;
  famousFor?: string | null;
  capital?: string | null;
  banner?: CBanner;
  country?: { id: number; title: string; slug: string } | null;
  cities?: CCity[];
};

type CCity = {
  id: number;
  title: string;
  slug: string;
  thumbImg?: string | null;
  displayOrder?: number | null;
};

type CJourney = {
  id: number;
  title: string;
  slug: string;
  h1Title?: string | null;
  overView?: string | null;
  seoDescription?: string | null;
  thumbImg?: string | null;
  destination?: string | null;
  duration?: string | null;
  noDays?: number | null;
  pricePerPerson?: number | null;
  discountPrice?: number | null;
  highlights?: string[] | null;
  displayOrder?: number | null;
  purchaseCount?: number | null;
  banner?: CBanner;
  cities?: { title: string; slug: string }[] | null;
};

const orderByDisplay = <T extends { displayOrder?: number | null; title: string }>(
  items: T[]
): T[] =>
  [...items].sort((a, b) => {
    const ao = a.displayOrder && a.displayOrder > 0 ? a.displayOrder : 99999;
    const bo = b.displayOrder && b.displayOrder > 0 ? b.displayOrder : 99999;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title);
  });

const img = (
  primary?: string | null,
  secondary?: string | null,
  tertiary?: string | null
): string | undefined => primary || secondary || tertiary || undefined;

async function fetchDestinations() {
  const [countriesRes, statesRes, journeysRes] = await Promise.all([
    fetchPublicJsonCached<{ success: boolean; data: CCountry[] }>(
      "/country?limit=200"
    ),
    fetchPublicJsonCached<{ success: boolean; data: CState[] }>(
      "/state?limit=200"
    ),
    fetchPublicJsonCached<{ success: boolean; data: CJourney[] }>(
      "/journey?limit=100&isActive=true"
    ),
  ]);

  const countries = (countriesRes?.data || []).filter(
    (c) => !/^test\b/i.test(c.title || "")
  );
  const states = (statesRes?.data || []).filter(
    (s) => !/^test\b/i.test(s.title || "")
  );
  const journeys = (journeysRes?.data || []).filter(
    (j) => !/^test\b/i.test(j.title || "")
  );

  const sortedCountries = [...countries].sort((a, b) => {
    const aIndia = a.slug.toLowerCase() === "india" ? -1 : 0;
    const bIndia = b.slug.toLowerCase() === "india" ? -1 : 0;
    if (aIndia !== bIndia) return aIndia - bIndia;
    return a.title.localeCompare(b.title);
  });

  const stateMap = new Map<number, CState[]>();
  states.forEach((s) => {
    const list = stateMap.get(s.countryId) || [];
    list.push(s);
    stateMap.set(s.countryId, list);
  });

  const orderedStates = orderByDisplay(states);
  const statesWithImages = orderedStates.filter(
    (s) => img(s.banner?.images?.[0], s.thumbImg)
  );
  const allCities = orderedStates.flatMap((s) =>
    orderByDisplay(s.cities || []).map((c) => ({ ...c, state: s }))
  );
  const featuredCities = [
    ...allCities.filter((c) => (c.displayOrder || 0) > 0 && c.thumbImg),
    ...allCities.filter((c) => c.thumbImg),
    ...allCities,
  ];
  const uniqueCities: typeof featuredCities = [];
  const seen = new Set<number>();
  featuredCities.forEach((c) => {
    if (!seen.has(c.id)) {
      seen.add(c.id);
      uniqueCities.push(c);
    }
  });

  const cityCount = allCities.length;
  const tourCount =
    states.reduce((sum, s) => sum + (s.tourCount || 0), 0) || journeys.length;

  const heroImage =
    sortedCountries
      .map((c) => img(c.banner?.images?.[0], c.thumbImg))
      .find(Boolean) || undefined;

  const sortedJourneys = [...journeys].sort((a, b) => {
    const ao = a.displayOrder && a.displayOrder > 0 ? a.displayOrder : 99999;
    const bo = b.displayOrder && b.displayOrder > 0 ? b.displayOrder : 99999;
    if (ao !== bo) return ao - bo;
    return (b.purchaseCount || 0) - (a.purchaseCount || 0);
  });

  return {
    countries: sortedCountries,
    stateMap,
    states: orderedStates,
    statesWithImages,
    cities: uniqueCities.slice(0, 12),
    journeys: sortedJourneys.slice(0, 12),
    totals: {
      countryCount: sortedCountries.length,
      stateCount: states.length,
      cityCount,
      tourCount,
    },
    heroImage,
  };
}

const defaultFaqs = [
  {
    question: "How do I choose the best destination for my trip?",
    answer:
      "Pick based on your travel style — heritage lovers love Rajasthan, nature seekers love Kerala & Himachal, beach lovers love Goa, and honeymooners adore Kerala & Kashmir. Explore each destination below and browse its tour packages.",
  },
  {
    question: "Can I customize tours across multiple destinations?",
    answer:
      "Yes! Every itinerary at KoiKoi Travel is 100% customizable. Tell us which destinations and cities you want to combine and our travel experts will craft a personalised day-by-day plan.",
  },
  {
    question: "Do destination pages include hotels and sightseeing?",
    answer:
      "Yes. Every destination links to complete tour packages that include stay, transfers, sightseeing, meals and expert guidance — all included in the itinerary.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Destinations | KoiKoi Travel",
    description:
      "Explore our hand-crafted tour destinations across Rajasthan, Kerala, Himachal Pradesh, Uttarakhand, Goa, Kashmir & more — curated India holiday packages for every traveller.",
    alternates: { canonical: "/destinations" },
    openGraph: {
      type: "website",
      title: "Destinations | KoiKoi Travel",
      description:
        "Explore India's best tour destinations — curated holiday packages across states and cities.",
      url: `${SITE_URL}/destinations`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Destinations | KoiKoi Travel",
      description:
        "Explore India's best tour destinations — curated holiday packages across states and cities.",
    },
  };
}

export default async function DestinationsPage() {
  const {
    countries,
    stateMap,
    statesWithImages,
    cities,
    journeys,
    totals,
    heroImage,
  } = await fetchDestinations();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Destinations",
            item: `${SITE_URL}/destinations`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Tour Destinations in India",
        numberOfItems: countries.length,
        itemListElement: countries.map((c, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: c.title,
          url: `${SITE_URL}/tour-packages/${c.slug}`,
        })),
      },
      {
        "@type": "ItemList",
        name: "Tour Packages in India",
        numberOfItems: journeys.length,
        itemListElement: journeys.map((j, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: j.title,
          url: `${SITE_URL}/tour-packages/${j.slug}`,
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== BREADCRUMB (TOP) ===== */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-slate-200 bg-white shadow-sm"
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-3 flex items-center gap-1.5 text-[14px] text-slate-500">
          <Link
            href="/"
            className="hover:text-[#2E8B8B] transition-colors shrink-0 font-medium"
          >
            Home
          </Link>
          <ChevronRight size={14} className="text-slate-300 shrink-0" />
          <span className="text-[#1C1C1C] font-semibold">Destinations</span>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {heroImage ? (
            <FallbackImage
              src={heroImage}
              alt=""
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1c4e4e] via-[#2E8B8B] to-[#F8904D]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="accent-label inline-flex items-center gap-1.5 !text-[#FFD9A8]">
              <Globe2 size={12} /> India&apos;s Most Loved Destinations
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mt-4 leading-tight drop-shadow-lg">
              Explore Destinations
            </h1>
            <p className="mt-5 text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">
              From royal Rajasthan forts to Kerala&apos;s backwaters, Himalayan
              trails and golden Goa beaches — discover curated holiday
              destinations, then browse hand-crafted tour packages for each one.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <QuoteModal>
                <button
                  type="button"
                  className="btn-primary px-7 py-3.5 text-sm font-bold tracking-wide flex items-center gap-2 cursor-pointer shadow-lg shadow-black/25 active:scale-95 transition-all"
                >
                  <Compass size={16} />
                  <span>Plan My Custom Trip</span>
                </button>
              </QuoteModal>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                {
                  icon: <Globe2 size={16} />,
                  label: `${totals.countryCount} Countries`,
                },
                {
                  icon: <Route size={16} />,
                  label: `${totals.stateCount} States & Regions`,
                },
                {
                  icon: <MapPin size={16} />,
                  label: `${totals.cityCount} Cities`,
                },
                {
                  icon: <Crown size={16} />,
                  label: `${totals.tourCount}+ Tour Packages`,
                },
              ].map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2 text-sm font-semibold text-white"
                >
                  <span className="text-[#FFD9A8]">{s.icon}</span>
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 px-6 sm:px-8 lg:px-10 py-16 max-w-[1600px] mx-auto w-full">
        {/* ===== COUNTRIES ===== */}
        <section id="countries" className="scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
            <div>
              <SectionLabel icon={<Globe2 size={12} />}>By Country</SectionLabel>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight mt-1">
                Explore Countries
              </h2>
              <p className="mt-2 text-slate-500 text-sm md:text-base">
                Pick a country and dive into its favourite holiday regions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {countries.map((country) => {
              const countryStates = orderByDisplay(
                stateMap.get(country.id) || []
              );
              const countryTours =
                country.tourCount ||
                countryStates.reduce((sum, s) => sum + (s.tourCount || 0), 0);
              const image = img(
                country.banner?.images?.[0],
                country.thumbImg
              );
              return (
                <Link
                  key={country.id}
                  href={`/tour-packages/${country.slug}`}
                  className="group relative block overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_60px_rgba(46,139,139,0.18)] hover:-translate-y-1.5 transition-all duration-500"
                >
                  <div className="relative h-72 w-full overflow-hidden">
                    {image ? (
                      <FallbackImage
                        src={image}
                        alt={country.h1Title || country.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#2E8B8B] to-[#1c4e4e]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1.5 text-[11px] font-bold text-white">
                      {countryStates.length} Regions
                      {countryTours > 0 && ` · ${countryTours} Tours`}
                    </span>
                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="font-heading text-2xl font-extrabold text-white tracking-tight drop-shadow-lg">
                        {country.h1Title || country.title}
                      </h3>
                      {stripHtml(country.overView || country.seoDescription || "")
                        .slice(0, 80) && (
                        <p className="mt-1.5 text-[13px] text-white/80 line-clamp-2">
                          {stripHtml(
                            country.overView || country.seoDescription || ""
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="p-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#1C1C1C] group-hover:text-[#2E8B8B] transition-colors">
                      Explore {country.h1Title || country.title}
                      <ArrowRight
                        size={15}
                        className="text-[#F8904D] transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ===== STATES & REGIONS ===== */}
        {statesWithImages.length > 0 && (
          <section id="states" className="scroll-mt-24 mt-20">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
              <div>
                <SectionLabel icon={<Route size={12} />}>
                  By Region
                </SectionLabel>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight mt-1">
                  Popular States &amp; Regions
                </h2>
                <p className="mt-2 text-slate-500 text-sm md:text-base">
                  Explore hill stations, heritage cities and coastal getaways.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {statesWithImages.slice(0, 16).map((state) => {
                const image = img(
                  state.banner?.images?.[0],
                  state.thumbImg
                );
                return (
                  <Link
                    key={state.id}
                    href={`/tour-packages/${state.country?.slug}/${state.slug}`}
                    className="group relative block overflow-hidden rounded-3xl aspect-[4/5] shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(46,139,139,0.2)] hover:-translate-y-1.5 transition-all duration-500"
                  >
                    <FallbackImage
                      src={image}
                      alt={state.h1Title || state.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {state.tourCount ? (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#F8904D] px-2.5 py-1 text-[10px] font-bold text-white shadow">
                        <Crown size={10} /> {state.tourCount}
                      </span>
                    ) : null}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5">
                      <h3 className="font-heading text-lg font-extrabold text-white tracking-tight drop-shadow-md">
                        {state.h1Title || state.title}
                      </h3>
                      {state.famousFor && (
                        <p className="mt-1 text-[11px] font-medium text-white/75 line-clamp-1">
                          {state.famousFor}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ===== CITIES ===== */}
        {cities.length > 0 && (
          <section id="cities" className="scroll-mt-24 mt-20">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
              <div>
                <SectionLabel icon={<MapPin size={12} />}>By City</SectionLabel>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight mt-1">
                  Top Cities to Explore
                </h2>
                <p className="mt-2 text-slate-500 text-sm md:text-base">
                  Skip straight to your favourite city&apos;s tours.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {cities.map((city) => {
                const state = city.state;
                const image = img(
                  city.thumbImg,
                  state?.banner?.images?.[0],
                  state?.thumbImg
                );
                return (
                  <Link
                    key={city.id}
                    href={`/tour-packages/${state?.country?.slug}/${state?.slug}/${city.slug}`}
                    className="group relative flex items-center gap-3 rounded-2xl bg-white border border-slate-100 p-3 pr-4 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_18px_44px_rgba(46,139,139,0.16)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                      {image ? (
                        <FallbackImage
                          src={image}
                          alt={city.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#2E8B8B] to-[#1c4e4e] text-white">
                          <MapPin size={18} />
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-bold text-[#1C1C1C]">
                        {city.title}
                      </span>
                      <span className="block truncate text-[12px] text-slate-500 font-medium">
                        {state?.title}
                      </span>
                    </span>
                    <ArrowRight
                      size={15}
                      className="shrink-0 text-[#F8904D] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ===== TOUR PACKAGES (BOTTOM) ===== */}
        {journeys.length > 0 && (
          <section id="tour-packages" className="scroll-mt-24 mt-20">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
              <div>
                <SectionLabel icon={<Compass size={12} />}>
                  Hand-Crafted Itineraries
                </SectionLabel>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight mt-1">
                  Top Tour Packages
                </h2>
                <p className="mt-2 text-slate-500 text-sm md:text-base">
                  Fully customisable day-by-day itineraries across India.
                </p>
              </div>
              <Link
                href="/tour-packages"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#2E8B8B]/20 bg-[#2E8B8B]/5 px-6 py-2.5 text-sm font-bold text-[#2E8B8B] hover:bg-[#2E8B8B] hover:text-white transition-all duration-300"
              >
                See All Tour Packages
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {journeys.map((j) => {
                const tours = j.noDays || 0;
                const highlights = (j.highlights || []).slice(0, 2);
                const image = img(j.banner?.images?.[0], j.thumbImg);
                const priceShow =
                  j.discountPrice && j.discountPrice > 0
                    ? j.discountPrice
                    : j.pricePerPerson && j.pricePerPerson > 0
                      ? j.pricePerPerson
                      : null;
                return (
                  <Link
                    key={j.id}
                    href={`/tour-packages/${j.slug}`}
                    className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_60px_rgba(46,139,139,0.18)] hover:-translate-y-1.5 transition-all duration-500"
                  >
                    <div className="relative h-56 w-full overflow-hidden">
                      {image ? (
                        <FallbackImage
                          src={image}
                          alt={j.h1Title || j.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#2E8B8B] to-[#1c4e4e]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {tours > 0 && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1.5 text-[11px] font-bold text-white">
                            <CalendarRange size={12} /> {tours} Days
                          </span>
                        )}
                        {j.destination && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1.5 text-[11px] font-bold text-white">
                            <MapPin size={12} /> {j.destination}
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        {priceShow ? (
                          <span className="text-[12px] font-bold text-white/90">
                            Starting{" "}
                            <span className="text-[18px] text-white drop-shadow">
                              ₹{priceShow.toLocaleString("en-IN")}
                            </span>
                            <span className="font-medium text-white/70">
                              {" "}
                              /person
                            </span>
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-[#F8904D] px-3 py-1.5 text-[11px] font-bold text-white">
                            Price on Request
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-heading text-xl font-extrabold text-[#1C1C1C] tracking-tight leading-snug line-clamp-2">
                        {j.h1Title || j.title}
                      </h3>
                      {highlights.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {highlights.map((h, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-[13px] text-slate-600 line-clamp-1"
                            >
                              <CheckCircle2
                                size={14}
                                className="mt-0.5 shrink-0 text-[#2E8B8B]"
                              />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-auto pt-4">
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-[#2E8B8B] group-hover:text-[#1c4e4e] transition-colors">
                          View Itinerary
                          <ArrowRight
                            size={15}
                            className="text-[#F8904D] transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* ===== FAQ SECTION ===== */}
      <section className="bg-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 pb-20">
          <FaqSection faqs={defaultFaqs} />
        </div>
      </section>
    </div>
  );
}