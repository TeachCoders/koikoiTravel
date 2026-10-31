"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  Smartphone,
  Monitor,
  AlertCircle,
  X,
  Check,
  Eye,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import ImageCropUpload from "@/components/shared/ImageCropUpload";
import {
  useHeroBanners,
  useCreateHeroBanner,
  useUpdateHeroBanner,
  useDeleteHeroBanner,
} from "@/feature/heroBanner/api";
import type { HeroFullBanner } from "@/feature/heroBanner/type";

interface HeroBannerManagerSectionProps {
  entityType:
    | "Country"
    | "State"
    | "City"
    | "TravelExperience"
    | "TourPackages"
    | "Home"
    | "Destinations"
    | "Blog";
  entityId?: number;
  pageSlug?: string;
  entityTitle?: string;
  bannerTag?: string;
  bannerTitle?: string;
  onBannerTagChange?: (val: string) => void;
  onBannerTitleChange?: (val: string) => void;
}

export default function HeroBannerManagerSection({
  entityType,
  entityId,
  pageSlug,
  entityTitle,
  bannerTag,
  bannerTitle,
  onBannerTagChange,
  onBannerTitleChange,
}: HeroBannerManagerSectionProps) {
  const isExistingEntity = Boolean((entityId && entityId > 0) || pageSlug);

  const { data: bannersRes, isLoading } = useHeroBanners(entityType, {
    entityId: entityId && entityId > 0 ? entityId : undefined,
    slug: pageSlug,
    enabled: isExistingEntity,
  });

  const banners = bannersRes?.data || [];

  const createBanner = useCreateHeroBanner();
  const updateBanner = useUpdateHeroBanner();
  const deleteBanner = useDeleteHeroBanner();

  // Form Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<HeroFullBanner | null>(null);

  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [desktopPreview, setDesktopPreview] = useState<string | null>(null);

  const [mobileFile, setMobileFile] = useState<File | null>(null);
  const [mobilePreview, setMobilePreview] = useState<string | null>(null);
  const [removeMobileImage, setRemoveMobileImage] = useState(false);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [altText, setAltText] = useState("");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [bannerTab, setBannerTab] = useState<"desktop" | "mobile">("desktop");
  const [cardActiveTab, setCardActiveTab] = useState<Record<number, "desktop" | "mobile">>({});

  const resetForm = () => {
    setEditingBanner(null);
    setDesktopFile(null);
    setDesktopPreview(null);
    setMobileFile(null);
    setMobilePreview(null);
    setRemoveMobileImage(false);
    setTitle("");
    setSubtitle("");
    setAltText("");
    setDisplayOrder(banners.length + 1);
    setBannerTab("desktop");
    setIsEditorOpen(false);
  };

  const handleOpenAdd = () => {
    resetForm();
    setDisplayOrder(banners.length + 1);
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (banner: HeroFullBanner) => {
    setEditingBanner(banner);
    setDesktopFile(null);
    setDesktopPreview(banner.image);
    setMobileFile(null);
    setMobilePreview(banner.mobileImage || null);
    setRemoveMobileImage(false);
    setTitle(banner.title || "");
    setSubtitle(banner.subtitle || "");
    setAltText(banner.altText || "");
    setDisplayOrder(banner.displayOrder || 1);
    setIsEditorOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this hero banner?")) return;
    try {
      await deleteBanner.mutateAsync(id);
      toast.success("Hero banner deleted successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete banner");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingBanner && !desktopFile && !desktopPreview && !mobileFile && !mobilePreview) {
      toast.error("Please upload or select at least one banner image (Desktop or Mobile).");
      return;
    }

    try {
      // SMART CASE: If user uploaded ONLY a mobile image while adding a banner,
      // and there is already exactly 1 existing slide that doesn't have a mobile image,
      // automatically attach the mobile image to that slide!
      if (
        !editingBanner &&
        !desktopFile &&
        !desktopPreview &&
        (mobileFile || mobilePreview) &&
        banners.length === 1 &&
        !banners[0].mobileImage
      ) {
        const target = banners[0];
        const formData = new FormData();
        formData.append("entityType", entityType);
        formData.append("entityId", String(entityId || 0));
        if (pageSlug) formData.append("pageSlug", pageSlug.trim().toLowerCase());
        if (mobileFile) {
          formData.append("mobileImage", mobileFile);
        } else if (mobilePreview && !mobilePreview.startsWith("blob:")) {
          formData.append("mobileImage", mobilePreview);
        }
        if (title.trim()) formData.append("title", title.trim());
        if (subtitle.trim()) formData.append("subtitle", subtitle.trim());
        if (altText.trim()) formData.append("altText", altText.trim());

        await updateBanner.mutateAsync({ id: target.id, formData });
        toast.success("Mobile banner added to existing slide successfully!");
        resetForm();
        return;
      }

      const formData = new FormData();
      formData.append("entityType", entityType);
      formData.append("entityId", String(entityId || 0));
      if (pageSlug) formData.append("pageSlug", pageSlug.trim().toLowerCase());

      if (desktopFile) {
        formData.append("image", desktopFile);
      } else if (desktopPreview && !desktopPreview.startsWith("blob:")) {
        formData.append("image", desktopPreview);
      } else if (!editingBanner && (mobileFile || mobilePreview)) {
        // Fallback: If no desktop image, use mobile image as desktop fallback
        if (mobileFile) {
          formData.append("image", mobileFile);
        } else if (mobilePreview && !mobilePreview.startsWith("blob:")) {
          formData.append("image", mobilePreview);
        }
      }

      if (mobileFile) {
        formData.append("mobileImage", mobileFile);
      } else if (mobilePreview && !mobilePreview.startsWith("blob:")) {
        formData.append("mobileImage", mobilePreview);
      }

      if (removeMobileImage) {
        formData.append("removeMobileImage", "true");
      }

      formData.append("title", title.trim());
      formData.append("subtitle", subtitle.trim());
      formData.append("altText", altText.trim());
      formData.append("displayOrder", String(displayOrder || 1));

      if (editingBanner) {
        await updateBanner.mutateAsync({ id: editingBanner.id, formData });
        toast.success("Hero banner updated successfully!");
      } else {
        await createBanner.mutateAsync(formData);
        toast.success("Hero banner created successfully!");
      }

      resetForm();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save banner");
    }
  };

  const isSubmitting = createBanner.isPending || updateBanner.isPending;

  return (
    <div className="border border-slate-200 rounded-2xl shadow-sm bg-white p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-50 text-[#2E8B8B] flex items-center justify-center font-bold">
              <Layers size={18} />
            </span>
            <h3 className="text-base font-bold text-slate-800">
              Hero Full Banners (Desktop & Mobile)
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {banners.length} Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dedicated panoramic banners for{" "}
            <strong>{entityTitle || pageSlug || entityType}</strong>. Desktop (1920×600) and
            dedicated Mobile (750×500) without cropping issues.
          </p>
        </div>

        {isExistingEntity && !isEditorOpen && (
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#2E8B8B] hover:bg-[#267373] text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
          >
            <Plus size={15} />
            <span>Add Hero Banner</span>
          </button>
        )}
      </div>

      {/* Integrated Banner Eyebrow Tag & Title */}
      {(onBannerTagChange || onBannerTitleChange) && (
        <div className="bg-slate-50/90 rounded-xl p-4 border border-slate-200 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F8904D]" />
              Hero Banner Tag & Title (Eyebrow Badge)
            </span>
            <span className="text-[11px] text-slate-500">
              Banner pill badge & destination card eyebrow
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-0.5">
            {onBannerTagChange && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Banner Tag (Eyebrow Badge)
                </label>
                <input
                  type="text"
                  value={bannerTag ?? ""}
                  onChange={(e) => onBannerTagChange(e.target.value)}
                  placeholder="e.g. Wonder of the World • Agra • Delhi Express"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E8B8B]"
                />
              </div>
            )}

            {onBannerTitleChange && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Banner Title (Optional Heading)
                </label>
                <input
                  type="text"
                  value={bannerTitle ?? ""}
                  onChange={(e) => onBannerTitleChange(e.target.value)}
                  placeholder="e.g. Taj Mahal Tours"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E8B8B]"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {!isExistingEntity ? (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
          <AlertCircle size={16} className="text-amber-600 shrink-0" />
          <span>
            Please save the {entityType.toLowerCase()} first with a title and slug to enable
            dedicated hero banner uploads.
          </span>
        </div>
      ) : (
        <>
          {/* Active Banners Grid */}
          {isLoading ? (
            <div className="h-28 bg-slate-100 animate-pulse rounded-xl" />
          ) : banners.length === 0 && !isEditorOpen ? (
            <div className="py-8 px-4 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <Layers size={32} className="mx-auto text-slate-400 mb-2" />
              <p className="text-xs font-semibold text-slate-700">No Hero Full Banners Uploaded</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Upload a dedicated Desktop (1920×600) and Mobile (750×500) banner for this{" "}
                {entityType.toLowerCase()}.
              </p>
              <button
                type="button"
                onClick={handleOpenAdd}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2E8B8B] text-white text-xs font-bold rounded-lg shadow-xs hover:bg-[#267373]"
              >
                <Plus size={14} /> Add First Banner
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {banners.map((b) => {
                const activeTab = cardActiveTab[b.id] || "desktop";
                const activeSrc = activeTab === "mobile" ? b.mobileImage : b.image;
                const isMobileView = activeTab === "mobile";

                return (
                  <div
                    key={b.id}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    {/* Top Tab Bar: Desktop vs Mobile */}
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">
                      <div className="inline-flex rounded-lg p-0.5 bg-slate-200/80 text-[11px]">
                        <button
                          type="button"
                          onClick={() =>
                            setCardActiveTab((prev) => ({ ...prev, [b.id]: "desktop" }))
                          }
                          className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            activeTab === "desktop"
                              ? "bg-white text-slate-800 shadow-xs"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          <Monitor size={12} />
                          <span>Desktop</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setCardActiveTab((prev) => ({ ...prev, [b.id]: "mobile" }))
                          }
                          className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            activeTab === "mobile"
                              ? "bg-white text-slate-800 shadow-xs"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          <Smartphone size={12} />
                          <span>Mobile</span>
                          {b.mobileImage ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Mobile ready" />
                          ) : (
                            <span className="text-[9px] text-slate-400 font-normal">None</span>
                          )}
                        </button>
                      </div>

                      <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 text-[10px] font-extrabold rounded-md shadow-2xs">
                        #{b.displayOrder}
                      </span>
                    </div>

                    {/* Image Preview Container */}
                    <div className="relative w-full h-36 bg-slate-900 overflow-hidden flex items-center justify-center">
                      {activeSrc ? (
                        <>
                          <img
                            src={activeSrc}
                            alt={b.altText || b.title || "Banner"}
                            className={`w-full h-full ${
                              isMobileView ? "object-contain bg-slate-950" : "object-cover"
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

                          {/* Resolution Badge */}
                          <div className="absolute top-2 left-2 flex items-center gap-1 pointer-events-none">
                            <span className="px-2 py-0.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold rounded">
                              {isMobileView ? "750 × 500 px (3:2)" : "1920 × 600 px (Panoramic)"}
                            </span>
                          </div>

                          {/* Overlay Title */}
                          <div className="absolute bottom-2 left-2 right-2 text-white pointer-events-none">
                            {b.subtitle && (
                              <p className="text-[10px] font-bold uppercase text-[#F8904D] truncate">
                                {b.subtitle}
                              </p>
                            )}
                            <p className="text-xs font-extrabold truncate">
                              {b.title || "(No Overlay Title)"}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-3 text-center">
                          <Smartphone size={22} className="mb-1 text-slate-500" />
                          <p className="text-xs font-bold text-slate-300">No Mobile Image Uploaded</p>
                          <p className="text-[10px] text-slate-400 mb-2">Desktop image is automatically used as fallback.</p>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(b)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-lg shadow-2xs cursor-pointer transition-colors"
                          >
                            <Plus size={12} />
                            <span>+ Add Mobile Image</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Card Actions Footer */}
                    <div className="p-3 bg-white flex items-center justify-between border-t border-slate-100">
                      <span className="text-[11px] text-slate-500 font-medium truncate max-w-[160px]" title={activeSrc || ""}>
                        {activeSrc ? activeSrc.split("/").pop() : "No mobile image"}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(b)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-[#2E8B8B] hover:bg-teal-50 transition-colors cursor-pointer"
                          title="Edit Banner"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(b.id)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Banner"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Inline Banner Editor Form */}
          {isEditorOpen && (
            <div className="p-5 border-2 border-[#2E8B8B]/30 bg-slate-50/80 rounded-2xl space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[#2E8B8B] text-white flex items-center justify-center font-bold text-xs">
                    {editingBanner ? "✏️" : "➕"}
                  </span>
                  <h4 className="text-sm font-bold text-slate-800">
                    {editingBanner
                      ? `Edit Hero Banner (ID #${editingBanner.id})`
                      : `Add New Hero Banner for ${entityTitle || pageSlug || entityType}`}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-7 h-7 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Desktop & Mobile Banners Side-by-Side (2 Columns) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* 1. Desktop Panoramic Banner */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor size={15} className="text-[#2E8B8B]" />
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Desktop Banner (1920 × 600 px)
                      </label>
                      {desktopPreview ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-500" title="Desktop image selected" />
                      ) : null}
                    </div>
                    <span className="text-[10px] text-slate-400">Panoramic wide ratio</span>
                  </div>

                  <div className="flex-1">
                    <ImageCropUpload
                      key={`desktop-${editingBanner ? editingBanner.id : "new"}`}
                      onFileSelect={(file) => {
                        setDesktopFile(file);
                        if (desktopPreview && desktopPreview.startsWith("blob:")) {
                          URL.revokeObjectURL(desktopPreview);
                        }
                        setDesktopPreview(URL.createObjectURL(file));
                      }}
                      onClear={() => {
                        setDesktopFile(null);
                        if (desktopPreview && desktopPreview.startsWith("blob:")) {
                          URL.revokeObjectURL(desktopPreview);
                        }
                        setDesktopPreview(null);
                      }}
                      maxWidth={1920}
                      maxHeight={600}
                      aspectRatioPreset="hero"
                      label="Upload Desktop Banner (1920 × 600 px)"
                      initialImage={desktopPreview || undefined}
                    />
                  </div>
                </div>

                {/* 2. Mobile Dedicated Banner */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone size={15} className="text-indigo-600" />
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Mobile Banner (750 × 500 px)
                      </label>
                      <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-200">
                        Optional
                      </span>
                    </div>

                    {mobilePreview && (
                      <button
                        type="button"
                        onClick={() => {
                          setMobileFile(null);
                          if (mobilePreview && mobilePreview.startsWith("blob:")) {
                            URL.revokeObjectURL(mobilePreview);
                          }
                          setMobilePreview(null);
                          setRemoveMobileImage(true);
                        }}
                        className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-2 py-0.5 rounded hover:bg-rose-50 cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="flex-1">
                    <ImageCropUpload
                      key={`mobile-${editingBanner ? editingBanner.id : "new"}`}
                      onFileSelect={(file) => {
                        setMobileFile(file);
                        setRemoveMobileImage(false);
                        if (mobilePreview && mobilePreview.startsWith("blob:")) {
                          URL.revokeObjectURL(mobilePreview);
                        }
                        setMobilePreview(URL.createObjectURL(file));
                      }}
                      onClear={() => {
                        setMobileFile(null);
                        if (mobilePreview && mobilePreview.startsWith("blob:")) {
                          URL.revokeObjectURL(mobilePreview);
                        }
                        setMobilePreview(null);
                        setRemoveMobileImage(true);
                      }}
                      maxWidth={750}
                      maxHeight={500}
                      aspectRatioPreset="mobileHero"
                      label="Upload Mobile Banner (750 × 500 px)"
                      initialImage={mobilePreview || undefined}
                    />
                  </div>
                </div>
              </div>

              {/* Text Fields: Title, Subtitle, AltText, Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Custom Title Overlay
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Incredible India Tours"
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E8B8B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subtitle / Tag
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Land of Wonders"
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E8B8B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    SEO Alt Text
                  </label>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="e.g. Panoramic view of India"
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E8B8B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value) || 1)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E8B8B]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#2E8B8B] hover:bg-[#267373] text-white text-xs font-bold rounded-xl shadow-xs transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>{editingBanner ? "Update Banner" : "Save Hero Banner"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

