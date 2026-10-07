"use client";

import React from "react";

// 1. Discover the possibilities SVG Icon (Ticket / Passport / Sparkles)
const DiscoverPossibilitiesIcon = () => (
  <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Soft lavender background blob */}
    <ellipse cx="36" cy="46" rx="22" ry="18" fill="#EEF2FF" transform="rotate(-10 36 46)" />
    
    {/* Background Orange Loop / Ribbon */}
    <path
      d="M48 24C53.5228 24 58 28.4772 58 34C58 39.5228 53.5228 44 48 44C42.4772 44 38 39.5228 38 34C38 28.4772 42.4772 24 48 24Z"
      stroke="#FF8A00"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />

    {/* Main Golden Ticket / Pass (angled) */}
    <g transform="rotate(-12 32 40)">
      <rect x="16" y="24" width="34" height="42" rx="6" fill="url(#ticket_grad)" />
      {/* Ticket Header & details */}
      <path d="M16 35H50" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="22" y="42" width="18" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.85" />
      <rect x="22" y="49" width="24" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.85" />
      <rect x="22" y="56" width="12" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.85" />
      {/* Ticket cutouts */}
      <circle cx="16" cy="35" r="3" fill="#EEF2FF" />
      <circle cx="50" cy="35" r="3" fill="#EEF2FF" />
    </g>

    {/* Cyan / Teal ribbon accent */}
    <path
      d="M32 50C34 56 38 60 44 62"
      stroke="#06B6D4"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* Sparkles */}
    <path d="M22 18L23.5 22L27.5 23.5L23.5 25L22 29L20.5 25L16.5 23.5L20.5 22L22 18Z" fill="#FBBF24" />
    <circle cx="56" cy="18" r="2" fill="#F59E0B" />
    <circle cx="62" cy="46" r="2.5" fill="#FB923C" />

    <defs>
      <linearGradient id="ticket_grad" x1="16" y1="24" x2="50" y2="66" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE047" />
        <stop offset="0.6" stopColor="#F59E0B" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. Enjoy deals & delights SVG Icon (3D Gold Coins + Orange % Tag)
const EnjoyDealsIcon = () => (
  <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Soft peach background blob */}
    <ellipse cx="40" cy="44" rx="24" ry="20" fill="#FFF7ED" />

    {/* Cyan string connecting tag */}
    <path
      d="M48 24C44 20 40 22 42 28"
      stroke="#06B6D4"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Gold Coins Stack (Bottom & Top) */}
    {/* Bottom Coin */}
    <ellipse cx="32" cy="42" rx="14" ry="6" fill="#D97706" />
    <ellipse cx="32" cy="40" rx="14" ry="6" fill="url(#coin_grad_bot)" />
    
    {/* Angled Standing Gold Coin */}
    <g transform="rotate(-20 28 32)">
      <ellipse cx="28" cy="32" rx="12" ry="15" fill="#D97706" />
      <ellipse cx="28" cy="30" rx="11" ry="14" fill="url(#coin_grad)" />
      <ellipse cx="28" cy="30" rx="7" ry="10" stroke="#FDE68A" strokeWidth="1.5" fill="none" />
      <text x="25" y="34" fill="#B45309" fontSize="10" fontWeight="bold" fontFamily="sans-serif">₹</text>
    </g>

    {/* Orange Discount Tag */}
    <g transform="rotate(22 50 44)">
      {/* Tag body */}
      <path
        d="M38 30L52 30C54 30 55.5 31.5 56 33L62 44C63 46 62.5 48 61 49.5L51.5 59C50 60.5 48 61 46 60L35 54C33.5 53.5 32 52 32 50L32 36C32 32.7 34.7 30 38 30Z"
        fill="url(#tag_grad)"
      />
      {/* Tag hole */}
      <circle cx="39" cy="37" r="2.5" fill="#FFF7ED" />
      {/* Percentage % sign */}
      <text x="43" y="50" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">%</text>
    </g>

    {/* Sparkle sparkles */}
    <path d="M60 20L61 22.5L63.5 23.5L61 24.5L60 27L59 24.5L56.5 23.5L59 22.5L60 20Z" fill="#FBBF24" />
    <circle cx="20" cy="52" r="2" fill="#F59E0B" />

    <defs>
      <linearGradient id="coin_grad" x1="17" y1="16" x2="39" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE047" />
        <stop offset="0.6" stopColor="#F59E0B" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="coin_grad_bot" x1="18" y1="34" x2="46" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE047" />
        <stop offset="1" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="tag_grad" x1="32" y1="30" x2="62" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FB923C" />
        <stop offset="0.7" stopColor="#F97316" />
        <stop offset="1" stopColor="#EA580C" />
      </linearGradient>
    </defs>
  </svg>
);

