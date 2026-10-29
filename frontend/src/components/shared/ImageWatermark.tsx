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
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden select-none pointer-events-none bg-slate-100 ${className}`}
    >
      <div className="relative w-36 h-14 max-w-[75%] max-h-[65%] flex items-center justify-center z-10">
        <Image
          src={logo}
          alt={alt}
          width={150}
          height={60}
          className="object-contain filter grayscale opacity-25"
        />
      </div>
    </div>
  );
};

export default ImageWatermark;
