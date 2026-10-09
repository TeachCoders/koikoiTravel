# KoiKoi Travel — Master AI Itinerary Prompt Specification

> **Document Status:** Final Production Master Specification (Locked)  
> **Target Engine:** Google Gemini 2.0 / 1.5 Flash (via `@google/genai`)  
> **Output Type:** Structured JSON (`Journey` Model auto-fill)

---

## 1. Core Principles & Voice

1. **Brand Identity:** Always **KoiKoi Travel** (placed naturally 3–4 times throughout the text, always in `<strong>` bold).
2. **0% AI Feel — 100% Human Writing:** Conversational, practical, and relatable. Reads like an experienced local tour specialist giving insider advice to a friend.
3. **Engagement Hook Strategy:** Naturally use conversational trigger words like *"How"*, *"Which"*, and *"Amazing"*.
4. **Banned AI Clichés (Strictly Prohibited):**
   - ❌ *"Nestled in the lap of"*
   - ❌ *"Tapestry of cultures"*
   - ❌ *"Embark on a journey"*
   - ❌ *"Delve into"*
   - ❌ *"Bespoke"*
   - ❌ *"Mesmerizing haven"*
   - ❌ *"A testament to"*
5. **Zero Boring History:** Minimal to zero historical textbook dates or ancient king genealogies. 100% focused on active outdoor adventures, sightseeing, local food halts, and fun experiences.

---

## 2. Input Variables Provided by User

- **Journey Title:** e.g., `8 Days Golden Triangle with Ranthambore Tiger Safari`
- **Journey Route:** e.g., `Delhi - Agra - Ranthambore - Jaipur - Delhi`
- **Focus Keywords (Optional):** User-supplied primary & secondary target keywords.
  - *Automated Fallback:* If left blank by the user, the AI must automatically simulate & extract 5 to 7 high-intent Google *"People Also Search For"* and *"Related Searches"* queries directly from the Title.
- **Reference URL (Optional):** Competitor or reference itinerary link.
  - *Perk Extraction:* Extracts any special itinerary highlights, unique activities, and extra perks (e.g. boat rides, special dinners, safari permits) and merges them into KoiKoi Travel's inclusions.
  - *Strict Zero-Copy Rule:* Never copy-paste sentences, Why Choose Us, or FAQs from the reference URL. Everything must be fresh, unique, and superior.

---

## 3. Section-by-Section Structure

### A. Route, Cities, Experiences & Seasons Auto-Detection
The AI extracts structured data for form auto-selection:
- **`destination`:** The clean, normalized route string (e.g. `Delhi - Agra - Ranthambore - Jaipur - Delhi`).
- **`routeCities`:** Array of individual city names in sequence (e.g. `["Delhi", "Agra", "Ranthambore", "Jaipur"]`).
  - *Frontend Action:* Form auto-selects existing matching cities. Any missing city displays a 1-click **"+ Quick Create City"** option on the form.
- **`suggestedExperiences`:** Array of matching category tags (e.g. `["Wildlife", "Heritage & Culture", "Golden Triangle"]`). Form auto-checks matching pills.
- **`suggestedSeasons`:** Array of best travel seasons (e.g. `["Winter", "Spring"]`). Form auto-checks matching seasons.
- **`suggestedMonths`:** Array of ideal travel months (e.g. `["October", "November", "December", "January", "February", "March"]`).

### B. Mandatory Bold Formatting (`<strong>`)
Automatically format in bold:
1. Brand: `<strong>KoiKoi Travel</strong>`
2. Destinations & Cities: e.g. `<strong>Jaipur</strong>`, `<strong>Agra</strong>`, `<strong>Ranthambore</strong>`.
3. Core Activities & Sightseeing: e.g. `<strong>Tiger Safari</strong>`, `<strong>Elephant Village Ride</strong>`, `<strong>Sunrise Taj Mahal Visit</strong>`, `<strong>Ganga Aarti</strong>`, `<strong>Camel Desert Camping</strong>`.
4. Key Tour Inclusions: e.g. `<strong>Private AC Cab</strong>`, `<strong>Sanitized Hotels</strong>`, `<strong>Daily Breakfast</strong>`.

### C. Introduction / Overview (100–150 Words)
- **Pain-Point-First Hook:** The opening sentence MUST start with traveler frustrations (e.g. taxi scams, confusing sightseeing routes, unexpected hidden charges, or exhausting travel days).
- Presents **KoiKoi Travel**'s verified private cab, handpicked stays, and dedicated 24/7 manager as the trusted solution.
- Length: Exactly 100 to 150 words.

