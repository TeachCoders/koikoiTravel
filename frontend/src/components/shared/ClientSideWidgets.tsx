"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ChatWidgetWrapper = dynamic(
  () => import("@/components/shared/ChatWidgetWrapper").then((m) => m.ChatWidgetWrapper),
  { ssr: false }
);

const WhatsAppWidget = dynamic(
  () => import("@/components/shared/WhatsAppWidget"),
  { ssr: false }
);

const UserActivityTracker = dynamic(
  () => import("@/components/shared/UserActivityTracker"),
  { ssr: false }
);

const ReplayRecorder = dynamic(
  () => import("@/components/shared/ReplayRecorder"),
  { ssr: false }
);

/**
 * Renders client-side utilities.
 * ChatWidget is loaded on user interaction (scroll/touch/click) or after a 4s fallback timeout
 * to keep initial main-thread blocking time minimal for high PageSpeed performance.
 */
export default function ClientSideWidgets() {
  const [shouldLoadChat, setShouldLoadChat] = useState(false);

  useEffect(() => {
    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setShouldLoadChat(true);
      events.forEach((evt) => window.removeEventListener(evt, trigger));
      clearTimeout(timer);
    };

    const events = ["scroll", "touchstart", "mousemove", "keydown", "click"];
    events.forEach((evt) => window.addEventListener(evt, trigger, { passive: true, once: true }));
    const timer = setTimeout(trigger, 4000);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, trigger));
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {shouldLoadChat && <ChatWidgetWrapper />}
      <WhatsAppWidget />
      <UserActivityTracker />
      <ReplayRecorder />
    </>
  );
}
