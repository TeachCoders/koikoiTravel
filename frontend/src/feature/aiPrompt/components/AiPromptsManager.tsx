"use client";

import React, { useState } from "react";
import { Sparkles, Bot, Save, RotateCcw, Check, BookOpen, Route, Newspaper, MapPin } from "lucide-react";
import PrivatePageHeading from "@/components/shared/PrivatePageHeading";
import { Label } from "@/components/ui/label";

const DEFAULT_JOURNEY_PROMPT = `You are a senior Indian travel specialist, local destination guide, and high-converting SEO copywriter for KoiKoi Travel.
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
9. Keyword Integration: Weave target keywords naturally into H1, Overview, Day plans, and FAQs. If keywords not provided, auto-extract Google "People Also Search" queries.`;

const DEFAULT_BLOG_PROMPT = `You are an expert travel writer and SEO copywriter for KoiKoi Travel India.
Write a comprehensive, engaging, high-ranking travel guide / blog post for international tourists, NRIs, and domestic explorers.

STRICT WRITING RULES:
1. Structure: Catchy H1, introduction hook, formatted H2 and H3 headings, practical tips bullet points, best time to visit comparison, and FAQs.
2. Tone: Highly practical, authentic, friendly, and trustworthy.
3. Meta Description: Strictly between 140 and 150 characters with focus keywords.`;

const DEFAULT_DESTINATION_PROMPT = `You are a local destination expert for KoiKoi Travel India.
Generate unique, culturally accurate, and compelling descriptions for Cities and States across India.

STRICT WRITING RULES:
1. Focus on specific monuments, local street foods, arts & crafts, and seasonal weather highlights.
2. Zero duplicate templates or generic copy-pasting. Every city must highlight its unique cultural soul.`;

export default function AiPromptsManager() {
  const [activeTab, setActiveTab] = useState<"journey" | "blog" | "destination">("journey");

  const [journeyPrompt, setJourneyPrompt] = useState(DEFAULT_JOURNEY_PROMPT);
  const [journeyTone, setJourneyTone] = useState("Friendly Local Travel Specialist");
  const [journeyMaxDays, setJourneyMaxDays] = useState("15");

  const [blogPrompt, setBlogPrompt] = useState(DEFAULT_BLOG_PROMPT);
  const [blogTone, setBlogTone] = useState("Engaging Travel Storyteller & Practical Guide");

  const [destPrompt, setDestPrompt] = useState(DEFAULT_DESTINATION_PROMPT);

  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  const handleSave = (tabName: string) => {
    setSavedStatus(tabName);
    setTimeout(() => setSavedStatus(null), 2500);
  };

  const handleReset = (tab: "journey" | "blog" | "destination") => {
    if (tab === "journey") setJourneyPrompt(DEFAULT_JOURNEY_PROMPT);
    if (tab === "blog") setBlogPrompt(DEFAULT_BLOG_PROMPT);
    if (tab === "destination") setDestPrompt(DEFAULT_DESTINATION_PROMPT);
  };

  return (
    <div className="mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PrivatePageHeading
          icon={Sparkles}
          title="AI Prompt Studio"
          description="Manage master system prompts, tone instructions & formatting rules for AI content generation"
        />

        {savedStatus && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-semibold animate-in fade-in duration-200">
            <Check size={16} />
            <span>{savedStatus} prompt settings saved!</span>
          </div>
        )}
      </div>

      {/* Tabs Switcher */}
      <div className="flex gap-2 border-b border-slate-200 bg-white p-1.5 rounded-2xl border shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab("journey")}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all ${
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
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all ${
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
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all ${
            activeTab === "destination"
              ? "bg-[#2E8B8B] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <MapPin size={16} />
          <span>Destination Info Prompt</span>
        </button>
      </div>

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
                These rules control how AI generates Day-by-Day plans, Overview, Inclusions, and FAQs when you create a Journey.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleReset("journey")}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw size={13} />
              Reset Default
            </button>
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
                placeholder="e.g. Warm, Local Travel Expert"
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
              <span className="text-[11px] text-slate-400 font-normal">Passed directly to Gemini API</span>
            </Label>
            <textarea
              rows={12}
              value={journeyPrompt}
              onChange={(e) => setJourneyPrompt(e.target.value)}
              className="w-full p-4 text-sm font-mono leading-relaxed rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] transition-all"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => handleSave("Journey")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2E8B8B] hover:bg-[#257373] text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
            >
              <Save size={16} />
              Save Journey Prompt
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
                Controls the tone, formatting structure, and SEO keyword density when generating travel blog posts.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleReset("blog")}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw size={13} />
              Reset Default
            </button>
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
              <span className="text-[11px] text-slate-400 font-normal">Passed directly to Gemini API</span>
            </Label>
            <textarea
              rows={12}
              value={blogPrompt}
              onChange={(e) => setBlogPrompt(e.target.value)}
              className="w-full p-4 text-sm font-mono leading-relaxed rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] transition-all"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => handleSave("Blog")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2E8B8B] hover:bg-[#257373] text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
            >
              <Save size={16} />
              Save Blog Prompt
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
            <button
              type="button"
              onClick={() => handleReset("destination")}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw size={13} />
              Reset Default
            </button>
          </div>

          <div>
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block flex items-center justify-between">
              <span>Destination System Instructions</span>
              <span className="text-[11px] text-slate-400 font-normal">Passed directly to Gemini API</span>
            </Label>
            <textarea
              rows={12}
              value={destPrompt}
              onChange={(e) => setDestPrompt(e.target.value)}
              className="w-full p-4 text-sm font-mono leading-relaxed rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] transition-all"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => handleSave("Destination")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2E8B8B] hover:bg-[#257373] text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
            >
              <Save size={16} />
              Save Destination Prompt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

