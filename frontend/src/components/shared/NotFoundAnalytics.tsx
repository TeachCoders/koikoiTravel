"use client";

import { useEffect } from "react";
import { queueNotFound } from "@/lib/analyticsNotFoundBuffer";

export function NotFoundAnalytics() {
  useEffect(() => {
    queueNotFound();
    window.dispatchEvent(new CustomEvent("analytics:notfound"));
  }, []);
  return null;
}
