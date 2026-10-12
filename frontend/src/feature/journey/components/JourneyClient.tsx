"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus, Map, Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import PrivatePageHeading from "@/components/shared/PrivatePageHeading";
import DirectoryTableLayout from "@/components/shared/DirectoryTableLayout";
import DirectoryTable, { ColumnDef } from "@/components/shared/DirectoryTable";
import { useGetJourneys, useDeleteJourney, useUpdateJourneyOrder, useToggleJourneyActive } from "@/feature/journey/api/useJourney";
import { getJourneys } from "@/feature/journey/api";
import { useGetCurrentUser } from "@/feature/auth/api/useAuth";
import { confirmToast } from "@/components/shared/tost";
import type { Journey } from "@/feature/journey/type";
import { getCities } from "@/feature/city/api";
import { getStates } from "@/feature/state/api";
import { getCountries } from "@/feature/country/api";
import type { City } from "@/feature/city/type";
import type { State } from "@/feature/state/type";
import type { Country } from "@/feature/country/type";
import SeoPendingBadge, { SeoCompleteBadge, hasMissingSeo } from "@/components/shared/SeoPendingBadge";
import FilterBox from "@/components/shared/FilterBox";

export default function JourneyClient() {
  const [filterActive, setFilterActive] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [countryId, setCountryId] = useState<number | undefined>(undefined);
  const [stateId, setStateId] = useState<number | undefined>(undefined);
  const [cityId, setCityId] = useState<number | undefined>(undefined);
  
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  React.useEffect(() => {
    getCountries({ limit: 1000 }).then((res) => setCountries(res.data)).catch(() => { });
  }, []);

  React.useEffect(() => {
    getStates({ limit: 1000, countryId: countryId ? String(countryId) : undefined }).then((res) => setStates(res.data)).catch(() => { });
  }, [countryId]);

  React.useEffect(() => {
    getCities({ limit: 1000, stateId: stateId ? String(stateId) : undefined }).then((res) => setCities(res.data)).catch(() => { });
  }, [stateId]);

  const { journeys, isLoading } = useGetJourneys({
    limit: 1000,
    search: debouncedSearch || undefined,
    cityId,
    stateId,
    countryId,
    isActive: filterActive || undefined,
  });
  const { deleteJourney, isPending: isDeleting } = useDeleteJourney();
  const { toggleJourneyActive, isPending: isToggling } = useToggleJourneyActive();
  const { updateJourneyOrder, isPending: isOrderSaving } = useUpdateJourneyOrder();
  const { user } = useGetCurrentUser();

  const [allJourneys, setAllJourneys] = useState<{ id: number; title: string; isActive?: boolean }[]>([]);
  const [orderedIds, setOrderedIds] = useState<number[]>([]);
  const [orderLoading, setOrderLoading] = useState(true);
  const initialOrderRef = React.useRef<number[]>([]);

  React.useEffect(() => {
    getJourneys({ limit: 1000 })
      .then((res) => {
        setAllJourneys(
          res.data.map((j) => {
            const daysText = j.duration
              ? j.duration
              : j.noDays
              ? `${j.noDays} ${j.noDays === 1 ? "Day" : "Days"}`
              : "";
            const titleWithDays = daysText ? `${j.title} · (${daysText})` : j.title;
            return { id: j.id, title: titleWithDays, isActive: j.isActive };
          })
        );
        const pinned = res.data
          .filter((j) => j.displayOrder && j.displayOrder > 0)
          .sort((a, b) => a.displayOrder! - b.displayOrder!)
          .map((j) => j.id);
        initialOrderRef.current = pinned;
        setOrderedIds(pinned);
        setOrderLoading(false);
      })
      .catch(() => setOrderLoading(false));
  }, []);

  const orderDirty = JSON.stringify(orderedIds) !== JSON.stringify(initialOrderRef.current);

  const handleToggle = (journey: Journey) => {
    toggleJourneyActive(journey.id);
  };

  const handleSaveOrder = () => {
    updateJourneyOrder(orderedIds, {
      onSuccess: () => {
        initialOrderRef.current = [...orderedIds];
      },
    });
  };

  const normalizedRole = (user?.role ?? "").toLowerCase().replace(/[\s-]+/g, "_");
  const isSuperAdmin = normalizedRole.includes("super") && normalizedRole.includes("admin");
  const isITTeam =
    user?.team?.name?.toLowerCase().includes("it") ||
    user?.team?.name?.toLowerCase().includes("maintenance");
  const canEdit = isSuperAdmin || isITTeam;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async (id: number, title: string) => {
    const confirmed = await confirmToast(`Are you sure you want to delete "${title}"?`);
    if (!confirmed) return;
    deleteJourney(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <PrivatePageHeading icon={Map} title="Journeys" description="Manage journeys and their details" />
        {canEdit && (
          <Link
            href="/dashboard/journey/create"
            className="btn-primary px-4 py-2.5 text-sm flex items-center gap-2"
          >
            <Plus size={16} /> Add Journey
          </Link>
        )}
      </div>

      <FilterBox
        search={{ value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search journeys..." }}
        selects={[
          {
            value: countryId || "",
            onChange: (e) => {
              setCountryId(e.target.value ? Number(e.target.value) : undefined);
              setStateId(undefined); // reset downstream
              setCityId(undefined);
              setSearch("");
            },
            options: countries.map((c) => ({ value: String(c.id), label: c.title })),
            placeholder: "All Countries",
          },
          {
            value: stateId || "",
            onChange: (e) => {
              setStateId(e.target.value ? Number(e.target.value) : undefined);
              setCityId(undefined);
              setSearch("");
            },
            options: states.map((s) => ({ value: String(s.id), label: s.title })),
            placeholder: "All States",
          },
          {
            value: cityId || "",
            onChange: (e) => {
              setCityId(e.target.value ? Number(e.target.value) : undefined);
              setSearch("");
            },
            options: cities.map((c) => ({ value: String(c.id), label: c.title })),
            placeholder: "All Cities",
          },
          {
            value: filterActive,
            onChange: (e) => setFilterActive(e.target.value),
            options: [
              { value: "true", label: "Active" },
              { value: "false", label: "Inactive" },
            ],
            placeholder: "Status (All)",
          },
        ]}
      />

      <DirectoryTableLayout
        showOrderAtTop={canEdit}
        orderOptions={allJourneys}
        orderSelectedIds={orderedIds}
        orderOnChange={setOrderedIds}
        orderLoading={orderLoading}
        orderLoadingText="Loading journeys..."
        orderPlaceholder="Select journeys to show at top"
        orderSearchPlaceholder="Search journeys..."
        orderSaving={isOrderSaving}
        orderOnSave={handleSaveOrder}
        orderDirty={orderDirty}
        orderColumns={2}
        isLoading={isLoading}
        isEmpty={journeys.length === 0}
        emptyIcon={Map}
        emptyMessage="No journeys found"
        emptyCreateLink="/dashboard/journey/create"
        emptyCreateLabel="Create your first journey"
        canEdit={canEdit}
      >
        <DirectoryTable
          data={journeys}
          columns={[
            {
              header: "Display Order",
              className: "tbl-th-center",
              cellClassName: "px-4 py-3 text-center",
              render: (journey) => (
                journey.displayOrder && journey.displayOrder > 0 ? (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold shadow-sm">
                    #{journey.displayOrder}
                  </span>
                ) : (
                  <span className="text-xs text-slate-300">-</span>
                )
              ),
            },
            {
              header: "Thumb",
              className: "tbl-th-center",
              cellClassName: "px-4 py-3 text-center",
              render: (journey) => (
                journey.thumbImg ? (
                  <img src={journey.thumbImg} alt="thumb" className="w-10 h-10 rounded object-cover border inline-block" />
                ) : (
                  <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 border inline-block">N/A</div>
                )
              ),
            },
            {
              header: "Title & Route",
              className: "tbl-th",
              cellClassName: "px-4 py-3 min-w-[220px]",
              render: (journey) => (
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-snug">{journey.title}</p>
                  {journey.destination && (
                    <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-normal">
                      <span className="text-slate-400 font-semibold">Route:</span> {journey.destination}
                    </p>
                  )}
                </div>
              ),
            },
            {
              header: "Covered Cities",
              className: "tbl-th",
              cellClassName: "px-4 py-3",
              render: (journey) => {
                const cities = journey.cities || [];
                if (cities.length === 0) return <span className="text-xs text-slate-400">-</span>;
                return (
                  <div className="flex flex-wrap items-center gap-1 max-w-[260px]">
                    {cities.slice(0, 3).map((c: any) => (
                      <span
                        key={c.id}
                        className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium border border-slate-200"
                        title={c.state?.title ? `${c.title} (${c.state.title})` : c.title}
                      >
                        {c.title}
                      </span>
                    ))}
                    {cities.length > 3 && (
                      <span
                        className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md font-bold border border-amber-200"
                        title={cities.slice(3).map((c: any) => c.title).join(", ")}
                      >
                        +{cities.length - 3} more
                      </span>
                    )}
                  </div>
                );
              },
            },
            {
              header: "States",
              className: "tbl-th",
              cellClassName: "px-4 py-3",
              render: (journey) => {
                const stateTitles = Array.from(
                  new Set(
                    (journey.cities || [])
                      .map((c: any) => c.state?.title)
                      .filter(Boolean)
                  )
                );
                if (stateTitles.length === 0) return <span className="text-xs text-slate-400">-</span>;
                return (
                  <div className="flex flex-wrap items-center gap-1">
                    {stateTitles.map((st: any) => (
                      <span
                        key={st}
                        className="text-[11px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded-full font-medium border border-teal-200/80 whitespace-nowrap"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                );
              },
            },
            {
              header: "Days",
              className: "tbl-th-center",
              cellClassName: "px-4 py-3 text-center",
              render: (journey) => (
                <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-bold">
                  {journey.noDays}D
                </span>
              ),
            },
            {
              header: "SEO Status",
              className: "tbl-th-center",
              cellClassName: "px-4 py-3 text-center",
              render: (journey) => hasMissingSeo(journey) ? <SeoPendingBadge /> : <SeoCompleteBadge />,
            },
            {
              header: "Active",
              className: "tbl-th-center",
              cellClassName: "px-4 py-3 text-center",
              render: (journey) => (
                canEdit ? (
                  <button
                    onClick={() => handleToggle(journey)}
                    disabled={isToggling}
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title={journey.isActive ? "Click to disable" : "Click to enable"}
                  >
                    <span className={`relative inline-flex h-4.5 w-8 items-center rounded-full transition-colors ${journey.isActive ? "bg-green-500" : "bg-gray-300"}`}>
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${journey.isActive ? "translate-x-4" : "translate-x-0.5"}`} />
                    </span>
                    <span className={journey.isActive ? "text-green-600" : "text-gray-400"}>
                      {journey.isActive ? "Active" : "Inactive"}
                    </span>
                  </button>
                ) : (
                  <span className={journey.isActive ? "text-green-600" : "text-gray-400"}>
                    {journey.isActive ? "Active" : "Inactive"}
                  </span>
                )
              ),
            },
            {
              header: "Actions",
              className: "tbl-th-center",
              cellClassName: "px-4 py-3",
              render: (journey) => (
                <div className="flex items-center justify-center gap-1">
                  <Link href={`/tour-packages/${journey.slug}`} target="_blank" className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors" title="View Public Page">
                    <Eye size={14} />
                  </Link>
                  {canEdit && (
                    <>
                      <Link href={`/dashboard/journey/${journey.id}`} className="p-1.5 rounded-lg hover:bg-brand-50 text-gray-400 hover:text-brand-600 transition-colors" title="Edit">
                        <Pencil size={14} />
                      </Link>
                      <button onClick={() => handleDelete(journey.id, journey.title)} disabled={isDeleting} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              ),
            },
          ]}
        />
      </DirectoryTableLayout>
    </div>
  );
}
