"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Save,
  RotateCcw,
  Check,
  Route,
  Newspaper,
  MapPin,
  Copy,
  Loader2,
  Database,
  AlertCircle,
} from "lucide-react";
import PrivatePageHeading from "@/components/shared/PrivatePageHeading";
import { Label } from "@/components/ui/label";
import {
  getAiPrompts,
  updateAiPrompt,
  resetAiPrompt,
  AiPromptData,
} from "../api";

export const DEFAULT_JOURNEY_PROMPT = `You are a senior Indian travel specialist, local destination guide, and high-converting SEO copywriter for KoiKoi Travel.
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
}`;

export const DEFAULT_BLOG_PROMPT = `You are an expert travel writer and SEO copywriter for KoiKoi Travel India.
Write a comprehensive, engaging, high-ranking travel guide / blog post for international tourists, NRIs, and domestic explorers.

STRICT WRITING RULES:
1. Structure: Catchy H1, introduction hook, formatted H2 and H3 headings, practical tips bullet points, best time to visit comparison, and FAQs.
2. Tone: Highly practical, authentic, friendly, and trustworthy.
3. Meta Description: Strictly between 140 and 150 characters with focus keywords.`;

export const DEFAULT_DESTINATION_PROMPT = `You are a local destination expert for KoiKoi Travel India.
Generate unique, culturally accurate, and compelling descriptions for Cities and States across India.

STRICT WRITING RULES:
1. Focus on specific monuments, local street foods, arts & crafts, and seasonal weather highlights.
2. Zero duplicate templates or generic copy-pasting. Every city must highlight its unique cultural soul.`;

