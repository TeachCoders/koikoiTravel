"use client";

import useReplayRecorder from "@/hooks/useReplayRecorder";

/**
 * Mounts the rrweb session recorder for the public storefront.
 * Renders nothing – its job is to capture DOM snapshots as a guest browses,
 * so super-admins can replay the visit like a video.
 * /dashboard, /profile and /auth are never recorded (guarded inside the hook).
 */
export default function ReplayRecorder() {
  useReplayRecorder();
  return null;
}