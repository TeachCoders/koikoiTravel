import apiClient from "@/lib/apiClient";

/* ───────────── Activity events & broken-page / 404 tracking ───────────── */

export type ActivityEventType =
  | "PAGE_VIEW"
  | "SECTION_DWELL"
  | "DWELL"
  | "RAGE_CLICK"
  | "DEAD_CLICK"
  | "CLICK"
  | "BROKEN_LINK"
  | "SEARCH_INTENT";

/** Human-friendly names shown in dashboards instead of raw event codes. */
export const EVENT_LABELS: Record<string, string> = {
  PAGE_VIEW: "Page Visit",
  PAGE_DWELL: "Time on Page",
  SECTION_DWELL: "Section Time",
  CLICK: "Click",
  RAGE_CLICK: "Rage Click",
  DEAD_CLICK: "Dead Click",
  BROKEN_LINK: "Broken Link",
  SEARCH_INTENT: "Search",
};

export const eventLabel = (name: string | null | undefined): string =>
  name ? (EVENT_LABELS[name] ?? name) : "";

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  eventName: string;
  pagePath: string;
  sectionId?: string;
  dwellTimeMs?: number;
  element?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface ActivityBatchPayload {
  sessionId: string;
  visitorId: string;
  userId?: number | null;
  userAgent?: string;
  deviceType?: string;
  country?: string;
  referrer?: string;
  totalTimeSpent?: number;
  events: Omit<ActivityEvent, "id">[];
}

/**
 * Sends a batch of user-activity events to the backend analytics ingestion API.
 */
export async function sendActivityBatch(payload: ActivityBatchPayload): Promise<void> {
  await apiClient.post("/analytics/events", payload);
}

export interface BrokenPage {
  pagePath: string;
  hits: number;
  visitors: number;
  fromPages: { source: string; count: number; lastAt: string }[];
  issues: {
    source: string;
    clickedLink: string | null;
    clickedText: string | null;
    referrer: string | null;
    sessionId: string;
    createdAt: string;
  }[];
}

export async function getBrokenPages(range?: DateRange): Promise<{ pages: BrokenPage[]; resolvedPaths: string[] }> {
  const res = await apiClient.get<{ pages: BrokenPage[]; resolvedPaths: string[] }>("/analytics/broken-pages", {
    params: {
      ...(range?.from ? { from: range.from } : {}),
      ...(range?.to ? { to: range.to } : {}),
    },
  });
  return res.data ?? { pages: [], resolvedPaths: [] };
}

export async function resolveNotFound(pagePath: string): Promise<void> {
  await apiClient.post("/analytics/resolve-404", { pagePath });
}

/* ───────────── Session replay (video) ───────────── */

export interface DateRange {
  from: string; // YYYY-MM-DD
  to: string; // YYYY-MM-DD
}

function dateRangeParams(range?: DateRange) {
  return range ? { from: range.from, to: range.to } : {};
}

export interface ReplaySessionInfo {
  sessionId: string;
  visitorId: string | null;
  country: string | null;
  deviceType: string | null;
  isBot: boolean;
  botSource: "search_crawler" | "ai_crawler" | "other_bot" | "cloud_ip" | "multi_ua" | null;
  user: { id: number; name: string; email: string } | null;
  batchCount: number;
  startedAt: string;
  lastEventAt: string;
  durationSec: number | null;
}

export interface ReplaySessionsPage {
  sessions: ReplaySessionInfo[];
  totals: { all: number; humans: number; bots: number };
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ReplayData {
  sessionId: string;
  count: number;
  events: Record<string, unknown>[];
  country?: string | null;
  deviceType?: string | null;
}

export async function getReplaySessions(params?: {
  page?: number;
  pageSize?: number;
  kind?: "all" | "humans" | "bots";
  range?: DateRange;
}): Promise<ReplaySessionsPage> {
  const res = await apiClient.get<ReplaySessionsPage>("/analytics/replay-sessions", {
    params: {
      page: params?.page ?? 1,
      pageSize: params?.pageSize ?? 20,
      kind: params?.kind ?? "all",
      ...(params?.range ? dateRangeParams(params.range) : {}),
    },
  });
  return res.data ?? { sessions: [], totals: { all: 0, humans: 0, bots: 0 }, page: 1, pageSize: 20, totalPages: 1 };
}

export async function getReplay(sessionId: string): Promise<ReplayData> {
  const res = await apiClient.get<ReplayData>(
    `/analytics/replay/${encodeURIComponent(sessionId)}`
  );
  return res.data;
}

export async function deleteReplay(sessionId: string): Promise<void> {
  await apiClient.delete(`/analytics/replay/${encodeURIComponent(sessionId)}`);
}

/* ───────────── Data retention ───────────── */

export async function getRetentionDays(): Promise<number> {
  const res = await apiClient.get<{ retentionDays: number }>(
    "/analytics/retention-days"
  );
  return res.data?.retentionDays ?? 15;
}

export async function setRetentionDays(days: number): Promise<void> {
  await apiClient.put("/analytics/retention-days", { retentionDays: days });
}

/* ───────────── Data management (admin) ───────────── */

export async function purgeAnalyticsNow(): Promise<{ success: boolean; deleted: number }> {
  const res = await apiClient.post<{ success: boolean; deleted: number }>("/analytics/data/purge");
  return res.data ?? { success: true, deleted: 0 };
}

export async function deleteAllAnalyticsData(): Promise<{ success: boolean; deleted: number }> {
  const res = await apiClient.post<{ success: boolean; deleted: number }>("/analytics/data/delete-all");
  return res.data ?? { success: true, deleted: 0 };
}