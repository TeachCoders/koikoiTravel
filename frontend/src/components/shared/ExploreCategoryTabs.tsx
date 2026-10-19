"use client";

import React from "react";
import { MapPin, Sparkles, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CategoryOption {
  label: string;
  value: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface ExploreCategoryTabsProps {
  destinations: CategoryOption[];
  themes: CategoryOption[];
  activeTab: "destination" | "theme";
  onTabChange: (tab: "destination" | "theme") => void;
  selectedDestination: string | null;
  onSelectDestination: (value: string | null) => void;
  selectedTheme: string | null;
  onSelectTheme: (value: string | null) => void;
  totalToursCount?: number;
  className?: string;
}

export default function ExploreCategoryTabs({
  destinations,
  themes,
  activeTab,
  onTabChange,
  selectedDestination,
  onSelectDestination,
  selectedTheme,
  onSelectTheme,
  totalToursCount,
  className,
}: ExploreCategoryTabsProps) {
  const isDestActive = activeTab === "destination";
  const activeItems = isDestActive ? destinations : themes;
  const selectedValue = isDestActive ? selectedDestination : selectedTheme;
  const onSelect = isDestActive ? onSelectDestination : onSelectTheme;

  return (
    <div
      className={cn(
        "bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs mb-6 transition-all",
        className
      )}
    >
      {/* ===== HEADER: TWO MAIN CATEGORY TABS ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5 mb-3.5">
        <div className="flex items-center gap-2">
          {/* TAB 1: BY DESTINATION */}
          <button
            type="button"
            onClick={() => onTabChange("destination")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap",
              isDestActive
                ? "bg-[#2E8B8B] text-white shadow-md shadow-[#2E8B8B]/25"
                : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
            )}
          >
            <MapPin size={15} className={isDestActive ? "text-white" : "text-[#2E8B8B]"} />
            <span>By Destination</span>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[11px] font-extrabold tabular-nums",
                isDestActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
              )}
            >
              {destinations.length}
            </span>
          </button>

          {/* TAB 2: BY THEME / ACTIVITY */}
          <button
            type="button"
            onClick={() => onTabChange("theme")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap",
              !isDestActive
                ? "bg-[#F8904D] text-white shadow-md shadow-[#F8904D]/25"
                : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
            )}
          >
            <Sparkles size={15} className={!isDestActive ? "text-white" : "text-[#F8904D]"} />
            <span>By Theme & Activity</span>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[11px] font-extrabold tabular-nums",
                !isDestActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
              )}
            >
              {themes.length}
            </span>
          </button>
        </div>

        {/* ACTIVE FILTER SUMMARY OR RESET BUTTON */}
        {(selectedDestination || selectedTheme) && (
          <button
            type="button"
            onClick={() => {
              onSelectDestination(null);
              onSelectTheme(null);
            }}
            className="text-xs font-semibold text-slate-500 hover:text-rose-600 inline-flex items-center gap-1 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <X size={13} />
            <span>Clear selection</span>
          </button>
        )}
      </div>

      {/* ===== PILLS LIST UNDER CURRENT TAB ===== */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-200">
        {/* ALL OPTION */}
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={cn(
            "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border",
            selectedValue === null
              ? isDestActive
                ? "bg-[#2E8B8B]/10 border-[#2E8B8B] text-[#2E8B8B]"
                : "bg-[#F8904D]/10 border-[#F8904D] text-[#F8904D]"
              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300"
          )}
        >
          {selectedValue === null && <Check size={13} />}
          <span>{isDestActive ? "All Destinations" : "All Themes"}</span>
          {typeof totalToursCount === "number" && (
            <span className="text-[10px] font-semibold opacity-75 tabular-nums">
              ({totalToursCount})
            </span>
          )}
        </button>

        {/* INDIVIDUAL PILLS */}
        {activeItems.map((item) => {
          const isSelected = selectedValue === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onSelect(isSelected ? null : item.value)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border",
                isSelected
                  ? isDestActive
                    ? "bg-[#2E8B8B] border-[#2E8B8B] text-white shadow-xs"
                    : "bg-[#F8904D] border-[#F8904D] text-white shadow-xs"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300"
              )}
            >
              {isSelected ? (
                <Check size={13} />
              ) : (
                item.icon || (isDestActive ? <MapPin size={12} className="text-[#2E8B8B]" /> : <Sparkles size={12} className="text-[#F8904D]" />)
              )}
              <span>{item.label}</span>
              {typeof item.count === "number" && (
                <span
                  className={cn(
                    "text-[10px] font-extrabold px-1.5 py-0.2 rounded-full tabular-nums",
                    isSelected
                      ? "bg-white/25 text-white"
                      : "bg-slate-200/80 text-slate-600"
                  )}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
