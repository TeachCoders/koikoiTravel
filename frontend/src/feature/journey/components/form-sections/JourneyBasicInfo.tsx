import React from "react";
import AsyncMultiSelect from "@/components/shared/AsyncMultiSelect";
import { getCountries } from "@/feature/country/api";
import { getStates } from "@/feature/state/api";
import { getCities } from "@/feature/city/api";
import { getSeasons } from "@/feature/season/api";
import { getTravelExperiences } from "@/feature/travelExperience/api";
import { Plus, AlertTriangle } from "lucide-react";
import type { QuickCreateTarget } from "@/hooks/useEntityQuickCreate";
import QuickCreateModal from "@/components/shared/QuickCreateModal";

interface JourneyBasicInfoProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors: any;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  
  filterCountryIds: number[];
  setFilterCountryIds: React.Dispatch<React.SetStateAction<number[]>>;
  filterStateIds: number[];
  setFilterStateIds: React.Dispatch<React.SetStateAction<number[]>>;
  
  seasonIds: number[];
  setSeasonIds: React.Dispatch<React.SetStateAction<number[]>>;
  travelExperienceIds: number[];
  setTravelExperienceIds: React.Dispatch<React.SetStateAction<number[]>>;
  
  quickCreateProps: any;
  quickCreatedOptions: Record<string, {id: number, title: string}[]>;
  initialData?: any;
  cities?: any[];
  missingRouteCities?: string[];
  onQuickCreateCityWithName?: (cityName: string) => void;
  onDestinationChange?: (val: string) => void;
  onAutoFillDestination?: () => void;
}

