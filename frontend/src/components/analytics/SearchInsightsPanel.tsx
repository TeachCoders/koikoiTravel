"use client";

import { useMemo } from "react";
import { Globe, Search, MousePointerClick, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAnalyticsRange } from "@/feature/analytics/range-context";
import {
  useGscStatus,
  useGscPerformance,
  useTrafficSources,
  useSearchIntents,
} from "@/feature/analytics/api/useAnalytics";
import Panel from "./Panel";
import ExportMenu from "./ExportMenu";
import { percentOf } from "./chartUtils";

function fmtPct(v: number) {
  return `${(v * 100).toFixed(1)}%`;
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
      <div className="text-xl font-bold text-slate-900">{value}</div>
      <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</div>
    </div>
  );
}

export default function SearchInsightsPanel() {
  const { range } = useAnalyticsRange();
  const { status } = useGscStatus();
  const connected = Boolean(status?.connected);

  const gscQuery = useGscPerformance(range, "query", connected);
  const sourcesQuery = useTrafficSources(range);
  const intentsQuery = useSearchIntents(range);

  const gscRows = useMemo(() => gscQuery.data?.rows ?? [], [gscQuery.data]);
  const organicKeywords = useMemo(() => sourcesQuery.data?.keywords ?? [], [sourcesQuery.data]);
  const organicTotal = useMemo(
    () => organicKeywords.reduce((s, k) => s + k.count, 0),
    [organicKeywords]
  );
  const intentRows = useMemo(() => {
    const d = intentsQuery.data;
    return d?.topQueries ?? [];
  }, [intentsQuery.data]);
  const intentTotal = intentsQuery.data?.totalIntents ?? 0;

  const gscClicks = useMemo(() => gscRows.reduce((s, r) => s + r.clicks, 0), [gscRows]);
  const totalSignals = organicTotal + intentTotal;

  const waiting =
    (sourcesQuery.isLoading || intentsQuery.isLoading) &&
    organicTotal === 0 &&
    intentTotal === 0;

  if (waiting) {
    return <div className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white p-6" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="h-5 w-5 text-indigo-500" />
            <div>
              <h2 className="text-base font-bold text-slate-900">Search Insights</h2>
              <p className="text-sm text-slate-500">
                Ek hi screen par — Google queries, organic keywords aur internal searches, taki actual tourist intent dikhe.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatChip label="GSC clicks" value={connected ? gscClicks.toLocaleString() : "—"} />
            <StatChip label="Organic searches" value={organicTotal.toLocaleString()} />
            <StatChip label="Site searches" value={intentTotal.toLocaleString()} />
          </div>
        </div>
      </div>

      {/* 1. Google Search Console queries */}
      <Panel
        title="Google Search Queries (GSC)"
        subtitle={
          connected
            ? "Users ne Google par kya search karke aapka page dekha / khula"
            : "Google ke asli queries ke liye Google Search Console connect karein"
        }
        actions={
          connected ? (
            <ExportMenu
              title="Google Search Queries"
              columns={["query", "clicks", "impressions", "ctr", "position"]}
              rows={gscRows.map((r) => ({
                query: r.keys[0],
                clicks: r.clicks,
                impressions: r.impressions,
                ctr: fmtPct(r.ctr),
                position: r.position?.toFixed(1) ?? "—",
              }))}
            />
          ) : undefined
        }
      >
        {!connected ? (
          <div className="flex flex-col items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center">
            <Globe className="h-5 w-5 shrink-0 text-amber-600" />
            <div className="flex-1 text-sm text-amber-800">
              <p className="font-semibold">Google Search Console abhi connected nahi hai.</p>
              <p className="mt-0.5 text-amber-700">
                Connect karne ke baad yahan Google ke real search queries (clicks, impressions, CTR, position) dikhenge.
              </p>
            </div>
            <Link
              href="/dashboard/analytics/search-console"
              className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-amber-700"
            >
              Connect karein
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : gscQuery.isError ? (
          <p className="text-sm text-red-600">
            GSC se data laane me error — dobara connect karne ke liye Search Console tab kholen.
          </p>
        ) : gscRows.length === 0 ? (
          <p className="py-6 text-center text-sm italic text-slate-400">Is range me koi search data nahi.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-800 text-xs uppercase tracking-wider text-white">
                  <th className="rounded-tl-lg px-5 py-2.5 font-medium">Google Query</th>
                  <th className="px-5 py-2.5 text-right font-medium">Clicks</th>
                  <th className="px-5 py-2.5 text-right font-medium">Impressions</th>
                  <th className="px-5 py-2.5 text-right font-medium">CTR</th>
                  <th className="rounded-tr-lg px-5 py-2.5 text-right font-medium">Position</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {gscRows.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="max-w-[22rem] break-words px-5 py-2.5 font-medium text-slate-800" title={r.keys[0]}>
                      {r.keys[0]}
                    </td>
                    <td className="whitespace-nowrap px-5 py-2.5 text-right tabular-nums text-slate-600">{r.clicks}</td>
                    <td className="whitespace-nowrap px-5 py-2.5 text-right tabular-nums text-slate-600">{r.impressions}</td>
                    <td className="whitespace-nowrap px-5 py-2.5 text-right tabular-nums text-slate-600">{fmtPct(r.ctr)}</td>
                    <td className="whitespace-nowrap px-5 py-2.5 text-right tabular-nums text-slate-600">
                      {r.position?.toFixed(1) ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {/* 2. Organic search keywords (referrer) */}
      <Panel
        title="Organic Search Keywords (Referrer)"
        subtitle="Bing / Yahoo / Yandex / DuckDuckGo se aaye users ka asli search query (Google ka yahan nahi aata — upar GSC dekhen)"
        actions={
          organicKeywords.length > 0 ? (
            <ExportMenu
              title="Organic Search Keywords"
              columns={["keyword", "count"]}
              rows={organicKeywords.map((k) => ({ keyword: k.keyword, count: k.count }))}
            />
          ) : undefined
        }
      >
        {organicKeywords.length === 0 ? (
          <p className="py-6 text-center text-sm italic text-slate-400">
            Abhi koi organic keyword nahi. Ye tab aayenge jab Bing/Yahoo/Yandex se visitors aayenge.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-800 text-xs uppercase tracking-wider text-white">
                  <th className="rounded-tl-lg px-5 py-2.5 font-medium">Keyword</th>
                  <th className="px-5 py-2.5 text-right font-medium">Visits</th>
                  <th className="rounded-tr-lg px-5 py-2.5 text-right font-medium">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {organicKeywords.map((k, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="max-w-[22rem] break-words px-5 py-2.5 font-medium text-slate-800" title={k.keyword}>
                      <span className="inline-flex items-center gap-2">
                        <Search className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        {k.keyword}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-2.5 text-right tabular-nums text-slate-600">{k.count}</td>
                    <td className="whitespace-nowrap px-5 py-2.5 text-right tabular-nums text-slate-600">
                      <span className="inline-flex min-w-[3.5rem] justify-end font-semibold text-slate-700">
                        {percentOf(k.count, organicTotal)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {/* 3. Internal search intents */}
      <Panel
        title="Internal Site Searches"
        subtitle="Visitor aapki website ke andar kya search kar rahe hain"
        actions={
          intentRows.length > 0 ? (
            <ExportMenu
              title="Internal Site Searches"
              columns={["query", "count"]}
              rows={intentRows.map((q) => ({ query: q.query, count: q.count }))}
            />
          ) : undefined
        }
      >
        {intentRows.length === 0 ? (
          <p className="py-6 text-center text-sm italic text-slate-400">Abhi koi internal search data nahi.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-800 text-xs uppercase tracking-wider text-white">
                  <th className="rounded-tl-lg px-5 py-2.5 font-medium">Search Query</th>
                  <th className="px-5 py-2.5 text-right font-medium">Searches</th>
                  <th className="rounded-tr-lg px-5 py-2.5 text-right font-medium">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {intentRows.map((q, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="max-w-[22rem] break-words px-5 py-2.5 font-medium text-slate-800" title={q.query}>
                      <span className="inline-flex items-center gap-2">
                        <MousePointerClick className="h-3.5 w-3.5 shrink-0 text-violet-500" />
                        {q.query || "—"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-2.5 text-right tabular-nums text-slate-600">{q.count}</td>
                    <td className="whitespace-nowrap px-5 py-2.5 text-right tabular-nums text-slate-600">
                      <span className="inline-flex min-w-[3.5rem] justify-end font-semibold text-slate-700">
                        {percentOf(q.count, intentTotal || totalSignals)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}