export default function AiPromptsManager() {
  const [activeTab, setActiveTab] = useState<"journey" | "blog" | "destination">("journey");

  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const [journeyPrompt, setJourneyPrompt] = useState(DEFAULT_JOURNEY_PROMPT);
  const [journeyTone, setJourneyTone] = useState("Friendly Local Travel Specialist");
  const [journeyMaxDays, setJourneyMaxDays] = useState("15");

  const [blogPrompt, setBlogPrompt] = useState(DEFAULT_BLOG_PROMPT);
  const [blogTone, setBlogTone] = useState("Engaging Travel Storyteller & Practical Guide");

  const [destPrompt, setDestPrompt] = useState(DEFAULT_DESTINATION_PROMPT);

  const [savedStatus, setSavedStatus] = useState<string | null>(null);
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<"connected" | "local">("connected");

  // Fetch from Database on mount
  useEffect(() => {
    let isMounted = true;
    async function loadFromDb() {
      setLoading(true);
      try {
        const prompts = await getAiPrompts();
        if (!isMounted) return;

        if (prompts.journey) {
          if (prompts.journey.systemPrompt) setJourneyPrompt(prompts.journey.systemPrompt);
          if (prompts.journey.tone) setJourneyTone(prompts.journey.tone);
          if (prompts.journey.maxDays) setJourneyMaxDays(prompts.journey.maxDays);
        }

        if (prompts.blog) {
          if (prompts.blog.systemPrompt) setBlogPrompt(prompts.blog.systemPrompt);
          if (prompts.blog.tone) setBlogTone(prompts.blog.tone);
        }

        if (prompts.destination) {
          if (prompts.destination.systemPrompt) setDestPrompt(prompts.destination.systemPrompt);
        }
        setDbStatus("connected");
      } catch (err) {
        console.warn("Failed to load prompts from DB, fallback to local", err);
        setDbStatus("local");
        // Fallback to localStorage if offline
        try {
          const storedJP = localStorage.getItem("koi_journey_prompt");
          if (storedJP) setJourneyPrompt(storedJP);
          const storedBP = localStorage.getItem("koi_blog_prompt");
          if (storedBP) setBlogPrompt(storedBP);
          const storedDP = localStorage.getItem("koi_dest_prompt");
          if (storedDP) setDestPrompt(storedDP);
        } catch {}
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadFromDb();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSavePrompt = async (tabName: "Journey" | "Blog" | "Destination") => {
    const key = tabName.toLowerCase() as "journey" | "blog" | "destination";
    setSavingKey(tabName);
    try {
      let payload: Partial<AiPromptData> = {};
      if (tabName === "Journey") {
        payload = {
          systemPrompt: journeyPrompt,
          tone: journeyTone,
          maxDays: journeyMaxDays,
        };
        try {
          localStorage.setItem("koi_journey_prompt", journeyPrompt);
          localStorage.setItem("koi_journey_tone", journeyTone);
          localStorage.setItem("koi_journey_max_days", journeyMaxDays);
        } catch {}
      } else if (tabName === "Blog") {
        payload = {
          systemPrompt: blogPrompt,
          tone: blogTone,
        };
        try {
          localStorage.setItem("koi_blog_prompt", blogPrompt);
          localStorage.setItem("koi_blog_tone", blogTone);
        } catch {}
      } else if (tabName === "Destination") {
        payload = {
          systemPrompt: destPrompt,
        };
        try {
          localStorage.setItem("koi_dest_prompt", destPrompt);
        } catch {}
      }

      await updateAiPrompt(key, payload);

      setSavedStatus(`${tabName} prompt saved to Database!`);
      setTimeout(() => setSavedStatus(null), 3000);
    } catch (err: any) {
      console.error("Failed to save prompt to DB:", err);
      setSavedStatus(`${tabName} saved locally!`);
      setTimeout(() => setSavedStatus(null), 3000);
    } finally {
      setSavingKey(null);
    }
  };

  const handleCopyPrompt = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStatus(label);
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  const handleReset = async (tab: "journey" | "blog" | "destination") => {
    setSavingKey(tab);
    try {
      await resetAiPrompt(tab);
      if (tab === "journey") {
        setJourneyPrompt(DEFAULT_JOURNEY_PROMPT);
        setJourneyTone("Friendly Local Travel Specialist");
        setJourneyMaxDays("15");
        try {
          localStorage.removeItem("koi_journey_prompt");
        } catch {}
      } else if (tab === "blog") {
        setBlogPrompt(DEFAULT_BLOG_PROMPT);
        setBlogTone("Engaging Travel Storyteller & Practical Guide");
        try {
          localStorage.removeItem("koi_blog_prompt");
        } catch {}
      } else if (tab === "destination") {
        setDestPrompt(DEFAULT_DESTINATION_PROMPT);
        try {
          localStorage.removeItem("koi_dest_prompt");
        } catch {}
      }
      setSavedStatus("Prompt reset to default in Database!");
      setTimeout(() => setSavedStatus(null), 3000);
    } catch (err) {
      console.error("Failed to reset prompt in DB:", err);
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PrivatePageHeading
          icon={Sparkles}
          title="AI Prompt Studio"
          description="Centralized Database storage & management for master system prompts"
        />

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <Database size={13} className="text-emerald-600" />
            <span>Database Storage Synced</span>
          </span>

          {savedStatus && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-semibold animate-in fade-in duration-200">
              <Check size={16} />
              <span>{savedStatus}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex gap-2 border-b border-slate-200 bg-white p-1.5 rounded-2xl border shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab("journey")}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === "journey"
              ? "bg-[#2E8B8B] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Route size={16} />
          <span>Journey Itinerary Prompt</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("blog")}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === "blog"
              ? "bg-[#2E8B8B] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Newspaper size={16} />
          <span>Blog Article Prompt</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("destination")}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === "destination"
              ? "bg-[#2E8B8B] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <MapPin size={16} />
          <span>Destination Info Prompt</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 size={24} className="animate-spin text-[#2E8B8B]" />
          <p className="text-sm font-semibold">Loading Master Prompts from Database...</p>
        </div>
      ) : (
        <>
          {/* TAB 1: JOURNEY ITINERARY PROMPT */}
          {activeTab === "journey" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Route size={20} className="text-[#F8904D]" />
                    Tour Itinerary Master Prompt
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    These rules control how Day-by-Day plans, Overview, Inclusions, and 10 FAQs are structured.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyPrompt(journeyPrompt, "Journey")}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {copiedStatus === "Journey" ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedStatus === "Journey" ? "Copied!" : "Copy Prompt"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReset("journey")}
                    disabled={savingKey === "journey"}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RotateCcw size={13} />
                    Reset Default
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                    Brand Tone & Personality
                  </Label>
                  <input
                    type="text"
                    value={journeyTone}
                    onChange={(e) => setJourneyTone(e.target.value)}
                    className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B]"
                    placeholder="e.g. Friendly Local Travel Specialist"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                    Default Maximum Days
                  </Label>
                  <input
                    type="number"
                    value={journeyMaxDays}
                    onChange={(e) => setJourneyMaxDays(e.target.value)}
                    className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B]"
                    placeholder="15"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block flex items-center justify-between">
                  <span>Master System Instructions (Prompt Body)</span>
                  <span className="text-[11px] text-slate-400 font-normal">Stored in Database</span>
                </Label>
                <textarea
                  rows={16}
                  value={journeyPrompt}
                  onChange={(e) => setJourneyPrompt(e.target.value)}
                  className="w-full p-4 text-xs font-mono leading-relaxed rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] transition-all"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSavePrompt("Journey")}
                  disabled={savingKey === "Journey"}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2E8B8B] hover:bg-[#257373] disabled:opacity-60 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
                >
                  {savingKey === "Journey" ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  <span>Save to Database</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: BLOG ARTICLE PROMPT */}
          {activeTab === "blog" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Newspaper size={20} className="text-[#F8904D]" />
                    Blog & Travel Guide Master Prompt
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Controls the tone, formatting structure, and SEO keyword density for travel blogs.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyPrompt(blogPrompt, "Blog")}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {copiedStatus === "Blog" ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedStatus === "Blog" ? "Copied!" : "Copy Prompt"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReset("blog")}
                    disabled={savingKey === "blog"}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RotateCcw size={13} />
                    Reset Default
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                  Writing Persona & Style
                </Label>
                <input
                  type="text"
                  value={blogTone}
                  onChange={(e) => setBlogTone(e.target.value)}
                  className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B]"
                />
              </div>

              <div>
                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block flex items-center justify-between">
                  <span>Blog System Instructions</span>
                  <span className="text-[11px] text-slate-400 font-normal">Stored in Database</span>
                </Label>
                <textarea
                  rows={14}
                  value={blogPrompt}
                  onChange={(e) => setBlogPrompt(e.target.value)}
                  className="w-full p-4 text-xs font-mono leading-relaxed rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] transition-all"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSavePrompt("Blog")}
                  disabled={savingKey === "Blog"}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2E8B8B] hover:bg-[#257373] disabled:opacity-60 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
                >
                  {savingKey === "Blog" ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  <span>Save to Database</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: DESTINATION INFO PROMPT */}
          {activeTab === "destination" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <MapPin size={20} className="text-[#F8904D]" />
                    Destination (City & State) Master Prompt
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Controls how destination highlights, attractions, famous for, and weather descriptions are generated.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyPrompt(destPrompt, "Destination")}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {copiedStatus === "Destination" ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedStatus === "Destination" ? "Copied!" : "Copy Prompt"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReset("destination")}
                    disabled={savingKey === "destination"}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RotateCcw size={13} />
                    Reset Default
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block flex items-center justify-between">
                  <span>Destination System Instructions</span>
                  <span className="text-[11px] text-slate-400 font-normal">Stored in Database</span>
                </Label>
                <textarea
                  rows={14}
                  value={destPrompt}
                  onChange={(e) => setDestPrompt(e.target.value)}
                  className="w-full p-4 text-xs font-mono leading-relaxed rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] transition-all"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSavePrompt("Destination")}
                  disabled={savingKey === "Destination"}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2E8B8B] hover:bg-[#257373] disabled:opacity-60 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
                >
                  {savingKey === "Destination" ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  <span>Save to Database</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