### D. Day-by-Day Itinerary Program
- Strict route sequence preserved (no skipping or reordering days).
- **Format for every single day:**
  1. `<p>` tag: 1–2 practical overview sentences covering travel distance, drive time, scenic halts, and arrival vibe.
  2. `<ul> <li>` list: Specific bullet-point activities with approximate timings and highlights:
     - `• Morning 06:00 AM: Guided visit to the iconic <strong>Taj Mahal</strong> before peak crowds arrive.`
     - `• Artisan Stop: Watch marble inlay craftsmanship in Agra's old quarter.`
     - `• En Route Halt: Explore <strong>Fatehpur Sikri</strong> & Buland Darwaza.`
     - `• Evening: Check-in at <strong>Ranthambore</strong> wildlife resort with dinner.`

### E. Tour Highlights (6–8 Points)
- Extracted directly from the day-by-day program focusing on top outdoor adventures and unique experiences.

### F. Inclusions & Exclusions
- **What's Included (`inclusions`):** Private AC cab with verified chauffeur, sanitized hotels (3★/4★/5★), daily breakfast, safari permits/boat tickets, toll taxes, parking, 24/7 trip manager, plus any extra perks extracted from Reference URL.
- **What's Excluded (`exclusions`):** Monument entrance fees, international/domestic flights, personal laundry/drinks, camera fees, tips.
- **Why Book With KoiKoi Travel (`whyChooseUs`):** 4–5 core trust points (100% tailor-made, zero hidden booking charges, verified English-speaking guides, 24/7 on-ground assistance). Never copied.
- *(Note: Booking policies are handled manually and excluded from AI generation).*

### G. Strictly 10 Unique, Non-Similar FAQs (Anti-Duplication)
- **Anti-Duplication Rule:** At least 6 out of 10 FAQs MUST be 100% tour-specific (mentioning the exact route, cities, safari/monument permits, local weather, and regional food/clothing). Never output generic copy-paste FAQs.
- Topics covered:
  1. Circuit-specific best season & weather
  2. Route driving conditions & cab type
  3. Hotel upgrade & customization flexibility
  4. Suitability for families, children & elderly travelers
  5. Regional clothing & packing essentials
  6. Safari/monument pre-booking & permit rules for these specific cities
  7. Food options (Pure Veg, Jain, Non-Veg)
  8. Payment & advance token terms
  9. Reschedule & flexible change terms
  10. Dedicated 24/7 on-ground assistance

### H. Trip Guide & Travel Tips (`moreDescription`)
- Practical clothing etiquette, photography timings, packing essentials, and local tipping tips.

---

## 4. Strict White-Hat Internal Linking Rules

1. ❌ **ZERO Links in Headings:** Never link inside `h1`, `h2`, `h3`, or `Day Titles`.
2. ✅ **In-Body Text Only:** Links must strictly live inside regular paragraph `<p>` and list item `<li>` text.
3. 🎯 **First-Occurrence Only:** If a destination (e.g. *Jaipur*) appears 10 times, link it ONLY on its very first natural mention: `<a href="/tour-packages/india/rajasthan/jaipur">Jaipur</a>`. Never link the same term twice.
4. ⚖️ **Controlled Link Density:** Maximum 2 to 4 contextual internal links across the entire package.

---

## 5. Structured JSON Output Schema

```json
{
  "title": "string",
  "slug": "string",
  "h1Title": "string",
  "seoTitle": "string (under 60 chars)",
  "seoDescription": "string (strictly 140-150 chars)",
  "seoKeyword": "string (comma-separated keywords naturally present in content)",
  "destination": "string (clean route string e.g. Delhi - Agra - Ranthambore - Jaipur - Delhi)",
  "routeCities": ["string", "string"],
  "suggestedExperiences": ["string", "string"],
  "suggestedSeasons": ["string", "string"],
  "suggestedMonths": ["string", "string"],
  "overView": "string (HTML with <p> and <strong>, 100-150 words pain-point hook)",
  "highlights": ["string", "string"],
  "days": [
    {
      "day": "Day 1: Title",
      "description": "HTML containing <p> intro followed by <ul><li> activities</li></ul>"
    }
  ],
  "inclusions": ["string", "string"],
  "exclusions": ["string", "string"],
  "whyChooseUs": ["string", "string"],
  "faqs": [
    { "ques": "Question string", "ans": "Answer string" }
  ],
  "moreDescription": "string (HTML trip guide & travel tips)"
}
```