// 3. Exploring made easy SVG Icon (Smartphone with lightning speed badge)
const ExploringEasyIcon = () => (
  <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Soft mint / cyan background blob */}
    <ellipse cx="40" cy="44" rx="23" ry="19" fill="#ECFEFF" />

    {/* Cyan accent ring / swoop */}
    <path
      d="M22 48C20 54 26 59 36 60C48 61 56 55 58 48"
      stroke="#06B6D4"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Smartphone (Angled) */}
    <g transform="rotate(-15 36 40)">
      {/* Phone Body */}
      <rect x="22" y="18" width="28" height="48" rx="6" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="3" />
      {/* Screen area */}
      <rect x="24" y="24" width="24" height="36" rx="2" fill="#FEF3C7" />
      {/* App interface lines */}
      <rect x="27" y="28" width="14" height="2.5" rx="1" fill="#F59E0B" />
      <rect x="27" y="34" width="18" height="2" rx="1" fill="#D97706" fillOpacity="0.4" />
      <rect x="27" y="38" width="12" height="2" rx="1" fill="#D97706" fillOpacity="0.4" />
      {/* Orange search bar placeholder */}
      <rect x="27" y="44" width="18" height="6" rx="2" fill="#FF8A00" />
      {/* Home indicator bar */}
      <rect x="33" y="62" width="6" height="1.5" rx="0.75" fill="#D97706" />
    </g>

    {/* Circular Lightning Badge */}
    <g transform="translate(42, 14)">
      <circle cx="12" cy="12" r="10" fill="url(#flash_grad)" />
      {/* Lightning bolt */}
      <path
        d="M13.5 6L8.5 13H12.5L10.5 19L16.5 11.5H12.5L13.5 6Z"
        fill="#FFFFFF"
      />
    </g>

    {/* Sparkle sparkles */}
    <circle cx="18" cy="28" r="2" fill="#FBBF24" />
    <path d="M60 48L61 50.5L63.5 51.5L61 52.5L60 55L59 52.5L56.5 51.5L59 50.5L60 48Z" fill="#F97316" />

    <defs>
      <linearGradient id="flash_grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FB923C" />
        <stop offset="1" stopColor="#EA580C" />
      </linearGradient>
    </defs>
  </svg>
);

// 4. Travel you can trust SVG Icon (Hot Air Balloon + Orange Shield)
const TravelTrustIcon = () => (
  <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Soft peach / blush background blob */}
    <ellipse cx="36" cy="46" rx="23" ry="19" fill="#FFF1F2" />

    {/* Hot Air Balloon */}
    <g transform="translate(18, 14)">
      {/* Balloon Envelope */}
      <path
        d="M16 2C24 2 30 7.5 30 15C30 21 24 28 18 31L14 31C8 28 2 21 2 15C2 7.5 8 2 16 2Z"
        fill="url(#balloon_grad)"
      />
      {/* Balloon Stripes */}
      <path
        d="M16 2C20 2 24 7.5 24 15C24 21 19 28 16 31C13 28 8 21 8 15C8 7.5 12 2 16 2Z"
        fill="#FBBF24"
      />
      <path
        d="M16 2C17.5 2 19 7.5 19 15C19 21 17 28 16 31C15 28 13 21 13 15C13 7.5 14.5 2 16 2Z"
        fill="#FFFFFF"
        fillOpacity="0.6"
      />
      {/* Basket Ropes & Basket */}
      <line x1="13" y1="31" x2="13" y2="34" stroke="#78350F" strokeWidth="1" />
      <line x1="19" y1="31" x2="19" y2="34" stroke="#78350F" strokeWidth="1" />
      <rect x="12" y="34" width="8" height="5" rx="1.5" fill="#D97706" />
    </g>

    {/* Orange Security Shield with Gold Check */}
    <g transform="translate(42, 34)">
      {/* Shield Base */}
      <path
        d="M14 2L2 6V14C2 21 7 26 14 28C21 26 26 21 26 14V6L14 2Z"
        fill="url(#shield_grad)"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />
      {/* Checkmark */}
      <path
        d="M9 14.5L12.5 18L19 10"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>

    {/* Sparkles */}
    <path d="M54 18L55 20.5L57.5 21.5L55 22.5L54 25L53 22.5L50.5 21.5L53 20.5L54 18Z" fill="#FBBF24" />
    <circle cx="20" cy="56" r="2" fill="#FB923C" />

    <defs>
      <linearGradient id="balloon_grad" x1="2" y1="2" x2="30" y2="31" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FB923C" />
        <stop offset="1" stopColor="#EA580C" />
      </linearGradient>
      <linearGradient id="shield_grad" x1="2" y1="2" x2="26" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FB923C" />
        <stop offset="0.7" stopColor="#F97316" />
        <stop offset="1" stopColor="#EA580C" />
      </linearGradient>
    </defs>
  </svg>
);

const VALUE_PROPS = [
  {
    id: "possibilities",
    icon: <DiscoverPossibilitiesIcon />,
    title: "Discover the possibilities",
    description: "With hundreds and thousands of attractions, curated packages, hotels & more, you're sure to find joy.",
  },
  {
    id: "deals",
    icon: <EnjoyDealsIcon />,
    title: "Enjoy deals & delights",
    description: "Quality activities. Great prices. Plus, direct transparent pricing to get the most value out of every trip.",
  },
  {
    id: "easy",
    icon: <ExploringEasyIcon />,
    title: "Exploring made easy",
    description: "Book seamlessly, customize on demand & get dedicated 24/7 personal trip managers for easier exploring.",
  },
  {
    id: "trust",
    icon: <TravelTrustIcon />,
    title: "Travel you can trust",
    description: "Read honest reviews & get reliable customer support. We're with you at every step.",
  },
];

interface WhyChooseUsSectionProps {
  images?: string[];
  hideGallery?: boolean;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = () => {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-white border-t border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* Section Heading - Clean Klook Style */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1c1c] tracking-tight mb-10 sm:mb-12">
          Why choose KoiKoi Travel
        </h2>

        {/* 4 Value Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {VALUE_PROPS.map((item) => (
            <div key={item.id} className="flex flex-col items-start text-left">
              {/* Illustrated Icon with soft padding */}
              <div className="mb-4 sm:mb-5 shrink-0 transition-transform duration-300 hover:scale-105">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-[17px] font-bold text-slate-900 mb-2 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-[13.5px] text-slate-500 leading-relaxed max-w-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;
