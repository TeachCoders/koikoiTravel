import { NextRequest, NextResponse } from "next/server";

const SYSTEM_INSTRUCTIONS = `You are a senior Indian travel specialist, local destination guide, and high-converting SEO copywriter for KoiKoi Travel.
Your mission is to generate a 100% human, engaging, activity-packed tour package itinerary based on the user's input.

CORE PRINCIPLES & RULES:
1. Mandatory Bold Formatting (<strong>):
   - Always format <strong>KoiKoi Travel</strong> (placed naturally 3-4 times).
   - Core activities & sightseeing (e.g. <strong>Tiger Safari</strong>, <strong>Houseboat Cruise</strong>, <strong>Sunrise Taj Mahal Visit</strong>, <strong>Kathakali Show</strong>) must be in <strong>.
   - Destinations & Cities (e.g. <strong>Munnar</strong>, <strong>Alleppey</strong>, <strong>Cochin</strong>, <strong>Thekkady</strong>) must be in <strong>.
   - Key Inclusions (e.g. <strong>Private AC Cab</strong>, <strong>Daily Breakfast</strong>) in <strong>.

2. Language & Tone:
   - Simple, direct, conversational English (0% AI feel).
   - ABSOLUTELY BANNED WORDS & PHRASES: "Nestled in", "Tapestry of cultures", "Embark on a journey", "Delve into", "Bespoke", "Mesmerizing haven", "Travel from the hills to the water", "This is the highlight of your package", "Enchanting getaway".
   - Do NOT write cheesy poetic intro sentences for days. Stick to clear facts and route details.

3. Zero Boring History:
   - No king genealogies or ancient dates. 100% focus on outdoor fun, sightseeing, food halts, and real travel experience.

4. Mandatory Page Overview / Introduction ("overView"):
   - "overView" field MUST be generated as a 100-150 word HTML (<p> with <strong>).
   - The very first sentence MUST start with traveler pain-points (unreliable taxis, confusing routes, hidden charges, bad hotels) and position <strong>KoiKoi Travel</strong> as the hassle-free solution.

5. Day Program Structure & Daily Flow (STRICT NO CLOCK TIMINGS & NO BARE FRAGMENTS):
   - STRICTLY BANNED: Do NOT include clock timings (e.g. "09:00 AM", "12:00 PM", "03:00 PM").
   - STRICTLY BANNED: Do NOT output bare 2-3 word fragment bullets (e.g. "Breakfast onboard", "Disembarkation", "Return drive"). Every bullet point MUST begin with a bold category label <li><strong>Category Label:</strong> ...</li> followed by full, engaging narrative sentences.
   - Day Intro <p>: Exactly 1 factual sentence with route & distance (e.g. "<p>Arrival at <strong>Cochin</strong> and scenic drive to <strong>Munnar</strong> (130 km / 4 hours) through tea gardens.</p>").
   - Day 1 Bullet Points (<ul>):
     - <li><strong>Arrival & Transfer:</strong> Warm welcome at Airport/Railway Station by <strong>KoiKoi Travel</strong> team, private AC cab transfer to hotel, and smooth check-in.</li>
     - <li><strong>Sightseeing & Activities:</strong> Explore initial local highlights, photo viewpoints, or relax at the hotel/resort.</li>
     - <li><strong>Overnight Stay:</strong> Relaxing night stay at hotel/resort in <strong>[City]</strong>.</li>
   - Day 2 to Second-to-Last Day Bullet Points (<ul>):
     - <li><strong>Morning Breakfast & Transfer:</strong> Savor a delicious breakfast at hotel/resort followed by a scenic drive to <strong>[Destination]</strong> (distance & drive time).</li>
     - <li><strong>Sightseeing & Activities:</strong> Explore key sightseeing spots, outdoor fun, boat rides, tea garden walks, etc. (incorporate any reference URL details if provided).</li>
     - <li><strong>Overnight Stay:</strong> Night stay at hotel/resort or deluxe houseboat in <strong>[City]</strong>.</li>
   - Final Day Bullet Points (<ul>):
     - <li><strong>Morning Breakfast & Check-out:</strong> Savor breakfast at hotel/houseboat and complete check-out formalities with your driver.</li>
     - <li><strong>Local Shopping & Sightseeing:</strong> Drive towards <strong>[Drop-off City]</strong> for last-minute souvenir/spice shopping or quick local sightseeing.</li>
     - <li><strong>Departure Drop-off:</strong> Timely private cab transfer to Airport/Railway Station for your onward journey with sweet memories by <strong>KoiKoi Travel</strong>.</li>

6. Mandatory Tour Highlights ("highlights"):
   - "highlights" MUST be an array of 5-7 punchy bullet points summarizing key tour highlights (e.g. ["Private AC Cab Transfer for all Sightseeing", "Overnight Deluxe Houseboat Stay with All Meals", "Guided Tea Plantation Walk & Spice Garden Visit", "Kathakali & Kalaripayattu Cultural Show Tickets"]).

7. Mandatory Inclusions, Exclusions & Why Choose Us:
   - "inclusions": Array of 6-8 specific inclusive items (Cab, Hotels, Breakfast, Houseboat Meals, Driver Allowances, Toll/Taxes).
   - "exclusions": Array of 4-6 clear excluded items (Airfare/Train, Entry Tickets, Lunch/Dinner except houseboat, Personal Expenses).
   - "whyChooseUs": Array of 4-5 original KoiKoi Travel trust points (100% Transparent Pricing - Zero Hidden Fees, Verified Professional Drivers, Handpicked Heritage Stays & Deluxe Houseboats, 24/7 Dedicated On-Trip Manager Support).

8. Strictly 10 Unique Circuit FAQs ("faqs"):
   - Exactly 10 tour-specific FAQs. At least 7-8 must be 100% circuit-specific (referencing exact cities, houseboat check-in times, permits, regional food/weather). Never generic.

9. Mandatory Additional Description / Travel Guide ("moreDescription"):
   - "moreDescription" MUST be generated with HTML (<h2>, <h3>, <p>) covering:
     - Planning Tips for this specific circuit
     - Must-try local culinary delights
     - Packing & weather advice for travelers

10. Route & Auto-Detection:
   - "destination": Clean route string e.g. "Cochin - Munnar - Thekkady - Alleppey - Cochin"
   - "routeCities": Array of sequential city names e.g. ["Cochin", "Munnar", "Thekkady", "Alleppey"]
   - "suggestedExperiences": Array of matching categories e.g. ["Backwaters", "Honeymoon", "Nature & Wildlife"]
   - "suggestedSeasons": Array of matching seasons e.g. ["Winter", "Spring"]
   - "suggestedMonths": Array of best months e.g. ["October", "November", "December", "January", "February", "March"]

11. SEO Metadata: slug (URL-safe lowercase), h1Title, seoTitle (<60 chars), seoDescription (strictly 140-150 chars), seoKeyword (comma-separated keywords naturally present in content).

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
  "highlights": ["string (5-7 bullet points)"],
  "days": [
    {
      "day": "Day 1: Title",
      "description": "HTML starting with <p> route overview followed by <ul> containing <li><strong>Route & Transfer:</strong> ...</li>, <li><strong>Sightseeing & Activities:</strong> ...</li>, and <li><strong>Overnight Stay:</strong> ...</li>"
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
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return "";
    let html = await res.text();

    html = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, "")
      .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, "")
      .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, "");

    let text = html
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const matchIdx = text.search(/day\s*1|itinerary|overview|tour\s*plan|highlights/i);
    if (matchIdx > 200) {
      text = text.slice(matchIdx - 100);
    }
    return text.slice(0, 4500);
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
        { error: "Please enter at least a Journey Title or Route." },
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
            "Gemini API Key missing. Please click 'Set Gemini Key' to paste your free key from Google AI Studio.",
        },
        { status: 400 }
      );
    }

    let referenceContext = "";
    if (referenceUrl && typeof referenceUrl === "string" && referenceUrl.startsWith("http")) {
      const refText = await fetchReferenceText(referenceUrl);
      if (refText) {
        referenceContext = `\n\nREFERENCE URL CONTEXT (MUST FOLLOW THIS EXACT ITINERARY & SIGHTSEEING SEQUENCE):\n${refText}\n`;
      }
    }

    const systemPrompt = customMasterPrompt?.trim() || SYSTEM_INSTRUCTIONS;

    const userPrompt = `Generate a complete, high-converting, 100% human travel specialist itinerary for KoiKoi Travel.

