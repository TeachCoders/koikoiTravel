"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  X,
  Upload,
  Link as LinkIcon,
  Crop,
  Check,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  Loader2,
  AlertCircle,
  FileImage,
} from "lucide-react";
import apiClient from "@/lib/apiClient";
import { successToast, errorToast } from "@/components/shared/tost";

export interface MediaCropItem {
  id: number;
  filename: string;
  url: string;
  folder?: string | null;
  label?: string | null;
  category?: string | null;
}

interface AspectRatioOption {
  key: string;
  label: string;
  ratio: number | "free";
  dims: string;
  desc: string;
}

const RATIO_PRESETS: AspectRatioOption[] = [
  {
    key: "destination",
    label: "Destination Card",
    ratio: 1, // 1:1
    dims: "600 × 600 px",
    desc: "1:1 Square — Home Page Destinations & City Explorer Cards",
  },
  {
    key: "hero",
    label: "Hero Banner",
    ratio: 1920 / 450, // ~4.267
    dims: "1920 × 450 px",
    desc: "21:9 Ultra-Wide — Top Banners for Home, Experiences & Destinations",
  },
  {
    key: "tour_card",
    label: "Tour Card",
    ratio: 3 / 2, // 1.5
    dims: "600 × 400 px",
    desc: "3:2 Landscape — Tour Package Listing & Search Cards",
  },
  {
    key: "gallery",
    label: "Tour Gallery",
    ratio: 3 / 2, // 1.5
    dims: "1200 × 800 px",
    desc: "3:2 HD — Tour Detail Gallery & Itinerary Day Images",
  },
  {
    key: "blog",
    label: "Blog Image",
    ratio: 16 / 10, // 1.6
    dims: "800 × 500 px",
    desc: "16:10 — Blog Cards & Article Thumbnails",
  },
  {
    key: "guest_gallery",
    label: "Guest Gallery",
    ratio: 4 / 3, // ~1.333
    dims: "800 × 600 px",
    desc: "4:3 Standard — Guest Photo Gallery & Reviews",
  },
  {
    key: "free",
    label: "Freeform",
    ratio: "free",
    dims: "Original",
    desc: "Custom freeform crop without locked ratio",
  },
];

