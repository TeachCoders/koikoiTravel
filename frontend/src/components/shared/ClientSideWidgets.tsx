"use client";

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

export default function ClientSideWidgets() {
  return (
    <>
      <ChatWidgetWrapper />
      <WhatsAppWidget />
      <UserActivityTracker />
      <ReplayRecorder />
    </>
  );
}