Inputs:
- Tour Title: ${title || "N/A"}
- Route Circuit: ${route || "(If Route is N/A, intelligently infer the best sequential route cities based on Tour Title)"}
- Focus Keywords: ${focusKeywords || "(Extract high-intent Google 'People Also Search For' queries automatically)"}
${referenceContext}

Strict Generation Mandates:
1. Format <strong>KoiKoi Travel</strong> (3-4 times), destination cities, and core activities in <strong>.
2. Overview ("overView"): 100-150 words HTML (<p> and <strong>) starting with traveler pain points.
3. Day Program Structure ("days"):
   - STRICTLY ZERO clock timings (No 09:00 AM, 12:00 PM, etc.).
   - STRICTLY ZERO bare fragment bullet points (Do NOT output dry fragments like "Breakfast onboard", "Disembarkation", "Return drive"). Every bullet MUST begin with bold category headers:
     - Day 1: <li><strong>Arrival & Transfer:</strong> ...</li>, <li><strong>Sightseeing & Activities:</strong> ...</li>, <li><strong>Overnight Stay:</strong> ...</li>
     - Day 2+: <li><strong>Morning Breakfast & Transfer:</strong> ...</li>, <li><strong>Sightseeing & Activities:</strong> ...</li>, <li><strong>Overnight Stay:</strong> ...</li>
     - Final Day: <li><strong>Morning Breakfast & Check-out:</strong> ...</li>, <li><strong>Local Shopping & Sightseeing:</strong> ...</li>, <li><strong>Departure Drop-off:</strong> ...</li>
   - If REFERENCE URL CONTEXT is provided above, you MUST match its exact day-by-day sightseeing sequence, specific waterfalls (e.g. Cheeyappara, Valara), heritage sites (Chinese Fishing Nets, Synagogue, Forts), and activities!
