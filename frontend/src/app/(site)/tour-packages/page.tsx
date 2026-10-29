import type { Metadata } from "next";
import { ChevronRight, Compass, Sparkles } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import JsonLd from "@/components/shared/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonLd";
import PackagesExplorer from "@/feature/journey/components/PackagesExplorer";
import { fetchPublicJsonCached } from "@/feature/destinations/api/public-server";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import { journeyCardTitle, journeyPackageHref } from "@/feature/journey/filterOptions";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { fetchHeroBannersServer } from "@/feature/heroBanner/api/server";
import { ImageWatermark } from "@/components/shared/ImageWatermark";
import { FallbackImage } from "@/components/shared/FallbackImage";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Tour Packages in India and Worldwide | KoiKoi Travel",
  description:
    "Explore handcrafted tour packages across India. Filter by state, city, travel experience, season & duration. Book your dream trip with KoiKoi Travel.",
  alternates: { canonical: "/tour-packages" },
};

export default async function TourPackagesPage({
  searchParams,
}: {
  searchParams: Promise<{
    city?: string | string[];
    exp?: string | string[];
    state?: string | string[];
    country?: string | string[];
    search?: string | string[];
    q?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const first = (v: string | string[] | undefined) =>
    (Array.isArray(v) ? v[0] : v || "").trim();
  const cities = first(params.city)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const experiences = first(params.exp)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const states = first(params.state)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const countries = first(params.country)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const search = first(params.search || params.q);

  const [initialJourneys, heroBanners] = await Promise.all([
    fetchPublicJsonCached<JourneyPage<Journey>>("/journey?limit=100&isActive=true"),
    fetchHeroBannersServer("TourPackages"),
  ]);

  const customHero = heroBanners?.[0];
  const heroImage = customHero?.image || "/content/rajasthan-tours-holiday-1.webp";
  const heroMobileImage = customHero?.mobileImage || null;
  const heroTitle = customHero?.title || "Tour Packages";
  const heroSubtitle = customHero?.subtitle || "Tailor-Made Holiday Packages";

  const journeyItems = [...(initialJourneys?.data || [])]
    .sort((a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0))
    .slice(0, 16)
    .map((j) => ({
      name: journeyCardTitle(j),
      url: journeyPackageHref(j),
    }));

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ===== SEO JSON-LD SCHEMA ===== */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tour Packages", path: "/tour-packages" },
        ])}
      />
      {journeyItems.length > 0 && <JsonLd data={itemListSchema(journeyItems)} />}

      {/* ===== HERO BANNER ===== */}
      <section className="relative bg-slate-900 py-14 sm:py-16 md:py-24 overflow-hidden min-h-[300px] flex items-center justify-center">
        {/* Background Image Layer with Dedicated Mobile and Desktop support */}
        <div className="absolute inset-0 z-0">
          {heroMobileImage ? (
            <>
              {/* Mobile screen (max-width: 639px) */}
              <div className="block sm:hidden absolute inset-0">
                <FallbackImage
                  src={heroMobileImage}
                  alt={customHero?.altText || heroTitle}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="100vw"
                  className="object-cover object-center"
                  quality={80}
                />
              </div>
              {/* Desktop & Tablet screen (min-width: 640px) */}
              <div className="hidden sm:block absolute inset-0">
                <FallbackImage
                  src={heroImage}
                  alt={customHero?.altText || heroTitle}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 1920px"
                  className="object-cover object-center"
                  quality={80}
                />
              </div>
            </>
          ) : (
            <FallbackImage
              src={heroImage}
              alt={customHero?.altText || heroTitle}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
              className="object-cover object-center"
              quality={80}
            />
          )}
          {/* Subtle soft gradient overlay so photo clarity shines through */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 text-center flex flex-col items-center">
          <span className="font-luxury font-black inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest text-[#F8904D] mb-3">
            <Sparkles size={14} /> {heroSubtitle}
          </span>
          <div className="font-luxury text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-wide drop-shadow-md">
            {heroTitle}
          </div>
          <p className="mt-3 text-white/90 text-sm sm:text-base max-w-2xl leading-relaxed drop-shadow-sm">
            {cities.length > 0 || experiences.length > 0
              ? "Results filtered by your search — refine using the filters below."
              : "Discover curated travel itineraries across India and top global destinations. Custom packages designed for memories."}
          </p>

          <div className="mt-6">
            <QuoteModal>
              <button
                type="button"
                className="btn-primary px-7 py-3 text-sm font-semibold tracking-wide flex items-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
              >
                <Sparkles size={15} />
                <span>Get Customized Trip Quote</span>
              </button>
            </QuoteModal>
          </div>
        </div>
      </section>

      {/* ===== BREADCRUMB (BELOW HERO) ===== */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-100 bg-slate-50/60">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-3 flex items-center gap-1.5 text-xs sm:text-[13px] text-slate-500 font-medium">
          <Link href="/" className="hover:text-[#F8904D] transition-colors">
            Home
          </Link>
          <ChevronRight size={13} className="text-slate-300 shrink-0" />
          <span className="text-slate-900 font-semibold">Tour Packages</span>
        </div>
      </nav>

      {/* ===== SEO CONTENT ===== */}
      <section className="bg-white border-b border-slate-100 py-8 sm:py-10 md:py-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="text-center">
            <SectionLabel icon={<Compass size={13} />}>
              Why Travellers Trust KoiKoi Travel
            </SectionLabel>
            <h2 className="font-heading text-xl sm:text-2xl md:text-[28px] font-bold text-slate-900 tracking-tight mt-1 leading-tight">
              Simple, Honest Tour Packages for <span className="text-[#F8904D]">Every Traveller</span>
            </h2>
          </div>
          <div className="mt-6 w-full space-y-4 text-sm sm:text-[15px] leading-relaxed text-slate-600 font-normal">
            <p>
              A tour package is a ready-made holiday. Your hotel, your cab, your
              sightseeing and your food — everything is planned for you. At KoiKoi
              Travel, we build every package with care. You just pack your bag and
              go.
            </p>
            <p>
              Our tour packages cover all of India. Love forts and palaces? Pick a
              Rajasthan tour. Love snow and mountains? Choose Himachal Pradesh or
              Uttarakhand. Love beaches? Goa is ready for you. Love calm backwaters?
              Kerala will feel like heaven. You will also find packages in popular
              countries around the world.
            </p>
            <p>
              Every package shows the full plan before you book. You will see the
              number of days, the places you will visit each day, the hotels, the
              meals and the cab details. The price is clear and honest. There are no
              hidden charges. If you want a change, just tell us — every KoiKoi
              Travel package is easy to customise.
            </p>
            <p>
              Not sure which package to pick? You can filter tours by state, city,
              season or travel experience. Or simply ask us on WhatsApp. Tell us
              your dates, your budget and who is travelling with you. Our team will
              find you a ready package, or build a brand new one just for your
              family. Honeymoon plans, family trips, group tours — KoiKoi Travel
              plans them all.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PACKAGES EXPLORER ===== */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-8 sm:py-10 md:py-12">
        <PackagesExplorer
          initialCities={cities}
          initialExperiences={experiences}
          initialStates={states}
          initialCountries={countries}
          initialSearch={search}
          initialJourneys={initialJourneys}
        />
      </div>
    </div>
  );
}
