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

export async function GET() {
  try {
    const [journeys, states, experiences] = await Promise.all([
      fetchApi<any>("/journey?limit=5000&isActive=true"),
      fetchApi<any>("/state?limit=100"),
      fetchApi<any>("/holidays?limit=100"),
    ]);

    if (journeys.length > 0) {
      let md = `# KoiKoi Travel — Comprehensive AI Knowledge Base (llms-full.txt)\n\n`;
      md += `> Official plain-text knowledge base for KoiKoi Travel (${SITE_URL}). This document provides complete, live-updated contextual data on all tour packages, destinations, booking policies, and services across India.\n\n`;
      md += `## 1. Company Overview\n`;
      md += `- Name: KoiKoi Travel\n`;
      md += `- Website: ${SITE_URL}\n`;
      md += `- Phone / WhatsApp: +91 93102 01828\n`;
      md += `- Email: info@koikoitravel.com\n`;
      md += `- Head Office: New Delhi, India\n`;
      md += `- Business Model: Tailor-made private holiday packages, verified chauffeur-driven car rentals, handpicked hotels, and 24/7 dedicated on-ground concierge.\n\n`;

      md += `## 2. Complete Inventory of Active India Tour Packages (${journeys.length} Tours)\n\n`;

      journeys.forEach((j: any, idx: number) => {
        const title = j.title || "India Tour Package";
        const slug = j.slug;
        const dur = j.duration || (j.noDays ? `${j.noDays} Days` : "Custom");
        const cities = Array.isArray(j.route)
          ? j.route.map((c: any) => c.title).filter(Boolean).join(" -> ")
          : "";
        const price = j.discountPrice || j.pricePerPerson ? `Starting from ₹${j.discountPrice || j.pricePerPerson}/person` : "Custom Quote";

        md += `### ${idx + 1}. [${title}](${SITE_URL}/tour-packages/${slug})\n`;
        md += `- **URL**: ${SITE_URL}/tour-packages/${slug}\n`;
        md += `- **Duration**: ${dur}\n`;
        if (cities) md += `- **Route**: ${cities}\n`;
        md += `- **Price**: ${price}\n`;
        if (j.seoDescription) md += `- **Overview**: ${j.seoDescription}\n`;
        if (Array.isArray(j.highlights) && j.highlights.length > 0) {
          md += `- **Highlights**:\n`;
          j.highlights.slice(0, 5).forEach((hl: string) => {
            const cleanHl = hl.replace(/<[^>]*>?/gm, "").trim();
            if (cleanHl) md += `  * ${cleanHl}\n`;
          });
        }
        md += `\n`;
      });

      if (states.length > 0) {
        md += `## 3. Covered Indian States & Regions\n\n`;
        states.forEach((s: any) => {
          if (!s.slug) return;
          md += `### [${s.title || s.name} Tours](${SITE_URL}/tour-packages/india/${s.slug})\n`;
          if (s.seoDescription) md += `${s.seoDescription}\n\n`;
        });
      }

      if (experiences.length > 0) {
        md += `## 4. Curated Travel Experiences & Themes\n\n`;
        experiences.forEach((e: any) => {
          if (!e.slug) return;
          md += `### [${e.title || e.name}](${SITE_URL}/travel-experiences/${e.slug})\n`;
          if (e.seoDescription) md += `${e.seoDescription}\n\n`;
        });
      }

      md += `## 5. Inclusions & Guarantees\n`;
      md += `- Private air-conditioned car with commercial tourist permit.\n`;
      md += `- Background-verified, polite, English-speaking private driver.\n`;
      md += `- All fuel, state border permits, toll taxes, parking, and driver night allowances included.\n`;
      md += `- Handpicked hotels (3-Star, 4-Star, 5-Star, or Royal Heritage Havelis) with daily breakfast.\n`;
      md += `- Sightseeing as per customized itinerary with zero forced commercial shopping stops.\n`;
      md += `- 24/7 dedicated personal trip manager available on call/WhatsApp.\n`;

      return new Response(md, {
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
