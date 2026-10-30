"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface ShadcnSelectItem {
  label: string;
  value: string;
  sublabel?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

export interface ShadcnSelectProps {
  items: ShadcnSelectItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  clearable?: boolean;
}

export default function ShadcnSelect({
  items,
  value,
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  icon: Icon,
  searchable = true,
  disabled = false,
  className = "",
  label,
  clearable = false,
}: ShadcnSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when popover opens
  useEffect(() => {
    if (open && searchable) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [open, searchable]);

  const selectedItem = useMemo(() => {
    return items.find((item) => item.value === value);
  }, [items, value]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        (item.sublabel && item.sublabel.toLowerCase().includes(q)) ||
        item.value.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div className={cn("space-y-1.5 w-full", className)}>
      {label && (
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <button
            type="button"
            className={cn(
              "flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-left shadow-xs transition-all",
              "hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2E8B8B] focus:border-[#2E8B8B]",
              disabled && "opacity-50 cursor-not-allowed bg-slate-50",
              open && "ring-2 ring-[#2E8B8B] border-[#2E8B8B]"
            )}
          >
            <div className="flex items-center gap-2.5 truncate flex-1 mr-2">
              {Icon && <Icon size={16} className="text-[#2E8B8B] shrink-0" />}
              {selectedItem?.icon && <selectedItem.icon size={16} className="text-slate-500 shrink-0" />}
              <span className={cn("truncate font-medium", !selectedItem ? "text-slate-400" : "text-slate-800")}>
                {selectedItem ? selectedItem.label : placeholder}
              </span>
              {selectedItem?.sublabel && (
                <span className="text-xs text-slate-400 truncate hidden sm:inline">
                  ({selectedItem.sublabel})
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0 text-slate-400">
              {clearable && selectedItem && !disabled && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange("");
                  }}
                  className="p-1 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                  title="Clear selection"
                >
                  <X size={13} />
                </span>
              )}
              <ChevronDown size={16} className={cn("transition-transform duration-200", open && "rotate-180")} />
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={6}
          className="w-[var(--radix-popover-trigger-width)] min-w-[280px] max-w-[480px] p-0 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden z-[150]"
        >
          {/* Search Box */}
          {searchable && (
            <div className="p-2.5 border-b border-slate-100 bg-slate-50/70">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#2E8B8B]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5">
            {filteredItems.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                No results found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              filteredItems.map((item) => {
                const isSelected = item.value === value;
                const ItemIcon = item.icon;
                return (
                  <button
                    type="button"
                    key={item.value}
                    onClick={() => {
                      onChange(item.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors text-left",
                      isSelected
                        ? "bg-[#2E8B8B]/10 text-[#2E8B8B] font-bold"
                        : "text-slate-700 hover:bg-slate-100 font-medium"
                    )}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      {ItemIcon && <ItemIcon size={14} className={isSelected ? "text-[#2E8B8B]" : "text-slate-400"} />}
                      <span className="truncate">{item.label}</span>
                      {item.sublabel && (
                        <span className="text-[11px] text-slate-400 truncate font-normal">
                          ({item.sublabel})
                        </span>
                      )}
                    </div>
                    {isSelected && <Check size={14} className="text-[#2E8B8B] shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

