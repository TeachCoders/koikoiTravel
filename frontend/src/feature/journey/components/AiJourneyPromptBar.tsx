"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Route,
  Link as LinkIcon,
  KeyRound,
  Type,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Eye,
  FileText,
  RotateCcw,
} from "lucide-react";
import { Label } from "@/components/ui/label";

const DEFAULT_MASTER_RULES = `You are a senior Indian travel specialist, local destination guide, and high-converting SEO copywriter for KoiKoi Travel.
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

export default function AiJourneyPromptBar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [title, setTitle] = useState("");
  const [route, setRoute] = useState("");
  const [focusKeywords, setFocusKeywords] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");

  const [compiledPrompt, setCompiledPrompt] = useState("");
  const [showPromptBox, setShowPromptBox] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-generate compiled prompt whenever fields change
  const buildPrompt = () => {
    let customRules = DEFAULT_MASTER_RULES;
    try {
      const stored = localStorage.getItem("koi_journey_prompt");
      if (stored && stored.trim()) {
        customRules = stored.trim();
      }
    } catch {}

    const promptText = `${customRules}

==================================================
INPUT PARAMETERS FOR THIS TOUR PACKAGE:
==================================================
1. Tour Title: ${title.trim() || "[To be generated based on Route]"}
2. Route Circuit: ${route.trim() || "[Provide best recommended route]"}
3. Focus Keywords: ${focusKeywords.trim() || "(Auto-extract Google 'People Also Search For' search queries for this route)"}
4. Reference URL: ${referenceUrl.trim() || "None"}

==================================================
STRICT GENERATION MANDATE:
==================================================
Generate a complete, high-converting, human-written tour package itinerary for KoiKoi Travel.
- Bold format <strong>KoiKoi Travel</strong> (3-4 times), cities, and core activities in <strong>.
- Introduction (100-150 words) MUST start with traveler pain-points and frustrations.
- Day program: <p> overview followed by <ul><li> bullet points with approximate timings.
- Exactly 10 circuit-specific FAQs.
- Auto-detect routeCities, destination, suggestedExperiences, suggestedSeasons.
- Return strictly valid raw JSON matching the output schema.`;

    return promptText;
  };

  const handleShowPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = buildPrompt();
    setCompiledPrompt(prompt);
    setShowPromptBox(true);
  };

  const handleCopy = () => {
    const textToCopy = compiledPrompt || buildPrompt();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setTitle("");
    setRoute("");
    setFocusKeywords("");
    setReferenceUrl("");
    setCompiledPrompt("");
    setShowPromptBox(false);
  };

  return (
    <div className="rounded-2xl border border-[#2E8B8B]/30 bg-gradient-to-br from-white via-[#F4F9F9] to-[#EAF5F5] p-5 sm:p-6 shadow-sm relative overflow-hidden transition-all">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2E8B8B]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2E8B8B] text-white flex items-center justify-center shadow-sm">
            <Sparkles size={20} className="text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                AI Prompt Generator for Journey
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#F8904D]/15 text-[#F8904D]">
                Prompt Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter 4 tour details to generate the complete ready-to-run master prompt for your itinerary.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span>{isExpanded ? "Hide Panel" : "Open Panel"}</span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* 4 Individual Fields Container */}
      {isExpanded && (
        <form onSubmit={handleShowPrompt} className="mt-5 space-y-4 pt-4 border-t border-[#2E8B8B]/15">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Field 1: Journey Title */}
            <div>
              <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Type size={13} className="text-[#2E8B8B]" />
                1. Journey Title
              </Label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 8 Days Golden Triangle with Ranthambore Tiger Safari"
                className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] transition-all"
              />
            </div>

            {/* Field 2: Journey Route */}
            <div>
              <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Route size={13} className="text-[#2E8B8B]" />
                2. Journey Route
              </Label>
              <input
                type="text"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                placeholder="e.g. Delhi - Agra - Ranthambore - Jaipur - Delhi"
                className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] transition-all"
              />
            </div>

            {/* Field 3: Journey Focus Keywords */}
            <div>
              <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <KeyRound size={13} className="text-[#2E8B8B]" />
                3. Journey Focus Keywords
              </Label>
              <input
                type="text"
                value={focusKeywords}
                onChange={(e) => setFocusKeywords(e.target.value)}
                placeholder="e.g. golden triangle tiger safari, delhi agra jaipur ranthambore tour"
                className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] transition-all"
              />
            </div>

            {/* Field 4: Page Reference URL (Optional) */}
            <div>
              <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <LinkIcon size={13} className="text-[#2E8B8B]" />
                  4. Page Reference URL
                </span>
                <span className="text-[11px] font-normal text-slate-400 lowercase">(optional)</span>
              </Label>
              <input
                type="url"
                value={referenceUrl}
                onChange={(e) => setReferenceUrl(e.target.value)}
                placeholder="e.g. https://example.com/reference-tour-page"
                className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] transition-all"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-slate-500">
              💡 <span className="font-semibold">Note:</span> Click below to view and copy the complete compiled prompt for this journey.
            </p>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {(title || route || focusKeywords || referenceUrl) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Clear</span>
                </button>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#2E8B8B] hover:bg-[#236e6e] active:scale-95 text-white text-sm font-bold shadow-md shadow-[#2E8B8B]/20 transition-all cursor-pointer"
              >
                <Sparkles size={16} className="text-amber-300" />
                <span>Show AI Prompt</span>
              </button>
            </div>
          </div>

          {/* COMPILED PROMPT BOX */}
          {showPromptBox && (
            <div className="mt-4 rounded-xl border border-[#2E8B8B]/30 bg-white p-4 shadow-sm space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-[#2E8B8B]" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Ready-to-Use AI Prompt
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    ({compiledPrompt.length} characters)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      copied
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-[#2E8B8B] hover:bg-[#236e6e] text-white shadow-xs"
                    }`}
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copied ? "Prompt Copied!" : "Copy Prompt"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPromptBox(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                    title="Close preview"
                  >
                    <ChevronUp size={16} />
                  </button>
                </div>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  rows={14}
                  value={compiledPrompt}
                  className="w-full p-3.5 text-xs font-mono leading-relaxed rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 select-all focus:outline-none focus:ring-1 focus:ring-[#2E8B8B]"
                />
              </div>

              <div className="flex items-center justify-between text-[11.5px] text-slate-500 pt-1">
                <span>
                  📋 Click <strong>Copy Prompt</strong> to paste into Google Gemini / AI Studio to generate your itinerary JSON.
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs text-[#2E8B8B] font-bold hover:underline cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
