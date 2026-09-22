"use client";

import { Eye, MousePointerClick, Zap, Ban, Link2Off, Timer, FileText } from "lucide-react";
import type { ActivityLogItem } from "@/feature/analytics/api";
import { eventLabel } from "@/feature/analytics/api";
import { cn } from "@/lib/utils";

interface ReplayActivityTimelineProps {
  activity: ActivityLogItem[];
}

function fmtTime(iso: string | null | undefined) {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function fmtDuration(ms: number | null | undefined) {
  if (ms === null || ms === undefined) return null;
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  return `${m}m ${s % 60}s`;
}

function summarize(activity: ActivityLogItem[]) {
  return activity.reduce(
    (acc, a) => {
      acc.total += 1;
      if (a.eventName === "CLICK") acc.clicks += 1;
      if (a.eventName === "RAGE_CLICK") acc.rage += 1;
      if (a.eventName === "DEAD_CLICK") acc.dead += 1;
      if (a.eventName === "PAGE_VIEW" || a.eventName === "PAGE_DWELL") acc.views += 1;
      return acc;
    },
    { total: 0, clicks: 0, rage: 0, dead: 0, views: 0 }
  );
}

function pageTrail(activity: ActivityLogItem[]) {
  const trail: string[] = [];
  for (const a of activity) {
    if (a.eventName !== "PAGE_VIEW") continue;
    const last = trail[trail.length - 1];
    if (last !== a.pagePath) trail.push(a.pagePath);
  }
  return trail;
}

function kindStyles(a: ActivityLogItem) {
  switch (a.eventName) {
    case "RAGE_CLICK":
      return { chip: "bg-rose-50 text-rose-700 ring-rose-200", icon: Zap, label: "Rage Click" };
    case "DEAD_CLICK":
      return { chip: "bg-amber-50 text-amber-700 ring-amber-200", icon: Ban, label: "Dead Click" };
    case "CLICK":
      return { chip: "bg-indigo-50 text-indigo-700 ring-indigo-200", icon: MousePointerClick, label: "Click" };
    case "BROKEN_LINK":
      return { chip: "bg-red-50 text-red-700 ring-red-200", icon: Link2Off, label: "Broken Link" };
    case "PAGE_VIEW":
      return { chip: "bg-sky-50 text-sky-700 ring-sky-200", icon: Eye, label: "Page Visit" };
    case "SECTION_DWELL":
      return { chip: "bg-emerald-50 text-emerald-700 ring-emerald-200", icon: Timer, label: "Section Time" };
    case "PAGE_DWELL":
      return { chip: "bg-slate-100 text-slate-600 ring-slate-200", icon: Timer, label: "Time on Page" };
    default:
      return { chip: "bg-slate-100 text-slate-600 ring-slate-200", icon: FileText, label: eventLabel(a.eventName) };
  }
}

function Row({ item }: { item: ActivityLogItem }) {
  const style = kindStyles(item);
  const Icon = style.icon;
  const duration = item.dwellTimeMs ? fmtDuration(item.dwellTimeMs) : null;
  const text = typeof item.metadata?.text === "string" ? item.metadata.text : null;

  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-1 ring-slate-200 bg-white">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold ring-1", style.chip)}>
            {style.label}
          </span>
          <span className="font-mono text-[10px] text-slate-400">{fmtTime(item.createdAt)}</span>
          {duration && <span className="text-[10px] text-slate-500">· {duration}</span>}
        </div>
        <p className="mt-0.5 truncate text-xs font-medium text-slate-700">
          {item.element ? (
            <span className="font-mono text-[11px] text-indigo-600">{item.element}</span>
          ) : (
            item.pagePath
          )}
        </p>
        {text && <p className="truncate text-[11px] text-slate-500">&quot;{text}&quot;</p>}
        <p className="truncate font-mono text-[10px] text-slate-400">{item.pagePath}</p>
      </div>
    </li>
  );
}

export default function ReplayActivityTimeline({ activity }: ReplayActivityTimelineProps) {
  if (!activity || activity.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-6 text-center text-xs text-slate-500">
        No detailed activity recorded for this session.
      </div>
    );
  }

  const counts = summarize(activity);
  const trail = pageTrail(activity);

  const chips: { label: string; value: number; className?: string }[] = [
    { label: "Events", value: counts.total },
    { label: "Clicks", value: counts.clicks, className: "text-indigo-700" },
    { label: "Rage", value: counts.rage, className: "text-rose-700" },
    { label: "Dead", value: counts.dead, className: "text-amber-700" },
    { label: "Page Visits", value: counts.views, className: "text-sky-700" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <span
            key={c.label}
            className="inline-flex items-baseline gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1"
          >
            <span className={cn("text-sm font-bold tabular-nums", c.className)}>{c.value}</span>
            <span className="text-[10px] font-medium text-slate-500">{c.label}</span>
          </span>
        ))}
      </div>

      {trail.length > 0 && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Page trail
          </p>
          <ol className="flex flex-wrap items-center gap-y-1 text-[11px] font-medium text-slate-700">
            {trail.map((p, i) => (
              <li key={`${p}-${i}`} className="flex items-center">
                {i > 0 && <span className="mx-1.5 text-slate-400">→</span>}
                <span className={cn("rounded px-1.5 py-0.5", i === trail.length - 1 ? "bg-sky-100 text-sky-800" : "bg-white ring-1 ring-slate-200")}>
                  {p}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div>
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Click path &amp; activity
        </p>
        <ul className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
          {activity.map((item, i) => (
            <Row key={i} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}