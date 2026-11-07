"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CapsuleTabItem<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export type CapsuleTabsVariant =
  | "warm"      // Peach/Warm track (#F3CDB0) with black active capsule (Home page default)
  | "neutral"   // Clean slate track with white active capsule
  | "brand"     // Soft brand-orange tint with vibrant #F8904D active capsule
  | "dark"      // Charcoal track with crisp white active capsule
  | "outline";  // White bordered track with dark active capsule

export interface CapsuleTabsProps<T extends string = string> {
  tabs: CapsuleTabItem<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  variant?: CapsuleTabsVariant;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
  fullWidth?: boolean;
  className?: string;
  trackClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

/**
 * CapsuleTabs (Universal Reusable Segmented Pill / Capsule Tab Component)
 * 
 * Default Behavior (Matching Home Page):
 * - Centered horizontally
 * - Warm peach background track: bg-[#F3CDB0]
 * - Solid black active capsule: bg-black text-white
 * - Hover on inactive: text-slate-900 hover:text-black hover:bg-black/5
 */
export function CapsuleTabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  variant = "warm",
  size = "md",
  align = "center",
  fullWidth = false,
  className,
  trackClassName,
  activeClassName,
  inactiveClassName,
}: CapsuleTabsProps<T>) {
  // Sizing definitions
  const sizeClasses = {
    sm: "px-3.5 py-1 text-xs gap-1.5",
    md: "px-5 sm:px-6 py-2 text-xs sm:text-sm gap-2",
    lg: "px-6 sm:px-8 py-2.5 text-sm sm:text-base gap-2.5",
  };

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-4.5 w-4.5",
  };

  // Variant themes - "warm" is the default matching the home page
  const variantStyles: Record<
    CapsuleTabsVariant,
    { track: string; active: string; inactive: string; badgeActive: string; badgeInactive: string }
  > = {
    warm: {
      track: "bg-[#F3CDB0] p-1 sm:p-1.5",
      active: "bg-black text-white shadow-xs",
      inactive: "text-slate-900 hover:text-black hover:bg-black/5",
      badgeActive: "bg-white/20 text-white",
      badgeInactive: "bg-black/10 text-slate-800",
    },
    neutral: {
      track: "bg-slate-100 p-1 sm:p-1.5 border border-slate-200/80",
      active: "bg-white text-slate-900 shadow-sm",
      inactive: "text-slate-600 hover:text-slate-900 hover:bg-white/50",
      badgeActive: "bg-[#F8904D] text-white",
      badgeInactive: "bg-slate-200 text-slate-700",
    },
    brand: {
      track: "bg-orange-50/80 p-1 sm:p-1.5 border border-orange-200/70",
      active: "bg-[#F8904D] text-white shadow-sm shadow-[#F8904D]/30",
      inactive: "text-slate-700 hover:text-[#F8904D] hover:bg-white",
      badgeActive: "bg-white text-[#F8904D]",
      badgeInactive: "bg-orange-200/60 text-slate-800",
    },
    dark: {
      track: "bg-slate-900 p-1 sm:p-1.5 border border-slate-800",
      active: "bg-white text-slate-900 shadow-xs",
      inactive: "text-slate-400 hover:text-white hover:bg-white/10",
      badgeActive: "bg-slate-900 text-white",
      badgeInactive: "bg-white/10 text-slate-300",
    },
    outline: {
      track: "bg-white p-1 sm:p-1.5 border border-slate-300 shadow-2xs",
      active: "bg-slate-900 text-white shadow-xs",
      inactive: "text-slate-700 hover:text-slate-900 hover:bg-slate-50",
      badgeActive: "bg-white/20 text-white",
      badgeInactive: "bg-slate-100 text-slate-700",
    },
  };

  const currentTheme = variantStyles[variant];

  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div
      className={cn(
        "flex w-full overflow-x-auto no-scrollbar py-1",
        alignClasses[align],
        className
      )}
    >
      <div
        role="tablist"
        aria-label="Filter selection"
        className={cn(
          "inline-flex items-center rounded-full select-none max-w-full shrink-0",
          fullWidth && "w-full justify-between",
          currentTheme.track,
          trackClassName
        )}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              disabled={tab.disabled}
              aria-selected={isActive}
              onClick={() => !tab.disabled && onChange(tab.id)}
              className={cn(
                "rounded-full font-semibold transition-all duration-200 cursor-pointer inline-flex items-center whitespace-nowrap",
                fullWidth && "flex-1 justify-center",
                tab.disabled && "opacity-40 cursor-not-allowed pointer-events-none",
                sizeClasses[size],
                isActive
                  ? cn(currentTheme.active, activeClassName)
                  : cn(currentTheme.inactive, inactiveClassName)
              )}
            >
              {tab.icon && (
                <span className={cn("shrink-0", iconSizes[size])}>
                  {tab.icon}
                </span>
              )}

              <span>{tab.label}</span>

              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight shrink-0",
                    isActive ? currentTheme.badgeActive : currentTheme.badgeInactive
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CapsuleTabs;
