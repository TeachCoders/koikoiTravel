"use client";

import React, { useState } from "react";
import { Sparkles, Route, Link as LinkIcon, KeyRound, Type, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "@/components/ui/label";

export interface AiJourneyPromptData {
  title: string;
  route: string;
  focusKeywords: string;
  referenceUrl: string;
}

interface AiJourneyPromptBarProps {
  onGenerate?: (data: AiJourneyPromptData) => void;
  isGenerating?: boolean;
}

export default function AiJourneyPromptBar({
  onGenerate,
  isGenerating = false,
}: AiJourneyPromptBarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [title, setTitle] = useState("");
  const [route, setRoute] = useState("");
  const [focusKeywords, setFocusKeywords] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");

  const handleGenerateClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !route.trim()) return;
    if (onGenerate) {
      onGenerate({ title, route, focusKeywords, referenceUrl });
    }
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
              Enter 4 details below to auto-generate overview, days, highlights, inclusions, and SEO metadata.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
        >
          <span>{isExpanded ? "Hide Panel" : "Open Panel"}</span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

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
              💡 <span className="font-semibold">Note:</span> Clicking generate will fill the Overview, Days, Highlights, Inclusions &amp; SEO metadata below.
            </p>

            <button
              type="submit"
              disabled={isGenerating || (!title.trim() && !route.trim())}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#2E8B8B] hover:bg-[#236e6e] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md shadow-[#2E8B8B]/20 transition-all cursor-pointer shrink-0"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Generating Itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} className="text-amber-300" />
                  <span>🚀 Generate Content</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
