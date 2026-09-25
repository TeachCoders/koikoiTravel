import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  Landmark,
  UtensilsCrossed,
  Flower2,
  Route,
  Mountain,
  Waves,
  Compass,
  ArrowRight,
  Crown,
  ChevronRight,
} from "lucide-react";
import { stripHtml } from "@/lib/utils";
import { SERVER_API_BASE, fetchBySlugCached } from "@/feature/destinations/api/public-server";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import FaqSection from "@/feature/home/components/FaqSection";
import type { CmsPage } from "@/feature/cms/type";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://koikoitravel.com";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Travel Experiences",
    description:
      "Hand-picked travel experiences across India — honeymoons, heritage, culinary, yoga, nature & more. Book your perfect trip with KoiKoi Travel.",
    alternates: { canonical: "/travel-experiences" },
  };
}

async function fetchExperiences() {
  try {
    const url = `${SERVER_API_BASE}/holidays?isActive=true`;
    const res = await fetch(url, { method: "GET", next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch {
    return [];
  }
}

async function fetchAllJourneys() {
  try {
    const url = `${SERVER_API_BASE}/journey?limit=200&isActive=true`;
    const res = await fetch(url, { method: "GET", next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch {
    return [];
  }
}

import { FallbackImage } from "@/components/shared/FallbackImage";

const FALLBACK_IMAGE = "";

const THEMES: {
  match: string[];
  icon: React.ReactNode;
  image: string;
}[] = [
  {
    match: ["honeymoon", "couple", "romance"],
    icon: <Heart size={20} />,
    image: "",
  },
  {
    match: ["heritage", "culture", "historical", "monument"],
    icon: <Landmark size={20} />,
    image: "",
  },
  {
    match: ["culinary", "food", "dishes"],
    icon: <UtensilsCrossed size={20} />,
    image: "",
  },
  {
    match: ["ayurveda", "yoga", "wellness"],
    icon: <Flower2 size={20} />,
    image: "",
  },
  {
    match: ["taj", "golden triangle"],
    icon: <Landmark size={20} />,
    image: "",
  },
  {
    match: ["spiritual", "temple", "pilgrim"],
    icon: <Sparkles size={20} />,
    image: "",
  },
  {
    match: ["nature", "wildlife"],
    icon: <Mountain size={20} />,
    image: "",
  },
  {
    match: ["beach", "lake"],
    icon: <Waves size={20} />,
    image: "",
  },
];

function resolveTheme(title: string) {
  const t = title.toLowerCase();
  const found = THEMES.find((th) => th.match.some((m) => t.includes(m)));
  return found || { icon: <Compass size={20} />, image: FALLBACK_IMAGE };
}

export default async function TravelExperiencesPage() {
  const [experiences, journeys] = await Promise.all([
    fetchExperiences(),
    fetchAllJourneys(),
  ]);

  const real = experiences.filter(
    (e: any) => !/^test\b/i.test(e.title || "")
  );

  const tourCount = (id: number) =>
    journeys.filter((j: any) =>
      (j.travelExperiences || []).some((e: any) => e.id === id)
    ).length;

  const defaultFaqs = [
    {
      question: "What are Travel Experiences at KoiKoi Travel?",
      answer: "Travel Experiences are theme-based tour packages categorized by your trip style — such as Honeymoon, Heritage & Culture, Wellness & Yoga, Wildlife Safaris, and Pilgrimage Tours across India."
    },
    {
      question: "Can I combine two different experiences in a single trip?",
      answer: "Yes! All our tour itineraries are 100% customizable. You can easily combine experiences like Honeymoon + Wildlife or Heritage + Wellness. Our experts will craft a custom schedule for you."
    },
    {
      question: "How do I get a custom itinerary for a specific experience?",
      answer: "Simply click 'Plan My Custom Trip' on any experience page or contact our travel experts via WhatsApp or Instant Quote form to receive a detailed day-by-day plan."
    }
  ];

  const cmsPage = await fetchBySlugCached<CmsPage>("/cms/by-slug", "travel-experiences");
  const cmsFaqs = (cmsPage?.faqs || [])
    .filter((f) => f?.ques && f?.ans)
    .map((f) => ({ question: f.ques, answer: f.ans }));
  const faqList = cmsFaqs.length > 0 ? cmsFaqs : defaultFaqs;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${SITE_URL}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Travel Experiences",
            "item": `${SITE_URL}/travel-experiences`
          }
        ]
      },
      {
        "@type": "ItemList",
        "name": "Hand-picked Travel Experiences in India",
        "numberOfItems": real.length,
        "itemListElement": real.map((e: any, idx: number) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": e.title,
          "url": `${SITE_URL}/travel-experiences/${e.slug}`
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqList.map((f) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* ===== SEO JSON-LD SCHEMA ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== BREADCRUMB (TOP) ===== */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-3 flex items-center gap-1.5 text-[14px] text-slate-500">
          <Link href="/" className="hover:text-[#2E8B8B] transition-colors shrink-0 font-medium">
            Home
          </Link>
          <ChevronRight size={14} className="text-slate-300 shrink-0" />
          <span className="text-[#1C1C1C] font-semibold">Travel Experiences</span>
        </div>
      </nav>

      {/* ===== HERO (SOLID TEAL BACKGROUND) ===== */}
      <section className="relative overflow-hidden bg-[#2E8B8B]">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-16 right-0 w-72 h-72 rounded-full bg-[#F8904D]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-14 md:py-20 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#F5B041] mb-3">
            <Sparkles size={14} /> Curated Travel Themes
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-[46px] font-extrabold text-white tracking-tight leading-tight">
            Hand-Crafted Travel Experiences
          </h1>
          <p className="mt-4 text-white/85 text-base md:text-lg max-w-2xl leading-relaxed">
            From romantic honeymoons to soulful heritage trails and rejuvenating wellness retreats — choose your dream theme and let us design your custom itinerary.
          </p>

          <div className="mt-8">
            <QuoteModal>
              <button
                type="button"
                className="btn-primary px-7 py-3.5 text-sm font-bold tracking-wide flex items-center gap-2 cursor-pointer shadow-lg shadow-[#F8904D]/30 active:scale-95 transition-all"
              >
                <Sparkles size={16} />
                <span>Plan My Custom Trip</span>
              </button>
            </QuoteModal>
          </div>
        </div>
      </section>

      {/* ===== SEO CONTENT ===== */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-14 md:py-16">
          <div className="text-center">
            <SectionLabel icon={<Compass size={12} />}>
              Why Travellers Trust KoiKoi Travel
            </SectionLabel>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight mt-2 leading-tight">
              Travel Experiences Made Simple & Personal
            </h2>
          </div>
          <div className="mt-8 w-full space-y-5 text-[15.5px] leading-relaxed text-slate-600">
            <p>
              A travel experience is a special way of travelling. Some people love
              slow trips. Some people love adventure. Some people just want peace.
              At KoiKoi Travel, we have made travel experiences for every kind of
              traveller.
            </p>
            <p>
              On this page you will find our hand-made themes. Honeymoon trips for
              couples who want romance. Heritage trips for history lovers. Wellness
              trips for people who need rest and calm. Adventure trips for those who
              want more thrill. Food trips for people who travel to taste new
              dishes. Each theme is built by our team to feel special and easy at
              the same time.
            </p>
            <p>
              When you pick a travel experience, we plan the whole trip around that
              feeling. The hotels, the cabs, the places and the food — everything
              matches the theme. The price is always clear, and every day of your
              plan is shown to you before you book. If you want changes, we are
              happy to make them.
            </p>
            <p>
              Not sure which experience fits you? Ask us on WhatsApp. Tell us how
              you like to travel and how many days you have free. Our team will
              suggest a theme, or build a new one just for you. Whatever your dream
              holiday looks like — KoiKoi Travel makes it real.
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 px-6 py-12 md:py-16 max-w-[1600px] mx-auto w-full">

        {/* ===== GRID LISTING ===== */}
        {real.length === 0 ? (
          <p className="text-center text-slate-500 py-20">No travel experiences found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {real.map((e: any) => {
              const theme = resolveTheme(e.title);
              const image =
                e.thumbImg || e.banner?.images?.[0] || theme.image;
              const count = tourCount(e.id);
              return (
                <Link
                  key={e.id}
                  href={`/travel-experiences/${e.slug}`}
                  className="group relative block overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_60px_rgba(46,139,139,0.18)] hover:-translate-y-1.5 transition-all duration-500"
                >
                  <div className="relative h-64 md:h-72 w-full overflow-hidden">
                    <FallbackImage
                      src={image}
                      alt={e.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-white">
                        {theme.icon}
                      </span>
                    </div>
                    {count > 0 && (
                      <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8904D] text-white text-[11px] font-bold shadow-lg">
                        <Crown size={12} /> {count} Tours
                      </span>
                    )}
                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="font-heading text-2xl font-extrabold text-white tracking-tight drop-shadow-lg leading-snug">
                        {e.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {stripHtml(e.overView || e.seoDescription)}
                    </p>
                    <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C1C1C] group-hover:text-[#2E8B8B] transition-colors">
                        Explore Tours
                        <ArrowRight
                          size={16}
                          className="text-[#F8904D] transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ===== FAQ SECTION ===== */}
        <div className="mt-20">
          <FaqSection faqs={faqList} />
        </div>
      </main>
    </div>
  );
}
