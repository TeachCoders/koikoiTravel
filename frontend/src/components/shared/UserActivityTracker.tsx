"use client";

import { useReplayRecorder } from "@/hooks/useReplayRecorder";

/**
 * Global, invisible tracker mounted once in the root layout.
 * Records rrweb session replay (video) on public storefront pages only.
 */
export default function UserActivityTracker() {
  useReplayRecorder();
  return null;
}