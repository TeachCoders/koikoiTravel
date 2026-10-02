"use client";

import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import {
  useAllHeroBanners,
  useCreateHeroBanner,
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

export default function HeroBannersAdminPage() {
  const { data, isLoading } = useAllHeroBanners();
  const createMutation = useCreateHeroBanner();
  const deleteMutation = useDeleteHeroBanner();

  // Queries for dynamic dropdowns
  const { countries } = useGetCountries({ limit: 100 });
  const { states } = useGetStates({ limit: 300 });
  const { cities } = useGetCities({ limit: 1000 });
  const { travelExperiences } = useGetTravelExperiences({ limit: 100 });

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

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

  const openAddModal = () => {
    setFormCategory("Home");
    setSelectedEntityId(0);
    setSelectedSlug("");
    setTitle("");
    setSubtitle("");
    setAltText("");
    setDisplayOrder(0);
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCategoryChange = (cat: HeroBannerEntityType) => {
    setFormCategory(cat);
    setSelectedEntityId(0);
    setSelectedSlug("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a panoramic banner image file.");
      return;
    }

    if (
      ["Country", "State", "City", "TravelExperience"].includes(formCategory) &&
      !selectedEntityId &&
      !selectedSlug
    ) {
      toast.error(`Please select a specific ${formCategory}.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("image", selectedFile);
      fd.append("entityType", formCategory);
      fd.append("entityId", String(selectedEntityId || 0));
      if (selectedSlug) fd.append("pageSlug", selectedSlug);
      if (title.trim()) fd.append("title", title.trim());
      if (subtitle.trim()) fd.append("subtitle", subtitle.trim());
      if (altText.trim()) fd.append("altText", altText.trim());
      fd.append("displayOrder", String(displayOrder || 0));

      await createMutation.mutateAsync(fd);
      toast.success("Hero Full Banner uploaded successfully!");
      setIsModalOpen(false);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to upload banner");
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

        <Button
          onClick={openAddModal}
          className="bg-[#2E8B8B] hover:bg-[#267373] text-white flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold shadow-sm shadow-[#2E8B8B]/20"
        >
          <Plus size={18} />
          <span>Upload Full Banner</span>
        </Button>
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

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">ID #{banner.id}</span>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteConfirmId(banner.id)}
                    className="h-8 px-3 text-xs flex items-center gap-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-200"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </Button>
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

      {/* Upload Full Banner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#2E8B8B]/10 text-[#2E8B8B] flex items-center justify-center">
                  <Upload size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Upload Hero Full Banner</h2>
                  <p className="text-xs text-slate-500">Dedicated high-resolution panoramic banner</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-200/70 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
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

              {/* Banner Image Upload Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Panoramic Banner Image <span className="text-rose-500">*</span>
                </label>
                <div className="relative border-2 border-dashed border-slate-300 hover:border-[#2E8B8B] rounded-2xl p-4 transition-colors bg-slate-50/50 text-center">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#2E8B8B] mb-2 border border-slate-100">
                      <ImageIcon size={24} />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      {selectedFile ? selectedFile.name : "Click or drag banner image here"}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Recommended: <span className="font-semibold text-slate-600">1920 × 450 px</span> (Panoramic 21:9 or 16:6 aspect ratio). Auto-optimized to WebP.
                    </p>
                  </div>
                </div>

                {/* Live Preview */}
                {previewUrl && (
                  <div className="mt-3">
                    <p className="text-xs font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                      <Eye size={13} /> Live Panoramic Ratio Preview:
                    </p>
                    <div className="relative w-full h-36 bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-200">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
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
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
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
                  {isSubmitting ? "Uploading..." : "Save & Upload Banner"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
