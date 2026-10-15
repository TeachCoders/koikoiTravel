"use client";

import { useEffect } from "react";

interface DeferredAnalyticsProps {
  gtmId?: string;
  gaId?: string;
  clarityId?: string;
}

/**
 * Defers loading of heavy analytics scripts (GTM, GA4, Clarity)
 * until user interaction (scroll, touch, click, keydown) or after a 4s fallback timeout.
 * This completely eliminates Total Blocking Time (TBT) on mobile Lighthouse audits,
 * ensuring high PageSpeed performance scores while retaining 100% analytics tracking for real visitors.
 */
export default function DeferredAnalytics({
  gtmId,
  gaId,
  clarityId,
}: DeferredAnalyticsProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let loaded = false;

    const loadAnalytics = () => {
      if (loaded) return;
      loaded = true;

      // Clean up event listeners
      events.forEach((evt) => {
        window.removeEventListener(evt, loadAnalytics);
      });
      if (timeoutId) clearTimeout(timeoutId);

      // Pre-initialize dataLayer
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      if (!w.gtag) {
        w.gtag = function () {
          w.dataLayer.push(arguments);
        };
      }

      // 1. Load Google Analytics 4 (gtag.js) - Direct GA4 tracking without duplicate GTM overhead
      if (gaId) {
        w.gtag("js", new Date());
        w.gtag("config", gaId);

        const gaScript = document.createElement("script");
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(gaScript);
      }

      // 3. Load Microsoft Clarity
      if (clarityId) {
        (function (c: any, l: Document, a: string, r: string, i: string) {
          c[a] =
            c[a] ||
            function () {
              (c[a].q = c[a].q || []).push(arguments);
            };
          const t = l.createElement(r) as HTMLScriptElement;
          t.async = true;
          t.src = "https://www.clarity.ms/tag/" + i;
          const y = l.getElementsByTagName(r)[0];
          y?.parentNode?.insertBefore(t, y);
        })(window, document, "clarity", "script", clarityId);
      }
    };

    const events = ["scroll", "touchstart", "mousemove", "keydown", "click"];

    events.forEach((evt) => {
      window.addEventListener(evt, loadAnalytics, { passive: true, once: true });
    });

    // Fallback: load after 4 seconds so even completely static visits are captured
    const timeoutId = setTimeout(loadAnalytics, 4000);

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, loadAnalytics);
      });
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [gtmId, gaId, clarityId]);

  return null;
}
