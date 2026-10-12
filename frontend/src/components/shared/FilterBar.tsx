"use client";

import { useState, useEffect, useMemo, type ReactNode } from "react";
import { Check, ChevronDown, X, SlidersHorizontal, Search } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterSection {
  id: string;
  title: string;
  /** Shorter label shown on mobile-only (e.g. "Season" instead of "Best Season / Month"). */
  shortTitle?: string;
  searchPlaceholder?: string;
  icon?: ReactNode;
  options: FilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
}

export default function FilterBar({
  sections,
  activeCount,
  onClearAll,
  resultCount,
  totalCount,
}: {
  sections: FilterSection[];
  activeCount: number;
  onClearAll: () => void;
  resultCount: number;
  totalCount: number;
}) {
  return (
    <div className="bg-white/95 border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-xs hover:shadow-sm transition-all flex items-center gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible md:gap-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
      <span className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100/90 border border-slate-200/60 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-700 shrink-0">
        <SlidersHorizontal size={13} className="text-[#2E8B8B]" />
        Filter Tours
      </span>

      {sections.map((s) => (
        <FilterSelect key={s.id} section={s} />
      ))}

      {activeCount > 0 && (
        <button
          type="button"
          onClick={onClearAll}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer shrink-0"
        >
          <X size={13} strokeWidth={2.5} /> Clear all ({activeCount})
        </button>
      )}

      <span className="ml-auto hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-600 shrink-0 shadow-2xs">
        <span className="font-extrabold text-[#2E8B8B] tabular-nums">{resultCount}</span>
        <span className="text-slate-400">
          of {totalCount} {totalCount === 1 ? "tour" : "tours"}
        </span>
      </span>
    </div>
  );
}

function FilterSelect({ section: s }: { section: FilterSection }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selectedCount = s.selected.length;

  useEffect(() => {
    if (!open) {
      setSearch("");
      return;
    }
    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  const filteredOptions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return s.options;
    return s.options.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [s.options, search]);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 shadow-2xs",
            selectedCount > 0
              ? "border-[#2E8B8B] bg-[#2E8B8B] text-white shadow-sm hover:bg-[#257272]"
              : "border-slate-200/90 bg-slate-50/80 hover:bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950"
          )}
        >
          <span className="flex items-center gap-2 min-w-0">
            <span className={selectedCount > 0 ? "text-white" : "text-slate-400"}>
              {s.icon}
            </span>
            <span className="sm:hidden truncate">
              {s.shortTitle ?? s.title}
            </span>
            <span className="hidden sm:inline truncate">{s.title}</span>
            {selectedCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-white text-[#F8904D] text-[10px] font-bold">
                {selectedCount}
              </span>
            )}
          </span>
          <ChevronDown
            size={15}
            className={cn(
              "transition-transform duration-200 shrink-0",
              open && "rotate-180",
              selectedCount > 0 ? "text-white" : "text-slate-400"
            )}
          />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={8}
          className="z-40 min-w-[280px] w-[420px] max-w-[calc(100vw_-_1.5rem)] rounded-2xl bg-white p-0 outline-none ring-1 ring-slate-200/70 shadow-xl border border-slate-100"
        >
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
            <span className="text-sm font-bold text-[#1C1C1C] flex items-center gap-2">
              <span className="text-slate-400">{s.icon}</span>
              {s.title}
            </span>
            {selectedCount > 0 && (
              <button
                type="button"
                onClick={() => s.onChange([])}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Clear ({selectedCount})
              </button>
            )}
          </div>

          {/* Search bar inside dropdown */}
          <div className="p-2 border-b border-slate-100 bg-slate-50/60">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={s.searchPlaceholder || `Search ${s.shortTitle ?? s.title}...`}
                className="w-full pl-8 pr-7 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#F8904D] focus:border-[#F8904D] placeholder:text-slate-400 text-slate-800 transition-colors"
                autoFocus
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                  title="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto p-2 space-y-0.5">
            {filteredOptions.length === 0 ? (
              <p className="text-xs text-slate-400 px-3 py-4 text-center">
                {s.options.length === 0 ? "No options available" : `No results for "${search}"`}
              </p>
            ) : (
              filteredOptions.map((opt) => {
                const checked = s.selected.includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    onClick={() => {
                      const next = checked
                        ? s.selected.filter((v) => v !== opt.value)
                        : [...s.selected, opt.value];
                      s.onChange(next);
                    }}
                    className={cn(
                      "flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-sm cursor-pointer transition-colors",
                      checked
                        ? "bg-slate-50 text-[#1C1C1C] font-semibold"
                        : "text-[#555] hover:bg-slate-50"
                    )}
                  >
                    <span className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span
                        className={cn(
                          "flex items-center justify-center w-[18px] h-[18px] rounded border transition-colors shrink-0",
                          checked ? "bg-[#F8904D] border-[#F8904D] text-white" : "border-slate-300"
                        )}
                      >
                        {checked && <Check size={11} strokeWidth={3.5} />}
                      </span>
                      <span className="text-sm font-medium leading-snug whitespace-normal">{opt.label}</span>
                    </span>
                    {opt.count !== undefined && (
                      <span className="text-[11px] font-semibold text-slate-400 tabular-nums shrink-0 ml-auto">
                        {opt.count}
                      </span>
                    )}
                  </label>
                );
              })
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
