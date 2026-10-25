"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { fetchCsrfToken } from "@/lib/apiClient";

const Toaster = dynamic(
  () => import("react-hot-toast").then((c) => c.Toaster),
  { ssr: false }
);

export function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          gcTime: 5 * 60 * 1000,
          refetchOnWindowFocus: false,
        },
      },
    })
  );

  useEffect(() => {
    setMounted(true);
    fetchCsrfToken();

    // Auto-recover from stale Next.js build chunks and RSC manifest mismatches after a server deploy
    const handleChunkError = (e: ErrorEvent | PromiseRejectionEvent) => {
      const msg = "message" in e ? e.message : String((e as any)?.reason?.message || (e as any)?.reason || "");
      if (
        msg.includes("Invariant") ||
        msg.includes("client reference manifest") ||
        msg.includes("ChunkLoadError") ||
        msg.includes("Failed to fetch dynamically imported module") ||
        msg.includes("Loading chunk")
      ) {
        if (typeof window !== "undefined") {
          const now = Date.now();
          const last = parseInt(sessionStorage.getItem("last_chunk_reload") || "0", 10);
          if (now - last > 10000) {
            sessionStorage.setItem("last_chunk_reload", String(now));
            window.location.reload();
          }
        }
      }
    };

    window.addEventListener("error", handleChunkError);
    window.addEventListener("unhandledrejection", handleChunkError);
    return () => {
      window.removeEventListener("error", handleChunkError);
      window.removeEventListener("unhandledrejection", handleChunkError);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {mounted && (
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      )}
    </QueryClientProvider>
  );
}