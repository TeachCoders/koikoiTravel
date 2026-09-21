"use client";

import { Button } from "@/components/ui/button";
import { useBrokenPages, useResolveNotFound } from "@/feature/analytics/api/useAnalytics";
import { useAnalyticsRange } from "@/feature/analytics/range-context";
import type { BrokenPage } from "@/feature/analytics/api";
import { Link2Off, CheckCircle2, ExternalLink, XCircle } from "lucide-react";

function fmtDate(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" });
}

export default function BrokenPagesPanel() {
  const { range } = useAnalyticsRange();
  const { pages, resolvedPaths, isLoading, error, refetch } = useBrokenPages(range);
  const resolve = useResolveNotFound();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-400 animate-pulse">
        Checking your pages for broken links…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        Failed to load broken pages: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {resolvedPaths.length > 0 && (
        <div className="flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Auto-resolved: {resolvedPaths.length} page(s) now load fine</p>
            <p className="mt-0.5 text-xs text-emerald-600">
              Tracked 404s for these paths were cleared automatically after a health check succeeded.
            </p>
          </div>
        </div>
      )}

      {pages.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          </div>
          <p className="text-sm font-semibold text-slate-700">No broken pages tracked 🎉</p>
          <p className="mt-1 text-xs text-slate-400">
            When a visitor lands on a 404 URL on the public site, it shows up here with the page that linked to it.
          </p>
        </div>
      )}

      {pages.map((p: BrokenPage) => (
        <section key={p.pagePath} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Link2Off className="h-4 w-4 shrink-0 text-rose-500" />
                <h3 className="break-all font-mono text-sm font-bold text-slate-800">{p.pagePath}</h3>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                <span className="font-bold text-rose-600">{p.hits}</span> hit{p.hits === 1 ? "" : "s"} ·{" "}
                <span className="font-semibold">{p.visitors}</span> visitor{p.visitors === 1 ? "" : "s"}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                title="Open URL in a new tab"
                onClick={() => window.open(p.pagePath, "_blank", "noopener,noreferrer")}
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={resolve.isPending}
                onClick={() => resolve.mutate(p.pagePath)}
              >
                <XCircle className="h-3.5 w-3.5" />
                Mark fixed
              </Button>
            </div>
          </div>

          {p.fromPages.length > 0 && (
            <div className="mt-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                Visitors came from
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.fromPages.map((f) => (
                  <span
                    key={`${p.pagePath}|${f.source}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                  >
                    <span className="font-mono">{f.source}</span>
                    <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-600">
                      {f.count}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {p.issues.length > 0 && (
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-100">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-3 py-2 font-bold">When</th>
                    <th className="px-3 py-2 font-bold">Clicked link</th>
                    <th className="px-3 py-2 font-bold">Visited from</th>
                    <th className="px-3 py-2 font-bold">Referrer</th>
                    <th className="px-3 py-2 font-bold">Session</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {p.issues.map((iss, i) => (
                    <tr key={i} className="hover:bg-slate-50/60">
                      <td className="whitespace-nowrap px-3 py-2 text-slate-500">{fmtDate(iss.createdAt)}</td>
                      <td className="max-w-[220px] truncate px-3 py-2 font-mono text-slate-600">
                        {iss.clickedLink || "—"}
                      </td>
                      <td className="max-w-[180px] truncate px-3 py-2 font-mono text-slate-600">
                        {iss.source}
                        {iss.clickedText ? ` · “${iss.clickedText}”` : ""}
                      </td>
                      <td className="max-w-[160px] truncate px-3 py-2 text-slate-400 font-mono">
                        {iss.referrer || "—"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 font-mono text-slate-400">
                        {(iss.sessionId || "").slice(0, 8)}…
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}

      <div className="flex justify-end">
        <Button size="sm" variant="ghost" onClick={() => refetch()}>
          Re-check pages
        </Button>
      </div>
    </div>
  );
}