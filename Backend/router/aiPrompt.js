import { Router } from "express";
import { prisma } from "../utils/prismaConnection.js";
import { requireSalesOrAdmin } from "../middleware/requireSalesOrAdmin.js";

const router = Router();

export const DEFAULT_PROMPTS = {
  journey: {
    key: "journey",
    title: "Tour Itinerary Master Prompt",
    tone: "Friendly Local Travel Specialist",
    maxDays: "15",
    systemPrompt: `You are a senior Indian travel specialist, local destination guide, and high-converting SEO copywriter for KoiKoi Travel.
Your mission is to generate a 100% human, engaging, activity-packed tour package itinerary based on the user's input.

CORE WRITING & SEO RULES:
1. Tone: Simple, clear, conversational English (0% AI feel). Use conversational trigger words like "How", "Which", and "Amazing".
2. Banned Words (Strictly Forbidden): "Nestled in", "Tapestry of cultures", "Embark on a journey", "Delve into", "Bespoke", "Mesmerizing haven".
3. Zero Boring History: No king genealogies or ancient textbook history. Focus 100% on outdoor fun, sightseeing, food halts, and adventures.
4. Mandatory Bold Formatting: Always format KoiKoi Travel (3-4 times), destination cities, and core activities (e.g. Tiger Safari, Elephant Ride) in <strong>.
5. Introduction (100-150 Words): MUST start with traveler pain-points and frustrations (taxi scams, confusing routes, hidden costs) and present KoiKoi Travel as the trusted solution.
6. Day Program Structure: Each day MUST start with a <p> overview of travel context/distance, followed by <ul><li> bullet points of specific day activities & timings.
7. Anti-Duplication FAQs: Generate strictly 10 FAQs. At least 6 must be 100% tour-specific (referencing exact cities, permits, and regional weather).
8. Strict White-Hat Linking: ZERO links in H1, H2, H3, or Day Titles. In-body text only (<p> and <li>). Maximum 1 link per city/keyword across entire page. 2-4 contextual links total.
9. Keyword Integration: Weave target keywords naturally into H1, Overview, Day plans, and FAQs. If keywords not provided, auto-extract Google "People Also Search" queries.
10. Auto-Detection: Return routeCities array (for auto-selecting cities), suggestedExperiences array (matching category pills), and suggestedSeasons array (best travel seasons).
11. Reference URL: If provided, extract extra perks and special sightseeing for inclusions, but write in 100% original voice with zero copying.

OUTPUT SCHEMA (JSON):
{
  "title": "string",
  "slug": "string",
  "h1Title": "string",
  "seoTitle": "string",
  "seoDescription": "string",
  "seoKeyword": "string",
  "destination": "string",
  "routeCities": ["string"],
  "suggestedExperiences": ["string"],
  "suggestedSeasons": ["string"],
  "suggestedMonths": ["string"],
  "overView": "string (HTML with <p> and <strong>, 100-150 words pain-point hook)",
  "highlights": ["string"],
  "days": [
    {
      "day": "Day 1: Title",
      "description": "HTML containing <p> intro followed by <ul><li> activities</li></ul>"
    }
  ],
  "inclusions": ["string"],
  "exclusions": ["string"],
  "whyChooseUs": ["string"],
  "faqs": [
    { "ques": "Question string", "ans": "Answer string" }
  ],
  "moreDescription": "string (HTML comprehensive trip guide & travel tips)"
}`,
  },
  blog: {
    key: "blog",
    title: "Blog Article Master Prompt",
    tone: "Engaging Travel Storyteller & Practical Guide",
    maxDays: null,
    systemPrompt: `You are an expert travel writer and SEO copywriter for KoiKoi Travel India.
Write a comprehensive, engaging, high-ranking travel guide / blog post for international tourists, NRIs, and domestic explorers.

STRICT WRITING RULES:
1. Structure: Catchy H1, introduction hook, formatted H2 and H3 headings, practical tips bullet points, best time to visit comparison, and FAQs.
2. Tone: Highly practical, authentic, friendly, and trustworthy.
3. Meta Description: Strictly between 140 and 150 characters with focus keywords.`,
  },
  destination: {
    key: "destination",
    title: "Destination Info Master Prompt",
    tone: "Local Destination Expert",
    maxDays: null,
    systemPrompt: `You are a local destination expert for KoiKoi Travel India.
Generate unique, culturally accurate, and compelling descriptions for Cities and States across India.

STRICT WRITING RULES:
1. Focus on specific monuments, local street foods, arts & crafts, and seasonal weather highlights.
2. Zero duplicate templates or generic copy-pasting. Every city must highlight its unique cultural soul.`,
  },
};

