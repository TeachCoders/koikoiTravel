import React from "react";

interface DoodleBackgroundProps {
  className?: string;
  opacity?: string;
}

export default function DoodleBackground({
  className = "",
  opacity = "",
}: DoodleBackgroundProps) {
  // Pure background colors only, no SVG pattern overlays
  return null;
}

