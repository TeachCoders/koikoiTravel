"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useGscStatus,
  useGscPerformance,
  useGscSitemaps,
  useGscUrlInspection,
  useDisconnectGsc,
  useDeleteGscData,
} from "@/feature/analytics/api/useAnalytics";
import { useAnalyticsRange } from "@/feature/analytics/range-context";

const DIMENSIONS = [
  { key: "query", label: "Queries" },
  { key: "page", label: "Pages" },
  { key: "country", label: "Countries" },
  { key: "device", label: "Devices" },
] as const;

type Dimension = (typeof DIMENSIONS)[number]["key"];

function pct(v: number) {
  return `${(v * 100).toFixed(1)}%`;
}

function ConnectState() {
  const { status } = useGscStatus();
  const [copying, setCopying] = useState(false);

  // Derive the GSC property + OAuth callback from the live site URL so the
  // template always matches the real deployed domain (no hardcoded brand).
  const siteHost = (process.env.NEXT_PUBLIC_SITE_URL || "")
    .replace(/^https?:\/\//, "")
    .split("/")[0]
    .replace(/^www\./, "")
    .trim();
  const host = siteHost || "your-domain.com";
  const redirectUri = `https://${host}/api/analytics/gsc/oauth-callback`;
  const property = `sc-domain:${host}`;

  if (!status?.configured) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800">Not configured</h3>
        <p className="mt-2 text-sm text-slate-600">
          Add these variables to the backend <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">.env</code>{" "}
          and restart it:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs leading-6 text-emerald-300">
          {[
            "GSC_CLIENT_ID=your-oauth-client-id.apps.googleusercontent.com",
            "GSC_CLIENT_SECRET=your-oauth-client-secret",
            `GSC_REDIRECT_URI=${redirectUri}`,
            `GSC_VERIFIED_SITE=${property}`,
          ].join("\n")}
        </pre>
        <p className="mt-3 text-xs text-slate-500">
          Steps: 1) Google Cloud Console → create OAuth 2.0 Client ID (Web) with the callback URL above. 2) In Google
          Search Console, make sure the property <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">{host}</code>{" "}
          is verified and your Google account is an Owner. 3) Add the env vars above.
        </p>
        <Button
          size="sm"
          variant="outline"
          className="mt-3"
          onClick={() => {
            setCopying(true);
            navigator.clipboard
              .writeText(
                [
                  "GSC_CLIENT_ID=",
                  "GSC_CLIENT_SECRET=",
                  `GSC_REDIRECT_URI=${redirectUri}`,
                  `GSC_VERIFIED_SITE=${property}`,
                ].join("\n")
              )
              .then(() => setTimeout(() => setCopying(false), 1200));
          }}
        >
          {copying ? "Copied ✓" : "Copy template"}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <h3 className="text-sm font-semibold text-slate-800">Connect Google Search Console</h3>
      <p className="mt-2 text-sm text-slate-600">
        Authorize with a Google account that has <strong>owner</strong> access to{" "}
        <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">{status.siteUrl || property}</code>{" "}
        to see search performance, sitemaps and URL indexing.
      </p>
      <a href="/api/analytics/gsc/auth">
        <Button className="mt-4">Connect with Google</Button>
      </a>
    </div>
  );
}

