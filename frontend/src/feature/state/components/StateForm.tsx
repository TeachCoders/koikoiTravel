"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormActionButton from "@/components/shared/customBtns";
import Heading from "@/components/shared/heading";
import SeoFields from "@/components/shared/SeoFields";
import BannerSection from "@/components/shared/BannerSection";
import RichTextEditor from "@/components/shared/RichTextEditor";
import FaqEditor, { FaqData } from "@/components/shared/FaqEditor";
import AsyncMultiSelect from "@/components/shared/AsyncMultiSelect";
import { getJourneys } from "@/feature/journey/api";
import {
  useCreateState,
  useUpdateState,
} from "@/feature/state/api/useState";
import { useGetCurrentUser } from "@/feature/auth/api/useAuth";
import { useGetCountries } from "@/feature/country/api/useCountry";
import { errorToast } from "@/components/shared/tost";
import apiClient from "@/lib/apiClient";
import type { Country } from "@/feature/country/type";
import type { State } from "@/feature/state/type";

interface StateFormProps {
  initialData?: State;
  mode: "create" | "edit";
}

const stateFields = [
  { name: "capital", label: "Capital", placeholder: "e.g. Mumbai" },
  { name: "language", label: "Language", placeholder: "e.g. Hindi, Marathi" },
  { name: "area", label: "Area", placeholder: "e.g. 603 km²" },
];

