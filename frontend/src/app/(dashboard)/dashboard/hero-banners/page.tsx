"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Sparkles,
  Monitor,
  Smartphone,
  Search,
  LayoutGrid,
  Check,
  ChevronRight,
  MapPin,
  Globe,
  Home,
  Compass,
  FileText,
  Calendar,
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
import { useGetBlogPosts } from "@/feature/blog/api/useBlogPost";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/shared/EmptyState";
import { FallbackImage } from "@/components/shared/FallbackImage";
import ShadcnSelect from "@/components/shared/ShadcnSelect";
import toast from "react-hot-toast";
import type { HeroBannerEntityType, HeroFullBanner } from "@/feature/heroBanner/type";

const NAV_TABS = [
  { label: "Home Page", value: "Home" },
  { label: "State & Circuit", value: "State" },
  { label: "Tour Packages", value: "TourPackages" },
  { label: "Country", value: "Country" },
  { label: "City", value: "City" },
  { label: "Travel Experience", value: "TravelExperience" },
  { label: "Blog", value: "Blog" },
  { label: "All Pages", value: "ALL" },
];

const CATEGORIES: { label: string; value: HeroBannerEntityType; icon: any }[] = [
  { label: "Home Page", value: "Home", icon: Home },
  { label: "Tour Packages", value: "TourPackages", icon: Compass },
  { label: "Country", value: "Country", icon: Globe },
  { label: "State", value: "State", icon: MapPin },
  { label: "City", value: "City", icon: MapPin },
  { label: "Travel Experience", value: "TravelExperience", icon: Sparkles },
  { label: "Destinations", value: "Destinations", icon: Compass },
  { label: "Blog", value: "Blog", icon: FileText },
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

  // Queries for dynamic dropdowns & labels
  const { countries } = useGetCountries({ limit: 100 });
  const { states } = useGetStates({ limit: 300 });
  const { cities } = useGetCities({ limit: 1000 });
  const { travelExperiences } = useGetTravelExperiences({ limit: 100 });
  const { blogPosts } = useGetBlogPosts({ limit: 500 });

  // Filters & Views
  const [viewMode, setViewMode] = useState<"pages" | "grid">("pages");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("Home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [editorBannerTab, setEditorBannerTab] = useState<"desktop" | "mobile">("desktop");
  const [showDestinationChange, setShowDestinationChange] = useState<boolean>(false);

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

  // Single banner image states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedMobileFile, setSelectedMobileFile] = useState<File | null>(null);
  const [mobilePreviewUrl, setMobilePreviewUrl] = useState<string | null>(null);
  const [removeMobileImage, setRemoveMobileImage] = useState<boolean>(false);
  const [libraryPickerTarget, setLibraryPickerTarget] = useState<"desktop" | "mobile" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // URL input for batch upload
  const [multiUrlInput, setMultiUrlInput] = useState("");
  const [multiUrlLoading, setMultiUrlLoading] = useState(false);

  const allBanners: HeroFullBanner[] = data?.data || [];

  // Existing unique images for the media library picker
  const libraryImages = useMemo(() => {
    const urls = new Set<string>();
    allBanners.forEach((b) => {
      if (b.image) urls.add(b.image);
      if (b.mobileImage) urls.add(b.mobileImage);
    });
    return Array.from(urls);
  }, [allBanners]);

  // Group all banners by page
  const groupedPages = useMemo(() => {
    const map = new Map<
      string,
      {
        key: string;
        title: string;
        subtitle: string;
        liveUrl?: string;
        entityType: HeroBannerEntityType;
        entityId: number;
        slug: string;
        banners: HeroFullBanner[];
      }
    >();

    allBanners.forEach((b) => {
      const slugKey = (b.pageSlug || "").toLowerCase();
      const key = `${b.entityType}:${slugKey || b.entityId || "default"}`;

      if (!map.has(key)) {
        let title = b.entityType;
        let subtitle = b.pageSlug || "";
        let liveUrl = "";

        if (b.entityType === "Home") {
          title = "Home Page";
          subtitle = "Main Landing Page";
          liveUrl = "/";
        } else if (b.entityType === "TourPackages") {
          title = "Tour Packages";
          subtitle = "All Tour Packages Listing";
          liveUrl = "/tour-packages";
        } else if (b.entityType === "Country") {
          const match = countries.find((c: any) => c.slug === b.pageSlug || c.id === b.entityId);
          title = match ? match.title : `Country: ${b.pageSlug || b.entityId}`;
          subtitle = `Country Page (${b.pageSlug})`;
          liveUrl = `/tour-packages/${b.pageSlug || ""}`;
        } else if (b.entityType === "State") {
          const match = states.find((s: any) => s.slug === b.pageSlug || s.id === b.entityId);
          title = match ? match.title : `State / Circuit: ${b.pageSlug || b.entityId}`;
          subtitle = `State & Iconic Circuit (${b.pageSlug})`;
          liveUrl = `/tour-packages/india/${b.pageSlug || ""}`;
        } else if (b.entityType === "City") {
          const match = cities.find((c: any) => c.slug === b.pageSlug || c.id === b.entityId);
          title = match ? match.title : `City: ${b.pageSlug || b.entityId}`;
          subtitle = `City Destination (${b.pageSlug})`;
          liveUrl = match?.state?.slug
            ? `/tour-packages/india/${match.state.slug}/${b.pageSlug}`
            : `/tour-packages/india/${b.pageSlug}`;
        } else if (b.entityType === "TravelExperience") {
          const match = travelExperiences.find((t: any) => t.slug === b.pageSlug || t.id === b.entityId);
          title = match ? match.title : `Travel Experience: ${b.pageSlug || b.entityId}`;
          subtitle = `Experience Page (${b.pageSlug})`;
          liveUrl = `/travel-experience/${b.pageSlug || ""}`;
        } else if (b.entityType === "Blog") {
          title = b.pageSlug === "blog" ? "Main Blog Page" : `Blog: ${b.pageSlug}`;
          subtitle = `/blog/${b.pageSlug}`;
          liveUrl = `/blog/${b.pageSlug || ""}`;
        }

        map.set(key, {
          key,
          title,
          subtitle,
          liveUrl,
          entityType: b.entityType as HeroBannerEntityType,
          entityId: b.entityId || 0,
          slug: b.pageSlug || "",
          banners: [],
        });
      }

      map.get(key)!.banners.push(b);
    });

    const list = Array.from(map.values());
    list.forEach((p) => {
      p.banners.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    });

    return list;
  }, [allBanners, countries, states, cities, travelExperiences]);

  // Filtered pages based on category tab & search query
  const filteredPages = useMemo(() => {
    return groupedPages.filter((p) => {
      if (selectedCategoryFilter !== "ALL" && p.entityType !== selectedCategoryFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchSlug = p.slug.toLowerCase().includes(q);
        const matchSubtitle = p.subtitle.toLowerCase().includes(q);
        const matchBanner = p.banners.some(
          (b) => (b.title && b.title.toLowerCase().includes(q)) || (b.subtitle && b.subtitle.toLowerCase().includes(q))
        );
        return matchTitle || matchSlug || matchSubtitle || matchBanner;
      }
      return true;
    });
  }, [groupedPages, selectedCategoryFilter, searchQuery]);

  // Filtered individual banners for "grid" view
  const filteredBanners = useMemo(() => {
    return allBanners.filter((b) => {
      if (selectedCategoryFilter !== "ALL" && b.entityType !== selectedCategoryFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchSlug = (b.pageSlug || "").toLowerCase().includes(q);
        const matchTitle = (b.title || "").toLowerCase().includes(q);
        const matchSub = (b.subtitle || "").toLowerCase().includes(q);
        const matchEntity = b.entityType.toLowerCase().includes(q);
        return matchSlug || matchTitle || matchSub || matchEntity;
      }
      return true;
    });
  }, [allBanners, selectedCategoryFilter, searchQuery]);

  // Active banners on the currently selected category / page
  const categoryActiveBanners = useMemo(() => {
    return allBanners.filter((b) => {
      if (b.entityType !== formCategory) return false;
      if (selectedSlug) {
        return (b.pageSlug || "").toLowerCase() === selectedSlug.toLowerCase();
      }
      if (selectedEntityId) {
        return b.entityId === selectedEntityId;
      }
      return true;
    });
  }, [allBanners, formCategory, selectedSlug, selectedEntityId]);

  // Target page display name for modal
  const targetPageDisplayName = useMemo(() => {
    if (formCategory === "Home") return "Home Page (/)";
    if (formCategory === "TourPackages") return "Tour Packages (/tour-packages)";
    if (formCategory === "Country") {
      const match = countries.find((c: any) => c.slug === selectedSlug || c.id === selectedEntityId);
      return match ? `${match.title} (/tour-packages/${match.slug})` : `Country (${selectedSlug || "None"})`;
    }
    if (formCategory === "State") {
      const match = states.find((s: any) => s.slug === selectedSlug || s.id === selectedEntityId);
      return match ? `${match.title} (/tour-packages/india/${match.slug})` : `State (${selectedSlug || "None"})`;
    }
    if (formCategory === "City") {
      const match = cities.find((c: any) => c.slug === selectedSlug || c.id === selectedEntityId);
      return match ? `${match.title} (City)` : `City (${selectedSlug || "None"})`;
    }
    if (formCategory === "TravelExperience") {
      const match = travelExperiences.find((t: any) => t.slug === selectedSlug || t.id === selectedEntityId);
      return match ? `${match.title} (Experience)` : `Experience (${selectedSlug || "None"})`;
    }
    if (formCategory === "Blog") {
      return selectedSlug === "blog" ? "Main Blog Page (/blog)" : `Blog Post (${selectedSlug})`;
    }
    return formCategory;
  }, [formCategory, selectedSlug, selectedEntityId, countries, states, cities, travelExperiences]);

  // Clear batch files
  const clearMultipleFiles = () => {
    multipleFiles.forEach((item) => {
      if (item.preview && item.preview.startsWith("blob:")) {
        URL.revokeObjectURL(item.preview);
      }
    });
    setMultipleFiles([]);
    setMultiUrlInput("");
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

  // Open Add modal with a specific page locked
  const handleAddImagesToPage = (page: typeof groupedPages[0], defaultMode: "single" | "multiple" = "single") => {
    setFormCategory(page.entityType);
    setSelectedEntityId(page.entityId);
    setSelectedSlug(page.slug);
    const maxOrder = page.banners.reduce((max, b) => Math.max(max, b.displayOrder ?? 0), 0);
    setDisplayOrder(maxOrder + 1);
    setUploadMode(defaultMode);
    setShowDestinationChange(false);
    setEditingBanner(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setSelectedMobileFile(null);
    setMobilePreviewUrl(null);
    setRemoveMobileImage(false);
    setTitle("");
    setSubtitle("");
    setAltText("");
    clearMultipleFiles();
    setIsModalOpen(true);
  };

  // Open Add/Edit Modal
  const openAddModal = (bannerToEdit?: HeroFullBanner, defaultMode: "single" | "multiple" = "single") => {
    if (bannerToEdit) {
      setEditingBanner(bannerToEdit);
      setUploadMode("single");
      setShowDestinationChange(false);
      setFormCategory(bannerToEdit.entityType as HeroBannerEntityType);
      setSelectedEntityId(bannerToEdit.entityId || 0);
      setSelectedSlug(bannerToEdit.pageSlug || "");
      setTitle(bannerToEdit.title || "");
      setSubtitle(bannerToEdit.subtitle || "");
      setAltText(bannerToEdit.altText || "");
      setDisplayOrder(bannerToEdit.displayOrder || 0);
      setSelectedFile(null);
      setPreviewUrl(bannerToEdit.image || null);
      setSelectedMobileFile(null);
      setMobilePreviewUrl(bannerToEdit.mobileImage || null);
      setRemoveMobileImage(false);
    } else {
      setEditingBanner(null);
      setUploadMode(defaultMode);
      setShowDestinationChange(true);
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
      setSelectedMobileFile(null);
      if (mobilePreviewUrl && mobilePreviewUrl.startsWith("blob:")) URL.revokeObjectURL(mobilePreviewUrl);
      setMobilePreviewUrl(null);
      setRemoveMobileImage(false);
      clearMultipleFiles();
    }
    setLibraryPickerTarget(null);
    setEditorBannerTab("desktop");
    setIsModalOpen(true);
  };

  const handleCategoryChange = (cat: HeroBannerEntityType) => {
    setFormCategory(cat);
    if (cat === "Blog") {
      setSelectedSlug("blog");
      setSelectedEntityId(0);
    } else if (cat === "TourPackages") {
      setSelectedSlug("tour-packages");
      setSelectedEntityId(0);
    } else {
      setSelectedEntityId(0);
      setSelectedSlug("");
    }
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
      if (!editingBanner && !selectedFile && !previewUrl) {
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
        } else if (previewUrl && !previewUrl.startsWith("blob:")) {
          fd.append("image", previewUrl);
        }

        if (selectedMobileFile) {
          fd.append("mobileImage", selectedMobileFile);
        } else if (removeMobileImage) {
          fd.append("removeMobileImage", "true");
        } else if (mobilePreviewUrl && !mobilePreviewUrl.startsWith("blob:")) {
          fd.append("mobileImage", mobilePreviewUrl);
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
        if (selectedFile) {
          fd.append("image", selectedFile);
        } else if (previewUrl && !previewUrl.startsWith("blob:")) {
          fd.append("image", previewUrl);
        }

        if (selectedMobileFile) {
          fd.append("mobileImage", selectedMobileFile);
        } else if (mobilePreviewUrl && !mobilePreviewUrl.startsWith("blob:")) {
          fd.append("mobileImage", mobilePreviewUrl);
        }

        await createMutation.mutateAsync(fd);
        toast.success("Hero Full Banner uploaded successfully!");
      }

      setIsModalOpen(false);
      if (previewUrl && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
      if (mobilePreviewUrl && mobilePreviewUrl.startsWith("blob:")) URL.revokeObjectURL(mobilePreviewUrl);
      setSelectedFile(null);
      setPreviewUrl(null);
      setSelectedMobileFile(null);
      setMobilePreviewUrl(null);
      setRemoveMobileImage(false);
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
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto font-sans">
      {/* 1. TOP HEADER & PRIMARY ACTIONS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#2E8B8B]/10 text-[#2E8B8B] flex items-center justify-center shadow-xs">
              <Layers size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                Hero Banner Manager
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {allBanners.length} Total Slides
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Manage full panoramic sliding banners (1920×600) for Home, Golden Triangle, Country & City pages.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode("pages")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "pages"
                  ? "bg-white text-[#2E8B8B] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers size={14} />
              <span>Grouped by Page</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-white text-[#2E8B8B] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutGrid size={14} />
              <span>All Banners Grid</span>
            </button>
          </div>

          <Button
            type="button"
            onClick={() => openAddModal(undefined, "single")}
            className="bg-[#2E8B8B] hover:bg-[#267373] text-white flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            <Plus size={16} />
            <span>Upload Banners</span>
          </Button>
        </div>
      </div>

      {/* 2. SIMPLE & SOBER NAVIGATION TABS (NO ICONS, CLEAN UNDERLINE TABS) */}
      <div className="space-y-3">
        {/* Sober Underline Navigation Tabs */}
        <nav aria-label="Hero Categories" className="flex items-center gap-1 sm:gap-3 border-b border-slate-200 overflow-x-auto scrollbar-none px-0.5">
          {NAV_TABS.map((tab) => {
            const count =
              tab.value === "ALL"
                ? allBanners.length
                : allBanners.filter((b) => b.entityType === tab.value).length;
            const isActive = selectedCategoryFilter === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => {
                  setSelectedCategoryFilter(tab.value);
                  setSearchQuery("");
                }}
                className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm whitespace-nowrap cursor-pointer relative -mb-px border-b-2 transition-all ${
                  isActive
                    ? "border-[#2E8B8B] text-[#2E8B8B] font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300 font-medium"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                    isActive
                      ? "bg-[#2E8B8B]/10 text-[#2E8B8B]"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Tab Sub-Controls & Quick Search / Dropdown Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          {/* Quick Search */}
          <div className="relative w-full sm:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${selectedCategoryFilter === "ALL" ? "all banners" : selectedCategoryFilter}...`}
              className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2E8B8B] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Tab Specific Quick Selector / Jump with Shadcn UI */}
          <div className="flex-1 w-full flex items-center justify-start sm:justify-end gap-3">
            {selectedCategoryFilter === "State" && (
              <div className="w-full sm:w-80">
                <ShadcnSelect
                  placeholder="Select State / Circuit (e.g. Golden Triangle)..."
                  icon={MapPin}
                  value={searchQuery}
                  items={states.map((s: any) => ({
                    label: s.title,
                    value: s.slug,
                    sublabel: s.slug,
                    icon: MapPin,
                  }))}
                  clearable={true}
                  onChange={(val) => setSearchQuery(val)}
                />
              </div>
            )}

            {selectedCategoryFilter === "Country" && (
              <div className="w-full sm:w-80">
                <ShadcnSelect
                  placeholder="Select Country (e.g. India)..."
                  icon={Globe}
                  value={searchQuery}
                  items={countries.map((c: any) => ({
                    label: c.title,
                    value: c.slug,
                    sublabel: c.slug,
                    icon: Globe,
                  }))}
                  clearable={true}
                  onChange={(val) => setSearchQuery(val)}
                />
              </div>
            )}

            {selectedCategoryFilter === "City" && (
              <div className="w-full sm:w-80">
                <ShadcnSelect
                  placeholder="Select City (e.g. Jaipur, Agra)..."
                  icon={MapPin}
                  value={searchQuery}
                  items={cities.map((c: any) => ({
                    label: c.title,
                    value: c.slug,
                    sublabel: c.state?.title || c.slug,
                    icon: MapPin,
                  }))}
                  clearable={true}
                  onChange={(val) => setSearchQuery(val)}
                />
              </div>
            )}

            {selectedCategoryFilter === "TravelExperience" && (
              <div className="w-full sm:w-80">
                <ShadcnSelect
                  placeholder="Select Travel Experience..."
                  icon={Sparkles}
                  value={searchQuery}
                  items={travelExperiences.map((t: any) => ({
                    label: t.title,
                    value: t.slug,
                    icon: Sparkles,
                  }))}
                  clearable={true}
                  onChange={(val) => setSearchQuery(val)}
                />
              </div>
            )}

            {selectedCategoryFilter === "Home" && (
              <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                <span>Active on:</span>
                <Link
                  href="/"
                  target="_blank"
                  className="font-bold text-[#2E8B8B] hover:underline flex items-center gap-1 bg-[#2E8B8B]/10 px-2.5 py-1 rounded-lg"
                >
                  <span>http://localhost:3000/</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            )}

            {selectedCategoryFilter === "TourPackages" && (
              <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                <span>Active on:</span>
                <Link
                  href="/tour-packages"
                  target="_blank"
                  className="font-bold text-[#2E8B8B] hover:underline flex items-center gap-1 bg-[#2E8B8B]/10 px-2.5 py-1 rounded-lg"
                >
                  <span>/tour-packages</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT: PAGES VIEW (GROUPED BY PAGE) */}
      {viewMode === "pages" ? (
        isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-slate-100 animate-pulse rounded-2xl border border-slate-200" />
            ))}
          </div>
        ) : filteredPages.length === 0 ? (
          <EmptyState
            title="No Pages Found"
            description={
              searchQuery
                ? `No pages matching "${searchQuery}". Try a different keyword.`
                : "No hero banners found. Click 'Upload Banners' above to add slides for your pages."
            }
          />
        ) : (
          <div className="space-y-6">
            {filteredPages.map((page) => (
              <div
                key={page.key}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
              >
                {/* Page Card Header */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2E8B8B]/10 text-[#2E8B8B] flex items-center justify-center shrink-0">
                      {page.entityType === "Home" ? (
                        <Home size={20} />
                      ) : page.entityType === "Country" ? (
                        <Globe size={20} />
                      ) : page.entityType === "State" ? (
                        <MapPin size={20} />
                      ) : page.entityType === "City" ? (
                        <MapPin size={20} />
                      ) : (
                        <Sparkles size={20} />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                          {page.title}
                        </h2>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-200 text-slate-700">
                          {page.entityType}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {page.banners.length} {page.banners.length === 1 ? "Slide" : "Slides in Rotation"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                        <span>{page.subtitle}</span>
                        {page.liveUrl && (
                          <Link
                            href={page.liveUrl}
                            target="_blank"
                            className="text-[#2E8B8B] hover:underline inline-flex items-center gap-0.5 font-semibold"
                            title="Open live page in new tab"
                          >
                            <span>View Live</span>
                            <ExternalLink size={11} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Action: Add More Images to this specific page */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      type="button"
                      onClick={() => handleAddImagesToPage(page, "single")}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                    >
                      <Plus size={15} />
                      <span>+ Add More Images</span>
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleAddImagesToPage(page, "multiple")}
                      className="border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                      title="Upload multiple photos in bulk at once"
                    >
                      <Layers size={14} />
                      <span>Fast Batch</span>
                    </Button>
                  </div>
                </div>

                {/* Slides Strip / Gallery */}
                <div className="p-4 sm:p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {page.banners.map((banner, index) => (
                      <div
                        key={banner.id}
                        className="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-200 shadow-xs flex flex-col"
                      >
                        {/* Slide Preview (16:5 Panoramic Aspect Ratio) */}
                        <div className="relative w-full h-36 bg-slate-950 overflow-hidden">
                          <FallbackImage
                            src={banner.image}
                            alt={banner.altText || banner.title || "Banner slide"}
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 pointer-events-none" />

                          {/* Order Badge */}
                          <span className="absolute top-2 left-2 bg-black/75 backdrop-blur-md text-white text-[11px] font-black px-2 py-0.5 rounded-md border border-white/20">
                            Slide #{banner.displayOrder ?? index + 1}
                          </span>

                          {/* Mobile Image Badge */}
                          {banner.mobileImage && (
                            <span
                              className="absolute top-2 right-2 bg-emerald-600/90 backdrop-blur-md text-white text-[9.5px] font-bold px-1.5 py-0.5 rounded shadow-xs"
                              title="Dedicated mobile banner attached (750×500)"
                            >
                              📱 Mobile
                            </span>
                          )}

                          {/* Overlay Text Preview */}
                          <div className="absolute bottom-2 left-2.5 right-2.5 text-white pointer-events-none">
                            {banner.subtitle && (
                              <p className="text-[10px] font-bold uppercase tracking-wider text-[#F8904D] truncate">
                                {banner.subtitle}
                              </p>
                            )}
                            <h4 className="text-xs font-black uppercase text-white truncate drop-shadow-sm">
                              {banner.title || "(No text overlay)"}
                            </h4>
                          </div>

                          {/* Hover Actions Bar */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                            <button
                              type="button"
                              onClick={() => openAddModal(banner, "single")}
                              className="px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-800 text-xs font-bold shadow-md flex items-center gap-1 cursor-pointer transition-transform hover:scale-105"
                              title="Crop or edit this banner"
                            >
                              <Crop size={12} className="text-[#2E8B8B]" />
                              <span>Crop / Edit</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(banner.id)}
                              className="p-1.5 rounded-lg bg-rose-600/95 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer transition-transform hover:scale-105"
                              title="Delete this slide"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                        {/* Card Details Footer */}
                        <div className="p-2.5 bg-white border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="font-mono truncate max-w-[140px]" title={banner.image}>
                            {banner.image.split("/").pop()}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => openAddModal(banner, "single")}
                              className="text-[#2E8B8B] hover:underline font-bold"
                            >
                              Edit
                            </button>
                            <span className="text-slate-300">•</span>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(banner.id)}
                              className="text-rose-600 hover:underline font-bold"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* 4. ALTERNATIVE: ALL BANNERS GRID VIEW */
        isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-2xl border border-slate-200" />
            ))}
          </div>
        ) : filteredBanners.length === 0 ? (
          <EmptyState
            title="No Hero Full Banners Found"
            description="Click 'Upload Banners' to add panoramic banners for your pages."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBanners.map((banner) => (
              <div
                key={banner.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col"
              >
                <div className="relative w-full h-44 bg-slate-900 overflow-hidden">
                  <FallbackImage
                    src={banner.image}
                    alt={banner.altText || banner.title || "Hero banner"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

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

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    {banner.subtitle && (
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#F8904D] truncate">
                        {banner.subtitle}
                      </p>
                    )}
                    <h3 className="text-base font-black text-white truncate drop-shadow-sm">
                      {banner.title || "(No custom overlay title)"}
                    </h3>
                  </div>
                </div>

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
                      <span className="font-semibold text-slate-800">#{banner.displayOrder}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-600">Mobile Banner:</span>
                      {banner.mobileImage ? (
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          📱 Dedicated (750×500)
                        </span>
                      ) : (
                        <span className="text-[10.5px] text-slate-400">Desktop Fallback</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400">ID #{banner.id}</span>
                    <div className="flex items-center gap-1.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => openAddModal(banner, "single")}
                        className="h-8 px-2.5 text-xs flex items-center gap-1 border-slate-200 text-slate-700 hover:bg-[#2E8B8B]/10 hover:text-[#2E8B8B]"
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
        )
      )}

      {/* 5. UPLOAD & EDIT BANNER MODAL (USER-FRIENDLY & SIMPLIFIED) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-4xl sm:max-w-5xl w-full shadow-2xl border border-slate-100 overflow-hidden my-4 sm:my-6 max-h-[94vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/70 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#2E8B8B]/10 text-[#2E8B8B] flex items-center justify-center shrink-0">
                  <Upload size={17} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {editingBanner ? `Edit Banner #${editingBanner.id}` : "Upload Hero Banner"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {targetPageDisplayName}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3.5 overflow-y-auto flex-1">
              {/* Target Page Destination (Compact) */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 sm:p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin size={14} className="text-[#2E8B8B] shrink-0" />
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {targetPageDisplayName}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowDestinationChange(!showDestinationChange)}
                    className="text-xs font-semibold text-[#2E8B8B] hover:underline cursor-pointer shrink-0"
                  >
                    {showDestinationChange ? "Done" : "Change Page"}
                  </button>
                </div>

                {/* Collapsible Destination Picker */}
                {showDestinationChange && (
                  <div className="pt-2 border-t border-slate-200/80 space-y-2.5 animate-in fade-in duration-150">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                      Choose Destination Page:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {CATEGORIES.map((cat) => (
                        <button
                          type="button"
                          key={cat.value}
                          onClick={() => handleCategoryChange(cat.value)}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer ${
                            formCategory === cat.value
                              ? "bg-[#2E8B8B] text-white border-[#2E8B8B] shadow-xs"
                              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Dynamic Entity Dropdown with Shadcn UI (with Search) */}
                    {formCategory === "State" && (
                      <ShadcnSelect
                        label="Choose State or Iconic Circuit (e.g. Golden Triangle, Rajasthan)"
                        icon={MapPin}
                        value={selectedSlug}
                        placeholder="-- Select State or Circuit --"
                        searchPlaceholder="Type to search state or circuit..."
                        items={states.map((s: any) => ({
                          label: s.title,
                          value: s.slug,
                          sublabel: s.slug,
                          icon: MapPin,
                        }))}
                        onChange={(val) => {
                          const item = states.find((s: any) => s.slug === val);
                          if (item) {
                            setSelectedSlug(item.slug);
                            setSelectedEntityId(item.id);
                          } else {
                            setSelectedSlug("");
                            setSelectedEntityId(0);
                          }
                        }}
                      />
                    )}

                    {formCategory === "Country" && (
                      <ShadcnSelect
                        label="Choose Country Destination"
                        icon={Globe}
                        value={selectedSlug}
                        placeholder="-- Select Country --"
                        searchPlaceholder="Type to search country..."
                        items={countries.map((c: any) => ({
                          label: c.title,
                          value: c.slug,
                          sublabel: c.slug,
                          icon: Globe,
                        }))}
                        onChange={(val) => {
                          const item = countries.find((c: any) => c.slug === val);
                          if (item) {
                            setSelectedSlug(item.slug);
                            setSelectedEntityId(item.id);
                          } else {
                            setSelectedSlug("");
                            setSelectedEntityId(0);
                          }
                        }}
                      />
                    )}

                    {formCategory === "City" && (
                      <ShadcnSelect
                        label="Choose City / Destination (e.g. Jaipur, Agra, Udaipur)"
                        icon={MapPin}
                        value={selectedSlug}
                        placeholder="-- Select City --"
                        searchPlaceholder="Type to search city..."
                        items={cities.map((c: any) => ({
                          label: c.title,
                          value: c.slug,
                          sublabel: c.state?.title || c.slug,
                          icon: MapPin,
                        }))}
                        onChange={(val) => {
                          const item = cities.find((c: any) => c.slug === val);
                          if (item) {
                            setSelectedSlug(item.slug);
                            setSelectedEntityId(item.id);
                          } else {
                            setSelectedSlug("");
                            setSelectedEntityId(0);
                          }
                        }}
                      />
                    )}

                    {formCategory === "TravelExperience" && (
                      <ShadcnSelect
                        label="Choose Travel Experience"
                        icon={Sparkles}
                        value={selectedSlug}
                        placeholder="-- Select Travel Experience --"
                        searchPlaceholder="Type to search travel experience..."
                        items={travelExperiences.map((t: any) => ({
                          label: t.title,
                          value: t.slug,
                          sublabel: t.slug,
                          icon: Sparkles,
                        }))}
                        onChange={(val) => {
                          const item = travelExperiences.find((t: any) => t.slug === val);
                          if (item) {
                            setSelectedSlug(item.slug);
                            setSelectedEntityId(item.id);
                          } else {
                            setSelectedSlug("");
                            setSelectedEntityId(0);
                          }
                        }}
                      />
                    )}

                    {formCategory === "Blog" && (
                      <ShadcnSelect
                        label="Choose Blog Target"
                        icon={FileText}
                        value={selectedSlug || "blog"}
                        placeholder="-- Select Blog --"
                        searchPlaceholder="Type to search blog post..."
                        items={[
                          { label: "Main Blog Page (/blog)", value: "blog", icon: FileText },
                          ...blogPosts.map((b: any) => ({
                            label: b.title,
                            value: b.slug,
                            sublabel: `/blog/${b.slug}`,
                            icon: FileText,
                          })),
                        ]}
                        onChange={(val) => {
                          if (val === "blog") {
                            setSelectedSlug("blog");
                            setSelectedEntityId(0);
                          } else {
                            const item = blogPosts.find((b: any) => b.slug === val);
                            if (item) {
                              setSelectedSlug(item.slug);
                              setSelectedEntityId(item.id);
                            }
                          }
                        }}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Mode Switcher */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setUploadMode("single")}
                  className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    uploadMode === "single"
                      ? "bg-white text-[#2E8B8B] shadow-2xs border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Crop size={13} />
                  <span>Single Slide</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUploadMode("multiple")}
                  className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    uploadMode === "multiple"
                      ? "bg-white text-indigo-700 shadow-2xs border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Layers size={13} />
                  <span>Fast Batch</span>
                </button>
              </div>

              {/* MODE 1: MULTIPLE IMAGES BATCH UPLOAD */}
              {uploadMode === "multiple" ? (
                <div className="space-y-3">
                  {/* Multi Dropzone */}
                  <div
                    onClick={() => multiFileInputRef.current?.click()}
                    className="border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50/70 rounded-2xl p-5 text-center cursor-pointer transition-colors"
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
                      <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-indigo-600 mb-1.5 border border-indigo-100">
                        <Upload size={18} />
                      </div>
                      <p className="text-xs font-bold text-slate-800">
                        Select multiple images or drag & drop here
                      </p>
                    </div>
                  </div>

                  {/* Or Add from Image URL */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <LinkIcon size={11} className="text-indigo-600" /> Add via Image URL
                    </span>
                    <div className="flex gap-1.5">
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
                        placeholder="Paste image URL (https://...)"
                        className="flex-1 min-w-0 px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      />
                      <button
                        type="button"
                        onClick={handleAddUrlToMultiple}
                        disabled={multiUrlLoading || !multiUrlInput.trim()}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs rounded-lg flex items-center gap-1 transition-colors shrink-0 shadow-2xs cursor-pointer"
                      >
                        {multiUrlLoading ? <Loader2 size={12} className="animate-spin" /> : <LinkIcon size={12} />}
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                  {/* Multiple Selected Files Grid */}
                  {multipleFiles.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs text-slate-600 font-bold px-1">
                        <span>{multipleFiles.length} Images:</span>
                        <button
                          type="button"
                          onClick={clearMultipleFiles}
                          className="text-rose-600 hover:underline text-xs"
                        >
                          Clear All
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-52 overflow-y-auto pr-1">
                        {multipleFiles.map((item, idx) => (
                          <div
                            key={item.id}
                            className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 group"
                          >
                            <div className="relative w-full h-24">
                              <img src={item.preview} alt={item.name} className="w-full h-full object-cover" />
                              <span className="absolute top-1 left-1 bg-black/80 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                                #{displayOrder + idx}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeMultipleItem(item.id)}
                                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
                                title="Remove photo"
                              >
                                <X size={12} />
                              </button>
                            </div>
                            <div className="p-1.5 bg-white flex items-center justify-between text-[11px] border-t border-slate-100">
                              <p className="font-medium text-slate-700 truncate max-w-[100px]">{item.name}</p>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedFile(item.file);
                                  setPreviewUrl(item.preview);
                                  setUploadMode("single");
                                  removeMultipleItem(item.id);
                                  toast.success("Moved image to Single Slide mode.");
                                }}
                                className="text-xs text-[#2E8B8B] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                              >
                                <Crop size={11} />
                                <span>Crop</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* MODE 2: SINGLE BANNER WITH BOTH DESKTOP (1920×600) AND MOBILE (750×500) */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* 1. DESKTOP HERO BANNER (1920 × 600 px) */}
                  <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-3.5 space-y-2.5 flex flex-col justify-between overflow-hidden min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Monitor size={14} className="text-teal-700 shrink-0" />
                        <span className="text-xs font-bold text-slate-800">Desktop</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                          1920 × 600 px
                        </span>
                      </div>

                      {libraryImages.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setLibraryPickerTarget("desktop")}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 hover:border-[#2E8B8B] text-slate-600 hover:text-[#2E8B8B] text-[11px] font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
                        >
                          <ImageIcon size={11} />
                          <span>Library</span>
                        </button>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <ImageCropUpload
                        key={`desktop-${editingBanner ? editingBanner.id : "new"}`}
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
                        maxHeight={600}
                        aspectRatioPreset="hero"
                        label="Drop desktop image or browse"
                        initialImage={previewUrl || undefined}
                      />
                    </div>

                    {/* Live Desktop Preview with Overlay */}
                    {previewUrl && (
                      <div className="pt-1.5 border-t border-slate-200/80">
                        <div className="relative w-full h-24 bg-slate-900 rounded-lg overflow-hidden border border-slate-200">
                          <Image
                            src={previewUrl}
                            alt="Desktop Preview"
                            fill
                            unoptimized
                            className="object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-black/35 flex items-center justify-center text-white text-center p-2">
                            <div>
                              {subtitle && <p className="text-[9px] font-bold uppercase text-[#F8904D]">{subtitle}</p>}
                              <h4 className="text-xs font-bold uppercase truncate max-w-[200px]">
                                {title || "(Title)"}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 2. MOBILE DEDICATED BANNER (750 × 500 px) */}
                  <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-3.5 space-y-2.5 flex flex-col justify-between overflow-hidden min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Smartphone size={14} className="text-indigo-700 shrink-0" />
                        <span className="text-xs font-bold text-slate-800">Mobile</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          750 × 500 px (Opt.)
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {libraryImages.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setLibraryPickerTarget("mobile")}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 hover:border-[#2E8B8B] text-slate-600 hover:text-[#2E8B8B] text-[11px] font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
                          >
                            <ImageIcon size={11} />
                            <span>Library</span>
                          </button>
                        )}
                        {mobilePreviewUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedMobileFile(null);
                              if (mobilePreviewUrl && mobilePreviewUrl.startsWith("blob:"))
                                URL.revokeObjectURL(mobilePreviewUrl);
                              setMobilePreviewUrl(null);
                              setRemoveMobileImage(true);
                            }}
                            className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold px-1 py-0.5 rounded cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <ImageCropUpload
                        key={`mobile-${editingBanner ? editingBanner.id : "new"}`}
                        onFileSelect={(file) => {
                          setSelectedMobileFile(file);
                          setRemoveMobileImage(false);
                          if (mobilePreviewUrl && mobilePreviewUrl.startsWith("blob:"))
                            URL.revokeObjectURL(mobilePreviewUrl);
                          setMobilePreviewUrl(URL.createObjectURL(file));
                        }}
                        onClear={() => {
                          setSelectedMobileFile(null);
                          if (mobilePreviewUrl && mobilePreviewUrl.startsWith("blob:"))
                            URL.revokeObjectURL(mobilePreviewUrl);
                          setMobilePreviewUrl(null);
                          setRemoveMobileImage(true);
                        }}
                        maxWidth={750}
                        maxHeight={500}
                        aspectRatioPreset="mobileHero"
                        label="Drop mobile image (Optional)"
                        initialImage={mobilePreviewUrl || undefined}
                      />
                    </div>

                    {/* Live Mobile Preview or Informational Note */}
                    {mobilePreviewUrl ? (
                      <div className="pt-1.5 border-t border-slate-200/80">
                        <div className="relative w-28 h-20 mx-auto bg-slate-900 rounded-lg overflow-hidden border border-slate-200">
                          <Image
                            src={mobilePreviewUrl}
                            alt="Mobile Preview"
                            fill
                            unoptimized
                            className="object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-center p-1">
                            <div>
                              {subtitle && <p className="text-[7px] font-bold uppercase text-[#F8904D]">{subtitle}</p>}
                              <h4 className="text-[9px] font-bold uppercase truncate max-w-[90px]">
                                {title || "(Title)"}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-1 text-center">
                        <span className="text-[11px] text-slate-400">
                          Optional: Desktop banner auto-centers if empty
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Optional Text Overlays & Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Title Overlay (Optional)
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Royal Rajasthan Tours"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#2E8B8B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Subtitle / Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Land of Kings & Forts"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#2E8B8B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Alt Text (Optional)
                  </label>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="e.g. Scenic panoramic view"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#2E8B8B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#2E8B8B]"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl cursor-pointer"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-[#2E8B8B] hover:bg-[#267373] text-white font-semibold px-6 shadow-xs cursor-pointer"
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

      {/* 6. DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                <AlertCircle size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Delete Hero Banner Slide</h3>
                <p className="text-xs text-slate-500">This will remove this image slide from the hero rotation.</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Are you sure you want to delete this banner? Once deleted, the slider will automatically rotate the remaining slides.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-xl cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(deleteConfirmId)}
                className="rounded-xl bg-rose-600 hover:bg-rose-700 cursor-pointer"
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 7. MEDIA LIBRARY PICKER MODAL */}
      {libraryPickerTarget && (
        <div className="fixed inset-0 z-[120] bg-black/70 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon size={18} className="text-[#2E8B8B]" />
                <h3 className="font-bold text-slate-800 text-sm">
                  Choose from Existing Media Library ({libraryPickerTarget === "desktop" ? "Desktop Banner" : "Mobile Banner"})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLibraryPickerTarget(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              <p className="text-xs text-slate-500 mb-3">
                Click any previously uploaded image below to use it without re-uploading (zero storage duplication):
              </p>

              {libraryImages.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-10">No existing banners found in library yet.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {libraryImages.map((imgUrl, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        if (libraryPickerTarget === "desktop") {
                          setPreviewUrl(imgUrl);
                          setSelectedFile(null);
                        } else {
                          setMobilePreviewUrl(imgUrl);
                          setSelectedMobileFile(null);
                          setRemoveMobileImage(false);
                        }
                        setLibraryPickerTarget(null);
                        toast.success(`Selected image for ${libraryPickerTarget === "desktop" ? "Desktop" : "Mobile"}!`);
                      }}
                      className="group relative h-28 bg-slate-900 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#2E8B8B] shadow-xs hover:shadow-md transition-all"
                    >
                      <img
                        src={imgUrl}
                        alt={`Library ${i}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="bg-[#2E8B8B] text-white text-xs font-bold px-2 py-1 rounded-md shadow">
                          Select
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-slate-100 bg-slate-50 flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setLibraryPickerTarget(null)}
                className="rounded-xl cursor-pointer"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
