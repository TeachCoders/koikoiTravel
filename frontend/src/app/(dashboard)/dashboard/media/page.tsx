"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import {
  Search,
  Upload,
  Crop,
  Star,
  Trash2,
  Pencil,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Filter,
  Grid3X3,
  ExternalLink,
  Layers,
  ArrowUpDown,
  FileImage,
  ArrowLeftRight,
  AlertTriangle,
  CheckCircle2,
  X,
  Eye,
} from "lucide-react";
import apiClient from "@/lib/apiClient";
import { successToast, errorToast } from "@/components/shared/tost";
import MediaCropReplaceModal, { MediaCropItem } from "@/components/shared/MediaCropReplaceModal";
import EmptyState from "@/components/shared/EmptyState";

interface MediaItem {
  id: number;
  filename: string;
  url: string;
  folder: string | null;
  originalName?: string | null;
  label: string | null;
  altText: string | null;
  caption: string | null;
  category: string | null;
  isPinned: boolean;
  sortOrder: number;
  createdAt?: string;
}

export interface UsageItem {
  type: string;
  title: string;
  link: string;
}

interface CategoryFilter {
  key: string;
  label: string;
  dims: string;
  badge: string;
}

const CATEGORY_TABS: CategoryFilter[] = [
  { key: "all", label: "All Images", dims: "Library", badge: "Total" },
  { key: "destination", label: "Destination Cards", dims: "600 × 600 px", badge: "1:1 Square" },
  { key: "hero", label: "Hero Banners", dims: "1920 × 450 px", badge: "21:9 Ultra-wide" },
  { key: "tour", label: "Tour Cards", dims: "600 × 400 px", badge: "3:2 Landscape" },
  { key: "gallery", label: "Tour Gallery", dims: "1200 × 800 px", badge: "3:2 HD" },
  { key: "guest_gallery", label: "Guest Gallery", dims: "800 × 600 px", badge: "4:3 Photos" },
  { key: "blog", label: "Blog Images", dims: "800 × 500 px", badge: "16:10" },
];

