import fs from "fs";
import path from "path";

const API_BASE = process.env.API_BASE_URL || "https://api.koikoitravel.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://koikoitravel.com";

export const revalidate = 3600; // Cache and revalidate every 1 hour

async function fetchApi<T>(endpoint: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch {
    return [];
  }
}

function cleanBrandText(str?: string | null): string {
  if (!str) return "";
  return str
    .replace(/^seo\s*description\s*:\s*/i, "")
    .replace(/\bKoKi\s*Travels?\b/gi, "KoiKoi Travel")
    .replace(/\bKoKoi\s*Travels?\b/gi, "KoiKoi Travel")
    .replace(/\bKoiKoi\s+Travels\b/gi, "KoiKoi Travel")
    .replace(/\bKoiKoi\s*Tours?\s*for\b/gi, "KoiKoi Travel for")
    .replace(/\bKoiKoi\s+Tours\b/gi, "KoiKoi Travel")
    .replace(/\bKoKoi\s+Tour\b/gi, "KoiKoi Travel")
    .replace(/\bKoiKoi\s+Tour\b/gi, "KoiKoi Travel")
    .replace(/\bKoKoi\b/gi, "KoiKoi")
    .replace(/\bKoKi\b/gi, "KoiKoi")
    .replace(/\belephat\b/gi, "elephant")
    .replace(/\bElephat\b/g, "Elephant")
    .replace(/\bgoa\b/g, "Goa")
    .replace(/KoiKoi\s{2,}Travel/g, "KoiKoi Travel")
    .replace(/  +/g, " ");
}