function PerformanceTable({ dimension }: { dimension: Dimension }) {
  const { range } = useAnalyticsRange();
  const { data, isLoading, isError } = useGscPerformance(range, dimension);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-3">
        <h3 className="text-sm font-semibold text-slate-800">
          Search Performance — {DIMENSIONS.find((d) => d.key === dimension)?.label}
        </h3>
      </div>
      {isLoading ? (
        <div className="space-y-2 p-5">
          <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
          <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
          <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
        </div>
      ) : isError ? (
        <p className="p-5 text-sm text-red-600">Error loading search performance. Try reconnecting above.</p>
      ) : !data || data.rows.length === 0 ? (
        <p className="p-5 text-sm text-slate-500">No search data in this date range.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-2.5 font-medium">{DIMENSIONS.find((d) => d.key === dimension)?.label.slice(0, -1)}</th>
                <th className="px-5 py-2.5 text-right font-medium">Clicks</th>
                <th className="px-5 py-2.5 text-right font-medium">Impressions</th>
                <th className="px-5 py-2.5 text-right font-medium">CTR</th>
                <th className="px-5 py-2.5 text-right font-medium">Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.rows.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-5 py-2.5 font-medium text-slate-800">{r.keys[0]}</td>
                  <td className="px-5 py-2.5 text-right text-slate-600">{r.clicks}</td>
                  <td className="px-5 py-2.5 text-right text-slate-600">{r.impressions}</td>
                  <td className="px-5 py-2.5 text-right text-slate-600">{pct(r.ctr)}</td>
                  <td className="px-5 py-2.5 text-right text-slate-600">{r.position?.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function SitemapsPanel({ enabled }: { enabled: boolean }) {
  const { data, isLoading, isError } = useGscSitemaps(enabled);
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-3">
        <h3 className="text-sm font-semibold text-slate-800">Sitemaps</h3>
      </div>
      {isLoading ? (
        <div className="space-y-2 p-5">
          <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
          <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
        </div>
      ) : isError ? (
        <p className="p-5 text-sm text-red-600">Error loading sitemaps.</p>
      ) : !data || data.length === 0 ? (
        <p className="p-5 text-sm text-slate-500">No sitemaps found for this property.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {data.map((s) => (
            <li key={s.path} className="px-5 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="break-all font-mono text-xs text-slate-700">
                  {s.path}
                  {s.isPending && (
                    <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                      Pending
                    </span>
                  )}
                  {s.errors > 0 && (
                    <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">
                      {s.errors} error{s.errors > 1 ? "s" : ""}
                    </span>
                  )}
                </span>
                <span className="text-xs text-slate-500">
                  {s.contents.map((c) => `${c.type}: ${c.indexed}/${c.submitted} indexed`).join(" · ")}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Submitted {fmtIso(s.lastSubmitted)} · Last downloaded {fmtIso(s.lastDownloaded)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function fmtIso(iso: string | null | undefined) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-IN", { dateStyle: "medium" });
  } catch {
    return iso;
  }
}

function UrlInspection() {
  const [url, setUrl] = useState("");
  const mutate = useGscUrlInspection(Boolean(url));

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-3">
        <h3 className="text-sm font-semibold text-slate-800">URL Inspection</h3>
        <p className="mt-0.5 text-xs text-slate-500">Check index status of any page.</p>
      </div>
      <div className="flex flex-wrap gap-2 p-5">
        <input
          type="url"
          placeholder="https://koikoitravel.com/tour-packages/…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="min-w-64 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
        <Button size="sm" variant="default" disabled={!url || mutate.isPending} onClick={() => mutate.mutate(url)}>
          {mutate.isPending ? "Inspecting…" : "Inspect"}
        </Button>
      </div>
      {mutate.isError && <p className="px-5 pb-4 text-sm text-red-600">{(mutate.error as Error)?.message}</p>}
      {mutate.data && (
        <ul className="mb-5 space-y-1.5 px-5 text-sm">
          <li className="break-all font-mono text-xs text-slate-600">{mutate.data.url}</li>
          <li>
            <span className="font-semibold text-slate-700">Index status:</span>{" "}
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                String(mutate.data.indexStatus).toLowerCase().includes("indexed") && !String(mutate.data.indexStatus).toLowerCase().includes("not")
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {mutate.data.indexStatus}
            </span>
          </li>
          <li className="text-slate-600">Coverage: {mutate.data.coverageState}</li>
          <li className="text-slate-600">Last crawl: {mutate.data.lastCrawlTime || "—"}</li>
          <li className="text-slate-600">Crawling allowed: {mutate.data.crawlingAllowed ? "Yes" : "No"}</li>
          <li className="text-slate-600">Indexing allowed: {mutate.data.indexingAllowed ? "Yes" : "No"}</li>
          <li className="text-slate-600">Robots.txt state: {mutate.data.robotsTxtState || "—"}</li>
        </ul>
      )}
    </section>
  );
}

export default function GscDashboard() {
  const { status } = useGscStatus();
  const disconnect = useDisconnectGsc();
  const deleteGsc = useDeleteGscData();
  const [dimension, setDimension] = useState<Dimension>("query");
  const connected = Boolean(status?.connected);

  return (
    <div className="space-y-6">
      {status && !status.configured && <ConnectState />}
      {status && status.configured && !connected && <ConnectState />}
      {connected && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
              {DIMENSIONS.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setDimension(d.key)}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    dimension === d.key ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              <Button size="sm" variant="outline" onClick={() => { void disconnect.mutate(); }}>
                Disconnect
              </Button>
              <Button size="sm" variant="outline" onClick={() => { void deleteGsc.mutate(); }}>
                Clear stored GSC data
              </Button>
            </div>
          </div>
          <PerformanceTable dimension={dimension} />
          <SitemapsPanel enabled />
          <UrlInspection />
        </>
      )}
    </div>
  );
}