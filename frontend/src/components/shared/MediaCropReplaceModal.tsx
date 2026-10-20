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
  Search,
  Image as ImageIcon,
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

const POPULAR_DESTINATIONS = [
  "Agra Red Fort",
  "Taj Mahal",
  "Jaipur Hawa Mahal",
  "Kerala Backwaters",
  "Himalayas",
  "Varanasi Ganga Ghat",
  "Goa Beach",
  "Udaipur Lake Palace",
];

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
  const [mode, setMode] = useState<"stock" | "file" | "url">("stock");
  const [urlInput, setUrlInput] = useState("");
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState("");

  // Stock Photo Search State
  const [stockQuery, setStockQuery] = useState("");
  const [stockLoading, setStockLoading] = useState(false);
  const [stockResults, setStockResults] = useState<
    { title: string; url: string; thumbUrl: string; width: number; height: number }[]
  >([]);

  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<AspectRatioOption>(RATIO_PRESETS[0]);

  // Crop Canvas & State
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);

  const [saving, setSaving] = useState(false);
  const [compressedSize, setCompressedSize] = useState<string | null>(null);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

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

  const handleStockSearch = async (queryText?: string) => {
    const q = (queryText !== undefined ? queryText : stockQuery).trim();
    if (!q) return;
    setStockLoading(true);
    try {
      const res = await apiClient.get(`/media/stock-search?q=${encodeURIComponent(q)}&limit=16`);
      if (res.data?.success && Array.isArray(res.data.data)) {
        setStockResults(res.data.data);
      }
    } catch (e: any) {
      console.error("Stock search error:", e);
      errorToast("Failed to search travel photos");
    } finally {
      setStockLoading(false);
    }
  };

  const handleSelectStockPhoto = async (photoUrl: string) => {
    setUrlLoading(true);
    try {
      const res = await apiClient.get(`/proxy-image?url=${encodeURIComponent(photoUrl)}`, {
        responseType: "blob",
      });
      const blob = res.data;
      const objectUrl = URL.createObjectURL(blob);
      setRawImageSrc(objectUrl);
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setRotation(0);
      successToast("Authentic photo loaded! Drag to position in crop frame below.");
    } catch (err: any) {
      console.error("Error loading stock photo:", err);
      setRawImageSrc(photoUrl);
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setRotation(0);
    } finally {
      setUrlLoading(false);
    }
  };

  // Support Ctrl+V paste from clipboard (e.g. right-click "Copy Image" on any web page)
  useEffect(() => {
    if (!open) return;

    const handlePaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      // If typing in a regular text/url input, let standard text paste happen
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA") &&
        (target as HTMLInputElement).type !== "file" &&
        e.clipboardData?.getData("text/plain")
      ) {
        return;
      }

      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          const file = items[i].getAsFile();
          if (file) {
            e.preventDefault();
            const objectUrl = URL.createObjectURL(file);
            setRawImageSrc(objectUrl);
            setZoom(1);
            setPan({ x: 0, y: 0 });
            setRotation(0);
            setUrlError("");
            successToast("Photo pasted from clipboard! Auto-fitted to Full Width.");
            return;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [open]);

  // Reset when modal closes or item changes
  useEffect(() => {
    if (open && item) {
      const cleaned = (item.label || item.filename)
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]+/g, " ")
        .replace(/\b\d+\b/g, "")
        .replace(/\s+/g, " ")
        .trim();
      setStockQuery(cleaned || "");
      if (cleaned) {
        handleStockSearch(cleaned);
      }
    } else if (!open) {
      setRawImageSrc(null);
      setUrlInput("");
      setUrlError("");
      setStockQuery("");
      setStockResults([]);
      setStockLoading(false);
      setZoom(1);
      setRotation(0);
      setPan({ x: 0, y: 0 });
      setNaturalSize(null);
      setCompressedSize(null);
      setSaving(false);
      setMode("stock");
    }
  }, [open, item]);

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
      } catch (proxyErr) {
        console.warn("Proxy load failed:", proxyErr);
        // External host (e.g. Vecteezy / Cloudflare) blocked direct server download.
        // We do NOT load cross-origin unproxied because it taints canvas and blocks saving.
        setUrlError(
          "⚠️ This website blocks direct URL downloads. Quick 1-second fix: Right-Click the photo in your browser → 'Copy Image', then press Ctrl+V right here (or download and upload it)."
        );
        setUrlLoading(false);
        return;
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

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    };

    const handleWindowMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setZoom((prev) => {
      const next = Math.min(3, Math.max(0.2, prev + delta));
      return parseFloat(next.toFixed(2));
    });
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

    if (activePreset.ratio === 1 || activePreset.key === "destination") {
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
    } else if (activePreset.key === "guest_gallery") {
      targetW = 800;
      targetH = 600;
    } else {
      // Freeform: keep original aspect ratio within max 1200
      const naturalW = img.naturalWidth || 1200;
      const naturalH = img.naturalHeight || 800;
      const imgRatio = naturalW / naturalH;
      targetW = Math.min(naturalW, 1200);
      targetH = Math.round(targetW / imgRatio);
    }

    canvas.width = Math.round(targetW);
    canvas.height = Math.round(targetH);

    // Smooth scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Frame scale factor between preview DOM element and export canvas
    const frameEl = frameRef.current;
    const frameW = frameEl?.clientWidth || 600;
    const scaleFactor = targetW / frameW;

    const naturalW = img.naturalWidth || targetW;
    const naturalH = img.naturalHeight || targetH;
    const drawW = targetW * zoom;
    const drawH = (targetW * (naturalH / naturalW)) * zoom;

    const canvasCenterX = targetW / 2 + (pan.x * scaleFactor);
    const canvasCenterY = targetH / 2 + (pan.y * scaleFactor);

    ctx.clearRect(0, 0, targetW, targetH);
    ctx.save();
    ctx.translate(canvasCenterX, canvasCenterY);
    ctx.rotate((rotation * Math.PI) / 180);

    ctx.drawImage(
      img,
      -drawW / 2,
      -drawH / 2,
      drawW,
      drawH
    );
    ctx.restore();

    return new Promise((resolve, reject) => {
      try {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const kb = Math.round(blob.size / 1024);
              setCompressedSize(`${kb} KB`);
              resolve(blob);
            } else {
              reject(new Error("Canvas export failed: The image is protected by cross-origin restrictions. Please paste via Ctrl+V or upload the file."));
            }
          },
          "image/webp",
          0.82 // 82% quality WebP compression
        );
      } catch (err) {
        reject(err);
      }
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

          {/* 2. Choose Mode: Real Photos vs File Upload vs AI vs URL */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
            <button
              type="button"
              onClick={() => {
                setMode("stock");
                if (stockResults.length === 0 && stockQuery) {
                  handleStockSearch(stockQuery);
                }
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                mode === "stock"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs shadow-emerald-500/20"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
              }`}
            >
              <FileImage size={15} />
              <span>📸 Real HD Photos</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("file")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                mode === "file"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Upload size={15} />
              <span>Upload From Device</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("url")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                mode === "url"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <LinkIcon size={15} />
              <span>Paste URL</span>
            </button>
          </div>

          {/* Mode Inputs */}
          {mode === "stock" ? (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-slate-50 border border-emerald-200/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <ImageIcon size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      Authentic Real Monument & Travel Photos
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Real 4K/8K photography from verified archives — auto-crops to {activePreset.label} ({activePreset.dims})
                    </p>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={stockQuery}
                    onChange={(e) => setStockQuery(e.target.value)}
                    placeholder="Search monument or city (e.g. Agra Fort, Taj Mahal, Jaipur, Manali)..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleStockSearch();
                      }
                    }}
                    className="w-full bg-white border border-emerald-200 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleStockSearch()}
                  disabled={stockLoading || !stockQuery.trim()}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-sm flex items-center gap-1.5 disabled:opacity-50 shrink-0 cursor-pointer"
                >
                  {stockLoading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search size={15} />
                      <span>Search Photos</span>
                    </>
                  )}
                </button>
              </div>

              {/* 1-Click Monument Presets */}
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  ⚡ 1-Click Popular Places:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_DESTINATIONS.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        setStockQuery(name);
                        handleStockSearch(name);
                      }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200/90 shadow-2xs transition-all cursor-pointer hover:border-emerald-400"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Grid */}
              {stockLoading ? (
                <div className="py-10 flex flex-col items-center justify-center text-emerald-600 gap-2">
                  <Loader2 size={24} className="animate-spin" />
                  <span className="text-xs font-semibold">Searching real HD travel photography...</span>
                </div>
              ) : stockResults.length > 0 ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Found {stockResults.length} real photographs (Click to crop & apply):</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto p-1 border border-emerald-100 rounded-xl bg-white/60">
                    {stockResults.map((photo, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectStockPhoto(photo.url)}
                        className="group relative rounded-xl overflow-hidden border border-slate-200 hover:border-emerald-500 hover:ring-2 hover:ring-emerald-500/30 cursor-pointer transition-all bg-slate-100 aspect-video"
                      >
                        <img
                          src={photo.thumbUrl}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 text-white">
                          <p className="text-[10px] font-bold line-clamp-1 leading-tight">{photo.title}</p>
                          <span className="text-[9px] text-emerald-300 font-mono">
                            {photo.width} × {photo.height}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : stockQuery ? (
                <p className="text-xs text-slate-400 text-center py-4">
                  No photos found for "{stockQuery}". Try typing just the place name like "Agra Fort", "Taj Mahal", "Manali".
                </p>
              ) : null}
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
                <div className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                  <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{urlError}</p>
                    <p className="mt-1 text-[11px] text-amber-700">
                      💡 Simply right-click on the image in your other tab, click <strong>"Copy Image"</strong>, and press <strong>Ctrl+V</strong> in this modal!
                    </p>
                  </div>
                </div>
              )}
              <p className="text-[11.5px] text-slate-500 flex items-center gap-1.5 pt-1">
                <Sparkles size={13} className="text-teal-600 shrink-0" />
                <span>
                  Tip: You can also copy any photo from any website (Right-Click → <strong>"Copy Image"</strong>) and press <strong>Ctrl+V</strong> to paste!
                </span>
              </p>
            </div>
          )}

          {/* 3. Interactive Crop & Preview Area */}
          {rawImageSrc ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">
                    Crop & Position (Drag to pan image inside frame):
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
                    ↔ Full-Width Default
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setZoom(1);
                      setPan({ x: 0, y: 0 });
                      setRotation(0);
                    }}
                    className="flex items-center gap-1 text-slate-600 hover:text-slate-900 cursor-pointer font-medium"
                  >
                    <RotateCcw size={13} /> Reset
                  </button>
                </div>
              </div>

              {/* Viewport Frame with selected aspect ratio */}
              <div className="flex justify-center bg-slate-900 rounded-2xl p-4 overflow-hidden select-none">
                <div
                  ref={frameRef}
                  className="relative overflow-hidden bg-black/60 border-2 border-dashed border-teal-400/90 shadow-2xl cursor-grab active:cursor-grabbing flex items-center justify-center max-h-[360px]"
                  style={{
                    width: "100%",
                    maxWidth:
                      activePreset.ratio === 1
                        ? "320px"
                        : activePreset.key === "hero"
                        ? "100%"
                        : "500px",
                    aspectRatio:
                      activePreset.ratio === "free"
                        ? naturalSize
                          ? `${naturalSize.w} / ${naturalSize.h}`
                          : "auto"
                        : `${activePreset.ratio}`,
                  }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onWheel={handleWheel}
                >
                  <img
                    ref={imageRef}
                    src={rawImageSrc}
                    alt="Preview"
                    crossOrigin="anonymous"
                    draggable={false}
                    onLoad={(e) => {
                      const imgEl = e.currentTarget;
                      setNaturalSize({ w: imgEl.naturalWidth, h: imgEl.naturalHeight });
                    }}
                    className="select-none pointer-events-none shrink-0"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "none",
                      maxHeight: "none",
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                      transformOrigin: "center center",
                      transition: isDragging ? "none" : "transform 0.08s ease-out",
                    }}
                  />
                </div>
              </div>

              {/* Zoom & Rotation Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl text-xs border border-slate-200">
                <div className="flex items-center gap-2 flex-1 min-w-[220px]">
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.max(0.2, parseFloat((z - 0.05).toFixed(2))))}
                    className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <input
                    type="range"
                    min="0.2"
                    max="3"
                    step="0.02"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-1 accent-[#2E8B8B] cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.min(3, parseFloat((z + 0.05).toFixed(2))))}
                    className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <span className="font-mono text-slate-700 w-14 text-right font-bold">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setZoom(1);
                      setPan({ x: 0, y: 0 });
                    }}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      zoom === 1 && pan.x === 0 && pan.y === 0
                        ? "border-[#2E8B8B] bg-teal-50 text-[#2E8B8B] ring-1 ring-[#2E8B8B]/30"
                        : "border-slate-300 hover:bg-white text-slate-700 shadow-2xs"
                    }`}
                    title="Fit full width of image to frame (100% width)"
                  >
                    <Maximize2 size={13} className="text-[#2E8B8B]" />
                    <span>Full Width</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!imageRef.current) return;
                      const imgEl = imageRef.current;
                      const naturalW = imgEl.naturalWidth || 1;
                      const naturalH = imgEl.naturalHeight || 1;
                      const imgRatio = naturalW / naturalH;
                      const targetRatio =
                        typeof activePreset.ratio === "number"
                          ? activePreset.ratio
                          : naturalW / naturalH;
                      const coverZoom = Math.max(1, targetRatio / imgRatio);
                      setZoom(parseFloat(coverZoom.toFixed(2)));
                      setPan({ x: 0, y: 0 });
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 text-xs font-medium flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    title="Fill entire frame without empty space"
                  >
                    <Crop size={13} className="text-slate-500" />
                    <span>Fill Frame</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRotation((prev) => (prev + 90) % 360)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 text-xs font-medium flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
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
                  src={`${item.url}?v=${Date.now()}`}
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

