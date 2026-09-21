"use client";

import React from "react";
import Image from "next/image";

interface ImageWatermarkProps {
  alt?: string;
  logo?: string;
  theme?: "dark" | "light" | "auto";
  className?: string;
}

export const ImageWatermark: React.FC<ImageWatermarkProps> = ({
  alt = "KoiKoi Travel",
  logo = "/logo-with-name.png",
  theme = "light",
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden select-none pointer-events-none ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600"
          : "bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300"
      } ${className}`}
    >
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0%,transparent_70%)]" />
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-40 h-40 border-[10px] rounded-full border-slate-500" />
      </div>
      <div className="relative w-40 h-16 max-w-[75%] max-h-[65%] flex items-center justify-center z-10">
        <Image
          src={logo}
          alt={alt}
          width={160}
          height={70}
          className={`object-contain filter grayscale ${
            theme === "dark" ? "opacity-70 brightness-0 invert" : "opacity-40"
          }`}
          unoptimized
        />
      </div>
    </div>
  );
};

export default ImageWatermark;