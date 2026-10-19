"use client";

import React, { useState } from "react";
import {
  Sparkles,
  RefreshCw,
  Check,
  X,
  Layers,
  Eye,
  ExternalLink,
  Plus,
  Trash2,
  AlertCircle,
  ImageIcon,
} from "lucide-react";
import apiClient from "@/lib/apiClient";
import { errorToast, successToast } from "@/components/shared/tost";

export interface AiSavedImage {
  id: number;
  url: string;
  filename: string;
  label: string;
  category: string;
  width: number;
  height: number;
  fileSize?: number;
}

interface AiImageGeneratorModalProps {
  open: boolean;
  onClose: () => void;
  defaultCategory?: string;
  onImageSaved?: (image: AiSavedImage) => void;
  onBatchSaved?: (images: AiSavedImage[]) => void;
}

const CATEGORY_PRESETS = [
  { key: "banner", label: "Hero Banner", dims: "1920 × 450 px", ratio: "21:9 Ultra-wide", w: 1920, h: 450 },
  { key: "tour", label: "Tour Cards", dims: "600 × 400 px", ratio: "3:2 Landscape", w: 600, h: 400 },
  { key: "destination", label: "Destination Cards", dims: "600 × 600 px", ratio: "1:1 Square", w: 600, h: 600 },
  { key: "gallery", label: "Tour Gallery", dims: "1200 × 800 px", ratio: "3:2 HD", w: 1200, h: 800 },
  { key: "guest_gallery", label: "Guest Gallery", dims: "800 × 600 px", ratio: "4:3 Photos", w: 800, h: 600 },
  { key: "blog", label: "Blog Images", dims: "800 × 500 px", ratio: "16:10", w: 800, h: 500 },
];

const QUICK_ENHANCERS = [
  "🌅 Golden Hour Sunrise",
  "🏔️ Snowy Mountains",
  "🛶 Serene Backwaters",
  "🛕 Ancient Heritage",
  "🌿 Tea Gardens",
  "🏖️ Tropical Beach",
  "🌆 Night Cityscape",
];

const POPULAR_DESTINATION_PROMPTS = [
  { label: "🏰 Agra Red Fort", prompt: "Agra Red Fort panoramic exterior wide angle view, massive red sandstone walls and Amar Singh gate, Indian heritage architecture, sunny day" },
  { label: "🕌 Taj Mahal", prompt: "Majestic Taj Mahal at sunrise with morning mist, reflection in water pool, golden morning sunlight" },
  { label: "🏰 Jaipur Hawa Mahal", prompt: "Jaipur Hawa Mahal Palace of Winds street view, pink sandstone architecture, sunny daylight" },
  { label: "🛶 Kerala Backwaters", prompt: "Kerala backwaters traditional wooden houseboat cruising calm palm-lined river, lush green nature" },
  { label: "🏔️ Himalayas Mountain", prompt: "Snow covered Himalayan mountain peaks, pine forest valley, crisp morning sunlight" },
  { label: "🛕 Varanasi Ganga Ghat", prompt: "Varanasi Ganga Ghat evening aarti ceremony with glowing oil lamps and boats on holy river" },
  { label: "🏖️ Goa Beach", prompt: "Goa tropical beach at sunset, golden waves on sand, coconut palm trees silhouette" },
  { label: "🏰 Udaipur Lake Palace", prompt: "Udaipur Lake Palace floating on calm blue Lake Pichola, Aravalli hills in background" },
];