function resolveRouteCities(j: any): string[] {
  const titleLower = (j.title || "").toLowerCase();
  const slugLower = (j.slug || "").toLowerCase();

  // If Goa and Kerala tour, ensure full complete itinerary route is displayed
  if (slugLower.includes("goa-and-kerala") || (titleLower.includes("goa") && titleLower.includes("kerala"))) {
    return ["Goa", "Cochin", "Munnar", "Thekkady (Periyar)", "Cochin"];
  }

  let list: string[] = [];
  if (Array.isArray(j.route) && j.route.length > 0) {
    list = j.route.map((c: any) => c.title).filter(Boolean);
  } else if (typeof j.destination === "string" && j.destination.trim()) {
    list = j.destination
      .split(/[-–—>]/)
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  if (titleLower.includes("from mumbai") && !list.some((c: string) => c.toLowerCase().includes("mumbai"))) {
    list = ["Mumbai", ...list];
  }
  if (titleLower.includes("from delhi") && !list.some((c: string) => c.toLowerCase().includes("delhi"))) {
    list = ["Delhi", ...list];
  }
  if (titleLower.includes("goa") && !list.some((c: string) => c.toLowerCase().includes("goa"))) {
    list = ["Goa", ...list];
  }
  return list;
}

export async function GET() {
  try {
    const [journeys, states, experiences, posts] = await Promise.all([
      fetchApi<any>("/journey?limit=5000&isActive=true"),
      fetchApi<any>("/state?limit=100"),
      fetchApi<any>("/holidays?limit=100"),
      fetchApi<any>("/blog?limit=100&isActive=true"),
    ]);

    // If API returned packages, construct full dynamic markdown
    if (journeys.length > 0) {
      let md = `# KoiKoi Travel — Inbound Tour Operator & Tailor-Made India Travel Specialist\n\n`;
      md += `> KoiKoi Travel is an inbound tour operator and travel company based in New Delhi, India. We specialize in personalized, tailor-made holiday packages, private verified chauffeur-driven vehicle rentals, handpicked heritage and boutique hotels, and dedicated 24/7 on-ground concierge support across India.\n\n`;
      md += `Atithi Devo Bhava ("Guest is God") guides our approach to hospitality. We assist international travelers, NRIs, couples, and families in exploring India with custom private itineraries, transparent fixed pricing, verified drivers, and zero forced commercial shopping stops.\n\n`;

      md += `## Core Services & Planning\n`;
      md += `- [Custom India Tour Packages](${SITE_URL}/tour-packages): Complete ready-to-book and tailor-made multi-day tour itineraries across India.\n`;
      md += `- [Destinations Across India](${SITE_URL}/destinations): Curated destination guide spanning royal cities, hill retreats, spiritual hubs, and coastal escapes.\n`;
      md += `- [Travel Experiences & Themes](${SITE_URL}/travel-experiences): Thematic travel styles including Golden Triangle, Wildlife Safaris, Heritage & Culture, Honeymoon, and Ayurveda Retreats.\n`;
      md += `- [Season-wise Travel Planning](${SITE_URL}/#seasonal): Expert guidance on weather, peak visiting months, and climate-specific recommendations.\n`;
      md += `- [Travel Blog & Guides](${SITE_URL}/blog): In-depth travel itineraries, packing tips, budget calculations, and cultural etiquette for traveling in India.\n\n`;

      md += `## All India Tour Packages (${journeys.length} Active Tours)\n`;
      journeys.forEach((j: any) => {
        const title = cleanBrandText(j.title || "India Tour Package");
        const slug = j.slug;
        const dur = j.duration || (j.noDays ? `${j.noDays} Days` : "");
        const citiesList = resolveRouteCities(j);
        const cities = citiesList.join(" - ");
        const rawOverview = (j.seoDescription && j.seoDescription.length > 20)
          ? j.seoDescription
          : (j.overView ? j.overView.replace(/<[^>]*>?/gm, "").trim().slice(0, 300) : "Tailor-made private tour with verified chauffeur and boutique accommodations.");
        const cleanedSeo = cleanBrandText(rawOverview);
        const desc = [dur ? `Duration: ${dur}` : "", cities ? `Route: ${cities}` : "", cleanedSeo]
          .filter(Boolean)
          .join(". ");
        md += `- [${title}](${SITE_URL}/tour-packages/${slug}): ${desc || "Tailor-made private tour with chauffeur and hotels."}\n`;
      });
      md += `\n`;

      if (states.length > 0) {
        md += `## Destinations by State\n`;
        states.forEach((s: any) => {
          if (!s.slug) return;
          md += `- [${s.title || s.name} Tour Packages](${SITE_URL}/tour-packages/india/${s.slug}): Handcrafted tours, verified drivers, and local sightseeing in ${s.title || s.name}.\n`;
        });
        md += `\n`;
      }

      if (experiences.length > 0) {
        md += `## Travel Experiences & Themes\n`;
        experiences.forEach((e: any) => {
          if (!e.slug) return;
          md += `- [${e.title || e.name} Tours](${SITE_URL}/travel-experiences/${e.slug}): Curated travel activities and bespoke experiences for ${e.title || e.name}.\n`;
        });
        md += `\n`;
      }

      md += `## Seasonal Trips\n`;
      md += `- [Summer Tours in India](${SITE_URL}/season/summer-tours-in-india): Escape the heat to high-altitude Himalayan retreats (April to June).\n`;
      md += `- [Monsoon Tours in India](${SITE_URL}/season/monsoon-tours-in-india): Lush green Western Ghats, romantic Udaipur, and authentic Kerala monsoon Ayurveda (July to September).\n`;
      md += `- [Winter Tours in India](${SITE_URL}/season/winter-tours-in-india): Perfect sunny weather for Rajasthan forts, Golden Triangle, Gujarat, and South India (October to March).\n`;
      md += `- [Spring Tours in India](${SITE_URL}/season/spring-tours-in-india): Pleasant wildlife tracking, blooming valleys, and vibrant cultural festivals (February to March).\n\n`;

      if (posts.length > 0) {
        md += `## Travel Blog & Guides\n`;
        posts.slice(0, 20).forEach((p: any) => {
          if (!p.slug) return;
          md += `- [${p.title}](${SITE_URL}/blog/${p.slug}): Expert travel advice, destination highlights, and planning tips.\n`;
        });
        md += `\n`;
      }

      md += `## Company & Booking Policies\n`;
      md += `- [About KoiKoi Travel](${SITE_URL}/about-us): Our founding story, values, verified driver network, and customer commitment.\n`;
      md += `- [Contact & Trip Consultation](${SITE_URL}/contact-us): Get custom trip quotes, speak with a private trip planner, or WhatsApp our team at +91 91367 39178.\n`;
      md += `- [Guest Photo Gallery](${SITE_URL}/guest-gallery): Real photos and candid moments shared by our happy travelers.\n\n`;

      md += `## Optional\n`;
      md += `- [Full LLM Knowledge Base](${SITE_URL}/llms-full.txt): Complete, consolidated plain-text knowledge base with full itinerary details.\n`;
      md += `- [Privacy Policy](${SITE_URL}/privacy-policy): How we protect personal user data and booking information.\n`;
      md += `- [Terms & Conditions](${SITE_URL}/terms-and-conditions): Tour booking terms, payment schedules, and operator guidelines.\n`;
      md += `- [Cancellation & Refund Policy](${SITE_URL}/cancellation-and-refund-policy): Transparent cancellation terms and refund processing timelines.\n`;

      return new Response(cleanBrandText(md), {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }

    // Fallback to static file if API returned empty
    const filePath = path.join(process.cwd(), "src", "data", "llms-fallback.txt");
    if (fs.existsSync(filePath)) {
      return new Response(fs.readFileSync(filePath, "utf-8"), {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    return new Response("# KoiKoi Travel\n\n> Custom tour operator in India offering private tailor-made holiday packages.\n", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    const filePath = path.join(process.cwd(), "src", "data", "llms-fallback.txt");
    if (fs.existsSync(filePath)) {
      return new Response(fs.readFileSync(filePath, "utf-8"), {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    return new Response("# KoiKoi Travel\n\n> Custom tour operator in India offering private tailor-made holiday packages.\n", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
