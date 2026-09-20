"use client";

import { ChevronDown } from "lucide-react";

export default function ShowMoreButton({
  remaining,
  onClick,
}: {
  remaining: number;
  onClick: () => void;
}) {
  return (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-[#F8904D] bg-[#F8904D]/5 border border-[#F8904D]/30 hover:bg-[#F8904D]/10 rounded-xl transition-colors cursor-pointer"
      >
        <ChevronDown className="w-4 h-4" />
        Show More Tours ({remaining} remaining)
      </button>
    </div>
  );
}
