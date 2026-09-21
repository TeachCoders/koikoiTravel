import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getReplaySessions,
  getReplay,
  deleteReplay,
  getRetentionDays,
  setRetentionDays,
  purgeAnalyticsNow,
  deleteAllAnalyticsData,
  sendActivityBatch,
  getBrokenPages,
  resolveNotFound,
  type DateRange,
  type ActivityBatchPayload,
  type BrokenPage,
} from ".";

/**
 * Fire-and-forget mutation that flushes a batch of activity events.
 * Analytics must never break the UI, so failures are logged silently.
 */
export const useFlushActivityEvents = () => {
  return useMutation({
    mutationFn: (payload: ActivityBatchPayload) => sendActivityBatch(payload),
    onError: (error) => {
      console.warn("[Analytics] failed to send activity batch", error);
    },
  });
};

export const useBrokenPages = (range?: DateRange, enabled = true) => {
  const query = useQuery({
    queryKey: ["analytics-broken-pages", range?.from ?? "all", range?.to ?? "all"],
    queryFn: () => getBrokenPages(range),
    enabled,
    staleTime: 30 * 1000,
  });
  return {
    pages: query.data?.pages ?? ([] as BrokenPage[]),
    resolvedPaths: query.data?.resolvedPaths ?? ([] as string[]),
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useResolveNotFound = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pagePath: string) => resolveNotFound(pagePath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analytics-broken-pages"] });
    },
  });
};

export const useReplaySessions = (opts?: {
  page?: number;
  pageSize?: number;
  kind?: "all" | "humans" | "bots";
  range?: DateRange;
  enabled?: boolean;
}) => {
  const page = opts?.page ?? 1;
  const pageSize = opts?.pageSize ?? 20;
  const kind = opts?.kind ?? "all";
  const range = opts?.range;
  const enabled = opts?.enabled ?? true;
  const query = useQuery({
    queryKey: ["replay-sessions", page, pageSize, kind, range?.from ?? "all", range?.to ?? "all"],
    queryFn: () => getReplaySessions({ page, pageSize, kind, range }),
    enabled,
    staleTime: 30 * 1000,
  });
  return {
    sessions: query.data?.sessions ?? [],
    totals: query.data?.totals ?? { all: 0, humans: 0, bots: 0 },
    page: query.data?.page ?? page,
    pageSize,
    totalPages: query.data?.totalPages ?? 1,
    isLoading: query.isLoading,
    error: query.error,
  };
};

export const useReplay = (sessionId: string | null) => {
  const query = useQuery({
    queryKey: ["replay", sessionId],
    queryFn: () => getReplay(sessionId!),
    enabled: !!sessionId,
    staleTime: Infinity, // replays are immutable once recorded
  });
  return {
    replay: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error,
  };
};

export const useDeleteReplay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => deleteReplay(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["replay-sessions"] });
    },
  });
};

export const useRetentionDays = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["analytics-retention"],
    queryFn: getRetentionDays,
    staleTime: 60 * 1000,
  });

  const save = useMutation({
    mutationFn: (days: number) => setRetentionDays(days),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analytics-retention"] });
    },
  });

  return {
    retentionDays: query.data,
    isLoading: query.isLoading,
    save,
  };
};

export const usePurgeAnalyticsNow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: purgeAnalyticsNow,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["replay-sessions"] });
      void queryClient.invalidateQueries({ queryKey: ["analytics-retention"] });
    },
  });
};

export const useDeleteAllAnalyticsData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllAnalyticsData,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["replay-sessions"] });
    },
  });
};