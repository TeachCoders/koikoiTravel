"use client";

import React from "react";
import { Sparkles, Compass, CloudSun } from "lucide-react";
import RichContent from "@/components/shared/RichContent";
import ExpandableRichContent from "@/components/shared/ExpandableRichContent";
import { stripHtml } from "@/lib/utils";

export interface DestinationGuideSectionProps {
  title: string;
  subtitle?: string;
  badgeLabel?: string;
  famousFor?: string | null;
  moreDescription?: string | null;
  seoDescription?: string | null;
  attractions?: string | null;
  weather?: string | null;
  sharedLinkedHrefs?: Set<string>;
  excludeHrefs?: string[];
  className?: string;
}

export default function DestinationGuideSection({
  title,
  subtitle,
  badgeLabel = "Destination Guide",
  famousFor,
  moreDescription,
  seoDescription,
  attractions,
  weather,
  sharedLinkedHrefs,
  excludeHrefs,
  className = "bg-white border-y border-section-border py-8 sm:py-10 md:py-12",
}: DestinationGuideSectionProps) {
  const hasFamousFor = Boolean(stripHtml(famousFor || "").trim());
  const hasMoreDesc = Boolean(stripHtml(moreDescription || "").trim());
  const hasSeoDesc = Boolean(stripHtml(seoDescription || "").trim());
  const hasAttractions = Boolean(stripHtml(attractions || "").trim());
  const hasWeather = Boolean(stripHtml(weather || "").trim());

  const hasAnyContent =
    hasFamousFor || hasMoreDesc || hasSeoDesc || hasAttractions || hasWeather;

  if (!hasAnyContent) return null;

  return (
    <section id="more" className={className}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-6">
          <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#F8904D] mb-1.5">
            {badgeLabel}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold tracking-tight text-slate-900">
            Everything About {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
            {subtitle ||
              `Essential travel guide, top attractions, weather, local tips & culture for ${title}.`}
          </p>
        </div>

        {/* Famous For */}
        {hasFamousFor && (
          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles size={17} className="text-[#F8904D]" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                Famous For
              </h3>
            </div>
            {famousFor && /<li\b/i.test(famousFor) ? (
              <RichContent
                html={famousFor}
                sharedLinkedHrefs={sharedLinkedHrefs}
                excludeHrefs={excludeHrefs}
                className="text-sm sm:text-[15px] text-slate-700 leading-relaxed [&>ul]:my-0 [&>ul]:space-y-2 [&_li]:my-1.5 [&_li]:text-sm sm:[&_li]:text-[15px] [&_p]:inline [&_p]:m-0"
              />
            ) : (
              <div className="flex flex-wrap gap-2 pt-1">
                {stripHtml(famousFor || "")
                  .split(/[,•\n]+/)
                  .map((item) => item.trim())
                  .filter(Boolean)
                  .map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-[13.5px] font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2E8B8B]" />
                      {item}
                    </span>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* 100% DB Rich Content */}
        <div className="max-w-none">
          <ExpandableRichContent
            html={moreDescription}
            fallbackHtml={seoDescription}
            sharedLinkedHrefs={sharedLinkedHrefs}
            excludeHrefs={excludeHrefs}
            hideAllContentWhenCollapsed={hasFamousFor}
            extraContent={
              hasAttractions || hasWeather ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-200/80">
                  {hasAttractions && (
                    <div className="bg-slate-50/70 rounded-xl p-4 sm:p-5 border border-slate-200/70">
                      <div className="flex items-center gap-2 text-[#2E8B8B] font-bold text-xs sm:text-sm uppercase tracking-wider mb-1.5">
                        <Compass size={17} />
                        <span>Top Attractions</span>
                      </div>
                      <p className="text-sm sm:text-[14.5px] text-slate-700 font-medium leading-relaxed">
                        {stripHtml(attractions!)}
                      </p>
                    </div>
                  )}
                  {hasWeather && (
                    <div className="bg-slate-50/70 rounded-xl p-4 sm:p-5 border border-slate-200/70">
                      <div className="flex items-center gap-2 text-[#F8904D] font-bold text-xs sm:text-sm uppercase tracking-wider mb-1.5">
                        <CloudSun size={17} />
                        <span>Weather & Best Time</span>
                      </div>
                      <p className="text-sm sm:text-[14.5px] text-slate-700 font-medium leading-relaxed">
                        {stripHtml(weather!)}
                      </p>
                    </div>
                  )}
                </div>
              ) : null
            }
          />
        </div>
      </div>
    </section>
  );
}
