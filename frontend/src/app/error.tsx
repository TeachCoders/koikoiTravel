"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    console.error("Navigation error boundary caught:", error);

    // When a new build is deployed on the server while a user has a tab open,
    // client-side link navigation uses stale build chunks and can throw
    // "client reference manifest does not exist", "ChunkLoadError", or "InvariantError".
    // Auto-reload immediately so the visitor seamlessly receives the fresh server-rendered page!
    if (typeof window !== "undefined") {
      const now = Date.now();
      const lastReload = parseInt(sessionStorage.getItem("last_auto_nav_reload") || "0", 10);

      // Auto-reload at most once every 10 seconds to prevent infinite reload loops
      if (now - lastReload > 10000) {
        sessionStorage.setItem("last_auto_nav_reload", String(now));
        setReloading(true);
        window.location.reload();
      }
    }
  }, [error]);

  const handleManualRetry = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      reset();
    }
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[#F8904D] text-sm font-bold uppercase tracking-widest mb-3">
        {reloading ? "Refreshing..." : "Something went wrong"}
      </p>
      <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-[#1C1C1C]">
        {reloading ? "Loading Latest Page..." : "Unexpected Error"}
      </h1>
      <p className="mt-4 max-w-md text-[#555] text-base leading-relaxed">
        {reloading
          ? "We're updating to the latest version of this page..."
          : "An unexpected error occurred while loading this page. Please try again or contact our travel experts for assistance."}
      </p>
      {!reloading && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleManualRetry}
            className="btn-primary px-6 py-3 text-sm font-semibold cursor-pointer"
          >
            Try Again
          </button>
          <Link href="/" className="btn-outline px-6 py-3 text-sm font-semibold">
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}
