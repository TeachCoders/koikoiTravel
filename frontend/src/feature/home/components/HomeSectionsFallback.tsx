import React from "react";

function pulse(className: string) {
  return (
    <div className={`animate-pulse rounded-2xl bg-slate-200 dark:bg-zinc-800 ${className}`} />
  );
}

export default function HomeSectionsFallback() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero skeleton */}
      <section className="relative min-h-[600px] lg:min-h-[680px] flex items-center justify-center overflow-hidden py-14 lg:py-20 bg-slate-900">
        <div className="absolute inset-0 bg-slate-800 animate-pulse" />
        <div className="relative z-10 w-full max-w-3xl px-6 space-y-5">
          {pulse("h-12 lg:h-14 w-4/5 mx-auto bg-slate-600")}
          {pulse("h-5 w-3/5 mx-auto")}
          {pulse("h-14 w-full max-w-xl mx-auto bg-slate-700")}
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 py-14 space-y-14">
        <div className="space-y-4">
          {pulse("h-8 w-64")}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-3">
                {pulse("h-52 w-full")}
                {pulse("h-4 w-3/4")}
                {pulse("h-4 w-1/2")}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}