// GET /api/ai-prompts - fetch all prompts
router.get("/", async (req, res) => {
  try {
    const dbPrompts = await prisma.aiPrompt.findMany();
    const result = { ...DEFAULT_PROMPTS };

    dbPrompts.forEach((p) => {
      if (result[p.key]) {
        result[p.key] = {
          ...result[p.key],
          systemPrompt: p.systemPrompt || result[p.key].systemPrompt,
          tone: p.tone || result[p.key].tone,
          maxDays: p.maxDays || result[p.key].maxDays,
          apiKey: p.apiKey || undefined,
        };
      } else {
        result[p.key] = p;
      }
    });

    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Fetch AI Prompts error:", error);
    return res.status(500).json({ error: "Failed to fetch AI prompts" });
  }
});

// GET /api/ai-prompts/:key - fetch specific prompt
router.get("/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const dbPrompt = await prisma.aiPrompt.findUnique({ where: { key } });

    if (dbPrompt) {
      return res.json({ success: true, data: dbPrompt });
    }

    const defaultPrompt = DEFAULT_PROMPTS[key];
    if (defaultPrompt) {
      return res.json({ success: true, data: defaultPrompt });
    }

    return res.status(404).json({ error: "Prompt key not found" });
  } catch (error) {
    console.error("Fetch AI Prompt key error:", error);
    return res.status(500).json({ error: "Failed to fetch AI prompt" });
  }
});

// PUT /api/ai-prompts/:key - upsert prompt
router.put("/:key", requireSalesOrAdmin, async (req, res) => {
  try {
    const { key } = req.params;
    const { systemPrompt, tone, maxDays, apiKey, title } = req.body;

    const defaultTitle = DEFAULT_PROMPTS[key]?.title || `${key} Master Prompt`;

    const updated = await prisma.aiPrompt.upsert({
      where: { key },
      update: {
        systemPrompt: systemPrompt !== undefined ? systemPrompt : DEFAULT_PROMPTS[key]?.systemPrompt || "",
        tone: tone !== undefined ? tone : undefined,
        maxDays: maxDays !== undefined ? String(maxDays) : undefined,
        apiKey: apiKey !== undefined ? apiKey : undefined,
        title: title || defaultTitle,
      },
      create: {
        key,
        title: title || defaultTitle,
        systemPrompt: systemPrompt || DEFAULT_PROMPTS[key]?.systemPrompt || "",
        tone: tone || DEFAULT_PROMPTS[key]?.tone || null,
        maxDays: maxDays ? String(maxDays) : null,
        apiKey: apiKey || null,
      },
    });

    return res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Save AI Prompt error:", error);
    return res.status(500).json({ error: "Failed to save AI prompt to database" });
  }
});

// POST /api/ai-prompts/reset/:key - reset prompt to default
router.post("/reset/:key", requireSalesOrAdmin, async (req, res) => {
  try {
    const { key } = req.params;
    const defaultData = DEFAULT_PROMPTS[key];

    if (!defaultData) {
      return res.status(404).json({ error: "Default prompt for this key not found" });
    }

    const resetPrompt = await prisma.aiPrompt.upsert({
      where: { key },
      update: {
        systemPrompt: defaultData.systemPrompt,
        tone: defaultData.tone,
        maxDays: defaultData.maxDays,
      },
      create: {
        key,
        title: defaultData.title,
        systemPrompt: defaultData.systemPrompt,
        tone: defaultData.tone,
        maxDays: defaultData.maxDays,
      },
    });

    return res.json({ success: true, data: resetPrompt });
  } catch (error) {
    console.error("Reset AI Prompt error:", error);
    return res.status(500).json({ error: "Failed to reset AI prompt" });
  }
});

export default router;