export default function AiImageGeneratorModal({
  open,
  onClose,
  defaultCategory = "banner",
  onImageSaved,
  onBatchSaved,
}: AiImageGeneratorModalProps) {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>(defaultCategory);
  const [prompt, setPrompt] = useState("");
  const [imageName, setImageName] = useState("");

  const [generating, setGenerating] = useState(false);
  const [previewData, setPreviewData] = useState<{
    previewUrl: string;
    seed: number;
    width: number;
    height: number;
  } | null>(null);

  const [saving, setSaving] = useState(false);
  const [savedList, setSavedList] = useState<AiSavedImage[]>([]);

  if (!open) return null;

  const currentPreset =
    CATEGORY_PRESETS.find((p) => p.key === selectedCategoryKey) || CATEGORY_PRESETS[0];

  const handleAddEnhancer = (tag: string) => {
    const cleanTag = tag.replace(/^[^\w\s]+\s*/, "");
    setPrompt((prev) => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed}, ${cleanTag}` : cleanTag;
    });
  };

  // 1. Generate / Create Image (Preview mode)
  const handleGenerate = async (customSeed?: number) => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      errorToast("Please enter a prompt to generate an image");
      return;
    }

    if (!imageName.trim()) {
      // Auto-suggest name from prompt
      setImageName(trimmedPrompt.slice(0, 60));
    }

    setGenerating(true);
    try {
      const res = await apiClient.post("/media/ai-generate", {
        prompt: trimmedPrompt,
        category: currentPreset.key,
        width: currentPreset.w,
        height: currentPreset.h,
        seed: customSeed !== undefined ? customSeed : Math.floor(Math.random() * 999999),
        save: false, // preview first
      });

      if (res.data?.success && res.data.previewUrl) {
        setPreviewData({
          previewUrl: res.data.previewUrl,
          seed: res.data.seed,
          width: res.data.width,
          height: res.data.height,
        });
        successToast("AI image preview generated!");
      } else {
        errorToast(res.data?.message || "Failed to generate image");
      }
    } catch (err: any) {
      errorToast(err.response?.data?.message || "Failed to generate AI image");
    } finally {
      setGenerating(false);
    }
  };

  // 2. Regenerate (New variation with different random seed)
  const handleRegenerate = () => {
    const newSeed = Math.floor(Math.random() * 999999);
    handleGenerate(newSeed);
  };

  // 3. Save to Library / Final Submit
  const handleSaveToLibrary = async () => {
    if (!previewData) return;
    const trimmedName = imageName.trim() || prompt.trim().slice(0, 60);

    setSaving(true);
    try {
      const res = await apiClient.post("/media/ai-generate", {
        prompt: prompt.trim(),
        label: trimmedName,
        category: currentPreset.key,
        width: currentPreset.w,
        height: currentPreset.h,
        seed: previewData.seed,
        save: true, // save permanently to server disk & DB
      });

      if (res.data?.success && res.data.media) {
        const item: AiSavedImage = {
          id: res.data.media.id,
          url: res.data.url,
          filename: res.data.media.filename,
          label: res.data.media.label || trimmedName,
          category: currentPreset.key,
          width: currentPreset.w,
          height: currentPreset.h,
          fileSize: res.data.media.fileSize,
        };

        setSavedList((prev) => [...prev, item]);
        onImageSaved?.(item);
        successToast(`"${item.label}" saved to Media Library!`);

        // Reset preview for next image creation
        setPreviewData(null);
        setPrompt("");
        setImageName("");
      } else {
        errorToast(res.data?.message || "Failed to save image");
      }
    } catch (err: any) {
      errorToast(err.response?.data?.message || "Failed to save AI image");
    } finally {
      setSaving(false);
    }
  };

  const handleFinish = () => {
    if (savedList.length > 0) {
      onBatchSaved?.(savedList);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[240] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-150"
      onClick={() => {
        if (!generating && !saving) onClose();
      }}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50/70 via-indigo-50/60 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  AI Image & Banner Studio
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-700 uppercase tracking-wider">
                  FLUX AI Photoreal
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Generate high-resolution travel banners with exact dimensions using natural language prompts
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={generating || saving}
            className="p-2 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* 1. Category / Dimension Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              1. Select Banner / Card Type (Auto-configures Dimensions):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {CATEGORY_PRESETS.map((p) => {
                const isSelected = selectedCategoryKey === p.key;
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => {
                      setSelectedCategoryKey(p.key);
                      setPreviewData(null);
                    }}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-300"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-extrabold leading-tight">
                        {p.label}
                      </span>
                      <span
                        className={`block text-[10px] font-mono mt-0.5 ${
                          isSelected ? "text-purple-100" : "text-slate-500"
                        }`}
                      >
                        {p.dims}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-semibold mt-1 px-1.5 py-0.5 rounded-md self-start ${
                        isSelected ? "bg-white/20 text-white" : "bg-white text-slate-600 border border-slate-200"
                      }`}
                    >
                      {p.ratio}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Prompt & Name Input */}
          <div className="space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-purple-600" />
                  <span>2. Describe the Image (AI Prompt)</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  Target size: <strong className="text-slate-700 font-mono">{currentPreset.dims}</strong>
                </span>
              </div>
              <textarea
                rows={2}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Cinematic ultra-wide panoramic sunset view of Kashmir Dal Lake with deluxe wooden shikara boats and snow peaks in background"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-200 transition-all resize-none shadow-2xs"
              />
            </div>

            {/* 1-Click Popular Monument Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider mr-1">
                ⚡ 1-Click Presets:
              </span>
              {POPULAR_DESTINATION_PROMPTS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setPrompt(item.prompt);
                    if (!imageName) setImageName(item.label.replace(/^[^\w]+/, "").trim());
                  }}
                  className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200/90 text-[11px] font-semibold text-purple-800 transition-colors cursor-pointer shadow-2xs"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Quick Style Enhancer Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                Add Style:
              </span>
              {QUICK_ENHANCERS.map((enhancer) => (
                <button
                  key={enhancer}
                  type="button"
                  onClick={() => handleAddEnhancer(enhancer)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-[11px] text-slate-600 transition-colors cursor-pointer shadow-2xs"
                >
                  {enhancer}
                </button>
              ))}
            </div>

            {/* Image Name (Label) */}
            <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Image Title / Label (Required to save):
                </label>
                <input
                  type="text"
                  value={imageName}
                  onChange={(e) => setImageName(e.target.value)}
                  placeholder="e.g. Kashmir Dal Lake Sunset Banner"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-purple-600 shadow-2xs"
                />
              </div>

              <div className="self-end sm:self-center pt-2 sm:pt-4">
                <button
                  type="button"
                  disabled={generating || !prompt.trim()}
                  onClick={() => handleGenerate()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  {generating ? (
                    <RefreshCw size={14} className="animate-spin" />
                  ) : (
                    <Sparkles size={14} />
                  )}
                  <span>{generating ? "Generating AI Image..." : "Create / Generate"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3. Generated Image Preview Box */}
          {previewData ? (
            <div className="space-y-3 bg-white p-4 rounded-2xl border-2 border-purple-200 shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800 text-xs font-extrabold flex items-center gap-1.5">
                    <Check size={13} />
                    <span>Generated Result ({previewData.width} × {previewData.height} px)</span>
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                    Seed: #{previewData.seed}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={generating || saving}
                    onClick={handleRegenerate}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    title="Generate another variation with a new seed"
                  >
                    <RefreshCw size={13} className={generating ? "animate-spin" : ""} />
                    <span>Regenerate Variation</span>
                  </button>

                  <button
                    type="button"
                    disabled={saving || !imageName.trim()}
                    onClick={handleSaveToLibrary}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-40"
                  >
                    {saving ? <RefreshCw size={13} className="animate-spin" /> : <Check size={13} />}
                    <span>{saving ? "Saving..." : "Save to Media Library"}</span>
                  </button>
                </div>
              </div>

              {/* Exact Aspect Ratio Preview Frame */}
              <div className="w-full bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center p-2 border border-slate-200 shadow-inner max-h-[380px]">
                <img
                  src={previewData.previewUrl}
                  alt="Generated preview"
                  className="max-h-[360px] w-auto max-w-full object-contain rounded-xl shadow-lg"
                />
              </div>
            </div>
          ) : generating ? (
            <div className="p-12 rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/30 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center animate-pulse">
                <Sparkles size={24} className="animate-spin" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  Rendering Photorealistic Travel Photo...
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Generating pixel-perfect {currentPreset.dims} ({currentPreset.ratio}) composition using FLUX AI engine.
                </p>
              </div>
            </div>
          ) : null}

          {/* 4. Multiple Images Saved Tray ("khi khi multiple image create krna hogaa") */}
          {savedList.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <h4 className="text-xs font-bold text-slate-800">
                    Saved in this Session ({savedList.length} image{savedList.length > 1 ? "s" : ""})
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400">
                  Ready to use across website
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 pt-1">
                {savedList.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="relative rounded-xl border border-slate-200 bg-white overflow-hidden group shadow-2xs"
                  >
                    <div className="aspect-[21/9] w-full bg-slate-100 overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-1.5 text-[10px] font-bold text-slate-700 truncate">
                      {item.label}
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute top-1 right-1 p-1 rounded-md bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Open full image"
                    >
                      <ExternalLink size={10} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <p className="text-[11px] text-slate-500">
            {savedList.length > 0
              ? `✓ ${savedList.length} image(s) saved to server and database`
              : "Tip: You can generate multiple images one after another before closing."}
          </p>

          <button
            type="button"
            onClick={handleFinish}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            {savedList.length > 0 ? "Done / View Library" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