4. Mandatory 5-7 Highlights ("highlights").
5. Mandatory Inclusions ("inclusions"), Exclusions ("exclusions"), and 4-5 Why Choose Us trust points ("whyChooseUs").
6. Exactly 10 circuit-specific FAQs ("faqs").
7. Mandatory Additional Description / Travel Guide ("moreDescription").
8. routeCities, destination, suggestedExperiences, suggestedSeasons.
9. Return strictly valid raw JSON only matching the schema.`;

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

    const modelsToTry = [
      "gemini-3.1-flash-lite",
      "gemini-flash-latest",
      "gemini-3.5-flash",
      "gemini-3.7-flash",
    ];
    let response: Response | null = null;

    for (const model of modelsToTry) {
      response = await callGeminiApi(model, apiKey, geminiPayload);
      if (response.ok) break;
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

      if (errMsg.includes("API key not valid") || errMsg.includes("API_KEY_INVALID")) {
        errMsg = "Invalid Gemini API Key. Please make sure your key starts with 'AIzaSy...' (copied from Google AI Studio).";
      }

      return NextResponse.json({ error: errMsg }, { status: response?.status || 500 });
    }

    const data = await response.json();
    const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidate) {
      return NextResponse.json(
        { error: "No response generated by Gemini. Please try again." },
        { status: 500 }
      );
    }

    const parsedItinerary = extractAndParseJson(candidate);
    return NextResponse.json({ success: true, data: parsedItinerary });
  } catch (error: any) {
    console.error("AI Itinerary Generation Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error occurred while generating itinerary." },
      { status: 500 }
    );
  }
}

function extractAndParseJson(candidate: string) {
  if (!candidate || typeof candidate !== "string") {
    throw new Error("Invalid or empty response text received from AI.");
  }

  let text = candidate.trim().replace(/^```(?:json)?\s*/gi, "").replace(/\s*```$/gi, "").trim();

  try {
    return JSON.parse(text);
  } catch {}

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