export default function MediaManagerPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const [showUnusedOnly, setShowUnusedOnly] = useState(false);

  // Usage tracking map
  const [usageMap, setUsageMap] = useState<Record<string, UsageItem[]>>({});
  const [usageLoading, setUsageLoading] = useState(false);
  const [selectedUsageItem, setSelectedUsageItem] = useState<MediaItem | null>(null);

  // Swap Modal states
  const [swapSourceItem, setSwapSourceItem] = useState<MediaItem | null>(null);
  const [swapTargetItem, setSwapTargetItem] = useState<MediaItem | null>(null);
  const [swapSearch, setSwapSearch] = useState("");
  const [swapDeleteOld, setSwapDeleteOld] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  // Edit Label Inline
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editLabel, setEditLabel] = useState("");

  // Crop / Replace Modal
  const [cropTarget, setCropTarget] = useState<MediaCropItem | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);

  // Upload New Modal / State
  const uploadFileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/media");
      setItems(res.data?.data || []);
    } catch (err) {
      console.error("Failed to load media:", err);
      errorToast("Failed to load media library");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsage = async () => {
    setUsageLoading(true);
    try {
      const res = await apiClient.get("/media/usage-summary");
      if (res.data?.success) {
        setUsageMap(res.data.data || {});
      }
    } catch (err) {
      console.error("Failed to load media usage:", err);
    } finally {
      setUsageLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
    fetchUsage();
  }, []);

  // Total unused count
  const unusedCount = useMemo(() => {
    return items.filter((item) => !usageMap[item.url] || usageMap[item.url].length === 0).length;
  }, [items, usageMap]);

  // Filter items based on activeTab, search, pinned, and unused status
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (showPinnedOnly && !item.isPinned) return false;
      if (showUnusedOnly && (usageMap[item.url]?.length || 0) > 0) return false;

      const q = search.trim().toLowerCase();
      if (q) {
        const file = (item.filename || "").toLowerCase();
        const label = (item.label || "").toLowerCase();
        const alt = (item.altText || "").toLowerCase();
        if (!file.includes(q) && !label.includes(q) && !alt.includes(q)) return false;
      }

      if (activeTab === "all") return true;

      const fn = (item.filename || "").toLowerCase();
      const cat = (item.category || "").toLowerCase();

      if (activeTab === "destination") {
        return (
          cat === "destination" ||
          fn.includes("destination") ||
          fn.includes("holiday") ||
          fn.includes("state") ||
          fn.includes("city")
        );
      }
      if (activeTab === "hero") {
        return cat === "banner" || fn.includes("banner") || fn.includes("hero");
      }
      if (activeTab === "tour") {
        return (
          cat === "thumb" ||
          (fn.includes("thumb") && !fn.includes("banner")) ||
          fn.includes("tour") ||
          fn.includes("package")
        );
      }
      if (activeTab === "gallery") {
        if (cat === "guest_gallery" || (item.folder || "").includes("guest") || fn.includes("guest")) return false;
        return fn.includes("gallery") || fn.includes("itinerary") || fn.includes("day");
      }
      if (activeTab === "guest_gallery") {
        return cat === "guest_gallery" || (item.folder || "").includes("guest") || fn.includes("guest");
      }
      if (activeTab === "blog") {
        return cat === "blog" || fn.includes("blog") || fn.includes("news");
      }

      return true;
    });
  }, [items, activeTab, search, showPinnedOnly]);

  // Star / Pin Toggle
  const handleTogglePin = async (item: MediaItem) => {
    try {
      await apiClient.patch(`/media/${item.id}`, { isPinned: !item.isPinned });
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, isPinned: !i.isPinned } : i))
      );
    } catch {
      errorToast("Failed to update pin");
    }
  };

  // Save Label Edit
  const handleSaveLabel = async (item: MediaItem) => {
    const trimmed = editLabel.trim();
    if (!trimmed) return;
    try {
      await apiClient.patch(`/media/${item.id}`, { label: trimmed });
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, label: trimmed } : i))
      );
      setEditingId(null);
      successToast("Label updated");
    } catch {
      errorToast("Failed to update label");
    }
  };

  // Delete Item with Usage Warning
  const handleDelete = async (item: MediaItem) => {
    const usages = usageMap[item.url] || [];
    const warning =
      usages.length > 0
        ? `WARNING: This image is actively used in ${usages.length} place(s) (e.g. ${usages[0].type}: "${usages[0].title}")!\n\nDeleting it may cause broken images on the website.\n\nAre you sure you want to delete "${item.label || item.filename}"?`
        : `Delete "${item.label || item.filename}"?\n\nThis image is unused. The file will be removed from disk and database.`;

    if (!window.confirm(warning)) return;

    try {
      await apiClient.delete(`/media/${item.id}`);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      successToast("Image deleted");
      fetchUsage();
    } catch {
      errorToast("Failed to delete image");
    }
  };

  // Swap / Replace image everywhere
  const handleSwapSubmit = async () => {
    if (!swapSourceItem || !swapTargetItem) return;
    if (swapSourceItem.url === swapTargetItem.url) {
      errorToast("Both images are identical, please choose a different image");
      return;
    }

    setIsSwapping(true);
    try {
      const res = await apiClient.post("/media/swap", {
        oldUrl: swapSourceItem.url,
        newUrl: swapTargetItem.url,
        deleteOld: swapDeleteOld,
      });

      if (res.data?.success) {
        successToast("Image swapped successfully everywhere!");
        setSwapSourceItem(null);
        setSwapTargetItem(null);
        setSelectedUsageItem(null);
        fetchMedia();
        fetchUsage();
      } else {
        errorToast(res.data?.message || "Failed to swap image");
      }
    } catch (err: any) {
      errorToast(err.response?.data?.message || "Failed to swap image");
    } finally {
      setIsSwapping(false);
    }
  };

  // Copy Image URL to clipboard
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    successToast("Image URL copied to clipboard");
  };

  // Open Replace Modal
  const handleOpenReplace = (item: MediaItem) => {
    setCropTarget({
      id: item.id,
      filename: item.filename,
      url: item.url,
      folder: item.folder,
      label: item.label,
      category: item.category,
    });
    setCropModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4561A] mb-1">
            <Layers className="w-4 h-4" />
            Media Management & Asset Studio
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Centralized Media Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Replace, crop, and auto-optimize all images across the website with locked aspect ratios and lightweight WebP compression.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchMedia}
            className="p-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
            title="Refresh Library"
          >
            <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* ── Category Tabs with Exact Dimensions ── */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-xs overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#2E8B8B] text-white shadow-sm"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100/80 border border-slate-200/60"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-amber-100 text-[#D4561A]"
                  }`}
                >
                  {tab.dims}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Search Bar & Filter Strip ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by label, filename, or tour name..."
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2E8B8B] focus:ring-2 focus:ring-[#2E8B8B]/15 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            type="button"
            onClick={() => setShowPinnedOnly(!showPinnedOnly)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold border transition-all ${
              showPinnedOnly
                ? "bg-amber-500 border-amber-600 text-white shadow-xs"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Star size={14} className={showPinnedOnly ? "fill-white" : ""} />
            Starred Only
          </button>

          <button
            type="button"
            onClick={() => setShowUnusedOnly(!showUnusedOnly)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold border transition-all ${
              showUnusedOnly
                ? "bg-rose-500 border-rose-600 text-white shadow-xs"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
            title="Filter images that are not used in any page"
          >
            <span className={`w-2 h-2 rounded-full ${showUnusedOnly ? "bg-white" : "bg-slate-400"}`} />
            Unused Only ({unusedCount})
          </button>

          <span className="text-xs text-slate-400 font-mono px-2">
            {filteredItems.length} images shown
          </span>
        </div>
      </div>

      {/* ── Media Grid ── */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5 animate-pulse"
            >
              <div className="w-full aspect-square bg-slate-100 rounded-xl" />
              <div className="h-3 bg-slate-100 rounded w-3/4" />
              <div className="h-2.5 bg-slate-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <EmptyState
          title="No images found"
          description="Try adjusting your category filter or search keywords."
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {filteredItems.map((item) => {
            const isEditing = editingId === item.id;
            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Image Container with Actions Overlay */}
                <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.label || item.filename}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Usage Badge (Top Left) */}
                  {(() => {
                    const usages = usageMap[item.url] || [];
                    const isUsed = usages.length > 0;
                    return (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUsageItem(item);
                        }}
                        title={
                          isUsed
                            ? `Used in ${usages.length} place(s). Click to view usages.`
                            : "Not used on any page. Click to inspect & delete."
                        }
                        className={`absolute top-2 left-2 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md backdrop-blur-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer ${
                          isUsed
                            ? "bg-emerald-600/90 hover:bg-emerald-700 text-white"
                            : "bg-slate-800/85 hover:bg-slate-900 text-slate-200"
                        }`}
                      >
                        <Eye size={11} className="shrink-0" />
                        <span>{isUsed ? `${usages.length} Used` : "Unused"}</span>
                      </button>
                    );
                  })()}

                  {/* Star / Pin Button */}
                  <button
                    type="button"
                    onClick={() => handleTogglePin(item)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 backdrop-blur-xs text-slate-400 hover:text-amber-500 shadow-xs transition-colors z-10"
                  >
                    <Star
                      size={14}
                      className={item.isPinned ? "fill-amber-500 text-amber-500" : ""}
                    />
                  </button>

                  {/* Hover Action Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-around opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      type="button"
                      onClick={() => handleOpenReplace(item)}
                      title="Replace & Crop Image"
                      className="p-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow-xs transition-colors"
                    >
                      <Crop size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSwapSourceItem(item);
                        setSwapTargetItem(null);
                        setSwapSearch("");
                        setSwapDeleteOld(false);
                      }}
                      title="Swap / Replace with another photo everywhere"
                      className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
                    >
                      <ArrowLeftRight size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(item.url)}
                      title="Copy URL"
                      className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-800 shadow-xs transition-colors"
                    >
                      <Copy size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(item.id);
                        setEditLabel(item.label || item.filename);
                      }}
                      title="Rename Label"
                      className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-800 shadow-xs transition-colors"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      title="Delete Image"
                      className="p-1.5 rounded-lg bg-rose-500/90 hover:bg-rose-600 text-white shadow-xs transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-3 space-y-1.5">
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        className="w-full text-xs border border-slate-300 rounded px-1.5 py-1 focus:outline-none focus:border-[#2E8B8B]"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveLabel(item);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveLabel(item)}
                        className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="text-xs font-bold text-slate-800 truncate"
                      title={item.label || item.filename}
                    >
                      {item.label || item.filename}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono gap-1 pt-1 border-t border-slate-100">
                    <span className="truncate text-[10px] text-slate-400 font-mono flex-1" title={item.filename}>
                      {item.filename}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setSwapSourceItem(item);
                          setSwapTargetItem(null);
                          setSwapSearch("");
                          setSwapDeleteOld(false);
                        }}
                        title="Swap everywhere with another photo"
                        className="text-indigo-600 hover:text-indigo-800 hover:underline font-bold font-sans text-[11px]"
                      >
                        Swap
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => handleOpenReplace(item)}
                        className="text-[#D4561A] hover:underline font-bold font-sans text-[11px]"
                      >
                        Replace
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── 1. Image Usage Inspector Modal ("Where Used?") ── */}
      {selectedUsageItem && (
        <div
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedUsageItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                  <img
                    src={selectedUsageItem.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                    {selectedUsageItem.label || selectedUsageItem.filename}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate max-w-xs sm:max-w-md">
                    {selectedUsageItem.url}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUsageItem(null)}
                className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content List */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {(() => {
                const usages = usageMap[selectedUsageItem.url] || [];
                if (usages.length === 0) {
                  return (
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <CheckCircle2 size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-emerald-900 text-sm">
                          This image is not used anywhere (Unused)
                        </h4>
                        <p className="text-xs text-emerald-700 mt-1 max-w-md mx-auto">
                          This photo is not linked to any Tour Package, City, State, Banner, or Blog post. You can safely delete it without affecting any live pages.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const item = selectedUsageItem;
                          setSelectedUsageItem(null);
                          handleDelete(item);
                        }}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        Delete This Unused Image
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Active Usages ({usages.length} {usages.length === 1 ? "Place" : "Places"} Linked)
                      </span>
                      <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        Live on Website
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
                      {usages.map((u, i) => (
                        <div
                          key={i}
                          className="p-3.5 flex items-center justify-between gap-3 hover:bg-white transition-colors"
                        >
                          <div className="min-w-0">
                            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded mb-1">
                              {u.type}
                            </span>
                            <p className="text-xs font-semibold text-slate-800 truncate">
                              {u.title}
                            </p>
                          </div>
                          {u.link && (
                            <a
                              href={u.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white border border-indigo-200 rounded-xl hover:border-indigo-400 shadow-2xs transition-all shrink-0"
                            >
                              <span>View Live Page</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSelectedUsageItem(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              {(usageMap[selectedUsageItem.url]?.length || 0) > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const item = selectedUsageItem;
                    setSelectedUsageItem(null);
                    setSwapSourceItem(item);
                    setSwapTargetItem(null);
                    setSwapSearch("");
                    setSwapDeleteOld(false);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <ArrowLeftRight size={13} />
                  <span>Swap With Another Photo Everywhere</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── 2. Swap Image Modal ("Swap Everywhere") ── */}
      {swapSourceItem && (
        <div
          className="fixed inset-0 z-[210] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => {
            if (!isSwapping) setSwapSourceItem(null);
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2 text-slate-800">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <ArrowLeftRight size={16} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base leading-tight text-slate-900">
                    Swap / Replace Image Everywhere
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Replaces all occurrences across the entire website with zero broken links
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={isSwapping}
                onClick={() => setSwapSourceItem(null)}
                className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            {/* Comparison Box */}
            <div className="p-5 border-b border-slate-100 bg-white grid grid-cols-2 gap-4">
              {/* Old Photo (Source) */}
              <div className="p-3.5 rounded-2xl border-2 border-rose-200 bg-rose-50/30 flex flex-col items-center text-center">
                <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider mb-2">
                  Current Photo (To Replace)
                </span>
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 mb-2">
                  <img
                    src={swapSourceItem.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-bold text-slate-800 truncate max-w-full">
                  {swapSourceItem.label || swapSourceItem.filename}
                </p>
                <span className="text-[10px] text-slate-500 mt-1">
                  Used in {(usageMap[swapSourceItem.url] || []).length} {((usageMap[swapSourceItem.url] || []).length === 1) ? "place" : "places"}
                </span>
              </div>

              {/* New Photo (Target) */}
              <div
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${
                  swapTargetItem
                    ? "border-emerald-500 bg-emerald-50/40"
                    : "border-dashed border-slate-300 bg-slate-50"
                }`}
              >
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-2">
                  Replacement Photo (New)
                </span>
                {swapTargetItem ? (
                  <>
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-200 border border-emerald-400 mb-2">
                      <img
                        src={swapTargetItem.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs font-bold text-slate-800 truncate max-w-full">
                      {swapTargetItem.label || swapTargetItem.filename}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSwapTargetItem(null)}
                      className="text-[10px] font-semibold text-rose-600 hover:underline mt-1 cursor-pointer"
                    >
                      Change Selection
                    </button>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-2 text-slate-400">
                    <Sparkles size={24} className="mb-2 text-indigo-400" />
                    <p className="text-xs font-medium text-slate-600">
                      Select replacement photo below
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Click any photo from the library
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Selection Grid from Media Library */}
            <div className="p-5 overflow-y-auto space-y-3 flex-1 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Replacement Photo:
                </span>
                <div className="relative w-48 sm:w-60">
                  <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={swapSearch}
                    onChange={(e) => setSwapSearch(e.target.value)}
                    placeholder="Search replacement..."
                    className="w-full pl-7 pr-2.5 py-1 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-56 overflow-y-auto p-1">
                {items
                  .filter((i) => i.id !== swapSourceItem.id)
                  .filter((i) => {
                    if (!swapSearch.trim()) return true;
                    const q = swapSearch.toLowerCase();
                    return (
                      (i.label || "").toLowerCase().includes(q) ||
                      (i.filename || "").toLowerCase().includes(q)
                    );
                  })
                  .slice(0, 36)
                  .map((cand) => {
                    const isChosen = swapTargetItem?.id === cand.id;
                    return (
                      <button
                        key={cand.id}
                        type="button"
                        onClick={() => setSwapTargetItem(cand)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          isChosen
                            ? "border-emerald-600 ring-2 ring-emerald-500/30 scale-95"
                            : "border-slate-200 hover:border-indigo-400"
                        }`}
                      >
                        <img
                          src={cand.url}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {isChosen && (
                          <div className="absolute inset-0 bg-emerald-600/30 flex items-center justify-center">
                            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                              <Check size={12} strokeWidth={3} />
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Footer with Checkbox and Confirm Button */}
            <div className="p-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={swapDeleteOld}
                  onChange={(e) => setSwapDeleteOld(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span>Permanently delete old image from library after swapping</span>
              </label>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  disabled={isSwapping}
                  onClick={() => setSwapSourceItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!swapTargetItem || isSwapping}
                  onClick={handleSwapSubmit}
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  {isSwapping ? (
                    <RefreshCw size={13} className="animate-spin" />
                  ) : (
                    <ArrowLeftRight size={13} />
                  )}
                  <span>{isSwapping ? "Swapping Everywhere..." : "Confirm & Swap Everywhere"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Smart Crop & Replace Modal ── */}
      {cropTarget && (
        <MediaCropReplaceModal
          item={cropTarget}
          open={cropModalOpen}
          onClose={() => {
            setCropModalOpen(false);
            setCropTarget(null);
          }}
          onSuccess={fetchMedia}
          defaultPresetKey={
            activeTab === "destination"
              ? "destination"
              : activeTab === "hero"
              ? "hero"
              : activeTab === "tour"
              ? "tour_card"
              : activeTab === "gallery"
              ? "gallery"
              : activeTab === "guest_gallery"
              ? "guest_gallery"
              : activeTab === "blog"
              ? "blog"
              : undefined
          }
        />
      )}
    </div>
  );
}

