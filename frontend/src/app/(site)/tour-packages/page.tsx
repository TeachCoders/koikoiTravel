import type { Metadata } from "next";
import { ChevronRight, Compass, Sparkles } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import JsonLd from "@/components/shared/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonLd";
import PackagesExplorer from "@/feature/journey/components/PackagesExplorer";
import { fetchPublicJson } from "@/feature/destinations/api/public-server";
import type { Journey, PaginatedResponse as JourneyPage } from "@/feature/journey/type";
import { QuoteModal } from "@/components/shared/QuoteModal";

export const revalidate = 60;

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

  const initialJourneys = await fetchPublicJson<JourneyPage<Journey>>(
    "/journey?limit=100&isActive=true"
  );

  const journeyItems =
    initialJourneys?.data?.map((j) => ({
      name: j.title,
      url: `/tour-packages/${j.slug}`,
    })) || [];

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
      <section className="relative bg-[#2E8B8B] py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-16 right-0 w-72 h-72 rounded-full bg-[#F8904D]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 text-center flex flex-col items-center">
          <span className="hidden sm:inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#F5B041] mb-4">
            <Sparkles size={14} /> Tailor-Made Holiday Packages
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-wide drop-shadow-md">
            Tour Packages
          </h1>
          <p className="hidden sm:block mt-4 text-white/85 text-base md:text-lg max-w-2xl leading-relaxed">
            {cities.length > 0 || experiences.length > 0
              ? "Results filtered by your search — refine using the filters below."
              : "Discover curated travel itineraries across India and top global destinations. Custom packages designed for memories."}
          </p>

          <div className="hidden sm:block mt-8">
            <QuoteModal>
              <button
                type="button"
                className="btn-primary px-8 py-3.5 text-sm font-bold tracking-wide flex items-center gap-2 cursor-pointer shadow-lg shadow-[#F8904D]/30 active:scale-95 transition-all"
              >
                <Sparkles size={16} />
                <span>Get Customized Trip Quote</span>
              </button>
            </QuoteModal>
          </div>
        </div>
      </section>

      {/* ===== BREADCRUMB (BELOW HERO) ===== */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-3 flex items-center gap-2 text-[14px] text-slate-500">
          <Link href="/" className="hover:text-[#2E8B8B] transition-colors font-medium">
            Home
          </Link>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-[#1C1C1C] font-semibold">Tour Packages</span>
        </div>
      </nav>

      {/* ===== SEO CONTENT ===== */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-14 md:py-16">
          <div className="text-center">
            <SectionLabel icon={<Compass size={12} />}>
              Why Travellers Trust KoiKoi Travel
            </SectionLabel>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight mt-2 leading-tight">
              Simple, Honest Tour Packages for Every Traveller
            </h2>
          </div>
          <div className="mt-8 w-full space-y-5 text-[15.5px] leading-relaxed text-slate-600">
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
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-12">
        <PackagesExplorer
          initialCities={cities}
          initialExperiences={experiences}
          initialStates={states}
          initialJourneys={initialJourneys}
        />
      </div>
    </div>
  );
}
