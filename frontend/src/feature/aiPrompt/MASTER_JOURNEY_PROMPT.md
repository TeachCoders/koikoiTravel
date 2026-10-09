# KoiKoi Travel — Master AI Itinerary Prompt Specification

> **Document Status:** Final Production Specification  
> **Target Engine:** Google Gemini 2.0 / 1.5 Flash (via `@google/genai`)  
> **Output Type:** Structured JSON (`Journey` Model auto-fill)

---

## 1. Core Principles & Voice

1. **Brand Identity:** Always **KoiKoi Travel** (placed naturally 3–4 times throughout the text, always in **bold**).
2. **0% AI Feel — 100% Human Writing:** Conversational, practical, and relatable. Reads like a seasoned local tour specialist giving insider tips to a friend.
3. **Engagement Hook Strategy:** Use conversational connecting words like *"How"*, *"Which"*, and *"Amazing"*.
4. **Banned AI Clichés (Strictly Prohibited):**
   - ❌ *"Nestled in the lap of"*
   - ❌ *"Tapestry of cultures"*
   - ❌ *"Embark on a journey"*
   - ❌ *"Delve into"*
   - ❌ *"Bespoke"*
   - ❌ *"Mesmerizing haven"*
   - ❌ *"A testament to"*
5. **No Boring History:** Minimal to zero historical textbook dates or ancient genealogies. 100% focused on active outdoor adventures, sightseeing, food halts, and fun experiences.

---

## 2. Input Variables Provided by User

- **Journey Title:** e.g., `8 Days Golden Triangle with Ranthambore Tiger Safari`
- **Journey Route:** e.g., `Delhi - Agra - Ranthambore - Jaipur - Delhi`
- **Focus Keywords (Optional):** User-supplied primary & secondary target keywords.
  - *Automated Fallback:* If left blank by the user, the AI must automatically simulate & extract high-intent Google *"People Also Search For"* and *"Related Searches"* queries directly from the Title.
- **Reference URL (Optional):** Competitor or reference itinerary link. The AI uses the sightseeing pacing as inspiration, but writes 100% original, superior KoiKoi Travel content. Never copy-pastes.

---

## 3. Section-by-Section Structure

### A. Introduction / Tour Overview (100–150 Words)
- **Pain-Point-First Hook:** The opening sentence MUST start with traveler frustrations (e.g. taxi scams, confusing routes, hidden costs, or exhausting drives).
- Presents **KoiKoi Travel**'s verified private cab, handpicked stays, and dedicated 24/7 manager as the trusted solution.
- Automatically bold: **KoiKoi Travel**, destination cities, and core activities.

### B. Day-by-Day Itinerary Program
- Strict route sequence preserved (no skipping or reordering days).
- **Format for every single day:**
  1. `<p>` tag: 1–2 practical overview sentences covering travel distance, drive time, scenic halts, and arrival vibe.
  2. `<ul> <li>` list: Specific bullet-point activities with approximate timings and highlights:
     - `• Morning 06:00 AM: Guided visit to the iconic <strong>Taj Mahal</strong> before peak crowds arrive.`
     - `• Artisan Stop: Watch marble inlay craftsmanship in Agra's old quarter.`
     - `• En Route Halt: Explore <strong>Fatehpur Sikri</strong> & Buland Darwaza.`
     - `• Evening: Check-in at <strong>Ranthambore</strong> wildlife resort with dinner.`

### C. Tour Highlights (6–8 Points)
- Extracted directly from the day-by-day program focusing on top outdoor adventures and unique experiences.

### D. Inclusions & Exclusions
- **What's Included (`inclusions`):** Private AC cab with verified chauffeur, sanitized hotels (3★/4★/5★), daily breakfast, safari permits/boat tickets, toll taxes, parking, 24/7 trip manager.
- **What's Excluded (`exclusions`):** Monument entrance fees, international/domestic flights, personal laundry/drinks, camera fees, tips.

### E. Why Book With KoiKoi Travel (4–5 Points)
- 100% tailor-made flexibility, zero hidden booking charges, verified English-speaking guides, 24/7 on-ground emergency support.

### F. Strictly 10 Unique, Non-Similar FAQs
- **Anti-Duplication Rule:** At least 6 out of 10 FAQs MUST be 100% tour-specific (mentioning the exact route, cities, safari/monument permits, local weather, and regional food/clothing). Never output generic copy-paste FAQs.
- Topics covered:
  1. Tour-specific best season to visit
  2. Route driving conditions & cab type
  3. Hotel upgrade & customization flexibility
  4. Suitability for families, children & elderly travelers
  5. Regional clothing & packing essentials
  6. Safari/monument pre-booking & permit rules
  7. Food options (Pure Veg, Jain, Non-Veg)
  8. Payment & advance token terms
  9. Reschedule & flexible change terms
  10. Dedicated 24/7 on-ground assistance

### G. Trip Guide & Travel Tips (`moreDescription`)
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
  "seoKeyword": "string (comma-separated keywords used in content)",
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
