import apiClient from "@/lib/apiClient";

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