export default function StateFormPage({ initialData, mode }: StateFormProps) {
  const router = useRouter();
  const { createState, isPending: isCreating } = useCreateState();
  const { updateState, isPending: isUpdating } = useUpdateState();
  const { user } = useGetCurrentUser();

  const normalizedRole = (user?.role ?? "").toLowerCase().replace(/[\s-]+/g, "_");
  const isSuperAdmin = normalizedRole.includes("super") && normalizedRole.includes("admin");
  const isITTeam =
    user?.team?.name?.toLowerCase().includes("it") ||
    user?.team?.name?.toLowerCase().includes("maintenance");
  const canEdit = isSuperAdmin || isITTeam;

  const { countries, isLoading: loadingCountries } = useGetCountries({ limit: 1000 });

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    seoDescription: initialData?.seoDescription || "",
    overView: initialData?.overView || "",
    seoKeyword: initialData?.seoKeyword || "",
    seoTitle: initialData?.seoTitle || "",
    h1Title: initialData?.h1Title || "",
    thumbImg: initialData?.thumbImg || "",
    capital: initialData?.capital || "",
    language: initialData?.language || "",
    famousFor: initialData?.famousFor || "",
    area: initialData?.area || "",
    countryId: initialData?.countryId || 0,
    isActive: initialData?.isActive ?? false,
    showOnSite: initialData?.showOnSite ?? true,
    displayOrder: initialData?.displayOrder ?? 0,
    domesticDisplayOrder: initialData?.domesticDisplayOrder ?? 0,
  });

  const countrySlug = initialData?.country?.slug || countries.find(c => c.id === formData.countryId)?.slug || "";

  const [bannerTitle, setBannerTile] = useState(initialData?.banner?.bannerTitle || "");
  const [bannerTag, setBannerTag] = useState(initialData?.banner?.bannerTag || "");
  const [bannerImages, setBannerImages] = useState<string[]>(initialData?.banner?.images || []);
  const [bannerFiles, setBannerFiles] = useState<{ file: File; index: number }[]>([]);
  const [moreDescription, setMoreDescription] = useState(initialData?.moreDescription || "");
  const [faqs, setFaqs] = useState<FaqData[]>(initialData?.faqs || []);
  const [journeyIds, setJourneyIds] = useState<number[]>(
    (initialData?.journeys ?? []).map((j) => j.id)
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const initializedRef = React.useRef(false);

  React.useEffect(() => {
    if (initialData && !initializedRef.current) {
      initializedRef.current = true;
      setFormData({
        title: initialData.title || "",
        slug: initialData.slug || "",
        seoDescription: initialData.seoDescription || "",
        overView: initialData.overView || "",
        seoKeyword: initialData.seoKeyword || "",
        seoTitle: initialData.seoTitle || "",
        h1Title: initialData.h1Title || "",
        thumbImg: initialData.thumbImg || "",
        capital: initialData.capital || "",
        language: initialData.language || "",
        famousFor: initialData.famousFor || "",
        area: initialData.area || "",
        countryId: initialData.countryId || 0,
        isActive: initialData.isActive ?? true,
        showOnSite: initialData.showOnSite ?? true,
        displayOrder: initialData.displayOrder ?? 0,
        domesticDisplayOrder: initialData.domesticDisplayOrder ?? 0,
      });
      setBannerTile(initialData.banner?.bannerTitle || "");
      setBannerTag(initialData.banner?.bannerTag || "");
      setBannerImages(initialData.banner?.images || []);
      setMoreDescription(initialData.moreDescription || "");
      setFaqs(initialData.faqs || []);
      setJourneyIds((initialData.journeys ?? []).map((j) => j.id));
    }
  }, [initialData]);

  const isLoading = isCreating || isUpdating;



  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.seoDescription.trim()) newErrors.seoDescription = "Description is required";
    if (formData.seoDescription.length > 500) newErrors.seoDescription = "Description must be under 500 characters";
    if (formData.overView.length > 1200) newErrors.overView = "Overview should be under 200 words";
    if (!formData.countryId) newErrors.countryId = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleShortDescChange = (html: string) => {
    setFormData((prev) => ({ ...prev, overView: html }));
  };

  const handleThumbImgUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, thumbImg: url }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    let finalBannerImages = bannerImages;
    try {
      if (bannerFiles.length > 0) {
        const merged = [...bannerImages];
        const ordered = [...bannerFiles].sort((a, b) => a.index - b.index);
        for (const { file, index } of ordered) {
          const fd = new FormData();
          fd.append("category", "banner");
          const customName = file.name && file.name !== "banner-image.webp" && file.name !== "processed-image.webp" && file.name !== "blob"
            ? file.name.replace(/\.[^/.]+$/, "")
            : "";
          const defaultName = formData.slug ? `${formData.slug}-holiday-${index + 1}` : `new-state-holiday-${index + 1}`;
          const filename = customName || defaultName;
          fd.append("filename", filename);
          fd.append("label", customName || (formData.slug ? `${formData.slug}-holiday-${index + 1}` : `New State Holiday ${index + 1}`));
          if (countrySlug) fd.append("folder", `${countrySlug}/holiday`);
          fd.append("file", file);
          const res = await apiClient.post("/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
          const url = res.data?.url;
          if (url) merged.splice(index, 0, url);
        }
        finalBannerImages = merged;
      }
    } catch {
      return errorToast("Banner upload failed, please try again");
    }

    const payload: any = {
      title: formData.title.trim(),
      seoDescription: formData.seoDescription.trim(),
      slug: formData.slug.trim().replace(/-+$/g, "") || undefined,
      overView: formData.overView.trim() || undefined,
      seoKeyword: formData.seoKeyword.trim() || undefined,
      seoTitle: formData.seoTitle.trim() || undefined,
      h1Title: formData.h1Title.trim() || undefined,
      thumbImg: formData.thumbImg.trim() || undefined,
      capital: formData.capital.trim() || undefined,
      language: formData.language.trim() || undefined,
      famousFor: formData.famousFor.trim() || undefined,
      area: formData.area.trim() || undefined,
      countryId: formData.countryId,
      isActive: formData.isActive,
      showOnSite: formData.showOnSite,
      displayOrder: Number(formData.displayOrder) || 0,
      domesticDisplayOrder: Number(formData.domesticDisplayOrder) || 0,
      bannerTitle: bannerTitle.trim() || undefined,
      bannerTag: bannerTag.trim() || undefined,
      bannerImages: finalBannerImages,
      moreDescription: moreDescription.trim() || undefined,
      faqs,
      journeyIds,
    };

    if (mode === "edit" && initialData?.id) {
      updateState(
        { id: initialData.id, payload },
        { onSuccess: () => router.push("/dashboard/state") }
      );
    } else {
      createState(payload, {
        onSuccess: () => router.push("/dashboard/state"),
      });
    }
  };

  if (!canEdit) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-sm">You don&apos;t have permission to {mode} states.</p>
        <Link href="/dashboard/state" className="text-sm text-brand-600 mt-2 hover:underline">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/state"
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <Heading
          heading={mode === "create" ? "Create State" : "Edit State"}
          tagLine={mode === "create" ? "Add a new state to the system" : `Editing ${initialData?.title || "state"}`}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Country Selector */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Country</h2>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Country <span className="text-red-500">*</span>
            </Label>
            <select
              value={formData.countryId || ""}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, countryId: Number(e.target.value) }));
                if (errors.countryId) setErrors((prev) => ({ ...prev, countryId: "" }));
              }}
              disabled={loadingCountries}
              className={`w-full px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 ${errors.countryId ? "border-red-400" : "border-slate-300"}`}
            >
              <option value="">{loadingCountries ? "Loading countries..." : "Select a country"}</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.title}
                </option>
              ))}
            </select>
            {errors.countryId && <p className="text-xs text-red-500">{errors.countryId}</p>}
          </div>
        </div>

        {/* SEO Fields */}
        <SeoFields
          formData={{
            title: formData.title,
            seoTitle: formData.seoTitle,
            slug: formData.slug,
            seoDescription: formData.seoDescription,
            overView: formData.overView,
            seoKeyword: formData.seoKeyword || "",
            thumbImg: formData.thumbImg || "",
            h1Title: formData.h1Title || "",
          }}
          onFieldChange={handleFieldChange}
          onDescriptionChange={handleShortDescChange}
          onThumbImgUpload={handleThumbImgUpload}
          errors={errors}
          bannerImages={bannerImages}
          basePath={countrySlug ? `/${countrySlug}` : "/state"}
          folderPath={countrySlug ? `${countrySlug}/trip` : ""}
        />

        {/* Banner Section */}
        <BannerSection
          bannerTitle={bannerTitle}
          bannerTag={bannerTag}
          bannerImages={bannerImages}
          onBannerTileChange={setBannerTile}
          onBannerTagChange={setBannerTag}
          onBannerImagesChange={setBannerImages}
          onBannerFilesSelect={(files, indices) =>
            setBannerFiles(files.map((file, i) => ({ file, index: indices?.[i] ?? bannerImages.length + i })))
          }
          folderPath={countrySlug ? `${countrySlug}/holiday` : ""}
        />

        {/* State Details */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-slate-500" />
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">State Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stateFields.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-600">{field.label}</Label>
                <Input
                  value={(formData as any)[field.name]}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Homepage Top Destination Placement */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Star size={18} className="text-amber-500" />
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Homepage Top Destination Placement
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Set order number (1, 2, 3...) if this state should appear on the Homepage Top Places section. Leave 0 if not featured.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
            <div className="p-4 rounded-xl border border-amber-200/70 bg-amber-50/30 space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-bold text-slate-800">
                  Left Column (Inbound) Order
                </Label>
                {Number(formData.displayOrder) > 0 && (
                  <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    Position #{formData.displayOrder}
                  </span>
                )}
              </div>
              <Input
                type="number"
                min={0}
                value={formData.displayOrder ?? 0}
                onChange={(e) => setFormData((prev) => ({ ...prev, displayOrder: Number(e.target.value) }))}
                placeholder="0 = Not featured, 1, 2, 3..."
                className="bg-white"
              />
              <p className="text-[11px] text-slate-500">
                Shows in Left Column (Iconic / Inbound) on Homepage. 0 = Disabled.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-blue-200/70 bg-blue-50/30 space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-bold text-slate-800">
                  Right Column (Domestic) Order
                </Label>
                {Number(formData.domesticDisplayOrder) > 0 && (
                  <span className="text-[11px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    Position #{formData.domesticDisplayOrder}
                  </span>
                )}
              </div>
              <Input
                type="number"
                min={0}
                value={formData.domesticDisplayOrder ?? 0}
                onChange={(e) => setFormData((prev) => ({ ...prev, domesticDisplayOrder: Number(e.target.value) }))}
                placeholder="0 = Not featured, 1, 2, 3..."
                className="bg-white"
              />
              <p className="text-[11px] text-slate-500">
                Shows in Right Column (Domestic / Regional) on Homepage. 0 = Disabled.
              </p>
            </div>
          </div>
        </div>

        {/* Top / Featured Tour Packages in State */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider block mb-2">
            ⭐ Top Tour Packages in {formData.title || "State"}
            <span className="text-xs font-normal text-slate-500 ml-2">
              — Ye packages state page par &quot;Top Tour Packages&quot; section mein sabse upar dikhenge.
            </span>
          </label>
          <div className="text-xs text-slate-500 mb-3">
            In packages ko select karein aur drag karke order (1, 2, 3...) set kar sakte hain. Baki sabhi tours niche &quot;Multi-City Tours&quot; section mein auto show honge.
          </div>

          <AsyncMultiSelect
            selectedIds={journeyIds}
            onChange={setJourneyIds}
            fetchOptions={async (search) => {
              const res = await getJourneys({
                search,
                stateId: initialData?.id || undefined,
                isActive: "true",
                limit: 100,
              });
              return (res.data || []).map((j: any) => {
                const daysLabel = j.duration || (j.noDays ? `${j.noDays} Days` : "");
                const mainTitle = j.h1Title || j.title;
                const label = daysLabel ? `(${daysLabel}) ${mainTitle}` : mainTitle;
                return { id: j.id, title: label };
              });
            }}
            initialOptions={(initialData?.journeys ?? []).map((j: any) => {
              const daysLabel = j.duration || (j.noDays ? `${j.noDays} Days` : "");
              const mainTitle = j.h1Title || j.title;
              const label = daysLabel ? `(${daysLabel}) ${mainTitle}` : mainTitle;
              return { id: j.id, title: label };
            })}
            placeholder="Select Top Tour Packages *"
            searchPlaceholder="Search packages by title or duration..."
            onReorder={(fromId, toId) => {
              const arr = [...journeyIds];
              const fromIdx = arr.indexOf(fromId);
              const toIdx = arr.indexOf(toId);
              if (fromIdx !== -1 && toIdx !== -1) {
                const [item] = arr.splice(fromIdx, 1);
                arr.splice(toIdx, 0, item);
                setJourneyIds(arr);
              }
            }}
          />

          {journeyIds.length > 0 && (
            <button
              type="button"
              onClick={() => setJourneyIds([])}
              className="text-[10px] font-bold text-red-500 hover:text-red-700 uppercase tracking-wider cursor-pointer mt-3"
            >
              Clear All Selected Packages
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider block mb-2">Famous For</label>
          <RichTextEditor content={formData.famousFor} onChange={(html) => handleFieldChange("famousFor", html)} />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider block mb-2">More Description</label>
          <RichTextEditor content={moreDescription} onChange={(html) => setMoreDescription(html)} />
        </div>

        <FaqEditor faqs={faqs} setFaqs={setFaqs} />

        {/* Submit */}
        <div className="flex items-center justify-between gap-3 pb-8">
          <div className="flex items-center gap-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                className="rounded border-slate-300"
              />
              Active
            </label>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/state"
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Link>
            <FormActionButton
              text={
                isLoading
                  ? mode === "create" ? "Creating..." : "Updating..."
                  : mode === "create" ? "Create State" : "Update State"
              }
              type="submit"
              isLoading={isLoading}
              size="md"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