const QUICK_ENHANCERS = [
  "🌅 Golden Hour Sunrise",
  "🏔️ Snowy Mountains",
  "🛕 Ancient Heritage",
  "🛶 Serene Backwaters",
  "🌿 Lush Green Nature",
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

function getAiDimensions(preset: AspectRatioOption) {
  if (preset.key === "hero") return { w: 1920, h: 450, cat: "banner" };
  if (preset.key === "destination") return { w: 600, h: 600, cat: "destination" };
  if (preset.key === "tour_card") return { w: 600, h: 400, cat: "tour" };
  if (preset.key === "gallery") return { w: 1200, h: 800, cat: "gallery" };
  if (preset.key === "blog") return { w: 800, h: 500, cat: "blog" };
  if (preset.key === "guest_gallery") return { w: 800, h: 600, cat: "guest_gallery" };
  return { w: 1200, h: 800, cat: "tour" };
}

interface MediaCropReplaceModalProps {
  item: MediaCropItem | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultPresetKey?: string;
}

export default function MediaCropReplaceModal({
  item,
  open,
  onClose,
  onSuccess,
  defaultPresetKey,
}: MediaCropReplaceModalProps) {
  const [mode, setMode] = useState<"file" | "url" | "ai">("file");
  const [urlInput, setUrlInput] = useState("");
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState("");

  // AI Prompt State
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSeed, setAiSeed] = useState<number | null>(null);

  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<AspectRatioOption>(RATIO_PRESETS[0]);

  // Crop Canvas & State
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [saving, setSaving] = useState(false);
  const [compressedSize, setCompressedSize] = useState<string | null>(null);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-detect best preset from filename/category
  useEffect(() => {
    if (!item || !open) return;

    if (defaultPresetKey) {
      const found = RATIO_PRESETS.find((p) => p.key === defaultPresetKey);
      if (found) {
        setActivePreset(found);
        return;
      }
    }

    const name = (item.filename || "").toLowerCase();
    const cat = (item.category || "").toLowerCase();
    const folder = (item.folder || "").toLowerCase();

    if (cat === "guest_gallery" || folder.includes("guest") || name.includes("guest")) {
      const guestPreset = RATIO_PRESETS.find((p) => p.key === "guest_gallery");
      if (guestPreset) {
        setActivePreset(guestPreset);
        return;
      }
    }

    if (cat === "banner" || name.includes("banner") || name.includes("hero")) {
      setActivePreset(RATIO_PRESETS[1]); // Hero
    } else if (name.includes("holiday") || name.includes("destination") || name.includes("state") || name.includes("city")) {
      setActivePreset(RATIO_PRESETS[0]); // Destination 1:1
    } else if (cat === "thumb" || name.includes("thumb") || name.includes("package")) {
      setActivePreset(RATIO_PRESETS[2]); // Tour Card
    } else if (name.includes("blog")) {
      setActivePreset(RATIO_PRESETS[4]); // Blog
    } else {
      setActivePreset(RATIO_PRESETS[0]); // Default Destination
    }
  }, [item, open, defaultPresetKey]);

  // Reset when modal closes or item changes
  useEffect(() => {
    if (open && item) {
      const cleaned = (item.label || item.filename)
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]+/g, " ")
        .replace(/\b\d+\b/g, "")
        .replace(/\s+/g, " ")
        .trim();
      setAiPrompt(cleaned ? `${cleaned} scenic travel photography` : "");
      setAiSeed(null);
    } else if (!open) {
      setRawImageSrc(null);
      setUrlInput("");
      setUrlError("");
      setAiPrompt("");
      setAiSeed(null);
      setAiLoading(false);
      setZoom(1);
      setRotation(0);
      setPan({ x: 0, y: 0 });
      setCompressedSize(null);
      setSaving(false);
      setMode("file");
    }
  }, [open, item]);

  // Handle AI generation preview
  const handleGenerateAi = async (isRegenerate: boolean = false) => {
    if (!aiPrompt.trim()) {
      errorToast("Please enter a prompt to generate an image");
      return;
    }
    setAiLoading(true);
    try {
      const { w, h, cat } = getAiDimensions(activePreset);
      const seed = isRegenerate
        ? Math.floor(Math.random() * 999999)
        : (aiSeed ?? Math.floor(Math.random() * 999999));
      setAiSeed(seed);

      const res = await apiClient.post("/media/ai-generate", {
        prompt: aiPrompt.trim(),
        category: cat,
        width: w,
        height: h,
        seed,
        save: false,
      });

      if (res.data?.previewUrl) {
        setRawImageSrc(res.data.previewUrl);
        setZoom(1);
        setPan({ x: 0, y: 0 });
        setRotation(0);
        successToast(
          isRegenerate
            ? "New AI variation generated! Check preview below."
            : "AI Image generated! Adjust crop below or click 'Replace & Update Image'."
        );
      } else {
        errorToast("No preview received from AI generator");
      }
    } catch (err: any) {
      console.error("AI Generation error:", err);
      errorToast(err?.response?.data?.message || "Failed to generate AI image. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  // Handle local file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      errorToast("Please select a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setRawImageSrc(ev.target?.result as string);
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setRotation(0);
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle paste URL load
  const handleLoadUrl = async () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setUrlLoading(true);
    setUrlError("");
    try {
      if (trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
        setRawImageSrc(trimmed);
        setUrlLoading(false);
        setZoom(1);
        setPan({ x: 0, y: 0 });
        return;
      }
      // Try fetching via backend proxy
      try {
        const res = await apiClient.get(`/proxy-image?url=${encodeURIComponent(trimmed)}`, {
          responseType: "blob",
        });
        const blob = res.data;
        const objectUrl = URL.createObjectURL(blob);
        setRawImageSrc(objectUrl);
        setZoom(1);
        setPan({ x: 0, y: 0 });
        setUrlLoading(false);
        return;
      } catch {
        // Fallback: direct browser image load
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          setRawImageSrc(trimmed);
          setUrlLoading(false);
          setZoom(1);
          setPan({ x: 0, y: 0 });
        };
        img.onerror = () => {
          setUrlError("Unable to load image from URL. Cross-origin restrictions may apply.");
          setUrlLoading(false);
        };
        img.src = trimmed;
      }
    } catch (err: any) {
      setUrlError(err?.message || "Failed to load image from URL");
      setUrlLoading(false);
    }
  };

  // Dragging / Pan handlers for crop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Export cropped and WebP-compressed image blob
  const generateOptimizedBlob = useCallback(async (): Promise<Blob | null> => {
    if (!rawImageSrc || !imageRef.current) return null;

    const img = imageRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Target dimensions based on preset
    let targetW = 600;
    let targetH = 600;

    if (activePreset.ratio === 1) {
      targetW = 600;
      targetH = 600;
    } else if (activePreset.key === "hero") {
      targetW = 1920;
      targetH = 450;
    } else if (activePreset.key === "tour_card") {
      targetW = 600;
      targetH = 400;
    } else if (activePreset.key === "gallery") {
      targetW = 1200;
      targetH = 800;
    } else if (activePreset.key === "blog") {
      targetW = 800;
      targetH = 500;
    } else {
      // Freeform: keep original aspect ratio within max 1200
      const imgRatio = (img.naturalWidth || 1) / (img.naturalHeight || 1);
      targetW = Math.min(img.naturalWidth || 1200, 1200);
      targetH = Math.round(targetW / imgRatio);
    }

    canvas.width = targetW;
    canvas.height = targetH;

    // Smooth scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Clear and draw with pan/zoom/rotation
    ctx.save();
    ctx.translate(targetW / 2, targetH / 2);
    ctx.rotate((rotation * Math.PI) / 180);

    // Compute cover scale
    const scale = zoom * Math.max(targetW / img.naturalWidth, targetH / img.naturalHeight);
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;

    ctx.drawImage(
      img,
      -drawW / 2 + (pan.x * (targetW / 360)),
      -drawH / 2 + (pan.y * (targetH / 360)),
      drawW,
      drawH
    );
    ctx.restore();

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const kb = Math.round(blob.size / 1024);
            setCompressedSize(`${kb} KB`);
          }
          resolve(blob);
        },
        "image/webp",
        0.82 // 82% quality WebP compression
      );
    });
  }, [rawImageSrc, activePreset, zoom, pan, rotation]);

  // Execute Replace on Server
  const handleConfirmReplace = async () => {
    if (!item) return;
    setSaving(true);
    try {
      let finalBlob: Blob | null = null;

      if (rawImageSrc) {
        finalBlob = await generateOptimizedBlob();
      }

      if (!finalBlob) {
        errorToast("Please upload an image or paste a URL to replace");
        setSaving(false);
        return;
      }

      const folder = item.folder || "content";
      const filename = item.filename;

      const fd = new FormData();
      fd.append("path", `${folder}/${filename}`);
      fd.append("file", finalBlob, filename);

      await apiClient.post("/media/replace", fd);
      successToast(`"${filename}" successfully replaced & optimized!`);
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Replace failed:", err);
      errorToast(err?.response?.data?.message || "Failed to replace image on server");
    } finally {
      setSaving(false);
    }
  };

  if (!open || !item) return null;

  return (
    <div
      className="fixed inset-0 z-[250] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      onMouseDown={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F8904D] flex items-center justify-center shadow-xs">
              <Crop size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Replace & Optimize Image
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5 truncate max-w-md">
                Target: <span className="font-semibold text-slate-800">{item.filename}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* 1. Category Aspect Ratio Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Output Ratio & Size Preset:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {RATIO_PRESETS.map((preset) => {
                const isSelected = activePreset.key === preset.key;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => {
                      setActivePreset(preset);
                      setZoom(1);
                      setPan({ x: 0, y: 0 });
                    }}
                    className={`flex flex-col text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#2E8B8B] bg-teal-50/70 ring-2 ring-[#2E8B8B]/20 font-bold"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="font-semibold text-slate-900 truncate">
                      {preset.label}
                    </span>
                    <span className="text-[11px] text-[#D4561A] font-mono mt-0.5 font-bold">
                      {preset.dims}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11.5px] text-slate-500 mt-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F8904D]" />
              {activePreset.desc}
            </p>
          </div>

          {/* 2. Choose Mode: File Upload vs Paste URL vs Generate with AI */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
            <button
              type="button"
              onClick={() => setMode("file")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                mode === "file"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Upload size={15} />
              Upload From Device
            </button>
            <button
              type="button"
              onClick={() => setMode("url")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                mode === "url"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <LinkIcon size={15} />
              Paste Image URL
            </button>
            <button
              type="button"
              onClick={() => setMode("ai")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                mode === "ai"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs shadow-purple-500/20"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200"
              }`}
            >
              <Sparkles size={15} />
              Generate with AI
            </button>
          </div>

          {/* Mode Inputs */}
          {mode === "ai" ? (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-slate-50 border border-purple-200/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-xs">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      AI Image Generator
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Auto-sized to {activePreset.label} ({activePreset.dims})
                    </p>
                  </div>
                </div>

                {rawImageSrc && (
                  <button
                    type="button"
                    onClick={() => handleGenerateAi(true)}
                    disabled={aiLoading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    <RotateCcw size={13} className={aiLoading ? "animate-spin" : ""} />
                    <span>Regenerate Variation</span>
                  </button>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Prompt (Describe what you want to generate):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g. Majestic Taj Mahal at sunrise with morning mist, reflection pool"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleGenerateAi(false);
                      }
                    }}
                    className="flex-1 bg-white border border-purple-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleGenerateAi(false)}
                    disabled={aiLoading || !aiPrompt.trim()}
                    className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-sm flex items-center gap-1.5 disabled:opacity-50 shrink-0 cursor-pointer"
                  >
                    {aiLoading ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={15} />
                        <span>Generate</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 1-Click Monument Presets */}
              <div>
                <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block mb-1">
                  ⚡ 1-Click Popular Monument Presets (Click to autofill prompt):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_DESTINATION_PROMPTS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setAiPrompt(item.prompt)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white hover:bg-purple-50 text-purple-800 border border-purple-200/90 shadow-2xs transition-all cursor-pointer hover:border-purple-400"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Prompt Enhancers */}
              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Quick Travel Tags:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_ENHANCERS.map((enhancer) => (
                    <button
                      key={enhancer}
                      type="button"
                      onClick={() => {
                        const tag = enhancer.split(" ").slice(1).join(" ");
                        if (!aiPrompt.toLowerCase().includes(tag.toLowerCase())) {
                          setAiPrompt((prev) => (prev ? `${prev}, ${tag}` : tag));
                        }
                      }}
                      className="px-2 py-0.5 rounded-md text-[11px] bg-white hover:bg-purple-100 text-slate-700 hover:text-purple-800 border border-purple-200/60 transition-colors cursor-pointer"
                    >
                      {enhancer}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : mode === "file" ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="crop-file-input"
              />
              <label
                htmlFor="crop-file-input"
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-[#2E8B8B] rounded-2xl bg-slate-50/50 hover:bg-teal-50/20 cursor-pointer transition-all"
              >
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-sm font-bold text-slate-800">
                  Click to select new image
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Supports JPG, PNG, WebP (will be auto-optimized)
                </span>
              </label>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleLoadUrl();
                    }
                  }}
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#2E8B8B] focus:ring-2 focus:ring-[#2E8B8B]/15"
                />
                <button
                  type="button"
                  onClick={handleLoadUrl}
                  disabled={urlLoading || !urlInput.trim()}
                  className="btn-primary px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-1.5 disabled:opacity-50"
                >
                  {urlLoading ? <Loader2 size={16} className="animate-spin" /> : "Load URL"}
                </button>
              </div>
              {urlError && (
                <p className="text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {urlError}
                </p>
              )}
            </div>
          )}

          {/* 3. Interactive Crop & Preview Area */}
          {rawImageSrc ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">
                  Crop & Position (Drag to pan image inside frame):
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setZoom(1);
                      setPan({ x: 0, y: 0 });
                      setRotation(0);
                    }}
                    className="flex items-center gap-1 text-slate-600 hover:text-slate-900"
                  >
                    <RotateCcw size={13} /> Reset
                  </button>
                </div>
              </div>

              {/* Viewport Frame with selected aspect ratio */}
              <div className="flex justify-center bg-slate-900 rounded-2xl p-4 overflow-hidden select-none">
                <div
                  className="relative overflow-hidden bg-black/40 border-2 border-dashed border-teal-400/80 shadow-2xl cursor-grab active:cursor-grabbing flex items-center justify-center max-h-[360px]"
                  style={{
                    width: activePreset.ratio === "free" ? "100%" : "100%",
                    maxWidth: activePreset.ratio === 1 ? "300px" : activePreset.key === "hero" ? "100%" : "480px",
                    aspectRatio:
                      activePreset.ratio === "free"
                        ? "auto"
                        : `${activePreset.ratio}`,
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <img
                    ref={imageRef}
                    src={rawImageSrc}
                    alt="Preview"
                    crossOrigin="anonymous"
                    draggable={false}
                    className="max-w-none transition-transform pointer-events-none"
                    style={{
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                    }}
                  />
                </div>
              </div>

              {/* Zoom & Rotation Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl text-xs">
                <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                  <ZoomOut size={16} className="text-slate-400" />
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-1 accent-[#2E8B8B]"
                  />
                  <ZoomIn size={16} className="text-slate-400" />
                  <span className="font-mono text-slate-700 w-10 text-right">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRotation((prev) => (prev + 90) % 360)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 font-medium"
                  >
                    ↻ Rotate 90°
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Current Image Preview Before Selecting New */
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                <img
                  src={item.url}
                  alt={item.label || item.filename}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Current Image On Site:
                </span>
                <h4 className="text-sm font-bold text-slate-800 mt-0.5">
                  {item.label || item.filename}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Upload a new photo or paste an image URL above to replace this file everywhere.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/80">
          <div className="text-xs text-slate-500">
            {compressedSize && (
              <span className="font-medium text-emerald-600 flex items-center gap-1">
                <Sparkles size={14} /> Auto-optimized WebP: ~{compressedSize}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirmReplace}
              disabled={saving || !rawImageSrc}
              className="btn-primary px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Replacing & Optimizing…
                </>
              ) : (
                <>
                  <Check size={16} />
                  Replace & Update Image
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