export default function JourneyBasicInfo({ 
  formData, setFormData, errors, setErrors,
  filterCountryIds, setFilterCountryIds,
  filterStateIds, setFilterStateIds,
  seasonIds, setSeasonIds,
  travelExperienceIds, setTravelExperienceIds,
  quickCreateProps, quickCreatedOptions, initialData,
  cities = [], missingRouteCities = [], onQuickCreateCityWithName,
  onDestinationChange, onAutoFillDestination
}: JourneyBasicInfoProps) {

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-5">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Destination Label</label>
              {formData.cityIds?.length > 0 && onAutoFillDestination && (
                <button
                  type="button"
                  onClick={onAutoFillDestination}
                  className="text-xs text-brand-600 hover:text-brand-700 hover:underline font-medium cursor-pointer"
                  title="Auto-fill destination from selected route cities"
                >
                  Auto-fill from cities
                </button>
              )}
            </div>
            <input
              value={formData.destination || ""}
              onChange={(e) => {
                if (onDestinationChange) {
                  onDestinationChange(e.target.value);
                } else {
                  setFormData((prev: any) => ({ ...prev, destination: e.target.value }));
                }
              }}
              placeholder="e.g. Kedarnath - Badrinath or Jaipur - Jodhpur - Udaipur"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <p className="text-[11px] text-slate-400">
              Manual input has top priority and appears directly on package cards and tour details.
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Number of Days <span className="text-red-500">*</span></label>
            <input
              type="number"
              min={1}
              value={formData.noDays}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, noDays: Number(e.target.value) }))}
              className={`w-full px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 ${errors.noDays ? "border-red-400" : "border-slate-300"}`}
            />
            {errors.noDays && <p className="text-xs text-red-500">{errors.noDays}</p>}
          </div>
        </div>
      </div>

      {/* Routes & Categorization */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-5">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Routes & Categories</h2>

        {/* Missing Route Cities Alert Banner */}
        {missingRouteCities.length > 0 && (
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-2.5">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <AlertTriangle size={15} className="text-amber-600 shrink-0" />
              <span>Missing Route Cities in Database:</span>
            </div>
            <p className="text-amber-800 text-[11.5px]">
              The following cities from the generated route were not found in your database. Click to quick-create them:
            </p>
            <div className="flex flex-wrap gap-2">
              {missingRouteCities.map((cityName) => (
                <button
                  key={cityName}
                  type="button"
                  onClick={() => {
                    if (onQuickCreateCityWithName) onQuickCreateCityWithName(cityName);
                    else quickCreateProps.openQuickCreate("city", null, cityName);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-amber-300 text-amber-900 font-semibold hover:bg-amber-100 hover:border-amber-400 transition-all shadow-2xs cursor-pointer"
                >
                  <Plus size={12} className="text-amber-600" />
                  <span>Quick Create &quot;{cityName}&quot;</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <label className="text-sm font-semibold text-slate-700">Route Selection (Cities) <span className="text-red-500">*</span></label>
          <div className="text-xs text-slate-500 mb-2">Select countries, states, and cities for this tour package.</div>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <AsyncMultiSelect
                  selectedIds={filterCountryIds}
                  onChange={(ids) => {
                    setFilterCountryIds(ids);
                  }}
                  fetchOptions={async (search) => {
                    const res = await getCountries({ search, limit: 20 });
                    return res.data;
                  }}
                  initialOptions={[...(initialData?.cities?.map((c: any) => c.state?.country).filter(Boolean).map((c: any) => ({id: c.id, title: c.title})) || []), ...(quickCreatedOptions.country || [])]}
                  placeholder="Select Countries"
                  searchPlaceholder="Search countries..."
                />
                <button type="button" onClick={() => quickCreateProps.openQuickCreate("country")} className="shrink-0 h-9 w-9 flex items-center justify-center rounded-lg border border-dashed border-slate-300 text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors cursor-pointer"><Plus size={15} /></button>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <AsyncMultiSelect
                  selectedIds={filterStateIds}
                  onChange={(ids) => {
                    setFilterStateIds(ids);
                  }}
                  fetchOptions={async (search) => {
                    const countryId = filterCountryIds.length > 0 ? filterCountryIds.join(',') : undefined;
                    const res = await getStates({ search, limit: 100, countryId });
                    return res.data;
                  }}
                  initialOptions={[
                    ...(initialData?.states?.map((s: any) => ({ id: s.id, title: s.title })) || []),
                    ...(initialData?.cities?.map((c: any) => c.state).filter(Boolean).map((s: any) => ({id: s.id, title: s.title})) || []),
                  ]}
                  placeholder="Select States"
                  searchPlaceholder="Search states..."
                />
                <button type="button" onClick={() => quickCreateProps.openQuickCreate("state")} className="shrink-0 h-9 w-9 flex items-center justify-center rounded-lg border border-dashed border-slate-300 text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors cursor-pointer"><Plus size={15} /></button>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-1.5 relative group">
                <AsyncMultiSelect
                  selectedIds={formData.cityIds || []}
                  onChange={(ids) => {
                    setFormData((prev: any) => ({...prev, cityIds: ids}));
                  }}
                  fetchOptions={async (search) => {
                    const stateId = filterStateIds.length > 0 ? filterStateIds.join(',') : undefined;
                    let res = await getCities({ search, limit: 100, stateId });
                    // If filtered by a macro state like South India which has 0 direct cities, fall back to all cities
                    if ((!res.data || res.data.length === 0) && filterStateIds.length > 0) {
                      res = await getCities({ search, limit: 100 });
                    }
                    return res.data;
                  }}
                  initialOptions={[
                    ...(initialData?.cities || initialData?.route || []),
                    ...(cities || []).map((c: any) => ({ id: c.id, title: c.title })),
                    ...(quickCreatedOptions.city || []),
                  ]}
                  placeholder="Select Cities *"
                  searchPlaceholder="Search cities..."
                  error={errors.cityIds}
                  onReorder={(fromId, toId) => {
                    const arr = [...(formData.cityIds || [])];
                    const fromIdx = arr.indexOf(fromId);
                    const toIdx = arr.indexOf(toId);
                    if (fromIdx !== -1 && toIdx !== -1) {
                      const [item] = arr.splice(fromIdx, 1);
                      arr.splice(toIdx, 0, item);
                      setFormData((prev: any) => ({...prev, cityIds: arr}));
                    }
                  }}
                />
                {(formData.cityIds?.length > 0) && (
                  <button 
                    type="button" 
                    onClick={() => setFormData((prev: any) => ({...prev, cityIds: []}))}
                    className="absolute -top-6 right-10 text-[10px] font-bold text-red-500 hover:text-red-700 uppercase tracking-wider cursor-pointer"
                  >
                    Clear All Cities
                  </button>
                )}
                <button type="button" onClick={() => quickCreateProps.openQuickCreate("city")} className="shrink-0 h-9 w-9 flex items-center justify-center rounded-lg border border-dashed border-slate-300 text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors cursor-pointer"><Plus size={15} /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">Travel Experiences (Categories)</label>
            <div className="flex items-center gap-1.5">
              <AsyncMultiSelect
                selectedIds={travelExperienceIds}
                onChange={setTravelExperienceIds}
                fetchOptions={async (search) => {
                  const res = await getTravelExperiences({ search, limit: 100 });
                  return res.data;
                }}
                initialOptions={[...(initialData?.travelExperiences || []).map((e: any) => ({id: e.id, title: e.title})), ...(quickCreatedOptions.experience || [])]}
                placeholder="Select Travel Experiences"
                searchPlaceholder="Search experiences..."
              />
              <button type="button" onClick={() => quickCreateProps.openQuickCreate("experience")} className="shrink-0 h-9 w-9 flex items-center justify-center rounded-lg border border-dashed border-slate-300 text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors cursor-pointer"><Plus size={15} /></button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">Best Travel Seasons &amp; Months</label>
            <AsyncMultiSelect
              selectedIds={seasonIds}
              onChange={setSeasonIds}
              fetchOptions={async (search) => {
                const res = await getSeasons({ search, limit: 100 });
                return res.data;
              }}
              initialOptions={initialData?.months?.map((m: any) => ({id: m.id, title: m.title}))}
              placeholder="Select Best Seasons / Months"
              searchPlaceholder="Search seasons..."
            />
          </div>
        </div>
      </div>

      <QuickCreateModal
        open={Boolean(quickCreateProps.quickCreate)}
        title={quickCreateProps.modalTitle || "Create Entity"}
        initialTitle={quickCreateProps.quickInitialTitle}
        parentLabel={quickCreateProps.parentLabel}
        parentPlaceholder={quickCreateProps.parentPlaceholder}
        parentOptions={quickCreateProps.parentOptions}
        parentValue={quickCreateProps.parentValue}
        onParentChange={quickCreateProps.setQuickParentId}
        loading={quickCreateProps.quickCreateLoading}
        error={quickCreateProps.quickCreateError}
        onSubmit={quickCreateProps.handleQuickCreate}
        onClose={quickCreateProps.closeQuickCreate}
      />
    </div>
  );
}
