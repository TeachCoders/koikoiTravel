"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  X,
  Upload,
  Layers,
  Filter,
  AlertCircle,
  Eye,
  ExternalLink,
  Crop,
  Maximize2,
  Sliders,
  Link as LinkIcon,
  Loader2,
} from "lucide-react";
import apiClient from "@/lib/apiClient";
import ImageCropUpload from "@/components/shared/ImageCropUpload";
import {
  useAllHeroBanners,
  useCreateHeroBanner,
  useUpdateHeroBanner,
  useDeleteHeroBanner,
} from "@/feature/heroBanner/api";
import { useGetCountries } from "@/feature/country/api/useCountry";
import { useGetStates } from "@/feature/state/api/useState";
import { useGetCities } from "@/feature/city/api/useCity";
import { useGetTravelExperiences } from "@/feature/travelExperience/api/useTravelExperience";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/shared/EmptyState";
import { FallbackImage } from "@/components/shared/FallbackImage";
import toast from "react-hot-toast";
import type { HeroBannerEntityType, HeroFullBanner } from "@/feature/heroBanner/type";

const CATEGORIES: { label: string; value: HeroBannerEntityType }[] = [
  { label: "Home Page", value: "Home" },
  { label: "Country", value: "Country" },
  { label: "State", value: "State" },
  { label: "City", value: "City" },
  { label: "Travel Experience", value: "TravelExperience" },
  { label: "Destinations", value: "Destinations" },
];

export interface MultipleUploadItem {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: string;
}

