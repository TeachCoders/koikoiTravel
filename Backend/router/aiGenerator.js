import express from "express";

const router = express.Router();

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
   - "destination": Clean route string e.g. "Cochin - Munnar - Thekkady - Alleppey - Cochin"
   - "routeCities": Array of sequential city names e.g. ["Cochin", "Munnar", "Thekkady", "Alleppey"]
   - "suggestedExperiences": Array of matching categories e.g. ["Backwaters", "Nature & Wildlife", "Hills & Mountains"]
   - "suggestedSeasons": Array of matching seasons e.g. ["Winter", "Spring"]
   - "suggestedMonths": Array of best months e.g. ["October", "November", "December", "January", "February", "March"]
9. White-Hat Internal Linking: ZERO links in H1, H2, H3, or Day Titles. In-body text only (<p> and <li>). Maximum 1 link per city/keyword across entire page. 2-4 contextual links total.
10. SEO Metadata: slug (URL-safe lowercase), h1Title, seoTitle (<60 chars), seoDescription (strictly 140-150 chars), seoKeyword (comma-separated keywords naturally present in content).

OUTPUT SCHEMA (Return strictly valid raw JSON only):
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

async function fetchReferenceText(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; KoiKoiTravelBot/1.0)" },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return "";
    const html = await res.text();
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 3500);
  } catch {
    return "";
  }
}

async function callGeminiApi(model, apiKey, payload) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res;
}

router.post("/generate-itinerary", async (req, res) => {
  try {
    const { title, route, focusKeywords, referenceUrl, customMasterPrompt, apiKey: clientApiKey } = req.body;
    if (!title && !route) {
      return res.status(400).json({ success: false, error: "Please enter at least a Journey Title or Route." });
    }

    const apiKey =
      (clientApiKey && typeof clientApiKey === "string" ? clientApiKey.trim() : "") ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_AI_KEY;

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        error: "Gemini API Key missing. Please click 'Set Gemini Key' to paste your key from Google AI Studio.",
      });
    }

    let referenceContext = "";
    if (referenceUrl && typeof referenceUrl === "string" && referenceUrl.startsWith("http")) {
      const refText = await fetchReferenceText(referenceUrl);
      if (refText) {
        referenceContext = `\n\nREFERENCE URL CONTEXT:\n${refText}\n`;
      }
    }

    const systemPrompt = customMasterPrompt?.trim() || SYSTEM_INSTRUCTIONS;

    const userPrompt = `Generate a complete, high-converting, human-written tour package itinerary for KoiKoi Travel.
Inputs:
- Tour Title: ${title || "N/A"}
- Route Circuit: ${route || "(If Route is N/A, intelligently infer the best sequential route cities based on Tour Title)"}
- Focus Keywords: ${focusKeywords || "(Extract high-intent Google 'People Also Search For' queries automatically)"}
${referenceContext}

Strict Requirements:
1. Format <strong>KoiKoi Travel</strong>, destination cities, and core activities in <strong>.
2. Overview: 100-150 words starting with traveler pain points.
3. Day program: <p> overview followed by <ul><li> bullet points with timings.
4. Exactly 10 circuit-specific FAQs.
5. Inclusions, exclusions, why choose us.
6. routeCities, destination, suggestedExperiences, suggestedSeasons.
7. Return strictly valid raw JSON only.`;

    const geminiPayload = {
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.7 },
    };

    const modelsToTry = [
      "gemini-3.1-flash-lite",
      "gemini-flash-latest",
      "gemini-3.5-flash",
      "gemini-3.7-flash",
    ];

    let response = null;
    for (const model of modelsToTry) {
      response = await callGeminiApi(model, apiKey, geminiPayload);
      if (response.ok) break;
      // If error is temporary or model not found (503, 429, 404, 500), try next model
      if ([404, 503, 429, 500, 502, 504].includes(response.status)) {
        continue;
      }
      break;
    }

    if (!response || !response.ok) {
      const errText = response ? await response.text() : "";
      let errMsg = "Failed to communicate with Google Gemini API.";
      try {
        const parsedErr = JSON.parse(errText);
        if (parsedErr?.error?.message) {
          errMsg = parsedErr.error.message;
        }
      } catch {
        errMsg = errText || errMsg;
      }
      return res.status(response?.status || 500).json({ success: false, error: errMsg });
    }

    const data = await response.json();
    const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidate) {
      return res.status(500).json({ success: false, error: "No response generated by Gemini. Please try again." });
    }

    const parsedItinerary = extractAndParseJson(candidate);
    return res.json({ success: true, data: parsedItinerary });
  } catch (error) {
    console.error("AI Itinerary Error:", error);
    return res.status(500).json({ success: false, error: error?.message || "Internal server error" });
  }
});

function extractAndParseJson(candidate) {
  if (!candidate || typeof candidate !== "string") {
    throw new Error("Invalid or empty response text received from AI.");
  }

  let text = candidate.trim().replace(/^```(?:json)?\s*/gi, "").replace(/\s*```$/gi, "").trim();

  // Try direct JSON.parse first
  try {
    return JSON.parse(text);
  } catch {}

  // Extract balanced JSON object starting at first '{'
  const firstBrace = text.indexOf("{");
  if (firstBrace !== -1) {
    let braceCount = 0;
    let endBrace = -1;
    let inString = false;
    let escape = false;

    for (let i = firstBrace; i < text.length; i++) {
      const char = text[i];
      if (escape) {
        escape = false;
        continue;
      }
      if (char === "\\") {
        escape = true;
        continue;
      }
      if (char === '"') {
        inString = !inString;
        continue;
      }
      if (!inString) {
        if (char === "{") braceCount++;
        else if (char === "}") {
          braceCount--;
          if (braceCount === 0) {
            endBrace = i;
            break;
          }
        }
      }
    }

    if (endBrace !== -1) {
      const jsonSub = text.slice(firstBrace, endBrace + 1);
      try {
        return JSON.parse(jsonSub);
      } catch {
        const sanitized = jsonSub.replace(/,\s*([\]}])/g, "$1");
        return JSON.parse(sanitized);
      }
    }
  }

  const sanitized = text.replace(/,\s*([\]}])/g, "$1");
  return JSON.parse(sanitized);
}

export default router;

