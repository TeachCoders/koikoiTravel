import { NextRequest, NextResponse } from "next/server";

// Fallback master prompt instructions if not passed from client
const SYSTEM_INSTRUCTIONS = `You are a senior Indian travel specialist, local destination guide, and high-converting SEO copywriter for KoiKoi Travel.
Your mission is to generate a 100% human, engaging, activity-packed tour package itinerary based on the user's input.

CORE PRINCIPLES & RULES:
1. Mandatory Bold Formatting (<strong>):
   - Always format <strong>KoiKoi Travel</strong> (placed naturally 3-4 times).
   - Core activities & sightseeing (e.g. <strong>Tiger Safari</strong>, <strong>Sunrise Taj Mahal Visit</strong>, <strong>Ganga Aarti</strong>, <strong>Elephant Village Ride</strong>) must be in <strong>.
   - Destinations & Cities (e.g. <strong>Jaipur</strong>, <strong>Agra</strong>, <strong>Ranthambore</strong>) must be in <strong>.
   - Key Inclusions (e.g. <strong>Private AC Cab</strong>, <strong>Daily Breakfast</strong>) in <strong>.
2. Language & Tone: Simple, conversational English (0% AI feel). Use trigger words like "How", "Which", and "Amazing". BANNED words: "Nestled in", "Tapestry of cultures", "Embark on a journey", "Delve into", "Bespoke", "Mesmerizing haven".
3. Zero Boring History: No king genealogies or ancient dates. 100% focus on outdoor fun, sightseeing, food halts, and adventures.
4. Introduction (100-150 Words): The very first sentence MUST start with traveler frustrations (unreliable taxis, confusing routes, hidden fees) and present KoiKoi Travel as the solution.
5. Day Program Structure: Each day MUST start with a <p> overview of travel distance/context, followed by an unordered list (<ul>) of bullet-point activities (<li>) with timings/highlights.
6. Inclusions & Exclusions: Specific items. Inclusions must integrate any extra perks found in reference URL. Exclusions must be clear. Why Choose Us must be 100% original KoiKoi trust points.
7. Strictly 10 Unique FAQs: Exactly 10 tour-specific FAQs. At least 6-7 must be 100% circuit-specific (referencing exact cities, permits, regional food/weather). Never generic.
8. Route & Auto-Detection:
   - "destination": Clean route string e.g. "Delhi - Agra - Ranthambore - Jaipur - Delhi"
   - "routeCities": Array of sequential city names e.g. ["Delhi", "Agra", "Ranthambore", "Jaipur"]
   - "suggestedExperiences": Array of matching categories e.g. ["Wildlife", "Heritage & Culture", "Golden Triangle"]
   - "suggestedSeasons": Array of matching seasons e.g. ["Winter", "Spring"]
   - "suggestedMonths": Array of best months e.g. ["October", "November", "December", "January", "February", "March"]
9. White-Hat Internal Linking: ZERO links in H1, H2, H3, or Day Titles. In-body text only (<p> and <li>). Maximum 1 link per city/keyword across entire page. 2-4 contextual links total.
10. SEO Metadata: slug (URL-safe lowercase), h1Title, seoTitle (<60 chars), seoDescription (strictly 140-150 chars), seoKeyword (comma-separated keywords naturally present in content).

OUTPUT FORMAT:
Return strictly valid raw JSON only (no markdown code blocks, no backticks, no extra text outside the JSON) matching this exact schema:
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
}`;

async function fetchReferenceText(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; KoiKoiTravelBot/1.0)" },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return "";
    const html = await res.text();
    const text = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return text.slice(0, 3500);
  } catch {
    return "";
  }
}

async function callGeminiApi(model: string, apiKey: string, payload: any) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      route,
      focusKeywords,
      referenceUrl,
      customMasterPrompt,
      apiKey: clientApiKey,
    } = body;

    if (!title && !route) {
      return NextResponse.json(
        { error: "Please provide at least a Journey Title or Route." },
        { status: 400 }
      );
    }

    const apiKey =
      (clientApiKey && typeof clientApiKey === "string" ? clientApiKey.trim() : "") ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_AI_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Gemini API Key is not configured. Please paste your free Google Gemini API Key in the AI Prompts Studio or in the prompt bar.",
        },
        { status: 400 }
      );
    }

    let referenceContext = "";
    if (referenceUrl && typeof referenceUrl === "string" && referenceUrl.startsWith("http")) {
      const refText = await fetchReferenceText(referenceUrl);
      if (refText) {
        referenceContext = `\n\nREFERENCE URL CONTEXT (Extract any special perks/activities from here for inclusions/highlights, but write 100% original content without copying):\n${refText}\n`;
      }
    }

    const systemPrompt = customMasterPrompt?.trim() || SYSTEM_INSTRUCTIONS;

    const userPrompt = `Generate a complete, high-converting, human-written tour package itinerary for KoiKoi Travel.
Inputs:
- Tour Title: ${title || "N/A"}
- Route: ${route || "N/A"}
- Focus Keywords: ${focusKeywords || "(Extract high-intent Google 'People Also Search For' queries automatically)"}
${referenceContext}

Strict Requirements:
1. Format <strong>KoiKoi Travel</strong>, destination cities, and core activities in <strong>.
2. Overview: 100-150 words starting with traveler pain points.
3. Day program: <p> overview followed by <ul><li> bullet points with timings.
4. Exactly 10 tour-specific FAQs.
5. Inclusions, exclusions, why choose us.
6. routeCities, destination, suggestedExperiences, suggestedSeasons.
7. Return strictly valid raw JSON only.`;

    const geminiPayload = {
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: userPrompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    };

    // Try gemini-2.0-flash first, fallback to gemini-1.5-flash
    let response = await callGeminiApi("gemini-2.0-flash", apiKey, geminiPayload);
    if (!response.ok && (response.status === 404 || response.status === 400)) {
      response = await callGeminiApi("gemini-1.5-flash", apiKey, geminiPayload);
    }

    if (!response.ok) {
      const errText = await response.text();
      let errMsg = "Failed to communicate with Google Gemini API.";
      try {
        const parsedErr = JSON.parse(errText);
        if (parsedErr?.error?.message) errMsg = parsedErr.error.message;
      } catch {
        errMsg = errText || errMsg;
      }
      return NextResponse.json({ error: errMsg }, { status: response.status });
    }

    const data = await response.json();
    const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidate) {
      return NextResponse.json(
        { error: "No response generated by Gemini. Please try again." },
        { status: 500 }
      );
    }

    // Clean markdown code blocks if any
    let cleanJsonText = candidate
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    // Extract exact JSON object between first { and last }
    const firstBrace = cleanJsonText.indexOf("{");
    const lastBrace = cleanJsonText.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanJsonText = cleanJsonText.slice(firstBrace, lastBrace + 1);
    }

    const parsedItinerary = JSON.parse(cleanJsonText);

    return NextResponse.json({ success: true, data: parsedItinerary });
  } catch (error: any) {
    console.error("AI Itinerary Generation Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error occurred while generating itinerary." },
      { status: 500 }
    );
  }
}
