"use client";

import { useState } from "react";
import {
  GripVertical,
  X,
  Heart,
  Users,
  TreePine,
  Church,
  Sparkles,
  Landmark,
  Building,
  Mountain,
  Waves,
  Camera,
  UtensilsCrossed,
  ShoppingBag,
  Baby,
  Castle,
  Compass,
} from "lucide-react";
import type { ReactNode } from "react";

// Custom SVG Icons


export function travelExperienceIcon(title: string, customClass: string = "w-3 h-3"): ReactNode {
  const lower = (title || "").toLowerCase();
  const p = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: customClass,
  };

  // 1. Honeymoon & Romantic
  if (lower.includes("honeymoon") || lower.includes("romantic") || lower.includes("couple")) {
    return (
      <svg {...p}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        <path d="M12 7.5c.6-1 1.6-1.5 2.7-1.5" strokeWidth="1.4" />
      </svg>
    );
  }

  // 2. Wildlife & Safari
  if (lower.includes("wildlife") || lower.includes("safari") || lower.includes("jungle") || lower.includes("tiger") || lower.includes("national park")) {
    return (
      <svg {...p}>
        {/* Paw print & safari contour */}
        <ellipse cx="12" cy="15" rx="4" ry="3.5" />
        <circle cx="6.5" cy="10.5" r="2" />
        <circle cx="17.5" cy="10.5" r="2" />
        <circle cx="9" cy="6" r="1.8" />
        <circle cx="15" cy="6" r="1.8" />
      </svg>
    );
  }

  // 3. Taj Mahal
  if (lower.includes("taj") || lower.includes("taj mahal") || lower.includes("agra monument")) {
    return (
      <svg {...p}>
        {/* Taj central onion dome & minarets */}
        <path d="M3 21h18" />
        <path d="M4 21V7l1-2 1 2v14" />
        <path d="M18 21V7l1-2 1 2v14" />
        <path d="M7 21v-8a5 5 0 0 1 10 0v8" />
        <path d="M12 3v3m-3.5 7c0-2.5 1.5-4.5 3.5-5 2 .5 3.5 2.5 3.5 5" />
        <path d="M10 21v-4a2 2 0 0 1 4 0v4" />
      </svg>
    );
  }

  // 4. Heritage & Culture / Royal Palaces / Forts
  if (lower.includes("heritage") || lower.includes("culture") || lower.includes("fort") || lower.includes("palace") || lower.includes("royal")) {
    return (
      <svg {...p}>
        {/* Fort battlements & palace dome */}
        <path d="M3 21h18" />
        <path d="M4 21V9l2-2 2 2v12" />
        <path d="M16 21V9l2-2 2 2v12" />
        <path d="M8 21v-6h8v6" />
        <path d="M8 11h8" />
        <path d="M12 3l3 4H9l3-4z" />
        <path d="M10 21v-3a2 2 0 0 1 4 0v3" />
      </svg>
    );
  }

  // 5. Hill Station & Mountains / Trekking
  if (lower.includes("hill") || lower.includes("mountain") || lower.includes("trek") || lower.includes("snow") || lower.includes("himalay")) {
    return (
      <svg {...p}>
        {/* Mountain peaks with snow cap */}
        <path d="M2 20l7.5-13 4 7 2.5-4L22 20H2z" />
        <path d="M6.5 12.5l3 2 3-2.5" strokeWidth="1.4" />
        <path d="M15 14l2 1.5 2.5-2" strokeWidth="1.4" />
      </svg>
    );
  }

  // 6. Spiritual & Pilgrimage / Temples / Ghats
  if (lower.includes("spiritual") || lower.includes("pilgrimage") || lower.includes("temple") || lower.includes("religious") || lower.includes("kashi") || lower.includes("varanasi")) {
    return (
      <svg {...p}>
        {/* Sacred Temple Mandir Shikhara with Kalash flag */}
        <path d="M3 21h18" />
        <path d="M5 21v-7l7-9 7 9v7" />
        <path d="M12 5V2l3 2-3 1" />
        <path d="M9 21v-5a3 3 0 0 1 6 0v5" />
        <path d="M9 13h6" strokeWidth="1.4" />
      </svg>
    );
  }

  // 7. Beach & Lake / Coastal / Houseboat
  if (lower.includes("beach") || lower.includes("lake") || lower.includes("coast") || lower.includes("island") || lower.includes("backwater") || lower.includes("goa") || lower.includes("andaman")) {
    return (
      <svg {...p}>
        {/* Palm tree & sun & ocean waves */}
        <path d="M13 8c0-3.3-2.7-6-6-6 0 3.3 2.7 6 6 6z" />
        <path d="M13 8c3.3 0 6-2.7 6-6-3.3 0-6 2.7-6 6z" />
        <path d="M13 8c-2 2-3 5-2 9" />
        <path d="M2 19c2.5-1.5 5.5-1.5 8 0 2.5 1.5 5.5 1.5 8 0 1.5-.9 3-.9 4 0" />
        <path d="M2 22c2.5-1.5 5.5-1.5 8 0 2.5 1.5 5.5 1.5 8 0 1.5-.9 3-.9 4 0" />
      </svg>
    );
  }

  // 8. Desert Safari / Dunes / Camel
  if (lower.includes("desert") || lower.includes("dune") || lower.includes("camel") || lower.includes("jaisalmer") || lower.includes("thar")) {
    return (
      <svg {...p}>
        {/* Desert dunes & blazing sun */}
        <circle cx="17" cy="7" r="3" />
        <path d="M2 19c4-4 8-4 12 0 3-2 6-2 8 0" />
        <path d="M2 22h20" />
        <path d="M6 14c2-2 4-2 6 1" strokeWidth="1.4" />
      </svg>
    );
  }

  // 9. Ayurveda & Yoga / Wellness
  if (lower.includes("ayurveda") || lower.includes("yoga") || lower.includes("wellness") || lower.includes("meditation") || lower.includes("spa")) {
    return (
      <svg {...p}>
        {/* Blooming Sacred Lotus Flower */}
        <path d="M12 4c1.5 3 2.5 6 0 10-2.5-4-1.5-7 0-10z" />
        <path d="M12 14c-3-1-6-4-7-8 3.5 1 6.5 4 7 8z" />
        <path d="M12 14c3-1 6-4 7-8-3.5 1-6.5 4-7 8z" />
        <path d="M4 17c3.5 1.5 12.5 1.5 16 0" />
        <path d="M7 20c2.5 1 7.5 1 10 0" />
      </svg>
    );
  }

  // 10. Golden Triangle
  if (lower.includes("golden") || lower.includes("triangle")) {
    return (
      <svg {...p}>
        {/* Golden Triangle connecting Delhi - Agra - Jaipur */}
        <polygon points="12 3 22 20 2 20" strokeWidth="1.8" />
        <circle cx="12" cy="7" r="1.5" fill="currentColor" />
        <circle cx="18" cy="17" r="1.5" fill="currentColor" />
        <circle cx="6" cy="17" r="1.5" fill="currentColor" />
        <path d="M12 8.5L17 15.5H7L12 8.5Z" strokeWidth="1" strokeDasharray="1.5 1.5" />
      </svg>
    );
  }

  // 11. Family Holidays
  if (lower.includes("family") || lower.includes("group") || lower.includes("kid") || lower.includes("generation")) {
    return (
      <svg {...p}>
        {/* Family: Adult + Child figures under unified bond */}
        <circle cx="8" cy="7" r="2.5" />
        <circle cx="16" cy="7" r="2.5" />
        <path d="M3.5 19c0-3 2-5 4.5-5s4.5 2 4.5 5" />
        <path d="M11.5 19c0-3 2-5 4.5-5s4.5 2 4.5 5" />
        <circle cx="12" cy="11.5" r="1.8" />
        <path d="M9.5 20c0-1.8 1.1-3 2.5-3s2.5 1.2 2.5 3" />
      </svg>
    );
  }

  // 12. Weekend Tours & Getaways / Road Trips
  if (lower.includes("weekend") || lower.includes("short break") || lower.includes("road trip") || lower.includes("getaway") || lower.includes("escape")) {
    return (
      <svg {...p}>
        {/* Weekend suitcase / compass dial / trail */}
        <rect x="4" y="7" width="16" height="13" rx="2" />
        <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
        <line x1="10" y1="11" x2="10" y2="16" strokeWidth="1.4" />
        <line x1="14" y1="11" x2="14" y2="16" strokeWidth="1.4" />
        <circle cx="18" cy="4" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  // Default Fallback: Compass Star
  return (
    <svg {...p}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

interface TravelExperiencePillsProps {
  items: { id?: number; title: string }[];
  onRemove?: (id: number) => void;
  max?: number;
  onReorder?: (fromId: number, toId: number) => void;
}

export default function TravelExperiencePills({
  items,
  onRemove,
  max = 6,
  onReorder,
}: TravelExperiencePillsProps) {
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  if (!items.length) return null;
  const visible = items.slice(0, max);
  const extra = items.length - visible.length;

  const move = (fromIdx: number, toIdx: number) => {
    if (!onReorder || fromIdx === toIdx) return;
    const from = visible[fromIdx];
    const to = visible[toIdx];
    if (from?.id === undefined || to?.id === undefined) return;
    onReorder(from.id, to.id);
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((item, idx) => (
        <span
          key={item.id ?? item.title}
          onDragOver={(e) => {
            if (onReorder && dragIdx !== null) e.preventDefault();
          }}
          onDrop={() => {
            if (dragIdx !== null) {
              move(dragIdx, idx);
              setDragIdx(null);
            }
          }}
          className={`inline-flex items-center gap-1 rounded-full bg-[#2E8B8B] text-white text-xs font-semibold px-2.5 py-1 ${
            dragIdx === idx ? "opacity-50" : ""
          }`}
        >
          {onReorder && item.id !== undefined && (
            <span
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", String(item.id));
                setDragIdx(idx);
              }}
              onDragEnd={() => setDragIdx(null)}
              title="Drag to reorder"
              className="shrink-0 flex items-center justify-center cursor-grab text-white/70 hover:text-white active:cursor-grabbing"
            >
              <GripVertical size={11} />
            </span>
          )}
          <span className="shrink-0">{idx + 1}.</span>
          {travelExperienceIcon(item.title)}
          <span className="truncate">{item.title}</span>
          {onRemove && item.id !== undefined && (
            <button
              type="button"
              onClick={() => onRemove(item.id!)}
              className="ml-0.5 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label={`Remove ${item.title}`}
            >
              <X size={12} />
            </button>
          )}
        </span>
      ))}
      {extra > 0 && (
        <span className="inline-flex items-center rounded-full bg-[#2E8B8B]/80 text-white text-xs font-semibold px-2.5 py-1">
          +{extra}
        </span>
      )}
    </div>
  );
}