export default function HeroBannersAdminPage() {
  const { data, isLoading } = useAllHeroBanners();
  const createMutation = useCreateHeroBanner();
  const updateMutation = useUpdateHeroBanner();
  const deleteMutation = useDeleteHeroBanner();

  // Queries for dynamic dropdowns
  const { countries } = useGetCountries({ limit: 100 });
  const { states } = useGetStates({ limit: 300 });
  const { cities } = useGetCities({ limit: 1000 });
  const { travelExperiences } = useGetTravelExperiences({ limit: 100 });

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Edit vs Add & Single vs Multiple
  const [editingBanner, setEditingBanner] = useState<HeroFullBanner | null>(null);
  const [uploadMode, setUploadMode] = useState<"single" | "multiple">("single");
  const [multipleFiles, setMultipleFiles] = useState<MultipleUploadItem[]>([]);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [formCategory, setFormCategory] = useState<HeroBannerEntityType>("Home");
  const [selectedEntityId, setSelectedEntityId] = useState<number>(0);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [altText, setAltText] = useState<string>("");
  const [displayOrder, setDisplayOrder] = useState<number>(0);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const allBanners: HeroFullBanner[] = data?.data || [];

  const filteredBanners = useMemo(() => {
    if (selectedCategoryFilter === "ALL") return allBanners;
    return allBanners.filter((b) => b.entityType === selectedCategoryFilter);
  }, [allBanners, selectedCategoryFilter]);

  const [multiUrlInput, setMultiUrlInput] = useState("");
  const [multiUrlLoading, setMultiUrlLoading] = useState(false);

  const clearMultipleFiles = () => {
    multipleFiles.forEach((item) => {
      if (item.preview && item.preview.startsWith("blob:")) {
        URL.revokeObjectURL(item.preview);
      }
    });
    setMultipleFiles([]);
    setMultiUrlInput("");
  };

  const handleAddUrlToMultiple = async () => {
    const trimmed = multiUrlInput.trim();
    if (!trimmed) return;
    setMultiUrlLoading(true);
    try {
      let file: File;
      if (trimmed.startsWith("blob:") || trimmed.startsWith("data:")) {
        const resp = await fetch(trimmed);
        const blob = await resp.blob();
        file = new File([blob], `banner-url-${Date.now()}.webp`, { type: blob.type || "image/webp" });
      } else {
        const res = await apiClient.get(`/proxy-image?url=${encodeURIComponent(trimmed)}`, { responseType: "blob" });
        const blob = res.data;
        file = new File([blob], `banner-url-${Date.now()}.webp`, { type: blob.type || "image/webp" });
      }
      handleMultipleFilesSelect([file]);
      setMultiUrlInput("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load image from URL. Try uploading the file directly.");
    } finally {
      setMultiUrlLoading(false);
    }
  };

  const handleMultipleFilesSelect = (fileList: FileList | File[]) => {
    const arr = Array.from(fileList);
    const valid = arr.filter((f) => f.type.startsWith("image/"));
    if (valid.length === 0) {
      toast.error("Please select valid image files (JPG, PNG, WebP).");
      return;
    }
    const newItems: MultipleUploadItem[] = valid.map((file) => {
      const sizeStr =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;
      return {
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: sizeStr,
      };
    });
    setMultipleFiles((prev) => [...prev, ...newItems]);
    toast.success(`Added ${newItems.length} image(s) to upload queue`);
  };

  const removeMultipleItem = (id: string) => {
    setMultipleFiles((prev) => {
      const item = prev.find((x) => x.id === id);
      if (item?.preview && item.preview.startsWith("blob:")) {
        URL.revokeObjectURL(item.preview);
      }
      return prev.filter((x) => x.id !== id);
    });
  };

  const openAddModal = (bannerToEdit?: HeroFullBanner) => {
    if (bannerToEdit) {
      setEditingBanner(bannerToEdit);
      setUploadMode("single");
      setFormCategory(bannerToEdit.entityType as HeroBannerEntityType);
      setSelectedEntityId(bannerToEdit.entityId || 0);
      setSelectedSlug(bannerToEdit.pageSlug || "");
      setTitle(bannerToEdit.title || "");
      setSubtitle(bannerToEdit.subtitle || "");
      setAltText(bannerToEdit.altText || "");
      setDisplayOrder(bannerToEdit.displayOrder || 0);
      setSelectedFile(null);
      setPreviewUrl(bannerToEdit.image || null);
    } else {
      setEditingBanner(null);
      setUploadMode("single");
      setFormCategory("Home");
      setSelectedEntityId(0);
      setSelectedSlug("");
      setTitle("");
      setSubtitle("");
      setAltText("");
      setDisplayOrder(0);
      setSelectedFile(null);
      if (previewUrl && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      clearMultipleFiles();
    }
    setIsModalOpen(true);
  };

  const handleCategoryChange = (cat: HeroBannerEntityType) => {
    setFormCategory(cat);
    setSelectedEntityId(0);
    setSelectedSlug("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      ["Country", "State", "City", "TravelExperience"].includes(formCategory) &&
      !selectedEntityId &&
      !selectedSlug
    ) {
      toast.error(`Please select a specific ${formCategory}.`);
      return;
    }

    if (uploadMode === "single") {
      if (!editingBanner && !selectedFile) {
        toast.error("Please select or crop a panoramic banner image.");
        return;
      }
    } else {
      if (multipleFiles.length === 0) {
        toast.error("Please select at least one image file for multiple upload.");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("entityType", formCategory);
      fd.append("entityId", String(selectedEntityId || 0));
      if (selectedSlug) fd.append("pageSlug", selectedSlug);
      if (title.trim()) fd.append("title", title.trim());
      if (subtitle.trim()) fd.append("subtitle", subtitle.trim());
      if (altText.trim()) fd.append("altText", altText.trim());
      fd.append("displayOrder", String(displayOrder || 0));

      if (editingBanner) {
        if (selectedFile) {
          fd.append("image", selectedFile);
        }
        await updateMutation.mutateAsync({ id: editingBanner.id, formData: fd });
        toast.success("Hero Banner updated successfully!");
      } else if (uploadMode === "multiple") {
        multipleFiles.forEach((item) => {
          fd.append("images", item.file);
        });
        await createMutation.mutateAsync(fd);
        toast.success(`${multipleFiles.length} hero banner(s) uploaded successfully!`);
      } else {
        if (selectedFile) fd.append("image", selectedFile);
        await createMutation.mutateAsync(fd);
        toast.success("Hero Full Banner uploaded successfully!");
      }

      setIsModalOpen(false);
      if (previewUrl && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
      setSelectedFile(null);
      setPreviewUrl(null);
      clearMultipleFiles();
      setEditingBanner(null);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save banner");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Hero Full Banner deleted successfully");
      setDeleteConfirmId(null);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete banner");
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E8B8B]/10 flex items-center justify-center text-[#2E8B8B]">
              <Layers size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Hero Full Banners</h1>
              <p className="text-sm text-slate-500">
                Manage dedicated high-resolution panoramic hero banners (1920×450) without affecting listing cards.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            type="button"
            onClick={() => {
              openAddModal();
              setUploadMode("multiple");
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold shadow-sm shadow-indigo-600/20"
          >
            <Layers size={18} />
            <span>Upload Multiple Images</span>
          </Button>

          <Button
            type="button"
            onClick={() => {
              openAddModal();
              setUploadMode("single");
            }}
            className="bg-[#2E8B8B] hover:bg-[#267373] text-white flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold shadow-sm shadow-[#2E8B8B]/20"
          >
            <Plus size={18} />
            <span>Single Banner (with Crop)</span>
          </Button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setSelectedCategoryFilter("ALL")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
            selectedCategoryFilter === "ALL"
              ? "bg-[#2E8B8B] text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          All Categories ({allBanners.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = allBanners.filter((b) => b.entityType === cat.value).length;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategoryFilter(cat.value)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategoryFilter === cat.value
                  ? "bg-[#2E8B8B] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Banners Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-2xl border border-slate-200" />
          ))}
        </div>
      ) : filteredBanners.length === 0 ? (
        <EmptyState
          title="No Hero Full Banners Found"
          description={
            selectedCategoryFilter === "ALL"
              ? "Click 'Upload Full Banner' to add panoramic banners for Home, Country, State, City, or Travel Experiences."
              : `No custom hero full banners uploaded for ${selectedCategoryFilter}. Fallback banners are currently in use.`
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBanners.map((banner) => (
            <div
              key={banner.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              {/* Panoramic Banner Preview (aspect ratio ~ 21:9) */}
              <div className="relative w-full h-44 bg-slate-900 overflow-hidden">
                <FallbackImage
                  src={banner.image}
                  alt={banner.altText || banner.title || "Hero banner"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Badges on top */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-lg border border-white/20">
                    {banner.entityType}
                  </span>
                  {banner.pageSlug && (
                    <span className="px-2.5 py-1 bg-[#2E8B8B]/90 backdrop-blur-md text-white text-xs font-semibold rounded-lg capitalize">
                      {banner.pageSlug}
                    </span>
                  )}
                </div>

                {/* Overlay Text Preview */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  {banner.subtitle && (
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#F8904D] truncate">
                      {banner.subtitle}
                    </p>
                  )}
                  <h3 className="text-base font-extrabold text-white truncate drop-shadow-sm">
                    {banner.title || "(No custom overlay title)"}
                  </h3>
                </div>
              </div>

              {/* Card Footer details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-600">Target:</span>
                    <span className="font-semibold text-slate-800">
                      {banner.pageSlug ? banner.pageSlug : banner.entityType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-600">Display Order:</span>
                    <span className="font-semibold text-slate-800">{banner.displayOrder}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-600">File URL:</span>
                    <a
                      href={banner.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2E8B8B] hover:underline flex items-center gap-1 font-mono truncate max-w-[180px]"
                    >
                      {banner.image.split("/").pop()}
                      <ExternalLink size={12} className="shrink-0" />
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400">ID #{banner.id}</span>

                  <div className="flex items-center gap-1.5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        openAddModal();
                        setUploadMode("multiple");
                        setFormCategory(banner.entityType as HeroBannerEntityType);
                        setSelectedEntityId(banner.entityId || 0);
                        setSelectedSlug(banner.pageSlug || "");
                        setDisplayOrder((banner.displayOrder || 0) + 1);
                      }}
                      className="h-8 px-2 text-xs flex items-center gap-1 border-indigo-200 text-indigo-700 bg-indigo-50/50 hover:bg-indigo-100"
                      title="Add more images to this page"
                    >
                      <Layers size={12} />
                      <span>+ Add Images</span>
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => openAddModal(banner)}
                      className="h-8 px-2.5 text-xs flex items-center gap-1 border-slate-200 text-slate-700 hover:bg-[#2E8B8B]/10 hover:text-[#2E8B8B]"
                      title="Re-crop or update this banner"
                    >
                      <Crop size={12} />
                      <span>Crop / Resize</span>
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteConfirmId(banner.id)}
                      className="h-8 px-2.5 text-xs flex items-center gap-1 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-200"
                    >
                      <Trash2 size={12} />
                      <span>Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                <AlertCircle size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Delete Hero Full Banner</h3>
                <p className="text-xs text-slate-500">This action will remove the banner image and restore fallback.</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Are you sure you want to delete this panoramic banner? Once deleted, you can upload a new one if you wish to update it.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(deleteConfirmId)}
                className="rounded-xl bg-rose-600 hover:bg-rose-700"
              >
                Yes, Delete Banner
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Upload/Edit Full Banner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 max-h-[92vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#2E8B8B]/10 text-[#2E8B8B] flex items-center justify-center">
                  <Upload size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {editingBanner
                      ? uploadMode === "single"
                        ? `Edit Hero Banner (ID #${editingBanner.id})`
                        : `Add Multiple Images to ${formCategory}`
                      : uploadMode === "single"
                      ? "Upload Hero Full Banner (Single)"
                      : "Batch Upload Multiple Banners"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Dedicated high-resolution panoramic banner (1920 × 450 px)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-200/70 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
              {/* Mode Switcher: Single vs Multiple - Always visible */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Choose Mode:
                </label>
                <div className="flex items-center p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setUploadMode("single")}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      uploadMode === "single"
                        ? "bg-white text-[#2E8B8B] shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Crop size={14} />
                    <span>{editingBanner ? "Edit Single Banner (Crop/Resize)" : "Single Banner (with Crop)"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadMode("multiple");
                      if (editingBanner) {
                        setEditingBanner(null);
                        setDisplayOrder((displayOrder || 0) + 1);
                      }
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      uploadMode === "multiple"
                        ? "bg-white text-indigo-700 shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Layers size={14} />
                    <span>Multiple Images (Batch Upload)</span>
                  </button>
                </div>
              </div>

              {/* Category Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Page Category <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      key={cat.value}
                      onClick={() => handleCategoryChange(cat.value)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-center border ${
                        formCategory === cat.value
                          ? "bg-[#2E8B8B] text-white border-[#2E8B8B] shadow-sm"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Entity Selection if not Home or Destinations */}
              {formCategory === "Country" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Select Country <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedSlug}
                    onChange={(e) => {
                      const item = countries.find((c: any) => c.slug === e.target.value);
                      if (item) {
                        setSelectedSlug(item.slug);
                        setSelectedEntityId(item.id);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]"
                  >
                    <option value="">-- Choose Country --</option>
                    {countries.map((c: any) => (
                      <option key={c.id} value={c.slug}>
                        {c.title} ({c.slug})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formCategory === "State" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Select State <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedSlug}
                    onChange={(e) => {
                      const item = states.find((s: any) => s.slug === e.target.value);
                      if (item) {
                        setSelectedSlug(item.slug);
                        setSelectedEntityId(item.id);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]"
                  >
                    <option value="">-- Choose State --</option>
                    {states.map((s: any) => (
                      <option key={s.id} value={s.slug}>
                        {s.title} ({s.slug})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formCategory === "City" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Select City / Destination <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedSlug}
                    onChange={(e) => {
                      const item = cities.find((c: any) => c.slug === e.target.value);
                      if (item) {
                        setSelectedSlug(item.slug);
                        setSelectedEntityId(item.id);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]"
                  >
                    <option value="">-- Choose City --</option>
                    {cities.map((c: any) => (
                      <option key={c.id} value={c.slug}>
                        {c.title} ({c.slug})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formCategory === "TravelExperience" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Select Travel Experience <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedSlug}
                    onChange={(e) => {
                      const item = travelExperiences.find((t: any) => t.slug === e.target.value);
                      if (item) {
                        setSelectedSlug(item.slug);
                        setSelectedEntityId(item.id);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]"
                  >
                    <option value="">-- Choose Travel Experience --</option>
                    {travelExperiences.map((t: any) => (
                      <option key={t.id} value={t.slug}>
                        {t.title} ({t.slug})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Upload Mode 1: Single Banner with Crop & Resize */}
              {uploadMode === "single" ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Panoramic Banner Image (1920 × 450 px){" "}
                    {editingBanner ? (
                      <span className="text-slate-400 font-normal">(Optional — leave unchanged to keep current image)</span>
                    ) : (
                      <span className="text-rose-500">*</span>
                    )}
                  </label>
                  <ImageCropUpload
                    onFileSelect={(file) => {
                      setSelectedFile(file);
                      if (previewUrl && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
                      setPreviewUrl(URL.createObjectURL(file));
                    }}
                    onClear={() => {
                      setSelectedFile(null);
                      if (previewUrl && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
                      setPreviewUrl(null);
                    }}
                    maxWidth={1920}
                    maxHeight={450}
                    aspectRatioPreset="hero"
                    label="Upload Panoramic Banner (1920 × 450 px) — Click to Crop & Resize"
                    initialImage={previewUrl || undefined}
                  />

                  {/* Live Preview with Text Overlays */}
                  {previewUrl && (
                    <div className="mt-3">
                      <p className="text-xs font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                        <Eye size={13} /> Live Panoramic Ratio (1920×450) Overlay Preview:
                      </p>
                      <div className="relative w-full h-36 bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-200">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          unoptimized={previewUrl.startsWith("blob:")}
                          className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-center p-4">
                          <div>
                            {subtitle && <p className="text-xs font-bold uppercase text-[#F8904D]">{subtitle}</p>}
                            <h4 className="text-lg font-black uppercase tracking-wide">
                              {title || "Sample Overlay Title"}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Upload Mode 2: Multiple Images Batch Upload */
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Select Multiple Banner Images <span className="text-rose-500">*</span>
                    </label>
                    {multipleFiles.length > 0 && (
                      <button
                        type="button"
                        onClick={clearMultipleFiles}
                        className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
                      >
                        Clear All ({multipleFiles.length})
                      </button>
                    )}
                  </div>

                  {/* Multi-file drag / click dropzone */}
                  <div
                    onClick={() => multiFileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#2E8B8B]/40 hover:border-[#2E8B8B] bg-[#2E8B8B]/5 hover:bg-[#2E8B8B]/10 rounded-2xl p-6 text-center cursor-pointer transition-colors"
                  >
                    <input
                      ref={multiFileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) handleMultipleFilesSelect(e.target.files);
                        e.target.value = "";
                      }}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#2E8B8B] mb-2 border border-[#2E8B8B]/20">
                        <Upload size={22} />
                      </div>
                      <p className="text-sm font-bold text-slate-800">
                        Click to select multiple images (or drag & drop)
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Select 2, 5, 10 or more images at once (PNG, JPG, WebP)
                      </p>
                    </div>
                  </div>

                  {/* Or Add via Image URL Bar */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                      <LinkIcon size={12} className="text-indigo-600" /> Or Add via Image URL
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={multiUrlInput}
                        onChange={(e) => setMultiUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddUrlToMultiple();
                          }
                        }}
                        placeholder="Paste image URL (https://... or blob:...)"
                        className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      />
                      <button
                        type="button"
                        onClick={handleAddUrlToMultiple}
                        disabled={multiUrlLoading || !multiUrlInput.trim()}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors shrink-0 shadow-2xs"
                      >
                        {multiUrlLoading ? <Loader2 size={13} className="animate-spin" /> : <LinkIcon size={13} />}
                        <span>{multiUrlLoading ? "Loading..." : "Add to Queue"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Multiple Files List */}
                  {multipleFiles.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-semibold">
                        <span>Selected ({multipleFiles.length} images ready):</span>
                        <span>Auto-orders starting at #{displayOrder}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                        {multipleFiles.map((item, idx) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200 relative group"
                          >
                            <div className="relative w-16 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                              <img
                                src={item.preview}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-0 right-0 bg-black/75 text-white text-[9px] font-bold px-1 rounded-tl">
                                #{displayOrder + idx}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-slate-800 truncate" title={item.name}>
                                {item.name}
                              </p>
                              <p className="text-[10px] text-slate-400">{item.size}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeMultipleItem(item.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors shrink-0"
                              title="Remove image"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Optional Text Overlays */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Custom Title Overlay (Optional)
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Royal Rajasthan Tours"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tag / Subtitle Overlay (Optional)
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Land of Kings & Forts"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    SEO Alt Text (Optional)
                  </label>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="e.g. Scenic panoramic view of Udaipur palace"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Display Order (Slider order)
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B8B]"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-[#2E8B8B] hover:bg-[#267373] text-white font-semibold px-6 shadow-sm"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingBanner
                    ? "Save Changes"
                    : uploadMode === "multiple"
                    ? `Upload All (${multipleFiles.length}) Banners`
                    : "Save & Upload Banner"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
