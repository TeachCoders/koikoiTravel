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
  FileText,
  RotateCcw,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Key,
  ExternalLink,
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
   - "destination": Clean route string e.g. "Cochin - Munnar - Thekkady - Alleppey - Cochin"
   - "routeCities": Array of sequential city names e.g. ["Cochin", "Munnar", "Thekkady", "Alleppey"]
   - "suggestedExperiences": Array of matching categories e.g. ["Backwaters", "Nature & Wildlife"]
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

interface AiJourneyPromptBarProps {
  onGenerate?: (aiResponseData: any) => void;
  isGenerating?: boolean;
}

export default function AiJourneyPromptBar({
  onGenerate,
  isGenerating: externalIsGenerating,
}: AiJourneyPromptBarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [title, setTitle] = useState("");
  const [route, setRoute] = useState("");
  const [focusKeywords, setFocusKeywords] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [compiledPrompt, setCompiledPrompt] = useState("");
  const [showPromptBox, setShowPromptBox] = useState(false);
  const [copied, setCopied] = useState(false);

  // Quick API Key state
  const [apiKey, setApiKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);

  useEffect(() => {
    try {
      const storedKey = localStorage.getItem("koi_gemini_api_key");
      if (storedKey) setApiKey(storedKey);
    } catch {}
  }, []);

  const isGenerating = externalIsGenerating || loading;

  const handleSaveApiKey = (key: string) => {
    const trimmed = key.trim();
    setApiKey(trimmed);
    try {
      localStorage.setItem("koi_gemini_api_key", trimmed);
      setErrorMsg(null);
      setShowKeyInput(false);
    } catch {}
  };

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

  const handleShowPrompt = (e: React.MouseEvent) => {
    e.preventDefault();
    const prompt = buildPrompt();
    setCompiledPrompt(prompt);
    setShowPromptBox(true);
  };

  const handleGenerateClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!title.trim() && !route.trim()) {
      setErrorMsg("Please enter at least a Journey Title or Route.");
      return;
    }

    let currentApiKey = apiKey.trim();
    if (!currentApiKey) {
      try {
        currentApiKey = localStorage.getItem("koi_gemini_api_key") || "";
      } catch {}
    }

    setLoading(true);

    try {
      let customPrompt: string | undefined;
      try {
        customPrompt = localStorage.getItem("koi_journey_prompt") || undefined;
      } catch {}

      const res = await fetch("/api/ai/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          route: route.trim(),
          focusKeywords: focusKeywords.trim(),
          referenceUrl: referenceUrl.trim(),
          customMasterPrompt: customPrompt,
          apiKey: currentApiKey || undefined,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        const errorDetail = json.error || "Failed to generate itinerary. Please check your Gemini API key.";
        if (errorDetail.toLowerCase().includes("key") || errorDetail.toLowerCase().includes("api")) {
          setShowKeyInput(true);
        }
        setErrorMsg(errorDetail);
        return;
      }

      setSuccessMsg("✨ Itinerary generated successfully! All form fields below have been auto-filled.");
      setTimeout(() => setSuccessMsg(null), 6000);

      if (onGenerate) {
        onGenerate(json.data);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred while generating the itinerary.");
    } finally {
      setLoading(false);
    }
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
    setErrorMsg(null);
    setSuccessMsg(null);
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
                Create Journey with AI
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#F8904D]/15 text-[#F8904D]">
                Auto-Fill
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter 4 tour details to auto-generate overview, days, highlights, inclusions, and SEO metadata.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Key size={13} />
            <span>{apiKey ? "Change Key" : "Set Gemini Key"}</span>
          </button>

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

      {/* Inline Key Setup */}
      {showKeyInput && (
        <div className="mt-4 p-3.5 bg-amber-50/90 border border-amber-200 rounded-xl text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-900 flex items-center gap-1.5">
              <Key size={14} /> Paste Free Google Gemini API Key
            </span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-800 font-semibold hover:underline inline-flex items-center gap-1"
            >
              Get free key from Google AI Studio <ExternalLink size={11} />
            </a>
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Paste AIzaSy... key here"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 h-9 px-3 bg-white border border-amber-300 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="button"
              onClick={() => handleSaveApiKey(apiKey)}
              className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs cursor-pointer shadow-2xs"
            >
              Save Key
            </button>
          </div>
        </div>
      )}

      {/* Status Messages */}
      {errorMsg && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-500" />
            <div className="flex-1">
              <span className="font-semibold block">Generation Error:</span>
              <span>{errorMsg}</span>
            </div>
          </div>
          {!apiKey && (
            <button
              type="button"
              onClick={() => setShowKeyInput(true)}
              className="text-[11px] font-bold text-red-800 bg-red-100 hover:bg-red-200 px-2.5 py-1 rounded-lg shrink-0 cursor-pointer"
            >
              Set Key
            </button>
          )}
        </div>
      )}

      {successMsg && (
        <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2">
          <CheckCircle2 size={15} className="shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 4 Individual Fields Container */}
      {isExpanded && (
        <form onSubmit={handleGenerateClick} className="mt-5 space-y-4 pt-4 border-t border-[#2E8B8B]/15">
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
                disabled={isGenerating}
                className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] transition-all disabled:opacity-60"
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
                disabled={isGenerating}
                className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] transition-all disabled:opacity-60"
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
                disabled={isGenerating}
                className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] transition-all disabled:opacity-60"
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
                disabled={isGenerating}
                className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] transition-all disabled:opacity-60"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-slate-500">
              💡 <span className="font-semibold">Note:</span> Clicking generate will fill Overview, Days, Highlights, Inclusions &amp; SEO metadata below.
            </p>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {(title || route || focusKeywords || referenceUrl) && (
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isGenerating}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <RotateCcw size={13} />
                  <span>Clear</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleShowPrompt}
                disabled={isGenerating}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <span>View Prompt</span>
              </button>

              <button
                type="submit"
                disabled={isGenerating || (!title.trim() && !route.trim())}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#2E8B8B] hover:bg-[#236e6e] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md shadow-[#2E8B8B]/20 transition-all cursor-pointer shrink-0"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-white" />
                    <span>Generating Itinerary (10-15s)...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} className="text-amber-300" />
                    <span>🚀 Auto-Fill Form with AI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* COMPILED PROMPT PREVIEW BOX */}
          {showPromptBox && (
            <div className="mt-4 rounded-xl border border-[#2E8B8B]/30 bg-white p-4 shadow-sm space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-[#2E8B8B]" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Ready-to-Use AI Prompt Preview
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
                  rows={12}
                  value={compiledPrompt}
                  className="w-full p-3.5 text-xs font-mono leading-relaxed rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 select-all focus:outline-none focus:ring-1 focus:ring-[#2E8B8B]"
                />
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
