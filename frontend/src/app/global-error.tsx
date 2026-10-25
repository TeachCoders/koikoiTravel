"use client";

import { useEffect, useState } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    console.error("Global error:", error);
    if (typeof window !== "undefined") {
      const now = Date.now();
      const last = parseInt(sessionStorage.getItem("last_global_reload") || "0", 10);
      if (now - last > 10000) {
        sessionStorage.setItem("last_global_reload", String(now));
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
    <html lang="en">
      <body className="bg-white text-[#1C1C1C] antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="text-[#F8904D] text-sm font-bold uppercase tracking-widest mb-3">
            {reloading ? "Refreshing..." : "Critical Error"}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            {reloading ? "Updating Application..." : "Something went wrong"}
          </h1>
          <p className="mt-4 max-w-md text-[#555] text-base leading-relaxed">
            {reloading
              ? "We're loading the latest version of this page for you..."
              : "The application encountered an error. Please try refreshing the page or contact support if the problem persists."}
          </p>
          {!reloading && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleManualRetry}
                className="rounded-lg bg-[#2E8B8B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#247070] transition-colors cursor-pointer"
              >
                Try Again
              </button>
              <a
                href="/"
                className="rounded-lg border border-[#2E8B8B] px-6 py-3 text-sm font-semibold text-[#2E8B8B] hover:bg-[#2E8B8B]/5 transition-colors"
              >
                Back to Home
              </a>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
