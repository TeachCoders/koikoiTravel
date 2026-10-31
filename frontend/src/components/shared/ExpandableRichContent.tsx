"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import RichContent from "@/components/shared/RichContent";
import { cn, stripHtml } from "@/lib/utils";
import type { AutoLinkRule } from "@/lib/autoInternalLink";

export interface ExpandableRichContentProps {
  /** The primary HTML content (e.g. moreDescription) */
  html?: string | null;
  /** Fallback HTML if primary HTML is not provided (e.g. seoDescription) */
  fallbackHtml?: string | null;
  /** Shared set of hrefs already linked on the page (for autoLink deduplication) */
  sharedLinkedHrefs?: Set<string>;
  /** Hrefs to exclude from auto-linking */
  excludeHrefs?: string[];
  /** Rules for auto-linking */
  rules?: AutoLinkRule[];
  /** Whether auto-linking is enabled (defaults to true) */
  autoLink?: boolean;
  /** Custom wrapper classes */
  className?: string;
  /** Custom typography classes for RichContent */
  contentClassName?: string;
  /** Custom label for expand button (defaults to "Read More") */
  expandLabel?: string;
  /** Custom label for collapse button (defaults to "Read Less") */
  collapseLabel?: string;
  /** Initially expanded (defaults to false) */
  defaultExpanded?: boolean;
  /** When true, hides all rich content under Read More (no intro paragraph above button) */
  hideAllContentWhenCollapsed?: boolean;
  /** Extra content to render inside the collapsible section (e.g. attractions, weather) */
  extraContent?: React.ReactNode;
}

/**
 * Splits HTML content after the first meaningful paragraph with text.
 */
function splitFirstParagraph(content: string): { introHtml: string; restHtml: string } {
  if (!content) return { introHtml: "", restHtml: "" };

  // Match first <p> that has alphanumeric text inside
  const pRegex = /<p\b[^>]*>(?:(?!<\/p>)[\s\S])*?[a-zA-Z0-9]+(?:(?!<\/p>)[\s\S])*?<\/p>/i;
  const match = pRegex.exec(content);

  if (!match) {
    const firstPEnd = content.indexOf("</p>");
    if (firstPEnd === -1) {
      return { introHtml: content, restHtml: "" };
    }
    return {
      introHtml: content.slice(0, firstPEnd + 4),
      restHtml: content.slice(firstPEnd + 4),
    };
  }

  const splitIndex = match.index + match[0].length;
  return {
    introHtml: content.slice(0, splitIndex),
    restHtml: content.slice(splitIndex),
  };
}

/**
 * Reusable Expandable Rich Content Component
 *
 * Shows the first paragraph and heading openly, with a smooth "Read More / Read Less"
 * toggle for the remainder of the article.
 *
 * Fully SEO friendly: All content and internal links stay in the DOM for search indexing.
 * Reusable across Country, State, City, Journey, and Travel Experience pages.
 */
export default function ExpandableRichContent({
  html,
  fallbackHtml,
  sharedLinkedHrefs,
  excludeHrefs,
  rules,
  autoLink = true,
  className,
  contentClassName = "rich-text-plain-links text-sm sm:text-base text-slate-700 leading-relaxed",
  expandLabel = "Read More",
  collapseLabel = "Read Less",
  defaultExpanded = false,
  hideAllContentWhenCollapsed = false,
  extraContent,
}: ExpandableRichContentProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  const rawContent = (html && stripHtml(html).trim() ? html : fallbackHtml) || "";

  const { introHtml, restHtml, hasRest } = useMemo(() => {
    const hasAnyContent = Boolean(stripHtml(rawContent).trim() || extraContent);
    if (!hasAnyContent) return { introHtml: "", restHtml: "", hasRest: false };

    if (hideAllContentWhenCollapsed) {
      return {
        introHtml: "",
        restHtml: rawContent,
        hasRest: true,
      };
    }

    const { introHtml, restHtml } = splitFirstParagraph(rawContent);
    const hasRest = Boolean(stripHtml(restHtml).trim() || extraContent);
    return { introHtml, restHtml, hasRest };
  }, [rawContent, hideAllContentWhenCollapsed, extraContent]);

  if (!rawContent && !extraContent) {
    return null;
  }

  return (
    <div className={className}>
      {introHtml ? (
        <RichContent
          html={introHtml}
          autoLink={autoLink}
          sharedLinkedHrefs={sharedLinkedHrefs}
          excludeHrefs={excludeHrefs}
          rules={rules}
          className={contentClassName}
        />
      ) : null}

      {hasRest && (
        <>
          <div className="mt-4 pt-1">
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold hover:border-[#2E8B8B] hover:text-[#2E8B8B] transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <span>{isExpanded ? collapseLabel : expandLabel}</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  isExpanded ? "rotate-180" : ""
                )}
              />
            </button>
          </div>

          <div
            className={cn(
              "overflow-hidden transition-all duration-500 ease-in-out",
              isExpanded ? "max-h-[10000px] opacity-100 mt-5 pt-2" : "max-h-0 opacity-0"
            )}
          >
            {restHtml ? (
              <RichContent
                html={restHtml}
                autoLink={autoLink}
                sharedLinkedHrefs={sharedLinkedHrefs}
                excludeHrefs={excludeHrefs}
                rules={rules}
                className={contentClassName}
              />
            ) : null}

            {extraContent}

            {isExpanded && (
              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-start">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold hover:border-[#2E8B8B] hover:text-[#2E8B8B] transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <span>{collapseLabel}</span>
                  <ChevronDown className="w-4 h-4 rotate-180 transition-transform duration-300" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

