/**
 * Lets any surface open the already-mounted chat widget without owning its
 * state. The widget is a floating singleton in the root layout, so callers
 * dispatch this event instead of rendering a second chat UI.
 */
export const OPEN_CHAT_EVENT = "koikoitravel:open-chat";

export const openChatWidget = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
};
