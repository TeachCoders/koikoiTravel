"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { ReplayData } from "@/feature/analytics/api";
import { countryFlag, countryLabel } from "@/lib/countryFlag";

interface ReplayPlayerProps {
  replay: ReplayData;
}

// rrweb numeric event identifiers (kept as literals to avoid pulling the full
// runtime enum surface into this bundle).
const EVENT_INCREMENTAL_SNAPSHOT = 3;
const SOURCE_MOUSE_INTERACTION = 2;
const MOUSE_CLICK = 2;
const MOUSE_DBL_CLICK = 3;

const RIPPLE_CLASS = "rrweb-click-ripple";
const RIPPLE_STYLE_ID = "rrweb-click-ripple-style";

type ReplayerLike = {
  iframe?: HTMLIFrameElement | null;
};

function ensureRippleStyles(doc: Document) {
  if (doc.getElementById(RIPPLE_STYLE_ID)) return;
  const style = doc.createElement("style");
  style.id = RIPPLE_STYLE_ID;
  style.textContent = `
    @keyframes rrwebRippleFade {
      0%   { transform: translate(-50%, -50%) scale(0.25); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.7);   opacity: 0; }
    }
    .${RIPPLE_CLASS} {
      position: fixed;
      z-index: 2147483647;
      width: 30px;
      height: 30px;
      border-radius: 9999px;
      border: 3px solid rgba(248, 144, 77, 0.95);
      background: rgba(248, 144, 77, 0.2);
      pointer-events: none;
      animation: rrwebRippleFade 0.65s ease-out forwards;
    }
  `;
  doc.head.appendChild(style);
}

function drawRipple(replayer: ReplayerLike, x: number, y: number) {
  const doc = replayer.iframe?.contentDocument;
  if (!doc || !doc.body) return;
  ensureRippleStyles(doc);
  const marker = doc.createElement("div");
  marker.className = RIPPLE_CLASS;
  marker.style.left = `${x}px`;
  marker.style.top = `${y}px`;
  doc.body.appendChild(marker);
  window.setTimeout(() => marker.remove(), 750);
}

/**
 * rrweb plugin that draws a quick highlight ring on the replay video wherever
 * the visitor clicked, so you can see exactly what they interacted with.
 */
function createClickHighlightPlugin() {
  return {
    handler(
      event: unknown,
      _isSync: boolean,
      context: { replayer: ReplayerLike }
    ) {
      const snapshot = event as { type?: number; data?: Record<string, unknown> };
      if (!snapshot || snapshot.type !== EVENT_INCREMENTAL_SNAPSHOT) return;
      const data = snapshot.data;
      if (!data || data.source !== SOURCE_MOUSE_INTERACTION) return;
      if (data.type !== MOUSE_CLICK && data.type !== MOUSE_DBL_CLICK) return;
      drawRipple(context.replayer, Number(data.x), Number(data.y));
    },
  };
}

/**
 * Renders a recorded visitor session with rrweb-player and offers a
 * re-playable .json download of the recording.
 */
export default function ReplayPlayer({ replay }: ReplayPlayerProps) {
  const playerHostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    const host = playerHostRef.current;

    if (!replay.events || replay.events.length < 2) {
      setReady(false);
      return;
    }

    (async () => {
      const [{ default: RRWebPlayer }] = await Promise.all([
        import("rrweb-player"),
        import("rrweb-player/dist/style.css"),
      ]);
      if (disposed || !host) return;

      host.innerHTML = "";
      const PlayerCtor = RRWebPlayer as unknown as new (options: {
        target: HTMLElement;
        props: Record<string, unknown>;
      }) => unknown;
      new PlayerCtor({
        target: host,
        props: {
          events: replay.events,
          autoPlay: true,
          showController: true,
          speedOption: [1, 2, 4, 8],
          width: Number(host.clientWidth) || 800,
          mouseTail: true,
          plugins: [createClickHighlightPlugin()],
        },
      });
      setReady(true);
    })();

    return () => {
      disposed = true;
      if (host) host.innerHTML = "";
    };
  }, [replay]);

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(replay)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `replay-${replay.sessionId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasEnoughEvents = !!replay.events && replay.events.length >= 2;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
        <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
          <span className="text-base leading-none">{countryFlag(replay.country)}</span>
          {countryLabel(replay.country)}
        </span>
        {replay.deviceType && (
          <span className="rounded-full bg-white px-2 py-0.5 font-medium ring-1 ring-slate-200">
            {replay.deviceType}
          </span>
        )}
        <span className="text-slate-400">session {replay.sessionId.slice(0, 8)}…</span>
      </div>
      <div
        ref={playerHostRef}
        className="mx-auto w-full overflow-hidden rounded-md border bg-slate-900 [&>*]:mx-auto"
        style={{ minHeight: hasEnoughEvents ? 420 : undefined }}
      />
      {hasEnoughEvents && !ready && (
        <p className="text-center text-sm text-gray-500 animate-pulse">
          Loading replay…
        </p>
      )}
      {!hasEnoughEvents && (
        <p className="text-center text-sm text-gray-500">
          Not enough activity recorded to replay this session.
        </p>
      )}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          {replay.count.toLocaleString()} events
        </span>
        <Button variant="outline" size="sm" onClick={downloadJson}>
          Download (.json)
        </Button>
      </div>
    </div>
  );
}
