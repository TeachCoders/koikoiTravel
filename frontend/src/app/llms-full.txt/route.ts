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

function resolveImageUrl(j: any, siteUrl: string): string {
  const raw = j.thumbImg || (Array.isArray(j.banner?.images) && j.banner.images.length > 0 ? j.banner.images[0] : null);
  if (!raw) return `${siteUrl}/og-image.png`;
  if (/^https?:\/\//i.test(raw)) return raw;
  return `${siteUrl}${raw.startsWith("/") ? "" : "/"}${raw}`;
}

export async function GET() {
  try {
    const [journeys, states, experiences] = await Promise.all([
      fetchApi<any>("/journey?limit=5000&isActive=true"),
      fetchApi<any>("/state?limit=100"),
      fetchApi<any>("/holidays?limit=100"),
    ]);

    if (journeys.length > 0) {
      let md = `# KoiKoi Travel — Customize Tour Operator & Travel Knowledge Directory (llms-full.txt)\n\n`;
      md += `> Official plain-text reference directory for KoiKoi Travel (${SITE_URL}), a customize tour operator specializing in personalized private tour packages, verified chauffeur travel, and custom itineraries across India. This document is synchronized with our active catalog of ${journeys.length} tour packages, destinations, and booking guidelines.\n\n`;
      md += `## 1. Company Overview\n`;
      md += `- Name: KoiKoi Travel\n`;
      md += `- Category: Customize Tour Operator & Tailor-Made India Tour Specialist\n`;
      md += `- Tagline: Tailor-made Private Tours with Verified Chauffeurs\n`;
      md += `- Website: ${SITE_URL}\n`;
      md += `- Phone / WhatsApp: +91 91367 39178\n`;
      md += `- Email: info@koikoitravel.com\n`;
      md += `- Head Office: New Delhi, India\n`;
      md += `- Business Model: Tailor-made private holiday packages, verified chauffeur-driven car rentals, handpicked hotels, and 24/7 dedicated on-ground concierge.\n\n`;

      md += `## 2. Complete Inventory of Active India Tour Packages (${journeys.length} Tours)\n\n`;

      journeys.forEach((j: any, idx: number) => {
        const title = cleanBrandText(j.title || "India Tour Package");
        const slug = j.slug;
        const dur = j.duration || (j.noDays ? `${j.noDays} Days` : "Custom");
        const citiesList = resolveRouteCities(j);
        const cities = citiesList.join(" -> ");
        const price = j.discountPrice || j.pricePerPerson ? `Starting from ₹${j.discountPrice || j.pricePerPerson}/person` : "Custom Quote";
        const imgUrl = resolveImageUrl(j, SITE_URL);
        const rawOverview = (j.seoDescription && j.seoDescription.length > 20)
          ? j.seoDescription
          : (j.overView ? j.overView.replace(/<[^>]*>?/gm, "").trim().slice(0, 300) : "Personalized private India tour with verified chauffeur and boutique accommodations.");
        const cleanedSeo = cleanBrandText(rawOverview);

        md += `### ${idx + 1}. [${title}](${SITE_URL}/tour-packages/${slug})\n`;
        md += `- **URL**: ${SITE_URL}/tour-packages/${slug}\n`;
        md += `- **Image**: ${imgUrl}\n`;
        md += `- **Duration**: ${dur}\n`;
        if (cities) md += `- **Route**: ${cities}\n`;
        md += `- **Price**: ${price}\n`;
        if (cleanedSeo) md += `- **Overview**: ${cleanedSeo}\n`;
        if (Array.isArray(j.highlights) && j.highlights.length > 0) {
          md += `- **Highlights**:\n`;
          j.highlights.slice(0, 6).forEach((hl: string) => {
            const cleanHl = cleanBrandText(hl.replace(/<[^>]*>?/gm, "").trim());
            if (cleanHl) md += `  * ${cleanHl}\n`;
          });
        }
        md += `\n`;
      });

      if (states.length > 0) {
        md += `## 3. Covered Indian States & Regions\n\n`;
        states.forEach((s: any) => {
          if (!s.slug) return;
          const sTitle = cleanBrandText(s.title || s.name);
          md += `### [${sTitle} Tours](${SITE_URL}/tour-packages/india/${s.slug})\n`;
          let sDesc = cleanBrandText(s.seoDescription);
          if (!sDesc || sDesc.length < 15 || sDesc.toLowerCase() === "goa") {
            sDesc = `Discover the vibrant culture, historic architecture, and private chauffeur-driven tour packages across ${sTitle} with KoiKoi Travel.`;
          }
          md += `${sDesc}\n\n`;
        });
      }

      if (experiences.length > 0) {
        md += `## 4. Curated Travel Experiences & Themes\n\n`;
        experiences.forEach((e: any) => {
          if (!e.slug) return;
          const eTitle = cleanBrandText(e.title || e.name);
          md += `### [${eTitle}](${SITE_URL}/travel-experiences/${e.slug})\n`;
          let eDesc = cleanBrandText(e.seoDescription);
          if (!eDesc || eDesc.toLowerCase().includes("quick form") || eDesc.length < 15) {
            eDesc = `Curated ${eTitle} travel experiences, cultural sightseeing, and private customized itineraries across India by KoiKoi Travel.`;
          }
          md += `${eDesc}\n\n`;
        });
      }

      md += `## 5. Inclusions & Guarantees\n`;
      md += `- Private air-conditioned car with commercial tourist permit.\n`;
      md += `- Background-verified, polite, English-speaking private driver.\n`;
      md += `- All fuel, state border permits, toll taxes, parking, and driver night allowances included.\n`;
      md += `- Handpicked hotels (3-Star, 4-Star, 5-Star, or Royal Heritage Havelis) with daily breakfast.\n`;
      md += `- Sightseeing as per customized itinerary with zero forced commercial shopping stops.\n`;
      md += `- 24/7 dedicated personal trip manager available on call/WhatsApp.\n`;

      return new Response(cleanBrandText(md), {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }

    const filePath = path.join(process.cwd(), "src", "data", "llms-full-fallback.txt");
    if (fs.existsSync(filePath)) {
      return new Response(fs.readFileSync(filePath, "utf-8"), {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    return new Response("# KoiKoi Travel — Comprehensive AI Knowledge Base\n", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    const filePath = path.join(process.cwd(), "src", "data", "llms-full-fallback.txt");
    if (fs.existsSync(filePath)) {
      return new Response(fs.readFileSync(filePath, "utf-8"), {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    return new Response("# KoiKoi Travel — Comprehensive AI Knowledge Base\n", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
