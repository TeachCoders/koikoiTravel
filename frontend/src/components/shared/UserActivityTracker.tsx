"use client";

import { useUserActivityTracker } from "@/hooks/useUserActivityTracker";

/**
 * Mounts the guest activity tracker (page dwell, clicks, broken/404 links).
 * Renders nothing – its job is to wire up global analytics listeners.
 */
export default function UserActivityTracker() {
  useUserActivityTracker();
  return null;
}